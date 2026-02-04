#!/usr/bin/env node
/**
 * Lead Discovery Service for SLC Lead Gen
 * 
 * Uses FREE methods to find local businesses:
 * 1. Puppeteer scraping of Google Maps search results
 * 2. Yelp Fusion API (free tier - 500 calls/day)
 * 
 * Usage: node services/lead-discovery.js "category" "location" [maxResults]
 * Example: node services/lead-discovery.js "plumbers" "Salt Lake City" 5
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Helper: sleep function
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Configuration
const config = {
  maxResults: 20,
  scrollDelay: 2000,
  pageLoadDelay: 4000,
  yelpApiKey: process.env.YELP_API_KEY || null,
  dataDir: path.join(__dirname, '..', 'data', 'leads', 'raw')
};

/**
 * Scrape Google Maps search results using Puppeteer
 */
async function scrapeGoogleMaps(category, location, maxResults = config.maxResults) {
  console.log(`\n🗺️  Scraping Google Maps for "${category}" in "${location}"...`);
  
  const searchQuery = `${category} in ${location}`;
  const searchUrl = `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`;
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-blink-features=AutomationControlled']
  });
  
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');
  await page.setViewport({ width: 1280, height: 900 });
  
  const businesses = [];
  
  try {
    console.log(`   Loading: ${searchUrl}`);
    await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(config.pageLoadDelay);
    
    // Handle consent dialog if present
    try {
      const consentButton = await page.$('button[aria-label*="Accept"], form[action*="consent"] button');
      if (consentButton) {
        await consentButton.click();
        await sleep(2000);
      }
    } catch (e) { /* no consent needed */ }
    
    // Wait for results to load
    await page.waitForSelector('div[role="feed"], div[role="main"]', { timeout: 10000 });
    
    // Scroll to load more results
    let scrollAttempts = 0;
    const maxScrollAttempts = Math.ceil(maxResults / 5);
    
    while (scrollAttempts < maxScrollAttempts) {
      await page.evaluate(() => {
        const feed = document.querySelector('div[role="feed"]');
        if (feed) feed.scrollBy(0, 800);
      });
      await sleep(config.scrollDelay);
      scrollAttempts++;
    }
    
    // Extract business cards from results
    const extractedData = await page.evaluate((max) => {
      const results = [];
      
      // Find all clickable business entries
      const entries = document.querySelectorAll('a[href*="/maps/place/"]');
      const seen = new Set();
      
      for (const entry of entries) {
        if (results.length >= max) break;
        
        // Get the parent card container
        let card = entry;
        for (let i = 0; i < 5; i++) {
          if (card.parentElement) card = card.parentElement;
        }
        
        const href = entry.href || '';
        if (seen.has(href) || !href.includes('/maps/place/')) continue;
        seen.add(href);
        
        // Extract name from aria-label or text content
        const ariaLabel = entry.getAttribute('aria-label') || '';
        let name = ariaLabel.split('·')[0].trim();
        
        if (!name) {
          // Try to find name in child elements
          const headings = card.querySelectorAll('[class*="fontHeadline"], [class*="title"]');
          for (const h of headings) {
            const text = h.textContent?.trim();
            if (text && text.length > 2 && text.length < 100) {
              name = text;
              break;
            }
          }
        }
        
        if (!name || name.length < 2) continue;
        
        // Extract rating from aria-label
        let rating = null;
        let reviewCount = null;
        const ratingMatch = ariaLabel.match(/([\d.]+)\s*stars?/i);
        if (ratingMatch) rating = parseFloat(ratingMatch[1]);
        const reviewMatch = ariaLabel.match(/([\d,]+)\s*reviews?/i);
        if (reviewMatch) reviewCount = parseInt(reviewMatch[1].replace(/,/g, ''));
        
        // Look for rating in child elements too
        if (!rating) {
          const ratingEl = card.querySelector('span[role="img"]');
          if (ratingEl) {
            const ariaRating = ratingEl.getAttribute('aria-label') || '';
            const m = ariaRating.match(/([\d.]+)/);
            if (m) rating = parseFloat(m[1]);
          }
        }
        
        // Extract text content for address/phone
        const allText = card.textContent || '';
        let address = '';
        let phone = '';
        
        // Phone pattern
        const phoneMatch = allText.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
        if (phoneMatch) phone = phoneMatch[0];
        
        // Address - look for Utah patterns
        const addressMatch = allText.match(/\d+[^·\n]*(?:St|Ave|Blvd|Rd|Dr|Way|Ln|Ct|Cir|Street|Avenue|Boulevard|Road|Drive)[^·\n]*/i);
        if (addressMatch) address = addressMatch[0].trim();
        
        results.push({
          name,
          rating,
          reviewCount,
          address,
          phone,
          mapsUrl: href,
          source: 'google_maps'
        });
      }
      
      return results;
    }, maxResults);
    
    console.log(`   Found ${extractedData.length} business cards`);
    
    // Visit each business page to get website and more details
    for (let i = 0; i < Math.min(extractedData.length, maxResults); i++) {
      const biz = extractedData[i];
      
      try {
        await page.goto(biz.mapsUrl, { waitUntil: 'networkidle2', timeout: 20000 });
        await sleep(2500);
        
        // Extract details from business page
        const details = await page.evaluate(() => {
          let website = '';
          let phone = '';
          let address = '';
          
          // Find all button/link elements with data attributes
          const allElements = document.querySelectorAll('a[href], button[data-item-id]');
          
          for (const el of allElements) {
            const href = el.href || '';
            const text = el.textContent?.trim() || '';
            const itemId = el.getAttribute('data-item-id') || '';
            const ariaLabel = el.getAttribute('aria-label') || '';
            
            // Website detection
            if (itemId === 'authority' || ariaLabel.toLowerCase().includes('website')) {
              website = href || text;
            } else if (href && !website && 
                       !href.includes('google.com') && 
                       !href.includes('facebook.com') && 
                       !href.includes('instagram.com') &&
                       !href.includes('yelp.com') &&
                       !href.includes('maps/') &&
                       (href.includes('.com') || href.includes('.net') || href.includes('.org'))) {
              // Looks like a business website
              if (!href.includes('mailto:') && !href.includes('tel:')) {
                website = href;
              }
            }
            
            // Phone detection
            if (itemId.includes('phone') || ariaLabel.toLowerCase().includes('phone')) {
              const phoneText = text.replace(/[^0-9()-.\s]/g, '').trim();
              if (phoneText.length >= 10) phone = phoneText;
            }
            
            // Address detection
            if (itemId === 'address' || ariaLabel.toLowerCase().includes('address')) {
              address = text;
            }
          }
          
          // Fallback: search visible text for patterns
          if (!phone) {
            const bodyText = document.body.innerText;
            const phoneMatch = bodyText.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
            if (phoneMatch) phone = phoneMatch[0];
          }
          
          // Look for website link in info section
          if (!website) {
            const links = document.querySelectorAll('a[href^="http"]');
            for (const link of links) {
              const h = link.href;
              if (h && !h.includes('google') && !h.includes('facebook') && 
                  !h.includes('instagram') && !h.includes('yelp') &&
                  !h.includes('maps') && !h.includes('mailto') && !h.includes('tel')) {
                website = h;
                break;
              }
            }
          }
          
          return { website, phone, address };
        });
        
        biz.website = details.website || '';
        biz.phone = details.phone || biz.phone || '';
        biz.address = details.address || biz.address || '';
        
        businesses.push(biz);
        console.log(`   ✓ ${biz.name}`);
        console.log(`     📍 ${biz.address || 'No address'}`);
        console.log(`     📞 ${biz.phone || 'No phone'}`);
        console.log(`     🌐 ${biz.website || 'No website'}`);
        
      } catch (err) {
        console.log(`   ⚠ Error getting details for ${biz.name}: ${err.message}`);
        businesses.push(biz); // Still include with partial data
      }
    }
    
  } catch (error) {
    console.error('Error scraping Google Maps:', error.message);
  } finally {
    await browser.close();
  }
  
  return businesses;
}

/**
 * Search Yelp Fusion API (free tier)
 */
async function searchYelp(category, location, limit = 20) {
  if (!config.yelpApiKey) {
    console.log('\n⚠️  YELP_API_KEY not set, skipping Yelp search');
    return [];
  }
  
  console.log(`\n🔴 Searching Yelp for "${category}" in "${location}"...`);
  
  const params = new URLSearchParams({
    location: location,
    term: category,
    limit: limit.toString(),
    sort_by: 'rating'
  });
  
  try {
    const response = await fetch(
      `https://api.yelp.com/v3/businesses/search?${params}`,
      {
        headers: {
          'Authorization': `Bearer ${config.yelpApiKey}`,
          'Accept': 'application/json'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`Yelp API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    const businesses = (data.businesses || []).map(biz => ({
      name: biz.name,
      rating: biz.rating,
      reviewCount: biz.review_count,
      address: biz.location?.display_address?.join(', ') || '',
      phone: biz.display_phone || biz.phone || '',
      website: biz.url,
      yelpUrl: biz.url,
      categories: biz.categories?.map(c => c.title).join(', ') || '',
      priceLevel: biz.price || '',
      source: 'yelp'
    }));
    
    console.log(`   Found ${businesses.length} businesses on Yelp`);
    return businesses;
    
  } catch (error) {
    console.error('Yelp API error:', error.message);
    return [];
  }
}

/**
 * Merge and deduplicate results
 */
function mergeResults(googleResults, yelpResults) {
  const merged = new Map();
  
  for (const biz of googleResults) {
    const key = normalizeBusinessName(biz.name);
    merged.set(key, biz);
  }
  
  for (const biz of yelpResults) {
    const key = normalizeBusinessName(biz.name);
    if (merged.has(key)) {
      const existing = merged.get(key);
      existing.yelpUrl = biz.yelpUrl;
      existing.categories = biz.categories;
      existing.priceLevel = biz.priceLevel;
      if (!existing.phone) existing.phone = biz.phone;
      if (!existing.address) existing.address = biz.address;
      existing.sources = ['google_maps', 'yelp'];
    } else {
      biz.sources = ['yelp'];
      merged.set(key, biz);
    }
  }
  
  return Array.from(merged.values());
}

function normalizeBusinessName(name) {
  return (name || '').toLowerCase().replace(/[^a-z0-9]/g, '').trim();
}

/**
 * Save results to JSON file
 */
function saveResults(leads, category, location) {
  if (!fs.existsSync(config.dataDir)) {
    fs.mkdirSync(config.dataDir, { recursive: true });
  }
  
  const timestamp = new Date().toISOString().split('T')[0];
  const safeCategory = category.toLowerCase().replace(/\s+/g, '-');
  const safeLocation = location.toLowerCase().replace(/\s+/g, '-').replace(/,/g, '');
  const filename = `${safeCategory}_${safeLocation}_${timestamp}.json`;
  const filepath = path.join(config.dataDir, filename);
  
  const output = {
    metadata: {
      category,
      location,
      searchDate: new Date().toISOString(),
      totalResults: leads.length
    },
    leads
  };
  
  fs.writeFileSync(filepath, JSON.stringify(output, null, 2));
  console.log(`\n💾 Saved ${leads.length} leads to: ${filepath}`);
  
  return filepath;
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log(`
Lead Discovery Service for SLC Lead Gen
========================================

Usage: node services/lead-discovery.js "category" "location" [maxResults]

Examples:
  node services/lead-discovery.js "plumbers" "Salt Lake City" 5
  node services/lead-discovery.js "HVAC contractors" "Provo, Utah" 10
  node services/lead-discovery.js "dentists" "Ogden, UT"

Options:
  Set YELP_API_KEY environment variable to enable Yelp search
`);
    process.exit(1);
  }
  
  const [category, location] = args;
  const maxResults = parseInt(args[2]) || 5;
  
  console.log('═'.repeat(50));
  console.log('  LEAD DISCOVERY SERVICE');
  console.log('═'.repeat(50));
  console.log(`  Category: ${category}`);
  console.log(`  Location: ${location}`);
  console.log(`  Max Results: ${maxResults}`);
  console.log('═'.repeat(50));
  
  const googleResults = await scrapeGoogleMaps(category, location, maxResults);
  const yelpResults = await searchYelp(category, location, maxResults);
  const allLeads = mergeResults(googleResults, yelpResults);
  
  console.log('\n' + '─'.repeat(50));
  console.log('  RESULTS SUMMARY');
  console.log('─'.repeat(50));
  console.log(`  Google Maps: ${googleResults.length} businesses`);
  console.log(`  Yelp: ${yelpResults.length} businesses`);
  console.log(`  Total (deduplicated): ${allLeads.length} leads`);
  console.log('─'.repeat(50));
  
  console.log('\n📋 DISCOVERED LEADS:\n');
  allLeads.forEach((lead, i) => {
    console.log(`${i + 1}. ${lead.name}`);
    console.log(`   📍 ${lead.address || 'No address'}`);
    console.log(`   📞 ${lead.phone || 'No phone'}`);
    console.log(`   🌐 ${lead.website || 'No website'}`);
    console.log(`   ⭐ ${lead.rating || 'N/A'} (${lead.reviewCount || 0} reviews)`);
    console.log(`   📦 Source: ${Array.isArray(lead.sources) ? lead.sources.join(', ') : lead.source}`);
    console.log('');
  });
  
  const filepath = saveResults(allLeads, category, location);
  console.log('\n✅ Lead discovery complete!');
  
  return allLeads;
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { scrapeGoogleMaps, searchYelp, mergeResults, saveResults };
