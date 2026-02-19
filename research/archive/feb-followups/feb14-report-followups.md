# Feb 14 Report Follow-ups: moyin-creator + YJstacked Seedance Guide

> Researched 2026-02-15

---

## 1. Moyin Creator (魔因漫创)

**Repo:** [github.com/MemeCalculate/moyin-creator](https://github.com/MemeCalculate/moyin-creator) — 364 stars, updated 3 days ago

### What It Does
Full pipeline desktop app: **Script → Characters → Scenes → Storyboard → Seedance 2.0 video generation**. Not just prompts — it's a production-grade Electron app that chains every step automatically.

Five modules:
1. **📝 Script Parser** — AI-powered breakdown of scripts into scenes, shots, dialogue. Auto-identifies characters, emotions, camera language. Supports multi-episode structure.
2. **🎭 Character Bible** — 6-layer identity anchoring system for consistency across shots. Binds character reference images.
3. **🖼️ Scene Generator** — Multi-angle environment generation, auto-converts scene descriptions to visual prompts.
4. **🎬 Storyboard System** — Film-grade camera params (shot scale, position, movement). Visual style switching (2D/3D/realistic/stop-motion). Auto-layout and export.
5. **⭐ S-Class (Seedance 2.0)** — Multi-shot narrative video generation. Handles @Image/@Video/@Audio references. Smart 3-layer prompt fusion (action + camera language + lip-sync dialogue). First-frame grid stitching (N×N). Auto-validates Seedance constraints (≤9 images, ≤3 videos, ≤3 audio, ≤5000 char prompt).

### How It Connects to Seedance
Uses **API keys** — you configure AI service provider API keys in settings. Supports multiple providers with load-balanced key rotation and auto-retry queues. This means it hits the Seedance/Dreamina API directly, not via web UI automation.

### Installation
- Node.js ≥ 18, npm ≥ 9
- `git clone` → `npm install` → `npm run dev`
- Electron 30 + React 18 + TypeScript + Vite 5
- Builds to Windows installer (`npm run build`)
- AGPL-3.0 (commercial license available separately)

### Maturity
- 364 stars in ~1 week = fast growth
- Active development (updated 3 days ago)
- Chinese-language primary but has English README
- Clean architecture (Zustand state, Radix UI, Tailwind)
- Has workflow guide docs

### 🔴 Red Rising Verdict: HIGH VALUE
This is exactly what we need. It solves our biggest pain points:
- **Character consistency** across shots (6-layer anchoring = better than our manual approach)
- **Script-to-video pipeline** — we could feed Red Rising screenplay scenes and get batch-generated shots
- **Seedance 2.0 native** — auto-handles the @reference system, constraint validation, prompt construction
- **Batch production** — parallel queue with auto-retry, perfect for generating dozens of shots

**Action items:**
1. Clone and test locally (it's Electron, runs on Mac)
2. Need Seedance API key — check if Dreamina API access works or if we need Jimeng subscription
3. Feed it a test scene (Darrow in the Institute) with our existing character refs
4. Evaluate character consistency vs our manual prompting approach

---

## 2. @YJstacked Seedance 2.0 Mastery Guide

**Tweet:** [2022024457989370257](https://x.com/YJstacked/status/2022024457989370257) — 345 likes, 55 RTs (Feb 12, 2026)

### Prompt Framework (6-Layer Structure)
YJ's recommended prompt order:

1. **Scene Environment** — Where the action takes place, mood, visual context. "An opulent study with warm lamp light" vs "a clinical white studio" produces completely different results.
2. **Camera Behavior** — Pan, zoom, track, orbit, hold. Model responds to directional camera language.
3. **Lighting Quality** — Warm amber, cool blue, soft diffused, hard directional. Fastest tone lever.
4. **Motion Physics** — Slow deliberate, high energy rapid cuts, gentle fluid. Controls kinetic feel.
5. **Audio Direction** — Deep voiceover, ambient music, SFX, ASMR texture. Tells model how to build the sonic layer.
6. **Emotional Target** — What viewer should feel in the last frame. Model works backwards from it.

### What's NEW vs Our Playbook
Our `seedance-2-playbook.md` already covers most fundamentals well. Delta:

- **"Write prompts like a director briefing a crew"** — our playbook does this but YJ emphasizes treating it as a *shot breakdown*, not a description. Subtle but important framing shift.
- **Emotional endpoint technique** — "Name the emotional endpoint, model works backwards from it." We don't explicitly do this. Worth adding.
- **Batch-compare workflow** — "Run 3-5 variations of same prompt with small adjustments before committing." We mention iteration but not this structured A/B approach.
- **Access honesty** — YJ confirms international access is still "uneven" and warns against third-party wrappers (Discord servers etc.) for data privacy. Stick to Dreamina.
- **Realistic face limitation** — "Realistic human face uploads are blocked for compliance." This could impact Red Rising if using photorealistic character refs. Need to test boundaries.

### The 10 Commercial Mega-Prompts
All follow the 6-layer framework. They're extremely verbose (1000+ words each) but demonstrate the density Seedance responds to. Categories:

1. **Luxury Watch Ad** — Opulent study, zoom reveal, 360° product spin, voiceover sync
2. **Fitness App Promo** — Gym environment, before/after transformation, HUD overlay
3. **Coffee Brand Teaser** — ASMR-focused, steam physics, pour sequence, sensory-driven
4. **Tech Gadget Launch** — Futuristic unboxing, screen activation, feature bullet overlays
5. **Skincare Product** — Spa setting, application sequence, before/after skin texture
6. **Travel Agency Hook** — Aerial drone sweep, beach paradise, booking interface overlay
7. **Food Delivery** — Sizzle reel, assembly sequence, delivery arrival
8. **Fashion Line Reveal** — Runway strut, fabric flow physics, multi-outfit swaps
9. **Eco-Friendly Product** — Nature setting, sustainability narrative, impact stats
10. **Car Dealership** — Highway acceleration, interior tech, showroom finale

### Key Patterns From the Mega-Prompts (Useful for Red Rising):
- **Timestamp-based direction** — "At the 3-second mark, execute..." "At the 6-second juncture..." Gives the model temporal structure.
- **Physics callouts** — "condensation droplets forming realistically via simulated physics", "gravity-guided flow". Model responds to physics vocabulary.
- **Transition types** — "soft dissolve", "rapid wipe", "glitch-effect transition", "focus pull". Name the edit.
- **Hyper-specific material descriptions** — "mahogany wood paneling", "polished ebony desk", "sapphire crystal cover with anti-reflective coating". Detail = control.
- **Audio layering instructions** — Multiple @Audio refs with precise timestamp sync points and volume hierarchy.
- **Character expression evolution** — "expressions transition from eager anticipation to blissful contentment" — direct the emotional arc within a single shot.

---

## 🎯 Red Rising Action Plan

### Immediate (This Week)
1. **Install Moyin Creator** — clone, `npm install`, test with a simple scene
2. **Build Darrow Character Bible** in Moyin's format — feed our existing ref images into their 6-layer anchoring system
3. **Test the face compliance boundary** — generate a semi-realistic Darrow to see where Seedance blocks vs allows
4. **Add emotional endpoint technique** to our prompting template

### Short-Term (Next 2 Weeks)
5. **Adapt one Red Rising scene** as a Moyin Creator project — Institute corridor scene is good test (contained, single character, strong atmosphere)
6. **Create Red Rising mega-prompt templates** following YJ's 6-layer + timestamp structure — adapt the luxury/cinematic patterns for our sci-fi aesthetic
7. **Batch-compare workflow** — generate 5 variations per shot, pick best, iterate

### Key Risk
- Seedance API access for Moyin Creator may require Jimeng subscription (China-side). Dreamina API tiers exist ($0.10-$0.80/min) but unclear if Moyin supports Dreamina's API endpoint vs Jimeng's. Need to investigate.
