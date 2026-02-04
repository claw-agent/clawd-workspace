#!/usr/bin/env node
/**
 * Stealth Browser - Puppeteer with anti-detection
 * Usage: 
 *   node stealth-browser.js <url> [--screenshot <path>] [--html] [--wait <ms>]
 *   node stealth-browser.js "https://example.com" --screenshot /tmp/page.png
 *   node stealth-browser.js "https://example.com" --html > page.html
 */

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

// Use stealth plugin to avoid detection
puppeteer.use(StealthPlugin());

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args[0] === '--help') {
    console.log(`
Stealth Browser - Puppeteer with anti-detection

Usage:
  stealth-browser <url> [options]

Options:
  --screenshot <path>   Save screenshot to file
  --html                Output page HTML to stdout
  --text                Output visible text to stdout  
  --wait <ms>           Wait time after load (default: 2000)
  --headed              Show browser window
  --profile <path>      Use persistent profile directory

Examples:
  stealth-browser "https://example.com" --screenshot /tmp/page.png
  stealth-browser "https://example.com" --html > page.html
  stealth-browser "https://truepeoplesearch.com/results?name=John+Doe" --text
`);
    process.exit(0);
  }

  const url = args[0];
  const screenshotIdx = args.indexOf('--screenshot');
  const screenshotPath = screenshotIdx !== -1 ? args[screenshotIdx + 1] : null;
  const outputHtml = args.includes('--html');
  const outputText = args.includes('--text');
  const headed = args.includes('--headed');
  const waitIdx = args.indexOf('--wait');
  const waitTime = waitIdx !== -1 ? parseInt(args[waitIdx + 1]) : 2000;
  const profileIdx = args.indexOf('--profile');
  const profilePath = profileIdx !== -1 ? args[profileIdx + 1] : null;

  const launchOptions = {
    headless: headed ? false : 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
      '--disable-features=IsolateOrigins,site-per-process',
      '--window-size=1920,1080',
    ],
  };

  if (profilePath) {
    launchOptions.userDataDir = profilePath;
  }

  const browser = await puppeteer.launch(launchOptions);
  
  try {
    const page = await browser.newPage();
    
    // Set realistic viewport
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Set realistic user agent
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );

    // Navigate with timeout
    console.error(`Navigating to: ${url}`);
    await page.goto(url, { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });

    // Wait for any dynamic content
    await new Promise(r => setTimeout(r, waitTime));

    // Check for Cloudflare challenge and wait if present
    const pageContent = await page.content();
    if (pageContent.includes('Verify you are human') || pageContent.includes('Just a moment')) {
      console.error('Cloudflare challenge detected, waiting longer...');
      await new Promise(r => setTimeout(r, 5000));
    }

    // Take screenshot if requested
    if (screenshotPath) {
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.error(`Screenshot saved to: ${screenshotPath}`);
    }

    // Output HTML if requested
    if (outputHtml) {
      const html = await page.content();
      console.log(html);
    }

    // Output text if requested
    if (outputText) {
      const text = await page.evaluate(() => {
        return document.body.innerText;
      });
      console.log(text);
    }

    // If no output specified, show page title and URL
    if (!outputHtml && !outputText && !screenshotPath) {
      const title = await page.title();
      const finalUrl = page.url();
      console.log(JSON.stringify({ title, url: finalUrl }, null, 2));
    }

  } finally {
    await browser.close();
  }
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
