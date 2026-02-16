# GitHub Trending — 2026-02-16

## Summary
- Scanned: ~75 repos across 5 categories (all, Python, TypeScript, JavaScript, Rust)
- Relevant: 14 repos
- Top pick: ChromeDevTools/chrome-devtools-mcp

## Notable Trends
- **MCP everywhere**: Chrome DevTools MCP, GitHub Agentic Workflows MCP Gateway — MCP is becoming the standard agent-tool interface
- **AI coding agents maturing**: Mistral Vibe, GSD meta-prompting, Claude skills collections — the "agent-assisted dev" space is exploding
- **Knowledge graphs for agents**: Rowboat uses persistent knowledge graphs instead of cold RAG retrieval
- **Vector DBs proliferating**: alibaba/zvec (in-process), ruvnet/ruvector (distributed + GNN), chroma (Rust rewrite)

---

## Top Repos

### 1. ChromeDevTools/chrome-devtools-mcp
- **Language:** TypeScript
- **URL:** https://github.com/ChromeDevTools/chrome-devtools-mcp
- **Description:** Official Chrome DevTools MCP server — gives coding agents full browser control, debugging, perf analysis via Puppeteer
- **Why Interesting:** Official Google/Chrome team MCP server. Works with Claude Code, Cursor, Copilot. Full DevTools access for agents.
- **Potential Use:** Replace our stealth-browse/browser-use stack for debugging. Add to Claude Code MCP config.
- **Action:** [Integrate]

### 2. github/gh-aw
- **Language:** TypeScript
- **URL:** https://github.com/github/gh-aw
- **Description:** Write agentic workflows in natural language markdown, run them in GitHub Actions. Sandboxed, security-first.
- **Why Interesting:** GitHub's official agentic workflow system. Natural language → Actions. MCP Gateway companion. Read-only by default with sanitized outputs.
- **Potential Use:** Automate repo maintenance, CI/CD with AI agents. Could power automated code review workflows.
- **Action:** [Explore]

### 3. rowboatlabs/rowboat
- **Language:** TypeScript
- **URL:** https://github.com/rowboatlabs/rowboat
- **Description:** Open-source AI coworker that builds a knowledge graph from email/meetings, acts on it. Local-first, Obsidian-compatible Markdown vault.
- **Why Interesting:** Persistent knowledge graph > cold RAG. Background agents for recurring tasks. MCP-extensible. Very aligned with how we already work.
- **Potential Use:** Could inspire improvements to our memory system. The knowledge graph approach is compelling.
- **Action:** [Explore]

### 4. HKUDS/RAG-Anything
- **Language:** Python
- **URL:** https://github.com/HKUDS/RAG-Anything
- **Description:** All-in-One RAG framework — handles any document type
- **Why Interesting:** Universal RAG that handles mixed modalities
- **Potential Use:** Could enhance our QMD research pipeline
- **Action:** [Watch]

### 5. resemble-ai/chatterbox
- **Language:** Python
- **URL:** https://github.com/resemble-ai/chatterbox
- **Description:** State-of-the-art open-source TTS
- **Why Interesting:** We use claw-speak/ki-speak. A SoTA open-source alternative could improve voice quality.
- **Potential Use:** Evaluate as replacement for our TTS pipeline
- **Action:** [Explore]

### 6. mistralai/mistral-vibe
- **Language:** Python
- **URL:** https://github.com/mistralai/mistral-vibe
- **Description:** Minimal CLI coding agent by Mistral
- **Why Interesting:** Mistral's answer to Claude Code. Worth understanding the competition.
- **Potential Use:** Reference for agent design patterns
- **Action:** [Watch]

### 7. gsd-build/get-shit-done
- **Language:** JavaScript
- **URL:** https://github.com/gsd-build/get-shit-done
- **Description:** Meta-prompting, context engineering and spec-driven development system for Claude Code and OpenCode
- **Why Interesting:** Directly relevant to our Claude Code workflow. Context engineering patterns.
- **Potential Use:** Steal good patterns for our AGENTS.md / skills system
- **Action:** [Explore]

### 8. Jeffallan/claude-skills
- **Language:** Python
- **URL:** https://github.com/Jeffallan/claude-skills
- **Description:** 66 specialized skills for full-stack developers, transforms Claude Code into expert pair programmer
- **Why Interesting:** Ready-made Claude Code skills collection
- **Potential Use:** Cherry-pick useful skills for our setup
- **Action:** [Explore]

### 9. alibaba/zvec
- **Language:** Mixed
- **URL:** https://github.com/alibaba/zvec
- **Description:** Lightweight, lightning-fast, in-process vector database
- **Why Interesting:** In-process = no server overhead. From Alibaba.
- **Potential Use:** Could complement or replace QMD for certain use cases
- **Action:** [Watch]

### 10. The-Pocket/PocketFlow
- **Language:** Python
- **URL:** https://github.com/The-Pocket/PocketFlow
- **Description:** 100-line LLM framework — "Let Agents build Agents!"
- **Why Interesting:** Extreme minimalism in agent frameworks
- **Potential Use:** Reference architecture for simple agent patterns
- **Action:** [Watch]

### 11. SynkraAI/aios-core
- **Language:** JavaScript
- **URL:** https://github.com/SynkraAI/aios-core
- **Description:** AI-Orchestrated System for Full Stack Development — Core Framework v4.0
- **Why Interesting:** Full-stack AI dev orchestration
- **Potential Use:** Compare with our multi-agent approach
- **Action:** [Watch]

### 12. shiyu-coder/Kronos
- **Language:** Python
- **URL:** https://github.com/shiyu-coder/Kronos
- **Description:** Foundation model for the language of financial markets
- **Why Interesting:** Specialized finance LLM — relevant for trading/analysis interests
- **Potential Use:** Financial analysis automation
- **Action:** [Watch]

### 13. ruvnet/ruvector
- **Language:** Rust
- **URL:** https://github.com/ruvnet/ruvector
- **Description:** Distributed vector DB with Raft consensus and Graph Neural Network self-improving index
- **Why Interesting:** GNN-powered self-improving vector search is novel
- **Potential Use:** Future vector DB needs at scale
- **Action:** [Watch]

### 14. facebook/pyrefly
- **Language:** Rust
- **URL:** https://github.com/facebook/pyrefly
- **Description:** Fast type checker and language server for Python
- **Why Interesting:** Facebook's Rust-based Python type checker — could be much faster than mypy/pyright
- **Potential Use:** Add to our Python dev toolchain
- **Action:** [Watch]
