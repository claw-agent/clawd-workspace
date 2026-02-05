#!/bin/bash
# Enrich a lead with owner name + roof data
# Usage: ./enrich-lead.sh "parcel_id|address|city|year|sqft|value"

IFS='|' read -r PARCEL_ID ADDRESS CITY YEAR SQFT VALUE <<< "$1"

# Convert parcel ID: 28072260110000 -> 28-07-226-011-0000
FORMATTED_PARCEL=$(echo "$PARCEL_ID" | sed 's/\(..\)\(..\)\(...\)\(...\)\(....\)/\1-\2-\3-\4-\5/')

API_KEY=$(cat ~/clawd/config/.google-solar-credentials)

# Get owner from county assessor
OWNER_DATA=$(curl -s "https://apps.saltlakecounty.gov/assessor/new/valuationInfoExpanded.cfm?parcel_id=$FORMATTED_PARCEL" 2>/dev/null)
OWNER=$(echo "$OWNER_DATA" | grep -o 'Owner </td><td[^>]*>[^<]*' | sed 's/Owner <\/td><td[^>]*> *//' | tr -d '\n' | xargs)

if [ -z "$OWNER" ]; then
    OWNER="(lookup failed)"
fi

# Get roof data from Solar API
FULL_ADDR="$ADDRESS, $CITY, UT"
GEO=$(curl -s "https://maps.googleapis.com/maps/api/geocode/json?address=$(echo "$FULL_ADDR" | sed 's/ /%20/g')&key=$API_KEY" 2>/dev/null)
LAT=$(echo "$GEO" | jq -r '.results[0].geometry.location.lat // empty')
LNG=$(echo "$GEO" | jq -r '.results[0].geometry.location.lng // empty')

ROOF_SQFT="N/A"
PITCH="N/A"
if [ -n "$LAT" ] && [ -n "$LNG" ]; then
    SOLAR=$(curl -s "https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=$LAT&location.longitude=$LNG&key=$API_KEY" 2>/dev/null)
    ROOF_M2=$(echo "$SOLAR" | jq -r '.solarPotential.wholeRoofStats.areaMeters2 // empty')
    if [ -n "$ROOF_M2" ]; then
        ROOF_SQFT=$(echo "$ROOF_M2 * 10.7639" | bc | cut -d. -f1)
        # Get dominant pitch
        PITCH=$(echo "$SOLAR" | jq -r '[.solarPotential.roofSegmentStats[].pitchDegrees] | add / length | floor')
        PITCH="${PITCH}°"
    fi
fi

echo "$ADDRESS|$CITY|$YEAR|$SQFT|$VALUE|$OWNER|$ROOF_SQFT|$PITCH"
