# Deep Dive: cloudflare/agents

**Date:** 2026-02-05  
**URL:** https://github.com/cloudflare/agents  
**Language:** TypeScript  
**License:** MIT  
**Status:** Active development

---

## What It Does

Cloudflare Agents is a framework for building **intelligent, stateful agents** that persist and operate at the edge of the network (Cloudflare's global infrastructure).

---

## Vision

AI agents that can:
- Maintain persistent state and memory
- Engage in real-time communication
- Process and learn from interactions
- Operate autonomously at global scale
- **Hibernate when idle, awaken when needed**

That last point is key — serverless agent deployment with automatic sleep/wake.

---

## Current Status

### Ready for Use
- Core agent framework with state management
- Real-time WebSocket communication
- HTTP endpoints and routing
- React integration hooks
- Basic AI chat capabilities

### In Development
- Advanced memory systems
- WebRTC for audio/video
- Email integration
- Evaluation framework
- Enhanced observability
- Self-hosting guide

---

## Quick Start

```bash
# Create new project from template
npm create cloudflare@latest -- --template cloudflare/agents-starter

# Or add to existing project
npm install agents
```

---

## Documentation Highlights

Notable guides included:
- **[Anthropic Patterns](guides/anthropic-patterns/README.md)** — Building effective agents using Anthropic's patterns
- **[Human in the Loop](guides/human-in-the-loop/README.md)** — Approval workflows
- **[Playground](examples/playground/README.md)** — Interactive examples

---

## Relevance to Our Setup

### Potential Use Cases
1. **Deployed agent services** — Production agents that users interact with
2. **Background workers** — Long-running tasks that hibernate when not in use
3. **Real-time features** — WebSocket-based chat/collaboration

### Advantages
- Edge deployment (low latency globally)
- Built-in state management
- Hibernation = cost efficient
- MIT license (permissive)
- First-party Cloudflare support

### Considerations
- Cloudflare lock-in (though can self-host)
- Early-stage framework
- Need Cloudflare account/billing

### vs. Current Setup
Our OpenClaw setup runs locally. Cloudflare Agents would be for:
- User-facing services
- Public APIs
- Production deployments

Not a replacement, but complementary for deployed features.

---

## Recommendation

**Action: EXPLORE**

Good to understand for:
1. Future production deployments
2. Agent architecture patterns
3. Edge-native design thinking

Not immediately actionable for local dev workflows, but worth following as the ecosystem develops.

---

## Links
- [Announcement Post](https://blog.cloudflare.com/build-ai-agents-on-cloudflare/)
- [Core Framework Docs](packages/agents/README.md)
- [Anthropic Patterns Guide](guides/anthropic-patterns/README.md)

---

*Deep Dive by Scout Beta | 2026-02-05*
