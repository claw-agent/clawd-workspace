// Tapflow Master Blueprint
// AI-Powered Lead Generation SaaS

#set document(
  title: "Tapflow Master Blueprint",
  author: "Tapflow Team",
  date: datetime(year: 2026, month: 1, day: 28),
)

#set page(
  paper: "us-letter",
  margin: (x: 1in, y: 1in),
)

#set text(
  font: "Helvetica Neue",
  size: 11pt,
)

#set heading(numbering: "1.1")

#set par(
  justify: true,
  leading: 0.65em,
)

// Color palette
#let primary = rgb("#0D7377")
#let secondary = rgb("#F59E0B")
#let tier-a = rgb("#22c55e")
#let tier-b = rgb("#eab308")
#let tier-c = rgb("#6b7280")

// Custom components
#let callout(body, type: "info") = {
  let bg = if type == "info" { rgb("#EFF6FF") } else if type == "warning" { rgb("#FEF3C7") } else { rgb("#F0FDF4") }
  let border = if type == "info" { rgb("#3B82F6") } else if type == "warning" { rgb("#F59E0B") } else { rgb("#22C55E") }
  block(
    width: 100%,
    inset: 12pt,
    radius: 4pt,
    fill: bg,
    stroke: (left: 3pt + border),
    body
  )
}

#let metric-box(value, label) = {
  box(
    width: 100%,
    inset: 16pt,
    radius: 8pt,
    fill: rgb("#F8FAFC"),
    stroke: 1pt + rgb("#E2E8F0"),
    align(center)[
      #text(size: 28pt, weight: "bold", fill: primary)[#value]\
      #text(size: 10pt, fill: rgb("#64748B"))[#label]
    ]
  )
}

// ============================================================================
// COVER PAGE
// ============================================================================

#page(margin: 0pt)[
  #align(center + horizon)[
    #block(width: 100%, height: 100%, fill: primary)[
      #v(2in)
      
      // Logo concept - stylized T with flow
      #align(center)[
        #text(size: 72pt, weight: "bold", fill: white, tracking: 0.1em)[
          TAPFLOW
        ]
      ]
      
      #v(0.3in)
      
      #text(size: 14pt, fill: white.transparentize(20%), tracking: 0.3em)[
        TAP INTO LEADS. LET THEM FLOW.
      ]
      
      #v(1in)
      
      #line(length: 40%, stroke: 2pt + white.transparentize(70%))
      
      #v(0.5in)
      
      #text(size: 32pt, weight: "light", fill: white)[
        Master Blueprint
      ]
      
      #v(0.3in)
      
      #text(size: 14pt, fill: white.transparentize(30%))[
        AI-Powered Lead Generation Platform
      ]
      
      #v(1.5in)
      
      #text(size: 12pt, fill: white.transparentize(50%))[
        Version 1.0 · January 2026\
        Confidential
      ]
    ]
  ]
]

// ============================================================================
// TABLE OF CONTENTS
// ============================================================================

#page[
  #align(center)[
    #text(size: 28pt, weight: "bold", fill: primary)[Contents]
  ]
  
  #v(0.5in)
  
  #outline(
    title: none,
    indent: 1.5em,
    depth: 2,
  )
]

// Set page numbering for main content
#set page(
  header: align(right)[
    #text(size: 9pt, fill: rgb("#94A3B8"))[Tapflow Master Blueprint]
  ],
  footer: context align(center)[
    #text(size: 9pt, fill: rgb("#94A3B8"))[
      #counter(page).display("1")
    ]
  ],
)

#counter(page).update(1)

// ============================================================================
// EXECUTIVE SUMMARY
// ============================================================================

= Executive Summary

#v(0.3in)

#text(size: 12pt, style: "italic", fill: rgb("#64748B"))[
  This document consolidates the complete product vision, technical architecture, brand identity, and implementation plan for Tapflow—an AI-powered lead generation platform that transforms how businesses find and reach their ideal customers.
]

#v(0.3in)

== The Opportunity

The lead generation market represents a *\$10B+ opportunity* growing at 10-15% annually. Despite the proliferation of tools, a critical gap exists: *no platform delivers true end-to-end automation* from prospect discovery to personalized outreach.

#v(0.2in)

#grid(
  columns: (1fr, 1fr, 1fr),
  gutter: 16pt,
  metric-box("$10B+", "Market Size"),
  metric-box("15%", "Annual Growth"),
  metric-box("4 weeks", "Time to MVP"),
)

#v(0.3in)

== Our Differentiation

#callout(type: "success")[
  *The Tapflow Advantage:* While competitors like Clay require users to build complex workflows and Apollo requires manual list building, Tapflow delivers a complete pipeline from a single input: _"Find restaurant owners in Denver who need websites."_
]

#v(0.2in)

#table(
  columns: (1fr, 1fr, 1fr, 1fr, 1fr),
  inset: 10pt,
  align: center,
  fill: (col, _) => if col == 0 { rgb("#F1F5F9") } else { none },
  stroke: 0.5pt + rgb("#E2E8F0"),
  
  [*Capability*], [*Clay*], [*Apollo*], [*Instantly*], [*Tapflow*],
  [Prospecting], text(fill: tier-c)[Manual], text(fill: tier-b)[Search], text(fill: tier-c)[None], text(fill: tier-a)[✓ Auto],
  [Enrichment], text(fill: tier-a)[✓ Yes], text(fill: tier-b)[Basic], text(fill: tier-c)[None], text(fill: tier-a)[✓ Yes],
  [Personalization], text(fill: tier-b)[Templates], text(fill: tier-c)[Basic], text(fill: tier-b)[Basic], text(fill: tier-a)[✓ AI],
  [Outreach], text(fill: tier-c)[None], text(fill: tier-b)[Built-in], text(fill: tier-a)[✓ Best], text(fill: tier-a)[✓ Int.],
  [Automation], text(fill: tier-b)[Workflows], text(fill: tier-c)[Manual], text(fill: tier-b)[Sending], text(fill: tier-a)[✓ Full],
)

#v(0.3in)

== Key Decisions

#grid(
  columns: (1fr, 1fr),
  gutter: 24pt,
  
  [
    *Product Name*\
    #text(weight: "bold", fill: primary)[Tapflow] — "Tap into leads. Let them flow."\
    Short, memorable, product-sounding.
    
    #v(0.15in)
    
    *Target Market*\
    SMB sales teams and lead gen agencies who waste hours on manual prospecting.
    
    #v(0.15in)
    
    *Pricing Strategy*\
    - Starter: \$99/mo (500 leads)
    - Growth: \$299/mo (2,500 leads)
    - Scale: \$799/mo (10,000 leads)
  ],
  
  [
    *Tech Stack*\
    Next.js 14 + Supabase + Inngest + Vercel\
    Zero-ops, scales to 10K users without re-architecture.
    
    #v(0.15in)
    
    *AI Strategy*\
    7-agent swarm with Claude Sonnet 4 for research and content generation. True autonomous operation.
    
    #v(0.15in)
    
    *Go-to-Market*\
    Eat our own dogfood → ProductHunt launch → Content + Paid acquisition.
  ],
)

#v(0.3in)

== Financial Projections

#table(
  columns: (1fr, 1fr, 1fr, 1fr),
  inset: 10pt,
  align: center,
  stroke: 0.5pt + rgb("#E2E8F0"),
  fill: (_, row) => if row == 0 { primary } else { none },
  
  text(fill: white, weight: "bold")[Metric],
  text(fill: white, weight: "bold")[MVP Cost],
  text(fill: white, weight: "bold")[Scale Cost],
  text(fill: white, weight: "bold")[Gross Margin],
  
  [Cost per Lead], [\$0.15-0.43], [\$0.10-0.12], [—],
  [Starter (\$99)], [\$0.08/lead], [\$0.04/lead], [60%],
  [Growth (\$299)], [\$0.05/lead], [\$0.03/lead], [58%],
  [Scale (\$799)], [\$0.04/lead], [\$0.02/lead], [50%],
)

#pagebreak()

// ============================================================================
// PART I: MARKET & STRATEGY
// ============================================================================

= Part I: Market & Strategy

#v(0.2in)

#text(size: 12pt, style: "italic", fill: rgb("#64748B"))[
  Based on comprehensive research into the lead generation SaaS market, competitive landscape, and pricing dynamics.
]

#v(0.3in)

== Market Landscape

The lead generation technology market is fragmented across multiple categories, with no single player owning the complete pipeline:

#v(0.2in)

#table(
  columns: (1.2fr, 2fr, 2fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#E2E8F0"),
  fill: (_, row) => if row == 0 { rgb("#F1F5F9") } else { none },
  
  [*Category*], [*Players*], [*Our Position*],
  [Sales Intelligence], [Apollo, ZoomInfo, Clearbit], [Data source partner],
  [Email Outreach], [Instantly, Lemlist, Smartlead], [Integration partner],
  [Enrichment], [Clay, Hunter, Snov.io], [Lightweight alternative],
  [Lead Lists], [Hunter, Snov.io, Lusha], [Feature overlap—more automated],
  [*Full-Stack Lead Gen*], [*Empty*], [*Tapflow (first mover)*],
)

#v(0.3in)

== Competitive Analysis

=== Clay.com — Closest Competitor

Clay is an enrichment orchestration platform with 100+ data providers. They're trusted by OpenAI, Anthropic, and Ramp.

*Pricing Structure:*
#table(
  columns: (1fr, 1fr, 1fr, 1fr),
  inset: 8pt,
  align: center,
  stroke: 0.5pt + rgb("#E2E8F0"),
  
  [*Plan*], [*Monthly*], [*Credits/Year*], [*Key Gate*],
  [Free], [\$0], [1,200], [100/search limit],
  [Starter], [\$134], [24K], [BYOK API keys],
  [Explorer], [\$314], [120K], [Webhooks],
  [Pro], [\$720], [600K], [CRM integrations],
)

#v(0.15in)

#callout(type: "info")[
  *Our Angle:* "Clay makes you build workflows. We just find leads." Clay requires users to bring their own lists and construct complex data flows. Tapflow handles the entire pipeline from a single input.
]

#v(0.2in)

=== Apollo.io — Sales Intelligence Leader

Apollo offers a 275M+ contact database with email sequencing and basic AI features.

*Weaknesses:*
- "AI" is basic templates, not true research
- Per-seat pricing kills team scaling
- No autonomous prospecting—manual list building required

*Our Position:* Use Apollo's API as a data source, not as a competitor.

#v(0.2in)

=== Instantly.ai — Cold Email Champion

Instantly dominates cold email with unlimited accounts and best-in-class warmup.

*Our Position:* Integration partner. Tapflow creates leads and emails; Instantly sends them.

#pagebreak()

== Pricing Strategy

=== Recommended Pricing Tiers

#v(0.2in)

#grid(
  columns: (1fr, 1fr),
  gutter: 24pt,
  
  block(
    width: 100%,
    inset: 20pt,
    radius: 8pt,
    fill: rgb("#F8FAFC"),
    stroke: 1pt + rgb("#E2E8F0"),
  )[
    #align(center)[
      #text(size: 18pt, weight: "bold")[Starter]
      #v(0.1in)
      #text(size: 32pt, weight: "bold", fill: primary)[\$99#text(size: 14pt, weight: "regular")[/mo]]
    ]
    #v(0.15in)
    - 500 leads/month
    - Google Maps + Yelp sourcing
    - Basic enrichment
    - Manual email copy
    - Email verification
    - CSV export
    #v(0.1in)
    #text(size: 10pt, fill: rgb("#64748B"))[Target: Freelancers, solo consultants]
  ],
  
  block(
    width: 100%,
    inset: 20pt,
    radius: 8pt,
    fill: rgb("#EFF6FF"),
    stroke: 2pt + primary,
  )[
    #align(center)[
      #text(size: 12pt, fill: primary, weight: "bold")[MOST POPULAR]
      #v(0.05in)
      #text(size: 18pt, weight: "bold")[Growth]
      #v(0.1in)
      #text(size: 32pt, weight: "bold", fill: primary)[\$299#text(size: 14pt, weight: "regular")[/mo]]
    ]
    #v(0.15in)
    - 2,500 leads/month
    - All sources + directories
    - Full enrichment (tech stack, revenue)
    - AI-generated personalized emails
    - Instantly integration
    - CRM export (HubSpot, Salesforce)
    #v(0.1in)
    #text(size: 10pt, fill: rgb("#64748B"))[Target: SMB sales teams, growing agencies]
  ],
)

#v(0.2in)

#grid(
  columns: (1fr, 1fr),
  gutter: 24pt,
  
  block(
    width: 100%,
    inset: 20pt,
    radius: 8pt,
    fill: rgb("#F8FAFC"),
    stroke: 1pt + rgb("#E2E8F0"),
  )[
    #align(center)[
      #text(size: 18pt, weight: "bold")[Scale]
      #v(0.1in)
      #text(size: 32pt, weight: "bold", fill: primary)[\$799#text(size: 14pt, weight: "regular")[/mo]]
    ]
    #v(0.15in)
    - 10,000 leads/month
    - Everything in Growth
    - API access
    - White-label
    - Multi-user (up to 5 seats)
    - Priority support
    #v(0.1in)
    #text(size: 10pt, fill: rgb("#64748B"))[Target: Lead gen agencies, larger teams]
  ],
  
  block(
    width: 100%,
    inset: 20pt,
    radius: 8pt,
    fill: rgb("#F8FAFC"),
    stroke: 1pt + rgb("#E2E8F0"),
  )[
    #align(center)[
      #text(size: 18pt, weight: "bold")[Enterprise]
      #v(0.1in)
      #text(size: 32pt, weight: "bold", fill: primary)[Custom]
    ]
    #v(0.15in)
    - Unlimited leads
    - Dedicated infrastructure
    - Custom AI training
    - SLA guarantees
    - Dedicated account manager
    - On-premise option
    #v(0.1in)
    #text(size: 10pt, fill: rgb("#64748B"))[Target: Large enterprises, high-volume ops]
  ],
)

#v(0.3in)

=== Unit Economics

#table(
  columns: (1fr, 1fr, 1fr, 1fr, 1fr),
  inset: 10pt,
  align: center,
  stroke: 0.5pt + rgb("#E2E8F0"),
  fill: (_, row) => if row == 0 { primary } else { none },
  
  text(fill: white, weight: "bold")[Plan],
  text(fill: white, weight: "bold")[Price],
  text(fill: white, weight: "bold")[Leads],
  text(fill: white, weight: "bold")[Cost/Lead],
  text(fill: white, weight: "bold")[Margin],
  
  [Starter], [\$99], [500], [\$0.08], [60%],
  [Growth], [\$299], [2,500], [\$0.05], [58%],
  [Scale], [\$799], [10,000], [\$0.04], [50%],
)

#pagebreak()

== Go-to-Market Strategy

=== Phase 1: Eat Our Own Dogfood (Weeks 1-4)

#callout[
  Use the product to sell the product. Build MVP targeting web design agencies, use Tapflow to find 100 agencies in Utah, send outreach offering free pilot, close 10 beta customers.
]

*Why agencies:* They understand lead gen, have budget, and can become product champions.

#v(0.2in)

=== Phase 2: ProductHunt + Content (Weeks 5-8)

- Launch on ProductHunt with "True AI Lead Gen" positioning
- Publish comparison content: "Clay vs Tapflow", "Apollo + Instantly vs Tapflow"
- Create demo videos showing agent orchestration in action
- Target keywords: "ai lead generation", "automated prospecting"

#v(0.2in)

=== Phase 3: Paid + Partnerships (Weeks 9-12)

- Google Ads on competitor brand terms
- Partner with CRM consultants for referrals
- Integrate with Zapier and Make
- Launch agency partner program (white-label + revenue share)

#v(0.3in)

== Target Customer Profiles

#grid(
  columns: (1fr, 1fr, 1fr),
  gutter: 16pt,
  
  block(
    width: 100%,
    inset: 16pt,
    radius: 8pt,
    fill: rgb("#F0FDF4"),
    stroke: 1pt + tier-a,
  )[
    #text(weight: "bold", fill: tier-a)[ICP 1: Solo Consultant]
    #v(0.1in)
    *Pain:* Hours on manual prospecting\
    *Budget:* \$100-300/mo\
    *Channel:* Twitter, IndieHackers\
    *Message:* "Find leads while you sleep"
  ],
  
  block(
    width: 100%,
    inset: 16pt,
    radius: 8pt,
    fill: rgb("#FEF3C7"),
    stroke: 1pt + tier-b,
  )[
    #text(weight: "bold", fill: tier-b)[ICP 2: SMB Sales Team]
    #v(0.1in)
    *Pain:* SDRs waste time on bad leads\
    *Budget:* \$500-1,500/mo\
    *Channel:* LinkedIn, G2\
    *Message:* "Qualified leads, not busywork"
  ],
  
  block(
    width: 100%,
    inset: 16pt,
    radius: 8pt,
    fill: rgb("#EFF6FF"),
    stroke: 1pt + rgb("#3B82F6"),
  )[
    #text(weight: "bold", fill: rgb("#3B82F6"))[ICP 3: Lead Gen Agency]
    #v(0.1in)
    *Pain:* Margins shrinking\
    *Budget:* \$1,000-5,000/mo\
    *Channel:* Agency communities\
    *Message:* "White-label AI for clients"
  ],
)

#v(0.3in)

== Positioning Statement

#block(
  width: 100%,
  inset: 24pt,
  radius: 8pt,
  fill: rgb("#F8FAFC"),
  stroke: 1pt + rgb("#E2E8F0"),
)[
  #text(size: 12pt, style: "italic")[
    *For sales teams and lead gen agencies* who waste hours on manual prospecting,
    
    *Tapflow* is an *AI-powered lead generation platform* that *autonomously finds, researches, and qualifies prospects* based on your ideal customer profile.
    
    Unlike *Clay, Apollo, or Instantly* which require manual list building,
    
    *we handle the entire pipeline* from "I need leads" to "ready-to-send emails."
  ]
]

#pagebreak()

// ============================================================================
// PART II: PRODUCT DESIGN
// ============================================================================

= Part II: Product Design

#v(0.2in)

#text(size: 12pt, style: "italic", fill: rgb("#64748B"))[
  UI/UX specification prioritizing speed to value. V1 focuses on proving value—polish comes in V2.
]

#v(0.3in)

== Design Principles

#grid(
  columns: (1fr, 1fr),
  gutter: 24pt,
  
  [
    === V1 Mantras
    
    #text(weight: "bold", fill: primary)[1. "One click to value"]\
    Minimize steps to see first leads
    
    #v(0.1in)
    
    #text(weight: "bold", fill: primary)[2. "Show the work"]\
    Make AI agent activity visible (trust through transparency)
    
    #v(0.1in)
    
    #text(weight: "bold", fill: primary)[3. "Progressive disclosure"]\
    Simple defaults, power features hidden until needed
    
    #v(0.1in)
    
    #text(weight: "bold", fill: primary)[4. "Copy > Design"]\
    Words matter more than pixels at this stage
  ],
  
  [
    === Technical Constraints
    
    - *Stack:* Next.js 14 + Tailwind + shadcn/ui
    - *No custom components* — shadcn/ui only
    - *No animations* (V1) — add delight in V2
    - *Mobile-responsive* — not mobile-first
    
    #v(0.15in)
    
    === Visual Direction
    
    - Clean, dense data views (like Linear)
    - Monospace fonts for data/stats
    - High contrast, accessible colors
    - Dark mode optional for V1
  ],
)

#v(0.3in)

== User Flow: Signup to First Leads

#callout(type: "success")[
  *Time to value target: < 3 minutes from signup to first leads*
]

#v(0.2in)

#align(center)[
  #block(
    width: 100%,
    inset: 16pt,
    radius: 8pt,
    fill: rgb("#F8FAFC"),
    stroke: 1pt + rgb("#E2E8F0"),
  )[
    #grid(
      columns: (1fr, 0.3fr, 1fr, 0.3fr, 1fr, 0.3fr, 1fr),
      align: center + horizon,
      
      [
        #circle(radius: 20pt, fill: primary, stroke: none)
        #place(center + horizon)[#text(fill: white, weight: "bold")[1]]
        #v(0.1in)
        #text(size: 9pt)[Landing\
        Page]
      ],
      [→],
      [
        #circle(radius: 20pt, fill: primary, stroke: none)
        #place(center + horizon)[#text(fill: white, weight: "bold")[2]]
        #v(0.1in)
        #text(size: 9pt)[Signup\
        (Email only)]
      ],
      [→],
      [
        #circle(radius: 20pt, fill: primary, stroke: none)
        #place(center + horizon)[#text(fill: white, weight: "bold")[3]]
        #v(0.1in)
        #text(size: 9pt)[Onboarding\
        (3 questions)]
      ],
      [→],
      [
        #circle(radius: 20pt, fill: tier-a, stroke: none)
        #place(center + horizon)[#text(fill: white, weight: "bold")[4]]
        #v(0.1in)
        #text(size: 9pt)[🎉 See Leads\
        (< 60 seconds)]
      ],
    )
  ]
]

#v(0.2in)

*Step-by-step:*
+ *Landing Page* → Click "Start Free Trial" (no credit card)
+ *Signup* → Email + password only (no name, no company—friction kills)
+ *Onboarding 1* → "What do you sell?" (dropdown)
+ *Onboarding 2* → "Who's your ideal customer?" (dropdown)
+ *Onboarding 3* → "Where?" (location picker)
+ *Dashboard* → Big CTA: "Find Your First 50 Leads"
+ *Campaign Created* → Realtime agent activity starts
+ *Leads Appear* → ~30-60 seconds for first results

#pagebreak()

== Key Screens

=== Dashboard

The dashboard provides a high-level overview of all lead generation activity.

#v(0.2in)

#block(
  width: 100%,
  inset: 16pt,
  radius: 8pt,
  fill: rgb("#F8FAFC"),
  stroke: 1pt + rgb("#E2E8F0"),
)[
  #grid(
    columns: (1fr, 1fr, 1fr),
    gutter: 12pt,
    
    block(inset: 12pt, radius: 4pt, fill: white, stroke: 0.5pt + rgb("#E2E8F0"))[
      #text(size: 24pt, weight: "bold")[1,247]
      #text(size: 10pt, fill: rgb("#64748B"))[Total Leads]
      #v(0.05in)
      #text(size: 10pt, fill: tier-a)[↑ 47 today]
    ],
    
    block(inset: 12pt, radius: 4pt, fill: white, stroke: 0.5pt + rgb("#E2E8F0"))[
      #text(size: 24pt, weight: "bold")[156]
      #text(size: 10pt, fill: rgb("#64748B"))[Emails Sent]
      #v(0.05in)
      #text(size: 10pt, fill: tier-a)[32% open rate]
    ],
    
    block(inset: 12pt, radius: 4pt, fill: white, stroke: 0.5pt + rgb("#E2E8F0"))[
      #text(size: 24pt, weight: "bold")[23]
      #text(size: 10pt, fill: rgb("#64748B"))[Replies]
      #v(0.05in)
      #text(size: 10pt, fill: tier-a)[14.7% rate]
    ],
  )
  
  #v(0.15in)
  
  *Active Campaigns*
  #v(0.1in)
  #table(
    columns: (auto, 1fr, auto, auto),
    inset: 8pt,
    stroke: none,
    
    [●], [Denver Restaurants], [487 leads], [12 replies],
    [○], [Austin Dentists], [342 leads], [8 replies],
    [○], [Seattle Coffee Shops], [418 leads], [3 replies],
  )
]

#v(0.3in)

=== Lead List View

Dense table with filters sidebar for efficient lead management.

#v(0.2in)

#table(
  columns: (auto, 2fr, auto, auto, auto, auto),
  inset: 8pt,
  align: (center, left, center, center, center, center),
  stroke: 0.5pt + rgb("#E2E8F0"),
  fill: (_, row) => if row == 0 { rgb("#F1F5F9") } else { none },
  
  [☐], [*Company*], [*Score*], [*Tier*], [*Website*], [*Contact*],
  [☑], [Mike's Pizza], [87], text(fill: tier-a)[A], text(fill: rgb("#EF4444"))[Poor], [✓ Mike],
  [☐], [Sushi Palace], [72], text(fill: tier-b)[B], text(fill: tier-b)[OK], [✓ Jun],
  [☑], [Taco Town], [91], text(fill: tier-a)[A], text(fill: rgb("#EF4444"))[Poor], [✓ Maria],
  [☐], [Burger Joint], [45], text(fill: tier-c)[C], text(fill: tier-a)[Good], [✗],
  [☐], [Thai Kitchen], [68], text(fill: tier-b)[B], text(fill: tier-b)[OK], [✓ Lin],
)

#v(0.1in)

*Bulk actions:* Generate Outreach | Add to List | Archive | Export

#pagebreak()

=== Lead Detail Panel

Slide-in panel (60% width) showing complete prospect intelligence.

#v(0.2in)

#grid(
  columns: (1fr, 1fr),
  gutter: 24pt,
  
  [
    *Header Section*
    - Company name + address
    - Phone + website link
    - Tier badge (A/B/C)
    
    #v(0.15in)
    
    *Lead Score Breakdown*
    #v(0.1in)
    #table(
      columns: (2fr, 1fr),
      inset: 6pt,
      stroke: none,
      
      [✓ Slow website (8.2s)], [+20 pts],
      [✓ Not mobile-friendly], [+25 pts],
      [✓ No SSL certificate], [+15 pts],
      [✓ Low rating (3.2★)], [+10 pts],
      [✗ Has online ordering], [-10 pts],
      [✓ Contact found], [+17 pts],
    )
  ],
  
  [
    *Contacts*
    #block(inset: 12pt, radius: 4pt, fill: rgb("#F8FAFC"))[
      👤 *Mike Johnson* (Owner)\
      #text(size: 10pt)[mike\@mikespizza.com ✓ verified]\
      #text(size: 10pt)[LinkedIn: /in/mikejohnson]
    ]
    
    #v(0.15in)
    
    *Pain Points Detected*
    - Slow page load hurting SEO
    - Not ranking for "pizza denver"
    - Competitor "Tony's" outranks them
    
    #v(0.15in)
    
    #align(center)[
      #block(inset: 12pt, radius: 4pt, fill: primary)[
        #text(fill: white, weight: "bold")[Generate Personalized Email →]
      ]
    ]
  ],
)

#v(0.3in)

=== Outreach Queue

Two-panel view for efficient email approval workflow.

#v(0.2in)

#grid(
  columns: (1fr, 2fr),
  gutter: 16pt,
  
  block(inset: 12pt, radius: 4pt, fill: rgb("#F8FAFC"), stroke: 0.5pt + rgb("#E2E8F0"))[
    *Pending Approval (23)*
    #v(0.1in)
    #text(size: 10pt)[
      ● Mike's Pizza\
      #h(0.2in)#text(fill: rgb("#64748B"))[2h ago]
      
      #v(0.1in)
      
      ○ Sushi Palace\
      #h(0.2in)#text(fill: rgb("#64748B"))[2h ago]
      
      #v(0.1in)
      
      ○ Taco Town\
      #h(0.2in)#text(fill: rgb("#64748B"))[3h ago]
    ]
  ],
  
  block(inset: 16pt, radius: 4pt, fill: white, stroke: 1pt + rgb("#E2E8F0"))[
    *To:* mike\@mikespizza.com\
    *Subject:* Quick question about your website...
    
    #line(length: 100%, stroke: 0.5pt + rgb("#E2E8F0"))
    #v(0.1in)
    
    Hi Mike,
    
    I was looking for pizza in Denver last night and found Mike's Pizza. Great reviews! 
    
    I noticed your website takes about 8 seconds to load—that's costing you customers who won't wait...
    
    #v(0.15in)
    
    #grid(
      columns: (1fr, 1fr, 1fr),
      gutter: 8pt,
      
      block(inset: 8pt, radius: 4pt, fill: tier-a)[#align(center)[#text(fill: white, size: 10pt, weight: "bold")[Approve]]],
      block(inset: 8pt, radius: 4pt, fill: rgb("#F1F5F9"))[#align(center)[#text(size: 10pt)[Edit]]],
      block(inset: 8pt, radius: 4pt, fill: rgb("#FEE2E2"))[#align(center)[#text(size: 10pt)[Reject]]],
    )
  ],
)

#v(0.3in)

== Realtime Elements

#callout[
  *Why Realtime Matters:* Clay's best UX feature is showing work happening live. Users trust the product more when they see "87 records enriched" incrementing in realtime.
]

*Agent Activity Feed States:*
#table(
  columns: (auto, 1fr, auto),
  inset: 8pt,
  stroke: 0.5pt + rgb("#E2E8F0"),
  
  [🔍], [Discovery Agent], text(fill: rgb("#3B82F6"))[Blue],
  [📊], [Enrichment Agent], text(fill: rgb("#A855F7"))[Purple],
  [🏷️], [Scoring Agent], text(fill: tier-b)[Yellow],
  [✨], [Content Agent], text(fill: tier-a)[Green],
  [📧], [Outreach Agent], text(fill: primary)[Teal],
)

#pagebreak()

== Component Library

=== shadcn/ui Base Components

All UI built exclusively with shadcn/ui primitives for V1:

#grid(
  columns: (1fr, 1fr, 1fr),
  gutter: 12pt,
  
  [
    - Button
    - Input
    - Select
    - Checkbox
    - Radio Group
    - Switch
  ],
  
  [
    - Card
    - Table
    - Badge
    - Dialog
    - Sheet
    - Tabs
  ],
  
  [
    - Progress
    - Skeleton
    - Toast (Sonner)
    - Avatar
    - Command
    - Slider
  ],
)

#v(0.2in)

=== Custom Additions

#table(
  columns: (1fr, 2fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#E2E8F0"),
  
  [*LeadScoreBadge*], [Visual badge with color based on score (green/yellow/red)],
  [*TierBadge*], [A/B/C tier indicator with appropriate coloring],
  [*AgentActivityFeed*], [Realtime activity list for campaign monitoring],
  [*EmailPreview*], [Renders email with editable fields for approval flow],
)

#v(0.3in)

== Mobile Considerations

#callout(type: "warning")[
  *V1 Approach: Responsive, Not Mobile-First*
  
  Our users are B2B salespeople who work on desktop. Mobile is "check stats on the go" not "run campaigns."
]

#v(0.2in)

*Breakpoints:*
- sm: 640px (Large phones landscape)
- md: 768px (Tablets)
- lg: 1024px (Laptops)
- xl: 1280px (Desktops)

*Mobile Adaptations:*
#table(
  columns: (1fr, 1fr, 1fr),
  inset: 8pt,
  stroke: 0.5pt + rgb("#E2E8F0"),
  
  [*Screen*], [*Desktop*], [*Mobile (\<768px)*],
  [Dashboard], [3-column stats], [Stacked cards],
  [Lead list], [Full table], [Card view],
  [Lead detail], [Slide-in panel], [Full screen sheet],
  [Settings], [Sidebar + content], [Tabs on top],
)

#v(0.2in)

*Not Supported on Mobile (V1):*
- Campaign creation wizard (redirect to desktop)
- Bulk actions (>10 items)
- Settings changes
- API access

#pagebreak()

// ============================================================================
// PART III: TECHNICAL ARCHITECTURE
// ============================================================================

= Part III: Technical Architecture

#v(0.2in)

#text(size: 12pt, style: "italic", fill: rgb("#64748B"))[
  Complete technical stack decisions. Every decision is final—no hedging. Goal: ship MVP in 4 weeks, scale to 10K users without re-architecture.
]

#v(0.3in)

== Stack at a Glance

#table(
  columns: (1fr, 1.5fr, 2fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#E2E8F0"),
  fill: (_, row) => if row == 0 { primary } else { none },
  
  text(fill: white, weight: "bold")[Layer],
  text(fill: white, weight: "bold")[Decision],
  text(fill: white, weight: "bold")[Reason],
  
  [Hosting], [*Vercel*], [Zero-ops, edge functions, generous free tier],
  [Database], [*Supabase*], [Postgres + Auth + Realtime in one],
  [Queue], [*Inngest*], [Serverless-native, no Redis to manage],
  [Auth], [*Supabase Auth*], [Already using Supabase, one less vendor],
  [AI], [*Claude Sonnet 4*], [Best cost/quality for writing tasks],
  [Email], [*Resend + Instantly*], [Modern APIs, best deliverability],
  [Payments], [*Stripe*], [Industry standard],
)

#v(0.3in)

== System Architecture

#align(center)[
  #block(
    width: 100%,
    inset: 20pt,
    radius: 8pt,
    fill: rgb("#F8FAFC"),
    stroke: 1pt + rgb("#E2E8F0"),
  )[
    #text(size: 10pt, weight: "bold")[USER INTERFACE (Next.js 14)]
    #v(0.05in)
    Dashboard | Campaign Builder | Lead List | Settings
    
    #v(0.15in)
    ↓
    #v(0.15in)
    
    #text(size: 10pt, weight: "bold")[API LAYER (Vercel)]
    #v(0.05in)
    tRPC Router: campaigns | leads | outreach | billing | integrations
    
    #v(0.15in)
    ↓ #h(1in) ↓ #h(1in) ↓
    #v(0.15in)
    
    #grid(
      columns: (1fr, 1fr, 1fr),
      gutter: 12pt,
      
      block(inset: 10pt, radius: 4pt, fill: white)[
        #text(size: 9pt, weight: "bold")[SUPABASE]
        #v(0.05in)
        #text(size: 8pt)[Postgres + Auth\
        + Realtime + RLS]
      ],
      
      block(inset: 10pt, radius: 4pt, fill: white)[
        #text(size: 9pt, weight: "bold")[INNGEST]
        #v(0.05in)
        #text(size: 8pt)[Job Queue\
        Step Functions]
      ],
      
      block(inset: 10pt, radius: 4pt, fill: white)[
        #text(size: 9pt, weight: "bold")[EXTERNAL]
        #v(0.05in)
        #text(size: 8pt)[Google Maps, Apollo\
        Hunter, Claude]
      ],
    )
    
    #v(0.15in)
    ↓
    #v(0.15in)
    
    #text(size: 10pt, weight: "bold")[AI AGENT ORCHESTRATION]
    #v(0.05in)
    Discovery → Enricher → Qualifier → Outreach
  ]
]

#pagebreak()

== Infrastructure Decisions

=== Hosting: Vercel ✅

#table(
  columns: (1fr, 1fr, 1fr, 1fr),
  inset: 8pt,
  align: center,
  stroke: 0.5pt + rgb("#E2E8F0"),
  fill: (_, row) => if row == 0 { rgb("#F1F5F9") } else { none },
  
  [*Factor*], [*Vercel*], [*Railway*], [*AWS*],
  [Zero-config], [✅ Yes], [✅ Yes], [❌ No],
  [Edge functions], [✅ Global], [⚠️ Regional], [⚠️ Complex],
  [Free tier], [100GB BW], [\$5 credit], [Pay-per-use],
  [Next.js], [✅ Native], [⚠️ Good], [⚠️ Manual],
  [Ops overhead], [Zero], [Low], [High],
)

#v(0.1in)

*Reasoning:* We're building Next.js—Vercel made Next.js. Zero ops means shipping faster.

#v(0.2in)

=== Database: Supabase ✅

#table(
  columns: (1fr, 1fr, 1fr, 1fr),
  inset: 8pt,
  align: center,
  stroke: 0.5pt + rgb("#E2E8F0"),
  fill: (_, row) => if row == 0 { rgb("#F1F5F9") } else { none },
  
  [*Factor*], [*Supabase*], [*PlanetScale*], [*Neon*],
  [Postgres], [✅ Real], [❌ MySQL], [✅ Real],
  [Free tier], [500MB], [5GB], [0.5GB],
  [Built-in Auth], [✅ Yes], [❌ No], [❌ No],
  [Realtime], [✅ WebSocket], [❌ No], [❌ No],
  [RLS], [✅ Native], [❌ No], [❌ No],
)

#v(0.1in)

*Reasoning:* Auth + Database + Realtime + Storage in one vendor = fewer integrations. RLS makes multi-tenancy trivial.

#v(0.2in)

=== Queue: Inngest ✅

*Why Inngest over BullMQ:*
- No Redis to manage = zero ops
- Step functions for resumable agent stages
- Automatic retries with exponential backoff
- 25K free runs covers MVP
- Native Vercel integration

#v(0.3in)

== Database Schema

=== Core Tables

#text(size: 10pt)[
```sql
-- Users (extended from Supabase Auth)
users: id, email, full_name, avatar_url

-- Organizations (for team features)
organizations: id, name, slug, owner_id, plan, stripe_customer_id

-- Campaigns
campaigns: id, org_id, name, business_type, target_location, 
           target_radius, status, total_prospects, enriched_count

-- Prospects
prospects: id, campaign_id, company_name, website, phone, 
           address, source, status, domain (generated)

-- Contacts
contacts: id, prospect_id, name, title, email, 
          email_verified, linkedin_url, is_primary

-- Enrichment Data
enrichment_data: id, prospect_id, website_score, mobile_score,
                 tech_stack, pain_points, company_summary

-- Lead Scores
lead_scores: id, prospect_id, score (0-100), tier (A/B/C/D),
             scoring_factors, scoring_notes

-- Outreach
outreach_sequences: id, campaign_id, prospect_id, contact_id,
                    sequence_type, status, approved_by
outreach_emails: id, sequence_id, step_number, subject, 
                 body_html, status, sent_at, opens, clicks
```
]

#pagebreak()

=== Row Level Security

All tables use RLS for multi-tenant data isolation:

#text(size: 10pt)[
```sql
-- Policy: Campaign access through organization membership
CREATE POLICY "Org members can access campaigns" ON public.campaigns
  FOR ALL USING (
    organization_id IN (
      SELECT organization_id FROM public.organization_members 
      WHERE user_id = auth.uid()
    )
  );
```
]

#v(0.3in)

== API Design (tRPC)

=== Router Structure

#table(
  columns: (1fr, 2fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#E2E8F0"),
  
  [*Router*], [*Endpoints*],
  [auth], [login, signup, logout, resetPassword],
  [campaigns], [list, get, create, updateStatus, delete],
  [prospects], [list, get, enrich, updateStatus, export],
  [contacts], [list, get, create, verify],
  [outreach], [getForProspect, generate, approve, send, stats],
  [organization], [get, update, inviteUser, removeUser],
  [billing], [getSubscription, createCheckout, portal],
  [integrations], [connect, disconnect, sync],
)

#v(0.2in)

=== Example: Create Campaign

#text(size: 10pt)[
```typescript
create: protectedProcedure
  .input(z.object({
    name: z.string().min(1).max(100),
    businessType: z.string().min(1),
    targetLocation: z.string().min(1),
    targetRadius: z.number().min(1).max(100).default(25),
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
```
]

#v(0.3in)

== Third-Party Integrations

#table(
  columns: (1fr, 1fr, 1.5fr, 1fr),
  inset: 8pt,
  stroke: 0.5pt + rgb("#E2E8F0"),
  fill: (_, row) => if row == 0 { rgb("#F1F5F9") } else { none },
  
  [*Service*], [*Use Case*], [*Cost (MVP)*], [*Cost (Scale)*],
  [Google Maps], [Prospecting], [\$0 (scraping)], [\$100-275/mo],
  [Hunter.io], [Email verification], [\$34-104/mo], [\$209/mo],
  [Apollo.io], [Enrichment], [\$49-99/mo], [\$149/mo],
  [Instantly], [Email sending], [\$37-97/mo], [\$97/mo],
  [Firecrawl], [Web scraping], [\$16-83/mo], [\$333/mo],
  [Twilio], [SMS/Voice], [\$20-50/mo], [\$100+/mo],
  [*TOTAL*], [], [*\$156-433/mo*], [*\$988-1,163/mo*],
)

#pagebreak()

// ============================================================================
// PART IV: BRAND IDENTITY
// ============================================================================

= Part IV: Brand Identity

#v(0.2in)

#text(size: 12pt, style: "italic", fill: rgb("#64748B"))[
  Establishing the brand identity for Tapflow—our AI-powered lead generation platform.
]

#v(0.3in)

== Product Name: Tapflow

#grid(
  columns: (1fr, 1fr),
  gutter: 24pt,
  
  [
    === Why Tapflow
    
    #text(size: 14pt, weight: "bold", fill: primary)[
      "Tap into leads. Let them flow."
    ]
    
    #v(0.15in)
    
    *Strengths:*
    - 7 characters, 2 syllables
    - Product-sounding (not agency-like)
    - Meaningful compound word
    - Domain likely available (.io or get-)
    - No AI in name (timeless)
    - Easy to create distinctive logo
    - Trademark clear
  ],
  
  [
    === Name Analysis
    
    #table(
      columns: (1fr, 1fr),
      inset: 8pt,
      stroke: 0.5pt + rgb("#E2E8F0"),
      
      [Domain .com], [⚠️ Verify],
      [Domain .io], [✅ Available],
      [gettapflow.com], [✅ Available],
      [Twitter \@tapflow], [⚠️ Verify],
      [Trademark], [Low risk],
      [*Rating*], [*8/10*],
    )
    
    #v(0.1in)
    
    *Runners-up:*
    - Wellspring (more evocative)
    - Maplead (literal meaning)
  ],
)

#v(0.3in)

== Tagline Options

#block(
  width: 100%,
  inset: 20pt,
  radius: 8pt,
  fill: rgb("#F8FAFC"),
  stroke: 1pt + rgb("#E2E8F0"),
)[
  #grid(
    columns: (1fr, 1fr),
    gutter: 24pt,
    
    [
      *For "Tapflow" specifically:*
      + "Tap into leads. Let them flow."
      + "Turn on your pipeline"
      + "Leads on demand"
      + "Discovery to deal, automated"
      + "Your always-on prospecting engine"
    ],
    
    [
      *Universal (work for any name):*
      + "From ICP to inbox, automated"
      + "Leads found. Qualified. Delivered."
      + "Your outbound team, automated"
      + "AI that actually prospects"
      + "Pipeline without the busywork"
    ],
  )
]

#v(0.3in)

== Brand Voice

=== Tone: Smart Casual

#align(center)[
  #block(
    width: 80%,
    inset: 16pt,
    radius: 8pt,
    fill: rgb("#EFF6FF"),
    stroke: 1pt + primary,
  )[
    Casual ●────○──────────○ Corporate\
    #h(1.5em)↑ Our sweet spot
  ]
]

#pagebreak()

=== Voice Characteristics

#table(
  columns: (1fr, 2fr, 2fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#E2E8F0"),
  fill: (_, row) => if row == 0 { rgb("#F1F5F9") } else { none },
  
  [*Trait*], [*How We Sound*], [*How We Don't Sound*],
  [Confident], ["This is how lead gen should work"], ["We think maybe this could help"],
  [Direct], ["Get 2,500 leads/month for \$299"], ["Our flexible pricing tiers..."],
  [Technical but accessible], ["AI agents research each prospect"], ["Proprietary neural networks..."],
  [Honest], ["We're not Clay—we're simpler"], ["Best-in-class enterprise solution"],
  [Human], ["Built by salespeople, for salespeople"], ["Leverage synergies across verticals"],
)

#v(0.2in)

=== Voice Examples

#grid(
  columns: (1fr, 1fr),
  gutter: 20pt,
  
  block(inset: 12pt, radius: 4pt, fill: rgb("#FEE2E2"))[
    *❌ Don't say:*\
    "Revolutionizing lead generation through AI-powered automation solutions"
  ],
  
  block(inset: 12pt, radius: 4pt, fill: rgb("#DCFCE7"))[
    *✅ Say this:*\
    "You tell us who to find. We find them, research them, and write the email. You hit send."
  ],
)

#v(0.3in)

== Visual Direction

=== Color Palette

#grid(
  columns: (1fr, 1fr, 1fr, 1fr),
  gutter: 16pt,
  
  block(width: 100%, height: 80pt, fill: primary, radius: 8pt)[
    #v(0.3in)
    #align(center)[
      #text(fill: white, weight: "bold")[Primary]\
      #text(fill: white, size: 9pt)[\#0D7377]
    ]
  ],
  
  block(width: 100%, height: 80pt, fill: secondary, radius: 8pt)[
    #v(0.3in)
    #align(center)[
      #text(fill: white, weight: "bold")[Secondary]\
      #text(fill: white, size: 9pt)[\#F59E0B]
    ]
  ],
  
  block(width: 100%, height: 80pt, fill: rgb("#1F2937"), radius: 8pt)[
    #v(0.3in)
    #align(center)[
      #text(fill: white, weight: "bold")[Dark]\
      #text(fill: white, size: 9pt)[\#1F2937]
    ]
  ],
  
  block(width: 100%, height: 80pt, fill: rgb("#FB7185"), radius: 8pt)[
    #v(0.3in)
    #align(center)[
      #text(fill: white, weight: "bold")[Accent]\
      #text(fill: white, size: 9pt)[\#FB7185]
    ]
  ],
)

#v(0.15in)

*Why This Palette:*
- *Not blue* — Every SaaS tool is blue. We differentiate visually.
- *Teal = intelligence + trust* — Feels smart without being cold.
- *Amber = action + warmth* — Conveys energy and results.
- *Modern but not trendy* — Will age well, won't feel dated in 2 years.

#v(0.2in)

=== Typography

#table(
  columns: (1fr, 2fr, 2fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#E2E8F0"),
  
  [*Use*], [*Font*], [*Examples*],
  [Headlines], [Inter (Bold)], [Clean, modern, used by Linear, Vercel],
  [Body], [Inter (Regular)], [Consistent family, excellent for UI],
  [Code/Data], [JetBrains Mono], [Scores, timestamps, API docs],
)

#v(0.2in)

=== Logo Direction

Three concepts for exploration:
+ *Flowing Pipeline* — Abstract lines suggesting flow/movement
+ *Discovery Symbol* — Stylized compass or radar element  
+ *Monogram* — Clean letter-based mark (T for Tapflow)

#pagebreak()

// ============================================================================
// PART V: AGENT SWARM
// ============================================================================

= Part V: Agent Swarm

#v(0.2in)

#text(size: 12pt, style: "italic", fill: rgb("#64748B"))[
  The AI agent swarm architecture transforms simple user requests into qualified, ready-to-contact leads with personalized outreach sequences.
]

#v(0.3in)

== Agent Roster

#table(
  columns: (auto, 1.5fr, 2fr, 1fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#E2E8F0"),
  fill: (_, row) => if row == 0 { primary } else { none },
  
  text(fill: white, weight: "bold")[\#],
  text(fill: white, weight: "bold")[Agent],
  text(fill: white, weight: "bold")[Purpose],
  text(fill: white, weight: "bold")[Reuse],
  
  [1], [*Discovery*], [Find prospects from external sources], [90%],
  [2], [*Research*], [Deep-dive on individual prospects], [100%],
  [3], [*Enrichment*], [Find emails, tech stack, company data], [New],
  [4], [*Scoring*], [Assign A/B/C tier based on fit], [100%],
  [5], [*Content*], [Generate personalized email copy], [80%],
  [6], [*Outreach*], [Manage sequences and sending], [100%],
  [7], [*QA*], [Verify data quality before handoffs], [New],
)

#v(0.3in)

== Design Principles

#grid(
  columns: (1fr, 1fr),
  gutter: 24pt,
  
  [
    #text(weight: "bold", fill: primary)[1. Single Responsibility]\
    Each agent does one thing well
    
    #v(0.15in)
    
    #text(weight: "bold", fill: primary)[2. Explicit Handoffs]\
    Clear data contracts between agents
    
    #v(0.15in)
    
    #text(weight: "bold", fill: primary)[3. Parallel When Possible]\
    Maximize throughput
  ],
  
  [
    #text(weight: "bold", fill: primary)[4. Human-in-the-Loop]\
    Critical decisions require approval
    
    #v(0.15in)
    
    #text(weight: "bold", fill: primary)[5. Graceful Degradation]\
    Partial results beat total failure
    
    #v(0.15in)
    
    #text(weight: "bold", fill: primary)[6. Observable]\
    Show work in realtime for trust
  ],
)

#v(0.3in)

== Agent Specifications

=== 1. Discovery Agent

*Purpose:* Find raw prospect data from Google Maps, Yelp, directories based on campaign criteria.

#grid(
  columns: (1fr, 1fr),
  gutter: 20pt,
  
  block(inset: 12pt, radius: 4pt, fill: rgb("#F0FDF4"))[
    *Inputs:*
    - Campaign ID
    - Business type ("restaurant")
    - Location ("Denver, CO")
    - Radius (25 miles)
    - Max results (100)
    - Filters (min reviews, rating)
  ],
  
  block(inset: 12pt, radius: 4pt, fill: rgb("#EFF6FF"))[
    *Outputs:*
    - Prospect list with:
      - Name, address, phone
      - Website URL
      - Source (google_maps/yelp)
      - Rating, review count
      - Raw API data
  ],
)

*Tools:* Google Maps API, Yelp Fusion, Puppeteer scraper

#pagebreak()

=== 2. Research Agent

*Purpose:* Conduct deep research on individual prospects to understand pain points and opportunities.

*Outputs:*
- Company summary (2-3 sentences)
- Key people identified
- Website analysis (mobile, speed, SSL)
- Pain points detected
- Opportunities identified
- Research confidence score (0-1)

*Tools:* Firecrawl, Lighthouse API, social media APIs

#v(0.2in)

=== 3. Enrichment Agent

*Purpose:* Find contact information and company data.

*Waterfall Strategy:*
+ Try Hunter.io first (cheapest, good accuracy)
+ If no result → try Apollo.io
+ If still no result → pattern matching (first\@domain.com)
+ Always verify with Hunter before marking valid

*Outputs:*
- Verified email addresses
- Phone numbers
- LinkedIn profiles
- Tech stack detection
- Employee count estimate
- Revenue estimate

#v(0.2in)

=== 4. Scoring Agent

*Purpose:* Analyze all prospect data and assign quality score (0-100) and tier (A/B/C).

#table(
  columns: (1fr, 1fr, 2fr),
  inset: 8pt,
  stroke: 0.5pt + rgb("#E2E8F0"),
  fill: (_, row) => if row == 0 { rgb("#F1F5F9") } else { none },
  
  [*Factor*], [*Weight*], [*Criteria*],
  [ICP Fit], [30%], [Business type, size, location match],
  [Pain Signals], [25%], [Website issues, missing features],
  [Contact Quality], [20%], [Valid email, decision maker access],
  [Timing Signals], [15%], [Recent reviews, hiring, funding],
  [Engagement Potential], [10%], [Open rate prediction, hooks],
)

#v(0.1in)

*Tier Definitions:*
- *Tier A (70-100):* Immediate outreach, manual review — Top 20%
- *Tier B (40-69):* Automated sequence, nurture — Middle 50%
- *Tier C (0-39):* Skip or long-term nurture — Bottom 30%

#pagebreak()

=== 5. Content Agent

*Purpose:* Generate personalized outreach content based on prospect research.

*Email Sequence Structure:*
+ *Email 1 (Day 0):* Value-first intro with specific observation
+ *Email 2 (Day 3):* Case study or social proof
+ *Email 3 (Day 5):* Direct ask with clear CTA
+ *Email 4 (Day 7):* Breakup email

*Content Guidelines:*
- Subject lines < 50 chars
- Body < 150 words for cold emails
- Specific > generic (always reference their business)
- One clear CTA per email
- No attachments on first touch

#v(0.2in)

=== 6. Outreach Agent

*Purpose:* Manage sending of outreach sequences, track responses, handle follow-ups.

*Sequence Logic:*
- If opened but no reply → continue sequence
- If replied → STOP sequence, flag for human
- If bounced → mark contact invalid, try alternate
- If unsubscribed → add to DNC list forever

*Tools:* Instantly.ai, SendGrid/Resend, Twilio for SMS

#v(0.2in)

=== 7. QA Agent

*Purpose:* Verify data quality at each handoff point. Catch errors before they propagate.

*Validation Checkpoints:*
#table(
  columns: (1fr, 2fr),
  inset: 8pt,
  stroke: 0.5pt + rgb("#E2E8F0"),
  
  [*Stage*], [*Checks*],
  [Post-Discovery], [Valid address, phone format, no duplicates],
  [Post-Research], [Website accessible, confidence > 0.5],
  [Post-Enrichment], [Email valid, email verified, has decision maker],
  [Pre-Outreach], [Not on DNC list, not already contacted],
)

*Auto-Fix Capabilities:* Phone formatting, address standardization, URL normalization

#pagebreak()

== Orchestration Flow

#align(center)[
  #block(
    width: 100%,
    inset: 20pt,
    radius: 8pt,
    fill: rgb("#F8FAFC"),
    stroke: 1pt + rgb("#E2E8F0"),
  )[
    #text(size: 11pt)[
      *CAMPAIGN CREATED* (User input)\
      ↓\
      #box(inset: 6pt, radius: 4pt, fill: rgb("#DBEAFE"))[Discovery Agent] → Find 100 prospects\
      ↓\
      #box(inset: 6pt, radius: 4pt, fill: rgb("#F3E8FF"))[QA Agent] → Validate + dedupe\
      ↓\
      #grid(
        columns: (1fr, 1fr, 1fr),
        gutter: 8pt,
        align: center,
        
        box(inset: 6pt, radius: 4pt, fill: rgb("#FEF3C7"))[Research],
        box(inset: 6pt, radius: 4pt, fill: rgb("#FEF3C7"))[Research],
        box(inset: 6pt, radius: 4pt, fill: rgb("#FEF3C7"))[Research],
      )
      #h(0.5in) ← Parallel (10 concurrent) →
      #v(0.1in)
      #grid(
        columns: (1fr, 1fr, 1fr),
        gutter: 8pt,
        align: center,
        
        box(inset: 6pt, radius: 4pt, fill: rgb("#FCE7F3"))[Enrich],
        box(inset: 6pt, radius: 4pt, fill: rgb("#FCE7F3"))[Enrich],
        box(inset: 6pt, radius: 4pt, fill: rgb("#FCE7F3"))[Enrich],
      )
      #h(0.5in) ← Parallel (20 concurrent) →\
      ↓\
      #box(inset: 6pt, radius: 4pt, fill: rgb("#F3E8FF"))[QA Agent] → Validate enrichment\
      ↓\
      #box(inset: 6pt, radius: 4pt, fill: rgb("#FEF9C3"))[Scoring Agent] → Score all prospects\
      ↓\
      #grid(
        columns: (1fr, 1fr, 1fr),
        gutter: 8pt,
        align: center,
        
        box(inset: 6pt, radius: 4pt, fill: tier-a)[Tier A → Content],
        box(inset: 6pt, radius: 4pt, fill: tier-b)[Tier B → Content],
        box(inset: 6pt, radius: 4pt, fill: tier-c)[Tier C → Skip],
      )
      ↓\
      #box(inset: 8pt, radius: 4pt, fill: rgb("#FEE2E2"), stroke: 1pt + rgb("#EF4444"))[🧑 HUMAN APPROVAL]\
      ↓\
      #box(inset: 6pt, radius: 4pt, fill: rgb("#D1FAE5"))[Outreach Agent] → Send sequences
    ]
  ]
]

#v(0.3in)

== Parallelism Configuration

#table(
  columns: (1fr, 1fr, 1fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#E2E8F0"),
  fill: (_, row) => if row == 0 { rgb("#F1F5F9") } else { none },
  
  [*Stage*], [*Parallelism*], [*Concurrency Limit*],
  [Research], [Per-prospect], [10 concurrent],
  [Enrichment], [Per-prospect], [5 concurrent (API limits)],
  [Content], [Per-prospect], [20 concurrent],
  [Outreach], [Per-prospect], [Rate-limited by provider],
)

*Sequential (must wait):*
- Discovery → QA (need full list for dedup)
- Research + Enrichment → Scoring (need complete data)
- Content → Approval → Outreach (human gate)

#pagebreak()

== Error Handling

=== Error Categories

#table(
  columns: (1fr, 2fr, 2fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#E2E8F0"),
  fill: (_, row) => if row == 0 { rgb("#F1F5F9") } else { none },
  
  [*Category*], [*Example*], [*Handling*],
  [Recoverable], [API timeout, rate limit], [Retry with backoff],
  [Degraded], [One enrichment source fails], [Use partial data, continue],
  [Blocking], [No email found], [Skip prospect, log],
  [Critical], [Sending API down], [Pause campaign, alert user],
)

#v(0.2in)

=== Graceful Degradation

#table(
  columns: (1fr, 2fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#E2E8F0"),
  
  [*Failure*], [*Degraded Behavior*],
  [Research fails], [Continue with enrichment only, lower confidence],
  [Enrichment fails], [Continue with known data, skip if no email],
  [Scoring fails], [Default to Tier B, flag for review],
  [Content fails], [Use template fallback, mark as generic],
  [Outreach fails], [Queue for retry, alert after 3 failures],
)

#v(0.3in)

== Human-in-the-Loop Checkpoints

=== Required Approvals

#table(
  columns: (1fr, 2fr, 1fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#E2E8F0"),
  
  [*Checkpoint*], [*What Human Reviews*], [*Timeout*],
  [Content Approval], [Email sequences before sending], [24 hours],
  [Reply Handling], [Positive replies need follow-up], [1 hour alert],
  [Budget Approval], [If campaign exceeds credit limit], [Blocking],
)

=== Optional Reviews (Configurable)

- Tier A Manual Review (high-value prospects)
- New Campaign Start (for conservative users)
- Unusual Scoring (score outliers)

#pagebreak()

// ============================================================================
// APPENDIX: IMPLEMENTATION TIMELINE
// ============================================================================

= Appendix: Implementation Timeline

#v(0.2in)

#text(size: 12pt, style: "italic", fill: rgb("#64748B"))[
  Consolidated 4-week implementation plan to reach MVP launch.
]

#v(0.3in)

== Week 1: Core Skeleton

#table(
  columns: (auto, 3fr, 1fr, 1fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#E2E8F0"),
  fill: (_, row) => if row == 0 { primary } else { none },
  
  text(fill: white, weight: "bold")[\#],
  text(fill: white, weight: "bold")[Task],
  text(fill: white, weight: "bold")[Effort],
  text(fill: white, weight: "bold")[Owner],
  
  [1], [Supabase project setup + auth configuration], [4h], [Backend],
  [2], [Next.js 14 scaffolding + Tailwind + shadcn/ui], [4h], [Frontend],
  [3], [Dashboard layout with empty states], [8h], [Frontend],
  [4], [Campaign creation wizard (3 steps)], [8h], [Frontend],
  [5], [tRPC router setup + campaign CRUD], [8h], [Backend],
  [6], [Inngest integration + first job type], [8h], [Backend],
)

#v(0.1in)

*Week 1 Deliverable:* User can sign up, log in, and create a campaign (no data yet)

#v(0.3in)

== Week 2: Data Flow

#table(
  columns: (auto, 3fr, 1fr, 1fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#E2E8F0"),
  fill: (_, row) => if row == 0 { primary } else { none },
  
  text(fill: white, weight: "bold")[\#],
  text(fill: white, weight: "bold")[Task],
  text(fill: white, weight: "bold")[Effort],
  text(fill: white, weight: "bold")[Owner],
  
  [1], [Port lead-discovery.js to Inngest function], [4h], [Backend],
  [2], [Port website-scorer.js for enrichment], [4h], [Backend],
  [3], [Lead list view with filters + sorting], [12h], [Frontend],
  [4], [Lead detail panel (slide-in)], [8h], [Frontend],
  [5], [Hunter.io integration for email finding], [6h], [Backend],
  [6], [Scoring agent implementation], [8h], [Backend],
)

#v(0.1in)

*Week 2 Deliverable:* Discovery → Enrichment → Scoring pipeline working, leads appear in UI

#v(0.3in)

== Week 3: Outreach

#table(
  columns: (auto, 3fr, 1fr, 1fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#E2E8F0"),
  fill: (_, row) => if row == 0 { primary } else { none },
  
  text(fill: white, weight: "bold")[\#],
  text(fill: white, weight: "bold")[Task],
  text(fill: white, weight: "bold")[Effort],
  text(fill: white, weight: "bold")[Owner],
  
  [1], [Content agent with Claude integration], [8h], [Backend],
  [2], [Outreach queue UI], [8h], [Frontend],
  [3], [Email preview + edit component], [6h], [Frontend],
  [4], [Approval workflow (approve/reject/edit)], [6h], [Full Stack],
  [5], [Instantly.ai integration], [8h], [Backend],
  [6], [Sending + tracking implementation], [8h], [Backend],
)

#v(0.1in)

*Week 3 Deliverable:* Full pipeline from discovery to email sending with approval workflow

#pagebreak()

== Week 4: Polish & Billing

#table(
  columns: (auto, 3fr, 1fr, 1fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#E2E8F0"),
  fill: (_, row) => if row == 0 { primary } else { none },
  
  text(fill: white, weight: "bold")[\#],
  text(fill: white, weight: "bold")[Task],
  text(fill: white, weight: "bold")[Effort],
  text(fill: white, weight: "bold")[Owner],
  
  [1], [Settings pages (profile, organization)], [6h], [Frontend],
  [2], [Stripe integration (subscriptions)], [8h], [Backend],
  [3], [Billing UI (plan selection, usage)], [6h], [Frontend],
  [4], [Realtime activity feed (Supabase)], [8h], [Full Stack],
  [5], [Empty states + error handling], [6h], [Frontend],
  [6], [Production deploy + monitoring], [6h], [DevOps],
)

#v(0.1in)

*Week 4 Deliverable:* Production-ready MVP with billing

#v(0.5in)

== Post-MVP Roadmap

=== V1.1 (Weeks 5-6)

#grid(
  columns: (1fr, 1fr),
  gutter: 16pt,
  
  [
    - CRM integrations (HubSpot, Salesforce)
    - Email verification with Hunter
    - A/B/C tier manual override
    - Team member invitations
    - CSV import functionality
  ],
  
  [
    - Dark mode
    - Keyboard shortcuts
    - Mobile improvements
    - Onboarding gamification
    - Slack notifications
  ],
)

#v(0.2in)

=== V2 (Weeks 7-12)

- LinkedIn automation
- Voice AI outreach (Vapi integration)
- Demo site generation
- Custom domains
- White-label for agencies
- API access for Scale tier
- Advanced analytics dashboard

#v(0.5in)

#align(center)[
  #block(
    width: 80%,
    inset: 24pt,
    radius: 8pt,
    fill: primary.lighten(90%),
    stroke: 1pt + primary,
  )[
    #text(size: 14pt, weight: "bold", fill: primary)[
      Total MVP Timeline: 4 Weeks\
      ~160 engineering hours
    ]
    #v(0.1in)
    #text(size: 11pt, fill: rgb("#64748B"))[
      60-70% of backend code already exists in slc-lead-gen pipeline.\
      Main work: API layer, user-facing UI, billing, multi-tenant deployment.
    ]
  ]
]

#v(0.5in)

#align(center)[
  #line(length: 40%, stroke: 1pt + rgb("#E2E8F0"))
  #v(0.2in)
  #text(size: 10pt, fill: rgb("#94A3B8"))[
    *End of Document*\
    Tapflow Master Blueprint v1.0 · January 2026
  ]
]
