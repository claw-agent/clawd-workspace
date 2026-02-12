# Morning Report Skill

> Use when: Compiling or delivering the daily morning brief. Triggered by 6am compile cron or 7am deliver cron.
> Don't use when: Doing ad-hoc research, checking a single news item, or responding to a question about recent news.
> Inputs: Overnight research outputs from twitter-research skill scouts
> Outputs: PDF report + voice brief audio in ~/clawd/reports/morning-YYYY-MM-DD/

## Overview

The morning report is a two-phase automated workflow:
1. **Compile (6am)** — Gather overnight scout outputs, synthesize into a cohesive report
2. **Deliver (7am)** — Generate PDF + voice brief, send to Marb via Telegram

## Directory Structure

```
~/clawd/reports/morning-YYYY-MM-DD/
├── morning-report.typ          # Typst source
├── morning-report.pdf          # Compiled PDF
├── morning-brief.wav           # Voice brief audio
└── sources/                    # Raw scout outputs
```

## Phase 1: Compile

### Success Criteria
- All overnight scout outputs collected and deduplicated
- Top stories ranked by relevance to Marb's interests
- Sections: Twitter Bookmarks, Timeline, GitHub, General News
- Each item has: title, 1-2 sentence summary, source URL, relevance tag
- Report is 2-4 pages, not a wall of text

### Process
1. Read scout outputs from overnight research
2. Deduplicate across sources
3. Rank by relevance (AI/agents, business, tech Marb follows)
4. Write Typst report: `~/clawd/reports/morning-YYYY-MM-DD/morning-report.typ`
5. Compile: `typst compile morning-report.typ morning-report.pdf`

## Phase 2: Deliver

### Success Criteria
- PDF generated and readable
- Delivered to Marb via Telegram by 7am MST
- Text summary with top 5 highlights in the message

### Process
1. Compile PDF from Typst source
2. Write a concise text summary (top 5 items, 2-3 lines each)
3. Send PDF + text summary via Telegram

**No voice brief.** TTS was unreliable and more frustrating than useful. Killed Feb 12, 2026.

## Common Failures
- **Scout outputs missing** — Note which scouts failed, compile what's available
- **Typst compile errors** — Usually unclosed brackets or bad Unicode. Check source.

## Cron Schedule
- `0 6 * * *` — Compile phase
- `0 7 * * *` — Deliver phase
