# Video Production Pipeline

Create social media video ads using an agent-driven review workflow.

## Overview

This skill uses multiple specialized agents to review and refine video content at each stage, catching issues that a single pass would miss.

## Pipeline

```
User Brief
    ↓
┌─────────────────────┐
│  Creative Director  │ → Refines brief, emotional arc, storytelling
└─────────────────────┘
    ↓
┌─────────────────────┐
│    Art Director     │ → Colors, typography, visual specs
└─────────────────────┘
    ↓
┌─────────────────────┐
│   Code Generator    │ → Remotion TSX implementation
└─────────────────────┘
    ↓
┌─────────────────────┐
│       Render        │ → npx remotion render
└─────────────────────┘
    ↓
┌─────────────────────┐
│  Frame Extraction   │ → ffmpeg extracts key frames
└─────────────────────┘
    ↓
┌─────────────────────┐
│     Video QA        │ → Reviews actual pixels, catches issues
└─────────────────────┘
    ↓
    ↓ (issues found?)
    ↓
┌─────────────────────┐
│   Apply Fixes       │ → Code edits based on QA feedback
└─────────────────────┘
    ↓
    └──→ Re-render → QA again → Loop until good
```

## Agent Prompts

### 1. Creative Director
```
You are a Creative Director reviewing a video ad brief.
- Refine the creative brief with target audience, key messages, emotional tone
- Define the emotional arc (what should viewers FEEL at each moment?)
- Suggest visual concepts that tell a story
- Recommend reference styles
- Define what makes this brand-specific, not generic
```

### 2. Art Director
```
You are an Art Director specializing in motion graphics.
- Define color palette with hex codes (5 colors)
- Recommend typography (Google Fonts with weights)
- Specify animation style (spring configs, easing curves)
- Layout principles and visual hierarchy
- Output should be specific enough for a developer to implement
```

### 3. Motion Critic
```
You are a Senior Motion Designer at a top agency.
- Review timing & rhythm (scene durations, pacing)
- Evaluate easing & springs (character of motion)
- Check motion hierarchy (where does the eye go?)
- Assess transitions between scenes
- Identify missing polish details
- Provide specific frame numbers and spring configs
```

### 4. Video QA (Frame Analysis)
```
You are a Video QA Specialist reviewing rendered frames.
- Check text readability against backgrounds
- Identify timing issues (elements disappearing too fast)
- Spot ghosting/bleeding between transitions
- Verify framing and composition
- For each problem: which frame, what's wrong, specific fix
```

## Tools Required

### Free Tools
| Tool | Purpose | Install |
|------|---------|---------|
| Remotion | React video framework | `npm install remotion @remotion/cli` |
| ffmpeg | Frame extraction, audio | `brew install ffmpeg` |
| ImageMagick | Image processing | `brew install imagemagick` |
| Unsplash | Stock photos | https://unsplash.com (free) |
| Pixabay | Free music/video | https://pixabay.com (free) |
| LottieFiles | Animations | https://lottiefiles.com (free tier) |

### Remotion Packages
```bash
npm install remotion @remotion/cli @remotion/media-utils @remotion/noise @remotion/animation-utils
```

## Frame Extraction

Extract frames for QA review:
```bash
# 1 frame per second
ffmpeg -i video.mp4 -vf "fps=1" frames/frame_%02d.jpg

# Specific scene transitions
ffmpeg -i video.mp4 -vf "select='eq(n,0)+eq(n,74)+eq(n,179)'" -vsync vfr frames/scene_%02d.jpg
```

## Common Issues & Fixes

### Text Fades Too Fast
```typescript
// Increase fadeOutFrames from 12 to 20-25
const fadeOut = interpolate(frame, [duration - 25, duration], [1, 0], {...});
```

### Text Unreadable Against Busy Background
```typescript
// Add semi-transparent backdrop
style={{
  backgroundColor: "rgba(0,0,0,0.5)",
  padding: "30px 50px",
  borderRadius: 20,
}}
```

### Ghost Text Bleeding Through Transitions
```typescript
// Add buffer between scenes
<Sequence from={SCENE_END + 5}> // 5 frame gap
// OR increase fadeOutFrames to complete before next scene starts
```

### Hook Too Slow
```typescript
// Speed up initial fade-in
fadeInFrames={8}  // was 15
// Speed up first element delays
delay={3}  // was 10
```

### Springs Feel Identical
```typescript
// Use different spring configs for different purposes
const SPRINGS = {
  punch: { damping: 14, stiffness: 280, mass: 0.5 },   // impacts
  playful: { damping: 9, stiffness: 100, mass: 1.4 }, // entrances
  confident: { damping: 18, stiffness: 200 },         // text
  cta: { damping: 14, stiffness: 180, mass: 0.8 },    // buttons
};
```

## Project Structure

```
video-project/
├── src/
│   ├── index.tsx          # Composition registry
│   ├── VideoAd.tsx        # Main component
│   └── components/        # Reusable pieces
├── public/
│   ├── *.jpg              # Photos
│   └── *.mp3              # Audio
├── assets/                # Source files
├── out/                   # Rendered videos
├── review-frames/         # Extracted QA frames
└── AGENT-WORKFLOW.md      # Project-specific notes
```

## Usage

1. **Start with brief**: "15 second social ad for [brand]"
2. **Spawn Creative Director**: Get refined brief + emotional arc
3. **Spawn Art Director**: Get visual specs
4. **Generate code**: Implement in Remotion
5. **Render**: `npx remotion render src/index.tsx CompositionId out/video.mp4`
6. **Extract frames**: `ffmpeg -i out/video.mp4 -vf "fps=1" review-frames/frame_%02d.jpg`
7. **Spawn Video QA**: Review frames, get specific fixes
8. **Apply fixes**: Edit code based on QA feedback
9. **Loop**: Re-render → QA until acceptable

## Tips

- **Real photos > SVG illustrations** for authenticity
- **Audio doubles perceived production value** — always include music
- **Frame 1 must grab attention** — no slow fade-ins on hooks
- **Text needs 2+ seconds to read** — don't fade out too fast
- **Test at actual size** — what looks good on desktop may be unreadable on mobile
