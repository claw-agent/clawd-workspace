# Lesson: Conversational Checkpointing Survives Compaction
**Date:** 2026-02-17
**Context:** Multi-part morning report review hit compaction mid-conversation

When processing sequential items (report reviews, forwarded messages), checkpoint to `active.md ## Active Conversation` every 2-3 items with decisions made. This way if session compacts, next continuation reads active.md and picks up without re-asking.

**Key insight:** WAL protocol already handles single tasks. Checkpointing extends it to multi-turn conversational threads.
