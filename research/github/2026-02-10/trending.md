# GitHub Trending — 2026-02-10

## Summary
- Scanned: ~75 repos across 5 categories (all, python, typescript, javascript, rust)
- Relevant: 14 repos
- Top pick: pydantic/monty

## Top Repos

### 1. pydantic/monty
- **Language:** Rust (Python/JS bindings)
- **URL:** https://github.com/pydantic/monty
- **Description:** Minimal, secure Python interpreter written in Rust for AI agent code execution. Microsecond startup, sandboxed, snapshotable state.
- **Why Interesting:** Solves the "let LLMs write code safely" problem without containers. From Pydantic team (credible). Supports programmatic tool calling pattern Anthropic is pushing.
- **Potential Use:** Embed in our agent system for safe code execution instead of Docker sandboxes. Could replace heavier sandbox approaches.
- **Action:** [Explore] — high priority, directly relevant to our agent stack

### 2. KeygraphHQ/shannon
- **Language:** TypeScript
- **URL:** https://github.com/KeygraphHQ/shannon
- **Description:** Fully autonomous AI pentester. 96.15% success rate on XBOW Benchmark. White-box, source-aware. Finds real exploits (injection, XSS, SSRF, auth bypass).
- **Why Interesting:** Already installed in our tooling! Trending validates our early adoption. Uses Claude Code under the hood.
- **Potential Use:** Already using it. Good to track updates.
- **Action:** [Watch] — already integrated

### 3. EveryInc/compound-engineering-plugin
- **Language:** TypeScript
- **URL:** https://github.com/EveryInc/compound-engineering-plugin
- **Description:** Claude Code plugin marketplace with compound engineering workflow: Plan → Work → Review → Compound → Repeat. Also converts Claude Code plugins to OpenCode/Codex format.
- **Why Interesting:** Directly relevant to our Claude Code workflow. The "compound" philosophy (each unit of work makes next easier) aligns with our self-improvement loops.
- **Potential Use:** Install the plugin, adopt the Plan→Work→Review→Compound cycle. Cross-format plugin conversion is useful.
- **Action:** [Explore] — install and evaluate

### 4. virattt/dexter
- **Language:** Python
- **URL:** https://github.com/virattt/dexter
- **Description:** Autonomous agent for deep financial research
- **Why Interesting:** Financial research agent — relevant to Marb's trading/finance interests
- **Potential Use:** Reference architecture for financial analysis agents
- **Action:** [Explore]

### 5. github/gh-aw
- **Language:** Unknown
- **URL:** https://github.com/github/gh-aw
- **Description:** GitHub Agentic Workflows — official GitHub tool for agent-powered workflows
- **Why Interesting:** GitHub entering the agentic space officially. Could integrate with our CI/CD.
- **Potential Use:** Automate GitHub workflows with agents
- **Action:** [Watch]

### 6. iOfficeAI/AionUi
- **Language:** TypeScript
- **URL:** https://github.com/iOfficeAI/AionUi
- **Description:** Free, local, open-source 24/7 cowork UI for Gemini CLI, Claude Code, Codex, OpenCode, and more
- **Why Interesting:** Multi-agent IDE/UI — similar space to what we're building with OpenClaw
- **Potential Use:** Reference for UI patterns, potential alternative interface
- **Action:** [Watch]

### 7. microsoft/litebox
- **Language:** Rust
- **URL:** https://github.com/microsoft/litebox
- **Description:** Security-focused library OS supporting kernel- and user-mode execution
- **Why Interesting:** Microsoft's answer to secure sandboxing. Could complement Monty for heavier isolation needs.
- **Potential Use:** Research for sandboxing approaches
- **Action:** [Watch]

### 8. openai/skills
- **Language:** Unknown
- **URL:** https://github.com/openai/skills
- **Description:** Skills Catalog for Codex
- **Why Interesting:** OpenAI formalizing a skills/plugin ecosystem for Codex. Competing with Claude Code's approach.
- **Potential Use:** Cross-pollinate ideas for our skill system
- **Action:** [Watch]

### 9. archestra-ai/archestra
- **Language:** TypeScript
- **URL:** https://github.com/archestra-ai/archestra
- **Description:** Enterprise MCP registry & orchestrator. Agentic Security, MCP, A2A, LLM orchestration.
- **Why Interesting:** Enterprise MCP orchestration — where the ecosystem is heading
- **Potential Use:** Reference for MCP registry patterns
- **Action:** [Watch]

### 10. gitbutlerapp/gitbutler
- **Language:** Rust/Svelte
- **URL:** https://github.com/gitbutlerapp/gitbutler
- **Description:** Modern Git client powered by Tauri/Rust/Svelte
- **Why Interesting:** Good dev tool, Tauri/Rust/Svelte stack is interesting
- **Potential Use:** Could replace git CLI for complex branch management
- **Action:** [Watch]

### 11. sinelaw/fresh
- **Language:** Rust
- **URL:** https://github.com/sinelaw/fresh
- **Description:** Terminal-based IDE & text editor — easy, powerful, fast
- **Why Interesting:** New terminal IDE competitor. Rust-based, could be interesting for remote dev.
- **Potential Use:** Alternative to vim/neovim for terminal editing
- **Action:** [Skip]

### 12. Shubhamsaboo/awesome-llm-apps
- **Language:** Python
- **URL:** https://github.com/Shubhamsaboo/awesome-llm-apps
- **Description:** Collection of awesome LLM apps with AI Agents and RAG
- **Why Interesting:** Curated list — good for finding patterns and ideas
- **Potential Use:** Reference collection
- **Action:** [Skip]

### 13. microsoft/edit
- **Language:** Rust
- **URL:** https://github.com/microsoft/edit
- **Description:** Microsoft's new terminal text editor
- **Why Interesting:** Microsoft building a terminal editor in Rust
- **Potential Use:** Lightweight editing alternative
- **Action:** [Skip]

### 14. DioxusLabs/dioxus
- **Language:** Rust
- **URL:** https://github.com/DioxusLabs/dioxus
- **Description:** Fullstack app framework for web, desktop, and mobile
- **Why Interesting:** React-like Rust framework, cross-platform
- **Potential Use:** Future app development
- **Action:** [Watch]

## Notable Trends
1. **AI security is exploding** — Shannon, litebox, archestra all trending. Security for/by AI is the hot space.
2. **Safe code execution for agents** — Monty (Pydantic), litebox (Microsoft) both solving "let AI run code safely"
3. **Agent tooling maturing** — Compound engineering, GitHub Agentic Workflows, OpenAI Skills show the ecosystem formalizing
4. **Rust dominance in infra** — 8 of the top Rust repos are developer tools/infrastructure
5. **Multi-agent orchestration** — AionUi, archestra, compound-engineering all about coordinating multiple AI agents
