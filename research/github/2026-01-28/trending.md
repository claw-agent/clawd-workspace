# GitHub Trending — 2026-01-28

## Summary
- **Scanned:** ~100 repos across 5 categories (all, Python, TypeScript, JavaScript, Rust)
- **Relevant:** 15 repos matching Marb's interests
- **Top pick:** NevaMind-AI/memU — Memory framework for proactive agents (directly relevant to Clawdbot!)

## Notable Trends
1. **MCP ecosystem maturing** — Official ext-apps protocol, Rust SDK both trending
2. **Memory-first agents** — memU, letta-code, supermemory all solving persistent memory
3. **Claude Code tooling explosion** — CCometixLine, cc-switch showing ecosystem growth
4. **Privacy-first tools** — meeting-minutes, bentopdf, alt-sendme gaining traction

---

## Top Repos

### 1. NevaMind-AI/memU ⭐ TOP PICK
- **Stars:** Trending today
- **Language:** Python
- **URL:** https://github.com/NevaMind-AI/memU
- **Description:** Memory framework for 24/7 proactive agents. Reduces LLM token costs for always-on agents. Captures user intent and enables anticipatory actions.
- **Why Interesting:** DIRECTLY relevant to Clawdbot — same use case! Hierarchical memory (Resource → Item → Category), cost-efficient continuous learning, intent prediction.
- **Potential Use:** Could integrate their memory architecture into Clawdbot, or study their approach for our MEMORY.md system
- **Action:** [Integrate] — Study their proactive memory lifecycle for Clawdbot improvements

### 2. modelcontextprotocol/ext-apps
- **Stars:** Trending (official MCP repo)
- **Language:** TypeScript
- **URL:** https://github.com/modelcontextprotocol/ext-apps
- **Description:** Official SDK & spec for MCP Apps protocol (SEP-1865). Allows MCP servers to display interactive UIs (charts, forms, video players) inline in chat.
- **Why Interesting:** Core MCP ecosystem expansion. Enables rich UI in Claude Desktop/VS Code. Has agent skills you can install!
- **Potential Use:** Build interactive dashboards, visualizations that render in Claude conversations
- **Action:** [Explore] — `/plugin marketplace add modelcontextprotocol/ext-apps`

### 3. letta-ai/letta-code
- **Stars:** Trending
- **Language:** TypeScript
- **URL:** https://github.com/letta-ai/letta-code
- **Description:** Memory-first coding agent. Persisted agents that learn over time, portable across models (Claude, GPT-5.2, Gemini 3, GLM-4.7).
- **Why Interesting:** Different philosophy from Claude Code — same agent across sessions, persistent memory, skill learning. `/init`, `/remember`, `/skill` commands.
- **Potential Use:** Alternative coding agent approach, study their memory persistence model
- **Action:** [Explore] — Compare their approach to our AGENTS.md + MEMORY.md system

### 4. badlogic/pi-mono
- **Stars:** Trending
- **Language:** TypeScript
- **URL:** https://github.com/badlogic/pi-mono
- **Description:** AI agent toolkit: coding agent CLI, unified LLM API, TUI & web UI libraries, Slack bot, vLLM pods
- **Why Interesting:** Comprehensive agent toolkit from badlogic (libGDX creator). Unified approach to building agents.
- **Potential Use:** Reference for agent architecture, unified LLM API patterns
- **Action:** [Watch]

### 5. moltbot/moltbot
- **Stars:** Trending
- **Language:** TypeScript
- **URL:** https://github.com/moltbot/moltbot
- **Description:** Personal AI assistant. Any OS. Any Platform. "The lobster way" 🦞
- **Why Interesting:** Cross-platform personal assistant, similar to Clawdbot's goals
- **Potential Use:** Compare architecture choices
- **Action:** [Watch]

### 6. asgeirtj/system_prompts_leaks
- **Stars:** Trending
- **Language:** JavaScript
- **URL:** https://github.com/asgeirtj/system_prompts_leaks
- **Description:** Collection of extracted system prompts from ChatGPT, Claude & Gemini
- **Why Interesting:** Research into how major AI products structure their prompts
- **Potential Use:** Learn prompt engineering patterns from production systems
- **Action:** [Explore]

### 7. farion1231/cc-switch
- **Stars:** Trending
- **Language:** Rust
- **URL:** https://github.com/farion1231/cc-switch
- **Description:** Cross-platform desktop all-in-one assistant for Claude Code, Codex, OpenCode & Gemini CLI
- **Why Interesting:** Unified interface for multiple coding agents
- **Potential Use:** Workflow improvement for switching between agents
- **Action:** [Watch]

### 8. Haleclipse/CCometixLine
- **Stars:** Trending
- **Language:** Rust
- **URL:** https://github.com/Haleclipse/CCometixLine
- **Description:** Claude Code statusline tool written in Rust
- **Why Interesting:** Developer tooling for Claude Code workflow
- **Potential Use:** Better visibility into Claude Code state
- **Action:** [Watch]

### 9. supermemoryai/supermemory
- **Stars:** Trending
- **Language:** TypeScript
- **URL:** https://github.com/supermemoryai/supermemory
- **Description:** Memory engine and app that is extremely fast, scalable. The Memory API for the AI era.
- **Why Interesting:** Another take on AI memory infrastructure
- **Potential Use:** Compare to memU for best memory patterns
- **Action:** [Watch]

### 10. CherryHQ/cherry-studio
- **Stars:** Trending
- **Language:** TypeScript
- **URL:** https://github.com/CherryHQ/cherry-studio
- **Description:** AI Agent + Coding Agent + 300+ assistants: agentic AI desktop with autonomous coding, intelligent automation
- **Why Interesting:** Feature-rich AI desktop with multi-agent support
- **Potential Use:** UI/UX inspiration for agent interfaces
- **Action:** [Watch]

### 11. modelcontextprotocol/rust-sdk
- **Stars:** Trending
- **Language:** Rust
- **URL:** https://github.com/modelcontextprotocol/rust-sdk
- **Description:** Official Rust SDK for Model Context Protocol
- **Why Interesting:** Official MCP Rust implementation for performance-critical MCP servers
- **Potential Use:** Build high-performance MCP tools in Rust
- **Action:** [Watch]

### 12. clusterzx/paperless-ai
- **Stars:** Trending
- **Language:** JavaScript
- **URL:** https://github.com/clusterzx/paperless-ai
- **Description:** Automated document analyzer for Paperless-ngx using OpenAI, Ollama, Deepseek-r1, Azure
- **Why Interesting:** Practical AI integration for document management, supports Ollama/local LLMs
- **Potential Use:** Document processing automation
- **Action:** [Explore]

### 13. Zackriya-Solutions/meeting-minutes
- **Stars:** Trending
- **Language:** Rust
- **URL:** https://github.com/Zackriya-Solutions/meeting-minutes
- **Description:** Privacy-first AI meeting assistant with 4x faster Parakeet/Whisper transcription, speaker diarization, Ollama summarization. 100% local.
- **Why Interesting:** Privacy-first, local-only meeting AI with fast transcription
- **Potential Use:** Meeting transcription without cloud dependency
- **Action:** [Explore]

### 14. DayuanJiang/next-ai-draw-io
- **Stars:** Trending
- **Language:** TypeScript
- **URL:** https://github.com/DayuanJiang/next-ai-draw-io
- **Description:** Next.js web app integrating AI with draw.io diagrams. Create/modify diagrams through natural language.
- **Why Interesting:** AI-powered diagramming, useful for architecture docs
- **Potential Use:** Generate diagrams from descriptions
- **Action:** [Watch]

### 15. jj-vcs/jj
- **Stars:** Trending
- **Language:** Rust
- **URL:** https://github.com/jj-vcs/jj
- **Description:** Git-compatible VCS that is both simple and powerful
- **Why Interesting:** Alternative to git with better UX, growing community
- **Potential Use:** Evaluate as git replacement for cleaner workflows
- **Action:** [Watch]
