/**
 * Classifier Agent
 * 
 * Classifies business type AFTER deep research, using:
 * - Target audience (B2B vs B2C)
 * - Pricing model (subscription vs one-time vs hourly)
 * - Delivery method (software/app vs in-person service)
 * - Geographic scope (local/regional vs national/global)
 * - Industry signals from research
 * 
 * Categories:
 * - saas-tech: Software products, apps, platforms, B2B tech
 * - home-services: Local service businesses (plumbing, HVAC, etc.)
 * - restaurant: Food service, dining
 * - professional-services: Law, accounting, consulting, medical (in-person)
 * - ecommerce: Online retail, physical product sales
 * - generic: Fallback when unclear
 */

const { messages } = require('./clawdbot-client');

/**
 * Classification categories with descriptions for Claude
 */
const BUSINESS_CATEGORIES = {
  'saas-tech': {
    description: 'Software-as-a-Service, B2B/B2C software products, platforms, apps, tech tools',
    signals: [
      'Subscription or tiered pricing',
      'Target audience is businesses/professionals',
      'Product is software, app, or platform',
      'Digital delivery (login, download, cloud)',
      'Features like dashboard, integrations, API',
      'National/global reach',
      'Terms like "sign up", "free trial", "demo"'
    ]
  },
  'home-services': {
    description: 'Local service businesses: plumbing, HVAC, electrical, cleaning, landscaping',
    signals: [
      'In-person service delivery',
      'Local/regional geographic focus',
      'Emergency/same-day service',
      'Licensed/bonded/insured mentions',
      'Phone calls as primary CTA',
      'Free estimate/quote offers',
      'B2C targeting homeowners'
    ]
  },
  'restaurant': {
    description: 'Food service: restaurants, cafes, bars, catering',
    signals: [
      'Menu offerings',
      'Reservations/orders',
      'Dine-in/takeout/delivery',
      'Hours of operation',
      'Food-related terminology',
      'Local establishment'
    ]
  },
  'professional-services': {
    description: 'Professional practices: law firms, accounting, consulting, medical/dental (in-person)',
    signals: [
      'Requires professional credentials (JD, CPA, MD)',
      'In-person consultations/appointments',
      'Hourly or project-based billing',
      'Regulatory compliance focus',
      'Established practices with staff bios',
      'Local/regional clientele'
    ]
  },
  'ecommerce': {
    description: 'Online retail: physical products, shopping carts, inventory',
    signals: [
      'Physical products for sale',
      'Shopping cart/checkout',
      'Shipping information',
      'Product catalog/inventory',
      'Price per unit',
      'Returns/refund policy'
    ]
  },
  'generic': {
    description: 'Fallback when business type is unclear or doesn\'t fit other categories',
    signals: ['Ambiguous or mixed signals', 'Insufficient information']
  }
};

/**
 * Classify business type based on research output
 * 
 * @param {object} research - Output from Research Agent
 * @param {object} assets - Extracted site assets (for supplementary signals)
 * @param {object} options - Configuration options
 * @returns {Promise<object>} - Classification result with type, confidence, and reasoning
 */
async function classifyBusinessType(research, assets = {}, options = {}) {
  console.log('\n🏷️  Classifier Agent analyzing research data...');
  
  // Quick classification signals from research
  const signals = extractClassificationSignals(research, assets);
  
  if (options.verbose) {
    console.log('   📊 Extracted signals:', JSON.stringify(signals, null, 2));
  }
  
  // Build the classification prompt
  const classificationPrompt = `You are a business classification expert. Based on deep research about a company, classify it into ONE of these categories:

## Categories

${Object.entries(BUSINESS_CATEGORIES).map(([key, val]) => `
### ${key.toUpperCase()}
${val.description}
Signals: ${val.signals.join(', ')}
`).join('\n')}

## Research Data

**Website URL:** ${research._metadata?.url || assets?.url || 'Unknown'}

**Core Offering:**
- What it does: ${research.coreOffering?.whatItDoes || 'Unknown'}
- Problem solved: ${research.coreOffering?.problemSolved || 'Unknown'}
- How it works: ${research.coreOffering?.howItWorks || 'Unknown'}

**Target Audience:**
- Ideal customer: ${research.targetAudience?.idealCustomer || 'Unknown'}
- Industries: ${(research.targetAudience?.industries || []).join(', ') || 'Unknown'}
- Roles: ${(research.targetAudience?.roles || []).join(', ') || 'Unknown'}
- Pain points: ${(research.targetAudience?.painPoints || []).join(', ') || 'Unknown'}

**Pricing Model:**
- Has pricing page: ${research.pricing?.hasPricing ? 'Yes' : 'No'}
- Pricing tiers: ${(research.pricing?.tiers || []).map(t => `${t.name}: ${t.price}`).join(', ') || 'Unknown'}
- Free trial: ${research.pricing?.freeTrial || 'Unknown'}

**Key Features:**
${(research.features || []).map(f => `- ${f.name}: ${f.description}`).join('\n') || 'Unknown'}

**Value Proposition:**
- Main UVP: ${research.valueProposition?.mainUvp || 'Unknown'}
- Differentiators: ${(research.valueProposition?.differentiators || []).join(', ') || 'Unknown'}

**Calls to Action:**
- Primary CTA: ${research.callsToAction?.primary || 'Unknown'}
- Secondary CTAs: ${(research.callsToAction?.secondary || []).join(', ') || 'Unknown'}

**Trust Signals:**
- Statistics: ${(research.trustSignals?.statistics || []).join(', ') || 'None'}
- Customer logos: ${(research.trustSignals?.customerLogos || []).join(', ') || 'None'}

## Quick Signal Analysis
${JSON.stringify(signals, null, 2)}

## Your Task

Based on ALL the above information, classify this business into exactly ONE category.

Think step by step:
1. Is this a software/digital product? → saas-tech
2. Is this a local service business (plumbing, HVAC, cleaning)? → home-services
3. Is this a restaurant/food service? → restaurant
4. Is this a professional practice (law, accounting, medical) with in-person services? → professional-services
5. Is this selling physical products online? → ecommerce
6. If unclear → generic

IMPORTANT DISTINCTIONS:
- B2B SOFTWARE targeting healthcare/medical practices is "saas-tech", NOT "professional-services"
- Practice management software, EHR systems, medical SaaS = "saas-tech"
- Actual medical/dental practices seeing patients = "professional-services"
- Software with subscription pricing = "saas-tech" even if it serves professional industries

Respond in JSON:
{
  "category": "one of: saas-tech, home-services, restaurant, professional-services, ecommerce, generic",
  "confidence": 0.0 to 1.0,
  "reasoning": "Brief explanation of why this category fits",
  "keySignals": ["list", "of", "decisive", "signals"],
  "alternativeCategory": "second best fit if confidence < 0.8, or null"
}`;

  // Call Claude for classification
  const response = await messages.create({
    model: options.model || 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: classificationPrompt
      }
    ]
  });
  
  // Parse response
  const responseText = response.content[0].text;
  let classification;
  
  try {
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      classification = JSON.parse(jsonMatch[0]);
    } else {
      throw new Error('No JSON found');
    }
  } catch (parseError) {
    console.log(`   ⚠️ Failed to parse classification: ${parseError.message}`);
    // Fallback to heuristic classification
    classification = heuristicClassification(signals, research);
  }
  
  // Validate category
  const validCategories = Object.keys(BUSINESS_CATEGORIES);
  if (!validCategories.includes(classification.category)) {
    console.log(`   ⚠️ Invalid category "${classification.category}", falling back to generic`);
    classification.category = 'generic';
  }
  
  // Add metadata
  classification._metadata = {
    classifiedAt: new Date().toISOString(),
    model: options.model || 'claude-sonnet-4-20250514',
    inputSignals: signals
  };
  
  console.log(`   ✅ Classified as: ${classification.category.toUpperCase()} (confidence: ${(classification.confidence * 100).toFixed(0)}%)`);
  console.log(`   📝 Reasoning: ${classification.reasoning}`);
  
  return classification;
}

/**
 * Extract classification signals from research and assets
 */
function extractClassificationSignals(research, assets) {
  const signals = {
    // Audience signals
    audienceType: 'unknown',
    isB2B: false,
    isB2C: false,
    
    // Delivery signals
    deliveryMethod: 'unknown',
    isDigitalProduct: false,
    isInPersonService: false,
    isPhysicalProduct: false,
    
    // Pricing signals
    pricingModel: 'unknown',
    hasSubscription: false,
    hasFreeTrial: false,
    
    // Geographic signals
    geographicScope: 'unknown',
    isLocal: false,
    isNational: false,
    
    // Industry signals
    industryKeywords: [],
    
    // CTA signals
    primaryCTA: research.callsToAction?.primary || 'unknown'
  };
  
  // Analyze target audience
  const audience = research.targetAudience || {};
  const idealCustomer = (audience.idealCustomer || '').toLowerCase();
  const industries = (audience.industries || []).map(i => i.toLowerCase());
  const roles = (audience.roles || []).map(r => r.toLowerCase());
  
  // B2B signals
  const b2bKeywords = ['business', 'company', 'enterprise', 'team', 'organization', 'practice', 'firm', 'agency'];
  const b2bRoles = ['manager', 'director', 'owner', 'ceo', 'cto', 'admin', 'professional'];
  
  if (b2bKeywords.some(kw => idealCustomer.includes(kw)) ||
      roles.some(r => b2bRoles.some(br => r.includes(br)))) {
    signals.isB2B = true;
    signals.audienceType = 'B2B';
  }
  
  // B2C signals
  const b2cKeywords = ['homeowner', 'consumer', 'individual', 'family', 'resident', 'customer'];
  if (b2cKeywords.some(kw => idealCustomer.includes(kw))) {
    signals.isB2C = true;
    signals.audienceType = signals.isB2B ? 'B2B/B2C' : 'B2C';
  }
  
  // Analyze delivery method
  const coreOffering = research.coreOffering || {};
  const whatItDoes = (coreOffering.whatItDoes || '').toLowerCase();
  const howItWorks = (coreOffering.howItWorks || '').toLowerCase();
  const features = (research.features || []).map(f => (f.name + ' ' + f.description).toLowerCase());
  const allText = [whatItDoes, howItWorks, ...features].join(' ');
  
  // Software/digital signals
  const softwareKeywords = ['software', 'platform', 'app', 'dashboard', 'cloud', 'saas', 'automation', 
                           'integration', 'api', 'login', 'account', 'subscription', 'data', 'analytics',
                           'workflow', 'management system', 'online tool'];
  if (softwareKeywords.some(kw => allText.includes(kw))) {
    signals.isDigitalProduct = true;
    signals.deliveryMethod = 'digital';
  }
  
  // In-person service signals
  const serviceKeywords = ['visit', 'on-site', 'appointment', 'call us', 'emergency', 'repair', 
                          'installation', 'maintenance', 'inspection', 'consultation', 'office'];
  if (serviceKeywords.some(kw => allText.includes(kw))) {
    signals.isInPersonService = true;
    signals.deliveryMethod = signals.isDigitalProduct ? 'hybrid' : 'in-person';
  }
  
  // Physical product signals
  const productKeywords = ['shipping', 'delivery', 'cart', 'checkout', 'inventory', 'in stock', 
                          'product', 'order', 'buy now'];
  if (productKeywords.some(kw => allText.includes(kw))) {
    signals.isPhysicalProduct = true;
    signals.deliveryMethod = 'physical';
  }
  
  // Analyze pricing
  const pricing = research.pricing || {};
  if (pricing.hasPricing && pricing.tiers?.length > 0) {
    const tierPrices = pricing.tiers.map(t => (t.price || '').toLowerCase());
    
    // Subscription signals
    if (tierPrices.some(p => p.includes('/month') || p.includes('/mo') || p.includes('/year') || 
                           p.includes('monthly') || p.includes('annual'))) {
      signals.hasSubscription = true;
      signals.pricingModel = 'subscription';
    }
    
    // Free trial
    if (pricing.freeTrial || tierPrices.some(p => p.includes('free'))) {
      signals.hasFreeTrial = true;
    }
  }
  
  // Analyze geographic scope
  const trustSignals = research.trustSignals || {};
  const stats = (trustSignals.statistics || []).join(' ').toLowerCase();
  const uvp = (research.valueProposition?.mainUvp || '').toLowerCase();
  
  // Local signals
  const localKeywords = ['local', 'serving', 'area', 'community', 'neighborhood', 'city', 'county'];
  const extractedContent = assets?.content || {};
  const address = (extractedContent.address || '').toLowerCase();
  
  if (localKeywords.some(kw => uvp.includes(kw) || address.includes(kw))) {
    signals.isLocal = true;
    signals.geographicScope = 'local';
  }
  
  // National/global signals
  const globalKeywords = ['worldwide', 'global', 'international', 'across', 'countries', 'nationwide'];
  if (globalKeywords.some(kw => stats.includes(kw) || uvp.includes(kw))) {
    signals.isNational = true;
    signals.geographicScope = signals.isLocal ? 'mixed' : 'national/global';
  }
  
  // Industry keywords
  const industryKeywords = [...industries, ...roles];
  signals.industryKeywords = industryKeywords.slice(0, 10);
  
  return signals;
}

/**
 * Fallback heuristic classification when Claude fails
 */
function heuristicClassification(signals, research) {
  let category = 'generic';
  let confidence = 0.5;
  let reasoning = '';
  
  // Strong SaaS signals
  if (signals.isDigitalProduct && signals.hasSubscription && !signals.isLocal) {
    category = 'saas-tech';
    confidence = 0.8;
    reasoning = 'Digital product with subscription pricing and non-local scope';
  }
  // Strong home services signals
  else if (signals.isInPersonService && signals.isLocal && signals.isB2C) {
    category = 'home-services';
    confidence = 0.8;
    reasoning = 'In-person service with local scope targeting consumers';
  }
  // Strong ecommerce signals
  else if (signals.isPhysicalProduct) {
    category = 'ecommerce';
    confidence = 0.7;
    reasoning = 'Physical products for sale';
  }
  // Professional services (in-person + B2B + local)
  else if (signals.isInPersonService && signals.isB2B && !signals.isDigitalProduct) {
    category = 'professional-services';
    confidence = 0.7;
    reasoning = 'In-person B2B service without digital product';
  }
  
  return {
    category,
    confidence,
    reasoning,
    keySignals: Object.entries(signals)
      .filter(([k, v]) => v === true || (typeof v === 'string' && v !== 'unknown'))
      .map(([k, v]) => k),
    alternativeCategory: null
  };
}

/**
 * Simple synchronous classification (no AI call) for quick fallback
 * Uses only signals from research - useful when AI is unavailable
 */
function classifySync(research, assets = {}) {
  const signals = extractClassificationSignals(research, assets);
  return heuristicClassification(signals, research);
}

module.exports = {
  classifyBusinessType,
  classifySync,
  extractClassificationSignals,
  BUSINESS_CATEGORIES
};

// CLI entry point
if (require.main === module) {
  const fs = require('fs');
  const researchPath = process.argv[2];
  
  if (!researchPath) {
    console.log('Usage: node classifier-agent.js <research.json>');
    process.exit(1);
  }
  
  const research = JSON.parse(fs.readFileSync(researchPath, 'utf-8'));
  
  classifyBusinessType(research, {}, { verbose: true })
    .then(result => {
      console.log('\n📊 Classification Result:');
      console.log(JSON.stringify(result, null, 2));
    })
    .catch(err => {
      console.error('Classification failed:', err.message);
      process.exit(1);
    });
}
