# XPERIENCE Roofing Estimator — UI/UX Spec

> Generated: 2026-02-12 | For builder agent consumption
> Target: Jamie, roofing contractor, on his phone, standing in a driveway

---

## Design System

### Tokens
| Token | Value | Tailwind |
|-------|-------|----------|
| Primary | `#1a1f3d` | `navy` (custom) |
| Accent | `#e85d26` | `orange` (custom) |
| Background | `#f8f6f3` | `cream` (custom) |
| Surface | `#ffffff` | `white` |
| Text primary | `#1a1f3d` | `text-navy` |
| Text secondary | `#6b7280` | `text-gray-500` |
| Success | `#16a34a` | `text-green-600` |
| Error | `#dc2626` | `text-red-600` |
| Border | `#e5e2de` | custom or `border-gray-200` |

### Typography
- **Font:** `Inter, system-ui, -apple-system, sans-serif`
- **H1:** `text-2xl font-bold tracking-tight` (mobile) / `text-4xl` (desktop)
- **H2:** `text-xl font-bold` (mobile) / `text-2xl` (desktop)
- **H3:** `text-lg font-semibold`
- **Body:** `text-base leading-relaxed` (16px minimum — prevents iOS zoom)
- **Caption/label:** `text-sm text-gray-500`
- **Numbers/prices:** `font-semibold tabular-nums` — always use `tabular-nums` for aligned dollar figures

### Spacing Scale
- Section padding: `px-4 py-6` (mobile) / `px-8 py-10` (desktop)
- Card padding: `p-4` (mobile) / `p-6` (desktop)
- Between cards: `space-y-3`
- Between sections: `space-y-8`

### Radii & Shadows
- Cards: `rounded-xl` (12px)
- Inputs: `rounded-md` (6px)
- Buttons: `rounded-lg` (8px)
- Card shadow: `shadow-sm ring-1 ring-black/5`
- Elevated card: `shadow-md ring-1 ring-black/5`

---

## User Flow

### Overview
```
Landing → Enter Address → Loading (2-4s) → Roof Data + Estimates → Compare/Export
                                              ↕
                            Browse Cities (alternate entry)
```

### URL Structure
- `/` — Home (address input)
- `/estimate?address=123+Main+St+Provo+UT` — Results (shareable)
- `/cities` — City browser
- `/cities/[state]/[city]` — Individual city pricing (SEO pages)
- `/compare?cities=utah/provo,utah/salt-lake-city` — Comparison

---

## Screen 1: Landing / Address Input

**Purpose:** Get Jamie typing an address within 2 seconds of opening the app.

### Layout
```
┌──────────────────────────────┐
│  ┌──┐  XPERIENCE             │  ← 56px header, logo left
│  └──┘  ROOFING               │
├──────────────────────────────┤
│                              │
│     🏠                       │  ← Icon, 48px, navy
│                              │
│  Instant Roof Estimate       │  ← H1, text-2xl font-bold
│  Real measurements.          │  ← text-base text-gray-500
│  Real local pricing.         │
│                              │
│  ┌────────────────────────┐  │  ← Input: h-14, text-lg
│  │ 📍 Enter address...    │  │     Google Places Autocomplete
│  └────────────────────────┘  │
│                              │
│  ┌────────────────────────┐  │  ← Button: h-14, bg-orange
│  │   Measure My Roof  →   │  │     text-white font-semibold
│  └────────────────────────┘  │     full width
│                              │
│  ── or ──                    │  ← Divider with text
│                              │
│  Browse 982 City Prices →    │  ← text-navy underline, text-sm
│                              │
│                              │
│  ┌──────────────────────┐    │
│  │ ✓ No signup required │    │  ← text-xs text-gray-400
│  │ ✓ 982 cities covered │    │     trust micro-copy
│  │ ✓ Satellite-measured │    │
│  └──────────────────────┘    │
└──────────────────────────────┘
```

### Behavior
- Page loads → input auto-focused on desktop, NOT on mobile (keyboard covers screen)
- Google Places Autocomplete attached to input — US addresses only
- On address selection from dropdown OR tap "Measure My Roof": navigate to `/estimate?address=...`
- "Browse City Prices" links to `/cities`

### Tailwind for Address Input
```tsx
<input
  className="w-full h-14 px-4 pl-10 text-lg bg-white border border-gray-200
             rounded-md focus:ring-2 focus:ring-orange/50 focus:border-orange
             placeholder:text-gray-400"
  placeholder="Enter address..."
/>
```

### Tailwind for CTA Button
```tsx
<button
  className="w-full h-14 bg-orange text-white text-lg font-semibold rounded-lg
             active:scale-[0.98] transition-transform"
>
  Measure My Roof →
</button>
```

---

## Screen 2: Loading State

**Purpose:** Keep Jamie confident while the Solar API runs (2-4 seconds). This is where trust is built or lost.

### Layout
```
┌──────────────────────────────┐
│  XPERIENCE ROOFING           │
├──────────────────────────────┤
│                              │
│                              │
│         🏠                   │  ← Animated: gentle pulse
│     ╱▔▔▔▔▔▔╲                │
│    ╱        ╲               │  ← Roof outline drawing
│   ┌──────────┐               │     animation (CSS)
│                              │
│  Measuring your roof...      │  ← H2, animated ellipsis
│                              │
│  ┌──────────────────────┐    │
│  │ ████████░░░░░░░░░░░░ │    │  ← Progress bar (indeterminate
│  └──────────────────────┘    │     but styled as determinate)
│                              │
│  Analyzing satellite         │  ← Rotating status messages
│  imagery for                 │     (see list below)
│  123 Main St, Provo, UT     │
│                              │
└──────────────────────────────┘
```

### Rotating Status Messages (cycle every 1.5s)
1. "Locating building from satellite imagery..."
2. "Measuring roof segments..."
3. "Calculating pitch and surface area..."
4. "Finding local material pricing..."

Each message fades in/out: `transition-opacity duration-300`

### Progress Bar
Fake-but-honest progress:
- 0-30%: instant (geocoding)
- 30-70%: over 2s (solar API call)
- 70-90%: hold until response
- 90-100%: snap on success

```tsx
<div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
  <div
    className="h-full bg-orange rounded-full transition-all duration-1000 ease-out"
    style={{ width: `${progress}%` }}
  />
</div>
```

---

## Screen 3: Results — The "Wow" Moment

**This is the money screen.** When real roof data comes back, Jamie should feel like he has superpowers.

### The Reveal Animation

When data arrives, don't just dump it on screen. **Stagger the reveal:**

1. **0ms:** Address confirmed, appears at top with a ✓ checkmark
2. **200ms:** Roof measurement card slides up with the number animating from 0 → actual sqft (counter animation, 600ms)
3. **500ms:** Pitch and waste factor fade in below
4. **800ms:** "Nearest pricing: [City]" fades in
5. **1000ms:** Material cards cascade in, staggered 100ms each

This 1-second orchestrated reveal is the "wow" moment. It communicates: *we just did something sophisticated for you.*

### Implementation
```tsx
// Stagger wrapper
<div className="space-y-4">
  {sections.map((section, i) => (
    <div
      key={i}
      className="animate-in fade-in slide-in-from-bottom-4"
      style={{ animationDelay: `${i * 200}ms`, animationFillMode: 'both' }}
    >
      {section}
    </div>
  ))}
</div>
```

Or with Tailwind + custom CSS:
```css
@keyframes reveal-up {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
.reveal-up {
  animation: reveal-up 0.5s ease-out both;
}
```

### Full Results Layout

```
┌──────────────────────────────┐
│  ← Back    XPERIENCE         │
├──────────────────────────────┤
│                              │
│  ✓ 123 Main Street           │  ← text-sm text-gray-500
│    Provo, UT 84604           │     with green checkmark
│                              │
│  ┌────────────────────────┐  │
│  │  YOUR ROOF             │  │  ← Section label: text-xs
│  │                        │  │     uppercase tracking-widest
│  │  2,450 sq ft           │  │     text-orange
│  │  ▔▔▔▔▔▔▔▔▔▔▔▔         │  │  ← Number: text-4xl font-bold
│  │                        │  │     text-navy, counter-animated
│  │  Pitch     Waste       │  │
│  │  6.2:12    +10%        │  │  ← Two columns, text-lg
│  │                        │  │     font-semibold
│  │  Segments  Quality     │  │
│  │  8         HIGH ✓      │  │  ← Quality badge: green if HIGH
│  │                        │  │
│  │  Adjusted: 2,695 sqft  │  │  ← text-sm text-gray-500
│  │  (incl. waste)         │  │
│  └────────────────────────┘  │  ← bg-white rounded-xl p-5
│                              │     shadow-sm ring-1 ring-black/5
│  Pricing from Provo, UT      │  ← text-sm text-gray-500
│  (3 mi from address)         │     italic if >10mi: "closest
│                              │     available"
│  ┌────────────────────────┐  │
│  │  ESTIMATES             │  │  ← Section label
│  └────────────────────────┘  │
│                              │
│  [Material Cards — see §5]   │
│                              │
│  ┌────────────────────────┐  │
│  │ 📊 National Context    │  │  ← Expandable section
│  │ Provo is 8% below the │  │
│  │ national average for   │  │
│  │ asphalt shingles       │  │
│  └────────────────────────┘  │
│                              │
│  ┌────────────────────────┐  │
│  │  📤 Export Estimate    │  │  ← Full-width button
│  └────────────────────────┘  │
│  ┌────────────────────────┐  │
│  │  🔄 Compare Cities     │  │
│  └────────────────────────┘  │
│                              │
│  Disclaimer: Estimates are   │  ← text-xs text-gray-400
│  approximate. Actual costs   │
│  may vary.                   │
│                              │
└──────────────────────────────┘
```

### Roof Data Card — Tailwind
```tsx
<div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-black/5">
  <p className="text-xs font-semibold uppercase tracking-widest text-orange mb-3">
    Your Roof
  </p>
  <p className="text-4xl font-bold text-navy tabular-nums">
    {animatedSqft.toLocaleString()} <span className="text-lg font-normal text-gray-400">sq ft</span>
  </p>
  <div className="grid grid-cols-2 gap-4 mt-4">
    <div>
      <p className="text-xs text-gray-400 uppercase">Pitch</p>
      <p className="text-lg font-semibold text-navy">{pitch}:12</p>
    </div>
    <div>
      <p className="text-xs text-gray-400 uppercase">Waste Factor</p>
      <p className="text-lg font-semibold text-navy">+{wastePercent}</p>
    </div>
    <div>
      <p className="text-xs text-gray-400 uppercase">Segments</p>
      <p className="text-lg font-semibold text-navy">{segments}</p>
    </div>
    <div>
      <p className="text-xs text-gray-400 uppercase">Imagery</p>
      <p className="text-lg font-semibold text-green-600">{quality} ✓</p>
    </div>
  </div>
  <p className="text-sm text-gray-400 mt-3">
    Adjusted area: {adjustedSqft.toLocaleString()} sqft (incl. {wastePercent} waste)
  </p>
</div>
```

---

## Section 5: Material Cards — Data Presentation

### Decision: Vertical Stack of Cards (Not Table, Not Tabs)

**Why cards over table:** Tables are unreadable on mobile at this data density. Tabs hide information — Jamie wants to scan all options at a glance.

**Why vertical stack over horizontal scroll:** Horizontal scroll is a discoverability problem. Jamie might not realize there are more cards. Vertical scroll is native phone behavior.

### Card Design

Each material gets a full-width card. The cheapest material gets a subtle "Best Value" badge.

```
┌────────────────────────────┐
│  🏷 Best Value              │  ← Only on cheapest material
│                            │     bg-green-50 text-green-700
│  Asphalt Shingle           │  ← text-lg font-bold text-navy
│  $5.96 / sqft              │  ← text-sm text-gray-500
│                            │
│  Material     $16,062      │  ← Two columns
│  Labor        $3,675 –     │     Left: label (text-sm gray)
│               $8,575       │     Right: value (font-semibold)
│  ─────────────────────     │
│  Total Est.   $19,737 –    │  ← font-bold text-xl text-navy
│               $24,637      │     This is the anchor number
│                            │
│  ▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░  │  ← National comparison bar
│  8% below national avg     │     green if below, orange if above
└────────────────────────────┘
```

### Material Card — Tailwind
```tsx
<div className="bg-white rounded-xl p-5 shadow-sm ring-1 ring-black/5">
  {isCheapest && (
    <span className="inline-block px-2 py-0.5 text-xs font-semibold
                     bg-green-50 text-green-700 rounded-full mb-2">
      Best Value
    </span>
  )}
  <div className="flex items-baseline justify-between">
    <h3 className="text-lg font-bold text-navy">{displayName}</h3>
    <span className="text-sm text-gray-400">${costPerSqft}/sqft</span>
  </div>

  <div className="mt-4 space-y-2">
    <div className="flex justify-between text-sm">
      <span className="text-gray-500">Material</span>
      <span className="font-semibold text-navy">${materialCost.toLocaleString()}</span>
    </div>
    {laborCostLow ? (
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">Labor</span>
        <span className="font-semibold text-navy">
          ${laborCostLow.toLocaleString()} – ${laborCostHigh.toLocaleString()}
        </span>
      </div>
    ) : (
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">Labor</span>
        <span className="text-gray-400 italic">Not available for area</span>
      </div>
    )}
  </div>

  <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between items-baseline">
    <span className="text-sm font-medium text-gray-500">Total Estimate</span>
    <span className="text-xl font-bold text-navy">
      {totalLow ? `$${totalLow.toLocaleString()} – $${totalHigh.toLocaleString()}` : `$${materialCost.toLocaleString()}`}
    </span>
  </div>

  {/* National comparison bar */}
  <div className="mt-3">
    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full ${percentVsNational < 0 ? 'bg-green-500' : 'bg-orange'}`}
        style={{ width: `${Math.min(Math.abs(percentVsNational) + 50, 100)}%` }}
      />
    </div>
    <p className="text-xs text-gray-400 mt-1">
      {Math.abs(percentVsNational)}% {percentVsNational < 0 ? 'below' : 'above'} national avg
    </p>
  </div>
</div>
```

### When Labor Data Is Missing

For the ~70% of cities without labor data, the card adapts:
- Show material cost as the primary number
- Replace labor row with: `"Labor rates unavailable for [City] — showing material cost only"`
- If state-level fallback available, show it with a label: `"Est. labor (state avg): $X – $Y"`
- Style fallback labor slightly different: `text-gray-400 italic` with a small info icon

### Card Order
Sort materials by total cost ascending (cheapest first). Jamie cares about the cheapest option first, premium options second.

---

## Section 6: The "Wow" Moment — Deep Dive

### What Makes It Feel Magical

1. **Speed:** Jamie typed an address and got a real roof measurement in 3 seconds. That's the core magic — don't add friction before it.

2. **Counter Animation:** The sqft number counting up from 0 → 2,450 in ~600ms with an ease-out curve. Use `requestAnimationFrame`:
```ts
function animateValue(start: number, end: number, duration: number, callback: (v: number) => void) {
  const startTime = performance.now();
  function update(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    callback(Math.round(start + (end - start) * eased));
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
```

3. **Staggered Cascade:** Each section appearing 200ms after the previous creates a sense of "things are happening" rather than "data dumped."

4. **Real Address Confirmation:** Showing the Google-formatted address with a ✓ confirms "yes, we found YOUR house." This is surprisingly reassuring.

5. **Quality Badge:** The "HIGH ✓" quality indicator subtly tells Jamie "this data is reliable."

6. **Specific Numbers:** Don't round. `2,450 sqft` and `6.2:12 pitch` and `8 segments` — the specificity signals real measurement, not estimation.

### What NOT To Do
- ❌ Don't show a satellite image of the house (cool but slow, adds complexity, the data IS the wow)
- ❌ Don't animate every number (just the sqft hero number)
- ❌ Don't add confetti or celebration UI (Jamie is working, not celebrating)
- ❌ Don't delay showing results for a fake loading time — if it's fast, let it be fast

---

## Section 7: Comparison UX

### Two Comparison Modes

**A) Material Comparison (same city)** — Already shown on the results page as stacked cards. For a more explicit comparison, add a toggle:

```
┌────────────────────────────┐
│  Compare Materials          │
│                            │
│  [Cards] [Table]  ← toggle │
│                            │
│  Table view:               │
│  ┌──────────┬───────┬─────┐│
│  │          │$/sqft │Total││
│  ├──────────┼───────┼─────┤│
│  │ Asphalt  │$5.96  │$16K ││
│  │ Metal    │$7.86  │$21K ││
│  │ Designer │$7.96  │$21K ││
│  └──────────┴───────┴─────┘│
└────────────────────────────┘
```

Table view uses abbreviated numbers on mobile (`$16K` vs `$16,062`). Full numbers on desktop.

**B) City Comparison** — Compare the same roof across different cities.

Access: "Compare Cities" button on results page → opens `/compare`

```
┌────────────────────────────┐
│  Compare Cities             │
│                            │
│  Your roof: 2,450 sqft     │
│                            │
│  ┌──────────────────────┐  │
│  │ + Add city to compare│  │  ← Opens city search modal
│  └──────────────────────┘  │
│                            │
│  ┌─── Provo, UT ────────┐  │  ← Removable pill
│  │ Asphalt: $16,062     │  │
│  │ Metal:   $21,183     │  │
│  └──────────────────────┘  │
│                            │
│  ┌─── SLC, UT ──────────┐  │
│  │ Asphalt: $15,890     │  │  ← Green highlight if cheaper
│  │ Metal:   $20,450     │  │
│  └──────────────────────┘  │
│                            │
│  Provo is $172 more for    │  ← Auto-generated insight
│  asphalt vs Salt Lake City │
│                            │
└────────────────────────────┘
```

### City Search Modal
- Full-screen on mobile (`fixed inset-0 z-50 bg-white`)
- Search input auto-focused
- Results as a scrollable list, tap to add
- Max 4 cities in comparison (more gets unreadable on mobile)

---

## Section 8: City Browser (`/cities`)

### Layout
```
┌──────────────────────────────┐
│  ← Home   City Prices        │
├──────────────────────────────┤
│                              │
│  ┌────────────────────────┐  │
│  │ 🔍 Search cities...    │  │  ← Sticky at top of scroll
│  └────────────────────────┘  │     Debounced 200ms
│                              │
│  982 cities across 50 states │  ← text-sm text-gray-400
│                              │
│  ▼ Alabama (14 cities)       │  ← Collapsible state sections
│    Albertville               │     Sorted alphabetically
│    Auburn                    │
│    Birmingham                │     Tap city → inline expand
│    ...                       │     or navigate to city page
│                              │
│  ▼ Alaska (3 cities)         │
│    Anchorage                 │
│    ...                       │
│                              │
│  [... more states]           │
└──────────────────────────────┘
```

### Search Behavior
- Instant filter as user types
- Matches city name OR state name
- If query matches a state ("Utah"), show all cities in that state
- If no results: "No cities matching '[query]'. Try a nearby city or [enter an address instead →]"

### Individual City Page
```
┌──────────────────────────────┐
│  ← Cities   Provo, UT       │
├──────────────────────────────┤
│                              │
│  Roofing Prices in           │
│  Provo, Utah                 │  ← H1
│                              │
│  Avg roof size: 2,100 sqft   │
│  Avg pitch: 6/12             │
│  Roofs scanned: 847          │
│  Updated: Feb 2026           │
│                              │
│  ── MATERIAL PRICING ─────   │
│                              │
│  [Material cards with        │
│   per-sqft and per-square    │
│   pricing, no estimate       │
│   since no address entered]  │
│                              │
│  ┌────────────────────────┐  │
│  │ Get estimate for YOUR  │  │  ← CTA: enter address
│  │ roof in Provo →        │  │
│  └────────────────────────┘  │
│                              │
│  Labor: $1.50 – $3.50/sqft  │  ← If available
│                              │
└──────────────────────────────┘
```

---

## Section 9: Empty & Error States

### Address Not Found (geocoding fails)
```
┌────────────────────────────┐
│                            │
│     📍                     │  ← Muted icon, gray
│                            │
│  Address not found          │  ← text-lg font-semibold
│                            │
│  We couldn't locate that   │  ← text-sm text-gray-500
│  address. Try including    │
│  city and state, or use    │
│  the autocomplete          │
│  suggestions.              │
│                            │
│  [Try Again]               │  ← Returns to input, focused
│                            │
└────────────────────────────┘
```

### Solar Data Unavailable (rural or unsupported area)
```
┌────────────────────────────┐
│                            │
│     🛰️                     │
│                            │
│  Satellite data unavailable │
│                            │
│  Google's satellite imagery │
│  doesn't cover this area   │
│  yet. This is common in    │
│  rural areas.              │
│                            │
│  You can still browse      │
│  local pricing:            │
│                            │
│  [View [City] Prices →]    │  ← If we matched a nearby city
│  [Enter a different        │
│   address]                 │
│                            │
└────────────────────────────┘
```

### City Not in Database (nearest city is very far)
When the nearest city in our 982-city database is >50 miles away:
```
┌────────────────────────────┐
│  ⚠️ Pricing data is from    │  ← Yellow warning banner
│  [City] (67 mi away).      │     bg-amber-50 text-amber-800
│  Actual prices in your     │     rounded-lg p-3
│  area may differ.          │
└────────────────────────────┘
```
Still show the estimate — but with this prominent caveat.

### API Error (500, timeout, quota exceeded)
```
┌────────────────────────────┐
│                            │
│     ⚠️                     │
│                            │
│  Something went wrong       │
│                            │
│  We couldn't measure this  │
│  roof right now. This is   │
│  usually temporary.        │
│                            │
│  [Try Again]               │
│  [Browse City Prices →]    │  ← Fallback path
│                            │
└────────────────────────────┘
```

### No Materials Available (edge case — city exists but empty materials)
Should not happen with current data, but defensively:
```
No pricing data available for [City]. Try a nearby city.
```

---

## Section 10: Export / Share

### Export Button
Full-width button below material cards:
```tsx
<button
  onClick={() => window.print()}
  className="w-full h-12 bg-navy text-white font-semibold rounded-lg
             flex items-center justify-center gap-2
             active:scale-[0.98] transition-transform"
>
  📤 Export Estimate
</button>
```

### Print Stylesheet
On `window.print()`, the page transforms to a clean, printable layout:

- Hide: header nav, back button, export button, compare button, disclaimer link
- Show: XPERIENCE logo + date header (hidden in normal view)
- White background, black text
- Material cards stack without shadows
- Add footer: "Generated by XPERIENCE Roofing Estimator • xperience-pricing-tool.vercel.app"

```css
@media print {
  nav, .no-print { display: none !important; }
  body { background: white !important; color: black !important; }
  .print-only { display: block !important; }
  .material-card {
    break-inside: avoid;
    box-shadow: none !important;
    border: 1px solid #e5e7eb !important;
  }
}
```

### Share (Mobile)
If Web Share API is available, add a "Share" button that shares the URL:
```ts
if (navigator.share) {
  navigator.share({
    title: `Roof Estimate — ${address}`,
    url: window.location.href,
  });
}
```
The URL already encodes the address, so the recipient gets the same estimate.

---

## Section 11: Navigation & Header

### Mobile Header — 56px, Minimal
```
┌──────────────────────────────┐
│  [Logo]  XPERIENCE    [☰]   │  ← Logo 32px, hamburger right
└──────────────────────────────┘
```

- On results page: `← Back` replaces hamburger (or sits left of logo)
- Hamburger menu slides in from right: Home, City Prices, About
- Keep it minimal — Jamie doesn't need complex navigation

### Desktop Header (>768px)
```
┌──────────────────────────────────────────────┐
│  [Logo] XPERIENCE    Home  Cities    [CTA]   │
└──────────────────────────────────────────────┘
```

---

## Section 12: Accessibility

### Touch Targets
- All interactive elements: minimum 44×44px (`min-h-[44px] min-w-[44px]`)
- Buttons: `h-12` or `h-14` (48-56px)
- Card taps (city list): full-width row with `py-3` padding

### Contrast Ratios (WCAG AA)
| Combination | Ratio | Pass? |
|-------------|-------|-------|
| Navy `#1a1f3d` on Cream `#f8f6f3` | 12.4:1 | ✅ AAA |
| Orange `#e85d26` on White `#ffffff` | 3.5:1 | ⚠️ AA Large only |
| White `#ffffff` on Orange `#e85d26` | 3.5:1 | ⚠️ AA Large only |
| White `#ffffff` on Navy `#1a1f3d` | 12.4:1 | ✅ AAA |
| Gray-500 `#6b7280` on White | 4.6:1 | ✅ AA |

**Action:** Orange text on white fails for small text. Use orange ONLY for:
- Large text (≥18px bold / ≥24px regular)
- Buttons with white text on orange background (inverted — passes for large text)
- Decorative elements (section labels where adjacent context provides meaning)

For small text emphasis, use navy instead of orange.

### Focus States
Every interactive element gets a visible focus ring:
```css
*:focus-visible {
  outline: 2px solid #e85d26;
  outline-offset: 2px;
}
```

### Screen Reader Considerations
- Roof measurement: `aria-label="Roof area: 2,450 square feet"`
- Loading state: `role="status" aria-live="polite"`
- Material cards: `role="article"` with clear headings
- Price ranges: "nineteen thousand seven hundred thirty-seven to twenty-four thousand six hundred thirty-seven dollars" — format with proper `aria-label`

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
Counter animation and staggered reveals skip to final state.

---

## Section 13: Responsive Breakpoints

| Breakpoint | Layout Changes |
|------------|----------------|
| **< 640px** (default) | Single column, full-width cards, `px-4`, stacked layout |
| **≥ 640px** (`sm:`) | Slightly wider cards with `px-6`, roof stats in 2×2 grid |
| **≥ 768px** (`md:`) | Max-width container `max-w-2xl mx-auto`, inline header nav |
| **≥ 1024px** (`lg:`) | `max-w-4xl`, material cards in 2-column grid, roof data card beside address |
| **≥ 1280px** (`xl:`) | `max-w-5xl`, 3-column material grid (if 3+ materials) |

**Critical:** The app should feel complete and polished at 375px wide (iPhone SE). Everything above that is enhancement.

---

## Section 14: Component Inventory

| Component | File | Props |
|-----------|------|-------|
| `AddressInput` | `components/AddressInput.tsx` | `onSubmit(address: string)`, `loading: boolean` |
| `RoofDataCard` | `components/RoofDataCard.tsx` | `roofData: RoofMeasurement`, `animate: boolean` |
| `MaterialCard` | `components/MaterialCard.tsx` | `estimate: MaterialEstimate`, `isCheapest: boolean`, `nationalAvg: number` |
| `MaterialGrid` | `components/MaterialGrid.tsx` | `estimates: MaterialEstimate[]`, `nationalAverages: Record<string, number>` |
| `LoadingState` | `components/LoadingState.tsx` | `address: string` |
| `CitySearch` | `components/CitySearch.tsx` | `onSelect(city: CityPricing)` |
| `CityCard` | `components/CityCard.tsx` | `city: CityPricing` |
| `CompareView` | `components/CompareView.tsx` | `roofSqft: number`, `cities: CityPricing[]` |
| `NationalContext` | `components/NationalContext.tsx` | `materialKey: string`, `cityCost: number`, `nationalAvg: number` |
| `ExportButton` | `components/ExportButton.tsx` | — |
| `ErrorState` | `components/ErrorState.tsx` | `type: 'not-found' \| 'no-solar' \| 'api-error'`, `city?: CityPricing` |
| `Header` | `components/Header.tsx` | `showBack: boolean` |

---

## Section 15: Performance Budget

| Metric | Target | How |
|--------|--------|-----|
| FCP | < 1.2s | Static landing page, system font stack |
| LCP | < 2.0s | No hero image, text-only landing |
| CLS | < 0.05 | Reserve space for loading → results transition |
| JS bundle (client) | < 80KB gzipped | No heavy dependencies, city search index ~80KB |
| TTI | < 2.5s | Minimal client JS on landing |

### Key Decisions for Performance
1. **No hero image** on landing — text + icon is faster and sufficient for a tool
2. **System font stack** as fallback, Inter loaded async
3. **Pricing data server-only** — never ships to client
4. **City search index** is the only large client-side asset (~80KB)
5. **Google Places script** lazy-loaded when input is focused

---

*This spec is ready for a builder agent. Every component, every state, every pixel decision is documented. Build mobile-first, test at 375px, and make that sqft counter animation buttery smooth.*
