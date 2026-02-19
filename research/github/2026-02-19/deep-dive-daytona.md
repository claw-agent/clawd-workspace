# Deep Dive: daytonaio/daytona

## Overview
- **Repo:** https://github.com/daytonaio/daytona
- **Stars:** 58,328 (+872 today)
- **Language:** TypeScript (Go backend)
- **License:** AGPL-3
- **Website:** https://www.daytona.io

## What It Does
Secure, elastic infrastructure for running AI-generated code in sandboxes:
- **Sub-90ms sandbox creation** — from code to execution
- **Isolated runtime** — zero risk to host infrastructure
- **SDKs:** Python (`pip install daytona`), TypeScript (`npm install @daytonaio/sdk`), Go
- **OCI/Docker compatible** — use any container image
- **Unlimited persistence** — sandboxes live forever
- **APIs:** File, Git, LSP, Execute
- **Coming soon:** Fork sandbox filesystem AND memory state (massive parallelization)

## Architecture
- Cloud-hosted at app.daytona.io (API key auth)
- Create sandbox → run code → get results → cleanup
- Language parameter for Python, TypeScript, etc.

## Relevance
HIGH for agent infrastructure:
- We currently lack a proper sandboxed execution environment
- Sub-90ms creation is fast enough for real-time agent use
- Python/TS SDKs make integration straightforward
- Fork capability (when released) could enable parallel agent exploration

## Considerations
- AGPL-3 license — copyleft implications
- Cloud-hosted (requires API key, account at daytona.io)
- Need to evaluate pricing for sustained use
- Compare with E2B, Modal, and other sandbox providers

## Action Items
- [ ] Create account and test sandbox creation speed
- [ ] Evaluate pricing for our usage patterns
- [ ] Compare with current OpenClaw sandbox capabilities
