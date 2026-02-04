# Utah County Parcel Data Access Research

**Date:** 2026-02-04  
**Purpose:** Xperience Roofing — accessing property/parcel data for lead generation

---

## Executive Summary

**Utah has excellent free statewide parcel data** through UGRC (Utah Geospatial Resource Center). All four target counties are available with rich tax assessment data including owner info, construction year, and addresses — exactly what's needed for roofing leads.

### Quick Start (Best Option)
```
PostgreSQL Connection (Open SGID):
Host: opensgid.ugrc.utah.gov
Port: 5432
Database: opensgid
Username: agrc
Password: agrc
```

---

## 1. Primary Data Source: Utah SGID (State Geographic Information Datasource)

### Overview
The SGID is Utah's official statewide GIS data repository, established by state law in 1991. Parcel data is aggregated from all 29 counties and available in multiple formats — **completely free**.

**Key Resource:** https://gis.utah.gov/products/sgid/cadastre/parcels/

### Two Parcel Dataset Types

| Type | Contents | Update Frequency |
|------|----------|------------------|
| **Basic Parcels** | Boundary, ID, address, owner type | Monthly (Big 5 counties) |
| **LIR Parcels** (Land Information Records) | Full tax roll data including year built, owner, market value | Annually (tax year end) |

**For Xperience Roofing: Use LIR Parcels** — they contain construction year data.

---

## 2. Data Access Methods

### Option A: Open SGID PostgreSQL Database (RECOMMENDED)
Direct SQL access to all parcel data. Best for bulk queries and automation.

**Connection Info:**
- **Host:** `opensgid.ugrc.utah.gov`
- **Port:** `5432`
- **Database:** `opensgid`
- **Username:** `agrc`
- **Password:** `agrc`

**Sample Query:**
```sql
-- Get all Salt Lake County parcels built before 1990
SELECT parcel_id, parcel_add, parcel_city, built_yr, prop_class, total_mkt_value
FROM cadastre.salt_lake_county_parcels_lir
WHERE built_yr < 1990
  AND prop_class = 'R'  -- Residential
LIMIT 1000;
```

**Python Example:**
```python
import geopandas as gpd
from sqlalchemy import create_engine

url = "postgresql://agrc:agrc@opensgid.ugrc.utah.gov:5432/opensgid"
engine = create_engine(url)

# Query residential properties built before 1985
sql = """
SELECT parcel_id, parcel_add, parcel_city, built_yr, bldg_sqft, total_mkt_value, shape
FROM cadastre.salt_lake_county_parcels_lir
WHERE built_yr < 1985 AND prop_class = 'R'
"""
df = gpd.read_postgis(sql, engine, geom_col="shape")
```

### Option B: ArcGIS REST API (Feature Services)
Query parcels via HTTP REST endpoints. Good for smaller queries or web apps.

**Feature Service URLs:**

| County | Feature Service URL |
|--------|---------------------|
| Salt Lake | `https://services1.arcgis.com/99lidPhWCzftIe9K/ArcGIS/rest/services/Parcels_SaltLake_LIR/FeatureServer/0` |
| Utah | `https://services1.arcgis.com/99lidPhWCzftIe9K/ArcGIS/rest/services/Parcels_Utah_LIR/FeatureServer/0` |
| Davis | `https://services1.arcgis.com/99lidPhWCzftIe9K/ArcGIS/rest/services/Parcels_Davis_LIR/FeatureServer/0` |
| Weber | `https://services1.arcgis.com/99lidPhWCzftIe9K/ArcGIS/rest/services/Parcels_Weber_LIR/FeatureServer/0` |

**Query Example (curl):**
```bash
curl "https://services1.arcgis.com/99lidPhWCzftIe9K/ArcGIS/rest/services/Parcels_SaltLake_LIR/FeatureServer/0/query?where=BUILT_YR<1990&outFields=PARCEL_ADD,BUILT_YR,PROP_CLASS&f=json"
```

**Note:** Max 2000 records per request. Use pagination for bulk downloads.

### Option C: Bulk Download (Shapefile/GeoJSON)
Download entire county datasets from SGID on ArcGIS portal.

**Download Portal:** https://opendata.gis.utah.gov

Search for: `[County Name] Parcels LIR`

Available formats: Shapefile, File Geodatabase, GeoJSON, CSV

---

## 3. Available Fields (LIR Parcels)

These fields are available for all four target counties:

| Field | Type | Description | Roofing Use |
|-------|------|-------------|-------------|
| `PARCEL_ID` | Text | Unique parcel identifier | Join key |
| `PARCEL_ADD` | Text | Street address | **Lead address** |
| `PARCEL_CITY` | Text | City name | Targeting |
| `BUILT_YR` | Integer | Year of construction | **Age targeting** |
| `EFFBUILT_YR` | Integer | Effective year (factors in updates) | Renovation detection |
| `PROP_CLASS` | Text | R=Residential, C=Commercial, etc. | Filter residential |
| `PROP_TYPE` | Text | Single Family, Condo, Townhome, etc. | SFH targeting |
| `BLDG_SQFT` | Integer | Building square footage | Estimate roof size |
| `FLOORS_CNT` | Decimal | Number of floors | Complexity factor |
| `TOTAL_MKT_VALUE` | Decimal | Total market value | Qualify leads |
| `LAND_MKT_VALUE` | Decimal | Land value only | — |
| `PRIMARY_RES` | Text | Y/N - primary residence | Owner-occupied |
| `CONST_MATERIAL` | Text | Construction materials | Roof material hints |
| `SUBDIV_NAME` | Text | Subdivision name | Neighborhood targeting |
| `TAX_DISTRICT` | Text | Tax district code | — |
| `TAXEXEMPT_TYPE` | Text | Exempt status | Filter out govt/church |

### Property Class Codes (Salt Lake County)
- `R` = Residential / Condo
- `C` = Commercial
- `I` = Industrial
- `A` = Agricultural
- `MH` = Multi Housing
- `RE` = Recreational

---

## 4. County-Specific Notes

### Salt Lake County
- **Records:** ~350,000 parcels
- **Last Update:** February 2026
- **Quality:** Excellent — most complete metadata
- **Direct Portal:** https://www.saltlakecounty.gov/assessor/

### Utah County
- **Records:** ~180,000 parcels
- **Last Update:** February 2026
- **Quality:** Excellent
- **Direct Portal:** https://assessor.utahcounty.gov/
- **Note:** Land Records search available at utahcounty.gov

### Davis County
- **Records:** ~120,000 parcels
- **Last Update:** 2025
- **Quality:** Good
- **Direct Portal:** https://www.daviscountyutah.gov/assessor

### Weber County
- **Records:** ~95,000 parcels
- **Last Update:** 2025
- **Quality:** Good
- **Direct Portal:** https://webercountyutah.gov/assessor

---

## 5. Terms of Service & Restrictions

### Open SGID Fair Use Policy
Source: https://gis.utah.gov/documentation/policy/open-sgid/

**Allowed:**
- ✅ Cartography (make maps)
- ✅ Geoprocessing (solve problems)
- ✅ Analysis (spatial queries)
- ✅ Scripting (automation)
- ✅ Exploring (discover data)

**Not Allowed:**
- ❌ Create web/map services FROM Open SGID tables (use their feature services instead)
- ❌ Excessive database calls (be reasonable)
- ❌ Keep connections open for multiple days

**Support Hours:** 6am-7pm MT, Monday-Friday

### Data Disclaimer
- Data is for general purposes, NOT a substitute for official county records
- Parcel boundaries may have gaps/overlaps from digitization
- Values are tax assessment estimates, not precise appraisals
- Updates lag real-world changes by weeks/months

### Commercial Use
**YES — Commercial use is permitted.** This is public government data. No licensing fees.

---

## 6. Cost

| Access Method | Cost |
|---------------|------|
| Open SGID (PostgreSQL) | **FREE** |
| ArcGIS Feature Services | **FREE** |
| Bulk Downloads | **FREE** |
| UGRC API | **FREE** (with API key) |

**No fees for any access method.** This is taxpayer-funded public data.

---

## 7. Recommended Implementation for Xperience

### Phase 1: Quick Win
1. Connect to Open SGID via Python/PostgreSQL
2. Query each county for residential properties built before 1995
3. Export to CSV with: address, city, year_built, sqft, market_value
4. Cross-reference with skip-tracing for owner contact info

### Phase 2: Automated Pipeline
```python
# Pseudocode for daily/weekly refresh
for county in ['salt_lake', 'utah', 'davis', 'weber']:
    query = f"""
    SELECT parcel_add, parcel_city, built_yr, bldg_sqft, total_mkt_value
    FROM cadastre.{county}_county_parcels_lir
    WHERE built_yr < 1995 
      AND prop_class = 'R'
      AND taxexempt_type IS NULL
    """
    leads = pd.read_sql(query, engine)
    # Enrich with skip-tracing
    # Push to CRM
```

### Targeting Criteria for Roofing
- **Built Year:** < 1995 (30+ year old roofs)
- **Property Class:** Residential only
- **Primary Residence:** Y (owner-occupied = decision maker)
- **Market Value:** $200k-$800k (can afford roof)
- **Exclude:** Tax exempt (govt, church, nonprofit)

---

## 8. Additional Resources

- **UGRC Main Site:** https://gis.utah.gov
- **SGID Data Categories:** https://gis.utah.gov/products/sgid/categories/
- **Open SGID GitHub:** https://github.com/agrc/open-sgid
- **UGRC API (Geocoding):** https://developer.mapserv.utah.gov
- **Data Contact:** Sean Fernandez, Cadastral Manager — sfernandez@utah.gov, 801-209-9359

---

## 9. What's NOT in This Data

The parcel data does **NOT** include:
- ❌ Owner names (need skip-tracing service)
- ❌ Owner phone numbers
- ❌ Owner email addresses
- ❌ Roof condition or age
- ❌ Recent permits (separate system)
- ❌ Insurance claims history

**To get owner contact info:** Use a skip-tracing service (Apollo, BeenVerified, PropertyShark, etc.) with the property addresses.

---

*Research completed 2026-02-04 by Claw*
