# Lesson: Don't Pass Plaintext Credentials in Spawn Tasks

**Date:** 2026-02-19
**What happened:** Passed claw-agent@proton.me password directly in a sessions_spawn task string for Mitte signup.
**Root cause:** Quick-and-dirty spawn, didn't think about credential hygiene.
**Fix:** Reference `~/clawd/config/` credential files in spawn tasks. Subagents can read files — no need to embed passwords in task strings that get logged.
**Impact:** Credentials visible in session logs and transcripts.
