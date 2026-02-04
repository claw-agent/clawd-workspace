#!/usr/bin/env node
/**
 * Content Scorer - Copy Quality & Freshness
 * 
 * Evaluates website content quality:
 * - Copy length and substance
 * - Content freshness (copyright dates, blog posts)
 * - Spelling/grammar indicators
 * - Value proposition clarity
 * - Service descriptions
 * - Local SEO content
 * 
 * Returns score 0-100 (higher = better content)
 */

const puppeteer = require('puppeteer');

// Quality content indicators
const QUALITY_INDICATORS = [
  { pattern: /years?\s*(?:of\s*)?experience/i, points: 3, feature: 'experience mentioned' },
  { pattern: /licensed|certified|insured|bonded/i, points: 5, feature: 'credentials mentioned' },
  { pattern: /guarantee|warranty/i, points: 3, feature: 'guarantees offered' },
  { pattern: /free\s*(?:quote|estimate|consultation)/i, points: 4, feature: 'free offers' },
  { pattern: /family[\s-]*owned|locally[\s-]*owned|veteran[\s-]*owned/i, points: 3, feature: 'ownership story' },
  { pattern: /serving\s+[\w\s,]+(?:area|county|region)/i, points: 3, feature: 'service area defined' },
  { pattern: /24[\s\/]*7|emergency|same[\s-]*day/i, points: 3, feature: 'availability mentioned' },
  { pattern: /satisfaction|100\s*%/i, points: 2, feature: 'satisfaction focus' },
];

// Low quality content indicators
const LOW_QUALITY_INDICATORS = [
  { pattern: /lorem\s*ipsum/i, penalty: 20, issue: 'placeholder text (lorem ipsum)' },
  { pattern: /click\s*here\s*to\s*edit|your\s*text\s*here|sample\s*text/i, penalty: 15, issue: 'template placeholder text' },
  { pattern: /powered\s*by\s*(wix|squarespace|godaddy|weebly)/i, penalty: 5, issue: 'builder branding visible' },
  { pattern: /copyright\s*©?\s*20(0\d|1[0-7])/i, penalty: 10, issue: 'outdated copyright' },
  { pattern: /all\s*rights\s*reserved.*template/i, penalty: 10, issue: 'template attribution' },
];

// Service-related keywords for local businesses
const SERVICE_KEYWORDS = [
  'repair', 'install', 'replace', 'maintain', 'service',
  'residential', 'commercial', 'emergency',
  'quote', 'estimate', 'consultation', 'inspection',
  'affordable', 'professional', 'quality', 'reliable'
];

/**
 * Analyze content quality
 */
async function analyzeContent(url, browser) {
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
    
    const analysis = await page.evaluate((serviceKeywords) => {
      const bodyText = document.body.innerText;
      const title = document.title || '';
      const metaDesc = document.querySelector('meta[name="description"]')?.content || '';
      const h1 = document.querySelector('h1')?.innerText || '';
      
      // Word count (rough)
      const words = bodyText.split(/\s+/).filter(w => w.length > 2).length;
      
      // Heading structure
      const h1Count = document.querySelectorAll('h1').length;
      const h2Count = document.querySelectorAll('h2').length;
      const h3Count = document.querySelectorAll('h3').length;
      
      // Paragraphs with substantial content
      const paragraphs = Array.from(document.querySelectorAll('p'));
      const substantialParagraphs = paragraphs.filter(p => p.innerText.split(/\s+/).length > 20).length;
      
      // Service pages or descriptions
      const serviceLinks = Array.from(document.querySelectorAll('a')).filter(a => {
        const text = a.innerText.toLowerCase();
        return serviceKeywords.some(kw => text.includes(kw));
      }).length;
      
      // Blog/news section
      const hasBlog = !!(
        document.querySelector('[class*="blog"], [class*="news"], [class*="article"]') ||
        document.querySelector('a[href*="blog"], a[href*="news"]')
      );
      
      // Recent dates (within last 2 years)
      const currentYear = new Date().getFullYear();
      const recentYears = [currentYear, currentYear - 1, currentYear - 2];
      const hasRecentContent = recentYears.some(year => bodyText.includes(year.toString()));
      
      // Copyright year
      const copyrightMatch = bodyText.match(/copyright\s*©?\s*(\d{4})/i);
      const copyrightYear = copyrightMatch ? parseInt(copyrightMatch[1]) : null;
      
      // About page link
      const hasAboutPage = !!document.querySelector('a[href*="about"]');
      
      // FAQ section
      const hasFaq = !!(
        document.querySelector('[class*="faq"], [class*="accordion"]') ||
        bodyText.toLowerCase().includes('frequently asked') ||
        bodyText.toLowerCase().includes('faq')
      );
      
      // Testimonials/reviews section
      const hasTestimonials = !!(
        document.querySelector('[class*="testimonial"], [class*="review"], [class*="quote"]')
      );
      
      // Location mentions (for local SEO)
      const locationPatterns = /salt\s*lake|slc|utah|provo|ogden|sandy|west\s*valley|orem/gi;
      const locationMentions = (bodyText.match(locationPatterns) || []).length;
      
      return {
        title,
        metaDesc,
        h1,
        wordCount: words,
        h1Count,
        h2Count,
        h3Count,
        substantialParagraphs,
        serviceLinksCount: serviceLinks,
        hasBlog,
        hasRecentContent,
        copyrightYear,
        hasAboutPage,
        hasFaq,
        hasTestimonials,
        locationMentions,
        hasMetaDesc: metaDesc.length > 50,
        hasTitleOptimized: title.length > 20 && title.length < 70
      };
    }, SERVICE_KEYWORDS);
    
    // Store full text for pattern matching
    analysis.fullText = text;
    analysis.html = html;
    
    await page.close();
    return analysis;
    
  } catch (error) {
    await page.close();
    throw error;
  }
}

/**
 * Score content quality
 */
async function scoreContent(url, browser = null) {
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
    
    const analysis = await analyzeContent(normalizedUrl, browser);
    
    // Remove full text/html from details (too large)
    const { fullText, html, ...cleanDetails } = analysis;
    result.details = cleanDetails;
    
    let score = 0;
    
    // CONTENT VOLUME (up to 20 points)
    if (analysis.wordCount < 100) {
      result.issues.push('very thin content');
    } else if (analysis.wordCount < 300) {
      score += 5;
      result.issues.push('limited content');
    } else if (analysis.wordCount < 800) {
      score += 10;
      result.positives.push('adequate content');
    } else {
      score += 20;
      result.positives.push('substantial content');
    }
    
    // STRUCTURE (up to 15 points)
    if (analysis.h1Count === 1) {
      score += 5;
      result.positives.push('proper H1 usage');
    } else if (analysis.h1Count === 0) {
      result.issues.push('no H1 heading');
    } else {
      result.issues.push('multiple H1 headings');
    }
    
    if (analysis.h2Count >= 2) {
      score += 5;
      result.positives.push('good heading structure');
    }
    
    if (analysis.substantialParagraphs >= 3) {
      score += 5;
      result.positives.push('well-developed paragraphs');
    }
    
    // SEO BASICS (up to 15 points)
    if (analysis.hasMetaDesc) {
      score += 5;
      result.positives.push('meta description present');
    } else {
      result.issues.push('missing/short meta description');
    }
    
    if (analysis.hasTitleOptimized) {
      score += 5;
      result.positives.push('optimized title');
    }
    
    if (analysis.locationMentions >= 2) {
      score += 5;
      result.positives.push('local SEO mentions');
    } else if (analysis.locationMentions === 0) {
      result.issues.push('no local keywords');
    }
    
    // FRESHNESS (up to 15 points)
    const currentYear = new Date().getFullYear();
    if (analysis.copyrightYear === currentYear) {
      score += 10;
      result.positives.push('current copyright');
    } else if (analysis.copyrightYear === currentYear - 1) {
      score += 5;
      result.positives.push('recent copyright');
    } else if (analysis.copyrightYear && analysis.copyrightYear < currentYear - 3) {
      result.issues.push(`outdated copyright (${analysis.copyrightYear})`);
    }
    
    if (analysis.hasRecentContent) {
      score += 5;
      result.positives.push('recent content dates');
    }
    
    // VALUE-ADD CONTENT (up to 20 points)
    if (analysis.hasBlog) {
      score += 8;
      result.positives.push('blog/news section');
    }
    
    if (analysis.hasFaq) {
      score += 7;
      result.positives.push('FAQ section');
    }
    
    if (analysis.hasTestimonials) {
      score += 5;
      result.positives.push('testimonials section');
    }
    
    // QUALITY PATTERNS (up to 15 points)
    for (const { pattern, points, feature } of QUALITY_INDICATORS) {
      if (pattern.test(fullText)) {
        score += points;
        result.positives.push(feature);
      }
    }
    
    // LOW QUALITY PENALTIES
    for (const { pattern, penalty, issue } of LOW_QUALITY_INDICATORS) {
      if (pattern.test(fullText) || pattern.test(html)) {
        score -= penalty;
        result.issues.push(issue);
      }
    }
    
    // Clamp score
    result.score = Math.max(0, Math.min(100, score));
    
    if (ownBrowser) {
      await browser.close();
    }
    
    return result;
    
  } catch (error) {
    result.error = error.message;
    result.score = 25;
    
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
    console.log('Usage: node content-scorer.js <url>');
    process.exit(1);
  }
  
  console.log(`\n📝 Content Scorer - Analyzing: ${url}\n`);
  
  scoreContent(url).then(result => {
    console.log('Score:', result.score + '/100');
    console.log('\nPositives:', result.positives.join(', ') || 'None');
    console.log('Issues:', result.issues.join(', ') || 'None');
    console.log('\nDetails:');
    console.log('  Word count:', result.details.wordCount);
    console.log('  Headings:', `H1:${result.details.h1Count} H2:${result.details.h2Count}`);
    
    if (result.error) {
      console.log('\nError:', result.error);
    }
  }).catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
  });
}

module.exports = { scoreContent };
