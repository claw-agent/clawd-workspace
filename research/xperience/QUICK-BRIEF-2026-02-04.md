# XPERIENCE Roofing — Quick Research Brief
*For Thursday meeting — compiled Feb 4, 2026*

---

## 1. COUNTY PARCEL DATA ✅ VERY FEASIBLE

**Utah has excellent public data access via Open SGID:**

```
Host: opensgid.ugrc.utah.gov
Port: 5432
Database: opensgid
Username: agrc
Password: agrc
```

This is a **free, public PostGIS database** with all Utah parcel data including:
- Owner names
- Property addresses
- Construction year (where available)
- Parcel boundaries
- County assessor data

**Access methods:**
- Direct SQL queries (PostgreSQL)
- Python with GeoPandas
- QGIS, ArcGIS Pro
- API via ArcGIS REST services

**Key insight:** This is MUCH easier than scraping individual county sites. One database, all Utah counties.

---

## 2. SKIP TRACING / CONTACT ENRICHMENT

**Apollo.io (we have this):**
- Unlimited email credits on paid plans
- Mobile/phone credits: need to check our plan
- ~$0.025/credit at scale
- API available on Custom plans
- Good for: email addresses, job titles, company info

**For homeowners specifically, better options:**
- **BatchSkipTracing** — built for real estate investors, ~$0.15-0.25/record
- **PropStream** — includes skip tracing, real estate focused
- **REIPro** — real estate investor tool with skip tracing

**TruePeopleSearch consideration:**
- Free but ToS prohibits commercial use
- Can be scraped but legally gray
- Better to use paid services for compliant outreach

**Recommendation:** Apollo for commercial contacts, BatchSkipTracing for homeowners.

---

## 3. AERIAL ROOF ANALYSIS ✅ SERVICES EXIST

**EagleView Assess™:**
- Drone-powered inspections
- AI damage detection
- Automated damage reports
- Used by insurance + contractors
- Has network of Part 107 licensed pilots
- **Best fit for XPERIENCE** — designed exactly for this use case

**Other options:**
- **Nearmap** — High-res aerial imagery + AI, subscription model
- **Verisk/Geomni** — Insurance-focused roof condition analysis
- **Roofr/Roofle** — Instant roof measurements from satellite

**Google Earth limitation:**
- Resolution typically not high enough for damage detection
- API costs add up at scale
- Better to use purpose-built services

**Recommendation:** Partner with EagleView or similar for damage assessment. Use satellite imagery only for basic roof age/type identification.

---

## 4. COMPLIANCE — KEY RULES

**Email (CAN-SPAM):**
- ✅ Can email homeowners cold
- Must include physical address
- Must have opt-out mechanism
- Must honor opt-outs within 10 days
- Can't use deceptive subject lines

**Phone/SMS (TCPA):**
- ⚠️ More restricted
- Need prior consent for autodialed calls/texts to cell phones
- Can manually dial without consent
- Residential landlines: can cold call (with Do Not Call list compliance)
- Penalties: $500-$1,500 per violation

**Best practices for roofing outreach:**
1. Email is safest channel for cold outreach
2. For phone: manual dialing only, scrub against Do Not Call list
3. SMS requires opt-in (don't do cold SMS)
4. Direct mail is unrestricted

**Utah-specific:** No additional state restrictions beyond federal.

---

## RECOMMENDED SYSTEM ARCHITECTURE

```
1. TARGETING
   └── Query Open SGID for homes built 15+ years ago in target zip code
   └── Get: owner name, property address, construction year

2. ENRICHMENT  
   └── BatchSkipTracing or Apollo → phone, email
   └── Optional: EagleView for roof condition score

3. OUTREACH (multi-channel)
   └── Email campaign (Instantly, Apollo sequences)
   └── Manual phone calls (scrubbed against DNC)
   └── Direct mail for high-value targets

4. CRM INTEGRATION
   └── Push leads to their existing CRM
   └── Track responses, conversions
```

---

## COST ESTIMATES (1,000 leads/month)

| Item | Cost |
|------|------|
| Parcel data (Open SGID) | FREE |
| Skip tracing (~$0.20/record) | $200/mo |
| Email tool (Instantly/Apollo) | $100-300/mo |
| EagleView (optional, per-inspection) | ~$50-100/roof |
| Direct mail (optional) | ~$1-2/piece |

**Total for basic pipeline:** ~$300-500/month for 1,000 targeted leads

---

## PITCH POINTS FOR THURSDAY

1. **"We can target homes by age"** — 15+ year old roofs are prime candidates
2. **"Data is free"** — Utah has one of the best public parcel databases in the country
3. **"Replaces door-to-door"** — More efficient, scalable, less overhead
4. **"Compliance built-in"** — Email-first strategy avoids TCPA issues
5. **"Optional roof analysis"** — Can add aerial inspection for highest-value targets
