# SESSION-STATE.md — Active Working Memory

*Last updated: 2026-02-04 ~10:50am*

## Current Status
**Mode:** System cleanup complete, back to normal ops

## Cleanup Completed (Feb 4)

### Config Fixed
- web_search: disabled (never had API key)
- contextTokens: 120000
- softTrimRatio: 0.3, hardClearRatio: 0.5
- reserveTokensFloor: 24000
- memoryFlush softThreshold: 80000

### Deleted (8 cron jobs)
- codex-vs-opus-reminder
- reminder-asset-gen-review
- reminder-chatgpt-ads-review
- reminder-exa-api-key
- reminder-designer-view-yellow
- tts-prewarm
- daily-session-reset
- session-size-monitor

### Deleted (6 skills)
- exa-plus (no API key)
- apollo-enrichment (no API key)
- google-workspace-mcp (no OAuth)
- supermemory (no API key)
- last30days-lite (depended on web_search)
- deep-research (needed CRAFTED_API_KEY)

### Kept
- research-swarm = single research approach
- ki-speak.sh, troy-speak.sh (voice variants)
- remotion skills (review later)

## Active Cron Jobs (10)
- github-sentinel (every 4h)
- proactive-work-session (1am, 3am)
- overnight-research-swarm (2am)
- morning-report-compile (6am)
- morning-report-deliver (7am)
- system-health-audit (every 3 days)
- tool-update-check (Sunday 3am)
- weekly-maintenance (Sunday 4am)
- weekly-tech-digest (Sunday 9am)
- 30-day-trend-report (1st & 15th)

## XPERIENCE Roofing
**Meeting:** Thursday
**Brief:** `~/clawd/research/xperience/QUICK-BRIEF-2026-02-04.md`

## Key Lesson
Earlier config changes weren't saved because we used `config.get` (read) instead of `config.patch` (write). Always verify changes actually applied.

## Tools Reference (Verified Working)
- web_fetch (URL → markdown)
- browser tool (full automation)
- bird CLI (Twitter)
- sessions_spawn (subagents)
- research-swarm skill
