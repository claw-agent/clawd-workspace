#!/bin/bash
# Activity tracer — logs subagent spawns and key events to JSONL
# Usage: trace-activity.sh <event_type> <description> [extra_json]
# Example: trace-activity.sh spawn "Research roofing competitors" '{"agent":"researcher"}'

TRACE_DIR="$HOME/clawd/memory/traces"
TRACE_FILE="$TRACE_DIR/$(date +%Y-%m-%d).jsonl"
mkdir -p "$TRACE_DIR"

EVENT_TYPE="${1:-unknown}"
DESCRIPTION="${2:-}"
EXTRA="${3:-{}}"
TIMESTAMP=$(date -u +%Y-%m-%dT%H:%M:%SZ)

# Build JSON entry
echo "{\"ts\":\"$TIMESTAMP\",\"type\":\"$EVENT_TYPE\",\"desc\":\"$DESCRIPTION\",\"data\":$EXTRA}" >> "$TRACE_FILE"

echo "Traced: $EVENT_TYPE — $DESCRIPTION"
