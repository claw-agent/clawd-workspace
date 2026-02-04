# FINAL MENU BOARD REDESIGN SPECIFICATIONS
## Bjorn's Brew — Production-Ready Guide

**Date:** January 24, 2026  
**Version:** 1.0 Final  
**Board Size:** 48" × 32" (scale proportionally for other sizes)

---

# EXECUTIVE SUMMARY

This redesign applies menu engineering research to increase profitability by an estimated **10-15%** through:
- Golden Triangle placement of high-margin items
- Removal of dollar signs (increases spend ~30%)
- Reduction of choice overload (max 7 items per section)
- Strategic price de-emphasis
- Mission integration for brand differentiation

---

# 1. LAYOUT STRUCTURE

## Grid System
- **12-column grid** with 1.5% gutters
- **8-row structure** for vertical organization
- **Base unit (BU):** 0.5 inches — all spacing in multiples

## Section Layout (Top to Bottom)

```
┌────────────────────────────────────────────────────────────┐
│ HEADER: Logo + "Bjorn's Brew" + Tagline                    │
│ Height: 10% (~3.2")                                        │
├────────────────────────────────────────────────────────────┤
│ ⭐ FEATURED ZONE: Signature item with callout              │
│ Height: 15% (~4.8") — GOLDEN TRIANGLE CENTER               │
├──────────────────────────┬─────────────────────────────────┤
│ FROZEN FAVORITES         │ SMOOTHIES & SHAKES              │
│ (Blended drinks)         │ (Including protein)             │
│ Cols 1-6                 │ Cols 7-12                       │
│ Height: 17.5% each       │ ★ High-margin zone              │
├──────────────────────────┴─────────────────────────────────┤
│ BITES & BAKERY: 4 hero food items with photos              │
│ Height: 15%                                                │
├────────────────────────────────────────────────────────────┤
│ MAKE IT YOURS │ MILK OPTIONS │ EXTRAS                      │
│ (Flavors)     │ (Alt milks)  │ (Add-ons)                   │
│ Height: 12.5%                                              │
├────────────────────────────────────────────────────────────┤
│ 🐾 "Every sip supports local animal rescues" │ @bjornsbrew │
│ Height: 7.5%                                               │
└────────────────────────────────────────────────────────────┘
```

## Golden Triangle Placement

| Zone | Position | Content | Why |
|------|----------|---------|-----|
| **①** | Center (rows 2-3) | Featured signature item | First eye focus |
| **②** | Top-right | Protein Shakes (highest margin) | Second eye focus |
| **③** | Top-left | Blended Drinks | Third eye focus |

---

# 2. COLOR PALETTE

## Primary Colors

| Role | Hex | Usage |
|------|-----|-------|
| **Forest Green** | `#226246` | Headers, section dividers, footer bar |
| **Warm Beige** | `#F5EDE4` | Primary background |
| **Blush Pink** | `#E8B4B8` | Featured item callout border |
| **Cream White** | `#FFFEF9` | Content cards, text boxes |

## Text Colors

| Role | Hex | Usage |
|------|-----|-------|
| **Deep Charcoal** | `#2D2D2D` | Item names, headers |
| **Warm Gray** | `#6B635B` | Descriptions, PRICES (de-emphasized) |

## Accent Colors

| Role | Hex | Usage |
|------|-----|-------|
| **Gold** | `#D4AF37` | Staff pick stars ⭐ |
| **Plant Green** | `#5B8C5A` | Vegan/plant-based badges |
| **Soft Blue** | `#8BA4B0` | Sugar-free (SF) badges |

---

# 3. TYPOGRAPHY

## Font Stack

| Element | Font | Weight | Size Range |
|---------|------|--------|------------|
| **Section Headers** | Josefin Sans | Bold | 1.5-2" (108-144pt) |
| **Item Names** | Inter | SemiBold | 0.75-1" (54-72pt) |
| **Descriptions** | Inter | Regular | 0.5-0.625" (36-45pt) |
| **Prices** | Inter | Regular | 0.5-0.625" (match descriptions) |
| **Featured Item** | Playfair Display | SemiBold | 2.5-3" (180-216pt) |

**Google Fonts:**
```
Inter (400, 500, 600, 700)
Josefin Sans (500, 600, 700)
Playfair Display (500, 600)
```

## Critical Typography Rules
- ✅ Minimum 4.5:1 contrast ratio (WCAG AA)
- ✅ Readable at 10-15 feet
- ❌ NO price columns (don't align prices)
- ❌ NO dollar signs (use `6.00` not `$6.00`)

---

# 4. MENU COPY

## Section Headers

| Current | Redesigned |
|---------|------------|
| BLENDED DRINKS | **FROZEN FAVORITES** |
| SMOOTHIES | **SMOOTHIES & SHAKES** |
| FOOD | **BITES & BAKERY** |
| FLAVORS | **MAKE IT YOURS** |
| EXTRAS | **LEVEL UP** |

## Featured Item (Center — Golden Triangle)

**BJORN'S BEST FRAPPE** ⭐
*Our signature frozen velvet latte — smooth, creamy, unforgettable.*

*Staff Pick • Ask for it "loaded" with cold foam +1.00*

## Renamed Items

### Frozen Favorites
| Current | Redesigned | Price Display |
|---------|------------|---------------|
| Latte Frappe | **Frozen Velvet Latte** | 16oz 6.00 · 24oz 7.00 · 32oz 8.00 |
| Vanilla Chai Frappe | **Spiced Chai Freeze** | 16oz 6.75 · 24oz 7.75 · 32oz 8.75 |

### Smoothies & Shakes
| Current | Redesigned | Notes |
|---------|------------|-------|
| Beehive Protein Shake | **The Beehive** 🐝 | Mark with honey/protein callout |
| MVP Protein Shake | **The MVP** *(plant-based)* | Green badge for vegan |

### Bites & Bakery (Hero Items Only)
| Slot | Item | Price |
|------|------|-------|
| 1 | **Bjorn's Burrito** *Potato, egg & cheese* | 7.50 |
| 2 | **Loaded Croissant** *Pick your filling* | 6.75 |
| 3 | **Fresh Bagel** *Cream cheese included* | 4.00 |
| 4 | **Cookie** *(fresh-baked daily)* | 2.75 |

*Full food menu available — just ask!*

## Flavor Organization (Reduce Decision Fatigue)

Instead of listing 22 flavors, group into categories:

| Category | Flavors |
|----------|---------|
| **Classics** | Vanilla, Hazelnut, Caramel |
| **Rich & Indulgent** | Dark Chocolate, White Chocolate, Irish Cream |
| **Nutty & Sweet** | Almond, Butter Pecan, English Toffee |
| **Fruity** | Strawberry, Raspberry, Peach, Cherry |
| **Specialty** | Lavender, Rose, Brown Sugar Cinnamon |

Display as: **"Add flavor +0.50"** with categories listed below

## Mission Footer

> 🐾 **Every sip supports local animal rescues**  
> *$183K+ donated • Thanks for being part of the pack*

---

# 5. PRICING STRATEGY

## Rules (From Research)

1. **NO dollar signs** — Removes "pain of paying" trigger
2. **NO price columns** — Don't align prices vertically
3. **Nest prices in copy** — Same font as descriptions
4. **Price anchoring** — Highest price first in category

## Price Display Format

❌ Wrong:
```
Latte Frappe.............$6.00
Chai Frappe..............$6.75
```

✅ Correct:
```
Frozen Velvet Latte  16oz 6.00 · 24oz 7.00 · 32oz 8.00
Spiced Chai Freeze   16oz 6.75 · 24oz 7.75 · 32oz 8.75
```

---

# 6. VISUAL ELEMENTS

## Logo Placement
- Top-left corner
- Size: 3" × 3" minimum
- Clearance: 0.5" on all sides

## Icons & Badges

| Icon | Meaning | Color |
|------|---------|-------|
| ⭐ | Staff Pick / Signature | Gold `#D4AF37` |
| 🐝 | Honey-based / The Beehive | Gold `#D4AF37` |
| (V) | Vegan / Plant-based | Green `#5B8C5A` |
| SF | Sugar-free available | Blue `#8BA4B0` |
| 🐾 | Dog-friendly / Mission | Green `#226246` |

## Photo Guidelines (Food Section)
- **Style:** 45° overhead angle, natural lighting
- **Background:** Neutral/wood surface
- **Size:** 4" × 4" per hero item
- **Items needing photos:** Burrito, Croissant, Bagel, Cookie

## Dividers
- **Between sections:** 2px Forest Green `#226246` line
- **Within sections:** 1px Warm Gray `#6B635B` hairline or whitespace

---

# 7. IMPLEMENTATION CHECKLIST

## Pre-Production
- [ ] Source/license fonts (Google Fonts — free)
- [ ] Photograph 4 food hero items
- [ ] Confirm final pricing with owner
- [ ] Determine board material (vinyl, digital, printed)

## Design Production
- [ ] Set up 48" × 32" artboard at 300dpi
- [ ] Implement 12-column grid
- [ ] Apply color palette
- [ ] Place content per layout spec
- [ ] Test readability at 10ft (print sample)

## Quality Check
- [ ] No dollar signs anywhere
- [ ] Prices not column-aligned
- [ ] Featured item in center/top
- [ ] Max 7 items per section
- [ ] Mission statement present
- [ ] Contrast ratio ≥4.5:1 verified

---

# 8. EXPECTED IMPACT

Based on menu engineering research:

| Improvement | Expected Impact |
|-------------|-----------------|
| Golden Triangle placement | +5-8% orders of featured items |
| Dollar sign removal | +8-12% average ticket |
| Reduced choice overload | Faster ordering, higher satisfaction |
| Price de-emphasis | Reduced price-shopping behavior |
| Mission integration | Brand differentiation, loyalty |

**Overall estimated profit increase: 10-15%** (industry benchmark)

---

# APPENDIX: Full File References

| Document | Description | Location |
|----------|-------------|----------|
| Research | 525 lines of menu engineering studies | `menu-board-research.md` |
| Layout | Detailed wireframes, all 3 options | `redesign-layout.md` |
| Copy | Complete rewritten menu text | `redesign-copy.md` |
| Visual | Full color/typography specs | `redesign-visual-specs.md` |
| Analysis | Current board issues identified | `menu-board-analysis.md` |

---

*Prepared by Claw Consulting — Multi-Agent System*  
*January 24, 2026*
