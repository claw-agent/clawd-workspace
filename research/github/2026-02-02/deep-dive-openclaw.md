# Deep Dive: openclaw/openclaw

**URL:** https://github.com/openclaw/openclaw  
**Stars:** 146,652 (+10,794 today)  
**Language:** TypeScript  
**License:** MIT

---

## What Is It?

OpenClaw is a **personal AI assistant** you run on your own devices. It's a local-first architecture with a Gateway control plane that connects to all major messaging platforms.

Key tagline: *"EXFOLIATE! EXFOLIATE!"* (lobster theming 🦞)

---

## Core Architecture

```
Channels (WhatsApp/Telegram/Slack/Discord/Signal/iMessage/Teams/Matrix/etc)
               │
               ▼
┌───────────────────────────────────┐
│            Gateway                │
│       (control plane)             │
│     ws://127.0.0.1:18789          │
└──────────────┬────────────────────┘
               │
               ├─ Pi agent (RPC)
               ├─ CLI (openclaw …)
               ├─ WebChat UI
               ├─ macOS app
               └─ iOS / Android nodes
```

---

## Key Features

### Channels Supported
- WhatsApp (Baileys)
- Telegram (grammY)
- Slack (Bolt)
- Discord (discord.js)
- Google Chat (Chat API)
- Signal (signal-cli)
- iMessage (imsg)
- BlueBubbles
- Microsoft Teams
- Matrix
- Zalo
- WebChat

### Platform Apps
- **macOS menu bar app** — Voice Wake, PTT, Talk Mode, WebChat, remote gateway control
- **iOS node** — Canvas, Voice Wake, camera, screen recording
- **Android node** — Canvas, Talk Mode, camera, screen recording

### Tools & Automation
- **Browser control** — Dedicated Chrome with CDP control
- **Canvas + A2UI** — Agent-driven visual workspace
- **Voice Wake + Talk Mode** — Always-on speech (ElevenLabs)
- **Nodes** — Camera snap/clip, screen record, location, notifications
- **Cron + webhooks** — Scheduled tasks, Gmail Pub/Sub
- **Skills platform** — Bundled, managed, and workspace skills

### Security
- DM pairing by default (unknown senders get a pairing code)
- Local allowlist management
- `openclaw doctor` for security audits

---

## Installation

```bash
npm install -g openclaw@latest
openclaw onboard --install-daemon
```

The wizard sets up Gateway daemon (launchd/systemd) to stay running.

---

## Why This Matters for Us

### Similarities to Clawdbot
1. **Local Gateway architecture** — Same control plane concept
2. **Multi-channel support** — Both connect to messaging platforms
3. **Skills/plugins system** — Both have extensible tool systems
4. **Voice support** — Both have TTS/STT capabilities
5. **Canvas/A2UI** — Both have visual workspace concepts

### Differences
1. **Open source vs proprietary** — OpenClaw is MIT licensed
2. **Larger community** — 146K stars, active Discord
3. **Mobile apps** — iOS/Android native apps
4. **More channels** — Signal, iMessage, Matrix, Teams, etc.

### What We Can Learn
1. **Skills platform design** — How they handle bundled vs workspace skills
2. **Channel implementations** — Their Baileys/grammY/discord.js patterns
3. **A2UI approach** — Agent-driven UI rendering
4. **Security model** — DM pairing and allowlist patterns
5. **Multi-agent routing** — Per-channel/account agent isolation

---

## Contributors of Note

- **@steipete** (Peter Steinberger) — PSPDFKit founder, prolific iOS dev
- **@claude** — AI contributor (interesting!)
- **@thewilloftheshadow** — Active maintainer

---

## Activity Assessment

- **Very Active** — 10,794 stars in one day
- **Recent commits** — Multiple per day
- **Good docs** — Comprehensive documentation site
- **Active Discord** — Community support

---

## Recommendation

**Priority: HIGH — Explore in depth**

This is the most relevant trending repo for our interests. Worth:
1. Reading their architecture docs
2. Testing the installation
3. Comparing skills system to our approach
4. Potentially contributing or borrowing patterns

---

## Links

- Website: https://openclaw.ai
- Docs: https://docs.openclaw.ai
- Discord: https://discord.gg/clawd
- DeepWiki: https://deepwiki.com/openclaw/openclaw
