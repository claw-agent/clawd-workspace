# XPERIENCE Roofing Estimator — Full Rebuild Spec

## Vision
The ultimate roofing estimate tool. Enter an address, get real roof measurements + local material pricing + instant cost breakdowns. No EagleView subscription needed.

## Core Features
1. **Address Lookup** — Enter any US address. Google Solar API measures the actual roof (sqft, pitch, segments).
2. **Material Pricing** — All 6 materials from 982 cities: Asphalt Shingle, Metal, Designer Shingle, Clay Terra Cotta, Concrete, Cedar Shingle
3. **Instant Estimate** — Measured roof × local material prices = total cost per material, including labor range
4. **City Browser** — Browse/search any city's pricing without entering an address
5. **Comparison** — Side-by-side cities or materials
6. **National Context** — How this city/estimate compares to national averages
7. **Waste Factor** — Calculate recommended waste % based on roof complexity/pitch
8. **Export/Share** — Generate a clean estimate PDF or shareable link for customers

## Data Sources
- **Roof measurements:** Google Solar API (`~/clawd/scripts/roof_measure_final.py` — already working, <3% error vs EagleView)
- **Material pricing:** `~/clawd/systems/xperience/roofing-prices/roofing-prices.json` (982 cities, 50 states, scraped Feb 12 2026)
- **Google Solar API key:** `~/clawd/config/.google-solar-credentials`

## Design
- XPERIENCE branded: primary #1a1f3d (navy), accent #e85d26 (orange), bg #f8f6f3
- Mobile-first — Jamie uses this on his phone at job sites
- Fast, clean, professional
- Should feel like a premium SaaS tool, not a quick hack

## Tech Stack
- Next.js 14+ with App Router
- TypeScript + Tailwind CSS
- Static pricing data bundled (no database needed)
- Google Solar API called server-side via API route (keeps key secure)
- Vercel deployment

## Target Users
- Jamie (XPERIENCE Roofing) — primary user, uses at job sites
- Could be white-labeled for other roofing clients later

## Existing Assets
- Current v1 deployed at xperience-pricing-tool.vercel.app (3 materials only, no address lookup)
- Roof measurement script: ~/clawd/scripts/roof_measure_final.py
- Pricing data: ~/clawd/systems/xperience/roofing-prices/
