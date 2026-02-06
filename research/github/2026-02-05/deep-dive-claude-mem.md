# Deep Dive: thedotmack/claude-mem

**Date:** 2026-02-05  
**URL:** https://github.com/thedotmack/claude-mem  
**Language:** TypeScript  
**License:** AGPL-3.0  
**Version:** 6.5.0

---

## What It Does

Claude-Mem is a **persistent memory compression system** built specifically for Claude Code. It automatically:

1. **Captures** tool usage observations during coding sessions
2. **Compresses** them using Claude's agent-sdk
3. **Injects** relevant context into future sessions

This solves the fundamental problem of context loss between Claude Code sessions.

---

## Key Features

### Core Capabilities
- 🧠 **Persistent Memory** — Context survives across sessions
- 📊 **Progressive Disclosure** — Layered memory retrieval with token cost visibility
- 🔍 **Skill-Based Search** — Query project history with natural language
- 🖥️ **Web Viewer UI** — Real-time memory stream at localhost:37777
- 🔒 **Privacy Control** — `<private>` tags exclude sensitive content
- 🔗 **Citations** — Reference past observations by ID

### Architecture
- **5 Lifecycle Hooks**: SessionStart, UserPromptSubmit, PostToolUse, Stop, SessionEnd
- **Worker Service**: HTTP API on port 37777 with Bun
- **SQLite Database**: Sessions, observations, summaries
- **Chroma Vector DB**: Hybrid semantic + keyword search

### MCP Search Tools
4 MCP tools following token-efficient 3-layer workflow:
1. `search` — Get compact index (~50-100 tokens/result)
2. `timeline` — Get chronological context
3. `get_observations` — Fetch full details for filtered IDs
4. `__IMPORTANT` — Workflow documentation

Claims ~10x token savings via progressive disclosure.

---

## Installation

```bash
# In Claude Code terminal:
> /plugin marketplace add thedotmack/claude-mem
> /plugin install claude-mem
# Restart Claude Code
```

---

## Relevance to Our Setup

### High Alignment
- We already have file-based memory (AGENTS.md, MEMORY.md, daily notes)
- Claude-mem would complement this with automatic capture
- Hook-based architecture similar to our scheduled jobs

### Potential Concerns
- AGPL-3.0 license (copyleft)
- Web service on port 37777 always running
- Unknown interaction with existing context files
- Solana token ($CMEM) promotion in README (crypto project?)

### Integration Questions
1. Does it conflict with our existing AGENTS.md approach?
2. Can we configure what gets captured/excluded?
3. How does compression affect context quality?
4. Memory usage with Bun + Chroma running?

---

## Recommendation

**Action: EXPLORE then potentially INTEGRATE**

Worth testing in a separate environment first:
1. Install on a test project
2. Run for a few sessions
3. Evaluate memory quality and retrieval
4. Check resource usage
5. If good, consider for main workspace

The progressive disclosure + token efficiency claims are compelling. If it works as advertised, could significantly improve multi-session context.

---

## Links
- [Documentation](https://docs.claude-mem.ai)
- [Architecture Overview](https://docs.claude-mem.ai/architecture/overview)
- [Configuration](https://docs.claude-mem.ai/configuration)
- [Discord](https://discord.com/invite/J4wttp9vDu)

---

*Deep Dive by Scout Beta | 2026-02-05*
