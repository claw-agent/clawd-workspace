# OpenClaw Gateway Watchdog — @xBenJamminx

**Date:** 2026-02-09
**Source:** [Tweet thread](https://x.com/xBenJamminx/status/2020310885210722742) (Feb 8, 2026) — 835 likes, 49 RTs

## What It Is

A self-built watchdog that monitors the OpenClaw gateway process, auto-restarts it on failure, and sends notifications. Not a published repo — it's a prompt-driven solution where you ask your bot (or Claude Code) to build it for you.

## The Problem It Solves

The OpenClaw gateway crashes silently. No error, no alert. Since the gateway is the only connection between you and your bot, the bot can't tell you it's down. You only find out when messages go unanswered. Ben says his gateway went down **3 times in one week** without him knowing.

## How It Works (from thread context)

1. **Health check loop** — periodically checks if the gateway process is responding
2. **Auto-restart** — if the gateway is down, restarts it automatically
3. **Notifications** — sends an alert when a restart happens
4. **Systemd integration** (Linux) — uses systemd service status as part of the health check
5. **Error logging** — logs crash reasons for future debugging
6. **Runs as background service** — set-and-forget

Ben mentions seeing **5+ different failure modes**: shutdown, stuck, looped, orphan processes, etc. The watchdog aims to handle all of them generically rather than fixing each one.

## The Prompt (Copy-Paste)

> "My OpenClaw gateway crashes randomly and I have to manually restart it. Most of the time I don't even know it's down. Build me a watchdog that checks if the gateway is responding, auto-restarts it if it's down, and sends me a notification when it happens. Set it up to run in the background so I never have to think about it."

## Our Current Monitoring

| Feature | Us (macOS LaunchAgent) | Ben's Watchdog |
|---|---|---|
| Auto-restart on crash | ✅ `KeepAlive: true` in plist | ✅ Custom script |
| Health check (is it responding?) | ❌ No | ✅ Active probe |
| Notification on restart | ❌ No | ✅ Yes |
| Handles stuck/zombie state | ❌ No (KeepAlive only catches full exit) | ✅ Yes |
| Orphan process cleanup | ❌ No | ✅ Yes |
| Error logging | Partial (stdout/stderr to log file) | ✅ Dedicated |
| Platform | macOS LaunchAgent | Linux systemd + custom |

### Gap Analysis

Our `KeepAlive: true` handles the simple case (process exits → launchd restarts it). But it **does NOT** handle:

1. **Gateway stuck/hung** — process alive but not responding to WebSocket connections
2. **Orphan processes** — old gateway instances lingering
3. **Notification** — we have no idea when restarts happen unless we check logs
4. **Loop detection** — rapid crash-restart cycles go unnoticed

## Recommendation

Build a lightweight watchdog for our setup:

```bash
#!/bin/bash
# gateway-watchdog.sh — run via cron every 2 minutes
HEALTH=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:18789/ --max-time 5)
if [ "$HEALTH" != "200" ]; then
    echo "$(date): Gateway unhealthy (HTTP $HEALTH), restarting..." >> /tmp/openclaw/watchdog.log
    openclaw gateway restart
    # Send notification via OpenClaw (if gateway comes back) or native macOS
    osascript -e 'display notification "Gateway was down, restarted" with title "OpenClaw Watchdog"'
fi
```

**Priority: Medium** — Our KeepAlive covers most crashes. The main gap is hung processes and visibility. Worth implementing if we see unexplained bot silence.

## Community Discussion Highlights

- **@bentleypc** suggested running gateway under systemd with built-in watchdog (`WatchdogSec=`)
- **@sooyoon_eth** noted silent crashes = security blind spots
- **@IamPurkov** confirmed the watchdog auto-restarts and sends alerts
- Ben has seen 5+ distinct failure modes — this is a real, common problem
