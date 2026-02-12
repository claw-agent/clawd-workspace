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

## File Locations

- `MEMORY.md` — Long-term patterns, preferences, accumulated wisdom
- `memory/YYYY-MM-DD.md` — Daily logs (flat structure)
- `memory/context/active.md` — Current focus, open items, hot context
