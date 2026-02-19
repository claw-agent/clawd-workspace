# Auto-Generate Sample Websites for Prospects

> **Goal:** Spin up personalized demo websites for prospects automatically — "show don't tell" sales approach.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        PROSPECT SITE GENERATOR                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌────────────┐ │
│  │   TRIGGER    │───▶│   SCRAPER    │───▶│  GENERATOR   │───▶│  DEPLOYER  │ │
│  │              │    │              │    │              │    │            │ │
│  │ /newsite cmd │    │ • Website    │    │ • AI Gen     │    │ • Vercel   │ │
│  │ API webhook  │    │ • GMB Info   │    │ • Templates  │    │ • Netlify  │ │
│  │ Bulk import  │    │ • Social     │    │ • Hybrid     │    │ • CF Pages │ │
│  └──────────────┘    └──────────────┘    └──────────────┘    └────────────┘ │
│         │                   │                   │                   │       │
│         ▼                   ▼                   ▼                   ▼       │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                         DATA STORE                                    │   │
│  │  • Prospect metadata    • Scraped assets    • Generated sites        │   │
│  │  • Brand colors/fonts   • Screenshots       • Preview URLs           │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│         │                                                                    │
│         ▼                                                                    │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                         QA & TESTING                                  │   │
│  │  • Playwright tests     • Lighthouse CI     • Accessibility (axe)   │   │
│  │  • Percy visual diff    • Mobile checks     • Screenshot compare    │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│         │                                                                    │
│         ▼                                                                    │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                         OUTREACH                                      │   │
│  │  • Email with preview link    • Comparison screenshots               │   │
│  │  • Personalized pitch         • Auto-follow-up sequence              │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 1. AI Website Generators

### Tier 1: Best for Automation (API/Programmatic)

| Tool | Best For | API? | Pricing | Output |
|------|----------|------|---------|--------|
| **v0.dev** | React/Next.js components | ✅ (via Vercel) | Free tier + $20/mo Pro | React/Tailwind code |
| **Bolt.new** | Full-stack apps from prompts | ⚠️ Limited | Free tier + $20/mo | WebContainer apps |
| **Lovable** | Complete web apps | ⚠️ Limited | Free tier + paid | React apps |

#### v0.dev (Vercel) ⭐ RECOMMENDED
- **Strengths:** Generates production-ready React/Tailwind code, one-click Vercel deploy, GitHub sync
- **Automation:** Connect via Vercel API, push to GitHub repo, auto-deploy
- **Best for:** Custom, modern, React-based sites
- **Workflow:** Prompt → Code → Push to repo → Vercel auto-deploys
```bash
# Example: Generate via v0, then deploy
vercel deploy --prod ./generated-site
```

#### Bolt.new (StackBlitz)
- **Strengths:** Full apps in browser, WebContainer-based, instant preview
- **Limitations:** Harder to extract code programmatically
- **Best for:** Quick prototypes, showing functionality

#### Lovable.dev
- **Strengths:** End-to-end web app creation
- **Best for:** More complex applications vs. simple landing pages

### Tier 2: Small Business Focused (Less Automatable)

| Tool | Best For | API? | Pricing | Output |
|------|----------|------|---------|--------|
| **Durable.co** | SMB websites | ❌ | $15/mo | Hosted site |
| **Framer AI** | Designer-quality sites | ❌ | $5-20/mo | Framer site |
| **Hostinger AI** | Budget SMB sites | ❌ | $2-3/mo | Hosted site |

#### Durable.co
- **Strengths:** 30-second website generation, 3M+ businesses, built-in CRM/invoicing
- **Limitations:** No API, proprietary hosting only
- **Best for:** Showing prospects what's possible, not for white-label

#### Framer AI
- **Strengths:** Beautiful designs, Wireframer tool, multi-language translate
- **Limitations:** Manual process, no automation API
- **Best for:** High-end design mockups

#### Hostinger AI Builder
- **Strengths:** Cheap ($2/mo), includes hosting, 170+ templates
- **Limitations:** No API, requires Hostinger hosting
- **Best for:** Budget clients who want all-in-one

---

## 2. Template-Based Rapid Deployment

### Industry-Specific Template Sources

| Source | Industries | Tech Stack | License |
|--------|-----------|------------|---------|
| **shadcn/ui** | Any (components) | React/Tailwind | MIT Free |
| **Tailwind UI** | Any (pro templates) | Tailwind | $299 one-time |
| **Cruip** | SaaS, Agency | React/Vue/Tailwind | $79-149 |
| **ThemeForest** | All industries | Various | $20-60/template |
| **Webflow Templates** | All industries | Webflow | $19-129 |

### Recommended Template Strategy

```
/templates
├── /restaurant
│   ├── template-1/          # Modern bistro
│   ├── template-2/          # Fast casual
│   └── template-3/          # Fine dining
├── /contractor
│   ├── plumber/
│   ├── electrician/
│   ├── hvac/
│   └── general/
├── /professional
│   ├── lawyer/
│   ├── accountant/
│   └── consultant/
├── /retail
│   ├── boutique/
│   └── ecommerce/
└── /healthcare
    ├── dental/
    ├── medical/
    └── wellness/
```

### Template Stack Recommendation

**Primary:** shadcn/ui + Tailwind CSS + Next.js
- Free, MIT licensed, beautiful defaults
- Easy to customize programmatically
- Deploys instantly to Vercel

```bash
# Quick setup
npx create-next-app@latest prospect-site --typescript --tailwind
npx shadcn@latest init
npx shadcn@latest add button card input
```

---

## 3. Auto-Personalization Pipeline

### Step-by-Step Pipeline

```
┌─────────────────────────────────────────────────────────────────┐
│                    PERSONALIZATION PIPELINE                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  INPUT: Business name, current URL, industry                    │
│         ↓                                                        │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ 1. SCRAPE CURRENT SITE                                  │    │
│  │    • Logo (favicon, header image)                       │    │
│  │    • Primary colors (CSS extraction)                    │    │
│  │    • Content (headlines, services, about)               │    │
│  │    • Contact info (phone, email, address)               │    │
│  │    • Social links                                       │    │
│  │                                                         │    │
│  │    Tools: Playwright, Cheerio, ColorThief               │    │
│  └─────────────────────────────────────────────────────────┘    │
│         ↓                                                        │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ 2. PULL GOOGLE BUSINESS INFO                            │    │
│  │    • Business hours                                     │    │
│  │    • Reviews (rating, count, sample quotes)             │    │
│  │    • Photos (exterior, interior, products)              │    │
│  │    • Categories/services                                │    │
│  │    • Location data                                      │    │
│  │                                                         │    │
│  │    Tools: Google Places API, SerpAPI, Outscraper        │    │
│  └─────────────────────────────────────────────────────────┘    │
│         ↓                                                        │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ 3. GENERATE BRANDED SITE                                │    │
│  │    • Select industry template                           │    │
│  │    • Apply color scheme                                 │    │
│  │    • Insert logo/images                                 │    │
│  │    • Populate content                                   │    │
│  │    • Add reviews/testimonials                           │    │
│  │    • Generate enhanced copy with AI                     │    │
│  │                                                         │    │
│  │    Tools: v0.dev API, Claude, template engine           │    │
│  └─────────────────────────────────────────────────────────┘    │
│         ↓                                                        │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ 4. DEPLOY TO PREVIEW URL                                │    │
│  │    • Push to GitHub (optional)                          │    │
│  │    • Deploy to Vercel/Netlify/CF                        │    │
│  │    • Generate preview subdomain                         │    │
│  │                                                         │    │
│  │    Example: preview.youragency.com/joes-plumbing        │    │
│  └─────────────────────────────────────────────────────────┘    │
│         ↓                                                        │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ 5. GENERATE ASSETS                                      │    │
│  │    • Screenshot new site (desktop + mobile)             │    │
│  │    • Screenshot old site for comparison                 │    │
│  │    • Create side-by-side comparison image               │    │
│  │    • Run Lighthouse for performance metrics             │    │
│  │                                                         │    │
│  │    Tools: Playwright, Lighthouse CI, Sharp              │    │
│  └─────────────────────────────────────────────────────────┘    │
│         ↓                                                        │
│  OUTPUT: Preview URL + comparison assets + outreach email       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Key Tools for Scraping

```javascript
// Color extraction from existing site
const ColorThief = require('colorthief');
const colors = await ColorThief.getPalette(logoUrl, 5);
// Returns: [[r,g,b], [r,g,b], ...] - primary colors

// Content scraping with Playwright
const { chromium } = require('playwright');
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(prospectUrl);

const data = await page.evaluate(() => ({
  title: document.title,
  logo: document.querySelector('header img')?.src,
  phone: document.body.innerText.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/)?.[0],
  services: [...document.querySelectorAll('h2, h3')].map(el => el.textContent)
}));
```

### Google Business Data Sources

| Source | Cost | Data Available |
|--------|------|----------------|
| **Google Places API** | $17/1000 requests | Hours, reviews, photos, location |
| **SerpAPI** | $50/mo (5000 searches) | GMB scraping, reviews |
| **Outscraper** | $3/1000 records | Bulk GMB data |
| **BrightData** | Pay-as-you-go | Full scraping infra |

---

## 4. Deployment/Hosting for Previews

### Platform Comparison

| Platform | Free Tier | Deploy Speed | Custom Domain | API |
|----------|-----------|--------------|---------------|-----|
| **Vercel** ⭐ | 100 deploys/day | ~30 sec | ✅ Wildcard | ✅ Excellent |
| **Netlify** | 300 build mins/mo | ~45 sec | ✅ Wildcard | ✅ Good |
| **Cloudflare Pages** | Unlimited | ~30 sec | ✅ Wildcard | ✅ Good |
| **GitHub Pages** | Unlimited (public) | ~2 min | ⚠️ Limited | ❌ |

### Recommended: Vercel with Wildcard Subdomains

```bash
# Structure
preview.youragency.com/           # Landing/index
preview.youragency.com/joes-plumbing/
preview.youragency.com/mikes-hvac/
preview.youragency.com/dental-care-plus/

# OR with subdomains (requires wildcard DNS)
joes-plumbing.preview.youragency.com
mikes-hvac.preview.youragency.com
```

### Vercel Deployment Script

```javascript
// deploy.js
const { execSync } = require('child_process');

async function deployProspectSite(prospectSlug, sitePath) {
  // Deploy to Vercel with custom alias
  const result = execSync(`
    cd ${sitePath} && \
    vercel deploy --prod --yes \
    --scope your-team \
    --token $VERCEL_TOKEN
  `);
  
  // Set custom alias
  execSync(`
    vercel alias set ${result.toString().trim()} \
    ${prospectSlug}.preview.youragency.com \
    --token $VERCEL_TOKEN
  `);
  
  return `https://${prospectSlug}.preview.youragency.com`;
}
```

### DNS Setup for Wildcard Subdomains

```
# Cloudflare DNS (or your registrar)
Type: CNAME
Name: *.preview
Target: cname.vercel-dns.com
Proxy: DNS only (gray cloud)
```

---

## 5. UI Testing with Agents

### Automated Testing Pipeline

```
┌────────────────────────────────────────────────────────────┐
│                    TESTING PIPELINE                         │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │ Playwright  │  │ Lighthouse  │  │ Percy Visual Diff   │ │
│  │             │  │     CI      │  │                     │ │
│  │ • Links     │  │ • Perf >90  │  │ • Before/After      │ │
│  │ • Forms     │  │ • A11y >90  │  │ • Mobile vs Desktop │ │
│  │ • Mobile    │  │ • SEO >90   │  │ • Cross-browser     │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
│         │                │                    │             │
│         ▼                ▼                    ▼             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                    TEST REPORT                       │   │
│  │  ✅ All links working                                │   │
│  │  ✅ Mobile responsive                                │   │
│  │  ✅ Performance: 94                                  │   │
│  │  ✅ Accessibility: 98                                │   │
│  │  ✅ No visual regressions                            │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

### Playwright Test Suite

```javascript
// tests/prospect-site.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Prospect Site QA', () => {
  test('homepage loads correctly', async ({ page }) => {
    await page.goto(process.env.PREVIEW_URL);
    await expect(page).toHaveTitle(/./);
    await expect(page.locator('header')).toBeVisible();
  });

  test('mobile responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(process.env.PREVIEW_URL);
    // Check mobile menu works
    await page.click('[data-testid="mobile-menu"]');
    await expect(page.locator('nav')).toBeVisible();
  });

  test('all links are valid', async ({ page }) => {
    await page.goto(process.env.PREVIEW_URL);
    const links = await page.$$eval('a[href]', els => 
      els.map(e => e.href).filter(h => h.startsWith('http'))
    );
    for (const link of links) {
      const response = await page.request.get(link);
      expect(response.status()).toBeLessThan(400);
    }
  });

  test('contact form works', async ({ page }) => {
    await page.goto(process.env.PREVIEW_URL + '/contact');
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('textarea[name="message"]', 'Test message');
    // Don't actually submit, just verify form is functional
    await expect(page.locator('button[type="submit"]')).toBeEnabled();
  });
});
```

### Lighthouse CI Config

```yaml
# lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: [process.env.PREVIEW_URL],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
```

### Accessibility with axe-core

```javascript
const { injectAxe, checkA11y } = require('axe-playwright');

test('accessibility audit', async ({ page }) => {
  await page.goto(process.env.PREVIEW_URL);
  await injectAxe(page);
  await checkA11y(page, null, {
    detailedReport: true,
    detailedReportOptions: { html: true },
  });
});
```

---

## 6. Workflow Command Interface

### Command Structure

```bash
/newsite "<Business Name>" "<current-url>" "<industry>"

# Examples:
/newsite "Joe's Plumbing" "joesplumbing.com" "plumber"
/newsite "Bella's Bistro" "bellasbistro.net" "restaurant"
/newsite "Smith & Associates Law" "smithlaw.com" "lawyer"
```

### Full Workflow Implementation

```javascript
// commands/newsite.js
const { scrapeWebsite } = require('../lib/scraper');
const { getGoogleBusinessInfo } = require('../lib/gmb');
const { generateSite } = require('../lib/generator');
const { deployToVercel } = require('../lib/deploy');
const { runTests } = require('../lib/testing');
const { takeScreenshots } = require('../lib/screenshots');
const { sendOutreachEmail } = require('../lib/email');

async function newsite(businessName, currentUrl, industry) {
  const slug = slugify(businessName);
  const startTime = Date.now();
  
  console.log(`🚀 Starting site generation for ${businessName}...`);
  
  // Step 1: Scrape existing site
  console.log('📥 Scraping current website...');
  const siteData = await scrapeWebsite(currentUrl);
  // Returns: { logo, colors, content, contact, social }
  
  // Step 2: Get Google Business info
  console.log('📍 Fetching Google Business data...');
  const gmbData = await getGoogleBusinessInfo(businessName);
  // Returns: { hours, reviews, photos, rating, categories }
  
  // Step 3: Generate new site
  console.log('🎨 Generating modern website...');
  const sitePath = await generateSite({
    template: industry,
    branding: {
      name: businessName,
      logo: siteData.logo,
      colors: siteData.colors,
      phone: siteData.contact.phone || gmbData.phone,
      email: siteData.contact.email,
      address: gmbData.address,
      hours: gmbData.hours,
    },
    content: {
      services: siteData.content.services,
      about: siteData.content.about,
      testimonials: gmbData.reviews.slice(0, 3),
    },
    images: gmbData.photos,
  });
  
  // Step 4: Deploy to preview
  console.log('🚀 Deploying to preview URL...');
  const previewUrl = await deployToVercel(slug, sitePath);
  
  // Step 5: Run automated tests
  console.log('🧪 Running quality checks...');
  const testResults = await runTests(previewUrl);
  
  // Step 6: Take comparison screenshots
  console.log('📸 Generating comparison screenshots...');
  const screenshots = await takeScreenshots({
    oldSite: currentUrl,
    newSite: previewUrl,
    outputDir: `./output/${slug}`,
  });
  
  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  
  return {
    success: true,
    businessName,
    previewUrl,
    screenshots,
    testResults,
    duration: `${duration}s`,
    outreachReady: true,
  };
}

// CLI interface
if (require.main === module) {
  const [,, name, url, industry] = process.argv;
  newsite(name, url, industry)
    .then(result => {
      console.log('\n✅ Site generation complete!');
      console.log(`   Preview: ${result.previewUrl}`);
      console.log(`   Duration: ${result.duration}`);
    })
    .catch(console.error);
}
```

### Screenshot Comparison Generator

```javascript
// lib/screenshots.js
const { chromium } = require('playwright');
const sharp = require('sharp');

async function takeScreenshots({ oldSite, newSite, outputDir }) {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  
  // Desktop screenshots
  const desktopPage = await context.newPage();
  await desktopPage.setViewportSize({ width: 1440, height: 900 });
  
  await desktopPage.goto(`https://${oldSite}`);
  await desktopPage.screenshot({ 
    path: `${outputDir}/old-desktop.png`,
    fullPage: true 
  });
  
  await desktopPage.goto(newSite);
  await desktopPage.screenshot({ 
    path: `${outputDir}/new-desktop.png`,
    fullPage: true 
  });
  
  // Mobile screenshots
  const mobilePage = await context.newPage();
  await mobilePage.setViewportSize({ width: 375, height: 667 });
  
  await mobilePage.goto(`https://${oldSite}`);
  await mobilePage.screenshot({ path: `${outputDir}/old-mobile.png` });
  
  await mobilePage.goto(newSite);
  await mobilePage.screenshot({ path: `${outputDir}/new-mobile.png` });
  
  await browser.close();
  
  // Create side-by-side comparison
  await createComparison(
    `${outputDir}/old-desktop.png`,
    `${outputDir}/new-desktop.png`,
    `${outputDir}/comparison-desktop.png`
  );
  
  return {
    oldDesktop: `${outputDir}/old-desktop.png`,
    newDesktop: `${outputDir}/new-desktop.png`,
    comparison: `${outputDir}/comparison-desktop.png`,
  };
}

async function createComparison(oldPath, newPath, outputPath) {
  const old = sharp(oldPath).resize(700, null);
  const newImg = sharp(newPath).resize(700, null);
  
  // Get heights for consistent sizing
  const oldMeta = await old.metadata();
  const height = oldMeta.height;
  
  await sharp({
    create: {
      width: 1440,
      height: height + 60,
      channels: 4,
      background: { r: 30, g: 30, b: 30, alpha: 1 }
    }
  })
  .composite([
    { input: await old.toBuffer(), left: 10, top: 50 },
    { input: await newImg.resize(700, height).toBuffer(), left: 730, top: 50 },
    // Add labels
    { 
      input: Buffer.from(`<svg width="1440" height="40">
        <text x="350" y="30" fill="white" font-size="24">BEFORE</text>
        <text x="1070" y="30" fill="white" font-size="24">AFTER</text>
      </svg>`),
      top: 0,
      left: 0
    }
  ])
  .toFile(outputPath);
}

module.exports = { takeScreenshots, createComparison };
```

---

## 7. Implementation Roadmap

### Phase 1: MVP (Week 1-2)
- [ ] Set up template repository with 3 industry templates (plumber, restaurant, lawyer)
- [ ] Build basic scraper (logo, colors, contact info)
- [ ] Create site generator with template variable replacement
- [ ] Set up Vercel deployment with preview subdomains
- [ ] Basic CLI: `/newsite` command

### Phase 2: Enhancement (Week 3-4)
- [ ] Add Google Business API integration
- [ ] Implement screenshot comparison tool
- [ ] Add Playwright testing suite
- [ ] Build outreach email template system
- [ ] Add 5 more industry templates

### Phase 3: Automation (Week 5-6)
- [ ] Create web dashboard for managing prospects
- [ ] Add bulk import (CSV of prospects)
- [ ] Implement AI-enhanced content generation (Claude)
- [ ] Add Lighthouse CI for performance reports
- [ ] Set up email delivery system

### Phase 4: Scale (Week 7-8)
- [ ] Add visual regression testing (Percy)
- [ ] Implement A/B testing for templates
- [ ] Create prospect tracking analytics
- [ ] Build API for external integrations
- [ ] Add white-label customization options

---

## 8. Tool Recommendations Summary

### Must Have (Core Stack)
| Tool | Purpose | Cost |
|------|---------|------|
| **Vercel** | Deployment/hosting | Free tier sufficient |
| **Playwright** | Scraping + testing | Free (open source) |
| **shadcn/ui** | Component library | Free (MIT) |
| **Next.js** | Site framework | Free (open source) |
| **Claude API** | Content enhancement | ~$0.01-0.10/site |

### Should Have (Better Experience)
| Tool | Purpose | Cost |
|------|---------|------|
| **Google Places API** | Business data | $17/1000 requests |
| **Lighthouse CI** | Performance testing | Free |
| **Sharp** | Image processing | Free (open source) |
| **Resend/SendGrid** | Outreach emails | Free tier |

### Nice to Have (Premium)
| Tool | Purpose | Cost |
|------|---------|------|
| **Percy** | Visual regression | $99/mo |
| **v0.dev Pro** | AI generation | $20/mo |
| **SerpAPI** | GMB scraping | $50/mo |

---

## 9. Example Output

```
$ /newsite "Joe's Plumbing" "joesplumbing.com" "plumber"

🚀 Starting site generation for Joe's Plumbing...

📥 Scraping current website...
   ✓ Found logo: joesplumbing.com/logo.png
   ✓ Extracted colors: #1E40AF, #FBBF24, #F3F4F6
   ✓ Found 6 services listed
   ✓ Phone: (555) 123-4567

📍 Fetching Google Business data...
   ✓ Rating: 4.8 (127 reviews)
   ✓ Hours: Mon-Sat 7AM-6PM
   ✓ Found 12 photos

🎨 Generating modern website...
   ✓ Using template: contractor/plumber
   ✓ Applied brand colors
   ✓ Generated enhanced copy with AI
   ✓ Added testimonial section (3 reviews)

🚀 Deploying to preview URL...
   ✓ Deployed to Vercel
   ✓ URL: https://joes-plumbing.preview.youragency.com

🧪 Running quality checks...
   ✓ Performance: 96/100
   ✓ Accessibility: 98/100
   ✓ SEO: 100/100
   ✓ All links valid
   ✓ Mobile responsive

📸 Generating comparison screenshots...
   ✓ Created side-by-side comparison

✅ Site generation complete!
   Preview URL: https://joes-plumbing.preview.youragency.com
   Duration: 47.3s
   
📧 Outreach email ready:
   Subject: I rebuilt your website, Joe — take a look!
   
   Assets:
   - comparison-desktop.png
   - lighthouse-report.html
   - preview-qr-code.png
```

---

## 10. Security & Legal Considerations

### Content Usage
- **Scraping:** Only use publicly available information
- **Images:** Re-upload to your own CDN (don't hotlink)
- **Reviews:** Link back to Google, don't claim as your own testimonials
- **Logos:** Use as-is for personalization, make clear it's a demo

### Preview Site Disclaimers
Add footer to all preview sites:
```html
<footer class="preview-disclaimer">
  This is a demonstration website created by [Your Agency]. 
  Not affiliated with or endorsed by [Business Name].
  <a href="mailto:contact@youragency.com">Contact us</a> to discuss your project.
</footer>
```

### Data Handling
- Don't store scraped data long-term
- Auto-delete preview sites after 30 days
- Clear prospect data on request

---

*Last updated: January 2026*
