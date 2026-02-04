#!/bin/bash
# Troy Voice - TTS with Troy voice clone
# Usage: ./troy-speak.sh "Text to speak" [output.wav] [--temp 1.2] [--top-p 0.9]
#
# Auto-detects mood and adjusts settings unless you override:
#   - Love/romantic → warm, expressive
#   - Funny/playful → varied, energetic  
#   - Dramatic → bold, focused
#   - Serious → consistent, professional
#   - Sad → subdued, emotional
#
# Manual overrides:
#   --temp, --temperature  Expressiveness (0.7=flat, 1.0=normal, 1.3=dramatic)
#   --top-p                Diversity (0.8=focused, 0.9=balanced, 0.95=varied)
#   --top-k                Token choices (lower=predictable, default 50)
#   --rep, --repetition-penalty  Reduce repetition (1.0=off, 1.2=moderate)
#   --no-auto              Disable auto-detection, use defaults

set -e

TEXT="$1"
shift || true

# Default output
OUTPUT="/tmp/troy_speech.wav"

# Will be set by auto-detection or manual override
TEMP=""
TOP_P=""
TOP_K=""
REP=""
NO_AUTO=false

# Parse remaining args
while [[ $# -gt 0 ]]; do
    case $1 in
        --temp|--temperature)
            TEMP="$2"
            shift 2
            ;;
        --top-p)
            TOP_P="$2"
            shift 2
            ;;
        --top-k)
            TOP_K="$2"
            shift 2
            ;;
        --rep|--repetition-penalty)
            REP="$2"
            shift 2
            ;;
        --no-auto)
            NO_AUTO=true
            shift
            ;;
        *)
            if [[ ! "$1" =~ ^-- ]]; then
                OUTPUT="$1"
            fi
            shift
            ;;
    esac
done

if [ -z "$TEXT" ]; then
    echo "Usage: $0 \"Text to speak\" [output.wav] [options]"
    echo ""
    echo "Auto-detects mood from text and adjusts voice accordingly."
    echo ""
    echo "Options:"
    echo "  --temp      Override expressiveness (0.7-1.3)"
    echo "  --top-p     Override diversity (0.8-0.95)"
    echo "  --top-k     Override token limit"
    echo "  --rep       Override repetition penalty"
    echo "  --no-auto   Disable auto-detection"
    exit 1
fi

# Ensure output directory exists
mkdir -p "$(dirname "$OUTPUT")"

# Auto-detect settings if not manually specified
if [ "$NO_AUTO" = false ] && [ -z "$TEMP" ] && [ -z "$TOP_P" ] && [ -z "$TOP_K" ] && [ -z "$REP" ]; then
    ANALYSIS=$(python3 ~/clawd/scripts/tts-analyze.py "$TEXT" 2>/dev/null || echo '{}')
    
    if [ -n "$ANALYSIS" ] && [ "$ANALYSIS" != "{}" ]; then
        AUTO_TEMP=$(echo "$ANALYSIS" | python3 -c "import sys,json; print(json.load(sys.stdin).get('temperature', 1.0))")
        AUTO_TOP_P=$(echo "$ANALYSIS" | python3 -c "import sys,json; print(json.load(sys.stdin).get('top_p', 0.9))")
        AUTO_TOP_K=$(echo "$ANALYSIS" | python3 -c "import sys,json; print(json.load(sys.stdin).get('top_k', 50))")
        AUTO_REP=$(echo "$ANALYSIS" | python3 -c "import sys,json; print(json.load(sys.stdin).get('repetition_penalty', 1.0))")
        MOOD=$(echo "$ANALYSIS" | python3 -c "import sys,json; print(json.load(sys.stdin).get('detected_mood', 'neutral'))")
        
        TEMP="${TEMP:-$AUTO_TEMP}"
        TOP_P="${TOP_P:-$AUTO_TOP_P}"
        TOP_K="${TOP_K:-$AUTO_TOP_K}"
        REP="${REP:-$AUTO_REP}"
        
        echo "🎭 Auto-detected mood: $MOOD"
    fi
fi

# Fall back to defaults if still not set
TEMP="${TEMP:-1.0}"
TOP_P="${TOP_P:-0.9}"
TOP_K="${TOP_K:-50}"
REP="${REP:-1.0}"

# Reference transcript for better voice matching
REF_TEXT="Okay, I think it's our father who art in heaven, how would he be my name? The kingdom come, I will be done on Earth as it is in heaven. Give us this day or daily bread, and lead us not into temptation."

echo "🎙️ Troy Voice TTS starting..."
echo "   Text: ${TEXT:0:50}..."
echo "   Output: $OUTPUT"
echo "   Settings: temp=$TEMP, top_p=$TOP_P, top_k=$TOP_K, rep=$REP"
echo ""

cd ~/clawd/Qwen3-TTS
source .venv/bin/activate

python -u ../scripts/voice-clone.py \
    ../voices/troy_reference.wav \
    "$TEXT" \
    --ref-text "$REF_TEXT" \
    --temperature "$TEMP" \
    --top-p "$TOP_P" \
    --top-k "$TOP_K" \
    --repetition-penalty "$REP" \
    -o "$OUTPUT"

echo ""
echo "🎙️ Done! Audio saved to: $OUTPUT"
