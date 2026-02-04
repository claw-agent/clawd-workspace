#!/usr/bin/env node
/**
 * Business Info Scraper for SLC Lead Gen
 * 
 * Extracts business information from websites using:
 * - Jina Reader (free web-to-markdown API)
 * - Puppeteer for screenshots
 * 
 * Usage:
 *   Single URL:  node business-scraper.js "https://example.com"
 *   Batch mode:  node business-scraper.js <scored-leads.json> [--threshold 50]
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const OUTPUT_DIR = path.join(__dirname, '..', 'data', 'leads', 'enriched');
const SCREENSHOT_DIR = path.join(OUTPUT_DIR, 'screenshots');

/**
 * Fetch content using Jina Reader (free, no API key needed)
 */
async function fetchWithJina(url) {
  const jinaUrl = `https://r.jina.ai/${url}`;
  
  return new Promise((resolve, reject) => {
    const client = jinaUrl.startsWith('https') ? https : http;
    
    const req = client.get(jinaUrl, {
      headers: {
        'Accept': 'text/markdown',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      },
      timeout: 30000
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data);
        } else {
          reject(new Error(`Jina returned ${res.statusCode}`));
        }
      });
    });
    
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Jina request timed out'));
    });
  });
}

/**
 * Extract structured business info from markdown content
 */
function extractBusinessInfo(markdown, url) {
  const info = {
    businessName: null,
    services: [],
    phone: null,
    email: null,
    address: null,
    aboutText: null,
    socialLinks: {},
    yearsInBusiness: null,
    ownerName: null,
    businessHours: null,
    certifications: []
  };
  
  const text = markdown || '';
  
  // Extract business name from title or first heading
  const titleMatch = text.match(/^#\s+(.+)$/m) || text.match(/^Title:\s*(.+)$/im);
  if (titleMatch) {
    let name = titleMatch[1].trim();
    // Clean up common suffixes
    name = name.replace(/\s*[-|–]\s*(Home|About|Contact|Services).*$/i, '');
    name = name.replace(/\s*\|\s*.*$/, '');
    info.businessName = name;
  }
  
  // Extract phone numbers (prioritize first one found)
  const phonePatterns = [
    /(?:phone|call|tel|contact)[:\s]*\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/gi,
    /\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g
  ];
  
  for (const pattern of phonePatterns) {
    const matches = text.match(pattern);
    if (matches) {
      // Clean up to just the number
      const phone = matches[0].replace(/.*?(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}).*/, '$1');
      info.phone = phone;
      break;
    }
  }
  
  // Extract email addresses
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (emailMatch) {
    info.email = emailMatch[0].toLowerCase();
  }
  
  // Extract address (look for common patterns)
  const addressPatterns = [
    /(\d{1,5}\s+[A-Za-z0-9\s,]+(?:Street|St|Avenue|Ave|Road|Rd|Drive|Dr|Boulevard|Blvd|Lane|Ln|Way|Court|Ct|Circle|Cir)[,.\s]+[A-Za-z\s]+,?\s*(?:UT|Utah)?\s*\d{5})/i,
    /(\d{1,5}\s+[^,\n]+,\s*[A-Za-z\s]+,?\s*(?:UT|Utah)\s*\d{5})/i,
    /(?:address|location)[:\s]*([^\n]+(?:UT|Utah|\d{5})[^\n]*)/i
  ];
  
  for (const pattern of addressPatterns) {
    const match = text.match(pattern);
    if (match) {
      info.address = match[1].trim().replace(/\s+/g, ' ');
      break;
    }
  }
  
  // Extract services - look for lists under service-related headings
  const servicesSection = text.match(/(?:##?\s*(?:our\s+)?services|what\s+we\s+(?:do|offer)|specialties)[^\n]*\n([\s\S]*?)(?=\n##|\n\n\n|$)/i);
  if (servicesSection) {
    const listItems = servicesSection[1].match(/^[\s]*[-*•]\s*(.+)$/gm);
    if (listItems) {
      info.services = listItems
        .map(item => item.replace(/^[\s]*[-*•]\s*/, '').trim())
        .map(item => item.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')) // Strip markdown links, keep text
        .filter(s => s.length > 2 && s.length < 100)
        .filter(s => !/^-{3,}$/.test(s)) // No horizontal rules
        .slice(0, 15);
    }
  }
  
  // If no services section, look for any bullet lists
  if (info.services.length === 0) {
    const allLists = text.match(/^[\s]*[-*•]\s*(.+)$/gm);
    if (allLists) {
      // Filter to likely services (exclude navigation, footer items)
      info.services = allLists
        .map(item => item.replace(/^[\s]*[-*•]\s*/, '').trim())
        .filter(s => {
          if (s.length < 5 || s.length > 80) return false;
          if (/^(home|about|contact|blog|faq|privacy|terms)/i.test(s)) return false;
          if (/click|learn more|read more|view/i.test(s)) return false;
          if (/\]\(http/i.test(s)) return false; // Markdown links
          if (/^-{3,}$/.test(s)) return false; // Horizontal rules
          if (/^\[.*\]\(.*\)$/.test(s)) return false; // Full markdown links
          return true;
        })
        .slice(0, 10);
    }
  }
  
  // Fallback: Look for service keywords in headers or emphasized text
  if (info.services.length === 0) {
    const serviceKeywords = [
      /water heater/gi, /drain cleaning/gi, /sewer/gi, /leak (?:detection|repair)/gi,
      /pipe (?:repair|replacement)/gi, /emergency plumbing/gi, /bathroom remodel/gi,
      /kitchen plumbing/gi, /gas line/gi, /water softener/gi, /garbage disposal/gi,
      /faucet/gi, /toilet/gi, /shower/gi, /hvac/gi, /heating/gi, /cooling/gi,
      /air conditioning/gi, /furnace/gi, /duct/gi, /electrical/gi, /roofing/gi,
      /painting/gi, /remodel/gi, /renovation/gi, /landscaping/gi, /lawn/gi,
      /tree/gi, /pest control/gi, /insulation/gi, /drywall/gi, /flooring/gi
    ];
    
    const foundServices = new Set();
    for (const pattern of serviceKeywords) {
      const matches = text.match(pattern);
      if (matches) {
        matches.forEach(m => foundServices.add(m.toLowerCase().trim()));
      }
    }
    info.services = [...foundServices].slice(0, 15);
  }
  
  // Extract about text - first substantial paragraph or about section
  const aboutSection = text.match(/(?:##?\s*about(?:\s+us)?)[^\n]*\n([\s\S]*?)(?=\n##|\n\n\n|$)/i);
  if (aboutSection) {
    info.aboutText = aboutSection[1]
      .replace(/\[.*?\]\(.*?\)/g, '') // Remove markdown links
      .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
      .replace(/\n+/g, ' ')
      .trim()
      .slice(0, 500);
  } else {
    // Get first substantial paragraph
    const paragraphs = text.split(/\n\n+/);
    for (const p of paragraphs) {
      // Clean up the paragraph
      let clean = p
        .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
        .replace(/\[.*?\]\(.*?\)/g, '') // Remove links
        .replace(/[#*]/g, '')
        .trim();
      
      // Skip if it looks like tracking/junk
      if (clean.length > 100 && 
          !/^(title:|url:|markdown)/i.test(clean) &&
          !/adroll|tracking|pixel|analytics/i.test(clean) &&
          !/^Image\s*\d/i.test(clean)) {
        info.aboutText = clean.slice(0, 500);
        break;
      }
    }
  }
  
  // Extract owner/founder name (must look like a person's name: 2-3 capitalized words)
  const ownerPatterns = [
    /(?:owner|founder|president|ceo|proprietor)[:\s]+([A-Z][a-z]{2,15}\s+[A-Z][a-z]{2,15}(?:\s+[A-Z][a-z]{2,15})?)/,
    /([A-Z][a-z]{2,15}\s+[A-Z][a-z]{2,15})(?:\s+is\s+the\s+)?(?:owner|founder)/,
    /(?:hi,?\s+i'?m|meet)\s+([A-Z][a-z]{2,15}(?:\s+[A-Z][a-z]{2,15})?)/i
  ];
  
  for (const pattern of ownerPatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      info.ownerName = match[1].trim();
      break;
    }
  }
  
  // Extract years in business
  const yearPatterns = [
    /(?:serving|business|established|since|founded)\s+(?:for\s+)?(\d+)\s+years/i,
    /since\s+(\d{4})/i,
    /(\d+)\+?\s+years?\s+(?:of\s+)?experience/i,
    /established\s+(?:in\s+)?(\d{4})/i
  ];
  
  for (const pattern of yearPatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      const val = parseInt(match[1]);
      if (val > 1900 && val < 2030) {
        info.yearsInBusiness = new Date().getFullYear() - val;
      } else if (val < 100) {
        info.yearsInBusiness = val;
      }
      break;
    }
  }
  
  // Extract social links
  const socialPatterns = {
    facebook: /https?:\/\/(?:www\.)?facebook\.com\/[a-zA-Z0-9._-]+/gi,
    instagram: /https?:\/\/(?:www\.)?instagram\.com\/[a-zA-Z0-9._-]+/gi,
    twitter: /https?:\/\/(?:www\.)?(?:twitter|x)\.com\/[a-zA-Z0-9._-]+/gi,
    linkedin: /https?:\/\/(?:www\.)?linkedin\.com\/(?:company|in)\/[a-zA-Z0-9._-]+/gi,
    yelp: /https?:\/\/(?:www\.)?yelp\.com\/biz\/[a-zA-Z0-9._-]+/gi
  };
  
  for (const [platform, pattern] of Object.entries(socialPatterns)) {
    const match = text.match(pattern);
    if (match) {
      info.socialLinks[platform] = match[0];
    }
  }
  
  // Extract certifications
  const certMatches = text.match(/(?:licensed|certified|bonded|insured|accredited|bbb|angi|home\s*advisor)/gi);
  if (certMatches) {
    info.certifications = [...new Set(certMatches.map(c => c.toLowerCase()))];
  }
  
  // Extract business hours
  const hoursMatch = text.match(/(?:hours|open)[:\s]*([^\n]*(?:am|pm)[^\n]*)/i);
  if (hoursMatch) {
    info.businessHours = hoursMatch[1].trim().slice(0, 200);
  }
  
  return info;
}

/**
 * Take a screenshot of the website
 */
async function takeScreenshot(url, browser) {
  const page = await browser.newPage();
  
  try {
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36');
    await page.setViewport({ width: 1280, height: 900 });
    
    await page.goto(url, { 
      waitUntil: 'networkidle2', 
      timeout: 20000 
    });
    
    // Wait a bit for any lazy-loaded content
    await new Promise(r => setTimeout(r, 1000));
    
    // Generate filename from URL
    const hostname = new URL(url).hostname.replace(/^www\./, '');
    const safeHostname = hostname.replace(/[^a-z0-9.-]/gi, '_');
    
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
    const screenshotPath = path.join(SCREENSHOT_DIR, `${safeHostname}.png`);
    
    await page.screenshot({ 
      path: screenshotPath,
      fullPage: false 
    });
    
    await page.close();
    return screenshotPath;
    
  } catch (error) {
    await page.close();
    console.log(`  ⚠ Screenshot failed: ${error.message}`);
    return null;
  }
}

/**
 * Scrape a single business website
 */
async function scrapeBusinessUrl(url) {
  console.log('═'.repeat(50));
  console.log('  BUSINESS INFO SCRAPER');
  console.log('═'.repeat(50));
  console.log(`  URL: ${url}`);
  console.log('═'.repeat(50));
  
  // Normalize URL
  if (!url.startsWith('http')) {
    url = 'https://' + url;
  }
  
  const result = {
    url,
    scrapedAt: new Date().toISOString(),
    info: null,
    screenshot: null,
    rawMarkdown: null,
    error: null
  };
  
  // Fetch with Jina Reader
  console.log('\n📄 Fetching content via Jina Reader...');
  try {
    const markdown = await fetchWithJina(url);
    result.rawMarkdown = markdown;
    console.log(`   ✓ Got ${markdown.length} chars of content`);
    
    // Check if we got a bot challenge page instead of real content
    const isBotChallenge = markdown.toLowerCase().includes('robot challenge') || 
                           markdown.toLowerCase().includes('checking your browser') ||
                           markdown.toLowerCase().includes('captcha') ||
                           markdown.length < 500;
    
    if (isBotChallenge) {
      throw new Error('Bot challenge detected - site has protection');
    }
    
    // Extract structured info
    console.log('\n🔍 Extracting business info...');
    result.info = extractBusinessInfo(markdown, url);
    
    // Log what we found
    const found = [];
    if (result.info.businessName) found.push(`Name: ${result.info.businessName}`);
    if (result.info.phone) found.push(`Phone: ${result.info.phone}`);
    if (result.info.email) found.push(`Email: ${result.info.email}`);
    if (result.info.address) found.push(`Address: ✓`);
    if (result.info.services.length) found.push(`Services: ${result.info.services.length}`);
    if (result.info.ownerName) found.push(`Owner: ${result.info.ownerName}`);
    
    console.log(`   ✓ Found: ${found.join(' | ')}`);
    
  } catch (error) {
    console.log(`   ✗ Jina fetch failed: ${error.message}`);
    console.log('   ↪ Trying Puppeteer fallback...');
    
    // Puppeteer fallback for bot-protected sites
    let fallbackBrowser;
    try {
      fallbackBrowser = await require('puppeteer').launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      const page = await fallbackBrowser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      
      // Extract text content from page
      const pageContent = await page.evaluate(() => {
        // Get all text
        const body = document.body;
        const text = body ? body.innerText : '';
        
        // Get structured data
        const title = document.title;
        const h1 = document.querySelector('h1')?.innerText || '';
        const phones = text.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g) || [];
        const emails = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
        
        return { title, h1, text: text.slice(0, 50000), phones, emails };
      });
      
      // Build markdown-like content for extraction
      const fallbackMarkdown = `# ${pageContent.h1 || pageContent.title}\n\n${pageContent.text}`;
      result.info = extractBusinessInfo(fallbackMarkdown, url);
      
      // Also grab phone/email directly if extraction missed them
      if (!result.info.phone && pageContent.phones.length > 0) {
        result.info.phone = pageContent.phones[0];
      }
      if (!result.info.email && pageContent.emails.length > 0) {
        result.info.email = pageContent.emails[0];
      }
      
      console.log(`   ✓ Puppeteer fallback succeeded`);
      result.error = null; // Clear error since fallback worked
      
    } catch (fallbackError) {
      console.log(`   ✗ Puppeteer fallback also failed: ${fallbackError.message}`);
      result.error = `Jina: ${error.message}, Puppeteer: ${fallbackError.message}`;
    } finally {
      if (fallbackBrowser) await fallbackBrowser.close();
    }
  }
  
  // Supplement with Puppeteer if missing critical contact info
  if (result.info && (!result.info.phone || !result.info.email)) {
    console.log('\n🔄 Supplementing with Puppeteer (missing phone/email)...');
    let suppBrowser;
    try {
      suppBrowser = await require('puppeteer').launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      const page = await suppBrowser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36');
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      
      const contactInfo = await page.evaluate(() => {
        const text = document.body?.innerText || '';
        const phones = text.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g) || [];
        const emails = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
        return { phones, emails };
      });
      
      if (!result.info.phone && contactInfo.phones.length > 0) {
        result.info.phone = contactInfo.phones[0];
        console.log(`   ✓ Found phone: ${result.info.phone}`);
      }
      if (!result.info.email && contactInfo.emails.length > 0) {
        result.info.email = contactInfo.emails.find(e => !e.includes('example') && !e.includes('test')) || contactInfo.emails[0];
        console.log(`   ✓ Found email: ${result.info.email}`);
      }
    } catch (e) {
      console.log(`   ✗ Supplement failed: ${e.message}`);
    } finally {
      if (suppBrowser) await suppBrowser.close();
    }
  }

  // Take screenshot with Puppeteer
  console.log('\n📸 Taking screenshot...');
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    result.screenshot = await takeScreenshot(url, browser);
    if (result.screenshot) {
      console.log(`   ✓ Saved: ${result.screenshot}`);
    }
    
  } catch (error) {
    console.log(`   ✗ Screenshot failed: ${error.message}`);
  } finally {
    if (browser) await browser.close();
  }
  
  // Save to enriched folder
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  
  const hostname = new URL(url).hostname.replace(/^www\./, '');
  const safeHostname = hostname.replace(/[^a-z0-9.-]/gi, '_');
  const outputFile = path.join(OUTPUT_DIR, `${safeHostname}.json`);
  
  const output = {
    url: result.url,
    scrapedAt: result.scrapedAt,
    businessName: result.info?.businessName || null,
    services: result.info?.services || [],
    contact: {
      phone: result.info?.phone || null,
      email: result.info?.email || null,
      address: result.info?.address || null
    },
    aboutText: result.info?.aboutText || null,
    ownerName: result.info?.ownerName || null,
    yearsInBusiness: result.info?.yearsInBusiness || null,
    businessHours: result.info?.businessHours || null,
    certifications: result.info?.certifications || [],
    socialLinks: result.info?.socialLinks || {},
    screenshot: result.screenshot,
    error: result.error
  };
  
  fs.writeFileSync(outputFile, JSON.stringify(output, null, 2));
  
  // Print summary
  console.log('\n' + '─'.repeat(50));
  console.log('  EXTRACTED INFO');
  console.log('─'.repeat(50));
  console.log(`  Business: ${output.businessName || '(not found)'}`);
  console.log(`  Phone: ${output.contact.phone || '(not found)'}`);
  console.log(`  Email: ${output.contact.email || '(not found)'}`);
  console.log(`  Address: ${output.contact.address || '(not found)'}`);
  console.log(`  Services: ${output.services.length > 0 ? output.services.slice(0, 3).join(', ') + (output.services.length > 3 ? '...' : '') : '(not found)'}`);
  console.log(`  Owner: ${output.ownerName || '(not found)'}`);
  console.log('─'.repeat(50));
  
  console.log(`\n💾 Saved to: ${outputFile}`);
  
  return output;
}

/**
 * Enrich batch of leads (original functionality)
 */
async function enrichLeads(inputFile, scoreThreshold = 50) {
  console.log('═'.repeat(50));
  console.log('  BATCH BUSINESS ENRICHMENT');
  console.log('═'.repeat(50));
  console.log(`  Input: ${inputFile}`);
  console.log(`  Score Threshold: ${scoreThreshold}+`);
  console.log('═'.repeat(50));
  
  const data = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
  const allLeads = data.leads || [];
  const leadsToEnrich = allLeads.filter(l => (l.score || 0) >= scoreThreshold);
  
  console.log(`\n📊 Found ${allLeads.length} total leads`);
  console.log(`   ${leadsToEnrich.length} meet score threshold (${scoreThreshold}+)\n`);
  
  if (leadsToEnrich.length === 0) {
    console.log('⚠️ No leads meet the score threshold');
    return;
  }
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const enrichedLeads = [];
  
  for (let i = 0; i < leadsToEnrich.length; i++) {
    const lead = leadsToEnrich[i];
    console.log(`[${i + 1}/${leadsToEnrich.length}] ${lead.name} (Score: ${lead.score})`);
    
    let enrichment = {
      businessName: lead.name,
      services: [],
      contact: { phone: lead.phone, email: null, address: lead.address },
      aboutText: null,
      ownerName: null,
      yearsInBusiness: null,
      socialLinks: {}
    };
    
    if (lead.website) {
      let url = lead.website;
      if (!url.startsWith('http')) url = 'https://' + url;
      
      try {
        const markdown = await fetchWithJina(url);
        const info = extractBusinessInfo(markdown, url);
        
        enrichment = {
          businessName: info.businessName || lead.name,
          services: info.services,
          contact: {
            phone: info.phone || lead.phone,
            email: info.email,
            address: info.address || lead.address
          },
          aboutText: info.aboutText,
          ownerName: info.ownerName,
          yearsInBusiness: info.yearsInBusiness,
          businessHours: info.businessHours,
          certifications: info.certifications,
          socialLinks: info.socialLinks
        };
        
        // Take screenshot
        enrichment.screenshot = await takeScreenshot(url, browser);
        
        const found = [];
        if (info.ownerName) found.push(`Owner: ${info.ownerName}`);
        if (info.email) found.push(`Email: ${info.email}`);
        if (info.services.length) found.push(`${info.services.length} services`);
        console.log(`   ✓ ${found.length > 0 ? found.join(' | ') : 'Content extracted'}`);
        
      } catch (error) {
        console.log(`   ⚠ ${error.message}`);
        enrichment.error = error.message;
      }
    } else {
      console.log(`   ⚠ No website`);
    }
    
    enrichedLeads.push({
      ...lead,
      enrichment,
      enrichedAt: new Date().toISOString()
    });
    
    // Rate limiting
    await new Promise(r => setTimeout(r, 1500));
  }
  
  await browser.close();
  
  // Save results
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  
  const timestamp = new Date().toISOString().split('T')[0];
  const baseName = path.basename(inputFile, '.json').replace('_scored', '');
  const outputFile = path.join(OUTPUT_DIR, `${baseName}_enriched_${timestamp}.json`);
  
  const output = {
    metadata: {
      ...data.metadata,
      enrichedAt: new Date().toISOString(),
      scoreThreshold,
      totalEnriched: enrichedLeads.length,
      withOwnerName: enrichedLeads.filter(l => l.enrichment?.ownerName).length,
      withEmail: enrichedLeads.filter(l => l.enrichment?.contact?.email).length
    },
    leads: enrichedLeads
  };
  
  fs.writeFileSync(outputFile, JSON.stringify(output, null, 2));
  
  console.log('\n' + '─'.repeat(50));
  console.log('  ENRICHMENT SUMMARY');
  console.log('─'.repeat(50));
  console.log(`  Total Enriched: ${enrichedLeads.length}`);
  console.log(`  With Owner Name: ${output.metadata.withOwnerName}`);
  console.log(`  With Email: ${output.metadata.withEmail}`);
  console.log(`  With Services: ${enrichedLeads.filter(l => l.enrichment?.services?.length > 0).length}`);
  console.log('─'.repeat(50));
  console.log(`\n💾 Saved to: ${outputFile}`);
  
  return outputFile;
}

// Parse arguments
function parseArgs(args) {
  const result = { input: null, threshold: 50 };
  
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--threshold' && args[i + 1]) {
      result.threshold = parseInt(args[i + 1]);
      i++;
    } else if (!args[i].startsWith('--')) {
      result.input = args[i];
    }
  }
  
  return result;
}

// Main
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
Business Info Scraper for SLC Lead Gen
=======================================

Usage:
  Single URL:   node business-scraper.js "https://example.com"
  Batch mode:   node business-scraper.js <scored-leads.json> [--threshold 50]

Options:
  --threshold <n>   Minimum score to enrich in batch mode (default: 50)

Extracts:
  - Business name
  - Services offered
  - Contact info (phone, email, address)
  - About/description text
  - Owner/founder name
  - Years in business
  - Social media links
  - Certifications

Uses FREE tools:
  - Jina Reader (r.jina.ai) for content extraction
  - Puppeteer for screenshots
`);
    process.exit(1);
  }
  
  const { input, threshold } = parseArgs(args);
  
  if (!input) {
    console.error('Error: No URL or file specified');
    process.exit(1);
  }
  
  // Determine if it's a URL or a file
  const isUrl = input.startsWith('http') || input.includes('.com') || input.includes('.net') || input.includes('.org');
  const isFile = input.endsWith('.json') && fs.existsSync(input);
  
  if (isUrl) {
    await scrapeBusinessUrl(input);
  } else if (isFile) {
    await enrichLeads(input, threshold);
  } else {
    // Try as URL
    await scrapeBusinessUrl(input);
  }
}

main().catch(console.error);

module.exports = { scrapeBusinessUrl, enrichLeads, extractBusinessInfo };
