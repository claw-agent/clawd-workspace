# Seedance 2.0 — Complete Playbook for Red Rising Video Production

> **Last Updated:** 2026-02-12 (launch day)
> **Platform:** Dreamina (dreamina.capcut.com) — international version of Jimeng AI
> **Model:** Seedance 2.0 by ByteDance Seed Team

---

## 🚀 Quick Start Workflow (Red Rising)

### 1. Access
- **Web:** [dreamina.capcut.com](https://dreamina.capcut.com) → AI Video → Select **Seedance 2.0**
- **Alternative:** Jimeng AI (China, needs Douyin account), Little Skylark mobile app
- Global Dreamina rollout completing late Feb 2026

### 2. Prepare Assets for a Scene (e.g., Darrow in the Institute)
1. **Character references** (2-3 images): Front, 3/4 angle, action pose — same lighting, same wardrobe
2. **Environment reference** (1-2 images): The Institute halls, Mars landscape
3. **Motion reference** (optional video): A tracking shot or fight choreography clip, ≤15s
4. **Audio reference** (optional): Score/narration clip, ≤15s, MP3

### 3. Generate
Upload assets → Write prompt with `@` tags → Set duration (5-15s) → Generate

**Example prompt:**
```
@Image1 as Darrow (main character reference). @Image2 as environment reference.
Camera follows @Video1's tracking motion. Darrow walks through a dark stone
corridor lit by flickering amber torches, wearing a tattered Red jumpsuit.
He pauses, clenches his fist, and looks up with fierce determination.
Low-angle shot, shallow depth of field. Cinematic color grading, cool
blue-grey tones with warm torch highlights. Dust particles in the air.
Lens switch to close-up of his scarred hands gripping a slingBlade.
```

### 4. Extend & Sequence
- Use **video extension**: feed output of Shot A as input, prompt Shot B
- Use the last frame of one clip as first frame of the next for continuity
- Stitch 15s clips in CapCut for longer sequences

---

## 📋 Technical Specifications

| Spec | Value |
|------|-------|
| **Max Resolution** | 2K (2048×1080 approx) |
| **Duration** | 4–15 seconds per generation |
| **Frame Rate** | 24 fps |
| **Aspect Ratios** | 16:9, 4:3, 1:1, 3:4, 9:16 |
| **Image Inputs** | Up to 9 per generation |
| **Video Inputs** | Up to 3 (≤15s each) |
| **Audio Inputs** | Up to 3 (≤15s each, MP3) |
| **Total Reference Files** | Up to 12 combined |
| **Native Audio** | Yes — dialogue, SFX, ambient, music (dual-channel stereo) |
| **Lip-sync Languages** | 8+ (English, Chinese, Japanese, Korean, Spanish, French, German, Portuguese) |
| **Generation Time** | ~60s standard; ~10 min for 15s with full references |
| **Watermark** | None |
| **Success Rate** | ~90% usable on first attempt |

### Pricing (Estimated)
| Platform | Cost |
|----------|------|
| Jimeng AI membership | ~$9.60/mo (~69 RMB) |
| Little Skylark | 3 free gens + 120 daily points (~15s free/day) |
| API Basic (720p) | ~$0.10/min |
| API Pro (1080p + audio) | ~$0.30/min |
| API Cinema (2K, full features) | ~$0.80/min |

---

## 🎬 The @ Reference System (Director-Level Control)

This is the killer feature. When you upload files, they get tagged `@Image1`, `@Video1`, `@Audio1` etc. Reference them in your prompt to assign specific roles:

### Reference Types
- **Character appearance:** `@Image1 for the main character's look`
- **Camera movement:** `Follow the camera motion from @Video1`
- **Scene/environment:** `@Image3 as the environment`
- **Motion choreography:** `Imitate the action of @Video2`
- **Audio/rhythm:** `@Audio1 for background music, sync to the beat`
- **Style transfer:** `Use visual style from @Video1 applied to @Image1`
- **Props/wardrobe:** `@Image4 for the character's weapon`
- **Storyboard:** `Refer to the shooting script in @Image1` (yes, it reads storyboards!)

### Two Entry Modes
1. **First/Last Frame Mode** — Upload start image (+ optional end image) + text. Best for simple shots.
2. **Universal Reference Mode** — Full multimodal. Mix images + videos + audio + text. This is where the magic is.

---

## 🎭 Character Consistency (Critical for Red Rising)

### The Problem
AI video models suffer from "identity drift" — characters subtly change appearance across frames/shots. For a film project with recurring characters (Darrow, Mustang, Sevro, Cassius), this is death.

### The Solution: Reference Hygiene

#### Rule 1: Fewer, Better References
- Use **2-3 images max** per character, not 6+
- More images = more variation for the model to average = more drift
- Reducing from 6 to 2 consistent refs reduced drift by ~60% in testing

#### Rule 2: Match Angle, Lighting, Wardrobe
- Keep reference angles similar (don't mix frontal with profile)
- Match lighting temperature (don't mix warm indoor + cool outdoor)
- Keep distinctive clothing consistent across refs

#### Rule 3: Anchor Prompts
Create a **Character Block** — an immutable text block you paste into every shot:

```
Character: Darrow, male, early 20s, tall athletic build, sharp jaw,
golden eyes (post-carving), close-cropped dark hair with subtle red
undertones, prominent scar across left cheekbone. Wearing weathered
Gold armor with Red sigil hidden underneath. Right-handed.
Keep these features unchanged. No mirrored features, no missing scars.
```

Include **negative anchors** for common drift offenders: `"No mirrored features, no missing piercings/scars."`

#### Rule 4: The Multi-Shot Workflow
1. **Fixed Character Block** — immutable text with all visual anchors
2. **Variable Scene Block** — scene-specific: camera, action, lighting, emotion
3. **Shot Ledger** — spreadsheet tracking: shot ID, character block, scene block, seed value, notes
4. **Consistency Pass** — only regenerate when character block changes

#### Drift Recovery
- **Minor** (missing accessory): Composite fix in After Effects
- **Major** (face shape change): Regenerate with stricter anchors + locked seed
- **Lens switch** keyword creates cuts within a single generation while maintaining continuity

### Red Rising Character Bible Approach
For each major character, prepare:
1. **Hero image** — highest resolution, front-facing, defining look
2. **3/4 profile** — same lighting, same outfit
3. **Action pose** — movement reference
4. **Character Block text** — paste into every prompt featuring that character

---

## 🎵 Audio Integration

### What Seedance 2.0 Can Do
- **Dual-Branch Diffusion Transformer** — generates audio and video simultaneously in one pass (not pasted on after)
- **Dual-channel stereo** for immersive sound
- **Multi-track output:** background music + ambient SFX + character voiceover, all aligned to visual rhythm
- **Phoneme-level lip-sync** across 8+ languages
- **ASMR-level detail:** frosted glass scratches, fabric rustling, metallic clinks, bubble wrap pops

### Audio Input Modes
- **Music beat-sync:** Upload a track → model syncs transitions, movements, effects to the beat
- **Audio reference:** Upload narration/dialogue → model lip-syncs characters
- **Prompt-driven audio keywords:** `"reverb"` for large spaces, `"muffled"` for enclosed, `"metallic clink"` for impacts

### Audio Formats
- **MP3** (confirmed), ≤15 seconds per clip, up to 3 audio clips

### Audio Limitations (Be Honest)
- Dialogue exceeding the time window gets unnaturally compressed/fast
- Multi-character dialogue can have voice-blending issues
- Synthesized speech occasionally sounds rushed
- Voice-from-photo feature was **suspended** due to privacy concerns

### Red Rising Audio Strategy
- Generate narration with Claw voice (TTS) → feed as audio reference for lip-sync
- Use score snippets as rhythm references for action sequences
- For dialogue scenes: generate video with native audio, then replace audio track in post with professional VO if needed

---

## 📝 Prompting Techniques

### Prompt Structure (Proven Pattern)
```
1. @ Asset references (what to use)
2. Action description (what happens — specific but concise)
3. Cinematography terms (how the camera moves)
4. Lighting/mood (atmosphere)
5. Style/color (look and feel)
```

### Camera Movement Keywords That Work
| Keyword | Effect |
|---------|--------|
| `dolly in / dolly out` | Forward/backward camera movement |
| `crane shot` | Vertical camera sweep |
| `tracking shot / lateral dolly` | Camera follows subject sideways |
| `handheld` | Slight shake, documentary feel |
| `Steadicam tracking` | Smooth follow |
| `Dutch angle` | Tilted frame |
| `orbit shot` | Camera circles subject |
| `Hitchcock zoom / dolly zoom` | Vertigo effect |
| `low-angle shot` | Looking up at subject |
| `high-angle shot` | Looking down |
| `aerial / drone shot` | Overhead movement |
| `whip pan` | Fast horizontal pan |
| `push in` | Gradual zoom toward subject |
| `lens switch` | **Cut to new shot** within same generation |

### Lens/DOF Keywords
- `wide-angle 24mm`, `telephoto compression`, `shallow depth of field`
- `background bokeh`, `rack focus`, `anamorphic flare`

### Lighting Keywords
- `three-point lighting`, `Rembrandt lighting`, `high-key`, `low-key`
- `practical sources`, `golden hour`, `blue hour`
- `chiaroscuro`, `volumetric light`, `god rays`
- `neon-lit`, `candlelit`, `torch-lit` (perfect for Red Rising underground scenes)

### Style/Mood Keywords
- `cinematic color grading`, `film grain`, `vintage film grain`
- `high contrast`, `desaturated`, `cool blue-grey tones`
- `epic scale`, `intimate close-up`, `oppressive atmosphere`
- `3D high-saturation animation style` (for stylized scenes)

### Emotional Endpoint Technique (via @YJstacked)
Name the **emotional destination** of the shot so the model works backwards from it.
Instead of describing only what happens, state where the emotion lands:
```
"...building to a moment of devastating realization — Darrow's face shifts
from determination to horror as he understands the cost."
```
The model reverse-engineers motion, pacing, and expression to hit that endpoint.

### Timestamp-Based Direction (via @YJstacked)
Direct action within the clip using time markers:
```
"0-2s: Wide establishing shot of the arena, dust settling.
 2-4s: Camera pushes in toward Darrow, breathing heavy.
 4-5s: Close-up snap to his eyes — pupils dilate."
```
Gives the model a shot list within a single generation. Works best with 5s clips.

### Negative Prompting
- Seedance 2.0 **does support negative anchors** in prompts
- Format: Include "No [thing]" statements: `"No mirrored features, no extra limbs, no text artifacts"`
- Works "surprisingly well" per testers

### What NOT to Do
- ❌ Vague: `"make it look cinematic"` or `"professional camera work"`
- ❌ Contradictory: Slow reference video + fast action prompt
- ❌ Overloaded: Exceeding 12 asset limit (model drops assets silently)
- ✅ Specific cinematography terms > vague adjectives
- ✅ Strong visual references + minimal text > elaborate text-only prompts

---

## 🎞️ Multi-Shot Storytelling

### How It Works
- Seedance 2.0 generates multi-shot narratives in a single generation (up to 15s)
- Use **"lens switch"** keyword to signal cuts between shots
- Characters maintain visual consistency across shots within a single generation
- Camera angles shift naturally, story flows logically

### Building Longer Sequences (>15s)
1. Generate Shot A (up to 15s)
2. Use **video extension**: `"Extend @Video1 by 5s. [continuation prompt]"`
3. Or use last frame of Shot A as first keyframe of Shot B
4. Stitch in CapCut or editor of choice

### Storyboard-to-Video
- **Yes, you can feed storyboards directly!**
- Upload hand-drawn storyboard or comic strip as image reference
- Model interprets panels, shot types, narrative flow
- Prompt: `"Refer to the shooting script in @Image1, draw on storyboard, shot scale, camera movement..."`
- Works with text-based shot lists too

### Red Rising Sequence Example
```
Shot 1 (5s): @Image1 Darrow, @Image2 mine interior. Low wide shot,
Darrow swings a drill in the helium-3 mines. Red dust swirls.
Oppressive amber lighting. Sound of grinding rock.

Lens switch.

Shot 2 (5s): Close-up of Darrow's face, sweat and grime, golden
eyes burning with suppressed rage. Shallow DOF, background blurred.
Heavy breathing audio.

Lens switch.

Shot 3 (5s): Wide crane shot pulling up and away as Darrow looks
up toward the distant surface. Light shifts from amber to cold blue.
Swelling orchestral score.
```

---

## 🔧 Video Editing & Extension

### Edit Without Regeneration
- Upload existing video + describe edits
- Model modifies specified elements while preserving everything else
- Examples: swap character costume, add element, change background

### Video Extension
- Upload a clip → prompt continuation
- Maintains continuity in motion, style, content
- Great for building longer Red Rising sequences iteratively

### Multi-Video Fusion
- Upload two clips → model creates transitional scene between them
- `"Create a scene between @Video1 and @Video2 where the character walks from one setting to the next"`

---

## 🤖 API / Programmatic Access

### Current Status (Feb 12, 2026)
- **Official BytePlus API:** Coming late February 2026
- **Third-party providers available NOW:**
  - WaveSpeed AI — pay-per-use, up to 10 concurrent renders
  - Replicate — developer-friendly
  - Fal.ai — serverless, fast scaling
  - Atlas Cloud — custom deployments

### API Capabilities
- All input types (text, image, video, audio)
- All generation modes (T2V, I2V, multimodal reference)
- Async: submit request → get job ID → poll/webhook for completion
- Output: MP4 at 720p/1080p/2K with embedded audio

### Enterprise Features (BytePlus)
- Custom rate limits, 99.99% uptime SLA
- SOC 2 Type II, HIPAA alignment
- Volume discounts, dedicated support, private deployment

### Automation Potential for Red Rising Pipeline
```
For each scene in storyboard:
  1. Upload character refs + scene refs via API
  2. Submit generation with scene prompt
  3. Poll for completion
  4. Download output
  5. Use output as input for next scene's extension
  6. Stitch final sequence
```

---

## ⚠️ Known Limitations & Workarounds

| Limitation | Workaround |
|------------|------------|
| **15s max per generation** | Stitch clips; use video extension for continuity |
| **Text rendering glitches** | Add text in post-production, not in generation |
| **~10% failure rate on complex scenes** | Budget for re-rolls; keep prompts and refs tight |
| **Peak queue times (1hr+)** | Generate during off-peak; batch overnight via API |
| **Realistic face upload blocked** | Use illustrated/stylized character refs, or complete identity verification |
| **Audio speed compression** | Keep dialogue short per clip; split long dialogue across multiple generations |
| **Identity drift across shots** | Character block + reference hygiene (see above) |
| **Extra limbs / disappearing objects** | Re-roll; simplify complex multi-object interactions |
| **Spatial reasoning failures** | Don't rely on maze/puzzle-type spatial logic |

---

## 🏆 Competitive Comparison

| Feature | Seedance 2.0 | Sora 2 | Kling 3.0 | Veo 3.1 |
|---------|-------------|--------|-----------|---------|
| Max Duration | 15s | 12s | 10s | 8s |
| Resolution | 2K | 1080p | 1080p | Up to 4K |
| Native Audio | Yes (stereo) | Yes | Yes | Yes |
| Image Inputs | Up to 9 | 1 | 1-2 | 1-2 |
| Video Inputs | Up to 3 | None | None | 1-2 |
| Audio Inputs | Up to 3 | None | None | None |
| Watermark | None | Yes | — | SynthID metadata |
| Cost per 10s | ~$0.60 | ~$1.00 | ~$0.50 | ~$2.50 |
| Best For | Creative control, multimodal | Physics, narrative | Motion, value | Cinematic polish |

**Seedance 2.0 wins for Red Rising because:** multimodal reference system, character consistency tools, longest duration, no watermark, best action/fight scene physics, storyboard input, and it's the cheapest premium option.

---

## 📐 Red Rising Production Pipeline

### Phase 1: Character Bible
1. Generate character concept art (Flux/ComfyUI or Midjourney)
2. Create 3 reference images per major character (Darrow, Mustang, Sevro, Cassius, Nero, Fitchner)
3. Write Character Block text for each
4. Store in `~/clawd/projects/red-rising/characters/`

### Phase 2: Storyboard
1. Write scene descriptions with shot breakdowns
2. Create visual storyboard panels (can be rough)
3. Map each scene to: characters needed, environment refs, camera style, audio needs

### Phase 3: Generation
1. For each shot: assemble refs (2-3 character + 1-2 environment + optional motion/audio)
2. Write prompt using @ syntax + character block
3. Generate, review, re-roll if needed
4. Use video extension for continuity between shots
5. Log everything in shot ledger

### Phase 4: Assembly
1. Stitch clips in CapCut or DaVinci Resolve
2. Add professional narration (Tim Gerard Reynolds style via Claw voice)
3. Color grade for consistency
4. Add titles/text in post (not in generation)
5. Final audio mix: score + SFX + narration

---

## 📚 Resources

- **Official blog:** [seed.bytedance.com/en/blog/official-launch-of-seedance-2-0](https://seed.bytedance.com/en/blog/official-launch-of-seedance-2-0)
- **Platform:** [dreamina.capcut.com](https://dreamina.capcut.com)
- **arXiv paper:** [arxiv.org/abs/2506.09113](https://arxiv.org/abs/2506.09113) (diffusion model architecture)
- **Character consistency guide:** Based on CrePal.ai field testing (42 sequences)
- **API providers:** WaveSpeed AI, Replicate, Fal.ai, Atlas Cloud
- **Upcoming:** CapCut integration, Higgsfield, Imagine.Art (late Feb 2026)
