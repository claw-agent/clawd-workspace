# 3-tier memory architecture with demand-driven loading
**Date:** 2026-02-16
**Context:** @koylanai analysis + our own compaction pain. Boot injection was static — loading 2 days of notes + full MEMORY.md regardless of task relevance.
**Decision:** Split into facts (atomic, rarely changes) + episodic (projects, evolves) + scratchpad (active.md). Only load active.md + index at boot, everything else on-demand via memory_search.
**Rationale:** Cuts boot token waste. Post-compaction recovery is deterministic via manifest.json instead of guessing.
