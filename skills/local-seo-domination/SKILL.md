# Local SEO Domination Skill

AI-powered local SEO playbook for service businesses. Outrank competitors in 60-90 days.

## Overview

This skill enables systematic local SEO domination using AI automation. Based on @bloggersarvesh's Claude Cowork playbook, adapted for Clawdbot execution.

## Capabilities

### 1. Competitor Analysis
Scrape and analyze competitor websites to extract:
- Business name, address, services
- Cities/areas served
- Key selling points
- Trust signals (licenses, certs, reviews)
- Weaknesses and gaps

### 2. GBP Optimization
Generate high-impact Google Business Profile posts:
- Include local landmarks and neighborhoods
- Hard CTAs ("Call Now", "Get Free Quote")
- Keyword-optimized for local search
- Seasonal/timely content

### 3. Content Gap Analysis
Identify what competitors are missing:
- Service pages they don't have
- Questions they don't answer
- Areas they don't target
- Trust signals they lack

### 4. Schema Audit
Check and generate LocalBusiness schema:
- Audit existing schema markup
- Identify missing/weak schema
- Generate proper JSON-LD
- Prioritize by SEO impact

### 5. Keyword Research
Find high-intent local keywords:
- "Near me" variations
- Emergency/urgent keywords
- Service + city combinations
- Long-tail opportunities

### 6. Ongoing Monitoring
Track competitor changes:
- New pages/services
- Pricing changes
- Review velocity
- GBP activity

## Workflow

```
1. Initial Audit
   - Analyze client site
   - Identify top 3-5 competitors
   - Run full comparison

2. Quick Wins (Week 1-2)
   - Fix schema issues
   - Optimize GBP basics
   - Generate first batch of posts

3. Content Strategy (Week 2-4)
   - Fill content gaps
   - Create location pages
   - Build FAQ content

4. Ongoing (Monthly)
   - Weekly GBP posts
   - Competitor monitoring
   - Keyword tracking
   - Review velocity check
```

## Required Inputs

- Client website URL
- Service areas (cities/zips)
- Top competitors (or auto-discover)
- GBP access (optional - can draft content)

## Tools Used

- `web_fetch` - Site scraping
- `browser` - JS-rendered content
- `bird` - Twitter for industry trends
- `exec` - Data processing

## Notes

- GBP posting requires client to post OR share access
- Ahrefs/SEMrush access enables deeper keyword research
- Review generation requires integration with their CRM
- Storm monitoring possible with weather API integration

## Source

Based on @bloggersarvesh thread (Feb 5, 2026):
https://x.com/bloggersarvesh/status/2019403251624603944

---

*Skill created: Feb 6, 2026*
