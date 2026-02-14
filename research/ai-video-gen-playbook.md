# AI Video Generation Playbook
*Compiled Feb 14, 2026 — Reverse-engineered from top X/Twitter creators*

---

## 1. Top Videos Found

### 🏆 Tier 1: High-Engagement Cinematic Work

**1. @MrDasOnX — Sci-Fi Battlefield (Kling 2.6)**
- URL: https://x.com/MrDasOnX/status/2018327319950336215
- Tool: Kling 2.6 via @mitte_ai
- 34 likes, 5 RTs — genuinely impressive
- **FULL PROMPT SHARED:**
  > "A cinematic sci-fi battlefield at night during a violent thunderstorm. A lone armored warrior with a glowing blue visor stands on a cliff overlooking a massive ruined futuristic city. Heavy rain and wind tear through the scene, the warrior's cape whips aggressively. The camera begins with an intense close-up of the glowing visor and wet metallic armor, then slowly pulls back to a wide shot revealing burning wreckage, distant explosions, and smoke columns across the horizon. At second 6, the warrior raises a weapon upward and fires a brilliant blue energy beam into the sky. The beam lights up the storm clouds, splitting them apart with a shockwave ripple. At second 9, a gigantic alien mothership silhouette emerges above the clouds, illuminated by lightning and the beam glow. Ultra-realistic, epic scale, dramatic fog, cinematic IMAX lighting, slow-motion debris and sparks, intense atmosphere, film grain, high detail, blockbuster trailer look."
- **Why it works:** Timestamped action beats ("At second 6..."), specific camera movements, atmosphere stacking (rain + fog + sparks + debris), cinematic terminology ("IMAX lighting", "blockbuster trailer look")

**2. @OrctonAI — "Time to go Boom!" (Kling 3.0)**
- URL: https://x.com/OrctonAI/status/2021274641851957667
- 122 likes, 10 RTs — viral for AI video
- Tool: Kling 3.0
- No prompt shared — Orcton rarely shares prompts
- **Why it works:** Action focus, cinematic framing, post-production polish (Topaz upscaling, DaVinci Resolve editing, ElevenLabs sound)

**3. @OrctonAI — Kling 3.0 Multi-Shot "Visit Dad"**
- URL: https://x.com/OrctonAI/status/2022352860059701294
- 51 likes — uses Kling 3.0's new multi-shot feature
- Single prompt → multiple coherent shots

**4. @OrctonAI — "Last Stand" (Hailuo 2.3)**
- URL: https://x.com/OrctonAI/status/2021975823172116660
- 43 likes — Tool: Hailuo AI 2.3 + ElevenLabs sound
- Shows Hailuo can compete on cinematic quality

**5. @OrctonAI — Stunning Warrior (Grok Imagine Video)**
- URL: https://x.com/OrctonAI/status/2021959564837712247
- 70 likes — Grok's video model producing surprisingly good results
- Fantasy warrior + companion scene

**6. @Strength04_X — Monster Energy Action (Veo 3.1 + Nano Banana Pro)**
- URL: https://x.com/Strength04_X/status/2020034217103814659
- 180 likes — HUGE engagement
- **FULL PROMPT SHARED** (in tweet) — image-to-video workflow
- **Key technique:** Reference image uploaded + extremely detailed action choreography with locked camera
- Uses "Nano Banana Pro" (image gen) → Veo 3.1 (video gen)

**7. @Strength04_X — Zombie Soldier Action (Veo 3.1)**
- URL: https://x.com/Strength04_X/status/2017506033913024975
- 82 likes
- **FULL PROMPT SHARED** — extremely detailed with explicit style rules ("No slow motion", "No beauty shots", "Handheld, chaotic energy")
- **Key insight:** Telling the model what NOT to do is as important as what to do

**8. @Legoman_Grizu — Kling 2.6 Fight Scene**
- URL: https://x.com/Legoman_Grizu/status/1998704117821460603
- Tool: Kling 2.6, based on @OrctonAI's prompt structure
- "Both high levels of motion and slow motion" — mixed speed test
- Mentions "post workflow" beyond just the AI gen

**9. @Legoman_Grizu — Seedance 2.0 vs Kling 3.0 Comparison**
- URL: https://x.com/Legoman_Grizu/status/2022189568037204259
- Side-by-side same prompt: Seedance 2.0 (no ref image) vs Kling 3.0 (with ref image)
- Finding: "SD 2.0 nails the video with better contact physics (some morphing)"
- **Seedance wins on text-to-video; Kling wins with reference images**

**10. @SebJefferies — Highly Detailed Fight Scene (Kling 3.0)**
- URL: https://x.com/SebJefferies/status/2021616758831161369
- Multi-shot sequence, cinematic fight

**11. @SebJefferies — Ultra Realistic Action (Veo 3.1)**
- URL: https://x.com/SebJefferies/status/2021618668627775609
- Prompt shared in comments

**12. @ReggieaGames — Anime Fight Scene Comparison**
- URL: https://x.com/ReggieaGames/status/2021431420984623529
- **Critical finding:** "Made an anime fight scene in Seedance 2.0 with basically no details—and somehow it came out better than my Kling 3.0 version where I packed in camera cues, transitions, and audio notes."
- **LESS PROMPT CAN WIN on Seedance 2.0**

**13. @crazino87 — Full Cinematic Fight Animation (Grok)**
- URL: https://x.com/crazino87/status/2020809594948464761
- 25 likes — tested ALL tools, concluded: "Grok is cooking the hardest. speed, quality, character consistency, nothing else comes close"
- Making 15-scene fight animation across anime IPs

**14. @Sharon Riley — Veo 3.1 JSON Prompt (Ice Field)**
- URL: https://x.com/Just_sharon7/status/2016899468747284940
- 88 likes — Uses **JSON-structured prompts** for Veo 3.1
- Camera shots specified as structured data

**15. @itsyun_ai — SKULL.B.JACK Series (Multi-tool)**
- URL: https://x.com/itsyun_ai/status/1981743567866675672
- Tool chain: Midjourney (images) → Grok (upscale) → Sora (story cut) → CapCut (edit)
- 4 hours production time
- Shares character consistency tips in replies

---

## 2. Pattern Analysis

### What the Best Creators Do Differently

#### Prompt Structure
The best prompts follow this pattern:
1. **Setting/Environment** — location, time, weather, atmosphere
2. **Subject Description** — detailed character/object appearance
3. **Camera Movement** — specific start and end framing
4. **Action Choreography** — timestamped beats ("At second 3...", "At second 6...")
5. **Style Modifiers** — cinematic terminology stack
6. **Negative Instructions** — what NOT to do

#### Prompt Length
- **Veo 3.1 / Kling 3.0:** Long, detailed prompts (150-300 words) work best
- **Seedance 2.0:** SHORTER prompts often outperform detailed ones (per @ReggieaGames)
- **Grok Imagine:** Medium length, focus on mood and character

#### Model Selection by Creators
| Creator | Primary Model | Secondary | Post-Production |
|---------|--------------|-----------|-----------------|
| @OrctonAI | Kling 3.0 | Grok, Hailuo 2.3 | Topaz upscale, DaVinci Resolve, ElevenLabs |
| @Strength04_X | Veo 3.1 | Nano Banana Pro (img) | - |
| @Legoman_Grizu | Kling 2.6-3.0 | Seedance 2.0 | Post workflow (unspecified) |
| @crazino87 | Grok | Tested all | - |
| @itsyun_ai | Midjourney+Sora | Grok | CapCut |
| @MrDasOnX | Kling 2.6 | via Mitte AI | - |

#### Image-to-Video vs Text-to-Video
- **Most viral content uses image-to-video (I2V)** — @Strength04_X's 180-like hit used ref image
- **Seedance 2.0 is the exception** — excels at pure text-to-video
- **Best workflow:** Generate image in Midjourney/Flux/Grok → feed to Kling/Veo/Hailuo
- **Character consistency demands I2V** — you control the look via the source image

#### Multi-Character Scenes
- Generally AVOIDED by smart creators — single character focus dominates
- When attempted, Kling 3.0 multi-shot handles it best
- @crazino87's fight scenes use one-on-one framing per shot, edited together

#### Action/Combat Handling
- **Timestamped choreography** is the #1 technique (see @MrDasOnX prompt)
- **Slow-motion + normal speed mixing** tested by @Legoman_Grizu
- **Explicit "no slow motion" instructions** when you want raw speed (@Strength04_X)
- **Less detail sometimes = better action** on Seedance 2.0

#### Character Consistency
- **I2V with same reference image** across shots (most common)
- **Kling 3.0 multi-shot** maintains consistency within one generation
- **@itsyun_ai method:** Build character in Midjourney first, use same seed/style
- **Grok rated highest for consistency** by @crazino87

---

## 3. Model Selection Guide

### By Shot Type

| Shot Type | Best Model | Runner-up | Notes |
|-----------|-----------|-----------|-------|
| **Cinematic establishing** | Kling 3.0 | Veo 3.1 | Long prompts, atmosphere stacking |
| **Action/Fight** | Kling 3.0 | Seedance 2.0 | Kling needs detailed choreography; Seedance works with less |
| **Character close-up** | Grok Imagine | Hailuo 2.3 | Grok excels at faces/expressions |
| **Multi-shot sequence** | Kling 3.0 Multi-Shot | Seedance 2.0 | Kling's killer feature |
| **Dialogue/lip-sync** | Kling 3.0 | Seedance 2.0 | Both have native lip-sync |
| **Anime/stylized** | Seedance 2.0 | Kling 3.0 | Seedance handles style naturally |
| **Raw/handheld feel** | Veo 3.1 | - | Best for "documentary" gritty look |
| **Product/object focus** | Veo 3.1 + ref image | - | @Strength04_X's technique |

### By Workflow

| Workflow | Best Model |
|----------|-----------|
| Text-to-video (no image) | Seedance 2.0 |
| Image-to-video | Kling 3.0 |
| Multi-shot from one prompt | Kling 3.0 |
| Quick iteration/testing | Grok Imagine (fast, cheap) |
| Highest visual fidelity | Veo 3.1 |
| Best sound effects | Seedance 2.0 (native SFX) |

### Pricing Reality Check (from @simbakwekwe)
- Seedance 2.0 Standard: ~$42/mo (4,000-10,800 credits)
- Kling 3.0 Pro: ~$25-32/mo (3,000 credits)
- Seedance 2.0 Advanced: ~$84/mo
- Kling 3.0 Premier: ~$65/mo

---

## 4. Prompt Templates

### Template A: Epic Establishing Shot
```
A cinematic [SETTING] at [TIME] during [WEATHER/ATMOSPHERE]. [SUBJECT DESCRIPTION with specific details - armor, clothing, features]. [ENVIRONMENTAL DETAILS - what surrounds them]. The camera begins with [STARTING SHOT - e.g., "an intense close-up of the glowing visor and wet metallic armor"], then [CAMERA MOVEMENT - e.g., "slowly pulls back to a wide shot"] revealing [WIDER CONTEXT]. [ATMOSPHERE STACKING - fog, debris, sparks, rain]. Ultra-realistic, epic scale, cinematic IMAX lighting, film grain, high detail, blockbuster trailer look.
```

**Red Rising Example:**
```
A cinematic underground mine on Mars, vast and oppressive, lit by molten lava flows and industrial floodlights. A young Red worker, lean and scarred, with close-cropped dark hair and calloused hands, stands at the edge of a massive drill pit. Sweat glistens on sun-darkened skin. The camera begins with a tight close-up of his clenched fist gripping a helldiver's drill, then slowly pulls back revealing the enormous cavern, thousands of workers below like ants, massive mining machinery grinding against stone. Sparks cascade from drill points, dust particles catch the amber light, heat distortion rises from below. Ultra-realistic, epic scale, dramatic industrial lighting, cinematic IMAX quality, film grain, oppressive atmosphere, Denis Villeneuve aesthetic.
```

### Template B: Action/Fight Scene
```
[SETTING - one line]. [CHARACTER 1 description]. [CHARACTER 2 description if needed]. At second 1, [OPENING ACTION]. At second 3, [ESCALATION]. At second 5, [CLIMAX MOMENT with specific physical details]. At second 8, [AFTERMATH/REACTION]. [CAMERA STYLE]. [STYLE RULES - what to include AND what to exclude]. Ultra-realistic, [ATMOSPHERE TERMS].
```

**Red Rising Example:**
```
A dimly lit underground arena carved from Martian stone, torchlight flickering on obsidian walls. A Gold warrior in shimmering golden armor wields a razor that shifts between whip and blade form. At second 1, the Gold lunges forward, razor extending into whip form, slashing through the air with a metallic crack. At second 3, the opponent dodges, rolling under the whip and closing distance with inhuman speed. At second 5, the Gold retracts the razor into rigid blade form and brings it down in a devastating overhead strike, sparks erupting on impact. At second 8, the camera captures the Gold's face through their helmet visor, breathing hard, eyes burning with fury. Dynamic handheld camera, rapid cuts between wide and close-up. No slow motion. Aggressive pacing. Intense close-combat energy. Cinematic lighting, film grain, high contrast, dust particles in torchlight.
```

### Template C: Character Introduction (Close-up)
```
Cinematic close-up portrait shot. [DETAILED CHARACTER DESCRIPTION - face, expression, distinguishing features]. [LIGHTING SETUP]. [SUBTLE MOVEMENT - breathing, eyes shifting, hair moving]. [BACKGROUND - blurred or specific]. [EMOTIONAL TONE]. Shallow depth of field, anamorphic lens flare, film grain, photorealistic skin texture, 4K detail.
```

**Red Rising Example:**
```
Cinematic close-up portrait shot. A commanding Gold woman with sharp aristocratic features, platinum-blonde hair swept back in an elaborate braid, golden eyes that seem to glow with augmented irises. A thin scar traces from her left temple to jaw. She wears ornate golden armor with house sigils etched into the pauldrons. Warm amber side-lighting from a nearby holographic display casts sharp shadows across angular cheekbones. Her jaw tightens almost imperceptibly, eyes narrowing as she reads something off-screen. Vast Martian landscape visible through a panoramic window behind her, soft-focused. Regal menace, controlled fury. Shallow depth of field, anamorphic lens flare, film grain, photorealistic skin texture, 4K detail.
```

### Template D: Dialogue Scene (for lip-sync models)
```
[SETTING]. [CHARACTER at specific position]. The character speaks directly to camera/[other character]: "[DIALOGUE LINE]". [EMOTIONAL DELIVERY - whispered, shouted, measured]. [FACIAL EXPRESSIONS during delivery]. [CAMERA - static medium shot / slow push-in]. Natural lighting, shallow depth of field, intimate framing.
```

### Template E: JSON-Structured (for Veo 3.1)
Based on @Just_sharon7's technique:
```json
{
  "scene": {
    "type": "action",
    "environment": "Martian arena, underground, torch-lit",
    "time_of_day": "artificial light",
    "details": "Cinematic ultra-realistic, Denis Villeneuve aesthetic"
  },
  "subject": {
    "character": {
      "type": "Gold warrior",
      "appearance": "tall, golden armor, razor weapon",
      "actions": ["charging forward", "weapon strike", "defensive stance"]
    }
  },
  "camera": {
    "shots": [
      {"type": "low angle tracking", "focus": "character approaching"},
      {"type": "close-up", "focus": "face through visor, sweat, determination"},
      {"type": "wide establishing", "action": "aftermath of strike"}
    ]
  }
}
```

---

## 5. Workflow Recipes

### Recipe 1: The Standard I2V Pipeline (Most Common)
**Used by:** @Strength04_X, @itsyun_ai, @erice001

1. **Generate reference image** in Midjourney / Flux / Grok Imagine / Seedream
   - Get character/scene exactly right as a still
   - Use consistent style across all reference images
2. **Write video prompt** describing motion/action only (image handles the look)
3. **Generate video** in Kling 3.0 or Veo 3.1 with reference image
4. **Upscale** with Topaz Video AI
5. **Add sound** with ElevenLabs (dialogue) or Epidemic Sound (SFX/music)
6. **Edit** in DaVinci Resolve or CapCut

### Recipe 2: Seedance 2.0 Text-Only (Fast Iteration)
**Used by:** @ReggieaGames, @Legoman_Grizu

1. Write a **SHORT prompt** — Seedance prefers concise descriptions
2. Generate directly — no reference image needed
3. Seedance 2.0 generates native SFX (its killer feature)
4. Iterate rapidly — Seedance is fast
5. **Access:** Use Doubao.com with HK VPN (per @Legoman_Grizu's guide)

### Recipe 3: Kling 3.0 Multi-Shot Sequence
**Used by:** @OrctonAI, @SebJefferies, @Aladdin_Media

1. Write ONE comprehensive prompt covering the full sequence
2. Use Kling 3.0's multi-shot feature
3. It auto-generates multiple shots with visual continuity
4. Up to 15 seconds, multiple angles
5. Add sound in post

### Recipe 4: Multi-Tool Cinematic Short
**Used by:** @itsyun_ai (SKULL.B.JACK series — 4hr production)

1. **Storyboard** your sequence (shots, timing, mood)
2. **Generate all still frames** in Midjourney (character consistency via same style/seed)
3. **Upscale** interesting frames with Grok
4. **Animate each shot** separately in Sora/Kling/Seedance (match model to shot type)
5. **Assemble story** — cut in Sora or timeline editor
6. **Sound design** in CapCut or DaVinci Resolve
7. **Final edit** — color grade, transitions, music

### Recipe 5: Grok Speed Run
**Used by:** @crazino87, @OrctonAI

1. Use Grok Imagine for both image gen and video
2. Fastest iteration cycle — good for testing ideas
3. Best character consistency according to multi-tool testers
4. Lower ceiling than Kling/Veo but much faster workflow

---

## 6. Red Rising Specific

### Character Visual Bible
Before generating ANY video, create reference images for:
- **Darrow** — Red turned Gold, lean/muscular, dark hair, golden eyes (post-carving), scarred
- **Mustang/Virginia** — Platinum blonde, sharp features, golden armor with lion motifs
- **Sevro** — Small, feral, wolf-themed armor, mohawk
- **Cassius** — Classic golden beauty, perfect features, Apollo-like
- **The Jackal** — Lean, cold eyes, calculating expression

Use Midjourney or Flux to generate these, then use SAME reference images across all video gens.

### Scene-Specific Model Recommendations

| Scene Type | Model | Why |
|------------|-------|-----|
| Helldiver mining sequences | Kling 3.0 | Industrial atmosphere, dark lighting |
| Razor duels / The Passage | Kling 3.0 with timestamped choreography | Best action + I2V |
| Institute survival scenes | Seedance 2.0 | Natural environments, less gear needed |
| Gold society / galas | Veo 3.1 or Grok | Faces, expressions, luxury detail |
| Space battles | Kling 3.0 or Seedance 2.0 | Both handle VFX-heavy scenes |
| Emotional close-ups | Grok Imagine Video | Best faces/expressions |
| Multi-character dialogue | Kling 3.0 Multi-Shot | Consistency + lip-sync |

### Ready-to-Use Red Rising Prompts

**The Carving Scene:**
```
A dark medical chamber deep underground, sterile blue surgical lights illuminating a young man strapped to an operating table. His body convulses as bone-restructuring procedures transform him — muscles rippling, bones lengthening visibly under skin. At second 2, his eyes snap open, irises shifting from red-brown to molten gold. At second 5, he screams silently, back arching off the table, as golden pigment spreads across his skin like liquid metal. At second 8, he collapses, breathing hard, transformed — taller, stronger, beautiful and terrible. The camera circles slowly around the table. Harsh surgical lighting, body horror aesthetic, clinical precision mixed with mythic transformation. Cinematic, ultra-realistic, Ridley Scott aesthetic, film grain.
```

**Razor Duel:**
```
Two warriors in a torchlit stone arena. A tall Gold in crimson-trimmed armor wields a razor — a weapon that shifts from rigid blade to flexible whip. His opponent charges. At second 1, the razor extends into whip form, cracking through air. At second 3, the whip wraps around the opponent's blade, yanking it aside. At second 5, the Gold retracts the razor to sword form in one fluid motion and drives forward with a devastating thrust. At second 7, slow-motion capture of the impact — sparks, fragments of armor, the attacker's face twisted in effort through his visor. Dynamic combat camera, martial arts choreography, underground colosseum atmosphere. Cinematic, intense, practical stunt aesthetic, no CGI feel.
```

---

## 7. Common Mistakes (Where We've Probably Been Failing)

### ❌ Mistake 1: Over-Prompting on Seedance 2.0
**The evidence:** @ReggieaGames explicitly found that packing in "camera cues, transitions, and audio notes" on Kling produced WORSE results than a simple description on Seedance 2.0. Each model has different prompt sensitivity.
**Fix:** Keep Seedance prompts SHORT and descriptive. Save the detailed choreography for Kling/Veo.

### ❌ Mistake 2: Text-to-Video When You Should Be Doing Image-to-Video
**The evidence:** The highest-engagement videos almost universally use reference images. @Strength04_X's 180-like video explicitly uses "uploaded image as the exact visual reference."
**Fix:** Generate your character/scene as a still image FIRST, then animate it.

### ❌ Mistake 3: Not Using Timestamped Action Beats
**The evidence:** @MrDasOnX's viral prompt uses "At second 6..." and "At second 9..." — this gives the model a timeline to follow instead of trying to cram everything into random timing.
**Fix:** Structure action prompts with explicit second-by-second choreography.

### ❌ Mistake 4: No Post-Production
**The evidence:** @OrctonAI (highest engagement creator in our dataset) uses Topaz upscaling, DaVinci Resolve editing, and ElevenLabs sound on EVERY video. @itsyun_ai spends 4 hours per 30-second clip.
**Fix:** Raw AI output is a starting point. Budget time for: upscaling, color grading, sound design, editing.

### ❌ Mistake 5: Not Telling the Model What NOT to Do
**The evidence:** @Strength04_X's zombie scene explicitly says "No slow motion. No beauty shots. No cinematic lighting. No dramatic music." This prevents the model from defaulting to its "cinematic" fallback.
**Fix:** Add explicit negative instructions: "No slow motion", "No dramatic pauses", "Camera stays locked" etc.

### ❌ Mistake 6: Using One Model for Everything
**The evidence:** Every top creator uses 2-4 different models. @crazino87 tested all of them. @itsyun_ai uses Midjourney + Grok + Sora + CapCut.
**Fix:** Match the model to the shot type (see Model Selection Guide above).

### ❌ Mistake 7: Not Specifying Camera Explicitly
**The evidence:** Best prompts include specific camera instructions: "low front tracking", "dynamic side chase", "camera begins with close-up, pulls back to wide shot". Without this, models default to generic framing.
**Fix:** Always include camera movement/angle in your prompt.

### ❌ Mistake 8: Ignoring Aspect Ratio
**The evidence:** @fluttercube's detailed test showed native 9:16 vs cropping 16:9→9:16 produces dramatically different results. "The AI composes differently when it knows the canvas is vertical."
**Fix:** Generate in your final aspect ratio. Don't plan to crop later.

### ❌ Mistake 9: Trying Multi-Character Scenes Too Early
**The evidence:** Almost all high-engagement AI videos feature ONE character. Multi-character scenes are the hardest thing for AI video models and even top creators avoid them or handle them through editing multiple single-character shots together.
**Fix:** Focus on single-character shots, combine in post.

### ❌ Mistake 10: Not Using "Atmosphere Stacking"
**The evidence:** @MrDasOnX's prompt layers: "Heavy rain + wind + burning wreckage + distant explosions + smoke columns + slow-motion debris + sparks + film grain." This density of atmospheric elements creates cinematic depth.
**Fix:** Stack 4-6 atmospheric/environmental details in every cinematic prompt.

---

## 8. Key Creators to Follow

| Creator | Handle | Specialty | Follow Priority |
|---------|--------|-----------|----------------|
| Orcton | @OrctonAI | Kling master, highest engagement | ⭐⭐⭐ |
| Grizu | @Legoman_Grizu | Multi-model comparisons, fight scenes | ⭐⭐⭐ |
| M (Strength) | @Strength04_X | Veo 3.1 + ref images, shares full prompts | ⭐⭐⭐ |
| Mr Das | @MrDasOnX | Cinematic sci-fi, shares full prompts | ⭐⭐ |
| Crazino | @crazino87 | Multi-model testing, action/anime | ⭐⭐ |
| Sharon Riley | @Just_sharon7 | JSON prompt technique for Veo | ⭐⭐ |
| yun-ai | @itsyun_ai | Multi-tool workflow, character consistency | ⭐⭐ |
| Seb Jefferies | @SebJefferies | Fight scenes, Kling + Veo | ⭐ |

---

## 9. Access Notes

### Seedance 2.0
- Available on Doubao.com with HK VPN (per @Legoman_Grizu Feb 13 2026)
- Fast model now supports reference images
- No Chinese phone number needed for this method
- Also available through: TopView AI, OpenArt, NemoVideo, Mootion

### Kling 3.0
- Direct at klingai.com
- Also via Higgsfield AI (70% off deals spotted), Mitte AI, TopView AI
- Multi-shot is the standout feature

### Veo 3.1
- Via Google Gemini
- Also through Nano Banana Pro

### Grok Imagine Video
- Via X/Twitter (Grok)
- Fast, good consistency, free with X Premium

---

## 10. Quick-Start Checklist for Next Video

- [ ] Decide scene type (establishing / action / dialogue / close-up)
- [ ] Pick model based on scene type (see table in §3)
- [ ] Generate reference image in Midjourney/Flux first (unless using Seedance T2V)
- [ ] Write prompt using appropriate template from §4
- [ ] Include: camera movement, timestamped beats (for action), atmosphere stacking
- [ ] Include: negative instructions (what NOT to do)
- [ ] Generate in final aspect ratio
- [ ] Focus on single character per shot
- [ ] Post-production: upscale (Topaz), sound (ElevenLabs/Epidemic), edit (DaVinci/CapCut)
- [ ] Iterate — expect 3-5 generations before keeper

---

*Last updated: Feb 14, 2026. Sources: 50+ tweets analyzed from top AI video creators on X.*
