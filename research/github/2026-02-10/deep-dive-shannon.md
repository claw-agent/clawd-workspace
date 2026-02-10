# Deep Dive: KeygraphHQ/shannon

## Overview
Fully autonomous AI pentester achieving 96.15% on the XBOW Benchmark (hint-free, source-aware).

## Key Details
- **By:** Keygraph (building "Rippling for Cybersecurity")
- **Status:** Production-ready (Lite edition is AGPL-3.0, Pro is commercial)
- **Stack:** TypeScript, Docker, Temporal workflows, Claude Code
- **Already in our tooling** — installed at `~/clawd/tools/shannon/`

## What's New (Trending Context)
Shannon is trending again — likely due to continued benchmark improvements and growing awareness of AI-powered security testing. The "every Claude deserves their Shannon" tagline is catching on.

## Architecture
- Uses Temporal for workflow orchestration
- Parallel processing across vulnerability types
- Integrated tools: Nmap, Subfinder, WhatWeb, Schemathesis
- Browser-based exploit validation (not just static analysis)
- Code-aware: reads source to guide attack strategy

## Coverage
- Injection (SQL, NoSQL, command)
- XSS (reflected, stored, DOM)
- SSRF
- Broken Authentication/Authorization
- More types in development

## Pro vs Lite
- Lite: Core autonomous pentesting (what we have)
- Pro: LLM-powered data flow analysis (LLMDFA paper), enterprise CI/CD integration

## Notes
We already have this installed and documented. No action needed — just good to see it validated by trending.
