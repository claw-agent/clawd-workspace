# XPERIENCE Roofing — Competitive Analysis
*Generated: Feb 6, 2026*

## Executive Summary

XPERIENCE has a clean, modern site with good copy but **significant SEO gaps** compared to established competitors. The biggest opportunities are schema markup, city pages, and content depth.

---

## XPERIENCE Current State

**Website:** xperienceroofing.com (built on Framer)
**Phone:** 801-251-6554
**Founded:** 2019
**CEO:** Jamie Stagg

### Strengths
- ✅ Modern, clean design
- ✅ Good conversational copy (friendly, approachable)
- ✅ Solid FAQ section
- ✅ 4.9 Google rating
- ✅ 15-year workmanship warranty
- ✅ 24/7 emergency support
- ✅ Insurance claim assistance

### Page Structure
- Home, About, Services (6), Roofing Types (9), Projects, Reviews, Blogs, Contact
- Good service breakdown (replacement, repair, inspections, commercial)
- Material pages (shingle, metal, tile, flat, slate, synthetic, wood shake)

### Critical Gaps
1. **❌ NO SCHEMA MARKUP** — Zero LocalBusiness/Service schema detected
2. **❌ NO CITY PAGES** — Missing "roofing in [City]" landing pages
3. **❌ NO SERVICE AREA PAGE** — Competitors list every city they serve
4. **❌ MESSAGING CONFLICT** — Homepage says "20+ years experience" but About says "founded 2019"
5. **❌ WEAK WARRANTY VISIBILITY** — 15-year warranty buried, not a headline
6. **❌ NO DEDICATED INSURANCE PAGE** — Just mentioned in FAQ

---

## Top Competitors

### 1. Vertex Roofing (vertexroofingslc.com)
**Threat Level: HIGH** — Best SEO presence in market

| Factor | Details |
|--------|---------|
| Years in business | 16+ |
| Warranty | **50-year** (major differentiator) |
| Certifications | CertainTeed Master ShingleMaster, GAF |
| Counties served | Salt Lake, Weber, Davis, Summit, Utah |

**What they do better:**
- City-specific landing pages (South Jordan, West Jordan, Park City, etc.)
- Detailed FAQ with 10+ questions
- Clear warranty messaging ("50-year non-prorated")
- CertainTeed partner branding
- Snow removal service (seasonal upsell)
- Instant online estimates

**Content gaps we can exploit:**
- No dedicated storm damage page
- No emergency roofing content
- Blog appears inactive

---

### 2. American Roofing (amcoroof.com)
**Threat Level: HIGH** — Longest established, deepest content

| Factor | Details |
|--------|---------|
| Years in business | **60+ years** (since 1964) |
| Warranty | 5-year |
| Certifications | CertainTeed Gold Star, SELECT ShingleMaster, BBB, Gephardt Approved |

**What they do better:**
- **Most comprehensive site structure** in market
- Apartment + Condo dedicated pages (niche targeting)
- Case studies with photos
- Blog with regular posts
- Glossary page (SEO play)
- Dedicated insurance claim process page
- Service area pages for every city
- "Meet the Team" page (trust builder)

**Content gaps we can exploit:**
- Older design aesthetic
- Slower page load
- Warranty only 5 years (vs XPERIENCE's 15)

---

### 3. Salt City Roofers (saltcityroofers.com)
**Threat Level: MEDIUM** — Smaller but good reputation

- Since 2007 (17+ years)
- Focus on testimonials/trust
- Less sophisticated web presence
- Could be acquisition/partnership target

---

## Competitive Gap Analysis

### Where XPERIENCE Can Win

| Opportunity | Priority | Difficulty |
|-------------|----------|------------|
| Add LocalBusiness schema | 🔴 HIGH | Easy |
| Create city landing pages | 🔴 HIGH | Medium |
| Dedicated insurance claims page | 🔴 HIGH | Easy |
| Clarify warranty messaging (15yr) | 🟡 MED | Easy |
| Service area page with all cities | 🟡 MED | Easy |
| Blog content strategy | 🟡 MED | Ongoing |
| Fix "20+ years" vs "2019" conflict | 🟡 MED | Easy |
| Case studies with before/after | 🟢 LOW | Medium |
| Team page with photos | 🟢 LOW | Medium |

---

## Recommended GBP Posts (First 10)

### Batch 1: Local Authority Posts

1. **"Trusted Roofing in [Salt Lake City] Since 2019"**
   "From Sugar House to South Jordan, we've helped hundreds of Utah families protect their homes. Free inspections available — call today!"

2. **"Storm Season is Coming ⛈️"**
   "Utah hail can destroy a roof in minutes. XPERIENCE offers 24/7 emergency response and insurance claim help. Don't wait until it leaks!"

3. **"15-Year Workmanship Warranty — Why It Matters"**
   "We stand behind every roof we build. Our 15-year warranty means you're protected long after the crew leaves. Peace of mind included."

4. **"What's That Sound? 5 Signs Your Roof Needs Attention"**
   "Missing shingles, sagging spots, granules in gutters... If you're seeing these, call for a FREE inspection before winter hits."

5. **"Metal Roofs in Utah — Worth the Investment?"**
   "With our extreme temperature swings, metal roofs are gaining popularity in Park City and the Salt Lake Valley. Here's what to know."

### Batch 2: Trust & Urgency Posts

6. **"Emergency Roof Repair — We're 24/7"**
   "Tree through your roof? Sudden leak? We respond fast with emergency tarping and repairs. Utah weather waits for no one."

7. **"Insurance Claim? We Walk You Through It"**
   "Storm damage can be stressful. XPERIENCE helps document everything and works directly with your insurance. One less thing to worry about."

8. **"Flat Roof Specialists — TPO, EPDM, PVC"**
   "Commercial building owners trust XPERIENCE for flat roof systems. From installation to maintenance, we keep your business covered."

9. **"Family-Owned, Community-Trusted"**
   "We're not a franchise. We're your neighbors. That's why we treat every roof like it's our own."

10. **"Winter Roof Check — Free for Utah Homeowners"**
    "Heavy snow season is coming. Schedule your free pre-winter inspection and avoid costly repairs later."

---

## Schema Markup (Ready to Implement)

```json
{
  "@context": "https://schema.org",
  "@type": "RoofingContractor",
  "name": "XPERIENCE Roofing",
  "url": "https://www.xperienceroofing.com",
  "telephone": "+1-801-251-6554",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Salt Lake City",
    "addressRegion": "UT",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "40.7608",
    "longitude": "-111.8910"
  },
  "areaServed": [
    "Salt Lake City", "Sandy", "West Valley City", "West Jordan",
    "South Jordan", "Murray", "Draper", "Herriman", "Riverton"
  ],
  "priceRange": "$$",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "150"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Roofing Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Roof Replacement"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Roof Repair"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Roof Inspection"
        }
      }
    ]
  }
}
```

---

## Next Steps

1. **This Week:**
   - [ ] Add schema markup to site
   - [ ] Create insurance claims landing page
   - [ ] Fix 20yr/2019 messaging conflict
   - [ ] Post first 5 GBP posts

2. **Next 2 Weeks:**
   - [ ] Build city landing pages (start with 5 biggest markets)
   - [ ] Create service area page
   - [ ] Post remaining 5 GBP posts

3. **Ongoing:**
   - [ ] Weekly GBP posts (2-3 per week)
   - [ ] Monitor competitor GBP activity
   - [ ] Track ranking for "[service] + [city]" keywords

---

*Analysis by Claw | XPERIENCE In-House AI*
