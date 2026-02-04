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

// ===== THEME - Refined Palette =====
const COLORS = {
  copperRoast: "#C67B4E",
  blueMerle: "#5E7A8C", 
  creamFoam: "#F5EDE4",
  espressoBark: "#2C1E1A",
  shepherdGold: "#E8B86D",
  warmWhite: "#FFFAF5",
  overlay: "rgba(44, 30, 26, 0.65)",
  overlayDark: "rgba(44, 30, 26, 0.8)",
  glass: "rgba(255, 250, 245, 0.15)",
};

// ===== SPRING CONFIGS =====
const SPRINGS = {
  snappy: { damping: 16, stiffness: 300, mass: 0.4 },
  bouncy: { damping: 10, stiffness: 150, mass: 1 },
  smooth: { damping: 20, stiffness: 180 },
  pulse: { damping: 8, stiffness: 200, mass: 0.6 },
};

// ===== PAW PRINT COMPONENT =====
const PawPrint: React.FC<{
  delay: number;
  size?: number;
  color?: string;
  x?: number;
  y?: number;
}> = ({ delay, size = 60, color = COLORS.shepherdGold, x = 0, y = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - delay;

  const scale = spring({
    frame: Math.max(0, localFrame),
    fps,
    config: SPRINGS.snappy,
    from: 0,
    to: 1,
  });

  const opacity = interpolate(localFrame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (localFrame < 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
      }}
    >
      <svg width={size} height={size} viewBox="0 0 100 100">
        <ellipse cx="50" cy="65" rx="25" ry="20" fill={color} />
        <ellipse cx="30" cy="38" rx="12" ry="14" fill={color} />
        <ellipse cx="70" cy="38" rx="12" ry="14" fill={color} />
        <ellipse cx="18" cy="55" rx="10" ry="12" fill={color} />
        <ellipse cx="82" cy="55" rx="10" ry="12" fill={color} />
      </svg>
    </div>
  );
};

// ===== ANIMATED TEXT WITH BLUR-IN =====
const AnimatedText: React.FC<{
  text: string;
  delay?: number;
  fontSize?: number;
  color?: string;
  fontWeight?: number;
  maxWidth?: number;
}> = ({ text, delay = 0, fontSize = 48, color = COLORS.creamFoam, fontWeight = 700, maxWidth }) => {
  const frame = useCurrentFrame();
  const localFrame = frame - delay;

  const opacity = interpolate(localFrame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const y = interpolate(localFrame, [0, 18], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const blur = interpolate(localFrame, [0, 12], [8, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        fontSize,
        fontWeight,
        color,
        textAlign: "center",
        opacity,
        transform: `translateY(${y}px)`,
        filter: `blur(${blur}px)`,
        textShadow: "0 4px 12px rgba(0,0,0,0.5)",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        lineHeight: 1.15,
        maxWidth: maxWidth || "90%",
        margin: "0 auto",
        padding: "0 20px",
      }}
    >
      {text}
    </div>
  );
};

// ===== DONATION COUNTER WITH GLASS CARD =====
const DonationCounter: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - delay;

  const count = interpolate(localFrame, [0, 45], [0, 183352], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.exp),
  });

  const cardScale = spring({
    frame: Math.max(0, localFrame),
    fps,
    config: SPRINGS.smooth,
    from: 0.8,
    to: 1,
  });

  const opacity = interpolate(localFrame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtle shimmer on the number after counting
  const shimmer = localFrame > 45 ? 1 + Math.sin((localFrame - 45) * 0.08) * 0.02 : 1;

  return (
    <div
      style={{
        opacity,
        transform: `scale(${cardScale})`,
        backgroundColor: COLORS.overlayDark,
        backdropFilter: "blur(20px)",
        borderRadius: 24,
        padding: "40px 60px",
        border: `1px solid ${COLORS.glass}`,
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
      }}
    >
      <p
        style={{
          fontSize: 24,
          color: COLORS.shepherdGold,
          margin: "0 0 12px 0",
          textTransform: "uppercase",
          letterSpacing: 3,
          fontWeight: 600,
        }}
      >
        We've Donated
      </p>
      <p
        style={{
          fontSize: 80,
          fontWeight: 800,
          color: COLORS.creamFoam,
          margin: 0,
          transform: `scale(${shimmer})`,
          textShadow: "0 4px 20px rgba(230, 184, 109, 0.4)",
        }}
      >
        ${Math.floor(count).toLocaleString()}
      </p>
      <p
        style={{
          fontSize: 22,
          color: COLORS.creamFoam,
          marginTop: 16,
          opacity: 0.9,
        }}
      >
        to animal rescues 🐾
      </p>
    </div>
  );
};

// ===== CTA BUTTON =====
const CTAButton: React.FC<{ delay?: number; text?: string }> = ({ delay = 0, text = "Visit Us Today" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - delay;

  const scale = spring({
    frame: Math.max(0, localFrame),
    fps,
    config: SPRINGS.pulse,
    from: 0,
    to: 1,
  });

  // Gentle breathing after landing
  const breath = localFrame > 20 ? 1 + Math.sin((localFrame - 20) * 0.12) * 0.02 : 1;

  const opacity = interpolate(localFrame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        backgroundColor: COLORS.copperRoast,
        padding: "22px 50px",
        borderRadius: 60,
        transform: `scale(${scale * breath})`,
        opacity,
        boxShadow: "0 6px 24px rgba(198, 123, 78, 0.5)",
      }}
    >
      <p
        style={{
          fontSize: 26,
          fontWeight: 700,
          color: COLORS.warmWhite,
          margin: 0,
          letterSpacing: 1,
        }}
      >
        ☕ {text}
      </p>
    </div>
  );
};

// ===== SCENE WRAPPER =====
const Scene: React.FC<{
  children: React.ReactNode;
  photoSrc?: string;
  overlayOpacity?: number;
  gradient?: boolean;
  fadeIn?: number;
  fadeOut?: number;
}> = ({ children, photoSrc, overlayOpacity = 0.65, gradient = false, fadeIn = 15, fadeOut = 20 }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const fadeInOpacity = interpolate(frame, [0, fadeIn], [0, 1], { extrapolateRight: "clamp" });
  const fadeOutOpacity = interpolate(frame, [durationInFrames - fadeOut, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });
  const opacity = Math.min(fadeInOpacity, fadeOutOpacity);

  // Subtle zoom
  const scale = interpolate(frame, [0, durationInFrames], [1, 1.08], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity }}>
      {photoSrc && (
        <Img
          src={staticFile(photoSrc)}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${scale})`,
          }}
        />
      )}
      {photoSrc && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `rgba(44, 30, 26, ${overlayOpacity})`,
          }}
        />
      )}
      {gradient && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(160deg, ${COLORS.creamFoam} 0%, ${COLORS.shepherdGold}50 50%, ${COLORS.copperRoast}30 100%)`,
          }}
        />
      )}
      {children}
    </AbsoluteFill>
  );
};

// ===== MAIN COMPOSITION =====
export const BjornsBrewAdV2New: React.FC = () => {
  const { height } = useVideoConfig();
  const isSquare = height === 1080;

  // Scene timing (15s total at 30fps = 450 frames)
  const TIMING = {
    hook: { start: 0, duration: 80 },        // 2.7s - attention grab
    story: { start: 80, duration: 100 },     // 3.3s - emotional connection
    proof: { start: 180, duration: 90 },     // 3s - credibility
    cta: { start: 270, duration: 90 },       // 3s - call to action  
    logo: { start: 360, duration: 90 },      // 3s - brand lock
  };

  return (
    <AbsoluteFill style={{ background: COLORS.espressoBark }}>
      {/* Audio */}
      <Audio src={staticFile("background-music.mp3")} volume={0.25} startFrom={0} />

      {/* ===== SCENE 1: HOOK - Eye-catching dog close-up ===== */}
      <Sequence from={TIMING.hook.start} durationInFrames={TIMING.hook.duration + 15}>
        <Scene photoSrc="aussie-closeup-new.jpg" overlayOpacity={0.55} fadeOut={18}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              gap: 20,
            }}
          >
            <PawPrint delay={5} size={isSquare ? 70 : 90} color={COLORS.shepherdGold} y={-80} />
            <AnimatedText
              text="BJORN'S BREW"
              delay={12}
              fontSize={isSquare ? 58 : 76}
              fontWeight={800}
            />
            <AnimatedText
              text="Salt Lake City's Dog-Loving Coffee Shop"
              delay={28}
              fontSize={isSquare ? 24 : 28}
              fontWeight={500}
              color={COLORS.shepherdGold}
            />
          </div>
        </Scene>
      </Sequence>

      {/* ===== SCENE 2: STORY - The why behind the brand ===== */}
      <Sequence from={TIMING.story.start} durationInFrames={TIMING.story.duration + 18}>
        <Scene photoSrc="aussie-happy-new.jpg" overlayOpacity={0.6}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              gap: 25,
              padding: 40,
            }}
          >
            <AnimatedText
              text="Named after Bjorn"
              delay={18}
              fontSize={isSquare ? 50 : 60}
            />
            <AnimatedText
              text="Our Australian Shepherd who inspired us to give back to animals everywhere"
              delay={35}
              fontSize={isSquare ? 24 : 28}
              fontWeight={400}
              maxWidth={800}
            />
            <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
              <PawPrint delay={55} size={45} color={COLORS.shepherdGold} x={-60} y={0} />
              <PawPrint delay={62} size={45} color={COLORS.copperRoast} x={0} y={0} />
              <PawPrint delay={69} size={45} color={COLORS.blueMerle} x={60} y={0} />
            </div>
          </div>
        </Scene>
      </Sequence>

      {/* ===== SCENE 3: PROOF - Social proof with donation counter ===== */}
      <Sequence from={TIMING.proof.start} durationInFrames={TIMING.proof.duration + 15}>
        <Scene photoSrc="coffee-interior-new.jpg" overlayOpacity={0.7} fadeOut={18}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <DonationCounter delay={10} />
          </div>
        </Scene>
      </Sequence>

      {/* ===== SCENE 4: CTA - Drive action ===== */}
      <Sequence from={TIMING.cta.start} durationInFrames={TIMING.cta.duration + 20}>
        <Scene photoSrc="latte-art-new.jpg" overlayOpacity={0.6} fadeOut={22}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              gap: 30,
            }}
          >
            <AnimatedText
              text={`"Love Coffee.\nLove Animals."`}
              delay={10}
              fontSize={isSquare ? 44 : 52}
              fontWeight={600}
            />
            <div style={{ marginTop: 10 }}>
              <CTAButton delay={25} />
            </div>
            <AnimatedText
              text="3 Salt Lake City Locations"
              delay={40}
              fontSize={22}
              fontWeight={500}
              color={COLORS.shepherdGold}
            />
          </div>
        </Scene>
      </Sequence>

      {/* ===== SCENE 5: LOGO LOCK - Brand recall ===== */}
      <Sequence from={TIMING.logo.start + 8} durationInFrames={TIMING.logo.duration - 8}>
        <Scene gradient fadeIn={18}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              gap: 18,
            }}
          >
            <PawPrint delay={10} size={90} color={COLORS.copperRoast} y={-60} />
            <AnimatedText
              text="BJORN'S BREW"
              delay={18}
              fontSize={isSquare ? 54 : 68}
              fontWeight={800}
              color={COLORS.espressoBark}
            />
            <AnimatedText
              text="@bjornsbrew"
              delay={32}
              fontSize={26}
              fontWeight={500}
              color={COLORS.blueMerle}
            />
          </div>
        </Scene>
      </Sequence>
    </AbsoluteFill>
  );
};
