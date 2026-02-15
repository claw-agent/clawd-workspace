-- Lead CRM Schema
-- Tracks all leads across XPERIENCE systems

CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now')),
    
    -- Contact info
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    address TEXT,
    city TEXT DEFAULT 'Salt Lake City',
    state TEXT DEFAULT 'UT',
    zip TEXT,
    
    -- Lead details
    source TEXT NOT NULL CHECK(source IN (
        'storm-monitor', 'speed-to-lead', 'review-gen', 'manual',
        'referral', 'website', 'door-knock', 'mailer', 'other'
    )),
    source_detail TEXT,  -- e.g. "Feb 10 hailstorm campaign"
    
    status TEXT NOT NULL DEFAULT 'new' CHECK(status IN (
        'new', 'contacted', 'scheduled', 'inspected', 'quoted',
        'signed', 'in-progress', 'completed', 'lost', 'dormant'
    )),
    
    -- Job info
    job_type TEXT CHECK(job_type IN (
        'roof-replacement', 'roof-repair', 'gutter', 'siding',
        'insurance-claim', 'inspection', 'other'
    )),
    estimated_value REAL,
    actual_value REAL,
    insurance_claim INTEGER DEFAULT 0,  -- boolean
    insurance_carrier TEXT,
    
    -- Tracking
    assigned_to TEXT DEFAULT 'Marb',
    priority TEXT DEFAULT 'normal' CHECK(priority IN ('low', 'normal', 'high', 'urgent')),
    next_action TEXT,
    next_action_date TEXT,
    
    -- Metadata
    notes TEXT,
    tags TEXT  -- comma-separated
);

CREATE TABLE IF NOT EXISTS lead_activities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lead_id INTEGER NOT NULL REFERENCES leads(id),
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    type TEXT NOT NULL CHECK(type IN (
        'call', 'sms', 'email', 'visit', 'inspection',
        'quote', 'follow-up', 'status-change', 'note'
    )),
    description TEXT NOT NULL,
    metadata TEXT  -- JSON for extra data
);

CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_next_action ON leads(next_action_date);
CREATE INDEX IF NOT EXISTS idx_activities_lead ON lead_activities(lead_id);

-- Trigger to update updated_at
CREATE TRIGGER IF NOT EXISTS leads_updated_at
AFTER UPDATE ON leads
BEGIN
    UPDATE leads SET updated_at = datetime('now') WHERE id = NEW.id;
END;
