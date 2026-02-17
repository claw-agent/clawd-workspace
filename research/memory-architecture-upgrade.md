# Memory Architecture Upgrade — Analysis & Plan

> Source: @koylanai thread (Feb 16, 2026) responding to @levelsio's OpenClaw memory question
> Saved: Feb 16, 2026

## Core Insight
Static boot injection + compaction = context amnesia. The fix is demand-driven context loading with structured memory tiers.

## Our Current Architecture
- MEMORY.md (mixed facts + episodic) — loaded every message
- memory/YYYY-MM-DD.md (daily notes) — last 2 days loaded
- memory/context/active.md (hot state scratchpad)
- memory/archive/ (searchable, not loaded)
- memory_search + memory_get (on-demand retrieval)
- Compound review cron (nightly promotion)
- WAL protocol (pre-compaction flush)

## What We're Missing
1. **Post-compaction browsing** — can't walk through flushed context, only search
2. **No manifest/audit** — don't log what context was loaded vs skipped per turn
3. **Static boot injection** — dumps everything regardless of task
4. **No structured promotion lifecycle** — daily → long-term is manual

## Implemented Changes (Feb 16)
- Split MEMORY.md into facts.md (atomic) + episodic.md (project state)
- MEMORY.md becomes lightweight index

## Future Changes (require OpenClaw core or significant work)
- Context manifest logging (what was loaded per turn)
- Demand-driven loading (only load relevant context per task)
- Structured promotion with retention policies
- Post-compaction structured recovery beyond active.md
