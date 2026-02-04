# Overnight Research Swarm — 11pm Start

You are the orchestrator for Marb's overnight research pipeline.

## Your Mission
Run parallel research across multiple sources and prepare everything for the 6am compile phase.

## Step 1: Read Guidelines
1. Read `~/clawd/skills/twitter-research/LOCKED.md` — these rules are absolute
2. Read `~/clawd/skills/twitter-research/SKILL.md` — the full workflow

## Step 2: Auth Pre-Check (NEW — Critical!)

Before launching any scouts, verify bird CLI authentication:

```bash
bird bookmarks --count 1 --json > /tmp/bird-auth-test.json 2>&1
```

**If auth fails:**
1. Log the error
2. Try refreshing (sometimes a simple retry works)
3. If still failing after 2 retries:
   - Skip Scout Alpha (bookmarks) and Scout Delta (timeline)
   - Still run Scout Beta (GitHub) and Scout Gamma (News)
   - Note auth failure in swarm-log.md

**If auth succeeds:** Continue normally.

## Step 3: Initialize Folders

```bash
DATE=$(date +%Y-%m-%d)
mkdir -p ~/clawd/research/bookmarks/$DATE
mkdir -p ~/clawd/research/github/$DATE
mkdir -p ~/clawd/research/news/$DATE
mkdir -p ~/clawd/research/timeline/$DATE
mkdir -p ~/clawd/reports/morning-$DATE
```

Load bookmark catalog: `~/clawd/state/bookmarks-catalog.json`

## Step 4: Launch Scouts (Parallel)

Launch scouts using `sessions_spawn`. Max 4 concurrent.

**Add 5-second delay between spawns** to avoid rate limits.

---

### Scout Alpha — Twitter Bookmarks (NEW ONLY)
```javascript
sessions_spawn({
  task: "Read ~/clawd/skills/twitter-research/prompts/scout-alpha.md and execute the bookmark analysis protocol.",
  label: "scout-alpha"
})
```
**Skip if:** bird auth failed

---

### Scout Beta — GitHub Trending
```javascript
sessions_spawn({
  task: "Read ~/clawd/skills/twitter-research/prompts/scout-beta.md and execute the GitHub trending analysis.",
  label: "scout-beta"
})
```
**Always run** — doesn't depend on bird

---

### Scout Gamma — News/Trends
```javascript
sessions_spawn({
  task: "Read ~/clawd/skills/twitter-research/prompts/scout-gamma.md and execute the news gathering protocol.",
  label: "scout-gamma"
})
```
**Always run** — doesn't depend on bird

---

### Scout Delta — X "For You" Timeline
```javascript
sessions_spawn({
  task: "Read ~/clawd/skills/twitter-research/prompts/scout-delta.md and execute the timeline discovery protocol.",
  label: "scout-delta"
})
```
**Skip if:** bird auth failed

---

## Step 5: Monitor Progress

- Check subagent status every 10-15 minutes
- Log progress to `research/bookmarks/$DATE/swarm-log.md`:
  ```markdown
  ## Swarm Log - YYYY-MM-DD
  
  ### 11:00pm - Start
  - Auth check: PASS/FAIL
  - Scouts launched: Alpha, Beta, Gamma, Delta
  
  ### 11:15pm - Check 1
  - Alpha: running/complete/failed
  - Beta: running/complete/failed
  ...
  ```
- Note any failures or incomplete items

## Step 6: Handle Failures

If a scout fails:
1. Log the failure reason
2. Other scouts should continue
3. Don't retry failed scouts (avoid duplicate work)
4. Note in summary which scouts completed

## Step 7: Handoff

By 5:30am, all research should be complete.

Write completion status to `research/bookmarks/$DATE/swarm-complete.json`:

```json
{
  "date": "YYYY-MM-DD",
  "status": "complete" | "partial" | "failed",
  "authStatus": "pass" | "fail",
  "scouts": {
    "alpha": {"status": "complete", "items": 15},
    "beta": {"status": "complete", "items": 8},
    "gamma": {"status": "complete", "items": 12},
    "delta": {"status": "skipped", "reason": "auth_failed"}
  },
  "totalItems": 35,
  "errors": []
}
```

## Important Rules
- Max 4 concurrent sub-agents
- 5-second delay between spawning
- Auth failure = skip Twitter scouts, run others
- Deep analysis > shallow coverage
- If one scout fails, others continue

## On Completion

Reply with summary:
- Auth status
- Scout completion status (which ran, which skipped/failed)
- Total items: bookmarks, timeline posts, repos, news
- Any errors or notes for compile phase
