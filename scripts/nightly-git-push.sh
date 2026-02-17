#!/bin/bash
# Nightly auto-commit + push for ~/clawd workspace
# Designed to run via cron. Commits only if there are changes.

set -euo pipefail
cd ~/clawd

# Check for changes
if git diff --quiet && git diff --cached --quiet && [ -z "$(git ls-files --others --exclude-standard)" ]; then
  echo "No changes to commit."
  exit 0
fi

# Stage everything
git add -A

# Generate commit message from changed files
CHANGED=$(git diff --cached --name-only | head -10)
COUNT=$(git diff --cached --name-only | wc -l | tr -d ' ')
DATE=$(date +%Y-%m-%d)

if [ "$COUNT" -le 3 ]; then
  MSG="auto: ${DATE} — ${CHANGED//$'\n'/, }"
else
  MSG="auto: ${DATE} — ${COUNT} files updated"
fi

git commit -m "$MSG"
git push origin main 2>/dev/null || git push 2>/dev/null || echo "Push failed (no remote or auth issue)"

echo "Committed: $MSG"
