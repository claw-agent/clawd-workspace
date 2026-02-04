#!/usr/bin/env python3
"""
Qwen3-TTS Test Script
Tests basic TTS with preset voices using the CustomVoice model.

Usage:
    cd ~/clawd/Qwen3-TTS
    source .venv/bin/activate
    python ../scripts/qwen-tts-test.py

Models will be downloaded automatically on first run (~3.5GB for CustomVoice).
"""

import os
import sys
import time

# Ensure we're using the right environment
script_dir = os.path.dirname(os.path.abspath(__file__))
project_dir = os.path.join(os.path.dirname(script_dir), "Qwen3-TTS")

import torch
import soundfile as sf
from qwen_tts import Qwen3TTSModel

def main():
    print("=" * 60)
    print("Qwen3-TTS Test - CustomVoice Model")
    print("=" * 60)
    
    # Detect device
    if torch.backends.mps.is_available():
        device = "mps"
        dtype = torch.float16  # MPS doesn't support bfloat16 well
        print(f"✓ Using Apple Silicon MPS acceleration")
    elif torch.cuda.is_available():
        device = "cuda:0"
        dtype = torch.bfloat16
        print(f"✓ Using CUDA GPU")
    else:
        device = "cpu"
        dtype = torch.float32
        print(f"⚠ Using CPU (slow)")
    
    print(f"  Device: {device}, Dtype: {dtype}")
    print()
    
    # Load model (will download on first run)
    print("Loading Qwen3-TTS-12Hz-1.7B-CustomVoice model...")
    print("(First run downloads ~3.5GB from HuggingFace)")
    
    start = time.time()
    model = Qwen3TTSModel.from_pretrained(
        "Qwen/Qwen3-TTS-12Hz-1.7B-CustomVoice",
        device_map=device,
        dtype=dtype,
    )
    print(f"✓ Model loaded in {time.time() - start:.1f}s")
    print()
    
    # Show available voices
    print("Available speakers:", model.get_supported_speakers())
    print("Available languages:", model.get_supported_languages())
    print()
    
    # Test 1: English with Ryan voice
    print("Test 1: English with Ryan voice")
    text_en = "Hello! This is a test of the Qwen3 text to speech system. It sounds pretty amazing, doesn't it?"
    
    start = time.time()
    wavs, sr = model.generate_custom_voice(
        text=text_en,
        language="English",
        speaker="Ryan",
    )
    elapsed = time.time() - start
    
    output_path = os.path.join(script_dir, "test_english.wav")
    sf.write(output_path, wavs[0], sr)
    print(f"✓ Generated in {elapsed:.2f}s -> {output_path}")
    print()
    
    # Test 2: Chinese with Vivian voice
    print("Test 2: Chinese with Vivian voice")
    text_zh = "你好！这是一个语音合成测试。Qwen3的语音听起来非常自然。"
    
    start = time.time()
    wavs, sr = model.generate_custom_voice(
        text=text_zh,
        language="Chinese",
        speaker="Vivian",
    )
    elapsed = time.time() - start
    
    output_path = os.path.join(script_dir, "test_chinese.wav")
    sf.write(output_path, wavs[0], sr)
    print(f"✓ Generated in {elapsed:.2f}s -> {output_path}")
    print()
    
    # Test 3: English with emotion instruction
    print("Test 3: English with emotion instruction (Serena voice)")
    text_emotion = "Oh my goodness, this is absolutely incredible! I can't believe how well this works!"
    
    start = time.time()
    wavs, sr = model.generate_custom_voice(
        text=text_emotion,
        language="English",
        speaker="Serena",
        instruct="Very excited and happy tone",
    )
    elapsed = time.time() - start
    
    output_path = os.path.join(script_dir, "test_emotion.wav")
    sf.write(output_path, wavs[0], sr)
    print(f"✓ Generated in {elapsed:.2f}s -> {output_path}")
    print()
    
    print("=" * 60)
    print("All tests completed! Check the generated .wav files in:")
    print(f"  {script_dir}")
    print("=" * 60)

if __name__ == "__main__":
    main()
