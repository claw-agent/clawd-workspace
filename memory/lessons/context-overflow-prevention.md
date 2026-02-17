# Context overflow prevention
**Date:** 2026-02-12
**Lesson:** Heavy browser automation loops (10+ rapid exec calls with huge outputs) can blow past both softThreshold and hardLimit in one burst.
**Fix:** Lower softThresholdTokens (80K), truncate all browser output, stop after 3 failures, use subagents for browser work.
**Applied to:** AGENTS.md context management rules, browser-automation-subagent-only decision.
