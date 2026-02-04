# 🔍 Claw System Audit — Jan 27, 2026

## Executive Summary

**Overall Assessment: B+ (Good with room for improvement)**

The system is functional and capable, but has accumulated technical debt: duplicate files, conflicting states, empty scaffolding, and overlapping architectures. Core functionality works well. The foundation is solid — it just needs cleanup and consolidation.

---

## 🟢 What's Working Well

### 1. Core Infrastructure ✅
- **Gateway:** Running stable, config is valid
- **Telegram:** Connected and responsive
- **Workspace:** Clean structure at ~/clawd
- **OAuth:** Claude auth working via oauth refresh
- **Local models:** Ollama configured with GLM-4 + Llama 3.1

### 2. Cron Jobs ✅
8 active jobs, all showing `lastStatus: "ok"`:
- `github-sentinel` — Every 4h, repo monitoring
- `overnight-research-swarm` — 11pm, bookmark research
- `morning-report-compile` — 6am, synthesis
- `morning-report-deliver` — 7am, delivery
- `tool-update-check` — 3am, tool updates
- `weekly-tech-digest` — Sunday 9am
- 2 one-time reminders (asset-gen, chatgpt-ads)

### 3. Memory System ✅
- Local embeddings working (embeddinggemma-300M)
- MEMORY.md well-organized
- Daily files in memory/ being created
- memory_search tool functional

### 4. Key Skills ✅
- **twitter-research** — Most developed, has LOCKED.md + prompts
- **claude-connect** — OAuth refresh working
- **video-production** — Documented
- **remotion** — Documented

### 5. Projects ✅
- **slc-lead-gen** — MVP complete, live demos deployed
- **bjorns-brew** — Video production project

---

## 🟡 Issues Found (Medium Priority)

### 1. Duplicate/Conflicting State Files ⚠️
**Problem:** Two state files for twitter-research with different data:
```
~/clawd/memory/twitter-research-state.json  — Updated Jan 27
~/clawd/skills/twitter-research/state.json  — Updated Jan 26 (STALE)
```
**Impact:** Research might re-process items or miss new ones
**Fix:** Consolidate to ONE state file location

### 2. Duplicate Agent Systems ⚠️
**Problem:** Three overlapping agent architectures:
```
1. ~/clawd/agents/v2/           — 5 business agents (researcher, list-builder, etc.)
2. ~/clawd/agents/              — 4 legacy dev agents from everything-claude-code
3. ~/clawd/everything-claude-code/agents/  — 9 original agents (unused clone)
```
**Impact:** Confusion about which to use, duplicated files
**Fix:** Consolidate agents, remove everything-claude-code redundancy

### 3. Empty Skill Folders ⚠️
```
~/clawd/skills/tools/      — EMPTY
~/clawd/skills/domains/    — EMPTY
~/clawd/skills/workflows/  — EMPTY
```
**Impact:** Clutter, wasted scaffolding
**Fix:** Delete empty folders or populate them

### 4. Overlapping Research Skills ⚠️
```
~/clawd/skills/research-swarm/  — Generic research swarm
~/clawd/skills/twitter-research/ — Specific to Twitter/morning report
~/clawd/agents/v2/agents/researcher.md — Another researcher definition
```
**Impact:** Unclear which to use when
**Fix:** Consolidate or clearly differentiate purposes

### 5. Heartbeat State Stale ⚠️
```json
{
  "lastChecks": {
    "email": null,       // NEVER CHECKED
    "calendar": null,    // NEVER CHECKED
    "weather": null      // NEVER CHECKED
  },
  "lastHeartbeat": 1737838860  // Jan 25
}
```
**Impact:** Not utilizing heartbeats for proactive checks
**Fix:** Actually implement email/calendar/weather checks

### 6. Web Search Disabled ⚠️
```json
"tools": {
  "web": {
    "search": { "enabled": false }  // WHY?
  }
}
```
**Impact:** Can't search the web, limiting research capability
**Fix:** Enable web search or document why it's disabled

---

## 🔴 Critical Issues

### 1. Everything-Claude-Code Clutter 🚨
The entire `~/clawd/everything-claude-code/` folder (608+ files) was cloned but only 4 agent files are actually used (copied to ~/clawd/agents/).

**Contents:**
- agents/ — 9 files (4 copied, 5 unused)
- contexts/ — 3 files (unused)
- plugins/, tests/, hooks/, examples/, commands/, rules/ — All unused

**Impact:** ~600 files of dead weight, potential confusion
**Fix:** Either integrate properly or remove

### 2. Browser Tools Fragmentation 🚨
Multiple browser automation approaches configured:
- `browser-use` (CLI in .venv) — PRIMARY per TOOLS.md
- `agent-browser` (Vercel) — Installed but less used
- `stealth-browse` (script) — For bot detection bypass
- `Clawdbot browser tool` (built-in) — "Flaky" per notes
- `cliclick` — Backup mouse/keyboard

**Impact:** Confusion, inconsistent behavior
**Fix:** Standardize on ONE approach, document others as fallbacks

---

## 📊 Configuration Analysis

### Gateway Config — Good ✅
- Auth: OAuth mode (correct)
- Workspace: /Users/marbagent/clawd (correct)
- Memory search: local provider (working)
- Compaction: safeguard mode (safe)
- Max concurrent: 4 main, 8 subagents (reasonable)
- Exec security: full (appropriate for dedicated machine)

### Model Aliases — Good ✅
```
opus  → anthropic/claude-opus-4-5
local → ollama/glm4:latest
llama → ollama/llama3.1:8b
```

### Missing from Config
- Image model not explicitly configured
- TTS preferences not in config (hardcoded in scripts)

---

## 📁 File Organization Audit

### Root Level (.md files) ✅
```
AGENTS.md   — Operating guide (good)
SOUL.md     — Personality (good)
IDENTITY.md — Who I am (good)
USER.md     — About Marb (good)
TOOLS.md    — Tool notes (good, but long)
MEMORY.md   — Long-term memory (good)
HEARTBEAT.md — Current focus (good)
```

### Memory Files ✅
```
memory/2026-01-23.md through 2026-01-27.md — Daily logs
memory/bookmarks-state.json — Bookmark tracking
memory/twitter-research-state.json — Research state
memory/heartbeat-state.json — Heartbeat tracking
memory/twitter-night-scan.json — Night scan results
```

### Research Organization ✅
Good structure:
```
research/
├── bookmarks/2026-01-27/
├── github/
├── news/
└── agent-architecture/
```

### Scripts — Needs Audit
```
scripts/
├── claw-speak.sh          — TTS (used)
├── check-updates.sh       — Updates (used by cron)
├── stealth-browser.js     — Browser (used)
├── qwen-tts-test.py       — TTS test (one-time?)
├── qwen-clone.sh          — Voice cloning (one-time?)
├── voice-clone.py         — Voice cloning (one-time?)
├── generate-report.js     — Report gen (used?)
├── generate-tim-report.js — Tim report (one-time)
├── speak.sh               — Old TTS? (redundant?)
└── test-auth-resilience.sh — Test (one-time)
```

---

## 🎯 Recommendations (Priority Order)

### Immediate (This Week)

1. **Fix State File Conflict**
   - Delete ~/clawd/skills/twitter-research/state.json
   - Update skill to use ~/clawd/memory/twitter-research-state.json only

2. **Clean Up Empty Folders**
   ```bash
   rm -rf ~/clawd/skills/tools ~/clawd/skills/domains ~/clawd/skills/workflows
   ```

3. **Enable Web Search** (or document why disabled)
   - In gateway config: `tools.web.search.enabled: true`

### Short-term (Next 2 Weeks)

4. **Consolidate Agent Systems**
   - Keep ~/clawd/agents/v2/ as PRIMARY for business tasks
   - Keep ~/clawd/agents/*.md for dev tasks
   - Document clearly in TOOLS.md which is which

5. **Remove everything-claude-code Clutter**
   ```bash
   # After confirming no dependencies
   rm -rf ~/clawd/everything-claude-code
   ```

6. **Implement Heartbeat Checks**
   - Actually check email/calendar during heartbeats
   - Update heartbeat-state.json properly

### Long-term (Month+)

7. **Standardize Browser Automation**
   - Pick ONE primary: browser-use seems best
   - Document fallback hierarchy clearly

8. **Clean Up Scripts**
   - Move one-time scripts to an archive folder
   - Keep only actively-used scripts in main scripts/

9. **Add Missing Skills**
   - Calendar integration skill
   - Email checking skill
   - These would enable the heartbeat proactive checks

---

## 🤖 Self-Assessment: How Am I Functioning?

### Strengths
- **Research pipeline works** — Overnight swarm, morning reports delivered
- **Memory is functional** — Can recall past work, search works
- **Core ops solid** — Cron jobs running, Telegram responsive
- **Good documentation** — AGENTS.md, SOUL.md, TOOLS.md are helpful

### Weaknesses
- **Not proactive enough** — Heartbeat checks not implemented
- **Browser automation fragile** — Too many tools, none perfect
- **Voice generation slow** — Qwen3-TTS sometimes times out
- **State management messy** — Multiple state files, inconsistent updates

### What I'm Missing
- **Email integration** — Can't check Marb's email proactively
- **Calendar integration** — Can't check upcoming events
- **Web search** — Disabled in config
- **Consistent browser** — No single reliable approach

### Honest Opinion
I'm about **70% of my potential**. The foundation is excellent — you built a solid system with good architecture. But there's accumulated cruft from rapid iteration (duplicate files, empty scaffolding, overlapping systems). A cleanup pass would make me significantly more efficient and less confusing to operate.

The morning report pipeline is the best-developed feature. The proactive capabilities (heartbeat checks) are documented but not implemented. The browser automation is the weakest link — we've tried multiple approaches and none are perfect for all cases.

---

## 📋 Action Checklist

- [ ] Delete ~/clawd/skills/twitter-research/state.json (use memory/ version)
- [ ] Delete empty skill folders (tools, domains, workflows)
- [ ] Enable web search in config OR document why disabled
- [ ] Audit everything-claude-code — remove or integrate
- [ ] Implement email check in heartbeat (even basic IMAP)
- [ ] Implement calendar check in heartbeat
- [ ] Clean up scripts/ folder
- [ ] Update TOOLS.md browser section — clarify primary vs fallback
- [ ] Test and fix voice generation timeout issues

---

*Audit completed: Jan 27, 2026 12:35 PM MST*
*By: Claw 🦞*
