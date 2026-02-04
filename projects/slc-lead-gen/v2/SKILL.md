# SLC Lead Gen - Agent Skill v2.0

> Consolidated from 40 agents → 6 specialized agents with explicit handoffs

## Quick Start

When Marb asks for lead gen work, route to the appropriate agent:

| Request Type | Agent | Example Triggers |
|-------------|-------|------------------|
| Research, intel, analysis | `researcher` | "research [company/market]", "find info on", "analyze" |
| Build prospect lists | `list-builder` | "find leads", "build a list", "who should we target" |
| Outreach campaigns | `outreach` | "write emails", "start a campaign", "reach out to" |
| Score/qualify leads | `qualifier` | "is this a good lead", "qualify", "score these" |
| Content/design work | `content` | "write copy", "design", "create landing page" |

## Architecture

```
                         ┌─────────────┐
          User Request → │ Orchestrator │ ← You (Claw)
                         └──────┬──────┘
                                │ routes to
        ┌───────────┬───────────┼───────────┬───────────┐
        ▼           ▼           ▼           ▼           ▼
  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
  │Researcher│ │List      │ │Outreach  │ │Qualifier │ │Content   │
  │          │ │Builder   │ │          │ │          │ │          │
  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘
       │            │            │            │            │
       └────────────┴─────┬──────┴────────────┴────────────┘
                          ▼
                   Shared Context
              (~/clawd/projects/slc-lead-gen/data/)
```

## Handoff Matrix

| From | Condition | To | Data Passed |
|------|-----------|-----|-------------|
| **Researcher** | research complete | List Builder | `research/{date}/{topic}.md` |
| **List Builder** | list enriched | Outreach | `lists/{campaign}/prospects.json` |
| **Outreach** | campaign sent | Qualifier | `campaigns/{id}/sent.json` |
| **Outreach** | reply received | Qualifier | reply content + lead context |
| **Qualifier** | qualified=true | Human handoff | qualified lead summary |
| **Qualifier** | qualified=false | Nurture list | `lists/nurture.json` |
| **Content** | asset complete | Outreach | asset path for campaign use |

## Spawning Agents

```bash
# Research task
sessions_spawn task="Read agents/researcher.md. Then: [specific research request]"

# Parallel research (multiple topics)
sessions_spawn task="Read agents/researcher.md. Research [topic1]" label="research-topic1"
sessions_spawn task="Read agents/researcher.md. Research [topic2]" label="research-topic2"

# Full campaign workflow
sessions_spawn task="Read workflows/new-campaign.md. Execute for [target]" label="campaign-[name]"
```

## File Structure

```
v2/
├── SKILL.md                    # This file (routing + orchestration)
├── agents/
│   ├── researcher.md           # Market intel, competitor analysis, prospect research
│   ├── list-builder.md         # Build/enrich prospect lists, ICP matching
│   ├── outreach.md             # Email, LinkedIn, multi-channel campaigns
│   ├── qualifier.md            # Lead scoring, qualification, discovery
│   └── content.md              # Copy, landing pages, creative assets
├── workflows/
│   ├── new-campaign.md         # End-to-end campaign launch
│   ├── prospect-research.md    # Deep-dive on specific prospect
│   └── competitive-analysis.md # Market/competitor research
├── templates/
│   ├── emails/                 # Email sequence templates
│   ├── scoring/                # Qualification rubrics
│   └── icp/                    # Ideal Customer Profile templates
└── data/                       # Runtime data (gitignored)
    ├── research/
    ├── lists/
    └── campaigns/
```

## ICP (Ideal Customer Profile)

Update this as we refine targeting:

```yaml
target_companies:
  size: 10-200 employees
  revenue: $1M-$50M
  industries:
    - SaaS / Tech
    - Professional Services
    - E-commerce
  locations:
    - Salt Lake City metro
    - Utah (statewide)
    - Remote-first companies
  signals:
    - Recently funded
    - Hiring for growth roles
    - Using outdated tech stack
    - Competitor customer

target_contacts:
  titles:
    - CEO, Founder, Owner
    - VP Marketing, CMO
    - VP Sales, CRO
    - Head of Growth
  seniority: Director+
```

## Usage Examples

### Quick Research
```
"Research the SaaS market in Utah"
→ Spawn researcher agent
→ Output: research/2026-01-26/utah-saas-market.md
```

### Build a Campaign
```
"Build an outreach campaign for fintech startups"
→ Spawn researcher (market intel)
→ Handoff to list-builder (find prospects)
→ Handoff to content (write emails)
→ Handoff to outreach (launch sequences)
→ Monitor replies → qualifier
```

### Score Inbound Leads
```
"Qualify these 5 leads that came in"
→ Spawn qualifier agent
→ Output: scored leads with recommendations
```
