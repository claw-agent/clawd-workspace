# Browser automation must be subagent-only
**Date:** 2026-02-12
**Context:** Chrome DevTools CDP loops in main session caused context overflow — 10+ rapid exec calls with huge error outputs blew past both softThreshold and hardLimit.
**Decision:** All browser automation runs in spawned subagents, never in main session.
**Rationale:** CDP loops burn context fast and unpredictably. A subagent crashing is cheap; main session crashing loses the whole conversation.
