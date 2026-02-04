#!/usr/bin/env node
/**
 * Site Revamp Generator for SLC Lead Gen
 * 
 * Creates modernized versions of existing websites using THEIR actual:
 * - Logo
 * - Color scheme
 * - Content
 * - Images
 * 
 * The pitch: "Here's YOUR website, but modernized" — not "here's a generic site"
 * 
 * Usage: node services/revamp-generator.js <url-or-enriched-lead-file>
 * Example: node services/revamp-generator.js https://beehiveplumbing.com
 * Example: node services/revamp-generator.js data/leads/enriched/beehiveplumbing.com.json
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');
const Handlebars = require('handlebars');

// Import functions from v0-generator for fallback
const {
  generateLocalTemplate,
  detectCategory,
  slugify
} = require('./v0-generator');

// Import intelligent agents
const { researchWebsite } = require('./agents/research-agent');
const { createCreativeBrief } = require('./agents/creative-director');
const { generateCopy, adaptCopyForTemplate } = require('./agents/copywriter');
const { validateAndRepair } = require('./agents/validator');
const { runQA } = require('./agents/qa-agent');
const { classifyBusinessType, classifySync } = require('./agents/classifier-agent');

// ============================================================================
// CONFIGURATION
// ============================================================================

const config = {
  outputDir: path.join(__dirname, '..', 'output', 'demos'),
  screenshotWidth: 1280,
  screenshotHeight: 800,
  extraction: {
    timeout: 30000,
    maxImages: 20,
    maxContentLength: 5000
  }
};

// ============================================================================
// BUSINESS TYPE DETECTION
// ============================================================================

/**
 * Template mapping for different business types
 */
const templateMap = {
  'home-services': 'service-business.html',
  'saas-tech': 'saas-tech.html',
  'restaurant': 'restaurant.html',
  'professional-services': 'professional-services.html',
  'ecommerce': 'ecommerce.html',
  'generic': 'service-business.html'  // fallback
};

/**
 * CTA text mapping for different business types
 */
const ctaTextMap = {
  'saas-tech': {
    primary: 'Start Free Trial',
    secondary: 'Book Demo'
  },
  'home-services': {
    primary: 'Call Now',
    secondary: 'Get Free Quote'
  },
  'restaurant': {
    primary: 'Order Now',
    secondary: 'Make Reservation'
  },
  'professional-services': {
    primary: 'Schedule Consultation',
    secondary: 'Contact Us'
  },
  'ecommerce': {
    primary: 'Shop Now',
    secondary: 'View Products'
  },
  'generic': {
    primary: 'Get Started',
    secondary: 'Learn More'
  }
};

/**
 * Detect business type from URL and extracted content
 * @param {string} url - The website URL
 * @param {object} extractedAssets - Extracted assets from the site
 * @returns {'home-services' | 'saas-tech' | 'restaurant' | 'professional-services' | 'ecommerce' | 'generic'}
 */
function detectBusinessType(url, extractedAssets) {
  const scores = {
    'saas-tech': 0,
    'home-services': 0,
    'restaurant': 0,
    'professional-services': 0,
    'ecommerce': 0
  };
  
  // Normalize URL for analysis
  const urlLower = url.toLowerCase();
  const hostname = new URL(url).hostname.toLowerCase();
  
  // Build searchable content string from extracted assets
  const content = extractedAssets.content || {};
  const contentText = [
    content.title || '',
    content.tagline || '',
    content.heroText || '',
    content.aboutText || '',
    (content.services || []).map(s => `${s.name} ${s.description || ''}`).join(' ')
  ].join(' ').toLowerCase();
  
  // ============================================================================
  // SaaS/Tech Detection Signals
  // ============================================================================
  
  // URL signals for SaaS
  const saasUrlPatterns = ['app', 'software', 'platform', 'saas', 'cloud', 'dashboard', 'api', 'io', 'dev', 'tech'];
  saasUrlPatterns.forEach(pattern => {
    if (hostname.includes(pattern)) scores['saas-tech'] += 3;
    if (urlLower.includes(pattern)) scores['saas-tech'] += 1;
  });
  
  // Content signals for SaaS
  const saasContentPatterns = [
    'sign up', 'signup', 'free trial', 'start trial', 'demo', 'book demo', 'request demo',
    'pricing', 'features', 'integrations', 'api', 'workflow', 'automation', 'dashboard',
    'login', 'sign in', 'log in', 'get started', 'start free', 'try free', 'no credit card',
    'saas', 'software', 'platform', 'app store', 'google play', 'ios', 'android app',
    'enterprise', 'team', 'workspace', 'collaborate', 'productivity', 'analytics'
  ];
  saasContentPatterns.forEach(pattern => {
    if (contentText.includes(pattern)) scores['saas-tech'] += 2;
  });
  
  // Negative signals for SaaS (if phone is very prominent, probably not SaaS)
  if (content.phone && contentText.includes('call now')) {
    scores['saas-tech'] -= 3;
  }
  
  // ============================================================================
  // Home Services Detection Signals
  // ============================================================================
  
  // Phone prominence is a strong signal
  if (content.phone) scores['home-services'] += 2;
  
  // Home services content patterns
  const homeServicesPatterns = [
    'call now', 'call today', 'free estimate', 'free quote', 'emergency',
    '24/7', '24 hour', 'same day', 'licensed', 'bonded', 'insured',
    'service area', 'serving', 'locally owned', 'family owned',
    'plumbing', 'plumber', 'hvac', 'heating', 'cooling', 'air conditioning',
    'electrical', 'electrician', 'roofing', 'roofer', 'roof repair',
    'landscaping', 'lawn care', 'tree service', 'pest control', 'exterminator',
    'cleaning', 'maid service', 'carpet cleaning', 'window cleaning',
    'garage door', 'fence', 'concrete', 'painting', 'remodel', 'renovation',
    'handyman', 'home repair', 'appliance repair', 'water damage', 'flood'
  ];
  homeServicesPatterns.forEach(pattern => {
    if (contentText.includes(pattern)) scores['home-services'] += 2;
  });
  
  // URL signals for home services
  const homeServicesUrlPatterns = ['plumb', 'hvac', 'electric', 'roof', 'clean', 'lawn', 'repair', 'service'];
  homeServicesUrlPatterns.forEach(pattern => {
    if (hostname.includes(pattern)) scores['home-services'] += 3;
  });
  
  // ============================================================================
  // Restaurant Detection Signals
  // ============================================================================
  
  const restaurantPatterns = [
    'menu', 'reservation', 'reservations', 'order online', 'order now',
    'delivery', 'takeout', 'dine in', 'dining', 'cuisine', 'chef',
    'restaurant', 'cafe', 'bistro', 'bar', 'grill', 'kitchen', 'eatery',
    'breakfast', 'lunch', 'dinner', 'brunch', 'appetizer', 'entree', 'dessert',
    'food', 'pizza', 'burger', 'sushi', 'tacos', 'italian', 'mexican', 'asian',
    'hours of operation', 'open daily', 'closed monday'
  ];
  restaurantPatterns.forEach(pattern => {
    if (contentText.includes(pattern)) scores['restaurant'] += 2;
  });
  
  // URL signals for restaurants
  const restaurantUrlPatterns = ['restaurant', 'cafe', 'bistro', 'grill', 'kitchen', 'pizza', 'sushi', 'food', 'eat'];
  restaurantUrlPatterns.forEach(pattern => {
    if (hostname.includes(pattern)) scores['restaurant'] += 4;
  });
  
  // ============================================================================
  // Professional Services Detection Signals
  // ============================================================================
  
  const professionalPatterns = [
    'attorney', 'lawyer', 'law firm', 'legal', 'litigation',
    'accountant', 'accounting', 'cpa', 'tax', 'bookkeeping',
    'consultant', 'consulting', 'advisory', 'advisor',
    'doctor', 'dentist', 'dental', 'medical', 'clinic', 'healthcare',
    'therapist', 'therapy', 'counseling', 'psychologist',
    'architect', 'engineering', 'design firm',
    'schedule consultation', 'book appointment', 'free consultation',
    'case study', 'case studies', 'portfolio', 'credentials', 'certifications',
    'degree', 'jd', 'md', 'phd', 'cpa', 'esq', 'licensed professional'
  ];
  professionalPatterns.forEach(pattern => {
    if (contentText.includes(pattern)) scores['professional-services'] += 2;
  });
  
  // URL signals
  const professionalUrlPatterns = ['law', 'legal', 'attorney', 'cpa', 'dental', 'clinic', 'consult'];
  professionalUrlPatterns.forEach(pattern => {
    if (hostname.includes(pattern)) scores['professional-services'] += 4;
  });
  
  // ============================================================================
  // E-commerce Detection Signals
  // ============================================================================
  
  const ecommercePatterns = [
    'shop now', 'add to cart', 'buy now', 'checkout', 'shopping cart',
    'product', 'products', 'store', 'shop', 'catalog',
    'free shipping', 'shipping', 'returns', 'refund policy',
    'sale', 'discount', 'coupon', 'promo code',
    '$', 'price', 'in stock', 'out of stock', 'inventory'
  ];
  ecommercePatterns.forEach(pattern => {
    if (contentText.includes(pattern)) scores['ecommerce'] += 2;
  });
  
  // URL signals
  const ecommerceUrlPatterns = ['shop', 'store', 'buy', 'market', 'mall'];
  ecommerceUrlPatterns.forEach(pattern => {
    if (hostname.includes(pattern)) scores['ecommerce'] += 3;
  });
  
  // ============================================================================
  // Determine Winner
  // ============================================================================
  
  // Find highest scoring type
  let maxScore = 0;
  let detectedType = 'generic';
  
  for (const [type, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      detectedType = type;
    }
  }
  
  // Require minimum confidence threshold
  if (maxScore < 4) {
    detectedType = 'generic';
  }
  
  return {
    type: detectedType,
    scores,
    confidence: maxScore
  };
}

// ============================================================================
// SITE ASSET EXTRACTOR
// ============================================================================

/**
 * Extract all brand assets from an existing website
 * @param {string} url - The website URL to extract from
 * @returns {Promise<object>} Extracted assets
 */
async function extractSiteAssets(url) {
  console.log(`\n🔍 Extracting assets from: ${url}`);
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  });
  
  const assets = {
    url,
    logo: null,
    favicon: null,
    colors: { primary: null, secondary: null, accent: null, background: null, text: null },
    fonts: { heading: null, body: null },
    images: [],
    content: {
      title: null,
      tagline: null,
      heroText: null,
      aboutText: null,
      services: [],
      testimonials: [],
      phone: null,
      email: null,
      address: null
    },
    socialLinks: {},
    extractedAt: new Date().toISOString()
  };
  
  try {
    const page = await browser.newPage();
    
    // Set viewport and user agent
    await page.setViewport({ width: 1920, height: 1080 });
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    // Navigate to the page
    console.log('   📄 Loading page...');
    await page.goto(url, { 
      waitUntil: 'networkidle2', 
      timeout: config.extraction.timeout 
    });
    
    // Wait for dynamic content
    await wait(2000);
    
    // Extract all assets in parallel where possible
    const [logoResult, colorsResult, fontsResult, imagesResult, contentResult, socialResult] = await Promise.all([
      extractLogo(page, url).catch(e => { console.log(`   ⚠️ Logo extraction failed: ${e.message}`); return null; }),
      extractColors(page).catch(e => { console.log(`   ⚠️ Color extraction failed: ${e.message}`); return null; }),
      extractFonts(page).catch(e => { console.log(`   ⚠️ Font extraction failed: ${e.message}`); return null; }),
      extractImages(page, url).catch(e => { console.log(`   ⚠️ Image extraction failed: ${e.message}`); return []; }),
      extractContent(page).catch(e => { console.log(`   ⚠️ Content extraction failed: ${e.message}`); return null; }),
      extractSocialLinks(page).catch(e => { console.log(`   ⚠️ Social links extraction failed: ${e.message}`); return {}; })
    ]);
    
    // Also get favicon
    const faviconResult = await extractFavicon(page, url).catch(() => null);
    
    // Merge results
    if (logoResult) assets.logo = logoResult;
    if (faviconResult) assets.favicon = faviconResult;
    if (colorsResult) assets.colors = { ...assets.colors, ...colorsResult };
    if (fontsResult) assets.fonts = { ...assets.fonts, ...fontsResult };
    if (imagesResult) assets.images = imagesResult;
    if (contentResult) assets.content = { ...assets.content, ...contentResult };
    if (socialResult) assets.socialLinks = socialResult;
    
    // Log extraction summary
    console.log('\n   📊 Extraction Summary:');
    console.log(`      • Logo: ${assets.logo ? '✅ Found' : '❌ Not found'}`);
    console.log(`      • Primary color: ${assets.colors.primary || 'Not detected'}`);
    console.log(`      • Fonts: ${assets.fonts.heading || 'Default'} / ${assets.fonts.body || 'Default'}`);
    console.log(`      • Images: ${assets.images.length} found`);
    console.log(`      • Services: ${assets.content.services.length} found`);
    console.log(`      • Phone: ${assets.content.phone || 'Not found'}`);
    
  } catch (error) {
    console.log(`   ❌ Extraction error: ${error.message}`);
  } finally {
    await browser.close();
  }
  
  return assets;
}

/**
 * Extract logo from the page
 */
async function extractLogo(page, baseUrl) {
  console.log('   🎨 Extracting logo...');
  
  const logoData = await page.evaluate(() => {
    // Priority selectors for logo detection
    const selectors = [
      'img[class*="logo"]',
      'img[id*="logo"]',
      'img[src*="logo"]',
      'img[alt*="logo"]',
      'a[class*="logo"] img',
      '.logo img',
      '#logo img',
      'header img:first-of-type',
      '.navbar-brand img',
      '.site-logo img',
      '[class*="brand"] img',
      'a[href="/"] img'
    ];
    
    for (const selector of selectors) {
      const img = document.querySelector(selector);
      if (img && img.src) {
        // Get computed dimensions
        const rect = img.getBoundingClientRect();
        
        // Validate it's a reasonable logo size (not too tiny, not huge)
        if (rect.width > 30 && rect.width < 500 && rect.height > 20 && rect.height < 200) {
          return {
            src: img.src,
            alt: img.alt || '',
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            selector: selector
          };
        }
      }
    }
    
    // Fallback: look for SVG logos
    const svgLogo = document.querySelector('header svg, .logo svg, [class*="logo"] svg');
    if (svgLogo) {
      const svgString = new XMLSerializer().serializeToString(svgLogo);
      return {
        svg: svgString,
        type: 'svg'
      };
    }
    
    return null;
  });
  
  if (logoData) {
    // Resolve relative URLs
    if (logoData.src && !logoData.src.startsWith('data:')) {
      try {
        logoData.url = new URL(logoData.src, baseUrl).href;
      } catch {
        logoData.url = logoData.src;
      }
    } else if (logoData.src) {
      logoData.url = logoData.src;
      logoData.isBase64 = true;
    }
    
    console.log(`      ✅ Found logo: ${logoData.url || 'SVG'}`);
    return logoData;
  }
  
  return null;
}

/**
 * Extract favicon
 */
async function extractFavicon(page, baseUrl) {
  const faviconUrl = await page.evaluate(() => {
    // Check various favicon link types
    const selectors = [
      'link[rel="icon"]',
      'link[rel="shortcut icon"]',
      'link[rel="apple-touch-icon"]',
      'link[rel="apple-touch-icon-precomposed"]'
    ];
    
    for (const selector of selectors) {
      const link = document.querySelector(selector);
      if (link && link.href) {
        return link.href;
      }
    }
    
    return null;
  });
  
  if (faviconUrl) {
    try {
      return new URL(faviconUrl, baseUrl).href;
    } catch {
      return faviconUrl;
    }
  }
  
  // Default favicon location
  try {
    return new URL('/favicon.ico', baseUrl).href;
  } catch {
    return null;
  }
}

/**
 * Extract color scheme from CSS
 */
async function extractColors(page) {
  console.log('   🎨 Extracting colors...');
  
  const colors = await page.evaluate(() => {
    const colorCounts = {};
    const backgroundColors = {};
    const linkColors = [];
    const buttonBgColors = [];
    const buttonTextColors = [];
    
    // Helper to parse RGB to hex
    function rgbToHex(rgb) {
      if (!rgb || rgb === 'transparent') return null;
      const match = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (!match) return rgb.startsWith('#') ? rgb.toLowerCase() : null;
      return '#' + [match[1], match[2], match[3]].map(x => {
        const hex = parseInt(x).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      }).join('');
    }
    
    // Helper to check if color is "interesting" (not white, black, gray, or transparent)
    function isInterestingColor(hex) {
      if (!hex) return false;
      // Remove very light colors (near white)
      if (hex.match(/^#[f][0-9a-f]{5}$/i)) return false; // Starts with f
      if (hex.match(/^#[e-f][e-f][e-f][e-f][e-f][e-f]$/i)) return false; // Very light
      // Remove black/near black
      if (hex.match(/^#[0-1][0-1][0-1][0-1][0-1][0-1]$/i)) return false;
      // Remove grays
      const r = parseInt(hex.slice(1,3), 16);
      const g = parseInt(hex.slice(3,5), 16);
      const b = parseInt(hex.slice(5,7), 16);
      const isGray = Math.abs(r - g) < 20 && Math.abs(g - b) < 20 && Math.abs(r - b) < 20;
      if (isGray && r > 200) return false; // Light gray
      return true;
    }
    
    // Get computed styles from key elements
    const elementsToAnalyze = [
      ...document.querySelectorAll('header, nav, .header, .navbar, .nav'),
      ...document.querySelectorAll('button, .btn, .button, a.btn, [class*="cta"], [class*="button"]'),
      ...document.querySelectorAll('h1, h2, h3'),
      ...document.querySelectorAll('.hero, .jumbotron, [class*="hero"]'),
      ...document.querySelectorAll('footer, .footer'),
      ...document.querySelectorAll('a'),
      document.body
    ].slice(0, 100);
    
    elementsToAnalyze.forEach(el => {
      if (!el) return;
      const style = window.getComputedStyle(el);
      
      // Extract background color
      const bgColor = rgbToHex(style.backgroundColor);
      if (bgColor && isInterestingColor(bgColor)) {
        backgroundColors[bgColor] = (backgroundColors[bgColor] || 0) + 1;
      }
      
      // Extract text color
      const textColor = rgbToHex(style.color);
      if (textColor) {
        colorCounts[textColor] = (colorCounts[textColor] || 0) + 1;
      }
    });
    
    // Specifically look at buttons (high priority for primary color)
    document.querySelectorAll('button, .btn, .button, [class*="cta"], a[class*="btn"]').forEach(btn => {
      const style = window.getComputedStyle(btn);
      const bgColor = rgbToHex(style.backgroundColor);
      const textColor = rgbToHex(style.color);
      if (bgColor && isInterestingColor(bgColor)) {
        buttonBgColors.push(bgColor);
      }
      if (textColor && isInterestingColor(textColor)) {
        buttonTextColors.push(textColor);
      }
    });
    
    // Look at links for accent color
    document.querySelectorAll('a:not(.btn):not([class*="button"])').forEach(link => {
      const color = rgbToHex(window.getComputedStyle(link).color);
      if (color && isInterestingColor(color)) {
        linkColors.push(color);
      }
    });
    
    // Also look for CSS variables
    const rootStyle = getComputedStyle(document.documentElement);
    const cssVars = {
      primary: rootStyle.getPropertyValue('--primary-color')?.trim() ||
               rootStyle.getPropertyValue('--primary')?.trim() ||
               rootStyle.getPropertyValue('--color-primary')?.trim() ||
               rootStyle.getPropertyValue('--brand-primary')?.trim(),
      secondary: rootStyle.getPropertyValue('--secondary-color')?.trim() ||
                 rootStyle.getPropertyValue('--secondary')?.trim(),
      accent: rootStyle.getPropertyValue('--accent-color')?.trim() ||
              rootStyle.getPropertyValue('--accent')?.trim()
    };
    
    // Sort by frequency
    const sortedBgColors = Object.entries(backgroundColors)
      .sort((a, b) => b[1] - a[1])
      .map(([color]) => color)
      .filter(c => isInterestingColor(c));
    
    const sortedTextColors = Object.entries(colorCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([color]) => color)
      .filter(c => isInterestingColor(c));
    
    // Determine primary color with priority:
    // 1. CSS variables
    // 2. Button background colors (most common)
    // 3. Interesting background colors
    // 4. Link colors
    // 5. Interesting text colors
    const getMostCommon = (arr) => {
      const counts = {};
      arr.forEach(c => counts[c] = (counts[c] || 0) + 1);
      return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0];
    };
    
    const buttonPrimary = getMostCommon(buttonBgColors);
    const linkPrimary = getMostCommon(linkColors);
    
    const primary = cssVars.primary || 
                   buttonPrimary || 
                   sortedBgColors[0] || 
                   linkPrimary ||
                   sortedTextColors.find(c => isInterestingColor(c));
    
    // For accent, prefer yellow/orange colors
    const yellowishColors = [...sortedBgColors, ...sortedTextColors].filter(c => {
      if (!c) return false;
      const r = parseInt(c.slice(1,3), 16);
      const g = parseInt(c.slice(3,5), 16);
      const b = parseInt(c.slice(5,7), 16);
      return r > 200 && g > 150 && b < 100; // Yellow/gold/orange
    });
    
    return {
      primary: primary,
      secondary: cssVars.secondary || sortedBgColors[1] || sortedTextColors[1],
      accent: cssVars.accent || yellowishColors[0] || buttonTextColors[0],
      background: '#ffffff',
      text: sortedTextColors.find(c => {
        const r = parseInt(c?.slice(1,3) || 'ff', 16);
        return r < 100; // Dark color for text
      }) || '#333333',
      allColors: [...new Set([...sortedBgColors, ...sortedTextColors, ...buttonBgColors, ...linkColors])].slice(0, 15)
    };
  });
  
  // Enhance colors - find the best primary if current one is too light
  if (colors.primary) {
    // Check if primary is too light and find a better one from allColors
    const isLight = (hex) => {
      if (!hex) return true;
      const r = parseInt(hex.slice(1,3), 16);
      const g = parseInt(hex.slice(3,5), 16);
      const b = parseInt(hex.slice(5,7), 16);
      return (r + g + b) / 3 > 200;
    };
    
    if (isLight(colors.primary) && colors.allColors.length > 0) {
      // Find a darker, more interesting color
      const betterPrimary = colors.allColors.find(c => !isLight(c) && c !== '#000000');
      if (betterPrimary) {
        colors.primary = betterPrimary;
      }
    }
    
    colors.primaryDark = darkenColor(colors.primary, 15);
    console.log(`      ✅ Primary: ${colors.primary}`);
  }
  
  return colors;
}

/**
 * Darken a hex color by a percentage
 */
function darkenColor(hex, percent) {
  if (!hex || !hex.startsWith('#')) return hex;
  
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  
  const R = Math.max((num >> 16) - amt, 0);
  const G = Math.max((num >> 8 & 0x00FF) - amt, 0);
  const B = Math.max((num & 0x0000FF) - amt, 0);
  
  return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}

/**
 * Extract fonts from CSS
 */
async function extractFonts(page) {
  console.log('   🔤 Extracting fonts...');
  
  const fonts = await page.evaluate(() => {
    const getFontFamily = (element) => {
      if (!element) return null;
      const style = window.getComputedStyle(element);
      const family = style.fontFamily;
      
      // Clean up font family string
      if (family) {
        // Get the first font in the stack
        const firstFont = family.split(',')[0].trim().replace(/['"]/g, '');
        // Skip generic fonts
        if (!['serif', 'sans-serif', 'monospace', 'cursive', 'fantasy', 'system-ui'].includes(firstFont.toLowerCase())) {
          return firstFont;
        }
      }
      return null;
    };
    
    // Get heading font from h1 or h2
    const headingEl = document.querySelector('h1, h2, .title');
    const headingFont = getFontFamily(headingEl);
    
    // Get body font from p or body
    const bodyEl = document.querySelector('p, body');
    const bodyFont = getFontFamily(bodyEl);
    
    // Also look for Google Fonts or other web font links
    const fontLinks = [...document.querySelectorAll('link[href*="fonts.googleapis.com"], link[href*="fonts.gstatic.com"]')]
      .map(l => l.href);
    
    return {
      heading: headingFont || 'Inter',
      body: bodyFont || headingFont || 'Inter',
      webFontUrls: fontLinks
    };
  });
  
  console.log(`      ✅ Heading: ${fonts.heading}, Body: ${fonts.body}`);
  return fonts;
}

/**
 * Extract images from the page
 */
async function extractImages(page, baseUrl) {
  console.log('   🖼️ Extracting images...');
  
  const images = await page.evaluate((maxImages) => {
    const results = [];
    const seen = new Set();
    
    // Define contexts for different image types
    const contextMap = {
      hero: ['hero', 'banner', 'jumbotron', 'masthead', 'splash'],
      team: ['team', 'staff', 'about', 'crew', 'employee'],
      service: ['service', 'work', 'project', 'portfolio', 'gallery'],
      testimonial: ['testimonial', 'review', 'customer', 'client'],
      logo: ['logo', 'brand']
    };
    
    function getContext(img) {
      const parent = img.closest('section, div, article');
      const searchText = [
        img.alt || '',
        img.className || '',
        img.src || '',
        parent?.className || '',
        parent?.id || ''
      ].join(' ').toLowerCase();
      
      for (const [context, keywords] of Object.entries(contextMap)) {
        if (keywords.some(kw => searchText.includes(kw))) {
          return context;
        }
      }
      return 'general';
    }
    
    // Get all images
    document.querySelectorAll('img').forEach(img => {
      if (!img.src || seen.has(img.src)) return;
      
      // Skip tiny images (icons, tracking pixels)
      const rect = img.getBoundingClientRect();
      if (rect.width < 50 || rect.height < 50) return;
      
      // Skip common non-content images
      const src = img.src.toLowerCase();
      if (src.includes('tracking') || src.includes('pixel') || 
          src.includes('analytics') || src.includes('ad-') ||
          src.includes('spinner') || src.includes('loading')) return;
      
      seen.add(img.src);
      
      results.push({
        src: img.src,
        alt: img.alt || '',
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        context: getContext(img)
      });
    });
    
    // Also look for background images on key sections
    document.querySelectorAll('.hero, .banner, [class*="hero"], [class*="banner"], header').forEach(el => {
      const style = window.getComputedStyle(el);
      const bgImage = style.backgroundImage;
      
      if (bgImage && bgImage !== 'none') {
        const urlMatch = bgImage.match(/url\(['"]?([^'"]+)['"]?\)/);
        if (urlMatch && !seen.has(urlMatch[1])) {
          seen.add(urlMatch[1]);
          results.push({
            src: urlMatch[1],
            alt: 'Background image',
            context: 'hero',
            isBackground: true
          });
        }
      }
    });
    
    return results.slice(0, maxImages);
  }, config.extraction.maxImages);
  
  // Resolve relative URLs
  return images.map(img => {
    try {
      img.url = new URL(img.src, baseUrl).href;
    } catch {
      img.url = img.src;
    }
    return img;
  });
}

/**
 * Extract text content from the page
 */
async function extractContent(page) {
  console.log('   📝 Extracting content...');
  
  return await page.evaluate((maxLength) => {
    const content = {
      title: null,
      tagline: null,
      heroText: null,
      aboutText: null,
      services: [],
      testimonials: [],
      phone: null,
      email: null,
      address: null
    };
    
    // Get page title
    content.title = document.querySelector('title')?.textContent?.split('|')[0]?.split('-')[0]?.trim() ||
                    document.querySelector('h1')?.textContent?.trim();
    
    // Get meta description as tagline
    content.tagline = document.querySelector('meta[name="description"]')?.content;
    
    // Get hero text - look in common hero section locations
    const heroSelectors = [
      '.hero', '[class*="hero"]', '.jumbotron', '.banner', '[class*="banner"]',
      '.masthead', 'header .container', 'header', '#hero', '[id*="hero"]'
    ];
    
    for (const selector of heroSelectors) {
      const heroSection = document.querySelector(selector);
      if (heroSection) {
        const heroH1 = heroSection.querySelector('h1, h2, .title');
        const heroP = heroSection.querySelector('p, .subtitle, .lead, .description');
        if (heroH1 || heroP) {
          content.heroText = [
            heroH1?.textContent?.trim(),
            heroP?.textContent?.trim()
          ].filter(Boolean).join('. ').substring(0, 300);
          if (content.heroText && content.heroText.length > 20) break;
        }
      }
    }
    
    // Get about text - try multiple selectors without :has/:contains
    const aboutSelectors = [
      '#about', '.about', '[class*="about-us"]', '[class*="about-section"]',
      '[id*="about"]', 'section.about', 'div.about'
    ];
    
    for (const selector of aboutSelectors) {
      try {
        const aboutSection = document.querySelector(selector);
        if (aboutSection) {
          const paragraphs = aboutSection.querySelectorAll('p');
          const aboutText = [...paragraphs]
            .map(p => p.textContent?.trim())
            .filter(t => t && t.length > 50)
            .join(' ')
            .substring(0, maxLength);
          if (aboutText && aboutText.length > 100) {
            content.aboutText = aboutText;
            break;
          }
        }
      } catch (e) { /* skip invalid selector */ }
    }
    
    // Fallback: Look for sections with "about" in heading
    if (!content.aboutText) {
      document.querySelectorAll('section, div').forEach(section => {
        const heading = section.querySelector('h1, h2, h3');
        if (heading && heading.textContent?.toLowerCase().includes('about')) {
          const paragraphs = section.querySelectorAll('p');
          const aboutText = [...paragraphs]
            .map(p => p.textContent?.trim())
            .filter(t => t && t.length > 50)
            .join(' ')
            .substring(0, maxLength);
          if (aboutText && aboutText.length > 100) {
            content.aboutText = aboutText;
          }
        }
      });
    }
    
    // Extract services - try multiple approaches
    const serviceSelectors = [
      '#services', '.services', '[class*="services"]', '[class*="service-list"]',
      '[id*="services"]', 'section.services'
    ];
    
    for (const selector of serviceSelectors) {
      try {
        const serviceSection = document.querySelector(selector);
        if (serviceSection) {
          // Look for service items - try various patterns
          const serviceItems = serviceSection.querySelectorAll('h3, h4, .service-title, .service-name, [class*="service-item"] h3, [class*="service"] h3');
          const services = [...serviceItems]
            .map(el => {
              const name = el.textContent?.trim();
              const parent = el.closest('[class*="service"]') || el.parentElement;
              const desc = parent?.querySelector('p')?.textContent?.trim() || 
                          el.nextElementSibling?.tagName === 'P' ? el.nextElementSibling?.textContent?.trim() : '';
              return { name, description: (desc || '').substring(0, 200) };
            })
            .filter(s => s.name && s.name.length > 2 && s.name.length < 100);
          
          if (services.length > 0) {
            content.services = services.slice(0, 10);
            break;
          }
        }
      } catch (e) { /* skip invalid selector */ }
    }
    
    // If still no services, look at nav dropdown menus
    if (content.services.length === 0) {
      // Generic terms to exclude
      const excludeTerms = ['services', 'home', 'about', 'contact', 'blog', 'news', 'faq', 'careers', 'reviews', 'testimonials'];
      
      // Look for "Services" nav item and its dropdown
      document.querySelectorAll('nav a, .nav a, .menu a, .navbar a').forEach(link => {
        if (link.textContent?.toLowerCase().includes('service')) {
          // Check for dropdown/submenu
          const parent = link.closest('li, .nav-item, .menu-item');
          if (parent) {
            const subLinks = parent.querySelectorAll('ul a, .submenu a, .dropdown a, .sub-menu a');
            subLinks.forEach(subLink => {
              const text = subLink.textContent?.trim();
              if (text && text.length > 2 && text.length < 80) {
                // Skip generic navigation terms
                if (!excludeTerms.includes(text.toLowerCase())) {
                  content.services.push({ name: text, description: '' });
                }
              }
            });
          }
        }
      });
    }
    
    // Filter out generic terms from services
    const genericTerms = ['services', 'home', 'about', 'contact', 'blog', 'news', 'all services', 'view all'];
    content.services = content.services.filter(s => 
      !genericTerms.includes(s.name.toLowerCase())
    );
    
    // Fallback: Look for sections with service-related headings
    if (content.services.length === 0) {
      document.querySelectorAll('section, div').forEach(section => {
        const heading = section.querySelector('h2, h3');
        if (heading && (heading.textContent?.toLowerCase().includes('service') || 
                       heading.textContent?.toLowerCase().includes('what we'))) {
          const items = section.querySelectorAll('h3, h4, .card-title');
          items.forEach(item => {
            const name = item.textContent?.trim();
            if (name && name.length > 2 && name.length < 80) {
              content.services.push({ name, description: '' });
            }
          });
        }
      });
    }
    
    // Extract testimonials
    const testimonialSelectors = [
      '#testimonials', '.testimonials', '[class*="testimonial"]', 
      '#reviews', '.reviews', '[class*="review"]', '.customer-reviews'
    ];
    
    for (const selector of testimonialSelectors) {
      try {
        const testimonialSection = document.querySelector(selector);
        if (testimonialSection) {
          const testimonialItems = testimonialSection.querySelectorAll('blockquote, .testimonial, .review, [class*="testimonial-item"], [class*="review-item"]');
          const testimonials = [...testimonialItems]
            .map(el => {
              const text = el.querySelector('p, .text, .content, .review-text')?.textContent?.trim() || 
                          el.textContent?.trim();
              const name = el.querySelector('.name, .author, cite, .customer-name, .reviewer')?.textContent?.trim() || 'Customer';
              return { text: text?.substring(0, 300), name };
            })
            .filter(t => t.text && t.text.length > 20);
          
          if (testimonials.length > 0) {
            content.testimonials = testimonials.slice(0, 5);
            break;
          }
        }
      } catch (e) { /* skip invalid selector */ }
    }
    
    // Extract phone number - multiple approaches
    // 1. Look for tel: links first (most reliable)
    const telLinks = document.querySelectorAll('a[href^="tel:"]');
    if (telLinks.length > 0) {
      // Get the first tel link that looks like a real number
      for (const link of telLinks) {
        const phone = link.href.replace('tel:', '').replace(/[+\-\s]/g, '').trim();
        if (phone.length >= 10) {
          content.phone = link.textContent?.trim() || phone;
          break;
        }
      }
    }
    
    // 2. Look for phone patterns in specific locations
    if (!content.phone) {
      const phoneContainers = document.querySelectorAll('header, .contact, footer, .phone, [class*="phone"], [class*="tel"]');
      for (const container of phoneContainers) {
        const match = container.textContent?.match(/(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
        if (match) {
          content.phone = match[0];
          break;
        }
      }
    }
    
    // 3. Fallback: Search entire page
    if (!content.phone) {
      const phonePatterns = document.body.innerText.match(/(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g);
      if (phonePatterns) {
        const phoneCounts = {};
        phonePatterns.forEach(p => phoneCounts[p] = (phoneCounts[p] || 0) + 1);
        content.phone = Object.entries(phoneCounts)
          .sort((a, b) => b[1] - a[1])[0]?.[0];
      }
    }
    
    // Extract email
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    if (emailLinks.length > 0) {
      content.email = emailLinks[0].href.replace('mailto:', '').split('?')[0].trim();
    }
    
    // Extract address
    const addressSelectors = ['address', '.address', '[itemprop="address"]', '[class*="address"]', '.location'];
    for (const selector of addressSelectors) {
      const addressEl = document.querySelector(selector);
      if (addressEl) {
        content.address = addressEl.textContent?.trim().replace(/\s+/g, ' ');
        if (content.address && content.address.length > 10) break;
      }
    }
    
    return content;
  }, config.extraction.maxContentLength);
}

/**
 * Extract social media links
 */
async function extractSocialLinks(page) {
  console.log('   🔗 Extracting social links...');
  
  return await page.evaluate(() => {
    const links = {};
    const socialPatterns = {
      facebook: /facebook\.com/,
      instagram: /instagram\.com/,
      twitter: /twitter\.com|x\.com/,
      linkedin: /linkedin\.com/,
      youtube: /youtube\.com/,
      yelp: /yelp\.com/,
      google: /google\.com\/maps|g\.page/
    };
    
    document.querySelectorAll('a[href]').forEach(a => {
      const href = a.href.toLowerCase();
      for (const [platform, pattern] of Object.entries(socialPatterns)) {
        if (!links[platform] && pattern.test(href)) {
          links[platform] = a.href;
        }
      }
    });
    
    return links;
  });
}

// ============================================================================
// TEMPLATE LOADING FUNCTIONS
// ============================================================================

/**
 * Load a template file from the templates/sites directory
 * @param {string} templateName - Name of the template file (e.g., 'saas-tech.html')
 * @returns {string} Template contents
 */
function loadTemplate(templateName) {
  const templatePath = path.join(__dirname, '..', 'templates', 'sites', templateName);
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template not found: ${templatePath}`);
  }
  return fs.readFileSync(templatePath, 'utf-8');
}

/**
 * Fill a template with variable values using Handlebars
 * @param {string} template - Template HTML with Handlebars syntax
 * @param {object} variables - Key-value pairs and arrays to use in template
 * @returns {string} Filled template
 */
function fillTemplate(template, variables) {
  // Register custom Handlebars helpers
  Handlebars.registerHelper('ifCond', function(v1, operator, v2, options) {
    switch (operator) {
      case '==': return (v1 == v2) ? options.fn(this) : options.inverse(this);
      case '===': return (v1 === v2) ? options.fn(this) : options.inverse(this);
      case '!=': return (v1 != v2) ? options.fn(this) : options.inverse(this);
      case '!==': return (v1 !== v2) ? options.fn(this) : options.inverse(this);
      case '<': return (v1 < v2) ? options.fn(this) : options.inverse(this);
      case '<=': return (v1 <= v2) ? options.fn(this) : options.inverse(this);
      case '>': return (v1 > v2) ? options.fn(this) : options.inverse(this);
      case '>=': return (v1 >= v2) ? options.fn(this) : options.inverse(this);
      case '&&': return (v1 && v2) ? options.fn(this) : options.inverse(this);
      case '||': return (v1 || v2) ? options.fn(this) : options.inverse(this);
      default: return options.inverse(this);
    }
  });

  // Helper to check array length
  Handlebars.registerHelper('hasItems', function(arr, options) {
    if (arr && Array.isArray(arr) && arr.length > 0) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  // Compile and execute template
  const compiledTemplate = Handlebars.compile(template);
  return compiledTemplate(variables);
}

/**
 * Generate SaaS template variables from extracted assets
 * @param {object} assets - Extracted site assets
 * @param {object} lead - Lead data (optional)
 * @param {object} intelligentCopy - AI-generated copy from copywriter (optional)
 * @param {object} research - Research findings (for trust signals, etc.)
 * @returns {object} Template variables
 */
function generateSaaSTemplateVariables(assets, lead = {}, intelligentCopy = null, research = null) {
  const businessName = assets.content.title || lead.businessName || lead.name || 'Company';
  const primaryColor = assets.colors.primary || '#6366f1';
  const primaryColorDark = assets.colors.primaryDark || darkenColor(primaryColor, 15) || '#4f46e5';
  const heroImage = findBestImage(assets.images, 'hero') || 
    `https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80`;
  
  // ============================================================================
  // USE INTELLIGENT COPY IF AVAILABLE
  // ============================================================================
  if (intelligentCopy) {
    console.log('   📝 Using AI-generated copy for template variables');
    
    // Get features from intelligent copy (NO FALLBACK - don't fabricate)
    const aiFeatures = intelligentCopy.features?.items || [];
    
    // Get REAL testimonials only - DO NOT FABRICATE
    // If copywriter returned fabricated ones, filter them out or respect the source
    const aiTestimonials = (intelligentCopy.testimonials?.items || []).filter(t => {
      // Filter out obviously fabricated testimonials (generic names/companies)
      const genericNames = ['Happy Customer', 'Satisfied Client', 'Power User', 'User'];
      const isGeneric = genericNames.includes(t.author) || genericNames.includes(t.name);
      return !isGeneric;
    });
    
    // Get how it works steps
    const aiSteps = intelligentCopy.howItWorks?.steps || [];
    
    // Get pricing (only if research confirms it exists)
    const aiPricing = intelligentCopy.pricing?.tiers || [];
    const hasPricing = research?.pricing?.hasPricing === true && aiPricing.length > 0;
    
    // Get trust signals from research (real awards, certifications, etc.)
    const trustSignals = research?.trustSignals || {};
    const realCertifications = trustSignals.certifications || [];
    const realStatistics = trustSignals.statistics || [];
    const customerLogos = trustSignals.customerLogos || [];
    
    // Build trust badges from REAL data only
    const trustBadges = [];
    realCertifications.forEach(cert => {
      trustBadges.push({ text: cert, icon: 'award' });
    });
    // Add a few statistics as badges if available
    realStatistics.slice(0, 2).forEach(stat => {
      trustBadges.push({ text: stat, icon: 'trending-up' });
    });
    
    // Extract user count from research if available - DON'T CLAIM IF UNKNOWN
    const userCountMatch = intelligentCopy.hero?.socialProof?.match(/[\d,]+/);
    const hasUserCount = userCountMatch && research?.trustSignals?.statistics?.some(s => 
      s.toLowerCase().includes('user') || s.toLowerCase().includes('customer') || s.toLowerCase().includes('compan')
    );
    
    // Check if free trial info is verified
    const hasFreeTrial = research?.pricing?.freeTrial && research.pricing.freeTrial !== null;
    const freeTrialDays = hasFreeTrial ? (research.pricing.freeTrial.match(/\d+/)?.[0] || '14') : null;
    
    // Build variables object
    const vars = {
      company_name: businessName,
      tagline: intelligentCopy.hero?.tagline || assets.content.tagline || 'The smarter way to grow',
      primary_color: primaryColor,
      primary_color_dark: primaryColorDark,
      logo_url: assets.logo?.url || '',
      cta_text: intelligentCopy.hero?.ctaPrimary || 'Get Started',
      hero_image: heroImage,
      headline: intelligentCopy.hero?.headline || 'Transform your workflow',
      headline_highlight: intelligentCopy.hero?.headlineHighlight || businessName,
      
      // CONDITIONAL: Only show user count if verified
      hasUserCount: hasUserCount,
      user_count: hasUserCount ? userCountMatch[0] : null,
      
      // CONDITIONAL: Only show free trial if verified
      hasFreeTrial: hasFreeTrial,
      free_trial_days: freeTrialDays,
      
      cta_benefit: intelligentCopy.hero?.tagline?.toLowerCase() || 'streamline their workflow',
      
      // Features - from AI copy
      features_headline: intelligentCopy.features?.sectionHeadline || 'Powerful Features',
      features_subheadline: intelligentCopy.features?.sectionSubheadline || 'Everything you need to succeed.',
      
      // ARRAY for Handlebars {{#each features}}
      features: aiFeatures.map((f, i) => ({
        title: f.title || f.name,
        description: f.description,
        icon: f.icon || 'check-circle'
      })),
      hasFeatures: aiFeatures.length > 0,
      
      // Individual features for backward compatibility
      feature_1_title: aiFeatures[0]?.title || aiFeatures[0]?.name || '',
      feature_1_description: aiFeatures[0]?.description || '',
      feature_2_title: aiFeatures[1]?.title || aiFeatures[1]?.name || '',
      feature_2_description: aiFeatures[1]?.description || '',
      feature_3_title: aiFeatures[2]?.title || aiFeatures[2]?.name || '',
      feature_3_description: aiFeatures[2]?.description || '',
      feature_4_title: aiFeatures[3]?.title || aiFeatures[3]?.name || '',
      feature_4_description: aiFeatures[3]?.description || '',
      
      // How it works - from AI copy
      how_it_works_subheadline: intelligentCopy.howItWorks?.sectionSubheadline || 'Three simple steps to success.',
      steps: aiSteps,
      hasSteps: aiSteps.length > 0,
      step_1_title: aiSteps[0]?.title || '',
      step_1_description: aiSteps[0]?.description || '',
      step_2_title: aiSteps[1]?.title || '',
      step_2_description: aiSteps[1]?.description || '',
      step_3_title: aiSteps[2]?.title || '',
      step_3_description: aiSteps[2]?.description || '',
      
      // Pricing - ONLY if verified to exist
      hasPricing: hasPricing,
      pricingTiers: hasPricing ? aiPricing : [],
      plan_1_name: aiPricing[0]?.name || '',
      plan_1_description: aiPricing[0]?.description || '',
      plan_1_price: hasPricing ? ((aiPricing[0]?.price || '0').replace(/[^\d]/g, '') || '0') : '',
      plan_1_feature_1: aiPricing[0]?.features?.[0] || '',
      plan_1_feature_2: aiPricing[0]?.features?.[1] || '',
      plan_1_feature_3: aiPricing[0]?.features?.[2] || '',
      plan_2_name: aiPricing[1]?.name || '',
      plan_2_description: aiPricing[1]?.description || '',
      plan_2_price: hasPricing ? ((aiPricing[1]?.price || '').replace(/[^\d]/g, '') || '') : '',
      plan_2_feature_1: aiPricing[1]?.features?.[0] || '',
      plan_2_feature_2: aiPricing[1]?.features?.[1] || '',
      plan_2_feature_3: aiPricing[1]?.features?.[2] || '',
      plan_2_feature_4: aiPricing[1]?.features?.[3] || '',
      plan_3_name: aiPricing[2]?.name || '',
      plan_3_description: aiPricing[2]?.description || '',
      plan_3_feature_1: aiPricing[2]?.features?.[0] || '',
      plan_3_feature_2: aiPricing[2]?.features?.[1] || '',
      plan_3_feature_3: aiPricing[2]?.features?.[2] || '',
      plan_3_feature_4: aiPricing[2]?.features?.[3] || '',
      
      // TESTIMONIALS - ONLY REAL ONES (no fabrication)
      hasTestimonials: aiTestimonials.length > 0,
      testimonials: aiTestimonials.map(t => ({
        quote: t.quote || t.text,
        name: t.author || t.name,
        title: [t.title, t.company].filter(Boolean).join(' at ') || '',
        avatar: t.avatar || null
      })),
      testimonial_1_quote: aiTestimonials[0]?.quote || aiTestimonials[0]?.text || '',
      testimonial_1_name: aiTestimonials[0]?.author || aiTestimonials[0]?.name || '',
      testimonial_1_title: aiTestimonials[0] ? ([aiTestimonials[0].title, aiTestimonials[0].company].filter(Boolean).join(' at ') || '') : '',
      testimonial_2_quote: aiTestimonials[1]?.quote || aiTestimonials[1]?.text || '',
      testimonial_2_name: aiTestimonials[1]?.author || aiTestimonials[1]?.name || '',
      testimonial_2_title: aiTestimonials[1] ? ([aiTestimonials[1].title, aiTestimonials[1].company].filter(Boolean).join(' at ') || '') : '',
      testimonial_3_quote: aiTestimonials[2]?.quote || aiTestimonials[2]?.text || '',
      testimonial_3_name: aiTestimonials[2]?.author || aiTestimonials[2]?.name || '',
      testimonial_3_title: aiTestimonials[2] ? ([aiTestimonials[2].title, aiTestimonials[2].company].filter(Boolean).join(' at ') || '') : '',
      
      // TRUST BADGES - Use REAL certifications/awards from research
      hasTrustBadges: trustBadges.length > 0,
      trustBadges: trustBadges,
      
      // LOGOS - Use real customer logos if available
      hasLogos: customerLogos.length > 0,
      logos: customerLogos.map(logo => ({
        url: logo,
        name: logo.split('/').pop()?.split('.')[0] || 'Customer'
      })),
      
      // Footer
      footer_description: intelligentCopy.footer?.description || intelligentCopy.hero?.tagline || 'The smarter way to work.',
      twitter_url: assets.socialLinks?.twitter || '#',
      linkedin_url: assets.socialLinks?.linkedin || '#',
      github_url: assets.socialLinks?.github || '#',
      privacy_url: '#',
      terms_url: '#',
      cookies_url: '#',
      current_year: new Date().getFullYear().toString()
    };
    
    return vars;
  }
  
  // ============================================================================
  // FALLBACK: USE EXTRACTED ASSETS (original logic)
  // ============================================================================
  console.log('   📝 Using extracted assets for template variables (no AI copy)');
  
  const tagline = assets.content.tagline || assets.content.heroText?.split('.')[0] || 'The smarter way to grow your business';
  
  // Extract headline from hero text or generate
  let headline = 'Transform your workflow with ';
  let headlineHighlight = businessName;
  if (assets.content.heroText) {
    const parts = assets.content.heroText.split(/[.!?]/)[0];
    if (parts.length > 10) {
      const words = parts.split(' ');
      if (words.length > 3) {
        headline = words.slice(0, -2).join(' ') + ' ';
        headlineHighlight = words.slice(-2).join(' ');
      } else {
        headline = parts + ' with ';
        headlineHighlight = businessName;
      }
    }
  }
  
  // Extract features - use only what exists, NO FABRICATION
  const services = assets.content.services || [];
  const features = services.map(s => ({
    title: s.name,
    description: s.description || '',
    icon: 'check-circle'
  }));
  
  // Extract testimonials - ONLY REAL ONES, NO FABRICATION
  const testimonials = assets.content.testimonials || [];
  
  // Get trust signals from research if available
  const trustSignals = research?.trustSignals || {};
  const realCertifications = trustSignals.certifications || [];
  const trustBadges = realCertifications.map(cert => ({
    text: cert,
    icon: 'award'
  }));
  
  return {
    company_name: businessName,
    tagline: tagline,
    primary_color: primaryColor,
    primary_color_dark: primaryColorDark,
    logo_url: assets.logo?.url || '',
    cta_text: 'Get Started',
    hero_image: heroImage,
    headline: headline,
    headline_highlight: headlineHighlight,
    
    // CONDITIONAL - don't claim user counts without evidence
    hasUserCount: false,
    user_count: null,
    
    // CONDITIONAL - don't claim free trial without evidence
    hasFreeTrial: false,
    free_trial_days: null,
    
    cta_benefit: 'streamline their workflow',
    
    // Features - use only what exists
    features_headline: 'Our Capabilities',
    features_subheadline: 'See what we can do for you.',
    features: features,
    hasFeatures: features.length > 0,
    feature_1_title: features[0]?.title || '',
    feature_1_description: features[0]?.description || '',
    feature_2_title: features[1]?.title || '',
    feature_2_description: features[1]?.description || '',
    feature_3_title: features[2]?.title || '',
    feature_3_description: features[2]?.description || '',
    feature_4_title: features[3]?.title || '',
    feature_4_description: features[3]?.description || '',
    
    // How it works - generic steps
    how_it_works_subheadline: 'Three simple steps to get started.',
    hasSteps: true,
    step_1_title: 'Get in Touch',
    step_1_description: 'Reach out to our team to discuss your needs.',
    step_2_title: 'We\'ll Help You',
    step_2_description: 'Our experts will work with you to find the right solution.',
    step_3_title: 'See Results',
    step_3_description: 'Experience the difference we can make.',
    
    // Pricing - HIDDEN if not verified
    hasPricing: false,
    pricingTiers: [],
    plan_1_name: '',
    plan_1_description: '',
    plan_1_price: '',
    plan_1_feature_1: '',
    plan_1_feature_2: '',
    plan_1_feature_3: '',
    plan_2_name: '',
    plan_2_description: '',
    plan_2_price: '',
    plan_2_feature_1: '',
    plan_2_feature_2: '',
    plan_2_feature_3: '',
    plan_2_feature_4: '',
    plan_3_name: '',
    plan_3_description: '',
    plan_3_feature_1: '',
    plan_3_feature_2: '',
    plan_3_feature_3: '',
    plan_3_feature_4: '',
    
    // Testimonials - ONLY REAL ONES
    hasTestimonials: testimonials.length > 0,
    testimonials: testimonials.map(t => ({
      quote: t.text,
      name: t.name,
      title: t.title || t.location || '',
      avatar: null
    })),
    testimonial_1_quote: testimonials[0]?.text || '',
    testimonial_1_name: testimonials[0]?.name || '',
    testimonial_1_title: testimonials[0]?.title || testimonials[0]?.location || '',
    testimonial_2_quote: testimonials[1]?.text || '',
    testimonial_2_name: testimonials[1]?.name || '',
    testimonial_2_title: testimonials[1]?.title || testimonials[1]?.location || '',
    testimonial_3_quote: testimonials[2]?.text || '',
    testimonial_3_name: testimonials[2]?.name || '',
    testimonial_3_title: testimonials[2]?.title || testimonials[2]?.location || '',
    
    // Trust badges - use REAL certifications
    hasTrustBadges: trustBadges.length > 0,
    trustBadges: trustBadges,
    
    // Logos
    hasLogos: false,
    logos: [],
    
    // Footer
    footer_description: tagline,
    twitter_url: assets.socialLinks?.twitter || '#',
    linkedin_url: assets.socialLinks?.linkedin || '#',
    github_url: assets.socialLinks?.github || '#',
    privacy_url: '#',
    terms_url: '#',
    cookies_url: '#',
    current_year: new Date().getFullYear().toString()
  };
}

// ============================================================================
// REVAMPED SITE GENERATOR
// ============================================================================

/**
 * Generate a modernized version of the website using extracted assets
 * 
 * @param {object} assets - Extracted site assets from extractSiteAssets()
 * @param {object} lead - Lead data (optional)
 * @param {object} intelligentCopy - AI-generated copy from copywriter (optional)
 * @param {object} classification - Pre-computed classification from classifier-agent (optional)
 *                                  If not provided, falls back to shallow detectBusinessType()
 * @param {object} research - Research findings for trust signals and verified data (optional)
 */
async function generateRevampedSite(assets, lead = {}, intelligentCopy = null, classification = null, research = null) {
  console.log('\n🔨 Generating revamped site...');
  
  const businessName = assets.content.title || lead.businessName || lead.name || 'Business';
  const category = lead.category || detectCategoryFromContent(assets.content);
  const city = lead.city || extractCityFromAddress(assets.content.address);
  const phone = formatPhone(assets.content.phone || lead.contact?.phone || lead.phone);
  const email = assets.content.email || lead.contact?.email || lead.email;
  
  // Use pre-computed classification if available, otherwise fall back to shallow detection
  let businessType, detection;
  if (classification && classification.category) {
    // Use deep classification from classifier-agent (post-research)
    businessType = classification.category;
    detection = {
      type: classification.category,
      confidence: Math.round(classification.confidence * 100),
      reasoning: classification.reasoning,
      keySignals: classification.keySignals,
      source: 'classifier-agent'
    };
    console.log(`\n🏷️  Business Type (Deep Classification):`);
    console.log(`   • Category: ${businessType.toUpperCase()}`);
    console.log(`   • Confidence: ${(classification.confidence * 100).toFixed(0)}%`);
    console.log(`   • Reasoning: ${classification.reasoning}`);
    console.log(`   • Key Signals: ${(classification.keySignals || []).join(', ')}`);
  } else {
    // Fallback to shallow detection (legacy behavior)
    console.log(`\n⚠️  No deep classification provided, using shallow detection...`);
    detection = detectBusinessType(assets.url, assets);
    businessType = detection.type;
    detection.source = 'shallow-detection';
    console.log(`\n🏢 Business Type (Shallow Detection):`);
    console.log(`   • Detected: ${businessType.toUpperCase()}`);
    console.log(`   • Confidence: ${detection.confidence}`);
    console.log(`   • Scores: ${JSON.stringify(detection.scores)}`);
  }
  
  const templateFile = templateMap[businessType];
  const ctaText = ctaTextMap[businessType];
  
  console.log(`   • Template: ${templateFile}`);
  console.log(`   • Primary CTA: "${ctaText.primary}"`);
  console.log(`   • Secondary CTA: "${ctaText.secondary}"`);
  console.log(`   • Using AI Copy: ${intelligentCopy ? '✅ Yes' : '❌ No (fallback)'}`);
  
  // ============================================================================
  // SaaS/Tech Template - Use dedicated template file
  // ============================================================================
  if (businessType === 'saas-tech') {
    console.log('\n📄 Loading SaaS template file...');
    try {
      const template = loadTemplate('saas-tech.html');
      const variables = generateSaaSTemplateVariables(assets, lead, intelligentCopy, research);
      const html = fillTemplate(template, variables);
      
      console.log('   ✅ SaaS template loaded and filled with ' + (intelligentCopy ? 'AI-generated copy' : 'extracted assets'));
      
      return {
        success: true,
        source: intelligentCopy ? 'revamp-generator-intelligent' : 'revamp-generator-saas-template',
        code: html,
        assets: assets,
        businessType: businessType,
        detection: detection,
        template: templateFile,
        usedIntelligentCopy: !!intelligentCopy
      };
    } catch (error) {
      console.log(`   ⚠️ Failed to load SaaS template: ${error.message}`);
      console.log('   ⚠️ Falling back to inline generation...');
      // Fall through to inline HTML generation
    }
  }
  
  // ============================================================================
  // Home Services & Other Templates - Inline HTML Generation
  // ============================================================================
  
  // Use extracted colors or generate defaults
  const colors = {
    primary: assets.colors.primary || '#2563eb',
    primaryDark: assets.colors.primaryDark || darkenColor(assets.colors.primary, 15) || '#1d4ed8',
    secondary: assets.colors.secondary || '#60a5fa',
    accent: assets.colors.accent || '#dbeafe',
    background: assets.colors.background || '#ffffff',
    text: assets.colors.text || '#1f2937'
  };
  
  // Use extracted fonts
  const fonts = {
    heading: assets.fonts.heading || 'Inter',
    body: assets.fonts.body || 'Inter'
  };
  
  // Get logo HTML
  const logoHtml = generateLogoHtml(assets.logo, businessName, colors.primary);
  
  // Get services
  const services = assets.content.services.length > 0 
    ? assets.content.services 
    : generateDefaultServices(category);
  
  // Get testimonials
  const testimonials = assets.content.testimonials.length > 0
    ? assets.content.testimonials
    : generateDefaultTestimonials(category, city);
  
  // Get hero image
  const heroImage = findBestImage(assets.images, 'hero') || 
    `https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80`;
  
  // Get about/team image  
  const aboutImage = findBestImage(assets.images, 'team') ||
    findBestImage(assets.images, 'general') ||
    `https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${businessName} | ${capitalize(category)} Services in ${city}</title>
  <meta name="description" content="${assets.content.tagline || assets.content.heroText || `${businessName} provides professional ${category} services in ${city}.`}">
  
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: '${colors.primary}',
            'primary-dark': '${colors.primaryDark}',
            secondary: '${colors.secondary}',
            accent: '${colors.accent}'
          }
        }
      }
    }
  </script>
  
  <!-- Lucide Icons -->
  <script src="https://unpkg.com/lucide@latest"></script>
  
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(fonts.heading)}:wght@400;500;600;700;800&family=${encodeURIComponent(fonts.body)}:wght@400;500;600&display=swap" rel="stylesheet">
  
  ${assets.favicon ? `<link rel="icon" href="${assets.favicon}" type="image/x-icon">` : ''}
  
  <style>
    body { font-family: '${fonts.body}', 'Inter', sans-serif; }
    h1, h2, h3, h4, h5, h6 { font-family: '${fonts.heading}', '${fonts.body}', sans-serif; }
    .hero-gradient {
      background: linear-gradient(135deg, ${colors.primary}ee 0%, ${colors.primaryDark}f5 100%);
    }
    .glass-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
    }
    /* Preserve their brand color feel */
    .brand-gradient {
      background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary || colors.primaryDark} 100%);
    }
  </style>
</head>
<body class="bg-gray-50 text-gray-800">

  <!-- Navigation -->
  <nav class="fixed w-full z-50 bg-white/90 backdrop-blur-md shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        ${logoHtml}
        
        <div class="hidden md:flex items-center space-x-8">
          <a href="#services" class="text-gray-600 hover:text-primary font-medium transition">Services</a>
          <a href="#about" class="text-gray-600 hover:text-primary font-medium transition">About</a>
          <a href="#reviews" class="text-gray-600 hover:text-primary font-medium transition">Reviews</a>
          <a href="#contact" class="text-gray-600 hover:text-primary font-medium transition">Contact</a>
        </div>
        
        <a href="tel:${phone.replace(/\D/g, '')}" class="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition shadow-lg shadow-primary/25">
          <i data-lucide="phone" class="w-5 h-5"></i>
          <span class="hidden sm:inline">${phone}</span>
          <span class="sm:hidden">Call</span>
        </a>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <header class="relative min-h-screen flex items-center">
    <div class="absolute inset-0">
      <img src="${heroImage}" alt="${category} services" class="w-full h-full object-cover">
      <div class="absolute inset-0 hero-gradient"></div>
    </div>
    
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-white">
      <div class="max-w-3xl">
        <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
          <i data-lucide="shield-check" class="w-5 h-5"></i>
          <span class="font-medium">Licensed & Insured</span>
        </div>
        
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
          ${assets.content.heroText && assets.content.heroText.length > 10 
            ? escapeHtml(assets.content.heroText.split('.')[0]) 
            : `Trusted ${capitalize(category)} Experts in ${city}`}
        </h1>
        
        <p class="text-xl sm:text-2xl opacity-90 mb-8 leading-relaxed">
          ${assets.content.tagline || assets.content.aboutText?.substring(0, 150) || `Professional ${category} services you can count on. Fast response, quality work, and fair prices guaranteed.`}
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4">
          ${businessType === 'saas-tech' ? `
          <a href="#contact" class="inline-flex items-center justify-center gap-3 bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition shadow-xl">
            <i data-lucide="rocket" class="w-6 h-6"></i>
            ${ctaText.primary}
          </a>
          <a href="#contact" class="inline-flex items-center justify-center gap-3 border-2 border-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-primary transition">
            <i data-lucide="calendar" class="w-6 h-6"></i>
            ${ctaText.secondary}
          </a>
          ` : businessType === 'restaurant' ? `
          <a href="#contact" class="inline-flex items-center justify-center gap-3 bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition shadow-xl">
            <i data-lucide="utensils" class="w-6 h-6"></i>
            ${ctaText.primary}
          </a>
          <a href="#contact" class="inline-flex items-center justify-center gap-3 border-2 border-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-primary transition">
            <i data-lucide="calendar-check" class="w-6 h-6"></i>
            ${ctaText.secondary}
          </a>
          ` : businessType === 'professional-services' ? `
          <a href="#contact" class="inline-flex items-center justify-center gap-3 bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition shadow-xl">
            <i data-lucide="calendar" class="w-6 h-6"></i>
            ${ctaText.primary}
          </a>
          <a href="tel:${phone.replace(/\D/g, '')}" class="inline-flex items-center justify-center gap-3 border-2 border-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-primary transition">
            <i data-lucide="phone-call" class="w-6 h-6"></i>
            ${phone}
          </a>
          ` : businessType === 'ecommerce' ? `
          <a href="#contact" class="inline-flex items-center justify-center gap-3 bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition shadow-xl">
            <i data-lucide="shopping-bag" class="w-6 h-6"></i>
            ${ctaText.primary}
          </a>
          <a href="#contact" class="inline-flex items-center justify-center gap-3 border-2 border-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-primary transition">
            <i data-lucide="package" class="w-6 h-6"></i>
            ${ctaText.secondary}
          </a>
          ` : `
          <a href="tel:${phone.replace(/\D/g, '')}" class="inline-flex items-center justify-center gap-3 bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition shadow-xl">
            <i data-lucide="phone-call" class="w-6 h-6"></i>
            ${ctaText.primary}: ${phone}
          </a>
          <a href="#contact" class="inline-flex items-center justify-center gap-3 border-2 border-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-primary transition">
            <i data-lucide="file-text" class="w-6 h-6"></i>
            ${ctaText.secondary}
          </a>
          `}
        </div>
      </div>
    </div>
    
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <i data-lucide="chevron-down" class="w-8 h-8 text-white/70"></i>
    </div>
  </header>

  <!-- Trust Badges -->
  <section class="bg-white py-6 border-y border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-wrap justify-center items-center gap-6 sm:gap-12">
        <div class="flex items-center gap-2">
          <div class="flex text-yellow-400">
            <i data-lucide="star" class="w-5 h-5 fill-current"></i>
            <i data-lucide="star" class="w-5 h-5 fill-current"></i>
            <i data-lucide="star" class="w-5 h-5 fill-current"></i>
            <i data-lucide="star" class="w-5 h-5 fill-current"></i>
            <i data-lucide="star" class="w-5 h-5 fill-current"></i>
          </div>
          <span class="font-bold text-gray-900">${lead.rating || '4.8'}</span>
          <span class="text-gray-500 text-sm">(${lead.reviewCount || '100+'} reviews)</span>
        </div>
        <div class="flex items-center gap-2 text-gray-600">
          <i data-lucide="shield-check" class="w-5 h-5 text-green-600"></i>
          <span class="font-medium">Licensed & Insured</span>
        </div>
        <div class="flex items-center gap-2 text-gray-600">
          <i data-lucide="clock" class="w-5 h-5 text-primary"></i>
          <span class="font-medium">Fast Response</span>
        </div>
        <div class="flex items-center gap-2 text-gray-600">
          <i data-lucide="map-pin" class="w-5 h-5 text-primary"></i>
          <span class="font-medium">Locally Owned</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Services Section -->
  <section id="services" class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <span class="inline-block bg-primary/10 text-primary font-semibold px-4 py-2 rounded-full text-sm mb-4">Our Services</span>
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What We Do</h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Professional ${category} services backed by years of experience and a commitment to quality.
        </p>
      </div>
      
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        ${services.slice(0, 6).map(service => `
        <div class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
          <div class="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-all duration-300">
            <i data-lucide="${getServiceIcon(service.name, category)}" class="w-7 h-7 text-primary group-hover:text-white transition-all duration-300"></i>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">${escapeHtml(service.name)}</h3>
          <p class="text-gray-600 leading-relaxed">${escapeHtml(service.description) || `Professional ${service.name.toLowerCase()} services with guaranteed satisfaction.`}</p>
        </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- About Section -->
  <section id="about" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span class="inline-block bg-primary/10 text-primary font-semibold px-4 py-2 rounded-full text-sm mb-4">Why Choose Us</span>
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            ${city}'s Most Trusted ${capitalize(category)} Professionals
          </h2>
          <p class="text-lg text-gray-600 mb-8 leading-relaxed">
            ${assets.content.aboutText || `At ${businessName}, we believe in doing things right the first time. Our team of skilled professionals is dedicated to providing exceptional service and lasting results.`}
          </p>
          
          <div class="grid sm:grid-cols-2 gap-6">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <i data-lucide="check-circle" class="w-5 h-5 text-green-600"></i>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900">Quality Guaranteed</h4>
                <p class="text-sm text-gray-600">100% satisfaction on every job</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <i data-lucide="users" class="w-5 h-5 text-blue-600"></i>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900">Expert Team</h4>
                <p class="text-sm text-gray-600">Trained & certified professionals</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <i data-lucide="zap" class="w-5 h-5 text-amber-600"></i>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900">Fast Service</h4>
                <p class="text-sm text-gray-600">Same-day service available</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <i data-lucide="badge-dollar-sign" class="w-5 h-5 text-purple-600"></i>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900">Fair Pricing</h4>
                <p class="text-sm text-gray-600">Upfront, honest quotes</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="relative">
          <img src="${aboutImage}" alt="${businessName} team" class="rounded-2xl shadow-2xl w-full object-cover" style="max-height: 500px;">
          <div class="absolute -bottom-6 -left-6 bg-primary text-white p-6 rounded-xl shadow-xl">
            <div class="text-4xl font-bold">${lead.yearsInBusiness || '10'}+</div>
            <div class="text-sm opacity-90">Years of Experience</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonials -->
  <section id="reviews" class="py-20 bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <span class="inline-block bg-white/10 text-white font-semibold px-4 py-2 rounded-full text-sm mb-4">Testimonials</span>
        <h2 class="text-3xl sm:text-4xl font-bold mb-4">What Our Customers Say</h2>
        <p class="text-xl text-gray-400">Join hundreds of satisfied customers in ${city}</p>
      </div>
      
      <div class="grid md:grid-cols-3 gap-8">
        ${testimonials.slice(0, 3).map(t => `
        <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <div class="flex text-yellow-400 mb-4">
            <i data-lucide="star" class="w-5 h-5 fill-current"></i>
            <i data-lucide="star" class="w-5 h-5 fill-current"></i>
            <i data-lucide="star" class="w-5 h-5 fill-current"></i>
            <i data-lucide="star" class="w-5 h-5 fill-current"></i>
            <i data-lucide="star" class="w-5 h-5 fill-current"></i>
          </div>
          <p class="text-gray-300 mb-6 leading-relaxed">"${escapeHtml(t.text)}"</p>
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
              <span class="text-primary font-bold">${(t.name || 'C').charAt(0)}</span>
            </div>
            <div>
              <div class="font-semibold">${escapeHtml(t.name || 'Customer')}</div>
              <div class="text-sm text-gray-400">${t.location || `${city}, UT`}</div>
            </div>
          </div>
        </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section id="contact" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-16">
        <div>
          <span class="inline-block bg-primary/10 text-primary font-semibold px-4 py-2 rounded-full text-sm mb-4">Contact Us</span>
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Get Your Free Quote Today</h2>
          <p class="text-lg text-gray-600 mb-8">
            Ready to get started? Contact us today for a free, no-obligation quote. Our team is standing by to help.
          </p>
          
          <div class="space-y-6">
            <a href="tel:${phone.replace(/\D/g, '')}" class="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-primary/5 transition group">
              <div class="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <i data-lucide="phone" class="w-6 h-6 text-white"></i>
              </div>
              <div>
                <div class="text-sm text-gray-500">Call us now</div>
                <div class="text-xl font-bold text-gray-900 group-hover:text-primary transition">${phone}</div>
              </div>
            </a>
            
            ${email ? `
            <a href="mailto:${email}" class="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-primary/5 transition group">
              <div class="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <i data-lucide="mail" class="w-6 h-6 text-white"></i>
              </div>
              <div>
                <div class="text-sm text-gray-500">Email us</div>
                <div class="text-lg font-bold text-gray-900 group-hover:text-primary transition">${email}</div>
              </div>
            </a>
            ` : ''}
            
            <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div class="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <i data-lucide="map-pin" class="w-6 h-6 text-white"></i>
              </div>
              <div>
                <div class="text-sm text-gray-500">Service Area</div>
                <div class="text-lg font-bold text-gray-900">${city} & Surrounding Areas</div>
              </div>
            </div>
          </div>
          
          ${Object.keys(assets.socialLinks).length > 0 ? `
          <div class="mt-8 flex gap-4">
            ${assets.socialLinks.facebook ? `<a href="${assets.socialLinks.facebook}" target="_blank" class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition"><i data-lucide="facebook" class="w-5 h-5"></i></a>` : ''}
            ${assets.socialLinks.instagram ? `<a href="${assets.socialLinks.instagram}" target="_blank" class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition"><i data-lucide="instagram" class="w-5 h-5"></i></a>` : ''}
            ${assets.socialLinks.twitter ? `<a href="${assets.socialLinks.twitter}" target="_blank" class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition"><i data-lucide="twitter" class="w-5 h-5"></i></a>` : ''}
            ${assets.socialLinks.youtube ? `<a href="${assets.socialLinks.youtube}" target="_blank" class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition"><i data-lucide="youtube" class="w-5 h-5"></i></a>` : ''}
            ${assets.socialLinks.yelp ? `<a href="${assets.socialLinks.yelp}" target="_blank" class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition"><i data-lucide="star" class="w-5 h-5"></i></a>` : ''}
          </div>
          ` : ''}
        </div>
        
        <div class="bg-gray-50 rounded-2xl p-8 lg:p-10">
          <h3 class="text-2xl font-bold text-gray-900 mb-6">Request a Quote</h3>
          <form class="space-y-6" onsubmit="event.preventDefault(); alert('Thanks! We\\'ll call you shortly.');">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
              <input type="text" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition" placeholder="John Smith">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input type="tel" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition" placeholder="(801) 555-0123">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email (Optional)</label>
              <input type="email" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition" placeholder="you@example.com">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">How Can We Help?</label>
              <textarea rows="4" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition resize-none" placeholder="Describe your project or issue..."></textarea>
            </div>
            <button type="submit" class="w-full bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-bold text-lg transition shadow-lg shadow-primary/25 flex items-center justify-center gap-2">
              <span>Get My Free Quote</span>
              <i data-lucide="arrow-right" class="w-5 h-5"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Banner -->
  <section class="py-16 brand-gradient">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
      <p class="text-xl text-white/80 mb-8">Call now for fast, reliable service from ${city}'s trusted ${category} experts.</p>
      <a href="tel:${phone.replace(/\D/g, '')}" class="inline-flex items-center justify-center gap-3 bg-white text-primary px-10 py-5 rounded-xl font-bold text-xl hover:bg-gray-100 transition shadow-xl">
        <i data-lucide="phone-call" class="w-7 h-7"></i>
        ${phone}
      </a>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-gray-900 text-gray-400 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid md:grid-cols-4 gap-8 mb-8">
        <div class="md:col-span-2">
          ${generateFooterLogoHtml(assets.logo, businessName)}
          <p class="text-gray-400 max-w-md mt-4">
            ${assets.content.tagline || `Professional ${category} services in ${city}. Licensed, insured, and committed to quality workmanship.`}
          </p>
        </div>
        
        <div>
          <h4 class="font-semibold text-white mb-4">Quick Links</h4>
          <ul class="space-y-2">
            <li><a href="#services" class="hover:text-white transition">Services</a></li>
            <li><a href="#about" class="hover:text-white transition">About Us</a></li>
            <li><a href="#reviews" class="hover:text-white transition">Reviews</a></li>
            <li><a href="#contact" class="hover:text-white transition">Contact</a></li>
          </ul>
        </div>
        
        <div>
          <h4 class="font-semibold text-white mb-4">Contact</h4>
          <ul class="space-y-2">
            <li><a href="tel:${phone.replace(/\D/g, '')}" class="hover:text-white transition">${phone}</a></li>
            ${email ? `<li><a href="mailto:${email}" class="hover:text-white transition">${email}</a></li>` : ''}
            <li>${city}, Utah</li>
          </ul>
        </div>
      </div>
      
      <div class="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>&copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.</p>
        <p class="text-sm">Licensed & Insured | Serving ${city} and surrounding areas</p>
      </div>
    </div>
  </footer>

  <!-- Initialize Lucide Icons -->
  <script>
    lucide.createIcons();
  </script>

</body>
</html>`;

  return {
    success: true,
    source: 'revamp-generator',
    code: html,
    assets: assets,
    businessType: businessType,
    detection: detection,
    template: templateFile
  };
}

/**
 * Generate logo HTML based on extracted logo
 */
function generateLogoHtml(logo, businessName, primaryColor) {
  if (logo && logo.url && !logo.svg) {
    // Use their actual logo
    return `
      <a href="#" class="flex items-center space-x-3">
        <img src="${logo.url}" alt="${businessName}" class="h-12 w-auto object-contain" style="max-width: 200px;">
      </a>
    `;
  } else if (logo && logo.svg) {
    // Use their SVG logo
    return `
      <a href="#" class="flex items-center space-x-3">
        <div class="h-12 w-auto">${logo.svg}</div>
      </a>
    `;
  } else {
    // Fallback to styled initial
    return `
      <a href="#" class="flex items-center space-x-3">
        <div class="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
          <span class="text-white font-bold text-2xl">${businessName.charAt(0)}</span>
        </div>
        <span class="font-bold text-xl text-gray-900">${businessName}</span>
      </a>
    `;
  }
}

/**
 * Generate footer logo HTML
 */
function generateFooterLogoHtml(logo, businessName) {
  if (logo && logo.url && !logo.svg) {
    return `
      <a href="#" class="flex items-center space-x-3">
        <img src="${logo.url}" alt="${businessName}" class="h-10 w-auto object-contain brightness-0 invert" style="max-width: 180px;">
      </a>
    `;
  } else {
    return `
      <div class="flex items-center space-x-2">
        <div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <span class="text-white font-bold text-xl">${businessName.charAt(0)}</span>
        </div>
        <span class="font-bold text-xl text-white">${businessName}</span>
      </div>
    `;
  }
}

/**
 * Find best image for a context
 */
function findBestImage(images, context) {
  const contextImage = images.find(img => img.context === context);
  if (contextImage) return contextImage.url;
  
  // Fallback to largest image
  const sorted = images.sort((a, b) => (b.width * b.height) - (a.width * a.height));
  return sorted[0]?.url;
}

/**
 * Detect category from extracted content
 */
function detectCategoryFromContent(content) {
  const searchText = [
    content.title || '',
    content.tagline || '',
    content.heroText || '',
    content.aboutText || '',
    content.services.map(s => s.name).join(' ')
  ].join(' ').toLowerCase();
  
  const categories = {
    'plumbing': ['plumb', 'drain', 'sewer', 'pipe', 'water heater', 'toilet', 'faucet'],
    'hvac': ['hvac', 'heating', 'cooling', 'air condition', 'furnace', 'duct'],
    'electrical': ['electric', 'wiring', 'panel', 'outlet'],
    'roofing': ['roof', 'shingle', 'gutter'],
    'landscaping': ['landscape', 'lawn', 'garden', 'tree'],
    'cleaning': ['clean', 'maid', 'janitor'],
    'dental': ['dentist', 'dental', 'orthodont'],
    'medical': ['doctor', 'medical', 'clinic', 'health']
  };
  
  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(kw => searchText.includes(kw))) {
      return category;
    }
  }
  
  return 'home services';
}

/**
 * Extract city from address
 */
function extractCityFromAddress(address) {
  if (!address) return 'Salt Lake City';
  
  const cityMatch = address.match(/,\s*([A-Za-z\s]+),?\s*(UT|Utah)/i);
  if (cityMatch) return cityMatch[1].trim();
  
  const utahCities = ['Salt Lake City', 'Provo', 'Ogden', 'Sandy', 'Orem', 'West Valley City', 'Layton', 'Park City', 'Murray', 'Draper'];
  for (const city of utahCities) {
    if (address.toLowerCase().includes(city.toLowerCase())) {
      return city;
    }
  }
  
  return 'Salt Lake City';
}

/**
 * Format phone number
 */
function formatPhone(phone) {
  if (!phone) return '(801) 555-0123';
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`;
  }
  if (digits.length === 11 && digits[0] === '1') {
    return `(${digits.slice(1,4)}) ${digits.slice(4,7)}-${digits.slice(7)}`;
  }
  return phone;
}

/**
 * Get service icon based on name and category
 */
function getServiceIcon(serviceName, category) {
  const name = serviceName.toLowerCase();
  
  const iconMap = {
    // Plumbing
    'water heater': 'flame',
    'drain': 'droplets',
    'sewer': 'waves',
    'emergency': 'siren',
    'toilet': 'bath',
    'faucet': 'droplet',
    'pipe': 'pipette',
    'remodel': 'home',
    'leak': 'droplet',
    'repair': 'wrench',
    'install': 'package-plus',
    'maintenance': 'settings',
    'inspection': 'search',
    // HVAC
    'heating': 'flame',
    'cooling': 'snowflake',
    'duct': 'wind',
    'furnace': 'thermometer',
    'air': 'fan',
    // Electrical
    'wiring': 'cable',
    'panel': 'layout-grid',
    'outlet': 'plug',
    'lighting': 'lightbulb'
  };
  
  for (const [keyword, icon] of Object.entries(iconMap)) {
    if (name.includes(keyword)) return icon;
  }
  
  // Category defaults
  const categoryDefaults = {
    'plumbing': 'wrench',
    'hvac': 'thermometer',
    'electrical': 'zap'
  };
  
  return categoryDefaults[category] || 'check-circle';
}

/**
 * Generate default services if none extracted
 */
function generateDefaultServices(category) {
  const defaults = {
    'plumbing': [
      { name: 'Drain Cleaning', description: 'Professional drain clearing and cleaning services.' },
      { name: 'Water Heater Service', description: 'Installation, repair, and maintenance of water heaters.' },
      { name: 'Emergency Repairs', description: '24/7 emergency plumbing services when you need them.' },
      { name: 'Leak Detection', description: 'Advanced leak detection and repair services.' },
      { name: 'Pipe Repair', description: 'Expert pipe repair and replacement services.' },
      { name: 'Bathroom Remodel', description: 'Complete bathroom plumbing for remodels.' }
    ],
    'hvac': [
      { name: 'AC Repair', description: 'Fast air conditioning repair and maintenance.' },
      { name: 'Heating Service', description: 'Furnace repair, installation, and tune-ups.' },
      { name: 'Duct Cleaning', description: 'Professional air duct cleaning services.' },
      { name: 'System Installation', description: 'New HVAC system installation and replacement.' },
      { name: 'Maintenance Plans', description: 'Regular maintenance to keep systems running efficiently.' },
      { name: 'Indoor Air Quality', description: 'Air filtration and purification solutions.' }
    ]
  };
  
  return defaults[category] || defaults['plumbing'];
}

/**
 * Generate default testimonials
 */
function generateDefaultTestimonials(category, city) {
  return [
    { text: `Outstanding service! They arrived quickly and fixed the problem right away. Highly recommend for anyone in ${city}.`, name: 'Sarah M.', location: `${city}, UT` },
    { text: `Professional, honest, and fairly priced. They explained everything and didn't try to upsell me on things I didn't need.`, name: 'Mike R.', location: `${city}, UT` },
    { text: `We've used them for years. Always reliable, always on time, and the quality of work is excellent.`, name: 'Jennifer K.', location: `${city}, UT` }
  ];
}

/**
 * Escape HTML characters
 */
function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Capitalize first letter of each word
 */
function capitalize(str) {
  return (str || '').replace(/\b\w/g, l => l.toUpperCase());
}

/**
 * Wait utility
 */
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ============================================================================
// MAIN GENERATOR FUNCTION
// ============================================================================

/**
 * Generate a revamped demo site
 */
async function generateRevampedDemo(input, options = {}) {
  let url, lead = {};
  
  // Determine if input is a URL or file path
  if (input.startsWith('http://') || input.startsWith('https://')) {
    url = input;
  } else if (fs.existsSync(input)) {
    // Load lead file
    lead = JSON.parse(fs.readFileSync(input, 'utf-8'));
    url = lead.website || `https://${lead.domain || lead.businessName?.toLowerCase().replace(/\s+/g, '') + '.com'}`;
  } else {
    throw new Error(`Invalid input: ${input}. Provide a URL or path to enriched lead JSON.`);
  }
  
  const businessName = lead.businessName || lead.name || new URL(url).hostname.replace('www.', '').split('.')[0];
  
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`  REVAMPING SITE: ${businessName}`);
  console.log(`  URL: ${url}`);
  console.log(`${'═'.repeat(60)}`);
  
  // Extract assets from their existing site
  const assets = await extractSiteAssets(url);
  
  // Check if we got enough to work with
  const hasEnoughAssets = assets.logo || assets.colors.primary || assets.content.services.length > 0;
  
  let result;
  let intelligentCopy = null;
  let classification = null;  // Deep classification from classifier-agent (after research)
  let research = null;        // Research findings for trust signals and verified data
  
  // ============================================================================
  // INTELLIGENT AGENT PIPELINE
  // ============================================================================
  if (!options.skipAgents) {
    console.log('\n' + '═'.repeat(60));
    console.log('  🤖 RUNNING INTELLIGENT AGENT PIPELINE');
    console.log('═'.repeat(60));
    
    try {
      // Step 1: Research Agent - Deep site analysis
      research = await researchWebsite(url, { model: options.model });
      
      // Save research output
      if (options.outputDir || config.outputDir) {
        const researchPath = path.join(
          options.outputDir || config.outputDir, 
          slugify(businessName), 
          'research.json'
        );
        fs.mkdirSync(path.dirname(researchPath), { recursive: true });
        fs.writeFileSync(researchPath, JSON.stringify(research, null, 2));
        console.log(`   📁 Research saved: ${researchPath}`);
      }
      
      // Step 1.5: Classifier Agent - Determine business type AFTER research
      // This uses deep insights from research (target audience, pricing model, 
      // delivery method) instead of shallow URL/keyword matching
      console.log('\n' + '─'.repeat(60));
      console.log('  🏷️  CLASSIFYING BUSINESS TYPE (post-research)');
      console.log('─'.repeat(60));
      
      classification = await classifyBusinessType(research, assets, { 
        model: options.model,
        verbose: options.verbose 
      });
      
      // Save classification output
      if (options.outputDir || config.outputDir) {
        const classificationPath = path.join(
          options.outputDir || config.outputDir,
          slugify(businessName),
          'classification.json'
        );
        fs.writeFileSync(classificationPath, JSON.stringify(classification, null, 2));
        console.log(`   📁 Classification saved: ${classificationPath}`);
      }
      
      // Step 2: Creative Director - Presentation strategy
      const brief = await createCreativeBrief(research, assets, { model: options.model });
      
      // Save brief output
      if (options.outputDir || config.outputDir) {
        const briefPath = path.join(
          options.outputDir || config.outputDir,
          slugify(businessName),
          'creative-brief.json'
        );
        fs.writeFileSync(briefPath, JSON.stringify(brief, null, 2));
        console.log(`   📁 Creative brief saved: ${briefPath}`);
      }
      
      // Step 3: Copywriter - Generate all copy
      const rawCopy = await generateCopy(research, brief, assets, { model: options.model });
      
      // Step 4: Validator - Check and fix gaps
      const validated = await validateAndRepair(rawCopy, research, { 
        model: options.model,
        verbose: options.verbose 
      });
      
      intelligentCopy = validated.copy;
      
      // Save copy output
      if (options.outputDir || config.outputDir) {
        const copyPath = path.join(
          options.outputDir || config.outputDir,
          slugify(businessName),
          'generated-copy.json'
        );
        fs.writeFileSync(copyPath, JSON.stringify({
          copy: intelligentCopy,
          validation: validated.validation,
          sectionsToRemove: validated.sectionsToRemove
        }, null, 2));
        console.log(`   📁 Generated copy saved: ${copyPath}`);
      }
      
      console.log('\n' + '─'.repeat(60));
      console.log('  ✅ AGENT PIPELINE COMPLETE');
      console.log('─'.repeat(60));
      
    } catch (agentError) {
      console.log(`\n⚠️ Agent pipeline failed: ${agentError.message}`);
      console.log('   Falling back to template-based generation...');
      intelligentCopy = null;
      classification = null;
    }
  }
  
  // ============================================================================
  // GENERATE SITE
  // ============================================================================
  if (hasEnoughAssets) {
    // Generate revamped site using their assets + intelligent copy + deep classification
    result = await generateRevampedSite(assets, lead, intelligentCopy, classification, research);
    console.log('\n✅ Generated revamped site using extracted assets' + (intelligentCopy ? ' + AI copy' : '') + (classification ? ' + deep classification' : ''));
  } else {
    // Fallback to generic template
    console.log('\n⚠️  Could not extract enough assets, falling back to template...');
    result = await generateLocalTemplate(lead, options);
  }
  
  // Save the generated code
  const slug = slugify(businessName);
  const outputDir = options.outputDir || config.outputDir;
  const outputPath = path.join(outputDir, slug);
  
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }
  
  const filePath = path.join(outputPath, 'index.html');
  fs.writeFileSync(filePath, result.code);
  console.log(`\n📁 Saved: ${filePath}`);
  
  // Save extracted assets for reference
  const assetsPath = path.join(outputPath, 'extracted-assets.json');
  fs.writeFileSync(assetsPath, JSON.stringify(assets, null, 2));
  console.log(`📁 Assets: ${assetsPath}`);
  
  // Take screenshots
  if (!options.noScreenshot) {
    await takeScreenshots(filePath, outputPath);
  }
  
  // Run QA Agent (if agent pipeline was used)
  let qaResult = null;
  if (intelligentCopy && !options.skipQA) {
    const researchPath = path.join(outputPath, 'research.json');
    const copyPath = path.join(outputPath, 'generated-copy.json');
    
    const research = fs.existsSync(researchPath) ? JSON.parse(fs.readFileSync(researchPath)) : {};
    const copy = fs.existsSync(copyPath) ? JSON.parse(fs.readFileSync(copyPath)) : {};
    
    qaResult = await runQA(outputPath, research, copy, { verbose: options.verbose });
  }
  
  // Save metadata
  const metadata = {
    businessName,
    slug,
    originalUrl: url,
    source: result.source,
    generatedAt: new Date().toISOString(),
    businessType: result.businessType || 'generic',
    detection: result.detection || null,
    classification: classification ? {
      category: classification.category,
      confidence: classification.confidence,
      reasoning: classification.reasoning,
      keySignals: classification.keySignals,
      source: 'classifier-agent'
    } : null,
    template: result.template || 'service-business.html',
    usedIntelligentCopy: result.usedIntelligentCopy || !!intelligentCopy,
    usedDeepClassification: !!classification,
    extractedAssets: {
      hasLogo: !!assets.logo,
      primaryColor: assets.colors.primary,
      servicesCount: assets.content.services.length,
      imagesCount: assets.images.length
    },
    agentPipeline: {
      ran: !!intelligentCopy,
      skipped: options.skipAgents || false
    }
  };
  
  fs.writeFileSync(
    path.join(outputPath, 'metadata.json'),
    JSON.stringify(metadata, null, 2)
  );
  
  console.log(`\n${'─'.repeat(60)}`);
  console.log(`  ✅ REVAMPED SITE GENERATED`);
  console.log(`${'─'.repeat(60)}`);
  console.log(`  📁 Location: ${outputPath}/`);
  console.log(`  🌐 Preview: file://${filePath}`);
  console.log(`  📦 Source: ${result.source}`);
  console.log(`  🏢 Business Type: ${result.businessType || 'generic'}`);
  if (classification) {
    console.log(`  🏷️  Classification: ${classification.category} (${(classification.confidence * 100).toFixed(0)}% confidence, deep)`);
  } else {
    console.log(`  🏷️  Classification: ${result.businessType || 'generic'} (shallow fallback)`);
  }
  console.log(`  📄 Template: ${result.template || 'service-business.html'}`);
  console.log(`  🤖 AI Copy: ${intelligentCopy ? '✅ Yes' : '❌ No'}`);
  if (qaResult) {
    const qaIcon = qaResult.passed ? '✅' : '⚠️';
    console.log(`  🔍 QA Score: ${qaIcon} ${qaResult.overallScore}/10${qaResult.issues?.length ? ` (${qaResult.issues.length} issues)` : ''}`);
  }
  console.log(`  🎨 Using their: ${[
    assets.logo ? 'logo' : null,
    assets.colors.primary ? 'colors' : null,
    assets.content.services.length > 0 ? 'services' : null
  ].filter(Boolean).join(', ') || 'template defaults'}`);
  console.log(`${'─'.repeat(60)}`);
  
  return {
    success: true,
    slug,
    outputPath,
    filePath,
    source: result.source,
    assets
  };
}

/**
 * Take screenshots of the generated page
 */
async function takeScreenshots(htmlPath, outputPath) {
  console.log('\n📸 Taking screenshots...');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Desktop screenshot
    await page.setViewport({ width: config.screenshotWidth, height: config.screenshotHeight });
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle2' });
    await wait(2000); // Wait for fonts and icons
    
    const desktopPath = path.join(outputPath, 'preview.png');
    await page.screenshot({ path: desktopPath, fullPage: false });
    console.log(`   ✅ Desktop: ${desktopPath}`);
    
    // Mobile screenshot
    await page.setViewport({ width: 375, height: 667 });
    await wait(500);
    
    const mobilePath = path.join(outputPath, 'preview-mobile.png');
    await page.screenshot({ path: mobilePath, fullPage: false });
    console.log(`   ✅ Mobile: ${mobilePath}`);
    
  } finally {
    await browser.close();
  }
}

// ============================================================================
// CLI ENTRY POINT
// ============================================================================

async function main() {
  const args = process.argv.slice(2);
  
  // Parse options
  const options = {
    noScreenshot: args.includes('--no-screenshot'),
    skipAgents: args.includes('--skip-agents'),
    skipQA: args.includes('--skip-qa'),
    verbose: args.includes('--verbose') || args.includes('-v')
  };
  
  // Get output dir if specified
  const outputIdx = args.indexOf('--output');
  if (outputIdx !== -1 && args[outputIdx + 1]) {
    options.outputDir = path.resolve(args[outputIdx + 1]);
  }
  
  // Get model if specified
  const modelIdx = args.indexOf('--model');
  if (modelIdx !== -1 && args[modelIdx + 1]) {
    options.model = args[modelIdx + 1];
  }
  
  // Get input (first non-flag argument)
  const input = args.find(a => !a.startsWith('--') && !a.startsWith('-'));
  
  if (!input) {
    console.log(`
Site Revamp Generator for SLC Lead Gen
=======================================

Creates modernized versions of existing websites using THEIR actual:
  • Logo
  • Color scheme  
  • Content
  • Images

🤖 NEW: Intelligent Agent Pipeline
  • Research Agent - Deeply analyzes the site
  • Creative Director - Plans presentation strategy
  • Copywriter - Generates compelling copy
  • Validator - Ensures quality output

The pitch: "Here's YOUR website, but modernized"

Usage:
  node services/revamp-generator.js <url-or-lead-file> [options]

Options:
  --output DIR      Custom output directory
  --no-screenshot   Skip screenshot generation
  --skip-agents     Skip AI agent pipeline (use template-based copy)
  --model MODEL     Claude model to use (default: claude-sonnet-4-20250514)
  --verbose, -v     Show detailed output

Examples:
  node services/revamp-generator.js https://joinrelay.app
  node services/revamp-generator.js https://beehiveplumbing.com
  node services/revamp-generator.js https://example.com --skip-agents
  node services/revamp-generator.js https://example.com --output ./custom-output

Output:
  Sites are saved to: output/demos/{business-slug}/
  Each site includes:
    - index.html            (revamped site)
    - preview.png           (desktop screenshot)
    - preview-mobile.png    (mobile screenshot)
    - extracted-assets.json (what we found on their site)
    - research.json         (deep site analysis from AI)
    - creative-brief.json   (presentation strategy)
    - generated-copy.json   (AI-generated copy)
    - metadata.json         (generation info)
`);
    process.exit(1);
  }
  
  try {
    const result = await generateRevampedDemo(input, options);
    console.log('\n🎉 Revamp complete!');
    console.log(`\nTo deploy to Vercel:`);
    console.log(`  cd ${result.outputPath} && vercel --prod`);
  } catch (error) {
    console.error(`\n❌ Generation failed: ${error.message}`);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  extractSiteAssets,
  generateRevampedDemo,
  generateRevampedSite,
  detectBusinessType,
  templateMap,
  ctaTextMap
};
