# Deep Dive: QwenLM/qwen-code

## Overview
- **Author:** Alibaba/Qwen team
- **What:** Open-source terminal AI coding agent (Claude Code competitor)
- **Language:** TypeScript (Node.js)
- **Install:** `npm install -g @qwen-code/qwen-code@latest` or `brew install qwen-code`
- **Latest:** Qwen3.5-Plus launched 2026-02-16

## Key Features
- **Multi-provider:** OpenAI, Anthropic, Gemini, Alibaba Cloud APIs
- **Free tier:** 1,000 requests/day via Qwen OAuth
- **Open-source:** Both the framework AND the model (Qwen3-Coder) are open
- **Skills & SubAgents:** Built-in agentic workflow system
- **IDE integration:** VS Code, Zed, JetBrains
- **Thinking mode:** Supported on qwen3.5-plus

## Architecture
- Settings in `~/.qwen/settings.json`
- Multi-provider config with envKey-based auth
- Supports thinking/reasoning modes
- Can use any OpenAI-compatible endpoint

## What Makes This Interesting
1. **Free tier** — 1000 req/day is generous for side projects
2. **Fully open-source** — can inspect, modify, self-host
3. **Model + framework co-evolution** — unlike Claude Code where model and tooling are decoupled
4. **Multi-provider** — can point it at Claude, GPT-4o, Gemini, or Qwen models

## Comparison to Claude Code
| Feature | Qwen Code | Claude Code |
|---------|-----------|-------------|
| Open source | Yes | No |
| Free tier | 1000 req/day | No |
| Model lock-in | No (multi-provider) | Claude only |
| Plugin ecosystem | Emerging | Established |
| Quality | Good (Qwen3-Coder) | Best (Claude) |

## Recommendation
**Watch.** Not switching from Claude Code, but useful to know about:
- Free tier for experiments/testing
- Open-source reference for how terminal agents work
- Could use with Claude API as a transparent alternative client
