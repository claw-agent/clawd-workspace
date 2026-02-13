# Instant Roofer Pricing Database

## Source
- **Website:** https://www.instantroofer.com
- **URL Pattern:** `https://www.instantroofer.com/{state}-roof-replacement-cost/{city}/`
- **Date Scraped:** 2026-02-12
- **Source Last Updated:** 2026-02-09

## Coverage
- **982 cities** across **50 states**
- Data sourced from contractor pricing inputs + AI roof measurements

## Files
| File | Description |
|------|-------------|
| `roofing-prices.json` | Full structured data (all 982 cities) |
| `roofing-prices.csv` | Flat CSV for spreadsheets (983 rows incl. header) |
| `by-state/{state}.json` | Individual state JSON files (50 files) |

## Data Dictionary

### Per City
| Field | Type | Description |
|-------|------|-------------|
| `state` | string | State slug (e.g., "utah") |
| `city` | string | City slug (e.g., "salt-lake-city") |
| `stateDisplay` | string | State display name |
| `cityDisplay` | string | City display name |
| `avgRoofSizeSqft` | int | Average roof size with pitch (sqft) |
| `avgPitch` | string | Average roof pitch (e.g., "6/12") |
| `roofsScanned` | int | Number of roofs scanned by their AI |
| `lastUpdated` | string | Source data last updated date |
| `laborCostRange` | object/null | Labor cost range (low, high, unit=per_sqft) |
| `materials` | object | Material pricing (see below) |

### Per Material
| Field | Type | Description |
|-------|------|-------------|
| `displayName` | string | Material display name |
| `costPerSqft` | float | Cost per square foot |
| `costPerSquare` | int | Cost per roofing square (100 sqft) |

### Material Coverage
| Material | Cities with Data |
|----------|-----------------|
| Asphalt Shingle | 982 (100%) |
| Designer Shingle | 803 (82%) |
| Metal | 644 (66%) |
| Concrete | 119 (12%) |
| Clay Terra Cotta | 99 (10%) |
| Cedar Shingle | 40 (4%) |
| Flat Roof | 0 (0%) |

### Additional Data
- **Labor costs:** Available for 289 cities (29%) — extracted from FAQ sections
- **Pitch data:** Available for all 982 cities
