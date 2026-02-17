#!/bin/bash
# Write a context manifest — what's currently loaded and relevant
# Called by compound review or pre-compaction flush
# Output: ~/clawd/memory/context/manifest.json

set -euo pipefail

MANIFEST="$HOME/clawd/memory/context/manifest.json"
DATE=$(date +%Y-%m-%d)
TIME=$(date +%H:%M:%S)

# Gather current state
ACTIVE_CRONS=$(cd "$HOME/clawd" && cat <<'EOF'
Check cron list for active jobs
EOF
)

# Recent files modified in the last 24h (workspace only)
RECENT_FILES=$(find "$HOME/clawd" -name "*.md" -mtime -1 -not -path "*/node_modules/*" -not -path "*/.venv/*" 2>/dev/null | sort | head -20)

# Current active.md hash for change detection
ACTIVE_HASH=""
if [ -f "$HOME/clawd/memory/context/active.md" ]; then
  ACTIVE_HASH=$(md5 -q "$HOME/clawd/memory/context/active.md" 2>/dev/null || echo "unknown")
fi

cat > "$MANIFEST" << ENDJSON
{
  "timestamp": "${DATE}T${TIME}",
  "session_context": {
    "active_md_hash": "$ACTIVE_HASH",
    "memory_md_size": $(wc -c < "$HOME/clawd/MEMORY.md" 2>/dev/null || echo 0),
    "facts_md_size": $(wc -c < "$HOME/clawd/memory/facts.md" 2>/dev/null || echo 0),
    "episodic_md_size": $(wc -c < "$HOME/clawd/memory/episodic.md" 2>/dev/null || echo 0)
  },
  "recent_daily_notes": [
    "memory/${DATE}.md",
    "memory/$(date -v-1d +%Y-%m-%d 2>/dev/null || date -d 'yesterday' +%Y-%m-%d).md",
    "memory/$(date -v-2d +%Y-%m-%d 2>/dev/null || date -d '2 days ago' +%Y-%m-%d).md"
  ],
  "recently_modified_files": [
$(echo "$RECENT_FILES" | sed 's|'"$HOME/clawd/"'||g' | while read -r f; do echo "    \"$f\","; done | sed '$ s/,$//')
  ]
}
ENDJSON

echo "Manifest written to $MANIFEST"
