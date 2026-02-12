# Site Revamp Skill

> Use when: Generating a modernized website for a lead/client from their existing site URL.
> Don't use when: Building a site from scratch with no existing URL, or just reviewing a website.
> Inputs: Business URL, optional lead data (name, phone, email, category)
> Outputs: Deployed Vercel site + output directory in ~/clawd/projects/slc-lead-gen/output/

## Overview

The site generation pipeline extracts assets from an existing business website, runs them through an AI agent pipeline for intelligent copy, and generates a modernized site using the v2 template.

## Pipeline

```
URL → Extract Assets → Classify Business → Research → Agent Pipeline → Generate → Deploy
```

### Agent Pipeline (5 agents, sequential)
1. **Research Agent** — Analyzes what the business actually does
2. **Creative Director** — Plans presentation strategy
3. **Copywriter** — Generates tailored copy (not generic!)
4. **Validator** — Catches empty/placeholder content
5. **QA Agent** — Catches wrong content (accuracy, brand mismatch)

## Usage

```bash
cd ~/clawd/projects/slc-lead-gen

# Full pipeline with AI agents
node services/revamp-generator.js https://example.com --verbose

# Skip agents (faster, uses extracted assets only)
node services/revamp-generator.js https://example.com --skip-agents
```

## Template

The pipeline uses `templates/sites/service-business.html` (v2 with design language):
- Plus Jakarta Sans + Inter typography
- Scroll reveals, animated counters
- FAQ accordion, process section, before/after slider
- Mobile sticky CTA bar (Call + Text)
- Handlebars templating with dynamic variables

## Template Variables

Key variables the template expects:
- `businessName`, `tagline`, `category`, `location`
- `phone`, `email`, `address`
- `primaryColor`, `secondaryColor`, `accentColor`
- `headline`, `subheadline`
- `rating`, `reviewCount`, `yearsInBusiness`, `projectsCompleted`
- `services[]` (name, description, icon, image)
- `reviews[]` (text, name, initial, location)
- `faqs[]` (question, answer)
- `serviceAreas[]` (name)
- `trustBadges[]` (alt, src)

## Deploy to Vercel

```bash
cd output/[business-slug]
vercel --prod --yes
```

## Design Language

See `~/clawd/research/roofing-ui-design-language.md` for the full spec that informed the v2 template. Key principles:
- Customer-centric headlines (not company-centric)
- Phone number visible without scrolling
- CTAs every 1.5 viewport heights
- Trust badge bar below hero
- Numbered process section
- FAQ accordion for SEO + reduced bounce

## Common Issues
- **Handlebars errors** — Usually missing closing tags. Check template syntax.
- **Empty services** — Pipeline uses defaults if extraction fails. Check source site.
- **Wrong colors** — Color extraction from source CSS can miss. Override in lead data.
