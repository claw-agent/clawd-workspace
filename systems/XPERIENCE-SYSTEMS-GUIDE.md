# XPERIENCE Roofing — Systems Integration Guide

*All the tools we've built for XPERIENCE, how they connect, and how to operate them.*

Last updated: 2026-02-13

---

## System Map

```
                    ┌─────────────────────┐
                    │   LEAD GENERATION    │
                    └─────────┬───────────┘
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
   ┌──────────────┐  ┌───────────────┐  ┌────────────────┐
   │ Storm Monitor │  │ SLC Lead Gen  │  │  ROI Calculator │
   │  (Inbound)   │  │  (Outbound)   │  │   (Inbound)     │
   └──────┬───────┘  └───────┬───────┘  └────────┬───────┘
          │                   │                   │
          ▼                   ▼                   ▼
   ┌──────────────────────────────────────────────────────┐
   │              SPEED-TO-LEAD AUTO-RESPONDER             │
   │         Instant SMS + follow-up sequence              │
   └──────────────────────────┬───────────────────────────┘
                              │
                              ▼
                    ┌─────────────────────┐
                    │   JOB COMPLETED     │
                    └─────────┬───────────┘
                              │
                              ▼
                    ┌─────────────────────┐
                    │   REVIEW GEN        │
                    │  (4-touch sequence) │
                    └─────────────────────┘
```

---

## 1. Storm Monitor + Dispatcher

**Purpose:** Watch NWS for severe weather → auto-generate marketing campaigns

**Location:** `~/clawd/systems/storm-monitor/`

**Pipeline:**
```
NWS API → storm_monitor.py → campaigns/*.md → dispatcher.py → SMS/Email/Social/Notification
```

**Commands:**
```bash
# Dry run check
~/clawd/systems/storm-monitor/storm-pipeline.sh

# Live execution (sends notifications)
~/clawd/systems/storm-monitor/storm-pipeline.sh --execute

# Manual dispatch
cd ~/clawd/systems/storm-monitor
source ~/clawd/.venv/bin/activate
python dispatcher.py --campaign campaigns/storm-YYYY-MM-DD.md --channels notification,sms --execute
```

**Cron:** Runs via OpenClaw cron, checks UT area. Alerts Marb on Telegram when storms detected.

**Integration:** Storm campaigns can link to the ROI Calculator so homeowners estimate their claim value.

---

## 2. Speed-to-Lead Auto-Responder

**Purpose:** Instant SMS reply when a lead submits any form (< 5 seconds)

**Location:** `~/clawd/systems/speed-to-lead/`

**Pipeline:**
```
Form submit → POST /lead → Instant SMS via Twilio → Day 1/3/7 follow-ups
```

**Commands:**
```bash
# Dry run
python ~/clawd/systems/speed-to-lead/server.py --dry-run

# Live
python ~/clawd/systems/speed-to-lead/server.py

# Test
curl -X POST http://localhost:8765/lead \
  -H "Content-Type: application/json" \
  -d '{"name":"John","phone":"8015551234","source":"roof-estimator","company":"XPERIENCE Roofing","interest":"roof replacement"}'
```

**Integration:** Wire as webhook from ROI Calculator, roof estimator, or any landing page form.

**Twilio:** +18554718307 (Claw's number)

---

## 3. Review Generation

**Purpose:** Post-job 4-touch sequence to get Google reviews

**Location:** `~/clawd/systems/review-gen/`

**Sequence:**
```
Job Complete → Evening SMS → Next Day Email → Day 3 SMS → Day 7 Final Nudge
```

**Commands:**
```bash
# Generate campaign for a customer
cd ~/clawd/systems/review-gen
source ~/clawd/.venv/bin/activate
python review_gen.py --generate \
  --customer "John Smith" \
  --phone "+18015551234" \
  --email "john@email.com" \
  --job "roof replacement"

# Or use the wrapper
~/clawd/systems/review-gen/generate-review-campaign.sh "John Smith" "8015551234" "john@email.com" "roof replacement"
```

**Integration:** Trigger after job completion. Links to Google Business Profile review page.

---

## 4. ROI Calculator

**Purpose:** Homeowner enters details → sees estimated insurance claim value → CTA to call

**Location:** `~/clawd/systems/xperience-roi-calculator/`

**Deploy:**
```bash
cd ~/clawd/systems/xperience-roi-calculator && vercel --prod
```

**Pricing:** Based on Utah 2025-2026 market rates (3-tab $350/sq → Metal $800/sq)

**Integration:** Embed on website, share in storm campaigns, use during sales calls.

---

## 5. Pricing Tool (Internal)

**Purpose:** Jamie's internal tool — look up competitive roofing prices by city, calculate margins, generate customer quotes

**Location:** `~/clawd/projects/xperience-pricing-tool/`
**Live URL:** https://xperience-pricing-tool.vercel.app

**Features:**
- 982-city roofing price database (all 50 states)
- Google Places autocomplete for addresses
- Profit margin calculator
- Customer quote generator
- Raw data view with data sources
- Sortable city browser

**Deploy:**
```bash
cd ~/clawd/projects/xperience-pricing-tool && vercel --prod
```

---

## 6. Roofing Price Database

**Purpose:** Market intelligence — competitive pricing data for 982 US cities

**Location:** `~/clawd/systems/xperience/roofing-prices/`

**Files:**
- `roofing-prices.json` — full structured data (982 cities)
- `roofing-prices.csv` — flat CSV for spreadsheets
- `by-state/{state}.json` — per-state files

**Source:** instantroofer.com, scraped 2026-02-12

**Used by:** Pricing Tool, ROI Calculator pricing model

---

## 7. SLC Lead Gen (Outbound)

**Purpose:** Automated pipeline — find local businesses with bad websites → score → revamp mockup → deploy demo → send pitch

**Location:** `~/clawd/projects/slc-lead-gen/`

**Pipeline:**
```bash
# Full pipeline: URL → Lighthouse score → AI revamp → deploy → email draft
~/clawd/projects/slc-lead-gen/demo-pipeline.sh "https://target-business.com"
```

---

## Quick Reference: What to Use When

| Scenario | System | Command |
|----------|--------|---------|
| Storm hits Utah | Storm Monitor | `storm-pipeline.sh --execute` |
| New lead comes in | Speed-to-Lead | Auto (webhook) or manual POST |
| Job finished | Review Gen | `generate-review-campaign.sh ...` |
| Homeowner wants estimate | ROI Calculator | Share Vercel URL |
| Jamie pricing a job | Pricing Tool | xperience-pricing-tool.vercel.app |
| Prospecting local businesses | SLC Lead Gen | `demo-pipeline.sh "URL"` |

---

## Dependencies

| Service | Used By | Credential Location |
|---------|---------|-------------------|
| Twilio | Speed-to-Lead, Review Gen, Storm Dispatcher | `~/clawd/config/` |
| Vercel | ROI Calculator, Pricing Tool | CLI auth |
| NWS API | Storm Monitor | No auth needed |
| Google Places | Pricing Tool | API key in project env |

---

## Future Connections

These systems are standalone today but could be wired together:

1. **Storm → ROI Calculator:** Storm campaigns auto-link to calculator with pre-filled damage type
2. **Speed-to-Lead → CRM:** Log all leads to a central database
3. **Review Gen → Reputation Dashboard:** Track review velocity and rating over time
4. **Pricing Tool → Quote PDF:** One-click professional quote generation from pricing data
5. **All → Dashboard:** Unified XPERIENCE ops dashboard showing leads, jobs, reviews, weather
