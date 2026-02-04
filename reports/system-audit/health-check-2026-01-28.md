# System Health Audit — 2026-01-28

**Run by:** Claw (automated cron)  
**Time:** 10:00 AM MST  
**Overall Health Score:** 7/10

---

## Summary

System is operational with a few issues requiring attention. Most critical: OAuth token refresh is failing (but system still running on current auth). Minor disk cleanup opportunities exist.

---

## 1. State Files

| File | Status | Notes |
|------|--------|-------|
| `memory/heartbeat-state.json` | ✅ Current | Last check: Jan 27 |
| `memory/twitter-research-state.json` | ✅ Current | Last scan: Jan 28 07:00 |
| `memory/bookmarks-state.json` | ⚠️ Stale | Last update: Jan 25 (3 days old) |
| `memory/twitter-night-scan.json` | ⚠️ Stale | Last update: Jan 26 |

**No conflicts detected.**

---

## 2. Empty/Unused Folders

| Location | Size | Recommendation |
|----------|------|----------------|
| `~/clawd/tmp/` | Empty | ✅ Good (temp dir) |
| `projects/coffee-consulting/docs/` | Empty | Keep (placeholder) |
| `projects/coffee-consulting/data/` | Empty | Keep (placeholder) |
| `projects/slc-lead-gen/v2/templates/` | Empty | Keep (placeholder) |
| `projects/slc-lead-gen/data/campaigns/` | Empty | Keep (placeholder) |
| `projects/slc-lead-gen/data/demos/` | Empty | Keep (placeholder) |
| `skills/idea-to-blueprint/references/` | Empty | Keep (placeholder) |

**Cleanup opportunities:**
- `~/clawd/demo/` — 170MB of old screen test screenshots. Safe to archive/delete.
- `~/clawd/video-analysis/` — 12MB old test files (geerling analysis). Can archive.

---

## 3. Cron Job Health

**Morning Report:** ✅ Working
- Last delivery: Jan 28 07:00 — SUCCESS
- 28 items delivered (PDF + voice brief)

**OAuth Refresh:** ❌ FAILING
```
ERROR: No access_token in OAuth response: 
{"error": "invalid_grant", "error_description": "Refresh token not found or invalid"}
```
- Token expired: Jan 26 00:17:47
- Has been failing since Jan 28 07:02
- **Action needed:** Run `claude auth` to re-authenticate

**Gateway Health Check:** ⚠️ Old failures in log
- Log shows restart failures from Jan 25 (now resolved)
- Gateway currently running fine (pid 58272)

---

## 4. Memory Files

| Check | Status |
|-------|--------|
| Credential leaks | ✅ None found (previous leak was scrubbed) |
| Daily files | ✅ Current through Jan 28 |
| MEMORY.md | ✅ Well-maintained |
| Total size | 84KB (healthy) |

**Vector index:** Dirty (6 files, 35 chunks) — will auto-reindex

---

## 5. Skills

| Skill | Status | Notes |
|-------|--------|-------|
| claude-connect | ✅ OK | Has .git |
| continuous-learning | ✅ OK | |
| idea-to-blueprint | ✅ OK | Empty references/ dir |
| remotion | ✅ OK | |
| research-swarm | ✅ OK | |
| roles | ✅ OK | |
| twitter-research | ✅ OK | |
| video-production | ✅ OK | |

**No conflicts or gaps detected.**

---

## 6. Disk Usage

| Directory | Size | Notes |
|-----------|------|-------|
| projects/ | 1.4G | Normal (includes node_modules) |
| Qwen3-TTS/ | 1.2G | Model files |
| sim-studio/ | 513M | Normal |
| demo/ | 170M | **Can delete** |
| research/ | 70M | Normal |
| reports/ | 22M | Normal |
| video-analysis/ | 12M | Can archive |

**Total workspace:** ~3.5GB

---

## Issues Found

### Critical
1. **OAuth token refresh failing** — Claude auth needs renewal

### Warning
2. **Memory vector index dirty** — Will auto-resolve
3. **Stale state files** — bookmarks-state.json (3 days old)

### Info
4. **170MB demo folder** — Old screenshots, safe to delete
5. **Security audit warnings** — Small model sandboxing (known, acceptable)

---

## Recommendations

1. **Re-authenticate Claude:** Run `claude auth` to fix OAuth refresh
2. **Archive demo folder:** `mv ~/clawd/demo ~/clawd/.archive/demo-2026-01`
3. **Monitor bookmark state:** May indicate Twitter auth issue for Marb's account

---

## Auto-Fixed

Nothing auto-fixed this run (all issues require user decision or manual auth).

---

*Next audit: 3 days*
