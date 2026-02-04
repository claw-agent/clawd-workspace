# LeadGen SaaS - Agent Swarm Specification

> **Version:** 1.0  
> **Date:** January 28, 2026  
> **Status:** Architecture Complete ✅

---

## Executive Summary

This document specifies the AI agent swarm architecture for the LeadGen SaaS platform. The swarm consists of **7 specialized agents** that work together to transform a simple user request ("Find me restaurant owners in Denver who need websites") into qualified, ready-to-contact leads with personalized outreach sequences.

### Design Principles

1. **Single Responsibility** — Each agent does one thing well
2. **Explicit Handoffs** — Clear data contracts between agents
3. **Parallel When Possible** — Maximize throughput
4. **Human-in-the-Loop** — Critical decisions require approval
5. **Graceful Degradation** — Partial results beat total failure

---

## 1. Agent Roster

| # | Agent | Purpose | Reuses from slc-lead-gen |
|---|-------|---------|-------------------------|
| 1 | **Discovery** | Find prospects from external sources | `lead-discovery.js` |
| 2 | **Research** | Deep-dive on individual prospects | `researcher.md` |
| 3 | **Enrichment** | Find emails, tech stack, company data | `business-scraper.js` |
| 4 | **Scoring** | Assign A/B/C tier based on fit | `qualifier.md` |
| 5 | **Content** | Generate personalized email copy | `content.md` |
| 6 | **Outreach** | Manage sequences and sending | `outreach.md` |
| 7 | **QA** | Verify data quality before handoffs | NEW |

### Mapping to Existing Agents

```
slc-lead-gen/v2/agents/        →    leadgen-saas/agents/
├── researcher.md              →    research-agent.md (enhanced)
├── list-builder.md            →    discovery-agent.md (renamed + focused)
├── outreach.md                →    outreach-agent.md (unchanged)
├── qualifier.md               →    scoring-agent.md (renamed)
├── content.md                 →    content-agent.md (unchanged)
└── (new)                      →    enrichment-agent.md (split from list-builder)
└── (new)                      →    qa-agent.md (new capability)
```

---

## 2. Agent Specifications

### 2.1 Discovery Agent

**File:** `discovery-agent.md`

**Purpose:** Find raw prospect data from external sources (Google Maps, Yelp, directories, databases) based on campaign criteria.

**Inputs:**
```json
{
  "campaign_id": "uuid",
  "business_type": "restaurant",
  "location": "Denver, CO",
  "radius_miles": 25,
  "max_results": 100,
  "filters": {
    "min_reviews": 10,
    "min_rating": 3.5,
    "exclude_chains": true
  }
}
```

**Outputs:**
```json
{
  "prospects": [
    {
      "id": "uuid",
      "name": "Joe's Diner",
      "address": "123 Main St, Denver, CO",
      "phone": "+1-303-555-1234",
      "website": "https://joesdiner.com",
      "source": "google_maps",
      "source_id": "ChIJ...",
      "rating": 4.2,
      "review_count": 87,
      "raw_data": { /* full API response */ }
    }
  ],
  "metadata": {
    "total_found": 156,
    "returned": 100,
    "sources_used": ["google_maps", "yelp"],
    "search_timestamp": "2026-01-28T10:30:00Z"
  }
}
```

**Tools Needed:**
- Google Maps/Places API (or Puppeteer scraper)
- Yelp Fusion API
- Industry directories (Crunchbase, LinkedIn)
- Web scraper (Firecrawl/Puppeteer)

**Error Handling:**
- If Google fails → fallback to Yelp only
- If both fail → return error, don't proceed
- Rate limits → exponential backoff + retry

---

### 2.2 Research Agent

**File:** `research-agent.md`

**Purpose:** Conduct deep research on individual prospects to understand their business, pain points, and opportunities.

**Inputs:**
```json
{
  "prospect_id": "uuid",
  "company_name": "Joe's Diner",
  "website": "https://joesdiner.com",
  "research_depth": "standard", // "quick" | "standard" | "deep"
  "focus_areas": ["website_quality", "online_presence", "pain_points"]
}
```

**Outputs:**
```json
{
  "prospect_id": "uuid",
  "research": {
    "company_summary": "Family-owned diner established 1985...",
    "key_people": [
      {"name": "Joe Smith", "title": "Owner", "source": "website"}
    ],
    "website_analysis": {
      "mobile_friendly": false,
      "load_time_seconds": 8.2,
      "has_online_ordering": false,
      "last_updated_estimate": "2019",
      "issues": ["No SSL", "Flash elements", "Broken links"]
    },
    "online_presence": {
      "google_reviews": 87,
      "yelp_reviews": 45,
      "facebook_page": true,
      "instagram": false
    },
    "pain_points": [
      "Outdated website hurting credibility",
      "No online ordering = lost revenue",
      "Competitors have better digital presence"
    ],
    "opportunities": [
      "Website redesign with online ordering",
      "Local SEO optimization",
      "Social media setup"
    ],
    "research_confidence": 0.85
  },
  "sources_used": ["website", "google", "yelp", "facebook"]
}
```

**Tools Needed:**
- Web scraper (Firecrawl/Jina Reader)
- Lighthouse API (website scoring)
- Social media APIs
- News/press search

**Error Handling:**
- Website unreachable → use cached/archive.org data
- No data found → return partial with low confidence
- Timeout → return what we have, flag as incomplete

---

### 2.3 Enrichment Agent

**File:** `enrichment-agent.md`

**Purpose:** Find contact information (emails, phones, LinkedIn) and company data (tech stack, employee count, revenue).

**Inputs:**
```json
{
  "prospect_id": "uuid",
  "company_name": "Joe's Diner",
  "website": "joesdiner.com",
  "known_people": [
    {"name": "Joe Smith", "title": "Owner"}
  ],
  "enrichment_level": "full" // "basic" | "full" | "deep"
}
```

**Outputs:**
```json
{
  "prospect_id": "uuid",
  "contacts": [
    {
      "name": "Joe Smith",
      "title": "Owner",
      "email": "joe@joesdiner.com",
      "email_confidence": 0.92,
      "email_verified": true,
      "linkedin_url": "https://linkedin.com/in/joesmith",
      "phone": "+1-303-555-1234",
      "is_decision_maker": true
    }
  ],
  "company_data": {
    "domain": "joesdiner.com",
    "employee_count": "5-10",
    "revenue_estimate": "$500K-1M",
    "tech_stack": ["WordPress", "WooCommerce", "Google Analytics"],
    "social_profiles": {
      "facebook": "https://facebook.com/joesdiner",
      "instagram": null
    }
  },
  "enrichment_sources": ["hunter", "apollo", "linkedin", "builtwith"]
}
```

**Tools Needed:**
- Hunter.io (email finding + verification)
- Apollo.io (contact + company data)
- LinkedIn (via scraper or API)
- BuiltWith/Wappalyzer (tech stack)
- Clearbit (if available)

**Waterfall Strategy:**
1. Try Hunter.io first (cheapest, good accuracy)
2. If no result → try Apollo.io
3. If still no result → pattern matching (first@domain.com)
4. Always verify with Hunter before marking valid

---

### 2.4 Scoring Agent

**File:** `scoring-agent.md`

**Purpose:** Analyze all prospect data and assign a quality score (0-100) and tier (A/B/C).

**Inputs:**
```json
{
  "prospect_id": "uuid",
  "discovery_data": { /* from Discovery Agent */ },
  "research_data": { /* from Research Agent */ },
  "enrichment_data": { /* from Enrichment Agent */ },
  "campaign_icp": {
    "business_type": "restaurant",
    "min_reviews": 20,
    "website_issues_required": true,
    "decision_maker_required": true
  }
}
```

**Outputs:**
```json
{
  "prospect_id": "uuid",
  "score": 78,
  "tier": "A",
  "scoring_breakdown": {
    "icp_fit": 25,        // /30 - matches target profile
    "pain_signals": 20,    // /25 - has problems we solve
    "contact_quality": 18, // /20 - valid email for DM
    "timing_signals": 10,  // /15 - recent activity/hiring
    "engagement_potential": 5 // /10 - likely to respond
  },
  "tier_reasoning": "Strong ICP fit with clear website pain points. Verified decision-maker email. Recent Google reviews suggest active business.",
  "recommended_action": "immediate_outreach",
  "priority_rank": 3
}
```

**Tier Definitions:**
| Tier | Score Range | Action | Volume Target |
|------|-------------|--------|---------------|
| **A** | 70-100 | Immediate outreach, manual review | Top 20% |
| **B** | 40-69 | Automated sequence, nurture | Middle 50% |
| **C** | 0-39 | Skip or long-term nurture | Bottom 30% |

**Scoring Rubric:**

| Factor | Weight | Criteria |
|--------|--------|----------|
| ICP Fit | 30% | Business type, size, location match |
| Pain Signals | 25% | Website issues, no online ordering, etc. |
| Contact Quality | 20% | Valid email, decision maker, direct line |
| Timing Signals | 15% | Recent reviews, hiring, funding |
| Engagement Potential | 10% | Open rate prediction, personalization hooks |

---

### 2.5 Content Agent

**File:** `content-agent.md`

**Purpose:** Generate personalized outreach content (emails, LinkedIn messages, landing pages) based on prospect research.

**Inputs:**
```json
{
  "prospect_id": "uuid",
  "contact": {
    "name": "Joe Smith",
    "title": "Owner",
    "email": "joe@joesdiner.com"
  },
  "research": { /* from Research Agent */ },
  "scoring": { /* from Scoring Agent */ },
  "content_type": "email_sequence", // or "linkedin", "landing_page"
  "campaign_config": {
    "sender_name": "Sarah",
    "sender_company": "WebPro Agency",
    "offer": "Free website audit",
    "tone": "friendly_professional",
    "sequence_length": 4
  }
}
```

**Outputs:**
```json
{
  "prospect_id": "uuid",
  "content": {
    "email_sequence": [
      {
        "step": 1,
        "subject": "Quick thought about Joe's Diner's website",
        "body": "Hi Joe,\n\nI was checking out Joe's Diner...",
        "delay_days": 0,
        "personalization_tokens": ["restaurant_name", "specific_issue"]
      },
      {
        "step": 2,
        "subject": "Re: Quick thought about Joe's Diner's website",
        "body": "Hey Joe,\n\nJust floating this back up...",
        "delay_days": 3
      },
      {
        "step": 3,
        "subject": "One more idea for Joe's Diner",
        "body": "Hi Joe,\n\nLast email on this...",
        "delay_days": 5
      },
      {
        "step": 4,
        "subject": "Should I close your file?",
        "body": "Joe,\n\nI'll assume you're not interested...",
        "delay_days": 7
      }
    ],
    "personalization_hooks_used": [
      "Mentioned specific website issues (no SSL, slow load time)",
      "Referenced their 87 Google reviews",
      "Connected to competitor having online ordering"
    ]
  },
  "approval_required": true
}
```

**Tools Needed:**
- Claude API (content generation)
- Template library (proven frameworks)
- Personalization token engine
- Spam score checker

**Content Guidelines:**
- Subject lines < 50 chars
- Body < 150 words for cold emails
- Specific > generic (always reference their business)
- One clear CTA per email
- No attachments on first touch

---

### 2.6 Outreach Agent

**File:** `outreach-agent.md`

**Purpose:** Manage the sending of outreach sequences, track responses, and handle follow-ups.

**Inputs:**
```json
{
  "prospect_id": "uuid",
  "contact": {
    "email": "joe@joesdiner.com",
    "name": "Joe Smith"
  },
  "content": { /* from Content Agent */ },
  "channel": "email", // "email" | "linkedin" | "sms"
  "sending_config": {
    "from_email": "sarah@webpro.agency",
    "from_name": "Sarah at WebPro",
    "send_time_preference": "morning", // "morning" | "afternoon" | "optimal"
    "timezone": "America/Denver"
  }
}
```

**Outputs:**
```json
{
  "prospect_id": "uuid",
  "sequence_id": "uuid",
  "status": "active",
  "events": [
    {
      "type": "sent",
      "step": 1,
      "timestamp": "2026-01-28T09:15:00Z",
      "message_id": "msg_123"
    },
    {
      "type": "opened",
      "step": 1,
      "timestamp": "2026-01-28T14:30:00Z",
      "open_count": 2
    },
    {
      "type": "replied",
      "step": 1,
      "timestamp": "2026-01-28T15:45:00Z",
      "reply_content": "Thanks for reaching out..."
    }
  ],
  "next_action": {
    "type": "human_review",
    "reason": "positive_reply_received",
    "due": "2026-01-28T16:00:00Z"
  }
}
```

**Tools Needed:**
- Instantly.ai (email sending + warmup)
- SendGrid/Resend (transactional backup)
- LinkedIn automation (careful - compliance)
- Twilio (SMS)
- Webhook receiver (for replies/events)

**Sequence Logic:**
- If opened but no reply → continue sequence
- If replied → STOP sequence, flag for human
- If bounced → mark contact invalid, try alternate
- If unsubscribed → mark as DNC forever

---

### 2.7 QA Agent

**File:** `qa-agent.md`

**Purpose:** Verify data quality at each handoff point. Catch errors before they propagate.

**Inputs:**
```json
{
  "stage": "pre_enrichment", // "pre_enrichment" | "pre_scoring" | "pre_outreach"
  "data": { /* whatever is being validated */ },
  "validation_rules": ["email_format", "required_fields", "no_duplicates"]
}
```

**Outputs:**
```json
{
  "valid": true,
  "issues": [],
  "warnings": [
    {
      "field": "phone",
      "issue": "Missing area code",
      "severity": "low",
      "auto_fixed": true
    }
  ],
  "auto_fixes_applied": [
    "Standardized phone format to E.164",
    "Removed extra whitespace from company name"
  ],
  "blocked_records": [],
  "pass_rate": 0.98
}
```

**Validation Checkpoints:**

| Stage | Checks |
|-------|--------|
| **Post-Discovery** | Valid address, phone format, no duplicates, source attribution |
| **Post-Research** | Website accessible, confidence > 0.5, no contradictions |
| **Post-Enrichment** | Email valid (syntax), email verified, has decision maker |
| **Pre-Outreach** | Not on DNC list, not already contacted, content approved |

**Auto-Fix Capabilities:**
- Phone number formatting
- Address standardization
- Name capitalization
- URL normalization (add https://)
- Deduplication by email/domain

---

## 3. Orchestration Flow

### 3.1 Standard Pipeline

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CAMPAIGN CREATED                               │
│                   User: "Find restaurant owners in Denver"                  │
└─────────────────────────────────────────┬───────────────────────────────────┘
                                          │
                                          ▼
                              ┌───────────────────────┐
                              │   1. DISCOVERY AGENT   │
                              │   Find raw prospects   │
                              └───────────┬───────────┘
                                          │ prospects.json
                                          ▼
                              ┌───────────────────────┐
                              │      QA AGENT         │
                              │   Validate + dedup    │
                              └───────────┬───────────┘
                                          │
               ┌──────────────────────────┼──────────────────────────┐
               │                          │                          │
               ▼                          ▼                          ▼
    ┌───────────────────┐     ┌───────────────────┐     ┌───────────────────┐
    │  2. RESEARCH      │     │  2. RESEARCH      │     │  2. RESEARCH      │
    │  (Prospect A)     │     │  (Prospect B)     │     │  (Prospect C)     │
    └─────────┬─────────┘     └─────────┬─────────┘     └─────────┬─────────┘
              │                         │                         │
              └─────────────────────────┼─────────────────────────┘
                                        │ research complete
                                        ▼
               ┌──────────────────────────┼──────────────────────────┐
               │                          │                          │
               ▼                          ▼                          ▼
    ┌───────────────────┐     ┌───────────────────┐     ┌───────────────────┐
    │  3. ENRICHMENT    │     │  3. ENRICHMENT    │     │  3. ENRICHMENT    │
    │  (Prospect A)     │     │  (Prospect B)     │     │  (Prospect C)     │
    └─────────┬─────────┘     └─────────┬─────────┘     └─────────┬─────────┘
              │                         │                         │
              └─────────────────────────┼─────────────────────────┘
                                        │
                                        ▼
                              ┌───────────────────────┐
                              │      QA AGENT         │
                              │   Validate enrichment │
                              └───────────┬───────────┘
                                          │
                                          ▼
                              ┌───────────────────────┐
                              │   4. SCORING AGENT    │
                              │   Score all prospects │
                              └───────────┬───────────┘
                                          │
                    ┌─────────────────────┼─────────────────────┐
                    │                     │                     │
                    ▼                     ▼                     ▼
               ┌─────────┐          ┌─────────┐          ┌─────────┐
               │ Tier A  │          │ Tier B  │          │ Tier C  │
               │ (20%)   │          │ (50%)   │          │ (30%)   │
               └────┬────┘          └────┬────┘          └────┬────┘
                    │                    │                    │
                    │                    │                    ▼
                    │                    │              ┌──────────┐
                    │                    │              │  SKIP    │
                    │                    │              │  or      │
                    │                    │              │  NURTURE │
                    │                    │              └──────────┘
                    │                    │
                    ▼                    ▼
          ┌───────────────────────────────────────┐
          │         5. CONTENT AGENT              │
          │   Generate personalized sequences     │
          └───────────────────┬───────────────────┘
                              │
                              ▼
          ┌───────────────────────────────────────┐
          │       🧑 HUMAN APPROVAL GATE 🧑       │
          │   Review & approve email content      │
          └───────────────────┬───────────────────┘
                              │ approved
                              ▼
                    ┌───────────────────┐
                    │      QA AGENT     │
                    │  Final pre-send   │
                    └─────────┬─────────┘
                              │
                              ▼
          ┌───────────────────────────────────────┐
          │         6. OUTREACH AGENT             │
          │   Send sequences, track events        │
          └───────────────────┬───────────────────┘
                              │
              ┌───────────────┼───────────────┐
              │               │               │
              ▼               ▼               ▼
         ┌────────┐     ┌────────┐     ┌────────┐
         │ Opened │     │ Reply  │     │ Bounce │
         └────────┘     └───┬────┘     └───┬────┘
                            │              │
                            ▼              ▼
                    ┌─────────────┐   ┌──────────┐
                    │ 🧑 HUMAN    │   │ Retry/   │
                    │ FOLLOW-UP   │   │ Skip     │
                    └─────────────┘   └──────────┘
```

### 3.2 Job Queue Events

```javascript
// Event types and their triggers
const EVENTS = {
  // Campaign events
  'campaign.created': → spawn Discovery Agent
  'campaign.paused': → pause all active sequences
  'campaign.resumed': → resume sequences
  
  // Discovery events
  'discovery.complete': → spawn QA Agent (validate) → fan-out Research + Enrichment
  'discovery.failed': → notify user, retry with different source
  
  // Research events  
  'research.complete': → update prospect record, check if enrichment done
  'research.failed': → mark confidence=0, continue pipeline
  
  // Enrichment events
  'enrichment.complete': → update prospect, check if research done
  'enrichment.failed': → try waterfall (next provider), or skip prospect
  
  // Both complete triggers scoring
  'prospect.research_and_enrichment_complete': → spawn Scoring Agent
  
  // Scoring events
  'scoring.complete': → route by tier (A/B→Content, C→skip)
  
  // Content events
  'content.generated': → queue for human approval
  'content.approved': → spawn Outreach Agent
  'content.rejected': → regenerate with feedback
  
  // Outreach events
  'outreach.sent': → log event, schedule next step
  'outreach.opened': → log event, continue sequence
  'outreach.replied': → STOP sequence, notify human
  'outreach.bounced': → mark email invalid, try alternate
  'outreach.unsubscribed': → add to DNC list
};
```

---

## 4. Parallel vs Sequential

### Can Run in Parallel ✅

| Stage | Parallelism | Concurrency Limit |
|-------|-------------|-------------------|
| **Research** | Per-prospect | 10 concurrent |
| **Enrichment** | Per-prospect | 5 concurrent (API limits) |
| **Content Generation** | Per-prospect | 20 concurrent |
| **Outreach Sending** | Per-prospect | Rate-limited by provider |

### Must Be Sequential ⛔

| Stage | Reason |
|-------|--------|
| Discovery → QA | Need full list before deduplication |
| Research + Enrichment → Scoring | Need complete data to score |
| Content → Approval → Outreach | Human gate required |
| Outreach steps within sequence | Timing/response dependent |

### Parallel Fan-Out Pattern

```
Discovery completes with 100 prospects
          │
          ▼
    ┌─────────────────────────────────────────────┐
    │         PARALLEL FAN-OUT (10x)              │
    │  ┌─────┐ ┌─────┐ ┌─────┐ ... ┌─────┐       │
    │  │ R+E │ │ R+E │ │ R+E │     │ R+E │       │
    │  │ #1  │ │ #2  │ │ #3  │     │ #100│       │
    │  └──┬──┘ └──┬──┘ └──┬──┘     └──┬──┘       │
    └─────┼──────┼──────┼───────────┼────────────┘
          │      │      │           │
          ▼      ▼      ▼           ▼
    ┌─────────────────────────────────────────────┐
    │           SCORING (batch)                   │
    │   Score all 100 once R+E complete           │
    └─────────────────────────────────────────────┘
```

---

## 5. Human-in-the-Loop Checkpoints

### Required Approvals

| Checkpoint | What Human Reviews | Default Timeout |
|------------|-------------------|-----------------|
| **Content Approval** | Email sequences before sending | 24 hours |
| **Reply Handling** | Positive replies need manual follow-up | 1 hour alert |
| **Budget Approval** | If campaign will exceed credit limit | N/A - blocking |

### Optional Reviews (Configurable)

| Checkpoint | When to Enable | Default |
|------------|---------------|---------|
| **Tier A Manual Review** | High-value prospects | OFF |
| **New Campaign Start** | Conservative users | OFF |
| **Unusual Scoring** | Score outliers | ON |

### Approval UI Flow

```
┌────────────────────────────────────────────────────────────────┐
│                    APPROVAL QUEUE                              │
├────────────────────────────────────────────────────────────────┤
│ ⏳ 23 items awaiting approval                                  │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐│
│ │ Campaign: Denver Restaurants                                ││
│ │ Prospect: Joe's Diner                                       ││
│ │ Contact: Joe Smith (joe@joesdiner.com)                      ││
│ │                                                             ││
│ │ Subject: Quick thought about Joe's Diner's website          ││
│ │ ─────────────────────────────────────────────               ││
│ │ Hi Joe,                                                     ││
│ │                                                             ││
│ │ I noticed your website is loading slowly...                 ││
│ │ [Preview full sequence]                                     ││
│ │                                                             ││
│ │ [✅ Approve] [✏️ Edit] [❌ Reject] [⏭️ Skip Prospect]       ││
│ └─────────────────────────────────────────────────────────────┘│
│                                                                 │
│ [Approve All Similar] [Bulk Edit Template]                      │
└────────────────────────────────────────────────────────────────┘
```

---

## 6. Error Handling

### Error Categories

| Category | Example | Handling |
|----------|---------|----------|
| **Recoverable** | API timeout, rate limit | Retry with backoff |
| **Degraded** | One enrichment source fails | Use partial data, continue |
| **Blocking** | No email found | Skip prospect, log |
| **Critical** | Sending API down | Pause campaign, alert user |

### Retry Strategy

```javascript
const RETRY_CONFIG = {
  api_timeout: {
    max_attempts: 3,
    backoff: 'exponential', // 1s, 2s, 4s
    final_action: 'skip_and_log'
  },
  rate_limit: {
    max_attempts: 5,
    backoff: 'fixed', // wait until rate limit resets
    final_action: 'queue_for_later'
  },
  enrichment_miss: {
    max_attempts: 1, // per provider
    backoff: 'waterfall', // try next provider immediately
    final_action: 'continue_without'
  },
  critical_failure: {
    max_attempts: 1,
    backoff: 'none',
    final_action: 'pause_and_alert'
  }
};
```

### Graceful Degradation

| Component Failure | Degraded Behavior |
|-------------------|-------------------|
| Research Agent fails | Continue with enrichment data only, lower confidence |
| Enrichment fails | Continue with known data, skip if no email |
| Scoring fails | Default to Tier B, flag for review |
| Content fails | Use template fallback, mark as generic |
| Outreach fails | Queue for retry, alert after 3 failures |

### Error Reporting

```json
{
  "error_id": "err_123",
  "campaign_id": "camp_456",
  "prospect_id": "pros_789",
  "stage": "enrichment",
  "error_type": "api_failure",
  "message": "Hunter.io returned 500",
  "retry_count": 2,
  "final_status": "degraded",
  "data_impact": "No verified email, using pattern match",
  "timestamp": "2026-01-28T10:30:00Z"
}
```

---

## 7. Reusability Matrix

### Direct Port (No Changes)

| slc-lead-gen File | LeadGen SaaS Component |
|-------------------|------------------------|
| `services/website-scorer.js` | Research Agent tool |
| `services/business-scraper.js` | Research Agent tool |
| `v2/agents/content.md` | Content Agent prompt |
| `v2/agents/outreach.md` | Outreach Agent prompt |
| `templates/emails/*` | Content Agent templates |

### Adapt (Minor Changes)

| slc-lead-gen File | Changes Needed |
|-------------------|----------------|
| `v2/agents/researcher.md` | Add structured output format |
| `v2/agents/qualifier.md` | Rename to Scoring, add tier logic |
| `v2/agents/list-builder.md` | Split into Discovery + Enrichment |
| `services/lead-discovery.js` | Add API fallback, better dedup |
| `services/email-generator.js` | Add personalization tokens |

### New Development Required

| Component | Effort | Notes |
|-----------|--------|-------|
| QA Agent | 2-3 days | Validation logic, auto-fixes |
| Orchestrator/Queue | 3-5 days | BullMQ setup, event routing |
| API Layer | 3-5 days | Authentication, rate limiting |
| Dashboard UI | 5-7 days | Campaign management, approvals |
| Billing | 2-3 days | Stripe integration |

---

## 8. Spawn Commands

### Start Full Campaign

```bash
sessions_spawn task="Read ~/clawd/projects/leadgen-saas/agents/discovery-agent.md. Execute: {campaign_config_json}" label="discovery-{campaign_id}"
```

### Research Single Prospect

```bash
sessions_spawn task="Read ~/clawd/projects/leadgen-saas/agents/research-agent.md. Research: {prospect_json}" label="research-{prospect_id}"
```

### Generate Content Batch

```bash
sessions_spawn task="Read ~/clawd/projects/leadgen-saas/agents/content-agent.md. Generate for: {prospects_json}" label="content-{campaign_id}"
```

### QA Checkpoint

```bash
sessions_spawn task="Read ~/clawd/projects/leadgen-saas/agents/qa-agent.md. Validate stage={stage}: {data_json}" label="qa-{stage}-{batch_id}"
```

---

## Appendix A: Data Contracts

### Prospect Record (Complete)

```json
{
  "id": "uuid",
  "campaign_id": "uuid",
  "status": "enriched", // discovered | researched | enriched | scored | sequenced | contacted | replied | converted | rejected
  
  // From Discovery
  "company_name": "Joe's Diner",
  "address": "123 Main St, Denver, CO 80202",
  "phone": "+13035551234",
  "website": "https://joesdiner.com",
  "source": "google_maps",
  "source_id": "ChIJ...",
  "raw_discovery_data": {},
  
  // From Research
  "research": {
    "summary": "...",
    "pain_points": [],
    "opportunities": [],
    "website_analysis": {},
    "confidence": 0.85
  },
  
  // From Enrichment
  "contacts": [
    {
      "id": "uuid",
      "name": "Joe Smith",
      "title": "Owner",
      "email": "joe@joesdiner.com",
      "email_verified": true,
      "is_primary": true
    }
  ],
  "company_data": {
    "employee_count": "5-10",
    "revenue_estimate": "$500K-1M",
    "tech_stack": ["WordPress"]
  },
  
  // From Scoring
  "score": 78,
  "tier": "A",
  "scoring_breakdown": {},
  
  // From Outreach
  "sequences": [
    {
      "id": "uuid",
      "contact_id": "uuid",
      "status": "active",
      "current_step": 2,
      "events": []
    }
  ],
  
  // Metadata
  "created_at": "2026-01-28T10:00:00Z",
  "updated_at": "2026-01-28T12:00:00Z",
  "dnc": false,
  "dnc_reason": null
}
```

---

## Appendix B: Configuration Schema

### Campaign Config

```json
{
  "id": "uuid",
  "user_id": "uuid",
  "name": "Denver Restaurant Outreach",
  
  // Discovery settings
  "discovery": {
    "business_type": "restaurant",
    "location": "Denver, CO",
    "radius_miles": 25,
    "sources": ["google_maps", "yelp"],
    "filters": {
      "min_reviews": 10,
      "min_rating": 3.5,
      "exclude_chains": true
    },
    "max_prospects": 100
  },
  
  // Research settings
  "research": {
    "depth": "standard",
    "focus_areas": ["website_quality", "online_presence"]
  },
  
  // Scoring settings
  "scoring": {
    "icp_criteria": {
      "required_pain_points": ["website_issues"],
      "preferred_titles": ["Owner", "Manager"]
    },
    "tier_thresholds": {
      "A": 70,
      "B": 40
    }
  },
  
  // Content settings
  "content": {
    "tone": "friendly_professional",
    "sequence_length": 4,
    "offer": "Free website audit"
  },
  
  // Outreach settings
  "outreach": {
    "channel": "email",
    "from_name": "Sarah",
    "from_email": "sarah@webpro.agency",
    "send_time": "morning",
    "daily_limit": 50
  },
  
  // Approval settings
  "approvals": {
    "require_content_approval": true,
    "require_tier_a_review": false,
    "auto_approve_after_hours": 24
  }
}
```

---

**Specification Complete** ✅

*This spec provides the foundation for building the LeadGen SaaS agent swarm. Implementation should start with the core pipeline (Discovery → Enrichment → Scoring → Content → Outreach) and add QA checkpoints iteratively.*
