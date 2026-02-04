# Skip Tracing Services Research
## Xperience Roofing — Property Owner Contact Info at Scale

*Research completed: 2026-02-04*

---

## Executive Summary

For 1,000+ lookups/month, **BatchData (formerly BatchSkipTracing)** or **BatchLeads** offer the best value for real estate/contractor use cases. Apollo.io is better suited for B2B sales than property owner lookups. TruePeopleSearch cannot be legally automated.

**Top Recommendation:** BatchLeads at $99/mo includes 10,000 skip-traced leads with contact info automatically enriched.

---

## Service Comparison

### Tier 1: Real Estate-Specific Skip Tracing (RECOMMENDED)

#### BatchData (batchdata.io) ⭐ BEST API
- **Pricing:** Tiered plans from Lite → Enterprise
  - Contact Enrichment add-on: $500/mo (Lite) → $10,000/mo (Enterprise)
  - Includes: owner names, phone numbers, email, mailing address, DNC status, litigator scrub
- **API:** Yes, full REST API with property + skip tracing endpoints
- **Best for:** Developers building custom pipelines
- **Data points:** 12+ contact data points per property owner
- **Accuracy:** Industry-leading for property-linked data (claims 85-90% hit rate)

#### BatchLeads (batchleads.io) ⭐ BEST ALL-IN-ONE
- **Pricing:**
  - Growth: $99/mo — 10,000 leads with contact info included
  - Professional: $199/mo — 35,000 leads
  - Scale: $399/mo — 75,000 leads
- **Cost per lookup:** Effectively $0.01/lead at Growth tier, $0.0057/lead at Professional
- **Extra leads:** $0.04 each after quota
- **API:** Yes, plus Zapier integrations
- **Includes:** Phone numbers, emails auto-enriched on save, DNC scrubbing, direct mail
- **Best for:** Turnkey solution with marketing tools included

#### PropStream
- **Pricing:**
  - Essentials: $99/mo — Skip tracing at $0.12/trace
  - Pro: $149/mo — Free skip tracing for primary user
  - Elite: $249/mo — Free skip tracing for primary user
- **API:** No public API
- **Best for:** Users who want property data + skip tracing in one platform
- **Note:** More expensive per-skip than BatchLeads unless on Pro+ plan

#### Skip Genie
- **Pricing:** Not published (requires account signup)
- **Features:** 
  - "The Tracer" — individual online searches
  - "Bulk Search" — upload lists, get reports back
- **Reputation:** Strong in real estate investor community
- **API:** No public API, bulk upload only
- **Best for:** Small-scale investors, manual workflows

#### REI Skip (reiskip.com)
- **Pricing:** Custom pricing (contact for quote)
- **Features:** Skip trace triangulation, phone + email
- **API:** Unknown
- **Best for:** High-volume custom needs

---

### Tier 2: General People Search (Less Ideal for Property Owners)

#### Apollo.io (Already Have)
- **Pricing:**
  - Free: 50 credits/mo
  - Basic: $49/user/mo — 900 mobile credits/yr
  - Professional: $79/user/mo — 1,200 mobile credits/yr
  - Organization: $119/user/mo — 2,400 mobile credits/yr
  - Unlimited plans: 10K credits/mo (free) or $paid/0.025 up to 1M/yr
- **API:** Yes (Custom plans only)
- **Limitations for Roofing:**
  - Optimized for B2B (company emails, job titles)
  - Weak on residential property owners
  - No property data linkage
- **Verdict:** ❌ Not ideal for property owner skip tracing

#### Whitepages Pro API
- **Pricing:** Custom quotes only (enterprise-focused)
- **Data:** 350M identity records, 92M property owner records
- **API:** Yes, full REST API
- **Features:** Search by name, reverse phone, reverse address
- **Note:** Founded Ekata (identity verification), very accurate
- **Best for:** Enterprise with budget, compliance needs

#### Spokeo for Business
- **Data:** 6B consumer records, 130M property records, 300M unique profiles
- **Pricing:** Enterprise quotes only
- **API:** Yes (enterprise)
- **Features:** 120+ social networks, up to 300 profile attributes
- **Best for:** Supplementary data enrichment

#### BeenVerified / Whitepages Consumer
- **Pricing:** ~$27/mo consumer subscription
- **API:** ❌ No API access
- **Bulk:** ❌ No bulk lookup
- **Automation:** ❌ ToS prohibits automation
- **Verdict:** ❌ Not suitable for scale

---

### Tier 3: Free Sites (CANNOT BE AUTOMATED)

#### TruePeopleSearch
- **Pricing:** Free
- **API:** ❌ None
- **Automation:** ❌ Explicitly prohibited
  - robots.txt blocks all `/search` paths
  - Aggressive bot detection (Cloudflare, IP reputation)
  - ToS prohibits scraping
- **Legal risk:** High — CFAA violations, ToS breach
- **Verdict:** ❌ Manual use only, cannot scale

#### FastPeopleSearch, That's Them, etc.
- Same limitations as TruePeopleSearch
- No APIs, anti-bot measures, ToS prohibit automation

---

## Pricing Summary at Scale (1,000+ lookups/month)

| Service | 1,000/mo | 5,000/mo | 10,000/mo | API |
|---------|----------|----------|-----------|-----|
| **BatchLeads** | $99 (10K incl) | $99 | $99 | ✅ |
| **BatchData** | ~$500+ | ~$500+ | ~$500+ | ✅ |
| **PropStream Pro** | $149 (free skips) | $149 | $149 | ❌ |
| **Skip Genie** | ~$100-200 | Contact | Contact | ❌ |
| Apollo.io | Poor fit | Poor fit | Poor fit | ✅* |
| Whitepages Pro | Custom | Custom | Custom | ✅ |

*Apollo API requires Custom plan

---

## Accuracy Rates (Industry Reported)

| Service | Phone Hit Rate | Email Hit Rate | Notes |
|---------|----------------|----------------|-------|
| BatchLeads/BatchData | 70-85% | 60-75% | Best for property-linked |
| PropStream | 65-80% | 55-70% | Good triangulation |
| Skip Genie | 70-80% | 60-70% | Strong RE investor reviews |
| Apollo.io | 80%+ (B2B) | 90%+ (B2B) | Poor for residential |
| Consumer sites | Variable | Variable | Often outdated |

**Note:** Accuracy varies by:
- Property type (residential vs commercial)
- Owner age and mobility
- Recency of property transfer
- Geographic region

---

## Legal Considerations

### ✅ Permitted Uses (Generally Safe)
- Skip tracing for **debt collection** (with proper licensing)
- **Legitimate business contact** (roofing services, home improvement)
- **Real estate investing** (direct to seller marketing)
- Marketing to property owners (with DNC compliance)

### ⚠️ Requirements
1. **DNC Compliance:** Must scrub against Do Not Call registry before phone outreach
2. **TCPA Compliance:** No autodialed calls/texts to cell phones without consent
3. **State Laws:** Some states (CA, NY, etc.) have stricter privacy laws
4. **Opt-Out Honoring:** Must remove people who request no contact

### ❌ Prohibited
- Using data for FCRA-covered decisions (credit, employment, housing, insurance)
- Scraping free sites (TruePeopleSearch, etc.) — ToS violation + potential CFAA
- Reselling obtained data
- Harassment or excessive contact

### Best Practices for Xperience Roofing
1. Use a **commercial service** with proper data licensing (BatchLeads, BatchData)
2. **Scrub against DNC** before any phone campaigns
3. Keep **records of consent** for any ongoing communication
4. Provide **easy opt-out** in all communications
5. Limit contact frequency (industry standard: 3-4 attempts max)

---

## Recommendations for Xperience Roofing

### Primary Solution: BatchLeads ($99/mo)
**Why:**
- 10,000 leads/month with contact info = $0.01/lead
- Property-focused (not B2B like Apollo)
- Includes direct mail, dialer integration
- DNC scrubbing built-in
- No API development needed

### Secondary/API Solution: BatchData
**Why:**
- Full API for custom automation
- Same underlying data as BatchLeads
- Contact Enrichment add-on for high volume

### Avoid:
- Apollo.io — wrong data type (B2B, not property owners)
- Free sites — legal risk, can't scale
- Consumer services (BeenVerified) — no bulk/API

---

## Next Steps

1. **Start BatchLeads trial** — 7-day free + 50 free leads
2. **Test accuracy** on known addresses (validate hit rates)
3. **Set up DNC scrubbing** before any outreach
4. **Build outreach workflow** — direct mail first (safest), then phone
5. **Track conversion rates** to calculate true cost-per-acquisition

---

## Appendix: API Documentation Links

- BatchData API: https://batchdata.io/docs
- BatchLeads integrations: Zapier, Podio native
- Whitepages Pro API: https://api.whitepages.com/docs
- Apollo API: https://apolloio.github.io/apollo-api-docs/

---

*Research by: Claw (subagent)*
*For: Xperience Roofing lead generation pipeline*
