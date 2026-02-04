#!/usr/bin/env node
/**
 * Email Generator for SLC Lead Gen
 * 
 * Creates personalized outreach emails for enriched leads.
 * Multiple templates for different scenarios:
 * - No website
 * - Outdated website
 * - Mobile issues
 * - General improvement
 * 
 * Usage: node email-generator.js <enriched-leads.json>
 */

const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'data', 'outreach');

/**
 * Email templates based on lead characteristics
 */
const TEMPLATES = {
  noWebsite: {
    subject: '{{businessName}} - Quick Question About Your Online Presence',
    body: `Hi {{firstName}},

I was searching for {{category}} in Salt Lake City and came across {{businessName}}. I noticed you don't currently have a website, and I wanted to reach out because I think there's a real opportunity here.

Did you know that 97% of consumers search online for local businesses? Without a website, you might be missing out on customers who are actively looking for {{category}} services right now.

I actually put together a quick demo of what a professional website could look like for {{businessName}}:
{{demoUrl}}

No strings attached - just wanted to show you what's possible. The demo includes:
✓ Mobile-responsive design (looks great on phones)
✓ Click-to-call functionality
✓ Service pages optimized for local search
✓ Professional design that builds trust

If you'd like to chat about getting something like this live for your business, I'd be happy to hop on a quick call. We specialize in websites for {{category}} businesses in the Salt Lake City area.

Best,
[Your Name]

P.S. - I'm offering a free consultation this month. No pressure, just a chance to talk about your goals.`
  },
  
  outdatedWebsite: {
    subject: '{{businessName}} Website - Quick Observation',
    body: `Hi {{firstName}},

I was doing some research on {{category}} in Salt Lake City and found {{businessName}}. I took a look at your current website and noticed a few things that might be costing you customers.

Here's what I found:
{{issues}}

The good news? These are all fixable, and the results can be dramatic. We've seen businesses like yours increase their phone calls by 40-60% just by updating their website.

I put together a quick demo showing what a refreshed {{businessName}} website could look like:
{{demoUrl}}

The demo shows:
✓ Modern, professional design that builds trust
✓ Mobile-responsive layout (critical since 60%+ of searches are on phones)
✓ Clear calls-to-action that convert visitors to leads
✓ Fast loading speeds for better Google rankings

Would you be open to a quick 15-minute call to discuss? I can walk you through exactly what changes would make the biggest impact.

Best,
[Your Name]

P.S. - No pressure or hard sell. If nothing else, I can point you in the right direction.`
  },
  
  mobileIssues: {
    subject: '{{businessName}} - Your Mobile Visitors Might Be Bouncing',
    body: `Hi {{firstName}},

Quick question - have you ever tried visiting your website on a phone?

I was researching {{category}} businesses in Salt Lake City and checked out {{businessName}}'s site on my phone. Unfortunately, I noticed some issues that might be turning away potential customers:

• Text is hard to read without zooming
• Buttons are difficult to tap
• The layout doesn't adjust to smaller screens

This matters because over 60% of local searches happen on mobile devices. If your site isn't mobile-friendly, those potential customers might be calling your competitors instead.

I created a quick mockup showing what a mobile-friendly {{businessName}} site could look like:
{{demoUrl}}

(Try opening it on your phone - big difference, right?)

I specialize in creating mobile-optimized websites for {{category}} businesses. Would you have 10 minutes this week for a quick call? I'd love to show you how easy it is to fix this.

Best,
[Your Name]`
  },
  
  general: {
    subject: 'Idea for {{businessName}}',
    body: `Hi {{firstName}},

I came across {{businessName}} while researching {{category}} in Salt Lake City, and I wanted to reach out with an idea.

Your business has solid reviews ({{rating}} stars!), but I think your online presence could be working harder for you. A few quick improvements could help you:

• Show up higher in Google searches
• Convert more website visitors into phone calls
• Stand out from competitors

I put together a quick demo showing one approach:
{{demoUrl}}

This is just a concept - no pressure at all. But if you're curious about what it would take to implement something like this, I'd be happy to chat.

I work specifically with {{category}} businesses in Utah, so I understand your market and what works.

Worth a conversation?

Best,
[Your Name]

P.S. - I noticed you've been in business for {{yearsInBusiness}}+ years. That kind of experience deserves a website that reflects it!`
  }
};

/**
 * Determine the best template for a lead
 */
function selectTemplate(lead) {
  const score = lead.score || 0;
  const breakdown = lead.scoreBreakdown || {};
  
  // No website = highest priority
  if (breakdown.noWebsite > 0 || !lead.website) {
    return 'noWebsite';
  }
  
  // Mobile issues
  if (breakdown.notMobileResponsive > 0) {
    return 'mobileIssues';
  }
  
  // Outdated or multiple issues
  if (breakdown.outdatedDesign > 0 || breakdown.slowLoad > 0 || breakdown.notHttps > 0) {
    return 'outdatedWebsite';
  }
  
  // Default
  return 'general';
}

/**
 * Generate issues list for outdated website template
 */
function generateIssuesList(lead) {
  const issues = [];
  const breakdown = lead.scoreBreakdown || {};
  
  if (breakdown.notHttps > 0) {
    issues.push('• Your site isn\'t secure (no HTTPS) - browsers show warnings to visitors');
  }
  if (breakdown.slowLoad > 0) {
    issues.push('• The site loads slowly - visitors might leave before it finishes');
  }
  if (breakdown.notMobileResponsive > 0) {
    issues.push('• The site doesn\'t work well on mobile phones');
  }
  if (breakdown.noMetaTags > 0) {
    issues.push('• Missing SEO basics that help you show up in Google');
  }
  if (breakdown.outdatedDesign > 0) {
    issues.push('• The design looks dated compared to competitors');
  }
  if (breakdown.poorNavigation > 0) {
    issues.push('• Navigation could be clearer for visitors');
  }
  if (breakdown.noContactInfo > 0) {
    issues.push('• Contact information is hard to find');
  }
  
  return issues.length > 0 ? issues.join('\n') : '• Several areas could use improvement';
}

/**
 * Fill in template placeholders
 */
function fillTemplate(template, lead) {
  const ownerName = lead.enrichment?.ownerName;
  const firstName = ownerName ? ownerName.split(' ')[0] : 'there';
  const yearsInBusiness = lead.enrichment?.yearsInBusiness || '10';
  const category = lead.category || 'home services';
  const rating = lead.rating || '4.5';
  const issues = generateIssuesList(lead);
  const demoUrl = lead.demoUrl || lead.demoPath ? `file://${lead.demoPath}/index.html` : '[Demo URL]';
  
  const replacements = {
    '{{businessName}}': lead.name,
    '{{firstName}}': firstName,
    '{{category}}': category,
    '{{rating}}': rating,
    '{{yearsInBusiness}}': yearsInBusiness,
    '{{issues}}': issues,
    '{{demoUrl}}': demoUrl,
    '{{website}}': lead.website || 'N/A'
  };
  
  let subject = template.subject;
  let body = template.body;
  
  for (const [placeholder, value] of Object.entries(replacements)) {
    subject = subject.replace(new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'g'), value);
    body = body.replace(new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'g'), value);
  }
  
  return { subject, body };
}

/**
 * Generate emails for all leads
 */
async function generateEmails(inputFile) {
  console.log('═'.repeat(50));
  console.log('  EMAIL GENERATOR');
  console.log('═'.repeat(50));
  console.log(`  Input: ${inputFile}`);
  console.log('═'.repeat(50));
  
  // Load leads
  const data = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
  const leads = data.leads || [];
  
  if (leads.length === 0) {
    console.log('\n⚠️ No leads found in file');
    return;
  }
  
  console.log(`\n📧 Generating emails for ${leads.length} leads...\n`);
  
  // Create output directory
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  
  const generatedEmails = [];
  const templateCounts = {
    noWebsite: 0,
    outdatedWebsite: 0,
    mobileIssues: 0,
    general: 0
  };
  
  for (let i = 0; i < leads.length; i++) {
    const lead = leads[i];
    console.log(`[${i + 1}/${leads.length}] ${lead.name}`);
    
    // Select template
    const templateKey = selectTemplate(lead);
    const template = TEMPLATES[templateKey];
    templateCounts[templateKey]++;
    
    // Fill template
    const { subject, body } = fillTemplate(template, lead);
    
    // Create email data
    const emailData = {
      to: lead.enrichment?.email || null,
      toName: lead.enrichment?.ownerName || lead.name,
      businessName: lead.name,
      subject,
      body,
      templateUsed: templateKey,
      leadScore: lead.score,
      website: lead.website,
      demoUrl: lead.demoUrl || lead.demoPath,
      generatedAt: new Date().toISOString()
    };
    
    // Save individual email file
    const safeName = lead.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 50);
    
    const emailFile = path.join(OUTPUT_DIR, `${safeName}.json`);
    fs.writeFileSync(emailFile, JSON.stringify(emailData, null, 2));
    
    // Also save plain text version for easy copy/paste
    const textFile = path.join(OUTPUT_DIR, `${safeName}.txt`);
    fs.writeFileSync(textFile, `TO: ${emailData.to || 'Find email'}\nSUBJECT: ${subject}\n\n${body}`);
    
    generatedEmails.push(emailData);
    
    const hasEmail = lead.enrichment?.email ? '✓' : '⚠';
    console.log(`   ${hasEmail} Template: ${templateKey} | ${emailFile}`);
  }
  
  // Save summary file
  const timestamp = new Date().toISOString().split('T')[0];
  const summaryFile = path.join(OUTPUT_DIR, `campaign-summary_${timestamp}.json`);
  
  fs.writeFileSync(summaryFile, JSON.stringify({
    generatedAt: new Date().toISOString(),
    totalEmails: generatedEmails.length,
    withEmailAddress: generatedEmails.filter(e => e.to).length,
    templateBreakdown: templateCounts,
    emails: generatedEmails
  }, null, 2));
  
  // Print summary
  console.log('\n' + '─'.repeat(50));
  console.log('  EMAIL GENERATION SUMMARY');
  console.log('─'.repeat(50));
  console.log(`  Total Generated: ${generatedEmails.length}`);
  console.log(`  With Email Address: ${generatedEmails.filter(e => e.to).length}`);
  console.log(`  Need Email Lookup: ${generatedEmails.filter(e => !e.to).length}`);
  console.log('');
  console.log('  Template Usage:');
  console.log(`    No Website: ${templateCounts.noWebsite}`);
  console.log(`    Outdated Website: ${templateCounts.outdatedWebsite}`);
  console.log(`    Mobile Issues: ${templateCounts.mobileIssues}`);
  console.log(`    General: ${templateCounts.general}`);
  console.log('─'.repeat(50));
  
  console.log(`\n📁 Output Directory: ${OUTPUT_DIR}`);
  console.log(`📋 Campaign Summary: ${summaryFile}`);
  
  console.log('\n📧 READY TO SEND:');
  generatedEmails.filter(e => e.to).slice(0, 5).forEach((email, i) => {
    console.log(`  ${i + 1}. ${email.businessName}`);
    console.log(`     To: ${email.to}`);
    console.log(`     Subject: ${email.subject}`);
  });
  
  if (generatedEmails.filter(e => !e.to).length > 0) {
    console.log('\n⚠️  NEED EMAIL LOOKUP:');
    generatedEmails.filter(e => !e.to).slice(0, 5).forEach((email, i) => {
      console.log(`  ${i + 1}. ${email.businessName} - ${email.website || 'No website'}`);
    });
  }
  
  return generatedEmails;
}

// Main
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
Email Generator for SLC Lead Gen
=================================

Usage: node email-generator.js <enriched-leads.json>

Generates personalized outreach emails based on lead data.

Templates:
- No Website: For businesses without an online presence
- Outdated Website: For sites with multiple issues
- Mobile Issues: For non-mobile-responsive sites
- General: For general improvement opportunities

Output:
- data/outreach/<business-name>.json (structured data)
- data/outreach/<business-name>.txt (copy/paste ready)
- data/outreach/campaign-summary_<date>.json
`);
    process.exit(1);
  }
  
  await generateEmails(args[0]);
}

main().catch(console.error);

module.exports = { generateEmails, selectTemplate, fillTemplate, TEMPLATES };
