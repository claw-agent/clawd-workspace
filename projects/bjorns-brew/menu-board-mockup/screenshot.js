const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    // Set viewport to match menu board size
    await page.setViewport({ width: 1500, height: 1020 });
    
    // Load the HTML file
    const htmlPath = path.join(__dirname, 'index.html');
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });
    
    // Wait for fonts to load
    await page.evaluateHandle('document.fonts.ready');
    
    // Take screenshot
    await page.screenshot({
        path: 'menu-board-design.png',
        fullPage: false,
        clip: { x: 0, y: 0, width: 1480, height: 1000 }
    });
    
    console.log('Screenshot saved!');
    await browser.close();
})();
