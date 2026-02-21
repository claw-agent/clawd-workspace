# Lesson: Monitor Session File Size Proactively

**Date:** 2026-02-20
**What happened:** Main interactive session grew to 13.6MB over ~11 days without rotation.
**Impact:** Large sessions cause slow compaction, context thrashing, and potential dual-response bugs.
**Fix:** Rotate with `/new` when session exceeds ~5MB. The weekly maintenance cron checks but threshold was 20MB (too high).
**Prevention:** Lower weekly maintenance alert threshold to 8MB. Consider auto-suggesting `/new` in compound review when main session > 5MB.
