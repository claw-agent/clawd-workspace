#!/bin/bash
# Ki Voice - TTS with Ki voice clone
# Usage: ./ki-speak.sh "Text to speak" [output.wav] [--temp 1.2] [--top-p 0.9]
#
# Auto-detects mood and adjusts settings unless you override.
# Manual overrides: --temp, --top-p, --top-k, --rep, --no-auto

set -e

TEXT="$1"
shift || true

OUTPUT="/tmp/ki_speech.wav"
TEMP=""
TOP_P=""
TOP_K=""
REP=""
NO_AUTO=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --temp|--temperature) TEMP="$2"; shift 2 ;;
        --top-p) TOP_P="$2"; shift 2 ;;
        --top-k) TOP_K="$2"; shift 2 ;;
        --rep|--repetition-penalty) REP="$2"; shift 2 ;;
        --no-auto) NO_AUTO=true; shift ;;
        *) [[ ! "$1" =~ ^-- ]] && OUTPUT="$1"; shift ;;
    esac
done

if [ -z "$TEXT" ]; then
    echo "Usage: $0 \"Text to speak\" [output.wav] [--temp X] [--top-p X]"
    exit 1
fi

mkdir -p "$(dirname "$OUTPUT")"

# Auto-detect
if [ "$NO_AUTO" = false ] && [ -z "$TEMP" ] && [ -z "$TOP_P" ] && [ -z "$TOP_K" ] && [ -z "$REP" ]; then
    ANALYSIS=$(python3 ~/clawd/scripts/tts-analyze.py "$TEXT" 2>/dev/null || echo '{}')
    if [ -n "$ANALYSIS" ] && [ "$ANALYSIS" != "{}" ]; then
        AUTO_TEMP=$(echo "$ANALYSIS" | python3 -c "import sys,json; print(json.load(sys.stdin).get('temperature', 1.0))")
        AUTO_TOP_P=$(echo "$ANALYSIS" | python3 -c "import sys,json; print(json.load(sys.stdin).get('top_p', 0.9))")
        AUTO_TOP_K=$(echo "$ANALYSIS" | python3 -c "import sys,json; print(json.load(sys.stdin).get('top_k', 50))")
        AUTO_REP=$(echo "$ANALYSIS" | python3 -c "import sys,json; print(json.load(sys.stdin).get('repetition_penalty', 1.0))")
        MOOD=$(echo "$ANALYSIS" | python3 -c "import sys,json; print(json.load(sys.stdin).get('detected_mood', 'neutral'))")
        TEMP="${TEMP:-$AUTO_TEMP}"; TOP_P="${TOP_P:-$AUTO_TOP_P}"
        TOP_K="${TOP_K:-$AUTO_TOP_K}"; REP="${REP:-$AUTO_REP}"
        echo "🎭 Auto-detected mood: $MOOD"
    fi
fi

TEMP="${TEMP:-1.0}"; TOP_P="${TOP_P:-0.9}"; TOP_K="${TOP_K:-50}"; REP="${REP:-1.0}"

REF_TEXT="I think for example, like that first clip that you put, like, the audio was really bad. I could hear like air conditioning and stuff, but I also, it still seems like I'm more monotone."

echo "🎙️ Ki Voice TTS starting..."
echo "   Text: ${TEXT:0:50}..."
echo "   Output: $OUTPUT"
echo "   Settings: temp=$TEMP, top_p=$TOP_P, top_k=$TOP_K, rep=$REP"
echo ""

cd ~/clawd/Qwen3-TTS
source .venv/bin/activate

python -u ../scripts/voice-clone.py \
    ../voices/ki_reference.wav \
    "$TEXT" \
    --ref-text "$REF_TEXT" \
    --temperature "$TEMP" \
    --top-p "$TOP_P" \
    --top-k "$TOP_K" \
    --repetition-penalty "$REP" \
    -o "$OUTPUT"

echo ""
echo "🎙️ Done! Audio saved to: $OUTPUT"
