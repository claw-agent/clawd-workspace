# GitHub Trending — 2026-01-29

## Summary
- **Scanned:** ~75 repos across 5 categories (all, Python, TypeScript, JavaScript, Rust)
- **Relevant:** 24 repos matching Marb's interests
- **Top Pick:** openclaw/openclaw (Personal AI assistant - directly relevant to current tooling)

## Notable Trends
1. **Agent Infrastructure Explosion** — Multiple new frameworks for orchestrating AI agents (claude-flow, lobehub, archestra)
2. **MCP Ecosystem Maturing** — Official MCP Apps extension for interactive UIs in chatbots
3. **Memory for Agents** — memU solving the 24/7 agent memory problem (directly relevant to Clawdbot)
4. **Vision Agents** — Multiple projects enabling visual/screen-based automation
5. **CLI Coding Agents** — Competition intensifying (Kimi CLI, Kilocode, cc-switch)

---

## Top Repos

### 1. openclaw/openclaw ⭐⭐⭐
- **Language:** TypeScript
- **URL:** https://github.com/openclaw/openclaw
- **Description:** Personal AI assistant that works across WhatsApp, Telegram, Slack, Discord, Signal, iMessage, and more. Includes Voice Wake, Canvas, browser control, and multi-agent routing.
- **Why Interesting:** This IS Clawdbot's open-source cousin. Same architecture, same channels, same concepts (skills, workspace, AGENTS.md). Direct competitor/inspiration.
- **Potential Use:** Study their implementation, potentially contribute or cherry-pick features
- **Action:** [Explore] — High priority for architecture comparison

### 2. modelcontextprotocol/ext-apps ⭐⭐⭐
- **Language:** TypeScript
- **URL:** https://github.com/modelcontextprotocol/ext-apps
- **Description:** Official MCP Apps protocol — standard for embedding interactive UIs in AI chatbots. Allows MCP servers to display charts, forms, videos inline.
- **Why Interesting:** Official Anthropic ecosystem extension. This is how MCP tools will eventually have rich UIs (maps, 3D, forms) in Claude.
- **Potential Use:** Build MCP servers with interactive UIs for Clawdbot
- **Action:** [Integrate] — Add to MCP toolkit

### 3. NevaMind-AI/memU ⭐⭐⭐
- **Language:** Python
- **URL:** https://github.com/NevaMind-AI/memU
- **Description:** Memory framework for 24/7 proactive agents. Hierarchical memory (resource/item/category), automatic intent capture, cost-efficient token usage.
- **Why Interesting:** Solves the exact problem of long-running agent memory. Mentions Clawdbot by name! Built specifically for proactive agents.
- **Potential Use:** Could replace or augment current memory system (memory/*.md files)
- **Action:** [Integrate] — High priority for memory improvements

### 4. badlogic/pi-mono ⭐⭐
- **Language:** TypeScript
- **URL:** https://github.com/badlogic/pi-mono
- **Description:** AI agent toolkit with coding agent CLI, unified LLM API, TUI/web UI libraries, Slack bot, vLLM pods
- **Why Interesting:** Created by Mario Zechner (acknowledged in openclaw). Provides unified LLM API approach that could simplify multi-model support.
- **Potential Use:** Reference implementation for LLM abstractions
- **Action:** [Watch]

### 5. MoonshotAI/kimi-cli ⭐⭐
- **Language:** Python
- **URL:** https://github.com/MoonshotAI/kimi-cli
- **Description:** Kimi Code CLI agent from Moonshot AI (Chinese AI company)
- **Why Interesting:** Another entrant in the CLI agent space. Chinese AI companies producing quality dev tools.
- **Potential Use:** Feature comparison with Claude Code
- **Action:** [Watch]

### 6. lobehub/lobehub ⭐⭐
- **Language:** TypeScript
- **URL:** https://github.com/lobehub/lobehub
- **Description:** Multi-agent collaboration platform. Build agent teams, design workflows, agents as unit of work interaction.
- **Why Interesting:** Takes agent orchestration further than individual assistants. "Agents as unit of work" is interesting paradigm.
- **Potential Use:** Inspiration for multi-agent workflows
- **Action:** [Watch]

### 7. archestra-ai/archestra ⭐⭐
- **Language:** TypeScript
- **URL:** https://github.com/archestra-ai/archestra
- **Description:** Secure gateway for MCP, A2A (Agent-to-Agent), LLM. MCP registry & orchestrator.
- **Why Interesting:** MCP gateway/orchestrator — could help manage multiple MCP servers centrally
- **Potential Use:** Centralized MCP management
- **Action:** [Explore]

### 8. ruvnet/claude-flow ⭐⭐
- **Language:** TypeScript
- **URL:** https://github.com/ruvnet/claude-flow
- **Description:** Agent orchestration platform for Claude. Multi-agent swarms, distributed swarm intelligence, RAG integration, native Claude Code support via MCP.
- **Why Interesting:** Specifically designed for Claude ecosystem. Swarm intelligence for Claude agents.
- **Potential Use:** Could enhance agent orchestration capabilities
- **Action:** [Explore]

### 9. cline/cline ⭐⭐
- **Language:** TypeScript
- **URL:** https://github.com/cline/cline
- **Description:** Autonomous coding agent in your IDE. Creates/edits files, executes commands, uses browser, with permission at every step.
- **Why Interesting:** Popular IDE-based agent. Good reference for permission models.
- **Potential Use:** Compare approaches to permission/approval UX
- **Action:** [Watch]

### 10. Kilo-Org/kilocode ⭐⭐
- **Language:** TypeScript
- **URL:** https://github.com/Kilo-Org/kilocode
- **Description:** All-in-one agentic engineering platform. #1 on OpenRouter, 750k+ users, 6.1 trillion tokens/month.
- **Why Interesting:** Massive scale (6.1T tokens/month). Shows what agent platforms can achieve.
- **Potential Use:** Business model/scale reference
- **Action:** [Watch]

### 11. OpenPipe/ART ⭐⭐
- **Language:** Python
- **URL:** https://github.com/OpenPipe/ART
- **Description:** Agent Reinforcement Trainer — train multi-step agents using GRPO. "On-the-job training" for agents.
- **Why Interesting:** RL for agents is important direction. Could improve agent behavior over time.
- **Potential Use:** Future capability for agent self-improvement
- **Action:** [Watch]

### 12. web-infra-dev/midscene ⭐⭐
- **Language:** TypeScript
- **URL:** https://github.com/web-infra-dev/midscene
- **Description:** Vision-based UI automation for all platforms
- **Why Interesting:** Alternative to selector-based automation. Could help with anti-bot sites.
- **Potential Use:** Vision-based browser automation fallback
- **Action:** [Watch]

### 13. ChromeDevTools/chrome-devtools-mcp ⭐
- **Language:** TypeScript
- **URL:** https://github.com/ChromeDevTools/chrome-devtools-mcp
- **Description:** Chrome DevTools for coding agents
- **Why Interesting:** Official Chrome DevTools MCP server. Better browser debugging for agents.
- **Potential Use:** Enhanced browser debugging
- **Action:** [Explore]

### 14. steipete/mcporter ⭐
- **Language:** TypeScript
- **URL:** https://github.com/steipete/mcporter
- **Description:** Call MCPs via TypeScript, masquerading as simple TypeScript API. Or package as CLI.
- **Why Interesting:** By steipete (openclaw author). Makes MCP servers callable as TypeScript functions.
- **Potential Use:** Cleaner MCP integration patterns
- **Action:** [Explore]

### 15. tursodatabase/agentfs ⭐⭐
- **Language:** Rust
- **URL:** https://github.com/tursodatabase/agentfs
- **Description:** "The filesystem for agents" — by Turso (libsql)
- **Why Interesting:** Purpose-built filesystem for AI agents. Could be more efficient than regular FS for agent workloads.
- **Potential Use:** Agent-optimized storage layer
- **Action:** [Explore]

### 16. CherryHQ/cherry-studio ⭐
- **Language:** TypeScript
- **URL:** https://github.com/CherryHQ/cherry-studio
- **Description:** AI Agent + Coding Agent desktop with autonomous coding, intelligent automation, unified LLM access
- **Why Interesting:** Desktop app approach to agent interfaces. 300+ assistants bundled.
- **Potential Use:** UI/UX inspiration
- **Action:** [Watch]

### 17. GetStream/Vision-Agents ⭐
- **Language:** Python
- **URL:** https://github.com/GetStream/Vision-Agents
- **Description:** Open Vision Agents by Stream. Build vision agents with any model/video provider. Uses Stream's edge network.
- **Why Interesting:** Vision agents for video analysis. Could help with video/screen understanding tasks.
- **Potential Use:** Video analysis capabilities
- **Action:** [Watch]

### 18. datalab-to/chandra ⭐
- **Language:** Python
- **URL:** https://github.com/datalab-to/chandra
- **Description:** OCR model handling complex tables, forms, handwriting with full layout (4,672 stars)
- **Why Interesting:** Better document/image understanding. Could help with receipt scanning, form processing.
- **Potential Use:** Document processing pipeline
- **Action:** [Watch]

### 19. astral-sh/uv ⭐
- **Language:** Rust
- **URL:** https://github.com/astral-sh/uv
- **Description:** Extremely fast Python package manager (already known)
- **Why Interesting:** Still trending — adoption accelerating
- **Potential Use:** Already in toolkit
- **Action:** [Skip] — Already using

### 20. jj-vcs/jj ⭐
- **Language:** Rust
- **URL:** https://github.com/jj-vcs/jj
- **Description:** Git-compatible VCS that is simple and powerful
- **Why Interesting:** Could simplify agent git operations (simpler than git CLI)
- **Potential Use:** Cleaner version control for agents
- **Action:** [Watch]

### 21. farion1231/cc-switch ⭐
- **Language:** Rust
- **URL:** https://github.com/farion1231/cc-switch
- **Description:** Cross-platform All-in-One assistant for Claude Code, Codex, OpenCode & Gemini CLI
- **Why Interesting:** Unified interface for multiple coding CLIs
- **Potential Use:** Reference for multi-CLI support
- **Action:** [Watch]

### 22. nicotsx/zerobyte ⭐
- **Language:** TypeScript
- **URL:** https://github.com/nicotsx/zerobyte
- **Description:** Backup automation for self-hosters, built on restic
- **Why Interesting:** Self-hosting backup solution
- **Potential Use:** Backup automation for clawd workspace
- **Action:** [Watch]

### 23. zampierilucas/scx_horoscope ⭐
- **Language:** Rust
- **URL:** https://github.com/zampierilucas/scx_horoscope
- **Description:** "Astrological CPU Scheduler" (737 stars, 103 today)
- **Why Interesting:** Joke project that went viral. Shows power of novelty in open source.
- **Potential Use:** None (entertainment only)
- **Action:** [Skip]

### 24. asgeirtj/system_prompts_leaks ⭐
- **Language:** Markdown
- **URL:** https://github.com/asgeirtj/system_prompts_leaks
- **Description:** Collection of extracted system prompts from ChatGPT, Claude, Gemini
- **Why Interesting:** Useful for understanding how other assistants are prompted
- **Potential Use:** Prompt engineering reference
- **Action:** [Explore]

---

## Category Breakdown

| Category | Count |
|----------|-------|
| AI/Agents | 12 |
| MCP/Claude Ecosystem | 5 |
| Developer Tools | 4 |
| Web/Automation | 3 |

## Action Summary

| Action | Repos |
|--------|-------|
| **[Integrate]** | ext-apps, memU |
| **[Explore]** | openclaw, archestra, chrome-devtools-mcp, mcporter, agentfs, system_prompts_leaks, claude-flow |
| **[Watch]** | pi-mono, kimi-cli, lobehub, cline, kilocode, ART, midscene, cherry-studio, Vision-Agents, chandra, jj, cc-switch, zerobyte |
| **[Skip]** | uv (already have), scx_horoscope (joke) |
