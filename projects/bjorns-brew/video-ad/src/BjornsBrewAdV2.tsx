import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  Sequence,
  Easing,
} from "remotion";

// ===== THEME (from Art Director) =====
const COLORS = {
  copperRoast: "#C67B4E",
  blueMerle: "#5E7A8C",
  creamFoam: "#F5EDE4",
  espressoBark: "#2C1E1A",
  shepherdGold: "#E8B86D",
  warmCream: "#E8D9C8",
};

// ===== ANIMATED PAW STAMP (Signature Motion) =====
const PawStamp: React.FC<{
  delay: number;
  size?: number;
  color?: string;
  x?: string;
  y?: string;
}> = ({ delay, size = 80, color = COLORS.copperRoast, x = "50%", y = "50%" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stampFrame = frame - delay;

  const scale = spring({
    frame: stampFrame,
    fps,
    config: { damping: 8, stiffness: 150, mass: 0.6 },
    from: 1.5,
    to: 1,
  });

  const rotation = spring({
    frame: stampFrame,
    fps,
    config: { damping: 10, stiffness: 120 },
    from: -12,
    to: 0,
  });

  const opacity = interpolate(stampFrame, [0, 5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (stampFrame < 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`,
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

// ===== ANIMATED STEAM =====
const Steam: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const frame = useCurrentFrame();
  const steamFrame = frame - delay;

  const opacity = interpolate(steamFrame, [0, 15], [0, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const y1 = Math.sin((steamFrame + 0) * 0.15) * 5;
  const y2 = Math.sin((steamFrame + 8) * 0.15) * 5;
  const y3 = Math.sin((steamFrame + 16) * 0.15) * 5;

  if (steamFrame < 0) return null;

  return (
    <svg width="60" height="50" style={{ opacity }}>
      <path
        d={`M15 40 Q10 ${25 + y1} 15 10`}
        stroke={COLORS.warmCream}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d={`M30 40 Q25 ${20 + y2} 30 5`}
        stroke={COLORS.warmCream}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d={`M45 40 Q40 ${25 + y3} 45 10`}
        stroke={COLORS.warmCream}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
};

// ===== AUSSIE DOG SILHOUETTE =====
const AussieSilhouette: React.FC<{ size?: number; color?: string }> = ({
  size = 200,
  color = COLORS.espressoBark,
}) => {
  const frame = useCurrentFrame();
  // Subtle tail wag
  const tailWag = Math.sin(frame * 0.3) * 6;

  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      {/* Body */}
      <ellipse cx="45" cy="60" rx="25" ry="18" fill={color} />
      {/* Head */}
      <circle cx="72" cy="45" r="18" fill={color} />
      {/* Ear left */}
      <ellipse cx="62" cy="28" rx="8" ry="12" fill={color} transform="rotate(-15 62 28)" />
      {/* Ear right */}
      <ellipse cx="82" cy="30" rx="8" ry="12" fill={color} transform="rotate(15 82 30)" />
      {/* Snout */}
      <ellipse cx="88" cy="48" rx="10" ry="7" fill={color} />
      {/* Tail - animated */}
      <ellipse
        cx="18"
        cy="50"
        rx="12"
        ry="6"
        fill={color}
        transform={`rotate(${-20 + tailWag} 18 50)`}
      />
      {/* Legs */}
      <rect x="30" y="70" width="8" height="20" rx="4" fill={color} />
      <rect x="50" y="70" width="8" height="20" rx="4" fill={color} />
      {/* Eye (friendly) */}
      <circle cx="76" cy="42" r="3" fill={COLORS.creamFoam} />
      {/* Nose */}
      <ellipse cx="95" cy="47" rx="4" ry="3" fill={COLORS.espressoBark} />
    </svg>
  );
};

// ===== COFFEE CUP =====
const CoffeeCup: React.FC<{ size?: number }> = ({ size = 100 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    {/* Cup body */}
    <path
      d="M20 35 L25 85 C25 92 35 97 50 97 C65 97 75 92 75 85 L80 35 Z"
      fill={COLORS.creamFoam}
      stroke={COLORS.copperRoast}
      strokeWidth="3"
    />
    {/* Coffee surface */}
    <ellipse cx="50" cy="35" rx="30" ry="8" fill={COLORS.copperRoast} />
    {/* Handle */}
    <path
      d="M75 45 Q92 45 92 60 Q92 75 75 75"
      stroke={COLORS.copperRoast}
      strokeWidth="5"
      fill="none"
    />
    {/* Paw latte art */}
    <ellipse cx="50" cy="35" rx="8" ry="5" fill={COLORS.creamFoam} opacity="0.8" />
    <circle cx="43" cy="28" r="3" fill={COLORS.creamFoam} opacity="0.8" />
    <circle cx="57" cy="28" r="3" fill={COLORS.creamFoam} opacity="0.8" />
  </svg>
);

// ===== TEXT WITH STAGGER REVEAL =====
const StaggerText: React.FC<{
  text: string;
  startFrame: number;
  fontSize?: number;
  color?: string;
  fontFamily?: string;
  fontWeight?: number;
}> = ({
  text,
  startFrame,
  fontSize = 48,
  color = COLORS.espressoBark,
  fontFamily = "DM Sans, sans-serif",
  fontWeight = 500,
}) => {
  const frame = useCurrentFrame();
  const words = text.split(" ");

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
      {words.map((word, i) => {
        const wordDelay = startFrame + i * 4;
        const progress = interpolate(frame - wordDelay, [0, 12], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic),
        });

        const y = interpolate(progress, [0, 1], [30, 0]);
        const opacity = progress;

        return (
          <span
            key={i}
            style={{
              fontSize,
              fontFamily,
              fontWeight,
              color,
              transform: `translateY(${y}px)`,
              opacity,
              display: "inline-block",
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

// ===== MAIN COMPOSITION =====
export const BjornsBrewAdV2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Scene timings (15 seconds = 450 frames at 30fps)
  const SCENE = {
    hook: 0,           // 0-2s: Paw stamp + headline
    context: 60,       // 2-4s: Coffee moment
    heart: 120,        // 4-7s: Bjorn + the why
    proof: 210,        // 7-10s: $183K stat
    cta: 300,          // 10-13s: Tagline + CTA
    logo: 390,         // 13-15s: Logo lock
  };

  // Background gradient
  const bgOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // Donation counter
  const donationCount = interpolate(frame, [SCENE.proof, SCENE.proof + 60], [0, 183352], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // CTA button animation
  const ctaScale = spring({
    frame: frame - SCENE.cta - 30,
    fps,
    config: { damping: 10, stiffness: 100 },
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(155deg, ${COLORS.creamFoam} 0%, ${COLORS.warmCream} 100%)`,
        fontFamily: "'DM Sans', sans-serif",
        opacity: bgOpacity,
      }}
    >
      {/* ===== SCENE 1: HOOK (0-2s) ===== */}
      <Sequence from={SCENE.hook} durationInFrames={90}>
        <PawStamp delay={10} size={120} x="50%" y="35%" />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            width: "90%",
          }}
        >
          <StaggerText
            text="BJORN'S BREW"
            startFrame={25}
            fontSize={72}
            fontFamily="'Fraunces', Georgia, serif"
            fontWeight={700}
            color={COLORS.espressoBark}
          />
        </div>
        <PawStamp delay={50} size={50} color={COLORS.shepherdGold} x="20%" y="75%" />
        <PawStamp delay={60} size={40} color={COLORS.blueMerle} x="80%" y="70%" />
      </Sequence>

      {/* ===== SCENE 2: CONTEXT (2-4s) ===== */}
      <Sequence from={SCENE.context} durationInFrames={90}>
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
          <div style={{ position: "relative" }}>
            <CoffeeCup size={180} />
            <div style={{ position: "absolute", top: -30, left: "50%", transform: "translateX(-50%)" }}>
              <Steam delay={0} />
            </div>
          </div>
          <StaggerText
            text="Where every cup has a purpose"
            startFrame={20}
            fontSize={36}
            color={COLORS.blueMerle}
          />
        </div>
      </Sequence>

      {/* ===== SCENE 3: HEART (4-7s) ===== */}
      <Sequence from={SCENE.heart} durationInFrames={120}>
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
          <div
            style={{
              transform: `scale(${spring({
                frame: frame - SCENE.heart,
                fps,
                config: { damping: 12, stiffness: 80 },
              })})`,
            }}
          >
            <AussieSilhouette size={200} color={COLORS.blueMerle} />
          </div>
          <StaggerText
            text="Named after Bjorn"
            startFrame={30}
            fontSize={42}
            fontFamily="'Fraunces', Georgia, serif"
            fontWeight={700}
            color={COLORS.espressoBark}
          />
          <StaggerText
            text="our beloved Australian Shepherd"
            startFrame={45}
            fontSize={28}
            color={COLORS.blueMerle}
          />
        </div>
        <PawStamp delay={70} size={60} x="15%" y="80%" color={COLORS.copperRoast} />
      </Sequence>

      {/* ===== SCENE 4: PROOF (7-10s) ===== */}
      <Sequence from={SCENE.proof} durationInFrames={120}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            textAlign: "center",
            padding: 40,
          }}
        >
          <StaggerText
            text="We've donated"
            startFrame={5}
            fontSize={32}
            color={COLORS.blueMerle}
          />
          <p
            style={{
              fontSize: 88,
              fontFamily: "'Fraunces', Georgia, serif",
              fontWeight: 700,
              color: COLORS.copperRoast,
              margin: "20px 0",
              opacity: interpolate(frame - SCENE.proof, [15, 30], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            ${Math.floor(donationCount).toLocaleString()}
          </p>
          <StaggerText
            text="to local animal charities"
            startFrame={40}
            fontSize={32}
            color={COLORS.espressoBark}
          />
          <div style={{ marginTop: 30, display: "flex", gap: 15 }}>
            <PawStamp delay={60} size={45} x="0" y="0" color={COLORS.shepherdGold} />
            <PawStamp delay={68} size={45} x="0" y="0" color={COLORS.copperRoast} />
            <PawStamp delay={76} size={45} x="0" y="0" color={COLORS.blueMerle} />
          </div>
        </div>
      </Sequence>

      {/* ===== SCENE 5: CTA (10-13s) ===== */}
      <Sequence from={SCENE.cta} durationInFrames={120}>
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
          <p
            style={{
              fontSize: 44,
              fontFamily: "'Caveat', cursive",
              color: COLORS.blueMerle,
              opacity: interpolate(frame - SCENE.cta, [0, 20], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            Love Coffee. Love Animals.
          </p>
          <div
            style={{
              backgroundColor: COLORS.copperRoast,
              padding: "24px 48px",
              borderRadius: 50,
              transform: `scale(${ctaScale})`,
            }}
          >
            <p
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: COLORS.creamFoam,
                margin: 0,
              }}
            >
              ☕ Visit us today
            </p>
          </div>
          <p
            style={{
              fontSize: 22,
              color: COLORS.espressoBark,
              opacity: interpolate(frame - SCENE.cta, [40, 60], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            3 Salt Lake City locations
          </p>
        </div>
      </Sequence>

      {/* ===== SCENE 6: LOGO LOCK (13-15s) ===== */}
      <Sequence from={SCENE.logo} durationInFrames={60}>
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
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <AussieSilhouette size={80} color={COLORS.copperRoast} />
            <div>
              <p
                style={{
                  fontSize: 48,
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontWeight: 700,
                  color: COLORS.espressoBark,
                  margin: 0,
                }}
              >
                BJORN'S BREW
              </p>
              <p
                style={{
                  fontSize: 18,
                  color: COLORS.blueMerle,
                  margin: 0,
                  letterSpacing: 2,
                }}
              >
                SALT LAKE CITY
              </p>
            </div>
          </div>
          <p
            style={{
              fontSize: 20,
              fontFamily: "'Caveat', cursive",
              color: COLORS.copperRoast,
              marginTop: 10,
            }}
          >
            @bjornsbrew
          </p>
        </div>
        <PawStamp delay={20} size={100} x="85%" y="85%" color={COLORS.shepherdGold} />
      </Sequence>
    </AbsoluteFill>
  );
};
