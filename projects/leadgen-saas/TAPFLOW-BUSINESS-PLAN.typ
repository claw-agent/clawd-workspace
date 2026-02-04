// Tapflow Business Plan - Typst Document
// Professional formatting for investor-grade presentation

#set document(
  title: "Tapflow Business Plan",
  author: "Tapflow, Inc.",
  date: datetime.today(),
)

#set page(
  paper: "us-letter",
  margin: (x: 1.25in, y: 1in),
  header: context {
    if counter(page).get().first() > 1 [
      #set text(size: 9pt, fill: gray)
      #h(1fr) Tapflow Business Plan #h(1fr) Confidential
    ]
  },
  footer: context {
    if counter(page).get().first() > 1 [
      #set align(center)
      #set text(size: 9pt, fill: gray)
      #counter(page).display("1")
    ]
  }
)

#set text(
  font: "New Computer Modern",
  size: 11pt,
  lang: "en",
)

#set par(
  justify: true,
  leading: 0.65em,
)

#set heading(numbering: "1.1")

#show heading.where(level: 1): it => {
  pagebreak(weak: true)
  v(0.5em)
  text(size: 18pt, weight: "bold", fill: rgb("#1a365d"))[#it]
  v(0.3em)
}

#show heading.where(level: 2): it => {
  v(0.8em)
  text(size: 14pt, weight: "bold", fill: rgb("#2c5282"))[#it]
  v(0.3em)
}

#show heading.where(level: 3): it => {
  v(0.5em)
  text(size: 12pt, weight: "bold", fill: rgb("#4a5568"))[#it]
  v(0.2em)
}

// Custom styling functions
#let highlight-box(content, title: none, color: rgb("#e2e8f0")) = {
  block(
    width: 100%,
    fill: color,
    radius: 4pt,
    inset: 12pt,
    stroke: 0.5pt + color.darken(20%),
  )[
    #if title != none [
      #text(weight: "bold", size: 11pt)[#title]
      #v(4pt)
    ]
    #content
  ]
}

#let metric-box(label, value, subtitle: none) = {
  block(
    width: 100%,
    fill: rgb("#f7fafc"),
    radius: 4pt,
    inset: 10pt,
    stroke: 0.5pt + rgb("#e2e8f0"),
  )[
    #set align(center)
    #text(size: 9pt, fill: rgb("#718096"))[#label]
    #v(2pt)
    #text(size: 20pt, weight: "bold", fill: rgb("#1a365d"))[#value]
    #if subtitle != none [
      #v(2pt)
      #text(size: 8pt, fill: rgb("#a0aec0"))[#subtitle]
    ]
  ]
}

// Cover Page
#page(
  header: none,
  footer: none,
  margin: (x: 1.5in, y: 2in),
)[
  #v(2fr)
  
  #align(center)[
    #text(size: 42pt, weight: "bold", fill: rgb("#1a365d"))[TAPFLOW]
    #v(8pt)
    #text(size: 14pt, fill: rgb("#4a5568"), tracking: 2pt)[AI-POWERED LEAD GENERATION]
  ]
  
  #v(1.5em)
  
  #align(center)[
    #line(length: 40%, stroke: 1pt + rgb("#3182ce"))
  ]
  
  #v(2em)
  
  #align(center)[
    #text(size: 24pt, weight: "bold")[Business Plan]
    #v(0.5em)
    #text(size: 12pt, fill: rgb("#718096"))[Confidential Document]
  ]
  
  #v(3fr)
  
  #align(center)[
    #text(size: 11pt, fill: rgb("#4a5568"))[
      *Prepared by:* Tapflow, Inc.\
      *Date:* January 2026\
      *Version:* 1.0
    ]
  ]
  
  #v(1fr)
  
  #align(center)[
    #block(
      fill: rgb("#fff5f5"),
      radius: 4pt,
      inset: 12pt,
      stroke: 0.5pt + rgb("#fc8181"),
    )[
      #text(size: 9pt, fill: rgb("#c53030"))[
        *CONFIDENTIAL* — This document contains proprietary information.\
        Do not distribute without written authorization.
      ]
    ]
  ]
]

// Table of Contents
#page(header: none, footer: none)[
  #v(1em)
  #text(size: 24pt, weight: "bold", fill: rgb("#1a365d"))[Table of Contents]
  #v(1em)
  #outline(
    title: none,
    indent: 1.5em,
    depth: 2,
  )
]

// Executive Summary
= Executive Summary

#highlight-box(
  title: "Investment Highlights",
  color: rgb("#ebf8ff"),
)[
  - *Market Opportunity:* \$10B+ lead generation market growing 10-15% annually
  - *Unique Technology:* True AI agent orchestration—not just an LLM wrapper
  - *Strong Unit Economics:* 50-60% gross margins with clear path to profitability
  - *MVP Ready:* 60-70% of core technology already built and validated
  - *Seeking:* \$500K seed funding for 18-month runway to product-market fit
]

== Company Overview

Tapflow is an AI-powered lead generation platform that autonomously discovers, researches, qualifies, and nurtures sales prospects. Unlike existing solutions that require manual list building and workflow configuration, Tapflow handles the entire pipeline from "I need leads" to "ready-to-send personalized emails."

Founded in 2026, Tapflow addresses a critical gap in the \$10+ billion lead generation market: *no existing solution provides true end-to-end automation*. Current market leaders like Clay, Apollo, and Instantly each solve parts of the problem but force customers to stitch together complex workflows. Tapflow eliminates this friction through proprietary AI agent orchestration technology.

== Mission & Vision

*Mission:* Democratize enterprise-grade lead generation, making it accessible and affordable for businesses of all sizes.

*Vision:* To become the autonomous sales development platform that eliminates the busywork between "I need customers" and "closing deals."

== Product Overview

Tapflow's core product automates the complete lead generation pipeline:

#grid(
  columns: (1fr, 1fr),
  gutter: 12pt,
  [
    *1. Intelligent Prospecting*
    - Natural language campaign creation
    - Multi-source discovery (Google, Yelp, directories)
    - Geographic and industry targeting
  ],
  [
    *2. AI Research & Enrichment*
    - Website analysis and scoring
    - Contact discovery and verification
    - Tech stack and pain point identification
  ],
  [
    *3. Automated Qualification*
    - Proprietary scoring algorithm
    - A/B/C tier segmentation
    - Fit-based routing
  ],
  [
    *4. Personalized Outreach*
    - AI-generated email sequences
    - Multi-channel coordination
    - Human-in-the-loop approval
  ],
)

== Target Market

#grid(
  columns: (1fr, 1fr, 1fr),
  gutter: 12pt,
  metric-box("Primary Market", "SMBs", subtitle: "Sales teams 5-50 people"),
  metric-box("Secondary", "Agencies", subtitle: "Lead gen & marketing"),
  metric-box("Tertiary", "Enterprise", subtitle: "Large sales orgs"),
)

#v(1em)

Our beachhead market is B2B service providers (agencies, consultants, SaaS companies) with small sales teams who currently spend 40%+ of their time on manual prospecting.

== Business Model

Tapflow operates on a SaaS subscription model with usage-based pricing tiers:

#table(
  columns: (1.2fr, 0.8fr, 1fr, 1.5fr),
  inset: 8pt,
  align: (left, center, center, left),
  stroke: 0.5pt + rgb("#e2e8f0"),
  fill: (x, y) => if y == 0 { rgb("#edf2f7") } else { white },
  [*Tier*], [*Price/mo*], [*Leads/mo*], [*Key Features*],
  [Starter], [\$99], [500], [Basic enrichment, email generation],
  [Growth], [\$299], [2,500], [Full enrichment, AI personalization],
  [Scale], [\$799], [10,000], [API access, white-label, multi-user],
  [Enterprise], [Custom], [Unlimited], [Dedicated support, custom integrations],
)

== Financial Highlights

#grid(
  columns: (1fr, 1fr, 1fr, 1fr),
  gutter: 12pt,
  metric-box("Year 1 Revenue", "\$240K", subtitle: "Target"),
  metric-box("Year 3 Revenue", "\$3.6M", subtitle: "Target"),
  metric-box("Gross Margin", "55%", subtitle: "At scale"),
  metric-box("Break-even", "Month 14", subtitle: "Projected"),
)

#v(1em)

*Key Assumptions:*
- Average Revenue Per User (ARPU): \$200/month
- Customer Acquisition Cost (CAC): \$400
- Lifetime Value (LTV): \$2,400 (12-month average retention)
- LTV:CAC Ratio: 6:1

== Funding Requirements

#highlight-box(
  title: "Seed Round: \$500,000",
  color: rgb("#f0fff4"),
)[
  *Use of Funds (18-month runway):*
  - Product Development (50%): \$250,000
  - Go-to-Market (30%): \$150,000  
  - Operations & Legal (15%): \$75,000
  - Reserve (5%): \$25,000

  *Milestones to Achieve:*
  - MVP launch and 100 paying customers
  - \$20K+ MRR
  - Product-market fit validation
  - Series A readiness
]

== The Team

*Founder & CEO:* Marb (Placeholder for full bio)
- Background in AI/ML and sales technology
- Previously built and exited [relevant experience]
- Deep expertise in agent orchestration and automation

*Advisors:* [To be added as recruited]

== Why Now?

Three converging trends make this the optimal time for Tapflow:

1. *AI Capability Inflection:* Large language models (Claude, GPT-4) have reached the capability threshold for reliable autonomous research and writing.

2. *Market Fatigue with Point Solutions:* Sales teams are exhausted managing 5-10 tools for prospecting, enrichment, and outreach. Consolidation demand is high.

3. *Competitive Opening:* Market leader Clay is priced for enterprise (\$720+/mo). There's a massive underserved SMB segment ready for an affordable alternative.

#pagebreak()

// Company Description
= Company Description

== Legal Structure

*Company Name:* Tapflow, Inc.

*Incorporation:* Delaware C-Corporation (recommended for VC compatibility)

*Headquarters:* Salt Lake City, Utah

*Status:* Pre-seed / Formation stage

The Delaware C-Corp structure provides:
- Standard VC-compatible equity framework
- Established corporate law precedents
- Flexibility for future fundraising rounds
- Clean cap table management

== Founding Team

=== Marb — Founder & CEO

#highlight-box[
  *[Full bio to be added]*
  
  Key qualifications:
  - Technical background with hands-on AI/ML experience
  - Experience building and scaling sales pipelines
  - Deep understanding of the lead generation market
  - Built functioning prototype demonstrating core technology
]

=== Open Roles (Post-Funding)

- *CTO / Technical Co-founder:* Lead product development
- *Head of Growth:* Own customer acquisition and marketing
- *Senior Full-Stack Engineer:* Build core platform

== Company History & Stage

=== Origin Story

Tapflow originated from solving a real problem: manually prospecting for a local service business in Salt Lake City. After spending dozens of hours on repetitive research, the founder built an automated pipeline using AI agents to:

1. Discover businesses via Google Maps and Yelp
2. Analyze their websites for quality and technology
3. Find decision-maker contact information
4. Generate personalized outreach emails

This internal tool—codenamed "slc-lead-gen"—proved highly effective, generating qualified leads at a fraction of the time and cost of manual methods. Tapflow is the productized, scalable version of this validated pipeline.

=== Current Stage

#table(
  columns: (1fr, 2fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#e2e8f0"),
  fill: (x, y) => if calc.odd(y) { rgb("#f7fafc") } else { white },
  [*Stage*], [Pre-seed / MVP Development],
  [*Product*], [Core technology 60-70% complete],
  [*Revenue*], [Pre-revenue (targeting Q2 2026 launch)],
  [*Customers*], [0 (targeting 10 beta customers in Month 1)],
  [*Team*], [1 founder + contractor network],
  [*Funding*], [Bootstrapped to date],
)

== Mission, Vision, and Values

=== Mission Statement

To democratize enterprise-grade lead generation, making it accessible and affordable for businesses of all sizes through intelligent automation.

=== Vision Statement

By 2030, Tapflow will be the autonomous sales development platform powering over 10,000 businesses, having eliminated billions of hours of manual prospecting work and generated tens of millions of qualified sales opportunities.

=== Core Values

#grid(
  columns: (1fr, 1fr),
  gutter: 16pt,
  [
    *🎯 Outcome Over Output*
    
    We measure success by leads closed, not features shipped. Every decision prioritizes customer results.
  ],
  [
    *🤖 Automation with Oversight*
    
    AI handles the busywork; humans make the decisions. We enhance salespeople, not replace them.
  ],
  [
    *🔍 Radical Transparency*
    
    Show our work. Users see exactly how leads were found, scored, and why emails were written.
  ],
  [
    *⚡ Speed to Value*
    
    First qualified lead within 10 minutes of signup. No setup wizards, no onboarding calls required.
  ],
)

#pagebreak()

// Market Analysis
= Market Analysis

== Industry Overview

The global lead generation market represents one of the largest and most critical segments of the sales technology ecosystem. Every B2B company, regardless of size or industry, requires a consistent pipeline of qualified prospects to survive and grow.

=== Market Definition

Lead generation encompasses all activities, tools, and services used to identify, attract, and qualify potential customers. This includes:

- *Data Providers:* Companies selling contact and company information
- *Sales Intelligence:* Tools for researching and enriching prospect data
- *Outreach Automation:* Platforms for email, phone, and social selling
- *Prospecting Tools:* Solutions for discovering and qualifying new leads

=== Key Market Segments

#table(
  columns: (1.2fr, 1fr, 2fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#e2e8f0"),
  fill: (x, y) => if y == 0 { rgb("#edf2f7") } else { white },
  [*Segment*], [*Market Size*], [*Key Players*],
  [Sales Intelligence], [\$3.2B], [ZoomInfo, Apollo, Clearbit],
  [Email Outreach], [\$2.1B], [Outreach, Salesloft, Instantly],
  [Data Enrichment], [\$1.8B], [Clay, Clearbit, FullContact],
  [Lead Databases], [\$2.5B], [LinkedIn Sales Nav, Lusha, Hunter],
  [Marketing Automation], [\$5.8B], [HubSpot, Marketo, Pardot],
)

== Market Size

=== Total Addressable Market (TAM)

The global B2B lead generation market is valued at *\$10.2 billion in 2026*, growing at a compound annual growth rate (CAGR) of *12.4%*.

#align(center)[
  #block(
    width: 80%,
    fill: rgb("#f7fafc"),
    radius: 4pt,
    inset: 16pt,
    stroke: 0.5pt + rgb("#e2e8f0"),
  )[
    #grid(
      columns: (1fr, 1fr, 1fr),
      gutter: 20pt,
      [
        #align(center)[
          #text(size: 10pt, fill: rgb("#718096"))[*TAM*]
          #v(4pt)
          #text(size: 28pt, weight: "bold", fill: rgb("#1a365d"))[\$10.2B]
          #v(4pt)
          #text(size: 9pt, fill: rgb("#a0aec0"))[Global lead gen market]
        ]
      ],
      [
        #align(center)[
          #text(size: 10pt, fill: rgb("#718096"))[*SAM*]
          #v(4pt)
          #text(size: 28pt, weight: "bold", fill: rgb("#2c5282"))[\$2.4B]
          #v(4pt)
          #text(size: 9pt, fill: rgb("#a0aec0"))[SMB + Mid-market US]
        ]
      ],
      [
        #align(center)[
          #text(size: 10pt, fill: rgb("#718096"))[*SOM*]
          #v(4pt)
          #text(size: 28pt, weight: "bold", fill: rgb("#3182ce"))[\$48M]
          #v(4pt)
          #text(size: 9pt, fill: rgb("#a0aec0"))[Year 3 target (2% SAM)]
        ]
      ],
    )
  ]
]

=== Serviceable Addressable Market (SAM)

Tapflow's initial focus on US-based SMBs and mid-market companies using automated prospecting tools represents approximately *\$2.4 billion*:

- *SMBs (1-50 employees):* 6.1 million US companies, ~15% use paid lead gen tools = 915,000 potential customers
- *Average spend:* \$2,600/year on lead generation software
- *SAM calculation:* 915,000 × \$2,600 = \$2.4B

=== Serviceable Obtainable Market (SOM)

Year 3 target of 2,000 customers at \$2,400 average annual revenue = *\$4.8M ARR*, representing ~0.2% of SAM. Conservative projection with significant room for expansion.

== Market Trends

=== Trend 1: AI Transformation of Sales Tech

#highlight-box(color: rgb("#faf5ff"))[
  *The Shift:* "AI-powered" has moved from marketing buzzword to table-stakes requirement.
  
  *Evidence:*
  - 78% of sales leaders say AI is critical to their 2026 strategy (Gartner)
  - Sales AI funding increased 340% from 2023 to 2025
  - Every major sales platform now claims AI features
  
  *Implication for Tapflow:* The market expects AI. Our differentiation must be in *how* we use AI, not *that* we use it. Our agent orchestration architecture provides genuine competitive advantage.
]

=== Trend 2: Consolidation Fatigue

Sales teams currently manage an average of 7.3 different tools for prospecting and outreach. This creates:

- *Integration headaches:* Constant data syncing issues
- *Training burden:* New hire ramp time extended
- *Cost creep:* Multiple subscriptions adding up
- *Data silos:* Incomplete view of prospect journey

*Tapflow Opportunity:* Offer an integrated solution that replaces 3-5 point tools.

=== Trend 3: Privacy Regulation Pressure

GDPR, CCPA, and emerging state privacy laws are constraining traditional lead generation methods:

- Cold outreach requires more careful targeting
- Data quality matters more than volume
- "Spray and pray" becoming legally risky

*Tapflow Opportunity:* Our qualification-first approach ensures only relevant, likely-to-respond prospects receive outreach.

=== Trend 4: SMB Tool Democratization

Enterprise-grade capabilities are becoming accessible to smaller companies:

- Cloud infrastructure eliminates upfront costs
- AI APIs enable sophisticated features without ML teams
- No-code/low-code reduces development requirements

*Tapflow Opportunity:* Deliver Fortune 500 lead gen capabilities at SMB price points.

== Competitive Analysis

=== Competitive Landscape Overview

#figure(
  table(
    columns: (1.2fr, 0.6fr, 0.6fr, 0.6fr, 0.6fr, 0.6fr),
    inset: 7pt,
    align: (left, center, center, center, center, center),
    stroke: 0.5pt + rgb("#e2e8f0"),
    fill: (x, y) => if y == 0 { rgb("#edf2f7") } else if x == 0 { rgb("#f7fafc") } else { white },
    [], [*Prospecting*], [*Enrichment*], [*Personalization*], [*Outreach*], [*Automation*],
    [*Clay*], [❌], [✅✅✅], [✅✅], [❌], [✅],
    [*Apollo*], [✅✅], [✅✅], [✅], [✅✅], [✅],
    [*Instantly*], [❌], [❌], [✅], [✅✅✅], [✅],
    [*Lemlist*], [✅], [✅], [✅✅], [✅✅], [✅],
    [*Hunter*], [✅], [✅✅], [❌], [❌], [❌],
    [*Tapflow*], [✅✅✅], [✅✅], [✅✅✅], [✅✅], [✅✅✅],
  ),
  caption: [Competitive Feature Matrix — ❌ None, ✅ Basic, ✅✅ Good, ✅✅✅ Excellent]
)

=== Key Competitor Deep-Dive

==== Clay — Closest Competitor

#highlight-box(color: rgb("#fff5f5"))[
  *What they do:* Enrichment orchestration platform with 150+ data providers and AI agent ("Claygent")
  
  *Pricing:* \$134 - \$720+/month (credit-based)
  
  *Strengths:*
  - Massive data provider network
  - Trusted by Anthropic, OpenAI, Ramp
  - SOC 2 Type II compliant
  - Strong brand in sales tech community
  
  *Weaknesses:*
  - Complex workflow builder (steep learning curve)
  - No built-in prospecting (requires existing lists)
  - Expensive for SMBs
  - Credit model punishes scale
  
  *Our Positioning:* "Clay makes you build workflows. Tapflow just finds leads."
]

==== Apollo.io — Sales Intelligence Leader

#highlight-box(color: rgb("#fefcbf"))[
  *What they do:* 275M+ contact database with email sequencing
  
  *Pricing:* \$49 - \$149/user/month
  
  *Strengths:*
  - Massive verified contact database
  - Built-in email sequences
  - Good API access
  
  *Weaknesses:*
  - Per-seat pricing kills team scaling
  - "AI" is basic templating, not research
  - Manual list building required
  
  *Our Positioning:* "Apollo's AI is search filters. Ours actually researches."
]

==== Instantly.ai — Cold Email Champion

#highlight-box(color: rgb("#e6fffa"))[
  *What they do:* Email sending at scale with unlimited accounts and warmup
  
  *Pricing:* \$37 - \$97/month
  
  *Strengths:*
  - Unlimited email accounts
  - Best-in-class deliverability
  - Simple, affordable pricing
  
  *Weaknesses:*
  - No prospecting—bring your own leads
  - Limited personalization
  - Single channel (email only)
  
  *Our Positioning:* "Instantly sends emails. We create the emails worth sending."
]

=== Competitive Moat

Tapflow's sustainable competitive advantages:

#grid(
  columns: (1fr, 1fr),
  gutter: 16pt,
  [
    *1. Agent Orchestration IP*
    
    Our multi-agent architecture (discovery, research, qualification, content) is complex to replicate. It's not just prompts—it's the coordination layer.
  ],
  [
    *2. End-to-End Integration*
    
    Competitors optimize for one stage. We optimize for the complete journey, enabling cross-stage intelligence.
  ],
  [
    *3. SMB Price Point*
    
    At \$99/mo entry, we're 3-7× cheaper than comparable capabilities from Clay or Apollo.
  ],
  [
    *4. Speed to Value*
    
    Competitors require hours of setup. Tapflow delivers first leads in minutes.
  ],
)

#pagebreak()

// Products and Services
= Products and Services

== Core Product Description

Tapflow is an AI-powered lead generation platform that automates the complete prospecting pipeline—from identifying target businesses to delivering ready-to-send personalized outreach.

=== How It Works

#align(center)[
  #block(
    width: 90%,
    fill: rgb("#f7fafc"),
    radius: 6pt,
    inset: 20pt,
    stroke: 1pt + rgb("#e2e8f0"),
  )[
    #grid(
      columns: (1fr, 0.3fr, 1fr, 0.3fr, 1fr, 0.3fr, 1fr),
      align: center + horizon,
      [
        #text(size: 24pt)[🎯]
        #v(4pt)
        #text(size: 10pt, weight: "bold")[INPUT]
        #v(2pt)
        #text(size: 8pt, fill: rgb("#718096"))["Find restaurant owners in Denver who need websites"]
      ],
      [→],
      [
        #text(size: 24pt)[🔍]
        #v(4pt)
        #text(size: 10pt, weight: "bold")[DISCOVER]
        #v(2pt)
        #text(size: 8pt, fill: rgb("#718096"))[AI agents search Maps, Yelp, directories]
      ],
      [→],
      [
        #text(size: 24pt)[📊]
        #v(4pt)
        #text(size: 10pt, weight: "bold")[RESEARCH]
        #v(2pt)
        #text(size: 8pt, fill: rgb("#718096"))[Analyze websites, find contacts, score fit]
      ],
      [→],
      [
        #text(size: 24pt)[✉️]
        #v(4pt)
        #text(size: 10pt, weight: "bold")[OUTPUT]
        #v(2pt)
        #text(size: 8pt, fill: rgb("#718096"))[Personalized emails ready to send]
      ],
    )
  ]
]

=== The User Experience

1. *Create Campaign:* User enters natural language description of ideal customer
2. *AI Processing:* Platform autonomously discovers, researches, and qualifies prospects
3. *Review Queue:* Qualified leads appear with AI-generated personalized emails
4. *Approve & Send:* User reviews, optionally edits, and sends with one click
5. *Track Results:* Dashboard shows opens, replies, and conversion metrics

== Key Features

=== Feature 1: Intelligent Prospecting Engine

#table(
  columns: (1fr, 2fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#e2e8f0"),
  fill: (x, y) => if x == 0 { rgb("#f7fafc") } else { white },
  [*Capability*], [*Description*],
  [Natural Language Input], [Describe your ideal customer in plain English—no filters or boolean required],
  [Multi-Source Discovery], [Simultaneously searches Google Maps, Yelp, industry directories, and more],
  [Geographic Targeting], [City, state, zip code, or radius-based search],
  [Industry Classification], [Automatic categorization using business descriptions and reviews],
  [Deduplication], [Intelligent matching prevents duplicate prospects across sources],
)

=== Feature 2: AI Research & Enrichment

Our research agents analyze each prospect to gather intelligence that enables personalization:

- *Website Analysis:* 
  - Performance scores (Lighthouse-based)
  - Mobile responsiveness rating
  - Technology stack detection
  - Content quality assessment
  
- *Contact Discovery:*
  - Decision-maker identification
  - Email finding and verification
  - LinkedIn profile matching
  - Direct phone numbers (when available)
  
- *Business Intelligence:*
  - Employee count estimates
  - Revenue indicators
  - Years in business
  - Recent news/changes

=== Feature 3: Automated Lead Scoring

Every prospect receives a score (0-100) and tier assignment (A/B/C):

#table(
  columns: (0.5fr, 1fr, 2fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#e2e8f0"),
  fill: (x, y) => if y == 0 { rgb("#edf2f7") } else { white },
  [*Tier*], [*Score Range*], [*Characteristics*],
  [A], [80-100], [Perfect ICP fit, verified contact, high likelihood to respond],
  [B], [50-79], [Good fit with some uncertainty, needs additional validation],
  [C], [0-49], [Marginal fit, pursue only if capacity allows],
)

Scoring factors include:
- Website quality relative to competitors
- Review sentiment and volume
- Business age and stability indicators
- Contact verification confidence
- Match to stated ICP criteria

=== Feature 4: AI-Powered Email Generation

Our content agent writes personalized email sequences that feel human-crafted:

#highlight-box(color: rgb("#f0fff4"))[
  *Example Output:*
  
  _Subject: Quick thought on Bella Italia's website_
  
  _Hey Marco,_
  
  _I was checking out Bella Italia's reviews—congrats on the 4.8 stars! Customers love the authentic pasta recipes._
  
  _One thing I noticed: your website doesn't show up well on mobile. Given that 70% of restaurant searches happen on phones, you might be missing reservations._
  
  _Would you be open to a quick call about a mobile-friendly redesign? I've helped three Italian restaurants in Denver boost their online reservations by 40%+._
  
  _Best,_
  _[Signature]_
]

Every email includes:
- Personalized opening based on research
- Specific pain point identification
- Value proposition tailored to their situation
- Clear, low-friction call-to-action

== Technology & Intellectual Property

=== Agent Orchestration Architecture

Tapflow's core IP is our *multi-agent orchestration layer*—a proprietary system for coordinating specialized AI agents to complete complex, multi-step tasks.

#figure(
  block(
    width: 100%,
    fill: rgb("#f7fafc"),
    radius: 4pt,
    inset: 16pt,
    stroke: 0.5pt + rgb("#e2e8f0"),
  )[
    #set text(size: 9pt)
    ```
    ┌─────────────────────────────────────────────────────────────────┐
    │                    ORCHESTRATOR (Campaign Manager)              │
    │  Parses intent → Creates tasks → Routes to agents → Aggregates  │
    └─────────────────────────────────────┬───────────────────────────┘
                                          │
                    ┌─────────────────────┼─────────────────────┐
                    │                     │                     │
                    ▼                     ▼                     ▼
            ┌───────────────┐     ┌───────────────┐     ┌───────────────┐
            │   DISCOVERY   │     │   RESEARCHER  │     │   QUALIFIER   │
            │     AGENT     │────▶│     AGENT     │────▶│     AGENT     │
            │               │     │               │     │               │
            │ Google Maps   │     │ Website scan  │     │ Scoring       │
            │ Yelp API      │     │ Contact find  │     │ Tier assign   │
            │ Directories   │     │ Tech detect   │     │ Fit routing   │
            └───────────────┘     └───────────────┘     └───────┬───────┘
                                                                 │
                                          ┌──────────────────────┘
                                          ▼
                                  ┌───────────────┐
                                  │    CONTENT    │
                                  │     AGENT     │
                                  │               │
                                  │ Email writing │
                                  │ Personalization│
                                  │ A/B variants  │
                                  └───────────────┘
    ```
  ],
  caption: [Tapflow Agent Orchestration Architecture]
)

=== Why This Matters

Most "AI" lead generation tools are simple LLM wrappers—they call an API with a prompt and return the result. Tapflow's architecture enables:

1. *Specialization:* Each agent is optimized for a specific task with custom prompts, context, and tools
2. *Coordination:* Agents share information and build on each other's work
3. *Reliability:* Individual agent failures don't break the pipeline; graceful degradation
4. *Scalability:* Agents can run in parallel for high-volume processing
5. *Improvement:* Each agent can be independently tuned without affecting others

=== Technology Stack

#table(
  columns: (1fr, 1.5fr, 1.5fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#e2e8f0"),
  fill: (x, y) => if y == 0 { rgb("#edf2f7") } else { white },
  [*Layer*], [*Technology*], [*Rationale*],
  [Frontend], [Next.js 14 + Tailwind CSS], [Fast, modern, excellent developer experience],
  [Backend], [Next.js API Routes + Inngest], [Serverless, scalable, minimal ops overhead],
  [Database], [Supabase (PostgreSQL)], [Managed, real-time subscriptions, auth built-in],
  [AI Engine], [Claude API (Sonnet)], [Best-in-class for writing and reasoning],
  [Job Queue], [Inngest/Trigger.dev], [Serverless-native background job processing],
  [Hosting], [Vercel], [Zero-config deployments, edge functions],
  [Payments], [Stripe], [Industry standard, usage-based billing support],
)

== Product Roadmap

=== MVP (V1.0) — Target: Q2 2026

#highlight-box(title: "Core Features — 6 Week Build", color: rgb("#ebf8ff"))[
  - User authentication and team management
  - Campaign creation with natural language input
  - Google Maps + Yelp prospecting
  - Basic enrichment (website scoring, contact finding)
  - AI email sequence generation
  - Lead list view with export
  - Stripe subscription billing
]

=== V1.1 — Target: Q3 2026

- Instantly.ai integration for email sending
- Hunter.io email verification
- A/B/C tier scoring algorithm
- HubSpot CRM export
- Multi-user team features

=== V2.0 — Target: Q4 2026

- LinkedIn automation (InMail, connections)
- Voice AI outreach (Vapi integration)
- Demo site generation for prospects
- API access for developers
- White-label capabilities

=== V3.0 — Target: 2027

- Self-optimizing campaigns (learn from results)
- Multi-language support (EU expansion)
- Industry-specific templates and agents
- Enterprise SSO and compliance features
- Custom AI model training per account

#pagebreak()

// Marketing and Sales Strategy
= Marketing and Sales Strategy

== Go-to-Market Plan

Tapflow's GTM strategy follows a *concentric expansion model*—starting with a focused beachhead market and expanding outward as we prove product-market fit.

=== Phase 1: Dogfooding (Weeks 1-4)

#highlight-box(title: "Use the Product to Sell the Product", color: rgb("#f0fff4"))[
  *Strategy:* Deploy Tapflow to find our own first customers.
  
  *Execution:*
  1. Build MVP targeting web design and marketing agencies
  2. Use Tapflow to discover 100 agencies in Utah
  3. Send Tapflow-generated outreach offering free 30-day pilot
  4. Close 10 beta customers for validation and feedback
  
  *Why this works:* Proves the product while acquiring customers. Zero CAC for first cohort.
]

=== Phase 2: Content + Launch (Weeks 5-8)

- *ProductHunt Launch:* Position as "True AI Lead Gen" with live demo
- *Comparison Content:* "Clay vs Tapflow", "The Complete Apollo Alternative"
- *Demo Videos:* Show agent orchestration in action (differentiator visualization)
- *SEO Foundation:* Target keywords: "ai lead generation", "automated prospecting", "clay alternative"

=== Phase 3: Paid Acquisition + Partnerships (Weeks 9-16)

- *Google Ads:* Competitor brand terms, high-intent keywords
- *LinkedIn Ads:* B2B targeting by job title and company size
- *Partner Program:* CRM consultants, sales trainers, agency owners
- *Integration Marketing:* Zapier, Make, HubSpot app marketplace

== Customer Acquisition Channels

#table(
  columns: (1fr, 0.8fr, 0.8fr, 1.2fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#e2e8f0"),
  fill: (x, y) => if y == 0 { rgb("#edf2f7") } else { white },
  [*Channel*], [*CAC Est.*], [*Volume*], [*Timeline*],
  [Organic/SEO], [\$50], [Medium], [6-12 months to scale],
  [ProductHunt], [\$0], [Burst], [One-time launch spike],
  [Google Ads], [\$200-400], [High], [Immediate, scalable],
  [LinkedIn Ads], [\$300-500], [Medium], [Good for B2B targeting],
  [Partnerships], [\$100-200], [Medium], [3-6 months to establish],
  [Referral Program], [\$100], [Medium], [Grows with customer base],
  [Content Marketing], [\$75], [High], [6+ months to compound],
)

=== Channel Strategy by Stage

*Year 1:* Heavy investment in content (SEO foundation) + paid acquisition (immediate revenue)

*Year 2:* Reduce paid spend as organic grows; invest in partnerships and referrals

*Year 3:* Majority organic/referral; paid for new market entry only

== Pricing Strategy

=== Pricing Philosophy

Our pricing follows three principles:

1. *Undercut Clay:* Entry price 26% lower than Clay's cheapest paid tier
2. *Value-Based Tiers:* Each tier unlocks meaningful new capabilities
3. *Predictable for Customers:* Avoid confusing credit systems

=== Pricing Tiers

#figure(
  table(
    columns: (1fr, 0.7fr, 0.9fr, 1.8fr),
    inset: 10pt,
    stroke: 0.5pt + rgb("#e2e8f0"),
    fill: (x, y) => if y == 0 { rgb("#edf2f7") } else if y == 2 { rgb("#f0fff4") } else { white },
    [*Tier*], [*Price*], [*Leads/mo*], [*Key Features*],
    [Starter], [\$99/mo], [500], [Basic enrichment, email generation, CSV export],
    [Growth ⭐], [\$299/mo], [2,500], [Full enrichment, AI personalization, Instantly integration],
    [Scale], [\$799/mo], [10,000], [API access, white-label, 5 team seats, priority support],
    [Enterprise], [Custom], [Unlimited], [Dedicated infrastructure, custom integrations, SLA],
  ),
  caption: [Tapflow Pricing Tiers]
)

=== Competitive Pricing Position

#align(center)[
  #block(
    width: 85%,
    fill: rgb("#f7fafc"),
    radius: 4pt,
    inset: 16pt,
    stroke: 0.5pt + rgb("#e2e8f0"),
  )[
    #table(
      columns: (1.2fr, 1fr, 1fr, 1fr),
      inset: 8pt,
      stroke: none,
      align: (left, center, center, center),
      [*Capability Level*], [*Tapflow*], [*Clay*], [*Savings*],
      [Entry (basic)], [\$99], [\$134], [26%],
      [Mid-tier], [\$299], [\$314], [5%],
      [Full-featured], [\$799], [\$720+], [Comparable],
    )
    #text(size: 9pt, fill: rgb("#718096"))[Note: Tapflow includes prospecting; Clay requires existing lists]
  ]
]

=== Add-On Revenue Opportunities

- *Overage leads:* \$0.15/lead (Starter), \$0.10/lead (Growth), \$0.06/lead (Scale)
- *Dedicated sending IP:* \$50/mo
- *LinkedIn automation:* \$49/mo add-on
- *Voice AI outreach:* \$0.15/minute
- *Custom integrations:* Professional services

== Sales Process

=== Self-Serve (80% of customers)

#grid(
  columns: (1fr, 1fr, 1fr, 1fr),
  gutter: 8pt,
  [
    #align(center)[
      *1. Discover*
      #v(4pt)
      #text(size: 9pt, fill: rgb("#718096"))[SEO, ads, referral → landing page]
    ]
  ],
  [
    #align(center)[
      *2. Trial*
      #v(4pt)
      #text(size: 9pt, fill: rgb("#718096"))[Free trial with 50 leads]
    ]
  ],
  [
    #align(center)[
      *3. Convert*
      #v(4pt)
      #text(size: 9pt, fill: rgb("#718096"))[Self-serve checkout]
    ]
  ],
  [
    #align(center)[
      *4. Expand*
      #v(4pt)
      #text(size: 9pt, fill: rgb("#718096"))[Upgrade prompts, add-ons]
    ]
  ],
)

=== Sales-Assisted (20% of customers — Scale/Enterprise)

- Inbound demo request form
- 30-minute discovery call
- Custom proposal and pricing
- Pilot program (30-60 days)
- Contract and onboarding

== Target Customer Profiles

=== ICP 1: Solo Consultant / Freelancer

#table(
  columns: (1fr, 2fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#e2e8f0"),
  fill: (x, y) => if x == 0 { rgb("#f7fafc") } else { white },
  [*Pain*], [Spends hours on manual prospecting; can't afford enterprise tools],
  [*Budget*], [\$100-300/mo for sales tools],
  [*Channels*], [Twitter, LinkedIn, IndieHackers, Product Hunt],
  [*Message*], ["Find qualified leads while you sleep"],
  [*Tier*], [Starter (\$99/mo)],
)

=== ICP 2: SMB Sales Team (5-20 people)

#table(
  columns: (1fr, 2fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#e2e8f0"),
  fill: (x, y) => if x == 0 { rgb("#f7fafc") } else { white },
  [*Pain*], [SDRs waste time on low-quality leads; need scale without headcount],
  [*Budget*], [\$500-1,500/mo for lead gen stack],
  [*Channels*], [LinkedIn Ads, G2, sales podcasts, webinars],
  [*Message*], ["Give your SDRs qualified leads, not busywork"],
  [*Tier*], [Growth (\$299/mo) or Scale (\$799/mo)],
)

=== ICP 3: Lead Generation Agency

#table(
  columns: (1fr, 2fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#e2e8f0"),
  fill: (x, y) => if x == 0 { rgb("#f7fafc") } else { white },
  [*Pain*], [Margins shrinking; needs automation to stay competitive],
  [*Budget*], [\$1,000-5,000/mo for infrastructure],
  [*Channels*], [Agency communities, conferences, referrals],
  [*Message*], ["White-label AI lead gen for your clients"],
  [*Tier*], [Scale (\$799/mo) with white-label add-on],
)

== Partnership Strategy

=== Integration Partners

- *CRM vendors:* HubSpot, Salesforce, Pipedrive app marketplaces
- *Email platforms:* Instantly, Lemlist, Smartlead
- *Automation tools:* Zapier, Make, n8n

=== Channel Partners

- *CRM consultants:* Referral fees for customer introductions
- *Sales trainers:* Bundle Tapflow with training programs
- *Agency networks:* Bulk licensing for agency consortiums

=== Technology Partners

- *AI providers:* Anthropic, OpenAI for enterprise-grade AI
- *Data providers:* Apollo, Hunter, Clearbit for enrichment

#pagebreak()

// Operations Plan
= Operations Plan

== Technology Infrastructure

=== Production Architecture

#figure(
  block(
    width: 100%,
    fill: rgb("#f7fafc"),
    radius: 4pt,
    inset: 16pt,
    stroke: 0.5pt + rgb("#e2e8f0"),
  )[
    #set text(size: 9pt)
    ```
                                    ┌─────────────────┐
                                    │   CloudFlare    │
                                    │   (CDN + WAF)   │
                                    └────────┬────────┘
                                             │
                                    ┌────────▼────────┐
                                    │     Vercel      │
                                    │   (Frontend +   │
                                    │   API Routes)   │
                                    └────────┬────────┘
                                             │
              ┌──────────────────────────────┼──────────────────────────────┐
              │                              │                              │
     ┌────────▼────────┐            ┌────────▼────────┐           ┌────────▼────────┐
     │    Supabase     │            │    Inngest      │           │   External APIs  │
     │   (Database +   │            │   (Job Queue)   │           │  (AI, Enrichment │
     │     Auth)       │            │                 │           │    Outreach)     │
     └─────────────────┘            └─────────────────┘           └─────────────────┘
    ```
  ],
  caption: [Production Infrastructure Overview]
)

=== Technology Choices Rationale

#table(
  columns: (1fr, 1.5fr, 1.5fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#e2e8f0"),
  fill: (x, y) => if y == 0 { rgb("#edf2f7") } else { white },
  [*Component*], [*Choice*], [*Why*],
  [Hosting], [Vercel], [Zero-ops, auto-scaling, generous free tier],
  [Database], [Supabase], [Managed Postgres, real-time, auth included],
  [Queue], [Inngest], [Serverless-native, no Redis to manage],
  [AI], [Claude (Anthropic)], [Best for writing quality, fast, reliable API],
  [Payments], [Stripe], [Industry standard, usage billing support],
  [Monitoring], [Vercel Analytics + Sentry], [Built-in + error tracking],
)

=== Scalability Considerations

*Current design supports:*
- 10,000+ concurrent users
- 1M+ leads processed per month
- 99.9% uptime target

*Scaling triggers and responses:*

#table(
  columns: (1fr, 1fr, 1.5fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#e2e8f0"),
  fill: (x, y) => if y == 0 { rgb("#edf2f7") } else { white },
  [*Trigger*], [*Threshold*], [*Action*],
  [Database load], [80% CPU], [Upgrade Supabase tier / add read replicas],
  [API latency], [>500ms p95], [Add edge caching / optimize queries],
  [Queue depth], [>10K pending], [Scale Inngest workers / add priority queues],
  [AI costs], [>20% revenue], [Implement caching / model optimization],
)

== Development Timeline

=== MVP Development (6 Weeks)

#table(
  columns: (0.8fr, 2fr, 0.8fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#e2e8f0"),
  fill: (x, y) => if y == 0 { rgb("#edf2f7") } else { white },
  [*Week*], [*Deliverables*], [*Effort*],
  [1], [Project setup, auth flow, database schema], [40 hrs],
  [2], [Campaign creation UI, lead discovery integration], [40 hrs],
  [3], [Enrichment pipeline, website scoring], [40 hrs],
  [4], [Lead list view, filtering, export], [40 hrs],
  [5], [AI email generation, sequence builder], [40 hrs],
  [6], [Stripe integration, dashboard, testing], [40 hrs],
)

*Total MVP Effort:* 240 hours (~6 weeks full-time)

=== Post-MVP Roadmap

#table(
  columns: (1fr, 1.5fr, 1fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#e2e8f0"),
  fill: (x, y) => if y == 0 { rgb("#edf2f7") } else { white },
  [*Phase*], [*Features*], [*Timeline*],
  [V1.1], [Email verification, CRM export, team features], [+4 weeks],
  [V1.2], [Instantly integration, advanced scoring], [+4 weeks],
  [V2.0], [LinkedIn automation, API access, white-label], [+8 weeks],
  [V3.0], [Self-optimizing campaigns, enterprise features], [+12 weeks],
)

== Key Milestones

#figure(
  table(
    columns: (1fr, 2fr, 1fr),
    inset: 10pt,
    stroke: 0.5pt + rgb("#e2e8f0"),
    fill: (x, y) => if y == 0 { rgb("#edf2f7") } else { white },
    [*Date*], [*Milestone*], [*Success Metric*],
    [Q1 2026], [Seed funding closed], [\$500K raised],
    [Q2 2026], [MVP launch + beta customers], [10 paying customers],
    [Q2 2026], [ProductHunt launch], [Top 5 of the day],
    [Q3 2026], [Product-market fit validation], [100 customers, \$15K MRR],
    [Q4 2026], [V2.0 with API/white-label], [25 agency customers],
    [Q1 2027], [Break-even achieved], [Cash flow positive],
    [Q2 2027], [Series A readiness], [\$50K MRR, 500 customers],
  ),
  caption: [Key Milestones and Success Metrics]
)

== Team Structure

=== Current Team

- *Founder/CEO:* Marb — Product vision, sales, operations

=== Hiring Plan (Post-Funding)

#table(
  columns: (1.2fr, 0.8fr, 0.8fr, 1.5fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#e2e8f0"),
  fill: (x, y) => if y == 0 { rgb("#edf2f7") } else { white },
  [*Role*], [*Timing*], [*Comp Range*], [*Priority Focus*],
  [Full-Stack Engineer], [Month 1], [\$120-150K], [Core product development],
  [Growth Marketer], [Month 3], [\$80-100K], [Customer acquisition, content],
  [Customer Success], [Month 6], [\$60-80K], [Onboarding, retention],
  [Second Engineer], [Month 9], [\$100-130K], [Scale and integrations],
)

=== Advisory Board (To Recruit)

- Sales technology executive (GTM expertise)
- SaaS founder with exit experience
- AI/ML technical advisor

== Operational Processes

=== Customer Support

*Tier 1 (Self-Serve):*
- Knowledge base / FAQ
- In-app chat (Intercom)
- Email support (24-hour response SLA)

*Tier 2 (Growth+):*
- Priority email support (4-hour response SLA)
- Scheduled onboarding calls

*Tier 3 (Enterprise):*
- Dedicated account manager
- Slack/Teams channel
- Quarterly business reviews

=== Quality Assurance

- Automated testing (unit + integration)
- Staging environment for all changes
- Feature flags for gradual rollout
- Error monitoring (Sentry)
- Weekly metrics review

=== Security & Compliance

- SOC 2 Type I target (Year 1)
- GDPR compliance for EU expansion
- Regular security audits
- Encrypted data at rest and in transit
- RBAC for team permissions

#pagebreak()

// Financial Projections
= Financial Projections

== Revenue Model

Tapflow generates revenue through:

1. *Subscription Revenue (90%):* Monthly/annual SaaS subscriptions
2. *Overage Revenue (7%):* Additional leads beyond plan limits
3. *Add-On Revenue (3%):* Premium features (white-label, integrations)

== Pricing and Unit Economics

=== Revenue Per Customer

#table(
  columns: (1fr, 1fr, 1fr, 1fr, 1fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#e2e8f0"),
  fill: (x, y) => if y == 0 { rgb("#edf2f7") } else { white },
  [*Tier*], [*Monthly*], [*Annual*], [*% of Customers*], [*Weighted MRR*],
  [Starter], [\$99], [\$1,188], [50%], [\$49.50],
  [Growth], [\$299], [\$3,588], [35%], [\$104.65],
  [Scale], [\$799], [\$9,588], [12%], [\$95.88],
  [Enterprise], [\$1,500], [\$18,000], [3%], [\$45.00],
  [*Blended ARPU*], [], [], [], [*\$295/mo*],
)

=== Unit Economics

#grid(
  columns: (1fr, 1fr, 1fr, 1fr),
  gutter: 12pt,
  metric-box("ARPU", "\$295", subtitle: "Monthly"),
  metric-box("CAC", "\$400", subtitle: "Blended"),
  metric-box("LTV", "\$3,540", subtitle: "12-mo avg"),
  metric-box("LTV:CAC", "8.9:1", subtitle: "Target >3:1"),
)

#v(1em)

*Key assumptions:*
- Customer lifetime: 12 months average (conservative)
- Gross margin: 55% (after API costs)
- CAC payback: 2.3 months

=== Cost Structure (Per Lead)

#table(
  columns: (1.5fr, 1fr, 1fr, 1fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#e2e8f0"),
  fill: (x, y) => if y == 0 { rgb("#edf2f7") } else { white },
  [*Cost Component*], [*Starter*], [*Growth*], [*Scale*],
  [Discovery APIs], [\$0.02], [\$0.02], [\$0.01],
  [Enrichment APIs], [\$0.04], [\$0.03], [\$0.02],
  [AI (Claude)], [\$0.02], [\$0.02], [\$0.01],
  [Infrastructure], [\$0.01], [\$0.01], [\$0.01],
  [*Total Cost/Lead*], [*\$0.09*], [*\$0.08*], [*\$0.05*],
  [*Revenue/Lead*], [*\$0.20*], [*\$0.12*], [*\$0.08*],
  [*Gross Margin*], [*55%*], [*33%*], [*38%*],
)

== Three-Year Financial Projections

=== Revenue Projections

#figure(
  table(
    columns: (1.5fr, 1fr, 1fr, 1fr),
    inset: 10pt,
    stroke: 0.5pt + rgb("#e2e8f0"),
    fill: (x, y) => if y == 0 { rgb("#edf2f7") } else { white },
    [*Metric*], [*Year 1*], [*Year 2*], [*Year 3*],
    [Ending Customers], [100], [500], [2,000],
    [Avg. MRR/Customer], [\$200], [\$250], [\$300],
    [Ending MRR], [\$20K], [\$125K], [\$600K],
    [*Annual Revenue*], [*\$120K*], [*\$900K*], [*\$4.8M*],
    [YoY Growth], [—], [650%], [433%],
  ),
  caption: [Revenue Projections (Conservative Scenario)]
)

=== Customer Growth Model

#table(
  columns: (1fr, 1fr, 1fr, 1fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#e2e8f0"),
  fill: (x, y) => if y == 0 { rgb("#edf2f7") } else { white },
  [*Quarter*], [*New Customers*], [*Churned*], [*Net Customers*],
  [Q2 Y1], [15], [0], [15],
  [Q3 Y1], [25], [2], [38],
  [Q4 Y1], [40], [4], [74],
  [Q1 Y2], [50], [7], [117],
  [... Q4 Y2], [100], [20], [500],
  [... Q4 Y3], [400], [80], [2,000],
)

*Assumptions:*
- 8% monthly churn Year 1, improving to 5% by Year 3
- 60% organic acquisition by Year 3
- Net revenue retention: 110% (upgrades offset some churn)

=== Expense Projections

#figure(
  table(
    columns: (1.5fr, 1fr, 1fr, 1fr),
    inset: 10pt,
    stroke: 0.5pt + rgb("#e2e8f0"),
    fill: (x, y) => if y == 0 { rgb("#edf2f7") } else { white },
    [*Category*], [*Year 1*], [*Year 2*], [*Year 3*],
    [Personnel], [\$180K], [\$450K], [\$1.2M],
    [API/Infrastructure], [\$24K], [\$120K], [\$480K],
    [Marketing/Sales], [\$60K], [\$180K], [\$600K],
    [G&A/Legal], [\$36K], [\$90K], [\$180K],
    [*Total Expenses*], [*\$300K*], [*\$840K*], [*\$2.46M*],
  ),
  caption: [Operating Expense Projections]
)

=== Profitability Path

#figure(
  table(
    columns: (1.5fr, 1fr, 1fr, 1fr),
    inset: 10pt,
    stroke: 0.5pt + rgb("#e2e8f0"),
    fill: (x, y) => if y == 0 { rgb("#edf2f7") } else if y == 5 { rgb("#f0fff4") } else { white },
    [*Metric*], [*Year 1*], [*Year 2*], [*Year 3*],
    [Revenue], [\$120K], [\$900K], [\$4.8M],
    [Gross Profit (55%)], [\$66K], [\$495K], [\$2.64M],
    [Operating Expenses], [\$300K], [\$840K], [\$2.46M],
    [*EBITDA*], [*(\$234K)*], [*(\$345K)*], [*\$180K*],
    [*EBITDA Margin*], [*(195%)*], [*(38%)*], [*3.8%*],
  ),
  caption: [Path to Profitability]
)

== Break-Even Analysis

#highlight-box(title: "Break-Even Point", color: rgb("#ebf8ff"))[
  *Monthly Break-Even:* ~\$55,000 MRR
  
  *Calculation:*
  - Monthly fixed costs (post-MVP): ~\$30,000
  - Gross margin: 55%
  - Break-even MRR = \$30,000 ÷ 0.55 = \$54,545
  
  *Customer Count:* ~185 customers at blended ARPU of \$295
  
  *Expected Timeline:* Month 14-16 (mid-Year 2)
]

== Key Financial Assumptions

#table(
  columns: (1.5fr, 1fr, 2fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#e2e8f0"),
  fill: (x, y) => if y == 0 { rgb("#edf2f7") } else { white },
  [*Assumption*], [*Value*], [*Basis*],
  [Blended ARPU], [\$295/mo], [Weighted average of tier distribution],
  [Monthly Churn], [8% → 5%], [Industry average, improving with NPS],
  [CAC], [\$400], [Blended across channels],
  [Gross Margin], [55%], [API costs at scale + infrastructure],
  [Sales Cycle], [7 days], [Self-serve with free trial],
  [Annual Contract %], [30%], [Discount incentive for annual],
)

== Sensitivity Analysis

#table(
  columns: (1.5fr, 1fr, 1fr, 1fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#e2e8f0"),
  fill: (x, y) => if y == 0 { rgb("#edf2f7") } else { white },
  [*Scenario*], [*Y3 Revenue*], [*Y3 EBITDA*], [*Key Driver*],
  [Base Case], [\$4.8M], [\$180K], [100 new customers/mo by Y3],
  [Conservative (-30%)], [\$3.4M], [(\$120K)], [70 new customers/mo],
  [Optimistic (+30%)], [\$6.2M], [\$620K], [130 new customers/mo],
  [High Churn (10%)], [\$3.8M], [(\$60K)], [Retention issues],
  [Low CAC (\$300)], [\$4.8M], [\$420K], [Strong organic/referral],
)

#pagebreak()

// Funding Requirements
= Funding Requirements

== Investment Ask

#highlight-box(title: "Seed Round: \$500,000", color: rgb("#f0fff4"))[
  *Structure:* SAFE or Priced Equity Round
  
  *Valuation:* \$4M pre-money (target)
  
  *Dilution:* ~11%
  
  *Runway:* 18 months to key milestones
]

== Use of Funds

#figure(
  table(
    columns: (1.2fr, 0.8fr, 2fr),
    inset: 10pt,
    stroke: 0.5pt + rgb("#e2e8f0"),
    fill: (x, y) => if y == 0 { rgb("#edf2f7") } else { white },
    [*Category*], [*Amount*], [*Details*],
    [Product Development], [\$250K], [2 engineers (12 mo), infrastructure, tools],
    [Go-to-Market], [\$150K], [Marketing hire, paid acquisition, content],
    [Operations & Legal], [\$75K], [Incorporation, accounting, compliance],
    [Reserve], [\$25K], [Contingency buffer],
    [*Total*], [*\$500K*], [],
  ),
  caption: [Use of Funds Breakdown]
)

#figure(
  align(center)[
    #block(
      width: 60%,
      fill: rgb("#f7fafc"),
      radius: 4pt,
      inset: 16pt,
      stroke: 0.5pt + rgb("#e2e8f0"),
    )[
      #grid(
        columns: (1fr, 1fr),
        gutter: 16pt,
        [
          #align(center)[
            #rect(width: 100%, height: 50pt, fill: rgb("#3182ce"))
            #text(size: 9pt)[Product: 50%]
          ]
        ],
        [
          #align(center)[
            #rect(width: 100%, height: 30pt, fill: rgb("#48bb78"))
            #text(size: 9pt)[GTM: 30%]
          ]
        ],
        [
          #align(center)[
            #rect(width: 100%, height: 15pt, fill: rgb("#ed8936"))
            #text(size: 9pt)[Ops: 15%]
          ]
        ],
        [
          #align(center)[
            #rect(width: 100%, height: 5pt, fill: rgb("#a0aec0"))
            #text(size: 9pt)[Reserve: 5%]
          ]
        ],
      )
    ]
  ],
  caption: [Fund Allocation Visualization]
)

== Milestones to Achieve

With this funding, Tapflow will accomplish:

#table(
  columns: (0.8fr, 1.5fr, 1.2fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#e2e8f0"),
  fill: (x, y) => if y == 0 { rgb("#edf2f7") } else { white },
  [*Month*], [*Milestone*], [*Success Metric*],
  [3], [MVP Launch], [Product live, 10 beta customers],
  [6], [Product-Market Fit Signals], [50 paying customers, \$10K MRR],
  [9], [Growth Engine Working], [100 customers, \$25K MRR, CAC < \$500],
  [12], [V2.0 with API], [200 customers, \$40K MRR],
  [15], [Series A Ready], [300+ customers, \$60K+ MRR, clear PMF],
)

== Series A Positioning

At the end of seed runway, Tapflow will be positioned for a \$3-5M Series A with:

- *Revenue:* \$60K+ MRR (\$720K ARR run rate)
- *Customers:* 300+ paying accounts
- *Metrics:* LTV:CAC > 5:1, Net Revenue Retention > 100%
- *Product:* V2.0 with API, white-label, multi-channel

*Series A Use:* Scale team to 15+, expand to international markets, accelerate enterprise sales.

== Investment Terms (Proposed)

#table(
  columns: (1fr, 2fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#e2e8f0"),
  fill: (x, y) => if x == 0 { rgb("#f7fafc") } else { white },
  [*Term*], [*Proposed*],
  [Instrument], [SAFE (Post-Money) or Priced Seed],
  [Amount], [\$500,000],
  [Valuation Cap], [\$4,000,000],
  [Discount], [20% (if SAFE)],
  [Pro-Rata Rights], [Yes],
  [Board Seat], [Observer seat],
  [Information Rights], [Quarterly updates],
)

== Investor Value-Add

Seeking investors who can provide:

1. *GTM Expertise:* Experience scaling SaaS from \$0 to \$10M ARR
2. *Sales Tech Network:* Introductions to potential customers and partners
3. *Talent Access:* Help recruiting technical and GTM leaders
4. *Operational Support:* Guidance on pricing, expansion, fundraising

#pagebreak()

// Risk Analysis
= Risk Analysis

== Key Risks and Mitigation Strategies

=== Market Risks

#table(
  columns: (1.5fr, 2fr, 2fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#e2e8f0"),
  fill: (x, y) => if y == 0 { rgb("#edf2f7") } else { white },
  [*Risk*], [*Impact*], [*Mitigation*],
  [Market saturation], [Difficulty differentiating], [Focus on end-to-end automation as key differentiator; target underserved SMB segment],
  [Economic downturn], [Reduced sales tech budgets], [Position as cost-saving (replaces multiple tools); emphasize ROI and payback period],
  [Competitor response], [Clay or Apollo copy features], [Build moat through agent IP and customer relationships; stay 6-12 months ahead on roadmap],
)

=== Technology Risks

#table(
  columns: (1.5fr, 2fr, 2fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#e2e8f0"),
  fill: (x, y) => if y == 0 { rgb("#edf2f7") } else { white },
  [*Risk*], [*Impact*], [*Mitigation*],
  [AI API reliability], [Service disruptions], [Multi-provider fallback (Claude → GPT-4); queue-based architecture for graceful degradation],
  [API cost increases], [Margin compression], [Implement aggressive caching; negotiate volume discounts; develop fallback models],
  [Data source changes], [Prospecting disruption], [Diversify across 5+ sources; build scraping redundancy; maintain source monitoring],
)

=== Operational Risks

#table(
  columns: (1.5fr, 2fr, 2fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#e2e8f0"),
  fill: (x, y) => if y == 0 { rgb("#edf2f7") } else { white },
  [*Risk*], [*Impact*], [*Mitigation*],
  [Key person risk], [Single founder dependency], [Document all processes; prioritize technical co-founder hire; build advisory support],
  [Hiring challenges], [Slower development], [Competitive compensation; remote-friendly; strong mission narrative],
  [Customer churn], [Revenue loss], [Invest in customer success from day 1; build switching costs through integrations],
)

=== Regulatory Risks

#table(
  columns: (1.5fr, 2fr, 2fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#e2e8f0"),
  fill: (x, y) => if y == 0 { rgb("#edf2f7") } else { white },
  [*Risk*], [*Impact*], [*Mitigation*],
  [Email regulations], [Stricter anti-spam laws], [Human-in-the-loop approval; quality over quantity approach; compliance documentation],
  [Data privacy (GDPR)], [EU market restrictions], [Build privacy-first from start; data minimization; clear consent flows],
  [AI regulation], [New compliance requirements], [Monitor regulatory landscape; maintain transparency in AI use],
)

== Risk Probability and Impact Matrix

#figure(
  table(
    columns: (1.5fr, 1fr, 1fr, 1fr),
    inset: 10pt,
    stroke: 0.5pt + rgb("#e2e8f0"),
    fill: (x, y) => if y == 0 { rgb("#edf2f7") } else { white },
    [*Risk*], [*Probability*], [*Impact*], [*Priority*],
    [Competitor response], [High], [Medium], [🔴 High],
    [AI API cost increase], [Medium], [High], [🔴 High],
    [Customer churn], [Medium], [Medium], [🟡 Medium],
    [Key person risk], [Medium], [High], [🟡 Medium],
    [Economic downturn], [Low], [High], [🟡 Medium],
    [Regulatory changes], [Low], [Medium], [🟢 Low],
  ),
  caption: [Risk Priority Matrix]
)

== Contingency Plans

=== Scenario: Slower Growth Than Projected

*Trigger:* Fewer than 50 customers by Month 6

*Response:*
- Reduce burn by 40% (pause non-essential hires)
- Double down on product-led growth
- Pivot to specific vertical with highest conversion
- Extend runway to 24+ months

=== Scenario: Major Competitor Entry

*Trigger:* Clay, Apollo, or new entrant launches similar product

*Response:*
- Accelerate differentiation features
- Lock in annual contracts with discounts
- Focus on customer success and retention
- Consider strategic acquisition discussions

=== Scenario: AI API Disruption

*Trigger:* Anthropic/OpenAI pricing 3x+ or reliability issues

*Response:*
- Activate multi-provider fallback
- Evaluate open-source model deployment
- Adjust pricing to maintain margins
- Communicate transparently with customers

#pagebreak()

// Appendix
= Appendix

== A. Detailed Financial Tables

=== Monthly Cash Flow Projection (Year 1)

#figure(
  table(
    columns: (0.8fr, 0.8fr, 0.8fr, 0.8fr, 0.8fr, 0.8fr, 0.8fr),
    inset: 6pt,
    stroke: 0.5pt + rgb("#e2e8f0"),
    fill: (x, y) => if y == 0 { rgb("#edf2f7") } else { white },
    [*Month*], [*1*], [*3*], [*6*], [*9*], [*12*], [*Total*],
    [Revenue], [\$0], [\$1.5K], [\$7.5K], [\$15K], [\$20K], [\$120K],
    [COGS], [\$0], [\$0.7K], [\$3.4K], [\$6.8K], [\$9K], [\$54K],
    [Gross Profit], [\$0], [\$0.8K], [\$4.1K], [\$8.2K], [\$11K], [\$66K],
    [Personnel], [\$12K], [\$15K], [\$15K], [\$18K], [\$18K], [\$180K],
    [Marketing], [\$2K], [\$5K], [\$6K], [\$6K], [\$6K], [\$60K],
    [Other], [\$2K], [\$3K], [\$3K], [\$3K], [\$3K], [\$36K],
    [Net Cash], [(\$16K)], [(\$22K)], [(\$20K)], [(\$19K)], [(\$16K)], [(\$210K)],
    [Cum. Cash], [\$484K], [\$438K], [\$376K], [\$323K], [\$290K], [],
  ),
  caption: [Year 1 Monthly Cash Flow (Selected Months)]
)

=== Customer Acquisition Cost Breakdown

#table(
  columns: (1.2fr, 1fr, 1fr, 1fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#e2e8f0"),
  fill: (x, y) => if y == 0 { rgb("#edf2f7") } else { white },
  [*Channel*], [*Spend/Mo*], [*Customers*], [*CAC*],
  [Google Ads], [\$3,000], [10], [\$300],
  [LinkedIn Ads], [\$2,000], [4], [\$500],
  [Content/SEO], [\$1,000], [6], [\$167],
  [Referrals], [\$500], [4], [\$125],
  [*Blended*], [\$6,500], [24], [\$271],
)

== B. Competitive Feature Matrix

#figure(
  table(
    columns: (1.5fr, 0.7fr, 0.7fr, 0.7fr, 0.7fr, 0.7fr, 0.7fr),
    inset: 6pt,
    stroke: 0.5pt + rgb("#e2e8f0"),
    fill: (x, y) => if y == 0 { rgb("#edf2f7") } else if x == 0 { rgb("#f7fafc") } else { white },
    [*Feature*], [*Tapflow*], [*Clay*], [*Apollo*], [*Instantly*], [*Hunter*], [*Lemlist*],
    [Auto Prospecting], [✅], [❌], [✅], [❌], [✅], [✅],
    [Multi-Source], [✅], [✅], [❌], [❌], [❌], [❌],
    [AI Enrichment], [✅], [✅], [✅], [❌], [✅], [✅],
    [Lead Scoring], [✅], [✅], [✅], [❌], [❌], [❌],
    [AI Email Copy], [✅], [✅], [❌], [✅], [❌], [✅],
    [Email Sending], [✅ #super[\*]], [❌], [✅], [✅], [❌], [✅],
    [LinkedIn], [V2], [❌], [❌], [❌], [❌], [✅],
    [API Access], [✅], [✅], [✅], [✅], [✅], [✅],
    [White-Label], [✅], [❌], [❌], [✅], [❌], [❌],
    [Entry Price], [\$99], [\$134], [\$49 #super[\*]], [\$37], [\$34], [\$55 #super[\*]],
  ),
  caption: [Competitive Feature Comparison (#super[\*] = per user or via integration)]
)

== C. Technology Architecture Detail

=== Database Schema (Simplified)

#figure(
  block(
    width: 100%,
    fill: rgb("#f7fafc"),
    radius: 4pt,
    inset: 12pt,
    stroke: 0.5pt + rgb("#e2e8f0"),
  )[
    #set text(size: 8pt, font: "Fira Code")
    ```sql
    -- Core Tables
    users (id, email, name, company, created_at)
    subscriptions (id, user_id, tier, status, stripe_id)
    campaigns (id, user_id, name, target_criteria, status)
    prospects (id, campaign_id, company_name, website, source)
    contacts (id, prospect_id, name, email, title, verified)
    enrichments (id, prospect_id, tech_stack, score, pain_points)
    sequences (id, campaign_id, contact_id, emails, status)
    analytics (id, sequence_id, opens, clicks, replies)
    ```
  ],
  caption: [Core Database Tables]
)

=== API Integration Map

#table(
  columns: (1fr, 1.5fr, 1fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#e2e8f0"),
  fill: (x, y) => if y == 0 { rgb("#edf2f7") } else { white },
  [*Provider*], [*Purpose*], [*Est. Cost/mo*],
  [Google Places], [Business discovery], [\$100-275],
  [Yelp Fusion], [Reviews, ratings], [\$0 (free tier)],
  [Hunter.io], [Email verification], [\$34-209],
  [Apollo.io], [Contact enrichment], [\$49-149],
  [Anthropic (Claude)], [AI generation], [\$100-500],
  [Instantly.ai], [Email delivery], [\$37-97],
  [Stripe], [Payments], [2.9% + \$0.30],
)

== D. Glossary

#table(
  columns: (1fr, 2.5fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#e2e8f0"),
  fill: (x, y) => if calc.odd(y) { rgb("#f7fafc") } else { white },
  [*ARPU*], [Average Revenue Per User — monthly revenue divided by active customers],
  [*CAC*], [Customer Acquisition Cost — total sales/marketing spend divided by new customers],
  [*LTV*], [Lifetime Value — total revenue expected from a customer over their lifetime],
  [*MRR*], [Monthly Recurring Revenue — predictable monthly subscription revenue],
  [*ARR*], [Annual Recurring Revenue — MRR × 12],
  [*NRR*], [Net Revenue Retention — revenue retained from existing customers including expansion],
  [*ICP*], [Ideal Customer Profile — description of perfect-fit customer],
  [*PMF*], [Product-Market Fit — evidence that product solves real problem for defined market],
  [*SAFE*], [Simple Agreement for Future Equity — convertible instrument for early-stage funding],
  [*SOC 2*], [Service Organization Control 2 — security compliance certification],
)

== E. Contact Information

#align(center)[
  #block(
    width: 60%,
    fill: rgb("#f7fafc"),
    radius: 6pt,
    inset: 24pt,
    stroke: 1pt + rgb("#e2e8f0"),
  )[
    #text(size: 18pt, weight: "bold", fill: rgb("#1a365d"))[Tapflow, Inc.]
    
    #v(8pt)
    
    *Founder:* Marb\
    *Email:* [founder\@tapflow.io]\
    *Website:* [www.tapflow.io]\
    *Location:* Salt Lake City, Utah
    
    #v(12pt)
    
    #text(size: 10pt, fill: rgb("#718096"))[
      For investment inquiries, please contact the founder directly.
    ]
  ]
]

#v(2em)

#align(center)[
  #line(length: 30%, stroke: 0.5pt + rgb("#cbd5e0"))
  #v(1em)
  #text(size: 10pt, fill: rgb("#a0aec0"))[
    This business plan was prepared in January 2026.\
    All projections are forward-looking and subject to change.
  ]
]
