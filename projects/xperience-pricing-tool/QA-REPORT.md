# QA Report — XPERIENCE Roofing Estimator
**Date:** 2026-02-13  
**Tested:** Source code review + live site (https://xperience-pricing-tool.vercel.app)

---

## ✅ PASSED

1. **Landing page** — Loads correctly, address input visible and functional, clean design
2. **City browser** — `/cities` loads, search filters work, state accordion expand/collapse works, auto-expands on search
3. **Individual city pages** — `/cities/utah/salt-lake-city` loads with correct data (2,602 sqft avg, 6/12 pitch, 137,932 roofs scanned)
4. **API key security** — `GOOGLE_SOLAR_API_KEY` is in `process.env` server-side only, never exposed to client
5. **No hardcoded secrets** — No API keys or secrets in any client-side code
6. **TypeScript** — `tsc --noEmit` passes with zero errors
7. **Error states** — Three distinct error types handled (not-found, no-solar, api-error) with retry + fallback to city browser
8. **Print/export** — Print styles defined, `no-print` class hides nav/buttons, print-only header shown
9. **Number formatting** — `toLocaleString('en-US')` used consistently, tabular-nums CSS applied
10. **XPERIENCE branding** — Consistent navy/orange/cream theme, "XPERIENCE ROOFING" in header and print header
11. **Animations** — `reveal-up` staggered animations, `prefers-reduced-motion` respected
12. **Roof measurement API** — Proper geocoding → Solar API pipeline with HIGH→MEDIUM quality fallback, 7-day cache
13. **Waste factor calculation** — Correctly scales by pitch (5%–20%), applied to adjusted sqft
14. **Estimate math** — `materialCost = adjustedSqft × costPerSqft`, labor uses original sqft × labor range. Correct.
15. **Mobile responsiveness** — Tailwind responsive classes used (`md:text-4xl`, `lg:grid-cols-2`, `xl:grid-cols-3`), max-width containers

---

## 🐛 BUGS

### BUG-1: Distance calculation is fake (HIGH)
**File:** `app/api/estimate/route.ts`  
**Description:** The API receives `lat`/`lng` but never uses them. `distanceMiles` is hardcoded to `0` (exact match) or `999` (no match). The "X mi from address" shown to users is meaningless — it's either 0 or 999.  
**Impact:** Users in unmatched cities see "999 mi away" with no actual geo-distance. Users in matched cities always see 0 mi.  
**Fix:** Implement haversine distance calculation using lat/lng to find the nearest city, or remove the distance display entirely.

### BUG-2: No comparison feature exists (MEDIUM)
**Description:** The task asks to test comparison — there is no comparison feature implemented anywhere in the codebase. No compare buttons, no multi-select, no side-by-side view.  
**Fix:** Implement material comparison (checkbox on MaterialCards → side-by-side view) if this is a desired feature.

### BUG-3: Only 3 materials per city in dataset (MEDIUM)
**Description:** The data file has 6 material types defined (asphalt_shingle, metal, designer_shingle, clay_terra_cotta, concrete, cedar_shingle) but **zero cities have more than 3 materials**. Every city only has asphalt, metal, and designer shingle.  
**Fix:** Scrape/source pricing data for clay, concrete, and cedar materials. The code handles any number of materials correctly — the data is incomplete.

### BUG-4: City fallback picks first city alphabetically instead of geographically nearest (MEDIUM)
**File:** `lib/pricing-data.ts` line ~75, `app/api/estimate/route.ts`  
**Description:** When a city isn't found in the state, it falls back to the first city in the state list (alphabetically). When no state match, it picks `all[0]` (the very first city in the dataset). Should use geo-nearest.  
**Fix:** Accept lat/lng in `findCityByName`, compute haversine distance to all cities, return nearest.

### BUG-5: Share button SSR hydration risk (LOW)
**File:** `app/components/ExportButton.tsx`  
**Description:** `typeof navigator !== 'undefined' && 'share' in navigator` is checked at render time. Since this is a `'use client'` component, it renders on server first where `navigator` is undefined, then hydrates. The conditional will work but could cause hydration mismatch.  
**Fix:** Use `useEffect` + state to detect `navigator.share` availability after mount.

### BUG-6: In-memory cache won't work on Vercel serverless (LOW)
**File:** `app/api/roof-measure/route.ts`  
**Description:** `const CACHE = new Map()` is in-memory. On Vercel serverless, each invocation may be a cold start with empty cache. Cache hit rate will be near zero.  
**Impact:** Low — Solar API calls aren't rate-limited aggressively, just slightly wasteful.  
**Fix:** Use Vercel KV, Upstash Redis, or Next.js `unstable_cache` for persistent caching.

### BUG-7: `findCityByName` returns null → no estimates shown (LOW)
**File:** `app/api/estimate/route.ts`  
**Description:** If `findCityByName` returns null AND `getAllCities()` is empty (impossible with current data but defensive coding), `matchedCity` would be undefined causing a crash.  
**Fix:** Add null check before `calculateEstimate`.

### BUG-8: Labor cost calculated on original sqft, not adjusted sqft (LOW)
**File:** `lib/calculations.ts`  
**Description:** Material cost uses `adjustedSqft` (with waste factor) but labor uses `roofSqft` (original). This is arguably correct (laborers work the actual roof, waste is material only) but should be documented/intentional.  
**Fix:** Add a code comment clarifying this is intentional, or change to `adjustedSqft` if labor should also account for waste.

---

## 📊 Summary

| Severity | Count |
|----------|-------|
| Critical | 0 |
| High | 1 |
| Medium | 3 |
| Low | 4 |
| Passed | 15 |

**Overall:** Solid, well-structured app. Clean code, good error handling, proper security. The main issues are: fake distance calculation (BUG-1), missing comparison feature (BUG-2), and incomplete material data (BUG-3). No critical bugs.
