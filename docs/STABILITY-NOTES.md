# Clawdbot Stability Notes

## Known Issues (as of 2026-01-24)

### 1. LaunchAgent Not Registered
**Symptom:** `Service unit not found` in logs
**Impact:** Gateway runs but isn't managed by launchd (no auto-restart on crash)
**Fix:** Run `clawdbot gateway install` (will cause restart)
**Status:** Flagged for Marb to decide when to do this

### 2. skills-remote Probe Timeouts
**Symptom:** Repeated "remote bin probe timed out" in error logs
**Impact:** Can cause delays or hangs when invoking certain tools
**Root cause:** Probing a local node that's not responding properly
**Potential fix:** 
- Check if there's a stale node config
- Disable skills-remote if not needed
- Investigate node connectivity

### 3. Shutdown Cleanup Timeouts  
**Symptom:** "shutdown timed out; exiting without full cleanup"
**Impact:** Resources may not be released cleanly on restart
**Mitigation:** The gateway does eventually restart, but might leave orphan processes

## Auto-Recovery Strategies

### What Clawdbot Already Does
- Fallback model chain (Opus → Sonnet → Haiku → Ollama)
- Retry on transient errors
- Heartbeat system to check responsiveness

### What We Could Add
1. **Self-health check** — Periodic check that gateway is responsive
2. **Watchdog script** — External script that restarts gateway if unresponsive
3. **Cleaner error handling** — Catch and recover from common failure modes
4. **Session recovery** — Better state persistence for interrupted sessions

## Logs Location
- Main log: `/tmp/clawdbot/clawdbot-YYYY-MM-DD.log`
- Error log: `~/.clawdbot/logs/gateway.err.log`

## Commands for Debugging
```bash
# Check gateway status
clawdbot gateway status

# View recent logs
tail -100 /tmp/clawdbot/clawdbot-$(date +%Y-%m-%d).log

# View errors
cat ~/.clawdbot/logs/gateway.err.log

# Restart gateway
clawdbot gateway restart
```

## Next Steps
1. [ ] Install gateway service properly (with Marb's approval)
2. [ ] Investigate skills-remote probe issue
3. [ ] Consider adding watchdog script
