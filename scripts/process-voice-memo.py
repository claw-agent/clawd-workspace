#!/usr/bin/env python3
"""
Voice Memo Processor
Transcribes audio files and generates summaries.

Usage:
    python3 process-voice-memo.py <audio_file> [--output-dir <dir>]
    python3 process-voice-memo.py --watch <dir>  # Watch mode

Features:
- Transcription via mlx_whisper (Apple Silicon native)
- Key points extraction
- Action items detection
- Organized output (transcript + summary)
"""

import argparse
import os
import sys
import subprocess
import json
from datetime import datetime
from pathlib import Path
import time
import re

# Supported audio formats
AUDIO_EXTENSIONS = {'.ogg', '.mp3', '.wav', '.m4a', '.webm', '.flac', '.opus'}

def transcribe_audio(audio_path: str) -> str:
    """Transcribe audio using mlx_whisper."""
    print(f"📝 Transcribing: {audio_path}")
    
    # Get output directory
    output_dir = os.path.dirname(audio_path) or '.'
    
    # mlx_whisper outputs to specified directory with .txt extension
    result = subprocess.run(
        [
            'mlx_whisper',
            audio_path,
            '--model', 'mlx-community/whisper-large-v3-turbo',
            '--output-dir', output_dir,
            '--output-format', 'txt'
        ],
        capture_output=True,
        text=True
    )
    
    if result.returncode != 0:
        print(f"❌ Transcription failed: {result.stderr}")
        return None
    
    # Read the generated transcript
    base_name = os.path.splitext(audio_path)[0]
    txt_path = f"{base_name}.txt"
    
    if os.path.exists(txt_path):
        with open(txt_path, 'r') as f:
            transcript = f.read().strip()
        # Clean up the auto-generated file
        os.remove(txt_path)
        return transcript
    
    print(f"❌ Transcript file not found: {txt_path}")
    return None


def extract_summary(transcript: str, audio_filename: str) -> dict:
    """Extract key points and action items from transcript."""
    print("🧠 Analyzing transcript...")
    
    # Use Claude via the Clawdbot API or fall back to local summary
    # For now, do a simple extraction (can upgrade to LLM later)
    
    lines = transcript.split('.')
    
    # Basic extraction
    summary = {
        'filename': audio_filename,
        'timestamp': datetime.now().isoformat(),
        'word_count': len(transcript.split()),
        'duration_estimate': f"~{len(transcript.split()) // 150} min",  # ~150 wpm
        'transcript': transcript,
        'key_points': [],
        'action_items': [],
        'people_mentioned': [],
        'topics': []
    }
    
    # Extract potential action items (sentences with action words)
    action_words = ['need to', 'should', 'will', 'must', 'have to', 'going to', 
                    'want to', 'plan to', 'remind', 'don\'t forget', 'remember to',
                    'todo', 'follow up', 'schedule', 'call', 'email', 'send']
    
    for sentence in lines:
        sentence = sentence.strip()
        if not sentence:
            continue
        lower = sentence.lower()
        for word in action_words:
            if word in lower:
                summary['action_items'].append(sentence)
                break
    
    # Deduplicate action items
    summary['action_items'] = list(set(summary['action_items']))[:10]
    
    # Extract topics (simple noun extraction - first 5 capitalized words that aren't "I")
    words = transcript.split()
    potential_topics = []
    for word in words:
        clean = re.sub(r'[^\w]', '', word)
        if clean and clean[0].isupper() and clean.lower() not in ['i', 'the', 'a', 'an']:
            potential_topics.append(clean)
    
    # Get unique topics, preserve order
    seen = set()
    for topic in potential_topics:
        if topic not in seen and len(summary['topics']) < 5:
            summary['topics'].append(topic)
            seen.add(topic)
    
    return summary


def save_output(summary: dict, output_dir: str) -> str:
    """Save transcript and summary to organized files."""
    os.makedirs(output_dir, exist_ok=True)
    
    # Create filename from timestamp
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    base_name = os.path.splitext(summary['filename'])[0]
    safe_name = re.sub(r'[^\w\-]', '_', base_name)[:30]
    
    output_name = f"{timestamp}_{safe_name}"
    
    # Save markdown summary
    md_path = os.path.join(output_dir, f"{output_name}.md")
    
    md_content = f"""# Voice Memo: {summary['filename']}

**Processed:** {summary['timestamp']}
**Duration:** {summary['duration_estimate']} ({summary['word_count']} words)

## Summary

"""
    
    if summary['topics']:
        md_content += f"**Topics:** {', '.join(summary['topics'])}\n\n"
    
    if summary['action_items']:
        md_content += "### Action Items\n\n"
        for item in summary['action_items']:
            md_content += f"- [ ] {item}\n"
        md_content += "\n"
    
    md_content += f"""## Full Transcript

{summary['transcript']}

---
*Auto-processed by voice-memo-processor*
"""
    
    with open(md_path, 'w') as f:
        f.write(md_content)
    
    # Also save JSON for programmatic access
    json_path = os.path.join(output_dir, f"{output_name}.json")
    with open(json_path, 'w') as f:
        json.dump(summary, f, indent=2)
    
    print(f"✅ Saved: {md_path}")
    return md_path


def process_file(audio_path: str, output_dir: str) -> bool:
    """Process a single audio file."""
    if not os.path.exists(audio_path):
        print(f"❌ File not found: {audio_path}")
        return False
    
    ext = os.path.splitext(audio_path)[1].lower()
    if ext not in AUDIO_EXTENSIONS:
        print(f"⚠️ Unsupported format: {ext}")
        return False
    
    # Transcribe
    transcript = transcribe_audio(audio_path)
    if not transcript:
        return False
    
    # Extract summary
    filename = os.path.basename(audio_path)
    summary = extract_summary(transcript, filename)
    
    # Save output
    save_output(summary, output_dir)
    
    return True


def watch_directory(watch_dir: str, output_dir: str, interval: int = 30):
    """Watch a directory for new audio files."""
    print(f"👀 Watching {watch_dir} for new audio files...")
    print(f"   Output: {output_dir}")
    print(f"   Interval: {interval}s")
    print("   Press Ctrl+C to stop\n")
    
    processed = set()
    processed_file = os.path.join(output_dir, '.processed')
    
    # Load previously processed files
    if os.path.exists(processed_file):
        with open(processed_file, 'r') as f:
            processed = set(f.read().splitlines())
    
    try:
        while True:
            for filename in os.listdir(watch_dir):
                filepath = os.path.join(watch_dir, filename)
                ext = os.path.splitext(filename)[1].lower()
                
                if ext in AUDIO_EXTENSIONS and filepath not in processed:
                    print(f"\n🆕 New file detected: {filename}")
                    
                    if process_file(filepath, output_dir):
                        processed.add(filepath)
                        with open(processed_file, 'a') as f:
                            f.write(filepath + '\n')
            
            time.sleep(interval)
    except KeyboardInterrupt:
        print("\n👋 Stopping watch mode")


def main():
    parser = argparse.ArgumentParser(description='Process voice memos')
    parser.add_argument('input', nargs='?', help='Audio file to process')
    parser.add_argument('--output-dir', '-o', default='~/clawd/voice-memos/processed',
                        help='Output directory for processed files')
    parser.add_argument('--watch', '-w', metavar='DIR',
                        help='Watch directory for new files')
    parser.add_argument('--interval', '-i', type=int, default=30,
                        help='Watch interval in seconds (default: 30)')
    
    args = parser.parse_args()
    
    output_dir = os.path.expanduser(args.output_dir)
    
    if args.watch:
        watch_dir = os.path.expanduser(args.watch)
        if not os.path.isdir(watch_dir):
            print(f"❌ Watch directory not found: {watch_dir}")
            sys.exit(1)
        watch_directory(watch_dir, output_dir, args.interval)
    elif args.input:
        input_path = os.path.expanduser(args.input)
        success = process_file(input_path, output_dir)
        sys.exit(0 if success else 1)
    else:
        parser.print_help()
        print("\nExamples:")
        print("  python3 process-voice-memo.py recording.ogg")
        print("  python3 process-voice-memo.py --watch ~/Downloads")
        sys.exit(1)


if __name__ == '__main__':
    main()
