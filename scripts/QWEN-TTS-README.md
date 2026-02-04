# Qwen3-TTS Scripts

Local TTS and voice cloning using Qwen3-TTS on Mac M4.

## Setup

The Qwen3-TTS repo is at `~/clawd/Qwen3-TTS` with a Python 3.13 venv.

## Scripts

### 1. Basic TTS Test
```bash
cd ~/clawd/Qwen3-TTS
source .venv/bin/activate
python ../scripts/qwen-tts-test.py
```
Tests preset voices (Ryan, Vivian, Serena) with English/Chinese text.

### 2. Voice Cloning

**Simple clone (x-vector only):**
```bash
cd ~/clawd/Qwen3-TTS
source .venv/bin/activate
python ../scripts/voice-clone.py reference.wav "Your text here" --simple
```

**Full clone with transcript (better quality):**
```bash
python ../scripts/voice-clone.py reference.wav "Your text here" \
  --ref-text "The exact words spoken in reference.wav"
```

**Shell wrapper:**
```bash
~/clawd/scripts/qwen-clone.sh reference.wav "Hello world" --simple
```

### 3. Options

| Option | Description |
|--------|-------------|
| `--simple` / `-s` | X-vector only mode (no transcript needed) |
| `--ref-text` / `-t` | Transcript of reference audio (improves quality) |
| `--output` / `-o` | Output path (default: cloned_output.wav) |
| `--language` / `-l` | Target language: Auto, English, Chinese, etc. |

## Available Voices (CustomVoice Model)

| Speaker | Language | Description |
|---------|----------|-------------|
| Ryan | English | Dynamic male |
| Aiden | English | Sunny American male |
| Vivian | Chinese | Bright young female |
| Serena | Chinese | Warm gentle female |
| Uncle_Fu | Chinese | Seasoned male |
| Dylan | Chinese (Beijing) | Youthful male |
| Eric | Chinese (Sichuan) | Lively male |
| Ono_Anna | Japanese | Playful female |
| Sohee | Korean | Warm female |

## Performance (Mac M4)

- Model load: ~45-50s (first run downloads ~3.5GB per model)
- Generation: ~15-18s for ~5s of audio (RTF ~3x)
- Uses MPS (Metal) acceleration with float16

## Models Used

- **CustomVoice**: `Qwen/Qwen3-TTS-12Hz-1.7B-CustomVoice` - Preset voices with instruction control
- **Base (Clone)**: `Qwen/Qwen3-TTS-12Hz-1.7B-Base` - Voice cloning from audio samples

## Tips

1. **Reference audio quality matters** - Use clear recordings without background noise
2. **3-10 seconds** is ideal for reference audio
3. **Providing transcripts** significantly improves clone quality
4. **First run is slow** - Models are cached after initial download

## Generated Files

Test outputs are saved to `~/clawd/scripts/`:
- `test_english.wav` - Ryan voice, English
- `test_chinese.wav` - Vivian voice, Chinese  
- `test_emotion.wav` - Serena voice with emotion instruction
- `cloned_test.wav` - Voice clone example
