#!/bin/bash
# Storm Pipeline — Monitor + Dispatch in one step
# Designed for cron execution
#
# Usage:
#   ./storm-pipeline.sh              # Check + dry-run dispatch
#   ./storm-pipeline.sh --execute    # Check + live dispatch
#   ./storm-pipeline.sh --areas UT,CO --execute

set -euo pipefail
DIR="$(cd "$(dirname "$0")" && pwd)"
VENV="$HOME/clawd/.venv/bin/activate"
LOG="$DIR/pipeline.log"

echo "$(date '+%Y-%m-%d %H:%M') — Storm pipeline starting" >> "$LOG"

# Activate venv
source "$VENV"

# Parse args
AREAS="${STORM_AREAS:-UT}"
EXECUTE=""
for arg in "$@"; do
    case "$arg" in
        --execute) EXECUTE="--execute" ;;
        --areas=*) AREAS="${arg#--areas=}" ;;
        --areas) shift; AREAS="$1" ;;
    esac
done

# Step 1: Check for storms
echo "--- Checking storms (areas: $AREAS) ---" >> "$LOG"
python "$DIR/storm_monitor.py" --check --areas "$AREAS" 2>&1 | tee -a "$LOG"

# Step 2: Dispatch any new campaigns
echo "--- Dispatching campaigns ---" >> "$LOG"
python "$DIR/dispatcher.py" --pending --channels notification $EXECUTE 2>&1 | tee -a "$LOG"

echo "$(date '+%Y-%m-%d %H:%M') — Pipeline complete" >> "$LOG"
