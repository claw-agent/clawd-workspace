# Memory & State System Audit

**Date:** January 27, 2026  
**Scout:** Memory & State Audit Subagent  
**Scope:** All memory files, state JSONs, logs, research outputs

---

## Executive Summary

The memory and state management system is **generally well-organized** with good structure, but has several **critical issues** that need attention:

1. **Duplicate state files** causing sync drift
2. **Stale heartbeat state** (2 days old)
3. **Orphaned research folders** with no content
4. **Missing log rotation** causing file growth
5. **MEMORY.md contains operational context that should be in daily logs**

Overall health score: **7/10** — Functional but needs maintenance.

---

## 1. Current State of Memory/Knowledge Management

### MEMORY.md Assessment

**Location:** `~/clawd/MEMORY.md`  
**Size:** ~4KB  
**Last meaningful update:** Jan 26, 2026

**Strengths:**
- ✅ Clear identity section (Who We Are)
- ✅ Account credentials well-documented
- ✅ Key projects documented with locations
- ✅ Overnight research protocol permanently documented
- ✅ Research tracks with file locations
- ✅ Notes to self for behavioral continuity

**Issues:**
- ⚠️ "Major Projects" section contains too much operational detail (scoring system code, agent pipeline details) that belongs in project README
- ⚠️ "Crow Collaboration" section is dated — no updates since Jan 26
- ⚠️ Missing: Frequently used commands/workflows
- ⚠️ Missing: Marb's communication preferences (when to ping, quiet hours, etc.)

**Verdict:** Good foundation but needs pruning of operational details and adding behavioral context.

### Daily Memory Files Assessment

**Location:** `~/clawd/memory/`  
**Files:** 5 daily logs (2026-01-23 through 2026-01-27)  
**Total size:** ~34KB

| File | Size | Completeness | Notes |
|------|------|--------------|-------|
| 2026-01-23.md | 1.6KB | Basic | First day, minimal entries |
| 2026-01-24.md | 8.9KB | Excellent | Detailed, well-structured |
| 2026-01-25.md | 9KB | Excellent | Comprehensive project logs |
| 2026-01-26.md | 10.2KB | Excellent | Best structured day |
| 2026-01-27.md | 4KB | Good | Current day, ongoing |

**Strengths:**
- ✅ Consistent date-based naming (YYYY-MM-DD.md)
- ✅ Timestamps on major activities
- ✅ Technical decisions documented with rationale
- ✅ File paths included for deliverables
- ✅ Tables used effectively for summaries

**Issues:**
- ⚠️ Inconsistent heading hierarchy across days
- ⚠️ Some credential info in daily logs should only be in MEMORY.md
- ⚠️ 2026-01-23 is sparse compared to others

**Verdict:** Daily logs are working well. Keep this pattern.

### HEARTBEAT.md Assessment

**Location:** `~/clawd/HEARTBEAT.md`  
**Size:** ~1KB

**Content:**
- Current focus: SLC Lead Gen MVP complete
- Project status summary
- Ready capabilities list
- Watching list (AI trends)

**Strengths:**
- ✅ Concise current focus
- ✅ Clear project status
- ✅ Good capability summary

**Issues:**
- ⚠️ "Recent Accomplishment" dated Jan 26 — needs update
- ⚠️ Missing: Immediate action items or blockers
- ⚠️ No mention of today's (Jan 27) activities

**Verdict:** Slightly stale. Should be updated daily.

---

## 2. Stale or Outdated Information Found

### Critical: Duplicate State Files with Drift

Found **duplicate twitter-research state files**:

| File | Location | Last Updated |
|------|----------|--------------|
| twitter-research-state.json | `~/clawd/memory/` | 2026-01-27T16:34:00Z |
| state.json | `~/clawd/skills/twitter-research/` | 2026-01-26T07:15:00Z |

**Problem:** The memory/ version has 27 analyzed handles and updated deliveries tracking. The skills/ version has only 22 handles and is ~33 hours behind.

**Impact:** Workflows reading from skills/ will re-analyze already-processed bookmarks.

**Fix:** Consolidate to ONE canonical location. Recommend `~/clawd/memory/twitter-research-state.json`.

### Stale: heartbeat-state.json

**Location:** `~/clawd/memory/heartbeat-state.json`  
**Last heartbeat:** 1737838860 (Jan 25, 2026 @ 2:21 PM)  

**Problem:** No heartbeat checks for email, calendar, or weather have EVER been recorded. All null.
```json
{
  "lastChecks": {
    "email": null,
    "calendar": null,
    "weather": null,
    "memoryReview": 1737838860
  }
}
```

**Impact:** Heartbeat system isn't tracking checks properly. Protocol in AGENTS.md isn't being followed.

### Stale: HEARTBEAT.md

References "Jan 26, 2026" as recent — this should reflect current day.

### Stale: bookmarks-state.json

**Last accessed:** 2026-01-26T07:08:00Z (~30 hours old)  

**Problem:** Contains detailed notes but `lastAccessed` timestamp hasn't been updated with recent scans.

### Outdated: MEMORY.md Research Tracks

"Research Tracks (2026-01-25)" header — two days old. Research docs referenced exist but the section could note completion status.

---

## 3. Gaps in What We're Tracking

### Not Tracked: Tool Installation/Version History

No record of:
- When each tool was installed
- What versions are current
- What was deprecated/removed

**Recommendation:** Add `~/clawd/memory/tool-inventory.json` or section in TOOLS.md.

### Not Tracked: Marb's Preferences/Communication Style

MEMORY.md has "What Marb Wants" but missing:
- Preferred response length
- When NOT to ping (quiet hours)
- Topics Marb finds annoying
- Success criteria for "good work"

**Recommendation:** Add "Working with Marb" section to MEMORY.md.

### Not Tracked: Failed Experiments

No record of:
- Things tried that didn't work
- Abandoned approaches
- Why certain tools were rejected

**Recommendation:** Add `~/clawd/memory/lessons-learned.md` or section in MEMORY.md.

### Not Tracked: Recurring Task History

Heartbeat state doesn't track:
- Which emails were flagged
- What calendar events were warned about
- Success/failure rate of overnight jobs

**Recommendation:** Add structured logging to heartbeat-state.json.

### Partially Tracked: Research Outputs

Research folder is well-organized but:
- `~/clawd/research/github/2026-01-26/` is EMPTY
- `~/clawd/research/news/2026-01-26/` is EMPTY
- Some deep-dives exist without corresponding summary in state files

---

## 4. Conflicts and Inconsistencies

### Conflict: Twitter Research State Files

**Severity:** HIGH

Two different state files tracking the same thing with different data:
- `~/clawd/memory/twitter-research-state.json` (27 handles, current)
- `~/clawd/skills/twitter-research/state.json` (22 handles, stale)

Skills that read from the wrong location will duplicate work.

### Inconsistency: Credential Storage

Credentials appear in multiple places:
- MEMORY.md (accounts section)
- Daily logs (2026-01-25.md, 2026-01-23.md)
- `.twilio-credentials` file
- Various config files

Some daily logs contain plain-text passwords (e.g., 2026-01-24.md has Proton creds).

**Recommendation:** Remove credentials from daily logs. Keep ONLY in MEMORY.md or dedicated credential files.

### Inconsistency: State File Naming

State files use inconsistent naming:
- `bookmarks-state.json` (hyphenated)
- `twitter-research-state.json` (hyphenated)  
- `heartbeat-state.json` (hyphenated)
- `twitter-night-scan.json` (not "state", different pattern)

**Recommendation:** Standardize naming: `*-state.json` for tracking, `*-scan.json` for data dumps.

### Minor: Report Folder Structure

Reports folder mixes:
- Date-based folders (`morning-2026-01-26/`)
- One-off files (`refund-research-report.pdf`)
- Topical folders (`system-audit/`)

Not a problem yet but could get messy. Recommend consistent structure.

---

## 5. Recommendations for Memory Hygiene

### Immediate Actions (Do Today)

1. **Consolidate twitter-research state files**
   ```bash
   rm ~/clawd/skills/twitter-research/state.json
   # Update SKILL.md to reference ~/clawd/memory/twitter-research-state.json
   ```

2. **Update HEARTBEAT.md** with current date and recent accomplishments

3. **Update heartbeat-state.json** to actually track checks:
   ```json
   {
     "lastChecks": {
       "email": 1737993600,
       "calendar": 1737993600,
       "weather": null,
       "memoryReview": 1737993600
     }
   }
   ```

4. **Remove credentials from daily logs** (2026-01-24.md, 2026-01-23.md)

### Short-Term (This Week)

5. **Prune MEMORY.md**
   - Move SLC Lead Gen technical details to project README
   - Add "Working with Marb" behavioral notes
   - Add "Lessons Learned" section

6. **Clean up empty research folders**
   ```bash
   rm -r ~/clawd/research/github/2026-01-26
   rm -r ~/clawd/research/news/2026-01-26
   ```

7. **Add log rotation** for `~/clawd/logs/claude-oauth-refresh.log` (currently 59KB and growing)

### Ongoing Practices

8. **Daily HEARTBEAT.md updates** — First heartbeat of the day should update this file

9. **Weekly MEMORY.md review** — During Sunday heartbeat, review and update long-term memory

10. **State file validation** — Before overnight jobs, verify state files are current

---

## File Inventory Summary

### Memory Files
| File | Status | Action Needed |
|------|--------|---------------|
| MEMORY.md | Good | Prune operational details |
| HEARTBEAT.md | Stale | Update to current date |
| memory/2026-01-*.md | Excellent | Remove credentials |
| memory/heartbeat-state.json | Stale | Update timestamps |
| memory/bookmarks-state.json | Good | Update lastAccessed |
| memory/twitter-research-state.json | Current | Keep, delete duplicate |
| memory/twitter-night-scan.json | Good | Archive older scans |
| skills/twitter-research/state.json | Duplicate | DELETE |

### Log Files
| File | Size | Status |
|------|------|--------|
| logs/claude-oauth-refresh.log | 59KB | Needs rotation |
| logs/claude-oauth-refresher-stdout.log | 36KB | Needs rotation |
| logs/gateway-health.log | 5.3KB | OK |

### Research Output
| Folder | Contents | Status |
|--------|----------|--------|
| research/bookmarks/ | Daily deep dives | Good |
| research/2026-01-26/ | ChatGPT ads, videos | Good |
| research/agent-architecture/ | Skills.sh catalog | Good |
| research/github/2026-01-26/ | EMPTY | Delete |
| research/news/2026-01-26/ | EMPTY | Delete |

---

## Conclusion

The memory system is **fundamentally sound** — daily logs are working well, MEMORY.md captures important context, and state tracking exists for key workflows.

The main issues are:
1. **State file duplication** causing drift (HIGH priority)
2. **Stale timestamps** in heartbeat tracking (MEDIUM priority)
3. **Credential hygiene** in daily logs (MEDIUM priority)
4. **Empty placeholder folders** cluttering research (LOW priority)

Implementing the recommendations above will improve reliability and reduce the risk of duplicate work or lost context.

---

*Audit completed: 2026-01-27 @ 12:23 MST*
