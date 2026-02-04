# Current Focus

*Copilot Mode Activated — Jan 31, 2026*

## Active Projects
- **MOVE App:** Refund feasibility research complete, report delivered
- **YELO Deck:** V4 deployed with focus group feedback
- **Agent Improvements:** Copilot mode implemented in AGENTS.md

## Proactive Work
**3x daily (11am, 2pm, 5pm):** A cron job fires to trigger actual work sessions.

When triggered, I MUST:
1. Read `PROACTIVE-IDEAS.md`
2. Pick ONE concrete task
3. Actually DO it (10-30 min of real work)
4. Update the file with progress
5. Check in with Marb about what I built/accomplished

## Ready Capabilities
- 🚀 Lead gen pipeline (discover → score → demo → deploy → email)
- 🎬 Video production (Remotion + Qwen3-TTS)
- 🎙️ Voice cloning (Claw, Ki, Troy voices)
- 📞 Telephony infrastructure (Twilio configured)
- 🔍 Local memory search (embeddinggemma-300M)
- 🤖 Research swarms (parallel agent spawning)

---

## 💓 Proactive Heartbeat Rotation

**Don't just say HEARTBEAT_OK — rotate through these checks:**

| Check | When | Action |
|-------|------|--------|
| **Session Size** | EVERY heartbeat | Run `session_status` — if >60% context, update SESSION-STATE.md |
| **GitHub** | Already covered by sentinel job | Only alert if something needs attention |
| **Memory Review** | Every 2-3 days | Review recent daily logs, distill to MEMORY.md |
| **Project Health** | Weekly | Quick check on active projects |
| **Clawdbot Updates** | Weekly | Check if new version available |

### 🚨 Session Size Alert (CRITICAL)
If context exceeds 70%, IMMEDIATELY:
1. Update SESSION-STATE.md with full current state
2. Consider suggesting `/new` to start fresh session
3. Alert Marb if context >85%

**Why:** Sessions that grow to 7MB cause summary generation to fail. Catch it early.

**Alert vs Silent:**
- 🔔 **Message Marb:** Something actually needs attention
- 🤫 **Stay quiet:** Routine checks, nothing new, late night (11pm-7am)

**Track checks in:** `~/clawd/memory/heartbeat-state.json`

---

## Watching
- ChatGPT Ads rollout (opportunity identified)
- skills.sh for installable agent capabilities
- v0.dev API for premium site generation

## Notes
- Twilio creds: `~/clawd/projects/slc-lead-gen/config/.twilio-credentials`
- Crow collab: "M & Crow Lab" group
- Code review now STANDARD for significant changes
