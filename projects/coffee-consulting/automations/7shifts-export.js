/**
 * 7shifts Timesheet Export Automation
 * 
 * Exports timesheet data from 7shifts for payroll processing.
 * Run daily or weekly before payroll.
 * 
 * Requirements:
 * - 7shifts API key (stored in config/.7shifts-credentials)
 * - Node.js 18+
 * - axios package
 * 
 * Usage:
 *   node 7shifts-export.js --start 2026-01-01 --end 2026-01-15
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG_PATH = path.join(__dirname, '../config/.7shifts-credentials');
const OUTPUT_DIR = path.join(__dirname, '../data/7shifts');

// Load credentials
function loadCredentials() {
  try {
    const creds = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
    return creds;
  } catch (err) {
    console.error('❌ Failed to load 7shifts credentials from', CONFIG_PATH);
    console.error('   Create the file with: { "apiKey": "your-key", "companyId": "your-id" }');
    process.exit(1);
  }
}

// 7shifts API client
class SevenShiftsClient {
  constructor(apiKey, companyId) {
    this.apiKey = apiKey;
    this.companyId = companyId;
    this.baseUrl = 'https://api.7shifts.com/v2';
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
  }

  async getLocations() {
    const res = await this.client.get(`/companies/${this.companyId}/locations`);
    return res.data.data;
  }

  async getTimePunches(locationId, startDate, endDate) {
    const res = await this.client.get(`/companies/${this.companyId}/time_punches`, {
      params: {
        location_id: locationId,
        clocked_in_gte: startDate,
        clocked_in_lte: endDate,
        limit: 500
      }
    });
    return res.data.data;
  }

  async getUsers() {
    const res = await this.client.get(`/companies/${this.companyId}/users`);
    return res.data.data;
  }

  async getRoles() {
    const res = await this.client.get(`/companies/${this.companyId}/roles`);
    return res.data.data;
  }
}

// Transform time punches to payroll format
function transformForPayroll(punches, users, roles) {
  const userMap = Object.fromEntries(users.map(u => [u.id, u]));
  const roleMap = Object.fromEntries(roles.map(r => [r.id, r]));

  return punches.map(punch => {
    const user = userMap[punch.user_id] || {};
    const role = roleMap[punch.role_id] || {};
    
    const clockIn = new Date(punch.clocked_in);
    const clockOut = punch.clocked_out ? new Date(punch.clocked_out) : null;
    const hoursWorked = clockOut 
      ? (clockOut - clockIn) / (1000 * 60 * 60) 
      : null;

    return {
      employee_id: punch.user_id,
      employee_name: `${user.first_name} ${user.last_name}`,
      role: role.name || 'Unknown',
      location_id: punch.location_id,
      date: clockIn.toISOString().split('T')[0],
      clock_in: punch.clocked_in,
      clock_out: punch.clocked_out,
      hours_worked: hoursWorked ? hoursWorked.toFixed(2) : 'OPEN',
      break_minutes: punch.breaks_paid_minutes + punch.breaks_unpaid_minutes,
      tips: punch.tips || 0,
      punch_id: punch.id,
      status: clockOut ? 'complete' : 'open'
    };
  });
}

// Main export function
async function exportTimesheets(startDate, endDate) {
  console.log(`📊 Exporting 7shifts timesheets: ${startDate} to ${endDate}`);
  
  const creds = loadCredentials();
  const client = new SevenShiftsClient(creds.apiKey, creds.companyId);
  
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  try {
    // Fetch all required data
    console.log('   Fetching locations...');
    const locations = await client.getLocations();
    
    console.log('   Fetching users...');
    const users = await client.getUsers();
    
    console.log('   Fetching roles...');
    const roles = await client.getRoles();
    
    // Fetch time punches for all locations
    let allPunches = [];
    for (const loc of locations) {
      console.log(`   Fetching punches for ${loc.name}...`);
      const punches = await client.getTimePunches(loc.id, startDate, endDate);
      allPunches = allPunches.concat(punches);
    }
    
    console.log(`   Found ${allPunches.length} time punches`);
    
    // Transform data
    const payrollData = transformForPayroll(allPunches, users, roles);
    
    // Generate report
    const report = {
      export_date: new Date().toISOString(),
      period: { start: startDate, end: endDate },
      locations: locations.map(l => ({ id: l.id, name: l.name })),
      total_punches: payrollData.length,
      open_punches: payrollData.filter(p => p.status === 'open').length,
      data: payrollData
    };
    
    // Save output
    const filename = `timesheets_${startDate}_to_${endDate}.json`;
    const outputPath = path.join(OUTPUT_DIR, filename);
    fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
    
    console.log(`\n✅ Export complete: ${outputPath}`);
    console.log(`   Total punches: ${payrollData.length}`);
    console.log(`   Open punches: ${report.open_punches}`);
    
    if (report.open_punches > 0) {
      console.log('\n⚠️  Warning: Some punches are still open (missing clock-out)');
      console.log('   Review before processing payroll!');
    }
    
    return report;
    
  } catch (err) {
    console.error('❌ Export failed:', err.message);
    if (err.response) {
      console.error('   API response:', err.response.data);
    }
    process.exit(1);
  }
}

// Parse command line args
const args = process.argv.slice(2);
const startIdx = args.indexOf('--start');
const endIdx = args.indexOf('--end');

if (startIdx === -1 || endIdx === -1) {
  // Default to last 2 weeks
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 14);
  
  exportTimesheets(
    start.toISOString().split('T')[0],
    end.toISOString().split('T')[0]
  );
} else {
  exportTimesheets(args[startIdx + 1], args[endIdx + 1]);
}

module.exports = { exportTimesheets, SevenShiftsClient };
