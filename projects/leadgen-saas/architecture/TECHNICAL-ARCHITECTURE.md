# LeadGen SaaS - Technical Architecture

**Version:** 1.0  
**Date:** January 28, 2026  
**Author:** Lead Architect  
**Status:** Final Decisions

---

## Executive Summary

This document defines the complete technical architecture for the AI-powered Lead Generation SaaS. Every decision is final—no hedging. The goal: **ship MVP in 4 weeks, scale to 10K users without re-architecture**.

### Stack at a Glance

| Layer | Decision | Reason |
|-------|----------|--------|
| Hosting | **Vercel** | Zero-ops, edge functions, generous free tier |
| Database | **Supabase** | Postgres + Auth + Realtime in one |
| Queue | **Inngest** | Serverless-native, no Redis to manage |
| Auth | **Supabase Auth** | Already using Supabase, one less vendor |
| AI | **Claude Sonnet 4** | Best cost/quality for writing tasks |
| Email | **Resend** (transactional) + **Instantly** (cold) | Modern APIs, best deliverability |
| Payments | **Stripe** | Industry standard |

---

## 1. System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                USER INTERFACE                                   │
│                                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │  Dashboard  │  │  Campaign   │  │  Lead List  │  │  Settings   │            │
│  │             │  │  Builder    │  │  Viewer     │  │  & Billing  │            │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘            │
│         │                │                │                │                    │
│         └────────────────┴────────────────┴────────────────┘                    │
│                                   │                                             │
│                          Next.js 14 (App Router)                                │
│                                   │                                             │
└───────────────────────────────────┼─────────────────────────────────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────────────────┐
│                              API LAYER (Vercel)                                   │
│                                                                                   │
│  ┌──────────────────────────────────────────────────────────────────────────────┐│
│  │                            tRPC Router                                       ││
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────────────┐   ││
│  │  │campaigns│  │  leads  │  │outreach │  │ billing │  │ integrations    │   ││
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘  └─────────────────┘   ││
│  └──────────────────────────────────────────────────────────────────────────────┘│
│                                    │                                              │
│                         ┌──────────┴──────────┐                                   │
│                         ▼                     ▼                                   │
│              ┌────────────────┐     ┌────────────────┐                            │
│              │  Supabase Auth │     │   Stripe SDK   │                            │
│              └────────────────┘     └────────────────┘                            │
└───────────────────────────────────────┬───────────────────────────────────────────┘
                                        │
                ┌───────────────────────┼───────────────────────┐
                │                       │                       │
                ▼                       ▼                       ▼
┌───────────────────────┐  ┌────────────────────┐  ┌────────────────────────────┐
│   SUPABASE POSTGRES   │  │   INNGEST QUEUE    │  │   EXTERNAL SERVICES        │
│                       │  │                    │  │                            │
│  ├─ users             │  │  Job Types:        │  │  ┌──────────────────────┐  │
│  ├─ organizations     │  │  ├─ discovery      │  │  │  Data Sources        │  │
│  ├─ campaigns         │  │  ├─ enrich         │  │  │  ├─ Google Maps API  │  │
│  ├─ prospects         │  │  ├─ score          │  │  │  ├─ Yelp Fusion      │  │
│  ├─ contacts          │  │  ├─ research       │  │  │  └─ Apollo.io        │  │
│  ├─ enrichment_data   │  │  ├─ generate_email │  │  └──────────────────────┘  │
│  ├─ outreach_sequence │  │  └─ send_outreach  │  │                            │
│  ├─ lead_scores       │  │                    │  │  ┌──────────────────────┐  │
│  ├─ usage_tracking    │  │  Concurrency:      │  │  │  Email Services      │  │
│  └─ api_credentials   │  │  ├─ 10 discovery   │  │  │  ├─ Hunter.io        │  │
│                       │  │  ├─ 20 enrich      │  │  │  ├─ Resend           │  │
│  Row Level Security   │  │  ├─ 5 research     │  │  │  └─ Instantly        │  │
│  (Multi-tenant)       │  │  └─ 2 send         │  │  └──────────────────────┘  │
│                       │  │                    │  │                            │
└───────────────────────┘  └─────────┬──────────┘  │  ┌──────────────────────┐  │
                                     │             │  │  AI Services         │  │
                                     │             │  │  ├─ Claude Sonnet 4  │  │
                                     │             │  │  └─ Firecrawl        │  │
                                     │             │  └──────────────────────┘  │
                                     │             │                            │
                                     │             │  ┌──────────────────────┐  │
                                     │             │  │  Comms               │  │
                                     │             │  │  ├─ Twilio SMS       │  │
                                     │             │  │  └─ Twilio Voice     │  │
                                     │             │  └──────────────────────┘  │
                                     │             └────────────────────────────┘
                                     │
                                     ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                            AI AGENT ORCHESTRATION                                │
│                                                                                  │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐      │
│   │  DISCOVERY  │───▶│  ENRICHER   │───▶│  QUALIFIER  │───▶│  OUTREACH   │      │
│   │    AGENT    │    │    AGENT    │    │    AGENT    │    │    AGENT    │      │
│   └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘      │
│         │                  │                  │                  │              │
│         │            ┌─────────────┐          │                  │              │
│         │            │  RESEARCHER │          │                  │              │
│         │            │    AGENT    │──────────┘                  │              │
│         │            └─────────────┘                             │              │
│         │                                                        │              │
│         ▼                                                        ▼              │
│   ┌───────────────────────────────────────────────────────────────────────┐     │
│   │                         INNGEST EVENT BUS                             │     │
│   │                                                                       │     │
│   │  Events:                                                              │     │
│   │  campaign.created → discovery.started → prospect.found →              │     │
│   │  prospect.enriched → prospect.scored → outreach.generated →           │     │
│   │  outreach.approved → outreach.sent → reply.received                   │     │
│   └───────────────────────────────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Infrastructure Decisions

### Hosting: Vercel ✅

**Decision:** Vercel  
**Rejected:** Railway, AWS

| Factor | Vercel | Railway | AWS |
|--------|--------|---------|-----|
| Zero-config deploy | ✅ Yes | ✅ Yes | ❌ No |
| Edge functions | ✅ Global | ⚠️ Regional | ⚠️ Complex |
| Free tier | 100GB bandwidth | $5 credit | Pay-per-use |
| Next.js optimization | ✅ Native | ⚠️ Good | ⚠️ Manual |
| Preview deployments | ✅ Per PR | ✅ Per PR | ❌ Manual |
| Ops overhead | Zero | Low | High |
| Scaling | Automatic | Manual | Manual |

**Reasoning:**
- We're building a Next.js app—Vercel made Next.js
- Zero ops means shipping faster
- Edge functions for API routes = global low latency
- Free tier covers MVP
- Pro ($20/mo) handles 10K users easily

**When to migrate:** If we need >100GB bandwidth/month or persistent compute (WebSocket servers). At that point, consider Railway for background workers only.

---

### Database: Supabase ✅

**Decision:** Supabase  
**Rejected:** PlanetScale, Neon

| Factor | Supabase | PlanetScale | Neon |
|--------|----------|-------------|------|
| Postgres | ✅ Real Postgres | ❌ MySQL | ✅ Real Postgres |
| Free tier | 500MB, unlimited API | 5GB, 1B reads | 0.5GB |
| Built-in Auth | ✅ Yes | ❌ No | ❌ No |
| Realtime | ✅ WebSocket | ❌ No | ❌ No |
| Row Level Security | ✅ Native | ❌ No | ❌ No |
| Edge Functions | ✅ Deno | ❌ No | ❌ No |
| File Storage | ✅ S3-compatible | ❌ No | ❌ No |

**Reasoning:**
- Auth + Database + Realtime + Storage in one vendor = fewer integrations
- Row Level Security (RLS) makes multi-tenancy trivial
- Realtime subscriptions for live progress updates
- Generous free tier for MVP
- Pro ($25/mo) handles 10K users

**Schema compatibility:** Supabase is real Postgres. No vendor lock-in.

---

### Queue: Inngest ✅

**Decision:** Inngest  
**Rejected:** Trigger.dev, BullMQ

| Factor | Inngest | Trigger.dev | BullMQ |
|--------|---------|-------------|--------|
| Serverless-native | ✅ Yes | ✅ Yes | ❌ Needs Redis |
| Vercel integration | ✅ Native | ✅ Good | ⚠️ Manual |
| Step functions | ✅ Yes | ✅ Yes | ❌ No |
| Retries/backoff | ✅ Automatic | ✅ Automatic | ⚠️ Manual |
| Free tier | 25K runs/mo | 10K runs/mo | Free (self-host) |
| Cron jobs | ✅ Yes | ✅ Yes | ⚠️ Separate |
| Fan-out/parallel | ✅ Native | ✅ Yes | ⚠️ Complex |

**Reasoning:**
- No Redis to manage = zero ops
- Step functions let us break agents into resumable stages
- Automatic retries with exponential backoff
- 25K free runs covers MVP
- Native Vercel integration (deploy together)

**Pattern for AI agents:**

```typescript
inngest.createFunction(
  { id: "enrich-prospect" },
  { event: "prospect/found" },
  async ({ event, step }) => {
    // Step 1: Scrape website
    const websiteData = await step.run("scrape-website", async () => {
      return await firecrawl.scrape(event.data.website);
    });
    
    // Step 2: Analyze with Claude (separate billing/retry)
    const analysis = await step.run("analyze-with-ai", async () => {
      return await claude.analyze(websiteData);
    });
    
    // Step 3: Save enrichment
    await step.run("save-enrichment", async () => {
      return await supabase.from('enrichment_data').insert(analysis);
    });
    
    // Step 4: Trigger next stage
    await step.sendEvent("prospect/enriched", { prospectId: event.data.id });
  }
);
```

---

### Auth: Supabase Auth ✅

**Decision:** Supabase Auth  
**Rejected:** Clerk, Auth0

| Factor | Supabase Auth | Clerk | Auth0 |
|--------|--------------|-------|-------|
| Price (10K MAU) | Free | $25/mo | $240/mo |
| Postgres integration | ✅ Native | ❌ Webhook | ❌ Webhook |
| RLS integration | ✅ Native | ❌ Manual | ❌ Manual |
| Social OAuth | ✅ Yes | ✅ Yes | ✅ Yes |
| Magic links | ✅ Yes | ✅ Yes | ✅ Yes |
| UI components | ⚠️ Basic | ✅ Polished | ✅ Good |

**Reasoning:**
- Already using Supabase—one less vendor
- Native RLS integration: `auth.uid() = user_id`
- Free for 50K MAU
- Magic link = no password friction

**Trade-off:** Clerk has prettier UI components. We'll build custom auth UI in 2 hours instead of paying $25/mo forever.

---

## 3. Database Schema

### Complete SQL Schema

```sql
-- ============================================================================
-- CORE TABLES
-- ============================================================================

-- Users (managed by Supabase Auth, extended here)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Organizations (for team features)
CREATE TABLE public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  owner_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  plan TEXT DEFAULT 'starter' CHECK (plan IN ('starter', 'growth', 'scale', 'enterprise')),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Organization members
CREATE TABLE public.organization_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(organization_id, user_id)
);

-- ============================================================================
-- CAMPAIGN & LEAD TABLES
-- ============================================================================

-- Campaigns
CREATE TABLE public.campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  created_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  
  -- Targeting
  business_type TEXT NOT NULL,
  target_location TEXT NOT NULL,
  target_radius_miles INTEGER DEFAULT 25,
  target_criteria JSONB DEFAULT '{}',
  
  -- Status
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'discovering', 'enriching', 'generating', 'ready', 'active', 'paused', 'completed')),
  
  -- Stats (denormalized for dashboard)
  total_prospects INTEGER DEFAULT 0,
  enriched_count INTEGER DEFAULT 0,
  outreach_sent INTEGER DEFAULT 0,
  replies_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Prospects (discovered businesses)
CREATE TABLE public.prospects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE CASCADE,
  
  -- Basic info
  company_name TEXT NOT NULL,
  website TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  
  -- Source tracking
  source TEXT NOT NULL CHECK (source IN ('google_maps', 'yelp', 'apollo', 'manual', 'import')),
  source_id TEXT, -- External ID from source
  source_url TEXT, -- Link back to source
  
  -- Raw data from source
  raw_data JSONB DEFAULT '{}',
  
  -- Status
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'enriching', 'enriched', 'scored', 'outreach_pending', 'outreach_sent', 'replied', 'converted', 'disqualified')),
  
  -- Deduplication
  domain TEXT GENERATED ALWAYS AS (
    CASE WHEN website IS NOT NULL 
    THEN lower(regexp_replace(regexp_replace(website, '^https?://', ''), '^www\.', ''))
    ELSE NULL END
  ) STORED,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contacts (people at prospects)
CREATE TABLE public.contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prospect_id UUID REFERENCES public.prospects(id) ON DELETE CASCADE,
  
  -- Contact info
  first_name TEXT,
  last_name TEXT,
  full_name TEXT,
  title TEXT,
  email TEXT,
  phone TEXT,
  linkedin_url TEXT,
  
  -- Verification
  email_verified BOOLEAN DEFAULT FALSE,
  email_verification_source TEXT,
  email_verification_date TIMESTAMPTZ,
  
  -- Flags
  is_primary BOOLEAN DEFAULT FALSE,
  is_decision_maker BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enrichment data (detailed analysis)
CREATE TABLE public.enrichment_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prospect_id UUID UNIQUE REFERENCES public.prospects(id) ON DELETE CASCADE,
  
  -- Website analysis
  website_exists BOOLEAN,
  website_score INTEGER, -- 0-100 Lighthouse
  mobile_score INTEGER, -- 0-100 mobile performance
  has_ssl BOOLEAN,
  page_speed_ms INTEGER,
  
  -- Tech stack
  tech_stack JSONB DEFAULT '[]', -- ["WordPress", "WooCommerce", "Stripe"]
  cms_detected TEXT,
  ecommerce_platform TEXT,
  
  -- Business intelligence
  employee_count_range TEXT, -- "1-10", "11-50", etc.
  revenue_estimate TEXT, -- "$100K-500K"
  year_founded INTEGER,
  
  -- Social presence
  has_facebook BOOLEAN,
  has_instagram BOOLEAN,
  has_linkedin BOOLEAN,
  has_google_business BOOLEAN,
  google_rating DECIMAL(2,1),
  google_review_count INTEGER,
  yelp_rating DECIMAL(2,1),
  yelp_review_count INTEGER,
  
  -- AI analysis
  pain_points TEXT[], -- ["outdated website", "no mobile optimization"]
  opportunities TEXT[], -- ["needs booking system", "could use SEO"]
  company_summary TEXT,
  
  -- Raw scrape data
  website_content TEXT, -- Markdown of website
  
  enriched_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lead scores
CREATE TABLE public.lead_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prospect_id UUID UNIQUE REFERENCES public.prospects(id) ON DELETE CASCADE,
  
  -- Overall score
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  tier TEXT NOT NULL CHECK (tier IN ('A', 'B', 'C', 'D')),
  
  -- Component scores
  website_quality_score INTEGER,
  business_size_score INTEGER,
  engagement_score INTEGER,
  fit_score INTEGER,
  
  -- Scoring rationale
  scoring_factors JSONB DEFAULT '{}',
  scoring_notes TEXT,
  
  scored_at TIMESTAMPTZ DEFAULT NOW(),
  scored_by TEXT DEFAULT 'ai' CHECK (scored_by IN ('ai', 'manual'))
);

-- ============================================================================
-- OUTREACH TABLES
-- ============================================================================

-- Outreach sequences
CREATE TABLE public.outreach_sequences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE CASCADE,
  prospect_id UUID REFERENCES public.prospects(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES public.contacts(id) ON DELETE SET NULL,
  
  -- Sequence config
  sequence_type TEXT NOT NULL CHECK (sequence_type IN ('email', 'linkedin', 'sms', 'multi')),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'pending_approval', 'approved', 'active', 'paused', 'completed', 'failed')),
  
  -- Approval workflow
  approved_by UUID REFERENCES public.users(id),
  approved_at TIMESTAMPTZ,
  
  -- External integration
  instantly_campaign_id TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Individual outreach emails
CREATE TABLE public.outreach_emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sequence_id UUID REFERENCES public.outreach_sequences(id) ON DELETE CASCADE,
  
  -- Email content
  step_number INTEGER NOT NULL, -- 1, 2, 3...
  subject TEXT NOT NULL,
  body_html TEXT NOT NULL,
  body_text TEXT,
  
  -- Personalization tokens used
  personalization_data JSONB DEFAULT '{}',
  
  -- Delivery tracking
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'scheduled', 'sent', 'delivered', 'opened', 'clicked', 'replied', 'bounced', 'unsubscribed')),
  scheduled_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  
  -- Engagement
  opens INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  replied_at TIMESTAMPTZ,
  
  -- External IDs
  instantly_email_id TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- USAGE & BILLING TABLES
-- ============================================================================

-- Usage tracking (for billing)
CREATE TABLE public.usage_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  
  -- Period
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  
  -- Counts
  leads_discovered INTEGER DEFAULT 0,
  leads_enriched INTEGER DEFAULT 0,
  emails_generated INTEGER DEFAULT 0,
  emails_sent INTEGER DEFAULT 0,
  api_calls INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(organization_id, period_start)
);

-- API credentials (user's own keys)
CREATE TABLE public.api_credentials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  
  service TEXT NOT NULL CHECK (service IN ('apollo', 'hunter', 'instantly', 'openai', 'anthropic', 'twilio')),
  
  -- Encrypted credentials
  credentials_encrypted BYTEA NOT NULL,
  
  -- Metadata
  is_active BOOLEAN DEFAULT TRUE,
  last_used_at TIMESTAMPTZ,
  last_error TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(organization_id, service)
);

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Campaign lookups
CREATE INDEX idx_campaigns_org ON public.campaigns(organization_id);
CREATE INDEX idx_campaigns_status ON public.campaigns(status);

-- Prospect lookups
CREATE INDEX idx_prospects_campaign ON public.prospects(campaign_id);
CREATE INDEX idx_prospects_status ON public.prospects(status);
CREATE INDEX idx_prospects_domain ON public.prospects(domain);

-- Contact lookups
CREATE INDEX idx_contacts_prospect ON public.contacts(prospect_id);
CREATE INDEX idx_contacts_email ON public.contacts(email);

-- Score lookups
CREATE INDEX idx_lead_scores_prospect ON public.lead_scores(prospect_id);
CREATE INDEX idx_lead_scores_tier ON public.lead_scores(tier);

-- Outreach lookups
CREATE INDEX idx_outreach_sequences_campaign ON public.outreach_sequences(campaign_id);
CREATE INDEX idx_outreach_sequences_status ON public.outreach_sequences(status);
CREATE INDEX idx_outreach_emails_sequence ON public.outreach_emails(sequence_id);

-- Usage lookups
CREATE INDEX idx_usage_org_period ON public.usage_tracking(organization_id, period_start);

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prospects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrichment_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.outreach_sequences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.outreach_emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_credentials ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own data
CREATE POLICY "Users see own profile" ON public.users
  FOR ALL USING (auth.uid() = id);

-- Policy: Organization access through membership
CREATE POLICY "Org members can view org" ON public.organizations
  FOR SELECT USING (
    id IN (SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid())
  );

-- Policy: Campaign access through organization
CREATE POLICY "Org members can access campaigns" ON public.campaigns
  FOR ALL USING (
    organization_id IN (SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid())
  );

-- (Similar policies for all other tables...)

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON public.campaigns FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_prospects_updated_at BEFORE UPDATE ON public.prospects FOR EACH ROW EXECUTE FUNCTION update_updated_at();
-- (etc. for all tables)

-- Function: Increment campaign stats
CREATE OR REPLACE FUNCTION increment_campaign_stats()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.campaigns 
    SET total_prospects = total_prospects + 1
    WHERE id = NEW.campaign_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER increment_prospects_count 
AFTER INSERT ON public.prospects 
FOR EACH ROW EXECUTE FUNCTION increment_campaign_stats();
```

---

## 4. API Design (tRPC)

### Router Structure

```typescript
// src/server/routers/_app.ts
export const appRouter = router({
  // Auth
  auth: authRouter,
  
  // Core entities
  campaigns: campaignRouter,
  prospects: prospectRouter,
  contacts: contactRouter,
  outreach: outreachRouter,
  
  // Operations
  discovery: discoveryRouter,
  enrichment: enrichmentRouter,
  scoring: scoringRouter,
  
  // Settings
  organization: organizationRouter,
  billing: billingRouter,
  integrations: integrationsRouter,
});
```

### Campaign Router

```typescript
// src/server/routers/campaigns.ts
export const campaignRouter = router({
  // List campaigns for current org
  list: protectedProcedure
    .input(z.object({
      status: z.enum(['all', 'active', 'completed', 'draft']).optional(),
      limit: z.number().min(1).max(100).default(20),
      cursor: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => { ... }),

  // Get single campaign with stats
  get: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => { ... }),

  // Create campaign (triggers discovery)
  create: protectedProcedure
    .input(z.object({
      name: z.string().min(1).max(100),
      businessType: z.string().min(1),
      targetLocation: z.string().min(1),
      targetRadius: z.number().min(1).max(100).default(25),
      targetCriteria: z.object({
        minEmployees: z.number().optional(),
        maxEmployees: z.number().optional(),
        mustHaveWebsite: z.boolean().optional(),
        mustHaveEmail: z.boolean().optional(),
      }).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      // 1. Create campaign in DB
      const campaign = await ctx.db.campaigns.create({ ... });
      
      // 2. Trigger discovery job
      await inngest.send({
        name: "campaign/created",
        data: { campaignId: campaign.id, ...input }
      });
      
      return campaign;
    }),

  // Pause/resume campaign
  updateStatus: protectedProcedure
    .input(z.object({
      id: z.string().uuid(),
      status: z.enum(['active', 'paused']),
    }))
    .mutation(async ({ ctx, input }) => { ... }),

  // Delete campaign
  delete: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => { ... }),
});
```

### Prospect Router

```typescript
// src/server/routers/prospects.ts
export const prospectRouter = router({
  // List prospects with filters
  list: protectedProcedure
    .input(z.object({
      campaignId: z.string().uuid(),
      status: z.array(z.string()).optional(),
      tier: z.array(z.enum(['A', 'B', 'C', 'D'])).optional(),
      search: z.string().optional(),
      sortBy: z.enum(['score', 'created_at', 'company_name']).default('score'),
      sortOrder: z.enum(['asc', 'desc']).default('desc'),
      limit: z.number().min(1).max(100).default(50),
      cursor: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => { ... }),

  // Get prospect with all enrichment data
  get: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => { ... }),

  // Manually trigger enrichment
  enrich: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      await inngest.send({
        name: "prospect/enrich-requested",
        data: { prospectId: input.id }
      });
    }),

  // Update prospect status (disqualify, etc.)
  updateStatus: protectedProcedure
    .input(z.object({
      id: z.string().uuid(),
      status: z.string(),
      reason: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => { ... }),

  // Bulk export
  export: protectedProcedure
    .input(z.object({
      campaignId: z.string().uuid(),
      format: z.enum(['csv', 'json']),
      fields: z.array(z.string()).optional(),
    }))
    .mutation(async ({ ctx, input }) => { ... }),
});
```

### Outreach Router

```typescript
// src/server/routers/outreach.ts
export const outreachRouter = router({
  // Get outreach for prospect
  getForProspect: protectedProcedure
    .input(z.object({ prospectId: z.string().uuid() }))
    .query(async ({ ctx, input }) => { ... }),

  // Generate outreach (AI)
  generate: protectedProcedure
    .input(z.object({
      prospectId: z.string().uuid(),
      sequenceType: z.enum(['email', 'linkedin', 'multi']),
      tone: z.enum(['professional', 'casual', 'direct']).default('professional'),
      emailCount: z.number().min(1).max(5).default(3),
    }))
    .mutation(async ({ ctx, input }) => {
      await inngest.send({
        name: "outreach/generate-requested",
        data: input
      });
    }),

  // Approve outreach
  approve: protectedProcedure
    .input(z.object({
      sequenceId: z.string().uuid(),
      edits: z.array(z.object({
        emailId: z.string().uuid(),
        subject: z.string().optional(),
        body: z.string().optional(),
      })).optional(),
    }))
    .mutation(async ({ ctx, input }) => { ... }),

  // Send outreach
  send: protectedProcedure
    .input(z.object({ sequenceId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      await inngest.send({
        name: "outreach/send-requested",
        data: { sequenceId: input.sequenceId }
      });
    }),

  // Get delivery stats
  stats: protectedProcedure
    .input(z.object({
      campaignId: z.string().uuid(),
      dateRange: z.enum(['7d', '30d', '90d', 'all']).default('30d'),
    }))
    .query(async ({ ctx, input }) => { ... }),
});
```

---

## 5. Agent Orchestration

### Event-Driven Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CAMPAIGN LIFECYCLE                                │
└─────────────────────────────────────────────────────────────────────────────┘

User creates campaign
        │
        ▼
┌───────────────┐
│ campaign/     │ ──────► Inngest receives event
│ created       │
└───────────────┘
        │
        ▼
┌───────────────────────────────────────────────────────────────────────────┐
│ DISCOVERY FUNCTION                                                        │
│ Concurrency: 10 per org                                                   │
│ ─────────────────────────────────────────────────────────────────────────│
│ Step 1: Query Google Maps API                                             │
│ Step 2: Query Yelp Fusion API                                             │
│ Step 3: Deduplicate by domain                                             │
│ Step 4: Insert prospects to DB                                            │
│ Step 5: Fan out enrich events (one per prospect)                          │
└───────────────────────────────────────────────────────────────────────────┘
        │
        │ For each prospect
        ▼
┌───────────────┐
│ prospect/     │ ──────► One event per prospect found
│ found         │
└───────────────┘
        │
        ▼
┌───────────────────────────────────────────────────────────────────────────┐
│ ENRICHMENT FUNCTION                                                       │
│ Concurrency: 20 (rate limited by external APIs)                           │
│ ─────────────────────────────────────────────────────────────────────────│
│ Step 1: Scrape website (Firecrawl)                                        │
│ Step 2: Check tech stack (BuiltWith / Wappalyzer)                         │
│ Step 3: Find contacts (Apollo / Hunter)                                   │
│ Step 4: AI analysis (Claude) - pain points, opportunities                 │
│ Step 5: Save enrichment_data                                              │
│ Step 6: Emit prospect/enriched                                            │
└───────────────────────────────────────────────────────────────────────────┘
        │
        ▼
┌───────────────┐
│ prospect/     │
│ enriched      │
└───────────────┘
        │
        ▼
┌───────────────────────────────────────────────────────────────────────────┐
│ SCORING FUNCTION                                                          │
│ Concurrency: 50 (CPU-bound, no external calls)                            │
│ ─────────────────────────────────────────────────────────────────────────│
│ Step 1: Calculate component scores                                        │
│   - Website quality (0-25): based on Lighthouse                           │
│   - Business size (0-25): employee count, revenue                         │
│   - Engagement potential (0-25): social presence, reviews                 │
│   - Fit score (0-25): matches target criteria                             │
│ Step 2: Compute total (0-100)                                             │
│ Step 3: Assign tier (A: 75+, B: 50-74, C: 25-49, D: <25)                  │
│ Step 4: Save lead_scores                                                  │
│ Step 5: Emit prospect/scored                                              │
└───────────────────────────────────────────────────────────────────────────┘
        │
        ▼
┌───────────────┐
│ prospect/     │
│ scored        │
└───────────────┘
        │
        │ Only for tier A & B
        ▼
┌───────────────────────────────────────────────────────────────────────────┐
│ OUTREACH GENERATION FUNCTION                                              │
│ Concurrency: 5 (Claude rate limits)                                       │
│ ─────────────────────────────────────────────────────────────────────────│
│ Step 1: Load prospect + enrichment data                                   │
│ Step 2: Select best contact (decision maker preferred)                    │
│ Step 3: Generate email sequence with Claude                               │
│   - Email 1: Value-first intro                                            │
│   - Email 2: Case study / social proof                                    │
│   - Email 3: Direct ask                                                   │
│ Step 4: Save outreach_sequences + outreach_emails                         │
│ Step 5: Emit outreach/generated (triggers notification)                   │
└───────────────────────────────────────────────────────────────────────────┘
        │
        ▼
┌───────────────┐
│ outreach/     │ ──────► User gets notification, reviews in UI
│ generated     │
└───────────────┘
        │
        │ User approves
        ▼
┌───────────────┐
│ outreach/     │
│ approved      │
└───────────────┘
        │
        ▼
┌───────────────────────────────────────────────────────────────────────────┐
│ OUTREACH SEND FUNCTION                                                    │
│ Concurrency: 2 (careful with email sending)                               │
│ ─────────────────────────────────────────────────────────────────────────│
│ Step 1: Verify email is still valid                                       │
│ Step 2: Push to Instantly campaign (or send via Resend)                   │
│ Step 3: Update status to 'sent'                                           │
│ Step 4: Schedule follow-ups                                               │
│ Step 5: Emit outreach/sent                                                │
└───────────────────────────────────────────────────────────────────────────┘
```

### Inngest Function Definitions

```typescript
// src/inngest/functions/discovery.ts
export const discoveryFunction = inngest.createFunction(
  { 
    id: "discovery",
    concurrency: { limit: 10, scope: "account" },
    retries: 3,
  },
  { event: "campaign/created" },
  async ({ event, step }) => {
    const { campaignId, businessType, targetLocation, targetRadius } = event.data;
    
    // Step 1: Google Maps
    const googleResults = await step.run("google-maps-search", async () => {
      return await googleMapsSearch(businessType, targetLocation, targetRadius);
    });
    
    // Step 2: Yelp (parallel)
    const yelpResults = await step.run("yelp-search", async () => {
      return await yelpSearch(businessType, targetLocation, targetRadius);
    });
    
    // Step 3: Merge & dedupe
    const prospects = await step.run("merge-dedupe", async () => {
      return deduplicateByDomain([...googleResults, ...yelpResults]);
    });
    
    // Step 4: Insert to DB
    const savedProspects = await step.run("save-prospects", async () => {
      return await supabase.from('prospects').insert(
        prospects.map(p => ({ ...p, campaign_id: campaignId }))
      ).select();
    });
    
    // Step 5: Fan out enrichment events
    await step.sendEvent(
      "fan-out-enrichment",
      savedProspects.data.map(p => ({
        name: "prospect/found",
        data: { prospectId: p.id, campaignId }
      }))
    );
    
    return { count: savedProspects.data.length };
  }
);

// src/inngest/functions/enrichment.ts
export const enrichmentFunction = inngest.createFunction(
  {
    id: "enrich-prospect",
    concurrency: { limit: 20, scope: "account" },
    retries: 3,
    throttle: { limit: 100, period: "1m" }, // API rate limits
  },
  { event: "prospect/found" },
  async ({ event, step }) => {
    const { prospectId } = event.data;
    
    // Load prospect
    const prospect = await step.run("load-prospect", async () => {
      const { data } = await supabase.from('prospects').select().eq('id', prospectId).single();
      return data;
    });
    
    if (!prospect.website) {
      // Skip enrichment for prospects without websites
      await step.sendEvent("skip-to-scoring", {
        name: "prospect/enriched",
        data: { prospectId, skipped: true }
      });
      return;
    }
    
    // Scrape website
    const websiteData = await step.run("scrape-website", async () => {
      return await firecrawl.scrapeUrl(prospect.website, { formats: ['markdown'] });
    });
    
    // Find contacts
    const contacts = await step.run("find-contacts", async () => {
      const domain = extractDomain(prospect.website);
      const hunterResult = await hunter.domainSearch({ domain, limit: 5 });
      return hunterResult.data.emails;
    });
    
    // AI analysis
    const analysis = await step.run("ai-analysis", async () => {
      return await claude.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{
          role: "user",
          content: `Analyze this business for lead gen:
          
Company: ${prospect.company_name}
Website content: ${websiteData.markdown.slice(0, 8000)}

Respond with JSON:
{
  "pain_points": ["list of business pain points we could solve"],
  "opportunities": ["specific opportunities for our services"],
  "company_summary": "2-3 sentence summary",
  "estimated_employee_count": "1-10" | "11-50" | "51-200" | "201+",
  "tech_assessment": "brief tech stack assessment"
}`
        }]
      });
    });
    
    // Parse AI response
    const aiResult = JSON.parse(analysis.content[0].text);
    
    // Save enrichment
    await step.run("save-enrichment", async () => {
      await supabase.from('enrichment_data').upsert({
        prospect_id: prospectId,
        website_exists: true,
        website_content: websiteData.markdown,
        pain_points: aiResult.pain_points,
        opportunities: aiResult.opportunities,
        company_summary: aiResult.company_summary,
        employee_count_range: aiResult.estimated_employee_count,
      });
      
      // Save contacts
      if (contacts.length > 0) {
        await supabase.from('contacts').insert(
          contacts.map((c, i) => ({
            prospect_id: prospectId,
            email: c.value,
            first_name: c.first_name,
            last_name: c.last_name,
            full_name: `${c.first_name} ${c.last_name}`,
            title: c.position,
            is_primary: i === 0,
          }))
        );
      }
    });
    
    // Emit completion
    await step.sendEvent("enrichment-complete", {
      name: "prospect/enriched",
      data: { prospectId }
    });
  }
);
```

---

## 6. Third-Party Integrations

### Integration Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        INTEGRATION LAYER                                │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    Unified API Client                            │   │
│  │  - Rate limiting (per service)                                   │   │
│  │  - Retry with exponential backoff                                │   │
│  │  - Request/response logging                                      │   │
│  │  - Cost tracking                                                 │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                  │                                      │
│         ┌────────────────────────┼────────────────────────┐            │
│         │                        │                        │            │
│         ▼                        ▼                        ▼            │
│  ┌─────────────┐         ┌─────────────┐         ┌─────────────┐      │
│  │   DATA      │         │   EMAIL     │         │   AI        │      │
│  │  PROVIDERS  │         │  SERVICES   │         │  SERVICES   │      │
│  └─────────────┘         └─────────────┘         └─────────────┘      │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Data Provider Integrations

#### Google Maps / Places API

```typescript
// src/lib/integrations/google-maps.ts
export class GoogleMapsClient {
  private apiKey: string;
  private baseUrl = 'https://places.googleapis.com/v1';
  
  async searchNearby(params: {
    query: string;
    location: { lat: number; lng: number };
    radiusMeters: number;
    maxResults?: number;
  }): Promise<Place[]> {
    const response = await fetch(`${this.baseUrl}/places:searchNearby`, {
      method: 'POST',
      headers: {
        'X-Goog-Api-Key': this.apiKey,
        'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.websiteUri,places.nationalPhoneNumber,places.rating,places.userRatingCount',
      },
      body: JSON.stringify({
        textQuery: params.query,
        locationBias: {
          circle: {
            center: params.location,
            radius: params.radiusMeters,
          }
        },
        maxResultCount: params.maxResults || 20,
      }),
    });
    
    return response.json();
  }
}

// Rate limit: 100 QPS (plenty for us)
// Cost: ~$0.032 per call for full details
```

#### Apollo.io

```typescript
// src/lib/integrations/apollo.ts
export class ApolloClient {
  private apiKey: string;
  private baseUrl = 'https://api.apollo.io/v1';
  
  async searchPeople(params: {
    domain: string;
    titles?: string[];
    limit?: number;
  }): Promise<Contact[]> {
    const response = await fetch(`${this.baseUrl}/mixed_people/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': this.apiKey,
      },
      body: JSON.stringify({
        q_organization_domains: params.domain,
        person_titles: params.titles || ['owner', 'ceo', 'founder', 'president'],
        per_page: params.limit || 5,
      }),
    });
    
    return response.json();
  }
  
  async enrichPerson(email: string): Promise<PersonEnrichment> {
    const response = await fetch(`${this.baseUrl}/people/match`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': this.apiKey,
      },
      body: JSON.stringify({ email }),
    });
    
    return response.json();
  }
}

// Rate limit: 100 req/min on paid plans
// Cost: 1 credit per enrichment (varies by plan)
```

#### Hunter.io

```typescript
// src/lib/integrations/hunter.ts
export class HunterClient {
  private apiKey: string;
  private baseUrl = 'https://api.hunter.io/v2';
  
  async domainSearch(domain: string): Promise<Email[]> {
    const response = await fetch(
      `${this.baseUrl}/domain-search?domain=${domain}&api_key=${this.apiKey}`
    );
    return response.json();
  }
  
  async verifyEmail(email: string): Promise<VerificationResult> {
    const response = await fetch(
      `${this.baseUrl}/email-verifier?email=${email}&api_key=${this.apiKey}`
    );
    return response.json();
  }
}

// Rate limit: 10 req/sec
// Cost: 1 credit per search, 1 credit per verification
```

### Email Service Integrations

#### Instantly.ai (Cold Email)

```typescript
// src/lib/integrations/instantly.ts
export class InstantlyClient {
  private apiKey: string;
  private baseUrl = 'https://api.instantly.ai/api/v1';
  
  async createCampaign(params: {
    name: string;
    fromEmail: string;
    subject: string;
    body: string;
    replyTo?: string;
  }): Promise<Campaign> {
    return this.post('/campaign/create', params);
  }
  
  async addLeads(campaignId: string, leads: Lead[]): Promise<void> {
    return this.post('/lead/add', {
      campaign_id: campaignId,
      leads: leads.map(l => ({
        email: l.email,
        first_name: l.firstName,
        last_name: l.lastName,
        company_name: l.companyName,
        custom_variables: l.customFields,
      })),
    });
  }
  
  async getCampaignStats(campaignId: string): Promise<CampaignStats> {
    return this.get(`/campaign/stats?campaign_id=${campaignId}`);
  }
}

// Used for: Cold outreach sequences
// User provides their own Instantly account (BYOK model)
```

#### Resend (Transactional)

```typescript
// src/lib/integrations/resend.ts
import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

// Used for: Notifications, password resets, system emails
// Our account, not user's
```

### AI Integration

#### Claude (Anthropic)

```typescript
// src/lib/integrations/claude.ts
import Anthropic from '@anthropic-ai/sdk';

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Email generation prompt
export const generateEmailSequence = async (context: {
  prospect: Prospect;
  enrichment: EnrichmentData;
  contact: Contact;
  campaign: Campaign;
}): Promise<EmailSequence> => {
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2000,
    system: `You are an expert cold email copywriter. Generate personalized, high-converting email sequences for B2B outreach. 

Rules:
- Keep emails under 150 words
- Lead with value, not pitch
- Use specific details from the prospect research
- Include clear but soft CTAs
- No pushy sales language
- Sound human, not templated`,
    messages: [{
      role: 'user',
      content: `Generate a 3-email sequence for:

PROSPECT:
Company: ${context.prospect.company_name}
Website: ${context.prospect.website}
Industry: ${context.campaign.business_type}

CONTACT:
Name: ${context.contact.full_name}
Title: ${context.contact.title}

RESEARCH:
Pain Points: ${context.enrichment.pain_points?.join(', ')}
Opportunities: ${context.enrichment.opportunities?.join(', ')}
Summary: ${context.enrichment.company_summary}

Respond with JSON:
{
  "emails": [
    { "subject": "...", "body": "...", "delay_days": 0 },
    { "subject": "...", "body": "...", "delay_days": 3 },
    { "subject": "...", "body": "...", "delay_days": 7 }
  ]
}`
    }]
  });
  
  return JSON.parse(response.content[0].text);
};

// Cost: ~$0.003 per email sequence (Sonnet)
// Rate limit: 4000 req/min (plenty)
```

#### Firecrawl (Web Scraping)

```typescript
// src/lib/integrations/firecrawl.ts
import FirecrawlApp from '@mendable/firecrawl-js';

export const firecrawl = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY,
});

export const scrapeWebsite = async (url: string) => {
  return firecrawl.scrapeUrl(url, {
    formats: ['markdown'],
    onlyMainContent: true,
    waitFor: 2000, // Wait for JS rendering
  });
};

// Cost: $0.0008 per page (Hobby plan)
// Rate limit: 10 req/min on free tier
```

---

## 7. Security Considerations

### API Key Management

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      KEY MANAGEMENT ARCHITECTURE                        │
│                                                                         │
│   ┌───────────────────────────────────────────────────────────────┐    │
│   │                    PLATFORM KEYS                               │    │
│   │   (Our keys, stored in Vercel environment variables)           │    │
│   │                                                                 │    │
│   │   ANTHROPIC_API_KEY        FIRECRAWL_API_KEY                   │    │
│   │   GOOGLE_MAPS_API_KEY      RESEND_API_KEY                      │    │
│   │   STRIPE_SECRET_KEY        SUPABASE_SERVICE_KEY                │    │
│   │   INNGEST_SIGNING_KEY                                          │    │
│   └───────────────────────────────────────────────────────────────┘    │
│                                                                         │
│   ┌───────────────────────────────────────────────────────────────┐    │
│   │                    USER KEYS (BYOK)                            │    │
│   │   (User's keys, encrypted at rest in Supabase)                 │    │
│   │                                                                 │    │
│   │   apollo_api_key      hunter_api_key      instantly_api_key    │    │
│   │   openai_api_key      anthropic_api_key   twilio_credentials   │    │
│   │                                                                 │    │
│   │   Encryption: AES-256-GCM                                      │    │
│   │   Key derivation: PBKDF2 from org-specific secret              │    │
│   └───────────────────────────────────────────────────────────────┘    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Encryption Implementation

```typescript
// src/lib/encryption.ts
import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;

export function encryptCredentials(plaintext: string, orgSecret: string): Buffer {
  const key = crypto.pbkdf2Sync(orgSecret, process.env.ENCRYPTION_SALT!, 100000, 32, 'sha256');
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  
  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();
  
  return Buffer.concat([iv, authTag, encrypted]);
}

export function decryptCredentials(encrypted: Buffer, orgSecret: string): string {
  const key = crypto.pbkdf2Sync(orgSecret, process.env.ENCRYPTION_SALT!, 100000, 32, 'sha256');
  
  const iv = encrypted.slice(0, IV_LENGTH);
  const authTag = encrypted.slice(IV_LENGTH, IV_LENGTH + AUTH_TAG_LENGTH);
  const ciphertext = encrypted.slice(IV_LENGTH + AUTH_TAG_LENGTH);
  
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);
  
  return decipher.update(ciphertext) + decipher.final('utf8');
}
```

### Rate Limiting

```typescript
// src/middleware/rate-limit.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
});

// Different limits for different endpoints
export const rateLimits = {
  // API routes
  api: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(100, "1m"), // 100 req/min
  }),
  
  // Campaign creation (expensive)
  createCampaign: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "1h"), // 10/hour
  }),
  
  // Export (resource intensive)
  export: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "1h"), // 5/hour
  }),
  
  // Auth endpoints (prevent brute force)
  auth: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "15m"), // 5 attempts per 15 min
  }),
};

// Usage in middleware
export async function rateLimit(req: Request, limiter: Ratelimit) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  const { success, limit, remaining } = await limiter.limit(ip);
  
  if (!success) {
    return new Response('Too Many Requests', { status: 429 });
  }
  
  return null; // Continue
}
```

### Data Privacy

```typescript
// Data retention policies
const RETENTION_POLICIES = {
  // Lead data: Keep for 2 years, then anonymize
  prospects: { retentionDays: 730, action: 'anonymize' },
  
  // Contact emails: Delete after 1 year of inactivity
  contacts: { retentionDays: 365, action: 'delete' },
  
  // Usage logs: Keep for 90 days
  usageLogs: { retentionDays: 90, action: 'delete' },
  
  // Outreach history: Keep for 1 year
  outreachEmails: { retentionDays: 365, action: 'anonymize' },
};

// GDPR: Right to deletion
export async function deleteUserData(userId: string) {
  await supabase.rpc('delete_user_data', { user_id: userId });
  // This cascades to all related data via FK constraints
}

// GDPR: Right to export
export async function exportUserData(userId: string) {
  const data = await supabase.rpc('export_user_data', { user_id: userId });
  return JSON.stringify(data, null, 2);
}
```

### Security Headers (Vercel)

```json
// vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
        { "key": "Content-Security-Policy", "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';" }
      ]
    }
  ]
}
```

---

## 8. Deployment Pipeline

### Git Workflow

```
main (production)
  │
  ├── staging (preview)
  │     │
  │     └── feature/xxx (development)
  │
  └── hotfix/xxx (emergency fixes)
```

### CI/CD with GitHub Actions

```yaml
# .github/workflows/ci.yml
name: CI/CD

on:
  push:
    branches: [main, staging]
  pull_request:
    branches: [main, staging]

env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

jobs:
  lint-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: pnpm/action-setup@v2
        with:
          version: 8
          
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
          
      - run: pnpm install --frozen-lockfile
      
      - name: Lint
        run: pnpm lint
        
      - name: Type check
        run: pnpm type-check
        
      - name: Unit tests
        run: pnpm test
        
      - name: E2E tests (staging only)
        if: github.ref == 'refs/heads/staging'
        run: pnpm test:e2e
        env:
          DATABASE_URL: ${{ secrets.STAGING_DATABASE_URL }}

  deploy-preview:
    needs: lint-test
    if: github.event_name == 'pull_request'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Vercel (Preview)
        run: |
          npm i -g vercel
          vercel pull --yes --environment=preview --token=${{ secrets.VERCEL_TOKEN }}
          vercel build --token=${{ secrets.VERCEL_TOKEN }}
          vercel deploy --prebuilt --token=${{ secrets.VERCEL_TOKEN }}

  deploy-staging:
    needs: lint-test
    if: github.ref == 'refs/heads/staging'
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Vercel (Staging)
        run: |
          npm i -g vercel
          vercel pull --yes --environment=preview --token=${{ secrets.VERCEL_TOKEN }}
          vercel build --token=${{ secrets.VERCEL_TOKEN }}
          vercel deploy --prebuilt --token=${{ secrets.VERCEL_TOKEN }}
          
      - name: Run DB migrations
        run: pnpm db:migrate
        env:
          DATABASE_URL: ${{ secrets.STAGING_DATABASE_URL }}

  deploy-production:
    needs: lint-test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Vercel (Production)
        run: |
          npm i -g vercel
          vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
          vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
          vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
          
      - name: Run DB migrations
        run: pnpm db:migrate
        env:
          DATABASE_URL: ${{ secrets.PRODUCTION_DATABASE_URL }}
          
      - name: Notify Slack
        uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {"text": "🚀 Deployed to production: ${{ github.sha }}"}
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
```

### Environment Configuration

```bash
# .env.local (development)
DATABASE_URL=postgresql://localhost:5432/leadgen_dev
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=local-anon-key
SUPABASE_SERVICE_KEY=local-service-key

# Vercel Environment Variables (set in dashboard)
# Production:
DATABASE_URL=postgresql://xxx@db.supabase.co:5432/postgres
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
# ... etc

# Staging:
DATABASE_URL=postgresql://xxx@db.supabase.co:5432/postgres_staging
# ... etc
```

### Database Migration Strategy

```typescript
// Using Drizzle ORM for migrations
// drizzle.config.ts
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
});

// Migration commands
// pnpm db:generate  -- Generate migration from schema changes
// pnpm db:migrate   -- Apply migrations
// pnpm db:push      -- Push schema directly (dev only)
```

---

## 9. Cost Estimates

### Infrastructure Costs by Scale

#### 100 Users (MVP/Launch)

| Service | Tier | Monthly Cost |
|---------|------|--------------|
| **Vercel** | Hobby | $0 |
| **Supabase** | Free | $0 |
| **Inngest** | Free (25K runs) | $0 |
| **Upstash Redis** | Free (10K commands/day) | $0 |
| **Resend** | Free (100/day) | $0 |
| **Domain** | - | $15 |
| **TOTAL INFRA** | | **$15/mo** |

| External APIs | Est. Usage | Monthly Cost |
|---------------|------------|--------------|
| Google Maps | 5K calls | $85 |
| Hunter.io | Starter (2K) | $34 |
| Firecrawl | Hobby (3K) | $16 |
| Claude API | ~$50 | $50 |
| **TOTAL APIs** | | **$185/mo** |

**Total: ~$200/mo**  
**Revenue at 100 users (avg $150/user): $15,000/mo**  
**Margin: 98.7%**

---

#### 1,000 Users (Growth)

| Service | Tier | Monthly Cost |
|---------|------|--------------|
| **Vercel** | Pro | $20 |
| **Supabase** | Pro | $25 |
| **Inngest** | Pro (100K runs) | $50 |
| **Upstash Redis** | Pay-as-you-go | $20 |
| **Resend** | Pro | $20 |
| **Monitoring** | Sentry + Axiom | $50 |
| **TOTAL INFRA** | | **$185/mo** |

| External APIs | Est. Usage | Monthly Cost |
|---------------|------------|--------------|
| Google Maps | 50K calls | $275 |
| Hunter.io | Growth (10K) | $104 |
| Firecrawl | Standard (100K) | $83 |
| Claude API | ~$300 | $300 |
| Apollo.io | Pro | $99 |
| **TOTAL APIs** | | **$861/mo** |

**Total: ~$1,050/mo**  
**Revenue at 1K users (avg $175/user): $175,000/mo**  
**Margin: 99.4%**

---

#### 10,000 Users (Scale)

| Service | Tier | Monthly Cost |
|---------|------|--------------|
| **Vercel** | Enterprise | $500 |
| **Supabase** | Team | $599 |
| **Inngest** | Enterprise | $500 |
| **Upstash Redis** | Pro | $100 |
| **Resend** | Business | $100 |
| **Monitoring** | Full stack | $200 |
| **Support tools** | Intercom, etc. | $300 |
| **TOTAL INFRA** | | **$2,299/mo** |

| External APIs | Est. Usage | Monthly Cost |
|---------------|------------|--------------|
| Google Maps | 500K calls | $1,200 |
| Hunter.io | Scale (25K) | $209 |
| Firecrawl | Growth (500K) | $333 |
| Claude API | ~$2,000 | $2,000 |
| Apollo.io | Organization | $149 |
| Instantly | Business | $97 |
| **TOTAL APIs** | | **$3,988/mo** |

**Total: ~$6,300/mo**  
**Revenue at 10K users (avg $200/user): $2,000,000/mo**  
**Margin: 99.7%**

---

### Cost Per Lead by Scale

| Scale | Total Monthly Cost | Leads Generated | Cost Per Lead |
|-------|-------------------|-----------------|---------------|
| 100 users | $200 | ~50,000 | $0.004 |
| 1K users | $1,050 | ~500,000 | $0.002 |
| 10K users | $6,300 | ~5,000,000 | $0.001 |

**Note:** These margins assume efficient caching and deduplication. Without caching, API costs would be 3-5x higher.

---

## 10. Reusable Components from slc-lead-gen

### Direct Ports (Copy & Adapt)

| File | Purpose | Effort | Notes |
|------|---------|--------|-------|
| `services/lead-discovery.js` | Google Maps + Yelp scraping | 2h | Wrap as Inngest function |
| `services/website-scorer.js` | Lighthouse scoring | 1h | Convert to Edge function |
| `services/business-scraper.js` | Website extraction | 2h | Replace with Firecrawl |
| `services/email-generator.js` | AI email creation | 3h | Update prompts, add tRPC |
| `services/pipeline.js` | Orchestration logic | 4h | Convert to Inngest events |
| `v2/agents/*.md` | Agent prompts | 0h | Use directly in Claude calls |
| `services/twilio-client.js` | SMS/voice | 1h | Wrap for multi-tenant |

### Code to Rewrite

| Component | Reason | New Approach |
|-----------|--------|--------------|
| `services/db.js` | File-based storage | Supabase + Drizzle ORM |
| Auth | None existed | Supabase Auth |
| UI | CLI-based | Next.js + shadcn/ui |
| Billing | None | Stripe integration |

### Agent Prompts (100% Reusable)

```
slc-lead-gen/v2/agents/
├── researcher.md      → src/lib/prompts/researcher.ts
├── list-builder.md    → src/lib/prompts/discovery.ts  
├── outreach.md        → src/lib/prompts/outreach.ts
├── qualifier.md       → src/lib/prompts/scorer.ts
└── content.md         → src/lib/prompts/content.ts
```

### Estimated Porting Effort

| Category | Hours |
|----------|-------|
| Core services | 12h |
| Agent prompts | 2h |
| Pipeline logic | 4h |
| Testing/validation | 8h |
| **TOTAL** | **26h (~3-4 days)** |

This represents **~60-70% of backend logic** already built.

---

## Appendix A: Technology Versions

```json
{
  "runtime": {
    "node": "20.x",
    "pnpm": "8.x"
  },
  "framework": {
    "next": "14.x",
    "react": "18.x",
    "typescript": "5.x"
  },
  "database": {
    "supabase": "latest",
    "drizzle-orm": "0.29.x"
  },
  "ui": {
    "tailwindcss": "3.x",
    "shadcn-ui": "latest",
    "radix-ui": "latest"
  },
  "api": {
    "trpc": "11.x",
    "zod": "3.x"
  },
  "infrastructure": {
    "vercel": "latest",
    "inngest": "3.x",
    "stripe": "14.x"
  },
  "ai": {
    "anthropic-sdk": "0.x",
    "firecrawl": "0.x"
  }
}
```

---

## Appendix B: File Structure

```
leadgen-saas/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (auth)/              # Auth pages (login, signup)
│   │   ├── (dashboard)/         # Protected dashboard pages
│   │   │   ├── campaigns/
│   │   │   ├── prospects/
│   │   │   ├── outreach/
│   │   │   └── settings/
│   │   ├── api/
│   │   │   ├── trpc/[trpc]/     # tRPC handler
│   │   │   ├── webhooks/        # External webhooks
│   │   │   └── inngest/         # Inngest handler
│   │   └── layout.tsx
│   │
│   ├── components/
│   │   ├── ui/                  # shadcn components
│   │   ├── campaigns/
│   │   ├── prospects/
│   │   └── outreach/
│   │
│   ├── lib/
│   │   ├── integrations/        # External API clients
│   │   │   ├── apollo.ts
│   │   │   ├── hunter.ts
│   │   │   ├── instantly.ts
│   │   │   ├── firecrawl.ts
│   │   │   └── google-maps.ts
│   │   ├── prompts/             # AI prompt templates
│   │   ├── encryption.ts
│   │   └── utils.ts
│   │
│   ├── server/
│   │   ├── routers/             # tRPC routers
│   │   ├── db/                  # Drizzle schema + queries
│   │   └── auth.ts              # Auth helpers
│   │
│   └── inngest/
│       ├── client.ts            # Inngest client
│       └── functions/           # Job definitions
│           ├── discovery.ts
│           ├── enrichment.ts
│           ├── scoring.ts
│           └── outreach.ts
│
├── drizzle/                     # DB migrations
├── public/
├── tests/
├── .env.local
├── .env.example
├── drizzle.config.ts
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Summary

This architecture is designed for **speed to market** and **scalability**:

1. **Zero-ops infrastructure** — Vercel + Supabase + Inngest = no servers to manage
2. **Multi-tenant by default** — RLS handles isolation automatically
3. **Event-driven agents** — Inngest step functions make AI orchestration reliable
4. **BYOK model** — Users bring their own API keys, reducing our costs
5. **60-70% code reuse** — slc-lead-gen already has the hard parts built

**MVP Timeline:** 4 weeks with one developer  
**Break-even:** ~50 paying users  
**Target margin:** 98%+ gross margin at all scales

---

*Document complete. Ship it.*
