#!/usr/bin/env python3
"""
Precise Roof Measurement using Google Solar DSM + Mask
Matches EagleView accuracy by:
1. Using raw 0.1m resolution DSM data
2. Adding overhang estimation (~18")
3. Calculating true 3D surface area
"""

import sys
import json
import subprocess
import numpy as np
import rasterio
from scipy import ndimage
from scipy.ndimage import binary_dilation
import tempfile
import os

def get_api_key():
    with open(os.path.expanduser('~/clawd/config/.google-solar-credentials')) as f:
        return f.read().strip()

def geocode(address, api_key):
    import urllib.request
    import urllib.parse
    url = f"https://maps.googleapis.com/maps/api/geocode/json?address={urllib.parse.quote(address)}&key={api_key}"
    with urllib.request.urlopen(url) as r:
        data = json.load(r)
        loc = data['results'][0]['geometry']['location']
        return loc['lat'], loc['lng']

def download_layers(lat, lng, api_key, radius=25):
    import urllib.request
    
    # Get layer URLs
    url = f"https://solar.googleapis.com/v1/dataLayers:get?location.latitude={lat}&location.longitude={lng}&radiusMeters={radius}&view=FULL_LAYERS&requiredQuality=HIGH&key={api_key}"
    with urllib.request.urlopen(url) as r:
        layers = json.load(r)
    
    # Download DSM and Mask
    dsm_path = tempfile.mktemp(suffix='.tiff')
    mask_path = tempfile.mktemp(suffix='.tiff')
    
    urllib.request.urlretrieve(f"{layers['dsmUrl']}&key={api_key}", dsm_path)
    urllib.request.urlretrieve(f"{layers['maskUrl']}&key={api_key}", mask_path)
    
    return dsm_path, mask_path

def measure_roof(dsm_path, mask_path, overhang_inches=18):
    """Calculate roof area from DSM and mask, accounting for overhangs."""
    
    # Load mask
    with rasterio.open(mask_path) as mask_src:
        mask = mask_src.read(1)
        
        # Find connected components (separate buildings)
        labeled, num_buildings = ndimage.label(mask > 0)
        
        # Find building closest to center (target)
        center_y, center_x = mask.shape[0] // 2, mask.shape[1] // 2
        min_dist = float('inf')
        target_id = 1
        
        for i in range(1, num_buildings + 1):
            coords = np.where(labeled == i)
            centroid_y, centroid_x = np.mean(coords[0]), np.mean(coords[1])
            dist = np.sqrt((centroid_y - center_y)**2 + (centroid_x - center_x)**2)
            if dist < min_dist:
                min_dist = dist
                target_id = i
        
        target_mask = (labeled == target_id)
    
    # Load DSM
    with rasterio.open(dsm_path) as dsm_src:
        dsm = dsm_src.read(1)
        res = dsm_src.res[0]  # meters per pixel
        
        # Add overhang by dilating mask
        # 1 inch ≈ 0.0254m, at 0.1m resolution: pixels = overhang_m / 0.1
        overhang_m = overhang_inches * 0.0254
        overhang_pixels = int(overhang_m / res)
        
        if overhang_pixels > 0:
            struct = np.ones((overhang_pixels*2+1, overhang_pixels*2+1))
            expanded_mask = binary_dilation(target_mask, structure=struct)
        else:
            expanded_mask = target_mask
        
        # Apply mask to DSM
        roof_dsm = np.where(expanded_mask, dsm, np.nan)
        
        # Calculate gradients (slope)
        gy, gx = np.gradient(roof_dsm, res)
        slope_deg = np.degrees(np.arctan(np.sqrt(gx**2 + gy**2)))
        
        # Filter extreme slopes (edge artifacts)
        reasonable = slope_deg < 60
        
        # Surface area integral
        surface_element = np.sqrt(1 + gx**2 + gy**2)
        surface_filtered = np.where(expanded_mask & reasonable & ~np.isnan(surface_element),
                                    surface_element, 0)
        
        # Calculate areas
        pixel_count = np.sum(expanded_mask & reasonable)
        footprint_sf = pixel_count * (res * res) * 10.7639
        surface_sf = np.sum(surface_filtered) * (res * res) * 10.7639
        
        # Average pitch
        valid_slopes = slope_deg[expanded_mask & reasonable & ~np.isnan(slope_deg)]
        avg_pitch_deg = np.median(valid_slopes)
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
        print("Usage: precise_roof_measure.py 'ADDRESS'")
        sys.exit(1)
    
    address = sys.argv[1]
    overhang = int(sys.argv[2]) if len(sys.argv) > 2 else 18
    
    print(f"Measuring: {address}")
    print(f"Overhang assumption: {overhang}\"")
    print()
    
    api_key = get_api_key()
    lat, lng = geocode(address, api_key)
    print(f"Coordinates: {lat}, {lng}")
    
    dsm_path, mask_path = download_layers(lat, lng, api_key)
    print(f"Downloaded DSM and Mask layers")
    
    result = measure_roof(dsm_path, mask_path, overhang)
    
    print(f"\n=== ROOF MEASUREMENT ===")
    print(f"Surface Area: {result['surface_sf']:,} sq ft")
    print(f"Footprint:    {result['footprint_sf']:,} sq ft") 
    print(f"Pitch:        {result['pitch_12']}:12")
    print(f"Pitch Factor: {result['pitch_factor']}")
    
    # Cleanup
    os.unlink(dsm_path)
    os.unlink(mask_path)
    
    return result

if __name__ == '__main__':
    main()
