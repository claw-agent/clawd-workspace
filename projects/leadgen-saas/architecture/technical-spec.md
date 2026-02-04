# Technical Architecture Specification

## System Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND (Next.js)                             │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐          │
│  │Dashboard│  │Campaigns│  │  Leads  │  │ Emails  │  │Settings │          │
│  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘          │
└───────┼────────────┼────────────┼────────────┼────────────┼────────────────┘
        │            │            │            │            │
        └────────────┴────────────┼────────────┴────────────┘
                                  │ API Routes
┌─────────────────────────────────┼───────────────────────────────────────────┐
│                          BACKEND (Next.js API)                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │   Auth API   │  │ Campaign API │  │  Leads API   │  │ Webhook API  │   │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘   │
└─────────┼─────────────────┼─────────────────┼─────────────────┼────────────┘
          │                 │                 │                 │
          ▼                 ▼                 ▼                 ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          JOB QUEUE (Inngest/BullMQ)                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │Discovery │  │ Enrich   │  │  Score   │  │ Generate │  │   Send   │     │
│  │   Job    │  │   Job    │  │   Job    │  │   Job    │  │   Job    │     │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  └──────────┘     │
└─────────────────────────────────────────────────────────────────────────────┘
          │                 │                 │                 │
          ▼                 ▼                 ▼                 ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          AGENT LAYER (Claude API)                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │  Discovery   │  │  Researcher  │  │  Qualifier   │  │   Content    │   │
│  │    Agent     │  │    Agent     │  │    Agent     │  │    Agent     │   │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
          │                 │                 │                 │
          ▼                 ▼                 ▼                 ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         EXTERNAL SERVICES                                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │Google    │  │ Hunter   │  │  Claude  │  │ Instantly│  │ Stripe   │     │
│  │Maps/Yelp │  │   API    │  │   API    │  │   API    │  │   API    │     │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  └──────────┘     │
└─────────────────────────────────────────────────────────────────────────────┘
          │                 │                 │                 │
          ▼                 ▼                 ▼                 ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          DATABASE (Supabase/Postgres)                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │  Users   │  │Campaigns │  │ Prospects│  │ Contacts │  │ Outreach │     │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  └──────────┘     │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend
| Technology | Purpose | Why |
|------------|---------|-----|
| Next.js 14 | Framework | SSR, API routes, fast DX |
| React 18 | UI | Industry standard |
| Tailwind CSS | Styling | Rapid development |
| shadcn/ui | Components | Beautiful, accessible |
| TanStack Query | Data fetching | Caching, mutations |
| Zustand | State | Lightweight, simple |

### Backend
| Technology | Purpose | Why |
|------------|---------|-----|
| Next.js API Routes | REST API | Same codebase as frontend |
| Inngest | Job queue | Serverless-friendly, great DX |
| Supabase | Database | Postgres + Auth + Realtime |
| Redis (Upstash) | Caching | Rate limiting, session |

### AI & ML
| Technology | Purpose | Why |
|------------|---------|-----|
| Claude 3.5 Sonnet | Content generation | Best for writing |
| Claude 3.5 Haiku | Quick analysis | Fast, cheap |
| Vercel AI SDK | Streaming | Easy integration |

### Infrastructure
| Technology | Purpose | Why |
|------------|---------|-----|
| Vercel | Hosting | Zero config, great DX |
| Supabase | Database | Free tier, managed |
| Upstash | Redis | Serverless, free tier |
| Resend | Transactional email | Modern API |

---

## Database Schema (Detailed)

```sql
-- Users and Auth (Supabase handles)
-- Extends Supabase auth.users

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT NOT NULL,
  full_name TEXT,
  company_name TEXT,
  plan TEXT DEFAULT 'starter', -- starter, growth, scale, enterprise
  lead_credits INTEGER DEFAULT 500,
  credits_reset_at TIMESTAMPTZ,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Campaigns
CREATE TABLE public.campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  business_type TEXT NOT NULL,
  target_location TEXT NOT NULL,
  target_criteria JSONB DEFAULT '{}',
  -- Example: {"min_reviews": 10, "max_website_score": 50, "industries": ["restaurants"]}
  status TEXT DEFAULT 'draft', -- draft, running, paused, completed
  leads_found INTEGER DEFAULT 0,
  leads_enriched INTEGER DEFAULT 0,
  leads_qualified INTEGER DEFAULT 0,
  outreach_sent INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_campaigns_user ON public.campaigns(user_id);
CREATE INDEX idx_campaigns_status ON public.campaigns(status);

-- Prospects (discovered businesses)
CREATE TABLE public.prospects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  -- Basic info
  company_name TEXT NOT NULL,
  website TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  -- Source tracking
  source TEXT NOT NULL, -- google_maps, yelp, manual, api
  source_id TEXT, -- External ID from source
  source_data JSONB, -- Raw data from source
  -- Status
  status TEXT DEFAULT 'discovered', -- discovered, enriching, enriched, qualified, outreach_pending, contacted
  tier TEXT, -- A, B, C (after qualification)
  -- Timestamps
  discovered_at TIMESTAMPTZ DEFAULT NOW(),
  enriched_at TIMESTAMPTZ,
  qualified_at TIMESTAMPTZ,
  contacted_at TIMESTAMPTZ
);

CREATE INDEX idx_prospects_campaign ON public.prospects(campaign_id);
CREATE INDEX idx_prospects_status ON public.prospects(status);
CREATE INDEX idx_prospects_tier ON public.prospects(tier);
CREATE UNIQUE INDEX idx_prospects_unique ON public.prospects(campaign_id, source, source_id);

-- Enrichment data (one-to-one with prospects)
CREATE TABLE public.enrichments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prospect_id UUID NOT NULL REFERENCES public.prospects(id) ON DELETE CASCADE,
  -- Website metrics
  website_score INTEGER, -- 0-100 (Lighthouse)
  mobile_score INTEGER,
  page_speed NUMERIC,
  ssl_valid BOOLEAN,
  -- Business metrics
  google_rating NUMERIC,
  google_reviews INTEGER,
  yelp_rating NUMERIC,
  yelp_reviews INTEGER,
  -- Company info
  employee_count_estimate TEXT, -- "1-10", "11-50", etc.
  revenue_estimate TEXT,
  year_founded INTEGER,
  -- Tech analysis
  tech_stack JSONB, -- ["wordpress", "shopify", "react"]
  -- AI analysis
  pain_points TEXT[], -- AI-identified pain points
  personalization_hooks TEXT[], -- For email writing
  company_summary TEXT,
  -- Metadata
  enriched_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_enrichments_prospect ON public.enrichments(prospect_id);

-- Contacts (people at prospects)
CREATE TABLE public.contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prospect_id UUID NOT NULL REFERENCES public.prospects(id) ON DELETE CASCADE,
  -- Contact info
  name TEXT,
  first_name TEXT,
  last_name TEXT,
  title TEXT,
  email TEXT,
  email_verified BOOLEAN DEFAULT FALSE,
  email_verification_status TEXT, -- valid, invalid, catch_all, unknown
  phone TEXT,
  linkedin_url TEXT,
  -- Flags
  is_primary BOOLEAN DEFAULT FALSE,
  is_decision_maker BOOLEAN DEFAULT FALSE,
  -- Source
  source TEXT, -- hunter, apollo, website, manual
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_contacts_prospect ON public.contacts(prospect_id);
CREATE INDEX idx_contacts_email ON public.contacts(email);

-- Lead scores
CREATE TABLE public.lead_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prospect_id UUID NOT NULL REFERENCES public.prospects(id) ON DELETE CASCADE,
  -- Scores (0-100)
  overall_score INTEGER NOT NULL,
  -- Factor breakdown
  website_opportunity INTEGER, -- Bad website = high opportunity
  review_strength INTEGER, -- Good reviews = established business
  contact_quality INTEGER, -- Valid email = reachable
  timing_signals INTEGER, -- Recent activity = good timing
  -- Tier assignment
  tier TEXT NOT NULL, -- A, B, C
  tier_reason TEXT,
  -- Details
  scoring_factors JSONB,
  -- Timestamps
  scored_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_lead_scores_prospect ON public.lead_scores(prospect_id);

-- Outreach sequences
CREATE TABLE public.outreach_sequences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prospect_id UUID NOT NULL REFERENCES public.prospects(id) ON DELETE CASCADE,
  contact_id UUID NOT NULL REFERENCES public.contacts(id),
  -- Sequence details
  sequence_type TEXT NOT NULL, -- email, linkedin, sms
  status TEXT DEFAULT 'draft', -- draft, approved, scheduled, sent, replied, bounced
  -- Email content
  subject TEXT,
  emails JSONB NOT NULL,
  -- Example: [{"step": 1, "delay_days": 0, "subject": "...", "body": "..."}, ...]
  -- Tracking
  approved_by UUID REFERENCES public.profiles(id),
  approved_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  opens INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  replies INTEGER DEFAULT 0,
  -- External sync
  instantly_campaign_id TEXT,
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_outreach_prospect ON public.outreach_sequences(prospect_id);
CREATE INDEX idx_outreach_status ON public.outreach_sequences(status);

-- API usage tracking
CREATE TABLE public.api_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  service TEXT NOT NULL, -- google_maps, hunter, claude, instantly
  endpoint TEXT,
  credits_used INTEGER DEFAULT 1,
  cost_estimate NUMERIC,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_api_usage_user ON public.api_usage(user_id);
CREATE INDEX idx_api_usage_created ON public.api_usage(created_at);

-- Row Level Security Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prospects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrichments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.outreach_sequences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_usage ENABLE ROW LEVEL SECURITY;

-- Policies: Users can only see their own data
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own campaigns" ON public.campaigns FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own campaigns" ON public.campaigns FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own campaigns" ON public.campaigns FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own campaigns" ON public.campaigns FOR DELETE USING (auth.uid() = user_id);

-- Similar policies for other tables...
```

---

## API Routes Structure

```
/api
├── /auth
│   ├── /signup          POST - Create account
│   ├── /login           POST - Sign in
│   ├── /logout          POST - Sign out
│   └── /me              GET  - Current user
│
├── /campaigns
│   ├── /                GET  - List campaigns
│   ├── /                POST - Create campaign
│   ├── /[id]            GET  - Get campaign
│   ├── /[id]            PATCH - Update campaign
│   ├── /[id]            DELETE - Delete campaign
│   ├── /[id]/start      POST - Start discovery
│   ├── /[id]/pause      POST - Pause campaign
│   └── /[id]/stats      GET  - Campaign statistics
│
├── /prospects
│   ├── /                GET  - List prospects (filtered)
│   ├── /[id]            GET  - Get prospect details
│   ├── /[id]/enrich     POST - Trigger enrichment
│   ├── /[id]/score      POST - Trigger scoring
│   └── /export          POST - Export to CSV
│
├── /outreach
│   ├── /                GET  - List sequences
│   ├── /[id]            GET  - Get sequence
│   ├── /[id]/approve    POST - Approve for sending
│   ├── /[id]/edit       PATCH - Edit email content
│   └── /generate        POST - Generate emails for prospect
│
├── /webhooks
│   ├── /stripe          POST - Stripe events
│   └── /instantly       POST - Instantly callbacks
│
└── /internal (service-to-service)
    ├── /jobs/discovery  POST - Trigger discovery job
    ├── /jobs/enrich     POST - Trigger enrichment job
    └── /jobs/score      POST - Trigger scoring job
```

---

## Job Definitions (Inngest)

```typescript
// jobs/discovery.ts
export const discoveryJob = inngest.createFunction(
  { id: "discovery", name: "Lead Discovery" },
  { event: "campaign/discovery.start" },
  async ({ event, step }) => {
    const { campaignId, businessType, location, maxResults } = event.data;
    
    // Step 1: Search Google Maps
    const googleResults = await step.run("search-google-maps", async () => {
      return await searchGoogleMaps(businessType, location, maxResults);
    });
    
    // Step 2: Search Yelp
    const yelpResults = await step.run("search-yelp", async () => {
      return await searchYelp(businessType, location, maxResults);
    });
    
    // Step 3: Deduplicate and save
    const prospects = await step.run("save-prospects", async () => {
      const merged = deduplicateByWebsite([...googleResults, ...yelpResults]);
      return await saveProspects(campaignId, merged);
    });
    
    // Step 4: Trigger enrichment for each prospect
    for (const prospect of prospects) {
      await step.sendEvent("trigger-enrichment", {
        name: "prospect/enrich.start",
        data: { prospectId: prospect.id },
      });
    }
    
    return { discovered: prospects.length };
  }
);

// jobs/enrich.ts
export const enrichJob = inngest.createFunction(
  { id: "enrich", name: "Prospect Enrichment" },
  { event: "prospect/enrich.start" },
  async ({ event, step }) => {
    const { prospectId } = event.data;
    const prospect = await getProspect(prospectId);
    
    // Step 1: Website analysis
    const websiteData = await step.run("analyze-website", async () => {
      return await analyzeWebsite(prospect.website);
    });
    
    // Step 2: Find contacts
    const contacts = await step.run("find-contacts", async () => {
      return await findContacts(prospect.website, prospect.company_name);
    });
    
    // Step 3: AI analysis
    const aiAnalysis = await step.run("ai-analysis", async () => {
      return await analyzeWithClaude(prospect, websiteData);
    });
    
    // Step 4: Save enrichment
    await step.run("save-enrichment", async () => {
      return await saveEnrichment(prospectId, {
        ...websiteData,
        ...aiAnalysis,
        contacts,
      });
    });
    
    // Step 5: Trigger scoring
    await step.sendEvent("trigger-scoring", {
      name: "prospect/score.start",
      data: { prospectId },
    });
    
    return { enriched: true };
  }
);
```

---

## Security Considerations

### Authentication
- Supabase Auth with email/password
- OAuth (Google, GitHub) optional
- JWT tokens with short expiry
- Refresh token rotation

### Authorization
- Row Level Security (RLS) in Postgres
- API route middleware validation
- Team member permissions (future)

### Data Protection
- All data encrypted at rest (Supabase)
- TLS for all connections
- No PII in logs
- GDPR compliance (data export, deletion)

### Rate Limiting
- Per-user API rate limits (Upstash)
- Credit consumption tracking
- Abuse detection

### API Keys
- Encrypted storage for user API keys (BYOK)
- Never logged or exposed
- Per-key permissions

---

## Deployment

### Environment Variables
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# AI
ANTHROPIC_API_KEY=

# External Services
HUNTER_API_KEY=
INSTANTLY_API_KEY=
GOOGLE_MAPS_API_KEY=
YELP_API_KEY=

# Inngest
INNGEST_SIGNING_KEY=
INNGEST_EVENT_KEY=

# Upstash Redis
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

### Deployment Checklist
- [ ] Set all environment variables
- [ ] Run database migrations
- [ ] Configure Stripe webhooks
- [ ] Set up Inngest event destination
- [ ] Enable Supabase RLS
- [ ] Configure domain and SSL
- [ ] Set up error monitoring (Sentry)
- [ ] Configure analytics (Posthog)
