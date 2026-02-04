/**
 * Copywriter Agent
 * 
 * Takes research findings + creative brief and generates all copy:
 * - Hero headline and tagline
 * - Feature descriptions
 * - Section content
 * - CTAs
 * - Testimonial formatting
 * - Footer content
 * 
 * Copy matches what the business ACTUALLY does based on research.
 */

// Use Clawdbot client instead of direct Anthropic API
const { messages } = require('./clawdbot-client');

/**
 * Generate all copy for a landing page
 * @param {object} research - Output from research-agent
 * @param {object} brief - Output from creative-director
 * @param {object} assets - Extracted site assets
 * @param {object} options - Optional settings
 * @returns {Promise<object>} - All generated copy
 */
async function generateCopy(research, brief, assets = {}, options = {}) {
  console.log('\n✍️ Copywriter Agent generating copy...');
  
  const businessName = assets.content?.title || 
                       research._metadata?.url?.replace(/https?:\/\/(www\.)?/, '').split('/')[0].split('.')[0] ||
                       'Business';
  
  // Build context
  const researchContext = `
BUSINESS: ${businessName}
WHAT THEY DO: ${research.coreOffering?.whatItDoes || 'Unknown'}
PROBLEM SOLVED: ${research.coreOffering?.problemSolved || 'Unknown'}
HOW IT WORKS: ${research.coreOffering?.howItWorks || 'Unknown'}
TARGET AUDIENCE: ${research.targetAudience?.idealCustomer || 'General'}
PAIN POINTS: ${research.targetAudience?.painPoints?.join(', ') || 'Unknown'}
MAIN UVP: ${research.valueProposition?.mainUvp || 'Unknown'}
DIFFERENTIATORS: ${research.valueProposition?.differentiators?.join(', ') || 'Unknown'}
TONE: ${research.toneAndVoice?.style || 'Professional'}
NOTABLE PHRASES FROM THEIR SITE: ${research.toneAndVoice?.notablePhrases?.slice(0, 5).join(', ') || 'None'}
`;

  const briefContext = `
CREATIVE DIRECTION:
- Story: ${brief.narrativeStrategy?.mainStory || 'Transformation'}
- Hook: ${brief.narrativeStrategy?.emotionalHook || 'Better solution'}
- Headline Approach: ${brief.heroStrategy?.headlineApproach || 'benefit-driven'}
- Subheadline Purpose: ${brief.heroStrategy?.subheadlinePurpose || 'Expand on benefit'}
- Primary CTA: ${brief.ctaStrategy?.primaryCta?.text || 'Get Started'}
- Secondary CTA: ${brief.ctaStrategy?.secondaryCta?.text || 'Learn More'}
- Voice: ${brief.toneGuidance?.voiceCharacteristics?.join(', ') || 'Professional'}
- Words to Use: ${brief.toneGuidance?.wordsToUse?.join(', ') || 'Simple, powerful'}
- Words to Avoid: ${brief.toneGuidance?.wordsToAvoid?.join(', ') || 'Complex, difficult'}
- Primary Message: ${brief.keyMessages?.primaryMessage || 'The better way'}
`;

  const featuresContext = `
FEATURES TO WRITE ABOUT:
${research.features?.map((f, i) => `${i + 1}. ${f.name}: ${f.description} (Benefit: ${f.benefit || 'Unknown'})`).join('\n') || 'No features extracted'}
`;

  const testimonialsContext = `
TESTIMONIALS TO USE/ADAPT:
${research.testimonials?.length > 0 
  ? research.testimonials.map(t => `- "${t.quote}" - ${t.author}, ${t.title || ''} ${t.company || ''}`).join('\n') 
  : 'NO TESTIMONIALS FOUND. Do NOT fabricate testimonials. Return an empty testimonials.items array. The template will hide this section if no real testimonials exist.'}
`;

  const prompt = `You are an elite conversion copywriter. Write compelling, specific copy for a landing page based on this research and creative direction.

${researchContext}

${briefContext}

${featuresContext}

${testimonialsContext}

Generate ALL the copy needed for a complete landing page. The copy must be:
1. SPECIFIC to what this business actually does (use details from research)
2. BENEFIT-FOCUSED (not just features)
3. CONVERSION-OPTIMIZED (compelling, action-oriented)
4. CONSISTENT with the brand's tone
5. NO PLACEHOLDER TEXT - everything must be real, specific copy

CRITICAL RULES - DO NOT FABRICATE:
1. If research shows NO testimonials, return testimonials.items as an EMPTY array []
2. If research shows NO pricing info, return pricing.tiers as an EMPTY array []
3. If research shows NO user/customer count, do NOT include numbers like "1,000+" - leave socialProof empty
4. If research shows NO free trial, do NOT claim "14-day free trial"
5. Only include real data from research. Template will hide empty sections.

Respond in JSON format:
{
  "hero": {
    "headline": "string - main headline (8-12 words max, powerful)",
    "headlineHighlight": "string - the key word/phrase to emphasize visually (optional)",
    "tagline": "string - subheadline that expands on the promise (15-25 words)",
    "ctaPrimary": "string - primary CTA button text",
    "ctaSecondary": "string - secondary CTA button text",
    "socialProof": "string - ONLY if research shows verified user counts, otherwise leave empty"
  },
  "features": {
    "sectionHeadline": "string - headline for features section",
    "sectionSubheadline": "string - supporting text for features section",
    "items": [
      {
        "title": "string",
        "description": "string - 2-3 sentences, benefit-focused",
        "icon": "string - suggested lucide icon name"
      }
    ]
  },
  "benefits": {
    "sectionHeadline": "string",
    "items": [
      {
        "title": "string",
        "description": "string"
      }
    ]
  },
  "howItWorks": {
    "sectionHeadline": "string",
    "sectionSubheadline": "string",
    "steps": [
      {
        "number": 1,
        "title": "string",
        "description": "string"
      }
    ]
  },
  "testimonials": {
    "sectionHeadline": "string",
    "sectionSubheadline": "string",
    "items": [] // IMPORTANT: Only include REAL testimonials from research. If none found, this MUST be an empty array []. DO NOT FABRICATE.
  },
  "pricing": {
    "sectionHeadline": "string",
    "sectionSubheadline": "string",
    "tiers": [
      {
        "name": "string",
        "description": "string - one line describing who it's for",
        "price": "string - e.g., '$29' or 'Free' or 'Custom'",
        "period": "string - e.g., '/month' or '/year' or ''",
        "features": ["array of feature strings"],
        "cta": "string - button text",
        "highlighted": true/false
      }
    ]
  },
  "cta": {
    "headline": "string - final CTA section headline",
    "subheadline": "string - supporting text",
    "buttonText": "string",
    "guarantee": "string - risk reversal statement (e.g., '30-day money-back guarantee')"
  },
  "footer": {
    "tagline": "string - company tagline for footer",
    "description": "string - 1-2 sentence company description"
  },
  "meta": {
    "pageTitle": "string - SEO title for the page",
    "metaDescription": "string - SEO meta description (150-160 chars)"
  }
}

Write copy that could immediately go live. Be specific, compelling, and conversion-focused.`;

  console.log('   🧠 Generating copy with Claude (via Clawdbot)...');
  
  const response = await messages.create({
    model: options.model || 'claude-sonnet-4-20250514',
    max_tokens: 4000,
    messages: [
      {
        role: 'user',
        content: prompt
      }
    ]
  });

  const responseText = response.content[0].text;
  
  let copy;
  try {
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      copy = JSON.parse(jsonMatch[0]);
    } else {
      throw new Error('No JSON found in response');
    }
  } catch (parseError) {
    console.log(`   ⚠️ Failed to parse copy JSON: ${parseError.message}`);
    // Return minimal structure
    copy = {
      hero: {
        headline: research.coreOffering?.whatItDoes || 'Transform Your Business',
        tagline: research.valueProposition?.mainUvp || 'The smarter way to work',
        ctaPrimary: brief.ctaStrategy?.primaryCta?.text || 'Get Started',
        ctaSecondary: brief.ctaStrategy?.secondaryCta?.text || 'Learn More'
      },
      features: {
        sectionHeadline: 'Powerful Features',
        sectionSubheadline: 'Everything you need to succeed',
        items: research.features?.map(f => ({
          title: f.name,
          description: f.description || f.benefit || 'Professional-grade functionality.',
          icon: 'check-circle'
        })) || []
      },
      testimonials: {
        sectionHeadline: 'Loved by Customers',
        sectionSubheadline: 'See what people are saying',
        items: research.testimonials?.map(t => ({
          quote: t.quote,
          author: t.author || 'Customer',
          title: t.title || '',
          company: t.company || ''
        })) || []
      },
      cta: {
        headline: 'Ready to Get Started?',
        subheadline: 'Join thousands of satisfied customers today.',
        buttonText: brief.ctaStrategy?.primaryCta?.text || 'Get Started'
      },
      footer: {
        tagline: research.valueProposition?.mainUvp || 'The better way to work',
        description: research.coreOffering?.whatItDoes || 'Professional solutions for modern teams.'
      },
      _rawResponse: responseText
    };
  }
  
  // Add metadata
  copy._metadata = {
    generatedAt: new Date().toISOString(),
    businessName,
    basedOnResearch: !!research.coreOffering
  };
  
  const featureCount = copy.features?.items?.length || 0;
  const testimonialCount = copy.testimonials?.items?.length || 0;
  console.log(`   ✅ Copy generated: ${featureCount} features, ${testimonialCount} testimonials`);
  
  return copy;
}

/**
 * Adapt copy for a specific template
 * @param {object} copy - Generated copy
 * @param {string} templateType - Type of template (saas-tech, service-business, etc.)
 * @returns {object} - Template-specific variables
 */
function adaptCopyForTemplate(copy, templateType = 'saas-tech') {
  // Map the generated copy to template variables
  const baseVars = {
    // Hero
    headline: copy.hero?.headline || 'Transform Your Workflow',
    headline_highlight: copy.hero?.headlineHighlight || '',
    tagline: copy.hero?.tagline || 'The smarter way to work',
    cta_text: copy.hero?.ctaPrimary || 'Get Started',
    cta_secondary: copy.hero?.ctaSecondary || 'Learn More',
    social_proof_text: copy.hero?.socialProof || '',
    
    // Features section
    features_headline: copy.features?.sectionHeadline || 'Powerful Features',
    features_subheadline: copy.features?.sectionSubheadline || 'Everything you need',
    
    // How it works
    how_it_works_headline: copy.howItWorks?.sectionHeadline || 'How It Works',
    how_it_works_subheadline: copy.howItWorks?.sectionSubheadline || 'Get started in minutes',
    
    // Testimonials
    testimonials_headline: copy.testimonials?.sectionHeadline || 'What Customers Say',
    testimonials_subheadline: copy.testimonials?.sectionSubheadline || 'Trusted by thousands',
    
    // Pricing
    pricing_headline: copy.pricing?.sectionHeadline || 'Simple Pricing',
    pricing_subheadline: copy.pricing?.sectionSubheadline || 'Choose the plan that fits your needs',
    
    // Final CTA
    cta_headline: copy.cta?.headline || 'Ready to Get Started?',
    cta_subheadline: copy.cta?.subheadline || 'Join today',
    cta_button_text: copy.cta?.buttonText || 'Get Started Now',
    cta_guarantee: copy.cta?.guarantee || '',
    
    // Footer
    footer_tagline: copy.footer?.tagline || '',
    footer_description: copy.footer?.description || '',
    
    // Meta
    page_title: copy.meta?.pageTitle || 'Welcome',
    meta_description: copy.meta?.metaDescription || ''
  };
  
  // Add feature variables
  if (copy.features?.items) {
    copy.features.items.forEach((feature, i) => {
      const num = i + 1;
      baseVars[`feature_${num}_title`] = feature.title;
      baseVars[`feature_${num}_description`] = feature.description;
      baseVars[`feature_${num}_icon`] = feature.icon || 'check-circle';
    });
  }
  
  // Add testimonial variables
  if (copy.testimonials?.items) {
    copy.testimonials.items.forEach((testimonial, i) => {
      const num = i + 1;
      baseVars[`testimonial_${num}_quote`] = testimonial.quote;
      baseVars[`testimonial_${num}_name`] = testimonial.author;
      baseVars[`testimonial_${num}_title`] = testimonial.title || '';
      baseVars[`testimonial_${num}_company`] = testimonial.company || '';
    });
  }
  
  // Add how it works steps
  if (copy.howItWorks?.steps) {
    copy.howItWorks.steps.forEach((step, i) => {
      const num = i + 1;
      baseVars[`step_${num}_title`] = step.title;
      baseVars[`step_${num}_description`] = step.description;
    });
  }
  
  // Add pricing tiers
  if (copy.pricing?.tiers) {
    copy.pricing.tiers.forEach((tier, i) => {
      const num = i + 1;
      baseVars[`plan_${num}_name`] = tier.name;
      baseVars[`plan_${num}_description`] = tier.description;
      baseVars[`plan_${num}_price`] = tier.price?.replace(/[^\d]/g, '') || '0';
      baseVars[`plan_${num}_period`] = tier.period || '/month';
      tier.features?.forEach((feat, j) => {
        baseVars[`plan_${num}_feature_${j + 1}`] = feat;
      });
      baseVars[`plan_${num}_cta`] = tier.cta || 'Get Started';
      baseVars[`plan_${num}_highlighted`] = tier.highlighted || false;
    });
  }
  
  return baseVars;
}

module.exports = {
  generateCopy,
  adaptCopyForTemplate
};

// CLI entry point
if (require.main === module) {
  // Test with sample data
  const sampleResearch = {
    coreOffering: {
      whatItDoes: 'AI-powered email assistant',
      problemSolved: 'Email overload and slow responses',
      howItWorks: 'Uses AI to draft, categorize, and prioritize emails'
    },
    targetAudience: {
      idealCustomer: 'Busy professionals and executives',
      painPoints: ['Too many emails', 'Slow response times', 'Missing important messages']
    },
    valueProposition: {
      mainUvp: 'Cut email time in half with AI',
      differentiators: ['Learns your writing style', 'Works with any email client']
    },
    features: [
      { name: 'Smart Drafts', description: 'AI writes responses in your voice' },
      { name: 'Priority Inbox', description: 'Automatically surfaces important emails' },
      { name: 'Quick Actions', description: 'One-click responses for common requests' }
    ],
    testimonials: [
      { quote: 'Saves me 2 hours every day', author: 'Sarah Chen', title: 'CEO', company: 'TechCorp' }
    ],
    toneAndVoice: { style: 'Professional but friendly' }
  };
  
  const sampleBrief = {
    narrativeStrategy: { mainStory: 'Reclaim your time', emotionalHook: 'Email overwhelm' },
    heroStrategy: { headlineApproach: 'benefit-driven' },
    ctaStrategy: { 
      primaryCta: { text: 'Start Free Trial' },
      secondaryCta: { text: 'Watch Demo' }
    },
    toneGuidance: { voiceCharacteristics: ['Confident', 'Clear', 'Friendly'] }
  };
  
  generateCopy(sampleResearch, sampleBrief, {})
    .then(copy => {
      console.log('\n📝 Generated Copy:');
      console.log(JSON.stringify(copy, null, 2));
    })
    .catch(err => {
      console.error('Copy generation failed:', err.message);
      process.exit(1);
    });
}
