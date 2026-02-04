#!/usr/bin/env node
/**
 * Conversion Scorer - CTA & Contact Analysis
 * 
 * Evaluates how well a website converts visitors:
 * - Phone number visibility (critical for local businesses!)
 * - CTA buttons and placement
 * - Contact forms
 * - Click-to-call functionality
 * - Quote/booking options
 * - Chat widgets
 * 
 * Returns score 0-100 (higher = better conversion elements)
 */

const puppeteer = require('puppeteer');

// Phone number patterns
const PHONE_PATTERNS = [
  /\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g,  // Standard US: (801) 555-1234
  /1[-.\s]?\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/g, // With country code
  /\d{3}[-.\s]\d{4}/g  // Short format: 555-1234
];

// CTA keywords that indicate conversion intent
const CTA_KEYWORDS = [
  'call now', 'call us', 'call today',
  'get quote', 'get a quote', 'free quote', 'request quote',
  'free estimate', 'get estimate',
  'book now', 'book online', 'schedule', 'appointment',
  'contact us', 'contact now', 'get in touch',
  'learn more', 'get started', 'start now',
  'buy now', 'order now', 'shop now',
  'sign up', 'subscribe', 'join',
  'download', 'try free', 'free trial'
];

// Form field patterns
const FORM_FIELDS = [
  'name', 'email', 'phone', 'message', 'address',
  'company', 'service', 'budget', 'date', 'time'
];

/**
 * Analyze conversion elements on a page
 */
async function analyzeConversionElements(url, browser) {
  const page = await browser.newPage();
  
  try {
    await page.setViewport({ width: 1280, height: 800 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    
    await page.goto(url, { 
      waitUntil: 'networkidle2', 
      timeout: 30000 
    });
    
    const html = await page.content();
    const text = await page.evaluate(() => document.body.innerText);
    
    const analysis = await page.evaluate((ctaKeywords, formFields) => {
      // Find phone numbers and tel: links
      const telLinks = Array.from(document.querySelectorAll('a[href^="tel:"]'));
      const hasClickToCall = telLinks.length > 0;
      
      // Check phone visibility in header
      const header = document.querySelector('header, [class*="header"], [class*="nav"]');
      const headerText = header?.innerText || '';
      const phoneInHeader = /\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(headerText);
      
      // Find CTA buttons
      const buttons = Array.from(document.querySelectorAll('button, a[class*="btn"], a[class*="button"], [class*="cta"]'));
      const ctaButtons = buttons.filter(btn => {
        const text = btn.innerText.toLowerCase();
        return ctaKeywords.some(kw => text.includes(kw.toLowerCase()));
      });
      
      // CTA in hero/above fold
      const heroArea = document.querySelector('[class*="hero"], [class*="banner"], main > section:first-child, header + section');
      const heroCta = heroArea ? heroArea.querySelectorAll('button, a[class*="btn"], a[class*="button"]').length : 0;
      
      // Forms analysis
      const forms = Array.from(document.querySelectorAll('form'));
      const contactForms = forms.filter(form => {
        const formText = form.innerText.toLowerCase();
        const formHtml = form.innerHTML.toLowerCase();
        return formFields.some(field => formText.includes(field) || formHtml.includes(field));
      });
      
      // Quote/estimate forms specifically
      const quoteForm = forms.some(form => {
        const text = form.innerText.toLowerCase();
        return text.includes('quote') || text.includes('estimate') || text.includes('free');
      });
      
      // Chat widgets
      const hasChatWidget = !!(
        document.querySelector('[class*="chat"], [id*="chat"], [class*="messenger"]') ||
        document.querySelector('iframe[src*="intercom"], iframe[src*="drift"], iframe[src*="tawk"], iframe[src*="zendesk"]') ||
        window.Intercom || window.drift || window.$crisp
      );
      
      // Sticky elements (often contain CTAs)
      const hasStickyHeader = !!document.querySelector('[class*="sticky"], [class*="fixed"], header[style*="fixed"]');
      const hasStickyPhone = hasStickyHeader && phoneInHeader;
      
      // Social proof near CTAs
      const hasReviewsNearCta = !!(
        document.querySelector('[class*="review"], [class*="testimonial"], [class*="rating"]')
      );
      
      // Urgency indicators
      const urgencyText = document.body.innerText.toLowerCase();
      const hasUrgency = (
        urgencyText.includes('limited') ||
        urgencyText.includes('today only') ||
        urgencyText.includes('hurry') ||
        urgencyText.includes('ends soon') ||
        urgencyText.includes('available now')
      );
      
      // Multiple contact options
      const hasEmail = !!document.querySelector('a[href^="mailto:"]');
      const hasAddress = /\d+\s+[\w\s]+(?:street|st|avenue|ave|road|rd|drive|dr|way|lane|ln|boulevard|blvd)/i.test(document.body.innerText);
      const hasHours = /(?:mon|tue|wed|thu|fri|sat|sun)[a-z]*\s*[-:]\s*\d/i.test(document.body.innerText);
      
      return {
        hasClickToCall,
        phoneInHeader,
        telLinksCount: telLinks.length,
        ctaButtonsCount: ctaButtons.length,
        heroCta,
        formsCount: forms.length,
        contactFormsCount: contactForms.length,
        hasQuoteForm: quoteForm,
        hasChatWidget,
        hasStickyHeader,
        hasStickyPhone,
        hasReviewsNearCta,
        hasUrgency,
        hasEmail,
        hasAddress,
        hasHours,
        ctaTexts: ctaButtons.map(b => b.innerText.trim().substring(0, 50))
      };
    }, CTA_KEYWORDS, FORM_FIELDS);
    
    // Count phone numbers in text
    let phoneCount = 0;
    for (const pattern of PHONE_PATTERNS) {
      const matches = text.match(pattern) || [];
      phoneCount += matches.length;
    }
    analysis.phoneCount = phoneCount;
    
    // Find CTA keywords in text
    const textLower = text.toLowerCase();
    const ctaMatches = CTA_KEYWORDS.filter(kw => textLower.includes(kw.toLowerCase()));
    analysis.ctaKeywordsFound = ctaMatches;
    
    await page.close();
    return analysis;
    
  } catch (error) {
    await page.close();
    throw error;
  }
}

/**
 * Score conversion optimization
 */
async function scoreConversion(url, browser = null) {
  const result = {
    url,
    score: 0,
    issues: [],
    positives: [],
    details: {},
    error: null
  };
  
  if (!url) {
    result.error = 'No URL provided';
    return result;
  }
  
  // Normalize URL
  let normalizedUrl = url.trim();
  if (!normalizedUrl.startsWith('http')) {
    normalizedUrl = 'https://' + normalizedUrl;
  }
  
  const ownBrowser = !browser;
  
  try {
    if (ownBrowser) {
      browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
    }
    
    const analysis = await analyzeConversionElements(normalizedUrl, browser);
    result.details = analysis;
    
    let score = 0;
    
    // PHONE VISIBILITY - Critical for local businesses! (up to 30 points)
    if (analysis.phoneCount === 0) {
      result.issues.push('no phone number found');
    } else {
      score += 10;
      result.positives.push('phone number visible');
    }
    
    if (analysis.phoneInHeader) {
      score += 10;
      result.positives.push('phone in header');
    } else if (analysis.phoneCount > 0) {
      result.issues.push('phone not in header');
    }
    
    if (analysis.hasClickToCall) {
      score += 10;
      result.positives.push('click-to-call enabled');
    } else if (analysis.phoneCount > 0) {
      result.issues.push('no click-to-call links');
    }
    
    if (analysis.hasStickyPhone) {
      score += 5;
      result.positives.push('sticky phone number');
    }
    
    // CTA BUTTONS (up to 25 points)
    if (analysis.ctaButtonsCount === 0) {
      result.issues.push('no CTA buttons found');
    } else if (analysis.ctaButtonsCount >= 3) {
      score += 15;
      result.positives.push(`${analysis.ctaButtonsCount} CTA buttons`);
    } else {
      score += 8;
      result.positives.push('CTA buttons present');
    }
    
    if (analysis.heroCta > 0) {
      score += 10;
      result.positives.push('CTA above fold');
    } else {
      result.issues.push('no CTA above fold');
    }
    
    // CONTACT FORMS (up to 20 points)
    if (analysis.contactFormsCount > 0) {
      score += 10;
      result.positives.push('contact form');
    } else {
      result.issues.push('no contact form');
    }
    
    if (analysis.hasQuoteForm) {
      score += 10;
      result.positives.push('quote/estimate form');
    }
    
    // MODERN ENGAGEMENT (up to 15 points)
    if (analysis.hasChatWidget) {
      score += 10;
      result.positives.push('chat widget');
    }
    
    if (analysis.hasUrgency) {
      score += 5;
      result.positives.push('urgency messaging');
    }
    
    // COMPLETE CONTACT INFO (up to 10 points)
    if (analysis.hasEmail) {
      score += 3;
      result.positives.push('email contact');
    } else {
      result.issues.push('no email link');
    }
    
    if (analysis.hasAddress) {
      score += 4;
      result.positives.push('address visible');
    }
    
    if (analysis.hasHours) {
      score += 3;
      result.positives.push('hours displayed');
    }
    
    // Clamp score
    result.score = Math.max(0, Math.min(100, score));
    
    if (ownBrowser) {
      await browser.close();
    }
    
    return result;
    
  } catch (error) {
    result.error = error.message;
    result.score = 20; // Default low score
    
    if (ownBrowser && browser) {
      await browser.close();
    }
    
    return result;
  }
}

// CLI execution
if (require.main === module) {
  const url = process.argv[2];
  
  if (!url) {
    console.log('Usage: node conversion-scorer.js <url>');
    process.exit(1);
  }
  
  console.log(`\n📞 Conversion Scorer - Analyzing: ${url}\n`);
  
  scoreConversion(url).then(result => {
    console.log('Score:', result.score + '/100');
    console.log('\nPositives:', result.positives.join(', ') || 'None');
    console.log('Issues:', result.issues.join(', ') || 'None');
    
    if (result.details.ctaTexts?.length > 0) {
      console.log('\nCTAs found:', result.details.ctaTexts.slice(0, 5).join(', '));
    }
    
    if (result.error) {
      console.log('\nError:', result.error);
    }
  }).catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
  });
}

module.exports = { scoreConversion };
