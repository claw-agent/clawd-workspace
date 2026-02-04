# Aerial Roof Analysis Research
## Xperience Roofing - Feasibility Study

**Date:** 2026-02-04  
**Purpose:** Evaluate satellite/aerial imagery options for remote roof condition assessment

---

## Executive Summary

Aerial roof analysis is a mature, well-established market with multiple proven solutions. The technology ranges from satellite imagery (lower resolution, cheaper) to specialized aircraft imagery (high resolution) to drone-based inspection (highest detail). AI-powered damage detection is now standard across major platforms.

**Key Finding:** Building a custom solution using raw APIs would be expensive and time-consuming. The better approach is integrating with existing platforms that already have roof-specific AI models trained on millions of properties.

---

## 1. Major Aerial Imagery Providers

### EagleView (Industry Leader)
**Website:** eagleview.com  
**Overview:** The gold standard for roofing contractors and insurance. 3.5+ billion high-resolution aerial images.

**Products:**
- **EagleView Assess™** — Drone-powered inspections with AI damage detection
- **Property Reports** — Detailed roof measurements, pitch, area, facets
- **Premium Reports** — Include 3D models, waste calculations

**Key Stats:**
- 70x higher resolution than satellite imagery
- 98%+ accuracy on property measurements
- 24 of top 25 insurers use EagleView
- 1-inch accuracy
- $6.89B+ in measurement report savings over 25 years

**API:** Developer portal at developer.eagleview.com  
**Pricing:** Per-report model, typically $15-95 per report depending on detail level. Enterprise contracts available.

**Best For:** Insurance claims, detailed measurements, established credibility with adjusters

---

### Nearmap
**Website:** nearmap.com  
**Overview:** High-resolution aerial imagery from proprietary aircraft cameras. Covers 90%+ of US population.

**Key Features:**
- **Resolution:** 4.4 - 7.5cm ground sample distance (GSD) — can see individual shingles
- **Frequency:** Multiple captures per year (not just outdated satellite)
- **AI Layers:** Roof condition scores, vegetation analysis, building changes
- **3D Modeling:** Oblique imagery from multiple angles

**Products:**
- MapBrowser — Interactive aerial viewing
- Nearmap AI — Automated property insights including:
  - Roof condition scoring
  - Tree overhang detection
  - Building footprint changes
  - Damage assessment

**Pricing:** Subscription-based, enterprise pricing. Typically $10K-50K+/year depending on coverage area and usage.

**API:** Yes, with tile access and AI data feeds

**Best For:** Portfolio analysis, insurance underwriting, large-scale assessments

---

### CAPE Analytics
**Website:** capeanalytics.com  
**Overview:** AI-powered property intelligence specifically for insurance and real estate risk.

**Key Features:**
- Roof Condition scoring (Excellent/Good/Fair/Poor)
- Roof Geometry detection (Hip, Gable, Flat, etc.)
- Tree Overhang risk assessment
- Wildfire risk scoring
- Exterior condition analysis

**Data Sources:** Fuses multiple imagery sources (satellite, aerial, street view)

**Pricing:** Per-property lookup, enterprise contracts. Typically $1-5 per property lookup.

**Best For:** Instant risk scoring, insurance underwriting, lead qualification

---

### Verisk (Xactware Parent Company)
**Website:** verisk.com  
**Products:**
- **Aerial Imagery Analytics** — Property condition insights
- **Roof Condition** — AI-based roof analysis
- **Change Detection** — Track property modifications over time
- **Benchmark** — Weather event damage verification (hail, wind, lightning data)

**Integration:** Pairs with Xactimate (industry standard for claims estimating)

**Best For:** Insurance claims workflow, integration with existing Xactimate users

---

## 2. Google Maps Platform

### Google Maps Static API
**Use Case:** Basic satellite/aerial imagery

**Capabilities:**
- Max resolution: 640x640 pixels (1280x1280 at scale=2)
- Satellite view available
- Zoom level 20 can show buildings

**Limitations for Roofing:**
- Resolution insufficient for damage assessment
- Imagery often 1-3 years old
- Cannot see shingle-level detail
- No oblique/angled views

**Pricing:**
- Starter: $100/month (50K calls)
- Essentials: $275/month (100K calls)
- Pro: $1,200/month (250K calls, includes Aerial View)

### Google Aerial View API
**Overview:** Pre-rendered 3D cinematic videos simulating drone footage

**Capabilities:**
- Photorealistic 3D videos of addresses
- 360° rotating view around buildings
- US addresses only

**Limitations:**
- Cannot download/store videos (streaming only)
- Not all addresses have coverage
- Resolution not sufficient for damage assessment
- Better for real estate showcase than roof inspection

**Verdict:** Google APIs are NOT suitable for roof condition assessment. Resolution and coverage are inadequate.

---

## 3. Roofing-Specific Software Platforms

### Roofr
**Website:** roofr.com  
**Overview:** All-in-one roofing software with aerial measurements

**Measurement Service:**
- $13-19 per detailed roof report
- 2-6 hour turnaround
- Delivered via their platform
- DIY instant measurement tool available

**Plans:**
- Pay-As-You-Go: Free (reports $19 each)
- Pro: $99/month (reports $13, 6hr turnaround)
- Premium: $169/month (reports $13, 3hr turnaround)
- Elite: Custom (2hr turnaround, instant estimator)

**Includes:**
- Roof measurements (area, pitch, facets)
- Material calculations
- Proposal builder
- CRM features

**Best For:** Small-medium roofing contractors wanting turnkey solution

---

### Hover
**Website:** hover.to  
**Overview:** 3D property modeling from smartphone photos

**How It Works:**
1. User takes photos around exterior with phone
2. AI creates accurate 3D model
3. Detailed measurements extracted
4. Visualization of materials/colors

**Key Stats:**
- 300K+ construction pros use it
- 22B+ square feet measured
- 1 minute average support response

**Use Case:** On-site measurement without ladders/drones

**Best For:** In-person sales visits, reducing ladder climbs, homeowner engagement

---

### GAF QuickMeasure
**Overview:** Free roof measurements from GAF (largest US roofing manufacturer)

**Features:**
- Address-based roof reports
- Basic measurements
- GAF product recommendations
- Free for GAF-certified contractors

**Best For:** Contractors already using GAF products

---

## 4. AI Models for Roof Damage Detection

### What AI Can Detect

**Damage Types:**
- Missing/damaged shingles
- Hail damage patterns
- Storm damage (debris, fallen trees)
- Ponding water (flat roofs)
- Moss/algae growth
- Roof age indicators
- Structural sagging

**Condition Scoring:**
Most platforms use 4-5 tier scales:
- Excellent / Good / Fair / Poor / Severe
- Or numeric scores (1-100)

### Pre-Trained Models Available

**Commercial Options (API-based):**
1. **EagleView Assess** — Most comprehensive, drone + AI
2. **CAPE Analytics** — Best for instant scoring
3. **Nearmap AI** — Best for large-scale/portfolio
4. **Verisk/Xactware** — Best for insurance integration

**Open Source / Research:**
- Limited options for roof-specific models
- General object detection (YOLO, etc.) would need training
- Training data for roof damage is proprietary/scarce

**DIY Model Training:**
- Would require 10,000+ labeled roof images minimum
- Need damage/no-damage examples for each condition type
- 6-12 months development time
- Not recommended unless unique competitive advantage needed

---

## 5. Resolution Requirements

| Use Case | Required Resolution | Suitable Sources |
|----------|-------------------|------------------|
| Property exists check | 1-5m | Google Maps, free satellite |
| Roof shape/area | 30-50cm | Nearmap, EagleView |
| Material type | 10-30cm | Nearmap, high-res aerial |
| Damage assessment | 3-10cm | EagleView, drones, Nearmap |
| Individual shingle | <3cm | Drones only |

**Bottom Line:** Satellite imagery (Maxar, Planet) at 30-50cm is NOT sufficient for damage assessment. Need specialized aerial (Nearmap, EagleView) at 5-10cm or drones at 1-3cm.

---

## 6. Case Studies & Existing Products

### Insurance Industry
- **State Farm, Allstate, USAA** — All use EagleView for claims
- **Farmers Insurance** — Nearmap partnership for underwriting
- **Hartford** — CAPE Analytics for risk scoring

### Roofing Contractors
- **Power Home Remodeling** — EagleView for estimates
- **Roofing Corp of America** — Hover for in-person sales
- **Many regional roofers** — Roofr for cost-effective measurements

### Solar Industry
- **Sunrun, SunPower** — Aurora Solar (own aerial analysis)
- **Tesla** — Google Project Sunroof data + own imagery

---

## 7. Recommended Approach for Xperience Roofing

### Option A: Quick Win (Recommended)
**Integrate Roofr or EagleView**

- Roofr: $99-169/month, $13/report
- EagleView: Per-report, higher cost but gold standard

**Pros:**
- Live in days, not months
- Proven accuracy
- No development cost
- Industry-accepted for insurance claims

**Cons:**
- Per-report cost affects margins
- No differentiation

---

### Option B: Lead Qualification Layer
**Use CAPE Analytics for instant scoring**

- API call on any address → instant roof condition score
- Use to prioritize leads (focus on "Fair/Poor" roofs)
- Layer on top of other services for full reports when needed

**Implementation:**
1. CAPE API for lead scoring ($1-5/lookup)
2. Roofr/EagleView for detailed reports on qualified leads

---

### Option C: DIY Drone Program
**Build internal drone inspection capability**

**Requirements:**
- Part 107 licensed pilots (or training)
- DJI Mavic 3 or similar ($1-2K each)
- Flight planning software
- AI damage detection (custom or integrate EagleView Assess)

**Pros:**
- Lower per-inspection cost at scale
- Fresh imagery (not waiting on providers)
- Marketing differentiator

**Cons:**
- Weather dependent
- Pilot logistics
- FAA compliance
- 3-6 month ramp up

---

### Option D: Build Custom AI (Not Recommended)
**Train own roof damage model**

- Would need extensive training data
- 12+ month development time
- Still need imagery source (back to Nearmap/etc)
- Only makes sense if doing 10,000+ inspections/year

---

## 8. Pricing Summary

| Service | Cost Model | Typical Price |
|---------|-----------|---------------|
| **EagleView Reports** | Per-report | $15-95 |
| **Nearmap** | Annual subscription | $10K-50K+ |
| **CAPE Analytics** | Per-lookup | $1-5 |
| **Roofr** | Monthly + per-report | $99-169/mo + $13/report |
| **Hover** | Per-property | Free scan, premium features vary |
| **Google Maps** | Monthly subscription | $100-1,200/mo |

---

## 9. API Integration Paths

### Easiest to Integrate
1. **CAPE Analytics** — Simple REST API, instant response
2. **Roofr** — Has integrations, CRM built-in
3. **EagleView** — Developer portal, well-documented

### More Complex
4. **Nearmap** — Enterprise sales process, technical integration
5. **Verisk** — Usually requires existing Xactware relationship

### Not Suitable
6. **Google Aerial View** — Can't store/download, limited coverage

---

## 10. Recommendations

### For Xperience Roofing Specifically:

1. **Start with Roofr** ($169/mo Premium plan)
   - Instant measurement reports
   - Proposal builder included
   - CRM for lead tracking
   - No upfront development

2. **Add CAPE for lead scoring** (if budget allows)
   - Pre-qualify addresses before site visits
   - Focus sales efforts on likely-to-close properties

3. **Consider EagleView** for insurance restoration work
   - Adjusters trust their reports
   - Worth premium price for claim support

4. **Future: Evaluate drone program** once at scale
   - Makes sense at 500+ inspections/year
   - Differentiation and marketing value

---

## Key Takeaways

1. **Don't build from scratch** — The market is mature with proven solutions
2. **Google Maps won't work** — Resolution too low for damage assessment
3. **EagleView is the gold standard** — Especially for insurance work
4. **Roofr is best value** — For contractors wanting turnkey solution
5. **AI damage detection is commoditized** — Available from multiple providers
6. **Per-property pricing makes sense** — Until reaching very high volume

---

*Research compiled 2026-02-04*
