#!/bin/bash
# batch-roof-analysis.sh — Process multiple addresses for XPERIENCE
# Usage: ./batch-roof-analysis.sh addresses.csv output.csv
#
# Input CSV format: address,latitude,longitude
# Output: Full roof analysis with pricing-relevant metrics
#
# Created: Feb 5, 2026

set -e

API_KEY=$(cat ~/clawd/config/.google-solar-credentials 2>/dev/null)
if [ -z "$API_KEY" ]; then
    echo "Error: No API key found"
    exit 1
fi

INPUT="${1:-addresses.csv}"
OUTPUT="${2:-roof-analysis-$(date +%Y%m%d).csv}"

if [ ! -f "$INPUT" ]; then
    echo "Input file not found: $INPUT"
    exit 1
fi

# Write header
echo "address,latitude,longitude,postal,imagery_date,roof_sqft,roof_squares,ground_sqft,complexity_ratio,segments,avg_pitch,min_pitch,max_pitch,pitch_category,status" > "$OUTPUT"

# Process each line
count=0
success=0
failed=0

while IFS=, read -r address lat lng || [ -n "$address" ]; do
    # Skip header
    if [ "$address" = "address" ]; then continue; fi
    
    ((count++)) || true
    echo -n "Processing $count: $address... "
    
    # Make API call
    result=$(curl -s "https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=$lat&location.longitude=$lng&requiredQuality=HIGH&key=$API_KEY")
    
    # Check for error
    if echo "$result" | jq -e '.error' > /dev/null 2>&1; then
        echo "FAILED"
        echo "\"$address\",$lat,$lng,,,,,,,,,,,,error" >> "$OUTPUT"
        ((failed++)) || true
        continue
    fi
    
    # Extract all values
    postal=$(echo "$result" | jq -r '.postalCode // "unknown"')
    imagery=$(echo "$result" | jq -r '.imageryDate | "\(.year)-\(.month)-\(.day)"')
    
    roof_sqm=$(echo "$result" | jq -r '.solarPotential.wholeRoofStats.areaMeters2 // 0')
    ground_sqm=$(echo "$result" | jq -r '.solarPotential.wholeRoofStats.groundAreaMeters2 // 0')
    segments=$(echo "$result" | jq -r '.solarPotential.roofSegmentStats | length')
    
    # Calculate values
    roof_sqft=$(echo "$roof_sqm * 10.764" | bc -l | xargs printf "%.0f")
    roof_squares=$(echo "$roof_sqft / 100" | bc -l | xargs printf "%.1f")
    ground_sqft=$(echo "$ground_sqm * 10.764" | bc -l | xargs printf "%.0f")
    complexity=$(echo "scale=2; $roof_sqm / $ground_sqm" | bc -l 2>/dev/null || echo "1.00")
    
    # Pitch analysis
    avg_pitch=$(echo "$result" | jq '[.solarPotential.roofSegmentStats[].pitchDegrees] | add / length' | xargs printf "%.1f")
    min_pitch=$(echo "$result" | jq '[.solarPotential.roofSegmentStats[].pitchDegrees] | min' | xargs printf "%.1f")
    max_pitch=$(echo "$result" | jq '[.solarPotential.roofSegmentStats[].pitchDegrees] | max' | xargs printf "%.1f")
    
    # Pitch category
    if (( $(echo "$avg_pitch < 4" | bc -l) )); then
        pitch_cat="flat"
    elif (( $(echo "$avg_pitch < 12" | bc -l) )); then
        pitch_cat="standard"
    elif (( $(echo "$avg_pitch < 25" | bc -l) )); then
        pitch_cat="steep"
    else
        pitch_cat="very_steep"
    fi
    
    echo "$roof_sqft sqft, $roof_squares squares, $avg_pitch° pitch"
    echo "\"$address\",$lat,$lng,$postal,$imagery,$roof_sqft,$roof_squares,$ground_sqft,$complexity,$segments,$avg_pitch,$min_pitch,$max_pitch,$pitch_cat,ok" >> "$OUTPUT"
    ((success++)) || true
    
    # Rate limit (be nice to API)
    sleep 0.2
    
done < "$INPUT"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  BATCH COMPLETE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Total: $count | Success: $success | Failed: $failed"
echo "  Output: $OUTPUT"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
