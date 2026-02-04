/**
 * Validator Agent
 * 
 * Checks the final output for:
 * - Empty or placeholder content
 * - Missing required sections
 * - Inconsistencies
 * - Quality issues
 * 
 * Either fills gaps or flags sections to remove.
 */

// Use Clawdbot client instead of direct Anthropic API
const { messages } = require('./clawdbot-client');

/**
 * Placeholder patterns to detect
 */
const PLACEHOLDER_PATTERNS = [
  /\{\{[^}]+\}\}/g,           // {{placeholder}}
  /\[placeholder\]/gi,         // [placeholder]
  /lorem ipsum/gi,             // Lorem ipsum
  /your (company|business|product) (name|here)/gi,
  /xxx+/gi,                    // xxx
  /tbd/gi,                     // TBD
  /coming soon/gi,             // Coming soon (in content context)
  /insert .+ here/gi,          // Insert X here
  /example\.com/gi,            // example.com
  /your tagline here/gi,
  /add your/gi,
  /replace with/gi,
  /placeholder/gi
];

/**
 * Required fields for different content types
 */
const REQUIRED_FIELDS = {
  hero: ['headline', 'tagline', 'ctaPrimary'],
  features: ['sectionHeadline', 'items'],
  testimonials: ['items'],
  cta: ['headline', 'buttonText'],
  footer: ['description']
};

/**
 * Check if a value is a placeholder
 * @param {string} value - Value to check
 * @returns {boolean} - True if appears to be placeholder
 */
function isPlaceholder(value) {
  if (!value || typeof value !== 'string') return true;
  if (value.trim().length < 3) return true;
  
  for (const pattern of PLACEHOLDER_PATTERNS) {
    if (pattern.test(value)) {
      pattern.lastIndex = 0; // Reset regex
      return true;
    }
  }
  
  return false;
}

/**
 * Check if a value is too generic
 * @param {string} value - Value to check
 * @param {string} context - What kind of content this is
 * @returns {boolean} - True if too generic
 */
function isTooGeneric(value, context) {
  if (!value || typeof value !== 'string') return true;
  
  const genericPatterns = {
    headline: [
      /^(welcome|hello|get started|the best|#1|leading|premier)/i,
      /^transform your/i,
      /solutions? for/i
    ],
    tagline: [
      /everything you need/i,
      /all[- ]in[- ]one/i,
      /made simple/i,
      /your one[- ]stop/i
    ],
    feature: [
      /^(our|we offer|with our)/i,
      /professional (service|quality|solution)/i
    ]
  };
  
  const patterns = genericPatterns[context] || [];
  for (const pattern of patterns) {
    if (pattern.test(value)) return true;
  }
  
  return false;
}

/**
 * Validate copy output and identify issues
 * @param {object} copy - Copy from copywriter agent
 * @param {object} research - Original research
 * @returns {object} - Validation results
 */
function validateCopy(copy, research) {
  const issues = [];
  const warnings = [];
  const sectionStatus = {};
  
  // Check hero section
  if (copy.hero) {
    sectionStatus.hero = 'valid';
    
    if (isPlaceholder(copy.hero.headline)) {
      issues.push({ section: 'hero', field: 'headline', type: 'placeholder' });
      sectionStatus.hero = 'invalid';
    } else if (isTooGeneric(copy.hero.headline, 'headline')) {
      warnings.push({ section: 'hero', field: 'headline', type: 'generic' });
    }
    
    if (isPlaceholder(copy.hero.tagline)) {
      issues.push({ section: 'hero', field: 'tagline', type: 'placeholder' });
      sectionStatus.hero = 'invalid';
    }
    
    if (isPlaceholder(copy.hero.ctaPrimary)) {
      issues.push({ section: 'hero', field: 'ctaPrimary', type: 'placeholder' });
    }
  } else {
    issues.push({ section: 'hero', type: 'missing' });
    sectionStatus.hero = 'missing';
  }
  
  // Check features
  if (copy.features) {
    sectionStatus.features = 'valid';
    
    if (!copy.features.items || copy.features.items.length === 0) {
      issues.push({ section: 'features', type: 'empty' });
      sectionStatus.features = 'empty';
    } else {
      copy.features.items.forEach((item, i) => {
        if (isPlaceholder(item.title)) {
          issues.push({ section: 'features', field: `items[${i}].title`, type: 'placeholder' });
        }
        if (isPlaceholder(item.description)) {
          issues.push({ section: 'features', field: `items[${i}].description`, type: 'placeholder' });
        }
      });
    }
  } else {
    warnings.push({ section: 'features', type: 'missing' });
    sectionStatus.features = 'missing';
  }
  
  // Check testimonials
  if (copy.testimonials) {
    sectionStatus.testimonials = 'valid';
    
    if (!copy.testimonials.items || copy.testimonials.items.length === 0) {
      warnings.push({ section: 'testimonials', type: 'empty' });
      sectionStatus.testimonials = 'empty';
    } else {
      copy.testimonials.items.forEach((item, i) => {
        if (isPlaceholder(item.quote)) {
          warnings.push({ section: 'testimonials', field: `items[${i}].quote`, type: 'placeholder' });
        }
        if (isPlaceholder(item.author)) {
          warnings.push({ section: 'testimonials', field: `items[${i}].author`, type: 'placeholder' });
        }
      });
    }
  }
  
  // Check CTA
  if (copy.cta) {
    sectionStatus.cta = 'valid';
    
    if (isPlaceholder(copy.cta.headline)) {
      issues.push({ section: 'cta', field: 'headline', type: 'placeholder' });
    }
  }
  
  // Check pricing (if exists)
  if (copy.pricing?.tiers) {
    sectionStatus.pricing = 'valid';
    
    copy.pricing.tiers.forEach((tier, i) => {
      if (isPlaceholder(tier.name)) {
        warnings.push({ section: 'pricing', field: `tiers[${i}].name`, type: 'placeholder' });
      }
    });
  }
  
  return {
    valid: issues.length === 0,
    issues,
    warnings,
    sectionStatus,
    stats: {
      totalIssues: issues.length,
      totalWarnings: warnings.length,
      sectionsChecked: Object.keys(sectionStatus).length
    }
  };
}

/**
 * Fill gaps in copy using AI
 * @param {object} copy - Copy with issues
 * @param {object} validation - Validation results
 * @param {object} research - Original research
 * @param {object} options - Options
 * @returns {Promise<object>} - Fixed copy
 */
async function fillGaps(copy, validation, research, options = {}) {
  if (validation.issues.length === 0) {
    console.log('   ✅ No gaps to fill');
    return copy;
  }
  
  console.log(`   🔧 Filling ${validation.issues.length} gaps...`);
  
  const issueDescriptions = validation.issues.map(issue => {
    return `- ${issue.section}.${issue.field || ''}: ${issue.type}`;
  }).join('\n');
  
  const prompt = `You are a copywriter fixing placeholder content. Fill in the gaps with specific, compelling copy.

BUSINESS CONTEXT:
- What they do: ${research.coreOffering?.whatItDoes || 'Unknown'}
- Problem solved: ${research.coreOffering?.problemSolved || 'Unknown'}
- Target audience: ${research.targetAudience?.idealCustomer || 'General'}
- UVP: ${research.valueProposition?.mainUvp || 'Unknown'}

CURRENT COPY (needs fixes):
${JSON.stringify(copy, null, 2)}

ISSUES TO FIX:
${issueDescriptions}

Return the COMPLETE fixed copy object with all issues resolved. Make the copy specific to this business.
Only respond with the JSON object, no explanation.`;

  console.log('   🧠 Filling gaps with Claude (via Clawdbot)...');
  
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
  
  try {
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const fixedCopy = JSON.parse(jsonMatch[0]);
      fixedCopy._metadata = {
        ...copy._metadata,
        gapsFilled: validation.issues.length,
        fixedAt: new Date().toISOString()
      };
      return fixedCopy;
    }
  } catch (error) {
    console.log(`   ⚠️ Failed to parse fixed copy: ${error.message}`);
  }
  
  return copy;
}

/**
 * Full validation and repair cycle
 * @param {object} copy - Copy from copywriter
 * @param {object} research - Original research
 * @param {object} options - Options
 * @returns {Promise<object>} - Validated/fixed copy with validation report
 */
async function validateAndRepair(copy, research, options = {}) {
  console.log('\n🔍 Validator Agent checking output...');
  
  // First validation pass
  let validation = validateCopy(copy, research);
  
  console.log(`   📊 Initial validation: ${validation.stats.totalIssues} issues, ${validation.stats.totalWarnings} warnings`);
  
  if (validation.issues.length > 0) {
    // Log the issues
    validation.issues.forEach(issue => {
      console.log(`      ❌ ${issue.section}${issue.field ? '.' + issue.field : ''}: ${issue.type}`);
    });
    
    // Try to fix
    copy = await fillGaps(copy, validation, research, options);
    
    // Re-validate
    validation = validateCopy(copy, research);
    console.log(`   📊 After repair: ${validation.stats.totalIssues} issues, ${validation.stats.totalWarnings} warnings`);
  }
  
  // Log warnings
  if (validation.warnings.length > 0 && options.verbose) {
    validation.warnings.forEach(warning => {
      console.log(`      ⚠️ ${warning.section}${warning.field ? '.' + warning.field : ''}: ${warning.type}`);
    });
  }
  
  // Determine which sections to keep/remove
  const sectionsToRemove = [];
  for (const [section, status] of Object.entries(validation.sectionStatus)) {
    if (status === 'invalid' || status === 'empty') {
      sectionsToRemove.push(section);
    }
  }
  
  if (sectionsToRemove.length > 0) {
    console.log(`   🗑️ Sections to remove: ${sectionsToRemove.join(', ')}`);
  }
  
  console.log(`   ✅ Validation complete`);
  
  return {
    copy,
    validation,
    sectionsToRemove,
    isReady: validation.issues.length === 0
  };
}

/**
 * Check template variables for completeness
 * @param {object} variables - Template variables
 * @param {string[]} requiredVars - Required variable names
 * @returns {object} - Check results
 */
function checkTemplateVariables(variables, requiredVars = []) {
  const missing = [];
  const placeholders = [];
  
  for (const varName of requiredVars) {
    if (!variables[varName]) {
      missing.push(varName);
    } else if (isPlaceholder(variables[varName])) {
      placeholders.push(varName);
    }
  }
  
  return {
    complete: missing.length === 0 && placeholders.length === 0,
    missing,
    placeholders
  };
}

module.exports = {
  validateCopy,
  validateAndRepair,
  fillGaps,
  isPlaceholder,
  isTooGeneric,
  checkTemplateVariables
};

// CLI entry point
if (require.main === module) {
  // Test with sample data containing issues
  const sampleCopy = {
    hero: {
      headline: '{{company_name}} - Your Solution',
      tagline: 'Lorem ipsum dolor sit amet',
      ctaPrimary: 'Get Started'
    },
    features: {
      sectionHeadline: 'Features',
      items: [
        { title: 'Feature 1', description: 'TBD' },
        { title: 'Feature 2', description: 'A great feature' }
      ]
    },
    testimonials: {
      items: []
    },
    cta: {
      headline: 'Ready to Start?',
      buttonText: 'Click Here'
    }
  };
  
  const sampleResearch = {
    coreOffering: {
      whatItDoes: 'Project management software',
      problemSolved: 'Team collaboration issues'
    },
    targetAudience: {
      idealCustomer: 'Growing teams'
    },
    valueProposition: {
      mainUvp: 'All your work in one place'
    }
  };
  
  validateAndRepair(sampleCopy, sampleResearch, { verbose: true })
    .then(result => {
      console.log('\n📋 Validation Result:');
      console.log(JSON.stringify(result, null, 2));
    })
    .catch(err => {
      console.error('Validation failed:', err.message);
      process.exit(1);
    });
}
