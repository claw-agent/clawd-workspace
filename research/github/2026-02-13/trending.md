# GitHub Trending — 2026-02-13

## Summary
- Scanned: ~75 repos across 5 categories (all, Python, TypeScript, JavaScript, Rust)
- Relevant: 15 repos
- Top pick: ChromeDevTools/chrome-devtools-mcp

## Notable Trends
- **MCP everywhere**: Chrome DevTools MCP, Gemini CLI Workspace MCP, tambo MCP support — the protocol is becoming standard infrastructure
- **Personal AI / agentic infra**: danielmiessler's PAI, rowboat (AI coworker with memory), GitHub's own Agentic Workflows
- **Context engineering > prompt engineering**: coleam00's context-engineering-intro trending signals the shift
- **Generative UI**: tambo-ai bringing AI-driven component rendering to React

---

## Top Repos

### 1. ChromeDevTools/chrome-devtools-mcp
- **Language:** TypeScript
- **URL:** https://github.com/ChromeDevTools/chrome-devtools-mcp
- **Description:** Official Chrome DevTools MCP server — lets coding agents (Claude Code, Gemini, Cursor) control and inspect live Chrome via DevTools protocol. Performance traces, network analysis, screenshots, console access.
- **Why Interesting:** Official Google project. MCP server that gives agents full browser debugging. Works with Claude Code natively (`claude mcp add`).
- **Potential Use:** Add to our MCP server config for browser debugging during dev work. Complement our existing browser automation tools.
- **Action:** [Integrate]

### 2. tambo-ai/tambo
- **Language:** TypeScript
- **URL:** https://github.com/tambo-ai/tambo
- **Description:** Generative UI SDK for React. Register components with Zod schemas, AI picks the right one and streams props. Supports MCP integrations, interactable components, local tools.
- **Why Interesting:** Solves the "AI that renders real UI" problem elegantly. Zod schemas as tool definitions is smart. Full MCP support. Could be powerful for building AI-powered dashboards.
- **Potential Use:** Building AI-first interfaces for XPERIENCE or other projects. The generative UI pattern is compelling for internal tools.
- **Action:** [Explore]

### 3. danielmiessler/Personal_AI_Infrastructure
- **Language:** TypeScript
- **URL:** https://github.com/danielmiessler/Personal_AI_Infrastructure
- **Description:** PAI v2.5.0 — full agentic AI infrastructure for personal use. Goal-oriented (not task-oriented), continuous learning, memory system, skill management. From the creator of Fabric.
- **Why Interesting:** Philosophically aligned with what we're building with OpenClaw. Their principles (scaffolding > model, memory system, UNIX philosophy, CLI-first) mirror our approach. Good source of patterns.
- **Potential Use:** Study their architecture patterns, especially the learning loop and skill management. Compare approaches.
- **Action:** [Explore]

### 4. github/gh-aw
- **Language:** Unknown
- **URL:** https://github.com/github/gh-aw
- **Description:** GitHub Agentic Workflows — official GitHub tool for agent-driven workflows.
- **Why Interesting:** GitHub themselves building agentic workflow tooling. First-party support for AI agents in the GitHub ecosystem.
- **Potential Use:** Could integrate into our CI/CD and development workflows.
- **Action:** [Watch]

### 5. google/langextract
- **Language:** Python
- **URL:** https://github.com/google/langextract
- **Description:** Google's library for extracting structured information from unstructured text using LLMs with precise source grounding and interactive visualization.
- **Why Interesting:** Google releasing structured extraction tools with grounding — useful for research pipelines and data extraction tasks.
- **Potential Use:** Could enhance our research/scraping pipelines with better structured extraction.
- **Action:** [Explore]

### 6. rowboatlabs/rowboat
- **Language:** TypeScript
- **URL:** https://github.com/rowboatlabs/rowboat
- **Description:** Open-source AI coworker with memory. Persistent agent that remembers context across sessions.
- **Why Interesting:** The "AI coworker with memory" framing resonates with our setup. Worth comparing their memory architecture.
- **Potential Use:** Architecture inspiration for persistent agent memory.
- **Action:** [Watch]

### 7. iOfficeAI/AionUi
- **Language:** TypeScript
- **URL:** https://github.com/iOfficeAI/AionUi
- **Description:** Free, local, open-source 24/7 cowork UI for Gemini CLI, Claude Code, Codex, and more.
- **Why Interesting:** Multi-agent UI layer that works with Claude Code. Could be useful for visualizing agent work.
- **Potential Use:** Alternative UI for managing coding agents.
- **Action:** [Watch]

### 8. Jeffallan/claude-skills
- **Language:** Python
- **URL:** https://github.com/Jeffallan/claude-skills
- **Description:** 66 specialized skills for full-stack developers using Claude Code. Expert pair programmer patterns.
- **Why Interesting:** Curated skills/prompts for Claude Code. Could steal good patterns for our own skill library.
- **Potential Use:** Review their skill definitions for ideas to add to our own skills collection.
- **Action:** [Explore]

### 9. firecrawl/firecrawl
- **Language:** TypeScript
- **URL:** https://github.com/firecrawl/firecrawl
- **Description:** Web Data API for AI — turn websites into LLM-ready markdown or structured data.
- **Why Interesting:** We already have firecrawl-py installed. It's trending again, indicating continued ecosystem growth.
- **Potential Use:** Already evaluated. Could revisit for API key setup.
- **Action:** [Watch]

### 10. block/goose
- **Language:** Rust
- **URL:** https://github.com/block/goose
- **Description:** Open-source extensible AI agent — install, execute, edit, test with any LLM. From Block (Square).
- **Why Interesting:** Rust-based AI agent from a major company. Extensible architecture, works with any LLM.
- **Potential Use:** Compare agent architecture patterns. The Rust performance angle is interesting.
- **Action:** [Watch]

### 11. mastra-ai/mastra
- **Language:** TypeScript
- **URL:** https://github.com/mastra-ai/mastra
- **Description:** From the Gatsby team — framework for building AI-powered apps and agents with TypeScript.
- **Why Interesting:** Gatsby team pivoting to AI agent framework. TypeScript-native, modern stack.
- **Potential Use:** Alternative framework for building AI-powered features in our projects.
- **Action:** [Watch]

### 12. coleam00/context-engineering-intro
- **Language:** Python
- **URL:** https://github.com/coleam00/context-engineering-intro
- **Description:** Context engineering guide centered around Claude Code. "Context engineering is the new vibe coding."
- **Why Interesting:** Validates the approach we're already using — AGENTS.md, memory systems, structured context. Good to see this becoming mainstream.
- **Potential Use:** Review for any patterns we haven't adopted yet.
- **Action:** [Explore]

### 13. ai-dynamo/dynamo
- **Language:** Rust
- **URL:** https://github.com/ai-dynamo/dynamo
- **Description:** Datacenter-scale distributed inference serving framework.
- **Why Interesting:** Infrastructure-level AI serving. Rust for performance. Could be relevant if we ever scale inference.
- **Potential Use:** Reference architecture for distributed AI serving.
- **Action:** [Skip]

### 14. tensorzero/tensorzero
- **Language:** Rust
- **URL:** https://github.com/tensorzero/tensorzero
- **Description:** Open-source stack for industrial-grade LLM apps — gateway, observability, optimization, evaluation, experimentation.
- **Why Interesting:** Full LLM ops stack. Gateway + observability + evaluation in one package.
- **Potential Use:** If we need production LLM observability beyond what OpenClaw provides.
- **Action:** [Watch]

### 15. gemini-cli-extensions/workspace
- **Language:** TypeScript
- **URL:** https://github.com/gemini-cli-extensions/workspace
- **Description:** Access Google Workspace from Gemini CLI.
- **Why Interesting:** Google Workspace integration for CLI agents. Could inspire similar integrations.
- **Potential Use:** If we need Google Workspace access from our agent setup.
- **Action:** [Skip]
