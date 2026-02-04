# Bjorn's Brew - Site Architecture

> Family-owned SLC coffee shop | "Love Coffee. Love Animals."

---

## 1. Page Structure

### 1.1 Home Page (`/`)

| Section | Purpose | Content |
|---------|---------|---------|
| **Hero** | First impression, brand statement | Full-width image with Bjorn mascot, tagline overlay, primary CTA "Find a Location" |
| **About Preview** | Introduce the story | 2-column: image left, short story text right, "Learn More" link |
| **Locations Grid** | Quick access to all 3 shops | 3 cards in a row with address snippets & "Get Directions" links |
| **Mission Banner** | Highlight animal charity work | Full-width colored band with donation stats, icon illustrations |
| **Testimonials** | Social proof | Carousel with 3-5 customer quotes, star ratings |
| **Instagram Feed** | Social engagement | 6-image grid pulling from @bjornsbrew |
| **Newsletter CTA** | Email capture | Centered form with email input + submit button |

### 1.2 Menu Page (`/menu`)

| Section | Purpose | Content |
|---------|---------|---------|
| **Header** | Page title | "Our Menu" with subtle coffee bean decorations |
| **Category Nav** | Quick jumps | Sticky horizontal tabs: Coffee, Espresso, Tea, Specialty, Pastries, Seasonal |
| **Menu Grid** | Item display | Cards organized by category, each with name, description, price |
| **Dietary Legend** | Accessibility | Icons for vegan, gluten-free, dairy-free options |

**Menu Categories:**
- ☕ **Coffee** — Drip, Pour Over, Cold Brew, Nitro
- 🥛 **Espresso** — Latte, Cappuccino, Americano, Macchiato, Mocha
- 🍵 **Tea** — Matcha, Chai, Herbal, Iced Tea
- ✨ **Specialty** — Bjorn's Blend, Pup Cup (dog-friendly!), Seasonal specials
- 🥐 **Pastries** — Croissants, Muffins, Cookies, Vegan options

### 1.3 About Page (`/about`)

| Section | Purpose | Content |
|---------|---------|---------|
| **Hero** | Emotional hook | Family photo with Bjorn (the dog) |
| **Our Story** | Origin narrative | Timeline or prose about founding, family, community roots |
| **Meet Bjorn** | Mascot spotlight | Photo gallery of Bjorn, his story, why he's the namesake |
| **Mission Statement** | Values | "Love Coffee. Love Animals." expanded with charity partnerships |
| **Charity Partners** | Credibility | Logos + descriptions of animal charities supported |
| **Team Grid** | Human connection | Photos + bios of key team members |

### 1.4 Locations Page (`/locations`)

| Section | Purpose | Content |
|---------|---------|---------|
| **Map Hero** | Visual orientation | Interactive map with all 3 pins |
| **Location Cards** | Details | 3 full-width cards with all info below |

**Location Data Structure:**
```
Location {
  name: string           // "Foothill"
  address: string        // "1234 Foothill Dr, SLC, UT 84108"
  phone: string          // "(801) 555-0101"
  hours: {
    weekday: string      // "Mon-Fri: 6am - 7pm"
    weekend: string      // "Sat-Sun: 7am - 6pm"
  }
  features: string[]     // ["Drive-thru", "Patio", "Dog-friendly"]
  image: string          // Hero image of this location
  mapUrl: string         // Google Maps link
}
```

**Locations:**
1. **Foothill** — 1847 Foothill Dr, SLC, UT 84108
2. **Highland** — 2954 Highland Dr, SLC, UT 84106  
3. **State Street** — 1720 S State St, SLC, UT 84115

### 1.5 Contact Page (`/contact`)

| Section | Purpose | Content |
|---------|---------|---------|
| **Contact Form** | Inquiries | Name, Email, Subject dropdown, Message, Submit |
| **Quick Info** | Direct access | General email, phone, social links |
| **FAQ Accordion** | Self-service | 5-8 common questions |
| **Careers CTA** | Hiring | "Join Our Pack" link to application |

---

## 2. Component Specifications

### 2.1 Navigation (`<Nav />`)

```
Props: {
  transparent?: boolean  // For hero overlay mode
  sticky?: boolean       // Stick on scroll
}

Structure:
├── Logo (left) — Links to home, includes Bjorn dog icon
├── Nav Links (center)
│   ├── Home
│   ├── Menu
│   ├── About
│   ├── Locations
│   └── Contact
├── CTA Button (right) — "Order Online" (links to Toast/Square)
└── Mobile Menu Toggle (hamburger → X)

Behaviors:
- Desktop: Horizontal bar, 80px height
- Mobile: Hamburger menu, full-screen overlay
- Scroll: Background fills in (transparent → solid)
- Active state: Underline on current page
```

### 2.2 Hero Section (`<Hero />`)

```
Props: {
  headline: string
  subheadline?: string
  backgroundImage: string
  ctaPrimary?: { text: string, href: string }
  ctaSecondary?: { text: string, href: string }
  overlay?: 'dark' | 'light' | 'none'
  height?: 'full' | 'large' | 'medium'  // 100vh, 80vh, 60vh
}

Structure:
├── Background Image (object-fit: cover)
├── Overlay Gradient (optional)
├── Content Container (centered)
│   ├── Headline (h1)
│   ├── Subheadline (p)
│   └── CTA Buttons (flex row, gap)
└── Scroll Indicator (optional down arrow)

Responsive:
- Desktop: Text left-aligned, 60% width max
- Mobile: Text centered, full width, stacked CTAs
```

### 2.3 Footer (`<Footer />`)

```
Structure:
├── Top Section (4-column grid)
│   ├── Brand Column
│   │   ├── Logo
│   │   ├── Tagline
│   │   └── Social Icons (Instagram, Facebook, Twitter)
│   ├── Quick Links
│   │   ├── Menu
│   │   ├── Locations
│   │   ├── About
│   │   └── Contact
│   ├── Locations
│   │   ├── Foothill
│   │   ├── Highland
│   │   └── State Street
│   └── Newsletter
│       ├── Heading
│       ├── Email Input
│       └── Submit Button
├── Divider Line
└── Bottom Bar
    ├── Copyright "© 2026 Bjorn's Brew. All rights reserved."
    ├── Privacy Policy
    └── Terms of Service

Responsive:
- Desktop: 4 columns
- Tablet: 2x2 grid
- Mobile: Single column, stacked
```

### 2.4 Card Components

#### Location Card (`<LocationCard />`)
```
Props: {
  name: string
  address: string
  phone: string
  hours: { weekday: string, weekend: string }
  features: string[]
  image: string
  mapUrl: string
}

Structure:
├── Image (aspect-ratio: 16/9)
├── Content
│   ├── Name (h3)
│   ├── Address (with map icon)
│   ├── Phone (with phone icon, clickable)
│   ├── Hours (with clock icon)
│   ├── Features (pill badges)
│   └── CTA "Get Directions" button
```

#### Menu Item Card (`<MenuCard />`)
```
Props: {
  name: string
  description: string
  price: number
  image?: string
  dietary?: ('vegan' | 'gf' | 'df')[]
  featured?: boolean
}

Structure:
├── Image (optional, square aspect)
├── Content
│   ├── Name + Dietary Icons (inline)
│   ├── Description (2-line clamp)
│   └── Price
└── Featured Badge (optional, corner ribbon)
```

#### Testimonial Card (`<TestimonialCard />`)
```
Props: {
  quote: string
  author: string
  location?: string  // Which Bjorn's location
  rating: 1-5
  avatar?: string
}

Structure:
├── Quote Mark Icon (decorative)
├── Quote Text
├── Star Rating
├── Author Info
│   ├── Avatar (or initials)
│   ├── Name
│   └── Location visited
```

### 2.5 CTA Buttons (`<Button />`)

```
Props: {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost'
  size: 'sm' | 'md' | 'lg'
  href?: string       // Renders as <a>
  onClick?: function  // Renders as <button>
  icon?: ReactNode    // Optional leading icon
  fullWidth?: boolean
  disabled?: boolean
}

Variants:
- Primary:   bg-forest-green, text-white, hover:darken
- Secondary: bg-pink, text-forest-green, hover:darken
- Outline:   border-forest-green, text-forest-green, hover:fill
- Ghost:     text-forest-green, hover:bg-beige

Sizes:
- sm: px-4 py-2, text-sm
- md: px-6 py-3, text-base
- lg: px-8 py-4, text-lg

States:
- Hover: Scale 1.02, shadow elevation
- Active: Scale 0.98
- Disabled: Opacity 50%, no pointer
```

---

## 3. Design Tokens

### 3.1 Colors

```css
:root {
  /* Primary */
  --color-forest: #226246;
  --color-forest-dark: #1a4d36;
  --color-forest-light: #2d7a59;
  
  /* Secondary */
  --color-beige: #d8d8ca;
  --color-beige-dark: #c4c4b6;
  --color-beige-light: #e8e8dc;
  
  /* Accent */
  --color-pink: #ddc2cd;
  --color-pink-dark: #c9a8b5;
  --color-pink-light: #eddce3;
  
  /* Neutrals */
  --color-white: #ffffff;
  --color-cream: #faf9f6;
  --color-gray-100: #f5f5f5;
  --color-gray-200: #e5e5e5;
  --color-gray-300: #d4d4d4;
  --color-gray-400: #a3a3a3;
  --color-gray-500: #737373;
  --color-gray-600: #525252;
  --color-gray-700: #404040;
  --color-gray-800: #262626;
  --color-gray-900: #171717;
  --color-black: #0a0a0a;
  
  /* Semantic */
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;
}
```

### 3.2 Typography

```css
:root {
  /* Font Families */
  --font-heading: 'Poppins', sans-serif;    /* Weights: 500, 600, 700 */
  --font-body: 'Montserrat', sans-serif;    /* Weights: 400, 500, 600 */
  
  /* Font Sizes (with line-height) */
  --text-xs:   0.75rem;    /* 12px, line-height: 1rem */
  --text-sm:   0.875rem;   /* 14px, line-height: 1.25rem */
  --text-base: 1rem;       /* 16px, line-height: 1.5rem */
  --text-lg:   1.125rem;   /* 18px, line-height: 1.75rem */
  --text-xl:   1.25rem;    /* 20px, line-height: 1.75rem */
  --text-2xl:  1.5rem;     /* 24px, line-height: 2rem */
  --text-3xl:  1.875rem;   /* 30px, line-height: 2.25rem */
  --text-4xl:  2.25rem;    /* 36px, line-height: 2.5rem */
  --text-5xl:  3rem;       /* 48px, line-height: 1.15 */
  --text-6xl:  3.75rem;    /* 60px, line-height: 1.1 */
  
  /* Font Weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
}

/* Heading Styles */
h1 { font-family: var(--font-heading); font-size: var(--text-5xl); font-weight: 700; }
h2 { font-family: var(--font-heading); font-size: var(--text-4xl); font-weight: 600; }
h3 { font-family: var(--font-heading); font-size: var(--text-2xl); font-weight: 600; }
h4 { font-family: var(--font-heading); font-size: var(--text-xl); font-weight: 500; }
h5 { font-family: var(--font-heading); font-size: var(--text-lg); font-weight: 500; }
h6 { font-family: var(--font-heading); font-size: var(--text-base); font-weight: 500; }
```

### 3.3 Spacing System

```css
:root {
  /* Base unit: 4px */
  --space-0:  0;
  --space-1:  0.25rem;   /* 4px */
  --space-2:  0.5rem;    /* 8px */
  --space-3:  0.75rem;   /* 12px */
  --space-4:  1rem;      /* 16px */
  --space-5:  1.25rem;   /* 20px */
  --space-6:  1.5rem;    /* 24px */
  --space-8:  2rem;      /* 32px */
  --space-10: 2.5rem;    /* 40px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-20: 5rem;      /* 80px */
  --space-24: 6rem;      /* 96px */
  --space-32: 8rem;      /* 128px */
  
  /* Section Spacing */
  --section-py: var(--space-20);         /* Vertical padding between sections */
  --section-py-mobile: var(--space-12);  /* Mobile vertical padding */
  
  /* Container */
  --container-max: 1280px;
  --container-px: var(--space-6);
  --container-px-mobile: var(--space-4);
}
```

### 3.4 Effects

```css
:root {
  /* Border Radius */
  --radius-none: 0;
  --radius-sm: 0.25rem;    /* 4px - subtle */
  --radius-md: 0.5rem;     /* 8px - buttons, inputs */
  --radius-lg: 1rem;       /* 16px - cards */
  --radius-xl: 1.5rem;     /* 24px - large cards */
  --radius-full: 9999px;   /* Pills, avatars */
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 300ms ease;
}
```

---

## 4. Responsive Breakpoints

```css
/* Mobile First Approach */

/* Base: 0px - 639px (Mobile) */
/* Default styles apply */

/* sm: 640px+ (Large phones, small tablets) */
@media (min-width: 640px) { }

/* md: 768px+ (Tablets) */
@media (min-width: 768px) { }

/* lg: 1024px+ (Laptops, small desktops) */
@media (min-width: 1024px) { }

/* xl: 1280px+ (Desktops) */
@media (min-width: 1280px) { }

/* 2xl: 1536px+ (Large screens) */
@media (min-width: 1536px) { }
```

### Breakpoint Usage Guide

| Breakpoint | Container | Columns | Nav | Cards/Row |
|------------|-----------|---------|-----|-----------|
| Mobile (0-639) | 100% - 32px | 1 | Hamburger | 1 |
| sm (640-767) | 100% - 48px | 2 | Hamburger | 2 |
| md (768-1023) | 100% - 48px | 2-3 | Horizontal | 2-3 |
| lg (1024-1279) | 1024px | 3-4 | Horizontal | 3 |
| xl (1280+) | 1280px | 4-6 | Horizontal | 3-4 |

---

## 5. Technical Specifications

### 5.1 Tech Stack (Recommended)

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS v3
- **Components:** shadcn/ui as base
- **Icons:** Lucide React
- **Fonts:** Google Fonts (Poppins, Montserrat)
- **Maps:** Google Maps Embed or Mapbox
- **Forms:** React Hook Form + Zod
- **CMS:** Sanity or Contentful (for menu items)
- **Deployment:** Vercel

### 5.2 Performance Targets

- Lighthouse Score: 90+ all categories
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1
- Images: WebP/AVIF with Next/Image

### 5.3 Accessibility Requirements

- WCAG 2.1 AA compliance
- Semantic HTML throughout
- Skip navigation link
- Alt text on all images
- Focus-visible states
- Color contrast ratios: 4.5:1 minimum
- Touch targets: 44x44px minimum

---

## 6. File Structure

```
bjorns-brew/
├── app/
│   ├── layout.tsx          # Root layout with Nav + Footer
│   ├── page.tsx             # Home
│   ├── menu/page.tsx
│   ├── about/page.tsx
│   ├── locations/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── ui/                  # Base components (Button, Card, Input)
│   ├── layout/
│   │   ├── Nav.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── LocationsGrid.tsx
│   │   ├── Testimonials.tsx
│   │   └── Newsletter.tsx
│   └── cards/
│       ├── LocationCard.tsx
│       ├── MenuCard.tsx
│       └── TestimonialCard.tsx
├── lib/
│   ├── data/
│   │   ├── locations.ts
│   │   └── menu.ts
│   └── utils.ts
├── styles/
│   └── globals.css          # Tailwind + custom properties
└── public/
    ├── images/
    └── fonts/
```

---

*Document Version: 1.0*  
*Created: 2026-01-24*  
*Last Updated: 2026-01-24*
