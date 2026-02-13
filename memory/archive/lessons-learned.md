# Lessons Learned Archive
*Searchable via memory_search — not loaded every message*

## Feb 2026

### Context Overflow Incident (Feb 12)
Heavy browser automation loop (Chrome DevTools setup — 10+ rapid exec calls with huge error outputs) blew past both softThreshold and hardLimit in one burst. All 3 models hit rate limit cooldown. Required gateway restart.
- **Fix:** Lowered softThresholdTokens from 108K → 80K (44% instead of 60%)
- **Fix:** Browser automation output MUST be truncated, stop after 3 failures
- **Fix:** Heavy automation should be spawned as subagent, not done inline

### Context Config Golden Numbers (Updated Feb 12)
- contextTokens: 180K (paste token auth has 200K hard limit — NOT 1M!)
- softThresholdTokens: 80K (fires compaction at ~44%)
- reserveTokensFloor: 30K
- System files ~48K chars = ~15K tokens overhead per message. KEEP THEM SMALL.
- 1M token context is beta-only (tier 4 API, premium pricing)
- Don't set contextTokens above 180K with paste token auth.

### System Prompt Bloat Root Cause (Feb 12)
MEMORY.md grew to 17K chars. All workspace files injected every message = ~48K chars = ~15K tokens constant overhead. Solution: keep MEMORY.md under 5K chars, archive details to searchable files.

### Chinese Platform Auth (Feb 11)
Chinese platforms (Jimeng/Douyin) use QR-code-only login via native app. For Chinese-market tools, use international version or accept native app requirement.

### Research-First Builds (Feb 10)
Writing a design language spec BEFORE building produced dramatically better output. Pattern: research → spec → build → integrate.

### Template vs Pipeline (Feb 10)
Building standalone template useless if pipeline uses different one. Always check what pipeline consumes before building replacements.

### Git Hygiene (Feb 9)
Always set up .gitignore BEFORE first commit.

### Kling AI Prompt Craft (Feb 8-9)
- Simplified prompts > overloaded (less = better faces)
- "Shot on 35mm film" for photorealism
- Avoid "small/delicate/petite" — ages down
- Kling doesn't know book characters — describe from scratch

### sessions_spawn > Ralph Loops (Feb 7)
sessions_spawn works better than Claude Code CLI. Already authenticated, can orchestrate between iterations.

### Subagent Reliability (Feb 4)
Don't rely on spawned agents for time-sensitive work. Use for background/overnight, not urgent deliverables.

### Simplification > Complexity (Feb 4)
Files are truth, sessions are ephemeral. No elaborate state machines.

### Cron Job Delivery (Feb 7)
Cron jobs with `delivery.mode: "announce"` need explicit `delivery.to: "<chat_id>"` or Telegram fails silently.

### Google Solar API (Feb 4-5)
`buildingInsights` endpoint returns roof area, pitch, segments. First 10K/month FREE, then $0.01/request. 1000x cheaper than EagleView.
Validated: 8/8 SLC addresses worked.

### Hybrid DSM Roof Formula (Feb 5)
`overhang = 12" + (pitch × 1.5) + (footprint/1000)` — <3% accuracy vs EagleView. Script: `~/clawd/scripts/roof_measure_final.py`

## Jan 2026

### Memory System Configuration
memorySearch provider=local, sessionMemory=true. Low softThreshold triggers flush BEFORE sessions get massive.

### WAL Protocol
Chat = BUFFER. `memory/context/active.md` = RAM. Write BEFORE responding. Read active.md FIRST on recovery.

### Mac Mini Power Settings
`pmset sleep=0 displaysleep=0 autorestart=1 networkoversleep=1 powernap=0`

### Context Management
Never call massive-output tools without piping to `| head`. config.schema dumped 200KB once.
