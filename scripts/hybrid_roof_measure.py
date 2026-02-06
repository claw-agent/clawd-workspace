#!/usr/bin/env python3
"""
Hybrid Roof Measurement - Combines Google Solar API + DSM
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

def get_solar_building_insights(lat, lng, api_key):
    """Get Google Solar API data for building identification and baseline."""
    url = f"https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude={lat}&location.longitude={lng}&key={api_key}"
    with urllib.request.urlopen(url) as r:
        data = json.load(r)
    
    solar = data.get('solarPotential', {})
    whole_roof = solar.get('wholeRoofStats', {})
    segments = solar.get('roofSegmentStats', [])
    
    # Get building center from Solar API (more precise than geocode)
    center = data.get('center', {'latitude': lat, 'longitude': lng})
    
    # Calculate baseline metrics
    area_m2 = whole_roof.get('areaMeters2', 0)
    ground_area_m2 = whole_roof.get('groundAreaMeters2', 0)
    
    # Get predominant pitch from largest segment
    if segments:
        largest = max(segments, key=lambda s: s.get('stats', {}).get('areaMeters2', 0))
        pitch_deg = largest.get('pitchDegrees', 0)
    else:
        pitch_deg = 0
    
    return {
        'center_lat': center['latitude'],
        'center_lng': center['longitude'],
        'solar_area_sf': area_m2 * 10.7639,
        'footprint_sf': ground_area_m2 * 10.7639,
        'pitch_deg': pitch_deg,
        'pitch_12': np.tan(np.radians(pitch_deg)) * 12 if pitch_deg else 0,
        'segment_count': len(segments),
        'bounding_box': data.get('boundingBox', {})
    }

def download_layers(lat, lng, api_key, radius=50):
    url = f"https://solar.googleapis.com/v1/dataLayers:get?location.latitude={lat}&location.longitude={lng}&radiusMeters={radius}&view=FULL_LAYERS&requiredQuality=HIGH&key={api_key}"
    with urllib.request.urlopen(url) as r:
        layers = json.load(r)
    
    dsm_path = tempfile.mktemp(suffix='_dsm.tiff')
    mask_path = tempfile.mktemp(suffix='_mask.tiff')
    
    urllib.request.urlretrieve(f"{layers['dsmUrl']}&key={api_key}", dsm_path)
    urllib.request.urlretrieve(f"{layers['maskUrl']}&key={api_key}", mask_path)
    
    return dsm_path, mask_path

def find_building_by_solar_center(mask_path, solar_center_lat, solar_center_lng, expected_footprint_sf):
    """Find the building that matches the Solar API center point."""
    
    with rasterio.open(mask_path) as src:
        mask = src.read(1)
        transform = src.transform
        res = src.res[0]
        
        labeled, num_buildings = ndimage.label(mask > 0)
        
        if num_buildings == 0:
            return None, mask, 0
        
        # Convert solar center to pixel coordinates
        # Note: This is approximate - would need proper CRS transform for production
        center_y, center_x = mask.shape[0] // 2, mask.shape[1] // 2
        
        # Score buildings by combination of distance AND size match
        best_score = -float('inf')
        best_id = 1
        
        for i in range(1, num_buildings + 1):
            building_mask = (labeled == i)
            pixels = building_mask.sum()
            footprint_sf = pixels * res * res * 10.7639
            
            # Skip tiny structures
            if footprint_sf < 500:
                continue
            
            coords = np.where(building_mask)
            cy, cx = np.mean(coords[0]), np.mean(coords[1])
            dist = np.sqrt((cy - center_y)**2 + (cx - center_x)**2)
            
            # Size match score (how close to expected footprint)
            if expected_footprint_sf > 0:
                size_ratio = min(footprint_sf, expected_footprint_sf) / max(footprint_sf, expected_footprint_sf)
            else:
                size_ratio = 0.5
            
            # Distance score (inverse)
            max_dist = np.sqrt(center_y**2 + center_x**2)
            dist_score = 1 - (dist / max_dist)
            
            # Combined score: weight size match heavily when we have expected footprint
            score = 0.4 * dist_score + 0.6 * size_ratio
            
            if score > best_score:
                best_score = score
                best_id = i
        
        return (labeled == best_id), mask, num_buildings

def measure_roof_dsm(dsm_path, target_mask, res=0.1, overhang_inches=18):
    """Calculate roof surface area from DSM."""
    
    with rasterio.open(dsm_path) as src:
        dsm = src.read(1)
        res = src.res[0]
        
        # Add overhang
        overhang_m = overhang_inches * 0.0254
        overhang_pixels = max(1, int(overhang_m / res))
        
        struct = np.ones((overhang_pixels*2+1, overhang_pixels*2+1))
        expanded_mask = binary_dilation(target_mask, structure=struct)
        
        roof_dsm = np.where(expanded_mask, dsm, np.nan)
        
        # Calculate gradients and surface area
        gy, gx = np.gradient(roof_dsm, res)
        slope_deg = np.degrees(np.arctan(np.sqrt(gx**2 + gy**2)))
        
        # Filter extreme slopes (edge artifacts)
        reasonable = slope_deg < 60
        surface_element = np.sqrt(1 + gx**2 + gy**2)
        surface_filtered = np.where(expanded_mask & reasonable & ~np.isnan(surface_element),
                                    surface_element, 0)
        
        pixel_count = np.sum(expanded_mask & reasonable)
        footprint_sf = pixel_count * (res * res) * 10.7639
        surface_sf = np.sum(surface_filtered) * (res * res) * 10.7639
        
        valid_slopes = slope_deg[expanded_mask & reasonable & ~np.isnan(slope_deg)]
        avg_pitch_deg = np.median(valid_slopes) if len(valid_slopes) > 0 else 0
        
        return {
            'surface_sf': round(surface_sf),
            'footprint_sf': round(footprint_sf),
            'pitch_deg': avg_pitch_deg,
            'pitch_12': round(np.tan(np.radians(avg_pitch_deg)) * 12, 1)
        }

def hybrid_measure(address, overhang_inches=18, verbose=True):
    """
    Hybrid measurement combining Solar API + DSM.
    Returns best estimate of roof area.
    """
    api_key = get_api_key()
    
    # Step 1: Geocode
    lat, lng = geocode(address, api_key)
    if verbose:
        print(f"Address: {address}")
        print(f"Geocode: {lat}, {lng}")
    
    # Step 2: Get Solar API insights (building identification + baseline)
    solar = get_solar_building_insights(lat, lng, api_key)
    if verbose:
        print(f"\n--- Google Solar API ---")
        print(f"Solar Area:    {solar['solar_area_sf']:.0f} sf")
        print(f"Footprint:     {solar['footprint_sf']:.0f} sf")
        print(f"Pitch:         {solar['pitch_12']:.1f}:12")
        print(f"Segments:      {solar['segment_count']}")
    
    # Step 3: Download DSM + Mask
    dsm_path, mask_path = download_layers(lat, lng, api_key, radius=50)
    
    # Step 4: Find correct building using Solar API footprint as guide
    target_mask, full_mask, num_buildings = find_building_by_solar_center(
        mask_path, 
        solar['center_lat'], 
        solar['center_lng'],
        solar['footprint_sf']
    )
    
    if target_mask is None:
        if verbose:
            print("ERROR: Could not identify building")
        return None
    
    # Step 5: Calculate DSM-based surface area
    dsm_result = measure_roof_dsm(dsm_path, target_mask, overhang_inches=overhang_inches)
    
    if verbose:
        print(f"\n--- DSM Calculation ---")
        print(f"Surface Area:  {dsm_result['surface_sf']:,} sf")
        print(f"Footprint:     {dsm_result['footprint_sf']:,} sf")
        print(f"Pitch:         {dsm_result['pitch_12']}:12")
    
    # Step 6: Validate and choose best estimate
    # If DSM and Solar differ by >50%, something's wrong
    ratio = dsm_result['surface_sf'] / solar['solar_area_sf'] if solar['solar_area_sf'] > 0 else 1
    
    if verbose:
        print(f"\n--- Validation ---")
        print(f"DSM/Solar ratio: {ratio:.2f}")
        
        if 0.8 <= ratio <= 1.3:
            print("✅ Reasonable agreement")
        else:
            print("⚠️ Large discrepancy - may have wrong building")
    
    # Cleanup
    os.unlink(dsm_path)
    os.unlink(mask_path)
    
    # Return hybrid result
    return {
        'address': address,
        'surface_sf': dsm_result['surface_sf'],  # DSM is more accurate
        'footprint_sf': dsm_result['footprint_sf'],
        'pitch_12': dsm_result['pitch_12'],
        'solar_area_sf': round(solar['solar_area_sf']),
        'confidence': 'high' if 0.8 <= ratio <= 1.3 else 'low',
        'buildings_in_area': num_buildings
    }

def main():
    if len(sys.argv) < 2:
        print("Usage: hybrid_roof_measure.py 'ADDRESS' [OVERHANG_INCHES]")
        sys.exit(1)
    
    address = sys.argv[1]
    overhang = int(sys.argv[2]) if len(sys.argv) > 2 else 18
    
    result = hybrid_measure(address, overhang)
    
    if result:
        print(f"\n{'='*50}")
        print(f"FINAL ESTIMATE: {result['surface_sf']:,} sq ft")
        print(f"Confidence: {result['confidence'].upper()}")
        print(f"{'='*50}")

if __name__ == '__main__':
    main()
