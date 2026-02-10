#!/usr/bin/env python3
"""Generate burial scene narration in chunks using Claw voice."""
import subprocess, os, tempfile, re

text = open(os.path.expanduser("~/clawd/projects/red-rising-scenes/burial-narration.txt")).read().strip()
output = os.path.expanduser("~/clawd/projects/red-rising-scenes/burial-narration.wav")

# Split on sentence boundaries, keep chunks ~400 bytes
sentences = re.split(r'(?<=[.!?])\s+', text)
chunks = []
current = ""
for s in sentences:
    if len(current) + len(s) > 400 and current:
        chunks.append(current.strip())
        current = s + " "
    else:
        current += s + " "
if current.strip():
    chunks.append(current.strip())

print(f"Split into {len(chunks)} chunks")

tmpdir = tempfile.mkdtemp()
wavfiles = []

for i, chunk in enumerate(chunks):
    print(f"\n📝 Chunk {i+1}/{len(chunks)} ({len(chunk)} bytes):")
    print(f"   {chunk[:80]}...")
    wav = os.path.join(tmpdir, f"chunk_{i}.wav")
    
    result = subprocess.run(
        [os.path.expanduser("~/clawd/scripts/claw-speak.sh"), chunk, wav, "--no-auto"],
        capture_output=True, text=True, timeout=180
    )
    if result.returncode != 0:
        print(f"   ✗ Failed: {result.stderr[-200:]}")
        continue
    
    if os.path.exists(wav):
        wavfiles.append(wav)
        print(f"   ✓ Done")
    else:
        print(f"   ✗ No output file")

# Concatenate
if wavfiles:
    concat_file = os.path.join(tmpdir, "concat.txt")
    with open(concat_file, "w") as f:
        for w in wavfiles:
            f.write(f"file '{w}'\n")
    
    subprocess.run(["ffmpeg", "-f", "concat", "-safe", "0", "-i", concat_file, "-c", "copy", output, "-y"],
                   capture_output=True)
    
    if os.path.exists(output):
        # Get duration
        r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", 
                           "-of", "default=noprint_wrappers=1:nokey=1", output], capture_output=True, text=True)
        dur = float(r.stdout.strip())
        print(f"\n🎙️ Done! {dur:.1f}s audio saved to: {output}")
    else:
        print("❌ Concat failed")
else:
    print("❌ No chunks generated")
