# GitHub Trending — 2026-02-06

## Summary
- **Scanned:** ~75 repos across 5 categories (All, Python, TypeScript, JavaScript, Rust)
- **Relevant:** 22 repos matching Marb's interests
- **Top Pick:** thedotmack/claude-mem — Persistent memory for Claude Code sessions

## Key Trends Observed

1. **AI Coding Agents Everywhere** — All three major LLM providers (OpenAI, Google, Anthropic) now have terminal-based coding agents trending simultaneously
2. **Memory/Context is the Frontier** — Multiple repos focused on giving AI agents persistent memory (claude-mem, cognee, memvid)
3. **Skills Catalogs Emerging** — Both OpenAI and Anthropic releasing "skills" repos for agent capabilities
4. **MCP Integration Accelerating** — Activepieces advertising "400 MCP servers" shows the protocol gaining traction

---

## Top Repos

### 1. thedotmack/claude-mem ⭐ TOP PICK
- **Language:** TypeScript
- **URL:** https://github.com/thedotmack/claude-mem
- **Description:** Claude Code plugin that captures everything Claude does during coding sessions, compresses it with AI, and injects relevant context back into future sessions
- **Why Interesting:** This is EXACTLY what we've been building manually with MEMORY.md and daily notes. It automates the persistence layer for Claude Code.
- **Potential Use:** Could enhance our existing memory system or inspire improvements
- **Action:** [Integrate] — Try installing as Claude Code plugin

### 2. google-gemini/gemini-cli
- **Language:** TypeScript
- **URL:** https://github.com/google-gemini/gemini-cli
- **Description:** Open-source AI agent bringing Gemini to the terminal. Free tier: 60 req/min, 1000 req/day
- **Why Interesting:** Google's answer to Claude Code. Open source (Apache 2.0), MCP support, built-in tools (search, file ops, shell)
- **Potential Use:** Alternative agent for specific tasks; test Gemini 3's capabilities
- **Action:** [Explore] — Install and compare to Claude Code

### 3. openai/codex
- **Language:** Rust
- **URL:** https://github.com/openai/codex
- **Description:** Lightweight coding agent that runs in your terminal (CLI from OpenAI)
- **Why Interesting:** OpenAI's terminal agent. Written in Rust for performance. Integrates with ChatGPT Plus/Pro plans
- **Potential Use:** Compare approaches; Rust implementation interesting for performance-sensitive work
- **Action:** [Watch] — Already have Claude, but worth monitoring

### 4. bytedance/UI-TARS-desktop
- **Language:** TypeScript
- **URL:** https://github.com/bytedance/UI-TARS-desktop
- **Description:** Open-source multimodal AI agent stack connecting cutting-edge AI models and agent infra
- **Why Interesting:** ByteDance open-sourcing their agent infrastructure
- **Potential Use:** Architecture patterns for multi-agent systems
- **Action:** [Explore]

### 5. openai/skills & anthropics/skills
- **Language:** Python
- **URL:** https://github.com/openai/skills | https://github.com/anthropics/skills
- **Description:** Skills catalogs for Codex and Agent Skills respectively
- **Why Interesting:** Both major AI labs releasing skills repos simultaneously — converging on similar patterns
- **Potential Use:** Reference for building our own skills; grab useful patterns
- **Action:** [Explore]

### 6. activepieces/activepieces
- **Language:** TypeScript
- **URL:** https://github.com/activepieces/activepieces
- **Description:** AI Agents & MCPs & AI Workflow Automation — claims ~400 MCP servers for AI agents
- **Why Interesting:** MCP protocol gaining real traction. Could be our n8n replacement with native AI agent support
- **Potential Use:** Workflow automation with MCP integration
- **Action:** [Explore]

### 7. topoteretes/cognee
- **Language:** Python
- **URL:** https://github.com/topoteretes/cognee
- **Description:** Memory for AI Agents in 6 lines of code
- **Why Interesting:** Another memory solution for agents — simpler than claude-mem
- **Potential Use:** Compare approaches to agent memory
- **Action:** [Watch]

### 8. GH05TCREW/pentestagent
- **Language:** Python
- **Stars:** 1,415 (+49 today)
- **URL:** https://github.com/GH05TCREW/pentestagent
- **Description:** AI agent framework for black-box security testing, bug bounty, red-team, and penetration testing
- **Why Interesting:** Security-focused AI agent framework gaining traction fast
- **Potential Use:** Security research; could be interesting for XPERIENCE security offerings
- **Action:** [Watch]

### 9. virattt/dexter
- **Language:** TypeScript
- **URL:** https://github.com/virattt/dexter
- **Description:** Autonomous agent for deep financial research
- **Why Interesting:** Domain-specific agent for finance — could inform our research patterns
- **Potential Use:** Study architecture for specialized research agents
- **Action:** [Watch]

### 10. memvid/memvid
- **Language:** Rust
- **URL:** https://github.com/memvid/memvid
- **Description:** Memory layer for AI Agents — replace complex RAG pipelines with serverless, single-file memory
- **Why Interesting:** Rust-based memory layer claiming to simplify RAG
- **Potential Use:** Alternative to complex RAG setups
- **Action:** [Watch]

### 11. j178/prek
- **Language:** Rust
- **URL:** https://github.com/j178/prek
- **Description:** Better `pre-commit`, re-engineered in Rust
- **Why Interesting:** Pre-commit is slow; this claims to be faster. Dev tooling in Rust continues
- **Potential Use:** Replace pre-commit for faster hooks
- **Action:** [Explore]

### 12. Zackriya-Solutions/meeting-minutes
- **Language:** Rust
- **URL:** https://github.com/Zackriya-Solutions/meeting-minutes
- **Description:** Privacy-first AI meeting assistant with 4x faster Parakeet/Whisper transcription, speaker diarization, Ollama summarization. 100% local
- **Why Interesting:** Local-first meeting notes with speaker diarization. Privacy-focused
- **Potential Use:** For XPERIENCE client meetings or internal use
- **Action:** [Explore]

### 13. qodo-ai/pr-agent
- **Language:** Python
- **URL:** https://github.com/qodo-ai/pr-agent
- **Description:** The original open-source PR reviewer agent
- **Why Interesting:** AI PR review — we should be using this
- **Potential Use:** Add to our code review workflow
- **Action:** [Integrate]

### 14. 0xPlaygrounds/rig
- **Language:** Rust
- **URL:** https://github.com/0xPlaygrounds/rig
- **Description:** Build modular and scalable LLM Applications in Rust
- **Why Interesting:** Rust LLM framework — performance-focused alternative to Python frameworks
- **Potential Use:** Reference for high-performance agent architecture
- **Action:** [Watch]

### 15. siteboon/claudecodeui
- **Language:** JavaScript
- **URL:** https://github.com/siteboon/claudecodeui
- **Description:** Web UI/GUI for managing Claude Code sessions remotely. Works with Claude Code, Cursor CLI, Codex
- **Why Interesting:** Remote management of coding agents via web
- **Potential Use:** Mobile/web access to Claude Code sessions
- **Action:** [Explore]

---

## Repos by Category

### AI/Agents (9)
- thedotmack/claude-mem
- google-gemini/gemini-cli
- openai/codex
- bytedance/UI-TARS-desktop
- openai/skills, anthropics/skills
- activepieces/activepieces
- GH05TCREW/pentestagent
- topoteretes/cognee
- memvid/memvid

### Dev Tools (4)
- j178/prek
- qodo-ai/pr-agent
- siteboon/claudecodeui
- aidenybai/react-grab

### LLM Infrastructure (2)
- sgl-project/sglang
- QwenLM/Qwen3-Coder

### Productivity (2)
- Zackriya-Solutions/meeting-minutes
- cjpais/Handy

### Security (1)
- GH05TCREW/pentestagent

---

## Action Items for Follow-up

1. **Immediate:** Try `claude-mem` plugin — could supercharge our existing memory system
2. **This week:** Install `gemini-cli` and compare to Claude Code for specific tasks
3. **Evaluate:** `qodo-ai/pr-agent` for automated code review
4. **Research:** Study `activepieces` for MCP-native workflow automation
5. **Watch:** Meeting minutes tool for local transcription needs
