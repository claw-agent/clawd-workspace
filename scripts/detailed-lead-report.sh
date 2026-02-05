#!/bin/bash
# Generate detailed lead report with all roof segments

API_KEY=$(cat ~/clawd/config/.google-solar-credentials)
OUTPUT="$HOME/clawd/research/xperience/detailed-leads.typ"

cat > "$OUTPUT" << 'HEADER'
#set page(margin: 0.5in, paper: "us-letter")
#set text(font: "Helvetica", size: 9pt)

#align(center)[
  #text(size: 18pt, weight: "bold")[XPERIENCE Roofing — Detailed Lead Report]
  #v(0.3em)
  #text(size: 11pt, fill: gray)[Salt Lake County • Generated 2026-02-04 • Full Segment Data]
]

#v(1em)
HEADER

# Process first 10 leads with full detail
head -10 /tmp/leads_raw.txt | while IFS='|' read -r PARCEL_ID ADDRESS CITY YEAR SQFT VALUE; do
    FULL_ADDR="$ADDRESS, $CITY, UT"
    
    # Get owner
    FORMATTED_PARCEL=$(echo "$PARCEL_ID" | sed 's/\(..\)\(..\)\(...\)\(...\)\(....\)/\1-\2-\3-\4-\5/')
    OWNER_DATA=$(curl -s "https://apps.saltlakecounty.gov/assessor/new/valuationInfoExpanded.cfm?parcel_id=$FORMATTED_PARCEL" 2>/dev/null)
    OWNER=$(echo "$OWNER_DATA" | grep -o 'Owner </td><td[^>]*>[^<]*' | sed 's/Owner <\/td><td[^>]*> *//' | tr -d '\n' | xargs | cut -c1-30)
    
    # Get solar data
    GEO=$(curl -s "https://maps.googleapis.com/maps/api/geocode/json?address=$(echo "$FULL_ADDR" | sed 's/ /%20/g')&key=$API_KEY" 2>/dev/null)
    LAT=$(echo "$GEO" | jq -r '.results[0].geometry.location.lat // empty')
    LNG=$(echo "$GEO" | jq -r '.results[0].geometry.location.lng // empty')
    
    if [ -n "$LAT" ] && [ -n "$LNG" ]; then
        SOLAR=$(curl -s "https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=$LAT&location.longitude=$LNG&key=$API_KEY" 2>/dev/null)
        TOTAL_ROOF=$(echo "$SOLAR" | jq -r '.solarPotential.wholeRoofStats.areaMeters2 * 10.7639 | floor')
        
        # Get segments
        SEGMENTS=$(echo "$SOLAR" | jq -r '.solarPotential.roofSegmentStats | to_entries[] | "\(.value.stats.areaMeters2 * 10.7639 | floor)|\(.value.pitchDegrees | . * 10 | floor / 10)"')
        
        # Write to typst
        cat >> "$OUTPUT" << EOF
#box(stroke: 0.5pt + gray, radius: 4pt, inset: 8pt, width: 100%)[
  #text(weight: "bold", size: 11pt)[$ADDRESS, $CITY]
  #h(1fr)
  #text(size: 9pt, fill: gray)[Built $YEAR • \$$((VALUE/1000))K value]
  
  #v(0.3em)
  #text(size: 9pt)[*Owner:* $OWNER #h(2em) *Home:* ${SQFT} sq ft #h(2em) *Total Roof:* $TOTAL_ROOF sq ft]
  
  #v(0.5em)
  #text(size: 9pt, weight: "bold")[Roof Segments:]
  #v(0.2em)
  #table(
    columns: (1fr, 1fr, 1fr, 1fr, 1fr),
    stroke: 0.3pt + gray,
    align: center,
EOF
        
        # Add segment data
        SEG_NUM=1
        echo "$SEGMENTS" | while IFS='|' read -r AREA PITCH; do
            if [ $SEG_NUM -le 10 ]; then
                echo "    [Seg $SEG_NUM: ${AREA} sf @ ${PITCH}°]," >> "$OUTPUT"
            fi
            SEG_NUM=$((SEG_NUM + 1))
        done
        
        echo "  )" >> "$OUTPUT"
        echo "]" >> "$OUTPUT"
        echo "" >> "$OUTPUT"
        echo "#v(0.5em)" >> "$OUTPUT"
    fi
    
    sleep 0.3
done

echo "" >> "$OUTPUT"
echo '#align(center)[#text(size: 8pt, fill: gray)[Data: Utah SGID • SL County Assessor • Google Solar API]]' >> "$OUTPUT"

# Compile
typst compile "$OUTPUT" "${OUTPUT%.typ}.pdf"
echo "Done: ${OUTPUT%.typ}.pdf"
