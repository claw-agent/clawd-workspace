# Deep Dive: thedotmack/claude-mem

**URL:** https://github.com/thedotmack/claude-mem  
**Stars:** 16,994 (+196 today)  
**Language:** TypeScript  
**License:** AGPL-3.0

---

## What Is It?

Claude-Mem is a **persistent memory compression system** for Claude Code. It automatically captures tool usage, generates semantic summaries, and injects relevant context into future sessions.

Key value prop: *"Claude maintains continuity of knowledge about projects even after sessions end."*

---

## Core Architecture

### Components
1. **5 Lifecycle Hooks** — SessionStart, UserPromptSubmit, PostToolUse, Stop, SessionEnd
2. **Worker Service** — HTTP API on port 37777 with web viewer UI
3. **SQLite Database** — Stores sessions, observations, summaries
4. **Chroma Vector Database** — Hybrid semantic + keyword search
5. **mem-search Skill** — Natural language queries

### How It Works

```
Claude Code Session
        │
        ▼
┌─────────────────────────────────┐
│     Lifecycle Hooks             │
│  (capture tool observations)    │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│     Worker Service (Bun)        │
│     http://localhost:37777      │
│  ┌─────────┐  ┌──────────────┐  │
│  │ SQLite  │  │ Chroma (Vec) │  │
│  └─────────┘  └──────────────┘  │
└──────────────┬──────────────────┘
               │
               ▼
        Future Sessions
     (context injection)
```

---

## Key Features

### Automatic Memory Capture
- Captures all tool usage observations
- Generates semantic summaries
- No manual intervention required

### Progressive Disclosure
- Layered memory retrieval with token cost visibility
- 3-layer workflow: search → timeline → get_observations
- ~10x token savings by filtering before fetching

### MCP Search Tools
1. **search** — Full-text queries with filters (~50-100 tokens/result)
2. **timeline** — Chronological context around observations
3. **get_observations** — Full details by IDs (~500-1000 tokens/result)
4. **__IMPORTANT** — Workflow docs (always visible)

### Web Viewer UI
- Real-time memory stream at http://localhost:37777
- Browse sessions, observations, summaries
- Settings management
- Beta channel switching

### Privacy Control
- Use `<private>` tags to exclude sensitive content
- Fine-grained context injection settings
- Local-only storage (no cloud)

---

## Installation

```bash
# In Claude Code terminal:
> /plugin marketplace add thedotmack/claude-mem
> /plugin install claude-mem
# Restart Claude Code
```

---

## Comparison to Our Memory Approach

### Our Current System (AGENTS.md)
- `SESSION-STATE.md` — Active task state (RAM)
- `memory/YYYY-MM-DD.md` — Daily notes (raw logs)
- `MEMORY.md` — Long-term curated memories
- Manual write-ahead logging (WAL protocol)
- QMD for search (BM25 + vector)

### Claude-Mem Approach
- Automatic capture via hooks
- SQLite + Chroma storage
- Progressive disclosure for token efficiency
- Structured observations with types/tags
- Built-in search MCP tools

### Key Differences
| Aspect | Our Approach | Claude-Mem |
|--------|--------------|------------|
| Capture | Manual WAL protocol | Automatic hooks |
| Storage | Markdown files | SQLite + Vector DB |
| Search | QMD (external) | Built-in MCP tools |
| Format | Prose/notes | Structured observations |
| Curation | Human-curated MEMORY.md | AI-compressed |

### What We Could Adopt
1. **Progressive disclosure pattern** — Token-efficient retrieval
2. **Automatic observation capture** — Less manual writing
3. **Structured observation types** — Better categorization
4. **Web viewer** — Visual memory exploration

### What's Better About Our Approach
1. **Human curation** — MEMORY.md has human judgment
2. **Simpler setup** — No additional services
3. **Platform agnostic** — Works anywhere with files
4. **Full transparency** — Markdown is readable

---

## Activity Assessment

- **Very Active** — Trending consistently
- **Good documentation** — Comprehensive docs site
- **Discord community** — Active support
- **Internationalized** — 25+ language READMEs

---

## Recommendation

**Priority: HIGH — Test integration**

Worth testing to compare with our memory approach:
1. Install on a test project
2. Compare context quality to our SESSION-STATE.md
3. Consider hybrid approach (keep MEMORY.md for curation, use claude-mem for automatic capture)

---

## Links

- GitHub: https://github.com/thedotmack/claude-mem
- Docs: https://docs.claude-mem.ai
- Discord: https://discord.com/invite/J4wttp9vDu
- Author: @thedotmack
