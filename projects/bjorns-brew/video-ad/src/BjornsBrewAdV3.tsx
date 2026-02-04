import {
  AbsoluteFill,
  Img,
  Audio,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  Sequence,
  Easing,
  staticFile,
} from "remotion";

// ===== THEME =====
const COLORS = {
  copperRoast: "#C67B4E",
  blueMerle: "#5E7A8C",
  creamFoam: "#F5EDE4",
  espressoBark: "#2C1E1A",
  shepherdGold: "#E8B86D",
  overlay: "rgba(44, 30, 26, 0.7)",
  overlayLight: "rgba(245, 237, 228, 0.85)",
};

// ===== IMPROVED SPRING CONFIGS (from Motion Critic) =====
const SPRINGS = {
  punch: { damping: 14, stiffness: 280, mass: 0.5 },
  playful: { damping: 9, stiffness: 100, mass: 1.4 },
  confident: { damping: 18, stiffness: 200 },
  cta: { damping: 14, stiffness: 180, mass: 0.8 },
};

// ===== PAW STAMP WITH ANTICIPATION =====
const PawStamp: React.FC<{
  delay: number;
  size?: number;
  color?: string;
}> = ({ delay, size = 100, color = COLORS.copperRoast }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - delay;

  // Anticipation (wind up before stamp)
  const anticipation = interpolate(localFrame, [-10, 0], [1.1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // Main stamp with punch spring
  const stampScale = spring({
    frame: Math.max(0, localFrame),
    fps,
    config: SPRINGS.punch,
    from: 1.6,
    to: 1,
  });

  const scale = localFrame < 0 ? anticipation : stampScale;
  
  const rotation = spring({
    frame: Math.max(0, localFrame),
    fps,
    config: SPRINGS.confident,
    from: -15,
    to: 0,
  });

  const opacity = interpolate(localFrame, [-5, 5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (localFrame < -10) return null;

  return (
    <div
      style={{
        transform: `scale(${scale}) rotate(${rotation}deg)`,
        opacity,
      }}
    >
      <svg width={size} height={size} viewBox="0 0 100 100">
        <ellipse cx="50" cy="68" rx="28" ry="22" fill={color} />
        <ellipse cx="28" cy="35" rx="14" ry="16" fill={color} />
        <ellipse cx="72" cy="35" rx="14" ry="16" fill={color} />
        <ellipse cx="14" cy="58" rx="11" ry="13" fill={color} />
        <ellipse cx="86" cy="58" rx="11" ry="13" fill={color} />
      </svg>
    </div>
  );
};

// ===== SCENE WRAPPER WITH FADE TRANSITIONS =====
const Scene: React.FC<{
  children: React.ReactNode;
  bg?: "photo" | "solid" | "gradient";
  photoSrc?: string;
  bgColor?: string;
  fadeInFrames?: number;
  fadeOutFrames?: number;
}> = ({ children, bg = "solid", photoSrc, bgColor = COLORS.creamFoam, fadeInFrames = 12, fadeOutFrames = 18 }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Faster fade in, longer fade out to prevent ghosting
  const fadeIn = interpolate(frame, [0, fadeInFrames], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - fadeOutFrames, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });
  const opacity = Math.min(fadeIn, fadeOut);

  const scale = interpolate(
    frame,
    [0, 15, durationInFrames - 12, durationInFrames],
    [0.97, 1, 1, 1.02],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ opacity, transform: `scale(${scale})` }}>
      {bg === "photo" && photoSrc && (
        <Img
          src={staticFile(photoSrc)}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      )}
      {bg === "photo" && (
        <div style={{ position: "absolute", inset: 0, background: COLORS.overlay }} />
      )}
      {bg === "solid" && (
        <div style={{ position: "absolute", inset: 0, background: bgColor }} />
      )}
      {bg === "gradient" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(155deg, ${COLORS.creamFoam} 0%, ${COLORS.shepherdGold}40 100%)`,
          }}
        />
      )}
      {children}
    </AbsoluteFill>
  );
};

// ===== TEXT COMPONENTS =====
const Headline: React.FC<{
  text: string;
  delay?: number;
  size?: number;
  color?: string;
}> = ({ text, delay = 0, size = 64, color = COLORS.creamFoam }) => {
  const frame = useCurrentFrame();
  const localFrame = frame - delay;

  const opacity = interpolate(localFrame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const y = interpolate(localFrame, [0, 15], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <h1
      style={{
        fontSize: size,
        fontWeight: 800,
        color,
        textAlign: "center",
        margin: 0,
        padding: "0 40px",
        opacity,
        transform: `translateY(${y}px)`,
        textShadow: "2px 4px 8px rgba(0,0,0,0.3)",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        lineHeight: 1.1,
      }}
    >
      {text}
    </h1>
  );
};

const Subtext: React.FC<{
  text: string;
  delay?: number;
  size?: number;
  color?: string;
}> = ({ text, delay = 0, size = 28, color = COLORS.creamFoam }) => {
  const frame = useCurrentFrame();
  const localFrame = frame - delay;

  const opacity = interpolate(localFrame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <p
      style={{
        fontSize: size,
        color,
        textAlign: "center",
        margin: 0,
        padding: "0 50px",
        opacity,
        fontFamily: "system-ui, -apple-system, sans-serif",
        fontWeight: 500,
        textShadow: "1px 2px 4px rgba(0,0,0,0.2)",
      }}
    >
      {text}
    </p>
  );
};

// ===== ANIMATED COUNTER =====
const DonationCounter: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - delay;

  const count = interpolate(localFrame, [0, 36], [0, 183352], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.exp),
  });

  const scale = spring({
    frame: Math.max(0, localFrame - 30),
    fps,
    config: { damping: 12, stiffness: 200, mass: 0.6 },
    from: 0.85,
    to: 1,
  });

  const opacity = interpolate(localFrame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div 
      style={{ 
        textAlign: "center", 
        opacity,
        // Add dark backdrop for readability against busy backgrounds
        backgroundColor: "rgba(0,0,0,0.5)",
        padding: "30px 50px",
        borderRadius: 20,
      }}
    >
      <p style={{ 
        fontSize: 28, 
        color: COLORS.shepherdGold, 
        margin: "0 0 10px 0",
        textShadow: "0 2px 4px rgba(0,0,0,0.8)",
      }}>
        We've donated
      </p>
      <p
        style={{
          fontSize: 72,
          fontWeight: 800,
          color: COLORS.creamFoam,
          margin: 0,
          transform: `scale(${scale})`,
          textShadow: "0 4px 12px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.9)",
        }}
      >
        ${Math.floor(count).toLocaleString()}
      </p>
      <p style={{ 
        fontSize: 24, 
        color: COLORS.creamFoam, 
        marginTop: 15,
        textShadow: "0 2px 4px rgba(0,0,0,0.8)",
      }}>
        to animal charities 🐾
      </p>
    </div>
  );
};

// ===== CTA BUTTON =====
const CTAButton: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - delay;

  const scale = spring({
    frame: Math.max(0, localFrame),
    fps,
    config: SPRINGS.cta,
  });

  // Subtle pulse after landing
  const pulse = localFrame > 30 ? 1 + Math.sin((localFrame - 30) * 0.1) * 0.015 : 1;
  const finalScale = scale * pulse;

  const opacity = interpolate(localFrame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        backgroundColor: COLORS.copperRoast,
        padding: "20px 40px",
        borderRadius: 50,
        transform: `scale(${finalScale})`,
        opacity,
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
      }}
    >
      <p
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: COLORS.creamFoam,
          margin: 0,
        }}
      >
        ☕ Visit us today
      </p>
    </div>
  );
};

// ===== MAIN COMPOSITION =====
export const BjornsBrewAdV3: React.FC = () => {
  const { fps, height } = useVideoConfig();

  // Tighter timing per motion critic
  const SCENES = {
    hook: { start: 0, duration: 75 },      // 2.5s - punch the hook
    heart: { start: 75, duration: 105 },   // 3.5s - breathe here
    proof: { start: 180, duration: 90 },   // 3s
    cta: { start: 270, duration: 90 },     // 3s
    logo: { start: 360, duration: 90 },    // 3s
  };

  const isSquare = height === 1080;

  return (
    <AbsoluteFill style={{ background: COLORS.espressoBark }}>
      {/* ===== AUDIO ===== */}
      <Audio
        src={staticFile("background-music.mp3")}
        volume={0.3}
        startFrom={0}
      />

      {/* ===== SCENE 1: HOOK - Dog Photo with Brand ===== */}
      <Sequence from={SCENES.hook.start} durationInFrames={SCENES.hook.duration + 15}>
        <Scene bg="photo" photoSrc="dog-closeup.jpg" fadeInFrames={8} fadeOutFrames={20}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              gap: isSquare ? 15 : 25,
            }}
          >
            <div style={{ marginBottom: 10 }}>
              {/* Faster paw stamp to grab attention */}
              <PawStamp delay={3} size={isSquare ? 80 : 100} color={COLORS.shepherdGold} />
            </div>
            {/* Faster text appearance */}
            <Headline text="BJORN'S BREW" delay={8} size={isSquare ? 56 : 72} />
            <Subtext text="Salt Lake City" delay={18} size={isSquare ? 22 : 28} />
          </div>
        </Scene>
      </Sequence>

      {/* ===== SCENE 2: HEART - The Story ===== */}
      <Sequence from={SCENES.heart.start} durationInFrames={SCENES.heart.duration + 20}>
        <Scene bg="photo" photoSrc="aussie-dog.jpg">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              gap: isSquare ? 20 : 30,
              padding: isSquare ? 30 : 40,
            }}
          >
            <Headline 
              text="Named after Bjorn" 
              delay={15} 
              size={isSquare ? 48 : 58} 
            />
            <Subtext 
              text="Our beloved Australian Shepherd who inspired us to help animals everywhere" 
              delay={30} 
              size={isSquare ? 22 : 26}
            />
            <div style={{ marginTop: 20, display: "flex", gap: 15 }}>
              <PawStamp delay={50} size={50} color={COLORS.shepherdGold} />
              <PawStamp delay={58} size={50} color={COLORS.copperRoast} />
              <PawStamp delay={66} size={50} color={COLORS.blueMerle} />
            </div>
          </div>
        </Scene>
      </Sequence>

      {/* ===== SCENE 3: PROOF - The Impact ===== */}
      <Sequence from={SCENES.proof.start} durationInFrames={SCENES.proof.duration + 15}>
        {/* Faster fade out to prevent ghosting into CTA scene */}
        <Scene bg="photo" photoSrc="coffee-shop.jpg" fadeOutFrames={20}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <DonationCounter delay={8} />
          </div>
        </Scene>
      </Sequence>

      {/* ===== SCENE 4: CTA ===== */}
      <Sequence from={SCENES.cta.start} durationInFrames={SCENES.cta.duration + 25}>
        <Scene bg="photo" photoSrc="latte.jpg" fadeOutFrames={25}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              gap: isSquare ? 25 : 35,
            }}
          >
            <p
              style={{
                fontSize: isSquare ? 38 : 48,
                color: COLORS.creamFoam,
                fontStyle: "italic",
                textAlign: "center",
                margin: 0,
                padding: "0 40px",
                textShadow: "2px 4px 8px rgba(0,0,0,0.6)",
              }}
            >
              "Love Coffee. Love Animals."
            </p>
            <CTAButton delay={15} />
            {/* Earlier appearance, longer hold time for subtext */}
            <Subtext text="3 Salt Lake City locations" delay={25} size={22} />
          </div>
        </Scene>
      </Sequence>

      {/* ===== SCENE 5: LOGO LOCK ===== */}
      {/* Delay start slightly to let CTA scene fully fade out */}
      <Sequence from={SCENES.logo.start + 5} durationInFrames={SCENES.logo.duration - 5}>
        <Scene bg="gradient" fadeInFrames={15}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              gap: 15,
            }}
          >
            <PawStamp delay={8} size={80} color={COLORS.copperRoast} />
            <Headline 
              text="BJORN'S BREW" 
              delay={15} 
              size={isSquare ? 52 : 64} 
              color={COLORS.espressoBark}
            />
            <Subtext 
              text="@bjornsbrew" 
              delay={28} 
              size={24} 
              color={COLORS.blueMerle}
            />
          </div>
        </Scene>
      </Sequence>
    </AbsoluteFill>
  );
};
