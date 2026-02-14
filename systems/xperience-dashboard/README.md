# XPERIENCE Ops Dashboard

Single-page dashboard showing all 7 XPERIENCE Roofing systems at a glance.

## Systems Tracked
- **Storm Monitor** — NWS weather alerts → marketing campaigns
- **SLC Lead Gen** — Outbound lead generation pipeline
- **ROI Calculator** — Homeowner insurance claim estimator
- **Speed-to-Lead** — Instant SMS auto-responder (<5s)
- **Roof Estimator** — Interactive pricing tool (Next.js)
- **Review Gen** — Post-job 4-touch review sequence
- **Client Onboarding** — Professional proposal PDF generator

## Usage
```bash
# Local preview
open ~/clawd/systems/xperience-dashboard/index.html

# Deploy to Vercel
cd ~/clawd/systems/xperience-dashboard && vercel --prod
```

## Future Enhancements
- Live status checks (ping each system's health endpoint)
- Lead count tracking (SQLite → API)
- Review velocity metrics
- Storm alert history timeline
