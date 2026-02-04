# Infrastructure Audit Report
**Date:** 2026-01-27  
**Auditor:** Infrastructure Scout (Subagent)

---

## Executive Summary

The system is **healthy overall** with all core services running. Found **5 minor issues** and **3 outdated packages** that should be addressed. The cron job infrastructure is functioning well with 8 scheduled tasks running on time.

---

## 1. Gateway Configuration ✅

**Status:** Running (PID 40903)
- **Port:** 18789 (loopback only - secure)
- **Config:** `~/.clawdbot/clawdbot.json`
- **Service:** LaunchAgent (auto-start enabled)
- **Logs:** `/tmp/clawdbot/clawdbot-2026-01-27.log`

**Model Fallback Chain:**
1. `anthropic/claude-3-7-sonnet-latest`
2. `anthropic/claude-3-5-haiku-latest`
3. `ollama/glm4:latest`
4. `ollama/llama3.1:8b`

**Local Memory Search:** Enabled (provider: local, fallback: none)

**✅ No issues found**

---

## 2. Cron Jobs

| ID | Name | Schedule | Status | Last Run |
|----|------|----------|--------|----------|
| 08ec6973... | github-sentinel | Every 4 hours | ✅ ok | 22m ago |
| d1b4c076... | overnight-research-swarm | 11pm daily | ✅ ok | 13h ago |
| c9f81f14... | tool-update-check | 3am daily | ✅ ok | 9h ago |
| b1a5790f... | morning-report-compile | 6am daily | ✅ ok | 6h ago |
| 4f51f74c... | morning-report-deliver | 7am daily | ✅ ok | 5h ago |
| 7dcda5a5... | weekly-tech-digest | 9am Sundays | ✅ ok | 2d ago |
| c6bb5c06... | reminder-asset-gen | Jan 27 8:30am | ✅ ok | 4h ago |
| 88b5ae83... | reminder-chatgpt-ads | Jan 27 8:35am | ✅ ok | 4h ago |

**Observations:**
- All 8 jobs report "ok" status
- Morning report pipeline runs correctly (compile → deliver)
- Two one-time reminders are now set for next year (365d)

**⚠️ ISSUE:** The two reminder crons will trigger again in 365 days - either delete them or they'll fire unexpectedly next January.

---

## 3. Installed Tools Audit

### Core Tools - All Working ✅

| Tool | Version | Status |
|------|---------|--------|
| Ollama | 0.15.0 | ✅ Running (3 models loaded) |
| Docker | 29.1.3 | ✅ Installed |
| Vercel CLI | 50.5.0 | ⚠️ Outdated (50.7.1 available) |
| Typst | 0.14.2 | ✅ Current |
| yt-dlp | 2025.12.08 | ✅ Recent |
| ffmpeg | 8.0.1 | ✅ Current |
| Claude Squad | 0.1.24 | ✅ Installed |
| edge-tts | 7.2.7 | ✅ Working |
| cliclick | 5.1 | ✅ Working |
| WeasyPrint | 68.0 | ✅ Working |
| agent-browser | 0.7.6 | ⚠️ Outdated (0.8.4 available) |

### Ollama Models
- `glm4:latest` ✅
- `llama3.1:8b` ✅  
- `llama3.2:3b` ✅

### Python Environment (~/.venv)

| Package | Version | Status |
|---------|---------|--------|
| pandas | 3.0.0 | ✅ Current |
| numpy | 2.4.1 | ✅ Current |
| openpyxl | 3.1.5 | ✅ Current |
| browser-use | 0.11.4 | ✅ Current |

### Qwen3-TTS Environment

| Package | Version | Status |
|---------|---------|--------|
| qwen-tts | 0.0.4 | ✅ Installed (local dev) |
| torch | 2.10.0 | ✅ Current |
| torchaudio | 2.10.0 | ✅ Current |
| transformers | 4.57.3 | ✅ Current |

### NPM Global Packages Needing Updates

```
Package        Current   Latest
@remotion/cli  4.0.409   4.0.410
remotion       4.0.409   4.0.410
agent-browser  0.7.6     0.8.4
npm            11.7.0    11.8.0
vercel         50.5.0    50.7.1
```

**Recommendation:** Run `npm update -g` to update all.

---

## 4. Credentials & Secrets

| File | Location | Notes |
|------|----------|-------|
| HeyGen API Key | `~/clawd/config/.heygen-credentials` | ✅ Exists (70 bytes) |
| Anthropic OAuth | `~/.clawdbot/` | ✅ Configured |

**No .env files found in workspace** (good - using proper credential storage)

**⚠️ Cannot verify if HeyGen credentials are still valid** - free tier limitations may have changed.

---

## 5. Scripts Audit

### ~/clawd/scripts/ (14 files)

| Script | Executable | Documented | Status |
|--------|------------|------------|--------|
| check-updates.sh | ✅ | ❓ | Used by tool-update-check cron |
| claw-speak.sh | ✅ | ✅ Good comments | **Primary TTS entry point** |
| qwen-clone.sh | ✅ | ❓ | Helper for voice cloning |
| speak.sh | ✅ | ❓ | Older TTS script (redundant?) |
| test-auth-resilience.sh | ✅ | ❓ | Test script |
| qwen-tts-test.py | ✅ | ❓ | Test script |
| voice-clone.py | ✅ | ❓ | Core voice cloning logic |
| generate-report.js | ✅ | ❓ | Morning report generator |
| generate-tim-report.js | ❌ | ❓ | **Not executable** |
| stealth-browser.js | ✅ | ❓ | Browser automation |
| stealth-browse | ✅ | ❓ | Wrapper script |
| QWEN-TTS-README.md | N/A | ✅ | Documentation |
| tim_reynolds_sample.txt | N/A | N/A | Sample text |

**Issues:**
1. `generate-tim-report.js` is not executable (missing `chmod +x`)
2. `speak.sh` appears redundant with `claw-speak.sh`
3. Most scripts lack inline documentation

---

## 6. Browser Profiles

**Location:** `~/clawd/browser-profiles/`

| Profile | Status |
|---------|--------|
| claw-chrome | ⚠️ **Empty directory** |

**Issue:** The `claw-chrome` profile directory is empty. TOOLS.md mentions this for Twitter automation but no actual profile data exists. This could mean:
- Profile was never created
- Profile was cleared/reset
- Using a different profile location

---

## 7. Voice/TTS Setup

### Reference Voice
- **File:** `~/clawd/voices/claw_reference.wav`
- **Size:** 1.4MB (30s audio sample)
- **Voice:** Tim Gerard Reynolds (Red Rising narrator)
- **Status:** ✅ Present and correct

### Qwen3-TTS
- **Location:** `~/clawd/Qwen3-TTS/`
- **Venv:** ✅ Working
- **Status:** ✅ Fully operational

---

## 8. Agent Infrastructure

### v2 Agent Swarm ✅
- **Location:** `~/clawd/agents/v2/`
- **SKILL.md:** Present (5.3KB orchestrator docs)
- **Agents:** researcher, list-builder, outreach, qualifier, content

### Legacy Agents ✅
- `architect.md` (6.3KB)
- `code-reviewer.md` (2.9KB)
- `planner.md` (3.2KB)
- `security-reviewer.md` (14.3KB)

### Skills ✅
- `~/.agents/skills/heygen-best-practices/`
- `~/.agents/skills/remotion/`

---

## 9. Projects Status

| Project | Location | Status |
|---------|----------|--------|
| bjorns-brew | ~/clawd/projects/bjorns-brew/ | ✅ Active |
| slc-lead-gen | ~/clawd/projects/slc-lead-gen/ | ✅ Active |
| coffee-consulting | ~/clawd/projects/coffee-consulting/ | ❓ Unknown |
| remotion-test | ~/clawd/projects/remotion-test/ | ❓ Test project |

---

## 10. Memory System

- **Daily logs:** 5 days of history (Jan 23-27)
- **State files:**
  - `bookmarks-state.json` (5.7KB)
  - `heartbeat-state.json` (281 bytes)
  - `twitter-night-scan.json` (14.6KB)
  - `twitter-research-state.json` (1.8KB)

**✅ Memory system healthy**

---

## 11. Disk Space

```
Volume    Size    Used    Available    Capacity
/         228GB   17GB    106GB        14%
```

**✅ Plenty of space available**

---

## 12. Reports Directory

**Location:** `~/clawd/reports/`

| Item | Age | Size | Status |
|------|-----|------|--------|
| morning-report-2026-01-24.pdf | 3 days | 10.5MB | Consider archiving |
| refund-research-report.pdf | 3 days | 1.2MB | Keep |
| tim-realm-report-2026-01-24.pdf | 3 days | 1.0MB | Consider archiving |
| fix-pdf.mjs | 3 days | 4KB | One-off script |
| morning-2026-01-26/ | 1 day | - | Recent |
| morning-2026-01-27/ | Today | - | Active |

---

## Summary of Issues

### Critical (0)
None

### High Priority (2)
1. **Empty browser profile:** `claw-chrome/` directory is empty - Twitter automation may not persist sessions
2. **Outdated agent-browser:** 0.7.6 → 0.8.4 (may have breaking changes)

### Medium Priority (3)
1. **generate-tim-report.js not executable:** Run `chmod +x ~/clawd/scripts/generate-tim-report.js`
2. **One-time reminders will re-trigger:** Delete the two reminder crons or they'll fire next January
3. **Vercel CLI outdated:** 50.5.0 → 50.7.1

### Low Priority (5)
1. **Redundant speak.sh script:** Consider removing if claw-speak.sh is the standard
2. **NPM packages need updates:** Run `npm update -g`
3. **Scripts lack documentation:** Add comments to shell scripts
4. **MCP config not found:** `~/.mcp.json` doesn't exist (may be using different config method)
5. **coffee-consulting project status unknown:** Verify if still active

---

## Recommendations

### Immediate Actions
```bash
# Fix permissions
chmod +x ~/clawd/scripts/generate-tim-report.js

# Update NPM packages
npm update -g

# Remove completed one-time reminders
clawdbot cron delete reminder-asset-gen-re...
clawdbot cron delete reminder-chatgpt-ads-...
```

### Cleanup Tasks
- Archive old PDF reports (>3 days) to a `reports/archive/` folder
- Remove `speak.sh` if redundant
- Delete `fix-pdf.mjs` if no longer needed

### Improvements
- Add README.md to `~/clawd/scripts/` documenting each script's purpose
- Verify HeyGen credentials still work
- Investigate why `claw-chrome` profile is empty - may need to re-authenticate

### Monitoring
- Set up a periodic check for stale cron jobs
- Monitor Ollama model disk usage as models accumulate

---

**Audit Complete** ✅

*Report generated by Infrastructure Scout subagent*
