# Deep Dive: openclaw/openclaw

**URL:** https://github.com/openclaw/openclaw  
**Language:** TypeScript (Node ≥22)  
**License:** (check repo)  
**Creator:** Peter Steinberger (@steipete)

## What Is It?

OpenClaw is a **personal AI assistant** you run on your own devices. It's essentially Clawdbot's cousin (or competitor?) - same architecture, same channels, same goals. The "lobster way" 🦞

> "If you want a personal, single-user assistant that feels local, fast, and always-on, this is it."

## Channel Support

| Platform | OpenClaw | Clawdbot |
|----------|----------|----------|
| Telegram | ✅ | ✅ |
| WhatsApp | ✅ (Baileys) | ✅ |
| Discord | ✅ | ✅ |
| Slack | ✅ | ✅ |
| Signal | ✅ | ? |
| iMessage | ✅ | ? |
| Google Chat | ✅ | ? |
| Microsoft Teams | ✅ | ? |
| Matrix | ✅ | ? |
| WebChat | ✅ | ? |

They have more channel coverage, especially enterprise (Teams, Google Chat).

## Architecture

```
WhatsApp / Telegram / Slack / Discord / etc.
                │
                ▼
    ┌───────────────────────────────┐
    │          Gateway              │
    │      (control plane)          │
    │    ws://127.0.0.1:18789       │
    └──────────────┬────────────────┘
                   │
         ├─ Pi agent (RPC)
         ├─ CLI (openclaw …)
         ├─ WebChat UI
         ├─ macOS app
         └─ iOS / Android nodes
```

Sound familiar? Gateway as single control plane, WebSocket protocol, multi-client support.

## Key Features We Don't Have (Yet?)

### 1. Voice Wake + Talk Mode
- Always-on speech for macOS/iOS/Android
- ElevenLabs integration
- Push-to-talk overlay

### 2. Live Canvas
- Agent-driven visual workspace
- A2UI (Agent to UI) protocol
- Renders on nodes (macOS/iOS/Android)

### 3. Multi-Agent Routing
- Route different channels to isolated agents
- Per-agent workspaces and sessions

### 4. Companion Apps
- macOS menu bar app
- iOS/Android native apps as "nodes"

### 5. Skills Registry (ClawHub)
- Centralized skill marketplace
- Agent can search and install skills automatically

### 6. Session Tools (Agent to Agent)
- `sessions_list` - discover active sessions
- `sessions_history` - fetch transcripts
- `sessions_send` - message between sessions

## Security Model

Similar philosophy to ours:
- Default: tools run on host for main session
- Sandbox mode for groups/channels (Docker)
- DM pairing for unknown senders

## Workspace Structure

```
~/.openclaw/workspace/
├── AGENTS.md
├── SOUL.md  
├── TOOLS.md
└── skills/
    └── <skill>/SKILL.md
```

Nearly identical to our `~/clawd/` structure!

## Installation

```bash
npm install -g openclaw@latest
openclaw onboard --install-daemon
```

They have a nice onboarding wizard. The `--install-daemon` installs as a system service (launchd/systemd).

## What We Can Learn From Them

### 1. Voice Integration
Their Voice Wake + Talk Mode is polished. We have TTS but not STT wake words.

### 2. Native Apps
They ship actual macOS/iOS/Android apps. We're CLI/daemon only.

### 3. Skills Marketplace
ClawHub is interesting - centralized discovery and install. Our skills are manual.

### 4. Multi-Agent Isolation
Routing different channels to different agent personalities/workspaces.

### 5. Tailscale Integration
Built-in support for Tailscale Serve/Funnel for remote access.

## What We Have That They Don't (?)

- Need to compare more closely
- Our memory system might be more developed
- Twitter integration (bird CLI)?

## Community & Activity

- Active Discord community
- Many contributors (100+)
- Regular releases
- Well-documented

## Verdict

**Action: [Watch]** - Important to track as peer project

This is essentially the same product with different implementation. Worth:
1. Watching their feature development
2. Learning from their solutions to common problems
3. Potentially sharing code/ideas
4. Not reinventing wheels they've already built

**Key Insight:** The personal AI assistant space is converging on similar architectures. Gateway + channels + tools + workspace. The differentiators will be:
- UX polish
- Channel coverage
- Tool/skill ecosystem
- Community

**Next Steps:**
1. Try the onboarding wizard
2. Compare specific features (voice, canvas, sessions)
3. Look at their skill format vs ours
4. Consider reaching out to @steipete for collaboration ideas
