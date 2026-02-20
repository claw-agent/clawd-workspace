# ai-compound

## When to Use
- 10:30 PM nightly review (automated via cron)
- Manual end-of-day wrap-up after significant work
- Extracting patterns and lessons from a productive session

## When NOT to Use
- Mid-day during active work (wait for evening)
- Quick task sessions with nothing to extract
- Already ran compound review today

Nightly compound review — extract learnings from the day and update long-term memory.

Based on LXGIC Studios skill: github.com/lxgicstudios/ai-compound

## When to Run
- 10:30 PM daily via launchd
- Or manually when wrapping up significant work

## The Prompt

```
Review the last 24 hours of work. Extract:

1) Patterns that worked - approaches to repeat
2) Gotchas encountered - things to avoid  
3) Preferences learned - user likes/dislikes
4) Key decisions and their reasoning
5) Open items - unfinished work
6) Behavior drift check — Did I defer work I should have done, or do work I should have asked about? Did I lose the conversation thread (e.g. jumping to priority queue after compaction instead of continuing the active topic)? If yes, log as drift in memory/lessons/.
7) Cron cost efficiency — Flag any cron jobs with disproportionate context loading for minimal output (e.g. loading full AGENTS.md + workspace context just to run a simple script). High context/output ratio = wasted tokens.
8) Subagent health scan — Scan ~/.openclaw/agents/main/sessions/ for the last 24h. Flag any subagent runs that: failed, produced empty output, or took unusually long. Note patterns (e.g. same task failing repeatedly).

Update MEMORY.md with significant long-term learnings.
Update memory/YYYY-MM-DD.md with today's details.
Update memory/context/active.md with current focus and open items.

Commit changes with message 'compound: daily review YYYY-MM-DD'
```

## Guidelines

- Keep daily logs concise (3-5 bullets per significant event)
- Don't over-extract — only genuinely significant learnings go to MEMORY.md
- Open items should be actionable, not vague
- Git commit is important for history
- **Verify checkpointing survived** — If the day had multiple compactions, confirm `active.md ## Active Conversation` was kept current. Flag if checkpointing lapsed during heavy sessions (Feb 17: 17 compactions, checkpointing saved continuity).

## Session Health Monitoring
- Check main session size: `wc -l ~/.openclaw/agents/main/sessions/main.jsonl`
- **Threshold: >3000 lines or >10MB** → flag for session rotation consideration
- Feb 18: main session hit 4125 lines / 12.7MB with 290 compactions — mostly from web_fetch 404 noise in background ops
- If compaction count is unusually high (>50/day), investigate which cron sessions are contributing context bloat

## Conversation Thread Tracking
After compaction or context loss, the default behavior is to check `active.md` priority queue. But if Marb was mid-conversation on a topic, **stay on that topic** — don't redirect to the priority queue. Signs you lost the thread:
- User says "let's do this" / "back to that" / "continue" → they mean the LAST discussed topic
- Check `active.md ## Active Conversation` for what was actually being discussed
- Only pivot to new items when user explicitly says "what's next" or raises a new topic

## File Locations

- `MEMORY.md` — Long-term patterns, preferences, accumulated wisdom
- `memory/YYYY-MM-DD.md` — Daily logs (flat structure)
- `memory/context/active.md` — Current focus, open items, hot context
