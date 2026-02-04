# GitHub Trending — 2026-02-04

## Summary
- **Scanned:** ~75 repos across 5 categories (all, Python, TypeScript, JavaScript, Rust)
- **Relevant:** 14 repos matching Marb's interests
- **Top pick:** memvid/memvid — Revolutionary memory layer for AI agents

## Notable Trend
**Agents + Memory = Hot Theme.** Multiple trending repos solving AI agent memory/persistence: memvid, claude-mem, activepieces. The ecosystem is maturing from "one-shot" AI to persistent, stateful agents.

---

## Top Repos

### 1. memvid/memvid ⭐ TOP PICK
- **Language:** Rust
- **URL:** https://github.com/memvid/memvid
- **Description:** Memory layer for AI Agents. Single-file memory system with instant retrieval and long-term memory. Replaces complex RAG pipelines.
- **Why Interesting:** This is exactly what we're building with SESSION-STATE.md and MEMORY.md manually! Memvid does it automatically with:
  - +35% SOTA on LoCoMo benchmark
  - 0.025ms P50 latency
  - Single .mv2 file contains data + embeddings + search index
  - Rust core with Python/Node SDKs
- **Potential Use:** Could replace our manual memory system, integrate with OpenClaw for agent persistence
- **Action:** [DEEP DIVE] — High priority exploration

---

### 2. thedotmack/claude-mem
- **Language:** TypeScript
- **URL:** https://github.com/thedotmack/claude-mem
- **Description:** Claude Code plugin that automatically captures everything Claude does, compresses it with AI, and injects relevant context into future sessions.
- **Why Interesting:** Direct competitor/complement to our AGENTS.md approach. Features:
  - Persistent memory across sessions
  - Progressive disclosure (token-efficient)
  - Web viewer UI at localhost:37777
  - Semantic search via Chroma vector DB
- **Potential Use:** Could adopt their hook-based architecture for our own memory system
- **Action:** [EXPLORE] — Compare with our current approach

---

### 3. openai/codex
- **Language:** Rust
- **URL:** https://github.com/openai/codex
- **Description:** OpenAI's lightweight coding agent that runs in your terminal. Competitor to Claude Code.
- **Why Interesting:** OpenAI entering the terminal agent space validates the category. Can use with ChatGPT Plus subscription (no separate API key).
- **Potential Use:** Benchmark against Claude Code, understand competitive landscape
- **Action:** [WATCH] — Keep an eye on feature parity

---

### 4. activepieces/activepieces
- **Stars:** 20.7k
- **Language:** TypeScript
- **URL:** https://github.com/activepieces/activepieces
- **Description:** Open source Zapier alternative. All-in-one AI automation with ~400 MCP servers! Pieces are written in TypeScript and auto-convert to MCP.
- **Why Interesting:** 
  - ~400 MCP servers available out of the box
  - Open ecosystem (60% community contributed)
  - AI-first with native AI pieces
  - Self-hosted and enterprise-ready
- **Potential Use:** Could use as automation backend for OpenClaw, leverage their MCP servers
- **Action:** [EXPLORE] — Test MCP integration

---

### 5. virattt/dexter
- **Language:** TypeScript
- **URL:** https://github.com/virattt/dexter
- **Description:** Autonomous agent for deep financial research. "Claude Code for finance" — task planning, self-reflection, real-time market data.
- **Why Interesting:** 
  - Intelligent task decomposition
  - Self-validation loops
  - Built-in safety (loop detection, step limits)
  - Good architecture pattern for research agents
- **Potential Use:** Pattern for building specialized research agents, financial research skill
- **Action:** [EXPLORE] — Learn from their agent architecture

---

### 6. katanemo/plano
- **Language:** Rust
- **URL:** https://github.com/katanemo/plano
- **Description:** AI-native proxy and data plane for agentic apps. Handles routing, observability, guardrails so you focus on agent logic.
- **Why Interesting:**
  - Built on Envoy by its core contributors
  - Agent orchestration via YAML config
  - Zero-code OTEL tracing
  - Uses lightweight 4B-param routing model (cost efficient)
- **Potential Use:** Production infrastructure for multi-agent systems
- **Action:** [WATCH] — Interesting for scaling

---

### 7. eyaltoledano/claude-task-master
- **Language:** JavaScript
- **URL:** https://github.com/eyaltoledano/claude-task-master
- **Description:** AI-powered task management for Cursor, Windsurf, Lovable, Roo. Drop-in task system.
- **Why Interesting:**
  - MCP server for task management
  - Works with Claude Code (`claude mcp add taskmaster-ai`)
  - Research model integration (Perplexity)
  - Cross-editor support
- **Potential Use:** Could integrate with OpenClaw for structured task management
- **Action:** [EXPLORE] — Test integration with Claude Code

---

### 8. j178/prek ⭐ DEV TOOL PICK
- **Language:** Rust
- **URL:** https://github.com/j178/prek
- **Description:** Better `pre-commit`, re-engineered in Rust. Single binary, no dependencies, faster.
- **Why Interesting:**
  - Already used by CPython, Apache Airflow, FastAPI, Ruff
  - 3x+ faster than pre-commit
  - Built-in Rust hooks (faster than Python)
  - uv integration for Python environments
  - Monorepo support
- **Potential Use:** Replace pre-commit in our workflows
- **Action:** [INTEGRATE] — Worth switching to

---

### 9. usebruno/bruno
- **Language:** JavaScript
- **URL:** https://github.com/usebruno/bruno
- **Description:** Opensource IDE for exploring and testing APIs. Lightweight alternative to Postman/Insomnia.
- **Why Interesting:** Local-first, git-friendly API testing
- **Potential Use:** API testing for integrations
- **Action:** [WATCH]

---

### 10. farion1231/cc-switch
- **Language:** Rust
- **URL:** https://github.com/farion1231/cc-switch
- **Description:** Cross-platform All-in-One assistant tool for Claude Code, Codex, OpenCode & Gemini CLI.
- **Why Interesting:** Single tool to manage multiple coding agents
- **Potential Use:** Useful if juggling multiple agent CLIs
- **Action:** [WATCH]

---

### 11. gemini-cli-extensions/security
- **Language:** TypeScript
- **URL:** https://github.com/gemini-cli-extensions/security
- **Description:** Google's Security extension for Gemini CLI that finds vulnerabilities in code changes and PRs.
- **Why Interesting:** Google officially supporting security tooling for their CLI
- **Potential Use:** Security analysis automation
- **Action:** [WATCH]

---

### 12. tauri-apps/tauri
- **Language:** Rust
- **URL:** https://github.com/tauri-apps/tauri
- **Description:** Build smaller, faster, and more secure desktop and mobile apps with a web frontend.
- **Why Interesting:** Alternative to Electron, much smaller bundles
- **Potential Use:** Desktop app development
- **Action:** [WATCH] — Already known

---

### 13. cloudflare/pingora
- **Language:** Rust
- **URL:** https://github.com/cloudflare/pingora
- **Description:** Library for building fast, reliable network services. Powers Cloudflare's edge.
- **Why Interesting:** Production-grade networking primitives
- **Potential Use:** Custom proxy/server development
- **Action:** [WATCH]

---

### 14. vercel/turborepo
- **Language:** Rust
- **URL:** https://github.com/vercel/turborepo
- **Description:** Build system optimized for JavaScript and TypeScript, written in Rust.
- **Why Interesting:** Vercel's monorepo tool, great for large JS projects
- **Potential Use:** If we build larger JS projects
- **Action:** [WATCH] — Already known

---

## Categories Summary

| Category | Count | Notable |
|----------|-------|---------|
| AI/Agents | 7 | memvid, claude-mem, codex, activepieces, dexter, plano, task-master |
| Dev Tools | 4 | prek, bruno, cc-switch, turborepo |
| Infrastructure | 2 | tauri, pingora |
| Security | 1 | gemini-cli-extensions/security |

## Key Observations

1. **Memory is the bottleneck**: Multiple repos solving agent memory (memvid, claude-mem). The industry is moving from stateless to stateful agents.

2. **Rust dominance in infrastructure**: OpenAI Codex, memvid, prek, plano, pingora — all Rust. Performance-critical tools are moving to Rust.

3. **MCP everywhere**: Activepieces has 400+ MCP servers. Claude Task Master is MCP-first. MCP is becoming the standard for tool integration.

4. **Agent orchestration maturing**: Plano and Activepieces show that agent infrastructure is becoming a category (routing, observability, guardrails).

5. **Claude Code ecosystem growing**: Multiple tools specifically for Claude Code (claude-mem, task-master, cc-switch).
