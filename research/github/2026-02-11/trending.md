# GitHub Trending — 2026-02-11

## Summary
- Scanned: ~75 repos across 5 categories (all, Python, TypeScript, JavaScript, Rust)
- Relevant: 15 repos
- Top pick: pydantic/monty

## Top Repos

### 1. pydantic/monty
- **Language:** Rust (Python/JS bindings)
- **URL:** https://github.com/pydantic/monty
- **Description:** Minimal, secure Python interpreter written in Rust for AI agent code execution. Microsecond startup, no container sandbox needed. Supports snapshotting, type checking with ty, external function calls.
- **Why Interesting:** This is the future of agent tool use — LLMs write Python instead of JSON tool calls, and Monty runs it safely. Pydantic AI will use it for "codemode." Aligns perfectly with how we run agents.
- **Potential Use:** Replace container sandboxes for agent code execution. Could integrate into our agent system for safer, faster tool use.
- **Action:** [Explore] — high priority

### 2. KeygraphHQ/shannon
- **Language:** TypeScript
- **URL:** https://github.com/KeygraphHQ/shannon
- **Description:** Fully autonomous AI pentester. 96.15% success rate on XBOW benchmark. Uses Claude Code to find real exploits (injection, XSS, SSRF, auth bypass) with browser-based proof-of-concepts.
- **Why Interesting:** We already have Shannon installed locally. It's now trending hard — validates the tool. White-box pentesting for vibe-coded apps is a massive market.
- **Potential Use:** Already using it. Good reminder to run it on active projects.
- **Action:** [Watch] — already integrated

### 3. EveryInc/compound-engineering-plugin
- **Language:** TypeScript
- **URL:** https://github.com/EveryInc/compound-engineering-plugin
- **Description:** Official Claude Code plugin implementing the compound engineering workflow (Plan → Work → Review → Compound). Multi-agent code review, worktree-based development, knowledge codification.
- **Why Interesting:** Our AGENTS.md already follows this philosophy. This is the official plugin version. Also has OpenCode/Codex converters for cross-tool compatibility.
- **Potential Use:** Install the plugin to formalize our compound workflow. The sync tool for porting Claude Code skills to OpenCode/Codex is useful.
- **Action:** [Explore] — worth installing

### 4. google/langextract
- **Language:** Python
- **URL:** https://github.com/google/langextract
- **Description:** Extract structured info from unstructured text using LLMs with precise source grounding and interactive visualization.
- **Why Interesting:** Google's take on structured extraction with provenance. Could be useful for research pipelines.
- **Potential Use:** Research data extraction, document processing
- **Action:** [Watch]

### 5. virattt/dexter
- **Language:** TypeScript
- **URL:** https://github.com/virattt/dexter
- **Description:** Autonomous agent for deep financial research.
- **Why Interesting:** Financial research agent — relevant given Marb's interest in trading/finance tools.
- **Potential Use:** Financial analysis automation
- **Action:** [Watch]

### 6. github/gh-aw
- **Language:** N/A
- **URL:** https://github.com/github/gh-aw
- **Description:** GitHub Agentic Workflows — official GitHub agent workflows.
- **Why Interesting:** GitHub's own agentic workflow system. Could change how CI/CD works.
- **Potential Use:** Automate GitHub workflows with agents
- **Action:** [Watch]

### 7. iOfficeAI/AionUi
- **Language:** TypeScript
- **URL:** https://github.com/iOfficeAI/AionUi
- **Description:** Free, local, open-source 24/7 cowork UI for Gemini CLI, Claude Code, Codex, OpenCode, Goose CLI, and more.
- **Why Interesting:** Multi-agent orchestration UI — similar to Claude Squad but broader.
- **Potential Use:** Alternative orchestration UI
- **Action:** [Watch]

### 8. gitbutlerapp/gitbutler
- **Language:** Rust/Svelte
- **URL:** https://github.com/gitbutlerapp/gitbutler
- **Description:** Modern Git client powered by Tauri/Rust/Svelte.
- **Why Interesting:** Modern Git tooling, Rust+Svelte stack
- **Potential Use:** Better Git workflow
- **Action:** [Watch]

### 9. Jeffallan/claude-skills
- **Language:** Python
- **URL:** https://github.com/Jeffallan/claude-skills
- **Description:** 66 specialized skills for full-stack devs to transform Claude Code into expert pair programmer.
- **Why Interesting:** Large skill collection for Claude Code
- **Potential Use:** Cherry-pick useful skills (audit first per security protocol)
- **Action:** [Watch]

### 10. aliasrobotics/cai
- **Language:** Python
- **URL:** https://github.com/aliasrobotics/cai
- **Description:** Cybersecurity AI framework
- **Why Interesting:** Another AI security tool alongside Shannon
- **Action:** [Skip]

### 11. microsoft/playwright-cli
- **Language:** JavaScript
- **URL:** https://github.com/microsoft/playwright-cli
- **Description:** CLI for Playwright — record, generate code, inspect selectors, screenshots
- **Why Interesting:** Useful for browser automation workflows
- **Action:** [Watch]

### 12. Zackriya-Solutions/meeting-minutes
- **Language:** Rust
- **URL:** https://github.com/Zackriya-Solutions/meeting-minutes
- **Description:** Privacy-first AI meeting assistant with 4x faster Whisper transcription, speaker diarization, Ollama summarization. 100% local.
- **Why Interesting:** Local-first meeting transcription — aligns with privacy values
- **Potential Use:** Meeting notes automation
- **Action:** [Watch]

### 13. microsoft/litebox
- **Language:** Rust
- **URL:** https://github.com/microsoft/litebox
- **Description:** Security-focused library OS supporting kernel- and user-mode execution
- **Why Interesting:** Microsoft's lightweight security sandbox — relevant for agent execution
- **Action:** [Watch]

### 14. steipete/oracle
- **Language:** TypeScript
- **URL:** https://github.com/steipete/oracle
- **Description:** Ask GPT-5 Pro with custom context and files when you're stuck.
- **Why Interesting:** Simple "escalation to a smarter model" pattern
- **Action:** [Skip]

### 15. OpenBMB/VoxCPM
- **Language:** Python
- **URL:** https://github.com/OpenBMB/VoxCPM
- **Description:** Tokenizer-free TTS for context-aware speech generation and voice cloning
- **Why Interesting:** Advanced TTS — could complement our Claw voice system
- **Action:** [Watch]

## Notable Trends
1. **Agent code execution is the new frontier** — Monty (Pydantic) and litebox (Microsoft) both tackle safe code execution for agents
2. **Claude Code ecosystem exploding** — Compound engineering plugin, claude-skills collections, AionUi all target Claude Code users
3. **AI security is hot** — Shannon, CAI, and compound engineering's review workflow all emphasize security
4. **Local-first AI** — Meeting minutes, VoxCPM, and several tools emphasize privacy/local execution
