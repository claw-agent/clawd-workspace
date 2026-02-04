# SLC Lead Gen System

**Status:** MVP Complete ✅ | **Last Updated:** 2026-01-26

AI-powered lead generation pipeline for local businesses with bad websites.

## Quick Start

```bash
cd ~/clawd/projects/slc-lead-gen

# Full pipeline (find → score → enrich → demo → email)
node services/pipeline.js run "plumbers" "Salt Lake City" --limit 5

# Or run stages individually:
node services/lead-discovery.js "HVAC" "Provo, Utah" 10
node services/website-scorer.js data/leads/raw/[file].json
node services/business-scraper.js "https://example.com"
node services/v0-generator.js data/leads/enriched/[file].json --local
node services/deploy-demo.js output/demos/[business-slug]
node services/email-generator.js data/leads/scored/[file].json
```

## Pipeline Stages

| Stage | Service | Input | Output |
|-------|---------|-------|--------|
| 1. Discovery | `lead-discovery.js` | Category + Location | `data/leads/raw/*.json` |
| 2. Scoring | `website-scorer.js` | Raw leads | `data/leads/scored/*.json` |
| 3. Enrichment | `business-scraper.js` | Website URL | `data/leads/enriched/*.json` |
| 4. Demo Gen | `v0-generator.js` | Enriched lead | `output/demos/*/index.html` |
| 5. Deploy | `deploy-demo.js` | Demo folder | Vercel URL |
| 6. Emails | `email-generator.js` | Scored leads | `data/outreach/*.json` |

## Live Demos (Test Deploys)

- **Beehive Plumbing:** https://beehive-plumbing.vercel.app
- **True Pros HVAC:** https://true-pros.vercel.app

## Tech Stack (All Free)

| Component | Tool | Cost |
|-----------|------|------|
| Lead Discovery | Google Maps scraping (Puppeteer) | Free |
| Yelp Data | Yelp Fusion API | Free (500/day) |
| Website Scoring | Lighthouse CLI | Free |
| Content Scraping | Jina Reader | Free |
| Screenshots | Puppeteer | Free |
| Demo Sites | Custom Tailwind templates | Free |
| Stock Images | Unsplash | Free |
| Icons | Lucide | Free |
| Hosting | Vercel | Free |
| Database | JSON files | Free |

## Paid Upgrades (Optional)

| Service | Cost | Benefit |
|---------|------|---------|
| v0.dev Premium | $20/mo | AI-generated custom designs |
| Instantly.ai | $37/mo | Email sending + warmup |
| Apollo.io | $49/mo | Contact enrichment |
| Google Places API | ~$50/mo | More reliable than scraping |

## Directory Structure

```
slc-lead-gen/
├── services/
│   ├── lead-discovery.js     # Google Maps + Yelp scraping
│   ├── website-scorer.js     # Lighthouse-based scoring
│   ├── business-scraper.js   # Jina + Puppeteer extraction
│   ├── v0-generator.js       # Demo site generator (v0 + local)
│   ├── demo-generator.js     # Original template generator
│   ├── deploy-demo.js        # Vercel deployment
│   ├── email-generator.js    # Sales email sequences
│   ├── pipeline.js           # Orchestrator CLI
│   └── db.js                 # Data helpers
├── templates/
│   ├── sites/                # HTML templates by industry
│   └── emails/               # Email sequence templates
├── data/
│   ├── leads/raw/            # Discovered leads
│   ├── leads/scored/         # Scored leads
│   ├── leads/enriched/       # Enriched with business info
│   ├── outreach/             # Generated emails
│   └── deployments.json      # Vercel deployment tracking
├── output/
│   ├── demos/                # Generated demo sites
│   └── emails/               # Email sequences
└── research/
    ├── tools-audit-2026-01.md
    ├── gaps-analysis-2026-01.md
    ├── seo-strategy-2026-01.md
    └── competitive-landscape.md
```

## Scoring Logic

**Opportunity Score (0-100):** Higher = worse website = better prospect

```
IF (lighthouse < 50 OR mobile < 60)
   AND google_rating >= 4.0
   AND reviews >= 20
   AND has_website = true
→ HIGH OPPORTUNITY
```

Modifiers:
- No website → 100 (max)
- High-value industry (HVAC, plumbing, roofing) → +5
- Good reviews + bad site → +5

## Color Schemes by Industry

| Category | Primary Color | Hex |
|----------|---------------|-----|
| Plumbing | Blue | #2563eb |
| HVAC | Orange | #ea580c |
| Electrical | Yellow | #ca8a04 |
| Roofing | Slate | #475569 |
| Landscaping | Green | #16a34a |
| Legal | Navy | #1e3a5f |
| Medical | Teal | #0d9488 |
| Restaurant | Red | #dc2626 |

## Email Sequence

1. **Initial** (Day 0): "I built you a new website"
2. **Follow-up 1** (Day 3): "Did you see the demo?"
3. **Follow-up 2** (Day 7): "Quick question about your site"
4. **Breakup** (Day 14): Final soft touch

## Known Issues / TODO

- [ ] Jina Reader can timeout on some sites
- [ ] Review count not always captured from Google Maps
- [ ] Need v0 API key for premium site generation
- [ ] Add LinkedIn outreach automation
- [ ] Add SMS via Twilio (infrastructure ready)

## Research Docs

- `research/local-lead-sourcing.md` - Original pipeline design
- `research/pseo-architecture.md` - SEO strategy for landing pages
- `research/tools-audit-2026-01.md` - Clay, Firecrawl, Apollo comparison
- `research/competitive-landscape.md` - SLC agency analysis

## Credits

Built by Claw + Marb | January 2026
