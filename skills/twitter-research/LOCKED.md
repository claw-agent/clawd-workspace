# LOCKED.md — Permanent Guidelines

**⚠️ DO NOT MODIFY THIS FILE ⚠️**

These are immutable rules for the morning report pipeline. They survive all updates.

---

## Core Principles

### 1. State Is Sacred
- NEVER re-analyze already-processed bookmarks
- Always check `~/clawd/state/bookmarks-catalog.json` BEFORE analyzing
- Update catalog AFTER successful analysis, not before
- If catalog is corrupted, reconstruct from research files

### 2. No Hallucinated Content
- Only report what was actually found
- If a source couldn't be fetched, say so
- Never invent quotes, stats, or insights
- "Couldn't access" > made-up summary

### 3. Timeliness Over Perfection
- Report MUST deliver by 7am MST, no excuses
- If research incomplete, deliver what's ready + note gaps
- One compiled report beats ten unfinished deep dives
- Start compilation at 6am sharp

### 4. Marb's Time Is Valuable
- Lead with actionable items
- Top 5 highlights first, always
- Skip fluff, get to the point
- Voice brief for commute ≤ 3 minutes

### 5. New Bookmarks Only
- The catalog tracks ALL bookmarks ever seen
- Only analyze and report NEW bookmarks
- "New" = not in catalog OR not analyzed
- This prevents re-reporting the same content daily

---

## Report Structure (Non-Negotiable)

```
1. TL;DR — 3 bullets max, actionable
2. 🔥 TOP 5 HIGHLIGHTS — Best items across all sources
3. 📚 NEW BOOKMARKS — Two tables:
   - Table 1: List (Author, Tweet, Content Type, Summary)
   - Table 2: Implications (What it means, Analysis, Actions)
   - NOT categorized — show in chronological order
   - Followed by: Highlights, Cool Stuff, Less Useful
4. 📡 TIMELINE DISCOVERIES — From the For You feed
5. 🔧 GITHUB TRENDING — Repos worth watching
6. 📰 NEWS & TRENDS — Industry updates
7. ⚡ ACTION ITEMS — Consolidated from all sources
```

---

## Importance Scale (1-5)
- **5** = Drop everything, this changes plans
- **4** = High priority, act this week
- **3** = Worth doing, queue it up
- **2** = Interesting, save for later
- **1** = FYI only, low priority

---

## Typst Sanitization Rules

**Before writing to .typ file:**
- Escape `#` in content as `\#`
- Escape `*` in content as `\*`
- Escape `@` in content as `\@`
- Replace `[*#*]` patterns with `[No.]`
- Never use `[*#*]` for table headers — use `[No.]` instead
- Ensure all brackets `[]` are balanced
- Test compile before delivery

---

## Scout Roster

| Scout | Source | Output |
|-------|--------|--------|
| Alpha | X Bookmarks | NEW bookmarks only |
| Beta | GitHub Trending | Relevant repos |
| Gamma | News (HN, Reddit) | Industry news |
| Delta | X "For You" Timeline | Discovered posts |

---

## Scheduling Rules

### Swarm Phase (11pm - 5:30am)
- Max 4 concurrent agents (prevents rate limiting)
- 5-second delay between spawning scouts
- Each scout writes to its own folder
- Timeout: 30 minutes per deep dive max

### Compile Phase (6am)
- Gather all research from overnight
- Sanitize content for Typst
- Generate PDF + voice brief

### Delivery Phase (7am Sharp)
- Send via Telegram to 8130509493
- Attach PDF + voice brief
- Include quick summary in message
- Update state after delivery

---

## Interest Profile (For All Scouts)

### Include
- AI, LLM, agents, automation
- Claude/Anthropic ecosystem
- MCP, tool use, function calling
- Web development (Next.js, React, Vercel)
- Indie hacking, solo dev
- Business insights, alpha
- Developer tools, CLI utilities
- Privacy & security

### Exclude
- Pure promotional content
- Engagement bait
- Political hot takes
- Crypto pump/dump
- Celebrity drama

---

## Error Handling

### If Twitter Is Inaccessible
1. Log the error
2. Continue with other scouts
3. Note "Twitter unavailable" in report
4. Do NOT skip the entire report

### If Scout Fails
1. Capture partial work
2. Mark as "incomplete" not "done"
3. Include what was found
4. Other scouts continue

### If Voice Generation Fails
1. Deliver report without voice
2. Note "Voice brief unavailable"
3. Include text version of brief

---

**Last Updated:** 2026-01-28
**Version:** 2.0 (Scout Delta added, bookmark catalog system)
**DO NOT EDIT — Create new rules in SKILL.md instead**
