#!/bin/bash
# John Voice - TTS with voice clone
# Usage: ./john-speak.sh "Text to speak" [output.wav]

set -e

TEXT="$1"
OUTPUT="${2:-/tmp/john_speech.wav}"

if [ -z "$TEXT" ]; then
    echo "Usage: $0 \"Text to speak\" [output.wav]"
    exit 1
fi

mkdir -p "$(dirname "$OUTPUT")"

echo "🎙️ John Voice TTS starting..."
echo "   Text: ${TEXT:0:50}..."
echo "   Output: $OUTPUT"

cd ~/clawd/Qwen3-TTS
source .venv/bin/activate

python -u ../scripts/voice-clone.py \
    ../voices/john_reference.wav \
    "$TEXT" \
    --temperature 1.0 \
    --top-p 0.9 \
    --top-k 50 \
    --repetition-penalty 1.0 \
    -o "$OUTPUT" \
    --simple

echo ""
echo "🎙️ Done! Audio saved to: $OUTPUT"
