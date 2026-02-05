#!/bin/bash
# roof-estimate.sh — Get roof measurements from Google Solar API
# Usage: ./roof-estimate.sh <address>
# Example: ./roof-estimate.sh "123 Main St, Salt Lake City, UT"

set -e

ADDRESS="$1"
if [ -z "$ADDRESS" ]; then
    echo "Usage: $0 <address>"
    echo "Example: $0 \"123 Main St, Salt Lake City, UT\""
    exit 1
fi

API_KEY=$(cat ~/clawd/config/.google-solar-credentials)

# Geocode address to lat/lng
GEO=$(curl -s "https://maps.googleapis.com/maps/api/geocode/json?address=$(echo "$ADDRESS" | sed 's/ /%20/g')&key=$API_KEY")
LAT=$(echo "$GEO" | jq -r '.results[0].geometry.location.lat')
LNG=$(echo "$GEO" | jq -r '.results[0].geometry.location.lng')

if [ "$LAT" == "null" ] || [ -z "$LAT" ]; then
    echo "❌ Could not geocode address: $ADDRESS"
    exit 1
fi

echo "📍 Address: $ADDRESS"
echo "📐 Coordinates: $LAT, $LNG"
echo ""

# Get building insights
SOLAR=$(curl -s "https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=$LAT&location.longitude=$LNG&key=$API_KEY")

# Check for error
ERROR=$(echo "$SOLAR" | jq -r '.error.message // empty')
if [ -n "$ERROR" ]; then
    echo "❌ API Error: $ERROR"
    exit 1
fi

# Extract metrics
ROOF_AREA_M2=$(echo "$SOLAR" | jq -r '.solarPotential.wholeRoofStats.areaMeters2')
GROUND_AREA_M2=$(echo "$SOLAR" | jq -r '.solarPotential.wholeRoofStats.groundAreaMeters2')
SEGMENTS=$(echo "$SOLAR" | jq -r '.solarPotential.roofSegmentStats | length')
IMAGERY_DATE=$(echo "$SOLAR" | jq -r '"\(.imageryDate.year)-\(.imageryDate.month)-\(.imageryDate.day)"')

# Convert to sq ft
ROOF_AREA_SQFT=$(echo "$ROOF_AREA_M2 * 10.7639" | bc)
GROUND_AREA_SQFT=$(echo "$GROUND_AREA_M2 * 10.7639" | bc)

echo "🏠 ROOF MEASUREMENTS"
echo "===================="
echo "Total Roof Area:    ${ROOF_AREA_SQFT%.*} sq ft ($ROOF_AREA_M2 m²)"
echo "Ground Footprint:   ${GROUND_AREA_SQFT%.*} sq ft ($GROUND_AREA_M2 m²)"
echo "Roof Segments:      $SEGMENTS"
echo "Imagery Date:       $IMAGERY_DATE"
echo ""

# Show segment details
echo "📊 SEGMENT DETAILS"
echo "===================="
echo "$SOLAR" | jq -r '.solarPotential.roofSegmentStats[] | "Segment: \(.stats.areaMeters2 | . * 10.7639 | floor) sq ft, Pitch: \(.pitchDegrees | . * 10 | floor / 10)°, Azimuth: \(.azimuthDegrees | floor)°"'

# Save full JSON for reference
echo ""
echo "$SOLAR" > /tmp/last-roof-estimate.json
echo "💾 Full JSON saved to /tmp/last-roof-estimate.json"
