#!/bin/bash
# Qwen3-TTS Voice Cloning - Convenience Wrapper
#
# Usage: ./qwen-clone.sh <reference_audio> "<text>" [options]
# 
# Examples:
#   ./qwen-clone.sh voice.wav "Hello world"
#   ./qwen-clone.sh voice.wav "Hello world" -o output.wav
#   ./qwen-clone.sh voice.wav "Hello world" --simple

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
QWEN_DIR="$HOME/clawd/Qwen3-TTS"

if [ ! -d "$QWEN_DIR/.venv" ]; then
    echo "Error: Qwen3-TTS not set up. Run setup first."
    exit 1
fi

cd "$QWEN_DIR"
source .venv/bin/activate
python "$SCRIPT_DIR/voice-clone.py" "$@"
