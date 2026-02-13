# Security Review — XPERIENCE Roofing Estimator

**Date:** 2026-02-13  
**Reviewer:** Automated (Claude)  
**Source:** `~/clawd/projects/xperience-pricing-tool/`  
**Deployed:** https://xperience-pricing-tool.vercel.app

---

## Findings

### 1. 🟢 LOW — API Key Properly Server-Side Only

The Google Solar/Geocoding API key is stored in `.env.local` (git-ignored via `.env*` pattern in `.gitignore`) and accessed only in `app/api/roof-measure/route.ts` via `process.env.GOOGLE_SOLAR_API_KEY`. No `NEXT_PUBLIC_` prefix, no client-side exposure. Git history shows no commits of `.env*` files.

**Status:** ✅ Good

---

### 2. 🟡 MEDIUM — No Rate Limiting on Solar API Proxy

`/api/roof-measure` proxies requests to Google Geocoding + Solar APIs with no rate limiting. An attacker could:
- Exhaust the Google API quota (costs money)
- Use the endpoint as an open geocoding proxy

The in-memory cache (7-day TTL) helps for repeated addresses but doesn't prevent abuse with unique addresses.

**Recommendation:** Add rate limiting via Vercel Edge middleware, `next-rate-limit`, or an IP-based limiter (e.g., sliding window of 10 req/min per IP). At minimum, add `Referer`/`Origin` checking.

---

### 3. 🟡 MEDIUM — No CORS or Security Headers Configured

`next.config.ts` is empty — no custom headers. Missing:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Strict-Transport-Security` (Vercel adds this, but explicit is better)
- `Content-Security-Policy`
- No CORS restriction on API routes — any origin can call `/api/roof-measure`

**Recommendation:** Add a `headers()` block in `next.config.ts` with security headers. Add CORS origin checking to API routes (at least `/api/roof-measure`).

---

### 4. 🟢 LOW — Minimal Input Validation on Address

`/api/roof-measure` checks `address` exists and is a string, which is adequate since it's passed to Google's Geocoding API (which handles sanitization). However, no length limit is enforced.

**Recommendation:** Add `address.length < 500` check to prevent abuse with extremely long strings.

---

### 5. 🟢 LOW — Full Pricing Data Exposed via /api/cities

`/api/cities` returns all city pricing data including all material costs. This is needed for the UI but exposes the full pricing model.

**Recommendation:** Acceptable for current use case. If pricing is sensitive, consider returning only material names client-side and computing estimates server-side only.

---

### 6. 🟢 INFO — No NEXT_PUBLIC_ Variables Used

No `NEXT_PUBLIC_` environment variables found anywhere in the codebase. All env vars are server-only. ✅

---

### 7. 🟢 INFO — npm audit Clean

```
found 0 vulnerabilities
```

---

### 8. 🟡 MEDIUM — In-Memory Cache Won't Persist Across Serverless Invocations

The `Map` cache in `roof-measure/route.ts` resets on every cold start in Vercel's serverless environment, making it ineffective for rate limiting or cost reduction at scale.

**Recommendation:** If caching matters, use Vercel KV or an external store. For rate limiting, use edge middleware with Vercel's `@vercel/kv`.

---

### 9. 🟢 LOW — Estimate Route Missing Type Validation

`/api/estimate` destructures `req.json()` without validating types (e.g., `roofSqft` could be a string or negative). Only checks for presence.

**Recommendation:** Add `typeof roofSqft === 'number' && roofSqft > 0 && roofSqft < 100000` style guards.

---

### 10. 🟢 LOW — City Search Has No Query Length Limit

`/api/city-search?q=...` passes the query directly to `searchCities()` with no length limit.

**Recommendation:** Truncate `q` to a reasonable length (e.g., 100 chars).

---

## Summary

| Severity | Count |
|----------|-------|
| Critical | 0 |
| High     | 0 |
| Medium   | 3 (#2, #3, #8) |
| Low      | 4 (#1, #4, #9, #10) |
| Info     | 2 (#6, #7) |

**Overall:** No critical issues. The API key is properly protected. The main gaps are rate limiting on the Solar API proxy and missing security headers — both standard hardening for a production deployment.
