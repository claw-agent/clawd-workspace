# Weekly Twitter Insights System

**Created:** 2026-02-02
**Purpose:** Synthesize weekly Twitter bookmarks into actionable intelligence

## Overview

This system aggregates bookmarks from the past week and produces a themed insights report highlighting:
- Trending topics and keywords
- Top voices/authors being bookmarked
- Insights organized by theme (AI Agents, Tools, Security, etc.)
- Key takeaways and recommended actions

## Components

### Script
`~/clawd/scripts/weekly-twitter-synthesis.py`

```bash
# Generate this week's report
python3 ~/clawd/scripts/weekly-twitter-synthesis.py

# Custom date range (e.g., last 14 days)
python3 ~/clawd/scripts/weekly-twitter-synthesis.py --days 14

# Custom output path
python3 ~/clawd/scripts/weekly-twitter-synthesis.py -o ~/clawd/reports/custom-report.md
```

### Typst Template
`~/clawd/templates/weekly-insights.typ`

For PDF generation (manual variable replacement or integrate with script).

### Data Source
`~/clawd/state/bookmarks-catalog.json`

This is the persistent catalog of all bookmarks with analysis metadata.

## Themes

The system categorizes bookmarks into these themes:
- 🤖 AI Agents
- 🧠 LLM Engineering  
- 🔒 Security
- 🛠️ Tools & Frameworks
- 💡 Techniques
- 📊 Data & Research
- 💼 Business & Strategy
- 🎯 Productivity
- 📌 Other

## Schedule

**Intended:** Sundays at 10am MST

**Cron job (to add):**
```
schedule: "0 10 * * 0" (10am every Sunday)
```

## Known Issues

1. **Data Quality:** Many bookmarks lack summaries (~33% have placeholder text)
   - Root cause: Scout analysis sometimes skips bookmarks
   - Fix: Improve scout retry logic or batch-analyze on-demand

2. **Twitter Auth:** Safari cookies expire periodically
   - Check: `bird bookmarks --count 1` to verify auth
   - Fix: Re-login to Twitter in Safari

## Sample Output

Reports are saved to: `~/clawd/reports/weekly-insights-YYYY-MM-DD.md`

Example: `~/clawd/reports/weekly-insights-2026-02-02.md`
