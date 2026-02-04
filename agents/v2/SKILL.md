# Agent Swarm v2.0

> Consolidated from 40+ job-description agents → 5 specialized agents with explicit handoffs

## Quick Routing

When Marb requests work, route to the appropriate agent:

| Request Type | Agent | Example Triggers |
|-------------|-------|------------------|
| Research, intel, analysis | `researcher` | "research X", "find info on", "analyze", "learn about" |
| Build prospect/company lists | `list-builder` | "find leads", "build a list", "who should we target" |
| Outreach campaigns | `outreach` | "write emails", "start a campaign", "reach out to" |
| Score/qualify leads | `qualifier` | "is this a good lead", "qualify", "score these" |
| Content/copy/design | `content` | "write copy", "design", "create landing page" |

## Architecture

```
                         ┌─────────────┐
          User Request → │ Orchestrator │ ← Claw (you)
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
                  (~/clawd/research/, ~/clawd/data/)
```

## Handoff Matrix

| From | Condition | To | Data Passed |
|------|-----------|-----|-------------|
| **Researcher** | Research complete, needs list | List Builder | Research findings, criteria |
| **Researcher** | Research complete, standalone | Return to User | Summary + file path |
| **List Builder** | List enriched | Outreach | `prospects.json` + notes |
| **Outreach** | Campaign sent | Qualifier | Campaign ID, reply routing |
| **Outreach** | Reply received | Qualifier | Reply + lead context |
| **Qualifier** | Hot lead (80+) | Human/Sales | Qualification brief |
| **Qualifier** | Warm lead | Outreach | Discovery sequence |
| **Qualifier** | Cold lead | Archive | Disqualification reason |
| **Content** | Asset complete | Outreach | Asset for campaign |

## Spawning Agents

### Basic Pattern
```
sessions_spawn task="Read ~/clawd/agents/v2/agents/{agent}.md. Then: {specific task}"
```

### Examples

**Research task:**
```
sessions_spawn task="Read ~/clawd/agents/v2/agents/researcher.md. Then: Research the ChatGPT advertising landscape" label="research-chatgpt-ads"
```

**Parallel research (multiple topics):**
```
sessions_spawn task="Read ~/clawd/agents/v2/agents/researcher.md. Research OpenAI's ad platform" label="research-openai"
sessions_spawn task="Read ~/clawd/agents/v2/agents/researcher.md. Research Google's AI ads" label="research-google"
```

**List building:**
```
sessions_spawn task="Read ~/clawd/agents/v2/agents/list-builder.md. Then: Build a list of Utah SaaS companies 10-100 employees" label="list-utah-saas"
```

**Full campaign workflow:**
```
sessions_spawn task="Read ~/clawd/agents/v2/workflows/new-campaign.md. Execute for [target]" label="campaign-[name]"
```

## Agent Files

| Agent | Location | Purpose |
|-------|----------|---------|
| Researcher | `agents/researcher.md` | Any intelligence gathering |
| List Builder | `agents/list-builder.md` | Prospect/company lists |
| Outreach | `agents/outreach.md` | Email/LinkedIn campaigns |
| Qualifier | `agents/qualifier.md` | Lead scoring & routing |
| Content | `agents/content.md` | Copy, pages, creative |

## Workflows

| Workflow | Location | Purpose |
|----------|----------|---------|
| New Campaign | `workflows/new-campaign.md` | End-to-end lead gen |

## When to Use This System

**Use v2 agents when:**
- Task matches an agent specialty (research, lists, outreach, etc.)
- Task would benefit from structured process
- Output needs consistent formatting
- Handoffs between capabilities are needed

**Use vanilla sessions_spawn when:**
- Simple one-off task
- Doesn't fit agent specialties
- Quick exploration/experimentation

## Shared Data Locations

```
~/clawd/research/           # All research output
~/clawd/research/{date}/    # Date-organized findings
~/clawd/data/lists/         # Prospect lists
~/clawd/data/campaigns/     # Campaign assets
```

## Adding New Agents

To add a new specialized agent:

1. Create `agents/{name}.md` with:
   - Identity section
   - Triggers (when to activate)
   - Tools available
   - Process/instructions
   - Output format
   - Handoff rules
   - Anti-patterns

2. Update this SKILL.md routing table

3. Update handoff matrix if needed
