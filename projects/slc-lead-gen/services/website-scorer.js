#!/usr/bin/env node
/**
 * Website Scorer for SLC Lead Gen
 * 
 * Uses FREE Lighthouse CLI for professional-grade website scoring.
 * Higher opportunity score = worse website + good business = better sales target.
 * 
 * Scoring factors:
 * - Performance (Lighthouse)
 * - Mobile-friendliness (Lighthouse)
 * - HTTPS security
 * - Load time
 * - SEO basics (Lighthouse)
 * - Accessibility (Lighthouse)
 * 
 * Usage: node website-scorer.js <leads-file.json>
 *        node website-scorer.js (processes all files in data/leads/raw/)
 */

const lighthouseModule = require('lighthouse');
const lighthouse = lighthouseModule.default || lighthouseModule;
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const path = require('path');

// Optional master scorer for comprehensive analysis
let masterScorer = null;
try {
  masterScorer = require('./scorers/master-scorer');
} catch (e) {
  // Master scorer not available, use basic lighthouse scoring
}

// Paths
const RAW_DIR = path.join(__dirname, '..', 'data', 'leads', 'raw');
const SCORED_DIR = path.join(__dirname, '..', 'data', 'leads', 'scored');

// Rate limiting config
const RATE_LIMIT = {
  delayBetweenSites: 2000,  // 2 seconds between sites
  maxConcurrent: 1,          // One at a time
  timeoutMs: 30000           // 30 second timeout per site
};

// Scoring mode: 'basic' (lighthouse only) or 'comprehensive' (master scorer)
let SCORING_MODE = 'basic';

/**
 * Run Lighthouse on a URL
 */
async function runLighthouse(url, chrome) {
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
      // Simulate 4G connection
      rttMs: 150,
      throughputKbps: 1638.4,
      cpuSlowdownMultiplier: 4
    }
  };
  
  try {
    const result = await lighthouse(url, options);
    return result?.lhr || null;
  } catch (error) {
    console.error(`    Lighthouse error: ${error.message}`);
    return null;
  }
}

/**
 * Score a single website using Lighthouse
 * Returns opportunity score 0-100 (higher = worse website = better sales opportunity)
 */
async function scoreWebsite(url, chrome) {
  const result = {
    url: url || null,
    hasWebsite: !!url,
    opportunityScore: 0,
    lighthouse: null,
    breakdown: {},
    details: {},
    error: null
  };
  
  // No website = maximum opportunity
  if (!url || url.trim() === '') {
    result.opportunityScore = 100;
    result.breakdown = { noWebsite: 100 };
    result.details = { reason: 'No website found - prime opportunity!' };
    return result;
  }
  
  // Normalize URL
  let normalizedUrl = url.trim();
  if (!normalizedUrl.startsWith('http')) {
    normalizedUrl = 'https://' + normalizedUrl;
  }
  result.url = normalizedUrl;
  
  // Check HTTPS
  const isHttps = normalizedUrl.startsWith('https://');
  result.breakdown.notHttps = isHttps ? 0 : 15;
  result.details.https = isHttps;
  
  // Run Lighthouse
  const startTime = Date.now();
  const lhr = await runLighthouse(normalizedUrl, chrome);
  const loadTime = Date.now() - startTime;
  result.details.analysisTimeMs = loadTime;
  
  if (!lhr) {
    // Site unreachable or errored
    result.opportunityScore = 85;
    result.breakdown.unreachable = 85;
    result.error = 'Could not analyze website';
    return result;
  }
  
  // Extract Lighthouse scores (0-100 scale)
  const scores = {
    performance: Math.round((lhr.categories?.performance?.score || 0) * 100),
    accessibility: Math.round((lhr.categories?.accessibility?.score || 0) * 100),
    bestPractices: Math.round((lhr.categories?.['best-practices']?.score || 0) * 100),
    seo: Math.round((lhr.categories?.seo?.score || 0) * 100)
  };
  
  result.lighthouse = scores;
  
  // Extract key metrics
  const metrics = lhr.audits || {};
  result.details.metrics = {
    firstContentfulPaint: metrics['first-contentful-paint']?.numericValue,
    largestContentfulPaint: metrics['largest-contentful-paint']?.numericValue,
    totalBlockingTime: metrics['total-blocking-time']?.numericValue,
    cumulativeLayoutShift: metrics['cumulative-layout-shift']?.numericValue,
    speedIndex: metrics['speed-index']?.numericValue,
    interactive: metrics['interactive']?.numericValue
  };
  
  // Mobile-friendly checks
  const mobileAudits = {
    viewport: metrics['viewport']?.score === 1,
    fontSize: metrics['font-size']?.score === 1,
    tapTargets: metrics['tap-targets']?.score === 1
  };
  result.details.mobile = mobileAudits;
  
  // Calculate opportunity breakdown
  // Lower Lighthouse scores = higher opportunity
  
  // Performance (0-100 → 0-25 opportunity points)
  // Bad performance (score < 50) = up to 25 points
  result.breakdown.performance = Math.max(0, Math.round((100 - scores.performance) * 0.25));
  
  // Mobile-friendliness (0-20 opportunity points)
  let mobileScore = 0;
  if (!mobileAudits.viewport) mobileScore += 10;
  if (!mobileAudits.fontSize) mobileScore += 5;
  if (!mobileAudits.tapTargets) mobileScore += 5;
  result.breakdown.mobile = mobileScore;
  
  // SEO problems (0-15 opportunity points)
  result.breakdown.seo = Math.max(0, Math.round((100 - scores.seo) * 0.15));
  
  // Best practices issues (0-10 opportunity points)
  result.breakdown.bestPractices = Math.max(0, Math.round((100 - scores.bestPractices) * 0.10));
  
  // Accessibility issues (0-10 opportunity points)
  result.breakdown.accessibility = Math.max(0, Math.round((100 - scores.accessibility) * 0.10));
  
  // Slow load time bonus (if LCP > 4s)
  const lcp = result.details.metrics.largestContentfulPaint;
  if (lcp > 6000) {
    result.breakdown.slowLoad = 15;
  } else if (lcp > 4000) {
    result.breakdown.slowLoad = 8;
  } else {
    result.breakdown.slowLoad = 0;
  }
  
  // Calculate total opportunity score
  result.opportunityScore = Math.min(100, Object.values(result.breakdown).reduce((a, b) => a + b, 0));
  
  return result;
}

/**
 * Calculate combined opportunity score
 * Factors in both website quality AND business quality indicators
 */
function calculateOpportunityScore(lead, websiteScore) {
  let score = websiteScore.opportunityScore;
  let modifiers = {};
  
  // Business quality modifiers (good business + bad website = higher opportunity)
  
  // Has reviews = established business (boost)
  if (lead.reviewCount > 50) {
    modifiers.manyReviews = 5;
    score = Math.min(100, score + 5);
  }
  
  // Good rating but bad website = they care about quality (boost)
  if (lead.rating >= 4.5 && websiteScore.opportunityScore >= 40) {
    modifiers.goodReputation = 5;
    score = Math.min(100, score + 5);
  }
  
  // High-value industries get priority
  const highValueIndustries = ['plumbing', 'hvac', 'roofing', 'dental', 'legal', 'medical'];
  if (lead.industry && highValueIndustries.some(i => lead.industry.toLowerCase().includes(i))) {
    modifiers.highValueIndustry = 5;
    score = Math.min(100, score + 5);
  }
  
  websiteScore.modifiers = modifiers;
  websiteScore.finalScore = score;
  
  return websiteScore;
}

/**
 * Score all leads in a file
 */
async function scoreLeadsFile(inputFile) {
  console.log(`\n📁 Processing: ${path.basename(inputFile)}`);
  
  // Load leads
  let data;
  try {
    data = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
  } catch (e) {
    console.error(`   ❌ Error reading file: ${e.message}`);
    return null;
  }
  
  const leads = data.leads || data.businesses || [];
  
  if (leads.length === 0) {
    console.log('   ⚠️ No leads found in file');
    return null;
  }
  
  console.log(`   📊 Scoring ${leads.length} leads...\n`);
  
  // Launch Chrome
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox']
  });
  
  console.log(`   🌐 Chrome launched on port ${chrome.port}\n`);
  
  const scoredLeads = [];
  let successCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < leads.length; i++) {
    const lead = leads[i];
    const name = lead.name || lead.businessName || 'Unknown';
    
    process.stdout.write(`   [${i + 1}/${leads.length}] ${name.substring(0, 40).padEnd(40)} `);
    
    try {
      // Score the website - use comprehensive or basic mode
      let websiteScore;
      
      if (SCORING_MODE === 'comprehensive') {
        websiteScore = await scoreWebsiteComprehensive(lead.website || lead.url, lead);
        
        // Fallback to basic if comprehensive fails
        if (!websiteScore) {
          websiteScore = await scoreWebsite(lead.website || lead.url, chrome);
        }
      } else {
        websiteScore = await scoreWebsite(lead.website || lead.url, chrome);
      }
      
      // Calculate opportunity score with business factors
      websiteScore = calculateOpportunityScore(lead, websiteScore);
      
      // Merge scores into lead
      const scoredLead = {
        ...lead,
        websiteAnalysis: websiteScore,
        opportunityScore: websiteScore.finalScore,
        scoredAt: new Date().toISOString()
      };
      
      scoredLeads.push(scoredLead);
      successCount++;
      
      // Display score with emoji
      const score = websiteScore.finalScore;
      const emoji = score >= 70 ? '🔥' : score >= 50 ? '⚡' : score >= 30 ? '✓' : '·';
      console.log(`${emoji} ${score.toString().padStart(3)}/100`);
      
      if (websiteScore.lighthouse) {
        console.log(`        └─ Lighthouse: P:${websiteScore.lighthouse.performance} M:${websiteScore.lighthouse.seo} A:${websiteScore.lighthouse.accessibility}`);
      }
      
      // Show comprehensive details if available
      if (websiteScore.details?.tier) {
        console.log(`        └─ Tier: ${websiteScore.details.tier} | Value: ${websiteScore.details.estimatedProjectValue} | Priority: ${websiteScore.details.priorityLevel}`);
      }
      
    } catch (error) {
      errorCount++;
      console.log(`❌ Error: ${error.message.substring(0, 50)}`);
      
      scoredLeads.push({
        ...lead,
        websiteAnalysis: { error: error.message },
        opportunityScore: 50, // Default middle score for errors
        scoredAt: new Date().toISOString()
      });
    }
    
    // Rate limiting
    if (i < leads.length - 1) {
      await new Promise(r => setTimeout(r, RATE_LIMIT.delayBetweenSites));
    }
  }
  
  // Cleanup
  await chrome.kill();
  
  // Sort by opportunity score (highest first)
  scoredLeads.sort((a, b) => b.opportunityScore - a.opportunityScore);
  
  // Save results
  fs.mkdirSync(SCORED_DIR, { recursive: true });
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
  const baseName = path.basename(inputFile, '.json');
  const outputFile = path.join(SCORED_DIR, `${baseName}_scored_${timestamp}.json`);
  
  const avgScore = Math.round(scoredLeads.reduce((a, l) => a + (l.opportunityScore || 0), 0) / scoredLeads.length);
  
  const output = {
    metadata: {
      source: inputFile,
      scoredAt: new Date().toISOString(),
      totalLeads: scoredLeads.length,
      successfulScores: successCount,
      errors: errorCount,
      averageOpportunityScore: avgScore,
      highOpportunity: scoredLeads.filter(l => l.opportunityScore >= 70).length,
      mediumOpportunity: scoredLeads.filter(l => l.opportunityScore >= 40 && l.opportunityScore < 70).length,
      lowOpportunity: scoredLeads.filter(l => l.opportunityScore < 40).length
    },
    leads: scoredLeads
  };
  
  fs.writeFileSync(outputFile, JSON.stringify(output, null, 2));
  
  return { outputFile, metadata: output.metadata, topLeads: scoredLeads.slice(0, 5) };
}

/**
 * Score a single website using comprehensive master scorer
 * Returns detailed breakdown with all scoring dimensions
 */
async function scoreWebsiteComprehensive(url, lead = {}) {
  if (!masterScorer) {
    console.log('⚠️ Master scorer not available, falling back to basic scoring');
    return null;
  }
  
  try {
    const result = await masterScorer.masterScore(url, {
      verbose: false,
      businessData: {
        rating: lead.rating,
        reviewCount: lead.reviewCount,
        industry: lead.industry || lead.category
      }
    });
    
    // Convert to format compatible with existing code
    return {
      url: result.url,
      hasWebsite: !!url,
      opportunityScore: result.opportunityScore,
      finalScore: result.opportunityScore,
      breakdown: {
        technical: result.breakdown.technical.score,
        visual: result.breakdown.visual.score,
        conversion: result.breakdown.conversion.score,
        content: result.breakdown.content.score,
        trust: result.breakdown.trust.score
      },
      details: {
        tier: result.opportunityTier,
        tierDescription: result.tierDescription,
        siteQualityScore: result.siteQualityScore,
        topIssues: result.topIssues,
        salesAngles: result.salesAngles,
        estimatedProjectValue: result.estimatedProjectValue,
        priorityLevel: result.priorityLevel
      },
      comprehensive: result // Full result for detailed access
    };
    
  } catch (error) {
    console.error(`    Comprehensive scoring error: ${error.message}`);
    return null;
  }
}

/**
 * Process all files in raw directory or a specific file
 */
async function main() {
  console.log('═'.repeat(60));
  console.log('  WEBSITE SCORER - SLC Lead Gen');
  
  // Check for comprehensive mode flag
  if (process.argv.includes('--comprehensive') || process.argv.includes('-c')) {
    if (masterScorer) {
      SCORING_MODE = 'comprehensive';
      console.log('  Using COMPREHENSIVE scoring (all dimensions)');
    } else {
      console.log('  ⚠️ Master scorer not found, using basic Lighthouse');
    }
  } else {
    console.log('  Using Lighthouse for professional-grade analysis');
    console.log('  Tip: Use --comprehensive for full multi-dimension scoring');
  }
  console.log('═'.repeat(60));
  
  const args = process.argv.slice(2);
  let files = [];
  
  if (args.length > 0) {
    // Specific file provided
    const inputPath = args[0];
    if (fs.existsSync(inputPath)) {
      files = [inputPath];
    } else {
      console.error(`\n❌ File not found: ${inputPath}`);
      process.exit(1);
    }
  } else {
    // Process all files in raw directory
    if (!fs.existsSync(RAW_DIR)) {
      console.log(`\n⚠️ Raw leads directory not found: ${RAW_DIR}`);
      console.log('   Create it and add lead JSON files.');
      process.exit(1);
    }
    
    files = fs.readdirSync(RAW_DIR)
      .filter(f => f.endsWith('.json'))
      .map(f => path.join(RAW_DIR, f));
    
    if (files.length === 0) {
      console.log(`\n⚠️ No JSON files found in ${RAW_DIR}`);
      process.exit(1);
    }
  }
  
  console.log(`\n📂 Files to process: ${files.length}`);
  console.log(`⏱️ Rate limit: ${RATE_LIMIT.delayBetweenSites}ms between sites\n`);
  
  const results = [];
  
  for (const file of files) {
    const result = await scoreLeadsFile(file);
    if (result) {
      results.push(result);
    }
  }
  
  // Final summary
  console.log('\n' + '═'.repeat(60));
  console.log('  SCORING COMPLETE');
  console.log('═'.repeat(60));
  
  for (const result of results) {
    console.log(`\n📊 ${path.basename(result.outputFile)}:`);
    console.log(`   Total: ${result.metadata.totalLeads} | Avg Score: ${result.metadata.averageOpportunityScore}`);
    console.log(`   🔥 High: ${result.metadata.highOpportunity} | ⚡ Med: ${result.metadata.mediumOpportunity} | · Low: ${result.metadata.lowOpportunity}`);
    
    console.log('\n   🔥 TOP OPPORTUNITIES:');
    result.topLeads.forEach((lead, i) => {
      const name = (lead.name || lead.businessName || 'Unknown').substring(0, 35);
      console.log(`   ${i + 1}. ${name.padEnd(35)} Score: ${lead.opportunityScore}`);
    });
    
    console.log(`\n   💾 Saved: ${result.outputFile}`);
  }
  
  console.log('\n' + '═'.repeat(60));
}

// Run
main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

module.exports = { 
  scoreWebsite, 
  scoreWebsiteComprehensive,
  scoreLeadsFile, 
  calculateOpportunityScore,
  SCORING_MODE
};
