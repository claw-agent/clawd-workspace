# Deep Dive: thedotmack/claude-mem

**URL:** https://github.com/thedotmack/claude-mem
**Language:** TypeScript
**License:** AGPL-3.0

## Overview

Claude-mem is a Claude Code plugin that automatically captures everything Claude does during coding sessions, compresses it with AI (using Claude's agent-sdk), and injects relevant context back into future sessions.

## How It Relates to Our Setup

This is essentially a productized version of what we're trying to do with AGENTS.md + SESSION-STATE.md + memory/ folder. Key differences:

| Aspect | Our AGENTS.md | Claude-Mem |
|--------|---------------|------------|
| Capture | Manual (WAL protocol) | Automatic via hooks |
| Compression | None | AI-powered summarization |
| Storage | Markdown files | SQLite + Chroma |
| Search | QMD/grep | Hybrid semantic + keyword |
| Context injection | Manual (read files) | Automatic on session start |
| UI | None | Web viewer at localhost:37777 |

## Architecture

### 6 Lifecycle Hooks

1. **SessionStart** — Inject relevant context
2. **UserPromptSubmit** — Capture user inputs
3. **PostToolUse** — Capture tool observations
4. **Stop** — Handle session stop
5. **SessionEnd** — Generate summaries

Plus a pre-hook for dependency checking.

### Components

- **Worker Service** — HTTP API on port 37777
- **SQLite Database** — Sessions, observations, summaries
- **Chroma Vector Database** — Semantic search
- **mem-search Skill** — Natural language queries

### Progressive Disclosure

Their token-efficient 3-layer workflow:

1. **search** — Get compact index (~50-100 tokens/result)
2. **timeline** — Get chronological context around results
3. **get_observations** — Fetch full details (~500-1,000 tokens/result)

This is smart — ~10x token savings by filtering before fetching.

## Key Features

- 🧠 **Persistent Memory** — Survives across sessions
- 📊 **Progressive Disclosure** — Layered retrieval with token visibility
- 🔍 **Skill-Based Search** — Natural language queries
- 🖥️ **Web Viewer UI** — Real-time memory stream
- 💻 **Claude Desktop Skill** — Search from Desktop app
- 🔒 **Privacy Control** — Tags to exclude sensitive content
- 🔗 **Citations** — Reference past observations by ID

## Installation

```bash
# In Claude Code
/plugin marketplace add thedotmack/claude-mem
/plugin install claude-mem
```

Then restart Claude Code.

## Concerns

1. **AGPL License** — More restrictive than Apache. Derivative works must be open source.
2. **Solana Token?** — The README has a crypto token ($CMEM) which is... odd. Suggests the project may have conflicting incentives.
3. **Complexity** — Requires Bun, SQLite, Chroma. More moving parts than our approach.
4. **Claude Code Only** — Doesn't work with other tools/agents.

## What We Can Learn

1. **Hook-based capture** — Their PostToolUse hook automatically captures everything. We could adopt a similar pattern.

2. **Progressive disclosure** — Their 3-layer search is smart for token management.

3. **Semantic search** — Chroma + hybrid search outperforms our current QMD.

4. **Web viewer** — A local UI for browsing memory would be useful.

## Comparison to Memvid

| Aspect | Claude-Mem | Memvid |
|--------|------------|--------|
| Scope | Claude Code specific | Any agent |
| Storage | SQLite + Chroma | Single .mv2 file |
| Portability | Tied to ~/.claude | Fully portable |
| Performance | Good | Exceptional (0.025ms) |
| License | AGPL | Apache |
| Maturity | More features | Cleaner core |

## Verdict

**WORTH STUDYING, NOT ADOPTING**

The architecture patterns are valuable (hooks, progressive disclosure), but:
- AGPL license is restrictive
- Crypto token is a red flag
- Memvid's approach is cleaner

Recommend: Learn from their patterns, but prefer memvid for implementation.
