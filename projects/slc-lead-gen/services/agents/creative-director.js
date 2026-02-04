/**
 * Creative Director Agent
 * 
 * Takes research output and decides presentation strategy:
 * - Which sections to include
 * - Narrative hook and story arc
 * - CTA strategy
 * - Imagery guidance
 * - Tone of voice
 * - Visual hierarchy
 * 
 * Outputs a creative brief that guides the copywriter.
 */

// Use Clawdbot client instead of direct Anthropic API
const { messages } = require('./clawdbot-client');

/**
 * Create a creative brief based on research findings
 * @param {object} research - Output from research-agent
 * @param {object} assets - Extracted site assets (colors, logo, etc.)
 * @param {object} options - Optional settings
 * @returns {Promise<object>} - Creative brief
 */
async function createCreativeBrief(research, assets = {}, options = {}) {
  console.log('\n🎨 Creative Director creating brief...');
  
  const businessName = research.coreOffering?.whatItDoes?.split(' ')[0] || 
                       assets.content?.title || 
                       'Business';
  
  // Build context from research
  const researchSummary = `
BUSINESS ANALYSIS:
- Core Offering: ${research.coreOffering?.whatItDoes || 'Unknown'}
- Problem Solved: ${research.coreOffering?.problemSolved || 'Unknown'}
- Target Audience: ${research.targetAudience?.idealCustomer || 'General'}
- Industries: ${research.targetAudience?.industries?.join(', ') || 'Various'}
- Pain Points: ${research.targetAudience?.painPoints?.join(', ') || 'Unknown'}
- Main UVP: ${research.valueProposition?.mainUvp || 'Unknown'}
- Differentiators: ${research.valueProposition?.differentiators?.join(', ') || 'Unknown'}
- Primary CTA: ${research.callsToAction?.primary || 'Get Started'}
- Tone: ${research.toneAndVoice?.style || 'Professional'}
- Notable Phrases: ${research.toneAndVoice?.notablePhrases?.slice(0, 5).join(', ') || 'None'}

FEATURES (${research.features?.length || 0}):
${research.features?.slice(0, 6).map(f => `- ${f.name}: ${f.description}`).join('\n') || 'None listed'}

TESTIMONIALS (${research.testimonials?.length || 0}):
${research.testimonials?.slice(0, 3).map(t => `- "${t.quote?.substring(0, 100)}..." - ${t.author}`).join('\n') || 'None found'}

TRUST SIGNALS:
${research.trustSignals?.statistics?.slice(0, 5).join('\n') || 'None found'}
`;

  const assetsSummary = `
BRAND ASSETS:
- Primary Color: ${assets.colors?.primary || 'Not extracted'}
- Has Logo: ${assets.logo ? 'Yes' : 'No'}
- Existing Services: ${assets.content?.services?.length || 0}
- Has Phone: ${assets.content?.phone ? 'Yes' : 'No'}
`;

  const prompt = `You are an elite creative director at a top digital agency. Your job is to create a strategic creative brief that will guide copywriters in creating a compelling landing page.

${researchSummary}

${assetsSummary}

Create a comprehensive creative brief that includes:

1. **NARRATIVE STRATEGY**
   - What's the main story we're telling?
   - What's the emotional hook?
   - What transformation do we promise?
   - Opening angle (problem-first, benefit-first, story-first, etc.)

2. **SECTION STRATEGY**
   - Which sections should we include? (hero, features, social proof, pricing, FAQ, etc.)
   - What order should they appear?
   - Which sections to emphasize/de-emphasize?
   - Any sections to SKIP entirely?

3. **HERO SECTION STRATEGY**
   - Headline approach (benefit-driven, problem-focused, curiosity, bold claim)
   - Subheadline purpose (expand, qualify, add urgency)
   - Hero image direction (abstract, literal, people, product)

4. **CTA STRATEGY**
   - Primary CTA (text and purpose)
   - Secondary CTA (if applicable)
   - CTA placement strategy
   - Urgency/scarcity approach (if appropriate)

5. **SOCIAL PROOF STRATEGY**
   - What type of proof to emphasize? (testimonials, logos, stats, case studies)
   - How to present testimonials?
   - Trust badges to highlight

6. **TONE GUIDANCE**
   - Voice characteristics (3-5 adjectives)
   - Words/phrases to USE
   - Words/phrases to AVOID
   - Reading level target

7. **VISUAL DIRECTION**
   - Color usage guidance
   - Image style recommendations
   - Icon style (line, solid, duotone)
   - Overall feel (minimal, rich, bold, soft)

8. **KEY MESSAGES**
   - Primary message (one sentence)
   - 3-5 supporting messages
   - Objections to preemptively address

Respond in JSON format:
{
  "narrativeStrategy": {
    "mainStory": "string",
    "emotionalHook": "string",
    "transformation": "string",
    "openingAngle": "string"
  },
  "sectionStrategy": {
    "sections": [
      {
        "name": "string",
        "purpose": "string",
        "priority": "high|medium|low",
        "notes": "string"
      }
    ],
    "skipSections": ["array of sections to NOT include"],
    "emphasis": "string describing what to emphasize"
  },
  "heroStrategy": {
    "headlineApproach": "string",
    "headlineNotes": "string",
    "subheadlinePurpose": "string",
    "imageDirection": "string"
  },
  "ctaStrategy": {
    "primaryCta": {
      "text": "string",
      "purpose": "string"
    },
    "secondaryCta": {
      "text": "string",
      "purpose": "string"
    },
    "placement": "string",
    "urgencyApproach": "string or null"
  },
  "socialProofStrategy": {
    "primaryProofType": "string",
    "testimonialPresentation": "string",
    "trustBadges": ["array"],
    "statsToHighlight": ["array"]
  },
  "toneGuidance": {
    "voiceCharacteristics": ["array of 3-5 adjectives"],
    "wordsToUse": ["array"],
    "wordsToAvoid": ["array"],
    "readingLevel": "string"
  },
  "visualDirection": {
    "colorUsage": "string",
    "imageStyle": "string",
    "iconStyle": "string",
    "overallFeel": "string"
  },
  "keyMessages": {
    "primaryMessage": "string",
    "supportingMessages": ["array of 3-5"],
    "objectionsToAddress": ["array"]
  }
}

Be strategic and specific. This brief will directly guide the copywriter.`;

  console.log('   🧠 Generating brief with Claude (via Clawdbot)...');
  
  const response = await messages.create({
    model: options.model || 'claude-sonnet-4-20250514',
    max_tokens: 3000,
    messages: [
      {
        role: 'user',
        content: prompt
      }
    ]
  });

  const responseText = response.content[0].text;
  
  let brief;
  try {
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      brief = JSON.parse(jsonMatch[0]);
    } else {
      throw new Error('No JSON found in response');
    }
  } catch (parseError) {
    console.log(`   ⚠️ Failed to parse creative brief JSON: ${parseError.message}`);
    // Return a default brief
    brief = {
      narrativeStrategy: {
        mainStory: 'Transformation through better tools',
        emotionalHook: 'Frustration with current solutions',
        transformation: 'From struggling to succeeding',
        openingAngle: 'benefit-first'
      },
      sectionStrategy: {
        sections: [
          { name: 'hero', purpose: 'Hook and convert', priority: 'high' },
          { name: 'features', purpose: 'Show capabilities', priority: 'high' },
          { name: 'testimonials', purpose: 'Build trust', priority: 'medium' },
          { name: 'cta', purpose: 'Convert', priority: 'high' }
        ],
        skipSections: [],
        emphasis: 'Focus on benefits over features'
      },
      heroStrategy: {
        headlineApproach: 'benefit-driven',
        headlineNotes: 'Lead with the outcome',
        subheadlinePurpose: 'Expand on the benefit',
        imageDirection: 'Product in use'
      },
      ctaStrategy: {
        primaryCta: { text: 'Get Started', purpose: 'Start trial/signup' },
        secondaryCta: { text: 'Learn More', purpose: 'Provide alternative path' },
        placement: 'Hero and after key sections',
        urgencyApproach: null
      },
      socialProofStrategy: {
        primaryProofType: 'testimonials',
        testimonialPresentation: 'Cards with photos',
        trustBadges: ['Security', 'Reliability'],
        statsToHighlight: []
      },
      toneGuidance: {
        voiceCharacteristics: ['Professional', 'Confident', 'Clear'],
        wordsToUse: ['Simple', 'Fast', 'Powerful'],
        wordsToAvoid: ['Complex', 'Difficult', 'Maybe'],
        readingLevel: '8th grade'
      },
      visualDirection: {
        colorUsage: 'Primary for CTAs, neutral for text',
        imageStyle: 'Clean and modern',
        iconStyle: 'line',
        overallFeel: 'Professional and approachable'
      },
      keyMessages: {
        primaryMessage: 'The better way to work',
        supportingMessages: ['Easy to use', 'Powerful features', 'Great support'],
        objectionsToAddress: ['Price', 'Complexity', 'Integration']
      },
      _rawResponse: responseText
    };
  }
  
  // Add metadata
  brief._metadata = {
    createdAt: new Date().toISOString(),
    basedOnResearch: !!research.coreOffering
  };
  
  console.log(`   ✅ Creative brief complete: ${brief.sectionStrategy?.sections?.length || 0} sections planned`);
  
  return brief;
}

module.exports = {
  createCreativeBrief
};

// CLI entry point
if (require.main === module) {
  // Test with sample research data
  const sampleResearch = {
    coreOffering: {
      whatItDoes: 'Project management software',
      problemSolved: 'Team collaboration chaos',
      howItWorks: 'Centralized workspace with tasks, docs, and chat'
    },
    targetAudience: {
      idealCustomer: 'Growing teams',
      industries: ['Tech', 'Marketing', 'Consulting'],
      painPoints: ['Lost files', 'Missed deadlines', 'Too many tools']
    },
    valueProposition: {
      mainUvp: 'All your work in one place',
      differentiators: ['Easy to use', 'Affordable', 'Great support']
    },
    features: [
      { name: 'Task Management', description: 'Organize work with boards and lists' },
      { name: 'Team Chat', description: 'Real-time communication' },
      { name: 'File Sharing', description: 'Centralized document storage' }
    ],
    testimonials: [],
    callsToAction: { primary: 'Start Free Trial' },
    toneAndVoice: { style: 'Friendly and professional' }
  };
  
  createCreativeBrief(sampleResearch, {})
    .then(brief => {
      console.log('\n📋 Creative Brief:');
      console.log(JSON.stringify(brief, null, 2));
    })
    .catch(err => {
      console.error('Brief creation failed:', err.message);
      process.exit(1);
    });
}
