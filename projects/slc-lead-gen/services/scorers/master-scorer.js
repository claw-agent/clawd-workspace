#!/usr/bin/env node
/**
 * Master Scoring Orchestrator - SLC Lead Gen
 * 
 * Combines ALL scoring components into a comprehensive prospect assessment:
 * - Technical (Lighthouse performance/mobile)
 * - Visual (AI design assessment)
 * - Conversion (CTA, forms, phone prominence)
 * - Content (copy quality, freshness)
 * - Trust (badges, certifications, social proof)
 * 
 * Returns:
 * - opportunityScore: 0-100 (higher = worse site = better prospect)
 * - siteQualityScore: 0-100 (higher = better site)
 * - Detailed breakdown with issues and sales angles
 * 
 * Usage: node master-scorer.js "https://example.com" [--json] [--verbose]
 */

const puppeteer = require('puppeteer');
const chromeLauncher = require('chrome-launcher');
const lighthouseModule = require('lighthouse');
const lighthouse = lighthouseModule.default || lighthouseModule;

const { scoreVisualDesign } = require('./visual-scorer');
const { scoreConversion } = require('./conversion-scorer');
const { scoreContent } = require('./content-scorer');
const { scoreTrust } = require('./trust-scorer');

// Score weighting - conversion is king for lead gen!
const WEIGHTS = {
  technical: 0.20,   // Lighthouse performance/mobile
  visual: 0.20,      // AI design assessment
  conversion: 0.25,  // CTA, contact options (most important!)
  content: 0.15,     // Copy quality
  trust: 0.20        // Credibility signals
};

// Opportunity tiers
const TIERS = {
  A: { min: 70, label: 'A', description: 'Hot prospect - poor website, high opportunity' },
  B: { min: 50, label: 'B', description: 'Good prospect - notable issues to fix' },
  C: { min: 30, label: 'C', description: 'Moderate prospect - some room for improvement' },
  D: { min: 0,  label: 'D', description: 'Low priority - decent website already' }
};

// Project value estimates based on opportunity tier and issues
const PROJECT_VALUES = {
  A: { min: 5000, max: 15000, typical: '$5,000-$15,000' },
  B: { min: 3000, max: 8000, typical: '$3,000-$8,000' },
  C: { min: 1500, max: 4000, typical: '$1,500-$4,000' },
  D: { min: 500, max: 2000, typical: '$500-$2,000' }
};

// Issue to sales angle mapping
const SALES_ANGLES = {
  // Technical issues
  'poor mobile performance': 'mobile-first redesign',
  'slow load time': 'speed optimization',
  'not mobile friendly': 'responsive redesign',
  'no HTTPS': 'security upgrade',
  'poor accessibility': 'ADA compliance',
  
  // Visual issues
  'outdated design': 'modern visual refresh',
  'table-based layout': 'complete redesign',
  'no images': 'professional photography',
  'few images': 'visual content upgrade',
  'unprofessional fonts': 'brand identity refresh',
  
  // Conversion issues
  'no phone number found': 'lead capture optimization',
  'phone not in header': 'conversion optimization',
  'no click-to-call links': 'mobile conversion optimization',
  'no CTA buttons found': 'call-to-action strategy',
  'no CTA above fold': 'above-fold optimization',
  'no contact form': 'lead generation system',
  'no email link': 'contact optimization',
  
  // Content issues
  'very thin content': 'content development',
  'limited content': 'content expansion',
  'no H1 heading': 'SEO optimization',
  'missing/short meta description': 'SEO audit',
  'no local keywords': 'local SEO strategy',
  'outdated copyright': 'site refresh',
  'placeholder text (lorem ipsum)': 'content writing',
  
  // Trust issues
  'no reviews or testimonials visible': 'social proof integration',
  'no trust badges': 'credibility enhancement',
  'no certifications displayed': 'credential showcase',
  'no address visible': 'local presence optimization',
  'no social media links': 'social media integration',
  'no HTTPS': 'security trust signals'
};

/**
 * Run Lighthouse for technical scoring
 */
async function runLighthouseScore(url, chrome) {
  try {
    const options = {
      logLevel: 'error',
      output: 'json',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      port: chrome.port,
      formFactor: 'mobile',
      screenEmulation: {
        mobile: true,
        width: 375,
        height: 667,
        deviceScaleFactor: 2,
        disabled: false
      },
      throttling: {
        rttMs: 150,
        throughputKbps: 1638.4,
        cpuSlowdownMultiplier: 4
      }
    };
    
    const result = await lighthouse(url, options);
    const lhr = result?.lhr;
    
    if (!lhr) return null;
    
    const scores = {
      performance: Math.round((lhr.categories?.performance?.score || 0) * 100),
      accessibility: Math.round((lhr.categories?.accessibility?.score || 0) * 100),
      bestPractices: Math.round((lhr.categories?.['best-practices']?.score || 0) * 100),
      seo: Math.round((lhr.categories?.seo?.score || 0) * 100)
    };
    
    // Calculate technical score (average of lighthouse categories)
    const technicalScore = Math.round(
      (scores.performance + scores.accessibility + scores.bestPractices + scores.seo) / 4
    );
    
    // Extract specific issues
    const issues = [];
    
    if (scores.performance < 50) {
      issues.push('poor mobile performance');
    }
    if (scores.performance < 30) {
      issues.push('slow load time');
    }
    
    // Mobile-friendly checks from audits
    const audits = lhr.audits || {};
    if (audits['viewport']?.score !== 1) {
      issues.push('not mobile friendly');
    }
    if (audits['font-size']?.score !== 1) {
      issues.push('small text on mobile');
    }
    
    if (scores.accessibility < 50) {
      issues.push('poor accessibility');
    }
    
    if (scores.seo < 50) {
      issues.push('poor SEO');
    }
    
    return {
      score: technicalScore,
      lighthouse: scores,
      issues,
      metrics: {
        lcp: audits['largest-contentful-paint']?.numericValue,
        fcp: audits['first-contentful-paint']?.numericValue,
        tbt: audits['total-blocking-time']?.numericValue,
        cls: audits['cumulative-layout-shift']?.numericValue
      }
    };
    
  } catch (error) {
    return {
      score: 30, // Default low score
      issues: ['lighthouse analysis failed'],
      error: error.message
    };
  }
}

/**
 * Generate sales angles from issues
 */
function generateSalesAngles(allIssues) {
  const angles = new Set();
  
  for (const issue of allIssues) {
    const issueLower = issue.toLowerCase();
    
    for (const [pattern, angle] of Object.entries(SALES_ANGLES)) {
      if (issueLower.includes(pattern.toLowerCase())) {
        angles.add(angle);
      }
    }
  }
  
  // If we have conversion issues, add umbrella angle
  if (allIssues.some(i => i.includes('CTA') || i.includes('phone') || i.includes('form'))) {
    angles.add('conversion rate optimization');
  }
  
  // If many issues, suggest full redesign
  if (allIssues.length > 8) {
    angles.add('complete website redesign');
  }
  
  return Array.from(angles).slice(0, 6); // Top 6 angles
}

/**
 * Calculate opportunity tier from score
 */
function getOpportunityTier(opportunityScore) {
  if (opportunityScore >= TIERS.A.min) return TIERS.A;
  if (opportunityScore >= TIERS.B.min) return TIERS.B;
  if (opportunityScore >= TIERS.C.min) return TIERS.C;
  return TIERS.D;
}

/**
 * Determine priority level
 */
function getPriorityLevel(opportunityScore, tier) {
  if (opportunityScore >= 80) return 'urgent';
  if (tier.label === 'A') return 'high';
  if (tier.label === 'B') return 'medium';
  return 'low';
}

/**
 * Master scoring function - runs all scorers and combines results
 */
async function masterScore(url, options = {}) {
  const { verbose = false, businessData = null } = options;
  
  const startTime = Date.now();
  
  // Normalize URL
  let normalizedUrl = url?.trim();
  if (!normalizedUrl) {
    return {
      error: 'No URL provided',
      opportunityScore: 100,
      opportunityTier: 'A',
      siteQualityScore: 0,
      topIssues: ['no website'],
      salesAngles: ['website creation'],
      estimatedProjectValue: '$3,000-$8,000',
      priorityLevel: 'high'
    };
  }
  
  if (!normalizedUrl.startsWith('http')) {
    normalizedUrl = 'https://' + normalizedUrl;
  }
  
  // Launch browsers
  if (verbose) console.log('🚀 Launching browsers...');
  
  const [chrome, puppeteerBrowser] = await Promise.all([
    chromeLauncher.launch({
      chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox']
    }),
    puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
  ]);
  
  try {
    if (verbose) console.log('📊 Running all scorers in parallel...\n');
    
    // Run all scorers in parallel
    const [technicalResult, visualResult, conversionResult, contentResult, trustResult] = 
      await Promise.all([
        runLighthouseScore(normalizedUrl, chrome),
        scoreVisualDesign(normalizedUrl, puppeteerBrowser),
        scoreConversion(normalizedUrl, puppeteerBrowser),
        scoreContent(normalizedUrl, puppeteerBrowser),
        scoreTrust(normalizedUrl, puppeteerBrowser)
      ]);
    
    // Build breakdown
    const breakdown = {
      technical: {
        score: technicalResult?.score || 30,
        issues: technicalResult?.issues || ['analysis failed'],
        details: {
          lighthouse: technicalResult?.lighthouse,
          metrics: technicalResult?.metrics
        }
      },
      visual: {
        score: visualResult?.score || 30,
        issues: visualResult?.issues || [],
        positives: visualResult?.positives || []
      },
      conversion: {
        score: conversionResult?.score || 20,
        issues: conversionResult?.issues || [],
        positives: conversionResult?.positives || [],
        details: conversionResult?.details
      },
      content: {
        score: contentResult?.score || 30,
        issues: contentResult?.issues || [],
        positives: contentResult?.positives || [],
        details: contentResult?.details
      },
      trust: {
        score: trustResult?.score || 20,
        issues: trustResult?.issues || [],
        positives: trustResult?.positives || [],
        badges: trustResult?.badges || [],
        certifications: trustResult?.certifications || []
      }
    };
    
    // Calculate weighted site quality score
    const siteQualityScore = Math.round(
      (breakdown.technical.score * WEIGHTS.technical) +
      (breakdown.visual.score * WEIGHTS.visual) +
      (breakdown.conversion.score * WEIGHTS.conversion) +
      (breakdown.content.score * WEIGHTS.content) +
      (breakdown.trust.score * WEIGHTS.trust)
    );
    
    // Invert for opportunity score (worse site = better opportunity)
    let opportunityScore = 100 - siteQualityScore;
    
    // Apply business health modifiers if available
    const modifiers = {};
    
    if (businessData) {
      // Good reviews + bad site = prime opportunity
      if (businessData.rating >= 4.5 && opportunityScore >= 40) {
        modifiers.goodReputation = 5;
        opportunityScore = Math.min(100, opportunityScore + 5);
      }
      
      // Many reviews = established business
      if (businessData.reviewCount > 50) {
        modifiers.established = 5;
        opportunityScore = Math.min(100, opportunityScore + 5);
      }
      
      // High-value industry
      const highValue = ['plumbing', 'hvac', 'roofing', 'dental', 'legal', 'medical'];
      if (businessData.industry && highValue.some(i => 
        businessData.industry.toLowerCase().includes(i)
      )) {
        modifiers.highValueIndustry = 5;
        opportunityScore = Math.min(100, opportunityScore + 5);
      }
    }
    
    // Get tier and priority
    const tier = getOpportunityTier(opportunityScore);
    const priorityLevel = getPriorityLevel(opportunityScore, tier);
    
    // Collect all issues
    const allIssues = [
      ...breakdown.technical.issues,
      ...breakdown.visual.issues,
      ...breakdown.conversion.issues,
      ...breakdown.content.issues,
      ...breakdown.trust.issues
    ];
    
    // Sort issues by importance (conversion issues first)
    const sortedIssues = allIssues.sort((a, b) => {
      const aConversion = a.toLowerCase().includes('phone') || 
                          a.toLowerCase().includes('cta') || 
                          a.toLowerCase().includes('form');
      const bConversion = b.toLowerCase().includes('phone') || 
                          b.toLowerCase().includes('cta') || 
                          b.toLowerCase().includes('form');
      if (aConversion && !bConversion) return -1;
      if (!aConversion && bConversion) return 1;
      return 0;
    });
    
    const topIssues = sortedIssues.slice(0, 5);
    
    // Generate sales angles
    const salesAngles = generateSalesAngles(allIssues);
    
    // Get project value estimate
    const projectValue = PROJECT_VALUES[tier.label];
    
    // Calculate analysis time
    const analysisTime = Date.now() - startTime;
    
    const result = {
      url: normalizedUrl,
      opportunityScore,
      opportunityTier: tier.label,
      tierDescription: tier.description,
      siteQualityScore,
      
      breakdown,
      
      topIssues,
      salesAngles,
      
      estimatedProjectValue: projectValue.typical,
      priorityLevel,
      
      modifiers: Object.keys(modifiers).length > 0 ? modifiers : undefined,
      
      metadata: {
        analyzedAt: new Date().toISOString(),
        analysisTimeMs: analysisTime,
        weights: WEIGHTS
      }
    };
    
    return result;
    
  } finally {
    // Cleanup
    await chrome.kill();
    await puppeteerBrowser.close();
  }
}

/**
 * Generate sales team summary
 */
function generateSalesSummary(result) {
  const lines = [];
  
  lines.push('═'.repeat(60));
  lines.push('  PROSPECT ASSESSMENT REPORT');
  lines.push('═'.repeat(60));
  lines.push('');
  lines.push(`  📍 URL: ${result.url}`);
  lines.push(`  📅 Analyzed: ${new Date(result.metadata.analyzedAt).toLocaleString()}`);
  lines.push('');
  lines.push('─'.repeat(60));
  
  // Opportunity headline
  const emoji = result.opportunityTier === 'A' ? '🔥' : 
                result.opportunityTier === 'B' ? '⚡' : 
                result.opportunityTier === 'C' ? '✓' : '·';
  
  lines.push(`  ${emoji} OPPORTUNITY SCORE: ${result.opportunityScore}/100 (Tier ${result.opportunityTier})`);
  lines.push(`     ${result.tierDescription}`);
  lines.push('');
  lines.push(`  💰 ESTIMATED VALUE: ${result.estimatedProjectValue}`);
  lines.push(`  📊 PRIORITY: ${result.priorityLevel.toUpperCase()}`);
  lines.push('');
  
  // Score breakdown
  lines.push('─'.repeat(60));
  lines.push('  SITE QUALITY BREAKDOWN');
  lines.push('─'.repeat(60));
  
  const { breakdown } = result;
  lines.push(`  Technical (Lighthouse): ${breakdown.technical.score}/100`);
  lines.push(`  Visual Design:          ${breakdown.visual.score}/100`);
  lines.push(`  Conversion Elements:    ${breakdown.conversion.score}/100`);
  lines.push(`  Content Quality:        ${breakdown.content.score}/100`);
  lines.push(`  Trust Signals:          ${breakdown.trust.score}/100`);
  lines.push(`  ─────────────────────────────────`);
  lines.push(`  OVERALL SITE QUALITY:   ${result.siteQualityScore}/100`);
  lines.push('');
  
  // Top issues
  lines.push('─'.repeat(60));
  lines.push('  🎯 TOP ISSUES TO FIX');
  lines.push('─'.repeat(60));
  result.topIssues.forEach((issue, i) => {
    lines.push(`  ${i + 1}. ${issue}`);
  });
  lines.push('');
  
  // Sales angles
  lines.push('─'.repeat(60));
  lines.push('  💬 RECOMMENDED SALES ANGLES');
  lines.push('─'.repeat(60));
  result.salesAngles.forEach((angle, i) => {
    lines.push(`  ${i + 1}. ${angle}`);
  });
  lines.push('');
  
  lines.push('═'.repeat(60));
  
  return lines.join('\n');
}

// CLI execution
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args.includes('--help')) {
    console.log(`
Master Scorer - Comprehensive Website Assessment for Lead Gen

Usage: node master-scorer.js <url> [options]

Options:
  --json      Output raw JSON instead of formatted report
  --verbose   Show progress during analysis
  --help      Show this help message

Examples:
  node master-scorer.js https://example.com
  node master-scorer.js example.com --verbose
  node master-scorer.js https://acme-plumbing.com --json
`);
    process.exit(0);
  }
  
  const url = args.find(a => !a.startsWith('--'));
  const jsonOutput = args.includes('--json');
  const verbose = args.includes('--verbose');
  
  if (!url) {
    console.error('Error: URL required');
    process.exit(1);
  }
  
  console.log(`\n🎯 Master Scorer - Analyzing: ${url}\n`);
  
  masterScore(url, { verbose }).then(result => {
    if (jsonOutput) {
      console.log(JSON.stringify(result, null, 2));
    } else {
      console.log(generateSalesSummary(result));
    }
  }).catch(err => {
    console.error('Fatal error:', err.message);
    process.exit(1);
  });
}

module.exports = { 
  masterScore, 
  generateSalesSummary,
  WEIGHTS,
  TIERS,
  PROJECT_VALUES
};
