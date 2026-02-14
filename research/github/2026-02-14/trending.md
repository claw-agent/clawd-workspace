# GitHub Trending — 2026-02-14

## Summary
- Scanned: ~100 repos across 5 categories (all, Python, TypeScript, JavaScript, Rust)
- Relevant: 15 repos
- Top pick: MemeCalculate/moyin-creator

## Top Repos

### 1. MemeCalculate/moyin-creator ⭐ HIGHLIGHT
- **Stars:** 330
- **Language:** TypeScript
- **URL:** https://github.com/MemeCalculate/moyin-creator
- **Description:** AI film production tool with Seedance 2.0 support. Script → character → scene → director → final video. Full pipeline batch automation.
- **Why Interesting:** Marb has been struggling with Seedance 2.0 / ChatCut for the Red Rising video project. This is a production-grade tool that handles the exact workflow: script parsing, character consistency (6-layer identity anchors), multi-shot merging, and Seedance 2.0 parameter validation.
- **Potential Use:** Could replace the painful ChatCut workflow for Red Rising AI video production
- **Action:** [Explore] — High priority given current video gen work

### 2. karpathy/nanochat
- **Stars:** ~15K+ (established, re-trending)
- **Language:** Python
- **URL:** https://github.com/karpathy/nanochat
- **Description:** The best ChatGPT that $100 can buy. Train GPT-2 capability LLM for ~$72 on 8xH100 in 3 hours. Includes tokenization, pretraining, finetuning, evaluation, inference, and chat UI.
- **Why Interesting:** Karpathy's latest — the "GPT-2 speedrun" leaderboard is a fascinating benchmark for training efficiency. Shows how far we've come: $43K in 2019 → $72 in 2026.
- **Potential Use:** Educational reference, potential for custom small model training experiments
- **Action:** [Watch]

### 3. jlia0/tinyclaw
- **Stars:** 1,245
- **Language:** TypeScript
- **URL:** https://github.com/jlia0/tinyclaw
- **Description:** Multi-agent, multi-team, multi-channel 24/7 AI assistant. Teams of AI agents that collaborate via chain execution and fan-out. Supports Discord, WhatsApp, Telegram.
- **Why Interesting:** Directly comparable to our OpenClaw setup. Multi-agent collaboration with team visualization, parallel processing, persistent sessions. Uses Claude Code CLI and Codex CLI.
- **Potential Use:** Architecture inspiration for multi-agent patterns, or potential integration
- **Action:** [Explore]

### 4. THUDM/slime
- **Stars:** Trending Python
- **Language:** Python
- **URL:** https://github.com/THUDM/slime
- **Description:** LLM post-training framework for RL Scaling. From Tsinghua (GLM team).
- **Why Interesting:** RL scaling for LLMs is the cutting edge of model improvement. THUDM is behind ChatGLM/GLM series.
- **Potential Use:** Research reference for understanding RLHF/RL scaling trends
- **Action:** [Watch]

### 5. openai/codex
- **Stars:** Trending Rust
- **Language:** Rust
- **URL:** https://github.com/openai/codex
- **Description:** Lightweight coding agent that runs in your terminal
- **Why Interesting:** OpenAI's official terminal coding agent — direct competitor to Claude Code CLI
- **Potential Use:** Compare capabilities with Claude Code for our workflows
- **Action:** [Watch]

### 6. google/langextract
- **Stars:** Trending Python
- **Language:** Python
- **URL:** https://github.com/google/langextract
- **Description:** Python library for extracting structured information from unstructured text using LLMs with precise source grounding and interactive visualization.
- **Why Interesting:** Google's take on structured extraction — could be useful for research pipelines
- **Potential Use:** Alternative to our current web scraping/extraction approaches
- **Action:** [Watch]

### 7. unclecode/crawl4ai
- **Stars:** Trending Python (established)
- **Language:** Python
- **URL:** https://github.com/unclecode/crawl4ai
- **Description:** Open-source LLM-friendly web crawler & scraper
- **Why Interesting:** Direct alternative to Firecrawl which we evaluated but don't have API key for
- **Potential Use:** Could replace/complement our web scraping stack
- **Action:** [Explore]

### 8. ai-dynamo/dynamo
- **Stars:** Trending Rust
- **Language:** Rust
- **URL:** https://github.com/ai-dynamo/dynamo
- **Description:** NVIDIA datacenter-scale distributed inference serving framework
- **Why Interesting:** NVIDIA's official inference framework — signals where enterprise AI serving is heading
- **Potential Use:** Reference for understanding inference infrastructure trends
- **Action:** [Watch]

### 9. facebook/pyrefly
- **Stars:** Trending Rust
- **Language:** Rust
- **URL:** https://github.com/facebook/pyrefly
- **Description:** Fast type checker and language server for Python
- **Why Interesting:** Meta's new Python type checker — could be significantly faster than mypy/pyright
- **Potential Use:** Better Python DX for our scripts
- **Action:** [Watch]

### 10. rohunvora/x-research-skill
- **Stars:** 728
- **Language:** TypeScript
- **URL:** https://github.com/rohunvora/x-research-skill
- **Description:** X/Twitter research skill for Claude Code and OpenClaw. Agentic search, thread following, deep-dives.
- **Why Interesting:** Directly relevant — we have our own Twitter research setup. Worth comparing approaches.
- **Potential Use:** Steal good ideas for our scout skills
- **Action:** [Explore]

### 11. max-sixty/worktrunk
- **Stars:** Trending Rust
- **Language:** Rust
- **URL:** https://github.com/max-sixty/worktrunk
- **Description:** CLI for Git worktree management, designed for parallel AI agent workflows
- **Why Interesting:** Git worktrees are the right pattern for multi-agent coding. Purpose-built tool for this.
- **Potential Use:** Could improve our multi-agent dev workflows
- **Action:** [Explore]

### 12. antirez/qwen-asr
- **Stars:** 235
- **Language:** C
- **URL:** https://github.com/antirez/qwen-asr
- **Description:** C inference for Qwen3-ASR 0.6b and 1.7b transcription models
- **Why Interesting:** antirez (Redis creator) building C inference for speech recognition. Tiny, fast, no Python dependency.
- **Potential Use:** Alternative to mlx_whisper for transcription, potentially faster/lighter
- **Action:** [Watch]

### 13. farion1231/cc-switch
- **Stars:** Trending Rust
- **Language:** Rust
- **URL:** https://github.com/farion1231/cc-switch
- **Description:** Cross-platform desktop all-in-one assistant for Claude Code, Codex, OpenCode & Gemini CLI
- **Why Interesting:** Unified UI for multiple coding agents
- **Potential Use:** Could simplify switching between Claude Code and Codex
- **Action:** [Watch]

### 14. aeromomo/claw-compactor
- **Stars:** 388
- **Language:** Python
- **URL:** https://github.com/aeromomo/claw-compactor
- **Description:** Cut AI agent token spend in half with 5 layered compression techniques
- **Why Interesting:** Token compression is a real pain point for us — system files are ~27K chars loaded every message
- **Potential Use:** Could reduce our context overhead
- **Action:** [Explore]

### 15. coleam00/context-engineering-intro
- **Stars:** Trending Python
- **Language:** Python
- **URL:** https://github.com/coleam00/context-engineering-intro
- **Description:** Context engineering is the new vibe coding — making AI coding assistants actually work
- **Why Interesting:** Meta-resource on context engineering patterns for Claude Code
- **Potential Use:** Improve our AGENTS.md and skill architecture
- **Action:** [Watch]

## Notable Trends
1. **Agent ecosystem explosion** — OpenClaw/Claude Code spawning entire tool ecosystems (tinyclaw, clawra, claw-compactor, x-research-skill, openclaw-wechat)
2. **AI video production tooling** — moyin-creator shows the script-to-video pipeline is maturing with Seedance 2.0 support
3. **Multi-agent orchestration** — worktrunk, tinyclaw, cc-switch all tackling the "multiple AI agents working in parallel" problem
4. **RL scaling** — THUDM/slime and related work shows RL post-training is the next frontier
5. **Rust for AI infra** — NVIDIA dynamo, OpenAI codex, pyrefly all written in Rust
