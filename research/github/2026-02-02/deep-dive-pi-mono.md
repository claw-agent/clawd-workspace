# Deep Dive: badlogic/pi-mono

**URL:** https://github.com/badlogic/pi-mono  
**Stars:** 5,243 (+613 today)  
**Language:** TypeScript  
**License:** MIT

---

## What Is It?

Pi-mono is an **AI agent toolkit monorepo** from Mario Zechner (creator of libGDX). It provides tools for building AI agents and managing LLM deployments.

Tagline: *"Tools for building AI agents and managing LLM deployments."*

---

## Packages

| Package | Description |
|---------|-------------|
| **@mariozechner/pi-ai** | Unified multi-provider LLM API (OpenAI, Anthropic, Google, etc.) |
| **@mariozechner/pi-agent-core** | Agent runtime with tool calling and state management |
| **@mariozechner/pi-coding-agent** | Interactive coding agent CLI |
| **@mariozechner/pi-mom** | Slack bot that delegates messages to the pi coding agent |
| **@mariozechner/pi-tui** | Terminal UI library with differential rendering |
| **@mariozechner/pi-web-ui** | Web components for AI chat interfaces |
| **@mariozechner/pi-pods** | CLI for managing vLLM deployments on GPU pods |

---

## Architecture Highlights

### Unified LLM API (`pi-ai`)
Single interface for multiple providers:
- OpenAI
- Anthropic (Claude)
- Google (Gemini)
- Local models via vLLM

This solves the "which provider" problem with a clean abstraction.

### Agent Core (`pi-agent-core`)
- Tool calling framework
- State management
- Agent runtime

### Coding Agent (`pi-coding-agent`)
Interactive CLI for AI-assisted coding. The "main product" — see `packages/coding-agent` for usage.

### TUI Library (`pi-tui`)
Terminal UI with differential rendering. Could be useful for building CLI tools.

### Web UI Components (`pi-web-ui`)
Reusable React components for AI chat interfaces.

### vLLM Pods (`pi-pods`)
CLI for deploying and managing vLLM on GPU pods. Useful for self-hosted inference.

---

## Development

```bash
npm install          # Install all dependencies
npm run build        # Build all packages
npm run check        # Lint, format, and type check
./test.sh            # Run tests
./pi-test.sh         # Run pi from sources
```

Monorepo structure with npm workspaces.

---

## Why This Matters

### Unified LLM API
The `pi-ai` package provides what many projects need: a single interface for multiple LLM providers. Instead of writing provider-specific code:

```typescript
// Instead of:
if (provider === 'openai') { ... }
else if (provider === 'anthropic') { ... }

// You get:
import { ai } from '@mariozechner/pi-ai';
const response = await ai.chat(messages, options);
```

### Clean Monorepo Pattern
Well-structured monorepo with:
- Clear package boundaries
- Shared tooling
- Good CI/CD setup

### TUI Library
The `pi-tui` package with differential rendering could be useful for building better CLI tools.

---

## Comparison to Our Stack

### What We Have
- Direct Anthropic API calls (Claude)
- Ollama for local models
- Custom CLI setup

### What Pi-Mono Offers
- Unified API across providers
- Production-ready agent core
- Polished TUI library
- vLLM deployment tooling

### Potential Adoption
1. **pi-ai** — If we need multi-provider support
2. **pi-tui** — For better CLI interfaces
3. **pi-agent-core** — Study their tool calling patterns

---

## Author

**Mario Zechner** (@badlogic)
- Creator of libGDX (popular Java game framework)
- Experienced open source maintainer
- Good track record for quality code

---

## Activity Assessment

- **Active** — 613 stars today
- **Recent commits** — Multiple per week
- **Good documentation** — CONTRIBUTING.md, AGENTS.md
- **Discord community** — Active support

---

## Recommendation

**Priority: MEDIUM — Study architecture**

Worth exploring for:
1. The unified LLM API abstraction pattern
2. Agent core architecture
3. TUI library for CLI improvements
4. Monorepo structure patterns

---

## Links

- GitHub: https://github.com/badlogic/pi-mono
- Website: https://shittycodingagent.ai (lol)
- Discord: https://discord.com/invite/3cU7Bz4UPx
- Coding Agent: packages/coding-agent
