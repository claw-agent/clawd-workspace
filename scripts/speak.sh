#!/bin/bash
# Claw's voice - uses Microsoft Edge TTS
# Usage: speak.sh "Text to speak" [voice] [output.wav]
#
# Voices:
#   en-US-GuyNeural (default - friendly male)
#   en-US-JennyNeural (friendly female)  
#   en-GB-RyanNeural (British male)
#   en-AU-WilliamNeural (Australian male)

TEXT="${1:-Hello, this is Claw speaking.}"
VOICE="${2:-en-US-GuyNeural}"
OUTPUT="${3:-/tmp/claw_speech.wav}"

# Use the venv with edge-tts installed
source ~/clawd/qwen-tts/venv/bin/activate
edge-tts --text "$TEXT" --voice "$VOICE" --write-media "$OUTPUT" 2>/dev/null

if [ -f "$OUTPUT" ]; then
    echo "$OUTPUT"
else
    echo "Error generating speech" >&2
    exit 1
fi
