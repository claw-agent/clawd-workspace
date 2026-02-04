#!/usr/bin/env node
/**
 * v0.dev Integration for SLC Lead Gen
 * 
 * Uses v0.dev AI to generate professional landing pages, with a robust
 * local fallback template system when v0.dev is unavailable.
 * 
 * Usage: node services/v0-generator.js [enriched-lead-file]
 * Example: node services/v0-generator.js data/leads/enriched/beehiveplumbing.com.json
 * 
 * Options:
 *   --local          Skip v0.dev, use local template only
 *   --v0-only        Only try v0.dev, fail if unavailable
 *   --output DIR     Custom output directory
 *   --no-screenshot  Skip screenshot generation
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// ============================================================================
// CONFIGURATION
// ============================================================================

const config = {
  outputDir: path.join(__dirname, '..', 'output', 'demos'),
  templatesDir: path.join(__dirname, '..', 'templates', 'sites'),
  screenshotWidth: 1280,
  screenshotHeight: 800,
  v0: {
    url: 'https://v0.dev',
    timeout: 120000, // 2 minutes for generation
    maxRetries: 2
  }
};

// ============================================================================
// V0.DEV PROMPT BUILDER
// ============================================================================

/**
 * Build an intelligent prompt for v0.dev based on business data
 */
function buildV0Prompt(lead) {
  const businessName = lead.businessName || lead.name || 'Business';
  const category = detectCategory(lead);
  const city = extractCity(lead);
  const phone = formatPhone(lead.contact?.phone || lead.phone);
  const services = formatServices(lead.services);
  const colorScheme = selectColorScheme(category, businessName);
  const certifications = formatCertifications(lead.certifications);
  const rating = lead.rating || '4.8';
  
  return `Create a modern, professional landing page for "${businessName}", a ${category} company in ${city}.

DESIGN REQUIREMENTS:
- Clean, professional design that builds trust
- Mobile-responsive layout (mobile-first)
- NO emojis anywhere - use proper icons from lucide-react
- Professional stock photography from Unsplash (use specific relevant queries)
- ${colorScheme} color scheme
- Modern typography (Inter or similar)

SECTIONS TO INCLUDE:

1. HERO SECTION:
   - Large, bold headline about ${category} services
   - Prominent phone number: ${phone}
   - "Call Now" CTA button that triggers tel: link
   - "Get Free Quote" secondary CTA
   - Professional background image (Unsplash: ${category} professional work)

2. TRUST BADGES BAR:
   - ${rating} star rating with review count
   ${certifications ? `- Badges: ${certifications}` : '- Licensed & Insured badges'}
   - "Locally Owned" badge
   - "Fast Response" badge
   - Use shield/check icons, not emojis

3. SERVICES SECTION:
   ${services}
   - Each service in a card with icon, title, brief description
   - Use lucide-react icons (Wrench, Droplets, Flame, etc.)

4. ABOUT/WHY CHOOSE US:
   - ${lead.aboutText ? `"${lead.aboutText.substring(0, 200)}..."` : 'Professional company description'}
   - Years in business, team size, service area stats
   - Professional team photo placeholder

5. TESTIMONIAL SECTION:
   - 2-3 customer testimonials with star ratings
   - Customer names and locations
   - Clean card layout

6. CONTACT SECTION:
   - Phone number prominently displayed
   - Contact form (name, phone, email, message)
   - Business hours if available
   - Service area map placeholder

7. FOOTER:
   - Business name and tagline
   - Quick links
   - Contact info
   - Social media icons (if available: ${formatSocialLinks(lead.socialLinks)})

TECHNICAL:
- Use Tailwind CSS
- Use lucide-react for all icons
- Use next/image with Unsplash URLs
- Make phone number clickable (tel: link)
- Ensure all CTAs are prominent and accessible

Style: Professional, trustworthy, conversion-focused. The goal is to make visitors call immediately.`;
}

/**
 * Detect business category from lead data
 */
function detectCategory(lead) {
  const searchText = [
    lead.category || '',
    lead.categories || '',
    lead.businessName || lead.name || '',
    lead.services?.join(' ') || '',
    lead.aboutText || ''
  ].join(' ').toLowerCase();
  
  const categories = {
    'plumbing': ['plumb', 'drain', 'sewer', 'pipe', 'water heater', 'toilet', 'faucet'],
    'hvac': ['hvac', 'heating', 'cooling', 'air condition', 'furnace', 'duct'],
    'electrical': ['electric', 'wiring', 'panel', 'outlet'],
    'roofing': ['roof', 'shingle', 'gutter'],
    'landscaping': ['landscape', 'lawn', 'garden', 'tree'],
    'cleaning': ['clean', 'maid', 'janitor'],
    'restaurant': ['restaurant', 'food', 'dining', 'cuisine'],
    'legal': ['lawyer', 'attorney', 'law firm', 'legal'],
    'dental': ['dentist', 'dental', 'orthodont'],
    'medical': ['doctor', 'medical', 'clinic', 'health']
  };
  
  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(kw => searchText.includes(kw))) {
      return category;
    }
  }
  
  return 'home services';
}

/**
 * Extract city from lead data
 */
function extractCity(lead) {
  const address = lead.contact?.address || lead.address || '';
  
  // Try to find city in address
  const cityMatch = address.match(/,\s*([A-Za-z\s]+),?\s*(UT|Utah)/i);
  if (cityMatch) return cityMatch[1].trim();
  
  // Check common Utah cities
  const utahCities = ['Salt Lake City', 'Provo', 'Ogden', 'Sandy', 'Orem', 'West Valley City', 'Layton', 'Park City', 'Murray', 'Draper'];
  for (const city of utahCities) {
    if (address.toLowerCase().includes(city.toLowerCase())) {
      return city;
    }
  }
  
  return 'Salt Lake City';
}

/**
 * Format phone number for display
 */
function formatPhone(phone) {
  if (!phone) return '(801) 555-0123';
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`;
  }
  return phone;
}

/**
 * Format services list for prompt
 */
function formatServices(services) {
  if (!services || services.length === 0) {
    return 'General services including repairs, installation, and maintenance';
  }
  
  // Clean up and capitalize services
  const formatted = services
    .slice(0, 8) // Limit to 8 services
    .map(s => typeof s === 'string' ? s : s.name)
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join(', ');
  
  return `Services: ${formatted}`;
}

/**
 * Format certifications for prompt
 */
function formatCertifications(certs) {
  if (!certs || certs.length === 0) return '';
  return certs.map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(', ');
}

/**
 * Format social links for prompt
 */
function formatSocialLinks(links) {
  if (!links) return 'none';
  const platforms = Object.keys(links).filter(k => links[k]);
  return platforms.length > 0 ? platforms.join(', ') : 'none';
}

/**
 * Select color scheme based on category
 */
function selectColorScheme(category, businessName) {
  const schemes = {
    'plumbing': 'blue and white (trust, clean water)',
    'hvac': 'orange and gray (warmth, reliability)',
    'electrical': 'yellow and dark gray (energy, safety)',
    'roofing': 'dark slate and red (durability, strength)',
    'landscaping': 'green and earth brown (nature, growth)',
    'cleaning': 'light blue and white (cleanliness, freshness)',
    'restaurant': 'warm red and cream (appetite, comfort)',
    'legal': 'navy blue and gold (authority, prestige)',
    'dental': 'teal and white (health, hygiene)',
    'medical': 'blue and white (trust, care)'
  };
  
  return schemes[category] || 'professional blue and white (trust, reliability)';
}

// ============================================================================
// V0.DEV BROWSER AUTOMATION
// ============================================================================

/**
 * Generate a landing page using v0.dev
 */
async function generateWithV0(lead, options = {}) {
  console.log('\n🤖 Attempting v0.dev generation...');
  
  const prompt = buildV0Prompt(lead);
  console.log(`   📝 Prompt length: ${prompt.length} characters`);
  
  const browser = await puppeteer.launch({
    headless: false, // v0.dev may need visible browser for auth
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1400,900'],
    defaultViewport: { width: 1400, height: 900 }
  });
  
  try {
    const page = await browser.newPage();
    
    // Set user agent to avoid bot detection
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    console.log('   🌐 Navigating to v0.dev...');
    await page.goto(config.v0.url, { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Wait a moment for page to fully load
    await wait(2000);
    
    // Check if we need to authenticate
    const needsAuth = await checkV0Auth(page);
    if (needsAuth) {
      console.log('   ⚠️  v0.dev requires authentication');
      console.log('   💡 Please log in with GitHub in the browser window...');
      
      // Wait for user to authenticate (up to 2 minutes)
      const authSuccess = await waitForAuth(page, 120000);
      if (!authSuccess) {
        throw new Error('Authentication timeout - user did not log in');
      }
      console.log('   ✅ Authentication successful!');
    }
    
    // Find and fill the prompt input
    console.log('   ✏️  Entering prompt...');
    const inputSelector = 'textarea[placeholder*="Describe"], textarea[name="prompt"], textarea';
    await page.waitForSelector(inputSelector, { timeout: 10000 });
    
    // Clear any existing text and type our prompt
    await page.click(inputSelector, { clickCount: 3 });
    await page.type(inputSelector, prompt, { delay: 10 });
    
    // Submit the prompt
    console.log('   🚀 Submitting to v0.dev...');
    await page.keyboard.press('Enter');
    // Or try clicking a submit button
    const submitBtn = await page.$('button[type="submit"], button:has-text("Generate")');
    if (submitBtn) {
      await submitBtn.click();
    }
    
    // Wait for generation to complete
    console.log('   ⏳ Waiting for generation (this may take 1-2 minutes)...');
    
    // Look for signs of completion
    const codeBlockSelector = 'pre code, [data-code], .code-block, div[class*="code"]';
    await page.waitForSelector(codeBlockSelector, { timeout: config.v0.timeout });
    
    // Additional wait for full generation
    await wait(5000);
    
    // Extract the generated code
    console.log('   📥 Extracting generated code...');
    const generatedCode = await extractV0Code(page);
    
    if (!generatedCode || generatedCode.length < 500) {
      throw new Error('Generated code appears incomplete or empty');
    }
    
    console.log(`   ✅ Extracted ${generatedCode.length} characters of code`);
    
    return {
      success: true,
      source: 'v0.dev',
      code: generatedCode,
      prompt
    };
    
  } catch (error) {
    console.log(`   ❌ v0.dev generation failed: ${error.message}`);
    return {
      success: false,
      source: 'v0.dev',
      error: error.message
    };
  } finally {
    await browser.close();
  }
}

/**
 * Check if v0.dev needs authentication
 */
async function checkV0Auth(page) {
  // Look for login buttons or auth prompts
  const authIndicators = [
    'button:has-text("Sign in")',
    'button:has-text("Log in")',
    'a[href*="github.com/login"]',
    '[data-testid="login-button"]'
  ];
  
  for (const selector of authIndicators) {
    try {
      const element = await page.$(selector);
      if (element) return true;
    } catch (e) {
      // Selector not found, continue
    }
  }
  
  // Check for auth-related text
  const pageText = await page.evaluate(() => document.body.innerText);
  if (pageText.includes('Sign in to continue') || pageText.includes('Login required')) {
    return true;
  }
  
  return false;
}

/**
 * Wait for user to complete authentication
 */
async function waitForAuth(page, timeoutMs) {
  const startTime = Date.now();
  
  while (Date.now() - startTime < timeoutMs) {
    await wait(2000);
    
    // Check if we're now authenticated (look for prompt input)
    const isAuthenticated = await page.evaluate(() => {
      return !!(
        document.querySelector('textarea[placeholder*="Describe"]') ||
        document.querySelector('textarea[name="prompt"]') ||
        document.querySelector('[data-testid="prompt-input"]')
      );
    });
    
    if (isAuthenticated) return true;
    
    // Also check URL for successful auth redirect
    const url = page.url();
    if (url.includes('v0.dev') && !url.includes('login')) {
      return true;
    }
  }
  
  return false;
}

/**
 * Extract generated code from v0.dev page
 */
async function extractV0Code(page) {
  return await page.evaluate(() => {
    // Try multiple selectors for code extraction
    const selectors = [
      'pre code',
      '[data-code]',
      '.code-block pre',
      'div[class*="CodeBlock"] pre',
      '[role="code"]'
    ];
    
    for (const selector of selectors) {
      const element = document.querySelector(selector);
      if (element && element.textContent.length > 100) {
        return element.textContent;
      }
    }
    
    // Try to find copy button and get its associated code
    const copyBtn = document.querySelector('button[aria-label*="Copy"], button:has-text("Copy code")');
    if (copyBtn) {
      // Navigate up to find the code container
      let container = copyBtn.parentElement;
      for (let i = 0; i < 5 && container; i++) {
        const code = container.querySelector('pre, code');
        if (code && code.textContent.length > 100) {
          return code.textContent;
        }
        container = container.parentElement;
      }
    }
    
    return null;
  });
}

// ============================================================================
// LOCAL FALLBACK TEMPLATE GENERATOR
// ============================================================================

/**
 * Generate a professional landing page using local templates
 * Uses Lucide icons and Unsplash images instead of emojis
 */
async function generateLocalTemplate(lead, options = {}) {
  console.log('\n📄 Generating with local template...');
  
  const businessName = lead.businessName || lead.name || 'Business';
  const category = detectCategory(lead);
  const city = extractCity(lead);
  const phone = formatPhone(lead.contact?.phone || lead.phone);
  const email = lead.contact?.email || lead.email || '';
  const rating = lead.rating || '4.8';
  const reviewCount = lead.reviewCount || '100+';
  
  // Generate color palette
  const colors = generateColors(category, businessName);
  
  // Build services with proper icons
  const services = buildServicesWithIcons(lead.services, category);
  
  // Build certifications badges
  const certBadges = buildCertBadges(lead.certifications);
  
  // Generate Unsplash image URLs
  const images = {
    hero: `https://images.unsplash.com/photo-${getUnsplashId(category, 'hero')}?w=1920&q=80`,
    about: `https://images.unsplash.com/photo-${getUnsplashId(category, 'team')}?w=800&q=80`,
    service1: `https://images.unsplash.com/photo-${getUnsplashId(category, 'work1')}?w=600&q=80`,
    service2: `https://images.unsplash.com/photo-${getUnsplashId(category, 'work2')}?w=600&q=80`
  };
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${businessName} | Professional ${capitalize(category)} Services in ${city}</title>
  <meta name="description" content="${lead.aboutText?.substring(0, 160) || `${businessName} provides professional ${category} services in ${city}. Licensed, insured, and trusted by hundreds of customers.`}">
  
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: '${colors.primary}',
            'primary-dark': '${colors.primaryDark}',
            secondary: '${colors.secondary}',
            accent: '${colors.accent}'
          }
        }
      }
    }
  </script>
  
  <!-- Lucide Icons -->
  <script src="https://unpkg.com/lucide@latest"></script>
  
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  
  <style>
    body { font-family: 'Inter', sans-serif; }
    .hero-gradient {
      background: linear-gradient(135deg, ${colors.primary}ee 0%, ${colors.primaryDark}f5 100%);
    }
    .glass-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
    }
  </style>
</head>
<body class="bg-gray-50 text-gray-800">

  <!-- Navigation -->
  <nav class="fixed w-full z-50 bg-white/90 backdrop-blur-md shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center space-x-2">
          <div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-xl">${businessName.charAt(0)}</span>
          </div>
          <span class="font-bold text-xl text-gray-900">${businessName}</span>
        </div>
        
        <div class="hidden md:flex items-center space-x-8">
          <a href="#services" class="text-gray-600 hover:text-primary font-medium transition">Services</a>
          <a href="#about" class="text-gray-600 hover:text-primary font-medium transition">About</a>
          <a href="#reviews" class="text-gray-600 hover:text-primary font-medium transition">Reviews</a>
          <a href="#contact" class="text-gray-600 hover:text-primary font-medium transition">Contact</a>
        </div>
        
        <a href="tel:${phone.replace(/\D/g, '')}" class="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition shadow-lg shadow-primary/25">
          <i data-lucide="phone" class="w-4 h-4"></i>
          <span class="hidden sm:inline">${phone}</span>
          <span class="sm:hidden">Call</span>
        </a>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <header class="relative min-h-screen flex items-center">
    <div class="absolute inset-0">
      <img src="${images.hero}" alt="${category} services" class="w-full h-full object-cover">
      <div class="absolute inset-0 hero-gradient"></div>
    </div>
    
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-white">
      <div class="max-w-3xl">
        <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
          <i data-lucide="shield-check" class="w-5 h-5"></i>
          <span class="font-medium">Licensed & Insured</span>
        </div>
        
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
          Trusted ${capitalize(category)} Services in ${city}
        </h1>
        
        <p class="text-xl sm:text-2xl opacity-90 mb-8 leading-relaxed">
          ${lead.aboutText?.substring(0, 150) || `Professional ${category} services you can count on. Fast response, quality work, and fair prices guaranteed.`}
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4">
          <a href="tel:${phone.replace(/\D/g, '')}" class="inline-flex items-center justify-center gap-3 bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition shadow-xl">
            <i data-lucide="phone-call" class="w-6 h-6"></i>
            Call Now: ${phone}
          </a>
          <a href="#contact" class="inline-flex items-center justify-center gap-3 border-2 border-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-primary transition">
            <i data-lucide="file-text" class="w-6 h-6"></i>
            Get Free Quote
          </a>
        </div>
      </div>
    </div>
    
    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <i data-lucide="chevron-down" class="w-8 h-8 text-white/70"></i>
    </div>
  </header>

  <!-- Trust Badges -->
  <section class="bg-white py-6 border-y border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-wrap justify-center items-center gap-6 sm:gap-12">
        <div class="flex items-center gap-2">
          <div class="flex text-yellow-400">
            <i data-lucide="star" class="w-5 h-5 fill-current"></i>
            <i data-lucide="star" class="w-5 h-5 fill-current"></i>
            <i data-lucide="star" class="w-5 h-5 fill-current"></i>
            <i data-lucide="star" class="w-5 h-5 fill-current"></i>
            <i data-lucide="star" class="w-5 h-5 fill-current"></i>
          </div>
          <span class="font-bold text-gray-900">${rating}</span>
          <span class="text-gray-500 text-sm">(${reviewCount} reviews)</span>
        </div>
        ${certBadges}
        <div class="flex items-center gap-2 text-gray-600">
          <i data-lucide="clock" class="w-5 h-5 text-primary"></i>
          <span class="font-medium">Fast Response</span>
        </div>
        <div class="flex items-center gap-2 text-gray-600">
          <i data-lucide="map-pin" class="w-5 h-5 text-primary"></i>
          <span class="font-medium">Locally Owned</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Services Section -->
  <section id="services" class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <span class="inline-block bg-primary/10 text-primary font-semibold px-4 py-2 rounded-full text-sm mb-4">Our Services</span>
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What We Do</h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Professional ${category} services backed by years of experience and a commitment to quality.
        </p>
      </div>
      
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        ${services.map(service => `
        <div class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
          <div class="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
            <i data-lucide="${service.icon}" class="w-7 h-7 text-primary group-hover:text-white transition-all duration-300"></i>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">${service.name}</h3>
          <p class="text-gray-600 leading-relaxed">${service.description}</p>
        </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Why Choose Us -->
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span class="inline-block bg-primary/10 text-primary font-semibold px-4 py-2 rounded-full text-sm mb-4">Why Choose Us</span>
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            ${city}'s Most Trusted ${capitalize(category)} Professionals
          </h2>
          <p class="text-lg text-gray-600 mb-8 leading-relaxed">
            ${lead.aboutText || `At ${businessName}, we believe in doing things right the first time. Our team of skilled professionals is dedicated to providing exceptional service and lasting results.`}
          </p>
          
          <div class="grid sm:grid-cols-2 gap-6">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <i data-lucide="check-circle" class="w-5 h-5 text-green-600"></i>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900">Quality Guaranteed</h4>
                <p class="text-sm text-gray-600">100% satisfaction on every job</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <i data-lucide="users" class="w-5 h-5 text-blue-600"></i>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900">Expert Team</h4>
                <p class="text-sm text-gray-600">Trained & certified professionals</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <i data-lucide="zap" class="w-5 h-5 text-amber-600"></i>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900">Fast Service</h4>
                <p class="text-sm text-gray-600">Same-day service available</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <i data-lucide="badge-dollar-sign" class="w-5 h-5 text-purple-600"></i>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900">Fair Pricing</h4>
                <p class="text-sm text-gray-600">Upfront, honest quotes</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="relative">
          <img src="${images.about}" alt="${businessName} team" class="rounded-2xl shadow-2xl w-full">
          <div class="absolute -bottom-6 -left-6 bg-primary text-white p-6 rounded-xl shadow-xl">
            <div class="text-4xl font-bold">${lead.yearsInBusiness || '10'}+</div>
            <div class="text-sm opacity-90">Years of Experience</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonials -->
  <section id="reviews" class="py-20 bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <span class="inline-block bg-white/10 text-white font-semibold px-4 py-2 rounded-full text-sm mb-4">Testimonials</span>
        <h2 class="text-3xl sm:text-4xl font-bold mb-4">What Our Customers Say</h2>
        <p class="text-xl text-gray-400">Join hundreds of satisfied customers in ${city}</p>
      </div>
      
      <div class="grid md:grid-cols-3 gap-8">
        ${generateTestimonials(category, city).map(t => `
        <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <div class="flex text-yellow-400 mb-4">
            <i data-lucide="star" class="w-5 h-5 fill-current"></i>
            <i data-lucide="star" class="w-5 h-5 fill-current"></i>
            <i data-lucide="star" class="w-5 h-5 fill-current"></i>
            <i data-lucide="star" class="w-5 h-5 fill-current"></i>
            <i data-lucide="star" class="w-5 h-5 fill-current"></i>
          </div>
          <p class="text-gray-300 mb-6 leading-relaxed">"${t.text}"</p>
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
              <span class="text-primary font-bold">${t.name.charAt(0)}</span>
            </div>
            <div>
              <div class="font-semibold">${t.name}</div>
              <div class="text-sm text-gray-400">${t.location}</div>
            </div>
          </div>
        </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section id="contact" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-16">
        <div>
          <span class="inline-block bg-primary/10 text-primary font-semibold px-4 py-2 rounded-full text-sm mb-4">Contact Us</span>
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Get Your Free Quote Today</h2>
          <p class="text-lg text-gray-600 mb-8">
            Ready to get started? Contact us today for a free, no-obligation quote. Our team is standing by to help.
          </p>
          
          <div class="space-y-6">
            <a href="tel:${phone.replace(/\D/g, '')}" class="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-primary/5 transition group">
              <div class="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <i data-lucide="phone" class="w-6 h-6 text-white"></i>
              </div>
              <div>
                <div class="text-sm text-gray-500">Call us now</div>
                <div class="text-xl font-bold text-gray-900 group-hover:text-primary transition">${phone}</div>
              </div>
            </a>
            
            ${email ? `
            <a href="mailto:${email}" class="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-primary/5 transition group">
              <div class="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <i data-lucide="mail" class="w-6 h-6 text-white"></i>
              </div>
              <div>
                <div class="text-sm text-gray-500">Email us</div>
                <div class="text-lg font-bold text-gray-900 group-hover:text-primary transition">${email}</div>
              </div>
            </a>
            ` : ''}
            
            <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div class="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <i data-lucide="map-pin" class="w-6 h-6 text-white"></i>
              </div>
              <div>
                <div class="text-sm text-gray-500">Service Area</div>
                <div class="text-lg font-bold text-gray-900">${city} & Surrounding Areas</div>
              </div>
            </div>
          </div>
          
          ${lead.socialLinks ? `
          <div class="mt-8 flex gap-4">
            ${lead.socialLinks.facebook ? `<a href="${lead.socialLinks.facebook}" target="_blank" class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition"><i data-lucide="facebook" class="w-5 h-5"></i></a>` : ''}
            ${lead.socialLinks.instagram ? `<a href="${lead.socialLinks.instagram}" target="_blank" class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition"><i data-lucide="instagram" class="w-5 h-5"></i></a>` : ''}
            ${lead.socialLinks.twitter ? `<a href="${lead.socialLinks.twitter}" target="_blank" class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition"><i data-lucide="twitter" class="w-5 h-5"></i></a>` : ''}
          </div>
          ` : ''}
        </div>
        
        <div class="bg-gray-50 rounded-2xl p-8 lg:p-10">
          <h3 class="text-2xl font-bold text-gray-900 mb-6">Request a Quote</h3>
          <form class="space-y-6" onsubmit="event.preventDefault(); alert('Thanks! We\\'ll call you shortly.');">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
              <input type="text" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition" placeholder="John Smith">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input type="tel" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition" placeholder="(801) 555-0123">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email (Optional)</label>
              <input type="email" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition" placeholder="you@example.com">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">How Can We Help?</label>
              <textarea rows="4" required class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition resize-none" placeholder="Describe your project or issue..."></textarea>
            </div>
            <button type="submit" class="w-full bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-bold text-lg transition shadow-lg shadow-primary/25 flex items-center justify-center gap-2">
              <span>Get My Free Quote</span>
              <i data-lucide="arrow-right" class="w-5 h-5"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Banner -->
  <section class="py-16 bg-primary">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
      <p class="text-xl text-white/80 mb-8">Call now for fast, reliable service from ${city}'s trusted ${category} experts.</p>
      <a href="tel:${phone.replace(/\D/g, '')}" class="inline-flex items-center justify-center gap-3 bg-white text-primary px-10 py-5 rounded-xl font-bold text-xl hover:bg-gray-100 transition shadow-xl">
        <i data-lucide="phone-call" class="w-7 h-7"></i>
        ${phone}
      </a>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-gray-900 text-gray-400 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid md:grid-cols-4 gap-8 mb-8">
        <div class="md:col-span-2">
          <div class="flex items-center space-x-2 mb-4">
            <div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-xl">${businessName.charAt(0)}</span>
            </div>
            <span class="font-bold text-xl text-white">${businessName}</span>
          </div>
          <p class="text-gray-400 max-w-md">
            Professional ${category} services in ${city}. Licensed, insured, and committed to quality workmanship.
          </p>
        </div>
        
        <div>
          <h4 class="font-semibold text-white mb-4">Quick Links</h4>
          <ul class="space-y-2">
            <li><a href="#services" class="hover:text-white transition">Services</a></li>
            <li><a href="#about" class="hover:text-white transition">About Us</a></li>
            <li><a href="#reviews" class="hover:text-white transition">Reviews</a></li>
            <li><a href="#contact" class="hover:text-white transition">Contact</a></li>
          </ul>
        </div>
        
        <div>
          <h4 class="font-semibold text-white mb-4">Contact</h4>
          <ul class="space-y-2">
            <li><a href="tel:${phone.replace(/\D/g, '')}" class="hover:text-white transition">${phone}</a></li>
            ${email ? `<li><a href="mailto:${email}" class="hover:text-white transition">${email}</a></li>` : ''}
            <li>${city}, Utah</li>
          </ul>
        </div>
      </div>
      
      <div class="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>&copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.</p>
        <p class="text-sm">Licensed & Insured | Serving ${city} and surrounding areas</p>
      </div>
    </div>
  </footer>

  <!-- Initialize Lucide Icons -->
  <script>
    lucide.createIcons();
  </script>

</body>
</html>`;

  return {
    success: true,
    source: 'local-template',
    code: html,
    templateVersion: '2.0'
  };
}

/**
 * Generate color palette for business
 */
function generateColors(category, businessName) {
  const palettes = {
    'plumbing': { primary: '#2563eb', primaryDark: '#1d4ed8', secondary: '#60a5fa', accent: '#dbeafe' },
    'hvac': { primary: '#ea580c', primaryDark: '#c2410c', secondary: '#fb923c', accent: '#ffedd5' },
    'electrical': { primary: '#eab308', primaryDark: '#ca8a04', secondary: '#facc15', accent: '#fef9c3' },
    'roofing': { primary: '#475569', primaryDark: '#334155', secondary: '#94a3b8', accent: '#f1f5f9' },
    'landscaping': { primary: '#16a34a', primaryDark: '#15803d', secondary: '#4ade80', accent: '#dcfce7' },
    'cleaning': { primary: '#0891b2', primaryDark: '#0e7490', secondary: '#22d3ee', accent: '#cffafe' },
    'restaurant': { primary: '#dc2626', primaryDark: '#b91c1c', secondary: '#f87171', accent: '#fee2e2' },
    'legal': { primary: '#1e3a8a', primaryDark: '#1e40af', secondary: '#3b82f6', accent: '#dbeafe' },
    'dental': { primary: '#0d9488', primaryDark: '#0f766e', secondary: '#2dd4bf', accent: '#ccfbf1' },
    'medical': { primary: '#0ea5e9', primaryDark: '#0284c7', secondary: '#38bdf8', accent: '#e0f2fe' }
  };
  
  // Use hash of business name for slight variation
  const hash = businessName.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % 10;
  
  return palettes[category] || palettes['plumbing'];
}

/**
 * Build services with appropriate icons
 */
function buildServicesWithIcons(services, category) {
  const iconMappings = {
    // Plumbing
    'water heater': 'flame',
    'drain': 'droplets',
    'sewer': 'waves',
    'emergency': 'siren',
    'toilet': 'bath',
    'faucet': 'droplet',
    'pipe': 'pipette',
    'shower': 'shower-head',
    'water softener': 'filter',
    'garbage disposal': 'trash-2',
    'remodel': 'home',
    // HVAC
    'heating': 'flame',
    'cooling': 'snowflake',
    'duct': 'wind',
    'furnace': 'thermometer',
    'air': 'fan',
    // Electrical
    'wiring': 'cable',
    'panel': 'layout-grid',
    'outlet': 'plug',
    'lighting': 'lightbulb',
    // General
    'repair': 'wrench',
    'install': 'package-plus',
    'maintenance': 'settings',
    'inspection': 'search'
  };
  
  const defaultIcons = {
    'plumbing': ['wrench', 'droplets', 'flame', 'pipette', 'bath', 'waves'],
    'hvac': ['flame', 'snowflake', 'wind', 'thermometer', 'fan', 'gauge'],
    'electrical': ['zap', 'lightbulb', 'plug', 'cable', 'power', 'circuit-board'],
    'default': ['wrench', 'shield-check', 'clock', 'star', 'home', 'settings']
  };
  
  if (!services || services.length === 0) {
    const defaults = defaultIcons[category] || defaultIcons['default'];
    return [
      { icon: defaults[0], name: 'Repairs & Maintenance', description: 'Fast, reliable repairs to keep everything running smoothly.' },
      { icon: defaults[1], name: 'Installation', description: 'Professional installation services with guaranteed quality.' },
      { icon: defaults[2], name: 'Emergency Services', description: '24/7 emergency support when you need it most.' },
      { icon: defaults[3], name: 'Inspections', description: 'Thorough inspections to identify issues before they become problems.' },
      { icon: defaults[4], name: 'Upgrades', description: 'Modern upgrades to improve efficiency and reliability.' },
      { icon: defaults[5], name: 'Maintenance Plans', description: 'Regular maintenance to extend the life of your systems.' }
    ];
  }
  
  // Map services to icons
  const icons = defaultIcons[category] || defaultIcons['default'];
  return services.slice(0, 6).map((service, i) => {
    const serviceName = typeof service === 'string' ? service : service.name;
    const serviceDesc = typeof service === 'string' 
      ? `Professional ${serviceName.toLowerCase()} services with guaranteed satisfaction.`
      : service.description;
    
    // Find matching icon
    let icon = icons[i % icons.length];
    for (const [keyword, iconName] of Object.entries(iconMappings)) {
      if (serviceName.toLowerCase().includes(keyword)) {
        icon = iconName;
        break;
      }
    }
    
    return {
      icon,
      name: capitalize(serviceName),
      description: serviceDesc
    };
  });
}

/**
 * Build certification badges HTML
 */
function buildCertBadges(certs) {
  if (!certs || certs.length === 0) {
    return `
      <div class="flex items-center gap-2 text-gray-600">
        <i data-lucide="shield-check" class="w-5 h-5 text-green-600"></i>
        <span class="font-medium">Licensed & Insured</span>
      </div>
    `;
  }
  
  return certs.map(cert => {
    const iconMap = {
      'licensed': 'badge-check',
      'bonded': 'shield',
      'insured': 'shield-check',
      'certified': 'award'
    };
    const icon = iconMap[cert.toLowerCase()] || 'check-circle';
    return `
      <div class="flex items-center gap-2 text-gray-600">
        <i data-lucide="${icon}" class="w-5 h-5 text-green-600"></i>
        <span class="font-medium">${capitalize(cert)}</span>
      </div>
    `;
  }).join('');
}

/**
 * Get Unsplash photo ID for category
 */
function getUnsplashId(category, type) {
  const photos = {
    'plumbing': {
      hero: '1504328345606-18bbc8c9d7d1', // Professional working
      team: '1521737711867-e3b97375f902', // Team working
      work1: '1558618666-fcd25c85cd64', // Tools
      work2: '1585704032915-c3400ca199e7'  // Pipes
    },
    'hvac': {
      hero: '1504328345606-18bbc8c9d7d1',
      team: '1521737711867-e3b97375f902',
      work1: '1631545806609-59735129b018',
      work2: '1585704032915-c3400ca199e7'
    },
    'electrical': {
      hero: '1621905251189-08b45d6a269e',
      team: '1521737711867-e3b97375f902',
      work1: '1558618666-fcd25c85cd64',
      work2: '1558450329-c15a35ce929a'
    },
    'default': {
      hero: '1504328345606-18bbc8c9d7d1',
      team: '1521737711867-e3b97375f902',
      work1: '1558618666-fcd25c85cd64',
      work2: '1585704032915-c3400ca199e7'
    }
  };
  
  const categoryPhotos = photos[category] || photos['default'];
  return categoryPhotos[type] || categoryPhotos['hero'];
}

/**
 * Generate testimonials for the business
 */
function generateTestimonials(category, city) {
  const testimonialTexts = {
    'plumbing': [
      { text: "They fixed our water heater emergency on a Sunday evening. Fast, professional, and fair pricing. Couldn't ask for better service!", name: 'Sarah M.', location: `${city}, UT` },
      { text: "After getting quotes from 3 different plumbers, these guys were the most honest and reasonably priced. Great communication throughout.", name: 'Mike R.', location: `${city}, UT` },
      { text: "Our basement flooded at midnight and they were here within an hour. Saved us from major damage. True professionals!", name: 'Jennifer K.', location: `${city}, UT` }
    ],
    'hvac': [
      { text: "Our AC broke during the hottest week of summer. They came same day and fixed it quickly. So grateful for their fast response!", name: 'David L.', location: `${city}, UT` },
      { text: "Professional installation of our new furnace. They explained everything, cleaned up after themselves, and the price was very fair.", name: 'Amanda S.', location: `${city}, UT` },
      { text: "They've maintained our HVAC system for 5 years now. Always reliable, always on time. Highly recommend!", name: 'Robert T.', location: `${city}, UT` }
    ],
    'default': [
      { text: "Exceptional service from start to finish. They arrived on time, completed the work efficiently, and left everything spotless.", name: 'Sarah M.', location: `${city}, UT` },
      { text: "Finally found a company I can trust. Fair prices, honest assessments, and quality work. They've earned a customer for life.", name: 'Mike R.', location: `${city}, UT` },
      { text: "Professional, courteous, and skilled. They went above and beyond to solve our problem. Highly recommend!", name: 'Jennifer K.', location: `${city}, UT` }
    ]
  };
  
  return testimonialTexts[category] || testimonialTexts['default'];
}

/**
 * Capitalize first letter of each word
 */
function capitalize(str) {
  return (str || '').replace(/\b\w/g, l => l.toUpperCase());
}

/**
 * Wait utility
 */
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Generate URL-friendly slug
 */
function slugify(text) {
  return (text || 'business')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 50);
}

// ============================================================================
// MAIN GENERATOR FUNCTION
// ============================================================================

/**
 * Generate a demo site for a business lead
 */
async function generateDemoSite(lead, options = {}) {
  const businessName = lead.businessName || lead.name || 'Business';
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`  GENERATING DEMO SITE: ${businessName}`);
  console.log(`${'═'.repeat(60)}`);
  
  let result;
  
  // Try v0.dev first (unless --local flag)
  if (!options.localOnly) {
    result = await generateWithV0(lead, options);
    
    if (result.success) {
      console.log('\n✅ v0.dev generation successful!');
    } else if (!options.v0Only) {
      console.log('\n⚠️  Falling back to local template...');
      result = await generateLocalTemplate(lead, options);
    }
  } else {
    result = await generateLocalTemplate(lead, options);
  }
  
  if (!result.success) {
    throw new Error(`Generation failed: ${result.error}`);
  }
  
  // Save the generated code
  const slug = slugify(businessName);
  const outputDir = options.outputDir || config.outputDir;
  const outputPath = path.join(outputDir, slug);
  
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }
  
  // Determine file type and save
  const isReact = result.code.includes('import React') || result.code.includes('export default');
  const filename = isReact ? 'page.tsx' : 'index.html';
  const filePath = path.join(outputPath, filename);
  
  fs.writeFileSync(filePath, result.code);
  console.log(`\n📁 Saved: ${filePath}`);
  
  // Take screenshot (unless --no-screenshot)
  if (!options.noScreenshot && !isReact) {
    await takeScreenshot(filePath, outputPath);
  }
  
  // Save metadata
  const metadata = {
    businessName,
    slug,
    source: result.source,
    generatedAt: new Date().toISOString(),
    lead: {
      name: businessName,
      phone: lead.contact?.phone || lead.phone,
      category: detectCategory(lead),
      city: extractCity(lead)
    },
    files: [filename, 'preview.png', 'preview-mobile.png', 'metadata.json']
  };
  
  fs.writeFileSync(
    path.join(outputPath, 'metadata.json'),
    JSON.stringify(metadata, null, 2)
  );
  
  console.log(`\n${'─'.repeat(60)}`);
  console.log(`  ✅ DEMO SITE GENERATED`);
  console.log(`${'─'.repeat(60)}`);
  console.log(`  📁 Location: ${outputPath}/`);
  console.log(`  🌐 Preview: file://${filePath}`);
  console.log(`  📦 Source: ${result.source}`);
  console.log(`${'─'.repeat(60)}`);
  
  return {
    success: true,
    slug,
    outputPath,
    filePath,
    source: result.source
  };
}

/**
 * Take screenshots of the generated page
 */
async function takeScreenshot(htmlPath, outputPath) {
  console.log('\n📸 Taking screenshots...');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Desktop screenshot
    await page.setViewport({ width: config.screenshotWidth, height: config.screenshotHeight });
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle2' });
    await wait(1500); // Wait for fonts and icons
    
    const desktopPath = path.join(outputPath, 'preview.png');
    await page.screenshot({ path: desktopPath, fullPage: false });
    console.log(`   ✅ Desktop: ${desktopPath}`);
    
    // Mobile screenshot
    await page.setViewport({ width: 375, height: 667 });
    await wait(500);
    
    const mobilePath = path.join(outputPath, 'preview-mobile.png');
    await page.screenshot({ path: mobilePath, fullPage: false });
    console.log(`   ✅ Mobile: ${mobilePath}`);
    
  } finally {
    await browser.close();
  }
}

// ============================================================================
// CLI ENTRY POINT
// ============================================================================

async function main() {
  const args = process.argv.slice(2);
  
  // Parse options
  const options = {
    localOnly: args.includes('--local'),
    v0Only: args.includes('--v0-only'),
    noScreenshot: args.includes('--no-screenshot')
  };
  
  // Get output dir if specified
  const outputIdx = args.indexOf('--output');
  if (outputIdx !== -1 && args[outputIdx + 1]) {
    options.outputDir = path.resolve(args[outputIdx + 1]);
  }
  
  // Get lead file (first non-flag argument)
  const leadFile = args.find(a => !a.startsWith('--'));
  
  if (!leadFile) {
    console.log(`
v0.dev Integration for SLC Lead Gen
====================================

Generate professional landing pages using AI (v0.dev) with local fallback.

Usage:
  node services/v0-generator.js <lead-file.json> [options]

Options:
  --local           Skip v0.dev, use local template only
  --v0-only         Only try v0.dev, fail if unavailable
  --output DIR      Custom output directory
  --no-screenshot   Skip screenshot generation

Examples:
  node services/v0-generator.js data/leads/enriched/beehiveplumbing.com.json
  node services/v0-generator.js data/leads/enriched/beehiveplumbing.com.json --local
  node services/v0-generator.js data/leads/enriched/sample.json --output ./custom-output

Output:
  Sites are saved to: output/demos/{business-slug}/
  Each site includes:
    - index.html or page.tsx (generated site)
    - preview.png            (desktop screenshot)
    - preview-mobile.png     (mobile screenshot)
    - metadata.json          (generation info)
`);
    process.exit(1);
  }
  
  // Load lead file
  const filePath = path.resolve(leadFile);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    process.exit(1);
  }
  
  const lead = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  
  try {
    const result = await generateDemoSite(lead, options);
    console.log('\n🎉 Generation complete!');
    console.log(`\nTo deploy to Vercel:`);
    console.log(`  cd ${result.outputPath} && vercel --prod`);
  } catch (error) {
    console.error(`\n❌ Generation failed: ${error.message}`);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  generateDemoSite,
  generateWithV0,
  generateLocalTemplate,
  buildV0Prompt,
  detectCategory,
  slugify
};
