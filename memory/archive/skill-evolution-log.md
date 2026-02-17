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

## 2026-02-16 — Evolution Pass #2 (Automated, 11pm)

### proactive-agent — 1 update applied
- **Added "Verify Before Declaring Done" smoke test pattern** to self-healing section. Triggered by: Feb 16 XPERIENCE smoke test caught 3 broken paths (wrong filenames, wrong dirs, missing deps) in systems that had been "done" for days. Pattern: always run a smoke test for systems with >3 components.

### continuous-learning — 1 update applied
- **Added "Skill Authoring Guidelines" section** with 150-200 line target, WHY-not-WHAT principle, concise examples preference. Triggered by: Feb 14 Claude Code 101 review insight ("keep instructions under 150-200 lines, add WHY not WHAT").

### Skills checked, no changes needed:
- morning-report (already updated earlier today with PDF delivery fix + media dir copy)
- research-swarm (53-item overnight runs clean, no issues)
- mlx-whisper (working reliably for voice memo transcription)
- skill-evolution (meta — this skill itself, no issues)
