# XPERIENCE Roofing Estimator — Technical Architecture

> Generated: 2026-02-12 | For builder agent consumption

## Table of Contents
1. [Component Structure](#1-component-structure)
2. [API Routes](#2-api-routes)
3. [Data Architecture](#3-data-architecture)
4. [Auto-City Detection](#4-auto-city-detection)
5. [Estimate Calculation](#5-estimate-calculation)
6. [Mobile UX Flow](#6-mobile-ux-flow)
7. [Performance](#7-performance)
8. [Export Feature](#8-export-feature)

---

## 1. Component Structure

### Tech Stack
- **Next.js 14+** with App Router (`/app` directory)
- **TypeScript** throughout
- **Tailwind CSS** with XPERIENCE design tokens
- **No external state library** — React `useState`/`useReducer` + URL search params for shareable state

### Design Tokens (Tailwind config)
```ts
// tailwind.config.ts
const config = {
  theme: {
    extend: {
      colors: {
        navy: '#1a1f3d',
        orange: '#e85d26',
        cream: '#f8f6f3',
        'navy-light': '#2a2f5d',
      },
    },
  },
};
```

### Page Structure
```
app/
├── layout.tsx              # Root layout — nav, XPERIENCE branding, fonts
├── page.tsx                # Home — address input hero + CTA
├── estimate/
│   └── page.tsx            # Estimate results (address-based)
├── cities/
│   ├── page.tsx            # City browser (search/filter all 982)
│   └── [state]/
│       └── [city]/
│           └── page.tsx    # Individual city pricing page (SEO)
├── compare/
│   └── page.tsx            # Side-by-side comparison
├── api/
│   ├── roof-measure/
│   │   └── route.ts        # Google Solar API proxy
│   ├── geocode/
│   │   └── route.ts        # Address → lat/lng → nearest city
│   └── estimate/
│       └── route.ts        # Full estimate calculation
├── components/
│   ├── AddressInput.tsx    # Autocomplete address field
│   ├── RoofResults.tsx     # Roof sqft, pitch, segments display
│   ├── MaterialCard.tsx    # Single material cost breakdown
│   ├── MaterialGrid.tsx    # Grid of all available materials
│   ├── EstimateSummary.tsx # Total cost summary with ranges
│   ├── CitySearch.tsx      # Search/filter city list
│   ├── CityCard.tsx        # City preview card
│   ├── CompareTable.tsx    # Side-by-side comparison
│   ├── WasteFactor.tsx     # Waste % display based on pitch
│   ├── NationalContext.tsx # "X% above/below national avg"
│   ├── ExportButton.tsx    # PDF/print export trigger
│   ├── LoadingSpinner.tsx  # Branded loading state
│   └── ui/                 # Shared primitives (Button, Input, Card, etc.)
└── lib/
    ├── pricing-data.ts     # Typed pricing data loader + search
    ├── city-matcher.ts     # Geocode → nearest city matching
    ├── calculations.ts     # Estimate formulas, waste factors
    ├── types.ts            # All TypeScript interfaces
    └── constants.ts        # Material display names, colors, icons
```

### State Management

**No global store needed.** State flows:

1. **Address input** → calls `/api/roof-measure` → stores result in `estimate` page via URL params or `useState`
2. **City browser** → static data, client-side filtering
3. **Comparison** → URL search params encode selected cities/materials

```ts
// Estimate page state
interface EstimateState {
  address: string;
  roofData: RoofMeasurement | null;  // from Solar API
  matchedCity: CityPricing | null;   // nearest city
  selectedMaterials: string[];       // for comparison
  loading: boolean;
  error: string | null;
}
```

---

## 2. API Routes

### 2a. `/api/roof-measure` — Google Solar API Proxy

The existing Python script (`roof_measure_final.py`) uses two approaches:
1. **DSM + mask layer analysis** — downloads GeoTIFF rasters, does gradient-based surface area calculation
2. **Building selection** — centroid or size-matching

For the Next.js port, we use a **simpler approach**: the Google Solar `buildingInsights` endpoint, which returns pre-computed roof data directly (no raster processing needed). The DSM approach is more accurate but requires server-side NumPy/rasterio which won't run on Vercel.

```ts
// app/api/roof-measure/route.ts
import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_API_KEY = process.env.GOOGLE_SOLAR_API_KEY!;
const CACHE = new Map<string, { data: any; ts: number }>();
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days — roofs don't change fast

export async function POST(req: NextRequest) {
  const { address } = await req.json();

  if (!address || typeof address !== 'string') {
    return NextResponse.json({ error: 'Address required' }, { status: 400 });
  }

  // Check cache
  const cacheKey = address.toLowerCase().trim();
  const cached = CACHE.get(cacheKey);
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return NextResponse.json(cached.data);
  }

  try {
    // Step 1: Geocode address
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_API_KEY}`;
    const geoRes = await fetch(geocodeUrl);
    const geoData = await geoRes.json();

    if (!geoData.results?.[0]) {
      return NextResponse.json({ error: 'Address not found' }, { status: 404 });
    }

    const { lat, lng } = geoData.results[0].geometry.location;
    const formattedAddress = geoData.results[0].formatted_address;

    // Step 2: Get building insights from Solar API
    const solarUrl = `https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=${lat}&location.longitude=${lng}&requiredQuality=HIGH&key=${GOOGLE_API_KEY}`;
    const solarRes = await fetch(solarUrl);

    if (!solarRes.ok) {
      // Fallback to MEDIUM quality if HIGH unavailable
      const fallbackUrl = solarUrl.replace('HIGH', 'MEDIUM');
      const fallbackRes = await fetch(fallbackUrl);
      if (!fallbackRes.ok) {
        return NextResponse.json(
          { error: 'Solar data unavailable for this address' },
          { status: 404 }
        );
      }
      var solarData = await fallbackRes.json();
    } else {
      var solarData = await solarRes.json();
    }

    // Step 3: Extract roof measurements
    const roofSegments = solarData.solarPotential?.roofSegmentStats || [];
    const wholeRoof = solarData.solarPotential?.wholeRoofStats;

    // Calculate total surface area from segments
    // Each segment has: pitchDegrees, azimuthDegrees, stats.areaMeters2
    let totalAreaM2 = 0;
    let weightedPitch = 0;

    for (const seg of roofSegments) {
      const areaM2 = seg.stats?.areaMeters2 || 0;
      totalAreaM2 += areaM2;
      weightedPitch += (seg.pitchDegrees || 0) * areaM2;
    }

    const avgPitchDeg = totalAreaM2 > 0 ? weightedPitch / totalAreaM2 : 0;
    const pitchOver12 = Math.tan(avgPitchDeg * Math.PI / 180) * 12;
    const totalSqft = Math.round(totalAreaM2 * 10.7639);

    // If segment data unavailable, use wholeRoofStats
    const finalSqft = totalSqft || Math.round((wholeRoof?.areaMeters2 || 0) * 10.7639);

    const result = {
      address: formattedAddress,
      lat,
      lng,
      roofSqft: finalSqft,
      pitchOver12: Math.round(pitchOver12 * 10) / 10,
      pitchDegrees: Math.round(avgPitchDeg * 10) / 10,
      segments: roofSegments.length,
      quality: solarData.imageryQuality || 'UNKNOWN',
    };

    // Cache
    CACHE.set(cacheKey, { data: result, ts: Date.now() });

    return NextResponse.json(result);
  } catch (err: any) {
    console.error('Roof measure error:', err);
    return NextResponse.json(
      { error: 'Failed to measure roof' },
      { status: 500 }
    );
  }
}
```

**Key differences from Python script:**
- Python script downloads raw DSM/mask GeoTIFFs and does pixel-level gradient analysis (NumPy/rasterio)
- Next.js version uses `buildingInsights:findClosest` which returns pre-computed roof segment stats
- Python is more accurate (~<3% error) but requires heavy dependencies
- `buildingInsights` is sufficient for estimates and runs on Vercel's serverless

**Error handling cascade:**
1. Invalid address → 400
2. Address not found → 404
3. Solar data unavailable (rural) → 404 with explanation
4. HIGH quality unavailable → retry with MEDIUM
5. API quota/error → 500

### 2b. `/api/geocode` — Address to Nearest City

```ts
// app/api/geocode/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { findNearestCity } from '@/lib/city-matcher';

export async function POST(req: NextRequest) {
  const { lat, lng } = await req.json();
  const city = findNearestCity(lat, lng);
  return NextResponse.json(city);
}
```

---

## 3. Data Architecture

### Pricing Data Shape

```ts
// lib/types.ts
interface PricingData {
  scrapedAt: string;
  totalCities: number;
  cities: CityPricing[];
}

interface CityPricing {
  state: string;          // lowercase slug: "alabama"
  city: string;           // lowercase slug: "albertville"
  cityDisplay: string;    // "Albertville"
  stateDisplay: string;   // "Alabama"
  avgRoofSizeSqft: number;
  avgPitch: string;       // "6/12"
  roofsScanned: number;
  lastUpdated: string;
  materials: Record<string, MaterialPricing>;
  laborCostRange: LaborCost | null;
}

interface MaterialPricing {
  displayName: string;    // "Asphalt shingle"
  costPerSqft: number;    // 5.96
  costPerSquare: number;  // 596 (per 100 sqft)
}

interface LaborCost {
  low: number;   // per sqft
  high: number;  // per sqft
  unit: string;  // "per_sqft"
}
```

**Current data stats:**
- 982 cities across 50 states
- Materials per city: 2-3 (asphalt_shingle, metal, designer_shingle — not all cities have all 3)
- **No cities currently have** clay_terra_cotta, concrete, or cedar_shingle (spec says 6 but data only has 3)
- Labor data available for 289/982 cities (the rest are `null`)

### Loading Strategy

The JSON is ~3.5MB. Bundle it statically:

```ts
// lib/pricing-data.ts
import rawData from '@/data/roofing-prices.json';
import type { PricingData, CityPricing } from './types';

const data = rawData as PricingData;

// Pre-compute search index at module load
const cityIndex = new Map<string, CityPricing>();
const stateIndex = new Map<string, CityPricing[]>();

for (const city of data.cities) {
  cityIndex.set(`${city.state}/${city.city}`, city);
  const existing = stateIndex.get(city.state) || [];
  existing.push(city);
  stateIndex.set(city.state, existing);
}

export function getAllCities(): CityPricing[] {
  return data.cities;
}

export function getCityBySlug(state: string, city: string): CityPricing | undefined {
  return cityIndex.get(`${state}/${city}`);
}

export function getCitiesByState(state: string): CityPricing[] {
  return stateIndex.get(state) || [];
}

export function searchCities(query: string): CityPricing[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return data.cities.filter(c =>
    c.cityDisplay.toLowerCase().includes(q) ||
    c.stateDisplay.toLowerCase().includes(q) ||
    `${c.cityDisplay}, ${c.stateDisplay}`.toLowerCase().includes(q)
  );
}

// National averages (pre-computed)
export function getNationalAverages(): Record<string, { avg: number; min: number; max: number }> {
  const byMaterial: Record<string, number[]> = {};
  for (const city of data.cities) {
    for (const [key, mat] of Object.entries(city.materials)) {
      if (!byMaterial[key]) byMaterial[key] = [];
      byMaterial[key].push(mat.costPerSqft);
    }
  }
  const result: Record<string, { avg: number; min: number; max: number }> = {};
  for (const [key, prices] of Object.entries(byMaterial)) {
    result[key] = {
      avg: prices.reduce((a, b) => a + b, 0) / prices.length,
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }
  return result;
}
```

### Data File Location
Copy the JSON into the project:
```
projects/xperience-pricing-tool/
  src/data/roofing-prices.json    # copied from systems/xperience/roofing-prices/
```

---

## 4. Auto-City Detection

When user enters an address, the Solar API returns lat/lng. Use that to find the nearest city in our pricing database.

**Problem:** Our pricing JSON doesn't include lat/lng for each city.

**Solution:** Use a lightweight geocoding lookup table. Pre-generate a city coordinates file at build time, or use the Google Geocoding API result.

### Approach: Haversine Distance Matching

```ts
// lib/city-matcher.ts
import cityCoordsRaw from '@/data/city-coords.json';
import { getAllCities } from './pricing-data';
import type { CityPricing } from './types';

// city-coords.json shape: { "alabama/albertville": [34.26, -86.21], ... }
const cityCoords = cityCoordsRaw as Record<string, [number, number]>;

function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3959; // miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function findNearestCity(lat: number, lng: number): {
  city: CityPricing;
  distanceMiles: number;
} {
  const cities = getAllCities();
  let bestCity: CityPricing | null = null;
  let bestDist = Infinity;

  for (const city of cities) {
    const coords = cityCoords[`${city.state}/${city.city}`];
    if (!coords) continue;
    const dist = haversineDistance(lat, lng, coords[0], coords[1]);
    if (dist < bestDist) {
      bestDist = dist;
      bestCity = city;
    }
  }

  return { city: bestCity!, distanceMiles: Math.round(bestDist) };
}
```

### Build-Time City Coordinates Generation

Create a one-time script to geocode all 982 cities and save coordinates:

```ts
// scripts/generate-city-coords.ts
// Run once: npx tsx scripts/generate-city-coords.ts
import data from '../src/data/roofing-prices.json';

const API_KEY = process.env.GOOGLE_API_KEY!;
const coords: Record<string, [number, number]> = {};

for (const city of data.cities) {
  const query = `${city.cityDisplay}, ${city.stateDisplay}`;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.results?.[0]) {
    const { lat, lng } = data.results[0].geometry.location;
    coords[`${city.state}/${city.city}`] = [
      Math.round(lat * 1000) / 1000,
      Math.round(lng * 1000) / 1000,
    ];
  }
  await new Promise(r => setTimeout(r, 50)); // rate limit
}

import fs from 'fs';
fs.writeFileSync('src/data/city-coords.json', JSON.stringify(coords));
```

This produces a ~50KB file. Run once, commit the result.

---

## 5. Estimate Calculation

### Core Formula

```
Material Cost = roofSqft × (1 + wasteFactor) × costPerSqft
Labor Cost    = roofSqft × laborRate (low/high range)
Total         = Material Cost + Labor Cost
```

### Waste Factor by Pitch

| Pitch   | Waste Factor | Notes                     |
|---------|-------------|---------------------------|
| 0-4:12  | 5%          | Low slope, minimal waste  |
| 5-7:12  | 10%         | Standard residential      |
| 8-9:12  | 12%         | Moderate complexity       |
| 10-12:12| 15%         | Steep, more cuts          |
| 12+:12  | 20%         | Very steep, complex       |

### Implementation

```ts
// lib/calculations.ts
import type { CityPricing, MaterialPricing } from './types';

export function getWasteFactor(pitchOver12: number): number {
  if (pitchOver12 <= 4) return 0.05;
  if (pitchOver12 <= 7) return 0.10;
  if (pitchOver12 <= 9) return 0.12;
  if (pitchOver12 <= 12) return 0.15;
  return 0.20;
}

export interface MaterialEstimate {
  materialKey: string;
  displayName: string;
  costPerSqft: number;
  materialCost: number;           // material only
  laborCostLow: number | null;    // null if no labor data
  laborCostHigh: number | null;
  totalLow: number | null;
  totalHigh: number | null;
  materialOnlyCost: number;       // always available
}

export interface FullEstimate {
  roofSqft: number;
  adjustedSqft: number;          // with waste factor
  pitchOver12: number;
  wasteFactor: number;
  wastePercent: string;          // "10%"
  city: string;
  state: string;
  distanceMiles: number;
  materials: MaterialEstimate[];
}

export function calculateEstimate(
  roofSqft: number,
  pitchOver12: number,
  city: CityPricing,
  distanceMiles: number,
): FullEstimate {
  const wasteFactor = getWasteFactor(pitchOver12);
  const adjustedSqft = Math.round(roofSqft * (1 + wasteFactor));

  const materials: MaterialEstimate[] = Object.entries(city.materials).map(
    ([key, mat]) => {
      const materialCost = adjustedSqft * mat.costPerSqft;
      const labor = city.laborCostRange;
      const laborLow = labor ? roofSqft * labor.low : null;
      const laborHigh = labor ? roofSqft * labor.high : null;

      return {
        materialKey: key,
        displayName: mat.displayName,
        costPerSqft: mat.costPerSqft,
        materialCost: Math.round(materialCost),
        laborCostLow: laborLow ? Math.round(laborLow) : null,
        laborCostHigh: laborHigh ? Math.round(laborHigh) : null,
        totalLow: laborLow ? Math.round(materialCost + laborLow) : null,
        totalHigh: laborHigh ? Math.round(materialCost + laborHigh) : null,
        materialOnlyCost: Math.round(materialCost),
      };
    }
  );

  return {
    roofSqft,
    adjustedSqft,
    pitchOver12,
    wasteFactor,
    wastePercent: `${Math.round(wasteFactor * 100)}%`,
    city: city.cityDisplay,
    state: city.stateDisplay,
    distanceMiles,
    materials,
  };
}
```

### Labor Data Fallback

Only 289/982 cities have labor data. When `laborCostRange` is null:
- Show material cost prominently
- Show "Labor costs not available for this area" with a note
- Optionally use state-level average labor rate as fallback (compute from cities in same state that do have labor data)

```ts
export function getStateLaborFallback(state: string, allCities: CityPricing[]): LaborCost | null {
  const citiesWithLabor = allCities.filter(
    c => c.state === state && c.laborCostRange
  );
  if (citiesWithLabor.length === 0) return null;
  const avgLow = citiesWithLabor.reduce((s, c) => s + c.laborCostRange!.low, 0) / citiesWithLabor.length;
  const avgHigh = citiesWithLabor.reduce((s, c) => s + c.laborCostRange!.high, 0) / citiesWithLabor.length;
  return { low: Math.round(avgLow * 100) / 100, high: Math.round(avgHigh * 100) / 100, unit: 'per_sqft' };
}
```

---

## 6. Mobile UX Flow

Jamie uses this at job sites on his phone. Every screen must be thumb-friendly.

### Screen 1: Home / Address Input
```
┌─────────────────────────┐
│  XPERIENCE ROOFING      │
│  ━━━━━━━━━━━━━━━━━━━━   │
│                         │
│  Get Your Roof Estimate │
│                         │
│  ┌───────────────────┐  │
│  │ Enter address...  │  │
│  └───────────────────┘  │
│                         │
│  [ Measure My Roof  🔍 ]│
│                         │
│  ─── or ───             │
│                         │
│  [ Browse City Prices ] │
│                         │
└─────────────────────────┘
```
- Google Places Autocomplete on the input (use the same API key)
- Big tap target on CTA button
- "Browse City Prices" links to `/cities`

### Screen 2: Loading State (2-5 seconds)
```
┌─────────────────────────┐
│  Measuring your roof... │
│                         │
│     🏠 ← animated      │
│                         │
│  Using satellite data   │
│  to measure roof area   │
└─────────────────────────┘
```

### Screen 3: Estimate Results
```
┌─────────────────────────┐
│  123 Main St, Provo UT  │
│                         │
│  ROOF: 2,450 sq ft     │
│  PITCH: 6.2:12         │
│  WASTE: +10% → 2,695sf │
│                         │
│  Nearest city: Provo, UT│
│  (3 miles away)         │
│                         │
│  ── MATERIALS ────────  │
│                         │
│  ┌─ Asphalt Shingle ──┐│
│  │ $5.96/sqft          ││
│  │ Material: $16,062   ││
│  │ + Labor: $3,675-    ││
│  │          $8,575     ││
│  │ ━━━━━━━━━━━━━━━━━━  ││
│  │ TOTAL: $19,737 -    ││
│  │        $24,637      ││
│  └─────────────────────┘│
│                         │
│  ┌─ Metal ─────────────┐│
│  │ ...                 ││
│  └─────────────────────┘│
│                         │
│  ┌─ Designer Shingle ──┐│
│  │ ...                 ││
│  └─────────────────────┘│
│                         │
│  📊 vs National Average │
│  📤 Export Estimate      │
│  🔄 Compare Materials   │
└─────────────────────────┘
```

### Screen 4: City Browser (`/cities`)
- Search bar at top (instant filter)
- Grouped by state (collapsible)
- Tap city → shows that city's full pricing table
- Can also enter address from city page

### Screen 5: Export/Share
- Generates clean estimate summary
- "Share" button uses Web Share API on mobile
- "Print" opens print-optimized view

### Navigation
- Simple top bar: Logo | Home | Cities
- Back navigation uses browser history
- URL structure supports sharing: `/estimate?address=123+Main+St`

---

## 7. Performance

### Static Data Bundling
- **Pricing JSON (~3.5MB):** Import in server components only. Use `getStaticProps` pattern or RSC to avoid shipping to client.
- **City coords (~50KB):** Same approach — server-side only for matching.
- For client-side city search: ship a lightweight index (city name + state + slug only, ~80KB).

```ts
// lib/city-search-index.ts — lightweight client-side index
// Generate at build time from full data
export interface CitySearchEntry {
  d: string;  // "Albertville, Alabama"
  s: string;  // "alabama/albertville" (slug)
}
// ~80KB for 982 cities, ships to client for instant search
```

### API Route Caching

```ts
// In-memory cache for roof measurements (Vercel serverless has ephemeral memory)
// For persistence, use Vercel KV:
import { kv } from '@vercel/kv';

async function getCachedRoof(address: string) {
  const key = `roof:${address.toLowerCase().trim()}`;
  const cached = await kv.get(key);
  if (cached) return cached;
  // ... measure ...
  await kv.set(key, result, { ex: 604800 }); // 7 day TTL
  return result;
}
```

If Vercel KV is overkill, the in-memory Map cache is fine for MVP (measurements are cached per serverless instance).

### Loading States
- Address submission → skeleton cards for materials
- City search → debounced at 200ms, show "Searching..." only after 500ms
- Image quality badge shows immediately from API response

### Bundle Optimization
- Pricing data: server-only import (never in client bundle)
- Google Places Autocomplete: lazy-load the script
- No heavy dependencies — Tailwind + Next.js only

---

## 8. Export Feature

### Approach: Print-Optimized Page + `window.print()`

Simplest, most reliable approach. No PDF library needed.

```tsx
// components/ExportButton.tsx
'use client';

export function ExportButton() {
  return (
    <button
      onClick={() => window.print()}
      className="bg-orange text-white px-6 py-3 rounded-lg font-semibold"
    >
      📤 Export Estimate
    </button>
  );
}
```

```css
/* globals.css — print styles */
@media print {
  nav, .no-print, footer { display: none !important; }
  body { background: white; color: black; }
  .estimate-card { break-inside: avoid; }
  .print-header { display: block !important; } /* XPERIENCE logo + date */
}
```

### Print Layout
```
╔═══════════════════════════════════════╗
║  XPERIENCE ROOFING                   ║
║  Roof Estimate — Feb 12, 2026        ║
╠═══════════════════════════════════════╣
║                                       ║
║  Property: 123 Main St, Provo, UT    ║
║  Roof Area: 2,450 sq ft              ║
║  Pitch: 6.2:12                        ║
║  Waste Factor: 10% (+245 sq ft)      ║
║  Adjusted Area: 2,695 sq ft          ║
║                                       ║
║  Pricing based on: Provo, UT         ║
║                                       ║
║  ┌──────────────┬──────────┬────────┐║
║  │ Material     │ $/sqft   │ Total  │║
║  ├──────────────┼──────────┼────────┤║
║  │ Asphalt      │ $5.96    │$16,062 │║
║  │ Metal        │ $7.86    │$21,183 │║
║  │ Designer     │ $7.96    │$21,452 │║
║  └──────────────┴──────────┴────────┘║
║                                       ║
║  Labor estimate: $3,675 - $8,575     ║
║                                       ║
║  Disclaimer: This is an estimate...  ║
║  Contact XPERIENCE: (XXX) XXX-XXXX  ║
╚═══════════════════════════════════════╝
```

### Future Enhancement: PDF via Vercel Edge
If a proper PDF download is needed later, use `@react-pdf/renderer` or a Vercel Edge function with Puppeteer to render the print page to PDF. For MVP, `window.print()` → "Save as PDF" is sufficient.

---

## Appendix: Key Implementation Notes

### Environment Variables
```env
GOOGLE_SOLAR_API_KEY=AIzaSy...  # from ~/clawd/config/.google-solar-credentials
```

### Python Script vs Next.js API Route
| Feature | Python Script | Next.js Route |
|---------|--------------|---------------|
| Endpoint | DSM + mask layers (raster) | buildingInsights (JSON) |
| Accuracy | <3% error | ~5-10% error (pre-computed) |
| Dependencies | NumPy, rasterio, scipy | None (just fetch) |
| Runs on | Local/server with Python | Vercel serverless |
| Speed | 5-10s (downloads GeoTIFFs) | 1-3s (single API call) |

The `buildingInsights` endpoint is the right trade-off for a web app. If higher accuracy is needed later, the Python script could run as a separate microservice.

### SEO Value
Each city page (`/cities/[state]/[city]`) is a static page with local pricing data — excellent for SEO. Pre-render all 982 city pages at build time with `generateStaticParams()`.

```ts
// app/cities/[state]/[city]/page.tsx
export async function generateStaticParams() {
  const cities = getAllCities();
  return cities.map(c => ({ state: c.state, city: c.city }));
}
```

### Data Gaps to Note
1. **Only 3 material types** in current data (asphalt_shingle, metal, designer_shingle) — not 6 as spec mentions. The UI should dynamically render whatever materials exist per city.
2. **Labor data missing** for 693/982 cities. Use state-level fallback or show "material only" estimates.
3. **No lat/lng in pricing data** — must generate `city-coords.json` before city matching works.
