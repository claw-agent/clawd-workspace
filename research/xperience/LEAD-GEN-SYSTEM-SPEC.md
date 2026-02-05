# XPERIENCE Roofing — Automated Lead Generation System
*Technical Specification v0.1 — Feb 4, 2026*

> **Working Document** — This is our technical planning area for the automated lead gen pipeline.
> Parts 1-5 (marketing, social, SEO, ads) are in the master brief. This focuses on the technical build.

---

## Executive Summary

Build an automated system that:
1. **Identifies** older homes likely needing roof work (via Utah parcel data)
2. **Enriches** property records with owner contact info (skip tracing)
3. **Enables** targeted outreach (email, phone, mail)

**Out of scope:** Aerial roof analysis (XPERIENCE building internally with Google Earth/Street View)

---

## 1. Data Acquisition: Utah Open SGID

### What We Have Access To (FREE)

Utah's Open SGID is a **public PostGIS database** containing all state parcel data.

```
Host: opensgid.ugrc.utah.gov
Port: 5432
Database: opensgid
Username: agrc
Password: agrc
```

### Key Data Points Available

| Field | Description | Use Case |
|-------|-------------|----------|
| `parcel_add` | Property address | Target address, skip trace input |
| `parcel_city` | City | Geographic filtering |
| `built_yr` | Construction year | Age filtering (15+ years = target) |
| `primary_res` | Primary residence flag | Filter to residential only |
| `prop_class` | Property classification | Verify residential |
| `parcel_id` | Unique identifier | Deduplication |
| `total_mkt_value` | Market value | Prioritize high-value homes |
| `bldg_sqft` | Building size | Additional filtering |

**Note:** Owner names are NOT in the parcel data. The skip tracing step handles owner identification — you provide the address, they return the owner + contact info.

### ✅ VERIFIED: Sample Query (Feb 4, 2026)

```sql
SELECT 
    parcel_id,
    parcel_add,
    parcel_city,
    built_yr,
    primary_res,
    total_mkt_value,
    bldg_sqft
FROM cadastre.salt_lake_county_parcels_lir
WHERE 
    built_yr <= 2011  -- 15+ years old
    AND built_yr > 1900
    AND primary_res = 'Y'
ORDER BY built_yr ASC
LIMIT 1000;
```

### 📊 Live Data Stats (Salt Lake County)

| Metric | Value |
|--------|-------|
| Homes 15+ years old | **271,560** |
| Data freshness | Updated regularly |
| Access | FREE, public |

### Integration Options

1. **Direct SQL** — Python + psycopg2/asyncpg
2. **GeoPandas** — For geographic filtering (draw on map)
3. **REST API** — UGRC offers ArcGIS REST endpoints

### ✅ Status: Ready to Use
No signup required. Public access. Zero cost.

---

## 2. Skip Tracing / Contact Enrichment

### The Problem
Parcel data gives us: property address + owner name
We need: phone number + email address

### Option A: PropStream (RECOMMENDED FOR MVP)

**Why PropStream:**
- Built specifically for real estate
- Skip tracing included FREE on Pro/Elite plans
- DNC flagging + litigator scrubbing included
- 7-day free trial to test
- No API (manual export), but good for initial validation

**Pricing:**
| Plan | Monthly | Skip Tracing | Monthly Saves |
|------|---------|--------------|---------------|
| Essentials | ~$99 | $0.12/each | 25,000 |
| Pro | ~$149 | FREE | 50,000 |
| Elite | ~$199 | FREE | 100,000 |

**Workflow:**
1. Export target addresses from Open SGID
2. Import into PropStream
3. Run skip trace (bulk)
4. Export enriched data with phone/email
5. Push to outreach system

**Pros:** Cheapest path to validated data, DNC compliance built-in
**Cons:** Manual process, no API for full automation

---

### Option B: BatchData (RECOMMENDED FOR SCALE)

**Why BatchData:**
- Full API access
- Built for automation/integration
- Property data + skip tracing in one platform
- Has specific roofing industry solutions

**Pricing (Contact Enrichment add-on):**
| Tier | Monthly | Records |
|------|---------|---------|
| Lite | $500 | Low volume |
| Growth | $2,000 | Medium |
| Professional | $5,000 | High |

**API Endpoints:**
- Property Search
- Property Lookup
- Contact Enrichment (skip trace)
- Phone Number Verification

**Pros:** Full automation, API-first, scales well
**Cons:** Higher cost, may be overkill for MVP

---

### Option C: Pay-Per-Record Services

For lower volume or testing:

| Service | Cost/Record | Notes |
|---------|-------------|-------|
| SkipGenie | ~$0.10-0.15 | Real estate focused |
| REISkip | ~$0.12-0.18 | Popular with investors |
| BatchSkipTracing | ~$0.15-0.25 | Good accuracy |

---

### ❌ NOT Recommended

**TruePeopleSearch / WhitePages / etc.**
- ToS prohibits commercial use
- Heavy bot detection (captcha walls)
- Legal risk for business use
- Data quality inconsistent

**Apollo.io**
- Great for B2B contacts
- Poor for residential homeowners
- Wrong dataset for this use case

---

### Recommendation

**Phase 1 (MVP):** PropStream Pro ($149/mo)
- Use free trial to validate approach
- Manual but functional
- DNC compliance built-in
- 50,000 saves/month is plenty

**Phase 2 (Scale):** BatchData API
- When ready to fully automate
- Build proper pipeline with API integration
- Higher volume, lower per-record cost at scale

---

## 3. System Architecture

### High-Level Flow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   OPEN SGID     │────▶│  SKIP TRACING   │────▶│    OUTREACH     │
│   (Parcel DB)   │     │  (PropStream/   │     │  (Email/Phone/  │
│                 │     │   BatchData)    │     │    Mail)        │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       │                       │
        ▼                       ▼                       ▼
   Filter by:              Enrich with:           Channels:
   - Age (15+ yrs)         - Phone numbers        - Email campaigns
   - Location              - Email addresses      - Manual calls
   - Property type         - DNC status           - Direct mail
```

### Detailed Components

#### 3.1 Data Extraction Module

**Input:** Target criteria (zip codes, age range, property type)
**Output:** CSV of target properties

```python
# Pseudocode
def extract_targets(zip_codes: list, min_age: int = 15):
    query = f"""
        SELECT owner_name, physical_addr, physical_city, 
               physical_zip, year_built
        FROM cadastre.parcels_utah
        WHERE property_class ILIKE '%residential%'
        AND year_built <= {current_year - min_age}
        AND physical_zip IN ({zip_codes})
    """
    return execute_query(query)
```

**Deduplication:** By parcel_id and owner_name
**Validation:** Address format, year_built sanity check

---

#### 3.2 Enrichment Module

**Input:** Property list (owner name + address)
**Output:** Enriched list (+ phone, email, DNC status)

**PropStream Flow (Manual MVP):**
1. Export CSV from extraction module
2. Upload to PropStream
3. Run bulk skip trace
4. Download enriched CSV
5. Import to CRM/outreach system

**BatchData Flow (Automated):**
```python
# Pseudocode
def enrich_contact(address: str, owner_name: str):
    response = batchdata_api.contact_enrichment({
        "address": address,
        "name": owner_name
    })
    return {
        "phones": response.phone_numbers,
        "emails": response.emails,
        "dnc_status": response.dnc_flag,
        "litigator": response.litigator_flag
    }
```

---

#### 3.3 Outreach Module

**Channels (by compliance risk):**

| Channel | Risk | Requirements | Best For |
|---------|------|--------------|----------|
| Email | LOW | CAN-SPAM compliance | Volume outreach |
| Direct Mail | NONE | Just cost | High-value targets |
| Manual Phone | MEDIUM | DNC scrub, no autodialer | Warm leads |
| SMS | HIGH | Requires opt-in | Don't do cold |

**Email Stack Options:**
- Instantly.ai — Cold email at scale
- Smartlead — Similar to Instantly
- Apollo sequences — If already using Apollo

**Phone:**
- Manual dialing only (no predictive/autodialer)
- Must scrub against National DNC list
- Track Utah state DNC list

---

## 4. Compliance Summary

### Email (CAN-SPAM)
- ✅ Can send cold emails to homeowners
- ✅ Must include physical mailing address
- ✅ Must have working unsubscribe
- ✅ Must honor opt-outs within 10 days
- ❌ No deceptive subject lines

### Phone (TCPA)
- ✅ Manual dialing to cell phones OK
- ✅ Calls to residential landlines OK
- ⚠️ Must check National DNC Registry
- ⚠️ Must check Utah state DNC list
- ❌ No autodialers to cell phones without consent
- ❌ No prerecorded messages without consent

### Penalties
- TCPA: $500-$1,500 per violation
- CAN-SPAM: Up to $50,120 per violation

### Built-in Safeguards
PropStream and BatchData both include:
- DNC flagging on phone numbers
- Litigator scrubbing (known TCPA plaintiffs)
- Carrier information for phone type detection

---

## 5. MVP Implementation Plan

### Week 1: Data Pipeline
- [ ] Write Open SGID extraction script
- [ ] Test query with Salt Lake City, 15+ year homes
- [ ] Export sample of 1,000 records
- [ ] Validate data quality

### Week 2: Enrichment
- [ ] Sign up for PropStream 7-day trial
- [ ] Import 1,000 sample records
- [ ] Run skip trace
- [ ] Analyze match rate and data quality

### Week 3: Outreach Test
- [ ] Set up email tool (Instantly or similar)
- [ ] Create email sequence (3-touch)
- [ ] Send to 500 test records
- [ ] Measure open rates, replies

### Week 4: Iterate
- [ ] Analyze results
- [ ] Refine targeting criteria
- [ ] Decide: stay with PropStream or migrate to BatchData
- [ ] Scale if results are good

---

## 6. Cost Projections

### MVP (1,000 leads/month)

| Item | Monthly Cost |
|------|--------------|
| Open SGID | FREE |
| PropStream Pro | $149 |
| Email tool (Instantly) | $37-97 |
| **Total** | **~$186-246/mo** |

### Scale (10,000 leads/month)

| Item | Monthly Cost |
|------|--------------|
| Open SGID | FREE |
| BatchData (Growth) | $2,000 |
| Email tool (Instantly Pro) | $97 |
| **Total** | **~$2,100/mo** |

---

## 7. Open Questions

1. **Target geography:** Start with Salt Lake City only, or broader?
2. **Age cutoff:** 15 years is standard — adjust based on XPERIENCE preference?
3. **Volume goals:** How many leads/month is the target?
4. **CRM integration:** What CRM does XPERIENCE use? Need to plan data flow.
5. **Email sending domain:** Need dedicated domain for cold email (protect main domain)

---

## 8. Next Steps

**Immediate (This Week):**
1. ✅ Validate Open SGID access and data structure
2. ⬜ Pull sample data for Salt Lake City
3. ⬜ Sign up PropStream trial
4. ⬜ Test skip trace on sample

**After Thursday Meeting:**
- Get answers to open questions
- Refine target criteria based on XPERIENCE input
- Begin MVP build

---

*Last updated: Feb 4, 2026*
*Author: Claw (for Marb)*
