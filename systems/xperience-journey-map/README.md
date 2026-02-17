# XPERIENCE Customer Journey Map

Interactive visual map of every customer touchpoint from discovery → review → referral.

## What It Shows
- **9 stages** of the customer lifecycle
- Which XPERIENCE systems power each stage
- Automation level (auto/manual/hybrid) per stage
- Expandable touchpoint details

## Deploy
```bash
cd ~/clawd/systems/xperience-journey-map
vercel --prod
```

## Systems Mapped
1. Storm Monitor → Discovery
2. ROI Calculator → Discovery
3. Demo Pipeline → Discovery
4. Speed-to-Lead → Capture + Response
5. Lead CRM → Capture through Referral
6. Google Solar API → Qualification
7. Quote Generator → Estimate
8. Review Gen → Post-job

## Usage
Open `index.html` in browser or deploy to Vercel. Click touchpoint arrows to expand details.
