# Cron Jobs Audit — February 4, 2026

## Summary
Reviewed 18 cron jobs. Found 5 obsolete jobs to remove and 1 critical schedule mismatch.

---

## 🚨 Critical Issue: Proactive Work Session Schedule Wrong

**Current:** `0 3,5 * * *` (3am and 5am)
**Expected per HEARTBEAT.md:** 11am, 2pm, 5pm

The proactive work sessions are running at 3am and 5am when nobody's awake to benefit from them. Should be during working hours.

**Fix:** Update schedule to `0 11,14,17 * * *` (11am, 2pm, 5pm)

---

## 🗑️ Obsolete Jobs (Disabled, Completed)

| Job ID | Name | Original Date | Status |
|--------|------|---------------|--------|
| edb1c8fb | codex-vs-opus-reminder | Jan 25 | Completed |
| c6bb5c06 | reminder-asset-gen-review | Jan 27 | Completed |
| 88b5ae83 | reminder-chatgpt-ads-review | Jan 27 | Completed |
| 3ae6d716 | reminder-exa-api-key | Jan 28 | Never ran (null) |
| be22ed8c | reminder-designer-view-yellow | Jan 30 | Completed |

**Recommendation:** Remove all 5 — they're one-time reminders that have already served their purpose.

---

## ✅ Active Jobs (Keep)

| Job | Schedule | Purpose | Status |
|-----|----------|---------|--------|
| github-sentinel | Every 4 hours | GitHub activity monitor | OK |
| weekly-tech-digest | Sun 9am | AI/dev news roundup | OK |
| overnight-research-swarm | 2am daily | Twitter/news research | ⚠️ See note |
| morning-report-compile | 6am daily | Compile overnight findings | OK |
| morning-report-deliver | 7am daily | Send report to Marb | OK |
| tool-update-check | Sun 3am | Check for tool updates | OK |
| system-health-audit | Every 3 days 10am | System health check | OK |
| 30-day-trend-report | 1st & 15th 10am | Bi-monthly trend report | OK |
| weekly-maintenance | Sun 4am | Cleanup cruft | OK |
| tts-prewarm | 6:50am daily | Warm up TTS before report | OK |
| daily-session-reset | 5:55am daily | Fresh session for morning | OK |
| session-size-monitor | 9:30am/1:30pm/5:30pm/9:30pm | Context size alerts | OK |

**Note on overnight-research-swarm:** Currently at 2am. If this is intentional (research while Marb sleeps, compile at 6am), it's fine. But MEMORY.md mentions "11pm" — may need verification.

---

## Actions Taken

1. ✅ Identified 5 obsolete jobs for removal
2. ✅ Identified proactive-work-session schedule mismatch
3. ⚠️ Gateway timeout during cron commands (from within cron job)
4. 📋 Manual fix instructions below

---

## Manual Fix Commands

**When gateway is responsive (outside cron job), run:**

```bash
# Fix proactive-work-session schedule (3am,5am → 11am,2pm,5pm)
# Use Telegram or direct API to run:
# cron update jobId=c0aac116-8b99-4732-9520-ee0d961c83d8 patch='{"schedule":{"kind":"cron","expr":"0 11,14,17 * * *","tz":"America/Denver"}}'

# Remove obsolete reminder jobs
# cron remove jobId=edb1c8fb-44c6-4178-806c-5f6f41ec0fe7  # codex-vs-opus-reminder
# cron remove jobId=c6bb5c06-7787-4652-bcd2-24ae52893533  # reminder-asset-gen-review  
# cron remove jobId=88b5ae83-945b-457f-b5ed-4abc63e88447  # reminder-chatgpt-ads-review
# cron remove jobId=3ae6d716-ef10-493c-b932-0a57ecbf62d9  # reminder-exa-api-key
# cron remove jobId=be22ed8c-4a89-4fb8-9c3c-945366dcab16  # reminder-designer-view-yellow
```

**Alternative: Direct file edit (restart gateway after)**
Edit `~/.clawdbot/cron/jobs.json` directly, then restart gateway.

---

## Recommendations

1. **Remove the 5 obsolete reminder jobs** — clutter cleanup
2. **Fix proactive-work-session schedule** — currently useless at 3am/5am
3. **Verify overnight-research-swarm timing** — confirm 2am is intended vs 11pm
4. **Consider adding:** Memory maintenance job (monthly MEMORY.md distillation)
