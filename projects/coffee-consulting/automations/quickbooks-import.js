/**
 * QuickBooks Time Activities Import
 * 
 * Imports transformed timesheet data into QuickBooks Online.
 * Takes output from 7shifts-export.js and creates time activities.
 * 
 * Requirements:
 * - QuickBooks Online account with API access
 * - OAuth tokens (stored in config/.quickbooks-credentials)
 * - Node.js 18+
 * - intuit-oauth package
 * 
 * Usage:
 *   node quickbooks-import.js --file ../data/7shifts/timesheets_2026-01-01_to_2026-01-15.json
 */

const fs = require('fs');
const path = require('path');
const OAuthClient = require('intuit-oauth');

// Configuration
const CONFIG_PATH = path.join(__dirname, '../config/.quickbooks-credentials');
const EMPLOYEE_MAP_PATH = path.join(__dirname, '../config/employee-mapping.json');

// Load credentials
function loadCredentials() {
  try {
    const creds = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
    return creds;
  } catch (err) {
    console.error('❌ Failed to load QuickBooks credentials from', CONFIG_PATH);
    console.error('   Required fields: clientId, clientSecret, refreshToken, realmId');
    process.exit(1);
  }
}

// Load employee mapping (7shifts ID → QB Employee ID)
function loadEmployeeMapping() {
  try {
    return JSON.parse(fs.readFileSync(EMPLOYEE_MAP_PATH, 'utf8'));
  } catch (err) {
    console.warn('⚠️  No employee mapping found at', EMPLOYEE_MAP_PATH);
    console.warn('   Will attempt to match by name');
    return {};
  }
}

// QuickBooks API client
class QuickBooksClient {
  constructor(creds) {
    this.oauthClient = new OAuthClient({
      clientId: creds.clientId,
      clientSecret: creds.clientSecret,
      environment: creds.sandbox ? 'sandbox' : 'production',
      redirectUri: 'https://developer.intuit.com/v2/OAuth2Playground/RedirectUrl'
    });
    
    this.oauthClient.setToken({
      refresh_token: creds.refreshToken,
      access_token: creds.accessToken || ''
    });
    
    this.realmId = creds.realmId;
    this.baseUrl = creds.sandbox 
      ? 'https://sandbox-quickbooks.api.intuit.com'
      : 'https://quickbooks.api.intuit.com';
  }

  async ensureValidToken() {
    if (this.oauthClient.isAccessTokenValid()) {
      return;
    }
    
    console.log('   Refreshing QuickBooks access token...');
    const authResponse = await this.oauthClient.refresh();
    
    // Update stored credentials with new tokens
    const creds = loadCredentials();
    creds.accessToken = authResponse.token.access_token;
    creds.refreshToken = authResponse.token.refresh_token;
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(creds, null, 2));
  }

  async makeRequest(method, endpoint, body = null) {
    await this.ensureValidToken();
    
    const url = `${this.baseUrl}/v3/company/${this.realmId}${endpoint}`;
    const options = {
      method,
      headers: {
        'Authorization': `Bearer ${this.oauthClient.getToken().access_token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };
    
    if (body) {
      options.body = JSON.stringify(body);
    }
    
    const response = await fetch(url, options);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`QB API Error: ${JSON.stringify(data)}`);
    }
    
    return data;
  }

  async getEmployees() {
    const result = await this.makeRequest('GET', '/query?query=SELECT * FROM Employee');
    return result.QueryResponse.Employee || [];
  }

  async createTimeActivity(activity) {
    return await this.makeRequest('POST', '/timeactivity', activity);
  }
}

// Transform 7shifts data to QB time activity format
function transformToTimeActivity(punch, employeeRef) {
  const clockIn = new Date(punch.clock_in);
  const hours = parseFloat(punch.hours_worked) || 0;
  const minutes = Math.round((hours % 1) * 60);
  const wholeHours = Math.floor(hours);

  return {
    NameOf: 'Employee',
    EmployeeRef: {
      value: employeeRef
    },
    TxnDate: punch.date,
    Hours: wholeHours,
    Minutes: minutes,
    Description: `${punch.role} shift - imported from 7shifts`,
    // Optional: Add ItemRef for time tracking to specific service
    // ItemRef: { value: 'service-id' }
  };
}

// Main import function
async function importToQuickBooks(inputFile) {
  console.log(`📥 Importing timesheets to QuickBooks: ${inputFile}`);
  
  // Load timesheet data
  let timesheetData;
  try {
    timesheetData = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
  } catch (err) {
    console.error('❌ Failed to load timesheet file:', err.message);
    process.exit(1);
  }
  
  const creds = loadCredentials();
  const client = new QuickBooksClient(creds);
  const employeeMapping = loadEmployeeMapping();
  
  try {
    // Get QB employees for matching
    console.log('   Fetching QuickBooks employees...');
    const qbEmployees = await client.getEmployees();
    console.log(`   Found ${qbEmployees.length} employees in QuickBooks`);
    
    // Build name-based mapping for employees not in explicit map
    const nameMap = {};
    for (const emp of qbEmployees) {
      const fullName = `${emp.GivenName} ${emp.FamilyName}`.toLowerCase();
      nameMap[fullName] = emp.Id;
    }
    
    // Process each timesheet entry
    const results = {
      success: [],
      failed: [],
      skipped: []
    };
    
    for (const punch of timesheetData.data) {
      // Skip open punches
      if (punch.status === 'open') {
        results.skipped.push({
          punch_id: punch.punch_id,
          reason: 'Open punch (missing clock-out)'
        });
        continue;
      }
      
      // Find QB employee reference
      let qbEmployeeId = employeeMapping[punch.employee_id];
      if (!qbEmployeeId) {
        // Try name matching
        const nameLower = punch.employee_name.toLowerCase();
        qbEmployeeId = nameMap[nameLower];
      }
      
      if (!qbEmployeeId) {
        results.failed.push({
          punch_id: punch.punch_id,
          employee: punch.employee_name,
          reason: 'No matching QuickBooks employee'
        });
        continue;
      }
      
      // Create time activity
      try {
        const activity = transformToTimeActivity(punch, qbEmployeeId);
        await client.createTimeActivity(activity);
        results.success.push({
          punch_id: punch.punch_id,
          employee: punch.employee_name,
          hours: punch.hours_worked
        });
      } catch (err) {
        results.failed.push({
          punch_id: punch.punch_id,
          employee: punch.employee_name,
          reason: err.message
        });
      }
    }
    
    // Print summary
    console.log('\n✅ Import complete!');
    console.log(`   ✓ Imported: ${results.success.length}`);
    console.log(`   ✗ Failed: ${results.failed.length}`);
    console.log(`   ⊘ Skipped: ${results.skipped.length}`);
    
    if (results.failed.length > 0) {
      console.log('\n❌ Failed entries:');
      results.failed.forEach(f => {
        console.log(`   - ${f.employee}: ${f.reason}`);
      });
    }
    
    // Save results log
    const logPath = inputFile.replace('.json', '_import_log.json');
    fs.writeFileSync(logPath, JSON.stringify(results, null, 2));
    console.log(`\n📝 Import log saved: ${logPath}`);
    
    return results;
    
  } catch (err) {
    console.error('❌ Import failed:', err.message);
    process.exit(1);
  }
}

// Parse command line args
const args = process.argv.slice(2);
const fileIdx = args.indexOf('--file');

if (fileIdx === -1 || !args[fileIdx + 1]) {
  console.error('Usage: node quickbooks-import.js --file <path-to-timesheets.json>');
  process.exit(1);
}

importToQuickBooks(args[fileIdx + 1]);

module.exports = { importToQuickBooks, QuickBooksClient };
