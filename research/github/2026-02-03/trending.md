# GitHub Trending — 2026-02-03

## Summary
- **Scanned:** ~75 repos across 5 categories (all, python, typescript, javascript, rust)
- **Relevant:** 15 repos matching Marb's interests
- **Top Pick:** thedotmack/claude-mem — persistent memory for Claude Code

## Notable Trends
1. **Agent Infrastructure Explosion** — 8+ repos focused on AI agent tooling (orchestration, memory, sandboxing)
2. **Claude Ecosystem Growing** — claude-mem, AGENTS.md format, agent orchestration all trending
3. **Memory/RAG Innovation** — PageIndex (vectorless RAG), memvid (single-file memory), claude-mem all solving context persistence
4. **Rust for Agent Infra** — microsandbox, memvid-core, prek all written in Rust for performance

---

## Top Repos

### 1. thedotmack/claude-mem ⭐ TOP PICK
- **Language:** TypeScript
- **URL:** https://github.com/thedotmack/claude-mem
- **Description:** Claude Code plugin that automatically captures session context, compresses it with AI, and injects relevant context into future sessions
- **Why Interesting:** Solves exactly what we've been building manually with AGENTS.md/MEMORY.md — persistent memory across Claude sessions
- **Key Features:**
  - Automatic context capture via lifecycle hooks
  - AI-powered compression using agent-sdk
  - Progressive disclosure with token cost visibility
  - Web viewer UI at localhost:37777
  - Hybrid search (BM25 + vector via Chroma)
- **Potential Use:** Could replace or augment our current SESSION-STATE.md workflow
- **Action:** [Explore] — Test in a Claude Code session this week

### 2. karpathy/nanochat
- **Language:** Python
- **URL:** https://github.com/karpathy/nanochat
- **Description:** Train your own GPT-2 capability LLM for ~$73 (3 hours on 8xH100) with full ChatGPT-like UI
- **Why Interesting:** Karpathy democratizing LLM training — complete pipeline from tokenization to chat UI
- **Key Features:**
  - Single speedrun.sh script does everything
  - Beats GPT-2 CORE score in 3 hours
  - Includes SFT, RL stages
  - Identity customization via synthetic data
- **Potential Use:** Educational — understanding training pipeline; could train domain-specific small models
- **Action:** [Watch] — Bookmark for when we need to train custom models

### 3. agentsmd/agents.md
- **Stars:** 16.7k
- **Language:** TypeScript (website)
- **URL:** https://github.com/agentsmd/agents.md
- **Description:** Open format for guiding coding agents — like README but for AI
- **Why Interesting:** We already use AGENTS.md! This is the official spec/standard emerging
- **Potential Use:** Align our format with the emerging standard
- **Action:** [Integrate] — Review spec and update our AGENTS.md if needed

### 4. memvid/memvid
- **Language:** Rust
- **URL:** https://github.com/memvid/memvid
- **Description:** Single-file memory layer for AI agents — replaces complex RAG with portable .mv2 files
- **Why Interesting:** Serverless, portable memory with sub-5ms retrieval, no database needed
- **Key Features:**
  - Smart Frames (video-encoding inspired)
  - Time-travel debugging
  - BM25 + vector search
  - Multi-modal (PDF, audio, images)
  - Encryption support
- **Potential Use:** Could replace QMD for agent memory — simpler, more portable
- **Action:** [Explore] — Test with our research corpus

### 5. zerocore-ai/microsandbox
- **Language:** Rust
- **URL:** https://github.com/zerocore-ai/microsandbox
- **Description:** Self-hosted sandboxes for AI agents — secure microVM execution
- **Why Interesting:** Solves safe code execution for agents without cloud dependencies
- **Key Features:**
  - Hardware isolation via microVMs
  - Fast startup
  - SDKs for Python, JS, Rust
  - Project-based workflow (Sandboxfile)
- **Potential Use:** Safe code execution for agent builds
- **Action:** [Watch] — Useful when we need sandboxed execution

### 6. pedramamini/Maestro
- **Language:** TypeScript
- **URL:** https://github.com/pedramamini/Maestro
- **Description:** Agent Orchestration Command Center
- **Why Interesting:** Multi-agent orchestration tooling
- **Action:** [Watch]

### 7. badlogic/pi-mono
- **Language:** TypeScript
- **URL:** https://github.com/badlogic/pi-mono
- **Description:** AI agent toolkit: coding agent CLI, unified LLM API, TUI & web UI libraries, Slack bot
- **Why Interesting:** Comprehensive agent toolkit with unified LLM API
- **Action:** [Watch]

### 8. VectifyAI/PageIndex
- **Language:** Python
- **URL:** https://github.com/VectifyAI/PageIndex
- **Description:** Vectorless, reasoning-based RAG for document indexing
- **Why Interesting:** Novel approach to RAG without embeddings — uses reasoning instead
- **Action:** [Explore] — Could be interesting alternative to vector search

### 9. langchain-ai/social-media-agent
- **Stars:** 2,154 (+47 today)
- **Language:** TypeScript
- **URL:** https://github.com/langchain-ai/social-media-agent
- **Description:** Agent for sourcing, curating, and scheduling social media posts with human-in-the-loop
- **Why Interesting:** Official LangChain social media automation
- **Action:** [Explore] — Relevant for Twitter automation

### 10. ThePrimeagen/99
- **Language:** Unknown
- **URL:** https://github.com/ThePrimeagen/99
- **Description:** "Neovim AI agent done right"
- **Why Interesting:** ThePrimeagen building AI into Neovim
- **Action:** [Watch]

### 11. openclaw/openclaw
- **Language:** TypeScript
- **URL:** https://github.com/openclaw/openclaw
- **Description:** Personal AI assistant — any OS, any platform, "the lobster way"
- **Why Interesting:** Cross-platform personal AI assistant
- **Action:** [Watch]

### 12. amantus-ai/vibetunnel
- **Language:** TypeScript
- **URL:** https://github.com/amantus-ai/vibetunnel
- **Description:** Turn any browser into your terminal & command agents on the go
- **Why Interesting:** Browser-as-terminal for agent control
- **Action:** [Watch]

### 13. max-sixty/worktrunk
- **Language:** Rust
- **URL:** https://github.com/max-sixty/worktrunk
- **Description:** Git worktree management CLI designed for parallel AI agent workflows
- **Why Interesting:** Solves multi-agent Git coordination — exactly what CooperBench showed is hard
- **Action:** [Explore] — Could help with parallel agent builds

### 14. j178/prek
- **Language:** Rust
- **URL:** https://github.com/j178/prek
- **Description:** Better pre-commit, re-engineered in Rust
- **Why Interesting:** Fast pre-commit hooks — dev tool improvement
- **Action:** [Watch]

### 15. EFForg/rayhunter
- **Language:** Rust
- **URL:** https://github.com/EFForg/rayhunter
- **Description:** Tool to detect cell site simulators (IMSI catchers) on Orbic mobile hotspot
- **Why Interesting:** Privacy/security tool from EFF
- **Action:** [Watch] — Cool security project

---

## Categorized

### AI/Agents (8)
- claude-mem, Maestro, pi-mono, PageIndex, social-media-agent, 99, openclaw, vibetunnel

### Memory/RAG (3)
- claude-mem, memvid, PageIndex

### Developer Tools (3)
- worktrunk, prek, microsandbox

### Security/Privacy (1)
- rayhunter

---

## Quick Recommendations

| Priority | Repo | Action |
|----------|------|--------|
| 🔥 High | claude-mem | Test this week — solves our memory problem |
| 🔥 High | memvid | Evaluate as QMD replacement |
| 📌 Medium | agents.md | Review spec, align our format |
| 📌 Medium | social-media-agent | Check for Twitter automation patterns |
| 📌 Medium | worktrunk | Evaluate for parallel agent workflows |
