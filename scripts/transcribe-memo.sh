#!/bin/bash
# Quick voice memo transcription
# Usage: transcribe-memo.sh <audio_file>

set -e

SCRIPT_DIR="$(dirname "$0")"
VENV="${HOME}/clawd/.venv"

if [ -z "$1" ]; then
    echo "Usage: transcribe-memo.sh <audio_file>"
    echo "       transcribe-memo.sh --watch  # Watch inbox folder"
    exit 1
fi

# Activate venv and run processor
source "${VENV}/bin/activate"

if [ "$1" = "--watch" ]; then
    python3 "${SCRIPT_DIR}/process-voice-memo.py" --watch ~/clawd/voice-memos/inbox
else
    python3 "${SCRIPT_DIR}/process-voice-memo.py" "$1"
fi
