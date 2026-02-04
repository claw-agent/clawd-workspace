# OpenClaw System Audit — 2026-02-03

**Version:** 2026.2.2-3 (latest)
**Config last touched:** 2026.1.24-3

## 🔍 Key Findings

### 1. "Adaptive" Mode Clarification
**What Marb saw:** "adaptive" mentioned somewhere
**Reality:** Adaptive chunking is **built into** the `compaction.mode: "safeguard"` mode we're already using!

From changelog 2026.1.22:
> "Compaction safeguard now uses adaptive chunking, progressive fallback, and UI status + retries"

**Verdict:** ✅ We're already using it. No config change needed.

---

### 2. Context Pruning (cache-ttl)
**Current config:**
```json
"contextPruning": {
  "mode": "cache-ttl",
  "ttl": "4h",
  "softTrimRatio": 0.3,   // We lowered from 0.6 tonight
  "hardClearRatio": 0.5   // We lowered from 0.75 tonight
}
```

**What it does:**
- Trims old tool results when Anthropic cache expires
- `softTrimRatio` at 0.3 = trim at 30% context (aggressive)
- `hardClearRatio` at 0.5 = clear at 50% context

**Verdict:** ✅ Config is good. Our lower thresholds should prevent tonight's crisis.

---

### 3. Auth: Setup Token vs OAuth CLI
**Current:** Using setup token (`sk-ant-oat01-...`)
**Old way:** OAuth via `claude-connect` skill

**What changed:**
- OpenClaw now supports setup tokens natively
- They don't expire like OAuth tokens
- No need for refresh scripts

**Verdict:** 🔄 **claude-connect skill likely REDUNDANT**
- We can disable/remove it if setup tokens work reliably
- Monitor for a week to confirm

---

### 4. Cron Jobs (14 total)

| Job | Purpose | Status |
|-----|---------|--------|
| github-sentinel | Monitor repo activity | ✅ Keep |
| overnight-research-swarm | Twitter research | ✅ Keep |
| proactive-work-session | Heartbeat work | ✅ Keep |
| daily-session-reset | Daily cleanup | ⚠️ Review - may be redundant |
| morning-report-compile | Build AM report | ✅ Keep |
| tts-prewarm | Warm TTS model | ⚠️ Review - is this working? |
| morning-report-deliver | Send AM report | ✅ Keep |
| morning-briefing | Another AM thing? | ⚠️ Duplicate? |
| session-size-monitor | File size check | ⚠️ Built-in memoryFlush may replace |
| system-health-audit | Health check | ✅ Keep |
| tool-update-check | Check for updates | ✅ Keep |
| weekly-maintenance | Cleanup | ✅ Keep |
| weekly-tech-digest | News digest | ✅ Keep |
| 30-day-trend-report | Monthly trends | ✅ Keep |

**Potential redundancies:**
- `session-size-monitor` - OpenClaw's `memoryFlush` (at 50k tokens) might handle this
- `morning-briefing` vs `morning-report-deliver` - seem similar?
- `daily-session-reset` - sessions auto-reset on 360min idle already

---

### 5. Memory/Compaction Config

**Current:**
```json
"compaction": {
  "mode": "safeguard",           // ✅ Has adaptive chunking built-in
  "reserveTokensFloor": 20000,   // Reserve space for response
  "memoryFlush": {
    "enabled": true,
    "softThresholdTokens": 50000, // Warn at 50k
    "prompt": "Session nearing compaction..."
  }
}
```

**Verdict:** ✅ Good config. The memoryFlush at 50k tokens gives us warning before overflow.

---

### 6. Scripts That May Be Redundant

| Script | Purpose | Status |
|--------|---------|--------|
| session-size-monitor.sh | Check file sizes | ⚠️ Redundant with built-in memoryFlush |
| test-auth-resilience.sh | Auth testing | ⚠️ May not be needed with setup tokens |

---

## 🎯 Recommendations

### Immediate (Today)
1. **No changes needed** — system is configured well
2. Config adjustments from tonight (pruning thresholds) are good

### This Week
1. **Monitor setup token auth** — confirm it stays stable without OAuth refresh
2. **Review morning jobs** — consolidate if `morning-briefing` and `morning-report-deliver` overlap

### Future Cleanup
1. Consider disabling `claude-connect` skill if setup tokens stay stable
2. Review if `session-size-monitor` cron can be removed (memoryFlush handles it)
3. Clean up `daily-session-reset` if idle-reset config handles it

---

## 📊 Version Changes Since Our Last Config Touch

We're on 2026.2.2-3, config touched 2026.1.24-3. Key changes between:
- Compaction safeguard got adaptive chunking ✅
- TTS got Edge fallback + auto modes
- Telegram DM topics as separate sessions
- Gateway config.patch for safe partial updates
- Various bug fixes

**No breaking changes requiring config updates.**

---

## ✅ Summary

**System health: GOOD**

- Adaptive compaction: ✅ Already using (safeguard mode)
- Context pruning: ✅ Configured, lowered thresholds tonight
- Auth: ✅ Setup token working
- Memory: ✅ memoryFlush enabled at 50k

**Action items:**
1. Monitor setup token stability (1 week)
2. Review cron job redundancies when convenient
3. Tonight's crisis was self-inflicted (config.schema dump), not a system bug
