/**
 * Research Agent
 * 
 * Deeply analyzes a website to extract:
 * - What the product/service does
 * - Target audience
 * - Key features and benefits
 * - Pricing tiers (if found)
 * - Real testimonials
 * - Competitive positioning
 * - Unique selling propositions
 * 
 * Uses web_fetch to get content, then Claude (via Clawdbot) to analyze and structure findings.
 */

const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

// Use Clawdbot client instead of direct Anthropic API
const { messages } = require('./clawdbot-client');

/**
 * Fetch a URL and extract text content
 * @param {string} url - URL to fetch
 * @returns {Promise<string>} - Extracted text content
 */
async function fetchWebContent(url) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const protocol = parsedUrl.protocol === 'https:' ? https : http;
    
    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5'
      },
      timeout: 30000
    };
    
    const req = protocol.request(options, (res) => {
      // Follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const redirectUrl = new URL(res.headers.location, url).href;
        return fetchWebContent(redirectUrl).then(resolve).catch(reject);
      }
      
      let data = '';
      res.setEncoding('utf8');
      
      res.on('data', (chunk) => {
        data += chunk;
        // Limit to ~500KB
        if (data.length > 500000) {
          req.destroy();
          resolve(data);
        }
      });
      
      res.on('end', () => resolve(data));
    });
    
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    
    req.end();
  });
}

/**
 * Extract text content from HTML
 * @param {string} html - Raw HTML
 * @returns {string} - Cleaned text content
 */
function extractTextFromHtml(html) {
  // Remove scripts, styles, and other non-content elements
  let text = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, '')
    .replace(/<svg[^>]*>[\s\S]*?<\/svg>/gi, '')
    .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, (match) => {
      // Keep header content but mark it
      return '\n[HEADER START]\n' + match + '\n[HEADER END]\n';
    })
    .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '')  // Remove navigation
    .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, (match) => {
      return '\n[FOOTER START]\n' + match + '\n[FOOTER END]\n';
    });
  
  // Extract meta description
  const metaDesc = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
  const description = metaDesc ? metaDesc[1] : '';
  
  // Extract title
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';
  
  // Replace HTML tags with spaces/newlines
  text = text
    .replace(/<h[1-6][^>]*>/gi, '\n\n### ')
    .replace(/<\/h[1-6]>/gi, '\n')
    .replace(/<p[^>]*>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<li[^>]*>/gi, '\n• ')
    .replace(/<\/li>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .replace(/\n\s*\n/g, '\n\n')
    .trim();
  
  // Prepend title and description
  let result = '';
  if (title) result += `PAGE TITLE: ${title}\n\n`;
  if (description) result += `META DESCRIPTION: ${description}\n\n`;
  result += text;
  
  // Limit length for API
  return result.substring(0, 80000);
}

/**
 * Research a website deeply
 * @param {string} url - Website URL to analyze
 * @param {object} options - Optional settings
 * @returns {Promise<object>} - Structured research findings
 */
async function researchWebsite(url, options = {}) {
  console.log(`\n🔬 Research Agent analyzing: ${url}`);
  
  // Fetch main page content
  let pageContent = '';
  try {
    const html = await fetchWebContent(url);
    pageContent = extractTextFromHtml(html);
    console.log(`   📄 Fetched ${pageContent.length} chars of content`);
  } catch (error) {
    console.log(`   ⚠️ Failed to fetch page: ${error.message}`);
    // Continue with whatever we have from assets
  }
  
  // Also try to fetch pricing page if it exists
  let pricingContent = '';
  try {
    const pricingUrls = ['/pricing', '/plans', '/packages', '/rates'];
    for (const path of pricingUrls) {
      try {
        const pricingUrl = new URL(path, url).href;
        const pricingHtml = await fetchWebContent(pricingUrl);
        pricingContent = extractTextFromHtml(pricingHtml);
        if (pricingContent.length > 500) {
          console.log(`   💰 Found pricing page at ${path}`);
          break;
        }
      } catch {
        continue;
      }
    }
  } catch {
    // Pricing page not found, that's OK
  }
  
  // Build the analysis prompt
  const analysisPrompt = `You are a world-class business analyst. Analyze this website content and extract detailed, actionable insights.

WEBSITE URL: ${url}

MAIN PAGE CONTENT:
${pageContent}

${pricingContent ? `PRICING PAGE CONTENT:\n${pricingContent}` : ''}

EXTRACT THE FOLLOWING (be specific and detailed, use actual content from the page):

1. **CORE OFFERING**
   - What exactly does this business/product do?
   - What problem does it solve?
   - How does it work (mechanism/approach)?

2. **TARGET AUDIENCE**
   - Who is the ideal customer?
   - What industries/roles/company sizes?
   - What pain points does this audience have?

3. **KEY FEATURES** (list 4-8)
   - Name each feature
   - Describe what it does
   - Explain the benefit to the user

4. **UNIQUE VALUE PROPOSITION**
   - What makes this different from competitors?
   - Key differentiators
   - Main selling points

5. **PRICING** (if found)
   - Pricing tiers/plans
   - What's included in each
   - Free trial/freemium details

6. **TESTIMONIALS** (if found)
   - Quote the actual testimonials
   - Include names, titles, companies if shown
   - Summarize the sentiment

7. **TRUST SIGNALS**
   - Certifications, awards
   - Customer logos/names
   - Statistics (user count, savings, etc.)

8. **TONE & VOICE**
   - How does the brand communicate?
   - Professional/casual/technical/friendly?
   - Any notable phrases or terminology used?

9. **CALLS TO ACTION**
   - What actions do they want visitors to take?
   - Primary CTA
   - Secondary CTAs

Respond in JSON format with these exact keys:
{
  "coreOffering": {
    "whatItDoes": "string",
    "problemSolved": "string",
    "howItWorks": "string"
  },
  "targetAudience": {
    "idealCustomer": "string",
    "industries": ["array"],
    "roles": ["array"],
    "painPoints": ["array"]
  },
  "features": [
    {
      "name": "string",
      "description": "string",
      "benefit": "string"
    }
  ],
  "valueProposition": {
    "mainUvp": "string",
    "differentiators": ["array"],
    "sellingPoints": ["array"]
  },
  "pricing": {
    "hasPricing": true/false,
    "tiers": [
      {
        "name": "string",
        "price": "string",
        "features": ["array"]
      }
    ],
    "freeTrial": "string or null"
  },
  "testimonials": [
    {
      "quote": "string",
      "author": "string",
      "title": "string",
      "company": "string"
    }
  ],
  "trustSignals": {
    "certifications": ["array"],
    "customerLogos": ["array"],
    "statistics": ["array"]
  },
  "toneAndVoice": {
    "style": "string",
    "keywords": ["array"],
    "notablePhrases": ["array"]
  },
  "callsToAction": {
    "primary": "string",
    "secondary": ["array"]
  }
}

Be thorough and extract ACTUAL content from the page. If information isn't available, use null or empty arrays - don't make things up.`;

  // Call Claude for analysis (via Clawdbot gateway)
  console.log('   🧠 Analyzing with Claude (via Clawdbot)...');
  
  const response = await messages.create({
    model: options.model || 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    messages: [
      {
        role: 'user',
        content: analysisPrompt
      }
    ]
  });
  
  // Extract JSON from response
  const responseText = response.content[0].text;
  
  // Try to parse JSON from the response
  let research;
  try {
    // Find JSON in the response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      research = JSON.parse(jsonMatch[0]);
    } else {
      throw new Error('No JSON found in response');
    }
  } catch (parseError) {
    console.log(`   ⚠️ Failed to parse research JSON: ${parseError.message}`);
    // Return a minimal structure
    research = {
      coreOffering: { whatItDoes: 'Unknown', problemSolved: 'Unknown', howItWorks: 'Unknown' },
      targetAudience: { idealCustomer: 'General', industries: [], roles: [], painPoints: [] },
      features: [],
      valueProposition: { mainUvp: '', differentiators: [], sellingPoints: [] },
      pricing: { hasPricing: false, tiers: [], freeTrial: null },
      testimonials: [],
      trustSignals: { certifications: [], customerLogos: [], statistics: [] },
      toneAndVoice: { style: 'Professional', keywords: [], notablePhrases: [] },
      callsToAction: { primary: 'Get Started', secondary: [] },
      _rawResponse: responseText
    };
  }
  
  // Add metadata
  research._metadata = {
    url,
    analyzedAt: new Date().toISOString(),
    contentLength: pageContent.length,
    hasPricingPage: pricingContent.length > 500
  };
  
  console.log(`   ✅ Research complete: ${research.features?.length || 0} features, ${research.testimonials?.length || 0} testimonials found`);
  
  return research;
}

module.exports = {
  researchWebsite,
  fetchWebContent,
  extractTextFromHtml
};

// CLI entry point
if (require.main === module) {
  const url = process.argv[2];
  if (!url) {
    console.log('Usage: node research-agent.js <url>');
    process.exit(1);
  }
  
  researchWebsite(url)
    .then(research => {
      console.log('\n📊 Research Results:');
      console.log(JSON.stringify(research, null, 2));
    })
    .catch(err => {
      console.error('Research failed:', err.message);
      process.exit(1);
    });
}
