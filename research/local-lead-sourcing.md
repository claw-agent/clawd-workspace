# Local Lead Sourcing: Finding Businesses with Bad Websites

**Goal:** Build an automated system to identify local businesses in Salt Lake City (SLC) that have terrible websites but are otherwise thriving businesses — ideal prospects for web design/development services.

---

## Table of Contents
1. [Data Sources for Local Businesses](#1-data-sources-for-local-businesses)
2. [Website Quality Scoring Methods](#2-website-quality-scoring-methods)
3. [Tools & APIs Reference](#3-tools--apis-reference)
4. [Filtering Criteria](#4-filtering-criteria)
5. [System Architecture](#5-system-architecture)
6. [Implementation Code](#6-implementation-code)
7. [Cost Analysis](#7-cost-analysis)
8. [Deployment Guide](#8-deployment-guide)

---

## 1. Data Sources for Local Businesses

### Google Places API (Primary — Recommended)
**Best for:** Comprehensive business data, high accuracy, includes website URLs

```bash
# Base URL
https://places.googleapis.com/v1/places:searchText

# Pricing: $32 per 1,000 requests (Text Search)
# Free tier: $200/month credit (~6,250 searches/month)
```

**Endpoints:**
- `/places:searchText` — Search by keyword + location
- `/places:searchNearby` — Search within radius
- `/places/{place_id}` — Get full business details

**Sample Request:**
```javascript
const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': process.env.GOOGLE_PLACES_API_KEY,
    'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.websiteUri,places.rating,places.userRatingCount,places.types,places.businessStatus,places.nationalPhoneNumber'
  },
  body: JSON.stringify({
    textQuery: 'restaurants in Salt Lake City, UT',
    locationBias: {
      circle: {
        center: { latitude: 40.7608, longitude: -111.8910 },
        radius: 50000.0  // 50km
      }
    },
    maxResultCount: 20
  })
});
```

**Response includes:**
- `websiteUri` — The business website (critical!)
- `rating` / `userRatingCount` — Indicates business health
- `businessStatus` — Filter out closed businesses
- `types` — Business category

---

### Yelp Places API (Secondary)
**Best for:** Review data, business health indicators, alternative to Google

```bash
# Base URL
https://api.yelp.com/v3/businesses/search

# Pricing: Free tier = 500 calls/day
# Paid plans start at $99/month
```

**Sample Request:**
```javascript
const response = await fetch(
  'https://api.yelp.com/v3/businesses/search?' + new URLSearchParams({
    location: 'Salt Lake City, UT',
    categories: 'restaurants,contractors,lawyers,dentists',
    limit: 50,
    sort_by: 'rating'
  }),
  {
    headers: {
      'Authorization': `Bearer ${process.env.YELP_API_KEY}`
    }
  }
);
```

**Key Data Points:**
- `url` — Yelp page (can extract website from there)
- `rating` / `review_count` — Business health
- `price` — Revenue indicator ($$$$ = higher budget)
- `is_closed` — Filter out closed businesses

---

### Other Data Sources

| Source | Best For | Access Method | Notes |
|--------|----------|---------------|-------|
| **SLC Chamber of Commerce** | Local established businesses | Manual scrape or API inquiry | slchamber.com/directory |
| **Yellow Pages** | Older businesses (often bad sites) | Scraping (yellowpages.com) | Rate limit carefully |
| **BBB** | Established, reputable businesses | bbb.org/search | Good trust indicator |
| **Industry Directories** | Niche targeting | Varies | HomeAdvisor, Avvo, Healthgrades |
| **Utah.gov Business Registry** | Verify active businesses | business.utah.gov | Confirm legitimacy |

---

## 2. Website Quality Scoring Methods

### Core Metrics to Evaluate

| Metric | Tool | Weight | Bad Score Threshold |
|--------|------|--------|---------------------|
| **Performance Score** | Lighthouse/PageSpeed | 25% | < 50 |
| **Mobile Responsiveness** | Lighthouse | 20% | Fails mobile-friendly |
| **SSL/HTTPS** | Direct check | 15% | No HTTPS |
| **Core Web Vitals** | PageSpeed API | 15% | Any "Poor" rating |
| **Tech Stack Age** | BuiltWith/Wappalyzer | 10% | Old CMS versions |
| **Broken Links** | Custom crawler | 10% | > 5% broken |
| **Last Updated** | Archive.org/meta tags | 5% | > 2 years |

### Scoring Formula

```javascript
function calculateOpportunityScore(business, siteMetrics) {
  // Business health (0-100)
  const businessHealth = (
    (business.rating / 5 * 40) +                    // Rating weight
    (Math.min(business.reviewCount / 100, 1) * 30) + // Review count
    (business.priceLevel * 10) +                     // Revenue indicator
    (business.yearsInBusiness > 5 ? 20 : 10)        // Establishment
  );
  
  // Website badness (0-100, higher = worse site = better opportunity)
  const siteBadness = (
    (100 - siteMetrics.performanceScore) * 0.25 +
    (siteMetrics.mobileFailures * 20) * 0.20 +
    (!siteMetrics.hasHttps ? 15 : 0) +
    (siteMetrics.poorCoreWebVitals * 5) * 0.15 +
    (siteMetrics.outdatedTech ? 10 : 0) +
    (siteMetrics.brokenLinkPercent * 100) * 0.10 +
    (siteMetrics.yearsSinceUpdate > 2 ? 5 : 0)
  );
  
  // Opportunity = good business + bad website
  return (businessHealth * 0.5) + (siteBadness * 0.5);
}
```

---

## 3. Tools & APIs Reference

### Google PageSpeed Insights API (FREE — Primary)
**Cost:** Free with API key (no quota limits, but rate limited)

```bash
# Endpoint
GET https://www.googleapis.com/pagespeedonline/v5/runPagespeed

# Parameters
?url=https://example.com
&strategy=mobile  # or 'desktop'
&category=performance
&category=accessibility
&category=seo
&key=YOUR_API_KEY
```

**Sample Implementation:**
```javascript
async function getPageSpeedScore(url) {
  const apiUrl = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
  apiUrl.searchParams.set('url', url);
  apiUrl.searchParams.set('strategy', 'mobile');
  apiUrl.searchParams.set('category', 'performance');
  apiUrl.searchParams.set('category', 'accessibility');
  apiUrl.searchParams.set('category', 'seo');
  // apiUrl.searchParams.set('key', process.env.PAGESPEED_API_KEY); // Optional

  const response = await fetch(apiUrl);
  const data = await response.json();
  
  return {
    performanceScore: data.lighthouseResult?.categories?.performance?.score * 100,
    accessibilityScore: data.lighthouseResult?.categories?.accessibility?.score * 100,
    seoScore: data.lighthouseResult?.categories?.seo?.score * 100,
    
    // Core Web Vitals
    lcp: data.lighthouseResult?.audits?.['largest-contentful-paint']?.numericValue,
    fid: data.loadingExperience?.metrics?.FIRST_INPUT_DELAY_MS?.percentile,
    cls: data.lighthouseResult?.audits?.['cumulative-layout-shift']?.numericValue,
    
    // Specific issues
    issues: data.lighthouseResult?.audits
  };
}
```

---

### GTmetrix API
**Cost:** Free tier = 5 credits/day, Pro starts at $15/month

```javascript
async function runGTmetrixTest(url) {
  // Start test
  const testResponse = await fetch('https://gtmetrix.com/api/2.0/tests', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(process.env.GTMETRIX_API_KEY + ':').toString('base64')}`,
      'Content-Type': 'application/vnd.api+json'
    },
    body: JSON.stringify({
      data: {
        type: 'test',
        attributes: {
          url: url,
          location: '2',  // Dallas
          browser: '3'    // Chrome Desktop
        }
      }
    })
  });
  
  const { data } = await testResponse.json();
  const testId = data.id;
  
  // Poll for results (typically 30-60 seconds)
  // ... polling logic ...
  
  return results;
}
```

---

### BuiltWith API (Tech Stack Detection)
**Cost:** Free tier available, Pro from $295/month

```javascript
async function getTechStack(domain) {
  const response = await fetch(
    `https://api.builtwith.com/free1/api.json?KEY=${process.env.BUILTWITH_KEY}&LOOKUP=${domain}`
  );
  const data = await response.json();
  
  // Look for outdated indicators
  const redFlags = [];
  const technologies = data.Results?.[0]?.Result?.Paths?.[0]?.Technologies || [];
  
  technologies.forEach(tech => {
    // Flag old CMS versions
    if (tech.Name.includes('WordPress') && tech.Tag?.includes('4.')) {
      redFlags.push('Outdated WordPress');
    }
    if (tech.Name === 'jQuery' && parseFloat(tech.Tag) < 3) {
      redFlags.push('Old jQuery version');
    }
    if (tech.Name === 'Flash') {
      redFlags.push('Uses Flash (extinct)');
    }
    if (tech.Name === 'FrontPage') {
      redFlags.push('FrontPage (ancient)');
    }
  });
  
  return { technologies, redFlags, isOutdated: redFlags.length > 0 };
}
```

---

### Wappalyzer API
**Cost:** Free tier = 50 lookups/month, from $99/month

```javascript
async function wappalyzerLookup(url) {
  const response = await fetch(
    `https://api.wappalyzer.com/v2/lookup/?urls=${encodeURIComponent(url)}`,
    {
      headers: {
        'x-api-key': process.env.WAPPALYZER_API_KEY
      }
    }
  );
  return response.json();
}
```

---

### SSL/HTTPS Check (Free - No API needed)
```javascript
async function checkSSL(domain) {
  try {
    // Try HTTPS
    const httpsResponse = await fetch(`https://${domain}`, { 
      method: 'HEAD',
      redirect: 'manual'
    });
    
    return {
      hasHttps: true,
      redirectsToHttps: httpsResponse.status < 400,
      sslValid: true
    };
  } catch (error) {
    // Try HTTP and check if it redirects
    try {
      const httpResponse = await fetch(`http://${domain}`, {
        method: 'HEAD',
        redirect: 'manual'
      });
      
      const redirectsToHttps = httpResponse.headers.get('location')?.startsWith('https');
      
      return {
        hasHttps: false,
        redirectsToHttps,
        sslValid: false
      };
    } catch {
      return { hasHttps: false, redirectsToHttps: false, sslValid: false, error: true };
    }
  }
}
```

---

### Broken Link Checker (Custom)
```javascript
async function checkBrokenLinks(url, maxLinks = 50) {
  const response = await fetch(url);
  const html = await response.text();
  
  // Extract links
  const linkRegex = /href=["']([^"']+)["']/g;
  const links = [];
  let match;
  while ((match = linkRegex.exec(html)) !== null && links.length < maxLinks) {
    const link = match[1];
    if (link.startsWith('http') || link.startsWith('/')) {
      links.push(link.startsWith('/') ? new URL(link, url).href : link);
    }
  }
  
  // Check each link
  const results = await Promise.allSettled(
    links.map(async (link) => {
      try {
        const res = await fetch(link, { method: 'HEAD', timeout: 5000 });
        return { link, status: res.status, broken: res.status >= 400 };
      } catch {
        return { link, status: 0, broken: true };
      }
    })
  );
  
  const brokenLinks = results
    .filter(r => r.status === 'fulfilled' && r.value.broken)
    .map(r => r.value);
  
  return {
    totalChecked: links.length,
    brokenCount: brokenLinks.length,
    brokenPercent: (brokenLinks.length / links.length) * 100,
    brokenLinks
  };
}
```

---

### Wayback Machine (Last Updated Check)
```javascript
async function checkLastUpdated(domain) {
  // Check Wayback Machine for historical snapshots
  const response = await fetch(
    `https://archive.org/wayback/available?url=${domain}`
  );
  const data = await response.json();
  
  const lastSnapshot = data.archived_snapshots?.closest?.timestamp;
  
  // Also try to get meta tags from the page
  const pageResponse = await fetch(`https://${domain}`);
  const html = await pageResponse.text();
  
  // Look for last-modified header or meta tags
  const lastModified = pageResponse.headers.get('last-modified');
  const copyrightMatch = html.match(/©\s*(\d{4})/);
  const copyrightYear = copyrightMatch ? parseInt(copyrightMatch[1]) : null;
  
  return {
    lastWaybackSnapshot: lastSnapshot,
    lastModifiedHeader: lastModified,
    copyrightYear,
    probablyOutdated: copyrightYear && copyrightYear < new Date().getFullYear() - 2
  };
}
```

---

## 4. Filtering Criteria

### Target Industries (High ROI from Good Websites)

| Industry | Why They Need Good Websites | Budget Potential |
|----------|----------------------------|------------------|
| **Restaurants** | Online ordering, reservations, menus | $$ |
| **Contractors** (HVAC, Plumbing, Electric) | Local SEO critical, quote requests | $$$ |
| **Lawyers** | Trust signals, lead generation | $$$$ |
| **Realtors** | Property listings, IDX integration | $$$ |
| **Dentists/Medical** | Patient scheduling, trust | $$$$ |
| **Auto Repair** | Appointment booking, reviews | $$ |
| **Salons/Spas** | Booking systems, portfolios | $$ |
| **Home Services** | Lead gen, service areas | $$$ |

### Business Health Filters

```javascript
const businessFilters = {
  // Minimum thresholds
  minRating: 3.5,           // Don't pitch failing businesses
  minReviewCount: 10,       // Established enough
  maxReviewCount: 500,      // Not too big (enterprise)
  
  // Activity indicators
  mustBeOpen: true,         // businessStatus === 'OPERATIONAL'
  recentReview: 180,        // Days since last review
  
  // Price level (revenue indicator)
  minPriceLevel: 1,         // At least $ (not free/cheap)
  
  // Exclude
  excludeChains: true,      // Corporate HQ decides, not local
  excludeFranchises: ['McDonald', 'Subway', 'Starbucks', ...]
};
```

### Website Quality Filters

```javascript
const websiteFilters = {
  // Must have a website to pitch
  hasWebsite: true,
  
  // Target score ranges (bad enough to pitch, but not broken)
  performanceScore: { max: 60 },     // Bad but functional
  mobileScore: { max: 70 },          // Poor mobile experience
  
  // Red flags we want
  wantedIssues: [
    'no-https',
    'outdated-cms',
    'not-mobile-friendly',
    'slow-load-time',
    'no-meta-descriptions',
    'broken-links'
  ],
  
  // Avoid (too broken or special cases)
  excludeIf: [
    'site-down',              // Can't evaluate
    'parked-domain',          // No real site
    'facebook-only',          // Social-only presence
    'wix-premium',            // Already paying for builder
    'shopify'                 // Already on modern platform
  ]
};
```

---

## 5. System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        LEAD SOURCING PIPELINE                          │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
    ┌───────────────────────────────┼───────────────────────────────┐
    │                               │                               │
    ▼                               ▼                               ▼
┌─────────┐                   ┌─────────┐                     ┌─────────┐
│ Google  │                   │  Yelp   │                     │ Local   │
│ Places  │                   │  API    │                     │ Dirs    │
│  API    │                   │         │                     │         │
└────┬────┘                   └────┬────┘                     └────┬────┘
     │                             │                               │
     └──────────────┬──────────────┴───────────────────────────────┘
                    │
                    ▼
        ┌───────────────────────┐
        │   Business Normalizer  │  ← Dedupe, standardize, merge sources
        │   & Deduplicator       │
        └───────────┬───────────┘
                    │
                    ▼
        ┌───────────────────────┐
        │   Business Filter      │  ← Apply rating/review/industry filters
        │   (Health Check)       │
        └───────────┬───────────┘
                    │
                    ▼
        ┌───────────────────────┐
        │   Website Extractor    │  ← Get website URLs
        │   & Validator          │
        └───────────┬───────────┘
                    │
    ┌───────────────┼───────────────┬───────────────┐
    │               │               │               │
    ▼               ▼               ▼               ▼
┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐
│PageSpeed│   │BuiltWith│   │  SSL    │   │ Broken  │
│  API    │   │   API   │   │ Check   │   │ Links   │
└────┬────┘   └────┬────┘   └────┬────┘   └────┬────┘
     │             │             │             │
     └─────────────┴──────┬──────┴─────────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │   Quality Scorer      │  ← Calculate opportunity score
              │   & Ranker            │
              └───────────┬───────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │   Prospect Database   │  ← SQLite/PostgreSQL
              │   (with history)      │
              └───────────┬───────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │   Export / Dashboard  │  ← CSV, Airtable, CRM
              └───────────────────────┘
```

### Database Schema

```sql
-- Businesses table
CREATE TABLE businesses (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  phone TEXT,
  website TEXT,
  
  -- Source tracking
  google_place_id TEXT,
  yelp_id TEXT,
  
  -- Health metrics
  rating REAL,
  review_count INTEGER,
  price_level INTEGER,
  is_open BOOLEAN,
  
  -- Categorization
  industry TEXT,
  categories TEXT,  -- JSON array
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Website audits table
CREATE TABLE website_audits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  business_id TEXT REFERENCES businesses(id),
  website TEXT NOT NULL,
  
  -- Lighthouse scores
  performance_score INTEGER,
  accessibility_score INTEGER,
  seo_score INTEGER,
  
  -- Core Web Vitals
  lcp_ms INTEGER,
  fid_ms INTEGER,
  cls REAL,
  
  -- Security
  has_https BOOLEAN,
  ssl_valid BOOLEAN,
  
  -- Tech stack
  cms TEXT,
  tech_stack TEXT,  -- JSON
  is_outdated BOOLEAN,
  
  -- Content quality
  broken_link_count INTEGER,
  broken_link_percent REAL,
  
  -- Overall
  opportunity_score REAL,
  
  audited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Prospects view
CREATE VIEW prospects AS
SELECT 
  b.*,
  wa.performance_score,
  wa.has_https,
  wa.is_outdated,
  wa.opportunity_score,
  wa.audited_at
FROM businesses b
JOIN website_audits wa ON wa.business_id = b.id
WHERE b.website IS NOT NULL
  AND b.is_open = true
  AND b.rating >= 3.5
  AND wa.opportunity_score >= 50
ORDER BY wa.opportunity_score DESC;
```

---

## 6. Implementation Code

### Full Pipeline Script (Node.js)

```javascript
// lead-sourcer.js
import { setTimeout } from 'timers/promises';

const config = {
  location: 'Salt Lake City, UT',
  coordinates: { lat: 40.7608, lng: -111.8910 },
  radius: 50000, // 50km
  
  industries: [
    'restaurant', 'plumber', 'electrician', 'hvac', 
    'lawyer', 'dentist', 'realtor', 'auto repair',
    'salon', 'spa', 'contractor'
  ],
  
  rateLimit: {
    googlePlaces: 1000,  // ms between requests
    pageSpeed: 2000,     // generous to avoid throttling
    builtwith: 1000
  }
};

// ============ DATA FETCHING ============

async function fetchBusinessesFromGoogle(industry) {
  const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': process.env.GOOGLE_PLACES_API_KEY,
      'X-Goog-FieldMask': [
        'places.id', 'places.displayName', 'places.formattedAddress',
        'places.websiteUri', 'places.rating', 'places.userRatingCount',
        'places.types', 'places.businessStatus', 'places.nationalPhoneNumber',
        'places.priceLevel'
      ].join(',')
    },
    body: JSON.stringify({
      textQuery: `${industry} in ${config.location}`,
      locationBias: {
        circle: {
          center: config.coordinates,
          radius: config.radius
        }
      },
      maxResultCount: 20
    })
  });
  
  const data = await response.json();
  return data.places || [];
}

async function getAllBusinesses() {
  const allBusinesses = [];
  
  for (const industry of config.industries) {
    console.log(`Fetching ${industry}...`);
    const businesses = await fetchBusinessesFromGoogle(industry);
    
    for (const biz of businesses) {
      allBusinesses.push({
        id: biz.id,
        name: biz.displayName?.text,
        address: biz.formattedAddress,
        website: biz.websiteUri,
        phone: biz.nationalPhoneNumber,
        rating: biz.rating,
        reviewCount: biz.userRatingCount,
        priceLevel: biz.priceLevel,
        isOpen: biz.businessStatus === 'OPERATIONAL',
        industry,
        types: biz.types
      });
    }
    
    await setTimeout(config.rateLimit.googlePlaces);
  }
  
  // Dedupe by website
  const seen = new Set();
  return allBusinesses.filter(biz => {
    if (!biz.website || seen.has(biz.website)) return false;
    seen.add(biz.website);
    return true;
  });
}

// ============ WEBSITE AUDITING ============

async function auditWebsite(url) {
  const results = {
    url,
    performance: null,
    accessibility: null,
    seo: null,
    hasHttps: null,
    techStack: null,
    isOutdated: false,
    brokenLinks: null
  };
  
  try {
    // 1. PageSpeed Insights
    const psUrl = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
    psUrl.searchParams.set('url', url);
    psUrl.searchParams.set('strategy', 'mobile');
    psUrl.searchParams.set('category', 'performance');
    psUrl.searchParams.set('category', 'accessibility');
    psUrl.searchParams.set('category', 'seo');
    
    const psResponse = await fetch(psUrl);
    const psData = await psResponse.json();
    
    if (psData.lighthouseResult) {
      results.performance = Math.round((psData.lighthouseResult.categories?.performance?.score || 0) * 100);
      results.accessibility = Math.round((psData.lighthouseResult.categories?.accessibility?.score || 0) * 100);
      results.seo = Math.round((psData.lighthouseResult.categories?.seo?.score || 0) * 100);
      
      // Core Web Vitals
      results.lcp = psData.lighthouseResult.audits?.['largest-contentful-paint']?.numericValue;
      results.cls = psData.lighthouseResult.audits?.['cumulative-layout-shift']?.numericValue;
      results.tbt = psData.lighthouseResult.audits?.['total-blocking-time']?.numericValue;
    }
    
    await setTimeout(config.rateLimit.pageSpeed);
    
    // 2. SSL Check
    const domain = new URL(url).hostname;
    results.hasHttps = url.startsWith('https://');
    
    // 3. Basic tech detection (from HTML)
    const pageResponse = await fetch(url, { timeout: 10000 });
    const html = await pageResponse.text();
    
    results.techStack = detectTechFromHtml(html);
    results.isOutdated = results.techStack.some(t => 
      t.includes('WordPress 4') || 
      t.includes('jQuery 1') || 
      t.includes('Bootstrap 2')
    );
    
  } catch (error) {
    results.error = error.message;
  }
  
  return results;
}

function detectTechFromHtml(html) {
  const tech = [];
  
  if (html.includes('wp-content') || html.includes('wordpress')) tech.push('WordPress');
  if (html.includes('Wix.com')) tech.push('Wix');
  if (html.includes('Squarespace')) tech.push('Squarespace');
  if (html.includes('shopify')) tech.push('Shopify');
  if (html.includes('jquery')) {
    const match = html.match(/jquery[.-]?(\d+\.\d+)/i);
    tech.push(match ? `jQuery ${match[1]}` : 'jQuery');
  }
  if (html.includes('bootstrap')) {
    const match = html.match(/bootstrap[.-]?(\d+)/i);
    tech.push(match ? `Bootstrap ${match[1]}` : 'Bootstrap');
  }
  
  return tech;
}

// ============ SCORING ============

function calculateOpportunityScore(business, audit) {
  if (!audit || audit.error) return 0;
  
  // Business health (0-50)
  let businessScore = 0;
  businessScore += Math.min((business.rating || 0) / 5 * 20, 20);
  businessScore += Math.min((business.reviewCount || 0) / 100 * 15, 15);
  businessScore += (business.priceLevel || 1) * 5;
  businessScore += business.isOpen ? 5 : 0;
  
  // Website badness (0-50)
  let siteScore = 0;
  siteScore += Math.max(0, (100 - (audit.performance || 100)) * 0.2);
  siteScore += Math.max(0, (100 - (audit.accessibility || 100)) * 0.1);
  siteScore += Math.max(0, (100 - (audit.seo || 100)) * 0.1);
  siteScore += audit.hasHttps === false ? 10 : 0;
  siteScore += audit.isOutdated ? 10 : 0;
  
  return Math.round(businessScore + siteScore);
}

// ============ MAIN PIPELINE ============

async function runPipeline() {
  console.log('🔍 Starting lead sourcing pipeline...\n');
  
  // Step 1: Fetch businesses
  console.log('📊 Step 1: Fetching businesses from Google Places...');
  const businesses = await getAllBusinesses();
  console.log(`Found ${businesses.length} unique businesses with websites\n`);
  
  // Step 2: Filter by health
  console.log('🏥 Step 2: Filtering by business health...');
  const healthyBusinesses = businesses.filter(biz => 
    biz.isOpen &&
    biz.rating >= 3.5 &&
    biz.reviewCount >= 10 &&
    biz.website
  );
  console.log(`${healthyBusinesses.length} businesses pass health check\n`);
  
  // Step 3: Audit websites
  console.log('🔬 Step 3: Auditing websites...');
  const prospects = [];
  
  for (let i = 0; i < healthyBusinesses.length; i++) {
    const biz = healthyBusinesses[i];
    console.log(`  [${i + 1}/${healthyBusinesses.length}] Auditing ${biz.name}...`);
    
    const audit = await auditWebsite(biz.website);
    const score = calculateOpportunityScore(biz, audit);
    
    prospects.push({
      ...biz,
      audit,
      opportunityScore: score
    });
  }
  
  // Step 4: Rank and filter
  console.log('\n📈 Step 4: Ranking prospects...');
  const topProspects = prospects
    .filter(p => p.opportunityScore >= 40)
    .sort((a, b) => b.opportunityScore - a.opportunityScore)
    .slice(0, 50);
  
  console.log(`\n✅ Found ${topProspects.length} high-opportunity prospects!\n`);
  
  // Output
  return topProspects;
}

// ============ EXPORT ============

function exportToCSV(prospects) {
  const headers = [
    'Name', 'Industry', 'Website', 'Phone', 'Address',
    'Rating', 'Reviews', 'Performance', 'SSL', 'Opportunity Score'
  ].join(',');
  
  const rows = prospects.map(p => [
    `"${p.name}"`,
    p.industry,
    p.website,
    p.phone || '',
    `"${p.address}"`,
    p.rating,
    p.reviewCount,
    p.audit?.performance || 'N/A',
    p.audit?.hasHttps ? 'Yes' : 'No',
    p.opportunityScore
  ].join(','));
  
  return [headers, ...rows].join('\n');
}

// Run it
runPipeline()
  .then(prospects => {
    const csv = exportToCSV(prospects);
    console.log('\n📋 Top 10 Prospects:');
    prospects.slice(0, 10).forEach((p, i) => {
      console.log(`${i + 1}. ${p.name} (Score: ${p.opportunityScore})`);
      console.log(`   ${p.website}`);
      console.log(`   Performance: ${p.audit?.performance || 'N/A'} | Rating: ${p.rating}⭐ | ${p.reviewCount} reviews`);
    });
    
    // Save CSV
    require('fs').writeFileSync('prospects.csv', csv);
    console.log('\n💾 Saved to prospects.csv');
  })
  .catch(console.error);
```

---

## 7. Cost Analysis

### API Costs (Monthly Estimates)

| API | Free Tier | Paid Tier | Est. Monthly Cost |
|-----|-----------|-----------|-------------------|
| **Google Places** | $200 credit | $32/1000 calls | $0-50 |
| **PageSpeed Insights** | Unlimited* | N/A | $0 |
| **Yelp** | 500/day | $99/mo | $0-99 |
| **BuiltWith** | 5 free/day | $295/mo | $0-295 |
| **Wappalyzer** | 50/mo | $99/mo | $0-99 |
| **GTmetrix** | 5/day | $15/mo | $0-15 |

### Recommended Budget Tiers

**Tier 1: Free/Minimal ($0/month)**
- Google Places (free tier)
- PageSpeed Insights (unlimited)
- Custom SSL/broken link checks
- Manual tech detection from HTML

**Tier 2: Starter ($50-100/month)**
- Google Places (moderate usage)
- Yelp API ($99/mo) OR Wappalyzer ($99/mo)
- Everything from Tier 1

**Tier 3: Professional ($300-500/month)**
- All Tier 2 APIs
- BuiltWith ($295/mo)
- GTmetrix Pro ($15/mo)
- Higher volume capabilities

---

## 8. Deployment Guide

### Quick Start

```bash
# 1. Clone/setup project
mkdir lead-sourcer && cd lead-sourcer
npm init -y
npm install node-fetch dotenv better-sqlite3

# 2. Create .env file
cat > .env << 'EOF'
GOOGLE_PLACES_API_KEY=your_key_here
YELP_API_KEY=your_key_here
# Optional:
BUILTWITH_KEY=your_key_here
WAPPALYZER_KEY=your_key_here
GTMETRIX_KEY=your_key_here
EOF

# 3. Run the pipeline
node lead-sourcer.js
```

### Scheduling (Cron)

```bash
# Run weekly on Sunday at 2 AM
0 2 * * 0 cd /path/to/lead-sourcer && node lead-sourcer.js >> /var/log/lead-sourcer.log 2>&1
```

### Docker Setup

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
CMD ["node", "lead-sourcer.js"]
```

---

## Next Steps

1. **Get API keys:**
   - [Google Cloud Console](https://console.cloud.google.com/apis/credentials) → Enable Places API
   - [Yelp Developers](https://www.yelp.com/developers/v3/manage_app)
   - [PageSpeed](https://developers.google.com/speed/docs/insights/v5/get-started) (optional key)

2. **Start small:**
   - Run for 1-2 industries first
   - Validate results manually
   - Refine scoring weights

3. **Build outreach:**
   - Export to CRM (HubSpot, Pipedrive)
   - Create email templates highlighting specific issues
   - Track conversions to refine targeting

---

*Last updated: January 2026*
