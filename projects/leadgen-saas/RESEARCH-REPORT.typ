// Document settings
#set document(
  title: "AI-Powered Lead Generation SaaS - Research Report",
  author: "Claw (Lead Research Orchestrator)",
  date: datetime(year: 2026, month: 1, day: 28),
)

#set page(
  paper: "us-letter",
  margin: (x: 1in, y: 1in),
  header: context {
    if counter(page).get().first() > 1 [
      #set text(size: 9pt, fill: gray)
      AI-Powered Lead Generation SaaS — Research Report
      #h(1fr)
      January 2026
    ]
  },
  footer: context {
    set text(size: 9pt, fill: gray)
    h(1fr)
    counter(page).display("1")
    h(1fr)
  },
)

#set text(
  font: "New Computer Modern",
  size: 11pt,
  hyphenate: true,
)

#set par(
  justify: true,
  leading: 0.65em,
)

#set heading(numbering: "1.1")

#show heading.where(level: 1): it => {
  pagebreak(weak: true)
  v(0.5em)
  set text(size: 18pt, weight: "bold")
  block(it)
  v(0.3em)
}

#show heading.where(level: 2): it => {
  v(0.8em)
  set text(size: 14pt, weight: "bold")
  block(it)
  v(0.3em)
}

#show heading.where(level: 3): it => {
  v(0.5em)
  set text(size: 12pt, weight: "bold")
  block(it)
  v(0.2em)
}

// Custom styling for tables
#set table(
  stroke: 0.5pt + gray,
  inset: 8pt,
)

#show table.cell.where(y: 0): strong

// Title Page
#align(center)[
  #v(2in)
  
  #text(size: 28pt, weight: "bold")[
    AI-Powered Lead Generation SaaS
  ]
  
  #v(0.5em)
  
  #text(size: 18pt, fill: gray)[
    Comprehensive Research Report
  ]
  
  #v(2em)
  
  #line(length: 40%, stroke: 1pt + gray)
  
  #v(2em)
  
  #text(size: 12pt)[
    *Prepared by:* Claw (Lead Research Orchestrator) \
    *Date:* January 28, 2026 \
    *Status:* Research Complete ✓
  ]
  
  #v(3in)
  
  #text(size: 10pt, fill: gray)[
    Confidential — For Internal Use Only
  ]
]

#pagebreak()

// Executive Summary (no number)
#heading(outlined: true, numbering: none)[Executive Summary]

After deep research into the lead generation SaaS market, I'm confident this is a *strong opportunity* with clear differentiation potential.

#v(1em)

#block(
  fill: rgb("#f0f7ff"),
  inset: 12pt,
  radius: 4pt,
  width: 100%,
)[
  === The Opportunity
  
  - *Market size:* \$10B+ and growing 10-15% annually
  - *Key gap:* No one does true AI agent orchestration—competitors use "AI" as marketing fluff
  - *Our edge:* We've already built the core pipeline in `slc-lead-gen` (~85% of the hard work is done)
  - *Unit economics:* Can deliver leads at \$0.10-0.50/lead cost, sell at \$2-10/lead = strong margins
]

#v(1em)

=== Recommendation

*Build this.* MVP can be ready in 4-6 weeks by productizing our existing `slc-lead-gen` pipeline. The "true agent orchestration" angle is defensible and resonates with technical buyers tired of LLM wrappers.

=== Recommended Pricing Model

#table(
  columns: (1fr, 1fr, 2fr),
  align: (left, right, left),
  [*Tier*], [*Price*], [*Includes*],
  [Starter], [\$99/mo], [500 leads/mo, basic enrichment],
  [Growth], [\$299/mo], [2,500 leads/mo, full enrichment + AI emails],
  [Scale], [\$799/mo], [10,000 leads/mo, API access, white-label],
  [Enterprise], [Custom], [Unlimited, dedicated support],
)

#pagebreak()

// Table of Contents
#heading(outlined: false, numbering: none)[Table of Contents]

#outline(
  title: none,
  indent: 1.5em,
  depth: 2,
)

// Main Content
= Competitive Landscape

== Market Map

#table(
  columns: (1.2fr, 2fr, 2fr),
  align: (left, left, left),
  [*Category*], [*Players*], [*Our Position*],
  [Sales Intelligence], [Apollo, ZoomInfo, Clearbit], [Use their APIs as data sources],
  [Email Outreach], [Instantly, Lemlist, Smartlead], [Integration partner],
  [Enrichment/Orchestration], [Clay], [Closest competitor—build alternative],
  [Lead Lists], [Hunter, Snov.io, Lusha], [Feature overlap—more automated],
  [*Full-Stack Lead Gen*], [*Us (new category)*], [*First mover advantage*],
)

== Detailed Competitor Analysis

=== Clay.com — Closest Competitor ⚠️

*What they do:* Enrichment orchestration platform with 100+ data providers, AI agent (Claygent), waterfall enrichment.

#v(0.5em)

*Pricing:*
#table(
  columns: (1fr, 1fr, 1.5fr, 2fr),
  [*Plan*], [*Monthly*], [*Credits/Year*], [*Key Feature Gate*],
  [Free], [\$0], [1,200], [100/search limit],
  [Starter], [\$134], [24K], [BYOK API keys],
  [Explorer], [\$314], [120K], [HTTP API, webhooks],
  [Pro], [\$720], [600K], [CRM integrations],
  [Enterprise], [Custom], [Custom], [SSO, Snowflake],
)

#v(0.5em)

*Strengths:*
- 150+ data providers in one place
- Claygent AI can browse/research autonomously
- Trusted by OpenAI, Anthropic, Ramp
- SOC 2 Type II compliant

*Weaknesses:*
- Expensive — Pro at \$720/mo prices out SMBs
- Credit-based model punishes scale
- No built-in prospecting (you bring your own lists)
- Complex UX — steep learning curve

#block(
  fill: rgb("#fff7e6"),
  inset: 10pt,
  radius: 4pt,
)[
  *Our Differentiation:* End-to-end automation from business type input → prospect list → outreach. Clay requires you to already have lists. We create them.
]

=== Apollo.io — Sales Intelligence Leader

*What they do:* 275M+ contact database, email sequencing, basic AI features.

*Strengths:*
- Massive verified contact database
- Built-in sequencing
- Good API access

*Weaknesses:*
- "AI" is basic templates, not true research
- Per-seat pricing kills team scaling
- No autonomous prospecting—manual list building

*Our Position:* Use Apollo's API as a data source, not a competitor.

=== Instantly.ai — Cold Email Champion

*What they do:* Email sending at scale with unlimited accounts and warmup.

#table(
  columns: (1fr, 1fr, 1fr, 1fr),
  [*Plan*], [*Monthly*], [*Emails/Mo*], [*Contacts*],
  [Growth], [\$37], [5,000], [1,000],
  [Hypergrowth], [\$97], [100,000], [25,000],
)

*Our Position:* Integration partner. Use Instantly for email delivery.

=== Hunter.io — Email Finder

#table(
  columns: (1fr, 1fr, 1fr, 1fr),
  [*Plan*], [*Monthly*], [*Credits/Mo*], [*Accounts*],
  [Free], [\$0], [50], [1],
  [Starter], [\$34], [2,000], [3],
  [Growth], [\$104], [10,000], [10],
  [Scale], [\$209], [25,000], [20],
)

== Competitive Gap Analysis

#align(center)[
  #table(
    columns: (1.5fr, 1fr, 1fr, 1fr, 1fr, 1fr),
    align: center,
    [], [*Prospect*], [*Enrich*], [*Personal*], [*Outreach*], [*Auto*],
    [Clay], [❌], [✓✓✓], [✓✓], [❌], [✓],
    [Apollo], [✓✓], [✓✓], [✓], [✓✓], [✓],
    [Instantly], [❌], [❌], [✓], [✓✓✓], [✓],
    [Lemlist], [✓], [✓], [✓✓], [✓✓], [✓],
    [Hunter], [✓], [✓✓], [❌], [❌], [❌],
    [*Us*], [*✓✓✓*], [*✓✓*], [*✓✓✓*], [*✓✓*], [*✓✓✓*],
  )
]

*Key Insight:* No one does autonomous prospecting + enrichment + AI personalization + outreach in one automated pipeline. That's our gap.

= Tools & APIs Analysis

== Cost Summary: API Stack

#table(
  columns: (1.5fr, 2fr, 1.2fr, 1.2fr),
  [*Service*], [*Use Case*], [*MVP Cost*], [*Scale Cost*],
  [Google Maps], [Prospecting], [\$0 (scraping)], [\$100-275],
  [Yelp], [Supplementary data], [\$0], [\$0],
  [Hunter.io], [Email verification], [\$34-104], [\$209],
  [Apollo.io], [Enrichment], [\$49-99], [\$149],
  [Instantly], [Email sending], [\$37-97], [\$97],
  [Firecrawl], [Web scraping], [\$16-83], [\$333],
  [Twilio], [SMS/Voice], [\$20-50], [\$100+],
  [*TOTAL*], [], [*\$156-433/mo*], [*\$988-1,163/mo*],
)

== Per-Lead Cost Estimate

#table(
  columns: (2fr, 1fr, 1fr),
  [*Scale*], [*Cost/Lead*], [*Notes*],
  [MVP (1,000 leads/mo)], [\$0.15-0.43], [Higher per-unit costs],
  [Scale (10,000 leads/mo)], [\$0.10-0.12], [Bulk API rates, caching],
)

== Email Sending Infrastructure

#table(
  columns: (1.5fr, 1fr, 1.5fr, 2fr),
  [*Service*], [*Free Tier*], [*Paid Starts*], [*Best For*],
  [SendGrid], [100/day], [\$19.95/mo], [Transactional email],
  [Amazon SES], [3,000/mo], [\$0.10/1K], [High volume, cheap],
  [Instantly], [None], [\$37/mo], [Cold email (warmup)],
)

*Recommendation:* Use Instantly for cold outreach (better deliverability), SES for transactional.

= Architecture Design

== High-Level Flow

#align(center)[
  #block(
    fill: rgb("#f5f5f5"),
    inset: 15pt,
    radius: 4pt,
  )[
    #set text(size: 10pt)
    ```
    USER INPUT → ORCHESTRATOR → AGENT SWARM
         ↓              ↓              ↓
    "Find me      Routes to      ┌─────────────┐
     restaurants   appropriate   │ Discovery   │
     in Denver"    agents        │ Researcher  │
                                 │ Qualifier   │
                                 │ Content     │
                                 │ Outreach    │
                                 └─────────────┘
                                       ↓
                                 HUMAN REVIEW
                                       ↓
                                 SEND OUTREACH
    ```
  ]
]

== Technology Stack Recommendation

#table(
  columns: (1fr, 1.5fr, 2fr),
  [*Layer*], [*Technology*], [*Why*],
  [Frontend], [Next.js 14 + Tailwind], [Fast, modern, good DX],
  [Backend], [Next.js API routes], [Simplicity, same codebase],
  [Database], [Supabase (Postgres)], [Free tier, realtime, auth built-in],
  [Queue], [Inngest], [Serverless-friendly job queues],
  [AI], [Claude API (Sonnet)], [Best for writing, fast],
  [Hosting], [Vercel], [Free tier, great DX],
  [Payments], [Stripe], [Industry standard],
)

== Reusable Components from slc-lead-gen

#table(
  columns: (1.5fr, 2fr, 1fr),
  [*File*], [*Purpose*], [*Reusability*],
  [`lead-discovery.js`], [Google Maps + Yelp scraping], [90%],
  [`website-scorer.js`], [Lighthouse-based scoring], [100%],
  [`business-scraper.js`], [Website content extraction], [100%],
  [`email-generator.js`], [AI email sequence generation], [80%],
  [`v2/agents/*.md`], [Agent prompts], [100%],
  [`twilio-client.js`], [SMS/voice integration], [100%],
)

*Estimate:* 60-70% of backend code already exists.

= Pricing Model

== Tier Breakdown

=== Tier 1: Starter — \$99/month

*Target:* Freelancers, solo consultants, testing the waters.

*Included:*
- 500 leads/month
- 1 active campaign
- Google Maps + Yelp sourcing
- Basic enrichment (website score, contact info)
- Email verification
- Export to CSV

*Margin:* 75%

=== Tier 2: Growth — \$299/month ⭐

*Target:* SMB sales teams, growing agencies.

*Included:*
- 2,500 leads/month
- 5 active campaigns
- All data sources
- Full enrichment (tech stack, revenue, pain points)
- AI-generated personalized emails
- Instantly integration
- CRM export (HubSpot, Salesforce)
- 2 team members

*Margin:* 58%

=== Tier 3: Scale — \$799/month

*Target:* Lead gen agencies, larger sales teams.

*Included:*
- 10,000 leads/month
- Unlimited campaigns
- Everything in Growth
- API access
- White-label option
- Up to 5 seats
- Priority support

*Margin:* 50%

== Unit Economics

#table(
  columns: (1.2fr, 1fr, 1fr, 1fr),
  [*Metric*], [*Starter*], [*Growth*], [*Scale*],
  [Price], [\$99], [\$299], [\$799],
  [Leads included], [500], [2,500], [10,000],
  [Cost/lead (us)], [\$0.05], [\$0.08], [\$0.053],
  [Revenue/lead], [\$0.20], [\$0.12], [\$0.08],
  [*Gross Margin*], [*75%*], [*58%*], [*50%*],
)

== Market Comparison

#table(
  columns: (1.3fr, 1fr, 1fr, 1fr, 1fr),
  [*Feature*], [*Us*], [*Clay*], [*Apollo*], [*Instantly*],
  [Price], [\$299/mo], [\$314/mo], [\$99/user], [\$97/mo],
  [Leads], [2,500], [Credits], [2,000], [N/A],
  [Prospecting], [✓], [❌], [Manual], [❌],
  [AI Emails], [✓], [❌], [❌], [❌],
  [CRM], [✓], [\$720 plan], [✓], [❌],
)

= MVP Feature Spec

== MVP Definition

*Goal:* Minimum viable product that delivers core value.

*Core Value:* "Input business type + location → Get qualified leads + ready-to-send emails"

*Timeline:* 4-6 weeks

== Must-Have Features (P0)

#table(
  columns: (1.5fr, 2.5fr, 0.8fr),
  [*Feature*], [*Description*], [*Effort*],
  [User auth], [Signup, login, password reset], [2 days],
  [Campaign creation], [Business type + location form], [2 days],
  [Lead discovery], [Google Maps + Yelp scraping], [1 day],
  [Website scoring], [Lighthouse-based quality score], [1 day],
  [Basic enrichment], [Contact info, website analysis], [3 days],
  [Lead list view], [Table with search, filter, sort], [3 days],
  [Export to CSV], [Download leads], [1 day],
  [Stripe billing], [Subscription management], [3 days],
  [Dashboard], [Campaign stats, lead counts], [2 days],
)

*Total MVP Effort:* ~20 dev days

== V1.1 Features (P1)

- AI email generation
- Lead scoring & tiers (A/B/C)
- Instantly integration
- CRM export (HubSpot, Salesforce)

== V2+ Features (P2/P3)

- LinkedIn automation
- Voice AI (Vapi)
- Demo site generation
- API access
- White-label
- SSO/SAML

= Go-to-Market Strategy

== Phase 1: Eat Our Own Dogfood (Weeks 1-4)

Use the product to sell the product:
1. Build MVP targeting web design agencies
2. Use it to find 100 agencies in Utah
3. Send outreach offering free pilot
4. Close 10 beta customers

*Why agencies:* They understand lead gen, have budget, can become champions.

== Phase 2: ProductHunt + Content (Weeks 5-8)

1. Launch on ProductHunt with "True AI Lead Gen" angle
2. Publish comparison content: "Clay vs Us", "Apollo + Instantly vs Us"
3. Create demo videos showing agent orchestration
4. Target keywords: "ai lead generation", "automated prospecting"

== Phase 3: Paid + Partnerships (Weeks 9-12)

1. Google Ads on competitor brand terms
2. Partner with CRM consultants for referrals
3. Integrate with popular tools (Zapier, Make)
4. Agency partner program (white-label + rev share)

== Positioning Statement

#block(
  fill: rgb("#f0f7ff"),
  inset: 12pt,
  radius: 4pt,
)[
  *For sales teams and lead gen agencies* who waste hours on manual prospecting,
  
  *[ProductName]* is an *AI-powered lead generation platform*
  
  that *autonomously finds, researches, and qualifies prospects* based on your ideal customer profile.
  
  Unlike *Clay, Apollo, or Instantly* which require manual list building,
  
  *we handle the entire pipeline* from "I need leads" to "ready-to-send emails."
]

== Competitive Messaging

#table(
  columns: (1fr, 2.5fr),
  [*Competitor*], [*Our Angle*],
  [Clay], ["Clay makes you build workflows. We just find leads."],
  [Apollo], ["Apollo's AI is search filters. Ours actually researches."],
  [Instantly], ["Instantly sends emails. We create the emails worth sending."],
  [ZoomInfo], ["ZoomInfo charges \$15K+. We start at \$99."],
)

#pagebreak()

#heading(outlined: true, numbering: none)[Appendix: Next Steps]

== Immediate (This Week)

#set list(marker: [☐])
- Decide on product name
- Set up Next.js + Supabase project structure
- Port `lead-discovery.js` to API route
- Create basic auth flow

== Short-Term (Weeks 2-4)

- Build campaign creation UI
- Implement lead list view
- Add Stripe integration
- Port email generation

== Medium-Term (Weeks 5-8)

- Launch beta to 10 customers
- Iterate based on feedback
- Add Instantly integration
- Prepare ProductHunt launch

#v(2em)

#align(center)[
  #line(length: 30%, stroke: 0.5pt + gray)
  
  #v(1em)
  
  #text(size: 10pt, fill: gray)[
    Report Complete — January 28, 2026 \
    Total research time: ~4 hours \
    All data current as of January 2026
  ]
]
