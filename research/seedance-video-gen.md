# Seedance & Video Generation Research — Feb 11, 2026

## Seedance (ByteDance) — Status Report

### What It Is
Seedance is ByteDance's AI video generation model. **Seedance 2 just dropped** and people on r/aivideo are losing their minds — full anime episodes (Chainsaw Man, Dragon Ball), cinematic quality that rivals or beats Kling 3.0.

### Access Paths

#### 1. seedance.ai (Third-Party Community Site)
- **URL:** https://seedance.ai/text2video
- **NOT ByteDance official** — they explicitly state "no affiliation with ByteDance"
- Uses Stable Diffusion, DALL-E 3, Flux, etc. — NOT the actual Seedance model
- Free tier with credits, paid plans available
- **Verdict: MISLEADING** — this is a wrapper community, not the real Seedance model

#### 2. Dreamina by CapCut (Official ByteDance)
- **URL:** https://dreamina.capcut.com/
- ByteDance's official consumer-facing AI creative tool (via CapCut/Jianying)
- Has text-to-video, image-to-video, video style transfer
- **This is where Seedance 2 likely lives** — accessible through CapCut's ecosystem
- Free to use with limits, CapCut subscription for more
- **Try this first** — sign up and test video generation

#### 3. Jimeng AI (即梦AI) — Chinese Market
- **URL:** https://jimeng.jianying.com/
- ByteDance's domestic (China) version of Dreamina
- Has the latest Seedance models
- May require Chinese phone number
- **Harder to access from US but possible with VPN**

#### 4. Volcengine API (火山引擎)
- ByteDance's cloud platform (like their AWS)
- Has Jimeng AI as a product
- API access may be available but documentation is in Chinese
- **Worth exploring if we want programmatic access**

#### 5. Third-Party API Platforms
- **Replicate:** Has `bytedance/dreamactor-m2.0` but NOT Seedance video gen yet
- **fal.ai:** No Seedance models listed yet
- **Neither platform has Seedance 2 available via API yet**

### Best Path Forward for Seedance Access
1. **Dreamina (CapCut)** — Sign up, test if Seedance 2 is available there
2. **CapCut desktop app** — Often gets new models before the web version
3. **Jimeng AI with VPN** — If Dreamina doesn't have the latest model

---

## Current Video Gen Landscape (What We Can Use NOW)

### Tier 1 — Best Quality Available
| Tool | Access | Strengths | Weaknesses | For Red Rising? |
|------|--------|-----------|------------|----------------|
| **Kling 3.0 Pro** | ✅ Have it ($25.99/mo) | Multi-shot, good faces, cinematic | Content filters, slow | Best current option |
| **Seedance 2** | ❓ Need to test Dreamina | Anime/cinematic, very fluid motion | Access unclear | Could be amazing |
| **Veo 3.1** | Via fal.ai API | Google quality, audio gen | Expensive per gen | Worth testing |
| **Grok Imagine Video** | Via fal.ai API (NEW) | xAI model, text+audio | Very new, untested | Unknown |

### Tier 2 — Good Alternatives
| Tool | Access | Notes |
|------|--------|-------|
| **Hailuo/MiniMax** | Web + API | Good motion, cheaper than Kling |
| **LTX-2 19B** | fal.ai API | Open source, fast, audio support |
| **Wan2.6 (Alibaba)** | Replicate | Fast inference, good for iteration |
| **PixVerse v5.6** | Replicate | Good for stylized content |

### Tier 3 — Local/Free Options
| Tool | Notes |
|------|-------|
| **ComfyUI + AnimateDiff** | Already installed, limited quality |
| **Wan2.1 local** | Can run on our Mac mini but slow |

---

## Strategies to Improve Red Rising Video Quality

### Strategy 1: Multi-Tool Pipeline
Instead of relying on one tool, use the best tool for each shot type:
- **Static/portrait shots:** Kling 3.0 (best faces)
- **Action sequences:** Seedance 2 or Hailuo (better motion)
- **Landscapes/environments:** Veo 3.1 (cinematic quality)
- **Assembly:** Remotion (already set up)

### Strategy 2: Reference Image Refinement
- Generate multiple reference images per character using Flux 2
- Use consistent seed + style for character consistency
- Feed refined images into Kling/Seedance image-to-video
- Image quality drives video quality

### Strategy 3: Prompt Engineering Improvements
From our Kling lessons + community research:
- Simpler prompts > overloaded prompts
- "Shot on 35mm film" for photorealism
- Specify camera movements explicitly
- Avoid age-reducing words
- Describe characters from scratch (models don't know book characters)
- Use euphemisms for content filters

### Strategy 4: Multi-Shot + Consistency
- Kling 3.0 Multi-Shot feature for character consistency across clips
- Generate character reference sheet first
- Use consistent lighting/mood descriptions
- Batch similar shots together

---

## Immediate Action Items
1. **Sign up for Dreamina** (CapCut) and test if Seedance 2 is available
2. **Test fal.ai** with Veo 3.1 and Grok Imagine Video (pay-per-use, no subscription)
3. **Test Hailuo/MiniMax** as Kling alternative for motion-heavy shots
4. **Refine Kling 3.0 workflow** — better reference images, simpler prompts
5. **Consider multi-tool pipeline** — use best tool per shot type
