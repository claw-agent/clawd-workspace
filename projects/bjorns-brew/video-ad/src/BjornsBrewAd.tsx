import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  Sequence,
} from "remotion";

const COLORS = {
  warmBrown: "#5D4037",
  cream: "#FFF8E7",
  coffeeAccent: "#8B4513",
  pawPink: "#FFB6C1",
  white: "#FFFFFF",
};

// Paw print SVG component
const PawPrint: React.FC<{ size?: number; color?: string }> = ({
  size = 40,
  color = COLORS.pawPink,
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <ellipse cx="50" cy="65" rx="25" ry="20" fill={color} />
    <ellipse cx="30" cy="35" rx="12" ry="15" fill={color} />
    <ellipse cx="70" cy="35" rx="12" ry="15" fill={color} />
    <ellipse cx="18" cy="55" rx="10" ry="12" fill={color} />
    <ellipse cx="82" cy="55" rx="10" ry="12" fill={color} />
  </svg>
);

// Coffee cup SVG
const CoffeeCup: React.FC<{ size?: number }> = ({ size = 120 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path
      d="M20 30 L25 85 C25 90 35 95 50 95 C65 95 75 90 75 85 L80 30 Z"
      fill={COLORS.warmBrown}
    />
    <ellipse cx="50" cy="30" rx="30" ry="8" fill={COLORS.coffeeAccent} />
    <path
      d="M80 40 Q95 40 95 55 Q95 70 80 70"
      stroke={COLORS.warmBrown}
      strokeWidth="6"
      fill="none"
    />
    {/* Steam */}
    <path
      d="M40 20 Q35 10 40 0"
      stroke={COLORS.cream}
      strokeWidth="3"
      fill="none"
      opacity="0.7"
    />
    <path
      d="M50 18 Q45 8 50 -2"
      stroke={COLORS.cream}
      strokeWidth="3"
      fill="none"
      opacity="0.7"
    />
    <path
      d="M60 20 Q55 10 60 0"
      stroke={COLORS.cream}
      strokeWidth="3"
      fill="none"
      opacity="0.7"
    />
  </svg>
);

export const BjornsBrewAd: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Animation timings (in frames)
  const logoStart = 0;
  const taglineStart = 60; // 2s
  const impactStart = 150; // 5s
  const ctaStart = 300; // 10s

  // Logo animation
  const logoScale = spring({
    frame: frame - logoStart,
    fps,
    config: { damping: 12 },
  });

  const logoOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Tagline animation
  const taglineOpacity = interpolate(frame, [taglineStart, taglineStart + 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const taglineY = interpolate(frame, [taglineStart, taglineStart + 30], [50, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Impact numbers animation
  const impactOpacity = interpolate(frame, [impactStart, impactStart + 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const donationAmount = interpolate(frame, [impactStart, impactStart + 90], [0, 183352], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // CTA animation
  const ctaScale = spring({
    frame: frame - ctaStart,
    fps,
    config: { damping: 10, stiffness: 100 },
  });

  const ctaOpacity = interpolate(frame, [ctaStart, ctaStart + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Paw prints floating animation
  const pawFloatY = Math.sin(frame * 0.05) * 10;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${COLORS.warmBrown} 0%, ${COLORS.coffeeAccent} 100%)`,
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Floating paw prints background */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "10%",
          transform: `translateY(${pawFloatY}px)`,
          opacity: 0.3,
        }}
      >
        <PawPrint size={60} color={COLORS.cream} />
      </div>
      <div
        style={{
          position: "absolute",
          top: "25%",
          right: "15%",
          transform: `translateY(${-pawFloatY}px)`,
          opacity: 0.3,
        }}
      >
        <PawPrint size={45} color={COLORS.cream} />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "30%",
          left: "8%",
          transform: `translateY(${pawFloatY * 0.5}px)`,
          opacity: 0.25,
        }}
      >
        <PawPrint size={50} color={COLORS.cream} />
      </div>

      {/* Main content container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          padding: "40px",
        }}
      >
        {/* Logo Section */}
        <Sequence from={logoStart}>
          <div
            style={{
              transform: `scale(${logoScale})`,
              opacity: logoOpacity,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CoffeeCup size={150} />
            <h1
              style={{
                fontSize: 72,
                fontWeight: 800,
                color: COLORS.cream,
                marginTop: 20,
                textAlign: "center",
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              BJORN'S BREW
            </h1>
          </div>
        </Sequence>

        {/* Tagline */}
        <Sequence from={taglineStart}>
          <div
            style={{
              opacity: taglineOpacity,
              transform: `translateY(${taglineY}px)`,
              marginTop: 40,
            }}
          >
            <p
              style={{
                fontSize: 42,
                color: COLORS.cream,
                textAlign: "center",
                fontStyle: "italic",
              }}
            >
              Love Coffee. Love Animals.
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 20,
                marginTop: 20,
              }}
            >
              <PawPrint size={50} />
              <PawPrint size={50} />
              <PawPrint size={50} />
            </div>
          </div>
        </Sequence>

        {/* Impact Stats */}
        <Sequence from={impactStart}>
          <div
            style={{
              opacity: impactOpacity,
              marginTop: 60,
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: 32,
                color: COLORS.pawPink,
                marginBottom: 10,
              }}
            >
              We've donated
            </p>
            <p
              style={{
                fontSize: 80,
                fontWeight: 800,
                color: COLORS.white,
                textShadow: "3px 3px 6px rgba(0,0,0,0.4)",
              }}
            >
              ${Math.floor(donationAmount).toLocaleString()}+
            </p>
            <p
              style={{
                fontSize: 28,
                color: COLORS.cream,
                marginTop: 10,
              }}
            >
              to local animal charities 🐾
            </p>
          </div>
        </Sequence>

        {/* CTA */}
        <Sequence from={ctaStart}>
          <div
            style={{
              opacity: ctaOpacity,
              transform: `scale(${ctaScale})`,
              marginTop: 60,
              backgroundColor: COLORS.cream,
              padding: "25px 50px",
              borderRadius: 50,
            }}
          >
            <p
              style={{
                fontSize: 36,
                fontWeight: 700,
                color: COLORS.warmBrown,
                margin: 0,
              }}
            >
              ☕ Grab a cup today!
            </p>
          </div>
          <p
            style={{
              fontSize: 24,
              color: COLORS.cream,
              marginTop: 30,
              opacity: ctaOpacity,
            }}
          >
            3 SLC locations • @bjornsbrew
          </p>
        </Sequence>
      </div>
    </AbsoluteFill>
  );
};
