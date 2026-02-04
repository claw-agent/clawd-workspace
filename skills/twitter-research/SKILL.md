# Twitter Research + Morning Report Skill

**Version 3.1** — Scout Delta added, bookmark catalog system

⚠️ **Read LOCKED.md first** — Contains immutable rules that override everything here.

---

## Overview

Autonomous overnight research pipeline that:
1. Analyzes NEW Twitter bookmarks only (via persistent catalog)
2. Discovers interesting posts from the "For You" timeline
3. Scans GitHub trending repos
4. Gathers news/trends from key sources
5. Compiles everything into a morning brief
6. Delivers via Telegram at 7am MST

---

## Architecture: 4-Scout System

```
┌─────────────────────────────────────────────────────────────────┐
│                    ORCHESTRATOR (11pm)                          │
│               Spawns scouts, monitors progress                   │
└─────────────────────────────────────────────────────────────────┘
                                │
        ┌───────────┬───────────┼───────────┬───────────┐
        ▼           ▼           ▼           ▼           ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│SCOUT ALPHA  │ │ SCOUT BETA  │ │SCOUT GAMMA  │ │SCOUT DELTA  │
│ Bookmarks   │ │  GitHub     │ │   News      │ │  Timeline   │
│ (NEW only)  │ │  Trending   │ │ HN, Reddit  │ │  For You    │
└─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘
        │               │               │               │
        └───────────────┴───────────────┴───────────────┘
                                │
                    ┌───────────────────┐
                    │   SYNTHESIZER     │
                    │   6am compile     │
                    └───────────────────┘
                                │
                    ┌───────────────────┐
                    │   DELIVERER       │
                    │   7am send        │
                    └───────────────────┘
```

---

## Key Files

| File | Purpose |
|------|---------|
| `LOCKED.md` | Immutable rules |
| `SKILL.md` | This file — overview |
| `prompts/swarm-start.md` | 11pm orchestrator instructions |
| `prompts/scout-alpha.md` | Bookmark analysis protocol |
| `prompts/scout-beta.md` | GitHub trending protocol |
| `prompts/scout-gamma.md` | News gathering protocol |
| `prompts/scout-delta.md` | Timeline discovery protocol |
| `prompts/compile.md` | 6am compilation instructions |
| `prompts/deliver.md` | 7am delivery instructions |

---

## State Files

| File | Purpose |
|------|---------|
| `~/clawd/state/bookmarks-catalog.json` | Persistent catalog of ALL bookmarks seen |
| `~/clawd/memory/twitter-research-state.json` | Delivery status and last run info |

---

## Twitter Access (bird CLI)

### Why bird?
- Direct API access via Safari cookies
- Full JSON output with all metadata
- No scrolling/browser automation needed
- Gets media URLs, threads, quoted tweets, engagement metrics

### Commands
```bash
# Fetch ALL bookmarks (primary method)
bird bookmarks --all --json > /tmp/bookmarks.json

# Fetch with count limit
bird bookmarks --count 20 --json

# Read a specific tweet or thread
bird read {tweet_id_or_url} --json

# Search tweets
bird search "query" --json

# Post a tweet
bird tweet "text"

# Reply to a tweet
bird reply {tweet_id} "text"
```

### Setup
- **Auth:** Safari cookies (Full Disk Access required for Terminal)
- **Config:** `~/.config/bird/config.json5`
- **Account:** Marb's main X account (logged in via Safari)

---

## Cron Jobs

| Job | Schedule | Purpose |
|-----|----------|---------|
| `overnight-research-swarm` | 11pm MST | Launch scouts |
| `morning-report-compile` | 6am MST | Synthesize report |
| `morning-report-deliver` | 7am MST | Send to Telegram |

---

## Output Folders

```
~/clawd/research/
├── bookmarks/YYYY-MM-DD/     # Scout Alpha output
│   ├── {tweet_id}.md         # Individual analyses
│   └── scout-alpha-summary.json
├── timeline/YYYY-MM-DD/      # Scout Delta output
│   ├── captures.json
│   ├── findings.md
│   └── scout-delta-summary.json
├── github/YYYY-MM-DD/        # Scout Beta output
│   ├── trending.md
│   └── scout-beta-summary.json
└── news/YYYY-MM-DD/          # Scout Gamma output
    ├── digest.md
    └── scout-gamma-summary.json

~/clawd/reports/
└── morning-YYYY-MM-DD/
    ├── morning-report.typ
    ├── morning-report.pdf
    ├── voice-script.txt
    └── morning-brief.wav
```

---

## Rate Limiting Protection

- Max 4 concurrent sub-agents
- 5-second delay between scout spawns
- Fallback only to Anthropic models (no Ollama in fallback chain)
- 30-minute timeout per deep dive

---

## Bookmark Catalog System

The catalog at `~/clawd/state/bookmarks-catalog.json` tracks:
- Every bookmark ever seen
- When it was first seen
- Whether it's been analyzed
- Which report it appeared in

**This prevents re-analyzing old bookmarks.** Only NEW bookmarks get reported.

---

## Changelog

### v3.1 (2026-01-28)
- Added Scout Delta for "For You" timeline discovery
- Implemented persistent bookmark catalog
- Changed bookmark report to chronological (not categorized)
- Added two-table format: List + Implications
- Fixed Typst sanitization rules
- Reduced max concurrent agents to 4
