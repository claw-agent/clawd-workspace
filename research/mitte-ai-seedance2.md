# Mitte AI + Seedance 2.0 — JSON Frame-by-Frame Video Generation

> **Researched:** 2026-02-19
> **Platform:** [mitte.ai](https://mitte.ai) — AI Creative Suite
> **Key Feature:** Seedance 2.0 with JSON structured prompting ("Omni mode")
> **Founded by:** Azer Koçulu (@azerkoculu) — notable npm developer

---

## 🚀 What Is Mitte AI?

Mitte is an **AI creative suite** that aggregates multiple models under one platform:
- **Seedance 2.0** (ByteDance) — exclusive early access for Pro & Power plans
- **Nano Banana Pro** (Google) — image generation/editing
- **Veo 3.1** (Google DeepMind) — video generation, including 4K
- **Kling 3.0** — image-to-video with native audio
- **VanGogh** — Mitte's own creative editing agent

Additional features: video avatars, voice library, product photography, face swap, auto-subtitles, Remotion integration, SVG conversion, and more.

---

## 💰 Pricing

**Exact tier pricing not publicly visible** (JS-rendered app, login-walled). What we know:

| Tier | Credits | Seedance 2 Access |
|------|---------|-------------------|
| **Free** | 250 credits/day (as of Jan 2026) | ❌ No |
| **Pro** | Unknown $/mo | ✅ Yes |
| **Power** | Unknown $/mo | ✅ Yes |

- **Credit-based system** — each generation costs credits (exact Seedance 2 cost per clip unknown, frustrating per user complaints)
- **Creators Program** — free creative plan + 15% referral commission
- **Promo code example:** `FCKHGSFLD26` gave $12 off any plan (suggests plans are in the ~$20-50/mo range)
- **Current promo:** "Seedance 2x Week" — every credit purchased is doubled (ends ~Feb 24, 2026)

**⚠️ Action needed:** Sign up to confirm exact Pro/Power pricing. Could not complete signup without browser automation (site is fully JS-rendered SPA).

---

## 🎬 Omni Mode — JSON Frame-by-Frame Prompting

This is the killer feature. Seedance 2 on Mitte accepts **structured JSON prompts** that give frame-by-frame directorial control. This is what @azerkoculu calls "Omni mode."

### How It Works
1. Open Seedance 2 at mitte.ai
2. Optionally attach a reference image (product, character, etc.)
3. Enter a JSON prompt with detailed scene descriptions
4. Seedance 2 interprets the JSON structure and generates a cohesive video

### JSON Format (Reverse-Engineered from @azerkoculu's OldSpice Ad)

The JSON is essentially a **film brief** with these top-level fields:

```json
{
  "title": "Film title/concept description",
  "duration": "15 seconds",
  "concept": "High-level creative vision",
  "format": "16:9 and 9:16 deliverables",
  "fps": 24,
  "film_stock_emulation": "Kodak Vision3 500T, 35mm...",
  "color_grade": "crushed blacks, teal midtones...",
  "overall_energy": "Description of pacing/feel",

  "transition_rules": {
    "style": "SMASH CUTS ONLY...",
    "forbidden": ["dissolves", "fades", ...],
    "pacing": "cuts get FASTER as film progresses"
  },

  "audio": {
    "backbone": "sub-bass heartbeat accelerating...",
    "layers": "foley descriptions...",
    "music": "genre/mood description",
    "final_beat": "silence + logo timing"
  },

  "shot_list": [
    {
      "shot": 1,
      "timecode": "00:00 — 00:02",
      "duration_sec": 2,
      "type": "PRODUCT INTRO",
      "description": "Detailed shot description...",
      "lens": "100mm macro",
      "movement": "static / handheld / tracking",
      "lighting": "hard side light, deep shadow..."
    },
    // ... more shots
  ],

  "directing_notes": {
    "intensity_curve": "...",
    "visual_motifs": "..."
  },

  "post_production": {
    "grain": "heavy 35mm scan grain",
    "letterbox": "2.39:1 anamorphic",
    "transitions": "SMASH CUTS ONLY"
  }
}
```

### Key JSON Fields That Work

| Field | Purpose | How Seedance Interprets |
|-------|---------|------------------------|
| `shot_list[].timecode` | Frame-level timing | Controls when each shot appears |
| `shot_list[].lens` | Focal length | Affects framing/depth of field |
| `shot_list[].movement` | Camera motion | Static, tracking, handheld, etc. |
| `shot_list[].lighting` | Light setup | Affects mood and contrast |
| `transition_rules` | Cut style | Hard cuts vs smooth transitions |
| `film_stock_emulation` | Look/feel | Grain, color response |
| `color_grade` | Color treatment | Overall palette |
| `audio` | Sound design | **Unclear if Seedance actually generates audio from this or if it's aspirational** |

### What Makes This Different from Plain Text Prompts

1. **Structure = Precision** — Each shot gets its own timing, lens, and lighting spec
2. **Temporal Control** — Timecodes tell the model exactly when to transition
3. **Composable** — Can ask ChatGPT to modify the JSON for different products/scenes
4. **Reproducible** — Same JSON = more consistent results across generations
5. **Reference integration** — "attached image" in descriptions links to uploaded refs

---

## 📋 Mitte Workflow (Step by Step from @azerkoculu)

1. Open Seedance 2 at mitte.ai
2. Upload product/character reference image
3. Enter JSON prompt (refer to uploads as "attached image")
4. Generate (output is ~15s video)
5. Use Mitte's built-in editing agent (VanGogh) for revisions
   - Can prompt edits like "remove the scene in the ring"
6. Export

---

## 🆚 Comparison: Mitte AI vs ChatCut vs Dreamina

| Feature | Mitte AI | ChatCut | Dreamina |
|---------|----------|---------|----------|
| **Seedance 2 Access** | ✅ Exclusive early | ❌ Unknown | ✅ Native |
| **JSON Prompting** | ✅ Full JSON shot list | ❌ Script-based | ❌ Text only |
| **Frame Control** | ✅ Timecoded shots | Partial (scenes) | ❌ Single prompt |
| **Multi-Model** | ✅ Seedance, Kling, Veo | Limited | Seedance only |
| **Built-in Editing** | ✅ VanGogh agent | ✅ Timeline editor | Basic |
| **Reference Images** | ✅ Attach in prompt | ✅ | ✅ @tags |
| **Audio Generation** | Via voice library | ❌ | ❌ |
| **Free Tier** | 250 credits/day | Unknown | Limited |
| **Best For** | Structured film production | Quick edits | Simple generations |

### Key Advantage Over Dreamina
Dreamina uses `@Image1` tags and natural language. Mitte's JSON approach gives **much more granular control** — you can specify lens, lighting, movement, and timing per shot. This is closer to a real shooting script than a prompt.

### Key Advantage Over ChatCut
ChatCut is more of an editing/assembly tool. Mitte generates the raw footage with directorial control built into the prompt itself.

---

## 🎯 Red Rising Test Prompt (Ready to Use)

```json
{
  "title": "Red Rising — Darrow in the Mines",
  "duration": "10 seconds",
  "concept": "A 16-year-old Red slave works in the hellish mines of Mars. Every frame bleeds exhaustion and quiet defiance. This is not freedom — this is survival.",
  "format": "16:9",
  "fps": 24,
  "film_stock_emulation": "Kodak Vision3 500T pushed 2 stops, 35mm, heavy grain",
  "color_grade": "deep reds and ambers from mine lighting, crushed blacks, skin tones warm but sickly, everything else desaturated",
  "overall_energy": "OPPRESSIVE. Slow, grinding, heavy. The weight of Mars itself pressing down.",

  "transition_rules": {
    "style": "Slow dissolves and hard cuts only. Each transition feels like a heartbeat.",
    "pacing": "Deliberate. Every shot lingers just long enough to feel uncomfortable."
  },

  "shot_list": [
    {
      "shot": 1,
      "timecode": "00:00 — 00:03",
      "duration_sec": 3,
      "description": "Extreme close-up of thin, scarred hands gripping a pneumatic drill. Knuckles white. Dirt caked in every crease. The drill vibrates — we feel it. Red emergency lighting casts everything in hellish amber. Dust particles float in the beam.",
      "lens": "100mm macro",
      "movement": "static, micro-vibration from drill",
      "lighting": "single red emergency lamp from above, deep shadows below"
    },
    {
      "shot": 2,
      "timecode": "00:03 — 00:06",
      "duration_sec": 3,
      "description": "The drill SLAMS into rock face. Sparks fly. Camera pulls back slowly revealing a gaunt 16-year-old boy — red hair matted with sweat and dust, wearing a filthy mining suit. His face is hollow but his eyes burn. He pulls the drill back, adjusts his grip.",
      "lens": "50mm pulling to 35mm",
      "movement": "slow dolly back, smooth",
      "lighting": "dim red overhead strips, sparks provide fill light"
    },
    {
      "shot": 3,
      "timecode": "00:06 — 00:08",
      "duration_sec": 2,
      "description": "Medium shot. The boy — Darrow — stops. Wipes sweat from his brow with a grimy forearm. Chest heaving. For a moment, his eyes drift upward toward the tunnel ceiling — toward a Mars he's never seen from the surface. A flicker of something dangerous in his expression.",
      "lens": "85mm",
      "movement": "static, subject breathing is the only motion",
      "lighting": "red backlight creating halo on dust, face in half-shadow"
    },
    {
      "shot": 4,
      "timecode": "00:08 — 00:10",
      "duration_sec": 2,
      "description": "Wide shot. The full tunnel stretches behind him — endless darkness punctuated by dim red strip lights. Other miners are shadows in the distance. Darrow is small against the vast emptiness. He lifts the drill again. The cycle continues.",
      "lens": "24mm wide",
      "movement": "locked tripod, no movement",
      "lighting": "practical red strip lights receding into darkness, volumetric dust"
    }
  ],

  "directing_notes": {
    "character": "Darrow is 16, gaunt, malnourished but wiry-strong. Red hair. Pale skin with mining dust. Eyes that should be dead but aren't.",
    "atmosphere": "Claustrophobic. Hot. The air itself should feel thick with dust and heat.",
    "sound": "Drill impacts echo. Distant rumbling. Heavy breathing. No music — just the mine."
  },

  "post_production": {
    "grain": "heavy, aggressive grain — this should look raw and underground",
    "letterbox": "2.39:1",
    "color": "red/amber dominant, no cool tones, skin desaturated except for the red hair"
  }
}
```

---

## ⚠️ Limitations & Notes

1. **Signup not completed** — mitte.ai is a JS SPA, couldn't register via automated tools. Need manual browser session.
2. **Exact pricing unknown** — behind login wall. Pro and Power tiers exist, likely $20-50/mo range.
3. **Content moderation is strict** — Seedance 2 rejects many prompts. Mitte published a guidelines page: mitte.ai/guides/seedance-2
4. **JSON is interpreted, not executed** — The model reads the JSON as a structured prompt. It doesn't literally render each field programmatically. Results are impressive but not pixel-perfect to the brief.
5. **Audio fields may be aspirational** — Unclear if Seedance generates audio from the JSON audio specs or if those are for human reference.
6. **Azer Koçulu is the founder** — his demos are naturally best-case results.

---

## 🔗 Key References

- **@azerkoculu OldSpice thread:** https://x.com/azerkoculu/status/2024207393052106868
- **Full JSON prompt tweet:** https://x.com/azerkoculu/status/2024209477545623975
- **Mitte Seedance 2 guidelines:** https://mitte.ai/guides/seedance-2
- **Mitte creators program:** mentioned in @mitte_ai tweets
- **gptmarket.io** — suggested by @tadasgedgaudas for finding JSON video prompts

---

## 📌 Next Steps

- [ ] Complete signup on mitte.ai (needs manual browser)
- [ ] Confirm exact Pro/Power pricing and credit costs per Seedance 2 generation
- [ ] Test the Red Rising JSON prompt above
- [ ] Compare output quality to Dreamina's text-based Seedance 2 output
- [ ] Evaluate whether JSON control actually produces different results vs detailed text prompt
