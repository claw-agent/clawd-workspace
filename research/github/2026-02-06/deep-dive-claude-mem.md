# Deep Dive: thedotmack/claude-mem

**URL:** https://github.com/thedotmack/claude-mem
**Language:** TypeScript
**License:** AGPL-3.0

## Overview

Claude-Mem is a Claude Code plugin that provides persistent memory across coding sessions. It automatically captures tool usage observations, generates semantic summaries, and injects relevant context into future sessions.

## Key Features

### Core Functionality
- **Persistent Memory** — Context survives across sessions (exactly what we've been doing manually)
- **Progressive Disclosure** — Layered memory retrieval with token cost visibility
- **Skill-Based Search** — Natural language queries via `mem-search`
- **Web Viewer UI** — Real-time memory stream at http://localhost:37777
- **Privacy Control** — Tags to exclude sensitive content from storage
- **Automatic Operation** — No manual intervention required
- **Citations** — Reference past observations with IDs

### Technical Architecture

**Components:**
1. **5 Lifecycle Hooks** — SessionStart, UserPromptSubmit, PostToolUse, Stop, SessionEnd
2. **Worker Service** — HTTP API on port 37777 with web viewer UI and 10 search endpoints
3. **SQLite Database** — Stores sessions, observations, summaries
4. **Chroma Vector Database** — Hybrid semantic + keyword search
5. **Bun Runtime** — JavaScript runtime and process manager

**MCP Search Tools (3-Layer Workflow):**
1. `search` — Get compact index with IDs (~50-100 tokens/result)
2. `timeline` — Get chronological context around interesting results
3. `get_observations` — Fetch full details ONLY for filtered IDs (~500-1,000 tokens)

This gives ~10x token savings by filtering before fetching details.

## Installation

```bash
# In Claude Code terminal
/plugin marketplace add thedotmack/claude-mem
/plugin install claude-mem
# Restart Claude Code
```

## How It Compares to Our Current System

| Feature | Our System (AGENTS.md) | claude-mem |
|---------|------------------------|------------|
| Storage | Manual markdown files | SQLite + Chroma |
| Search | QMD / file grep | Hybrid semantic + FTS5 |
| Injection | Read files at session start | Automatic context priming |
| Compression | Manual distillation | AI-powered summarization |
| Memory Types | Daily notes + MEMORY.md | Observations + Summaries |
| Human Effort | Medium (write to files) | Zero (automatic) |

## Potential Integration

**Option 1: Replace our system**
- Pro: Fully automatic, better search
- Con: Less transparent, AGPL license, lose our curated structure

**Option 2: Complement our system**
- Use claude-mem for automatic capture
- Keep MEMORY.md for curated long-term learnings
- Use claude-mem's search for "what did I do"
- Use MEMORY.md for "who am I"

**Option 3: Learn from it**
- Study their architecture
- Implement similar patterns in our AGENTS.md system
- Keep full control and transparency

## Concerns

1. **AGPL License** — Viral copyleft, could affect derivative works
2. **Solana Token ($CMEM)** — Has associated crypto token, which is... odd for a dev tool
3. **Ragtime Component** — Has separate noncommercial license
4. **Dependencies** — Requires Bun, uv, Node.js 18+
5. **Port Usage** — Takes port 37777

## Recommendation

**Try it.** The token optimization patterns (progressive disclosure, 3-layer search) are valuable even if we don't keep it. Their architecture docs are excellent and could inform improvements to our system.

However, keep our MEMORY.md system running in parallel — it serves a different purpose (curated identity/learnings vs. automatic session capture).

## Resources

- Documentation: https://docs.claude-mem.ai/
- Discord: https://discord.com/invite/J4wttp9vDu
- Twitter: @Claude_Memory
