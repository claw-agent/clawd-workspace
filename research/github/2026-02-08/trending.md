# GitHub Trending — 2026-02-08

## Summary
- Scanned: ~60 repos across 5 categories (all, Python, TypeScript, JavaScript, Rust)
- Relevant: 15 repos
- Top pick: KeygraphHQ/shannon

## Top Repos

### 1. KeygraphHQ/shannon
- **Language:** TypeScript
- **URL:** https://github.com/KeygraphHQ/shannon
- **Description:** Fully autonomous AI pentester that finds real exploits in web apps. 96.15% success rate on XBOW Benchmark.
- **Why Interesting:** AI-powered security testing that actually executes exploits, not just alerts. Perfect complement to vibe-coding — "every Claude deserves their Shannon."
- **Potential Use:** Run against XPERIENCE apps and any future projects for security validation
- **Action:** [Explore] — Set up and run against roof estimator

### 2. p-e-w/heretic
- **Language:** Python
- **URL:** https://github.com/p-e-w/heretic
- **Description:** Fully automatic censorship removal for language models via optimized abliteration. Produces uncensored models with minimal capability loss.
- **Why Interesting:** Uses Optuna TPE optimizer + directional ablation to automatically find optimal decensoring parameters. Results rival manual expert abliterations at lower KL divergence.
- **Potential Use:** Create uncensored local models for unrestricted research/creative tasks on Ollama
- **Action:** [Watch] — Interesting for local LLM work

### 3. obra/superpowers
- **Language:** Markdown/Skills
- **URL:** https://github.com/obra/superpowers
- **Description:** Agentic skills framework & software dev methodology. Composable skills for brainstorming, TDD, subagent-driven development, code review.
- **Why Interesting:** By Jesse Vincent (obra). Complete dev workflow: spec → plan → subagent execution → review. Agents work autonomously for hours. Similar to our Ralph Loops but more structured.
- **Potential Use:** Adopt skill patterns for our own agent workflows, compare with Ralph Loops approach
- **Action:** [Explore] — Study skill patterns for integration ideas

### 4. anthropics/skills
- **Language:** Python
- **URL:** https://github.com/anthropics/skills
- **Description:** Official public repository for Agent Skills from Anthropic
- **Why Interesting:** First-party skills catalog — defines the standard for Claude agent skills
- **Potential Use:** Reference for building our own skills, potential skills to install
- **Action:** [Explore]

### 5. anthropics/claude-agent-sdk-python
- **Language:** Python
- **URL:** https://github.com/anthropics/claude-agent-sdk-python
- **Description:** Official Python SDK for building Claude agents
- **Why Interesting:** Official agent SDK — could be the foundation for custom agent builds
- **Potential Use:** Build custom agents beyond OpenClaw
- **Action:** [Explore]

### 6. openai/skills
- **Language:** Python
- **URL:** https://github.com/openai/skills
- **Description:** Skills Catalog for Codex
- **Why Interesting:** OpenAI's answer to agent skills — shows the industry converging on skills-as-infrastructure
- **Potential Use:** Competitive intelligence, pattern comparison
- **Action:** [Watch]

### 7. OpenBMB/MiniCPM-o
- **Language:** Python
- **URL:** https://github.com/OpenBMB/MiniCPM-o
- **Description:** Gemini 2.5 Flash level MLLM for vision, speech, and multimodal live streaming — runs on phone
- **Why Interesting:** Competitive multimodal model that runs on mobile. Vision + speech + live streaming.
- **Potential Use:** On-device multimodal AI for mobile projects
- **Action:** [Watch]

### 8. microsoft/litebox
- **Language:** C/Rust
- **URL:** https://github.com/microsoft/litebox
- **Description:** Security-focused library OS supporting kernel- and user-mode execution
- **Why Interesting:** Microsoft building a security-first OS layer — signals direction of secure computing
- **Potential Use:** Research reference for security architecture
- **Action:** [Skip]

### 9. microsoft/RD-Agent
- **Language:** Python
- **URL:** https://github.com/microsoft/RD-Agent
- **Description:** AI-driven R&D automation for data and models — "let AI drive data-driven AI"
- **Why Interesting:** Automated research & development agent from Microsoft Research
- **Potential Use:** Could inform our agent architecture for research tasks
- **Action:** [Watch]

### 10. mem0ai/mem0
- **Language:** Python
- **URL:** https://github.com/mem0ai/mem0
- **Description:** Universal memory layer for AI Agents
- **Why Interesting:** Solves the exact problem we deal with — agent memory persistence. 6 lines of code integration.
- **Potential Use:** Could replace/complement our file-based memory system
- **Action:** [Watch]

### 11. ChromeDevTools/chrome-devtools-mcp
- **Language:** TypeScript
- **URL:** https://github.com/ChromeDevTools/chrome-devtools-mcp
- **Description:** Chrome DevTools MCP server for coding agents
- **Why Interesting:** Official Chrome team building MCP integration — debug web apps from agents
- **Potential Use:** Add to our MCP server collection for web debugging
- **Action:** [Explore]

### 12. refly-ai/refly
- **Language:** TypeScript
- **URL:** https://github.com/refly-ai/refly
- **Description:** Open-source agent skills builder. Define skills via vibe workflow, run on Claude Code, Cursor, Codex.
- **Why Interesting:** "Skills are infrastructure, not prompts" — visual skill builder for agents
- **Potential Use:** Alternative skill authoring approach
- **Action:** [Watch]

### 13. vercel/streamdown
- **Language:** TypeScript
- **URL:** https://github.com/vercel/streamdown
- **Description:** Drop-in replacement for react-markdown, designed for AI streaming
- **Why Interesting:** From Vercel — optimized markdown rendering for AI chat UIs
- **Potential Use:** Use in any Next.js AI chat interfaces we build
- **Action:** [Watch]

### 14. Nagi-ovo/gemini-voyager
- **Language:** TypeScript (5,205 stars, 80/day)
- **URL:** https://github.com/Nagi-ovo/gemini-voyager
- **Description:** All-in-one enhancement suite for Google Gemini — timeline navigation, folders, prompt library, chat export
- **Why Interesting:** Power-user Chrome extension for Gemini. 80 stars/day shows strong demand.
- **Potential Use:** Reference for building similar enhancement tools
- **Action:** [Skip]

### 15. ruvnet/wifi-densepose
- **Language:** Python (5,799 stars, 33/day)
- **URL:** https://github.com/ruvnet/wifi-densepose
- **Description:** WiFi-based dense human pose estimation — track full body through walls using commodity mesh routers
- **Why Interesting:** Wild technology — pose estimation through walls via WiFi signals. Privacy implications are significant.
- **Potential Use:** Novelty/research interest
- **Action:** [Skip]

## Notable Trends
1. **Skills-as-infrastructure explosion** — Anthropic, OpenAI, obra, refly all shipping skills frameworks simultaneously. The agent ecosystem is converging on composable skills.
2. **AI security tooling** — Shannon (pentesting) and trivy showing AI + security is a hot intersection
3. **Agent memory** — mem0 and cognee both trending, showing memory remains an unsolved pain point
4. **Uncensoring local models** — heretic shows continued demand for unrestricted local LLMs
5. **MCP adoption** — Chrome DevTools MCP shows major platforms adopting the protocol
