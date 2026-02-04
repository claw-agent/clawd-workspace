# GitHub Trending — 2026-02-02

## Summary
- **Scanned:** ~75 repos across 5 categories (All, Python, TypeScript, JavaScript, Rust)
- **Relevant:** 15 repos matching interest profile
- **Top pick:** openclaw/openclaw — Personal AI assistant with explosive growth (+10,794 stars today)
- **Trend:** AI agents dominate — 9 of top 15 are agent-related

---

## 🔥 Top Repos

### 1. openclaw/openclaw ⭐⭐⭐
- **Stars:** 146,652 (+10,794 today) 🚀
- **Language:** TypeScript
- **URL:** https://github.com/openclaw/openclaw
- **Description:** Personal AI assistant — runs on your own devices, connects to WhatsApp, Telegram, Slack, Discord, Signal, iMessage, Teams, Matrix. Gateway control plane with voice wake, live canvas, and multi-agent routing.
- **Why Interesting:** This is basically Clawdbot's public cousin. Same architecture philosophy: local gateway, multi-channel, skills platform. Massive community validation.
- **Potential Use:** Study their skills system, channel implementations, and A2UI canvas approach. Consider contributing or adopting patterns.
- **Action:** [Explore] — Read their docs at docs.openclaw.ai

---

### 2. thedotmack/claude-mem ⭐⭐⭐
- **Stars:** 16,994 (+196 today)
- **Language:** TypeScript
- **URL:** https://github.com/thedotmack/claude-mem
- **Description:** Claude Code plugin that automatically captures tool usage, generates semantic summaries, and injects relevant context into future sessions. Persistent memory across Claude Code sessions.
- **Why Interesting:** Directly addresses the context/memory problem we're solving with AGENTS.md, SESSION-STATE.md, and memory files. Their approach uses hooks + SQLite + vector search.
- **Potential Use:** Could integrate their memory architecture or learn from their progressive disclosure pattern.
- **Action:** [Integrate] — Test installation, compare to our memory approach

---

### 3. badlogic/pi-mono ⭐⭐
- **Stars:** 5,243 (+613 today)
- **Language:** TypeScript
- **URL:** https://github.com/badlogic/pi-mono
- **Description:** AI agent toolkit — coding agent CLI, unified LLM API (OpenAI/Anthropic/Google), TUI & web UI libraries, Slack bot, vLLM pods. Monorepo with 7 packages.
- **Why Interesting:** From Mario Zechner (libGDX creator). Clean architecture: unified LLM API, agent core, TUI library, web components. Well-structured monorepo pattern.
- **Potential Use:** Study their unified LLM API abstraction and agent-core patterns.
- **Action:** [Explore] — Read packages/ai for multi-provider abstraction

---

### 4. ThePrimeagen/99 ⭐⭐
- **Stars:** 2,846 (+781 today)
- **Language:** Lua
- **URL:** https://github.com/ThePrimeagen/99
- **Description:** "Neovim AI agent done right" — ThePrimeagen's take on AI-assisted coding in Neovim.
- **Why Interesting:** From a major dev influencer. If it works well, could signal patterns for editor integration.
- **Potential Use:** Vim users only, but architecture patterns may be interesting.
- **Action:** [Watch] — Monitor for insights

---

### 5. microsoft/agent-lightning ⭐⭐
- **Stars:** 13,122 (+406 today)
- **Language:** Python
- **URL:** https://github.com/microsoft/agent-lightning
- **Description:** "The absolute trainer to light up AI agents" — Microsoft's agent training framework.
- **Why Interesting:** Microsoft's official agent training toolkit. May have good patterns for agent evaluation/fine-tuning.
- **Potential Use:** If doing agent training or evaluation benchmarks.
- **Action:** [Watch] — Check README for training approaches

---

### 6. pedramamini/Maestro ⭐
- **Stars:** 1,099 (+49 today)
- **Language:** TypeScript
- **URL:** https://github.com/pedramamini/Maestro
- **Description:** Agent Orchestration Command Center — multi-agent coordination.
- **Why Interesting:** Multi-agent orchestration is a hot topic. From security researcher Pedram Amini.
- **Potential Use:** Compare to our sub-agent spawning patterns.
- **Action:** [Explore] — Check orchestration patterns

---

### 7. karpathy/nanochat ⭐⭐
- **Stars:** 41,357 (+137 today)
- **Language:** Python
- **URL:** https://github.com/karpathy/nanochat
- **Description:** "The best ChatGPT that $100 can buy" — Karpathy's minimal ChatGPT clone.
- **Why Interesting:** Andrej Karpathy. Minimalist approach to building capable chat systems.
- **Potential Use:** Educational, demonstrates core patterns without bloat.
- **Action:** [Explore] — Read for learning

---

### 8. amantus-ai/vibetunnel ⭐
- **Stars:** 3,666 (+43 today)
- **Language:** TypeScript
- **URL:** https://github.com/amantus-ai/vibetunnel
- **Description:** Turn any browser into your terminal & command your agents on the go.
- **Why Interesting:** Browser-to-terminal tunneling for remote agent control. By steipete & friends.
- **Potential Use:** Remote agent access patterns.
- **Action:** [Watch]

---

### 9. steipete/CodexBar ⭐
- **Stars:** 4,101 (+99 today)
- **Language:** Swift
- **URL:** https://github.com/steipete/CodexBar
- **Description:** macOS menu bar app showing usage stats for OpenAI Codex and Claude Code without login.
- **Why Interesting:** Simple utility for tracking AI coding tool usage. From PSPDFKit founder.
- **Potential Use:** If tracking API usage is needed.
- **Action:** [Skip] — Nice but not essential

---

### 10. j178/prek ⭐⭐
- **Stars:** 4,354 (+61 today)
- **Language:** Rust
- **URL:** https://github.com/j178/prek
- **Description:** "Better pre-commit, re-engineered in Rust" — faster pre-commit hooks.
- **Why Interesting:** Dev tool improvement. Pre-commit but fast.
- **Potential Use:** Replace pre-commit in repos if speed matters.
- **Action:** [Explore] — Try on a repo

---

### 11. vita-epfl/Stable-Video-Infinity ⭐
- **Stars:** 1,866 (+45 today)
- **Language:** Python
- **URL:** https://github.com/vita-epfl/Stable-Video-Infinity
- **Description:** ICLR 2026 paper — Infinite-Length Video Generation with Error Recycling.
- **Why Interesting:** Research paper implementation. Long-form video generation.
- **Potential Use:** Video generation for content creation.
- **Action:** [Watch] — May be useful for video projects

---

### 12. reconurge/flowsint ⭐
- **Stars:** 2,404 (+325 today)
- **Language:** TypeScript
- **URL:** https://github.com/reconurge/flowsint
- **Description:** Graph-based investigation platform for cybersecurity analysts.
- **Why Interesting:** OSINT/investigation tool with nice visual graph interface.
- **Potential Use:** Research and investigation workflows.
- **Action:** [Watch]

---

### 13. m-bain/whisperX ⭐
- **Stars:** 19,918 (+17 today)
- **Language:** Python
- **URL:** https://github.com/m-bain/whisperX
- **Description:** WhisperX — Speech recognition with word-level timestamps and diarization.
- **Why Interesting:** Better than vanilla Whisper for transcription with timestamps.
- **Potential Use:** Already have mlx_whisper, but WhisperX adds diarization (speaker ID).
- **Action:** [Explore] — Consider if speaker identification needed

---

### 14. kovidgoyal/kitty ⭐
- **Stars:** 31,042 (+26 today)
- **Language:** Python
- **URL:** https://github.com/kovidgoyal/kitty
- **Description:** GPU-based terminal emulator. Cross-platform, fast, feature-rich.
- **Why Interesting:** Popular terminal. Already well-known.
- **Action:** [Skip] — Already established

---

### 15. onlook-dev/onlook ⭐
- **Stars:** N/A (trending)
- **Language:** TypeScript
- **URL:** https://github.com/onlook-dev/onlook
- **Description:** "Cursor for Designers" — AI-first design tool for React apps. Visually build and style with AI.
- **Why Interesting:** Design-to-code with AI. Could be useful for UI prototyping.
- **Potential Use:** Quick UI mockups that generate real React code.
- **Action:** [Explore]

---

## 🎯 Notable Trends

### 1. AI Agents Everywhere
9 of the top 15 trending repos are agent-related. The agent gold rush is real:
- Personal assistants (OpenClaw, Claude-mem)
- Coding agents (pi-mono, 99, agent-lightning)
- Orchestration (Maestro, vibetunnel)

### 2. Memory/Context Management Hot Topic
Multiple projects tackling the "memory problem":
- claude-mem: Session memory compression
- openclaw: Multi-agent routing + session isolation
This validates our AGENTS.md/SESSION-STATE.md approach.

### 3. TypeScript Dominates Agent Dev
7 of 11 AI agent repos are TypeScript. JS ecosystem winning for agent tooling.

### 4. Steipete's Influence
Peter Steinberger (steipete) appears as contributor on 4 trending repos:
- openclaw, vibetunnel, CodexBar, and more
Worth following for agent tooling trends.

### 5. Claude Code Ecosystem Growing
- claude-mem: Memory plugin
- CodexBar: Usage tracking
- Multiple repos list Claude as contributor
The Claude Code ecosystem is expanding rapidly.

---

## 📊 By Category

| Category | Count | Top Repo |
|----------|-------|----------|
| AI Agents | 9 | openclaw/openclaw |
| Dev Tools | 3 | j178/prek |
| Video/Media | 2 | Stable-Video-Infinity |
| Security | 1 | flowsint |
