# GitHub Trending — 2026-02-09

## Summary
- Scanned: ~50 repos across 5 categories (all, Python, TypeScript, JavaScript, Rust)
- Relevant: 14 repos
- Top pick: KeygraphHQ/shannon

## Top Repos

### 1. KeygraphHQ/shannon
- **Language:** TypeScript
- **URL:** https://github.com/KeygraphHQ/shannon
- **Description:** Fully autonomous AI pentester — finds and proves real exploits in web apps. 96.15% success rate on XBOW Benchmark.
- **Why Interesting:** AI security testing is critical as vibe-coding proliferates. Uses Claude under the hood, Docker-based, generates pentester-grade reports with reproducible PoCs.
- **Potential Use:** Run against our own projects before shipping. Perfect complement to our security-reviewer agent.
- **Action:** [Explore] — try against a test app

### 2. pydantic/monty
- **Language:** Rust
- **URL:** https://github.com/pydantic/monty
- **Description:** Minimal, secure Python interpreter in Rust for AI agents. Microsecond startup, sandboxed execution, serializable state.
- **Why Interesting:** Solves the "let LLMs write code safely" problem without containers. From the Pydantic team (high credibility). Supports snapshotting mid-execution. Will be integrated into Pydantic AI.
- **Potential Use:** Replace container sandboxes for agent code execution. Could integrate into our agent system for safe Python eval.
- **Action:** [Explore] — pip install and test with our agents

### 3. obra/superpowers
- **Language:** Markdown/Skills
- **URL:** https://github.com/obra/superpowers
- **Description:** Agentic skills framework & dev methodology for coding agents. Composable skills for brainstorming, TDD, planning, subagent-driven development.
- **Why Interesting:** By Jesse Vincent (obra). Enforces TDD, systematic debugging, git worktrees, code review — as mandatory workflows. Works with Claude Code, Codex, OpenCode. Philosophy aligns with our AGENTS.md approach.
- **Potential Use:** Install in Claude Code for structured development workflows. Compare/merge ideas with our own skill system.
- **Action:** [Explore] — review skills for patterns to adopt

### 4. openai/skills
- **Language:** Unknown
- **URL:** https://github.com/openai/skills
- **Description:** Skills Catalog for Codex
- **Why Interesting:** OpenAI's official skills system for Codex — signals the industry convergence on "skills" as the agent capability pattern.
- **Action:** [Watch]

### 5. virattt/dexter
- **Language:** TypeScript
- **URL:** https://github.com/virattt/dexter
- **Description:** Autonomous agent for deep financial research
- **Why Interesting:** Financial analysis agent — relevant to Marb's investment research interests.
- **Action:** [Watch]

### 6. google/langextract
- **Language:** Python
- **URL:** https://github.com/google/langextract
- **Description:** Extract structured info from unstructured text using LLMs with source grounding and interactive visualization.
- **Why Interesting:** Google's structured extraction library — useful for research pipelines and data processing.
- **Action:** [Watch]

### 7. OpenBMB/MiniCPM-o
- **Language:** Python
- **URL:** https://github.com/OpenBMB/MiniCPM-o
- **Description:** Gemini 2.5 Flash level MLLM for vision, speech, and full-duplex multimodal live streaming — runs on phone.
- **Why Interesting:** On-device multimodal model. Could be interesting for local AI capabilities.
- **Action:** [Watch]

### 8. katanemo/plano
- **Language:** Rust
- **URL:** https://github.com/katanemo/plano
- **Description:** AI-native proxy and data plane for agentic apps — offloads plumbing so you focus on agent core logic.
- **Why Interesting:** Infrastructure layer for agents. Could simplify our agent system's networking/routing.
- **Action:** [Watch]

### 9. memodb-io/Acontext
- **Language:** TypeScript
- **URL:** https://github.com/memodb-io/Acontext
- **Description:** Context Data Platform for AI Agents
- **Why Interesting:** Context management is a key challenge — worth monitoring their approach.
- **Action:** [Watch]

### 10. iOfficeAI/AionUi
- **Language:** TypeScript
- **URL:** https://github.com/iOfficeAI/AionUi
- **Description:** Free, local, open-source 24/7 Cowork and OpenClaw for multiple coding agents (Gemini CLI, Claude Code, Codex, etc.)
- **Why Interesting:** Multi-agent orchestration UI — similar space to what we do with OpenClaw.
- **Action:** [Watch]

### 11. microsoft/litebox
- **Language:** Rust
- **URL:** https://github.com/microsoft/litebox
- **Description:** Security-focused library OS supporting kernel- and user-mode execution
- **Why Interesting:** Microsoft's secure execution environment — relevant to sandboxing.
- **Action:** [Skip]

### 12. karinushka/paneru
- **Language:** Rust
- **URL:** https://github.com/karinushka/paneru
- **Description:** Sliding, tiling window manager for macOS
- **Why Interesting:** macOS tiling WM — useful dev tool.
- **Action:** [Watch]

### 13. microsoft/edit
- **Language:** Rust
- **URL:** https://github.com/microsoft/edit
- **Description:** "We all edit." — Microsoft's new editor
- **Why Interesting:** New editor from Microsoft in Rust. Worth keeping an eye on.
- **Action:** [Watch]

### 14. fosrl/pangolin
- **Language:** TypeScript
- **URL:** https://github.com/fosrl/pangolin
- **Description:** Identity-aware VPN and proxy for remote access
- **Why Interesting:** Privacy/security tool for remote access.
- **Action:** [Skip]

## Notable Trends
- **AI Security Testing** is heating up — Shannon leading with autonomous pentesting
- **Secure code execution for agents** is a hot problem — Monty (Pydantic) and Litebox (Microsoft) both trending
- **Agent dev methodology** is maturing — Superpowers and OpenAI Skills show convergence on structured agent workflows
- **Rust continues to dominate** infrastructure/tooling — 6 of top trending repos are Rust
- **Multi-agent orchestration UIs** proliferating — AionUi, Eigent competing in the space
