# GitHub Trending — 2026-01-31

## Summary
- **Scanned:** ~75 repos across 5 categories (all, Python, TypeScript, JavaScript, Rust)
- **Relevant:** 18 repos matching Marb's interests
- **Top pick:** modelcontextprotocol/ext-apps (MCP Apps SDK - official spec for embedded UIs in AI chatbots)

## 🔥 Notable Trend: The Agent Wars Continue
The trending page is dominated by AI agents, MCP tooling, and "personal assistant" frameworks. Three major themes:
1. **MCP ecosystem expansion** - Official MCP Apps protocol, gateways, registries
2. **24/7 proactive agents** - Memory systems for always-on AI (memU, openclaw)
3. **Coding agents** - cline, kilocode, kimi-cli all competing for the "your next CLI agent" space

---

## Top Repos

### 1. modelcontextprotocol/ext-apps ⭐⭐⭐
- **Language:** TypeScript
- **URL:** https://github.com/modelcontextprotocol/ext-apps
- **Description:** Official SDK and spec for MCP Apps - standard for interactive UIs embedded in AI chatbots, served by MCP servers
- **Why Interesting:** This is the **official Anthropic-backed** spec for adding visual UI to MCP tools. Game-changer for agent UX. Maps, charts, forms, video players - all inline in conversation.
- **Potential Use:** Add rich UI capabilities to Clawdbot via MCP. Could render interactive dashboards, data visualizations, or custom controls directly in chat.
- **Action:** [Integrate] - High priority. This is the future of agent interfaces.

### 2. NevaMind-AI/memU ⭐⭐⭐
- **Language:** Python
- **URL:** https://github.com/NevaMind-AI/memU
- **Description:** Memory framework for 24/7 proactive agents. Reduces token costs, enables continuous learning and intent prediction.
- **Why Interesting:** Directly solves the memory problem we deal with in AGENTS.md. Hierarchical memory (Resource → Item → Category), auto-categorization, proactive context loading. Claims 92% accuracy on Locomo benchmark.
- **Potential Use:** Could replace or augment our current memory/ folder system with structured, searchable, auto-categorizing memory. The "proactive" angle is interesting - agent that anticipates needs.
- **Action:** [Explore] - Compare with current memory approach

### 3. openclaw/openclaw ⭐⭐⭐
- **Language:** TypeScript  
- **URL:** https://github.com/openclaw/openclaw
- **Description:** Personal AI assistant for all platforms. WhatsApp, Telegram, Slack, Discord, Signal, iMessage, etc. Voice wake, live Canvas, multi-agent routing.
- **Why Interesting:** This is basically what Clawdbot is! Same architecture (Gateway as control plane), same channels. Worth watching for ideas and potential feature parity. The "lobster way" 🦞
- **Potential Use:** Reference implementation, feature ideas, potential code sharing
- **Action:** [Watch] - Competitor/peer project

### 4. MoonshotAI/kimi-cli
- **Language:** Python
- **URL:** https://github.com/MoonshotAI/kimi-cli
- **Description:** "Your next CLI agent" from Moonshot AI (Chinese AI company behind Kimi)
- **Why Interesting:** Another coding agent CLI. Moonshot is a well-funded player. Worth seeing their approach.
- **Potential Use:** Reference for CLI agent patterns
- **Action:** [Watch]

### 5. badlogic/pi-mono ⭐⭐
- **Language:** TypeScript
- **URL:** https://github.com/badlogic/pi-mono
- **Description:** AI agent toolkit: coding agent CLI, unified LLM API, TUI & web UI libraries, Slack bot, vLLM pods
- **Why Interesting:** From Mario Zechner (libGDX creator). Mentioned in OpenClaw credits. Clean architecture, unified LLM API is useful.
- **Potential Use:** LLM API abstraction layer, TUI patterns
- **Action:** [Explore]

### 6. lobehub/lobehub ⭐⭐
- **Language:** TypeScript
- **URL:** https://github.com/lobehub/lobehub
- **Description:** Multi-agent collaboration platform. "Agents as the unit of work interaction"
- **Why Interesting:** Building on their previous LobeChat success. Multi-agent coordination is hot right now.
- **Potential Use:** Ideas for multi-agent orchestration patterns
- **Action:** [Watch]

### 7. OpenPipe/ART ⭐⭐
- **Language:** Python
- **URL:** https://github.com/OpenPipe/ART
- **Description:** Agent Reinforcement Trainer - train multi-step agents using GRPO. Works with Qwen, Llama.
- **Why Interesting:** GRPO (Group Relative Policy Optimization) for agent training. Could fine-tune local models for specific agent behaviors.
- **Potential Use:** Training custom agent behaviors on local models (Qwen3)
- **Action:** [Explore]

### 8. archestra-ai/archestra
- **Language:** TypeScript
- **URL:** https://github.com/archestra-ai/archestra
- **Description:** Secure gateway for MCP, A2A, LLM; MCP registry & orchestrator
- **Why Interesting:** Another MCP gateway/registry. A2A (Agent-to-Agent) protocol support.
- **Potential Use:** MCP management patterns
- **Action:** [Watch]

### 9. cline/cline
- **Language:** TypeScript
- **URL:** https://github.com/cline/cline
- **Description:** Autonomous coding agent in your IDE. Creates/edits files, executes commands, uses browser.
- **Why Interesting:** Popular IDE coding agent. Good benchmark for what users expect from coding assistants.
- **Potential Use:** Reference for IDE integration patterns
- **Action:** [Watch]

### 10. Kilo-Org/kilocode ⭐
- **Language:** TypeScript
- **URL:** https://github.com/Kilo-Org/kilocode
- **Description:** "#1 on OpenRouter. 750k+ Kilo Coders. 6.1 trillion tokens/month."
- **Why Interesting:** Massive scale. Claims to be the most popular open source coding agent.
- **Potential Use:** See what's driving adoption at scale
- **Action:** [Watch]

### 11. ruvnet/claude-flow
- **Language:** TypeScript
- **URL:** https://github.com/ruvnet/claude-flow
- **Description:** Agent orchestration for Claude. Multi-agent swarms, RAG, MCP support.
- **Why Interesting:** Specifically designed for Claude. "Ranked #1 in agent-based frameworks" (their claim).
- **Potential Use:** Claude-specific orchestration patterns
- **Action:** [Watch]

### 12. ChromeDevTools/chrome-devtools-mcp
- **Language:** TypeScript
- **URL:** https://github.com/ChromeDevTools/chrome-devtools-mcp
- **Description:** Chrome DevTools for coding agents
- **Why Interesting:** Official Google project. Exposes DevTools via MCP for agent debugging.
- **Potential Use:** Better browser debugging for agents
- **Action:** [Explore]

### 13. tursodatabase/agentfs ⭐
- **Language:** Rust
- **URL:** https://github.com/tursodatabase/agentfs
- **Description:** "The filesystem for agents" - from Turso (libSQL)
- **Why Interesting:** Turso is legit (built libSQL). A filesystem designed for agents could solve persistence/sandboxing issues.
- **Potential Use:** Agent workspace/filesystem abstraction
- **Action:** [Explore]

### 14. datalab-to/chandra
- **Language:** Python
- **URL:** https://github.com/datalab-to/chandra
- **Stars:** 4,698 (+29 today)
- **Description:** OCR model for complex tables, forms, handwriting with full layout
- **Why Interesting:** Advanced OCR. Could be useful for document processing pipelines.
- **Potential Use:** Document processing, PDF extraction
- **Action:** [Watch]

### 15. asgeirtj/system_prompts_leaks
- **Language:** N/A (docs)
- **URL:** https://github.com/asgeirtj/system_prompts_leaks
- **Description:** Collection of extracted system prompts from ChatGPT, Claude, Gemini
- **Why Interesting:** Research material. See how others structure their prompts.
- **Potential Use:** Prompt engineering reference
- **Action:** [Watch]

### 16. web-infra-dev/midscene
- **Language:** TypeScript
- **URL:** https://github.com/web-infra-dev/midscene
- **Description:** Vision-based UI automation across platforms
- **Why Interesting:** Uses vision models for UI automation instead of DOM/selectors
- **Potential Use:** Alternative to Playwright for complex UIs
- **Action:** [Watch]

### 17. steipete/mcporter
- **Language:** TypeScript
- **URL:** https://github.com/steipete/mcporter
- **Description:** Call MCPs via TypeScript, masquerading as simple TypeScript API
- **Why Interesting:** From Peter Steinberger (OpenClaw creator). Simplifies MCP usage.
- **Potential Use:** Cleaner MCP integration patterns
- **Action:** [Explore]

### 18. juspay/hyperswitch
- **Language:** Rust
- **URL:** https://github.com/juspay/hyperswitch
- **Description:** Open source payments switch - fast, reliable, affordable
- **Why Interesting:** If we ever need payments infrastructure, this is the open source answer to Stripe's complexity
- **Potential Use:** Payment processing
- **Action:** [Skip] - Not immediately relevant

---

## 🎭 Honorable Mention (Fun Find)

### zampierilucas/scx_horoscope
- **Language:** Rust
- **Stars:** 814 (+66 today)
- **URL:** https://github.com/zampierilucas/scx_horoscope
- **Description:** "Astrological CPU Scheduler" 
- **Why Interesting:** It's a joke, but it's a **real CPU scheduler** that prioritizes processes based on astrological signs. Peak programmer humor.
- **Action:** [Laugh] 😂

---

## Trends Observed

1. **MCP is eating everything** - Official support from Anthropic/Google, multiple gateways/registries competing
2. **Memory is the new moat** - memU, openclaw, others all focused on long-term memory for agents
3. **"Personal AI assistant" is crowded** - Multiple projects with nearly identical feature sets (multi-channel, voice, canvas)
4. **Coding agents hit mainstream** - cline, kilocode, kimi-cli all in top trending
5. **Rust for infrastructure** - agentfs, hyperswitch showing Rust adoption for agent tooling
