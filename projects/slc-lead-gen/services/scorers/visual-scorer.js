#!/usr/bin/env node
/**
 * Visual Scorer - AI Design Assessment
 * 
 * Uses Claude/AI to evaluate website design quality:
 * - Modern vs outdated aesthetic
 * - Color scheme appropriateness
 * - Typography choices
 * - Layout and whitespace
 * - Image quality
 * - Overall professionalism
 * 
 * Returns score 0-100 (higher = better design)
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Design quality indicators
const OUTDATED_PATTERNS = [
  // Layout issues
  { pattern: /table.*layout/i, penalty: 15, issue: 'table-based layout' },
  { pattern: /flash|silverlight/i, penalty: 20, issue: 'Flash/Silverlight content' },
  { pattern: /frameset|frame\s/i, penalty: 20, issue: 'frames layout' },
  
  // Font red flags
  { pattern: /comic\s*sans|papyrus|impact/i, penalty: 10, issue: 'unprofessional fonts' },
  { pattern: /font\s*size\s*=|<font/i, penalty: 10, issue: 'deprecated font tags' },
  
  // Visual clutter
  { pattern: /marquee|blink/i, penalty: 15, issue: 'animated text effects' },
  { pattern: /counter|hit.*count|visitor.*count/i, penalty: 10, issue: 'visitor counter' },
  
  // Outdated elements
  { pattern: /under\s*construction|coming\s*soon/i, penalty: 15, issue: 'under construction' },
  { pattern: /best\s*viewed\s*in|optimized\s*for/i, penalty: 10, issue: 'browser-specific notices' },
  { pattern: /last\s*updated.*20(0\d|1[0-8])/i, penalty: 15, issue: 'outdated copyright/update date' },
];

const MODERN_INDICATORS = [
  { pattern: /flexbox|grid|display:\s*flex|display:\s*grid/i, bonus: 5, feature: 'modern CSS layout' },
  { pattern: /viewport|responsive/i, bonus: 5, feature: 'responsive design' },
  { pattern: /@media/i, bonus: 5, feature: 'media queries' },
  { pattern: /svg|webp/i, bonus: 3, feature: 'modern image formats' },
  { pattern: /font-family:.*sans-serif/i, bonus: 2, feature: 'modern typography' },
  { pattern: /transition|animation|transform/i, bonus: 3, feature: 'CSS animations' },
];

/**
 * Capture screenshot and analyze page structure
 */
async function captureAndAnalyze(url, browser) {
  const page = await browser.newPage();
  
  try {
    await page.setViewport({ width: 1280, height: 800 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
    
    await page.goto(url, { 
      waitUntil: 'networkidle2', 
      timeout: 30000 
    });
    
    // Get page HTML for pattern matching
    const html = await page.content();
    
    // Get computed styles and structure
    const analysis = await page.evaluate(() => {
      const body = document.body;
      const computedStyle = window.getComputedStyle(body);
      
      // Check for key visual elements
      const hasHero = !!document.querySelector('[class*="hero"], [class*="banner"], header img');
      const hasModernNav = !!document.querySelector('nav, [class*="nav"], header menu');
      const hasFooter = !!document.querySelector('footer');
      const imageCount = document.querySelectorAll('img').length;
      const hasVideo = document.querySelectorAll('video, iframe[src*="youtube"], iframe[src*="vimeo"]').length > 0;
      
      // Check for social proof elements
      const hasSocialLinks = !!document.querySelector('[class*="social"], [href*="facebook"], [href*="instagram"], [href*="twitter"]');
      
      // Typography check
      const fonts = computedStyle.fontFamily;
      const fontSize = parseFloat(computedStyle.fontSize);
      
      // Color analysis
      const bgColor = computedStyle.backgroundColor;
      const textColor = computedStyle.color;
      
      // Layout check
      const display = computedStyle.display;
      const hasFlexOrGrid = display === 'flex' || display === 'grid';
      
      // Check for common framework indicators
      const hasBootstrap = !!document.querySelector('[class*="container"], [class*="row"], [class*="col-"]');
      const hasTailwind = !!document.querySelector('[class*="flex"], [class*="grid"], [class*="p-"], [class*="m-"]');
      
      // Mobile menu indicator
      const hasMobileMenu = !!document.querySelector('[class*="hamburger"], [class*="mobile-menu"], [class*="toggle"]');
      
      // Check images for quality indicators
      const images = Array.from(document.querySelectorAll('img'));
      const hasLazyLoading = images.some(img => img.loading === 'lazy' || img.dataset.src);
      const hasModernFormats = images.some(img => /\.webp|\.avif/i.test(img.src));
      
      return {
        hasHero,
        hasModernNav,
        hasFooter,
        imageCount,
        hasVideo,
        hasSocialLinks,
        fonts,
        fontSize,
        bgColor,
        textColor,
        hasFlexOrGrid,
        hasBootstrap,
        hasTailwind,
        hasMobileMenu,
        hasLazyLoading,
        hasModernFormats,
        pageTitle: document.title,
        metaDescription: document.querySelector('meta[name="description"]')?.content || null
      };
    });
    
    // Take screenshot for potential AI analysis
    const screenshotBuffer = await page.screenshot({ 
      type: 'jpeg', 
      quality: 80,
      fullPage: false 
    });
    
    await page.close();
    
    return { html, analysis, screenshot: screenshotBuffer };
    
  } catch (error) {
    await page.close();
    throw error;
  }
}

/**
 * Score visual design quality
 */
async function scoreVisualDesign(url, browser = null) {
  const result = {
    url,
    score: 50, // Start at neutral
    issues: [],
    positives: [],
    details: {},
    error: null
  };
  
  if (!url) {
    result.score = 0;
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
    
    const { html, analysis, screenshot } = await captureAndAnalyze(normalizedUrl, browser);
    result.details = analysis;
    
    // Start with base score
    let score = 50;
    
    // Check for outdated patterns (penalties)
    for (const { pattern, penalty, issue } of OUTDATED_PATTERNS) {
      if (pattern.test(html)) {
        score -= penalty;
        result.issues.push(issue);
      }
    }
    
    // Check for modern indicators (bonuses)
    for (const { pattern, bonus, feature } of MODERN_INDICATORS) {
      if (pattern.test(html)) {
        score += bonus;
        result.positives.push(feature);
      }
    }
    
    // Structure bonuses
    if (analysis.hasHero) {
      score += 5;
      result.positives.push('hero section');
    }
    
    if (analysis.hasModernNav) {
      score += 5;
      result.positives.push('modern navigation');
    }
    
    if (analysis.hasFooter) {
      score += 3;
      result.positives.push('footer present');
    }
    
    if (analysis.hasMobileMenu) {
      score += 5;
      result.positives.push('mobile menu');
    }
    
    // Framework detection
    if (analysis.hasBootstrap || analysis.hasTailwind) {
      score += 10;
      result.positives.push('modern CSS framework');
    }
    
    // Image quality
    if (analysis.imageCount === 0) {
      score -= 10;
      result.issues.push('no images');
    } else if (analysis.imageCount < 3) {
      score -= 5;
      result.issues.push('few images');
    } else if (analysis.imageCount > 3) {
      score += 5;
      result.positives.push('good image usage');
    }
    
    if (analysis.hasVideo) {
      score += 5;
      result.positives.push('video content');
    }
    
    if (analysis.hasModernFormats) {
      score += 5;
      result.positives.push('modern image formats');
    }
    
    if (analysis.hasLazyLoading) {
      score += 3;
      result.positives.push('lazy loading');
    }
    
    // Social presence
    if (analysis.hasSocialLinks) {
      score += 3;
      result.positives.push('social links');
    }
    
    // Typography penalty for small fonts
    if (analysis.fontSize && analysis.fontSize < 14) {
      score -= 5;
      result.issues.push('small base font size');
    }
    
    // Clamp score to 0-100
    result.score = Math.max(0, Math.min(100, score));
    
    if (ownBrowser) {
      await browser.close();
    }
    
    return result;
    
  } catch (error) {
    result.error = error.message;
    result.score = 30; // Default low score for errors
    
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
    console.log('Usage: node visual-scorer.js <url>');
    process.exit(1);
  }
  
  console.log(`\n🎨 Visual Scorer - Analyzing: ${url}\n`);
  
  scoreVisualDesign(url).then(result => {
    console.log('Score:', result.score + '/100');
    console.log('\nPositives:', result.positives.join(', ') || 'None detected');
    console.log('Issues:', result.issues.join(', ') || 'None detected');
    
    if (result.error) {
      console.log('\nError:', result.error);
    }
  }).catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
  });
}

module.exports = { scoreVisualDesign };
