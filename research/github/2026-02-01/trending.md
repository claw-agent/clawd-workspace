# GitHub Trending — 2026-02-01

## Summary
- **Scanned:** ~75 repos across 5 categories (All, Python, TypeScript, JavaScript, Rust)
- **Relevant:** 18 repos matching Marb's interests
- **Top pick:** modelcontextprotocol/ext-apps (MCP UI spec - huge for Clawdbot!)

## Key Trends Observed
1. **MCP Ecosystem Exploding** — Official ext-apps SDK just stabilized (spec 2026-01-26), enabling UIs in chatbots
2. **Agentic Coding War** — Cline, Kilocode, and others battling for the coding agent crown
3. **Multi-Agent Platforms** — LobeHub, Maestro showing multi-agent collaboration is maturing
4. **AI Tool Tracking** — git-ai-project/git-ai now tracks AI-generated code in repos

---

## Top Repos

### 1. modelcontextprotocol/ext-apps ⭐⭐⭐
- **Language:** TypeScript
- **URL:** https://github.com/modelcontextprotocol/ext-apps
- **Description:** Official MCP Apps Extension SDK — lets MCP servers display interactive UIs in chatbots
- **Why Interesting:** This is THE missing piece for MCP! Tools can now return interactive UI (maps, charts, forms, video players) that render inline in conversations. Spec just went stable 2026-01-26.
- **Potential Use:** Could integrate with Clawdbot to render rich UIs from MCP tools
- **Action:** [INTEGRATE] — Priority 1, directly relevant to our MCP stack

### 2. cline/cline
- **Stars:** 30k+ (established)
- **Language:** TypeScript
- **URL:** https://github.com/cline/cline
- **Description:** Autonomous coding agent in VS Code with human-in-the-loop approval
- **Why Interesting:** Best-in-class coding agent. Creates/edits files, runs terminal, uses browser, creates MCP tools dynamically. Enterprise-ready now.
- **Potential Use:** Reference architecture for agent patterns, or use as a tool
- **Action:** [Watch] — Already established, but worth tracking updates

### 3. Kilo-Org/kilocode
- **Stars:** 14.8k
- **Language:** TypeScript
- **URL:** https://github.com/Kilo-Org/kilocode
- **Description:** All-in-one agentic engineering platform, #1 on OpenRouter, 750k+ users
- **Why Interesting:** Massive scale (6.1T tokens/month!), has inline autocomplete + multi-mode (Architect/Coder/Debugger), MCP marketplace
- **Potential Use:** Competition analysis, pattern inspiration for agentic workflows
- **Action:** [Explore] — Their multi-mode concept is interesting

### 4. reconurge/flowsint
- **Stars:** 2,229 (+120 today)
- **Language:** TypeScript
- **URL:** https://github.com/reconurge/flowsint
- **Description:** Graph-based investigation platform for cybersecurity analysts
- **Why Interesting:** Visual, flexible, extensible graph investigations — could be useful for research automation
- **Potential Use:** OSINT/research workflows
- **Action:** [Explore]

### 5. badlogic/pi-mono
- **Language:** TypeScript
- **URL:** https://github.com/badlogic/pi-mono
- **Description:** AI agent toolkit: coding agent CLI, unified LLM API, TUI & web UI libraries, Slack bot, vLLM pods
- **Why Interesting:** Unified toolkit approach — CLI + UI + bots in one mono repo
- **Potential Use:** Architecture patterns
- **Action:** [Watch]

### 6. triggerdotdev/trigger.dev
- **Language:** TypeScript
- **URL:** https://github.com/triggerdotdev/trigger.dev
- **Description:** Build and deploy fully-managed AI agents and workflows
- **Why Interesting:** Serverless agent workflows, could replace custom scheduling
- **Potential Use:** Alternative to cron-based agent scheduling
- **Action:** [Explore]

### 7. pedramamini/Maestro
- **Language:** TypeScript
- **URL:** https://github.com/pedramamini/Maestro
- **Description:** Agent Orchestration Command Center
- **Why Interesting:** Multi-agent orchestration visualization
- **Potential Use:** Reference for agent coordination patterns
- **Action:** [Watch]

### 8. asgeirtj/system_prompts_leaks
- **Language:** JavaScript
- **URL:** https://github.com/asgeirtj/system_prompts_leaks
- **Description:** Collection of extracted system prompts from ChatGPT, Claude, Gemini
- **Why Interesting:** Competitive intelligence on how major models are prompted
- **Potential Use:** Inspiration for agent prompts
- **Action:** [Explore]

### 9. huggingface/transformers.js
- **Language:** JavaScript
- **URL:** https://github.com/huggingface/transformers.js
- **Description:** Run 🤗 Transformers in browser, no server needed
- **Why Interesting:** Edge ML without API costs
- **Potential Use:** Client-side embeddings, classification
- **Action:** [Watch]

### 10. git-ai-project/git-ai
- **Language:** Rust
- **URL:** https://github.com/git-ai-project/git-ai
- **Description:** Git extension for tracking AI-generated code in repos
- **Why Interesting:** Solves the "what code did AI write?" problem
- **Potential Use:** Could use for our own repos to track AI contributions
- **Action:** [Explore]

### 11. rustfs/rustfs
- **Stars:** Trending
- **Language:** Rust
- **URL:** https://github.com/rustfs/rustfs
- **Description:** 2.3x faster than MinIO for 4KB objects, S3-compatible
- **Why Interesting:** High-performance object storage, Rust-native
- **Potential Use:** Self-hosted storage if needed
- **Action:** [Watch]

### 12. lancedb/lancedb
- **Language:** Rust
- **URL:** https://github.com/lancedb/lancedb
- **Description:** Developer-friendly embedded retrieval for multimodal AI
- **Why Interesting:** Embedded vector DB, no server needed
- **Potential Use:** Local embeddings storage for memory system
- **Action:** [Explore]

### 13. jj-vcs/jj
- **Language:** Rust
- **URL:** https://github.com/jj-vcs/jj
- **Description:** Git-compatible VCS that's both simple and powerful
- **Why Interesting:** Modern Git alternative, Mercurial-inspired
- **Potential Use:** Might be better for AI-assisted development
- **Action:** [Watch]

### 14. lobehub/lobehub
- **Language:** TypeScript
- **URL:** https://github.com/lobehub/lobehub
- **Description:** Multi-agent collaboration platform with agent team design
- **Why Interesting:** "Agents as unit of work" concept
- **Potential Use:** Architecture inspiration
- **Action:** [Watch]

### 15. suitenumerique/meet
- **Language:** TypeScript
- **URL:** https://github.com/suitenumerique/meet
- **Description:** Open source video conferencing powered by LiveKit
- **Why Interesting:** Self-hosted video alternative
- **Potential Use:** If ever need private video calls
- **Action:** [Skip]

---

## Categories Summary

| Category | Count |
|----------|-------|
| AI/Agents | 9 |
| MCP/Claude Ecosystem | 2 |
| Developer Tools | 4 |
| Rust CLI/Infra | 3 |

## Recommendation Priority

1. **IMMEDIATE**: Clone and study `modelcontextprotocol/ext-apps` — this could transform Clawdbot's UI capabilities
2. **THIS WEEK**: Check out `git-ai-project/git-ai` for tracking AI code
3. **BACKGROUND**: Keep eyes on Kilocode and Cline for patterns
