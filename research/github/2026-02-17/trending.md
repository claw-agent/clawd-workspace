# GitHub Trending — 2026-02-17

## Summary
- Scanned: ~55 repos across 5 categories (all, Python, TypeScript, JavaScript, Rust)
- Relevant: 15 repos matching AI/agents/dev tools/MCP interests
- Top pick: rowboatlabs/rowboat — local-first AI coworker with knowledge graph + MCP

---

## Top Repos

### 1. rowboatlabs/rowboat
- **Stars:** 7,461 (+700 today)
- **Language:** TypeScript
- **URL:** https://github.com/rowboatlabs/rowboat
- **Description:** Open-source AI coworker that builds a knowledge graph from email/meetings and acts on it. Local-first, Obsidian-compatible Markdown vault, supports MCP tools.
- **Why Interesting:** Directly comparable to what we're building with Claw — persistent memory, local-first, knowledge graph, MCP integration. Their approach to "memory that compounds" vs cold retrieval is exactly our thesis.
- **Potential Use:** Study their knowledge graph architecture. Could adopt patterns for our memory system.
- **Action:** [Explore] — deep dive their graph + memory design

### 2. ChromeDevTools/chrome-devtools-mcp
- **Stars:** Trending in TypeScript
- **Language:** TypeScript
- **URL:** https://github.com/ChromeDevTools/chrome-devtools-mcp
- **Description:** Official Chrome DevTools MCP server — gives coding agents (Claude, Gemini, Cursor, Copilot) full Chrome DevTools access for automation, debugging, performance analysis. Uses Puppeteer under the hood.
- **Why Interesting:** Already flagged in our morning report as action item. This is the official Google-backed MCP for browser control — superior to our current stealth-browse/browser-use stack for debugging workflows.
- **Potential Use:** Add to our MCP server config for Claude Code. Would give proper DevTools access for web dev work.
- **Action:** [Integrate] — add to MCP config this week

### 3. letta-ai/letta-code
- **Stars:** 1,532 (+22 today)
- **Language:** TypeScript
- **URL:** https://github.com/letta-ai/letta-code
- **Description:** Memory-first coding agent. Persisted agent that learns across sessions, portable across models (Claude, GPT, Gemini, etc). Has skill learning — agent learns reusable skills from trajectories.
- **Why Interesting:** Their "agent-based vs session-based" philosophy is exactly what we do with AGENTS.md + active.md. Their /skill command for learning from trajectories is innovative — could inspire our skill capture system.
- **Potential Use:** Study their skill learning mechanism. Compare memory persistence approach.
- **Action:** [Explore] — review their memory/skill architecture

### 4. p-e-w/heretic
- **Stars:** 6,611 (+891 today) 🔥 fastest growing
- **Language:** Python
- **URL:** https://github.com/p-e-w/heretic
- **Description:** Fully automatic censorship removal for language models. Removes safety filters/refusals from LLMs automatically.
- **Why Interesting:** Controversial but technically interesting. Shows ongoing tension between safety and capability. Massive star velocity suggests strong demand.
- **Potential Use:** Awareness only — understand the uncensoring landscape.
- **Action:** [Watch]

### 5. hesreallyhim/awesome-claude-code
- **Stars:** 23,975 (+133 today)
- **Language:** Python
- **URL:** https://github.com/hesreallyhim/awesome-claude-code
- **Description:** Curated list of skills, hooks, slash-commands, agent orchestrators, and plugins for Claude Code.
- **Why Interesting:** Direct resource for our Claude Code usage. Likely has skills/hooks we haven't discovered yet.
- **Potential Use:** Mine for new Claude Code skills and hooks to add to our setup.
- **Action:** [Explore] — review for useful additions

### 6. davila7/claude-code-templates
- **Stars:** 20,585 (+216 today)
- **Language:** Python
- **URL:** https://github.com/davila7/claude-code-templates
- **Description:** CLI tool for configuring and monitoring Claude Code.
- **Why Interesting:** Another Claude ecosystem tool with strong traction. Could provide config patterns we're missing.
- **Potential Use:** Check for monitoring/config capabilities we could adopt.
- **Action:** [Explore]

### 7. anthropics/claude-quickstarts
- **Stars:** 14,259 (+165 today)
- **Language:** Python
- **URL:** https://github.com/anthropics/claude-quickstarts
- **Description:** Official Anthropic collection of quickstart projects for Claude API deployable apps.
- **Why Interesting:** Official Anthropic resource — likely has new patterns/examples we should know about.
- **Potential Use:** Reference for any new Claude API integrations.
- **Action:** [Watch]

### 8. gsd-build/get-shit-done
- **Stars:** 15,019 (+436 today)
- **Language:** JavaScript
- **URL:** https://github.com/gsd-build/get-shit-done
- **Description:** Meta-prompting, context engineering, and spec-driven development system for Claude Code and OpenCode.
- **Why Interesting:** High velocity. "Context engineering" and "spec-driven development" — could have patterns that improve our AGENTS.md and skill system.
- **Potential Use:** Study their meta-prompting approach. May have better patterns than our current AGENTS.md structure.
- **Action:** [Explore]

### 9. bytedance/deer-flow
- **Stars:** Trending in TypeScript
- **Language:** TypeScript
- **URL:** https://github.com/bytedance/deer-flow
- **Description:** Open-source SuperAgent harness from ByteDance — researches, codes, creates. Sandboxes, memories, tools, skills, subagents for multi-hour tasks.
- **Why Interesting:** ByteDance's take on agent orchestration with subagents — similar to our multi-agent spawn pattern. Has sandboxes + skill system.
- **Potential Use:** Compare their subagent orchestration with ours.
- **Action:** [Watch]

### 10. ComposioHQ/composio
- **Stars:** Trending in TypeScript
- **Language:** TypeScript
- **URL:** https://github.com/ComposioHQ/composio
- **Description:** 100+ high-quality integrations for AI agents via function calling.
- **Why Interesting:** Integration library for agents — could provide pre-built connectors we're currently building manually.
- **Potential Use:** Check if they have integrations we need (CRM, email, etc for XPERIENCE).
- **Action:** [Watch]

### 11. karpathy/nanochat
- **Stars:** 43,512 (+100 today)
- **Language:** Python
- **URL:** https://github.com/karpathy/nanochat
- **Description:** "The best ChatGPT that $100 can buy" — Karpathy's minimal chat interface.
- **Why Interesting:** Karpathy signal. Likely demonstrates lean, effective patterns for LLM chat UIs.
- **Potential Use:** Reference for UI patterns if we build a web interface.
- **Action:** [Watch]

### 12. block/goose
- **Stars:** 30,541 (+52 today)
- **Language:** Rust
- **URL:** https://github.com/block/goose
- **Description:** Open-source extensible AI agent — installs, executes, edits, tests with any LLM. From Block (Square).
- **Why Interesting:** Rust-based agent framework from a major company. Goes beyond code suggestions into full execution.
- **Potential Use:** Compare agent execution patterns.
- **Action:** [Watch]

### 13. max-sixty/worktrunk
- **Stars:** 2,149 (+34 today)
- **Language:** Rust
- **URL:** https://github.com/max-sixty/worktrunk
- **Description:** CLI for Git worktree management, designed for parallel AI agent workflows.
- **Why Interesting:** Directly relevant — managing multiple agent workspaces via git worktrees. Could improve our multi-agent development workflow.
- **Potential Use:** Adopt for parallel agent coding sessions with Claude Squad.
- **Action:** [Explore]

### 14. SynkraAI/aios-core
- **Stars:** 1,044 (+205 today)
- **Language:** JavaScript
- **URL:** https://github.com/SynkraAI/aios-core
- **Description:** AI-Orchestrated System for Full Stack Development — core framework v4.0.
- **Why Interesting:** Another agent orchestration framework with good velocity.
- **Potential Use:** Review architecture patterns.
- **Action:** [Watch]

### 15. tambo-ai/tambo
- **Stars:** Trending in TypeScript
- **Language:** TypeScript
- **URL:** https://github.com/tambo-ai/tambo
- **Description:** Generative UI SDK for React.
- **Why Interesting:** AI-generated React UIs — relevant for rapid prototyping.
- **Potential Use:** Could use for XPERIENCE dashboard or client-facing tools.
- **Action:** [Watch]

---

## Notable Trends
1. **Claude ecosystem explosion** — 3 repos specifically for Claude Code (awesome-claude-code, claude-code-templates, get-shit-done). Claude Code is becoming a platform.
2. **Memory-first agents** — rowboat, letta-code both emphasize persistent memory over session-based. The industry is moving past RAG toward compounding knowledge.
3. **MCP everywhere** — Chrome DevTools MCP, rowboat MCP, composio. MCP is becoming the standard integration layer.
4. **Agent orchestration** — deer-flow, aios-core, goose. Multi-agent with subagents/sandboxes is the pattern.
5. **Git worktrees for agents** — worktrunk specifically designed for parallel AI agent workflows. Infrastructure for multi-agent dev is emerging.
