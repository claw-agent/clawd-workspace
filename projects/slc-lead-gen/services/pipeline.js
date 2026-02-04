#!/usr/bin/env node
/**
 * Pipeline Orchestrator for SLC Lead Gen
 * 
 * Chains all services together into a complete lead generation workflow.
 * Can run full pipeline or individual stages.
 * 
 * Usage:
 *   pipeline.js run "plumbers" "Salt Lake City" --limit 10
 *   pipeline.js discover "plumbers" "SLC"
 *   pipeline.js score
 *   pipeline.js enrich
 *   pipeline.js generate-demos
 *   pipeline.js generate-emails
 *   pipeline.js status
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

// Project paths
const PROJECT_ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(PROJECT_ROOT, 'data');
const LEADS_DIR = path.join(DATA_DIR, 'leads');
const CAMPAIGNS_DIR = path.join(DATA_DIR, 'campaigns');
const OUTREACH_DIR = path.join(DATA_DIR, 'outreach');

// Pipeline state file
const STATE_FILE = path.join(DATA_DIR, 'pipeline-state.json');

// Default configuration
const DEFAULT_CONFIG = {
  scoreThreshold: 50,          // Minimum score to proceed to enrichment
  maxLeadsToEnrich: 10,        // Max leads to enrich (API limits)
  maxDemosToGenerate: 5,       // Max demo sites to create
  demoOutputDir: path.join(DATA_DIR, 'demos'),
  emailTemplateDir: path.join(PROJECT_ROOT, 'templates', 'emails')
};

/**
 * Load pipeline state
 */
function loadState() {
  if (fs.existsSync(STATE_FILE)) {
    return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
  }
  return {
    currentCampaign: null,
    lastRun: null,
    stages: {}
  };
}

/**
 * Save pipeline state
 */
function saveState(state) {
  fs.mkdirSync(path.dirname(STATE_FILE), { recursive: true });
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

/**
 * Get the most recent leads file
 */
function getLatestLeadsFile(subdir = 'raw') {
  const dir = path.join(LEADS_DIR, subdir);
  if (!fs.existsSync(dir)) return null;
  
  const files = fs.readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .map(f => ({
      name: f,
      path: path.join(dir, f),
      mtime: fs.statSync(path.join(dir, f)).mtime
    }))
    .sort((a, b) => b.mtime - a.mtime);
  
  return files[0] || null;
}

/**
 * Run a service as a subprocess
 */
function runService(serviceName, args = []) {
  return new Promise((resolve, reject) => {
    const servicePath = path.join(__dirname, `${serviceName}.js`);
    
    if (!fs.existsSync(servicePath)) {
      reject(new Error(`Service not found: ${servicePath}`));
      return;
    }
    
    console.log(`\n🔧 Running ${serviceName}...`);
    console.log(`   Command: node ${serviceName}.js ${args.join(' ')}`);
    console.log('─'.repeat(50));
    
    const proc = spawn('node', [servicePath, ...args], {
      cwd: __dirname,
      stdio: 'inherit',
      env: process.env
    });
    
    proc.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${serviceName} exited with code ${code}`));
      }
    });
    
    proc.on('error', reject);
  });
}

/**
 * Stage 1: Discover leads
 */
async function stageDiscover(category, location, limit = 10) {
  console.log('\n' + '═'.repeat(50));
  console.log('  STAGE 1: LEAD DISCOVERY');
  console.log('═'.repeat(50));
  
  await runService('lead-discovery', [category, location, limit.toString()]);
  
  const state = loadState();
  state.currentCampaign = { category, location, startedAt: new Date().toISOString() };
  state.stages.discover = { completedAt: new Date().toISOString(), category, location, limit };
  saveState(state);
  
  return getLatestLeadsFile('raw');
}

/**
 * Stage 2: Score websites
 */
async function stageScore(inputFile = null) {
  console.log('\n' + '═'.repeat(50));
  console.log('  STAGE 2: WEBSITE SCORING');
  console.log('═'.repeat(50));
  
  const file = inputFile || getLatestLeadsFile('raw');
  if (!file) {
    throw new Error('No leads file found. Run discover stage first.');
  }
  
  const filePath = typeof file === 'string' ? file : file.path;
  await runService('website-scorer', [filePath]);
  
  const state = loadState();
  state.stages.score = { completedAt: new Date().toISOString(), inputFile: filePath };
  saveState(state);
  
  return getLatestLeadsFile('scored');
}

/**
 * Stage 3: Enrich top leads
 */
async function stageEnrich(inputFile = null, scoreThreshold = DEFAULT_CONFIG.scoreThreshold) {
  console.log('\n' + '═'.repeat(50));
  console.log('  STAGE 3: LEAD ENRICHMENT');
  console.log('═'.repeat(50));
  
  const file = inputFile || getLatestLeadsFile('scored');
  if (!file) {
    throw new Error('No scored leads file found. Run score stage first.');
  }
  
  const filePath = typeof file === 'string' ? file : file.path;
  await runService('business-scraper', [filePath, '--threshold', scoreThreshold.toString()]);
  
  const state = loadState();
  state.stages.enrich = { completedAt: new Date().toISOString(), inputFile: filePath, threshold: scoreThreshold };
  saveState(state);
  
  return getLatestLeadsFile('enriched');
}

/**
 * Stage 4: Generate demo sites
 */
async function stageGenerateDemos(inputFile = null, maxDemos = DEFAULT_CONFIG.maxDemosToGenerate) {
  console.log('\n' + '═'.repeat(50));
  console.log('  STAGE 4: DEMO SITE GENERATION');
  console.log('═'.repeat(50));
  
  const file = inputFile || getLatestLeadsFile('enriched');
  if (!file) {
    throw new Error('No enriched leads file found. Run enrich stage first.');
  }
  
  const filePath = typeof file === 'string' ? file : file.path;
  await runService('demo-generator', [filePath, '--max', maxDemos.toString()]);
  
  const state = loadState();
  state.stages.generateDemos = { completedAt: new Date().toISOString(), inputFile: filePath, maxDemos };
  saveState(state);
}

/**
 * Stage 5: Deploy demo sites
 */
async function stageDeployDemos(options = {}) {
  console.log('\n' + '═'.repeat(50));
  console.log('  STAGE 5: DEMO DEPLOYMENT');
  console.log('═'.repeat(50));
  
  const demosDir = path.join(DATA_DIR, 'demos');
  
  if (!fs.existsSync(demosDir)) {
    console.log('   ⚠️  No demos directory found. Run generate-demos stage first.');
    return;
  }
  
  const demoFolders = fs.readdirSync(demosDir)
    .filter(f => fs.statSync(path.join(demosDir, f)).isDirectory())
    .filter(f => fs.existsSync(path.join(demosDir, f, 'index.html')));
  
  if (demoFolders.length === 0) {
    console.log('   ⚠️  No valid demo sites found to deploy.');
    return;
  }
  
  console.log(`   Found ${demoFolders.length} demo(s) to deploy...`);
  
  const deployService = require('./deploy-demo.js');
  const results = [];
  
  for (const folder of demoFolders) {
    const demoPath = path.join(demosDir, folder);
    try {
      const result = await deployService.deployDemo(demoPath, {
        github: options.github || false
      });
      results.push({ folder, success: true, url: result.url });
      
      // Update lead file with demo URL if possible
      updateLeadWithDemoUrl(folder, result.url);
    } catch (error) {
      console.log(`   ❌ Failed to deploy ${folder}: ${error.message}`);
      results.push({ folder, success: false, error: error.message });
    }
  }
  
  const successful = results.filter(r => r.success).length;
  console.log(`\n   ✅ Deployed ${successful}/${demoFolders.length} demos`);
  
  const state = loadState();
  state.stages.deployDemos = { 
    completedAt: new Date().toISOString(), 
    deployed: successful, 
    total: demoFolders.length 
  };
  saveState(state);
  
  return results;
}

/**
 * Update lead record with deployed demo URL
 */
function updateLeadWithDemoUrl(folderName, demoUrl) {
  const enrichedFile = getLatestLeadsFile('enriched');
  if (!enrichedFile) return;
  
  try {
    const data = JSON.parse(fs.readFileSync(enrichedFile.path, 'utf8'));
    if (!data.leads) return;
    
    // Find matching lead by folder name/slug
    const slug = folderName.toLowerCase();
    const lead = data.leads.find(l => {
      const leadSlug = l.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || '';
      return leadSlug.includes(slug) || slug.includes(leadSlug.substring(0, 10));
    });
    
    if (lead) {
      lead.demoUrl = demoUrl;
      fs.writeFileSync(enrichedFile.path, JSON.stringify(data, null, 2));
    }
  } catch (error) {
    // Silent fail - non-critical
  }
}

/**
 * Stage 6: Generate outreach emails
 */
async function stageGenerateEmails(inputFile = null) {
  console.log('\n' + '═'.repeat(50));
  console.log('  STAGE 6: EMAIL GENERATION');
  console.log('═'.repeat(50));
  
  const file = inputFile || getLatestLeadsFile('enriched');
  if (!file) {
    throw new Error('No enriched leads file found. Run enrich stage first.');
  }
  
  const filePath = typeof file === 'string' ? file : file.path;
  await runService('email-generator', [filePath]);
  
  const state = loadState();
  state.stages.generateEmails = { completedAt: new Date().toISOString(), inputFile: filePath };
  saveState(state);
}

/**
 * Run the full pipeline
 */
async function runFullPipeline(category, location, options = {}) {
  const limit = options.limit || 10;
  const scoreThreshold = options.scoreThreshold || DEFAULT_CONFIG.scoreThreshold;
  const maxDemos = options.maxDemos || DEFAULT_CONFIG.maxDemosToGenerate;
  
  console.log('\n' + '█'.repeat(50));
  console.log('  SLC LEAD GEN - FULL PIPELINE');
  console.log('█'.repeat(50));
  console.log(`  Category: ${category}`);
  console.log(`  Location: ${location}`);
  console.log(`  Limit: ${limit}`);
  console.log(`  Score Threshold: ${scoreThreshold}`);
  console.log(`  Max Demos: ${maxDemos}`);
  console.log('█'.repeat(50));
  
  const startTime = Date.now();
  
  try {
    // Stage 1: Discover
    await stageDiscover(category, location, limit);
    
    // Stage 2: Score
    await stageScore();
    
    // Stage 3: Enrich (filter by score threshold)
    await stageEnrich(null, scoreThreshold);
    
    // Stage 4: Generate demos
    await stageGenerateDemos(null, maxDemos);
    
    // Stage 5: Deploy demos
    await stageDeployDemos({ github: options.github || false });
    
    // Stage 6: Generate emails
    await stageGenerateEmails();
    
    // Summary report
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    printSummaryReport(category, location, duration);
    
  } catch (error) {
    console.error(`\n❌ Pipeline failed: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Print summary report
 */
function printSummaryReport(category, location, duration) {
  console.log('\n' + '█'.repeat(50));
  console.log('  PIPELINE COMPLETE - SUMMARY REPORT');
  console.log('█'.repeat(50));
  
  const stats = getStats();
  
  console.log(`
  Campaign: ${category} in ${location}
  Duration: ${duration}s
  
  📊 RESULTS:
  ─────────────────────────────────────────────
  Leads Discovered:    ${stats.discovered}
  Leads Scored:        ${stats.scored}
  High-Score Leads:    ${stats.enriched}
  Demos Generated:     ${stats.demos}
  Demos Deployed:      ${stats.deployed}
  Emails Generated:    ${stats.emails}
  ─────────────────────────────────────────────
  `);
  
  // Print top opportunities
  const enrichedFile = getLatestLeadsFile('enriched');
  if (enrichedFile) {
    const data = JSON.parse(fs.readFileSync(enrichedFile.path, 'utf8'));
    const topLeads = (data.leads || []).slice(0, 5);
    
    if (topLeads.length > 0) {
      console.log('  🎯 TOP OPPORTUNITIES:');
      console.log('  ─────────────────────────────────────────────');
      topLeads.forEach((lead, i) => {
        console.log(`  ${i + 1}. ${lead.name}`);
        console.log(`     Score: ${lead.score || 'N/A'} | ${lead.website || 'No website'}`);
        if (lead.demoUrl) console.log(`     Demo: ${lead.demoUrl}`);
      });
    }
  }
  
  console.log('\n' + '█'.repeat(50));
}

/**
 * Get current pipeline statistics
 */
function getStats() {
  const stats = {
    discovered: 0,
    scored: 0,
    enriched: 0,
    demos: 0,
    deployed: 0,
    emails: 0
  };
  
  // Count raw leads
  const rawFile = getLatestLeadsFile('raw');
  if (rawFile) {
    const data = JSON.parse(fs.readFileSync(rawFile.path, 'utf8'));
    stats.discovered = data.leads?.length || 0;
  }
  
  // Count scored leads
  const scoredFile = getLatestLeadsFile('scored');
  if (scoredFile) {
    const data = JSON.parse(fs.readFileSync(scoredFile.path, 'utf8'));
    stats.scored = data.leads?.length || 0;
  }
  
  // Count enriched leads
  const enrichedFile = getLatestLeadsFile('enriched');
  if (enrichedFile) {
    const data = JSON.parse(fs.readFileSync(enrichedFile.path, 'utf8'));
    stats.enriched = data.leads?.length || 0;
  }
  
  // Count demos
  const demosDir = path.join(DATA_DIR, 'demos');
  if (fs.existsSync(demosDir)) {
    stats.demos = fs.readdirSync(demosDir).filter(f => fs.statSync(path.join(demosDir, f)).isDirectory()).length;
  }
  
  // Count deployed demos
  const deploymentsFile = path.join(DATA_DIR, 'deployments.json');
  if (fs.existsSync(deploymentsFile)) {
    const deployments = JSON.parse(fs.readFileSync(deploymentsFile, 'utf8'));
    stats.deployed = Object.values(deployments).filter(d => d.status === 'live').length;
  }
  
  // Count emails
  if (fs.existsSync(OUTREACH_DIR)) {
    stats.emails = fs.readdirSync(OUTREACH_DIR).filter(f => f.endsWith('.json')).length;
  }
  
  return stats;
}

/**
 * Show pipeline status
 */
function showStatus() {
  console.log('\n' + '═'.repeat(50));
  console.log('  SLC LEAD GEN - PIPELINE STATUS');
  console.log('═'.repeat(50));
  
  const state = loadState();
  const stats = getStats();
  
  // Current campaign info
  if (state.currentCampaign) {
    console.log(`\n  📋 Current Campaign:`);
    console.log(`     Category: ${state.currentCampaign.category || 'N/A'}`);
    console.log(`     Location: ${state.currentCampaign.location || 'N/A'}`);
    console.log(`     Started: ${state.currentCampaign.startedAt || 'N/A'}`);
  } else {
    console.log('\n  📋 No active campaign. Run: pipeline.js run "category" "location"');
  }
  
  // Stats
  console.log(`
  📊 PIPELINE STATISTICS:
  ─────────────────────────────────────────────
  Leads Discovered:    ${stats.discovered}
  Leads Scored:        ${stats.scored}
  Leads Enriched:      ${stats.enriched}
  Demos Generated:     ${stats.demos}
  Demos Deployed:      ${stats.deployed}
  Emails Generated:    ${stats.emails}
  ─────────────────────────────────────────────
  `);
  
  // Stage completion status
  console.log('  🔄 STAGE STATUS:');
  const stages = ['discover', 'score', 'enrich', 'generateDemos', 'deployDemos', 'generateEmails'];
  const stageNames = {
    discover: 'Discovery',
    score: 'Scoring',
    enrich: 'Enrichment',
    generateDemos: 'Demo Generation',
    deployDemos: 'Demo Deployment',
    generateEmails: 'Email Generation'
  };
  
  stages.forEach(stage => {
    const info = state.stages?.[stage];
    const status = info ? `✅ ${new Date(info.completedAt).toLocaleString()}` : '⬜ Not run';
    console.log(`     ${stageNames[stage]}: ${status}`);
  });
  
  console.log('\n' + '═'.repeat(50));
}

/**
 * Parse command line arguments
 */
function parseArgs(args) {
  const result = {
    command: args[0],
    positional: [],
    options: {}
  };
  
  // Boolean flags that don't take values
  const booleanFlags = ['github'];
  
  for (let i = 1; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].slice(2);
      if (booleanFlags.includes(key)) {
        result.options[key] = true;
      } else {
        const value = args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : true;
        result.options[key] = value;
        if (value !== true) i++;
      }
    } else {
      result.positional.push(args[i]);
    }
  }
  
  return result;
}

/**
 * Print help
 */
function printHelp() {
  console.log(`
SLC Lead Gen Pipeline Orchestrator
===================================

Usage:
  pipeline.js <command> [options]

Commands:
  run <category> <location>   Run full pipeline
  discover <category> <loc>   Stage 1: Discover leads
  score [file]                Stage 2: Score websites
  enrich [file]               Stage 3: Enrich top leads
  generate-demos [file]       Stage 4: Generate demo sites
  deploy-demos                Stage 5: Deploy demos to Vercel
  generate-emails [file]      Stage 6: Generate outreach emails
  status                      Show pipeline status

Options:
  --limit <n>          Max leads to discover (default: 10)
  --threshold <n>      Min score for enrichment (default: 50)
  --max <n>            Max demos to generate (default: 5)
  --github             Use GitHub monorepo for deployments

Examples:
  pipeline.js run "plumbers" "Salt Lake City" --limit 20
  pipeline.js discover "HVAC" "Provo, UT" --limit 15
  pipeline.js score
  pipeline.js enrich --threshold 60
  pipeline.js status
`);
}

/**
 * Main entry point
 */
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args[0] === 'help' || args[0] === '--help') {
    printHelp();
    process.exit(0);
  }
  
  const { command, positional, options } = parseArgs(args);
  
  try {
    switch (command) {
      case 'run':
        if (positional.length < 2) {
          console.error('Usage: pipeline.js run <category> <location>');
          process.exit(1);
        }
        await runFullPipeline(positional[0], positional[1], {
          limit: parseInt(options.limit) || 10,
          scoreThreshold: parseInt(options.threshold) || 50,
          maxDemos: parseInt(options.max) || 5
        });
        break;
        
      case 'discover':
        if (positional.length < 2) {
          console.error('Usage: pipeline.js discover <category> <location>');
          process.exit(1);
        }
        await stageDiscover(positional[0], positional[1], parseInt(options.limit) || 10);
        console.log('\n✅ Discovery stage complete!');
        break;
        
      case 'score':
        await stageScore(positional[0] || null);
        console.log('\n✅ Scoring stage complete!');
        break;
        
      case 'enrich':
        await stageEnrich(positional[0] || null, parseInt(options.threshold) || 50);
        console.log('\n✅ Enrichment stage complete!');
        break;
        
      case 'generate-demos':
        await stageGenerateDemos(positional[0] || null, parseInt(options.max) || 5);
        console.log('\n✅ Demo generation complete!');
        break;
        
      case 'deploy-demos':
        await stageDeployDemos({ github: options.github || false });
        console.log('\n✅ Demo deployment complete!');
        break;
        
      case 'generate-emails':
        await stageGenerateEmails(positional[0] || null);
        console.log('\n✅ Email generation complete!');
        break;
        
      case 'status':
        showStatus();
        break;
        
      default:
        console.error(`Unknown command: ${command}`);
        printHelp();
        process.exit(1);
    }
  } catch (error) {
    console.error(`\n❌ Error: ${error.message}`);
    process.exit(1);
  }
}

// Run
main();
