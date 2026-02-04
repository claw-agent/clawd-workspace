#!/bin/bash
# Weekly Clawdbot maintenance - prevents buildup

echo "=== Clawdbot Weekly Maintenance ==="
echo "Date: $(date)"

# 1. Clean orphan session files (keep only active ones)
ACTIVE=$(cat ~/.clawdbot/agents/main/sessions/sessions.json | jq -r '.[] | .sessionId // empty' 2>/dev/null | sort | uniq)
echo "$ACTIVE" > /tmp/active-sessions.txt

CLEANED=0
for f in ~/.clawdbot/agents/main/sessions/*.jsonl; do
  SESSION_ID=$(basename "$f" .jsonl)
  if ! grep -q "$SESSION_ID" /tmp/active-sessions.txt 2>/dev/null; then
    rm "$f" 2>/dev/null && ((CLEANED++))
  fi
done
echo "✅ Cleaned $CLEANED orphan sessions"

# 2. Remove .deleted session files
rm -f ~/.clawdbot/agents/main/sessions/*.deleted.* 2>/dev/null
echo "✅ Removed .deleted files"

# 3. Clean Downloads of old clawdbot versions
rm -rf ~/Downloads/clawdbot-*.tar.gz 2>/dev/null
rm -rf ~/Downloads/clawdbot-2*/  2>/dev/null
rm -rf ~/Downloads/Clawdbot-*.dmg 2>/dev/null
echo "✅ Cleaned old downloads"

# 4. Report session sizes
echo ""
echo "=== Session Health ==="
echo "Active sessions: $(ls ~/.clawdbot/agents/main/sessions/*.jsonl 2>/dev/null | wc -l | tr -d ' ')"
echo "Total size: $(du -sh ~/.clawdbot/agents/main/sessions/ 2>/dev/null | cut -f1)"

# 5. Largest session warning
LARGEST=$(ls -lS ~/.clawdbot/agents/main/sessions/*.jsonl 2>/dev/null | head -1 | awk '{print $5/1024/1024 "MB", $9}')
echo "Largest session: $LARGEST"

echo ""
echo "=== Maintenance Complete ==="
