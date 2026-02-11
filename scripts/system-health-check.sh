#!/usr/bin/env bash
# system-health-check.sh — Comprehensive system health report
set -uo pipefail

CLAWD="$HOME/clawd"
NOW=$(date '+%Y-%m-%d %H:%M:%S')
SCORE=10
ISSUES=""
WARNS=""

deduct() { SCORE=$((SCORE - $1)); [ $SCORE -lt 0 ] && SCORE=0; }
add_issue() { ISSUES="${ISSUES}- 🔴 $1\n"; }
add_warn() { WARNS="${WARNS}- 🟡 $1\n"; }

# 1. DISK
DISK_USED=$(df -h / | awk 'NR==2{print $5}' | tr -d '%')
DISK_AVAIL=$(df -h / | awk 'NR==2{print $4}')
CLAWD_SIZE=$(du -sh "$CLAWD" 2>/dev/null | awk '{print $1}')
[ "$DISK_USED" -gt 90 ] && { add_issue "Disk ${DISK_USED}% full"; deduct 3; }
[ "$DISK_USED" -gt 75 ] && [ "$DISK_USED" -le 90 ] && { add_warn "Disk ${DISK_USED}% full"; deduct 1; }
LARGE_DIRS=$(du -sh "$CLAWD"/*/ 2>/dev/null | sort -rh | head -5)

# 2. GATEWAY
GW_PID=$(pgrep -f "openclaw" 2>/dev/null | head -1 || true)
[ -z "$GW_PID" ] && { add_issue "OpenClaw gateway not running"; deduct 3; }

# 3. GIT
UNCOMMITTED=0; LAST_COMMIT="unknown"; BRANCH="unknown"
if [ -d "$CLAWD/.git" ]; then
  cd "$CLAWD"
  UNCOMMITTED=$(git status --porcelain 2>/dev/null | wc -l | tr -d ' ')
  LAST_COMMIT=$(git log -1 --format='%ar' 2>/dev/null || echo "unknown")
  BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")
  [ "$UNCOMMITTED" -gt 50 ] && { add_warn "${UNCOMMITTED} uncommitted files"; deduct 1; }
fi

# 4. MEMORY
MEMORY_COUNT=$(find "$CLAWD/memory" -name "*.md" -type f 2>/dev/null | wc -l | tr -d ' ')
MEMORY_SIZE=$(du -sh "$CLAWD/memory" 2>/dev/null | awk '{print $1}')
ACTIVE_AGE="n/a"
if [ -f "$CLAWD/memory/context/active.md" ]; then
  ACTIVE_MOD=$(stat -f '%m' "$CLAWD/memory/context/active.md" 2>/dev/null || echo 0)
  AGE_HOURS=$(( ($(date +%s) - ACTIVE_MOD) / 3600 ))
  ACTIVE_AGE="${AGE_HOURS}h ago"
  [ "$AGE_HOURS" -gt 48 ] && { add_warn "active.md stale (${AGE_HOURS}h)"; deduct 1; }
fi
MEMORY_MD_SIZE=$(wc -c < "$CLAWD/MEMORY.md" 2>/dev/null | tr -d ' ' || echo 0)
[ "${MEMORY_MD_SIZE:-0}" -gt 20000 ] && add_warn "MEMORY.md large (${MEMORY_MD_SIZE} bytes)"

# 5. STALE FILES
STALE_REPORTS=$(find "$CLAWD/reports" -name "*.md" -mtime +30 -type f 2>/dev/null | wc -l | tr -d ' ')
OLD_SESSIONS=$(find "$HOME/.config/openclaw/sessions" -name "*.jsonl" -size +10M 2>/dev/null | wc -l | tr -d ' ')
[ "${OLD_SESSIONS:-0}" -gt 0 ] && add_warn "${OLD_SESSIONS} session files >10MB"

# 6. CREDENTIALS
CRED_FILES=$(find "$CLAWD/config" -name ".*-credentials" -type f 2>/dev/null | wc -l | tr -d ' ')
BAD_PERMS=$(find "$CLAWD/config" -name ".*-credentials" -type f ! -perm 600 2>/dev/null | wc -l | tr -d ' ')
[ "${BAD_PERMS:-0}" -gt 0 ] && { add_issue "${BAD_PERMS} cred files with wrong perms"; deduct 2; }

# 7. SERVICES
OLLAMA=$(pgrep -x ollama >/dev/null 2>&1 && echo "running" || echo "stopped")
DOCKER=$(pgrep -f "com.docker" >/dev/null 2>&1 && echo "running" || echo "stopped")

# 8. SKILLS
SKILL_COUNT=$(find "$CLAWD/skills" -name "SKILL.md" -type f 2>/dev/null | wc -l | tr -d ' ')

# CRON JOBS (system)
CRON_COUNT=$(crontab -l 2>/dev/null | grep -v '^#' | grep -c '[^ ]' || echo 0)

# === REPORT ===
cat <<EOF
# System Health Report
**Generated:** $NOW
**Health Score:** $SCORE/10

## Summary
| Metric | Value |
|--------|-------|
| Disk | ${DISK_USED}% used (${DISK_AVAIL} free) |
| Workspace | $CLAWD_SIZE |
| Gateway | $([ -n "$GW_PID" ] && echo "PID $GW_PID" || echo "NOT RUNNING") |
| Git | $BRANCH | $LAST_COMMIT | $UNCOMMITTED uncommitted |
| Memory | $MEMORY_COUNT files ($MEMORY_SIZE) |
| active.md | $ACTIVE_AGE |
| MEMORY.md | ${MEMORY_MD_SIZE} bytes |
| Cron (system) | $CRON_COUNT jobs |
| Credentials | $CRED_FILES files (${BAD_PERMS} bad perms) |
| Skills | $SKILL_COUNT |
| Ollama | $OLLAMA |
| Docker | $DOCKER |
| Stale reports | $STALE_REPORTS |
| Large sessions | ${OLD_SESSIONS} |

## Top Directories
\`\`\`
$LARGE_DIRS
\`\`\`
EOF

if [ -n "$ISSUES" ]; then
  echo ""
  echo "## 🔴 Issues"
  echo -e "$ISSUES"
fi

if [ -n "$WARNS" ]; then
  echo ""
  echo "## 🟡 Warnings"
  echo -e "$WARNS"
fi

if [ -z "$ISSUES" ] && [ -z "$WARNS" ]; then
  echo ""
  echo "## ✅ All Clear"
fi

echo ""
echo "Score: $SCORE/10"
