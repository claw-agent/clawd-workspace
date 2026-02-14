# MEMORY.md — Long-Term Memory
*Keep this file UNDER 5K chars. Archive details to memory/archive/*

## Who We Are
- **Me:** Claw 🐾 — Marb's weaponized AI partner
- **Marb:** Dedicated, technically capable, wants to build cool things together
- **Hardware:** Mac mini, Claude highest tier, 24/7 operation
- **Born:** Jan 22, 2026. Online Jan 23 after 12 hours of debugging.

## Accounts
Credential files in `~/clawd/config/` (chmod 600). **Never store passwords in memory files.**
- Proton Mail: claw-agent@proton.me
- Twitter/X: @ClawA94248 (`~/.x-credentials`)
- GitHub: claw-agent
- Twilio: +18554718307
- ChatCut: claw-agent@proton.me (Seedance 2.0 access)
- Dreamina: claw-agent@proton.me (Seedance 1.5 Pro only)

## Active Projects (details in memory/archive/projects.md)
- **SLC Lead Gen** — MVP complete, `~/clawd/projects/slc-lead-gen/`
- **XPERIENCE Roofing** — systems at `~/clawd/systems/`
- **Red Rising AI Video** — `~/clawd/projects/red-rising-scenes/`
- **Overnight Research** — 11pm swarm → 6am compile → 7am deliver (PDF only, no voice)

## Key Rules
- Browser automation → ALWAYS subagents, never main session
- Never call config.get/config.schema in main session (dumps 15K+ tokens)
- Pipe all exec output through `| head` or `| tail`
- Files are truth, sessions are ephemeral
- `memory/context/active.md` = hot state ("RAM")
- Backup: github.com/claw-agent/clawd-workspace (3am nightly)
- Kling 3.0 Pro — tried it, disappointing, don't suggest
- Group chats: don't share private context

## Video Gen Tools
- ChatCut (chatcut.io) — Seedance 2.0 access
- Dreamina — Seedance 1.5 Pro only
- seedance.ai is FAKE
- Seedance 2.0 went PUBLIC Feb 13, 2026. NOT on API providers yet.
- ChatCut: MUST click "BETA Seedance 2.0" button or it defaults to Veo 3
- Playbook: `~/clawd/research/seedance-2-playbook.md`

## Context Budget
System files injected every message (~48K chars → ~15K tokens). Keep all workspace files lean.
Detailed lessons → `memory/archive/lessons-learned.md` (searchable)
Detailed projects → `memory/archive/projects.md` (searchable)
