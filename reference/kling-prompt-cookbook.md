# Kling AI Prompt Cookbook
*Battle-tested lessons from the Red Rising AI video project (Feb 2026)*
*Kling 3.0 Pro • Image Omni + Video 3.0 + Multi-Shot*

---

## 🎯 Core Philosophy

**Simplified prompts > overloaded prompts.** Kling handles 2-3 clear directives better than 10 stacked modifiers. When a generation fails, strip detail — don't add more.

---

## 📸 Image Generation

### Photorealism Hacks

| Technique | Effect | Example |
|-----------|--------|---------|
| `"Shot on 35mm film"` | Dramatically improves realism — film grain, natural color, lens artifacts | Always include for cinematic work |
| `"Anamorphic"` | Oval bokeh, horizontal flares, widescreen feel | Pair with `shallow depth of field` |
| `"Golden hour lighting"` | Warm, natural skin tones | Better than specifying exact color temps |
| `"Shallow depth of field"` | Separates subject from background, feels "real" | Use for close-ups and portraits |

### Age & Body Representation

**The Young-Skew Problem:** Kling consistently generates faces 2-4 years younger than specified.

| ❌ Avoid | ✅ Use Instead | Why |
|----------|----------------|-----|
| `"small"` | `"lean"`, `"wiry"` | "Small" triggers child-like proportions |
| `"delicate"` | `"fine-featured"` | Same child-aging effect |
| `"petite"` | `"slender"` | Kling interprets as pre-teen |
| `"16 years old"` | `"19 years old"` | Bump stated age 2-3 years above target |

**Rule of thumb:** If your character is 16, prompt for 18-19. If 20, prompt for 22-23.

### Character Knowledge

Kling **does not know book/fictional characters.** `"Darrow from Red Rising"` returns random results. You must describe from scratch every time:
- Physical traits (hair color, build, skin)
- Clothing/costume
- Expression/emotion
- Setting context

### Prompt Structure (Optimal)

```
[Subject description — who, what they look like, what they're doing].
[Setting — where, lighting, atmosphere].
[Technical — "Shot on 35mm film", lens style, color grading].
```

Keep it to 2-3 sentences max. Every additional sentence dilutes focus.

### When Generations Fail

1. **Too gaunt/waxy face** → Prompt was overloaded. Simplify.
2. **Wrong age** → Adjust stated age (see table above)
3. **Generic/bland** → Add one specific detail (scars, tears, specific clothing damage)
4. **Image refinement tool** → Limited effect. Regenerate from scratch instead.

---

## 🎬 Video Generation (3.0)

### Shot Design

**Sweet spots by duration:**
- **3-5s:** Reaction shots, single-action beats (a look, a gesture)
- **5-8s:** Simple movements (walking, turning, reaching)
- **8-12s:** Complex scenes (tracking shots, reveals, multi-element)
- **12-15s:** Maximum. Only for establishing shots or simple continuous motion.

**Camera language Kling understands:**
- `"Slow push-in"` — gradual zoom toward subject
- `"Tracking shot"` — following movement laterally
- `"Low angle looking up"` — dramatic, makes subjects imposing
- `"Wide establishing shot"` — sets the scene
- `"Handheld"` — adds urgency, intimacy
- `"POV"` — first-person perspective (hit or miss)

### Multi-Shot (Character Consistency)

Use **Element Reference** with locked character images to maintain consistency across shots:
1. Generate a definitive reference image per character
2. Lock it (screenshot the best generation)
3. Feed as Element Reference for every subsequent shot
4. Still re-describe the character in the prompt — reference is a guide, not a guarantee

### Content Filters

Kling blocks explicit death, violence, blood, and weapons.

| Blocked | Workaround |
|---------|------------|
| Hanging/death | `"standing on a platform"`, `"aftermath"`, show the before/after |
| Blood/gore | `"red stains"`, `"scarlet marks"`, `"crimson"` |
| Weapons | `"curved blade"`, `"tool"` — abstract descriptions |
| Whipping | `"back bearing marks"`, `"bloody from lashes"` sometimes works |
| Nudity | Not applicable to our work, but: clothing always required |

**Strategy:** Frame shots to imply rather than show. Cut away before the violence; show the emotional reaction. This often produces more powerful results anyway.

### Color & Atmosphere

| Mood | Prompt Keywords |
|------|----------------|
| Underground/oppressive | `"orange industrial torches"`, `"dim amber"`, `"desaturated"` |
| Ethereal/sacred | `"dreamlike"`, `"golden hour"`, `"soft starlight"` |
| Grief/intimate | `"warm tones"`, `"shallow depth of field"`, `"tight framing"` |
| Epic/vast | `"wide anamorphic"`, `"slow push-in from high angle"` |

---

## 🏗️ Production Workflow

### Per-Scene Pipeline
1. **Script shots** — Write each shot's prompt, camera direction, and duration
2. **Record narration** — Claw voice via `claw-speak-chunked.sh` for long text
3. **Generate reference images** — Lock character looks before video
4. **Generate video shots** — One at a time, iterate on failures
5. **Assemble** — Remotion for final edit with narration overlay

### Prompt Iteration Strategy
- **Gen 1:** Full prompt as written
- **Gen 2 (if failed):** Strip to core action + one modifier + `"Shot on 35mm film"`
- **Gen 3 (if still failed):** Change the camera angle or framing entirely
- **Give up after 3-4 tries** and move to next shot. Come back later with fresh eyes.

### File Organization
```
projects/red-rising-scenes/
├── character-bible.md          # All characters with physical descriptions
├── essential-scenes-book1.md   # Scene selection + narration text
├── scene1-eos-song-prompts.md  # Per-scene shot-by-shot prompts
├── burial-scene-prompts.md
├── references/                 # Locked character reference images
├── burial-narration.wav        # Voice narration audio
└── generate-narration.py       # Narration generation script
```

---

## 🧪 Experiments & Notes

### Kling 2.6 vs 3.0
- 2.6: Lower quality, content filters more aggressive, no Multi-Shot
- 3.0: Dramatically better faces, Multi-Shot for character consistency, 15s clips
- **3.0 requires Pro tier ($25.99/mo)**

### Alternatives Watched
- **Seedance 2.0 (ByteDance):** Potentially better quality but China-only access as of Feb 2026
- **Sora (OpenAI):** More artistic, less photorealistic
- **Runway Gen-3:** Good for abstract, weaker for human faces

### Key Insight
The most compelling AI videos prioritize **emotional beats over technical spectacle.** A close-up of tears hitting soil with perfect 35mm grain will outperform a complex action sequence that looks AI-generated. Play to the model's strengths: stillness, atmosphere, faces, light.

---

*Last updated: Feb 10, 2026. Update as new techniques are discovered.*
