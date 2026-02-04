# SLC Lead Gen - Gaps Analysis
> January 2026 | Analyzing design vs. implementation reality

---

## Executive Summary

The SLC Lead Gen system is **~15% implemented**. We have solid documentation, agent definitions, and basic telephony—but the actual lead sourcing pipeline, integrations, and automation are theoretical.

**Status:**
- 📋 **Documentation:** Excellent (architecture, agents, workflows)
- 🛠️ **Services:** Minimal (only telephony)
- 🔌 **Integrations:** None operational
- 📊 **Data Pipeline:** Not built
- 🤖 **Automation:** Theoretical

---

## What ACTUALLY Exists

### ✅ Implemented & Working

| Component | Location | Status |
|-----------|----------|--------|
| Twilio Client | `services/twilio-client.js` | ✅ Fully coded |
| Call Webhook Server | `services/call-webhook-server.js` | ✅ Fully coded |
| Twilio Credentials | `config/.twilio-credentials` | ✅ Configured |

### 📋 Documentation Complete (But Not Implemented)

| Component | Location | Status |
|-----------|----------|--------|
| Architecture | `architecture.md` | 📋 Vision doc |
| V2 SKILL Routing | `v2/SKILL.md` | 📋 Orchestration spec |
| 40 V1 Agents | `agents/research/`, `agents/design/`, `agents/lead-gen/` | 📋 Prompt files only |
| 5 V2 Agents | `v2/agents/*.md` | 📋 Prompt files only |
| Campaign Workflow | `v2/workflows/new-campaign.md` | 📋 Process doc |
| Lead Sourcing Research | `~/clawd/research/local-lead-sourcing.md` | 📋 Full blueprint |
| Telephony Setup | `docs/telephony-setup.md` | 📋 Instructions |

### ❌ Missing Completely

| Component | Expected Location | Notes |
|-----------|-------------------|-------|
| Data directories | `data/companies/`, `data/contacts/`, `data/campaigns/` | None exist |
| Templates | `v2/templates/` | Empty directory |
| Lead sourcer pipeline | `services/lead-sourcer.js` | Not built |
| Database schema | `services/db.js` or Supabase | Not created |
| API integration layer | `services/integrations/` | Nothing |

---

## Critical Gaps by Category

### 1. 🔍 Lead Sourcing Pipeline (Priority: HIGH)

**Research doc defines:** Complete pipeline with Google Places → PageSpeed → Scoring → Database

**Actually built:** Nothing

**Gap Details:**

| Feature | Research Doc | Implementation |
|---------|--------------|----------------|
| Google Places API integration | ✅ Full code sample | ❌ Not built |
| PageSpeed Insights scoring | ✅ Full code sample | ❌ Not built |
| Website quality scoring | ✅ Algorithm defined | ❌ Not built |
| Tech stack detection | ✅ BuiltWith/Wappalyzer code | ❌ Not built |
| SSL/broken link checking | ✅ Code samples | ❌ Not built |
| Opportunity scoring formula | ✅ Defined | ❌ Not implemented |
| SQLite database schema | ✅ Full schema | ❌ Not created |
| CSV export | ✅ Code sample | ❌ Not built |

**To Build:**
```
services/
├── lead-sourcer.js        # Main pipeline from research doc
├── integrations/
│   ├── google-places.js   # Places API wrapper
│   ├── pagespeed.js       # PageSpeed API wrapper
│   └── tech-detect.js     # Stack detection
├── scoring/
│   ├── website-scorer.js  # Quality scoring
│   └── opportunity.js     # Business + site combined
└── db/
    ├── schema.sql         # SQLite schema
    └── queries.js         # Data access layer
```

### 2. 📧 Outreach Integrations (Priority: HIGH)

**Architecture claims:**
- Instantly.ai for email sequencing
- Apollo.io for enrichment
- LinkedIn automation (Browserless)

**Actually built:** None

**Gap Details:**

| Service | Mentioned In | Implementation |
|---------|--------------|----------------|
| Instantly.ai | architecture.md | ❌ No integration code |
| Apollo.io | architecture.md | ❌ No integration code |
| LinkedIn automation | architecture.md, agents | ❌ No Browserless setup |

**To Build:**
```
services/integrations/
├── instantly.js           # Email sequence API
├── apollo.js              # Enrichment API
└── linkedin-browser.js    # Browserless automation
```

### 3. 📊 Data Storage (Priority: HIGH)

**Architecture claims:** JSON files → migrate to Supabase

**Actually built:** No data storage at all

**Gap Details:**
- No `data/` directory exists
- No database (SQLite or Supabase)
- No file structure for campaigns, lists, contacts
- Agents reference saving to `data/lists/` but folder doesn't exist

**To Build:**
```
data/
├── companies/             # Company profiles
├── contacts/              # Individual contacts  
├── campaigns/             # Campaign data
├── lists/                 # Prospect lists
└── research/              # Research outputs
```

Plus either:
- SQLite for local dev: `services/db/sqlite.js`
- Supabase for production: `services/db/supabase.js`

### 4. 🎯 Lead Scoring Engine (Priority: MEDIUM)

**Defined in:** list-builder.md, qualifier.md, research doc

**Actually built:** Only as agent instructions (no code)

**Gap Details:**
- A/B/C tier scoring mentioned but no algorithm
- BANT+ framework referenced but not implemented
- Opportunity scoring formula exists in research doc but not built

**To Build:**
```
services/scoring/
├── lead-scorer.js         # BANT+ implementation
├── icp-matcher.js         # ICP fit calculation
└── tier-assignment.js     # A/B/C categorization
```

### 5. 📝 Templates (Priority: MEDIUM)

**V2 SKILL claims:** Templates exist for emails, scoring rubrics, ICP

**Actually built:** Empty `v2/templates/` directory

**To Build:**
```
v2/templates/
├── emails/
│   ├── cold-outreach-sequence.md
│   ├── follow-up-templates.md
│   └── reply-responses.md
├── scoring/
│   ├── bant-rubric.md
│   └── icp-scorecard.md
└── icp/
    └── default-icp.yaml
```

### 6. 🔄 Multi-Channel Coordination (Priority: MEDIUM)

**Architecture claims:** Coordinated Email + LinkedIn + Phone sequences

**Actually built:** Only phone (Twilio) ready

**Gap Details:**
- No sequence orchestration engine
- No timing/cadence management
- No reply tracking across channels
- No centralized activity log

**To Build:**
```
services/
├── sequence-engine.js     # Multi-channel orchestration
├── activity-tracker.js    # Cross-channel logging
└── reply-router.js        # Incoming response handling
```

### 7. 📈 CRM & Reporting (Priority: LOW)

**Architecture claims:** CRM workflows, pipeline analytics

**Actually built:** Nothing

**Gap Details:**
- No CRM admin functionality
- No dashboard or reporting
- No export to Airtable/HubSpot/etc.
- No pipeline visualization

---

## Workflow Reality Check

### New Campaign Workflow (from `v2/workflows/new-campaign.md`)

| Phase | Documented | Operational |
|-------|------------|-------------|
| 1. Research | Spawns researcher agent | ⚠️ Agent exists, but no data sources connected |
| 2. List Build | Sources from LinkedIn, directories | ❌ No LinkedIn automation, no API integrations |
| 3. Outreach | Email sequences via Instantly | ❌ No Instantly.ai integration |
| 4. Qualify | BANT+ scoring, reply routing | ❌ No scoring engine, no reply monitoring |

**Bottom line:** The workflow is a flowchart, not a functioning system.

---

## Agent Capability Reality

| Agent | Can It Actually Work? | Blockers |
|-------|----------------------|----------|
| **Researcher** | ⚠️ Partial | Can use `web_fetch`, `browser`, but no dedicated APIs |
| **List Builder** | ❌ No | No LinkedIn access, no enrichment APIs, no data storage |
| **Outreach** | ❌ No | No Instantly.ai, no LinkedIn automation |
| **Qualifier** | ❌ No | No scoring engine, no reply tracking |
| **Content** | ✅ Yes | Just needs Claude—can write copy |

---

## API Keys & Credentials Status

| Service | Status | Notes |
|---------|--------|-------|
| Twilio | ✅ Configured | `config/.twilio-credentials` |
| 3CX | ❌ Missing | Referenced in env.example only |
| Google Places API | ❌ Missing | Not configured |
| PageSpeed API | 🔄 Free | No key needed, but no integration |
| Yelp API | ❌ Missing | Not configured |
| Apollo.io | ❌ Missing | Not configured |
| Instantly.ai | ❌ Missing | Not configured |
| BuiltWith | ❌ Missing | Not configured |
| LinkedIn (cookies/auth) | ❌ Missing | Not configured |

---

## Recommended Build Order

### Phase 1: Foundation (1-2 weeks)
1. **Create data directories** - Basic file structure
2. **Implement SQLite database** - Schema from research doc
3. **Build lead-sourcer.js** - Core pipeline from research doc
4. **Google Places integration** - Primary data source

### Phase 2: Enrichment (1 week)
5. **PageSpeed integration** - Website scoring
6. **Website quality scorer** - Opportunity calculation
7. **Tech stack detection** - Simple HTML-based (no paid APIs)

### Phase 3: Outreach (1-2 weeks)
8. **Instantly.ai integration** - Email sequencing
9. **Apollo.io integration** - Contact enrichment
10. **Email templates** - Cold outreach sequences

### Phase 4: Coordination (1 week)
11. **Sequence engine** - Multi-channel timing
12. **Reply router** - Incoming message handling
13. **Lead scorer** - BANT+ implementation

### Phase 5: Scale (Ongoing)
14. **LinkedIn automation** - Via browser tool
15. **CRM export** - Airtable/HubSpot
16. **Dashboard** - Pipeline visibility

---

## Quick Wins (Can Do Today)

1. **Create `data/` directories** - 2 minutes
2. **Copy lead-sourcer.js from research doc** - Already written, just needs to be a file
3. **Add templates** - Write basic email sequences
4. **Test Google Places API** - Just needs API key

---

## Conclusion

The SLC Lead Gen system has excellent *design* but almost no *implementation*. The research doc (`local-lead-sourcing.md`) contains ready-to-use code that was never deployed. The v2 agent simplification is smart but the agents have no tools to actually do their jobs.

**Key insight:** We're one good sprint away from a working MVP. The lead-sourcer pipeline code exists in the research doc—it just needs to become actual files with actual API keys.

---

*Analysis completed: January 2026*
*Analyst: Claw (research-gaps subagent)*
