# Morning Report Skill

> Use when: Compiling or delivering the daily morning brief. Triggered by 6am compile cron or 7am deliver cron.
> Don't use when: Doing ad-hoc research, checking a single news item, or responding to a question about recent news.
> Inputs: Overnight research outputs from twitter-research skill scouts
> Outputs: PDF report + text summary in ~/clawd/reports/morning-YYYY-MM-DD/

## Overview

The morning report is a two-phase automated workflow:
1. **Compile (6am)** — Gather overnight scout outputs, synthesize into a cohesive report
2. **Deliver (7am)** — Generate PDF, send to Marb via Telegram

## Directory Structure

```
~/clawd/reports/morning-YYYY-MM-DD/
├── morning-report.typ          # Typst source
├── morning-report.pdf          # Compiled PDF
├── text-summary.txt            # Standalone text summary
├── delivery-log.txt            # Delivery status log
└── sources/                    # Raw scout outputs (optional)
```

## Phase 1: Compile

### Success Criteria
- All overnight scout outputs collected and deduplicated
- Top stories ranked by relevance to Marb's interests
- Sections: Twitter Bookmarks, Timeline, GitHub, General News
- Each item has: title, 1-2 sentence summary, source URL, relevance tag
- Report is 2-4 pages, not a wall of text
- Typst content sanitized — no raw Unicode that breaks compilation

### Quality Rules (from Feb 18 audit)
- **Dedup across days** — Check `~/clawd/reports/delivered-items.json` before including any item. If it appeared in the last 3 reports, skip it unless there's a meaningful update. Update the tracker after compile.
- **GitHub repos: max 3** — Marb acts on 1-2 per day. Show only the most relevant, not every trending repo.
- **Text summary: ~300 words** — Previous reports were ~500 words. Shorter = actually read.
- **Action items: split by ownership** — 🔴 Decisions (needs Marb) vs 🟢 I'll handle it (Claw takes action). No wishlists.
- **Bookmarks: one line each** — Don't over-analyze. Title + one sentence + URL.

### Process
1. Read scout outputs from overnight research
2. Deduplicate across sources AND across recent reports (check `delivered-items.json`)
3. **Cross-reference across scout outputs** — If multiple scouts mention the same story, merge into one richer item rather than listing separately. Check for contradictions between sources and flag them.
4. Rank by relevance (AI/agents, business, tech Marb follows)
4. Write Typst report: `~/clawd/reports/morning-YYYY-MM-DD/morning-report.typ`
5. **Sanitize Typst content** — escape or remove special characters that break compilation
6. Compile: `typst compile morning-report.typ morning-report.pdf`
7. **Verify PDF exists and is >0 bytes** before marking compile as successful
8. Write `text-summary.txt` as standalone file (used by deliver phase)

## Phase 2: Deliver

### Success Criteria
- PDF generated and readable
- Delivered to Marb via Telegram by 7am MST
- Text summary with top 5 highlights in the message

### Process
1. Verify PDF exists at `~/clawd/reports/morning-YYYY-MM-DD/morning-report.pdf`
2. Read `text-summary.txt` for the message body
3. **Copy PDF to allowed media directory before sending:**
   ```bash
   cp ~/clawd/reports/morning-$DATE/morning-report.pdf ~/.openclaw/media/morning-report-$DATE.pdf
   ```
4. Send text summary first, then PDF via `~/.openclaw/media/` path
5. Target: Telegram chat 8130509493
6. Log results to `delivery-log.txt`

**⚠️ CRITICAL:** OpenClaw only allows sending files from `~/.openclaw/media/`. Sending directly from `~/clawd/reports/` WILL fail with "not under an allowed directory." This broke delivery on Feb 16, 2026.

**No voice brief.** TTS was retired Feb 12, 2026. PDF + text only.

## Review Protocol
Marb reviews reports via voice notes in chat, NOT by reading the PDF alone. The review flow:
1. Marb sends voice notes with reactions/questions about report items
2. Claw transcribes with mlx_whisper and works through items in chat
3. Action items get researched via subagents
4. Work through the FULL list in order — don't cherry-pick priorities

## Common Failures
- **Scout outputs missing** — Note which scouts failed, compile what's available
- **Typst compile errors** — Usually unclosed brackets or bad Unicode. Sanitize source before compiling.
- **PDF delivery fails** — Must copy to `~/.openclaw/media/` first. Never send from `~/clawd/reports/` directly.
- **Redundant content** — If an item was covered in a previous day's report, don't repeat it unless there's a meaningful update. The weekly tech digest was killed for this reason.
- **Subagent research dumps too much context** — When spawning follow-up research from report reviews, write results to files, summarize in chat. Don't dump full research into main session.

## Cron Schedule
- `0 6 * * *` — Compile phase (morning-report-compile)
- `0 7 * * *` — Deliver phase (morning-report-deliver)

## References
- Compile prompt: `~/clawd/skills/twitter-research/prompts/compile.md`
- Deliver prompt: `~/clawd/skills/twitter-research/prompts/deliver.md`
- Scout swarm: `~/clawd/skills/twitter-research/prompts/swarm-start.md`
