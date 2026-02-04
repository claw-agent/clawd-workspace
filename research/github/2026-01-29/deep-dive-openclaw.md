# Deep Dive: openclaw/openclaw

**URL:** https://github.com/openclaw/openclaw  
**Language:** TypeScript  
**License:** Open Source  
**Tagline:** "Your own personal AI assistant. Any OS. Any Platform. The lobster way. 🦞"

## Overview

OpenClaw is essentially the open-source version of Clawdbot. It's a personal AI assistant framework that:
- Runs on your own devices
- Connects to messaging channels you already use
- Provides a Gateway control plane for sessions, tools, and events

## Key Architecture

```
WhatsApp / Telegram / Slack / Discord / Google Chat / Signal / iMessage / etc.
                         │
                         ▼
              ┌─────────────────────┐
              │      Gateway        │
              │  (control plane)    │
              │ ws://127.0.0.1:18789│
              └──────────┬──────────┘
                         │
                         ├─ Pi agent (RPC)
                         ├─ CLI (openclaw …)
                         ├─ WebChat UI
                         ├─ macOS app
                         └─ iOS / Android nodes
```

## Supported Channels (Identical to Clawdbot)
- WhatsApp (Baileys)
- Telegram (grammY)
- Slack (Bolt)
- Discord (discord.js)
- Google Chat
- Signal (signal-cli)
- iMessage (imsg)
- BlueBubbles
- Microsoft Teams
- Matrix
- Zalo
- WebChat

## Notable Features

### 1. Skills Platform
- Bundled, managed, and workspace skills
- Skills stored in `~/.openclaw/workspace/skills/<name>/SKILL.md`
- Injected prompt files: AGENTS.md, SOUL.md, TOOLS.md
- **ClawdHub** skill registry for auto-discovery

### 2. Multi-Agent Routing
- Route different channels/accounts to isolated agents
- Per-agent workspaces and sessions
- `sessions_*` tools for agent-to-agent communication

### 3. Voice & Visual
- Voice Wake (always-on listening)
- Talk Mode (continuous conversation)
- Live Canvas with A2UI (agent-driven visual workspace)
- ElevenLabs integration

### 4. Security Model
- Default: full access for main session
- Sandboxing: Docker containers for non-main sessions
- DM pairing: unknown senders need approval
- Explicit allowlists per channel

### 5. Browser Control
- Dedicated Chrome/Chromium instance
- CDP-based control
- Snapshots, actions, uploads, profiles

## Comparison with Clawdbot

| Feature | OpenClaw | Clawdbot |
|---------|----------|----------|
| Channels | 12+ | Same (via openclaw?) |
| Skills | ClawdHub registry | Workspace skills |
| Multi-agent | sessions_* tools | sessions_* tools |
| Voice | ElevenLabs | Qwen3-TTS |
| Canvas | A2UI | Canvas tool |
| Install | npm/pnpm/bun | npm |

## Architecture Insights

### Gateway Protocol
- WebSocket control plane
- Sessions, presence, config, cron, webhooks
- Control UI served directly
- Tailscale Serve/Funnel for remote access

### Agent Runtime
- "Pi agent runtime" in RPC mode
- Tool streaming and block streaming
- Session model with main/group isolation

### Workspace Convention
```
~/.openclaw/workspace/
├── AGENTS.md        # Agent instructions
├── SOUL.md          # Identity/personality
├── TOOLS.md         # Local tool notes
└── skills/
    └── <name>/
        └── SKILL.md
```

## Why This Matters

1. **Same DNA**: OpenClaw and Clawdbot share core concepts (AGENTS.md, SOUL.md, skills, sessions_*)
2. **Open Source**: Can study implementation details, contribute, or fork
3. **Community**: Active Discord, regular releases
4. **Proven Architecture**: Shows the pattern works at scale

## Potential Actions

1. **Study Implementation**: Look at how they handle:
   - Session persistence
   - Tool streaming
   - Multi-agent coordination
   - Sandbox isolation

2. **Skills Sharing**: Could ClawdHub skills work in Clawdbot?

3. **Feature Parity Check**: Are there features Clawdbot is missing?
   - Tailscale integration
   - A2UI Canvas
   - Voice Wake

4. **Contribution**: Bug fixes or features could benefit both projects

## Key Maintainers
- Peter Steinberger (@steipete)
- Mario Zechner (badlogic/pi-mono)
- Active community of 100+ contributors

## Verdict

**HIGH PRIORITY** for exploration. This is the closest open-source equivalent to Clawdbot's architecture. Understanding OpenClaw deeply will inform Clawdbot development and potentially enable skill/tool sharing.
