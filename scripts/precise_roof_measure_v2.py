#!/usr/bin/env python3
"""
Precise Roof Measurement v2 - Improved building detection
"""

import sys
import json
import numpy as np
import rasterio
from scipy import ndimage
from scipy.ndimage import binary_dilation
import tempfile
import os
import urllib.request
import urllib.parse

def get_api_key():
    with open(os.path.expanduser('~/clawd/config/.google-solar-credentials')) as f:
        return f.read().strip()

def geocode(address, api_key):
    url = f"https://maps.googleapis.com/maps/api/geocode/json?address={urllib.parse.quote(address)}&key={api_key}"
    with urllib.request.urlopen(url) as r:
        data = json.load(r)
        loc = data['results'][0]['geometry']['location']
        return loc['lat'], loc['lng']

def download_layers(lat, lng, api_key, radius):
    url = f"https://solar.googleapis.com/v1/dataLayers:get?location.latitude={lat}&location.longitude={lng}&radiusMeters={radius}&view=FULL_LAYERS&requiredQuality=HIGH&key={api_key}"
    with urllib.request.urlopen(url) as r:
        layers = json.load(r)
    
    dsm_path = tempfile.mktemp(suffix='.tiff')
    mask_path = tempfile.mktemp(suffix='.tiff')
    
    urllib.request.urlretrieve(f"{layers['dsmUrl']}&key={api_key}", dsm_path)
    urllib.request.urlretrieve(f"{layers['maskUrl']}&key={api_key}", mask_path)
    
    return dsm_path, mask_path

def find_target_building(mask, center_weight=0.7, size_weight=0.3, min_size_sf=1000):
    """
    Find target building using combination of:
    - Proximity to center (primary)
    - Reasonable size (secondary)
    """
    labeled, num_buildings = ndimage.label(mask > 0)
    
    if num_buildings == 0:
        return None, 0
    
    center_y, center_x = mask.shape[0] // 2, mask.shape[1] // 2
    max_dist = np.sqrt(center_y**2 + center_x**2)
    
    # Assume 0.1m resolution for pixel to sf conversion
    res = 0.1
    
    best_score = -float('inf')
    best_id = 1
    
    for i in range(1, num_buildings + 1):
        building_mask = (labeled == i)
        pixels = building_mask.sum()
        area_sf = pixels * res * res * 10.7639
        
        # Skip tiny buildings (sheds, etc)
        if area_sf < min_size_sf:
            continue
        
        # Calculate centroid distance
        coords = np.where(building_mask)
        cy, cx = np.mean(coords[0]), np.mean(coords[1])
        dist = np.sqrt((cy - center_y)**2 + (cx - center_x)**2)
        
        # Score: combine distance (inverted) and size
        dist_score = 1 - (dist / max_dist)  # 0 to 1, higher = closer
        size_score = min(area_sf / 4000, 1)  # Cap at 4000 sf
        
        score = center_weight * dist_score + size_weight * size_score
        
        if score > best_score:
            best_score = score
            best_id = i
    
    return (labeled == best_id), num_buildings

def measure_roof(dsm_path, mask_path, overhang_inches=18):
    """Calculate roof area from DSM and mask."""
    
    with rasterio.open(mask_path) as mask_src:
        mask = mask_src.read(1)
        target_mask, num_buildings = find_target_building(mask)
        
        if target_mask is None:
            return None
    
    with rasterio.open(dsm_path) as dsm_src:
        dsm = dsm_src.read(1)
        res = dsm_src.res[0]
        
        # Add overhang
        overhang_m = overhang_inches * 0.0254
        overhang_pixels = int(overhang_m / res)
        
        if overhang_pixels > 0:
            struct = np.ones((overhang_pixels*2+1, overhang_pixels*2+1))
            expanded_mask = binary_dilation(target_mask, structure=struct)
        else:
            expanded_mask = target_mask
        
        roof_dsm = np.where(expanded_mask, dsm, np.nan)
        
        gy, gx = np.gradient(roof_dsm, res)
        slope_deg = np.degrees(np.arctan(np.sqrt(gx**2 + gy**2)))
        
        reasonable = slope_deg < 60
        surface_element = np.sqrt(1 + gx**2 + gy**2)
        surface_filtered = np.where(expanded_mask & reasonable & ~np.isnan(surface_element),
                                    surface_element, 0)
        
        pixel_count = np.sum(expanded_mask & reasonable)
        footprint_sf = pixel_count * (res * res) * 10.7639
        surface_sf = np.sum(surface_filtered) * (res * res) * 10.7639
        
        valid_slopes = slope_deg[expanded_mask & reasonable & ~np.isnan(slope_deg)]
        avg_pitch_deg = np.median(valid_slopes) if len(valid_slopes) > 0 else 0
        pitch_12 = np.tan(np.radians(avg_pitch_deg)) * 12
        
        return {
            'footprint_sf': round(footprint_sf),
            'surface_sf': round(surface_sf),
            'pitch_12': round(pitch_12, 1),
            'pitch_factor': round(surface_sf / footprint_sf, 3) if footprint_sf > 0 else 1,
            'overhang_assumed': overhang_inches,
            'buildings_detected': num_buildings
        }

def main():
    if len(sys.argv) < 2:
        print("Usage: precise_roof_measure_v2.py 'ADDRESS' [OVERHANG_INCHES]")
        sys.exit(1)
    
    address = sys.argv[1]
    overhang = int(sys.argv[2]) if len(sys.argv) > 2 else 18
    
    api_key = get_api_key()
    lat, lng = geocode(address, api_key)
    
    # Try increasing radii until we get a good building
    for radius in [25, 50, 75]:
        dsm_path, mask_path = download_layers(lat, lng, api_key, radius)
        result = measure_roof(dsm_path, mask_path, overhang)
        
        os.unlink(dsm_path)
        os.unlink(mask_path)
        
        if result and result['footprint_sf'] > 1500:  # Found substantial building
            print(f"Address: {address}")
            print(f"Radius used: {radius}m")
            print(f"Buildings in area: {result['buildings_detected']}")
            print(f"\n=== ROOF MEASUREMENT ===")
            print(f"Surface Area: {result['surface_sf']:,} sq ft")
            print(f"Footprint:    {result['footprint_sf']:,} sq ft")
            print(f"Pitch:        {result['pitch_12']}:12")
            return result
    
    print(f"Could not find building at: {address}")
    return None

if __name__ == '__main__':
    main()
