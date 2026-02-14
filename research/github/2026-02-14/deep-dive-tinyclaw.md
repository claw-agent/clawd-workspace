# Deep Dive: jlia0/tinyclaw

**URL:** https://github.com/jlia0/tinyclaw
**Stars:** 1,245 | **Language:** TypeScript | **Created:** ~Feb 2026

## What It Does
Multi-agent, multi-team, multi-channel 24/7 AI assistant. Run teams of AI agents that collaborate via chain execution and fan-out, with isolated workspaces.

## Architecture
- **Multi-agent** — Isolated agents with specialized roles
- **Multi-team** — Agents hand off work via chain execution and fan-out
- **Multi-channel** — Discord, WhatsApp, Telegram
- **Team Observation** — TUI dashboard for monitoring agent chains
- **AI Providers** — Anthropic Claude and OpenAI Codex (uses existing subscriptions)
- **Persistent sessions** — Context maintained across restarts
- **File-based queue** — No race conditions

## Commands
```bash
tinyclaw start          # Start daemon (interactive setup wizard)
tinyclaw agent list     # List agents
tinyclaw agent add      # Add agent (interactive)
tinyclaw team visualize # Live TUI of agent conversations
```

## Comparison to Our Setup (OpenClaw)
| Feature | TinyClaw | Our OpenClaw |
|---------|----------|--------------|
| Multi-channel | ✅ Discord/WA/Telegram | ✅ Telegram |
| Multi-agent | ✅ Team collaboration | ✅ Subagent spawning |
| Team visualization | ✅ TUI dashboard | ❌ |
| Persistent sessions | ✅ | ✅ |
| Model selection | Claude/Codex | Claude (configurable) |
| Memory system | Basic | QMD + daily notes |

## Key Differences
- TinyClaw focuses on **multi-agent team collaboration** (fan-out, chain execution)
- OpenClaw is more **single-agent with subagent spawning** and deeper tool integration
- TinyClaw's team visualization TUI is something we don't have

## Recommendation
**Action: Explore.** The team visualization and fan-out patterns could inspire improvements to our multi-agent workflows. The architecture is clean and well-documented.
