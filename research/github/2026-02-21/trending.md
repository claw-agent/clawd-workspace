# GitHub Trending — 2026-02-21

## Summary
- **Scanned:** ~75 repos across 5 categories (all, Python, TypeScript, JavaScript, Rust)
- **Relevant:** 15 repos matching AI/agents/dev tools/indie hacking
- **Top pick:** obra/superpowers

## Notable Trends
- **Coding agent ecosystem exploding**: Claude Code plugins directory is official now, Superpowers provides a full agentic dev methodology, Qwen Code is an open-source Claude Code competitor, Gemini CLI trending
- **Agent tooling maturing**: Composio (1000+ toolkits for agents), BAML (structured outputs), Rig (Rust LLM framework)
- **MCP everywhere**: Context7 trending, GitHub has MCP Registry in nav, plugins all use MCP
- **AI pentesting**: PentAGI trending — fully autonomous AI pentest agents

---

## Top Repos

### 1. obra/superpowers ⭐⭐⭐
- **Language:** Markdown/Skills
- **URL:** https://github.com/obra/superpowers
- **Description:** Agentic skills framework & software development methodology. Composable skills for brainstorming, TDD, subagent-driven dev, code review, git worktrees. Works as Claude Code plugin.
- **Why Interesting:** This is essentially what we've been building manually with AGENTS.md, ralph-loops, and skill files. Jesse Vincent (of RT/Perl fame) built a structured system for it.
- **Potential Use:** Install as Claude Code plugin, steal skill patterns for our own system, compare with ralph-loops methodology
- **Action:** [Explore] — high priority, directly relevant to our workflow

### 2. anthropics/claude-plugins-official ⭐⭐⭐
- **Language:** Python
- **URL:** https://github.com/anthropics/claude-plugins-official
- **Description:** Official Anthropic-managed directory of Claude Code plugins. Curated marketplace with plugin structure standard (plugin.json, MCP configs, commands, agents, skills).
- **Why Interesting:** The official plugin ecosystem is here. This is how Claude Code extensions work now — and we could publish our own skills/tools.
- **Potential Use:** Browse available plugins, consider publishing our XPERIENCE or research skills
- **Action:** [Explore] — check what plugins are available

### 3. QwenLM/qwen-code ⭐⭐
- **Language:** TypeScript
- **URL:** https://github.com/QwenLM/qwen-code
- **Description:** Open-source terminal AI agent from Alibaba/Qwen. Multi-provider (OpenAI/Anthropic/Gemini compatible), OAuth free tier (1000 req/day), subagents, skills system. Basically open-source Claude Code.
- **Why Interesting:** Open-source Claude Code competitor with free tier. Co-evolves with Qwen3-Coder model. Could be useful as fallback or for testing.
- **Potential Use:** Test as alternative coding agent, use free tier for lightweight tasks
- **Action:** [Watch]

### 4. ComposioHQ/composio ⭐⭐
- **Language:** TypeScript
- **URL:** https://github.com/ComposioHQ/composio
- **Description:** 1000+ toolkits, tool search, context management, auth, and sandboxed workbench for building AI agents.
- **Why Interesting:** Pre-built integrations for agents — could accelerate our agent system instead of hand-rolling every integration.
- **Potential Use:** Evaluate for XPERIENCE agent integrations (CRM, email, etc.)
- **Action:** [Watch]

### 5. google-gemini/gemini-cli ⭐⭐
- **Language:** TypeScript
- **URL:** https://github.com/google-gemini/gemini-cli
- **Description:** Open-source AI agent bringing Gemini into the terminal.
- **Why Interesting:** Google's answer to Claude Code. Competition driving innovation.
- **Potential Use:** Benchmark against Claude Code for specific tasks
- **Action:** [Watch]

### 6. simstudioai/sim ⭐⭐
- **Language:** TypeScript
- **URL:** https://github.com/simstudioai/sim
- **Description:** Build, deploy, and orchestrate AI agents. Central intelligence layer for AI workforce.
- **Why Interesting:** We already have Sim Studio installed via Docker. Check if this is the same or updated.
- **Potential Use:** Already in our stack
- **Action:** [Watch]

### 7. vxcontrol/pentagi ⭐
- **Language:** (multi)
- **URL:** https://github.com/vxcontrol/pentagi
- **Description:** Fully autonomous AI agents for complex penetration testing tasks.
- **Why Interesting:** Competitor/complement to our Shannon pentesting tool. Could compare approaches.
- **Potential Use:** Compare with Shannon for XPERIENCE security audits
- **Action:** [Watch]

### 8. gsd-build/get-shit-done ⭐⭐
- **Language:** JavaScript
- **URL:** https://github.com/gsd-build/get-shit-done
- **Description:** Meta-prompting, context engineering, and spec-driven development system for Claude Code and OpenCode.
- **Why Interesting:** Another take on structured agentic development — similar space to Superpowers and our own approach.
- **Potential Use:** Compare patterns, steal good ideas
- **Action:** [Explore]

### 9. 0xPlaygrounds/rig ⭐
- **Language:** Rust
- **URL:** https://github.com/0xPlaygrounds/rig
- **Description:** Build modular and scalable LLM applications in Rust.
- **Why Interesting:** Rust LLM framework — performance-focused alternative to Python agent frameworks.
- **Potential Use:** For performance-critical agent components
- **Action:** [Skip] — Python/TS ecosystem better fits our stack

### 10. BoundaryML/baml ⭐⭐
- **Language:** Rust
- **URL:** https://github.com/BoundaryML/baml
- **Description:** AI framework adding engineering to prompt engineering. Multi-language (Python/TS/Ruby/Java/C#/Rust/Go).
- **Why Interesting:** Structured output extraction from LLMs — could improve reliability of our agent pipelines.
- **Potential Use:** Evaluate for structured data extraction in research/XPERIENCE agents
- **Action:** [Watch]

### 11. git-ai-project/git-ai ⭐
- **Language:** Rust
- **URL:** https://github.com/git-ai-project/git-ai
- **Description:** Git extension for tracking AI-generated code in repos.
- **Why Interesting:** Attribution/tracking of AI vs human code — increasingly relevant.
- **Potential Use:** Install for our repos to track AI contribution %
- **Action:** [Watch]

### 12. blackboardsh/electrobun ⭐
- **Language:** TypeScript
- **URL:** https://github.com/blackboardsh/electrobun
- **Description:** Build ultra fast, tiny, cross-platform desktop apps with TypeScript.
- **Why Interesting:** Electron alternative — lighter weight desktop apps.
- **Potential Use:** If we ever need to ship a desktop tool
- **Action:** [Skip]

### 13. upstash/context7 ⭐⭐
- **Language:** TypeScript
- **URL:** https://github.com/upstash/context7
- **Description:** Context7 MCP Server — up-to-date code documentation for LLMs and AI code editors.
- **Why Interesting:** We already have this MCP server configured. Good to see it's trending/maintained.
- **Potential Use:** Already in our stack
- **Action:** [Watch]

### 14. Future-House/paper-qa ⭐⭐
- **Language:** Python
- **URL:** https://github.com/Future-House/paper-qa
- **Description:** High accuracy RAG for answering questions from scientific documents with citations.
- **Why Interesting:** Best-in-class paper QA — useful for research tasks.
- **Potential Use:** Integrate for deep research workflows
- **Action:** [Watch]

### 15. RichardAtCT/claude-code-telegram ⭐
- **Language:** Python
- **URL:** https://github.com/RichardAtCT/claude-code-telegram
- **Description:** Telegram bot for remote Claude Code access with session persistence.
- **Why Interesting:** We already have this via OpenClaw — but interesting to see the approach.
- **Potential Use:** Compare architecture with OpenClaw
- **Action:** [Skip] — we have OpenClaw

---

## Skipped (not relevant)
- pyrite64 (N64 game engine)
- trivy (security scanner — good but not new)
- eslint, typeorm, pnpm, clap, django, fastapi (established tools, not trending for new reasons)
- freemocap (motion capture)
- Various learning repos (30-Days-Of-JavaScript, cs249r_book)
