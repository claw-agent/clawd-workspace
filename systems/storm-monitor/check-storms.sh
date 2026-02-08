#!/bin/bash
# Quick storm check for Utah
# Usage: ./check-storms.sh [additional-states]

cd "$(dirname "$0")"
source ~/clawd/.venv/bin/activate

AREAS="${1:-UT}"
python storm_monitor.py --check --areas "$AREAS"
