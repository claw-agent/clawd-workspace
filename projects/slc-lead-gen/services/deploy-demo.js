#!/usr/bin/env node
/**
 * Demo Deployment Service for SLC Lead Gen
 * 
 * Deploys generated demo sites to Vercel with unique subdomains.
 * Tracks all deployments and supports cleanup.
 * 
 * Usage:
 *   deploy-demo.js <demo-folder>              Deploy to Vercel (default, fast)
 *   deploy-demo.js <demo-folder> --github     Deploy via GitHub monorepo
 *   deploy-demo.js --cleanup <slug>           Remove a deployment
 *   deploy-demo.js --list                     List all deployments
 *   deploy-demo.js --status <slug>            Check deployment status
 */

const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');

// Project paths
const PROJECT_ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(PROJECT_ROOT, 'data');
const DEPLOYMENTS_FILE = path.join(DATA_DIR, 'deployments.json');

// GitHub monorepo config (used with --github flag)
const GITHUB_MONOREPO = 'slc-lead-gen-demos';
const GITHUB_USER = execSync('git config user.name 2>/dev/null || echo "user"', { encoding: 'utf8' }).trim();

/**
 * Load deployments tracking data
 */
function loadDeployments() {
  if (fs.existsSync(DEPLOYMENTS_FILE)) {
    return JSON.parse(fs.readFileSync(DEPLOYMENTS_FILE, 'utf8'));
  }
  return {};
}

/**
 * Save deployments tracking data
 */
function saveDeployments(deployments) {
  fs.mkdirSync(path.dirname(DEPLOYMENTS_FILE), { recursive: true });
  fs.writeFileSync(DEPLOYMENTS_FILE, JSON.stringify(deployments, null, 2));
}

/**
 * Generate a URL-safe slug from business name
 */
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 50);  // Vercel subdomain limit
}

/**
 * Extract business info from demo folder
 */
function extractBusinessInfo(demoFolder) {
  // Try to find lead info from various sources
  const possibleFiles = [
    path.join(demoFolder, 'lead.json'),
    path.join(demoFolder, 'business.json'),
    path.join(demoFolder, 'meta.json')
  ];
  
  for (const file of possibleFiles) {
    if (fs.existsSync(file)) {
      const data = JSON.parse(fs.readFileSync(file, 'utf8'));
      return {
        name: data.name || data.businessName || path.basename(demoFolder),
        leadId: data.id || data.leadId || null,
        category: data.category || null
      };
    }
  }
  
  // Fallback: use folder name
  return {
    name: path.basename(demoFolder),
    leadId: null,
    category: null
  };
}

/**
 * Create vercel.json config for the demo site
 */
function createVercelConfig(demoFolder, projectName) {
  const vercelConfig = {
    name: projectName,
    version: 2,
    public: true,
    builds: [
      { src: "**/*", use: "@vercel/static" }
    ],
    routes: [
      { handle: "filesystem" },
      { src: "/(.*)", dest: "/index.html" }
    ]
  };
  
  fs.writeFileSync(
    path.join(demoFolder, 'vercel.json'),
    JSON.stringify(vercelConfig, null, 2)
  );
}

/**
 * Deploy to Vercel directly (fast mode)
 */
async function deployToVercel(demoFolder, slug) {
  const projectName = `${slug}-demo`;
  
  console.log(`\n🚀 Deploying ${projectName} to Vercel...`);
  
  // Create vercel.json
  createVercelConfig(demoFolder, projectName);
  
  // Deploy using Vercel CLI
  // --yes = skip confirmation prompts
  // --prod = deploy to production (not preview)
  // --name = project name for subdomain
  const command = `vercel --yes --prod --name ${projectName}`;
  
  try {
    const output = execSync(command, {
      cwd: demoFolder,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
      env: { ...process.env, FORCE_COLOR: '0' }
    });
    
    // Extract URL from output
    const urlMatch = output.match(/https:\/\/[^\s]+\.vercel\.app/);
    if (urlMatch) {
      return urlMatch[0];
    }
    
    // Fallback: construct expected URL
    return `https://${projectName}.vercel.app`;
  } catch (error) {
    // Check if error output has the URL (Vercel sometimes outputs to stderr)
    const stderr = error.stderr?.toString() || '';
    const stdout = error.stdout?.toString() || '';
    const combined = stdout + stderr;
    
    const urlMatch = combined.match(/https:\/\/[^\s]+\.vercel\.app/);
    if (urlMatch) {
      return urlMatch[0];
    }
    
    throw new Error(`Vercel deployment failed: ${error.message}\n${combined}`);
  }
}

/**
 * Deploy via GitHub monorepo (for organization)
 */
async function deployViaGitHub(demoFolder, slug) {
  const monorepoPath = path.join(PROJECT_ROOT, '..', GITHUB_MONOREPO);
  
  console.log(`\n📁 Deploying via GitHub monorepo...`);
  
  // Ensure monorepo exists
  if (!fs.existsSync(monorepoPath)) {
    console.log(`   Creating monorepo at ${monorepoPath}...`);
    fs.mkdirSync(monorepoPath, { recursive: true });
    execSync('git init', { cwd: monorepoPath });
    
    // Create README
    fs.writeFileSync(
      path.join(monorepoPath, 'README.md'),
      '# SLC Lead Gen Demos\n\nDemo sites for SLC lead generation campaign.\n'
    );
    
    execSync('git add . && git commit -m "Initial commit"', { cwd: monorepoPath });
  }
  
  // Copy demo folder to monorepo
  const destFolder = path.join(monorepoPath, slug);
  if (fs.existsSync(destFolder)) {
    // Remove old version
    fs.rmSync(destFolder, { recursive: true, force: true });
  }
  
  // Copy files
  copyDirSync(demoFolder, destFolder);
  
  // Create vercel.json for this subfolder
  createVercelConfig(destFolder, `${slug}-demo`);
  
  // Commit and push
  try {
    execSync(`git add ${slug} && git commit -m "Add/update demo for ${slug}"`, {
      cwd: monorepoPath,
      stdio: 'pipe'
    });
    
    // Check if remote exists, if not create it
    try {
      execSync('git remote get-url origin', { cwd: monorepoPath, stdio: 'pipe' });
    } catch {
      console.log(`   Setting up GitHub remote...`);
      const repoUrl = `https://github.com/${GITHUB_USER}/${GITHUB_MONOREPO}.git`;
      execSync(`git remote add origin ${repoUrl}`, { cwd: monorepoPath });
    }
    
    console.log(`   Pushing to GitHub...`);
    execSync('git push -u origin main', { cwd: monorepoPath, stdio: 'pipe' });
  } catch (error) {
    console.log(`   ⚠️  Git operations skipped: ${error.message}`);
  }
  
  // Now deploy the specific folder
  const projectName = `${slug}-demo`;
  const command = `vercel --yes --prod --name ${projectName}`;
  
  const output = execSync(command, {
    cwd: destFolder,
    encoding: 'utf8',
    stdio: ['pipe', 'pipe', 'pipe']
  });
  
  const urlMatch = output.match(/https:\/\/[^\s]+\.vercel\.app/);
  return urlMatch ? urlMatch[0] : `https://${projectName}.vercel.app`;
}

/**
 * Helper: Copy directory recursively
 */
function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * Remove/cleanup a deployment
 */
async function cleanupDeployment(slug) {
  console.log(`\n🧹 Cleaning up deployment: ${slug}`);
  
  const deployments = loadDeployments();
  
  if (!deployments[slug]) {
    console.log(`   ⚠️  No deployment found for slug: ${slug}`);
    return false;
  }
  
  const projectName = `${slug}-demo`;
  
  try {
    // Remove from Vercel
    console.log(`   Removing project from Vercel...`);
    execSync(`vercel remove ${projectName} --yes`, {
      encoding: 'utf8',
      stdio: 'pipe'
    });
    console.log(`   ✅ Removed from Vercel`);
  } catch (error) {
    console.log(`   ⚠️  Could not remove from Vercel: ${error.message}`);
  }
  
  // Update tracking
  deployments[slug].status = 'removed';
  deployments[slug].removed_at = new Date().toISOString();
  saveDeployments(deployments);
  
  console.log(`   ✅ Updated deployment status to 'removed'`);
  return true;
}

/**
 * List all deployments
 */
function listDeployments() {
  const deployments = loadDeployments();
  const entries = Object.entries(deployments);
  
  if (entries.length === 0) {
    console.log('\n📭 No deployments tracked yet.');
    return;
  }
  
  console.log('\n' + '═'.repeat(60));
  console.log('  DEPLOYMENT TRACKING');
  console.log('═'.repeat(60));
  
  const liveCount = entries.filter(([, d]) => d.status === 'live').length;
  const removedCount = entries.filter(([, d]) => d.status === 'removed').length;
  
  console.log(`\n  Total: ${entries.length} | Live: ${liveCount} | Removed: ${removedCount}\n`);
  
  entries.forEach(([slug, deployment]) => {
    const status = deployment.status === 'live' ? '🟢' : '⚫';
    console.log(`  ${status} ${slug}`);
    console.log(`     URL: ${deployment.url}`);
    console.log(`     Deployed: ${new Date(deployment.deployed_at).toLocaleString()}`);
    if (deployment.lead_id) console.log(`     Lead ID: ${deployment.lead_id}`);
    console.log('');
  });
  
  console.log('═'.repeat(60));
}

/**
 * Check status of a specific deployment
 */
async function checkStatus(slug) {
  const deployments = loadDeployments();
  const deployment = deployments[slug];
  
  if (!deployment) {
    console.log(`\n❌ No deployment found for: ${slug}`);
    return;
  }
  
  console.log(`\n📊 Deployment Status: ${slug}`);
  console.log('─'.repeat(40));
  console.log(`  URL: ${deployment.url}`);
  console.log(`  Status: ${deployment.status}`);
  console.log(`  Deployed: ${new Date(deployment.deployed_at).toLocaleString()}`);
  
  if (deployment.status === 'live') {
    // Try to fetch the URL to verify it's actually live
    try {
      const response = execSync(`curl -s -o /dev/null -w "%{http_code}" ${deployment.url}`, {
        encoding: 'utf8',
        timeout: 10000
      });
      const statusCode = response.trim();
      console.log(`  HTTP Status: ${statusCode}`);
      console.log(`  Accessible: ${statusCode === '200' ? '✅ Yes' : '⚠️  Check manually'}`);
    } catch {
      console.log(`  Accessible: ⚠️  Could not verify`);
    }
  }
  
  console.log('─'.repeat(40));
}

/**
 * Main deploy function
 */
async function deployDemo(demoFolder, options = {}) {
  // Validate demo folder exists
  if (!fs.existsSync(demoFolder)) {
    throw new Error(`Demo folder not found: ${demoFolder}`);
  }
  
  // Make absolute path
  const absolutePath = path.resolve(demoFolder);
  
  // Check for index.html
  if (!fs.existsSync(path.join(absolutePath, 'index.html'))) {
    throw new Error(`No index.html found in demo folder. Is this a valid demo site?`);
  }
  
  // Extract business info
  const businessInfo = extractBusinessInfo(absolutePath);
  const slug = options.slug || generateSlug(businessInfo.name);
  
  console.log('\n' + '═'.repeat(50));
  console.log('  DEMO DEPLOYMENT SERVICE');
  console.log('═'.repeat(50));
  console.log(`  Business: ${businessInfo.name}`);
  console.log(`  Slug: ${slug}`);
  console.log(`  Mode: ${options.github ? 'GitHub Monorepo' : 'Direct Vercel'}`);
  console.log('═'.repeat(50));
  
  // Deploy
  let url;
  if (options.github) {
    url = await deployViaGitHub(absolutePath, slug);
  } else {
    url = await deployToVercel(absolutePath, slug);
  }
  
  // Track deployment
  const deployments = loadDeployments();
  deployments[slug] = {
    url: url,
    deployed_at: new Date().toISOString(),
    lead_id: businessInfo.leadId,
    category: businessInfo.category,
    name: businessInfo.name,
    status: 'live',
    mode: options.github ? 'github' : 'vercel-direct',
    source_folder: absolutePath
  };
  saveDeployments(deployments);
  
  // Success output
  console.log('\n' + '─'.repeat(50));
  console.log('  ✅ DEPLOYMENT SUCCESSFUL');
  console.log('─'.repeat(50));
  console.log(`  🌐 Live URL: ${url}`);
  console.log(`  📁 Tracked in: ${DEPLOYMENTS_FILE}`);
  console.log('─'.repeat(50) + '\n');
  
  return {
    url,
    slug,
    deployment: deployments[slug]
  };
}

/**
 * Parse command line arguments
 */
function parseArgs(args) {
  const result = {
    command: null,
    positional: [],
    options: {
      github: false,
      cleanup: false,
      list: false,
      status: false
    }
  };
  
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--github') {
      result.options.github = true;
    } else if (args[i] === '--cleanup') {
      result.command = 'cleanup';
      if (args[i + 1] && !args[i + 1].startsWith('--')) {
        result.positional.push(args[i + 1]);
        i++;
      }
    } else if (args[i] === '--list') {
      result.command = 'list';
    } else if (args[i] === '--status') {
      result.command = 'status';
      if (args[i + 1] && !args[i + 1].startsWith('--')) {
        result.positional.push(args[i + 1]);
        i++;
      }
    } else if (args[i] === '--slug') {
      if (args[i + 1]) {
        result.options.slug = args[i + 1];
        i++;
      }
    } else if (!args[i].startsWith('--')) {
      result.positional.push(args[i]);
    }
  }
  
  // Default command is deploy if a folder is provided
  if (!result.command && result.positional.length > 0) {
    result.command = 'deploy';
  }
  
  return result;
}

/**
 * Print help
 */
function printHelp() {
  console.log(`
Demo Deployment Service - SLC Lead Gen
======================================

Deploy generated demo sites to Vercel with automatic tracking.

Usage:
  deploy-demo.js <demo-folder>              Deploy to Vercel (fast)
  deploy-demo.js <demo-folder> --github     Deploy via GitHub monorepo
  deploy-demo.js --cleanup <slug>           Remove a deployment
  deploy-demo.js --list                     List all deployments
  deploy-demo.js --status <slug>            Check deployment status

Options:
  --github              Use GitHub monorepo workflow
  --slug <name>         Override auto-generated slug
  --cleanup <slug>      Remove deployment from Vercel
  --list                Show all tracked deployments
  --status <slug>       Check if a deployment is live

Examples:
  deploy-demo.js ./output/demos/joes-plumbing
  deploy-demo.js ./output/demos/acme-hvac --github
  deploy-demo.js --cleanup joes-plumbing
  deploy-demo.js --list

Tracking:
  Deployments are tracked in: data/deployments.json
  Each entry includes: URL, deploy time, status, lead ID
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
      case 'deploy':
        if (positional.length === 0) {
          console.error('Error: Please provide a demo folder path');
          process.exit(1);
        }
        await deployDemo(positional[0], options);
        break;
        
      case 'cleanup':
        if (positional.length === 0) {
          console.error('Error: Please provide a slug to cleanup');
          process.exit(1);
        }
        await cleanupDeployment(positional[0]);
        break;
        
      case 'list':
        listDeployments();
        break;
        
      case 'status':
        if (positional.length === 0) {
          console.error('Error: Please provide a slug to check');
          process.exit(1);
        }
        await checkStatus(positional[0]);
        break;
        
      default:
        printHelp();
        process.exit(1);
    }
  } catch (error) {
    console.error(`\n❌ Error: ${error.message}`);
    process.exit(1);
  }
}

// Export for use as module
module.exports = {
  deployDemo,
  cleanupDeployment,
  loadDeployments,
  generateSlug
};

// Run if executed directly
if (require.main === module) {
  main();
}
