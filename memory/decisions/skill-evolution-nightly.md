# Skills evolve from execution feedback nightly
**Date:** 2026-02-16
**Context:** SkillRL paper + our own observation that lessons-learned.md was growing but never feeding back into skills. Skills were write-once.
**Decision:** Built skill-evolution system. Runs nightly at 11pm (after compound review). Reads recent execution patterns, matches to skills, applies updates, logs everything.
**Rationale:** Skills that don't improve from execution are just documentation. The compound review already extracts patterns — this closes the loop by feeding them back into the skill files.
