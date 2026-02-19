# SLC Lead Gen Agent Architecture: Analysis & Recommendations

**Research Date:** 2026-01-26  
**Current Setup:** ~/clawd/projects/slc-lead-gen/teams/

---

## Current Architecture Analysis

### Existing Team Structure

You have **3 team files** defining approximately **40 agent roles** across:

| Team | File | Agent Count | Focus |
|------|------|-------------|-------|
| **Lead Gen Team** | lead-gen-team.md | ~20 agents | Pipeline, outbound, inbound, data, qualification |
| **Research Team** | research-team.md | ~12 agents | Market research, competitive intel, analytics |
| **Design Team** | design-team.md | ~10 agents | UX, UI, brand, content |

### Observed Patterns

**Strengths:**
- ✅ Clear hierarchical structure (Director → Leads → Specialists)
- ✅ Well-defined roles and responsibilities
- ✅ Logical groupings by function
- ✅ KPIs and deliverables defined
- ✅ Workflow diagrams included

**Potential Issues:**
- ⚠️ 40 agents is a LOT—likely overkill for actual execution
- ⚠️ Many roles are job descriptions, not agent specifications
- ⚠️ No handoff protocols defined
- ⚠️ No tool assignments per agent
- ⚠️ No activation triggers or routing logic
- ⚠️ Appears designed for human org charts, not AI orchestration

---

## Key Recommendation: Simplify Dramatically

Based on best practices research, **40 agents is excessive**. The Anthropic engineering team explicitly warns:

> "Agentic systems often trade latency and cost for better task performance, and you should consider when this tradeoff makes sense."

### Recommended Agent Count: 5-10 Active Agents

Most successful multi-agent systems use **3-7 specialized agents** maximum, with clear handoff logic.

---

## Proposed Refined Architecture

### Option A: Hierarchical Coordinator Model

```
                    ┌─────────────────────┐
                    │   Lead Gen Orchestrator   │
                    │   (Task routing & synthesis)   │
                    └───────────┬─────────┘
           ┌────────────────────┼────────────────────┐
           │                    │                    │
    ┌──────▼──────┐     ┌──────▼──────┐     ┌──────▼──────┐
    │  Researcher  │     │   Outreach   │     │   Qualifier  │
    │  (Intel/Data)│     │  (Campaigns)  │     │  (Scoring)   │
    └──────────────┘     └──────────────┘     └──────────────┘
```

**5 Core Agents:**

| Agent | Role | Tools |
|-------|------|-------|
| **Orchestrator** | Route tasks, synthesize outputs, manage workflow | Task routing, agent handoffs |
| **Researcher** | Market intel, competitor analysis, prospect research | Web search, data enrichment APIs |
| **List Builder** | Build/enrich prospect lists, ICP matching | CRM, data sources, enrichment |
| **Outreach Specialist** | Create campaigns, personalize messaging | Email tools, LinkedIn, templates |
| **Qualifier** | Score leads, conduct discovery, determine fit | CRM, scoring model, calendar |

---

### Option B: Pipeline Model (Sequential)

```
Research → List Build → Enrich → Outreach → Qualify → Handoff
```

**4 Stage Agents + 1 Coordinator:**

| Stage | Agent | Input | Output |
|-------|-------|-------|--------|
| 1 | **Market Researcher** | ICP criteria | Target companies, trends |
| 2 | **List Builder** | Target criteria | Raw prospect list |
| 3 | **Enrichment Agent** | Raw list | Enriched contacts |
| 4 | **Outreach Agent** | Enriched contacts | Campaign sequences |
| 5 | **Qualifier** | Responses | Qualified/Nurture routing |

---

### Option C: Swarm Model (Most Flexible)

```
┌─────────────────────────────────────────┐
│           Shared Lead Context           │
└─────────────────────────────────────────┘
      ↑↓           ↑↓           ↑↓
┌──────────┐ ┌──────────┐ ┌──────────┐
│ Research │ │ Outreach │ │ Qualify  │
│  Swarm   │ │  Swarm   │ │  Swarm   │
└──────────┘ └──────────┘ └──────────┘
```

Agents work independently on shared lead pool, self-organizing based on lead state.

---

## Specific Recommendations

### 1. Convert Job Descriptions to Agent Specifications

**Current (Human Org Chart):**
```markdown
### Email Specialist
**Focus:** Cold email campaigns, sequences, deliverability
**Responsibilities:**
- Write and test email copy
- Build email sequences
- Monitor deliverability and reputation
- A/B test subject lines and CTAs
```

**Recommended (Agent Spec):**
```markdown
### Email Outreach Agent
**Triggers:** Lead marked "ready-for-outreach" in CRM
**Instructions:** |
  You craft personalized cold emails using company/contact context.
  Follow the AIDA framework. Keep emails under 125 words.
  Reference specific pain points from research data.
**Tools:**
  - read_lead_context
  - generate_email_sequence
  - submit_to_queue
**Handoffs:**
  - On email sent → Monitor Agent
  - On reply received → Qualifier Agent
**Evaluation:** Open rate > 40%, Reply rate > 5%
```

### 2. Define Explicit Handoff Conditions

Create a **handoff matrix**:

| From Agent | Condition | To Agent |
|------------|-----------|----------|
| Researcher | prospect_list_complete | List Builder |
| List Builder | contacts_enriched | Outreach Agent |
| Outreach Agent | email_sequence_sent | Monitor Agent |
| Monitor Agent | positive_reply | Qualifier Agent |
| Qualifier Agent | qualified==true | Sales Handoff |
| Qualifier Agent | qualified==false | Nurture Agent |

### 3. Assign Tools to Each Agent

```yaml
agents:
  researcher:
    tools:
      - web_search
      - company_lookup
      - industry_report_access
    max_tokens: 4000
    
  list_builder:
    tools:
      - apollo_search
      - linkedin_search
      - crm_write
    max_tokens: 2000
    
  outreach_agent:
    tools:
      - email_template_library
      - personalization_engine
      - sequence_builder
    max_tokens: 3000
```

### 4. Implement Progressive Disclosure for Agent Instructions

**Instead of:** Loading all 40 agent definitions into context

**Do:** Load only the agent instructions needed for current task

```python
# Orchestrator decides which agent to invoke
if task_type == "research":
    load_agent("researcher")
elif task_type == "outreach":
    load_agent("outreach_agent")
```

### 5. Create a Skill for Lead Gen

Convert your workflow into a proper **Agent Skill**:

```
slc-lead-gen-skill/
├── SKILL.md              # Core instructions, routing logic
├── agents/               # Individual agent definitions
│   ├── researcher.md
│   ├── list-builder.md
│   └── outreach.md
├── workflows/            # Multi-step procedures
│   ├── prospect-research.md
│   └── campaign-launch.md
├── templates/            # Email templates, scoring rubrics
│   ├── cold-email-templates.md
│   └── qualification-criteria.md
└── scripts/              # Automation code
    ├── crm-sync.py
    └── enrichment.py
```

### 6. Consolidate Similar Roles

**Current (Redundant):**
- Outbound Lead Manager
- Email Specialist  
- LinkedIn Specialist
- Cold Calling Specialist
- Multi-Channel Coordinator

**Recommended (Consolidated):**
- **Outreach Agent** (handles all channels, uses channel-specific tools)

**Current (Redundant):**
- Market Research Lead
- Industry Analyst
- Survey Specialist

**Recommended (Consolidated):**
- **Research Agent** (handles all research types, routes to appropriate tools)

---

## Implementation Roadmap

### Phase 1: Simplify (Week 1)
1. [ ] Audit all 40 roles for actual uniqueness
2. [ ] Consolidate to 6-8 core agents
3. [ ] Define tools each agent needs

### Phase 2: Specify (Week 2)
1. [ ] Convert role descriptions to agent specs
2. [ ] Create handoff matrix
3. [ ] Write activation triggers

### Phase 3: Build (Week 3)
1. [ ] Implement as Agent Skill
2. [ ] Test individual agents
3. [ ] Test handoff flows

### Phase 4: Evaluate (Week 4)
1. [ ] Run on sample leads
2. [ ] Measure KPIs
3. [ ] Iterate based on failures

---

## Quick Wins

### Immediate Actions
1. **Merge Design Team into main orchestrator** - They're downstream consumers, not lead gen agents
2. **Combine all "Analyst" roles** into one Research Agent with multiple tools
3. **Remove "Manager" agents** - LLM orchestrator handles management
4. **Keep "Coordinator" roles as skills/workflows**, not agents

### File Structure Suggestion
```
~/clawd/projects/slc-lead-gen/
├── SKILL.md                 # Main skill entry point
├── agents/
│   ├── orchestrator.md     # Routes tasks
│   ├── researcher.md       # All research
│   ├── list-builder.md     # Build/enrich lists
│   ├── outreach.md         # All outreach channels
│   └── qualifier.md        # Lead scoring
├── workflows/
│   ├── new-campaign.md
│   └── lead-qualification.md
├── templates/
│   └── email-sequences/
├── scripts/
│   └── crm-integration/
└── teams/                   # Archive original for reference
    ├── lead-gen-team.md
    ├── research-team.md
    └── design-team.md
```

---

## Summary

| Metric | Current | Recommended |
|--------|---------|-------------|
| **Total Agents** | ~40 | 5-8 |
| **Teams** | 3 hierarchical | 1 orchestrated |
| **Handoff Logic** | Implicit | Explicit matrix |
| **Tool Assignment** | None | Per-agent |
| **Activation Triggers** | None | Defined |
| **Skill Format** | Job descriptions | Agent specifications |

**The goal isn't fewer agents for the sake of it—it's the right number of agents with clear responsibilities, tools, and handoffs that actually execute.**
