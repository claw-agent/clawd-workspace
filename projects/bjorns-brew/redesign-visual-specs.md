# Visual Design Specifications
## Bjorn's Brew Menu Board Redesign

*Created: January 24, 2026*
*Status: Production-Ready*

---

## 1. Color Palette

### Primary Brand Colors

| Role | Color | Hex | RGB | Usage |
|------|-------|-----|-----|-------|
| **Forest Green** | ![#226246](https://via.placeholder.com/15/226246/226246) | `#226246` | 34, 98, 70 | Headers, section dividers, accent bars |
| **Warm Beige** | ![#F5EDE4](https://via.placeholder.com/15/F5EDE4/F5EDE4) | `#F5EDE4` | 245, 237, 228 | Primary background |
| **Blush Pink** | ![#E8B4B8](https://via.placeholder.com/15/E8B4B8/E8B4B8) | `#E8B4B8` | 232, 180, 184 | Featured highlights, callouts |
| **Cream White** | ![#FFFEF9](https://via.placeholder.com/15/FFFEF9/FFFEF9) | `#FFFEF9` | 255, 254, 249 | Cards, content boxes |

### Secondary / Supporting Colors

| Role | Color | Hex | RGB | Usage |
|------|-------|-----|-----|-------|
| **Deep Charcoal** | ![#2D2D2D](https://via.placeholder.com/15/2D2D2D/2D2D2D) | `#2D2D2D` | 45, 45, 45 | Primary body text |
| **Warm Gray** | ![#6B635B](https://via.placeholder.com/15/6B635B/6B635B) | `#6B635B` | 107, 99, 91 | Descriptions, secondary text |
| **Muted Green** | ![#4A8C6A](https://via.placeholder.com/15/4A8C6A/4A8C6A) | `#4A8C6A` | 74, 140, 106 | Icons, secondary accents |
| **Soft Coral** | ![#D4A59A](https://via.placeholder.com/15/D4A59A/D4A59A) | `#D4A59A` | 212, 165, 154 | Price highlights, seasonal tags |

### Functional Colors

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| **Star/Featured** | `#D4AF37` | Gold callout badges |
| **Vegan/Plant** | `#5B8C5A` | Plant-based indicators |
| **Sugar-Free** | `#8BA4B0` | SF badge backgrounds |
| **Seasonal** | `#C17B5A` | Limited-time items |

### Color Application Map

```
┌────────────────────────────────────────────────────────────────┐
│ HEADER BAR: Forest Green #226246 with Cream #FFFEF9 text      │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  BACKGROUND: Warm Beige #F5EDE4                                │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ FEATURED CARD: Blush Pink #E8B4B8 border (2px)          │  │
│  │ Background: Cream White #FFFEF9                          │  │
│  │ Text: Deep Charcoal #2D2D2D                              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                │
│  SECTION HEADERS: Forest Green #226246                        │
│  ITEM NAMES: Deep Charcoal #2D2D2D                            │
│  DESCRIPTIONS: Warm Gray #6B635B                               │
│  PRICES: Warm Gray #6B635B (de-emphasized)                    │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│ FOOTER BAR: Forest Green #226246 (mission statement)          │
└────────────────────────────────────────────────────────────────┘
```

---

## 2. Typography

### Font Families

| Element | Primary Font | Fallback Stack | Source |
|---------|-------------|----------------|--------|
| **Headers** | Josefin Sans | 'Helvetica Neue', Arial, sans-serif | Google Fonts |
| **Body Text** | Inter | 'SF Pro Text', 'Segoe UI', sans-serif | Google Fonts |
| **Accent/Feature** | Playfair Display | Georgia, serif | Google Fonts |

**Google Fonts Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Josefin+Sans:wght@500;600;700&family=Playfair+Display:wght@500;600&display=swap');
```

### Type Scale (10-15 ft viewing distance)

| Element | Size (pt) | Size (in) | Weight | Line Height | Letter Spacing |
|---------|-----------|-----------|--------|-------------|----------------|
| **Main Title** | 72pt | 1.0" | 700 (Bold) | 1.1 | 0.02em |
| **Section Headers** | 48pt | 0.67" | 600 (SemiBold) | 1.2 | 0.03em |
| **Item Names** | 36pt | 0.5" | 600 (SemiBold) | 1.3 | 0.01em |
| **Item Descriptions** | 24pt | 0.33" | 400 (Regular) | 1.4 | 0em |
| **Prices** | 28pt | 0.39" | 500 (Medium) | 1.2 | 0em |
| **Size Labels** | 18pt | 0.25" | 500 (Medium) | 1.3 | 0.05em |
| **Badges/Tags** | 16pt | 0.22" | 600 (SemiBold) | 1.2 | 0.03em |
| **Footer/Legal** | 20pt | 0.28" | 400 (Regular) | 1.4 | 0em |

### Typography Rules

**DO:**
- Use ALL CAPS for section headers only
- Use Title Case for item names
- Use sentence case for descriptions
- Maintain consistent baseline alignment

**DON'T:**
- Mix more than 3 font families
- Use italic for menu items (readability)
- Stretch or compress fonts
- Use light weights (< 400) for any text

### CSS Typography Tokens

```css
:root {
  /* Font Families */
  --font-header: 'Josefin Sans', 'Helvetica Neue', sans-serif;
  --font-body: 'Inter', 'SF Pro Text', sans-serif;
  --font-accent: 'Playfair Display', Georgia, serif;

  /* Font Sizes */
  --text-title: 72pt;
  --text-section: 48pt;
  --text-item: 36pt;
  --text-description: 24pt;
  --text-price: 28pt;
  --text-label: 18pt;
  --text-badge: 16pt;
  --text-footer: 20pt;

  /* Font Weights */
  --weight-regular: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;

  /* Line Heights */
  --leading-tight: 1.1;
  --leading-snug: 1.2;
  --leading-normal: 1.3;
  --leading-relaxed: 1.4;
}
```

---

## 3. Visual Elements

### 3.1 Logo Placement

**Primary Position:** Top-left corner
- **Size:** 4" × 4" maximum
- **Clear space:** Minimum 0.5" on all sides
- **Background:** Can float on Forest Green header bar OR Warm Beige background
- **Orientation:** Bjorn mascot facing inward (toward menu content)

**Alternative Positions:**
- Center top (for symmetric layouts)
- Footer bar (small, 2" max)

### 3.2 Section Dividers

**Style A: Color Bar**
```
Height: 8px
Color: Forest Green #226246
Corner radius: 4px
Full width with 24px margins
```

**Style B: Line with Icon**
```
────── ☕ ──────
Line: 2px, Warm Gray #6B635B
Icon: 24pt, Forest Green #226246
```

**Style C: Minimal Line**
```
Height: 1px
Color: Soft Coral #D4A59A
Width: 60% centered
```

### 3.3 Icons

**Icon Style:** Line icons, 2px stroke, rounded ends
**Icon Size:** 32pt for section headers, 24pt inline
**Icon Color:** Forest Green #226246 (primary) or Muted Green #4A8C6A (secondary)

| Icon | Usage | Unicode/SVG |
|------|-------|-------------|
| ☕ | Coffee/Espresso section | U+2615 |
| 🧊 | Cold drinks | Custom SVG |
| 🥤 | Blended drinks | Custom SVG |
| 🥐 | Food/pastries | U+1F950 |
| ⭐ | Staff pick/featured | U+2B50 |
| 🌱 | Vegan option | U+1F331 |
| 🍃 | Plant milk | U+1F343 |
| ⚡ | Protein/energy | U+26A1 |

**Badge Styles:**

```css
/* Featured Badge */
.badge-featured {
  background: linear-gradient(135deg, #D4AF37, #C9A227);
  color: #FFFEF9;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 16pt;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Vegan Badge */
.badge-vegan {
  background: #5B8C5A;
  color: #FFFEF9;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 14pt;
}

/* Sugar-Free Badge */
.badge-sf {
  background: #8BA4B0;
  color: #FFFEF9;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 14pt;
}
```

### 3.4 Featured Item Callout

```
┌─────────────────────────────────────────┐
│ ⭐ BJORN'S PICK                         │ ← Gold badge
├─────────────────────────────────────────┤
│                                         │
│  [ITEM PHOTO]   ITEM NAME               │
│                 Description text here   │
│                 goes in warm gray       │
│                                         │
│                          16oz    6.00   │
│                          24oz    7.00   │
│                                         │
└─────────────────────────────────────────┘

Border: 3px solid Blush Pink #E8B4B8
Background: Cream White #FFFEF9
Corner radius: 12px
Shadow: 0 4px 12px rgba(34, 98, 70, 0.08)
Padding: 24px
```

### 3.5 Photo Guidelines

**Technical Specs:**
- **Resolution:** Minimum 300 DPI for print
- **Aspect Ratio:** 4:3 or 1:1 (square) preferred
- **Size on board:** Maximum 5" × 5" for featured, 3" × 3" for grid
- **File format:** TIFF or high-quality JPEG

**Style Guidelines:**
- Natural lighting, warm tones
- Overhead or 45° angle (never straight-on)
- Props: wooden surfaces, greenery, linen textures
- No busy backgrounds
- Visible steam/texture for hot drinks
- Condensation/frost for cold drinks

**Color Treatment:**
- Increase warmth +10-15%
- Shadows lifted (not crushed blacks)
- Highlights soft (not blown out)
- Color correction to match beige/green palette

**DON'T:**
- Stock photos (must be actual products)
- Hands holding products (impersonal)
- Cluttered compositions
- Cool/blue color temperatures
- Heavy filters or overlays

---

## 4. Contrast Requirements

### WCAG AA Compliance Matrix

| Text Element | Foreground | Background | Contrast Ratio | Status |
|--------------|------------|------------|----------------|--------|
| Section Header | #226246 | #F5EDE4 | **6.2:1** | ✅ Pass AA |
| Item Name | #2D2D2D | #F5EDE4 | **11.8:1** | ✅ Pass AAA |
| Description | #6B635B | #F5EDE4 | **5.1:1** | ✅ Pass AA |
| Price | #6B635B | #F5EDE4 | **5.1:1** | ✅ Pass AA |
| Header Bar Text | #FFFEF9 | #226246 | **7.4:1** | ✅ Pass AAA |
| Featured Card Text | #2D2D2D | #FFFEF9 | **14.1:1** | ✅ Pass AAA |
| Pink Border on Cream | #E8B4B8 | #FFFEF9 | **1.9:1** | ⚠️ Decorative only |
| Badge Text | #FFFEF9 | #D4AF37 | **2.1:1** | ⚠️ Large text only |

### Distance Readability Standards

| Viewing Distance | Minimum Text Height | Recommended |
|-----------------|---------------------|-------------|
| 6 feet | 0.5" (36pt) | 0.6" (43pt) |
| 8 feet | 0.67" (48pt) | 0.8" (58pt) |
| 10 feet | 0.83" (60pt) | 1.0" (72pt) |
| 15 feet | 1.25" (90pt) | 1.5" (108pt) |

**For queue viewing (6-10 feet):**
- Item names: 36pt minimum ✅
- Prices: 28pt minimum ✅
- Descriptions: 24pt (acceptable for close reading)

### Accessibility Checklist

- [x] Minimum 4.5:1 contrast for all body text
- [x] Minimum 3:1 contrast for large text (>18pt bold or >24pt regular)
- [x] No information conveyed by color alone (icons + color)
- [x] Adequate spacing between lines (1.3+ line height)
- [x] Sans-serif fonts for maximum legibility
- [x] Consistent alignment (no centered body text)

---

## 5. Layout Grid

### Board Dimensions

**Standard Menu Board:** 48" × 36" (4:3 landscape)

```
┌─────────────────────────────────────────────────────────────────┐
│                         48 inches                               │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │                      SAFE AREA (1" margins)                 │ │ 36"
│ │              Content area: 46" × 34"                        │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### Grid System

**Columns:** 12-column grid
**Gutter:** 0.5" (12px equivalent)
**Margins:** 1" all sides

**Common Layouts:**
- 2 equal panels: 6 + 6 columns
- Hero + menu: 4 + 8 columns
- 3 sections: 4 + 4 + 4 columns

### Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | 8px / 0.11" | Inline padding |
| `--space-sm` | 16px / 0.22" | Between items |
| `--space-md` | 24px / 0.33" | Section padding |
| `--space-lg` | 32px / 0.44" | Between sections |
| `--space-xl` | 48px / 0.67" | Major divisions |
| `--space-2xl` | 64px / 0.89" | Header/footer margins |

---

## 6. Production Files Checklist

### Print-Ready Deliverables

- [ ] Master file: Adobe Illustrator (.ai) or InDesign (.indd)
- [ ] Print PDF: PDF/X-4 with embedded fonts, 300 DPI, CMYK
- [ ] Backup PDF: Outlined fonts version
- [ ] Color proof: Physical print at scale for approval

### Digital/Screen Deliverables (if applicable)

- [ ] Master file: Figma or Sketch
- [ ] Export: PNG at 2x resolution
- [ ] Web-optimized: JPEG at 80% quality

### Asset Package

- [ ] Logo files: SVG, PNG (transparent), AI
- [ ] Font files: OTF/TTF with license documentation
- [ ] Photo assets: Original + color-corrected versions
- [ ] Icon set: SVG sprite or individual files
- [ ] Color swatches: ASE (Adobe), CLR (Apple), JSON

---

## 7. Brand Voice (Visual)

### Mood Keywords
- **Warm** — Not cold or clinical
- **Nordic** — Clean, natural, minimalist
- **Inviting** — Approachable, not intimidating
- **Craft** — Quality, handmade feel
- **Playful** — Bjorn mascot brings personality

### Visual Don'ts
- ❌ Glossy/shiny finishes (use matte)
- ❌ Neon or fluorescent colors
- ❌ Busy patterns or textures
- ❌ Generic stock imagery
- ❌ Rounded/bubbly fonts
- ❌ Excessive gradients or shadows

### Visual Do's
- ✅ Natural textures (wood, linen, paper)
- ✅ Warm photography with natural light
- ✅ Generous white space
- ✅ Subtle, purposeful color accents
- ✅ Hand-drawn elements (sparingly, for seasonal)
- ✅ Consistent, clean typography

---

*Document Version: 1.0*
*Last Updated: January 24, 2026*
*Next Review: Before production*
