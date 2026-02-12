# GitHub Trending — 2026-02-12

## Summary
- Scanned: ~75 repos across 5 categories (all, Python, TypeScript, JavaScript, Rust)
- Relevant: 15 repos matching Marb's interests
- Top pick: ChromeDevTools/chrome-devtools-mcp

## Top Repos

### 1. ChromeDevTools/chrome-devtools-mcp
- **Language:** TypeScript
- **URL:** https://github.com/ChromeDevTools/chrome-devtools-mcp
- **Description:** Official Chrome DevTools MCP server — lets coding agents (Claude, Cursor, Copilot) control and inspect a live Chrome browser via Model Context Protocol. Full DevTools access: performance traces, network analysis, screenshots, console messages.
- **Why Interesting:** Direct MCP integration for browser automation — the official Google-backed way to give AI agents browser superpowers. Works with Claude Code natively.
- **Potential Use:** Add to our MCP server config for browser debugging workflows. Could complement/replace our current stealth-browse and agent-browser tools.
- **Action:** [Integrate]

### 2. microsoft/agent-framework
- **Language:** Python / .NET
- **URL:** https://github.com/microsoft/agent-framework
- **Description:** Microsoft's comprehensive multi-agent framework. Graph-based workflows with streaming, checkpointing, human-in-the-loop, time-travel. Successor to AutoGen + Semantic Kernel. Includes DevUI for testing/debugging.
- **Why Interesting:** Microsoft consolidating their agent ecosystem into one framework. Graph-based orchestration with time-travel debugging is powerful. Migration guides from AutoGen/Semantic Kernel show this is the future direction.
- **Potential Use:** Reference architecture for multi-agent patterns. The graph-based workflow model could inspire improvements to our orchestration skill.
- **Action:** [Watch]

### 3. sansan0/TrendRadar
- **Language:** Python
- **URL:** https://github.com/sansan0/TrendRadar
- **Description:** AI-driven public opinion & trend monitor. Multi-platform aggregation, RSS, AI analysis, smart alerts. Supports Docker, MCP integration, pushes to Telegram/Slack/email/etc. v6.0.0 just shipped with timeline scheduling system.
- **Why Interesting:** Does what our scout system does but as a full product. MCP server included. Multi-channel push (Telegram!). AI analysis with configurable schedules.
- **Potential Use:** Could replace or augment our custom trend monitoring. The MCP server approach for trend data is clever — could query trends via natural language.
- **Action:** [Explore]

### 4. EveryInc/compound-engineering-plugin
- **Language:** TypeScript
- **URL:** https://github.com/EveryInc/compound-engineering-plugin
- **Description:** Official Claude Code compound engineering plugin from Every Inc (Dan Shipper's company).
- **Why Interesting:** Directly relevant to our compound engineering workflow. Official plugin for the pattern we already use.
- **Potential Use:** Install and integrate with our Claude Code setup immediately.
- **Action:** [Integrate]

### 5. google/langextract
- **Language:** Python
- **URL:** https://github.com/google/langextract
- **Description:** Google library for extracting structured information from unstructured text using LLMs with precise source grounding and interactive visualization.
- **Why Interesting:** Structured extraction with source grounding — useful for research pipelines where we need to cite sources accurately.
- **Potential Use:** Integrate into research workflows for better structured data extraction from web content.
- **Action:** [Explore]

### 6. The-Pocket/PocketFlow
- **Language:** Python
- **URL:** https://github.com/The-Pocket/PocketFlow
- **Description:** 100-line LLM framework. "Let Agents build Agents!" Minimalist approach to agent orchestration.
- **Why Interesting:** Extreme minimalism in agent frameworks. Good reference for understanding core patterns without framework bloat.
- **Potential Use:** Study for patterns; too minimal for production but great mental model.
- **Action:** [Watch]

### 7. Jeffallan/claude-skills
- **Language:** Python
- **URL:** https://github.com/Jeffallan/claude-skills
- **Description:** 66 specialized skills for full-stack developers. Transform Claude Code into expert pair programmer.
- **Why Interesting:** Skills ecosystem for Claude Code is growing. May contain useful patterns we haven't built yet.
- **Potential Use:** Audit for skills we could adapt or improve upon.
- **Action:** [Explore]

### 8. yusufkaraaslan/Skill_Seekers
- **Language:** Python
- **URL:** https://github.com/yusufkaraaslan/Skill_Seekers
- **Description:** Convert documentation websites, GitHub repos, and PDFs into Claude AI skills with automatic conflict detection.
- **Why Interesting:** Auto-generates Claude skills from docs. Could accelerate our skill creation pipeline.
- **Potential Use:** Feed our tool docs through it to auto-generate skills.
- **Action:** [Explore]

### 9. KeygraphHQ/shannon
- **Language:** TypeScript
- **URL:** https://github.com/KeygraphHQ/shannon
- **Description:** Fully autonomous AI hacker. 96.15% success rate on hint-free XBOW Benchmark. Finds actual exploits in web apps.
- **Why Interesting:** We already have Shannon installed! It's trending, which means active development. Worth checking for updates.
- **Potential Use:** Already in our toolkit at ~/clawd/tools/shannon/. Check for version updates.
- **Action:** [Watch]

### 10. block/goose
- **Language:** Rust
- **URL:** https://github.com/block/goose
- **Description:** Open source, extensible AI agent that goes beyond code suggestions — install, execute, edit, test with any LLM.
- **Why Interesting:** Block (Square) backing an open-source coding agent. Rust-based, extensible. Alternative perspective to Claude Code.
- **Potential Use:** Monitor for novel patterns in agent design.
- **Action:** [Watch]

### 11. EricLBuehler/mistral.rs
- **Language:** Rust
- **URL:** https://github.com/EricLBuehler/mistral.rs
- **Description:** Fast, flexible LLM inference in Rust. Supports many model architectures.
- **Why Interesting:** Local LLM inference alternative to Ollama, potentially faster for Rust-native workflows.
- **Potential Use:** Benchmark against Ollama for local inference speed.
- **Action:** [Watch]

### 12. danielmiessler/Personal_AI_Infrastructure
- **Language:** TypeScript
- **URL:** https://github.com/danielmiessler/Personal_AI_Infrastructure
- **Description:** Agentic AI Infrastructure for magnifying HUMAN capabilities. From the creator of Fabric.
- **Why Interesting:** Daniel Miessler (Fabric creator) building personal AI infra. Directly aligned with what we're building.
- **Potential Use:** Compare architecture and patterns with our setup.
- **Action:** [Explore]

### 13. Zackriya-Solutions/meeting-minutes
- **Language:** Rust
- **URL:** https://github.com/Zackriya-Solutions/meeting-minutes
- **Description:** Privacy-first AI meeting assistant. 4x faster Parakeet/Whisper transcription, speaker diarization, Ollama summarization. 100% local, no cloud.
- **Why Interesting:** Local-first meeting transcription with Rust performance. Could replace our current whisper workflow for meetings.
- **Potential Use:** Evaluate as meeting transcription tool.
- **Action:** [Watch]

### 14. max-sixty/worktrunk
- **Language:** Rust
- **URL:** https://github.com/max-sixty/worktrunk
- **Description:** CLI for Git worktree management, designed for parallel AI agent workflows.
- **Why Interesting:** Git worktrees for parallel agent work — exactly the pattern Claude Squad uses. Purpose-built tooling for this workflow.
- **Potential Use:** Could improve our multi-agent git workflow.
- **Action:** [Explore]

### 15. RSSNext/Folo
- **Language:** TypeScript
- **URL:** https://github.com/RSSNext/Folo
- **Description:** AI Reader — modern RSS reader with AI capabilities.
- **Why Interesting:** AI-enhanced RSS reading. Good for research consumption workflows.
- **Potential Use:** Evaluate as research feed reader.
- **Action:** [Watch]

## Notable Trends
1. **MCP everywhere** — Chrome DevTools MCP, TrendRadar MCP, GitHub MCP Registry in nav. MCP is becoming the standard integration protocol.
2. **Claude Code ecosystem exploding** — Skills repos, compound engineering plugins, context engineering guides all trending simultaneously.
3. **Agent frameworks consolidating** — Microsoft merging AutoGen + Semantic Kernel into agent-framework. The market is picking winners.
4. **Rust for AI tooling** — mistral.rs, meeting-minutes, worktrunk — Rust increasingly used for performance-critical AI infrastructure.
5. **Personal AI infrastructure** — Multiple repos focused on individual-scale AI systems (Miessler's infra, TrendRadar, Folo).
