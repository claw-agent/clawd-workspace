# Firecrawl Evaluation

**Date:** 2026-02-09
**Source:** firecrawl.dev, docs.firecrawl.dev

## What It Is

Firecrawl is a **web data API for AI** (YC-backed, 80K+ stars on GitHub). It turns websites into clean, LLM-ready markdown or structured data via a single API call. Handles proxies, anti-bot, JS rendering, and dynamic content automatically — no Puppeteer/Selenium setup needed.

**Tagline:** "Turn any website into LLM-ready data."

## Core API Endpoints

| Endpoint | What It Does | Credits |
|----------|-------------|---------|
| **Scrape** (`/scrape`) | Single URL → markdown, HTML, screenshots, metadata | 1/page |
| **Crawl** (`/crawl`) | Full site crawl, discovers and scrapes all pages | 1/page |
| **Map** (`/map`) | Discover all URLs on a site without scraping content | 1/page |
| **Search** (`/search`) | Web search + optional scrape of results (web, news, images) | 2/10 results |
| **Extract** (`/extract`) | Structured data extraction with prompt or JSON schema — supports wildcards (e.g., `example.com/*`) | Varies |
| **Agent** (`/agent`) | Autonomous web data gathering — describe what you need, it navigates and extracts | Dynamic (5 free daily) |

### Key Features
- **Actions:** Click, scroll, type, wait before scraping (interactive pages)
- **Smart wait:** Auto-detects when content is loaded
- **Caching:** Selective caching + growing web index
- **96% web coverage** including JS-heavy and protected pages
- **Sub-second response times** for simple scrapes
- **SDKs:** Python, Node.js, Go, Rust, CLI
- **MCP support:** Works as a skill for Claude Code, Cursor, etc.

## Pricing

| Plan | Credits/mo | Price/mo (annual) | Concurrency | Overage |
|------|-----------|-------------------|-------------|---------|
| **Free** | 500 (one-time) | $0 | 2 | — |
| **Hobby** | 3,000 | $16 | 5 | $9/1K |
| **Standard** | 100,000 | $83 | 50 | $47/35K (~$1.34/1K) |
| **Growth** | 500,000 | $333 | 100 | $177/175K (~$1.01/1K) |

**Effective cost per page:** ~$0.0008–0.005 depending on plan and usage.

Credits don't roll over (except auto-recharge packs and enterprise annual plans).

## Lead Gen & Outreach Pipeline Integration

### High-Value Use Cases for Us

**1. Lead Enrichment (Direct fit)**
- Scrape company websites to extract: tech stack, company size, services, key personnel, contact info
- Use `/extract` with a schema to get structured data (name, email, phone, role)
- Crawl directories, review sites, or industry listings for prospect discovery

**2. List Building at Scale**
- `/map` to discover all pages on a target site (e.g., a business directory)
- `/crawl` + `/extract` to pull structured lead data from every page
- `/search` to find companies matching criteria ("roofing contractor Salt Lake City")

**3. Competitor & Market Research**
- Crawl competitor sites for pricing, services, reviews
- Feed into our research agents for analysis

**4. Outreach Personalization**
- Scrape a prospect's website before outreach → personalize messaging with real details about their business
- Extract recent news/blog posts for conversation starters

### Integration Points with Swarm v2

| Swarm Agent | Firecrawl Use |
|-------------|---------------|
| **Researcher** | `/search` + `/scrape` for deep prospect research |
| **List Builder** | `/crawl` + `/extract` on directories, `/search` for discovery |
| **Outreach** | `/scrape` prospect site → personalization data |
| **Qualifier** | `/extract` company info → score against ICP criteria |

### vs. What We Have Now

Currently we use `web_fetch`, `stealth-browse`, and `browser-use` for web data. Firecrawl advantages:
- **Structured extraction** with schema — no parsing/regex needed
- **Reliability** — handles anti-bot, proxies, JS automatically
- **Scale** — 50-100 concurrent requests, built for volume
- **Search API** — web search + scrape in one call
- **Agent endpoint** — autonomous multi-step data gathering

Disadvantages:
- **Cost** — We'd need Standard ($83/mo) minimum for real pipeline use
- **No social media** — Explicitly doesn't support social platforms (we have `bird` for Twitter)
- **Another dependency** — API service vs. our local tools

## Self-Hosting Option

Firecrawl is **open source** (GitHub: mendableai/firecrawl). We could self-host to avoid per-credit costs, though we'd need to manage proxies and infrastructure ourselves.

## Recommendation

**Worth it for lead gen pipeline.** The Standard plan at $83/mo gives 100K pages — enough for serious list building and enrichment. The `/extract` endpoint with JSON schemas is the killer feature for our use case: point it at directories or company sites and get structured lead data back without writing scrapers.

**Suggested next steps:**
1. Sign up for free tier (500 credits) and test `/extract` on a real directory
2. Build a Firecrawl integration into the List Builder agent
3. If results are good, upgrade to Standard
4. Consider self-hosting later if volume grows significantly

**ROI calculation:** If each enriched lead saves 5 min of manual research, and we process 1,000 leads/mo, that's ~83 hours saved for $83. No-brainer.
