# Morning Report Pipeline Specification

**Version:** 2.0  
**Last Updated:** 2026-01-26  
**Owner:** Claw (autonomous maintenance)

---

## Executive Summary

The Morning Report Pipeline is an autonomous overnight research system that:
1. Monitors Twitter bookmarks for new content
2. Scans GitHub for trending repositories
3. Gathers news from Hacker News, Reddit, and dev blogs
4. Performs deep analysis on high-value items
5. Synthesizes findings into a unified morning brief
6. Delivers via Telegram at 7am MST with PDF + voice

**Goal:** Marb wakes up to a personalized intelligence brief covering overnight developments in AI, agents, automation, and web development.

---

## System Architecture

### High-Level Flow
```
                    ┌─────────────────────────────────────────┐
                    │              CRON TRIGGER               │
                    │              11:00 PM MST               │
                    └─────────────────────────────────────────┘
                                        │
                                        ▼
                    ┌─────────────────────────────────────────┐
                    │           ORCHESTRATOR AGENT            │
                    │    Manages entire overnight pipeline    │
                    └─────────────────────────────────────────┘
                                        │
            ┌───────────────────────────┼───────────────────────────┐
            ▼                           ▼                           ▼
    ┌───────────────┐           ┌───────────────┐           ┌───────────────┐
    │ SCOUT: Twitter│           │ SCOUT: GitHub │           │ SCOUT: News   │
    │   Bookmarks   │           │   Trending    │           │   HN/Reddit   │
    │   (11:00 PM)  │           │   (11:30 PM)  │           │   (12:00 AM)  │
    └───────────────┘           └───────────────┘           └───────────────┘
            │                           │                           │
            ▼                           ▼                           ▼
    ┌───────────────┐           ┌───────────────┐           ┌───────────────┐
    │  DEEP DIVERS  │           │ REPO ANALYZER │           │ NEWS DIGEST   │
    │ (per bookmark)│           │  (top repos)  │           │  (synthesis)  │
    │  (11PM-5AM)   │           │   (1-3 AM)    │           │   (1-2 AM)    │
    └───────────────┘           └───────────────┘           └───────────────┘
            │                           │                           │
            └───────────────────────────┼───────────────────────────┘
                                        ▼
                    ┌─────────────────────────────────────────┐
                    │           SYNTHESIZER AGENT             │
                    │         Compile & Format Report         │
                    │              6:00 AM MST                │
                    └─────────────────────────────────────────┘
                                        │
                                        ▼
                    ┌─────────────────────────────────────────┐
                    │           DELIVERER AGENT               │
                    │      Send via Telegram + Attachments    │
                    │              7:00 AM MST                │
                    └─────────────────────────────────────────┘
```

### Components

| Component | Schedule | Duration | Purpose |
|-----------|----------|----------|---------|
| Orchestrator | 11:00 PM | 8 hours | Spawn scouts, monitor progress |
| Scout: Twitter | 11:00 PM | 30 min | Identify new bookmarks |
| Scout: GitHub | 11:30 PM | 30 min | Scan trending repos |
| Scout: News | 12:00 AM | 30 min | Gather HN/Reddit items |
| Deep Divers | 11:30 PM - 5:00 AM | Variable | Analyze individual items |
| Synthesizer | 6:00 AM | 45 min | Compile report |
| Deliverer | 7:00 AM | 15 min | Send to Telegram |

---

## Data Sources

### Twitter/X Bookmarks
- **URL:** x.com/i/bookmarks
- **Access:** Browser automation (profile=clawd)
- **Frequency:** Daily at 11pm
- **Deduplication:** State file tracks analyzed tweet IDs

### GitHub Trending
- **URLs:**
  - github.com/trending (all languages)
  - github.com/trending/python
  - github.com/trending/typescript
  - github.com/trending/javascript
  - github.com/trending/rust
- **Access:** web_fetch (no auth needed for public)
- **Frequency:** Daily at 11:30pm

### Hacker News
- **URL:** news.ycombinator.com
- **API:** https://hacker-news.firebaseio.com/v0/topstories.json
- **Items:** Top 30 stories
- **Filter:** By Marb's interest keywords

### Reddit
- **Subreddits:**
  - /r/MachineLearning
  - /r/LocalLLaMA
  - /r/webdev
  - /r/SideProject
- **Access:** web_fetch (old.reddit.com for simpler parsing)
- **Items:** Hot posts from each

---

## Interest Profile

Marb's interests (used for filtering and relevance scoring):

### High Priority
- AI agents & automation
- Claude/Anthropic ecosystem
- LLM tooling (MCP, function calling)
- Web development (Next.js, React, Vercel)
- Indie hacking / solo dev

### Medium Priority
- Lead generation tech
- DevOps & infrastructure
- Python/TypeScript tooling
- Open source projects

### Low Priority
- General tech news
- Industry announcements
- Tutorial content

### Exclude
- Promotional/marketing content
- Listicles ("10 ways to...")
- Paywalled content without substance
- Duplicate stories across sources

---

## Categorization System

| Category | Emoji | Description | Action Expected |
|----------|-------|-------------|-----------------|
| IMPLEMENT | 📦 | Code/tool to build or integrate | This week |
| REFINE | 🔧 | Improvement to existing work | When relevant |
| RESOURCE | 📚 | Learning material | When time allows |
| TRENDING | 🔥 | Hot topic, awareness only | None required |
| NEWS | 📰 | Industry update | Stay informed |

---

## Importance Scale

| Rating | Meaning | Examples |
|--------|---------|----------|
| 5 | Drop everything | Major API change, security issue, game-changing tool |
| 4 | High priority | Useful new library, interesting technique |
| 3 | Worth doing | Good tutorial, minor improvement |
| 2 | Interesting | FYI, save for later |
| 1 | Low priority | Awareness only |

---

## Output Formats

### PDF Report
- **Tool:** Typst
- **Max length:** 4 pages
- **Sections:**
  1. TL;DR (3 bullets)
  2. Top 3 Highlights (expanded)
  3. Tweet Timeline (chronological)
  4. By Category (grouped)
  5. GitHub Trending (repos)
  6. News & Trends (digest)
  7. Action Items (TODO list)

### Voice Brief
- **Tool:** Qwen3-TTS with Claw voice
- **Duration:** 2-3 minutes
- **Tone:** Conversational briefing
- **Format:** WAV file

### Telegram Message
- **Inline:** Top 3 highlights + stats + action items
- **Attachments:** PDF + voice file
- **Format:** Markdown with emojis

---

## File Structure

```
~/clawd/
├── skills/twitter-research/
│   ├── SKILL.md              # Main workflow documentation
│   ├── LOCKED.md             # Immutable rules (DO NOT EDIT)
│   └── prompts/
│       ├── swarm-start.md    # 11pm orchestrator prompt
│       ├── compile.md        # 6am synthesis prompt
│       └── deliver.md        # 7am delivery prompt
│
├── memory/
│   └── twitter-research-state.json   # Tracks analyzed items
│
├── research/
│   ├── bookmarks/
│   │   └── {YYYY-MM-DD}/
│   │       ├── raw-bookmarks.json    # Scout output
│   │       ├── {tweet_id}.md         # Deep dive analysis
│   │       └── swarm-log.md          # Progress log
│   ├── github/
│   │   └── {YYYY-MM-DD}/
│   │       ├── trending.json         # Raw trending data
│   │       └── {repo-name}.md        # Repo analysis
│   └── news/
│       └── {YYYY-MM-DD}/
│           └── digest.json           # News items
│
└── reports/
    └── morning-{YYYY-MM-DD}/
        ├── morning-report.typ        # Typst source
        ├── morning-report.pdf        # Final PDF
        ├── morning-brief.wav         # Voice file
        └── voice-script.txt          # Voice transcript
```

---

## State Management

### State File: `memory/twitter-research-state.json`
```json
{
  "lastScan": "2026-01-26T06:00:00Z",
  "analyzedIds": [
    "1883123456789",
    "1883234567890"
  ],
  "analyzedUrls": [
    "https://x.com/user/status/1883123456789"
  ]
}
```

### Rules
- Check state BEFORE analyzing any item
- Update state AFTER successful completion
- Never re-analyze items in `analyzedIds`
- If state is corrupted, reconstruct from research files

---

## Cron Configuration

### Jobs
| Name | Schedule | Prompt File |
|------|----------|-------------|
| `overnight-research-swarm` | `0 23 * * *` | prompts/swarm-start.md |
| `morning-report-compile` | `0 6 * * *` | prompts/compile.md |
| `morning-report-deliver` | `0 7 * * *` | prompts/deliver.md |

### Setup Commands
```bash
# List current jobs
clawdbot cron list

# Remove old jobs
clawdbot cron rm twitter-bookmark-research
clawdbot cron rm twitter-morning-report

# Add new jobs (run from ~/clawd)
clawdbot cron add overnight-research-swarm \
  --schedule "0 23 * * *" \
  --agent main \
  --target isolated \
  --prompt "Read ~/clawd/skills/twitter-research/prompts/swarm-start.md and execute the overnight research swarm protocol."

clawdbot cron add morning-report-compile \
  --schedule "0 6 * * *" \
  --agent main \
  --target isolated \
  --prompt "Read ~/clawd/skills/twitter-research/prompts/compile.md and compile the morning report from overnight research."

clawdbot cron add morning-report-deliver \
  --schedule "0 7 * * *" \
  --agent main \
  --target isolated \
  --prompt "Read ~/clawd/skills/twitter-research/prompts/deliver.md and deliver the morning report to Marb via Telegram."
```

---

## Error Handling

### Twitter Inaccessible
1. Log error with timestamp
2. Continue with GitHub + News sources
3. Note "Twitter unavailable" in report
4. Retry on next cycle

### Research Agent Timeout
1. Capture partial work to file
2. Mark item as "incomplete" in swarm log
3. Include partial findings in report
4. Do NOT mark as analyzed in state

### Voice Generation Failure
1. Deliver report without voice
2. Include voice script as text attachment
3. Note "Voice unavailable" in message

### Delivery Failure
1. Retry 3 times with 60s delay
2. If still failing, save to `undelivered.md`
3. Alert on next heartbeat
4. Manual recovery needed

---

## Maintenance

### Weekly
- Review report quality
- Adjust interest keywords if needed
- Check for new sources to add

### Monthly
- Archive old research (>30 days)
- Review LOCKED.md rules
- Update Marb's interest profile

### On Failure
- Check `swarm-log.md` for errors
- Verify browser profile auth
- Test individual sources manually
- Review state file integrity

---

## Changelog

### v2.0 (2026-01-26)
- Added GitHub trending scan
- Added news/trends from HN, Reddit
- Added tweet-by-tweet chronological timeline
- Redesigned as persistent agent swarm
- Split into 3 cron jobs (swarm/compile/deliver)
- Created LOCKED.md for immutable rules
- Added comprehensive documentation

### v1.0 (2026-01-25)
- Initial Twitter bookmark research
- Basic PDF + voice generation
- Single cron job workflow
