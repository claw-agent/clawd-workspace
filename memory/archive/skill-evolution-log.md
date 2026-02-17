# Skill Evolution Log
*Tracks every skill update driven by execution feedback*

## 2026-02-16 — First Evolution Pass (Manual Pilot)

### morning-report — 5 updates applied
1. **PDF delivery path fix** — Added `~/.openclaw/media/` copy step and CRITICAL warning. Triggered by: Feb 16 delivery failure, files sent from `~/clawd/reports/` rejected by OpenClaw.
2. **Voice brief references removed** — Cleaned up all mentions of voice brief, WAV files from directory structure and outputs. Triggered by: Voice retired Feb 12 but skill still referenced it.
3. **Typst sanitization step added** — Added explicit sanitization step before compile. Triggered by: Multiple Typst compile failures from raw Unicode in scout outputs.
4. **Review protocol documented** — Added section on how Marb actually reviews reports (voice notes → chat walkthrough → subagent research → work full list in order). Triggered by: Feb 12-13 review sessions where the pattern became clear.
5. **Reference docs added** — Linked compile.md, deliver.md, swarm-start.md prompts. Triggered by: claude-skills pattern mining (Feb 13) — reference docs per skill reduces lookup time.

### Skills checked, no changes needed:
- skill-evolution (new, no execution data yet)
- skill-audit (no recent failures)
