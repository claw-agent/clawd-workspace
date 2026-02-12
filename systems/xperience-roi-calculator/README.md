# XPERIENCE Roofing — ROI Calculator

Interactive single-page tool that estimates insurance claim value for storm-damaged roofs.

## What It Does
- Homeowner enters: home sqft, stories, roof pitch, damage type, material, extras
- Calculator estimates total claim value with itemized breakdown
- Shows range (±12%) and encouraging messaging
- CTA: free inspection call

## Pricing Model
Based on Utah 2025-2026 market rates per roofing square (100 sq ft):
- 3-Tab: $350/sq | Architectural: $450/sq | Premium: $650/sq | Tile: $900/sq | Metal: $800/sq
- Tear-off: $125/sq | Underlayment: $75/sq | Ridge/vents: $45/sq
- Gutters: $12/LF | Skylights/extras: $1,800 flat

## Deploy
```bash
cd ~/clawd/systems/xperience-roi-calculator
vercel --prod
```

## Usage
- Embed on XPERIENCE website
- Share link in storm-damage campaigns
- Use during sales calls for instant estimates
