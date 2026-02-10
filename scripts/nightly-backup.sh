#!/bin/bash
# nightly-backup.sh — Commit and push workspace to GitHub
# Run via cron at 3am nightly

cd /Users/marbagent/clawd || exit 1

LOG="/tmp/openclaw/backup.log"
mkdir -p /tmp/openclaw

echo "$(date): Starting nightly backup..." >> "$LOG"

# Stage all changes (respects .gitignore)
git add -A 2>> "$LOG"

# Check if there's anything to commit
if git diff --cached --quiet 2>/dev/null; then
    echo "$(date): No changes to commit" >> "$LOG"
    exit 0
fi

# Commit with date
git commit -m "nightly backup $(date +%Y-%m-%d)" --quiet 2>> "$LOG"

# Push
if git push origin main --quiet 2>> "$LOG"; then
    echo "$(date): Backup pushed successfully" >> "$LOG"
else
    echo "$(date): ERROR — push failed" >> "$LOG"
fi
