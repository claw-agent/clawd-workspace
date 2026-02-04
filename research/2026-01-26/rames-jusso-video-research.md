# Research: Claude Code + Remotion + HeyGen Agent Skills

**Date:** 2026-01-26  
**Requested by:** Deep dive on @rames_jusso tweet about video production workflow  
**Time spent:** ~25 minutes  
**Source:** https://x.com/rames_jusso/status/2015579930684494043

---

## Key Findings

1. **Agent Skills** are a new open standard for giving AI coding agents (Claude Code, Cursor, etc.) domain-specific knowledge and capabilities via `SKILL.md` files
2. **HeyGen + Remotion Skills** enable conversational video production - describe what you want, Claude Code handles API calls, code generation, and composition
3. **The workflow produces professional explainer videos** with AI avatars + motion graphics in a single Claude Code session
4. **This is immediately applicable** to our Remotion video workflow at `~/clawd/projects/bjorns-brew/video-ad/`

---

## What James Russo Built

James Russo ([@Rames_Jusso](https://x.com/Rames_Jusso)) - who works at HeyGen building AI video generation - demonstrated a workflow combining:

### The Stack
- **Claude Code** - AI coding agent (conversational interface)
- **Remotion** - React-based programmatic video framework
- **HeyGen** - AI avatar video generation API
- **Agent Skills** - Domain knowledge packages

### Installation (One Command Each)
```bash
npx skills add remotion-dev/skills    # Remotion video creation knowledge
npx skills add heygen-com/skills      # HeyGen API knowledge
```

### The Initial Prompt (from gist)
> "I want to create an explainer video of how Claude Code skills work in general, and then go into more detail on the remotion and heygen skills and how they can be used to programmatically create videos with both narration and animations/motion graphics.
>
> We should start by creating a script utilizing the heygen skill for writing a script, and then once we have a script let's select an avatar using heygen skills and start generation of the avatar video.
>
> After we have kicked off the avatar video generation, we should work on the remotion code to create a composition that will be used to compose the final video.
>
> The composition should include a placeholder for the avatar video, and then we can add motion graphics and animations to the composition to help highlight the key parts and workflows of this setup. We should use an infographic style for our motion graphics and animations."

---

## Video Analysis (Final Output)

I downloaded and analyzed the final video from the reply tweet. Key observations:

### Video Structure (~3 minutes)
| Segment | Description |
|---------|-------------|
| 0:00-0:30 | Title: "Claude Code Skills" with AI avatar presenter |
| 0:30-1:30 | Explains Remotion skill - code editor mockups, feature cards |
| 1:30-2:30 | Explains HeyGen skill - shows video generation pipeline |
| 2:30-3:00 | "The Result" - benefits of conversational video creation |

### Visual Elements
- **AI Avatar**: Male presenter in brown blazer (HeyGen standard avatar)
- **Layout**: Split-screen - avatar on right, infographics on left
- **Motion Graphics**: 
  - Animated feature cards with checkmarks
  - Code editor mockups with syntax highlighting
  - Processing pipeline visualizations
  - Pill-shaped tags/buttons
- **Style**: Dark navy background, modern SaaS/tech aesthetic
- **Fun Easter Egg**: "I'm an AI avatar created using this exact process!"

### Production Quality
- Professional composition
- Smooth transitions
- Synchronized avatar speech with graphics
- Consistent color scheme (navy, teal, purple accents)

---

## How Agent Skills Work

### The Concept
Skills are **SKILL.md files** with YAML frontmatter containing procedural knowledge for specific domains. When Claude Code sees you're working with HeyGen or Remotion, it automatically applies the relevant knowledge.

### Installation Locations
```
~/.claude/skills/         # Global (all projects)
.claude/skills/           # Project-specific
```

### What HeyGen Skill Provides
From `/tmp/heygen-skills/skills/heygen/`:
- `authentication.md` - API key patterns
- `avatars.md` - Listing and selecting avatars
- `voices.md` - TTS configuration
- `video-generation.md` - V2 API workflow
- `remotion-integration.md` - **Critical for our use case**
- Plus: backgrounds, captions, dimensions, scripts, webhooks...

### What Remotion Skill Provides
- Component patterns
- Animation utilities
- Rendering workflows
- Frame-accurate video compositing

---

## Technical Deep Dive: HeyGen + Remotion Integration

### The Key Pattern

```typescript
// 1. Generate avatar video with HeyGen
const videoId = await generateVideo({
  video_inputs: [{
    character: { type: "avatar", avatar_id: avatarId, avatar_style: "normal" },
    voice: { type: "text", input_text: script, voice_id: voiceId },
    background: { type: "color", value: "#1a1a2e" }
  }],
  dimension: { width: 1920, height: 1080 }
});

// 2. Wait for completion (10-15+ minutes)
const avatarVideoUrl = await waitForVideo(videoId);

// 3. Use in Remotion composition
<OffthreadVideo src={avatarVideoUrl} />
```

### Critical Insights from Skills Docs

1. **Use `OffthreadVideo` not `Video`** - Prevents rendering jitter
2. **Parallel Development** - Start HeyGen generation, then build Remotion composition using placeholder while waiting
3. **Dimension Alignment** - HeyGen and Remotion must use identical `{ width, height }`
4. **Avatar's Default Voice** - Use `avatar.default_voice_id` for best results
5. **Generation Time** - Budget 10-15+ minutes; use async patterns

### Output Formats
| Format | Use Case |
|--------|----------|
| MP4 + background | Most cases - overlays go on top |
| WebM (transparent) | Avatar overlaid on other video content |

### Loom-Style Composition (Avatar PiP)
```tsx
<AbsoluteFill>
  <Video src={screenRecordingUrl} />
  <OffthreadVideo
    src={avatarWebmUrl}
    transparent
    style={{
      position: "absolute", bottom: 40, left: 40,
      width: 180, height: 180,
      borderRadius: "50%", // CSS circle mask
    }}
  />
</AbsoluteFill>
```

---

## Application to Our Remotion Workflow

### Current State
- Location: `~/clawd/projects/bjorns-brew/video-ad/`
- Stack: Remotion, manual composition
- Process: Brief → Art Direction → Code → Render

### What This Enables

| Before | After |
|--------|-------|
| Manual script writing | Conversational refinement with Claude |
| Static graphics only | AI avatar presenter + motion graphics |
| Separate tools for each step | Unified Claude Code session |
| Hours of composition work | "Describe what you want" |

### Potential Use Cases for Bjorn's Brew
1. **Product explainer videos** with AI presenter
2. **Social media ads** with talking avatar
3. **Tutorial content** with screen recording + avatar PiP
4. **Automated video variants** (different scripts, same composition)

---

## Confidence & Gaps

### High Confidence
- ✅ Agent Skills installation and usage pattern
- ✅ HeyGen API workflow documented in skills
- ✅ Remotion integration patterns
- ✅ Video analysis confirms production quality achievable

### Medium Confidence
- ⚠️ HeyGen pricing (API subscription separate from app subscription)
- ⚠️ Avatar selection quality (need to test various avatars)
- ⚠️ Generation time variance (10-15 min typical, can be longer)

### Unknown / To Research
- ❓ HeyGen API credit costs per video minute
- ❓ Custom avatar creation (Enterprise tier)
- ❓ Voice cloning capabilities
- ❓ Loom video demo (URL was slow/broken during research)

---

## Sources

1. **Tweet Thread**: https://x.com/rames_jusso/status/2015579930684494043
2. **Initial Prompt Gist**: https://gist.github.com/jrusso1020 (partial, truncated)
3. **HeyGen Skills Repo**: https://github.com/heygen-com/skills
4. **Remotion Skills Repo**: https://github.com/remotion-dev/skills
5. **Add-Skill CLI**: https://github.com/vercel-labs/add-skill
6. **Skills Directory**: https://skills.sh
7. **HeyGen API Docs**: https://docs.heygen.com
8. **Downloaded Video**: `~/clawd/research/2026-01-26/videos/reply_video.mp4`
9. **Extracted Frames**: `~/clawd/research/2026-01-26/videos/frames_*.jpg`

---

## Recommended Next Steps

### Immediate (This Week)
- [ ] Install HeyGen and Remotion skills globally:
  ```bash
  npx skills add remotion-dev/skills -a claude-code -g
  npx skills add heygen-com/skills -a claude-code -g
  ```
- [ ] Get HeyGen API key at https://app.heygen.com/settings
- [ ] Add `HEYGEN_API_KEY` to environment

### Short-Term (Next 2 Weeks)
- [ ] Create test video using Bjorn's Brew script
- [ ] Evaluate avatar options for brand fit
- [ ] Document cost per video for budget planning
- [ ] Build reusable Remotion composition template with avatar placeholder

### Medium-Term (Next Month)
- [ ] Integrate into video production pipeline
- [ ] Create "conversational video brief" workflow
- [ ] Consider custom avatar for brand consistency (if justified by volume)

### Add to TOOLS.md
```markdown
### Video Production (Agent Skills)
- **HeyGen Skill** — AI avatar video generation
  - Install: `npx skills add heygen-com/skills -a claude-code -g`
  - API Key: `HEYGEN_API_KEY` (get from HeyGen settings)
  - Docs: Skills provide context, see `~/.claude/skills/heygen/`
- **Remotion Skill** — Programmatic video framework knowledge
  - Install: `npx skills add remotion-dev/skills -a claude-code -g`
- **Workflow**: Describe video → Claude handles HeyGen API → Builds Remotion composition → Renders final
```

---

## Summary

James Russo's demo proves that **professional explainer videos with AI avatars can be created through conversation with Claude Code**. The combination of HeyGen (avatar generation) + Remotion (composition) + Agent Skills (domain knowledge) collapses what was a multi-tool, multi-hour process into a single Claude Code session.

The skills handle all the technical complexity - API authentication, video generation polling, Remotion component patterns, frame-accurate rendering. You just describe what you want.

**This is directly applicable to upgrading our Remotion video workflow.** The immediate next step is installing the skills and getting a HeyGen API key to experiment.
