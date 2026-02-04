#set page(margin: (x: 1in, y: 1in))
#set text(font: "New Computer Modern", size: 11pt)
#set heading(numbering: "1.1")
#show heading.where(level: 1): it => [
  #pagebreak(weak: true)
  #text(size: 18pt, weight: "bold")[#it]
]
#show heading.where(level: 2): it => text(size: 14pt, weight: "bold")[#it]
#show heading.where(level: 3): it => text(size: 12pt, weight: "bold")[#it]
#show raw.where(block: true): it => block(
  fill: luma(245),
  inset: 10pt,
  radius: 4pt,
  width: 100%,
  it
)

#align(center)[
  #text(size: 24pt, weight: "bold")[Tapflow]
  #v(0.3em)
  #text(size: 18pt)[Technical Architecture]
  #v(1em)
  #text(size: 12pt, fill: gray)[Version 1.0 — January 28, 2026]
  #v(0.5em)
  #text(size: 11pt, fill: gray)[Final Decisions • Ship in 4 Weeks]
]

#v(2em)

= Executive Summary

This document defines the complete technical architecture for Tapflow, the AI-powered Lead Generation SaaS. Every decision is final—no hedging. The goal: *ship MVP in 4 weeks, scale to 10K users without re-architecture*.

== Stack at a Glance

#table(
  columns: (auto, auto, 1fr),
  inset: 8pt,
  align: (left, left, left),
  [*Layer*], [*Decision*], [*Reason*],
  [Hosting], [Vercel], [Zero-ops, edge functions, generous free tier],
  [Database], [Supabase], [Postgres + Auth + Realtime in one],
  [Queue], [Inngest], [Serverless-native, no Redis to manage],
  [Auth], [Supabase Auth], [Already using Supabase, one less vendor],
  [AI], [Claude Sonnet 4], [Best cost/quality for writing tasks],
  [Email], [Resend + Instantly], [Modern APIs, best deliverability],
  [Payments], [Stripe], [Industry standard],
)

= System Architecture

#align(center)[
  #rect(inset: 15pt, radius: 5pt, fill: luma(250))[
    #text(size: 9pt, font: "Courier New")[
```
┌─────────────────────────────────────────────────────┐
│                  USER INTERFACE                     │
│  Dashboard │ Campaign Builder │ Leads │ Settings   │
│                    Next.js 14                       │
└────────────────────────┬────────────────────────────┘
                         │
                         ▼
┌────────────────────────────────────────────────────┐
│              API LAYER (Vercel)                    │
│    tRPC Router: campaigns│leads│outreach│billing  │
└──────────┬────────────────────────────┬────────────┘
           │                            │
           ▼                            ▼
┌──────────────────┐        ┌───────────────────────┐
│ SUPABASE         │        │ INNGEST QUEUE         │
│ ├─ Postgres      │        │ ├─ discovery          │
│ ├─ Auth          │        │ ├─ enrich             │
│ ├─ Realtime      │        │ ├─ score              │
│ └─ RLS           │        │ ├─ research           │
└──────────────────┘        │ └─ send_outreach      │
                            └───────────┬───────────┘
                                        │
           ┌────────────────────────────┼────────────┐
           ▼                            ▼            ▼
┌──────────────────┐  ┌──────────────────┐  ┌───────────────┐
│ DATA SOURCES     │  │ EMAIL SERVICES   │  │ AI SERVICES   │
│ ├─ Google Maps   │  │ ├─ Hunter.io     │  │ ├─ Claude     │
│ ├─ Yelp          │  │ ├─ Resend        │  │ └─ Firecrawl  │
│ └─ Apollo        │  │ └─ Instantly     │  └───────────────┘
└──────────────────┘  └──────────────────┘
```
    ]
  ]
]

= Infrastructure Decisions

== Hosting: Vercel

*Decision:* Vercel \
*Rejected:* Railway, AWS

#table(
  columns: (1fr, auto, auto, auto),
  inset: 8pt,
  [*Factor*], [*Vercel*], [*Railway*], [*AWS*],
  [Zero-config deploy], [Yes], [Yes], [No],
  [Edge functions], [Global], [Regional], [Complex],
  [Free tier], [100GB BW], [5 credit], [Pay-per-use],
  [Next.js native], [Yes], [Good], [Manual],
  [Ops overhead], [Zero], [Low], [High],
)

*Reasoning:* We're building Next.js—Vercel made Next.js. Zero ops = ship faster.

== Database: Supabase

*Decision:* Supabase \
*Rejected:* PlanetScale, Neon

#table(
  columns: (1fr, auto, auto, auto),
  inset: 8pt,
  [*Factor*], [*Supabase*], [*PlanetScale*], [*Neon*],
  [Real Postgres], [Yes], [MySQL], [Yes],
  [Built-in Auth], [Yes], [No], [No],
  [Realtime], [WebSocket], [No], [No],
  [Row Level Security], [Native], [No], [No],
  [File Storage], [S3-compat], [No], [No],
)

*Reasoning:* Auth + Database + Realtime + Storage = one vendor. RLS makes multi-tenancy trivial.

== Queue: Inngest

*Decision:* Inngest \
*Rejected:* Trigger.dev, BullMQ

*Reasoning:* No Redis to manage. Step functions let us break agents into resumable stages. 25K free runs covers MVP.

= Database Schema

== Core Tables

```sql
-- Users and Organizations
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  plan TEXT DEFAULT 'starter',
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id),
  name TEXT NOT NULL,
  business_type TEXT NOT NULL,
  target_location TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE prospects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id),
  company_name TEXT NOT NULL,
  website TEXT,
  phone TEXT,
  address TEXT,
  source TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prospect_id UUID REFERENCES prospects(id),
  name TEXT,
  title TEXT,
  email TEXT,
  email_verified BOOLEAN DEFAULT false,
  linkedin_url TEXT,
  is_primary BOOLEAN DEFAULT false
);

CREATE TABLE lead_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prospect_id UUID REFERENCES prospects(id),
  score INTEGER,
  tier TEXT,
  scoring_factors JSONB,
  scored_at TIMESTAMPTZ DEFAULT NOW()
);
```

= Agent Orchestration

== Event Flow

#align(center)[
  #rect(inset: 12pt, radius: 5pt, fill: luma(250))[
    #text(size: 10pt)[
      campaign.created → discovery.started → prospect.found → \
      prospect.enriched → prospect.scored → outreach.generated → \
      *\[HUMAN APPROVAL\]* → outreach.sent → reply.received
    ]
  ]
]

== Agent Pipeline

#table(
  columns: (auto, auto, 1fr),
  inset: 8pt,
  [*Agent*], [*Trigger*], [*Output*],
  [Discovery], [campaign.created], [List of raw prospects],
  [Enrichment], [prospect.found], [Contact info, tech stack],
  [Research], [prospect.found], [Pain points, website analysis],
  [Scoring], [prospect.enriched], [A/B/C tier assignment],
  [Content], [prospect.scored], [Personalized email sequence],
  [Outreach], [outreach.approved], [Email sent via Instantly],
)

== Concurrency Limits

- Discovery: 10 concurrent jobs
- Enrichment: 20 concurrent (parallelized)
- Research: 5 concurrent (API rate limits)
- Sending: 2 concurrent (deliverability)

= Cost Estimates

== Monthly Infrastructure

#table(
  columns: (auto, auto, auto, auto),
  inset: 8pt,
  [*Service*], [*100 Users*], [*1K Users*], [*10K Users*],
  [Vercel], [Free], [20/mo], [150/mo],
  [Supabase], [Free], [25/mo], [75/mo],
  [Inngest], [Free], [50/mo], [250/mo],
  [Claude API], [50/mo], [300/mo], [2000/mo],
  [Hunter.io], [34/mo], [104/mo], [500/mo],
  [Instantly], [37/mo], [97/mo], [500/mo],
  [Firecrawl], [16/mo], [83/mo], [500/mo],
  [Stripe fees], [30/mo], [250/mo], [2500/mo],
  [*Total*], [*167/mo*], [*929/mo*], [*6475/mo*],
)

== Revenue vs Cost

#table(
  columns: (auto, auto, auto, auto),
  inset: 8pt,
  [*Users*], [*MRR*], [*Cost*], [*Margin*],
  [100], [15K], [167], [98.9%],
  [1,000], [120K], [929], [99.2%],
  [10,000], [750K], [6,475], [99.1%],
)

*Break-even:* ~12 users at average 150/mo

= Reusable Components from slc-lead-gen

#table(
  columns: (auto, auto, auto),
  inset: 8pt,
  [*File*], [*Reuse*], [*Effort*],
  [lead-discovery.js], [90%], [4 hours],
  [website-scorer.js], [100%], [2 hours],
  [business-scraper.js], [100%], [2 hours],
  [email-generator.js], [80%], [6 hours],
  [v2/agents/], [100%], [1 hour],
  [twilio-client.js], [100%], [1 hour],
)

*Total porting effort:* ~26 hours (3.5 dev days)

= Implementation Timeline

== Week 1: Foundation
- Supabase project + schema migration
- Next.js + tRPC setup
- Supabase Auth flow
- Basic dashboard shell

== Week 2: Core Pipeline
- Port discovery agent
- Port enrichment flow
- Lead list view
- Campaign creation wizard

== Week 3: AI + Outreach
- Scoring agent
- Content generation
- Outreach approval queue
- Instantly integration

== Week 4: Polish + Launch
- Stripe billing
- Usage tracking
- Error handling
- Beta launch to 10 customers

#v(2em)

#align(center)[
  #text(size: 10pt, fill: gray)[
    Document generated by Claw • Architecture finalized January 28, 2026
  ]
]
