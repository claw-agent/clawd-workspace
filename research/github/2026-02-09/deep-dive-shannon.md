# Deep Dive: KeygraphHQ/shannon

## Overview
Fully autonomous AI pentester that finds and proves real exploits in web apps.

## Key Details
- **96.15% success rate** on hint-free, source-aware XBOW Benchmark
- Uses Claude (Anthropic API or Claude Code OAuth) as the AI backbone
- Docker-based, runs via simple CLI: `./shannon start URL=... REPO=...`
- White-box only (needs source code access)
- Parallelized exploitation phases for speed

## Architecture
- Uses Temporal for workflow orchestration
- Browser-based exploitation (real XSS, injection, auth bypass)
- Integrated recon tools: Nmap, Subfinder, WhatWeb, Schemathesis
- Code-aware: reads source to guide attack strategy, then confirms with live exploits

## Editions
- **Shannon Lite** (AGPL-3.0) — open source, core framework
- **Shannon Pro** (Commercial) — LLM-powered data flow analysis, CI/CD integration

## What It Found
- 20+ critical vulns in OWASP Juice Shop including complete auth bypass and DB exfiltration
- Coverage: Injection, XSS, SSRF, Broken Auth/AuthZ

## Assessment
- **Maturity:** Active development, backed by Keygraph (compliance platform)
- **Quality:** High — real exploits with reproducible PoCs, not just alerts
- **Relevance:** Very high — we ship code with AI, Shannon validates it with AI
- **Risk:** AGPL license means careful usage in commercial contexts

## Verdict
Strong [Explore]. Worth running against test projects. The "every Claude deserves a Shannon" pitch resonates — if we're vibe-coding, we need automated security validation.
