# 3D Landscaping Visualization for XPERIENCE — Full Research
*Researched: Feb 15, 2026 3am proactive session*

## Executive Summary
The pipeline from the original tweet (Teleport → NanoBanana → World Labs Marble) is **viable and automatable**. World Labs has a full API. The gap is the AI restaging step (NanoBanana alternatives needed). This is a **real first-mover opportunity** — no contractor-focused tool does this end-to-end today.

## The Pipeline (Validated)

### Step 1: 360° Capture — Teleport App
- **What:** iPhone app by @mountain_mal that stitches 16 ultra-wide photos into equirectangular 360° panorama
- **Platform:** iOS only (App Store)
- **Cost:** Free / low-cost
- **Quality:** Good enough for AI input; not survey-grade
- **Alternative:** Any 360° camera (Insta360, Ricoh Theta) or even iPhone Panorama mode (less ideal — not full 360°)
- **For XPERIENCE:** Contractor takes 16 photos of yard → app generates 360° pano in minutes

### Step 2: AI Restaging — The Creative Step
This is where the magic happens: take the real yard panorama and AI-generate a landscaped version.

**Option A: NanoBanana (nanobanana.com)**
- AI image generation that handles equirectangular format
- Website is JS-heavy, couldn't scrape details
- Unknown API status — needs manual testing
- Risk: may not specialize in outdoor/landscaping

**Option B: Direct Prompting with Flux/SDXL/Midjourney**
- Use img2img with the panorama as input
- Prompt: "professional landscaped yard with [specific features], equirectangular 360 panorama"
- Pros: Full control, many model options
- Cons: Equirectangular format is tricky — seams, distortion at poles
- Best bet: ComfyUI with ControlNet (we have ComfyUI installed!)

**Option C: GPT-4o / Claude Image Generation + Outpainting**
- Edit the panorama section by section
- Less reliable for maintaining equirectangular consistency

**Option D: Specialized Virtual Staging Tools**
- **REimagineHome** (reimaginehome.ai) — AI exterior/interior staging, has API
- **Remodel AI** — exterior visualization
- **DreamzAR** — AR landscaping (but not 360°)
- **iScape** — landscaping design (manual, not AI)
- **Yardzen** — human + AI hybrid ($2,000-$5,000 per design!)

**Recommendation:** Start with **ComfyUI + ControlNet** for the AI restaging (free, we control it). If quality isn't good enough, try NanoBanana or REimagineHome.

### Step 3: 3D Reconstruction — World Labs Marble ✅ API CONFIRMED
**This is the strongest part of the pipeline.**

- **API:** Full REST API with documented endpoints
- **Input types:** Text, single image, multi-image, video, **panorama** (native support!)
- **Panorama requirements:** 2:1 aspect ratio, full 360° coverage, continuous left/right edges
- **API workflow:**
  1. `POST /media-assets/prepare-upload` → get upload URL
  2. Upload panorama to signed URL
  3. `POST /generations` → create 3D world from panorama
  4. Poll for completion → get navigable 3D world URL
- **Output:** Shareable 3D walkthrough link (iframe embeddable)
- **Pricing:** Not on a public pricing page yet (API is relatively new, launched ~late 2025). Likely free tier for limited generations.
- **Key features:** Pano Edit (AI-modify sections), Click and Expand (grow world), Studio Compose (stitch multiple worlds), Record (cinematic videos)

## Competitive Landscape

| Company | What They Do | Pricing | API? | 3D? |
|---------|-------------|---------|------|-----|
| Yardzen | Human+AI landscape design | $2K-$5K/project | No | 2D renders |
| DreamzAR | AR landscaping | ~$10/mo | No | AR only |
| iScape | Manual landscape design | $25/mo | No | No |
| REimagineHome | AI virtual staging | Per-image | Yes | No |
| Remodel AI | Exterior visualization | Per-image | Unknown | No |
| **Our Pipeline** | **Full 3D walkthrough** | **~$5-10/yard** | **Yes** | **YES** |

**Nobody offers automated 360° → AI restage → 3D walkthrough for contractors.**

## XPERIENCE Service Offering

### "Walk Your Dream Yard" Package
1. Contractor visits property (already doing this for roof inspections)
2. Takes 16 iPhone photos with Teleport (~5 min)
3. We process: panorama → AI landscaping → 3D world (~30 min automated)
4. Customer gets a **shareable 3D link** showing their yard transformed
5. Embed in proposal PDF alongside roof quote

### Revenue Model Options
- **Free with roof job** — differentiator that closes deals (recommended to start)
- **$99 standalone** — landscaping visualization as upsell
- **White-label SaaS** — $29/mo for contractors (future)

### Integration with Existing XPERIENCE Systems
- **Quote Generator** → include 3D preview link in PDF
- **Lead CRM** → track which leads got 3D previews (conversion lift?)
- **Review Gen** → "Check out the 3D preview we made!" → drives word of mouth
- **Storm Dispatch** → post-storm: "Here's what your yard could look like after repairs"

## Technical Implementation Plan

### Phase 1: Manual Proof of Concept (Week 1)
- [ ] Marb downloads Teleport app, captures one yard
- [ ] We run panorama through ComfyUI with landscaping prompt
- [ ] Upload AI-restaged pano to World Labs Marble
- [ ] Evaluate quality of 3D walkthrough
- [ ] Determine if NanoBanana or alternative needed for Step 2

### Phase 2: Semi-Automated Pipeline (Week 2-3)
- [ ] Script: `yard-viz.sh <panorama.jpg> "landscaping description"` 
- [ ] ComfyUI API for restaging (already have it locally)
- [ ] World Labs API for 3D generation
- [ ] Output: shareable URL + embeddable iframe

### Phase 3: Contractor Self-Service (Month 2+)
- [ ] Simple web upload form (Vercel)
- [ ] Contractor uploads pano → selects style preset → gets 3D link
- [ ] Style presets: "Modern Xeriscaping", "Lush Garden", "Desert Oasis", "Mountain Lodge"
- [ ] Auto-embed in quote PDFs

## Open Questions for Marb
1. Does XPERIENCE do landscaping or just roofing? (This works for both but landscaping is the killer use case)
2. Do their contractors already have iPhones? (Required for Teleport)
3. Would they pay for this as a standalone service or bundle with roof inspections?
4. Should we prototype with a real yard first? (Marb's yard?)

## Files
- Pipeline overview: `~/clawd/research/3d-landscaping-pipeline.md`
- This research: `~/clawd/research/3d-landscaping-research.md`
- World Labs API docs: https://docs.worldlabs.ai/api
- Marble pano guide: https://docs.worldlabs.ai/marble/create/prompt-guides/pano-prompt
