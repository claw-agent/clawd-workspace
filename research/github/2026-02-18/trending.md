# GitHub Trending — 2026-02-18

## Summary
- Scanned: ~75 repos across 5 categories (all, Python, TypeScript, JavaScript, Rust)
- Relevant: 15 repos
- Top pick: google/adk-python

## Top Repos

### 1. google/adk-python
- **Language:** Python
- **URL:** https://github.com/google/adk-python
- **Description:** Google's open-source, code-first Python framework for building, evaluating, and deploying AI agents. Model-agnostic, supports multi-agent systems, MCP tools, A2A protocol.
- **Why Interesting:** Direct competitor/complement to our agent stack. Supports MCP tools natively, multi-agent orchestration, built-in eval and dev UI. New features: session rewind, custom service registry, sandbox code execution.
- **Potential Use:** Evaluate as alternative agent framework; study their multi-agent patterns and A2A protocol integration
- **Action:** [Explore]

### 2. p-e-w/heretic
- **Language:** Python
- **URL:** https://github.com/p-e-w/heretic
- **Description:** Fully automatic censorship removal for language models via directional ablation. Uses TPE-based parameter optimization to find high-quality abliteration params while minimizing KL divergence.
- **Why Interesting:** State-of-the-art automated uncensoring. Works on most dense models including multimodal. Community has created 1,000+ models. Could be useful for local model customization.
- **Potential Use:** Uncensor local Ollama models for unrestricted research tasks
- **Action:** [Watch]

### 3. openai/codex
- **Language:** Rust
- **URL:** https://github.com/openai/codex
- **Description:** OpenAI's lightweight terminal coding agent. Available via npm, brew, or binary. Supports ChatGPT plan auth. IDE plugins for VS Code, Cursor, Windsurf.
- **Why Interesting:** Direct competitor to Claude Code. Written in Rust. OpenAI's answer to terminal-based coding agents.
- **Potential Use:** Compare against Claude Code for specific workflows
- **Action:** [Watch]

### 4. GH05TCREW/pentestagent
- **Stars:** 1,602 (+18/day)
- **Language:** Python
- **URL:** https://github.com/GH05TCREW/pentestagent
- **Description:** AI agent framework for black-box security testing, supporting bug bounty, red-team, and penetration testing workflows.
- **Why Interesting:** Similar to our Shannon tool. Could compare approaches for AI-assisted pentesting.
- **Potential Use:** Compare with Shannon; evaluate for XPERIENCE security auditing
- **Action:** [Explore]

### 5. 0x4m4/hexstrike-ai
- **Language:** Python
- **URL:** https://github.com/0x4m4/hexstrike-ai
- **Description:** MCP server that lets AI agents autonomously run 150+ cybersecurity tools. Works with Claude, GPT, Copilot.
- **Why Interesting:** MCP-native security tooling. Could integrate with our Claude setup for security research.
- **Potential Use:** Add as MCP server for security-related tasks
- **Action:** [Explore]

### 6. anthropics/claude-quickstarts
- **Language:** Python
- **URL:** https://github.com/anthropics/claude-quickstarts
- **Description:** Official collection of deployable application templates using the Claude API.
- **Why Interesting:** Official Anthropic starter templates — useful for rapid prototyping
- **Potential Use:** Reference for new Claude-based projects
- **Action:** [Watch]

### 7. davila7/claude-code-templates
- **Language:** Python
- **URL:** https://github.com/davila7/claude-code-templates
- **Description:** CLI tool for configuring and monitoring Claude Code
- **Why Interesting:** Tooling around Claude Code ecosystem
- **Potential Use:** Evaluate for our Claude Code workflow
- **Action:** [Watch]

### 8. hesreallyhim/awesome-claude-code
- **Language:** Python
- **URL:** https://github.com/hesreallyhim/awesome-claude-code
- **Description:** Curated list of skills, hooks, slash-commands, agent orchestrators, and plugins for Claude Code
- **Why Interesting:** Community resource hub for Claude Code extensions
- **Potential Use:** Find new skills/hooks to integrate
- **Action:** [Explore]

### 9. rowboatlabs/rowboat
- **Language:** TypeScript
- **URL:** https://github.com/rowboatlabs/rowboat
- **Description:** Open-source AI coworker with memory
- **Why Interesting:** Memory-enabled AI agent — relevant to our persistent agent design
- **Potential Use:** Study memory architecture patterns
- **Action:** [Watch]

### 10. supermemoryai/supermemory
- **Language:** TypeScript
- **URL:** https://github.com/supermemoryai/supermemory
- **Description:** Memory engine and app — extremely fast, scalable. "The Memory API for the AI era."
- **Why Interesting:** Could complement or replace our QMD-based memory system
- **Potential Use:** Evaluate as memory backend for agent system
- **Action:** [Explore]

### 11. steipete/summarize
- **Language:** TypeScript
- **URL:** https://github.com/steipete/summarize
- **Description:** Point at any URL/YouTube/Podcast or file. Get the gist. CLI and Chrome Extension.
- **Why Interesting:** Universal content summarizer — could augment our research pipeline
- **Potential Use:** Add to research toolchain for quick content digestion
- **Action:** [Watch]

### 12. ruvnet/wifi-densepose
- **Stars:** 6,966 (+258/day)
- **Language:** Python
- **URL:** https://github.com/ruvnet/wifi-densepose
- **Description:** WiFi-based dense human pose estimation — full-body tracking through walls using commodity mesh routers
- **Why Interesting:** Innovative privacy/surveillance tech. Hot trending (258 stars/day).
- **Potential Use:** Awareness only — impressive but niche
- **Action:** [Skip]

### 13. Priler/jarvis
- **Language:** Rust
- **URL:** https://github.com/Priler/jarvis
- **Description:** Offline voice assistant that respects your privacy. Written in Rust. WIP.
- **Why Interesting:** Privacy-focused local voice assistant in Rust
- **Potential Use:** Could inspire local voice features for our agent
- **Action:** [Watch]

### 14. ruvnet/ruvector
- **Stars:** 390 (+22/day)
- **Language:** Rust
- **URL:** https://github.com/ruvnet/ruvector
- **Description:** Distributed vector database with self-improving Graph Neural Network index. Cypher queries, Raft consensus.
- **Why Interesting:** Self-improving vector DB is a novel concept. Rust performance.
- **Potential Use:** Evaluate as future vector store alternative
- **Action:** [Watch]

### 15. Cinnamon/kotaemon
- **Language:** Python
- **URL:** https://github.com/Cinnamon/kotaemon
- **Description:** Open-source RAG-based tool for chatting with your documents
- **Why Interesting:** RAG tooling continues to evolve; could complement our document research
- **Potential Use:** Compare with our current RAG approaches
- **Action:** [Watch]

## Notable Trends
1. **Claude Code ecosystem exploding** — 3 repos (claude-quickstarts, claude-code-templates, awesome-claude-code) all trending simultaneously
2. **AI security tools going mainstream** — pentestagent, hexstrike-ai both trending; MCP-native security tooling emerging
3. **Memory/knowledge systems hot** — supermemory, rowboat, kotaemon all focused on persistent AI memory
4. **Google ADK maturing** — A2A protocol, session rewind, multi-agent coordination competing with Anthropic's approach
5. **OpenAI Codex in Rust** — terminal coding agents now a competitive category (Codex vs Claude Code)
