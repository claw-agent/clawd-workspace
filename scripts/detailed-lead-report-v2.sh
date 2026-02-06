#!/bin/bash
# Generate detailed lead report with roof pitch (X:12 format)

API_KEY=$(cat ~/clawd/config/.google-solar-credentials)
OUTPUT="$HOME/clawd/research/xperience/detailed-leads-v2.typ"

# Function to convert degrees to roof pitch (X:12)
degrees_to_pitch() {
    local deg=$1
    # pitch = tan(degrees) * 12
    echo "$deg" | awk '{
        rad = $1 * 3.14159265359 / 180
        pitch = sin(rad) / cos(rad) * 12
        printf "%.1f:12", pitch
    }'
}

cat > "$OUTPUT" << 'HEADER'
#set page(margin: 0.5in, paper: "us-letter")
#set text(font: "Helvetica", size: 9pt)

#align(center)[
  #text(size: 18pt, weight: "bold")[XPERIENCE Roofing — Lead Report]
  #v(0.3em)
  #text(size: 11pt, fill: gray)[Salt Lake County • Generated 2026-02-05 • Roof Pitch Format]
]

#v(1em)
HEADER

# Process leads with full detail
head -20 /tmp/leads_raw.txt | while IFS='|' read -r PARCEL_ID ADDRESS CITY YEAR SQFT VALUE; do
    FULL_ADDR="$ADDRESS, $CITY, UT"
    
    # Get owner
    FORMATTED_PARCEL=$(echo "$PARCEL_ID" | sed 's/\(..\)\(..\)\(...\)\(...\)\(....\)/\1-\2-\3-\4-\5/')
    OWNER_DATA=$(curl -s "https://apps.saltlakecounty.gov/assessor/new/valuationInfoExpanded.cfm?parcel_id=$FORMATTED_PARCEL" 2>/dev/null)
    OWNER=$(echo "$OWNER_DATA" | grep -o 'Owner </td><td[^>]*>[^<]*' | sed 's/Owner <\/td><td[^>]*> *//' | tr -d '\n' | xargs | cut -c1-30)
    [ -z "$OWNER" ] && OWNER="(lookup pending)"
    
    # Get solar data
    GEO=$(curl -s "https://maps.googleapis.com/maps/api/geocode/json?address=$(echo "$FULL_ADDR" | sed 's/ /%20/g')&key=$API_KEY" 2>/dev/null)
    LAT=$(echo "$GEO" | jq -r '.results[0].geometry.location.lat // empty')
    LNG=$(echo "$GEO" | jq -r '.results[0].geometry.location.lng // empty')
    
    if [ -n "$LAT" ] && [ -n "$LNG" ]; then
        SOLAR=$(curl -s "https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=$LAT&location.longitude=$LNG&key=$API_KEY" 2>/dev/null)
        TOTAL_ROOF=$(echo "$SOLAR" | jq -r '.solarPotential.wholeRoofStats.areaMeters2 * 10.7639 | floor')
        
        # Get primary pitch (weighted by area)
        PRIMARY_PITCH_DEG=$(echo "$SOLAR" | jq -r '
            .solarPotential.roofSegmentStats 
            | sort_by(-.stats.areaMeters2) 
            | .[0].pitchDegrees // 0
        ')
        PRIMARY_PITCH=$(degrees_to_pitch "$PRIMARY_PITCH_DEG")
        
        # Get all segments with pitch in X:12 format
        SEGMENTS=""
        while IFS='|' read -r AREA PITCH_DEG; do
            if [ -n "$AREA" ] && [ "$AREA" != "null" ]; then
                PITCH_12=$(degrees_to_pitch "$PITCH_DEG")
                SEGMENTS="$SEGMENTS    [${AREA} sf @ ${PITCH_12}],"$'\n'
            fi
        done < <(echo "$SOLAR" | jq -r '.solarPotential.roofSegmentStats | to_entries[] | "\(.value.stats.areaMeters2 * 10.7639 | floor)|\(.value.pitchDegrees)"' | head -8)
        
        # Write to typst
        cat >> "$OUTPUT" << EOF
#box(stroke: 0.5pt + gray, radius: 4pt, inset: 8pt, width: 100%)[
  #text(weight: "bold", size: 11pt)[$ADDRESS, $CITY]
  #h(1fr)
  #text(size: 9pt, fill: gray)[Built $YEAR • \$$((VALUE/1000))K value]
  
  #v(0.3em)
  #text(size: 9pt)[*Owner:* $OWNER #h(1.5em) *Home:* ${SQFT} sf #h(1.5em) *Total Roof:* $TOTAL_ROOF sf #h(1.5em) *Primary Pitch:* $PRIMARY_PITCH]
  
  #v(0.5em)
  #text(size: 8pt, weight: "bold")[Segments:]
  #table(
    columns: (1fr, 1fr, 1fr, 1fr),
    stroke: 0.3pt + gray,
    align: center,
$SEGMENTS  )
]

#v(0.5em)
EOF
        echo "✓ $ADDRESS" >&2
    else
        echo "✗ $ADDRESS (no geocode)" >&2
    fi
    
    sleep 0.3
done

echo "" >> "$OUTPUT"
echo '#align(center)[#text(size: 8pt, fill: gray)[Data: Utah SGID • SL County Assessor • Google Solar API • Pitch in X:12 format]]' >> "$OUTPUT"

# Compile
typst compile "$OUTPUT" "${OUTPUT%.typ}.pdf" 2>/dev/null
echo "Done: ${OUTPUT%.typ}.pdf"
