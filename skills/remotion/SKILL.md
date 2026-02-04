# Remotion Skill

Programmatic video creation using React components.

## Installation

```bash
# Global CLI
npm install -g @remotion/cli remotion

# Or per-project
npm install remotion @remotion/cli
```

## Quick Start

### Create New Project
```bash
# Clone hello-world template (bypasses interactive prompts)
git clone --depth 1 https://github.com/remotion-dev/template-helloworld.git my-video
cd my-video && rm -rf .git && npm install
```

### Project Structure
```
my-video/
├── src/
│   ├── Root.tsx          # Composition definitions
│   ├── HelloWorld.tsx    # Main video component
│   └── HelloWorld/       # Component assets
├── public/               # Static assets
└── remotion.config.ts    # Remotion config
```

## Key Commands

```bash
# Preview in browser (dev server)
npx remotion studio

# Render video
npx remotion render <CompositionId> <output.mp4>
npx remotion render HelloWorld out/video.mp4

# Render with custom props
npx remotion render HelloWorld out/video.mp4 --props='{"titleText":"Custom Title"}'

# Render still image
npx remotion still HelloWorld out/thumbnail.png --frame=75

# List compositions
npx remotion compositions
```

## Creating a Video Component

```tsx
// src/MyVideo.tsx
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

export const MyVideo: React.FC<{ title: string }> = ({ title }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // Animate opacity from 0 to 1 over first 30 frames
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });
  
  // Spring animation for scale
  const scale = spring({ frame, fps, config: { damping: 10 } });
  
  return (
    <AbsoluteFill style={{ backgroundColor: "#000", justifyContent: "center", alignItems: "center" }}>
      <h1 style={{ color: "#fff", fontSize: 100, opacity, transform: `scale(${scale})` }}>
        {title}
      </h1>
    </AbsoluteFill>
  );
};
```

## Register Composition

```tsx
// src/Root.tsx
import { Composition } from "remotion";
import { MyVideo } from "./MyVideo";
import { z } from "zod";

const schema = z.object({ title: z.string() });

export const RemotionRoot: React.FC = () => (
  <Composition
    id="MyVideo"
    component={MyVideo}
    durationInFrames={150}  // 5 seconds at 30fps
    fps={30}
    width={1920}
    height={1080}
    schema={schema}
    defaultProps={{ title: "Hello World" }}
  />
);
```

## Common Patterns

### Sequences (scenes)
```tsx
import { Sequence } from "remotion";

<AbsoluteFill>
  <Sequence from={0} durationInFrames={60}>
    <Intro />
  </Sequence>
  <Sequence from={60} durationInFrames={90}>
    <MainContent />
  </Sequence>
</AbsoluteFill>
```

### Audio
```tsx
import { Audio, staticFile } from "remotion";

<Audio src={staticFile("music.mp3")} volume={0.5} />
```

### Video clips
```tsx
import { Video, OffthreadVideo } from "remotion";

<OffthreadVideo src={staticFile("clip.mp4")} />
```

### Images
```tsx
import { Img, staticFile } from "remotion";

<Img src={staticFile("logo.png")} />
```

## Output Formats

```bash
# H.264 MP4 (default, most compatible)
npx remotion render MyVideo out.mp4

# ProRes (high quality, large)
npx remotion render MyVideo out.mov --codec=prores

# WebM (web-friendly)
npx remotion render MyVideo out.webm --codec=vp8

# GIF
npx remotion render MyVideo out.gif
```

## Useful Props for Render

```bash
--props='{"key":"value"}'  # Pass custom props
--scale=0.5                # Render at half resolution (faster)
--quality=80               # JPEG quality for stills
--concurrency=8            # Parallel frame rendering
--muted                    # Skip audio encoding
```

## Templates

- **hello-world**: Basic starter
- **template-next**: Next.js SaaS template
- **template-tts**: Text-to-speech video
- **template-audiogram**: Podcast waveform
- **template-three**: React Three Fiber 3D

Clone any: `git clone https://github.com/remotion-dev/template-<name>.git`

## Test Project Location

Working test project at: `~/clawd/projects/remotion-test/my-video/`

## Resources

- [Remotion Docs](https://www.remotion.dev/docs)
- [API Reference](https://www.remotion.dev/docs/api)
- [GitHub Templates](https://github.com/remotion-dev)
