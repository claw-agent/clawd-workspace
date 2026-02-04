#!/usr/bin/env node
/**
 * Demo Site Generator for SLC Lead Gen
 * 
 * Generates modern, mobile-responsive landing pages from enriched business data.
 * Uses pre-built HTML/Tailwind templates with dynamic data injection.
 * 
 * Usage: node services/demo-generator.js [enriched-lead-file]
 * Example: node services/demo-generator.js data/leads/enriched/acme-plumbing.json
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  templatesDir: path.join(__dirname, '..', 'templates', 'sites'),
  outputDir: path.join(__dirname, '..', 'output', 'demos'),
  screenshotWidth: 1280,
  screenshotHeight: 800
};

// Template selection based on business category
const CATEGORY_MAPPINGS = {
  // Restaurant/Food
  'restaurant': 'restaurant',
  'food': 'restaurant',
  'cafe': 'restaurant',
  'coffee': 'restaurant',
  'bakery': 'restaurant',
  'pizza': 'restaurant',
  'bar': 'restaurant',
  'grill': 'restaurant',
  'diner': 'restaurant',
  'bistro': 'restaurant',
  'catering': 'restaurant',
  
  // Professional Services
  'lawyer': 'professional-services',
  'attorney': 'professional-services',
  'accountant': 'professional-services',
  'cpa': 'professional-services',
  'dentist': 'professional-services',
  'doctor': 'professional-services',
  'medical': 'professional-services',
  'therapy': 'professional-services',
  'chiropractor': 'professional-services',
  'insurance': 'professional-services',
  'financial': 'professional-services',
  'real estate': 'professional-services',
  'realtor': 'professional-services',
  'consultant': 'professional-services',
  'marketing': 'professional-services',
  
  // Service Businesses (default)
  'plumber': 'service-business',
  'plumbing': 'service-business',
  'hvac': 'service-business',
  'heating': 'service-business',
  'cooling': 'service-business',
  'electrical': 'service-business',
  'electrician': 'service-business',
  'roofing': 'service-business',
  'landscaping': 'service-business',
  'cleaning': 'service-business',
  'auto': 'service-business',
  'mechanic': 'service-business',
  'repair': 'service-business',
  'contractor': 'service-business',
  'construction': 'service-business',
  'handyman': 'service-business',
  'painting': 'service-business',
  'pest': 'service-business',
  'moving': 'service-business',
  'locksmith': 'service-business',
  'garage': 'service-business',
  'flooring': 'service-business',
  'carpet': 'service-business',
  'window': 'service-business',
  'pool': 'service-business',
  'tree': 'service-business',
  'lawn': 'service-business'
};

// Color palettes by industry
const COLOR_PALETTES = {
  'service-business': [
    { primary: '#2563EB', secondary: '#1E40AF' }, // Blue
    { primary: '#059669', secondary: '#047857' }, // Green
    { primary: '#DC2626', secondary: '#B91C1C' }, // Red
    { primary: '#7C3AED', secondary: '#6D28D9' }, // Purple
    { primary: '#EA580C', secondary: '#C2410C' }, // Orange
  ],
  'restaurant': [
    { primary: '#991B1B', secondary: '#7F1D1D' }, // Deep Red
    { primary: '#92400E', secondary: '#78350F' }, // Amber
    { primary: '#166534', secondary: '#14532D' }, // Forest Green
    { primary: '#1E3A5F', secondary: '#1E3A8A' }, // Navy
    { primary: '#831843', secondary: '#701A75' }, // Burgundy
  ],
  'professional-services': [
    { primary: '#1E40AF', secondary: '#1E3A8A' }, // Professional Blue
    { primary: '#0F766E', secondary: '#115E59' }, // Teal
    { primary: '#4338CA', secondary: '#3730A3' }, // Indigo
    { primary: '#0369A1', secondary: '#075985' }, // Sky Blue
    { primary: '#374151', secondary: '#1F2937' }, // Slate
  ]
};

// Default services by template type
const DEFAULT_SERVICES = {
  'service-business': [
    { icon: '🔧', name: 'Repairs & Maintenance', description: 'Fast, reliable repairs to keep everything running smoothly.' },
    { icon: '🏠', name: 'Installation', description: 'Professional installation services with guaranteed quality.' },
    { icon: '🚨', name: 'Emergency Services', description: '24/7 emergency support when you need it most.' }
  ],
  'restaurant': [
    { icon: '🍽️', name: 'Dine In', description: 'Experience our welcoming atmosphere and exceptional cuisine.' },
    { icon: '🥡', name: 'Takeout & Delivery', description: 'Enjoy our delicious food from the comfort of your home.' },
    { icon: '🎉', name: 'Private Events', description: 'Let us host your next celebration or business gathering.' }
  ],
  'professional-services': [
    { icon: '💼', name: 'Consultation', description: 'Expert guidance tailored to your specific needs.' },
    { icon: '📋', name: 'Full Service', description: 'Comprehensive solutions from start to finish.' },
    { icon: '🤝', name: 'Ongoing Support', description: 'Long-term partnership for continued success.' }
  ]
};

/**
 * Determine template type from business category/name
 */
function detectTemplateType(lead) {
  const searchText = [
    lead.category || '',
    lead.categories || '',
    lead.name || '',
    lead.businessType || ''
  ].join(' ').toLowerCase();
  
  for (const [keyword, template] of Object.entries(CATEGORY_MAPPINGS)) {
    if (searchText.includes(keyword)) {
      return template;
    }
  }
  
  return 'service-business'; // Default
}

/**
 * Generate a URL-friendly slug from business name
 */
function slugify(text) {
  return (text || 'business')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 50);
}

/**
 * Pick a color palette based on template type and some randomness from business name
 */
function selectColors(templateType, businessName) {
  const palettes = COLOR_PALETTES[templateType] || COLOR_PALETTES['service-business'];
  // Use business name to pick consistent but varied colors
  const hash = (businessName || 'default').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return palettes[hash % palettes.length];
}

/**
 * Generate headlines and content based on business type
 */
function generateContent(lead, templateType) {
  const name = lead.name || 'Your Business';
  const location = extractCity(lead.address) || 'Your Area';
  const category = lead.category || lead.categories || 'services';
  
  const headlines = {
    'service-business': {
      headline: `Trusted ${capitalizeFirst(category)} Services in ${location}`,
      subheadline: `Professional, reliable service you can count on. Serving ${location} and surrounding areas.`,
      tagline: `Quality ${capitalizeFirst(category)} Services`
    },
    'restaurant': {
      headline: `Delicious Food, Unforgettable Experience`,
      subheadline: `Discover why ${location} locals love dining with us. Fresh ingredients, exceptional flavors.`,
      tagline: `Fine Dining in ${location}`
    },
    'professional-services': {
      headline: `Expert ${capitalizeFirst(category)} Services You Can Trust`,
      subheadline: `Personalized solutions backed by years of experience. Serving clients throughout ${location}.`,
      tagline: `Professional ${capitalizeFirst(category)}`
    }
  };
  
  return headlines[templateType] || headlines['service-business'];
}

/**
 * Extract city from address
 */
function extractCity(address) {
  if (!address) return 'Salt Lake City';
  // Try to extract city from typical address formats
  const match = address.match(/,\s*([^,]+),\s*(UT|Utah)/i);
  if (match) return match[1].trim();
  // Fallback: look for known Utah cities
  const cities = ['Salt Lake City', 'Provo', 'Ogden', 'Sandy', 'Orem', 'West Valley', 'Layton', 'Park City'];
  for (const city of cities) {
    if (address.toLowerCase().includes(city.toLowerCase())) return city;
  }
  return 'Salt Lake City';
}

/**
 * Capitalize first letter of each word
 */
function capitalizeFirst(str) {
  return (str || '').replace(/\b\w/g, l => l.toUpperCase());
}

/**
 * Simple template engine - replaces {{variable}} placeholders
 */
function renderTemplate(template, data) {
  let result = template;
  
  // Handle simple variables
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string' || typeof value === 'number') {
      const regex = new RegExp(`{{${key}}}`, 'g');
      result = result.replace(regex, String(value));
    }
  }
  
  // Handle services array with {{#services}}...{{/services}}
  if (data.services && Array.isArray(data.services)) {
    const servicesRegex = /{{#services}}([\s\S]*?){{\/services}}/g;
    result = result.replace(servicesRegex, (match, template) => {
      return data.services.map(service => {
        let itemHtml = template;
        for (const [key, value] of Object.entries(service)) {
          const regex = new RegExp(`{{${key}}}`, 'g');
          itemHtml = itemHtml.replace(regex, String(value));
        }
        return itemHtml;
      }).join('\n');
    });
  }
  
  return result;
}

/**
 * Wait utility for Puppeteer (works with all versions)
 */
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Take a screenshot of the generated page
 */
async function takeScreenshot(htmlPath, outputPath, slug) {
  console.log(`   📸 Taking screenshot...`);
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    await page.setViewport({
      width: config.screenshotWidth,
      height: config.screenshotHeight
    });
    
    // Load the local HTML file
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle2' });
    
    // Wait for fonts to load
    await wait(1000);
    
    // Take full page screenshot
    const screenshotPath = path.join(outputPath, 'preview.png');
    await page.screenshot({
      path: screenshotPath,
      fullPage: false // Just the viewport, not the full page
    });
    
    console.log(`   ✅ Screenshot: ${screenshotPath}`);
    
    // Also take mobile screenshot
    await page.setViewport({ width: 375, height: 667 });
    await wait(500);
    
    const mobileScreenshotPath = path.join(outputPath, 'preview-mobile.png');
    await page.screenshot({
      path: mobileScreenshotPath,
      fullPage: false
    });
    
    console.log(`   ✅ Mobile screenshot: ${mobileScreenshotPath}`);
    
  } finally {
    await browser.close();
  }
}

/**
 * Generate the demo site
 */
async function generateDemoSite(lead, options = {}) {
  console.log(`\n🎨 Generating demo site for: ${lead.name || 'Unknown Business'}`);
  
  // Determine template type
  const templateType = options.templateType || detectTemplateType(lead);
  console.log(`   📋 Template: ${templateType}`);
  
  // Load template
  const templatePath = path.join(config.templatesDir, `${templateType}.html`);
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template not found: ${templatePath}`);
  }
  const template = fs.readFileSync(templatePath, 'utf-8');
  
  // Select colors
  const colors = selectColors(templateType, lead.name);
  
  // Generate content
  const content = generateContent(lead, templateType);
  
  // Build template data
  const templateData = {
    // Business info
    businessName: lead.name || 'Your Business',
    businessInitial: (lead.name || 'B')[0].toUpperCase(),
    phone: lead.phone || '(801) 555-0123',
    address: lead.address || 'Salt Lake City, Utah',
    email: lead.email || `info@${slugify(lead.name || 'business')}.com`,
    website: lead.website || '',
    
    // Generated content
    headline: content.headline,
    subheadline: content.subheadline,
    tagline: content.tagline,
    description: lead.description || `${lead.name || 'We'} provide exceptional service to our community. With a commitment to quality and customer satisfaction, we've built a reputation for excellence.`,
    
    // Stats
    rating: lead.rating || '4.8',
    reviewCount: lead.reviewCount || '100',
    yearsInBusiness: lead.yearsInBusiness || '10',
    
    // Colors
    primaryColor: colors.primary,
    secondaryColor: colors.secondary,
    
    // Services
    services: lead.services || DEFAULT_SERVICES[templateType],
    
    // Meta
    category: capitalizeFirst(lead.category || lead.categories || 'services'),
    location: extractCity(lead.address),
    year: new Date().getFullYear(),
    ownerName: lead.ownerName || 'Owner'
  };
  
  // Render template
  const html = renderTemplate(template, templateData);
  
  // Create output directory
  const slug = slugify(lead.name);
  const outputPath = path.join(config.outputDir, slug);
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }
  
  // Write HTML
  const htmlPath = path.join(outputPath, 'index.html');
  fs.writeFileSync(htmlPath, html);
  console.log(`   ✅ Generated: ${htmlPath}`);
  
  // Take screenshot
  if (!options.skipScreenshot) {
    await takeScreenshot(htmlPath, outputPath, slug);
  }
  
  // Write metadata
  const metadataPath = path.join(outputPath, 'metadata.json');
  fs.writeFileSync(metadataPath, JSON.stringify({
    businessName: templateData.businessName,
    slug,
    templateType,
    generatedAt: new Date().toISOString(),
    colors,
    lead: {
      name: lead.name,
      phone: lead.phone,
      address: lead.address,
      rating: lead.rating,
      reviewCount: lead.reviewCount
    }
  }, null, 2));
  
  console.log(`   📁 Output: ${outputPath}/`);
  
  return {
    slug,
    outputPath,
    htmlPath,
    templateType
  };
}

/**
 * Process a lead file or directory
 */
async function processLeadFile(filePath) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  
  // Handle both single lead and leads array
  const leads = data.leads || (Array.isArray(data) ? data : [data]);
  
  const results = [];
  for (const lead of leads) {
    try {
      const result = await generateDemoSite(lead);
      results.push({ ...result, success: true });
    } catch (error) {
      console.error(`   ❌ Error generating site for ${lead.name}: ${error.message}`);
      results.push({ name: lead.name, success: false, error: error.message });
    }
  }
  
  return results;
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.log(`
Demo Site Generator for SLC Lead Gen
=====================================

Generate modern landing pages from enriched business data.

Usage:
  node services/demo-generator.js <lead-file.json>
  node services/demo-generator.js --demo

Arguments:
  lead-file.json    JSON file with enriched lead data

Options:
  --demo            Generate a demo site with sample data
  --template TYPE   Force a specific template (service-business, restaurant, professional-services)

Examples:
  node services/demo-generator.js data/leads/enriched/acme-plumbing.json
  node services/demo-generator.js --demo
  node services/demo-generator.js sample.json --template restaurant

Output:
  Sites are saved to: output/demos/{business-slug}/
  Each site includes:
    - index.html        (deployable static site)
    - preview.png       (desktop screenshot)
    - preview-mobile.png (mobile screenshot)
    - metadata.json     (generation info)
`);
    process.exit(1);
  }
  
  console.log('═'.repeat(50));
  console.log('  DEMO SITE GENERATOR');
  console.log('═'.repeat(50));
  
  // Handle --demo flag
  if (args[0] === '--demo') {
    console.log('\n🎯 Generating demo site with sample data...\n');
    
    const sampleLead = {
      name: 'Mountain View Plumbing',
      phone: '(801) 555-1234',
      address: '123 Main Street, Salt Lake City, UT 84101',
      rating: 4.9,
      reviewCount: 234,
      category: 'plumbing',
      website: '',
      description: 'Mountain View Plumbing has been serving Salt Lake City for over 15 years. Our licensed plumbers provide fast, reliable service for all your plumbing needs.',
      yearsInBusiness: 15,
      services: [
        { icon: '🚿', name: 'Drain Cleaning', description: 'Professional drain cleaning and clog removal for all types of drains.' },
        { icon: '🔧', name: 'Pipe Repair', description: 'Expert pipe repair and replacement services, including emergency repairs.' },
        { icon: '🚰', name: 'Water Heaters', description: 'Installation, repair, and maintenance of all water heater types.' }
      ]
    };
    
    const result = await generateDemoSite(sampleLead);
    
    console.log('\n' + '─'.repeat(50));
    console.log('  DEMO GENERATED SUCCESSFULLY');
    console.log('─'.repeat(50));
    console.log(`  📁 Location: ${result.outputPath}`);
    console.log(`  🌐 Preview: file://${result.htmlPath}`);
    console.log('\n  To deploy to Vercel:');
    console.log(`  cd ${result.outputPath} && vercel --prod`);
    console.log('─'.repeat(50));
    
    return;
  }
  
  // Process lead file
  const filePath = path.resolve(args[0]);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    process.exit(1);
  }
  
  console.log(`\n📂 Processing: ${filePath}\n`);
  
  const results = await processLeadFile(filePath);
  
  // Summary
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log('\n' + '─'.repeat(50));
  console.log('  GENERATION COMPLETE');
  console.log('─'.repeat(50));
  console.log(`  ✅ Successful: ${successful}`);
  if (failed > 0) console.log(`  ❌ Failed: ${failed}`);
  console.log('─'.repeat(50));
  
  if (successful > 0) {
    console.log('\n  Generated sites:');
    results.filter(r => r.success).forEach(r => {
      console.log(`    📁 ${r.slug}/ - file://${r.htmlPath}`);
    });
    console.log('\n  To deploy to Vercel:');
    console.log(`  cd output/demos/{site-name} && vercel --prod`);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { generateDemoSite, detectTemplateType, slugify };
