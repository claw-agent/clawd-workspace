# Asset Generation Tools Research
> Research Date: January 2026 | Hardware: Mac mini M4 | Existing Tools: ffmpeg, Remotion

## Executive Summary

**Best Local Setup:** ComfyUI + FLUX.1 schnell + Wan2.1 (image-to-video)
**Best API Fallback:** Replicate or fal.ai (pay-per-use, no subscriptions)
**Quick Wins:** ComfyUI desktop app (5 min install), ffmpeg workflows

---

## 1. Image Generation

### 🏆 Recommended: ComfyUI (Local)

| Aspect | Details |
|--------|---------|
| **Cost** | FREE |
| **Setup** | Desktop app: download & run (~5 min) |
| **Apple Silicon** | ✅ Native MPS support |
| **Models** | FLUX, SD3.5, SDXL, HunyuanImage, Lumina, etc. |
| **Why** | Node-based UI, extensible, massive community, API for automation |

**Installation (Mac):**
```bash
# Option 1: Desktop App (easiest)
# Download from https://www.comfy.org/download

# Option 2: Manual (more control)
git clone https://github.com/Comfy-Org/ComfyUI
cd ComfyUI
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python main.py
```

**Best Models for Mac M4:**

| Model | Use Case | VRAM | Speed on M4 | License |
|-------|----------|------|-------------|---------|
| **FLUX.1 schnell** | Fast quality gen | ~12GB | ~15-30s/image | Apache 2.0 (free commercial) |
| **FLUX.1 dev** | Higher quality | ~12GB | ~30-60s/image | Non-commercial only |
| **SD3.5 Large** | Good quality, lighter | ~8GB | ~20-40s/image | Free under $1M revenue |
| **SDXL** | Battle-tested, most LoRAs | ~6GB | ~15-25s/image | CreativeML |

**⚠️ Note on M4:** Apple Silicon uses unified memory. A Mac mini M4 (likely 16-24GB RAM) can run most models with `--lowvram` or automatic memory management. FLUX models will be on the edge but doable.

### Alternative Local: InvokeAI

| Aspect | Details |
|--------|---------|
| **Cost** | FREE |
| **Pros** | More polished UI, better UX for beginners, unified canvas |
| **Cons** | Less flexible than ComfyUI, fewer advanced features |
| **Best for** | If ComfyUI feels overwhelming |

### Alternative Local: AUTOMATIC1111

| Aspect | Details |
|--------|---------|
| **Cost** | FREE |
| **Status** | Mature but development slowed |
| **Pros** | Most extensions/tutorials online |
| **Cons** | Older architecture, ComfyUI is the future |
| **Verdict** | Skip unless you need a specific A1111 extension |

---

### Paid Cloud Options (When Local Won't Cut It)

| Service | Price | Best For | Notes |
|---------|-------|----------|-------|
| **Replicate** | ~$0.003/image | API automation | Pay-per-use, great CLI |
| **fal.ai** | ~$0.002/image | Fast inference | Serverless, good for batch |
| **DALL-E 3** | ~$0.04/image | Text rendering, concepts | Best typography |
| **Midjourney** | $10-60/mo | Artistic quality | Discord-based, hard to automate |
| **Ideogram** | $8-48/mo | Text in images, logos | Best for text-heavy designs |

**Recommendation:** Use **Replicate** or **fal.ai** for API access when you need cloud. Pay-per-use beats subscriptions for sporadic use.

---

## 2. Logo & Brand Asset Generation

### Local Options

| Tool | Approach | Notes |
|------|----------|-------|
| **FLUX + LoRA** | Train on brand examples | Best for consistency |
| **SD3.5 + ControlNet** | Sketch → logo | Good for iterating |
| **Recraft v3** (via API) | Purpose-built for vectors | Best quality, not local |

### Free Logo Workflow (Local):

1. **Generate with FLUX:** `"minimalist logo for [brand], vector style, white background, simple shapes"`
2. **Upscale:** Use RealESRGAN in ComfyUI
3. **Vectorize:** `potrace` CLI or Vectornator
4. **Refine:** Affinity Designer / Figma

```bash
# Vectorize a PNG logo
brew install potrace
convert logo.png logo.pbm  # ImageMagick
potrace logo.pbm -s -o logo.svg
```

### Paid Alternatives

| Service | Price | Why Consider |
|---------|-------|--------------|
| **Ideogram** | $8/mo | Best AI text rendering |
| **Recraft** | $0.04/gen via API | Purpose-built for design assets |
| **Looka** | $20 one-time | Logo generator (not AI art) |

---

## 3. Video Generation (Image-to-Video)

### 🏆 Recommended Local: Wan2.1

| Aspect | Details |
|--------|---------|
| **Cost** | FREE |
| **Quality** | State-of-the-art open source |
| **Models** | 1.3B (8GB VRAM) to 14B (needs 24GB+) |
| **Features** | T2V, I2V, video editing, text generation in video |
| **ComfyUI** | ✅ Native integration |

**Mac M4 Reality Check:**
- **1.3B model**: ✅ Should work (8GB VRAM requirement)
- **14B model**: ⚠️ Marginal, needs all RAM, very slow

**Installation:**
```bash
# Via ComfyUI (recommended)
# Install ComfyUI-Manager, then search for "Wan" nodes

# Or standalone
git clone https://github.com/Wan-Video/Wan2.1
cd Wan2.1
pip install -e .
```

### Alternative Local Options

| Model | VRAM | Speed | Quality | Notes |
|-------|------|-------|---------|-------|
| **LTX-Video 2B** | ~8GB | Fast | Good | Distilled model, includes audio! |
| **Mochi 1** | ~24GB | Slow | Excellent | Apache 2.0 license |
| **HunyuanVideo** | ~24GB | Slow | Excellent | Open source by Tencent |
| **Stable Video Diffusion** | ~8GB | Medium | Decent | Older but well-supported |

**For Mac M4 (16-24GB):**
- **Best bet:** LTX-Video 2B distilled or Wan2.1 1.3B
- **Via ComfyUI:** Automatic memory management helps

### Paid Cloud Options

| Service | Price | Duration | Quality | Best For |
|---------|-------|----------|---------|----------|
| **Runway Gen-4** | $0.20/sec | 5-10s | Excellent | Professional results |
| **Runway Gen-4 Turbo** | $0.10/sec | 5-10s | Very Good | Cost-effective |
| **Pika Labs** | $8-58/mo | Short clips | Good | Quick iterations |
| **OpenAI Sora 2** | $0.10-0.50/sec | Up to 20s | Excellent | Text understanding |
| **Kling** | Pay-per-use | 5-10s | Good | Motion transfer |

**Cost Analysis (1 minute of video):**
- Runway Gen-4 Turbo: ~$6
- Sora 2 (standard): ~$6
- Local (Wan2.1): FREE (just electricity + time)

---

## 4. Video Editing & Effects

### You Already Have the Best Tools!

| Tool | Status | Use For |
|------|--------|---------|
| **ffmpeg** | ✅ Installed | Trimming, combining, format conversion, filters |
| **Remotion** | ✅ Installed | Motion graphics, text effects, programmatic video |

### ffmpeg Quick Reference

```bash
# Trim video (start at 10s, duration 5s)
ffmpeg -i input.mp4 -ss 10 -t 5 -c copy output.mp4

# Combine videos
echo "file 'video1.mp4'\nfile 'video2.mp4'" > list.txt
ffmpeg -f concat -i list.txt -c copy combined.mp4

# Add text overlay
ffmpeg -i input.mp4 -vf "drawtext=text='Hello':fontsize=24:fontcolor=white:x=10:y=10" output.mp4

# Scale to 1080p
ffmpeg -i input.mp4 -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" output.mp4

# Add fade in/out
ffmpeg -i input.mp4 -vf "fade=t=in:st=0:d=1,fade=t=out:st=4:d=1" output.mp4

# Extract frames for AI processing
ffmpeg -i input.mp4 -vf "fps=1" frames/frame_%04d.png
```

### Remotion (Already Installed)

Perfect for:
- Animated text/captions
- Motion graphics
- Data-driven videos
- Consistent brand templates

```tsx
// Example: Text reveal animation
import { useCurrentFrame, interpolate } from 'remotion';

export const TextReveal = ({ text }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1]);
  return <h1 style={{ opacity }}>{text}</h1>;
};
```

### Additional CLI Tools to Consider

| Tool | Install | Use For |
|------|---------|---------|
| **LosslessCut** | `brew install --cask losslesscut` | Quick GUI trimming |
| **HandBrake** | `brew install --cask handbrake` | Compression/encoding |
| **yt-dlp** | ✅ Already have | Download reference videos |

---

## 5. LoRA Training (Brand Consistency)

### Best Tool: kohya-ss/sd-scripts

| Aspect | Details |
|--------|---------|
| **Cost** | FREE |
| **Requirements** | 8-12GB VRAM minimum |
| **Supports** | SDXL, SD3, FLUX, SD1.5/2.x |
| **Learning curve** | Medium-high |

**Mac M4 Note:** LoRA training is VRAM-intensive. The M4's unified memory helps, but training will be slow. Consider using Replicate's training API ($2-5 per training run) for faster iteration.

### Quick Start (Local):
```bash
git clone https://github.com/kohya-ss/sd-scripts
cd sd-scripts
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt

# Train a LoRA (simplified)
accelerate launch train_network.py \
  --pretrained_model_name_or_path="path/to/model" \
  --train_data_dir="path/to/images" \
  --output_dir="output" \
  --network_module=networks.lora
```

### Alternative: Replicate Training API
- Upload ~10-20 images
- $2-5 per training run
- Results in ~30 minutes
- No local GPU needed

---

## 6. Recommended Workflows

### Workflow A: Quick Logo Generation

```
1. ComfyUI + FLUX schnell
   └─> Generate logo concepts (batch of 4)
   
2. Pick best → Upscale with RealESRGAN
   └─> 4x resolution boost
   
3. potrace → Convert to SVG
   └─> Clean vector output
   
4. Figma/Affinity → Final polish
```

### Workflow B: Product Mockup Video

```
1. FLUX → Generate product image
   └─> High-quality static render
   
2. Wan2.1 (I2V) → Animate the image
   └─> 3-5 second motion clip
   
3. Remotion → Add text/branding
   └─> Motion graphics overlay
   
4. ffmpeg → Final encode
   └─> Optimize for platform (IG, YouTube, etc.)
```

### Workflow C: Marketing Video Pipeline

```
1. Script → Storyboard images (FLUX)
   └─> Key frames and scenes
   
2. Each frame → Video segments (Wan2.1 or LTX)
   └─> 3-5 seconds each
   
3. Remotion → Transitions & text
   └─> Professional polish
   
4. ffmpeg → Combine all
   └─> Add music, final export
```

---

## 7. Quick Wins (Implement Today)

### 1. Install ComfyUI Desktop (5 minutes)
```bash
# Download from https://www.comfy.org/download
# Double-click to install, runs immediately
```

### 2. Download FLUX schnell (10 minutes)
- Open ComfyUI
- Use ComfyUI Manager to download FLUX.1 schnell
- Or manually from HuggingFace

### 3. Create ffmpeg Aliases (2 minutes)
Add to `~/.zshrc`:
```bash
alias vcut='f(){ ffmpeg -i "$1" -ss "$2" -t "$3" -c copy "${1%.*}_cut.mp4"; }; f'
alias vscale='f(){ ffmpeg -i "$1" -vf "scale=$2:-2" "${1%.*}_$2p.mp4"; }; f'
alias vgif='f(){ ffmpeg -i "$1" -vf "fps=10,scale=480:-1:flags=lanczos" "${1%.*}.gif"; }; f'

# Usage: vcut input.mp4 00:00:10 5  (cut 5s starting at 10s)
# Usage: vscale input.mp4 1080      (scale to 1080p)
# Usage: vgif input.mp4             (convert to gif)
```

### 4. Test Video Generation Path
```bash
# Once ComfyUI + Wan2.1 is set up:
# 1. Generate image with FLUX
# 2. Feed to Wan2.1 I2V node
# 3. Export video
# Total time: ~2-5 minutes per clip
```

---

## 8. Cost Comparison Summary

### Local Setup (One-Time)
| Item | Cost |
|------|------|
| ComfyUI | FREE |
| FLUX schnell | FREE |
| Wan2.1 | FREE |
| ffmpeg | FREE |
| **Total** | **$0** |

### Cloud API (Pay-per-use)
| Task | Replicate | fal.ai | OpenAI |
|------|-----------|--------|--------|
| Image gen | $0.003 | $0.002 | $0.04 |
| Video (5s) | $0.50 | $0.30 | $0.50 |
| LoRA train | $2-5 | $5 | N/A |

### Subscriptions (Monthly)
| Service | Basic | Pro |
|---------|-------|-----|
| Midjourney | $10 | $30 |
| Runway | $12 | $28 |
| Ideogram | $8 | $20 |

**Verdict:** Start local (FREE), use pay-per-use APIs when needed, avoid subscriptions until you hit usage limits.

---

## 9. Hardware Optimization for Mac M4

### Memory Management
```bash
# Check available memory
memory_pressure

# Close memory-hungry apps before generation
osascript -e 'quit app "Chrome"'
osascript -e 'quit app "Slack"'
```

### ComfyUI Settings for M4
- Enable `--lowvram` flag if issues
- Use FP16 models when available
- Enable tiled VAE for large images
- Limit batch size to 1-2

### Recommended Model Sizes
- **Comfortable:** <8GB models (SD1.5, SDXL, LTX-2B)
- **Usable:** 8-12GB models (FLUX schnell, Wan2.1-1.3B)
- **Pushing it:** 12-16GB models (FLUX dev, SD3.5 Large)
- **Not recommended:** >16GB models (HunyuanVideo, Mochi full)

---

## 10. Resources & Links

### Official Repos
- [ComfyUI](https://github.com/Comfy-Org/ComfyUI)
- [FLUX](https://github.com/black-forest-labs/flux)
- [Wan2.1](https://github.com/Wan-Video/Wan2.1)
- [LTX-Video](https://github.com/Lightricks/LTX-Video)
- [kohya-ss/sd-scripts](https://github.com/kohya-ss/sd-scripts) (LoRA training)

### Learning Resources
- [ComfyUI Examples](https://comfyanonymous.github.io/ComfyUI_examples/)
- [Civitai](https://civitai.com) - Models, LoRAs, workflows
- [Replicate Docs](https://replicate.com/docs)

### Model Downloads
- [HuggingFace](https://huggingface.co)
- [Civitai](https://civitai.com)

---

## Next Steps

1. **Today:** Install ComfyUI Desktop, download FLUX schnell
2. **This Week:** Generate test images, try basic I2V with Wan2.1
3. **This Month:** Build first automated workflow (image → video pipeline)
4. **Future:** Consider LoRA training for brand consistency

---

*Last updated: January 2026*
