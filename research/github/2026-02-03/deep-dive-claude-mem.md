# Deep Dive: thedotmack/claude-mem

## Overview
**Repo:** https://github.com/thedotmack/claude-mem
**Author:** Alex Newman (@thedotmack)
**License:** AGPL-3.0
**Language:** TypeScript

## What It Does
Claude-mem is a Claude Code plugin that provides **persistent memory compression** across coding sessions. It automatically:
1. Captures tool usage observations during sessions
2. Generates semantic summaries using Claude's agent-sdk
3. Stores them in SQLite with FTS5 search
4. Injects relevant context into future sessions

## Architecture

### Core Components
- **5 Lifecycle Hooks:** SessionStart, UserPromptSubmit, PostToolUse, Stop, SessionEnd
- **Worker Service:** HTTP API on port 37777 with web viewer UI
- **SQLite Database:** Stores sessions, observations, summaries
- **Chroma Vector DB:** Hybrid semantic + keyword search
- **mem-search Skill:** Natural language queries

### Key Design Patterns
1. **Progressive Disclosure** — Layered memory retrieval with token cost visibility
2. **3-Layer Workflow:**
   - `search` → Get compact index (~50-100 tokens/result)
   - `timeline` → Get chronological context
   - `get_observations` → Fetch full details ONLY for filtered IDs
   - ~10x token savings by filtering before fetching

### Search Architecture
- **Hybrid Search:** BM25 (Tantivy) + Vector (Chroma HNSW)
- **10 MCP endpoints** for search operations
- **Citation system** with observation IDs

## Installation
```bash
# In Claude Code terminal
/plugin marketplace add thedotmack/claude-mem
/plugin install claude-mem
# Restart Claude Code
```

## Key Features Worth Noting

### 1. Automatic Context Injection
Context from previous sessions automatically appears in new sessions — no manual work needed.

### 2. Web Viewer UI
Real-time memory stream at http://localhost:37777
- View all observations
- Access citations by ID
- Beta channel switching

### 3. Privacy Control
Use tags to exclude sensitive content from storage.

### 4. Beta: Endless Mode
Biomimetic memory architecture for extended sessions. Available via Settings in web viewer.

## Comparison to Our Current System

| Feature | claude-mem | Our AGENTS.md System |
|---------|------------|---------------------|
| Memory Storage | SQLite + Chroma | Markdown files |
| Injection | Automatic via hooks | Manual loading |
| Search | Hybrid BM25 + vector | QMD (BM25 + vector) |
| Context | Observations/summaries | Raw notes + curated memory |
| Portability | Requires plugin | Works anywhere |
| Transparency | Good (web UI) | Excellent (plain files) |

## Potential Integration

### Option 1: Replace Our System
Switch fully to claude-mem for Claude Code sessions.
- Pro: Automatic, less manual work
- Con: Vendor lock-in to their format

### Option 2: Complement Our System  
Use claude-mem for session context, keep MEMORY.md for curated long-term memory.
- Pro: Best of both worlds
- Con: Two systems to maintain

### Option 3: Learn and Adapt
Study their progressive disclosure pattern, potentially improve our own system.
- Pro: Keep our transparent markdown approach
- Con: More development work

## Activity & Maintenance
- Actively maintained (Jan 2026 updates)
- Good documentation
- Active Discord community
- Multiple language translations

## Verdict
**Worth Testing** — This solves a real problem we've been handling manually. The automatic capture + compression is compelling. The AGPL license means we can use and modify but must share changes.

## Next Steps
1. Install in a test Claude Code session
2. Run for a few days, evaluate memory quality
3. Compare retrieval accuracy vs our QMD approach
4. Decide on integration strategy
