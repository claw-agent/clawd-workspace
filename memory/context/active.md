# Active Context — Feb 5, 2026

## Current Focus: XPERIENCE Roofing Project

**Deadline:** Thursday meeting (Feb 6)

### Completed (Feb 4-5)
- ✅ Lead gen system spec: `~/clawd/research/xperience/LEAD-GEN-SYSTEM-SPEC.md`
- ✅ Roof analysis research: `~/clawd/research/xperience/AERIAL-ROOF-ANALYSIS.md`
- ✅ Quick brief: `~/clawd/research/xperience/QUICK-BRIEF-2026-02-04.md`
- ✅ Verified Utah Open SGID access (271K homes in SLC alone)
- ✅ Discovered Google Solar API (1000x cheaper than EagleView)
- ✅ System simplification — adopted compound review architecture
- ✅ **Google Solar API validated** — 8/8 SLC addresses tested (Feb 5 1am)
- ✅ Built roof-analyzer.sh and batch-roof-analysis.sh scripts
- ✅ Documented in `~/clawd/projects/xperience/SOLAR-API-VALIDATION.md`

### Open Items (Priority Order)
1. ~~Test Google Solar API~~ ✅ DONE
2. **Get XPERIENCE pricing formula** (need this for estimator)
3. **Build proof-of-concept estimator** combining:
   - Utah SGID (home age, sqft)
   - Google Solar API (roof pitch, area) ✅ Working
   - XPERIENCE pricing ⏳ Need formula
4. **Configure 6am session reset cron** (optional, compound review handles this)

### Key Discoveries
| Resource | What | Cost | Status |
|----------|------|------|--------|
| Utah Open SGID | 271K homes 15+ years old in SLC | FREE | Verified |
| Google Solar API | Roof pitch, area, segments | $0 (first 10K/mo) | ✅ VALIDATED |
| PropStream | Skip tracing + DNC flagging | $149/mo | Need account |

### Architecture Decision (Feb 4)
Adopted compound review pattern:
- Sessions = ephemeral (daily resets OK)
- Files = permanent (MEMORY.md, daily notes, context/active.md)
- 10:30pm compound review extracts learnings
- No monitoring scripts, state machines, or vector DBs

---

## Standing Schedules
- 10:30pm: Compound review ← YOU ARE HERE
- 11:00pm: Overnight research swarm
- 6:00am: Morning compile
- 7:00am: Morning deliver
