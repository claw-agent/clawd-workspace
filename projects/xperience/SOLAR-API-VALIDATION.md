# Google Solar API Validation Results
*Testing completed Feb 5, 2026 @ 1:05 AM*

## Summary

✅ **API VALIDATED** — Works perfectly across Salt Lake County

**Key findings:**
- 100% success rate (8/8 addresses)
- Imagery dates: 2017-2022 (varies by area)
- Coverage: All tested ZIP codes have data
- Response time: ~200-500ms per request

---

## Test Results

| Location | Roof sqft | Squares | Pitch | Category | Notes |
|----------|-----------|---------|-------|----------|-------|
| Downtown SLC | 14,377 | 143.8 | 18.4° | steep | Commercial, 36 segments |
| Sugar House | 8,930 | 89.3 | 3.2° | flat | Large flat roof |
| Murray | 1,058 | 10.6 | 7.0° | standard | Small residential |
| Sandy | 1,881 | 18.8 | 18.4° | steep | Typical home |
| Marmalade | 10,704 | 107.0 | 14.7° | steep | Older imagery (2017) |
| Draper | 6,802 | 68.0 | 20.5° | steep | Larger home |
| Millcreek | 1,636 | 16.4 | 38.0° | very steep | Steep hillside |
| Holladay | 445 | 4.5 | 37.5° | very steep | Small structure |

---

## Scripts Created

### 1. Single Address Analysis
```bash
~/clawd/projects/xperience/scripts/roof-analyzer.sh <lat> <lng>
```
Returns formatted report with:
- Roof area (sqft and squares)
- Pitch analysis (min/avg/max)
- Complexity assessment
- Pitch category for pricing

### 2. Batch Processing
```bash
~/clawd/projects/xperience/scripts/batch-roof-analysis.sh input.csv output.csv
```
Input format: `address,latitude,longitude`
Output includes all metrics needed for quote generation.

---

## Cost Analysis

| Monthly Volume | API Cost | Per-Roof Cost |
|----------------|----------|---------------|
| 1,000 roofs | $0 | FREE |
| 5,000 roofs | $0 | FREE |
| 10,000 roofs | $0 | FREE |
| 15,000 roofs | $50 | $0.01 |
| 50,000 roofs | $400 | $0.008 |

**Compare to EagleView:** $50-100/roof
**Savings:** 1000-5000x cheaper

---

## Pitch Category → Pricing Multiplier

Based on industry standards:

| Category | Pitch Range | Typical Multiplier |
|----------|-------------|-------------------|
| flat | 0-4° | 1.0x (base) |
| standard | 4-12° | 1.0-1.1x |
| steep | 12-25° | 1.15-1.25x |
| very_steep | 25°+ | 1.35-1.5x |

*Exact multipliers should come from XPERIENCE's actual pricing formula*

---

## Next Steps

1. ✅ API validated and working
2. ⏳ Get XPERIENCE pricing formula (needed for quote generation)
3. ⏳ Integrate with Utah SGID for home age/sqft data
4. ⏳ Build full estimator combining all data sources

---

## API Reference

**Endpoint:** `https://solar.googleapis.com/v1/buildingInsights:findClosest`

**Key parameters:**
- `location.latitude` / `location.longitude`
- `requiredQuality=HIGH` (use HIGH for best data)
- `key=<API_KEY>`

**Response includes:**
- `solarPotential.wholeRoofStats.areaMeters2` — total roof area
- `solarPotential.roofSegmentStats[]` — individual roof planes
- Each segment has: `pitchDegrees`, `azimuthDegrees`, `stats.areaMeters2`

**Credentials:** `~/clawd/config/.google-solar-credentials`
