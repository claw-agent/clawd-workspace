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

## 2026-02-17 — Evolution Pass #3 (Automated, 11pm)

### morning-report — 1 update applied
- **Added cross-referencing step to compile phase** — When multiple scouts report the same story, merge into one richer item instead of listing duplicates. Check for contradictions. Triggered by: lesson `compile-must-cross-reference` (Feb 17) — report quality improves when sources are merged, not just concatenated.

### research-swarm — 1 update applied
- **Added Common Failures section with web_fetch 404 handling** — Agents should skip dead URLs after first failure, never retry. Triggered by: Feb 17 main session hit 89 web_fetch errors from stale GitHub links in cached research. Pattern: dead links accumulate in research files and get re-fetched every session.

### ai-compound — 1 update applied
- **Added checkpointing verification guideline** — Compound review should verify `active.md` checkpointing was maintained during heavy-compaction days. Triggered by: Feb 17 had 17 compactions but continuity was preserved because conversational checkpointing was active. Worth verifying this is happening.

### Skills checked, no changes needed:
- proactive-agent (updated last pass, working well)
- continuous-learning (updated last pass, no new patterns)
- twitter-research (overnight swarms running clean, 53 items captured)
- skill-evolution (meta — no issues)

## 2026-02-18 — Evolution Pass #4 (Automated, 11pm)

### morning-report — 1 update applied
- **Added Quality Rules section** — Codified 5 specific rules from Feb 18 quality audit: dedup via `delivered-items.json` across days, GitHub repos capped at 3, text summary ~300 words (down from ~500), action items split by ownership (🔴 decisions vs 🟢 Claw handles), bookmarks one-line each. Triggered by: Feb 18 proactive audit found Chrome DevTools MCP in 4/5 reports, GitHub items ignored, action items were wishlists.

### twitter-research — 1 update applied
- **Added Error Handling section for web_fetch 404s** — Documented that 80-90 404s per run is expected noise from GitHub URLs in tweets. Don't retry, don't log as failures, don't let them inflate context. Triggered by: Feb 17-18 main session had 89-90 web_fetch errors inflating session to 12.7MB/4125 lines with 290 compactions.

### ai-compound — 1 update applied
- **Added Session Health Monitoring section** — Threshold of >3000 lines or >10MB flags for rotation. Investigate if compaction count >50/day. Triggered by: Feb 18 main session hit 4125 lines/12.7MB with 290 compactions — needed a concrete threshold to catch this earlier.

### Skills checked, no changes needed:
- proactive-agent (stable, no new patterns)
- continuous-learning (stable)
- skill-evolution (meta — no issues)
- research-swarm (404 handling added last pass, twitter-research now also has it)
