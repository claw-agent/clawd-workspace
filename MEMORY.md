# MEMORY.md — Index
*Memory is split into tiers. Search with memory_search, read with memory_get.*

## Memory Tiers
- **Facts** → `memory/facts.md` — accounts, rules, tool decisions, infra (rarely changes)
- **Episodic** → `memory/episodic.md` — projects, pipeline state, pending work (evolves)
- **Scratchpad** → `memory/context/active.md` — current task, hot state ("RAM")
- **Decisions** → `memory/decisions/` — one file per significant decision with rationale (searchable)
- **Lessons** → `memory/lessons/` — one file per lesson learned from execution (searchable)
- **Daily logs** → `memory/YYYY-MM-DD.md` — raw session notes
- **Archive** → `memory/archive/` — detailed history (searchable, not loaded)

## Quick Facts
- **Claw** 🐾 — Marb's AI partner, born Jan 22 2026, Mac mini 24/7
- Accounts & creds → `memory/facts.md` + `~/clawd/config/`
- Active projects → `memory/episodic.md`
- System files budget: ~15K chars. Keep everything lean.
