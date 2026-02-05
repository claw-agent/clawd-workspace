#!/bin/bash
# roof-analyzer.sh — Get roof measurements from Google Solar API
# Usage: ./roof-analyzer.sh <latitude> <longitude>
# Or:    ./roof-analyzer.sh "<address>" (requires geocoding)
#
# XPERIENCE Roofing Lead Gen Tool
# Created: Feb 5, 2026

set -e

API_KEY=$(cat ~/clawd/config/.google-solar-credentials 2>/dev/null)
if [ -z "$API_KEY" ]; then
    echo "Error: No API key found at ~/clawd/config/.google-solar-credentials"
    exit 1
fi

# Constants for roofing calculations
SQM_TO_SQFT=10.764
ROOF_SQUARE=100  # 1 roofing square = 100 sqft

# Check arguments
if [ $# -lt 2 ]; then
    echo "Usage: $0 <latitude> <longitude>"
    echo "       $0 --address \"123 Main St, Salt Lake City, UT\""
    exit 1
fi

LAT="$1"
LNG="$2"

# Make API call
result=$(curl -s "https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=$LAT&location.longitude=$LNG&requiredQuality=HIGH&key=$API_KEY")

# Check for error
if echo "$result" | jq -e '.error' > /dev/null 2>&1; then
    echo "API Error: $(echo "$result" | jq -r '.error.message')"
    exit 1
fi

# Extract data
postal=$(echo "$result" | jq -r '.postalCode')
state=$(echo "$result" | jq -r '.administrativeArea')
imagery=$(echo "$result" | jq -r '.imageryDate | "\(.year)-\(.month)-\(.day)"')
lat_actual=$(echo "$result" | jq -r '.center.latitude')
lng_actual=$(echo "$result" | jq -r '.center.longitude')

roof_sqm=$(echo "$result" | jq -r '.solarPotential.wholeRoofStats.areaMeters2')
ground_sqm=$(echo "$result" | jq -r '.solarPotential.wholeRoofStats.groundAreaMeters2')
segments=$(echo "$result" | jq -r '.solarPotential.roofSegmentStats | length')

# Calculate derived values
roof_sqft=$(echo "$roof_sqm * $SQM_TO_SQFT" | bc -l | xargs printf "%.0f")
roof_squares=$(echo "$roof_sqft / $ROOF_SQUARE" | bc -l | xargs printf "%.1f")
complexity_ratio=$(echo "scale=2; $roof_sqm / $ground_sqm" | bc -l)

# Get pitch statistics
pitches=$(echo "$result" | jq '[.solarPotential.roofSegmentStats[].pitchDegrees]')
min_pitch=$(echo "$pitches" | jq 'min')
max_pitch=$(echo "$pitches" | jq 'max')
avg_pitch=$(echo "$pitches" | jq 'add / length')

# Determine roof complexity
if (( $(echo "$segments > 15" | bc -l) )); then
    complexity="Complex (${segments} segments)"
elif (( $(echo "$segments > 8" | bc -l) )); then
    complexity="Moderate (${segments} segments)"
else
    complexity="Simple (${segments} segments)"
fi

# Output
echo "═══════════════════════════════════════════════════════"
echo "  ROOF ANALYSIS REPORT"
echo "═══════════════════════════════════════════════════════"
echo ""
echo "  📍 Location: ${postal}, ${state}"
echo "  📷 Imagery Date: ${imagery}"
echo "  🎯 Coords: ${lat_actual}, ${lng_actual}"
echo ""
echo "  ┌─────────────────────────────────────────────────┐"
echo "  │  ROOF MEASUREMENTS                              │"
echo "  ├─────────────────────────────────────────────────┤"
printf "  │  Total Roof Area:     %'8d sqft             │\n" "$roof_sqft"
printf "  │  Roofing Squares:     %8s                  │\n" "$roof_squares"
printf "  │  Ground Footprint:    %'8.0f sqft             │\n" "$(echo "$ground_sqm * $SQM_TO_SQFT" | bc -l)"
printf "  │  Complexity Ratio:    %8.2fx                 │\n" "$complexity_ratio"
echo "  └─────────────────────────────────────────────────┘"
echo ""
echo "  ┌─────────────────────────────────────────────────┐"
echo "  │  PITCH ANALYSIS                                 │"
echo "  ├─────────────────────────────────────────────────┤"
printf "  │  Average Pitch:       %8.1f°                  │\n" "$avg_pitch"
printf "  │  Min Pitch:           %8.1f°                  │\n" "$min_pitch"
printf "  │  Max Pitch:           %8.1f°                  │\n" "$max_pitch"
echo "  │  Complexity:          $complexity"
echo "  └─────────────────────────────────────────────────┘"
echo ""

# Pitch category for pricing
if (( $(echo "$avg_pitch < 4" | bc -l) )); then
    pitch_cat="Flat/Low Slope (walkable)"
elif (( $(echo "$avg_pitch < 12" | bc -l) )); then
    pitch_cat="Standard (4/12 - 8/12)"
elif (( $(echo "$avg_pitch < 25" | bc -l) )); then
    pitch_cat="Steep (9/12 - 12/12)"
else
    pitch_cat="Very Steep (harness required)"
fi

echo "  💡 Pitch Category: $pitch_cat"
echo ""

# JSON output option
if [ "$3" == "--json" ]; then
    echo "$result" | jq '{
        postal: .postalCode,
        state: .administrativeArea,
        imagery_date: .imageryDate,
        center: .center,
        roof_sqft: (.solarPotential.wholeRoofStats.areaMeters2 * 10.764 | floor),
        roof_squares: ((.solarPotential.wholeRoofStats.areaMeters2 * 10.764 / 100) | . * 10 | floor / 10),
        ground_sqft: (.solarPotential.wholeRoofStats.groundAreaMeters2 * 10.764 | floor),
        segments: (.solarPotential.roofSegmentStats | length),
        avg_pitch: ([.solarPotential.roofSegmentStats[].pitchDegrees] | add / length),
        segment_details: [.solarPotential.roofSegmentStats[] | {
            pitch: .pitchDegrees,
            azimuth: .azimuthDegrees,
            area_sqft: (.stats.areaMeters2 * 10.764 | floor)
        }]
    }'
fi
