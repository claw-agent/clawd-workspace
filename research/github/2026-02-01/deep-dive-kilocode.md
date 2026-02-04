# Deep Dive: Kilo-Org/kilocode

## Overview
**Kilocode** — All-in-one agentic engineering platform claiming #1 on OpenRouter with 750k+ users and 6.1T tokens/month.

## Status
- **Stars:** 14.8k
- **Commits:** 31,000+
- **License:** Apache 2.0
- **Users:** 750k+ "Kilo Coders"

## Core Features

### 1. Code Generation
Natural language to code, standard agentic coding.

### 2. Inline Autocomplete
AI-powered code completions as you type — differentiator from Cline.

### 3. Multi-Mode System
Different modes for different tasks:
- **Architect Mode** — Planning and design
- **Coder Mode** — Implementation
- **Debugger Mode** — Problem solving
- **Custom Modes** — Build your own

### 4. MCP Server Marketplace
Built-in marketplace to find and install MCP servers. Makes discovery easy.

### 5. Task Automation
Automates repetitive coding tasks.

### 6. Automated Refactoring
Improves existing code automatically.

## Business Model

- Free credits to start
- $20 bonus on first top-up
- Access to 500+ models including:
  - Gemini 3 Pro
  - Claude 4.5 Sonnet & Opus
  - GPT-5
- Transparent pricing matching provider rates

## Scale

The numbers are impressive:
- #1 on OpenRouter (by usage)
- 1M+ users (they claim 750k in description, 1M+ elsewhere)
- 20T+ tokens processed

This is real scale, not vaporware.

## Architecture

Monorepo structure:
```
apps/           — Multiple apps
benchmark/src/  — Performance testing
cli/            — CLI tool
deps/           — Dependencies
jetbrains/      — JetBrains plugin
packages/       — Shared packages
src/            — Core source
webview-ui/     — UI components
```

Notable files:
- `AGENTS.md` — They use AGENTS.md too!
- `.kilocodemodes` — Mode configuration
- `turbo.json` — Turborepo monorepo

## What Makes It Different from Cline

| Feature | Kilocode | Cline |
|---------|----------|-------|
| Inline Autocomplete | ✅ | ❌ |
| Multi-Mode | ✅ | ❌ |
| MCP Marketplace | ✅ Built-in | Uses external |
| Token Brokering | ✅ | ❌ |
| Scale | 6.1T tokens/month | N/A |

## Relevance to Our Work

### Interesting Patterns

1. **Multi-Mode Concept** — Switching agent "personalities" for different tasks
2. **MCP Marketplace** — Curated discovery vs raw GitHub repos
3. **AGENTS.md** — They use the same pattern we do!
4. **Monorepo Scale** — How to structure large agent projects

### Token Brokering Model

They've built a business around proxying API access:
- Users don't need their own API keys
- Kilocode handles billing
- Transparent pass-through pricing

This is a viable business model for agent platforms.

### Custom Modes

The `.kilocodemodes` file suggests you can define:
- Mode name
- System prompt
- Allowed tools
- Restrictions

Could be useful for our agent specialization.

## Concerns

- Closed business model despite open source
- Token brokering could have privacy implications
- Massive user base = they know what works

## Verdict

**Competitive intelligence.** Kilocode shows what a well-funded agentic coding platform looks like at scale. Their multi-mode system and MCP marketplace are worth studying. The AGENTS.md pattern validation is nice to see.

Not something to integrate, but worth understanding their architecture decisions.
