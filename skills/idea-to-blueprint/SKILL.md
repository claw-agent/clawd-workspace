---
name: idea-to-blueprint
description: Transform a business idea into a complete execution blueprint. Use when Marb has a new product/startup idea and wants full research, technical architecture, UI design, brand identity, agent specs, bootstrapped business plan, and master blueprint PDF. Spawns a coordinated agent swarm to produce founder-ready documentation in ~30 minutes. Defaults to bootstrapped approach (no VC, AI agents + solo founder).
---

# Idea to Blueprint

Transform a raw business idea into a comprehensive execution blueprint with one command.

## Philosophy: Bootstrapped by Default

We don't write traditional VC-seeking business plans. Our model:

- **No funding required** — $150-300/mo in API costs
- **No hiring** — AI agents replace traditional team roles
- **Profitable fast** — break-even at 2-3 customers
- **100% ownership** — no dilution, no board, no pressure

The agent swarm (architect, designer, brand, engineers) does the work that would traditionally require 5-10 employees and $500K in runway. This changes everything about how to plan a business.

## What It Produces

| Document | Pages | Contents |
|----------|-------|----------|
| Research Report | 15-20 | Market analysis, competitive landscape, pricing, GTM strategy |
| Technical Architecture | 10-15 | Stack decisions, DB schema, API design, infrastructure, costs |
| UI/UX Spec | 8-12 | User flows, wireframes, component library, onboarding |
| Brand Guide | 5-8 | Name options, taglines, voice, visual direction, domains |
| Agent Swarm Spec | 8-12 | Agent roster, prompts, orchestration, error handling |
| Bootstrapped Plan | 20-30 | No-VC playbook: costs, 90-day execution, path to $10K MRR |
| Traditional Business Plan | 40-50 | Investor-grade: 3-year projections, funding ask, full financials |
| Master Blueprint | 35-45 | Everything combined into one cohesive document |

## Workflow

### Phase 1: Research (10-15 min)

Spawn research orchestrator to analyze the market:

```
sessions_spawn task="You are researching a new [PRODUCT TYPE] product.

**Idea:** [USER'S IDEA DESCRIPTION]

**Your Mission:**
Create a comprehensive research report at ~/clawd/projects/[project-name]/RESEARCH-REPORT.md

Include:
1. Executive Summary with clear recommendation
2. Competitive Landscape (5-10 competitors with pricing, features, gaps)
3. Tools & APIs Analysis (what we'd need to build it, costs)
4. Architecture Overview (high-level system design)
5. Pricing Model (tiers, unit economics)
6. MVP Feature Spec (what to build first, effort estimates)
7. Go-to-Market Strategy (ICPs, channels, positioning)

Use web_search for current competitor data. Make decisions, don't hedge.
Generate PDF using Typst when complete."
label="[project]-research"
```

### Phase 2: Full-Stack Team (15-20 min, parallel)

After research completes, spawn 4 agents in parallel:

#### Architect Agent
```
sessions_spawn task="Read ~/clawd/projects/[project]/RESEARCH-REPORT.md

Create ~/clawd/projects/[project]/architecture/TECHNICAL-ARCHITECTURE.md

Include:
1. System Architecture Diagram (ASCII)
2. Infrastructure Decisions (hosting, DB, queue, auth) with comparison tables
3. Complete SQL Schema with RLS
4. API Design (tRPC or REST)
5. Third-Party Integrations
6. Security Considerations
7. CI/CD Pipeline
8. Cost Estimates at 100/1K/10K users
9. Reusable Components from existing code

Pick the best options. No hedging."
label="[project]-architect"
```

#### Designer Agent
```
sessions_spawn task="Read ~/clawd/projects/[project]/RESEARCH-REPORT.md

Create ~/clawd/projects/[project]/design/UI-SPEC.md

Include:
1. User Flows (signup → core action → value delivery)
2. Key Screens (dashboard, main views, settings) with ASCII wireframes
3. Component Library (shadcn/ui base + custom components)
4. Realtime Elements (live progress, WebSocket patterns)
5. Mobile Considerations
6. Onboarding Flow (get to 'aha moment' fast)
7. Inspiration/References (competitor screenshots, design systems)"
label="[project]-designer"
```

#### Brand Agent
```
sessions_spawn task="Read ~/clawd/projects/[project]/RESEARCH-REPORT.md

Create ~/clawd/projects/[project]/brand/BRAND-GUIDE.md

Include:
1. Product Name Options (5-10 with domain/social availability via web_search)
2. Taglines (3-5 per top name)
3. Brand Voice (how we communicate)
4. Positioning Statement
5. Competitive Differentiation Messaging
6. Visual Direction (colors, typography, vibe)

Prioritize short names without 'AI', available .com domains."
label="[project]-brand"
```

#### Swarm Engineer Agent
```
sessions_spawn task="Read ~/clawd/projects/[project]/RESEARCH-REPORT.md

Create ~/clawd/projects/[project]/agents/SWARM-SPEC.md

Include:
1. Agent Roster (all agents needed with purpose)
2. For Each Agent: inputs, outputs, tools, prompt template
3. Orchestration Flow (how agents hand off)
4. Parallel vs Sequential execution
5. Human-in-the-Loop checkpoints
6. Error Handling

Create individual agent prompt files in ~/clawd/projects/[project]/agents/"
label="[project]-swarm-engineer"
```

### Phase 3: Document Compilation (5-10 min, parallel)

After all Phase 2 agents complete, spawn 3 final agents:

#### Business Plan Writer — Bootstrapped Version
```
sessions_spawn task="Read all files in ~/clawd/projects/[project]/

Create ~/clawd/projects/[project]/[PROJECT]-BOOTSTRAPPED-PLAN.pdf using Typst

**Bootstrapped approach — no VC, no hiring, AI agents + solo founder.**

Structure:
1. Executive Summary — Solo founder + AI agent swarm, profitable at 3 customers
2. The AI-Native Advantage — Why this works in 2026, agent vs human cost comparison
3. Startup Costs — Domain ($12), that's it
4. Operating Costs — Monthly API costs (~$150-300/mo breakdown)
5. Revenue Model — Pricing tiers, break-even at 2-3 customers
6. 90-Day Execution Plan — Week-by-week from MVP to $3K MRR
7. The Agent Team — List all agents, show what traditional hires they replace
8. Competitive Moat — Speed, cost, iteration advantages
9. Risk Analysis — No runway anxiety, main risk is founder time
10. Financial Projections — Conservative month-by-month to $15K MRR
11. Why NOT Raise — Keep 100% equity, no board, pivot freely

Tone: Confident, practical, anti-VC-hype. Show the math.
Target 20-30 pages."
label="[project]-bootstrapped-plan"
```

#### Business Plan Writer — Traditional/VC Version
```
sessions_spawn task="Read all files in ~/clawd/projects/[project]/

Create ~/clawd/projects/[project]/[PROJECT]-BUSINESS-PLAN.pdf using Typst

**Traditional investor-grade business plan (for if/when you want outside capital).**

Structure:
1. Executive Summary (company, product, market, financials, funding ask)
2. Company Description (structure, team, mission)
3. Market Analysis (TAM/SAM/SOM, trends, competition)
4. Products and Services (features, tech, roadmap)
5. Marketing and Sales (GTM, pricing, partnerships)
6. Operations (stack, timeline, hiring plan)
7. Financial Projections (3-year, unit economics, break-even)
8. Funding Requirements (amount, use of funds, milestones)
9. Risk Analysis (risks + mitigations)
10. Appendix (detailed tables, schemas)

Target 40-50 pages, investor-grade."
label="[project]-business-plan"
```

#### Master Blueprint Compiler
```
sessions_spawn task="Compile all specs into one master PDF.

Source files:
- ~/clawd/projects/[project]/RESEARCH-REPORT.md
- ~/clawd/projects/[project]/architecture/TECHNICAL-ARCHITECTURE.md
- ~/clawd/projects/[project]/design/UI-SPEC.md
- ~/clawd/projects/[project]/brand/BRAND-GUIDE.md
- ~/clawd/projects/[project]/agents/SWARM-SPEC.md

Create ~/clawd/projects/[project]/[PROJECT]-MASTER-BLUEPRINT.pdf using Typst

Structure:
1. Cover Page (logo concept, title, date)
2. Table of Contents
3. Executive Summary (key decisions distilled)
4. Part I: Market & Strategy
5. Part II: Product Design
6. Part III: Technical Architecture
7. Part IV: Brand Identity
8. Part V: Agent Swarm
9. Appendix: Implementation Timeline

Target 35-45 pages, professional formatting."
label="[project]-master-blueprint"
```

## Quick Start

When Marb says something like "I have an idea for X" or "Let's blueprint Y":

1. Create project folder: `~/clawd/projects/[project-name]/`
2. Clarify the idea if needed (target market, key features, differentiators)
3. Run Phase 1 (research)
4. Wait for completion, then run Phase 2 (4 parallel agents)
5. Wait for completion, then run Phase 3 (2 parallel agents)
6. Send all PDFs via Telegram

## Example Output Structure

```
~/clawd/projects/tapflow/
├── RESEARCH-REPORT.md
├── RESEARCH-REPORT.pdf
├── TAPFLOW-BUSINESS-PLAN.pdf
├── TAPFLOW-MASTER-BLUEPRINT.pdf
├── architecture/
│   └── TECHNICAL-ARCHITECTURE.md
├── design/
│   └── UI-SPEC.md
├── brand/
│   └── BRAND-GUIDE.md
└── agents/
    ├── SWARM-SPEC.md
    ├── discovery-agent.md
    ├── research-agent.md
    └── ...
```

## Timing

| Phase | Duration | Agents |
|-------|----------|--------|
| Research | 10-15 min | 1 |
| Full-Stack Team | 15-20 min | 4 (parallel) |
| Compilation | 5-10 min | 3 (parallel) |
| **Total** | **30-45 min** | 8 |

## Notes

- All agents use Claude Opus for quality
- Web search enabled for market research
- Typst used for PDF generation (professional formatting)
- Business plan defaults to **bootstrapped** (no VC) — shows path to profitability with ~$300/mo
- Master blueprint is founder-ready and can be shared with partners, early customers, or future investors (if you ever want them)
