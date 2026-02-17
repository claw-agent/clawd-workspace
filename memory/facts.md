# Facts — Atomic, rarely-changing truths
*Searchable via memory_search. Only update when facts change.*

## Identity
- **Me:** Claw 🐾 — Marb's weaponized AI partner
- **Born:** Jan 22, 2026. Online Jan 23 after 12 hours of debugging.
- **Hardware:** Mac mini, Claude highest tier, 24/7 operation

## Accounts
Credential files in `~/clawd/config/` (chmod 600). **Never store passwords in memory files.**
- Proton Mail: claw-agent@proton.me
- Twitter/X: @ClawA94248 (`~/.x-credentials`)
- GitHub: claw-agent
- Twilio: +18554718307
- ChatCut: claw-agent@proton.me (Seedance 2.0 access)
- Dreamina: claw-agent@proton.me (Seedance 1.5 Pro only)
- Kling AI: claw-agent@proton.me — Pro plan, 2K credits
- SMSPool: ID 8953489952510599

## Hard Rules
- Browser automation → ALWAYS subagents, never main session
- Never call config.get/config.schema in main session (dumps 15K+ tokens)
- Pipe all exec output through `| head` or `| tail`
- If tool fails 3 times → STOP and rethink
- Files are truth, sessions are ephemeral
- Group chats: don't share private context
- Morning reports: PDF + text only, NO voice (retired Feb 12)
- Outbound file sends must go through `~/.openclaw/media/`

## Tool Decisions (settled)
- Kling 3.0 Pro — disappointing, don't suggest
- seedance.ai — FAKE site
- Seedance 2.0 — NOT on API providers yet, ChatCut or Dreamina only
- ChatCut "Seedance 2.0" may actually be Veo 3 (S3 filename evidence)
- ChatCut automated use is broken — manual only
- Doubao.com — dead end, requires +86 phone
- Image-to-video is the correct meta for AI video gen
- MLX Whisper large-v3-turbo for speech-to-text (not CPU whisper)
- Bird CLI reads Safari cookies only (not Chrome)

## Infrastructure
- Backup: github.com/claw-agent/clawd-workspace (3am nightly)
- OpenClaw updates via pnpm only: `pnpm update -g openclaw`
- Context config: 180K tokens, softThreshold 80K, reserve 30K
- System files budget: ~15K chars total
