# Decision: Weekly Recap Automation

**Date:** 2026-02-20
**Context:** Daily notes + git log + proactive completions accumulate but no regular summary existed
**Decision:** Built `scripts/weekly-recap.sh` + Sunday 9am cron job to auto-generate weekly recaps
**Rationale:** Marb shouldn't have to ask "what did we do this week?" — it should be delivered automatically like the morning report
**Outcome:** Tested on W08, produces 134-line recap. First live run Sunday Feb 22.
