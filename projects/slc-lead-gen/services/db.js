/**
 * SLC Lead Gen - Data Management Layer
 * JSON-based storage for lead pipeline
 */

import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

const DATA_ROOT = path.join(process.cwd(), 'data');
const LEADS_DIR = path.join(DATA_ROOT, 'leads');
const CAMPAIGNS_DIR = path.join(DATA_ROOT, 'campaigns');

// Stage directories
const STAGES = {
  raw: path.join(LEADS_DIR, 'raw'),
  scored: path.join(LEADS_DIR, 'scored'),
  enriched: path.join(LEADS_DIR, 'enriched')
};

/**
 * Ensure all data directories exist
 */
async function ensureDirectories() {
  await fs.mkdir(LEADS_DIR, { recursive: true });
  for (const dir of Object.values(STAGES)) {
    await fs.mkdir(dir, { recursive: true });
  }
  await fs.mkdir(CAMPAIGNS_DIR, { recursive: true });
}

/**
 * Generate a lead filename from ID
 */
function getLeadPath(id, stage = 'raw') {
  const dir = STAGES[stage] || STAGES.raw;
  return path.join(dir, `${id}.json`);
}

/**
 * Save a lead to the appropriate stage folder
 * @param {object} lead - Lead data
 * @param {string} stage - Pipeline stage (raw, scored, enriched)
 * @returns {object} Saved lead with ID
 */
export async function saveLead(lead, stage = 'raw') {
  await ensureDirectories();
  
  const now = new Date().toISOString();
  
  // Assign ID if new lead
  if (!lead.id) {
    lead.id = randomUUID();
    lead.createdAt = now;
  }
  
  // Always update timestamp
  lead.updatedAt = now;
  
  // Set pipeline stage
  lead.pipeline = lead.pipeline || {};
  lead.pipeline.stage = stage;
  
  const filePath = getLeadPath(lead.id, stage);
  await fs.writeFile(filePath, JSON.stringify(lead, null, 2));
  
  // If moving stages, remove from old location
  if (stage !== 'raw') {
    const oldPath = getLeadPath(lead.id, 'raw');
    try {
      await fs.unlink(oldPath);
    } catch (e) {
      // File may not exist in old location
    }
  }
  if (stage === 'enriched') {
    const scoredPath = getLeadPath(lead.id, 'scored');
    try {
      await fs.unlink(scoredPath);
    } catch (e) {
      // File may not exist
    }
  }
  
  return lead;
}

/**
 * Retrieve leads from a stage with optional filters
 * @param {string} stage - Pipeline stage (raw, scored, enriched, or 'all')
 * @param {object} filters - Filter criteria
 * @returns {array} Matching leads
 */
export async function getLeads(stage = 'all', filters = {}) {
  await ensureDirectories();
  
  const stages = stage === 'all' ? Object.keys(STAGES) : [stage];
  const leads = [];
  
  for (const s of stages) {
    const dir = STAGES[s];
    if (!dir) continue;
    
    try {
      const files = await fs.readdir(dir);
      
      for (const file of files) {
        if (!file.endsWith('.json')) continue;
        
        const filePath = path.join(dir, file);
        const content = await fs.readFile(filePath, 'utf8');
        const lead = JSON.parse(content);
        
        // Apply filters
        if (matchesFilters(lead, filters)) {
          leads.push(lead);
        }
      }
    } catch (e) {
      // Directory may be empty or not exist
    }
  }
  
  // Sort by updatedAt descending (most recent first)
  leads.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  
  return leads;
}

/**
 * Check if a lead matches filter criteria
 */
function matchesFilters(lead, filters) {
  for (const [key, value] of Object.entries(filters)) {
    // Handle nested paths like 'company.industry'
    const keys = key.split('.');
    let current = lead;
    
    for (const k of keys) {
      if (current === undefined || current === null) return false;
      current = current[k];
    }
    
    // Support array values (OR matching)
    if (Array.isArray(value)) {
      if (!value.includes(current)) return false;
    } else if (current !== value) {
      return false;
    }
  }
  return true;
}

/**
 * Get a single lead by ID
 * @param {string} id - Lead ID
 * @returns {object|null} Lead or null if not found
 */
export async function getLead(id) {
  await ensureDirectories();
  
  // Check all stages
  for (const stage of Object.keys(STAGES)) {
    try {
      const filePath = getLeadPath(id, stage);
      const content = await fs.readFile(filePath, 'utf8');
      return JSON.parse(content);
    } catch (e) {
      // Not in this stage
    }
  }
  
  return null;
}

/**
 * Update a lead's pipeline status
 * @param {string} id - Lead ID
 * @param {string} status - New status
 * @param {string} note - Optional note
 * @returns {object|null} Updated lead
 */
export async function updateLeadStatus(id, status, note = null) {
  const lead = await getLead(id);
  if (!lead) return null;
  
  lead.pipeline = lead.pipeline || {};
  lead.pipeline.status = status;
  
  // Add note if provided
  if (note) {
    lead.pipeline.notes = lead.pipeline.notes || [];
    lead.pipeline.notes.push({
      text: note,
      author: 'system',
      timestamp: new Date().toISOString()
    });
  }
  
  // Determine stage from status
  let stage = lead.pipeline.stage || 'raw';
  
  // Save to current stage
  return await saveLead(lead, stage);
}

/**
 * Move a lead to a new pipeline stage
 * @param {string} id - Lead ID
 * @param {string} newStage - Target stage
 * @returns {object|null} Updated lead
 */
export async function moveLeadToStage(id, newStage) {
  const lead = await getLead(id);
  if (!lead) return null;
  
  const oldStage = lead.pipeline?.stage || 'raw';
  
  // Remove from old stage
  try {
    await fs.unlink(getLeadPath(id, oldStage));
  } catch (e) {
    // May not exist
  }
  
  // Save to new stage
  return await saveLead(lead, newStage);
}

/**
 * Get summary statistics of the pipeline
 * @returns {object} Pipeline stats
 */
export async function getLeadStats() {
  await ensureDirectories();
  
  const stats = {
    total: 0,
    byStage: {
      raw: 0,
      scored: 0,
      enriched: 0
    },
    byStatus: {},
    byTier: {
      A: 0,
      B: 0,
      C: 0,
      D: 0,
      unscored: 0
    },
    bySource: {},
    avgScore: 0,
    recentActivity: []
  };
  
  let totalScore = 0;
  let scoredCount = 0;
  
  for (const [stage, dir] of Object.entries(STAGES)) {
    try {
      const files = await fs.readdir(dir);
      
      for (const file of files) {
        if (!file.endsWith('.json')) continue;
        
        const filePath = path.join(dir, file);
        const content = await fs.readFile(filePath, 'utf8');
        const lead = JSON.parse(content);
        
        stats.total++;
        stats.byStage[stage]++;
        
        // Count by status
        const status = lead.pipeline?.status || 'new';
        stats.byStatus[status] = (stats.byStatus[status] || 0) + 1;
        
        // Count by tier
        const tier = lead.scoring?.tier;
        if (tier) {
          stats.byTier[tier]++;
        } else {
          stats.byTier.unscored++;
        }
        
        // Count by source
        const source = lead.source?.type || 'unknown';
        stats.bySource[source] = (stats.bySource[source] || 0) + 1;
        
        // Track scores
        if (lead.scoring?.totalScore !== undefined) {
          totalScore += lead.scoring.totalScore;
          scoredCount++;
        }
        
        // Track recent activity
        if (lead.updatedAt) {
          stats.recentActivity.push({
            id: lead.id,
            company: lead.company?.name,
            stage,
            updatedAt: lead.updatedAt
          });
        }
      }
    } catch (e) {
      // Directory may be empty
    }
  }
  
  // Calculate average score
  stats.avgScore = scoredCount > 0 ? Math.round(totalScore / scoredCount) : 0;
  
  // Sort recent activity and take top 10
  stats.recentActivity.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  stats.recentActivity = stats.recentActivity.slice(0, 10);
  
  return stats;
}

/**
 * Delete a lead by ID
 * @param {string} id - Lead ID
 * @returns {boolean} Success
 */
export async function deleteLead(id) {
  for (const stage of Object.keys(STAGES)) {
    try {
      await fs.unlink(getLeadPath(id, stage));
      return true;
    } catch (e) {
      // Not in this stage
    }
  }
  return false;
}

/**
 * Bulk import leads
 * @param {array} leads - Array of lead objects
 * @param {string} stage - Target stage
 * @returns {object} Import results
 */
export async function bulkImportLeads(leads, stage = 'raw') {
  const results = {
    imported: 0,
    failed: 0,
    errors: []
  };
  
  for (const lead of leads) {
    try {
      await saveLead(lead, stage);
      results.imported++;
    } catch (e) {
      results.failed++;
      results.errors.push({
        lead: lead.company?.name || lead.id,
        error: e.message
      });
    }
  }
  
  return results;
}

/**
 * Export leads to a single JSON file
 * @param {string} stage - Stage to export (or 'all')
 * @param {string} outputPath - Output file path
 * @returns {number} Number of leads exported
 */
export async function exportLeads(stage = 'all', outputPath = null) {
  const leads = await getLeads(stage);
  
  if (outputPath) {
    await fs.writeFile(outputPath, JSON.stringify(leads, null, 2));
  }
  
  return leads;
}

// Default export with all functions
export default {
  saveLead,
  getLeads,
  getLead,
  updateLeadStatus,
  moveLeadToStage,
  getLeadStats,
  deleteLead,
  bulkImportLeads,
  exportLeads
};
