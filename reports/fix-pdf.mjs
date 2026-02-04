#!/usr/bin/env node
/**
 * Fix PDF formatting - converts markdown tables in HTML to proper HTML tables
 * and generates a clean PDF with Puppeteer
 */

import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

const INPUT_HTML = './refund-research-report.html';
const OUTPUT_HTML = './refund-research-report-fixed.html';
const OUTPUT_PDF = './refund-research-report.pdf';

/**
 * Convert markdown table syntax to HTML table
 */
function markdownTableToHtml(markdownTable) {
  const lines = markdownTable.trim().split('\n').filter(line => line.trim());
  if (lines.length < 2) return markdownTable; // Not a valid table
  
  // Parse header row
  const headerCells = lines[0].split('|').map(cell => cell.trim()).filter(Boolean);
  
  // Skip separator row (line with dashes)
  // Parse data rows
  const dataRows = lines.slice(2).map(line => 
    line.split('|').map(cell => cell.trim()).filter(Boolean)
  );
  
  // Build HTML table
  let html = '<table>\n<thead>\n<tr>\n';
  headerCells.forEach(cell => {
    html += `  <th>${cell}</th>\n`;
  });
  html += '</tr>\n</thead>\n<tbody>\n';
  
  dataRows.forEach(row => {
    html += '<tr>\n';
    row.forEach(cell => {
      html += `  <td>${cell}</td>\n`;
    });
    html += '</tr>\n';
  });
  
  html += '</tbody>\n</table>';
  return html;
}

/**
 * Find and replace markdown tables in HTML content
 */
function fixMarkdownTables(htmlContent) {
  // Pattern to match markdown tables: lines starting with | and containing |
  // They appear inside <p> tags often
  
  // First, handle tables that might be split across multiple <p> tags or in one block
  // Match pattern: | header | header |<newline>|---|---|<newline>| data | data |
  const tablePattern = /(\|[^\n]+\|\s*\n\|[-:\s|]+\|\s*\n(?:\|[^\n]+\|\s*\n?)+)/g;
  
  let fixed = htmlContent;
  
  // Find all markdown tables and convert them
  const matches = htmlContent.match(tablePattern);
  if (matches) {
    matches.forEach(match => {
      const htmlTable = markdownTableToHtml(match);
      fixed = fixed.replace(match, htmlTable);
    });
  }
  
  // Clean up: remove empty <p></p> tags that might be left
  fixed = fixed.replace(/<p>\s*<\/p>/g, '');
  
  // Clean up: tables inside <p> tags - move them out
  fixed = fixed.replace(/<p>(\s*<table[\s\S]*?<\/table>\s*)<\/p>/g, '$1');
  
  // Fix headers that are inside <p> tags (like <p><h1>...</h1></p>)
  fixed = fixed.replace(/<p>(<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>)<\/p>/g, '$1');
  
  // Fix <ul> and <ol> inside <p> tags
  fixed = fixed.replace(/<p>(<ul>[\s\S]*?<\/ul>)<\/p>/g, '$1');
  fixed = fixed.replace(/<p>(<ol>[\s\S]*?<\/ol>)<\/p>/g, '$1');
  
  // Fix <pre><code> inside <p> tags
  fixed = fixed.replace(/<p>(<pre><code>[\s\S]*?<\/code><\/pre>)<\/p>/g, '$1');
  fixed = fixed.replace(/<p>(<pre>[\s\S]*?<\/pre>)<\/p>/g, '$1');
  
  // Fix horizontal rules (--- became <p>---</p>)
  fixed = fixed.replace(/<p>\s*---\s*<\/p>/g, '<hr>');
  
  return fixed;
}

async function main() {
  console.log('📄 Reading source HTML...');
  const htmlContent = fs.readFileSync(INPUT_HTML, 'utf-8');
  
  console.log('🔧 Fixing markdown tables and formatting...');
  const fixedHtml = fixMarkdownTables(htmlContent);
  
  console.log('💾 Saving fixed HTML...');
  fs.writeFileSync(OUTPUT_HTML, fixedHtml);
  
  console.log('🖨️  Generating PDF with Puppeteer...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Load the fixed HTML
  const absolutePath = path.resolve(OUTPUT_HTML);
  await page.goto(`file://${absolutePath}`, { waitUntil: 'networkidle0' });
  
  // Generate PDF with good settings
  await page.pdf({
    path: OUTPUT_PDF,
    format: 'A4',
    margin: {
      top: '20mm',
      right: '15mm',
      bottom: '20mm',
      left: '15mm'
    },
    printBackground: true,
    displayHeaderFooter: false,
  });
  
  await browser.close();
  
  console.log(`✅ PDF generated: ${OUTPUT_PDF}`);
  console.log(`✅ Fixed HTML saved: ${OUTPUT_HTML}`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
