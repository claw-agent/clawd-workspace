# Bjorn's Brew — Expert UX Focus Group Report
**Date:** January 24, 2026  
**Site:** https://site-omega-gilt-81.vercel.app/  
**Evaluators:** 5 UX/Design/Engineering professionals

---

## Executive Summary

| Expert | Role | Overall Score |
|--------|------|---------------|
| Rachel | Sr. Product Designer | 64% (45/70) |
| Marcus | Sr. Frontend Engineer | 7.6/10 |
| Priya | UX Researcher | 7/10 |
| James | Brand Strategist | 8/10 avg |
| Nina | CRO Specialist | 5.4/10 |

**Average: 6.8/10** — Solid foundation with critical gaps in conversion and error handling.

---

## 🚨 Critical Issues (Fix Immediately)

### 1. "Order Online" Button is BROKEN
**Found by:** Rachel (Designer)  
**Severity:** 🔴 Critical  
**Issue:** Links to `order.bjornsbrew.com` which doesn't exist. Primary revenue action is dead.  
**Fix:** Either link to a real ordering system (Toast, Square, etc.) or remove the button.

### 2. Primary CTA Should Be "Order Online", Not "Find Location"
**Found by:** Nina (CRO)  
**Severity:** 🟠 High  
**Issue:** "Find a Location" is passive. Drive-thru users on phones need "Order Online" as the dominant hero CTA.  
**Fix:** Swap button hierarchy — Order Online as primary (bigger, brighter), Find Location as secondary.

### 3. No Milk Alternative Information
**Found by:** Priya (UX Researcher)  
**Severity:** 🟠 High  
**Issue:** Users searching for "oat milk latte" find nothing. Health-conscious SLC crowd will bounce.  
**Fix:** Add dietary filters, "available with oat/almond/soy" note, or milk substitute section.

---

## ⚠️ High Priority Issues

### 4. Green CTAs Don't Pop
**Found by:** Rachel  
**Issue:** Green buttons blend with green accent color throughout the site.  
**Fix:** Use higher contrast (darker green, or different color entirely for primary CTAs).

### 5. No Form Validation Feedback
**Found by:** Marcus (Engineer), Rachel  
**Issue:** Forms rely on HTML5 defaults only. No custom error styling, no success toasts.  
**Fix:** Add visible validation states, success/error messages after submission.

### 6. Zero Urgency/Scarcity Messaging
**Found by:** Nina  
**Issue:** No seasonal specials, limited-time drinks, or time-based offers.  
**Fix:** Add "Try our Winter Spiced Mocha — available through February" or similar.

### 7. Micro-interactions Weak (5/10)
**Found by:** Rachel  
**Issue:** Hover states unclear, FAQ accordions lack animation feedback.  
**Fix:** Add visible hover state transitions, accordion animations.

---

## 📋 Medium Priority

| Issue | Found By | Recommendation |
|-------|----------|----------------|
| Testimonials too generic | James, Nina | Use specific quotes: "I drive 20 min past 3 Starbucks for their oat latte" |
| Duplicate newsletter signup | Rachel, James | Remove one instance (footer OR section, not both) |
| No catering page | Priya | Add dedicated catering page with packages/pricing |
| Accessibility gaps | Rachel | Improve green/cream contrast, add focus states, social icon touch targets |
| Error states (5/10) | Marcus | Add 404 page, custom form error styling |
| Photography weakest link (6/10) | James | Replace stock with real Bjorn photos, actual shop interiors |
| Contact nav intermittent bug | Marcus | Investigate click handler issue |

---

## ✅ What's Working Well

| Area | Score | Notes |
|------|-------|-------|
| **Brand Consistency** | 9/10 | Exceptional unity across all pages |
| **Tone of Voice** | 9/10 | Warm, human, earned by the story |
| **Navigation** | 9/10 | Clean desktop nav, mobile hamburger works great |
| **Interactive Elements** | 9/10 | Proper button states, carousel accessible |
| **Page Load** | 8/10 | Next.js routing is snappy, no jank |
| **Location Finding** | 10/10 | 0 clicks from homepage, directions immediate |
| **Differentiation** | 8/10 | Dog + charity is memorable and legitimate |
| **Emotional Resonance** | 8/10 | Bjorn origin story lands authentically |

---

## Task-Based Testing Results (Priya)

| Task | Clicks | Score | Issue |
|------|--------|-------|-------|
| Find nearest location | 0-1 | 10/10 | ✅ Perfect |
| Find oat milk options | 1 | 4/10 | ❌ Major friction |
| Learn about charity | 1 | 9/10 | ✅ Clear |
| Contact about catering | 1-2 | 7/10 | ⚠️ No detail/pricing |

---

## Conversion Analysis (Nina)

| Factor | Score | Quick Win |
|--------|-------|-----------|
| Above the fold | 7/10 | Add coffee product imagery |
| Primary CTA | 5/10 | Make "Order Online" dominant |
| Social proof | 7/10 | More specific testimonials |
| Urgency/scarcity | 2/10 | Add seasonal/limited offers |
| Form friction | 8/10 | Add signup incentive (10% off) |
| Mobile conversion | 6/10 | Order Online needs thumb reach |
| Exit intent | 3/10 | Add exit popup with charity angle |

---

## Recommended Fix Priority

### Immediate (Before any promotion)
1. ✅ Fix or remove "Order Online" broken link
2. 🔄 Swap CTA hierarchy (Order Online > Find Location)
3. 📝 Add milk alternatives info to menu

### This Week
4. 🎨 Increase CTA button contrast
5. ✅ Add form validation feedback
6. ⏰ Add seasonal/urgency messaging
7. 🐛 Fix Contact nav click bug

### Next Sprint
8. 📸 Replace stock photos with real imagery
9. 📄 Create dedicated catering page
10. ♿ Accessibility audit and fixes
11. 💬 Rewrite testimonials with specific details

---

## Expert Quotes

> "Functional but forgettable. Needs personality and polish to compete." — Rachel, Sr. Designer

> "Solid, production-ready site with polished responsive design." — Marcus, Sr. Engineer

> "This is a brand people would talk about." — James, Brand Strategist

> "Strong brand story, weak conversion mechanics." — Nina, CRO Specialist

> "Top friction point: Milk alternatives completely hidden." — Priya, UX Researcher

---

*Report compiled from live site testing on January 24, 2026*
