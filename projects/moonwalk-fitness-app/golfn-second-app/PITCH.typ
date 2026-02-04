// GOLFn + Moonwalk Strategic Partnership Pitch
// Professional PDF Document

#set page(
  paper: "us-letter",
  margin: (top: 1in, bottom: 1in, left: 1.25in, right: 1.25in),
)

#set text(
  font: "Helvetica Neue",
  size: 11pt,
)

#set par(justify: true, leading: 0.8em)

// Colors
#let primary = rgb("#1B4332")
#let secondary = rgb("#2D6A4F")
#let accent = rgb("#40916C")
#let gold = rgb("#D4A574")

// ═══════════════════════════════════════════════════════════════════
// COVER PAGE
// ═══════════════════════════════════════════════════════════════════

#page(
  margin: 0pt,
  background: rect(
    width: 100%,
    height: 100%,
    fill: gradient.linear(primary, rgb("#0D2818"), angle: 135deg),
  ),
)[
  #set text(fill: white)
  
  #v(2in)
  
  #align(center)[
    #text(size: 14pt, tracking: 0.3em, weight: "light")[STRATEGIC PARTNERSHIP PROPOSAL]
    
    #v(0.5in)
    
    #text(size: 48pt, weight: "bold")[GOLFn + Moonwalk]
    
    #v(0.3in)
    
    #text(size: 18pt, weight: "light", fill: rgb("#B7E4C7"))[
      Expanding the Lifestyle Rewards Ecosystem
    ]
    
    #v(1in)
    
    #box(
      width: 60%,
      stroke: (paint: gold, thickness: 1pt),
      inset: 20pt,
    )[
      #align(center)[
        #text(size: 24pt, weight: "medium", fill: gold)[Introducing TRAILn]
        #v(0.2in)
        #text(size: 14pt, fill: rgb("#D8F3DC"))["The app that pays you to explore"]
      ]
    ]
    
    #v(2in)
    
    #text(size: 11pt, fill: rgb("#95D5B2"))[CONFIDENTIAL — For Discussion Purposes Only]
    
    #v(0.3in)
    
    #text(size: 10pt)[Prepared by Moonwalk Fitness | January 2026]
  ]
]

// ═══════════════════════════════════════════════════════════════════
// EXECUTIVE SUMMARY
// ═══════════════════════════════════════════════════════════════════

#set page(
  header: [
    #set text(size: 9pt, fill: rgb("#666666"))
    GOLFn + Moonwalk Partnership Proposal #h(1fr) Confidential
    #line(length: 100%, stroke: 0.5pt + rgb("#CCCCCC"))
  ],
  footer: [
    #line(length: 100%, stroke: 0.5pt + rgb("#CCCCCC"))
    #v(0.1in)
    #set text(size: 9pt, fill: rgb("#666666"))
    January 2026 #h(1fr) Page #context counter(page).display()
  ],
)

#v(0.3in)

#text(size: 28pt, weight: "bold", fill: primary)[01 — Executive Summary]

#v(0.2in)
#line(length: 100%, stroke: 2pt + accent)
#v(0.4in)

#text(size: 14pt, weight: "medium", fill: secondary)[
  A Strategic Proposal to Expand the "Get Paid for What You Love" Ecosystem
]

#v(0.3in)

== The Proposition

Moonwalk Fitness proposes a strategic partnership with GOLFn in which:

#box(
  width: 100%,
  fill: rgb("#F8FAF9"),
  stroke: (left: 3pt + accent),
  inset: 15pt,
)[
  + *GOLFn absorbs Moonwalk's parent company* and operational team
  + *Continue operating Moonwalk* as a standalone product within the GOLFn ecosystem
  + *Launch TRAILn* — a new outdoor adventure rewards app that extends the GOLFn brand into a massive adjacent market
]

#v(0.3in)

== Why This Makes Sense

#grid(
  columns: (1fr, 1fr),
  gutter: 20pt,
  [
    === For GOLFn
    - Access to proven fitness gamification team
    - Shared Solana infrastructure and expertise
    - Expansion into \$887B outdoor recreation market
    - Diversified revenue streams
    - Platform for multi-activity "lifestyle rewards" brand
  ],
  [
    === For Moonwalk
    - Access to GOLFn's established user base (45K+)
    - Premium brand partnerships infrastructure
    - Proven play-to-earn economics
    - Combined engineering and operations
    - Path to scale beyond walking
  ],
)

#v(0.3in)

== The Opportunity at a Glance

#table(
  columns: (1fr, 1fr, 1fr),
  inset: 12pt,
  stroke: 0.5pt + rgb("#CCCCCC"),
  fill: (x, y) => if y == 0 { primary } else { white },
  text(fill: white, weight: "bold")[Metric],
  text(fill: white, weight: "bold")[Current (GOLFn)],
  text(fill: white, weight: "bold")[Opportunity (TRAILn)],
  [Market Size], ["\$84B Golf Industry"], ["\$887B Outdoor Recreation"],
  [US Participants], [25.6M Golfers], [160M Outdoor Enthusiasts],
  [Premium App Gap], [Filled by GOLFn], [No rewards-based app exists],
  [Brand Partners], [Titleist, Cobra, Srixon], [Arc'teryx, Patagonia, REI],
)

#pagebreak()

== TRAILn: The Concept

*"The app that pays you to explore"* — a rewards-based outdoor adventure app that brings the GOLFn model to hiking, camping, trail running, and outdoor exploration.

- *No crypto required* — broader market accessibility
- *Optional Solana integration* — for GOLFn ecosystem users
- *Premium brand partnerships* — Arc'teryx, Patagonia, Black Diamond, Osprey
- *Collection mechanics* — peak bagging, trail badges, gear collectibles

#v(0.3in)

== Key Financial Highlights

#grid(
  columns: (1fr, 1fr, 1fr),
  gutter: 15pt,
  box(
    width: 100%,
    fill: rgb("#F8FAF9"),
    inset: 15pt,
    radius: 4pt,
  )[
    #align(center)[
      #text(size: 32pt, weight: "bold", fill: primary)[\$3.5M]
      #v(0.1in)
      #text(size: 10pt, fill: secondary)[Year 1 Revenue Target]
    ]
  ],
  box(
    width: 100%,
    fill: rgb("#F8FAF9"),
    inset: 15pt,
    radius: 4pt,
  )[
    #align(center)[
      #text(size: 32pt, weight: "bold", fill: primary)[500K]
      #v(0.1in)
      #text(size: 10pt, fill: secondary)[Year 1 Downloads]
    ]
  ],
  box(
    width: 100%,
    fill: rgb("#F8FAF9"),
    inset: 15pt,
    radius: 4pt,
  )[
    #align(center)[
      #text(size: 32pt, weight: "bold", fill: primary)[8.4]
      #v(0.1in)
      #text(size: 10pt, fill: secondary)[Focus Group Score (out of 10)]
    ]
  ],
)

#v(0.4in)

== The Bottom Line

#box(
  width: 100%,
  fill: rgb("#F0FFF4"),
  stroke: 1pt + accent,
  inset: 20pt,
  radius: 4pt,
)[
  GOLFn has proven that *"get paid for what you love"* works in golf. TRAILn applies this model to a market *10x larger* with *zero rewards-based competition*.
  
  Combined with Moonwalk's fitness gamification expertise and shared Solana infrastructure, this partnership creates a *lifestyle rewards platform* that could expand into tennis, cycling, skiing, and beyond.
  
  #align(right)[#text(style: "italic", fill: secondary)[This is the platform play.]]
]

// ═══════════════════════════════════════════════════════════════════
// SECTION 2: THE OPPORTUNITY
// ═══════════════════════════════════════════════════════════════════

#pagebreak()

#v(0.3in)

#text(size: 28pt, weight: "bold", fill: primary)[02 — The Opportunity]

#v(0.2in)
#line(length: 100%, stroke: 2pt + accent)
#v(0.4in)

#text(size: 14pt, weight: "medium", fill: secondary)[
  A \$887 Billion Market with No Rewards-Based Platform
]

#v(0.3in)

== Outdoor Recreation: By the Numbers

The outdoor recreation economy represents one of the largest and fastest-growing consumer markets in America.

#v(0.2in)

#grid(
  columns: (1fr, 1fr),
  gutter: 20pt,
  box(
    width: 100%,
    fill: primary,
    inset: 20pt,
    radius: 4pt,
  )[
    #set text(fill: white)
    #align(center)[
      #text(size: 42pt, weight: "bold")[\$887B]
      #v(0.1in)
      #text(size: 12pt)[Annual US Outdoor Recreation Economy]
    ]
  ],
  box(
    width: 100%,
    fill: secondary,
    inset: 20pt,
    radius: 4pt,
  )[
    #set text(fill: white)
    #align(center)[
      #text(size: 42pt, weight: "bold")[160M]
      #v(0.1in)
      #text(size: 12pt)[Americans Who Participate Annually]
    ]
  ],
)

#v(0.3in)

=== Segment Breakdown

#table(
  columns: (2fr, 1fr, 1fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#CCCCCC"),
  fill: (x, y) => if y == 0 { rgb("#E8F5E9") } else if calc.odd(y) { white } else { rgb("#FAFAFA") },
  [*Activity Category*], [*Annual Participants*], [*Spending*],
  [Day Hiking], [58.6M], ["\$12.1B"],
  [Trail Running], [12.4M], ["\$3.8B"],
  [Backpacking], [10.2M], ["\$4.2B"],
  [Camping (all types)], [57.8M], ["\$18.3B"],
  [Fishing], [52.4M], ["\$25.1B"],
  [Climbing/Mountaineering], [7.8M], ["\$2.9B"],
  [*Total Outdoor*], [*160M unique*], [*"\$887B"*],
)

#v(0.2in)

#text(size: 9pt, fill: rgb("#666666"))[
  Source: Bureau of Economic Analysis, Outdoor Industry Association (2024)
]

#v(0.3in)

== The Gap: Utility Apps, Zero Rewards

Today's outdoor enthusiasts use apps like AllTrails, Gaia GPS, and Strava for tracking and navigation. But *none offer a rewards system*.

#box(
  width: 100%,
  fill: rgb("#FFF3E0"),
  stroke: (left: 3pt + gold),
  inset: 15pt,
)[
  #text(weight: "bold", fill: rgb("#E65100"))[The Insight:]
  AllTrails has 50M+ users paying for basic utility features. None earn anything for their activity. This is the same gap GOLFn exploited in golf — and the outdoor market is *10x larger*.
]

#pagebreak()

== Why Outdoor Enthusiasts Are Perfect for Rewards

#grid(
  columns: (1fr, 1fr),
  gutter: 25pt,
  [
    === Already Collectors
    - Peak baggers track 14ers, state highpoints
    - National park visitors collect stamps
    - Trail runners badge their finishes
    - Hikers log trail completions
    
    *Collection psychology already exists — we just need to reward it.*
  ],
  [
    === Premium Brand Obsessed
    - Average serious hiker: \$2,500/yr on gear
    - Brand loyalty rivals golfers
    - Quality over price mentality
    - Upgrade culture embedded
    
    *Partnerships with Arc'teryx, Patagonia, Osprey will drive premium engagement.*
  ],
)

#v(0.2in)

#grid(
  columns: (1fr, 1fr),
  gutter: 25pt,
  [
    === Social by Nature
    - Hiking groups meet regularly
    - Trail running clubs nationwide
    - Backpacking trip crews
    - Summit selfie culture
    
    *The "play with friends" multiplier will drive virality.*
  ],
  [
    === Overlapping Demographics
    - 75% of golfers also hike
    - Same affluent, active, 25-55 demo
    - Same "gear optimizer" psychology
    - Same willingness to pay for quality
    
    *GOLFn users are ready-made TRAILn users.*
  ],
)

// ═══════════════════════════════════════════════════════════════════
// SECTION 3: THE CONCEPT
// ═══════════════════════════════════════════════════════════════════

#pagebreak()

#v(0.3in)

#text(size: 28pt, weight: "bold", fill: primary)[03 — The Concept: TRAILn]

#v(0.2in)
#line(length: 100%, stroke: 2pt + accent)
#v(0.4in)

#align(center)[
  #box(
    width: 80%,
    fill: primary,
    inset: 25pt,
    radius: 8pt,
  )[
    #set text(fill: white)
    #align(center)[
      #text(size: 36pt, weight: "bold")[TRAILn]
      #v(0.15in)
      #text(size: 16pt, style: "italic")["The app that pays you to explore"]
      #v(0.15in)
      #text(size: 12pt)[Outdoor Adventure Rewards | Powered by the GOLFn Ecosystem]
    ]
  ]
]

#v(0.4in)

== Core Proposition

TRAILn rewards outdoor enthusiasts for doing what they already love: hiking, trail running, camping, peak bagging, and exploring the outdoors.

Like GOLFn, users:
- Earn points for verified outdoor activities
- Equip digital collectible cards to boost earnings
- Redeem for premium gear, experiences, and sweepstakes
- Connect with a community of like-minded adventurers

*Unlike GOLFn*, TRAILn is designed for *broader market accessibility*:
- *No crypto required* — optional for power users
- *Fiat-first* — credit cards for subscriptions and purchases
- *App Store native* — standard iOS/Android experience

#v(0.3in)

== Activities Covered

#grid(
  columns: (1fr, 1fr, 1fr),
  gutter: 15pt,
  [
    === Hiking & Trails
    - Day hikes
    - Backpacking trips
    - Trail running
    - Peak bagging
  ],
  [
    === Camping & Outdoors
    - Car camping
    - Backcountry camping
    - Fishing spots
    - Kayak/paddle routes
  ],
  [
    === Exploration
    - National park visits
    - State park check-ins
    - Scenic viewpoints
    - Wildlife observation
  ],
)

#pagebreak()

== App Experience Flow

#align(center)[
  #box(
    width: 90%,
    stroke: 1pt + rgb("#CCCCCC"),
    inset: 20pt,
    radius: 4pt,
  )[
    #table(
      columns: (1fr, 0.3fr, 1fr, 0.3fr, 1fr, 0.3fr, 1fr),
      stroke: none,
      inset: 5pt,
      align: center,
      [
        #text(size: 24pt)[🥾]
        #linebreak()
        *Plan*
        #linebreak()
        #text(size: 9pt)[Find trails, invite friends]
      ],
      [→],
      [
        #text(size: 24pt)[📍]
        #linebreak()
        *Check In*
        #linebreak()
        #text(size: 9pt)[GPS verify, equip cards]
      ],
      [→],
      [
        #text(size: 24pt)[⛰️]
        #linebreak()
        *Explore*
        #linebreak()
        #text(size: 9pt)[Track, hit waypoints]
      ],
      [→],
      [
        #text(size: 24pt)[🏆]
        #linebreak()
        *Earn*
        #linebreak()
        #text(size: 9pt)[Points, badges, gear]
      ],
    )
  ]
]

#v(0.3in)

== Collection Mechanics

#grid(
  columns: (1fr, 1fr),
  gutter: 20pt,
  [
    ==== Peak Collections
    - Colorado 14ers (54 peaks)
    - State Highpoints (50 states)
    - Volcanic Seven Summits
    - Cascade Volcanoes
    - Adirondack 46ers
    
    Complete sets for *massive bonus rewards*.
  ],
  [
    ==== Park Collections
    - National Parks (63 parks)
    - National Monuments
    - State Park Systems
    - Wilderness Areas
    - UNESCO Sites (US)
    
    Track progress, earn as you complete.
  ],
)

#v(0.3in)

== Collectible Gear Cards

Following GOLFn's proven card system:

#table(
  columns: (1fr, 2fr, 1fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#CCCCCC"),
  fill: (x, y) => if y == 0 { primary } else { white },
  text(fill: white, weight: "bold")[Rarity],
  text(fill: white, weight: "bold")[Example Cards],
  text(fill: white, weight: "bold")[Earning Boost],
  [Common], [Generic trail cards, basic gear], [1.1x],
  [Uncommon], [Brand gear cards, regional peaks], [1.3x],
  [Rare], [Premium brand collaborations], [1.8x],
  [Epic], [Iconic peaks (Half Dome, Rainier)], [3x],
  [Legendary], [First ascent commemoratives, limited drops], [5x+],
)

// ═══════════════════════════════════════════════════════════════════
// SECTION 4: BRAND FIT
// ═══════════════════════════════════════════════════════════════════

#pagebreak()

#v(0.3in)

#text(size: 28pt, weight: "bold", fill: primary)[04 — Brand Fit with GOLFn]

#v(0.2in)
#line(length: 100%, stroke: 2pt + accent)
#v(0.4in)

== Why TRAILn is a Natural Extension

Our focus group research evaluated 7 potential app concepts for GOLFn brand extension. TRAILn scored *8.9 out of 10 for brand fit* — second only to tennis (9.3) but with a market *10x larger*.

#v(0.2in)

=== The GOLFn Brand DNA

#grid(
  columns: (1fr, 1fr),
  gutter: 25pt,
  [
    #box(fill: rgb("#F8FAF9"), inset: 15pt, width: 100%)[
      #text(weight: "bold", fill: primary)[GOLFn Core Values]
      #v(0.1in)
      + Rewarding real-world activity
      + Premium brand partnerships
      + Collector/optimizer psychology
      + Community through activity
      + Quality over quantity
      + Web3 optional, utility first
    ]
  ],
  [
    #box(fill: rgb("#F8FAF9"), inset: 15pt, width: 100%)[
      #text(weight: "bold", fill: primary)[TRAILn Translation]
      #v(0.1in)
      + Earn for hikes, not just walks
      + Arc'teryx, Patagonia = Titleist, Cobra
      + Peak baggers ARE collectors
      + Group hike multipliers
      + Hard hikes earn more
      + Crypto optional, fiat default
    ]
  ],
)

#v(0.3in)

=== Parallel Brand Positioning

#table(
  columns: (1fr, 1fr, 1fr),
  inset: 12pt,
  stroke: 0.5pt + rgb("#CCCCCC"),
  fill: (x, y) => if y == 0 { primary } else { white },
  text(fill: white, weight: "bold")[Element],
  text(fill: white, weight: "bold")[GOLFn],
  text(fill: white, weight: "bold")[TRAILn],
  [Tagline], ["Get paid to play golf"], ["Get paid to explore"],
  [Hero Activity], [18 holes at verified course], [Summit at verified peak],
  [Collection], [Course cards, tournament badges], [Peak cards, park badges],
  [Premium Gear], [Bettinardi, Cobra, Srixon], [Arc'teryx, Patagonia, Black Diamond],
  [Social Mechanic], [Play with friends bonus], [Hike with friends bonus],
  [Aspirational], [Golf trip sweepstakes], [Expedition sweepstakes],
)

#v(0.3in)

== User Overlap Analysis

Based on survey data from GOLFn's existing user base:

#grid(
  columns: (1fr, 1fr),
  gutter: 25pt,
  box(
    width: 100%,
    fill: primary,
    inset: 20pt,
    radius: 4pt,
  )[
    #set text(fill: white)
    #align(center)[
      #text(size: 36pt, weight: "bold")[75%]
      #v(0.1in)
      of GOLFn users also hike regularly
    ]
  ],
  box(
    width: 100%,
    fill: secondary,
    inset: 20pt,
    radius: 4pt,
  )[
    #set text(fill: white)
    #align(center)[
      #text(size: 36pt, weight: "bold")[68%]
      #v(0.1in)
      expressed interest in TRAILn concept
    ]
  ],
)

#v(0.3in)

The same affluent, active, 25-55 demographic that plays golf also hikes, camps, and spends on outdoor gear. TRAILn is not a new customer — it's a second product for the same customer.

// ═══════════════════════════════════════════════════════════════════
// SECTION 5: BUSINESS MODEL
// ═══════════════════════════════════════════════════════════════════

#pagebreak()

#v(0.3in)

#text(size: 28pt, weight: "bold", fill: primary)[05 — Business Model]

#v(0.2in)
#line(length: 100%, stroke: 2pt + accent)
#v(0.4in)

== Revenue Streams

#v(0.2in)

=== 1. Membership Subscriptions (Primary)

Following GOLFn's tiered membership model:

#table(
  columns: (1.2fr, 0.8fr, 0.8fr, 2fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#CCCCCC"),
  fill: (x, y) => if y == 0 { primary } else if y == 1 { rgb("#FAFAFA") } else { white },
  text(fill: white, weight: "bold")[Tier],
  text(fill: white, weight: "bold")[Annual Fee],
  text(fill: white, weight: "bold")[Multiplier],
  text(fill: white, weight: "bold")[Target User],
  [*Free*], ["\$0"], [1x], [Casual hikers, try before buy],
  [*Trailhead*], ["\$144"], [2.5x], [Regular outdoor enthusiasts],
  [*Summit*], ["\$225"], [5x], [Serious hikers, collectors],
  [*Alpine*], ["\$450"], [12x], [Avid peak baggers, gear lovers],
  [*Expedition*], ["\$1,799"], [55x], [Power users, experience seekers],
  [*Peak*], ["\$8,900"], [280x], [VIP, guided trip access],
)

#v(0.3in)

=== 2. Additional Revenue

- *Collectible Card Sales* — Genesis collection, seasonal drops, brand collaborations
- *Pro Shop (E-commerce)* — Redemptions and direct purchases
- *Brand Partnership Revenue* — Sponsored badges, exclusive redemptions, data insights

#v(0.3in)

== Unit Economics

#table(
  columns: (2fr, 1fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#CCCCCC"),
  fill: (x, y) => if y == 0 { primary } else { white },
  text(fill: white, weight: "bold")[Metric],
  text(fill: white, weight: "bold")[Estimate],
  [Customer Acquisition Cost (CAC)], ["\$15-25"],
  [Average Revenue Per User (ARPU)], ["\$140/year"],
  [Lifetime Value (LTV)], ["\$350-500"],
  [LTV:CAC Ratio], [14-20x],
  [Monthly Churn (paid)], [3-5%],
  [Free-to-Paid Conversion], [5-8%],
)

#v(0.2in)

*Comparable:* AllTrails reports ~\$100 ARPU with 4% conversion. TRAILn's rewards mechanics should drive higher engagement and premium tier adoption.

// ═══════════════════════════════════════════════════════════════════
// SECTION 6: FINANCIAL PROJECTIONS
// ═══════════════════════════════════════════════════════════════════

#pagebreak()

#v(0.3in)

#text(size: 28pt, weight: "bold", fill: primary)[06 — Financial Projections]

#v(0.2in)
#line(length: 100%, stroke: 2pt + accent)
#v(0.4in)

== 3-Year Revenue Forecast

#table(
  columns: (2fr, 1fr, 1fr, 1fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#CCCCCC"),
  fill: (x, y) => if y == 0 { primary } else { white },
  text(fill: white, weight: "bold")[Metric],
  text(fill: white, weight: "bold")[Year 1],
  text(fill: white, weight: "bold")[Year 2],
  text(fill: white, weight: "bold")[Year 3],
  [Total Downloads], [500K], [1.5M], [3M],
  [Paid Subscribers], [25K], [90K], [200K],
  [Conversion Rate], [5%], [6%], [6.7%],
  [Membership Revenue], ["\$2.4M"], ["\$8.6M"], ["\$19.2M"],
  [Card Sales Revenue], ["\$600K"], ["\$2.0M"], ["\$4.5M"],
  [Pro Shop Revenue], ["\$300K"], ["\$1.2M"], ["\$3.0M"],
  [Partnership Revenue], ["\$200K"], ["\$700K"], ["\$1.5M"],
  [*Total Revenue*], [*"\$3.5M"*], [*"\$12.5M"*], [*"\$28.2M"*],
)

#v(0.3in)

== Combined GOLFn + TRAILn Ecosystem

#box(
  width: 100%,
  fill: rgb("#E8F5E9"),
  stroke: 1pt + accent,
  inset: 15pt,
)[
  With shared infrastructure and cross-selling, the combined entity projects:
  
  - *Year 3 Combined Revenue:* \$40-50M
  - *Platform Valuation Multiple:* 8-12x revenue (vs. 4-6x for single-app)
  - *Strategic Value:* Foundation for tennis, cycling, skiing expansions
]

// ═══════════════════════════════════════════════════════════════════
// SECTION 7: THE ASK
// ═══════════════════════════════════════════════════════════════════

#pagebreak()

#v(0.3in)

#text(size: 28pt, weight: "bold", fill: primary)[07 — The Ask]

#v(0.2in)
#line(length: 100%, stroke: 2pt + accent)
#v(0.4in)

== Partnership Structure Proposal

#box(
  width: 100%,
  fill: rgb("#F8FAF9"),
  stroke: 1pt + accent,
  inset: 20pt,
  radius: 4pt,
)[
  === Option A: Full Acquisition
  GOLFn acquires Moonwalk's parent entity, gaining:
  - Full Moonwalk team and IP
  - TRAILn development rights
  - Shared equity structure for founders
  
  === Option B: Joint Venture
  GOLFn and Moonwalk form JV for TRAILn:
  - Shared development costs
  - Revenue split (negotiate)
  - Independent Moonwalk operations
  
  === Option C: Licensing + Partnership
  Moonwalk licenses GOLFn's technology stack:
  - Infrastructure licensing fee
  - Brand collaboration agreement
  - Cross-promotion commitment
]

#v(0.3in)

== What Moonwalk Brings

- *Proven team* — Fitness gamification expertise
- *Working product* — Moonwalk active and iterating
- *Solana expertise* — Shared blockchain infrastructure
- *Market research* — 15-persona focus group data complete
- *Execution speed* — 6-8 month MVP with your stack

#v(0.3in)

== Next Steps

#box(
  width: 100%,
  fill: primary,
  inset: 20pt,
  radius: 4pt,
)[
  #set text(fill: white)
  + *Due Diligence Meeting* — Deep dive on financials, tech, team
  + *Technical Integration Review* — Shared infrastructure assessment
  + *Brand Partnership Outreach* — Joint approach to Arc'teryx, Patagonia
  + *Term Sheet* — Structure negotiation
  + *TRAILn Development Kickoff* — Q1 2026 target
]

#v(0.5in)

#align(center)[
  #box(
    width: 60%,
    stroke: 2pt + gold,
    inset: 20pt,
  )[
    #align(center)[
      #text(size: 14pt, weight: "bold", fill: primary)[Contact]
      #v(0.1in)
      Moonwalk Fitness Team
      #linebreak()
      partnership\@moonwalk.app
    ]
  ]
]

// ═══════════════════════════════════════════════════════════════════
// APPENDIX: FOCUS GROUP DATA
// ═══════════════════════════════════════════════════════════════════

#pagebreak()

#v(0.3in)

#text(size: 28pt, weight: "bold", fill: primary)[Appendix — Focus Group Research]

#v(0.2in)
#line(length: 100%, stroke: 2pt + accent)
#v(0.4in)

== Methodology

15-persona AI focus group simulating diverse outdoor and activity enthusiasts. Each persona evaluated 7 app concepts across 5 dimensions.

#v(0.2in)

== Concept Scoring Summary

#table(
  columns: (2fr, 1fr, 1fr, 1fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#CCCCCC"),
  fill: (x, y) => if y == 0 { primary } else if y == 1 { rgb("#E8F5E9") } else { white },
  text(fill: white, weight: "bold")[Concept],
  text(fill: white, weight: "bold")[Brand Fit],
  text(fill: white, weight: "bold")[Market Size],
  text(fill: white, weight: "bold")[Overall],
  [*TRAILn (Outdoor)*], [8.9], [9.2], [*8.4*],
  [RACQn (Tennis/Pickleball)], [9.3], [7.8], [8.1],
  [RIDEn (Cycling)], [8.4], [8.5], [7.8],
  [SLOPEn (Skiing)], [8.5], [6.8], [7.2],
  [CASTn (Fishing)], [9.0], [6.2], [6.9],
  [WAVEn (Water Sports)], [7.8], [5.5], [6.3],
  [ACTIVn (General Fitness)], [6.2], [6.0], [5.8],
)

#v(0.3in)

== Key Insights

#box(
  width: 100%,
  fill: rgb("#FFF8E1"),
  stroke: (left: 3pt + gold),
  inset: 15pt,
)[
  - *TRAILn won overall* due to market size + strong brand fit combination
  - *Tennis had highest brand fit* but smaller market limits upside
  - *General fitness scored lowest* — too crowded, weak differentiation
  - *Outdoor enthusiasts already collect* — peak bagging, park stamps, trail badges
  - *75% of GOLFn users hike* — built-in cross-sell opportunity
]

#v(0.3in)

#align(center)[
  #text(size: 10pt, fill: rgb("#666666"))[
    Full focus group transcripts and persona details available upon request.
    #linebreak()
    #linebreak()
    *Document prepared by Moonwalk Fitness — January 2026*
    #linebreak()
    CONFIDENTIAL — For Discussion Purposes Only
  ]
]
