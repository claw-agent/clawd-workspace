#!/bin/bash
# gateway-watchdog.sh — Monitors OpenClaw gateway health, auto-restarts if hung
# Run via cron every 2 minutes

LOG="/tmp/openclaw/watchdog.log"
mkdir -p /tmp/openclaw

# Check if gateway is actually responding (not just alive)
HEALTH=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:18789/ --max-time 5 2>/dev/null)

if [ "$HEALTH" = "200" ]; then
    exit 0
fi

# Double-check after 10 seconds to avoid false positives
sleep 10
HEALTH2=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:18789/ --max-time 5 2>/dev/null)

if [ "$HEALTH2" = "200" ]; then
    echo "$(date): Gateway recovered on recheck (was $HEALTH, now $HEALTH2)" >> "$LOG"
    exit 0
fi

echo "$(date): Gateway unhealthy twice ($HEALTH, $HEALTH2), attempting restart..." >> "$LOG"

# Kill any orphan/zombie gateway processes
pkill -f "openclaw.*gateway" 2>/dev/null
sleep 2

# Restart
openclaw gateway restart >> "$LOG" 2>&1

# Wait for it to come back
sleep 5

# Verify it recovered
RETRY=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:18789/ --max-time 5 2>/dev/null)

if [ "$RETRY" = "200" ]; then
    echo "$(date): Gateway recovered successfully" >> "$LOG"
    osascript -e 'display notification "Gateway was down — restarted successfully" with title "🦞 OpenClaw Watchdog"'
else
    echo "$(date): Gateway FAILED to recover (HTTP $RETRY)" >> "$LOG"
    osascript -e 'display notification "⚠️ Gateway restart FAILED — manual intervention needed" with title "🦞 OpenClaw Watchdog"'
fi
