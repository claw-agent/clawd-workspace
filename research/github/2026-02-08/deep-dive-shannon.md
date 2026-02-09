# Deep Dive: KeygraphHQ/shannon

## Overview
Fully autonomous AI pentester that finds and proves real exploits in web apps.

## Key Details
- **96.15% success rate** on hint-free, source-aware XBOW Benchmark
- **White-box only** — requires access to source code
- Uses Claude Code under the hood (Anthropic API or OAuth)
- Docker-based, runs via simple CLI: `./shannon start URL=... REPO=...`
- Parallel processing for faster results
- Produces pentester-grade reports with reproducible PoCs

## Architecture
- Docker containers + Temporal workflow orchestration
- Browser-based exploit execution (real attacks, not just static analysis)
- Integrates Nmap, Subfinder, WhatWeb, Schemathesis for recon
- Code-aware dynamic testing: reads source → guides attack strategy → executes live

## Vulnerability Coverage
- Injection attacks (SQL, command, etc.)
- XSS (Cross-Site Scripting)
- SSRF (Server-Side Request Forgery)
- Broken Authentication/Authorization
- More in development

## Editions
- **Shannon Lite** — AGPL-3.0, open source (this repo)
- **Shannon Pro** — Commercial, adds LLM-powered data flow analysis engine

## Real Results
- Found 20+ critical vulns in OWASP Juice Shop including complete auth bypass and DB exfiltration
- Part of broader Keygraph security/compliance platform ("Rippling for Cybersecurity")

## Relevance to Us
- **High** — Could run against roof estimator and future XPERIENCE projects
- Closes the gap between "ship fast with AI" and "security testing once a year"
- Tagline resonates: "Every Claude (coder) deserves their Shannon"

## Action Items
- [ ] Consider running against roof-estimator before it gets real customer data
- [ ] Evaluate API key costs (uses Claude API)
- [ ] Watch for expanded vulnerability coverage
