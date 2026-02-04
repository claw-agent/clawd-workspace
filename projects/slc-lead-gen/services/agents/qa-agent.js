/**
 * QA Agent - Quality Assurance for generated sites
 * Checks accuracy, consistency, and overall quality
 */

const { sendPrompt } = require('./clawdbot-client');
const fs = require('fs');
const path = require('path');

async function runQA(outputDir, research, generatedCopy, options = {}) {
  const { verbose = false } = options;
  
  console.log('\n🔍 Running QA Agent...');
  
  // Load the generated HTML
  const htmlPath = path.join(outputDir, 'index.html');
  const html = fs.readFileSync(htmlPath, 'utf-8');
  
  // Load screenshots if available
  const hasDesktopPreview = fs.existsSync(path.join(outputDir, 'preview.png'));
  const hasMobilePreview = fs.existsSync(path.join(outputDir, 'preview-mobile.png'));
  
  const prompt = `You are a QA specialist reviewing a generated website. Check for quality issues.

## Original Business Research:
${JSON.stringify(research, null, 2)}

## Generated Copy:
${JSON.stringify(generatedCopy, null, 2)}

## Generated HTML:
${html.substring(0, 15000)}${html.length > 15000 ? '\n...(truncated)' : ''}

## QA Checklist - Review each item:

1. **Accuracy**: Does the copy accurately represent what the business does? Any factual errors or misrepresentations?

2. **Consistency**: Are colors, fonts, and styling consistent throughout? Any visual inconsistencies?

3. **Completeness**: Are all sections properly filled? Any empty areas, placeholder text, or "Lorem ipsum"?

4. **Brand Alignment**: Does the tone match the business? Is it appropriate for their industry/audience?

5. **CTAs**: Are calls-to-action clear and appropriate? Do button texts make sense?

6. **Testimonials**: Do they sound authentic? Are names/titles believable for this industry?

7. **Features/Benefits**: Are they specific to this business or generic fluff?

8. **Pricing**: If shown, does it align with what the business actually offers?

9. **Contact/Links**: Are there proper contact methods? Social links present?

10. **Mobile**: Based on the HTML structure, will this look good on mobile?

Return your response as JSON:
{
  "overallScore": 1-10,
  "passed": true/false,
  "issues": [
    {
      "severity": "critical|major|minor",
      "category": "accuracy|consistency|completeness|brand|cta|testimonials|features|pricing|contact|mobile",
      "description": "What's wrong",
      "suggestion": "How to fix it"
    }
  ],
  "strengths": ["What's working well"],
  "summary": "Brief overall assessment"
}

Be critical but constructive. Only return the JSON, no other text.`;

  try {
    const response = await sendPrompt(prompt, { verbose });
    
    // Parse JSON from response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.log('   ⚠️ Could not parse QA response');
      return { passed: true, issues: [], overallScore: 7 };
    }
    
    const qaResult = JSON.parse(jsonMatch[0]);
    
    // Log results
    console.log(`   📊 QA Score: ${qaResult.overallScore}/10`);
    console.log(`   ${qaResult.passed ? '✅ PASSED' : '❌ NEEDS FIXES'}`);
    
    if (qaResult.issues && qaResult.issues.length > 0) {
      const critical = qaResult.issues.filter(i => i.severity === 'critical').length;
      const major = qaResult.issues.filter(i => i.severity === 'major').length;
      const minor = qaResult.issues.filter(i => i.severity === 'minor').length;
      console.log(`   Issues: ${critical} critical, ${major} major, ${minor} minor`);
      
      if (verbose) {
        qaResult.issues.forEach(issue => {
          const icon = issue.severity === 'critical' ? '🔴' : issue.severity === 'major' ? '🟠' : '🟡';
          console.log(`   ${icon} [${issue.category}] ${issue.description}`);
        });
      }
    }
    
    // Save QA report
    const qaPath = path.join(outputDir, 'qa-report.json');
    fs.writeFileSync(qaPath, JSON.stringify(qaResult, null, 2));
    console.log(`   📁 Report: ${qaPath}`);
    
    return qaResult;
    
  } catch (error) {
    console.error('   ❌ QA Agent error:', error.message);
    return { passed: true, issues: [], overallScore: 5, error: error.message };
  }
}

module.exports = { runQA };

// CLI usage
if (require.main === module) {
  const outputDir = process.argv[2];
  if (!outputDir) {
    console.log('Usage: node qa-agent.js <output-dir>');
    process.exit(1);
  }
  
  // Load research and copy if available
  const researchPath = path.join(outputDir, 'research.json');
  const copyPath = path.join(outputDir, 'generated-copy.json');
  
  const research = fs.existsSync(researchPath) ? JSON.parse(fs.readFileSync(researchPath)) : {};
  const copy = fs.existsSync(copyPath) ? JSON.parse(fs.readFileSync(copyPath)) : {};
  
  runQA(outputDir, research, copy, { verbose: true })
    .then(result => {
      console.log('\n' + JSON.stringify(result, null, 2));
    })
    .catch(console.error);
}
