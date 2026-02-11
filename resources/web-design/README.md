# Web Design Resources

Shared design system and templates for any web project. Not tied to slc-lead-gen — use these anywhere.

## Templates
- **service-business-v2.html** — Premium service business template with all modern patterns

## Design Language Spec
- **~/clawd/research/roofing-ui-design-language.md** — Full spec with patterns, CSS, color schemes (roofing-focused but patterns are universal)

## Reusable Components

### Typography System
```css
/* Display: Plus Jakarta Sans | Body: Inter */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');
h1, h2, h3, h4 { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
body { font-family: 'Inter', system-ui, sans-serif; }
h1 { font-size: clamp(2.25rem, 5vw, 4.5rem); font-weight: 800; line-height: 1.1; letter-spacing: -0.02em; }
h2 { font-size: clamp(1.75rem, 3.5vw, 3rem); font-weight: 700; line-height: 1.2; letter-spacing: -0.01em; }
```

### Scroll Reveal Animations
```css
.reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease, transform 0.6s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }
/* + stagger pattern for children */
```

### Premium Card Shadows
```css
.card-premium {
  box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04);
  border: 1px solid rgba(0,0,0,0.04);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card-premium:hover { transform: translateY(-6px); box-shadow: 0 12px 40px rgba(0,0,0,0.1); }
```

### Mobile Sticky CTA Bar
### FAQ Accordion
### Before/After Slider
### Animated Counters
### Section Labels (uppercase accent text)

All components are in the v2 template — copy what you need.

## Color Palettes

### Service Business (Default)
- Primary: Deep blue (#1e3a5f) — trust, professionalism
- Accent: Orange (#f97316) — urgency, CTAs
- Background: White + Light gray alternating

### XPERIENCE Roofing
- Primary: Deep navy (#1a1f3d)
- Accent: Burnt orange (#e85d26)
- Background: Warm white (#f8f6f3)

### Premium/Luxury
- Primary: Near-black (#0f172a)
- Accent: Gold (#d4a853)

## Key Principles
1. Customer-centric headlines (not company-centric)
2. CTAs every 1.5 viewport heights
3. Trust signals above the fold
4. Mobile-first (72%+ of service leads are mobile)
5. Generous whitespace = premium feel
6. Section labels above every h2
7. Never use "Submit" or "Contact Us" as CTA text
