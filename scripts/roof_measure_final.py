#!/usr/bin/env python3
"""
Final Roof Measurement Tool
Combines Google Solar API + DSM with optional size-matching
Target: <3% error vs EagleView
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

def download_layers(lat, lng, api_key, radius=50):
    url = f"https://solar.googleapis.com/v1/dataLayers:get?location.latitude={lat}&location.longitude={lng}&radiusMeters={radius}&view=FULL_LAYERS&requiredQuality=HIGH&key={api_key}"
    with urllib.request.urlopen(url) as r:
        layers = json.load(r)
    
    dsm_path = tempfile.mktemp(suffix='_dsm.tiff')
    mask_path = tempfile.mktemp(suffix='_mask.tiff')
    
    urllib.request.urlretrieve(f"{layers['dsmUrl']}&key={api_key}", dsm_path)
    urllib.request.urlretrieve(f"{layers['maskUrl']}&key={api_key}", mask_path)
    
    return dsm_path, mask_path

def calculate_building_roof(dsm, target_mask, res, overhang_inches=18):
    """Calculate roof surface area for a single building."""
    
    # Add overhang
    overhang_m = overhang_inches * 0.0254
    overhang_pixels = max(1, int(overhang_m / res))
    struct = np.ones((overhang_pixels*2+1, overhang_pixels*2+1))
    expanded = binary_dilation(target_mask, structure=struct)
    
    # Calculate surface area
    roof_dsm = np.where(expanded, dsm, np.nan)
    gy, gx = np.gradient(roof_dsm, res)
    slope_deg = np.degrees(np.arctan(np.sqrt(gx**2 + gy**2)))
    
    reasonable = slope_deg < 60
    surface_element = np.sqrt(1 + gx**2 + gy**2)
    surface_filtered = np.where(expanded & reasonable & ~np.isnan(surface_element),
                                surface_element, 0)
    
    pixel_count = np.sum(expanded & reasonable)
    footprint_sf = pixel_count * (res * res) * 10.7639
    surface_sf = np.sum(surface_filtered) * (res * res) * 10.7639
    
    valid_slopes = slope_deg[expanded & reasonable & ~np.isnan(slope_deg)]
    pitch_12 = np.tan(np.radians(np.median(valid_slopes))) * 12 if len(valid_slopes) > 0 else 0
    
    return {
        'surface_sf': surface_sf,
        'footprint_sf': footprint_sf,
        'pitch_12': pitch_12
    }

def measure_roof(address, expected_roof_sf=None, overhang_inches=18, verbose=True):
    """
    Measure roof area using hybrid Google Solar + DSM approach.
    
    Args:
        address: Street address
        expected_roof_sf: Expected roof size (from property records) - improves building selection
        overhang_inches: Overhang assumption (default 18")
        verbose: Print details
    """
    api_key = get_api_key()
    lat, lng = geocode(address, api_key)
    
    if verbose:
        print(f"Address: {address}")
        print(f"Coords: {lat:.6f}, {lng:.6f}")
        if expected_roof_sf:
            print(f"Expected size: ~{expected_roof_sf:,} sf")
    
    # Download layers
    dsm_path, mask_path = download_layers(lat, lng, api_key)
    
    with rasterio.open(mask_path) as src:
        mask = src.read(1)
        res = src.res[0]
        labeled, num_buildings = ndimage.label(mask > 0)
    
    with rasterio.open(dsm_path) as src:
        dsm = src.read(1)
    
    if verbose:
        print(f"Buildings detected: {num_buildings}")
    
    # Calculate roof area for each building
    buildings = []
    for i in range(1, num_buildings + 1):
        target_mask = (labeled == i)
        footprint_pixels = target_mask.sum()
        footprint_sf = footprint_pixels * res * res * 10.7639
        
        if footprint_sf < 800:  # Skip small structures
            continue
        
        result = calculate_building_roof(dsm, target_mask, res, overhang_inches)
        
        # Distance to center
        coords = np.where(target_mask)
        center_y, center_x = mask.shape[0] // 2, mask.shape[1] // 2
        cy, cx = np.mean(coords[0]), np.mean(coords[1])
        dist = np.sqrt((cy - center_y)**2 + (cx - center_x)**2)
        
        buildings.append({
            'id': i,
            'surface_sf': result['surface_sf'],
            'footprint_sf': result['footprint_sf'],
            'pitch_12': result['pitch_12'],
            'dist_to_center': dist
        })
    
    if not buildings:
        if verbose:
            print("ERROR: No buildings found")
        return None
    
    # Select best building
    if expected_roof_sf:
        # Size-matching mode (most accurate)
        best = min(buildings, key=lambda b: abs(b['surface_sf'] - expected_roof_sf))
        method = "size-match"
    else:
        # Centroid mode (fallback)
        best = min(buildings, key=lambda b: b['dist_to_center'])
        method = "centroid"
    
    # Cleanup
    os.unlink(dsm_path)
    os.unlink(mask_path)
    
    if verbose:
        print(f"\nSelected: Building {best['id']} (method: {method})")
        print(f"\n{'='*40}")
        print(f"ROOF AREA:  {best['surface_sf']:,.0f} sq ft")
        print(f"FOOTPRINT:  {best['footprint_sf']:,.0f} sq ft")
        print(f"PITCH:      {best['pitch_12']:.1f}:12")
        print(f"{'='*40}")
    
    return {
        'surface_sf': round(best['surface_sf']),
        'footprint_sf': round(best['footprint_sf']),
        'pitch_12': round(best['pitch_12'], 1),
        'method': method,
        'building_id': best['id'],
        'buildings_in_area': num_buildings
    }

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: roof_measure_final.py 'ADDRESS' [EXPECTED_ROOF_SF]")
        sys.exit(1)
    
    address = sys.argv[1]
    expected = int(sys.argv[2]) if len(sys.argv) > 2 else None
    
    measure_roof(address, expected_roof_sf=expected)
