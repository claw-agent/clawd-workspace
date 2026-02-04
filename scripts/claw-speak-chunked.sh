#!/bin/bash
# Claw Voice - Chunked TTS for long texts
# Splits text into ~500 byte chunks, generates each, concatenates
# Usage: ./claw-speak-chunked.sh "Long text" output.wav

set -e

TEXT="$1"
OUTPUT="${2:-/tmp/claw_speech.wav}"
CHUNK_SIZE=500  # bytes per chunk (roughly 20-30 seconds of speech)

if [ -z "$TEXT" ]; then
    echo "Usage: $0 \"Text to speak\" [output.wav]"
    exit 1
fi

# Create temp directory
TMPDIR=$(mktemp -d)
trap "rm -rf $TMPDIR" EXIT

echo "🎙️ Claw Voice (Chunked) starting..."
echo "   Total text: ${#TEXT} bytes"
echo "   Output: $OUTPUT"

# Split text into chunks at sentence boundaries
# This awk script splits on ". " but keeps chunks under CHUNK_SIZE
echo "$TEXT" | awk -v size=$CHUNK_SIZE '
BEGIN { RS="\\.[ \n]"; ORS=""; chunk=""; n=1 }
{
    if (length(chunk) + length($0) > size && chunk != "") {
        print chunk > "/dev/stderr"
        printf "%s", chunk > "chunk_" n ".txt"
        n++
        chunk = $0 ". "
    } else {
        chunk = chunk $0 ". "
    }
}
END {
    if (chunk != "") {
        printf "%s", chunk > "chunk_" n ".txt"
    }
    print n > "num_chunks.txt"
}
' 2>/dev/null

# Count chunks by looking at files created
cd "$TMPDIR" 2>/dev/null || true
NUM_CHUNKS=$(ls chunk_*.txt 2>/dev/null | wc -l | tr -d ' ')

if [ "$NUM_CHUNKS" -eq 0 ]; then
    # Fallback: just write the whole thing as one chunk
    echo "$TEXT" > "$TMPDIR/chunk_1.txt"
    NUM_CHUNKS=1
fi

# Actually split text properly using Python
cd ~
python3 << PYEOF
import re
import os

text = '''$TEXT'''
chunk_size = $CHUNK_SIZE
tmpdir = "$TMPDIR"

# Split on sentence boundaries
sentences = re.split(r'(?<=[.!?])\s+', text)
chunks = []
current = ""

for s in sentences:
    if len(current) + len(s) > chunk_size and current:
        chunks.append(current.strip())
        current = s + " "
    else:
        current += s + " "

if current.strip():
    chunks.append(current.strip())

# Write chunks
for i, chunk in enumerate(chunks, 1):
    with open(f"{tmpdir}/chunk_{i}.txt", "w") as f:
        f.write(chunk)

print(f"Split into {len(chunks)} chunks")
PYEOF

NUM_CHUNKS=$(ls "$TMPDIR"/chunk_*.txt 2>/dev/null | wc -l | tr -d ' ')
echo "   Chunks: $NUM_CHUNKS"

# Generate each chunk
CONCAT_LIST="$TMPDIR/concat.txt"
> "$CONCAT_LIST"

for i in $(seq 1 $NUM_CHUNKS); do
    CHUNK_FILE="$TMPDIR/chunk_$i.txt"
    CHUNK_WAV="$TMPDIR/chunk_$i.wav"
    
    if [ -f "$CHUNK_FILE" ]; then
        CHUNK_TEXT=$(cat "$CHUNK_FILE")
        echo ""
        echo "📝 Chunk $i/$NUM_CHUNKS (${#CHUNK_TEXT} bytes)..."
        
        # Generate with claw-speak
        ~/clawd/scripts/claw-speak.sh "$CHUNK_TEXT" "$CHUNK_WAV" --no-auto
        
        if [ -f "$CHUNK_WAV" ]; then
            echo "file '$CHUNK_WAV'" >> "$CONCAT_LIST"
            echo "   ✓ Chunk $i done"
        else
            echo "   ✗ Chunk $i failed!"
            exit 1
        fi
    fi
done

# Concatenate all chunks
echo ""
echo "🔗 Concatenating $NUM_CHUNKS chunks..."
ffmpeg -f concat -safe 0 -i "$CONCAT_LIST" -c copy "$OUTPUT" -y 2>/dev/null

if [ -f "$OUTPUT" ]; then
    DURATION=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$OUTPUT" 2>/dev/null | cut -d. -f1)
    echo ""
    echo "🎙️ Done! ${DURATION}s audio saved to: $OUTPUT"
else
    echo "❌ Failed to create output file"
    exit 1
fi
