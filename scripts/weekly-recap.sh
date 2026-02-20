#!/usr/bin/env bash
# weekly-recap.sh — Generate a "what got done this week" recap
# Usage: weekly-recap.sh [YYYY-MM-DD] (defaults to current week ending today)
# Output: ~/clawd/reports/weekly-recap-YYYY-WNN.md

set -euo pipefail

END_DATE="${1:-$(date +%Y-%m-%d)}"
# Calculate start of week (Monday)
if [[ "$(uname)" == "Darwin" ]]; then
  DOW=$(date -j -f "%Y-%m-%d" "$END_DATE" "+%u") # 1=Mon 7=Sun
  START_DATE=$(date -j -v-$((DOW - 1))d -f "%Y-%m-%d" "$END_DATE" "+%Y-%m-%d")
  WEEK_NUM=$(date -j -f "%Y-%m-%d" "$END_DATE" "+%V")
  YEAR=$(date -j -f "%Y-%m-%d" "$END_DATE" "+%Y")
  # Generate date range
  DATES=()
  for i in $(seq 0 6); do
    D=$(date -j -v+${i}d -f "%Y-%m-%d" "$START_DATE" "+%Y-%m-%d")
    [[ "$D" > "$END_DATE" ]] && break
    DATES+=("$D")
  done
else
  DOW=$(date -d "$END_DATE" "+%u")
  START_DATE=$(date -d "$END_DATE -$((DOW - 1)) days" "+%Y-%m-%d")
  WEEK_NUM=$(date -d "$END_DATE" "+%V")
  YEAR=$(date -d "$END_DATE" "+%Y")
  DATES=()
  for i in $(seq 0 6); do
    D=$(date -d "$START_DATE +${i} days" "+%Y-%m-%d")
    [[ "$D" > "$END_DATE" ]] && break
    DATES+=("$D")
  done
fi

OUTDIR=~/clawd/reports
mkdir -p "$OUTDIR"
OUTFILE="$OUTDIR/weekly-recap-${YEAR}-W${WEEK_NUM}.md"

CLAWD=~/clawd

{
  echo "# Weekly Recap — ${YEAR} W${WEEK_NUM}"
  echo "*${START_DATE} → ${END_DATE}*"
  echo ""

  # --- Daily Notes Summary ---
  echo "## 📅 Daily Highlights"
  echo ""
  for D in "${DATES[@]}"; do
    DAILY="$CLAWD/memory/${D}.md"
    if [[ -f "$DAILY" ]]; then
      echo "### ${D}"
      # Extract headers and key bullets (first 2 levels)
      grep -E '^#{1,3} |^- \*\*|^- \[x\]' "$DAILY" 2>/dev/null | head -20
      echo ""
    fi
  done

  # --- Git Activity ---
  echo "## 🔀 Git Activity"
  echo ""
  NEXT_DAY=$(date -j -v+1d -f "%Y-%m-%d" "$END_DATE" "+%Y-%m-%d" 2>/dev/null || date -d "$END_DATE +1 day" "+%Y-%m-%d")
  cd "$CLAWD"
  git log --oneline --since="$START_DATE" --until="$NEXT_DAY" 2>/dev/null | head -40
  echo ""

  COMMIT_COUNT=$(git log --oneline --since="$START_DATE" --until="$NEXT_DAY" 2>/dev/null | wc -l | tr -d ' ')
  FILES_CHANGED=$(git log --stat --since="$START_DATE" --until="$NEXT_DAY" 2>/dev/null | grep "files changed" | tail -1 || echo "n/a")
  echo ""
  echo "**Commits:** ${COMMIT_COUNT}"
  echo ""

  # --- Proactive Work ---
  echo "## 🔧 Proactive Work Completed"
  echo ""
  # Pull from PROACTIVE-IDEAS.md completed table for this week's dates
  for D in "${DATES[@]}"; do
    grep "$D" "$CLAWD/PROACTIVE-IDEAS.md" 2>/dev/null || true
  done
  echo ""

  # --- Decisions Made ---
  echo "## 🧭 Decisions"
  echo ""
  for D in "${DATES[@]}"; do
    for F in "$CLAWD/memory/decisions/${D}"*.md; do
      [[ -f "$F" ]] || continue
      FNAME=$(basename "$F" .md)
      TITLE=$(head -1 "$F" | sed 's/^# //')
      echo "- **${FNAME}**: ${TITLE}"
    done
  done
  echo ""

  # --- Lessons Learned ---
  echo "## 📚 Lessons"
  echo ""
  for D in "${DATES[@]}"; do
    for F in "$CLAWD/memory/lessons/${D}"*.md; do
      [[ -f "$F" ]] || continue
      FNAME=$(basename "$F" .md)
      TITLE=$(head -1 "$F" | sed 's/^# //')
      echo "- **${FNAME}**: ${TITLE}"
    done
  done
  echo ""

  echo "---"
  echo "*Generated $(date '+%Y-%m-%d %H:%M') by weekly-recap.sh*"

} > "$OUTFILE"

echo "✅ Recap written to $OUTFILE"
echo "$(wc -l < "$OUTFILE" | tr -d ' ') lines"
