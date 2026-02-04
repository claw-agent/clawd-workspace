# SLC Lead Gen - Architecture Overview

## Philosophy
Specialized agents with narrow focus, coordinated by managers.
Small tasks → Better output → Parallel execution.

---

## Organizational Structure

```
                        ┌─────────────────┐
                        │ Project Manager │
                        │   (Marb/Claw)   │
                        └────────┬────────┘
                                 │
        ┌────────────────────────┼────────────────────────┐
        │                        │                        │
┌───────┴───────┐       ┌───────┴───────┐       ┌───────┴───────┐
│    Research   │       │    Design     │       │   Lead Gen    │
│    Director   │       │   Director    │       │   Director    │
└───────┬───────┘       └───────┬───────┘       └───────┬───────┘
        │                       │                       │
   ┌────┴────┐             ┌────┴────┐             ┌────┴────┐
   │         │             │         │             │         │
Market   Comp Intel     UX Team   UI Team      Outbound  Inbound
Research    Unit           │         │          Unit     Unit
  Unit       │         ┌───┴───┐ ┌───┴───┐         │         │
   │         │         │       │ │       │    ┌────┴────┐    │
   │    ┌────┴────┐   UX    Inter- UI   Visual Email LinkedIn SEO
   │    │         │  Lead   action Lead Designer Spec  Spec   Spec
   │  Product  Pricing      Designer      │
   │  Analyst  Analyst              Motion    Data      Qualification
   │                                Designer  Enrichment    Unit
Data &                                        Unit
Analytics                                        │
  Unit                              ┌────────────┴────────────┐
                                    │                         │
                               List Builder              SDR/BDR
                               CRM Admin            Meeting Scheduler
```

---

## Team Details

### Research Team (14 agents)
See: `teams/research-team.md`

| Role | Focus |
|------|-------|
| Research Director | Strategy, synthesis, QC |
| Market Research Lead | Industry trends, sizing |
| Industry Analyst | Vertical expertise |
| Survey Specialist | Quantitative research |
| Competitive Intel Lead | Competitor tracking |
| Product Analyst | Feature comparison |
| Pricing Analyst | Pricing models |
| Data Analyst | Dashboards, reporting |
| Web/Social Analyst | Digital footprint |
| Trend Forecaster | Predictive analysis |
| Research Coordinator | Operations |
| Knowledge Manager | Documentation |

### Design Team (10 agents)
See: `teams/design-team.md`

| Role | Focus |
|------|-------|
| Design Director | Coordination, brand consistency |
| Senior UX Designer | Flows, wireframes, IA |
| UX Researcher | User studies, personas |
| Interaction Designer | Micro-interactions |
| Senior UI Designer | Design system, mockups |
| Visual Designer | Graphics, illustrations |
| Motion Designer | Animations, video |
| Brand Designer | Identity, guidelines |
| Content Designer | UX writing, microcopy |

### Lead Gen Team (16 agents)
See: `teams/lead-gen-team.md`

| Role | Focus |
|------|-------|
| Lead Gen Director | Pipeline strategy |
| Outbound Lead Manager | Campaign strategy |
| Email Specialist | Cold email |
| LinkedIn Specialist | Social selling |
| Cold Calling Specialist | Phone outreach |
| Multi-Channel Coordinator | Sequence orchestration |
| Inbound Lead Manager | Lead capture |
| SEO/Content Specialist | Organic traffic |
| Paid Acquisition Specialist | PPC, paid social |
| Conversion Optimizer | Landing pages |
| Data Enrichment Lead | Data quality |
| List Builder | Target lists |
| CRM Administrator | Workflows |
| Qualification Lead | Lead scoring |
| SDR/BDR | Discovery calls |
| Meeting Scheduler | Calendar management |
| Pipeline Analyst | Metrics |
| Campaign Analyst | Attribution |

---

## Technology Stack

### Core
- **Runtime**: Node.js + TypeScript
- **AI**: Claude (Opus/Sonnet) via Clawdbot
- **Orchestration**: Clawdbot sessions_spawn

### Data
- **Storage**: JSON files → migrate to Supabase
- **CRM**: Apollo.io API
- **Enrichment**: Apollo + custom scrapers

### Communication
- **Email**: Instantly.ai API
- **Voice**: Twilio + 3CX
- **SMS**: Twilio
- **LinkedIn**: Browserless automation

### Web
- **Scraping**: Puppeteer, Jina Reader
- **Search**: Perplexity API

---

## Services

### Call Webhook Server
`services/call-webhook-server.js`
- Port: 3001
- Handles Twilio voice/SMS webhooks
- Handles 3CX call events
- Transcription callbacks

### Twilio Client
`services/twilio-client.js`
- Outbound calls and SMS
- TwiML generation
- Call/message management

---

## Data Flow

```
                    ┌─────────────┐
                    │   Sources   │
                    │ (Web, APIs) │
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
         ┌────┴────┐  ┌────┴────┐  ┌────┴────┐
         │ Apollo  │  │ Scraped │  │ Manual  │
         │  Data   │  │  Data   │  │  Input  │
         └────┬────┘  └────┬────┘  └────┬────┘
              │            │            │
              └────────────┼────────────┘
                           │
                    ┌──────┴──────┐
                    │    Data     │
                    │ Enrichment  │
                    └──────┬──────┘
                           │
                    ┌──────┴──────┐
                    │    Lead     │
                    │   Scoring   │
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
         ┌────┴────┐  ┌────┴────┐  ┌────┴────┐
         │  Email  │  │ LinkedIn │  │  Phone  │
         │ Sequence│  │ Outreach │  │  Calls  │
         └────┬────┘  └────┬────┘  └────┬────┘
              │            │            │
              └────────────┼────────────┘
                           │
                    ┌──────┴──────┐
                    │ Qualification│
                    │    Team     │
                    └──────┬──────┘
                           │
                    ┌──────┴──────┐
                    │   Meeting   │
                    │   Booked    │
                    └─────────────┘
```

---

## File Structure

```
slc-lead-gen/
├── architecture.md          # This file
├── README.md               # Quick start
├── config/
│   ├── telephony.env.example
│   └── api-keys.env.example
├── services/
│   ├── call-webhook-server.js
│   └── twilio-client.js
├── teams/
│   ├── research-team.md
│   ├── design-team.md
│   └── lead-gen-team.md
├── agents/
│   ├── research/
│   ├── design/
│   └── lead-gen/
├── data/
│   ├── companies/
│   ├── contacts/
│   └── campaigns/
├── docs/
│   ├── telephony-setup.md
│   └── api-integrations.md
└── scripts/
    └── setup.sh
```

---

## Getting Started

1. Copy env examples and fill in API keys
2. Start webhook server: `node services/call-webhook-server.js`
3. Configure Twilio webhooks (see docs/telephony-setup.md)
4. Run initial research sweep
5. Begin outreach campaigns
