#!/usr/bin/env node
/**
 * Trust Signals Scorer for SLC Lead Gen
 * 
 * Scans websites for trust indicators that signal a legitimate, established business.
 * Used to prioritize leads and identify red flags.
 * 
 * Usage: node trust-scorer.js "https://example.com"
 */

const puppeteer = require('puppeteer');

// ============================================================================
// CONFIGURATION
// ============================================================================

const TRUST_WEIGHTS = {
  ssl: 10,                    // HTTPS is table stakes
  bbbBadge: 8,                // BBB accreditation
  licenseDisplayed: 12,       // Shows license number
  insuranceMentioned: 8,      // Mentions insurance coverage
  bondedMentioned: 5,         // Mentions being bonded
  yearsInBusiness: 10,        // Shows longevity
  teamPhotos: 6,              // Real team photos
  ownerInfo: 7,               // Owner/founder visible
  physicalAddress: 10,        // Real address displayed
  googleReviews: 8,           // Google reviews widget
  yelpBadge: 5,               // Yelp integration
  certifications: 8,          // Industry certs (NATE, EPA, etc.)
  manufacturerPartners: 6,    // Brand partnerships
  awards: 4,                  // Awards/recognition
  associations: 5,            // Professional associations
};

const MAX_SCORE = Object.values(TRUST_WEIGHTS).reduce((a, b) => a + b, 0);

// ============================================================================
// DETECTION PATTERNS
// ============================================================================

const PATTERNS = {
  // License patterns for various trades
  license: [
    /license\s*#?\s*:?\s*([A-Z0-9-]{4,15})/gi,
    /lic\s*#?\s*:?\s*([A-Z0-9-]{4,15})/gi,
    /contractor\s*license\s*#?\s*:?\s*([A-Z0-9-]{4,15})/gi,
    /licensed\s+&?\s*insured/gi,
    /state\s+licen[sc]ed/gi,
    /fully\s+licen[sc]ed/gi,
  ],
  
  // Insurance patterns
  insurance: [
    /fully\s+insured/gi,
    /licensed\s+(&|and)\s+insured/gi,
    /insured\s+(&|and)\s+bonded/gi,
    /liability\s+insurance/gi,
    /workers['']?\s*comp(ensation)?/gi,
    /we(\s+are)?\s+insured/gi,
  ],
  
  // Bonded patterns
  bonded: [
    /fully\s+bonded/gi,
    /licensed,?\s+insured,?\s+(&|and)\s+bonded/gi,
    /bonded\s+(&|and)\s+insured/gi,
    /we(\s+are)?\s+bonded/gi,
  ],
  
  // Years in business patterns
  yearsInBusiness: [
    /(\d+)\+?\s*years?\s+(of\s+)?(experience|in\s+business|serving)/gi,
    /since\s+(\d{4})/gi,
    /established\s+(\d{4})/gi,
    /founded\s+(in\s+)?(\d{4})/gi,
    /serving\s+.{0,30}\s+since\s+(\d{4})/gi,
    /over\s+(\d+)\s*years/gi,
    /(\d+)\s*years?\s+strong/gi,
  ],
  
  // Physical address patterns
  address: [
    /\d{1,5}\s+[\w\s]{1,30}\s+(street|st|avenue|ave|road|rd|boulevard|blvd|drive|dr|lane|ln|way|court|ct|circle|cir)\s*,?\s*[\w\s]+,?\s*(UT|Utah)\s*\d{5}/gi,
    /salt\s+lake\s+(city|county)/gi,
    /\b(Murray|Sandy|Draper|West\s+Jordan|South\s+Jordan|Taylorsville|Midvale|Cottonwood|Holladay|Millcreek|Riverton|Herriman|Bluffdale|Lehi|American\s+Fork|Provo|Orem|Ogden|Layton|Bountiful)\b/gi,
  ],
  
  // Certifications
  certifications: {
    nate: /\bNATE\b\s*(certified)?/gi,
    epa: /\bEPA\b\s*(certified|certification|section\s+608)?/gi,
    energyStar: /\bENERGY\s*STAR\b/gi,
    bpi: /\bBPI\b\s*(certified)?/gi,
    acca: /\bACCA\b/gi,
    nadca: /\bNADCA\b/gi,
    rses: /\bRSES\b/gi,
    usgbc: /\bUSGBC\b|LEED/gi,
    osha: /\bOSHA\b/gi,
  },
  
  // HVAC/Trade manufacturer partnerships
  manufacturers: {
    carrier: /\bCarrier\b\s*(dealer|partner|factory\s+authorized)?/gi,
    trane: /\bTrane\b\s*(dealer|comfort\s+specialist)?/gi,
    lennox: /\bLennox\b\s*(dealer|premier)?/gi,
    bryant: /\bBryant\b\s*(dealer|factory\s+authorized)?/gi,
    rheem: /\bRheem\b\s*(pro\s+partner|dealer)?/gi,
    goodman: /\bGoodman\b/gi,
    american_standard: /\bAmerican\s+Standard\b/gi,
    daikin: /\bDaikin\b/gi,
    mitsubishi: /\bMitsubishi\b\s*(electric|diamond)?/gi,
    fujitsu: /\bFujitsu\b/gi,
    bosch: /\bBosch\b/gi,
    york: /\bYork\b/gi,
  },
  
  // Awards and recognition
  awards: [
    /award[-\s]?winning/gi,
    /best\s+of\s+(salt\s+lake|\w+)\s+\d{4}/gi,
    /top\s+rated/gi,
    /\#?1\s+(rated|hvac|contractor)/gi,
    /excellence\s+award/gi,
    /president['']s\s+(award|club)/gi,
    /angi(\s+super\s+service|\s+award|['']s\s+list)?/gi,
    /home\s*advisor\s+(elite|top\s+rated|screened)/gi,
  ],
  
  // Professional associations
  associations: [
    /chamber\s+of\s+commerce/gi,
    /\bBBB\b|better\s+business\s+bureau/gi,
    /\bPHCC\b/gi,
    /\bASHRAE\b/gi,
    /\bSMACNA\b/gi,
    /home\s+builders\s+association/gi,
    /contractor['']?s?\s+association/gi,
  ],
  
  // Team/staff indicators
  team: [
    /meet\s+(the|our)\s+team/gi,
    /our\s+team/gi,
    /about\s+us/gi,
    /our\s+technicians?/gi,
    /our\s+staff/gi,
    /our\s+experts?/gi,
  ],
  
  // Owner/founder indicators
  owner: [
    /owner/gi,
    /founder/gi,
    /president/gi,
    /ceo/gi,
    /family[\s-]owned/gi,
    /family[\s-]operated/gi,
    /locally[\s-]owned/gi,
    /veteran[\s-]owned/gi,
    /woman[\s-]owned/gi,
  ],
};

// ============================================================================
// TRUST SCORER CLASS
// ============================================================================

class TrustScorer {
  constructor(options = {}) {
    this.options = {
      timeout: 30000,
      waitForNetworkIdle: true,
      followLinks: ['about', 'team', 'contact'],
      ...options
    };
  }

  /**
   * Score a website for trust signals
   * @param {string} url - The URL to analyze
   * @returns {Promise<Object>} Trust score results
   */
  async score(url) {
    const startTime = Date.now();
    let browser;
    
    try {
      // Normalize URL
      if (!url.startsWith('http')) {
        url = 'https://' + url;
      }
      
      browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      
      const page = await browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
      await page.setViewport({ width: 1920, height: 1080 });
      
      // Navigate to main page
      const response = await page.goto(url, {
        waitUntil: this.options.waitForNetworkIdle ? 'networkidle2' : 'domcontentloaded',
        timeout: this.options.timeout
      });
      
      // Initialize results
      const signals = {
        ssl: false,
        bbbBadge: false,
        licenseDisplayed: false,
        licenseNumber: null,
        insuranceMentioned: false,
        bondedMentioned: false,
        yearsInBusiness: null,
        establishedYear: null,
        teamPhotos: false,
        ownerInfo: false,
        physicalAddress: false,
        addressFound: null,
        googleReviews: false,
        yelpBadge: false,
        reviewWidgets: [],
        certifications: [],
        manufacturerPartners: [],
        awards: false,
        awardMentions: [],
        associations: [],
      };
      
      const issues = [];
      
      // Check SSL
      signals.ssl = url.startsWith('https://') && response.ok();
      if (!signals.ssl) {
        issues.push('No SSL/HTTPS');
      }
      
      // Get page content
      const pageData = await this.extractPageData(page);
      
      // Also check key subpages
      const subpageData = await this.checkSubpages(page, url);
      const allContent = pageData.text + ' ' + subpageData.text;
      const allHtml = pageData.html + ' ' + subpageData.html;
      
      // Analyze content for trust signals
      this.analyzeLicense(allContent, signals, issues);
      this.analyzeInsurance(allContent, signals, issues);
      this.analyzeBonded(allContent, signals);
      this.analyzeYearsInBusiness(allContent, signals, issues);
      this.analyzeAddress(allContent, signals, issues);
      this.analyzeCertifications(allContent, signals);
      this.analyzeManufacturers(allContent, signals);
      this.analyzeAwards(allContent, signals);
      this.analyzeAssociations(allContent, signals, issues);
      await this.analyzeTeamPhotos(page, pageData.html, subpageData.html, signals, issues);
      this.analyzeOwnerInfo(allContent, signals, issues);
      await this.analyzeReviewWidgets(page, allHtml, signals, issues);
      await this.analyzeBBB(page, allHtml, signals, issues);
      
      // Calculate final score
      const { trustScore, trustLevel } = this.calculateScore(signals);
      
      const duration = Date.now() - startTime;
      
      return {
        url,
        trustScore,
        trustLevel,
        signals,
        issues,
        meta: {
          scannedAt: new Date().toISOString(),
          durationMs: duration,
          pagesScanned: 1 + subpageData.pagesScanned
        }
      };
      
    } catch (error) {
      return {
        url,
        trustScore: 0,
        trustLevel: 'error',
        signals: {},
        issues: [`Scan failed: ${error.message}`],
        error: error.message,
        meta: {
          scannedAt: new Date().toISOString(),
          durationMs: Date.now() - startTime
        }
      };
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }

  /**
   * Extract text and HTML from page
   */
  async extractPageData(page) {
    const text = await page.evaluate(() => document.body?.innerText || '');
    const html = await page.content();
    return { text, html };
  }

  /**
   * Check common subpages for additional signals
   */
  async checkSubpages(page, baseUrl) {
    const subpages = ['about', 'about-us', 'team', 'our-team', 'contact', 'about-company'];
    let combinedText = '';
    let combinedHtml = '';
    let pagesScanned = 0;
    
    const baseUrlObj = new URL(baseUrl);
    
    for (const subpage of subpages) {
      try {
        const subpageUrl = new URL(`/${subpage}`, baseUrlObj.origin).href;
        const response = await page.goto(subpageUrl, {
          waitUntil: 'domcontentloaded',
          timeout: 10000
        });
        
        if (response.ok()) {
          const data = await this.extractPageData(page);
          combinedText += ' ' + data.text;
          combinedHtml += ' ' + data.html;
          pagesScanned++;
        }
      } catch (e) {
        // Subpage doesn't exist or failed - that's fine
      }
    }
    
    // Navigate back to original page
    try {
      await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 10000 });
    } catch (e) {}
    
    return { text: combinedText, html: combinedHtml, pagesScanned };
  }

  /**
   * Check for license display
   */
  analyzeLicense(content, signals, issues) {
    for (const pattern of PATTERNS.license) {
      const match = content.match(pattern);
      if (match) {
        signals.licenseDisplayed = true;
        // Try to extract actual license number
        const numMatch = content.match(/license\s*#?\s*:?\s*([A-Z0-9-]{4,15})/i);
        if (numMatch) {
          signals.licenseNumber = numMatch[1];
        }
        return;
      }
    }
    issues.push('No license number displayed');
  }

  /**
   * Check for insurance mentions
   */
  analyzeInsurance(content, signals, issues) {
    for (const pattern of PATTERNS.insurance) {
      if (pattern.test(content)) {
        signals.insuranceMentioned = true;
        return;
      }
    }
    issues.push('No insurance mentioned');
  }

  /**
   * Check for bonded mentions
   */
  analyzeBonded(content, signals) {
    for (const pattern of PATTERNS.bonded) {
      if (pattern.test(content)) {
        signals.bondedMentioned = true;
        return;
      }
    }
  }

  /**
   * Extract years in business
   */
  analyzeYearsInBusiness(content, signals, issues) {
    const currentYear = new Date().getFullYear();
    
    // Check "since YYYY" patterns
    const sinceMatch = content.match(/since\s+(\d{4})/i) ||
                       content.match(/established\s+(\d{4})/i) ||
                       content.match(/founded\s+(in\s+)?(\d{4})/i);
    if (sinceMatch) {
      const year = parseInt(sinceMatch[1] || sinceMatch[2]);
      if (year >= 1950 && year <= currentYear) {
        signals.establishedYear = year;
        signals.yearsInBusiness = currentYear - year;
        return;
      }
    }
    
    // Check "X years" patterns
    const yearsMatch = content.match(/(\d+)\+?\s*years?\s+(of\s+)?(experience|in\s+business|serving)/i) ||
                       content.match(/over\s+(\d+)\s*years/i);
    if (yearsMatch) {
      const years = parseInt(yearsMatch[1]);
      if (years >= 1 && years <= 100) {
        signals.yearsInBusiness = years;
        signals.establishedYear = currentYear - years;
        return;
      }
    }
    
    issues.push('No years in business mentioned');
  }

  /**
   * Check for physical address
   */
  analyzeAddress(content, signals, issues) {
    // Look for Utah addresses
    const addressPattern = /\d{1,5}\s+[\w\s]{1,30}\s+(street|st|avenue|ave|road|rd|boulevard|blvd|drive|dr|lane|ln|way|court|ct|circle|cir)[,\s]+[\w\s]+[,\s]+(UT|Utah)\s*\d{5}/gi;
    const match = content.match(addressPattern);
    
    if (match) {
      signals.physicalAddress = true;
      signals.addressFound = match[0].trim();
      return;
    }
    
    // Also check for city mentions as partial signal
    const cityMatch = content.match(/salt\s+lake\s+(city|county)/gi);
    if (cityMatch) {
      signals.physicalAddress = true;
      return;
    }
    
    issues.push('No physical address found');
  }

  /**
   * Check for industry certifications
   */
  analyzeCertifications(content, signals) {
    const certs = [];
    
    for (const [name, pattern] of Object.entries(PATTERNS.certifications)) {
      if (pattern.test(content)) {
        certs.push(name.toUpperCase());
      }
    }
    
    signals.certifications = [...new Set(certs)];
  }

  /**
   * Check for manufacturer partnerships
   */
  analyzeManufacturers(content, signals) {
    const partners = [];
    
    for (const [name, pattern] of Object.entries(PATTERNS.manufacturers)) {
      if (pattern.test(content)) {
        partners.push(name.charAt(0).toUpperCase() + name.slice(1).replace('_', ' '));
      }
    }
    
    signals.manufacturerPartners = [...new Set(partners)];
  }

  /**
   * Check for awards mentions
   */
  analyzeAwards(content, signals) {
    const awards = [];
    
    for (const pattern of PATTERNS.awards) {
      const matches = content.match(pattern);
      if (matches) {
        awards.push(...matches);
        signals.awards = true;
      }
    }
    
    signals.awardMentions = [...new Set(awards.map(a => a.trim()))].slice(0, 5);
  }

  /**
   * Check for association memberships
   */
  analyzeAssociations(content, signals, issues) {
    const associations = [];
    
    for (const pattern of PATTERNS.associations) {
      const matches = content.match(pattern);
      if (matches) {
        associations.push(...matches);
      }
    }
    
    signals.associations = [...new Set(associations.map(a => a.trim()))];
    
    if (associations.length === 0) {
      issues.push('No professional association memberships');
    }
  }

  /**
   * Check for team photos
   */
  async analyzeTeamPhotos(page, mainHtml, subHtml, signals, issues) {
    const allHtml = mainHtml + subHtml;
    
    // Check for img tags with team-related src/alt
    const imgPattern = /<img[^>]+(?:src|alt)=[^>]+(team|staff|technician|employee|crew|headshot|portrait)[^>]*>/gi;
    if (imgPattern.test(allHtml)) {
      signals.teamPhotos = true;
      return;
    }
    
    // Check for background images in team sections
    const teamSectionPattern = /team|staff|about-us|meet-the/gi;
    if (teamSectionPattern.test(allHtml) && /<img[^>]+>/gi.test(allHtml)) {
      // Has images and mentions team - likely has team photos
      signals.teamPhotos = true;
      return;
    }
    
    issues.push('No team photos found');
  }

  /**
   * Check for owner/founder info
   */
  analyzeOwnerInfo(content, signals, issues) {
    for (const pattern of PATTERNS.owner) {
      if (pattern.test(content)) {
        signals.ownerInfo = true;
        return;
      }
    }
    issues.push('No owner/founder information');
  }

  /**
   * Check for review widgets
   */
  async analyzeReviewWidgets(page, html, signals, issues) {
    const widgets = [];
    
    // Google reviews
    if (/google.*review/gi.test(html) || 
        /schema\.org.*aggregaterating/gi.test(html) ||
        /googleapis\.com.*places/gi.test(html) ||
        /g\.page/gi.test(html) ||
        /google\.com\/maps/gi.test(html)) {
      widgets.push('google');
      signals.googleReviews = true;
    }
    
    // Yelp
    if (/yelp\.com/gi.test(html) || 
        /yelp.*badge/gi.test(html) ||
        /yelpcdn/gi.test(html)) {
      widgets.push('yelp');
      signals.yelpBadge = true;
    }
    
    // Other review platforms
    if (/homeadvisor/gi.test(html)) widgets.push('homeadvisor');
    if (/angieslist|angi\.com/gi.test(html)) widgets.push('angi');
    if (/bbb\.org/gi.test(html)) widgets.push('bbb');
    if (/trustpilot/gi.test(html)) widgets.push('trustpilot');
    if (/facebook\.com.*reviews/gi.test(html)) widgets.push('facebook');
    if (/birdeye/gi.test(html)) widgets.push('birdeye');
    if (/podium/gi.test(html)) widgets.push('podium');
    
    signals.reviewWidgets = [...new Set(widgets)];
    
    if (widgets.length === 0) {
      issues.push('No review widgets found');
    }
  }

  /**
   * Check for BBB badge/accreditation
   */
  async analyzeBBB(page, html, signals, issues) {
    // Check for BBB mentions in HTML
    if (/bbb\.org/gi.test(html) ||
        /better\s*business\s*bureau/gi.test(html) ||
        /bbb\s*accredited/gi.test(html) ||
        /bbb\s*rating/gi.test(html) ||
        /bbb-logo/gi.test(html)) {
      signals.bbbBadge = true;
      return;
    }
    
    issues.push('No BBB badge/accreditation');
  }

  /**
   * Calculate final trust score
   */
  calculateScore(signals) {
    let score = 0;
    
    if (signals.ssl) score += TRUST_WEIGHTS.ssl;
    if (signals.bbbBadge) score += TRUST_WEIGHTS.bbbBadge;
    if (signals.licenseDisplayed) score += TRUST_WEIGHTS.licenseDisplayed;
    if (signals.insuranceMentioned) score += TRUST_WEIGHTS.insuranceMentioned;
    if (signals.bondedMentioned) score += TRUST_WEIGHTS.bondedMentioned;
    if (signals.yearsInBusiness) {
      // Bonus for longevity
      const yearsBonus = Math.min(signals.yearsInBusiness / 20, 1);
      score += TRUST_WEIGHTS.yearsInBusiness * yearsBonus;
    }
    if (signals.teamPhotos) score += TRUST_WEIGHTS.teamPhotos;
    if (signals.ownerInfo) score += TRUST_WEIGHTS.ownerInfo;
    if (signals.physicalAddress) score += TRUST_WEIGHTS.physicalAddress;
    if (signals.googleReviews) score += TRUST_WEIGHTS.googleReviews;
    if (signals.yelpBadge) score += TRUST_WEIGHTS.yelpBadge;
    if (signals.certifications.length > 0) {
      score += TRUST_WEIGHTS.certifications * Math.min(signals.certifications.length / 3, 1);
    }
    if (signals.manufacturerPartners.length > 0) {
      score += TRUST_WEIGHTS.manufacturerPartners * Math.min(signals.manufacturerPartners.length / 2, 1);
    }
    if (signals.awards) score += TRUST_WEIGHTS.awards;
    if (signals.associations.length > 0) score += TRUST_WEIGHTS.associations;
    
    // Normalize to 0-100
    const trustScore = Math.round((score / MAX_SCORE) * 100);
    
    // Determine trust level
    let trustLevel;
    if (trustScore >= 70) {
      trustLevel = 'high';
    } else if (trustScore >= 40) {
      trustLevel = 'medium';
    } else {
      trustLevel = 'low';
    }
    
    return { trustScore, trustLevel };
  }
}

// ============================================================================
// CLI EXECUTION
// ============================================================================

async function main() {
  const url = process.argv[2];
  
  if (!url) {
    console.error('Usage: node trust-scorer.js "https://example.com"');
    console.error('');
    console.error('Trust Signals Scorer - Analyzes websites for trust indicators');
    process.exit(1);
  }
  
  console.log(`\n🔍 Scanning ${url} for trust signals...\n`);
  
  const scorer = new TrustScorer();
  const result = await scorer.score(url);
  
  // Handle errors
  if (result.trustLevel === 'error') {
    console.log('═'.repeat(60));
    console.log(`❌ SCAN FAILED`);
    console.log('═'.repeat(60));
    console.log(`\nError: ${result.error}`);
    console.log(`\nIssues:`);
    result.issues.forEach(issue => console.log(`  • ${issue}`));
    process.exit(1);
  }
  
  // Pretty print results
  console.log('═'.repeat(60));
  console.log(`TRUST SCORE: ${result.trustScore}/100 (${result.trustLevel.toUpperCase()})`);
  console.log('═'.repeat(60));
  
  console.log('\n📊 SIGNALS DETECTED:');
  console.log('─'.repeat(40));
  
  const s = result.signals;
  console.log(`  ✓ SSL/HTTPS:        ${s.ssl ? '✅ Yes' : '❌ No'}`);
  console.log(`  ✓ BBB Badge:        ${s.bbbBadge ? '✅ Yes' : '❌ No'}`);
  console.log(`  ✓ License:          ${s.licenseDisplayed ? `✅ ${s.licenseNumber || 'Yes'}` : '❌ No'}`);
  console.log(`  ✓ Insurance:        ${s.insuranceMentioned ? '✅ Yes' : '❌ No'}`);
  console.log(`  ✓ Bonded:           ${s.bondedMentioned ? '✅ Yes' : '❌ No'}`);
  console.log(`  ✓ Years in Biz:     ${s.yearsInBusiness ? `✅ ${s.yearsInBusiness} years (est. ${s.establishedYear})` : '❌ Unknown'}`);
  console.log(`  ✓ Team Photos:      ${s.teamPhotos ? '✅ Yes' : '❌ No'}`);
  console.log(`  ✓ Owner Info:       ${s.ownerInfo ? '✅ Yes' : '❌ No'}`);
  console.log(`  ✓ Physical Address: ${s.physicalAddress ? `✅ ${s.addressFound || 'Yes'}` : '❌ No'}`);
  console.log(`  ✓ Review Widgets:   ${s.reviewWidgets.length > 0 ? '✅ ' + s.reviewWidgets.join(', ') : '❌ None'}`);
  console.log(`  ✓ Certifications:   ${s.certifications.length > 0 ? '✅ ' + s.certifications.join(', ') : '❌ None'}`);
  console.log(`  ✓ Mfr Partners:     ${s.manufacturerPartners.length > 0 ? '✅ ' + s.manufacturerPartners.join(', ') : '❌ None'}`);
  console.log(`  ✓ Awards:           ${s.awards ? '✅ Yes' : '❌ No'}`);
  console.log(`  ✓ Associations:     ${s.associations.length > 0 ? '✅ ' + s.associations.join(', ') : '❌ None'}`);
  
  if (result.issues.length > 0) {
    console.log('\n⚠️  ISSUES:');
    console.log('─'.repeat(40));
    result.issues.forEach(issue => console.log(`  • ${issue}`));
  }
  
  console.log('\n📋 META:');
  console.log('─'.repeat(40));
  console.log(`  • Scanned at: ${result.meta.scannedAt}`);
  console.log(`  • Duration: ${result.meta.durationMs}ms`);
  console.log(`  • Pages scanned: ${result.meta.pagesScanned}`);
  
  console.log('\n' + '═'.repeat(60));
  
  // Also output JSON for programmatic use
  if (process.env.JSON_OUTPUT) {
    console.log('\nJSON Output:');
    console.log(JSON.stringify(result, null, 2));
  }
  
  // Exit with code based on trust level
  process.exit(result.trustLevel === 'error' ? 1 : 0);
}

// Export for module use
module.exports = { TrustScorer, TRUST_WEIGHTS, PATTERNS };

// Run if called directly
if (require.main === module) {
  main();
}
