# Workspace Cleanup Audit — Feb 3, 2026

## Summary

Total workspace size: ~3.2GB
Potential savings: ~900MB (with conservative cleanup)

---

## 🔴 High Priority (Large + Stale)

### 1. slc-lead-gen/node_modules — 188MB
**Status:** Project dormant (0 files modified in 7 days)
**Recommendation:** Run `rm -rf ~/clawd/projects/slc-lead-gen/node_modules`
- Can be reinstalled with `npm install` if project resumes
- Project data/code stays intact

### 2. sim-studio — 522MB
**Status:** Not actively used, 135 commits behind
**Recommendation:** Archive or delete
- `trash ~/clawd/sim-studio` (recoverable)
- Can re-clone from GitHub if needed

### 3. bjorns-brew/video-ad/node_modules — 367MB
**Status:** Project active but heavy
**Recommendation:** Keep for now (actively developing Remotion videos)
- Could clean after video project completes

---

## 🟡 Medium Priority

### 4. Old Morning Reports (>7 days)
Files like:
- morning-2026-01-26/morning-summary.wav (3.7MB)
- morning-2026-01-28/morning-brief.wav (3.4MB)
- morning-2026-01-29/morning-brief.wav (3.4MB)

**Recommendation:** Keep last 7 days, archive older
```bash
# Move reports older than 7 days to archive
find ~/clawd/reports/morning-* -mtime +7 -exec mv {} ~/.archive/ \;
```

### 5. coffee-consulting — 88KB
**Status:** No activity, small footprint
**Recommendation:** Low priority, but could archive
- `mv ~/clawd/projects/coffee-consulting ~/.archive/`

### 6. .archive folder
**Status:** Already has old video analysis (~15MB)
**Recommendation:** Review contents, delete if no longer needed

---

## 🟢 Keep (Active/Essential)

| Directory | Size | Reason |
|-----------|------|--------|
| Qwen3-TTS | 1.2G | Voice generation (essential) |
| bjorns-brew | 843M | Active project |
| projects/yelo-deck | 716K | Active (YELO deck V4) |
| projects/move | 460K | Recent (refund research) |
| projects/leadgen-saas | 3.5M | Active development |
| mcp-ext-apps | 136M | Recently cloned, useful |
| research/ | 91M | Knowledge base |
| skills/ | 5M | Agent capabilities |

---

## Quick Cleanup Commands

```bash
# Safe cleanup (node_modules from dormant projects)
rm -rf ~/clawd/projects/slc-lead-gen/node_modules  # Saves 188MB

# Archive sim-studio (recoverable)
trash ~/clawd/sim-studio  # Saves 522MB

# Clear old logs
rm ~/clawd/logs/*.log  # Minimal savings, cleaner

# Total estimated savings: ~710MB
```

---

## Don't Touch

- browser-profiles/ — Chrome session with auth
- Qwen3-TTS/ — Voice model + venv
- voices/ — Reference audio files
- memory/ — Daily notes (critical)
- state/ — Twitter research state

---

*Generated during proactive cleanup audit*
