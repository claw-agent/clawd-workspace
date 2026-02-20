# Lesson: Track Conversation Thread, Don't Redirect

**Date:** 2026-02-19
**What happened:** Marb said "meeting is done, let's do this" meaning Mitte research. I pivoted to report action items instead, losing the thread. Marb had to correct me.
**Root cause:** After compaction or context shift, defaulted to the "priority queue" in active.md rather than the actual conversation flow.
**Fix:** When user says "let's do this" or similar continuation phrases, look at the LAST topic discussed, not the priority queue. Stay on topic until user explicitly changes it.
**Impact:** Minor friction but erodes trust in continuity.
