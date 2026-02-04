#!/usr/bin/env python3
"""
Qwen3-TTS Voice Cloning Script
Clone a voice from a 3+ second audio sample and generate new speech.

Usage:
    cd ~/clawd/Qwen3-TTS
    source .venv/bin/activate
    
    # Basic usage (reference audio + text to speak):
    python ../scripts/voice-clone.py ref_audio.wav "Hello, this is my cloned voice!"
    
    # With transcript of reference audio (better quality):
    python ../scripts/voice-clone.py ref_audio.wav "Hello world" --ref-text "The original text spoken in the reference"
    
    # Custom output path:
    python ../scripts/voice-clone.py ref_audio.wav "Hello world" -o output.wav
    
    # Simple mode (no transcript, lower quality but easier):
    python ../scripts/voice-clone.py ref_audio.wav "Hello world" --simple

Models will be downloaded automatically on first run (~3.5GB for Base model).
"""

import os
import sys
import time
import argparse

import torch
import soundfile as sf
from qwen_tts import Qwen3TTSModel

# Global model cache to avoid reloading
_model = None

def load_model():
    """Load the voice cloning model (cached)."""
    global _model
    if _model is not None:
        return _model
    
    # Detect device
    if torch.backends.mps.is_available():
        device = "mps"
        dtype = torch.float16
        print(f"Using Apple Silicon MPS")
    elif torch.cuda.is_available():
        device = "cuda:0"
        dtype = torch.bfloat16
        print(f"Using CUDA GPU")
    else:
        device = "cpu"
        dtype = torch.float32
        print(f"Using CPU (slow)")
    
    print("Loading Qwen3-TTS-12Hz-1.7B-Base model...")
    print("(First run downloads ~3.5GB)")
    
    start = time.time()
    _model = Qwen3TTSModel.from_pretrained(
        "Qwen/Qwen3-TTS-12Hz-1.7B-Base",
        device_map=device,
        dtype=dtype,
    )
    print(f"Model loaded in {time.time() - start:.1f}s")
    
    return _model

def clone_voice(
    ref_audio: str,
    text: str,
    ref_text: str = None,
    output: str = None,
    language: str = "Auto",
    simple: bool = False,
    temperature: float = 1.0,
    top_p: float = 0.9,
    top_k: int = 50,
    repetition_penalty: float = 1.0,
):
    """
    Clone a voice and generate new speech.
    
    Args:
        ref_audio: Path to reference audio file (3+ seconds recommended)
        text: Text to speak in the cloned voice
        ref_text: Transcript of the reference audio (optional but improves quality)
        output: Output path for generated audio
        language: Target language (Auto, English, Chinese, etc.)
        simple: Use simple x-vector only mode (no transcript needed)
        temperature: Sampling temperature (higher = more expressive/varied, lower = more consistent)
        top_p: Nucleus sampling (lower = more focused, higher = more diverse)
        top_k: Top-k sampling (lower = more predictable)
        repetition_penalty: Penalize repeated tokens (higher = less repetition)
    """
    model = load_model()
    
    # Validate reference audio
    if not os.path.exists(ref_audio):
        print(f"Error: Reference audio not found: {ref_audio}")
        sys.exit(1)
    
    # Default output path
    if output is None:
        output = "cloned_output.wav"
    
    print(f"\nReference audio: {ref_audio}")
    print(f"Text to speak: {text[:50]}{'...' if len(text) > 50 else ''}")
    print(f"Output: {output}")
    print(f"Mode: {'Simple (x-vector only)' if simple else 'Full ICL'}")
    print(f"Settings: temp={temperature}, top_p={top_p}, top_k={top_k}, rep_penalty={repetition_penalty}")
    print()
    
    start = time.time()
    
    # Generate with voice cloning
    wavs, sr = model.generate_voice_clone(
        text=text,
        language=language,
        ref_audio=ref_audio,
        ref_text=ref_text if not simple else None,
        x_vector_only_mode=simple,
        temperature=temperature,
        top_p=top_p,
        top_k=top_k,
        repetition_penalty=repetition_penalty,
        do_sample=True,
    )
    
    elapsed = time.time() - start
    
    # Save output
    sf.write(output, wavs[0], sr)
    
    # Calculate stats
    duration = len(wavs[0]) / sr
    rtf = elapsed / duration if duration > 0 else 0
    
    print(f"✓ Generated {duration:.1f}s audio in {elapsed:.2f}s (RTF: {rtf:.2f})")
    print(f"✓ Saved to: {output}")
    
    return output

def main():
    parser = argparse.ArgumentParser(
        description="Clone a voice and generate speech with Qwen3-TTS",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Clone voice (simple mode - no transcript needed):
  python voice-clone.py sample.wav "Hello world" --simple
  
  # Clone with reference transcript (better quality):
  python voice-clone.py sample.wav "Hello world" --ref-text "The original speech in sample"
  
  # More expressive/dramatic (higher temperature):
  python voice-clone.py sample.wav "Hello world" --temperature 1.3
  
  # More consistent/predictable (lower temperature):
  python voice-clone.py sample.wav "Hello world" --temperature 0.7
  
  # Reduce repetition in longer text:
  python voice-clone.py sample.wav "Long text here..." --repetition-penalty 1.2
  
Tips:
  - Reference audio should be 3-10 seconds
  - Clear audio without background noise works best
  - Providing ref-text significantly improves quality
  - Temperature: 0.7=consistent, 1.0=balanced, 1.3=expressive
  - Top-p: 0.8=focused, 0.9=balanced, 0.95=diverse
        """
    )
    
    parser.add_argument("ref_audio", help="Path to reference audio file")
    parser.add_argument("text", help="Text to speak in cloned voice")
    parser.add_argument("--ref-text", "-t", help="Transcript of reference audio (improves quality)")
    parser.add_argument("--output", "-o", help="Output audio path (default: cloned_output.wav)")
    parser.add_argument("--language", "-l", default="Auto", help="Language: Auto, English, Chinese, etc.")
    parser.add_argument("--simple", "-s", action="store_true", help="Simple mode (x-vector only, no transcript needed)")
    parser.add_argument("--temperature", "--temp", type=float, default=1.0, 
                        help="Sampling temperature: higher=expressive, lower=consistent (default: 1.0)")
    parser.add_argument("--top-p", type=float, default=0.9,
                        help="Nucleus sampling: lower=focused, higher=diverse (default: 0.9)")
    parser.add_argument("--top-k", type=int, default=50,
                        help="Top-k sampling: lower=predictable (default: 50)")
    parser.add_argument("--repetition-penalty", "--rep", type=float, default=1.0,
                        help="Repetition penalty: higher=less repetition (default: 1.0)")
    
    args = parser.parse_args()
    
    clone_voice(
        ref_audio=args.ref_audio,
        text=args.text,
        ref_text=args.ref_text,
        output=args.output,
        language=args.language,
        simple=args.simple,
        temperature=args.temperature,
        top_p=args.top_p,
        top_k=args.top_k,
        repetition_penalty=args.repetition_penalty,
    )

if __name__ == "__main__":
    main()
