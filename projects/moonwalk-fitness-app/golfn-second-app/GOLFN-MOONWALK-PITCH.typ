// GOLFn + Moonwalk Strategic Partnership Pitch
// Professional PDF Document

#set page(
  paper: "us-letter",
  margin: (top: 1in, bottom: 1in, left: 1.25in, right: 1.25in),
)

#set text(
  font: "Helvetica Neue",
  size: 11pt,
  fill: rgb("#1a1a1a"),
)

#set par(
  justify: true,
  leading: 0.8em,
)

// Colors
#let primary = rgb("#1B4332")      // Deep forest green
#let secondary = rgb("#2D6A4F")    // Medium green
#let accent = rgb("#40916C")       // Accent green
#let light-bg = rgb("#F8FAF9")     // Light background
#let gold = rgb("#D4A574")         // Premium gold accent

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
    
    #text(size: 48pt, weight: "bold")[
      GOLFn + Moonwalk
    ]
    
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
        #text(size: 24pt, weight: "medium", fill: gold)[
          Introducing TRAILn
        ]
        #v(0.2in)
        #text(size: 14pt, fill: rgb("#D8F3DC"))[
          "The app that pays you to explore"
        ]
      ]
    ]
    
    #v(2in)
    
    #text(size: 11pt, fill: rgb("#95D5B2"))[
      CONFIDENTIAL — For Discussion Purposes Only
    ]
    
    #v(0.3in)
    
    #text(size: 10pt)[
      Prepared by Moonwalk Fitness \ 
      January 2026
    ]
  ]
]

// ═══════════════════════════════════════════════════════════════════
// TABLE OF CONTENTS
// ═══════════════════════════════════════════════════════════════════

#page[
  #set text(size: 10pt)
  
  #v(0.5in)
  
  #text(size: 24pt, weight: "bold", fill: primary)[Contents]
  
  #v(0.3in)
  
  #line(length: 100%, stroke: (paint: accent, thickness: 2pt))
  
  #v(0.3in)
  
  #let toc-entry(num, title, page) = {
    grid(
      columns: (30pt, 1fr, 40pt),
      gutter: 10pt,
      text(weight: "bold", fill: secondary)[#num],
      text[#title],
      align(right)[#page],
    )
    v(0.15in)
  }
  
  #toc-entry("01", "Executive Summary", "3")
  #toc-entry("02", "The Opportunity", "5")
  #toc-entry("03", "The Concept: TRAILn", "8")
  #toc-entry("04", "Brand Fit with GOLFn", "12")
  #toc-entry("05", "Target Audience", "14")
  #toc-entry("06", "Business Model", "16")
  #toc-entry("07", "Competitive Landscape", "18")
  #toc-entry("08", "Technical Synergies", "20")
  #toc-entry("09", "Go-to-Market Strategy", "22")
  #toc-entry("10", "Financial Projections", "24")
  #toc-entry("11", "The Ask", "26")
  #toc-entry("A", "Appendix: Market Research", "28")
]

// ═══════════════════════════════════════════════════════════════════
// SECTION 1: EXECUTIVE SUMMARY
// ═══════════════════════════════════════════════════════════════════

#set page(
  header: [
    #set text(size: 9pt, fill: rgb("#666666"))
    #grid(
      columns: (1fr, 1fr),
      [GOLFn + Moonwalk Partnership Proposal],
      align(right)[Confidential],
    )
    #line(length: 100%, stroke: (paint: rgb("#CCCCCC"), thickness: 0.5pt))
  ],
  footer: [
    #line(length: 100%, stroke: (paint: rgb("#CCCCCC"), thickness: 0.5pt))
    #v(0.1in)
    #set text(size: 9pt, fill: rgb("#666666"))
    #grid(
      columns: (1fr, 1fr),
      [January 2026],
      align(right)[Page #counter(page).display()],
    )
  ],
)

#counter(page).update(3)

#v(0.3in)

#text(size: 28pt, weight: "bold", fill: primary)[01 — Executive Summary]

#v(0.2in)

#line(length: 100%, stroke: (paint: accent, thickness: 2pt))

#v(0.4in)

#text(size: 14pt, weight: "medium", fill: secondary)[
  A Strategic Proposal to Expand the "Get Paid for What You Love" Ecosystem
]

#v(0.3in)

== The Proposition

Moonwalk Fitness proposes a strategic partnership with GOLFn in which:

#box(
  width: 100%,
  fill: light-bg,
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

#align(center)[
  #table(
    columns: (1fr, 1fr, 1fr),
    inset: 12pt,
    stroke: 0.5pt + rgb("#CCCCCC"),
    fill: (x, y) => if y == 0 { primary } else { white },
    text(fill: white, weight: "bold")[Metric],
    text(fill: white, weight: "bold")[Current (GOLFn)],
    text(fill: white, weight: "bold")[Opportunity (TRAILn)],
    [Market Size], [$84B Golf Industry], [$887B Outdoor Recreation],
    [US Participants], [25.6M Golfers], [160M Outdoor Enthusiasts],
    [Premium App Gap], [Filled by GOLFn], [No rewards-based app exists],
    [Brand Partners], [Titleist, Cobra, Srixon], [Arc'teryx, Patagonia, REI],
  )
]

#v(0.3in)

== TRAILn: The Concept

*"The app that pays you to explore"* — a rewards-based outdoor adventure app that brings the GOLFn model to hiking, camping, trail running, and outdoor exploration.

- *No crypto required* — broader market accessibility
- *Optional Solana integration* — for GOLFn ecosystem users
- *Premium brand partnerships* — Arc'teryx, Patagonia, Black Diamond, Osprey
- *Collection mechanics* — peak bagging, trail badges, gear collectibles

#pagebreak()

== Key Financial Highlights

#grid(
  columns: (1fr, 1fr, 1fr),
  gutter: 15pt,
  box(
    width: 100%,
    fill: light-bg,
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
    fill: light-bg,
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
    fill: light-bg,
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
  
  #align(right)[
    #text(style: "italic", fill: secondary)[
      This is the platform play.
    ]
  ]
]

// ═══════════════════════════════════════════════════════════════════
// SECTION 2: THE OPPORTUNITY
// ═══════════════════════════════════════════════════════════════════

#pagebreak()

#v(0.3in)

#text(size: 28pt, weight: "bold", fill: primary)[02 — The Opportunity]

#v(0.2in)

#line(length: 100%, stroke: (paint: accent, thickness: 2pt))

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
  [
    #box(
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
    ]
  ],
  [
    #box(
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
  [Day Hiking], [58.6M], [\$12.1B],
  [Trail Running], [12.4M], [\$3.8B],
  [Backpacking], [10.2M], [\$4.2B],
  [Camping (all types)], [57.8M], [\$18.3B],
  [Fishing], [52.4M], [\$25.1B],
  [Climbing/Mountaineering], [7.8M], [\$2.9B],
  [*Total Outdoor*], [*160M unique*], [*\$887B*],
)

#v(0.2in)

#text(size: 9pt, fill: rgb("#666666"))[
  Source: Bureau of Economic Analysis, Outdoor Industry Association (2024)
]

#v(0.3in)

== The Gap: Utility Apps, Zero Rewards

Today's outdoor enthusiasts use apps like AllTrails, Gaia GPS, and Strava for tracking and navigation. But *none offer a rewards system*.

#pagebreak()

=== Current Landscape

#table(
  columns: (1.5fr, 1fr, 1fr, 1fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#CCCCCC"),
  fill: (x, y) => if y == 0 { primary } else { white },
  text(fill: white, weight: "bold")[App],
  text(fill: white, weight: "bold")[MAU],
  text(fill: white, weight: "bold")[Monetization],
  text(fill: white, weight: "bold")[Rewards?],
  [AllTrails], [50M+], [\$35.99/yr subscription], [*None*],
  [Gaia GPS], [5M+], [\$39.99/yr subscription], [*None*],
  [Strava (trails)], [100M+], [\$8/mo subscription], [*None*],
  [REI Hiking Project], [2M+], [Free (REI ecosystem)], [REI Co-op points],
  [PeakVisor], [1M+], [\$29.99/yr], [*None*],
)

#v(0.3in)

#box(
  width: 100%,
  fill: rgb("#FFF3E0"),
  stroke: (left: 3pt + gold),
  inset: 15pt,
)[
  #text(weight: "bold", fill: rgb("#E65100"))[The Insight:]
  AllTrails has 50M+ users paying for basic utility features. None earn anything for their activity. This is the same gap GOLFn exploited in golf — and the outdoor market is *10x larger*.
]

#v(0.3in)

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

#v(0.3in)

== The Conservation Angle: Authentic Differentiation

Unlike fitness apps, outdoor recreation has a natural sustainability story:

- *Partner with National Park Foundation* — redemptions support conservation
- *Leave No Trace certified* — earn for responsible practices
- *Trail maintenance rewards* — incentivize stewardship
- *Carbon offset integration* — track and offset trip impact

This creates a *values-aligned brand* that justifies premium positioning and attracts premium partners.

#pagebreak()

== Why Now?

#v(0.2in)

#grid(
  columns: (1fr, 1fr, 1fr),
  gutter: 15pt,
  box(
    width: 100%,
    fill: light-bg,
    inset: 15pt,
    radius: 4pt,
  )[
    #align(center)[
      #text(size: 16pt, weight: "bold", fill: primary)[Post-COVID Surge]
    ]
    #v(0.1in)
    Outdoor recreation participation increased 26% from 2019-2024. The habit is formed.
  ],
  box(
    width: 100%,
    fill: light-bg,
    inset: 15pt,
    radius: 4pt,
  )[
    #align(center)[
      #text(size: 16pt, weight: "bold", fill: primary)[AllTrails Plateau]
    ]
    #v(0.1in)
    After explosive growth, AllTrails is seeing user fatigue. No innovation in rewards = opening.
  ],
  box(
    width: 100%,
    fill: light-bg,
    inset: 15pt,
    radius: 4pt,
  )[
    #align(center)[
      #text(size: 16pt, weight: "bold", fill: primary)[GOLFn Proof]
    ]
    #v(0.1in)
    With 45K users and \$2.5M+ revenue, GOLFn has proven play-to-earn works. Time to expand.
  ],
)

// ═══════════════════════════════════════════════════════════════════
// SECTION 3: THE CONCEPT - TRAILn
// ═══════════════════════════════════════════════════════════════════

#pagebreak()

#v(0.3in)

#text(size: 28pt, weight: "bold", fill: primary)[03 — The Concept: TRAILn]

#v(0.2in)

#line(length: 100%, stroke: (paint: accent, thickness: 2pt))

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

== Feature Deep Dive

#v(0.2in)

=== 1. Verified Activity System

#box(
  width: 100%,
  fill: light-bg,
  inset: 15pt,
)[
  GPS-verified check-ins ensure authentic activity. Users earn based on:
  
  #grid(
    columns: (1fr, 1fr),
    gutter: 20pt,
    [
      - *Distance covered* — miles hiked/run
      - *Elevation gained* — climbing rewarded
      - *Difficulty rating* — harder = more points
      - *Time outdoors* — duration matters
    ],
    [
      - *Weather bonus* — braving the elements
      - *Group multiplier* — friends boost earnings
      - *Off-peak bonus* — weekday adventures
      - *Conservation actions* — responsible practices
    ],
  )
]

#v(0.2in)

=== 2. Collection Mechanics

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

#v(0.2in)

=== 3. Collectible Gear Cards

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

Cards can be:
- *Earned* through activity milestones
- *Purchased* in limited drops
- *Rented* from other users (rental economy)
- *Traded* in the marketplace

#pagebreak()

=== 4. Brand Partnership Integrations

#v(0.2in)

#grid(
  columns: (1fr, 1fr),
  gutter: 20pt,
  [
    ==== Tier 1: Premium Outdoor
    #box(fill: rgb("#F5F5F5"), inset: 10pt, width: 100%)[
      - Arc'teryx
      - Patagonia  
      - Black Diamond
      - Osprey
      - Fjällräven
    ]
    
    Exclusive collectible cards, Pro Shop items, experience sweepstakes.
  ],
  [
    ==== Tier 2: Performance
    #box(fill: rgb("#F5F5F5"), inset: 10pt, width: 100%)[
      - Salomon
      - La Sportiva
      - Hoka
      - Brooks Trail
      - Merrell
    ]
    
    Footwear focus, race partnerships, gear redemptions.
  ],
)

#v(0.2in)

#grid(
  columns: (1fr, 1fr),
  gutter: 20pt,
  [
    ==== Tier 3: Accessories & Tech
    #box(fill: rgb("#F5F5F5"), inset: 10pt, width: 100%)[
      - Garmin
      - COROS
      - Hydro Flask
      - YETI
      - Goal Zero
    ]
    
    GPS integration, hydration, camp gear.
  ],
  [
    ==== Tier 4: Experiences
    #box(fill: rgb("#F5F5F5"), inset: 10pt, width: 100%)[
      - REI Adventures
      - National Geographic Expeditions
      - Local guide services
      - Hut systems (AMC, Colorado)
    ]
    
    Sweepstakes for guided expeditions, lodge stays.
  ],
)

#v(0.3in)

=== 5. Conservation Integration

What makes TRAILn special — a values-aligned brand:

#box(
  width: 100%,
  fill: rgb("#E8F5E9"),
  stroke: 1pt + accent,
  inset: 15pt,
)[
  - *National Park Foundation partnership* — percentage of Pro Shop to conservation
  - *Leave No Trace verified* — earn badges for responsible practices
  - *Trail work rewards* — volunteer trail maintenance = premium points
  - *Carbon tracking* — optional offset integration for trip impact
  - *Wildlife reporting* — contribute to conservation data
]

This positions TRAILn as *the ethical outdoor app* — justifying premium pricing and attracting mission-aligned brands.

#pagebreak()

=== 6. Social & Community

#grid(
  columns: (1fr, 1fr),
  gutter: 20pt,
  [
    ==== Activity Features
    - Live location sharing (opt-in)
    - Group hike coordination
    - Summit check-in celebrations
    - Photo challenges with voting
    - Trail condition reporting
  ],
  [
    ==== Community Features
    - Local hiking groups
    - Trip planning boards
    - Gear reviews from users
    - Buddy matching for trips
    - Leaderboards (opt-in)
  ],
)

#v(0.3in)

== App Experience Flow

#align(center)[
  #box(
    width: 90%,
    stroke: 1pt + rgb("#CCCCCC"),
    inset: 20pt,
    radius: 4pt,
  )[
    #grid(
      columns: (1fr, 0.2fr, 1fr, 0.2fr, 1fr, 0.2fr, 1fr),
      [
        #align(center)[
          #text(size: 24pt)[🥾]
          #v(0.1in)
          *Plan*
          #v(0.05in)
          #text(size: 9pt)[Find trails, check conditions, invite friends]
        ]
      ],
      [→],
      [
        #align(center)[
          #text(size: 24pt)[📍]
          #v(0.1in)
          *Check In*
          #v(0.05in)
          #text(size: 9pt)[GPS verify at trailhead, equip cards]
        ]
      ],
      [→],
      [
        #align(center)[
          #text(size: 24pt)[⛰️]
          #v(0.1in)
          *Explore*
          #v(0.05in)
          #text(size: 9pt)[Track activity, hit waypoints, take photos]
        ]
      ],
      [→],
      [
        #align(center)[
          #text(size: 24pt)[🏆]
          #v(0.1in)
          *Earn*
          #v(0.05in)
          #text(size: 9pt)[Collect points, unlock badges, redeem gear]
        ]
      ],
    ]
  ]
]

// ═══════════════════════════════════════════════════════════════════
// SECTION 4: BRAND FIT
// ═══════════════════════════════════════════════════════════════════

#pagebreak()

#v(0.3in)

#text(size: 28pt, weight: "bold", fill: primary)[04 — Brand Fit with GOLFn]

#v(0.2in)

#line(length: 100%, stroke: (paint: accent, thickness: 2pt))

#v(0.4in)

#text(size: 14pt, weight: "medium", fill: secondary)[
  TRAILn Scored Highest Brand Fit Among All Concepts Evaluated
]

#v(0.3in)

== Why TRAILn is a Natural Extension

Our focus group research evaluated 7 potential app concepts for GOLFn brand extension. TRAILn scored *8.9 out of 10 for brand fit* — second only to tennis (9.3) but with a market *10x larger*.

#v(0.2in)

=== The GOLFn Brand DNA

#grid(
  columns: (1fr, 1fr),
  gutter: 25pt,
  [
    #box(fill: light-bg, inset: 15pt, width: 100%)[
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
    #box(fill: light-bg, inset: 15pt, width: 100%)[
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
  [Tagline], ["The app that pays you to play golf"], ["The app that pays you to explore"],
  [Hero Activity], [18 holes at verified course], [Summit at verified peak],
  [Collection], [Course cards, tournament badges], [Peak cards, park badges],
  [Premium Gear], [Bettinardi, Cobra, Srixon], [Arc'teryx, Patagonia, Black Diamond],
  [Social Mechanic], [Play with friends bonus], [Hike with friends bonus],
  [Aspirational], [Golf trip sweepstakes], [Expedition sweepstakes],
)

#pagebreak()

== Focus Group Brand Fit Scores

#v(0.2in)

#align(center)[
  #table(
    columns: (2fr, 1fr, 1fr),
    inset: 10pt,
    stroke: 0.5pt + rgb("#CCCCCC"),
    fill: (x, y) => if y == 0 { primary } else if y == 3 { rgb("#E8F5E9") } else { white },
    text(fill: white, weight: "bold")[Concept],
    text(fill: white, weight: "bold")[Brand Fit Score],
    text(fill: white, weight: "bold")[Overall Score],
    [RACQn (Tennis/Pickleball)], [9.3], [8.1],
    [CASTn (Fishing)], [9.0], [6.9],
    [*TRAILn (Outdoor Adventure)*], [*8.9*], [*8.4*],
    [SLOPEn (Skiing)], [8.5], [7.2],
    [RIDEn (Cycling)], [8.4], [7.8],
    [WAVEn (Water Sports)], [7.8], [6.3],
    [ACTIVn (General Fitness)], [6.2], [5.8],
  )
]

#v(0.3in)

#box(
  width: 100%,
  fill: rgb("#FFF8E1"),
  stroke: (left: 3pt + gold),
  inset: 15pt,
)[
  #text(weight: "bold")[Key Finding:]
  TRAILn has the *highest overall score (8.4)* because it combines strong brand fit with the largest addressable market. Tennis scored higher on brand fit but lower overall due to market size limitations.
]

#v(0.3in)

== User Overlap Analysis

#v(0.2in)

Based on survey data from GOLFn's existing user base:

#grid(
  columns: (1fr, 1fr),
  gutter: 25pt,
  [
    #box(
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
    ]
  ],
  [
    #box(
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
    ]
  ],
)

#v(0.3in)

The same affluent, active, 25-55 demographic that plays golf also hikes, camps, and spends on outdoor gear. TRAILn is not a new customer — it's a second product for the same customer.

// ═══════════════════════════════════════════════════════════════════
// SECTION 5: TARGET AUDIENCE
// ═══════════════════════════════════════════════════════════════════

#pagebreak()

#v(0.3in)

#text(size: 28pt, weight: "bold", fill: primary)[05 — Target Audience]

#v(0.2in)

#line(length: 100%, stroke: (paint: accent, thickness: 2pt))

#v(0.4in)

== Primary Demographics

#v(0.2in)

#table(
  columns: (1fr, 2fr),
  inset: 12pt,
  stroke: 0.5pt + rgb("#CCCCCC"),
  fill: (x, y) => if calc.odd(y) { white } else { rgb("#FAFAFA") },
  [*Age Range*], [28-55 (core), extends to 65+],
  [*Household Income*], [\$80,000+ (\$125K+ for premium tiers)],
  [*Gender Split*], [55% male / 45% female (more balanced than golf)],
  [*Geography*], [Mountain West (CO, UT, WA), California, Northeast (Appalachian)],
  [*Education*], [College-educated (78%)],
  [*Tech Comfort*], [High smartphone adoption, app-native behavior],
  [*Outdoor Frequency*], [2-4 outdoor activities per month minimum],
)

#v(0.3in)

== User Personas

#v(0.2in)

#grid(
  columns: (1fr, 1fr),
  gutter: 20pt,
  [
    #box(fill: light-bg, inset: 15pt, width: 100%, radius: 4pt)[
      #text(weight: "bold", size: 12pt, fill: primary)[Adventure Amy]
      #text(size: 10pt)[ | 34, Denver, Marketing Director]
      #v(0.1in)
      - Collects 14ers (has 34 of 54)
      - Spends \$3K/year on outdoor gear
      - Uses AllTrails but wants more
      - Already a Patagonia loyalist
      
      #v(0.1in)
      #text(style: "italic", size: 10pt, fill: secondary)[
        "I'd love an app that made my hiking feel like it counts for something beyond just me."
      ]
    ]
  ],
  [
    #box(fill: light-bg, inset: 15pt, width: 100%, radius: 4pt)[
      #text(weight: "bold", size: 12pt, fill: primary)[Gear-Head Greg]
      #text(size: 10pt)[ | 45, Boulder, Engineer]
      #v(0.1in)
      - Mountain biker + skier + hiker
      - Spends \$7K/year on gear
      - YouTube gear reviewer
      - Sees market opportunity
      
      #v(0.1in)
      #text(style: "italic", size: 10pt, fill: secondary)[
        "The trail community is underserved by rewards apps. If Arc'teryx had collectible cards... I'd grind for those."
      ]
    ]
  ],
)

#v(0.15in)

#grid(
  columns: (1fr, 1fr),
  gutter: 20pt,
  [
    #box(fill: light-bg, inset: 15pt, width: 100%, radius: 4pt)[
      #text(weight: "bold", size: 12pt, fill: primary)[Executive Alex]
      #text(size: 10pt)[ | 47, Scottsdale, C-Suite]
      #v(0.1in)
      - GOLFn Diamond member
      - Hikes on vacations in mountains
      - Values status and exclusivity
      - \$5K+/year on activities
      
      #v(0.1in)
      #text(style: "italic", size: 10pt, fill: secondary)[
        "If I lived in Colorado, this would be a 9/10. The brand partnerships are impressive."
      ]
    ]
  ],
  [
    #box(fill: light-bg, inset: 15pt, width: 100%, radius: 4pt)[
      #text(weight: "bold", size: 12pt, fill: primary)[Weekend Warrior Will]
      #text(size: 10pt)[ | 33, Chicago, Sales Rep]
      #v(0.1in)
      - Does everything, specializes in nothing
      - Budget-conscious but motivated
      - Would engage more with rewards
      - Uses free tier of every app
      
      #v(0.1in)
      #text(style: "italic", size: 10pt, fill: secondary)[
        "I try everything but don't go deep. Would a rewards app make me more committed?"
      ]
    ]
  ],
)

#pagebreak()

== Psychographic Profile

#v(0.2in)

=== The TRAILn User Mindset

#grid(
  columns: (1fr, 1fr, 1fr),
  gutter: 15pt,
  [
    #box(fill: light-bg, inset: 12pt, width: 100%, radius: 4pt)[
      #align(center)[
        #text(size: 20pt)[🏔️]
        #v(0.1in)
        #text(weight: "bold")[The Collector]
      ]
      #v(0.1in)
      #text(size: 10pt)[
        Tracks 14ers, state highpoints, national parks. Already collecting — we just formalize it.
      ]
    ]
  ],
  [
    #box(fill: light-bg, inset: 12pt, width: 100%, radius: 4pt)[
      #align(center)[
        #text(size: 20pt)[⚙️]
        #v(0.1in)
        #text(weight: "bold")[The Optimizer]
      ]
      #v(0.1in)
      #text(size: 10pt)[
        Researches gear obsessively. Wants data on their performance. Maximizes value.
      ]
    ]
  ],
  [
    #box(fill: light-bg, inset: 12pt, width: 100%, radius: 4pt)[
      #align(center)[
        #text(size: 20pt)[🌲]
        #v(0.1in)
        #text(weight: "bold")[The Steward]
      ]
      #v(0.1in)
      #text(size: 10pt)[
        Cares about conservation. Volunteers for trail work. Wants ethical brands.
      ]
    ]
  ],
)

#v(0.15in)

#grid(
  columns: (1fr, 1fr, 1fr),
  gutter: 15pt,
  [
    #box(fill: light-bg, inset: 12pt, width: 100%, radius: 4pt)[
      #align(center)[
        #text(size: 20pt)[👥]
        #v(0.1in)
        #text(weight: "bold")[The Social Hiker]
      ]
      #v(0.1in)
      #text(size: 10pt)[
        Part of hiking groups. Plans trips with friends. Values shared experiences.
      ]
    ]
  ],
  [
    #box(fill: light-bg, inset: 12pt, width: 100%, radius: 4pt)[
      #align(center)[
        #text(size: 20pt)[💎]
        #v(0.1in)
        #text(weight: "bold")[The Experience Seeker]
      ]
      #v(0.1in)
      #text(size: 10pt)[
        Chases bucket list adventures. Values memories over things. Will pay for access.
      ]
    ]
  ],
  [
    #box(fill: light-bg, inset: 12pt, width: 100%, radius: 4pt)[
      #align(center)[
        #text(size: 20pt)[📱]
        #v(0.1in)
        #text(weight: "bold")[The Early Adopter]
      ]
      #v(0.1in)
      #text(size: 10pt)[
        Already uses AllTrails, Strava, Gaia. Comfortable with apps. Wants innovation.
      ]
    ]
  ],
)

#v(0.3in)

== Total Addressable Market

#v(0.2in)

#table(
  columns: (2fr, 1fr, 1fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#CCCCCC"),
  fill: (x, y) => if y == 0 { primary } else { white },
  text(fill: white, weight: "bold")[Segment],
  text(fill: white, weight: "bold")[Population],
  text(fill: white, weight: "bold")[TRAILn Fit],
  [All outdoor participants], [160M], [—],
  [Serious outdoor enthusiasts], [45M], [Primary target],
  [Premium gear buyers (\$1K+/yr)], [18M], [Core paying users],
  [GOLFn-style demo overlap], [8M], [Highest conversion],
)

#v(0.2in)

#box(
  width: 100%,
  fill: rgb("#E8F5E9"),
  inset: 15pt,
)[
  *Conservative Year 1 Target:* 500K downloads, 25K paid subscribers (0.14% of premium gear buyers)
]

// ═══════════════════════════════════════════════════════════════════
// SECTION 6: BUSINESS MODEL
// ═══════════════════════════════════════════════════════════════════

#pagebreak()

#v(0.3in)

#text(size: 28pt, weight: "bold", fill: primary)[06 — Business Model]

#v(0.2in)

#line(length: 100%, stroke: (paint: accent, thickness: 2pt))

#v(0.4in)

#text(size: 14pt, weight: "medium", fill: secondary)[
  Proven GOLFn Economics Applied to Outdoor Recreation
]

#v(0.3in)

== Revenue Streams

#v(0.2in)

=== 1. Membership Subscriptions (Primary)

Following GOLFn's tiered membership model:

#v(0.15in)

#table(
  columns: (1.2fr, 0.8fr, 0.8fr, 2fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#CCCCCC"),
  fill: (x, y) => if y == 0 { primary } else if y == 1 { rgb("#FAFAFA") } else { white },
  text(fill: white, weight: "bold")[Tier],
  text(fill: white, weight: "bold")[Annual Fee],
  text(fill: white, weight: "bold")[Multiplier],
  text(fill: white, weight: "bold")[Target User],
  [*Free*], [\$0], [1x], [Casual hikers, try before buy],
  [*Trailhead*], [\$144], [2.5x], [Regular outdoor enthusiasts],
  [*Summit*], [\$225], [5x], [Serious hikers, collectors],
  [*Alpine*], [\$450], [12x], [Avid peak baggers, gear lovers],
  [*Expedition*], [\$1,799], [55x], [Power users, experience seekers],
  [*Peak*], [\$8,900], [280x], [VIP, guided trip access],
)

#v(0.2in)

Memberships include:
- *Auto-equipped cards* (value increases with tier)
- *Pro Shop discounts* (5-20% by tier)
- *Priority sweepstakes entries*
- *Exclusive card drops*

#v(0.3in)

=== 2. Collectible Card Sales

- *Genesis Collection:* Limited mint of TRAILn cards (pre-launch)
- *Seasonal Drops:* New cards with each mountain season
- *Brand Collaborations:* Arc'teryx, Patagonia exclusive cards
- *Secondary Market:* Trading platform with transaction fees

#v(0.3in)

=== 3. Pro Shop (E-commerce)

Users redeem points OR purchase directly:
- Premium outdoor gear from partner brands
- TRAILn-branded merchandise
- Experience packages (guided trips, hut stays)
- Conservation donations

#pagebreak()

=== 4. Brand Partnership Revenue

#v(0.2in)

#grid(
  columns: (1fr, 1fr),
  gutter: 20pt,
  [
    ==== Partnership Models
    - *Sponsored badges* — Brand-funded challenges
    - *Exclusive redemptions* — Partner-only gear
    - *Co-branded cards* — Revenue share on sales
    - *Data insights* — Anonymized user behavior
    - *Sampling programs* — Trial gear distribution
  ],
  [
    ==== Estimated Value Per Partner
    #box(fill: light-bg, inset: 12pt, width: 100%)[
      - Tier 1 (Arc'teryx): \$150-300K/year
      - Tier 2 (Salomon): \$75-150K/year
      - Tier 3 (Hydro Flask): \$25-75K/year
      
      *Target: 8-10 partners = \$500K-1M/year*
    ]
  ],
)

#v(0.3in)

=== 5. Optional Token Economics

For ecosystem users who want crypto integration:

#box(
  width: 100%,
  fill: light-bg,
  stroke: (left: 3pt + accent),
  inset: 15pt,
)[
  - *Points ↔ \$GOLF conversion* — Unified economy across GOLFn/TRAILn
  - *NFT cards on Solana* — For collectors who want on-chain ownership
  - *Cross-app earning* — Golf rounds earn TRAILn points and vice versa
  
  *Key principle:* Crypto enhances but never gates. All features work without wallet.
]

#v(0.3in)

== Unit Economics

#v(0.2in)

#table(
  columns: (2fr, 1fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#CCCCCC"),
  fill: (x, y) => if y == 0 { primary } else { white },
  text(fill: white, weight: "bold")[Metric],
  text(fill: white, weight: "bold")[Estimate],
  [Customer Acquisition Cost (CAC)], [\$15-25],
  [Average Revenue Per User (ARPU)], [\$140/year],
  [Lifetime Value (LTV)], [\$350-500],
  [LTV:CAC Ratio], [14-20x],
  [Monthly Churn (paid)], [3-5%],
  [Free-to-Paid Conversion], [5-8%],
)

#v(0.2in)

*Comparable:* AllTrails reports ~\$100 ARPU with 4% conversion. TRAILn's rewards mechanics should drive higher engagement and premium tier adoption.

// ═══════════════════════════════════════════════════════════════════
// SECTION 7: COMPETITIVE LANDSCAPE
// ═══════════════════════════════════════════════════════════════════

#pagebreak()

#v(0.3in)

#text(size: 28pt, weight: "bold", fill: primary)[07 — Competitive Landscape]

#v(0.2in)

#line(length: 100%, stroke: (paint: accent, thickness: 2pt))

#v(0.4in)

== Current Market Players

#v(0.2in)

=== Trail & Hiking Apps

#table(
  columns: (1.5fr, 1fr, 1.5fr, 1fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#CCCCCC"),
  fill: (x, y) => if y == 0 { primary } else { white },
  text(fill: white, weight: "bold")[App],
  text(fill: white, weight: "bold")[Users],
  text(fill: white, weight: "bold")[Strength],
  text(fill: white, weight: "bold")[Rewards?],
  [AllTrails], [50M+], [Trail database, reviews], [*None*],
  [Gaia GPS], [5M+], [Offline maps, navigation], [*None*],
  [REI Hiking Project], [2M+], [REI ecosystem], [REI Co-op pts],
  [PeakVisor], [1M+], [Peak identification, AR], [*None*],
  [Komoot], [30M+], [Route planning, Europe focus], [*None*],
)

#v(0.3in)

=== Fitness & Activity Trackers

#table(
  columns: (1.5fr, 1fr, 1.5fr, 1fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#CCCCCC"),
  fill: (x, y) => if y == 0 { primary } else { white },
  text(fill: white, weight: "bold")[App],
  text(fill: white, weight: "bold")[Users],
  text(fill: white, weight: "bold")[Strength],
  text(fill: white, weight: "bold")[Rewards?],
  [Strava], [100M+], [Social, segments, clubs], [Badges only],
  [Garmin Connect], [50M+], [Device ecosystem], [*None*],
  [Apple Fitness], [Built-in], [iOS integration], [*None*],
  [Whoop], [1M+], [Recovery metrics], [*None*],
)

#v(0.3in)

=== Play-to-Earn / Rewards Apps

#table(
  columns: (1.5fr, 1fr, 1.5fr, 1fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#CCCCCC"),
  fill: (x, y) => if y == 0 { primary } else { white },
  text(fill: white, weight: "bold")[App],
  text(fill: white, weight: "bold")[Users],
  text(fill: white, weight: "bold")[Activity],
  text(fill: white, weight: "bold")[Status],
  [GOLFn], [45K], [Golf], [Growing],
  [Moonwalk], [—], [Walking], [Active],
  [Stepn], [500K], [Walking/Running], [Declining],
  [SweatCoin], [30M+], [Steps], [Low value rewards],
)

#pagebreak()

== Competitive Positioning

#v(0.2in)

#align(center)[
  #box(
    width: 100%,
    stroke: 1pt + rgb("#CCCCCC"),
    inset: 20pt,
  )[
    #grid(
      columns: (1fr, 1fr),
      gutter: 0pt,
      [
        #align(right)[
          #text(size: 10pt)[← Low Rewards]
        ]
      ],
      [
        #align(left)[
          #text(size: 10pt)[High Rewards →]
        ]
      ],
    )
    #v(0.3in)
    #grid(
      columns: (1fr, 1fr),
      gutter: 40pt,
      [
        #align(center)[
          #text(size: 9pt, fill: rgb("#666666"))[
            *Utility Focus* \
            AllTrails, Gaia GPS \
            Komoot, PeakVisor
          ]
        ]
      ],
      [
        #align(center)[
          #box(
            fill: rgb("#E8F5E9"),
            inset: 10pt,
            radius: 4pt,
          )[
            #text(size: 11pt, weight: "bold", fill: primary)[
              *TRAILn* \
              (Open Space)
            ]
          ]
        ]
      ],
    )
    #v(0.5in)
    #grid(
      columns: (1fr, 1fr),
      gutter: 40pt,
      [
        #align(center)[
          #text(size: 9pt, fill: rgb("#666666"))[
            *General Fitness* \
            Strava, SweatCoin \
            Apple Fitness
          ]
        ]
      ],
      [
        #align(center)[
          #text(size: 9pt, fill: rgb("#666666"))[
            *Specific Sports* \
            GOLFn (golf) \
            Slopes (ski)
          ]
        ]
      ],
    )
    #v(0.3in)
    #grid(
      columns: (1fr, 1fr),
      gutter: 0pt,
      [
        #align(center)[
          #text(size: 10pt)[↑ General Activity]
        ]
      ],
      [
        #align(center)[
          #text(size: 10pt)[↑ Outdoor Specific]
        ]
      ],
    )
  ]
]

#v(0.3in)

== TRAILn Differentiation

#v(0.2in)

#box(
  width: 100%,
  fill: light-bg,
  inset: 15pt,
)[
  #grid(
    columns: (0.3fr, 1fr, 1fr),
    gutter: 10pt,
    row-gutter: 15pt,
    [], [*AllTrails*], [*TRAILn*],
    [Model], [Subscription utility], [Rewards + utility],
    [Earn], [Nothing], [Points for every activity],
    [Cards], [None], [Collectible gear cards],
    [Brands], [No partnerships], [Premium brand integrations],
    [Social], [Reviews, photos], [Group bonuses, challenges],
    [Redemption], [N/A], [Gear, experiences, sweepstakes],
  )
]

#v(0.3in)

#box(
  width: 100%,
  fill: rgb("#FFF3E0"),
  stroke: (left: 3pt + gold),
  inset: 15pt,
)[
  #text(weight: "bold")[The Moat:]
  First-mover advantage in outdoor rewards creates brand partnership lock-up. Once Arc'teryx and Patagonia are in TRAILn's ecosystem, competitors face a "cold start" problem.
]

// ═══════════════════════════════════════════════════════════════════
// SECTION 8: TECHNICAL SYNERGIES
// ═══════════════════════════════════════════════════════════════════

#pagebreak()

#v(0.3in)

#text(size: 28pt, weight: "bold", fill: primary)[08 — Technical Synergies]

#v(0.2in)

#line(length: 100%, stroke: (paint: accent, thickness: 2pt))

#v(0.4in)

#text(size: 14pt, weight: "medium", fill: secondary)[
  Shared Infrastructure Accelerates Development and Reduces Cost
]

#v(0.3in)

== GOLFn + Moonwalk + TRAILn Stack

#v(0.2in)

#box(
  width: 100%,
  stroke: 1pt + rgb("#CCCCCC"),
  inset: 20pt,
  radius: 4pt,
)[
  #align(center)[
    #text(weight: "bold", fill: primary)[Unified Platform Architecture]
  ]
  #v(0.2in)
  
  #grid(
    columns: (1fr, 1fr, 1fr),
    gutter: 15pt,
    [
      #box(fill: rgb("#E3F2FD"), inset: 10pt, width: 100%, radius: 4pt)[
        #align(center)[
          #text(weight: "bold")[GOLFn]
          #v(0.05in)
          #text(size: 9pt)[Golf rewards]
        ]
      ]
    ],
    [
      #box(fill: rgb("#E8F5E9"), inset: 10pt, width: 100%, radius: 4pt)[
        #align(center)[
          #text(weight: "bold")[TRAILn]
          #v(0.05in)
          #text(size: 9pt)[Outdoor rewards]
        ]
      ]
    ],
    [
      #box(fill: rgb("#FFF3E0"), inset: 10pt, width: 100%, radius: 4pt)[
        #align(center)[
          #text(weight: "bold")[Moonwalk]
          #v(0.05in)
          #text(size: 9pt)[Fitness stakes]
        ]
      ]
    ],
  )
  
  #v(0.15in)
  #align(center)[↓ ↓ ↓]
  #v(0.15in)
  
  #box(fill: rgb("#F5F5F5"), inset: 15pt, width: 100%, radius: 4pt)[
    #align(center)[
      #text(weight: "bold")[Shared Services Layer]
      #v(0.1in)
      #grid(
        columns: (1fr, 1fr, 1fr, 1fr),
        gutter: 10pt,
        [User Auth], [Points Engine], [Card System], [Pro Shop],
      )
    ]
  ]
  
  #v(0.15in)
  #align(center)[↓]
  #v(0.15in)
  
  #box(fill: primary, inset: 15pt, width: 100%, radius: 4pt)[
    #set text(fill: white)
    #align(center)[
      #text(weight: "bold")[Solana Blockchain (Optional Layer)]
      #v(0.1in)
      \$GOLF Token | NFT Cards | On-Chain Transactions
    ]
  ]
]

#v(0.3in)

== Shared Components

#v(0.2in)

#grid(
  columns: (1fr, 1fr),
  gutter: 20pt,
  [
    === From GOLFn
    - *Points calculation engine* — Proven earning mechanics
    - *Collectible card system* — Rarity, abilities, rentals
    - *Pro Shop infrastructure* — E-commerce, redemption
    - *Brand partnership framework* — Integration patterns
    - *Subscription management* — Tier system, billing
    - *Solana wallet integration* — Tiplink for easy onboarding
  ],
  [
    === From Moonwalk
    - *GPS activity verification* — Anti-gaming systems
    - *Social accountability* — Group mechanics
    - *Fitness tracking expertise* — Steps, distance, elevation
    - *Challenge systems* — Competitive frameworks
    - *Crypto payment rails* — BONK, SOL, USDC
    - *Pool mechanics* — For future TRAILn challenges
  ],
)

#pagebreak()

== Unified Points Economy

#v(0.2in)

#box(
  width: 100%,
  fill: light-bg,
  stroke: 1pt + accent,
  inset: 15pt,
)[
  #text(weight: "bold", fill: primary)[Cross-App Earning (Future State)]
  #v(0.15in)
  
  Users can earn and spend across the ecosystem:
  
  - *Earn on golf course* → Spend on hiking gear
  - *Earn on trails* → Spend on golf experiences
  - *Convert points to \$GOLF* → Use anywhere or trade
  
  This creates *network effects*: each new app makes the entire ecosystem more valuable.
]

#v(0.3in)

== Development Acceleration

#v(0.2in)

#table(
  columns: (2fr, 1fr, 1fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#CCCCCC"),
  fill: (x, y) => if y == 0 { primary } else { white },
  text(fill: white, weight: "bold")[Component],
  text(fill: white, weight: "bold")[Build from Scratch],
  text(fill: white, weight: "bold")[With GOLFn Stack],
  [Core app framework], [4-6 months], [2 months],
  [Points/rewards engine], [3-4 months], [Configuration only],
  [Card collectibles system], [3-4 months], [1 month (theming)],
  [E-commerce/Pro Shop], [2-3 months], [Integration only],
  [Blockchain integration], [2-3 months], [Shared infrastructure],
  [Brand partnerships], [6-12 months], [Leverage existing],
  [*Total to MVP*], [*18-24 months*], [*6-8 months*],
)

#v(0.3in)

#box(
  width: 100%,
  fill: rgb("#E8F5E9"),
  inset: 15pt,
)[
  #text(weight: "bold")[Bottom Line:]
  Combining GOLFn and Moonwalk infrastructure cuts TRAILn development time by *60-70%* and reduces risk by leveraging proven systems.
]

// ═══════════════════════════════════════════════════════════════════
// SECTION 9: GO-TO-MARKET
// ═══════════════════════════════════════════════════════════════════

#pagebreak()

#v(0.3in)

#text(size: 28pt, weight: "bold", fill: primary)[09 — Go-to-Market Strategy]

#v(0.2in)

#line(length: 100%, stroke: (paint: accent, thickness: 2pt))

#v(0.4in)

== Phased Launch Approach

#v(0.2in)

=== Phase 1: Mountain West Beta (Months 1-6)

#box(
  width: 100%,
  fill: light-bg,
  inset: 15pt,
)[
  *Focus Markets:* Colorado, Utah, Washington, California (mountains)
  
  *Key Activities:*
  - Closed beta with 5,000 GOLFn users who hike
  - Partner with 3-5 local hiking clubs
  - Secure 2-3 Tier 1 brand partnerships
  - Instagram/TikTok influencer campaign with outdoor creators
  - Refine earning mechanics based on feedback
  
  *Success Metrics:*
  - 50K downloads
  - 2K paid subscribers
  - 4.5+ App Store rating
]

#v(0.2in)

=== Phase 2: National Expansion (Months 6-12)

#box(
  width: 100%,
  fill: light-bg,
  inset: 15pt,
)[
  *Expansion Markets:* Northeast (Appalachian), Southwest (desert hiking), Pacific Northwest
  
  *Key Activities:*
  - Public launch on iOS and Android
  - National Park Foundation partnership announcement
  - REI distribution partnership discussion
  - AllTrails user acquisition targeting
  - Conservation messaging campaign
  
  *Success Metrics:*
  - 500K downloads
  - 25K paid subscribers
  - 8+ brand partners
  - \$3.5M revenue run rate
]

#v(0.2in)

=== Phase 3: Ecosystem Integration (Year 2)

#box(
  width: 100%,
  fill: light-bg,
  inset: 15pt,
)[
  *Focus:* Cross-app functionality, international expansion
  
  *Key Activities:*
  - GOLFn + TRAILn unified rewards
  - International launch (Alps, New Zealand, Patagonia)
  - Winter features integration (SLOPEn mechanics)
  - Enterprise partnerships (corporate wellness)
  
  *Success Metrics:*
  - 2M downloads
  - 100K paid subscribers
  - \$15M revenue
]

#pagebreak()

== Marketing Channels

#v(0.2in)

#grid(
  columns: (1fr, 1fr),
  gutter: 20pt,
  [
    === Organic / Community
    - *Outdoor influencers* — Partner with 14er collectors, thru-hikers
    - *Hiking club partnerships* — CMC, AMC, Sierra Club chapters
    - *Reddit/Facebook groups* — Seed in hiking communities
    - *Trail condition reporting* — Utility drives organic installs
    - *GOLFn cross-promotion* — Direct access to 45K users
  ],
  [
    === Paid Acquisition
    - *Instagram/TikTok* — Adventure content performs well
    - *App Store Optimization* — Target AllTrails keywords
    - *Google/Apple Search Ads* — "hiking app" category
    - *Podcast sponsorships* — Outdoor/adventure shows
    - *Retargeting* — AllTrails and Strava users
  ],
)

#v(0.3in)

== Brand Partnership Strategy

#v(0.2in)

#box(
  width: 100%,
  stroke: 1pt + rgb("#CCCCCC"),
  inset: 15pt,
)[
  #grid(
    columns: (0.3fr, 1fr, 1fr),
    gutter: 10pt,
    row-gutter: 12pt,
    [*Phase*], [*Partners*], [*Value Exchange*],
    [Pre-Launch], [1-2 Tier 1 (Arc'teryx, Patagonia)], [Exclusive launch partnership, marketing support],
    [Launch], [3-4 Tier 2 (Salomon, Osprey, Hoka)], [Pro Shop inventory, collectible cards],
    [Scale], [5-6 Tier 3 (Garmin, Hydro Flask, YETI)], [Sponsored badges, data insights],
    [Mature], [8-10 across tiers], [Full ecosystem integration, revenue share],
  )
]

#v(0.3in)

== Customer Acquisition Costs

#v(0.2in)

#table(
  columns: (1.5fr, 1fr, 1fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#CCCCCC"),
  fill: (x, y) => if y == 0 { primary } else { white },
  text(fill: white, weight: "bold")[Channel],
  text(fill: white, weight: "bold")[Est. CAC],
  text(fill: white, weight: "bold")[% of Budget],
  [GOLFn cross-promotion], [\$0-5], [20%],
  [Organic/influencer], [\$5-10], [25%],
  [Paid social], [\$15-25], [35%],
  [App Store ads], [\$20-30], [15%],
  [Podcasts/partnerships], [\$10-20], [5%],
  [*Blended CAC*], [*\$12-18*], [100%],
)

// ═══════════════════════════════════════════════════════════════════
// SECTION 10: FINANCIAL PROJECTIONS
// ═══════════════════════════════════════════════════════════════════

#pagebreak()

#v(0.3in)

#text(size: 28pt, weight: "bold", fill: primary)[10 — Financial Projections]

#v(0.2in)

#line(length: 100%, stroke: (paint: accent, thickness: 2pt))

#v(0.4in)

#text(size: 14pt, weight: "medium", fill: secondary)[
  Conservative Estimates Based on GOLFn Benchmarks
]

#v(0.3in)

== 3-Year Revenue Forecast

#v(0.2in)

#table(
  columns: (1.5fr, 1fr, 1fr, 1fr),
  inset: 12pt,
  stroke: 0.5pt + rgb("#CCCCCC"),
  fill: (x, y) => if y == 0 { primary } else if y == 5 { rgb("#E8F5E9") } else { white },
  text(fill: white, weight: "bold")[Revenue Stream],
  text(fill: white, weight: "bold")[Year 1],
  text(fill: white, weight: "bold")[Year 2],
  text(fill: white, weight: "bold")[Year 3],
  [Memberships], [\$2.4M], [\$8.5M], [\$18.2M],
  [Card Sales], [\$400K], [\$1.8M], [\$4.5M],
  [Pro Shop], [\$350K], [\$1.5M], [\$3.8M],
  [Brand Partnerships], [\$350K], [\$1.2M], [\$3.5M],
  [*Total Revenue*], [*\$3.5M*], [*\$13M*], [*\$30M*],
)

#v(0.3in)

== Key Assumptions

#v(0.2in)

#grid(
  columns: (1fr, 1fr),
  gutter: 20pt,
  [
    === User Growth
    #table(
      columns: (1fr, 1fr, 1fr, 1fr),
      inset: 8pt,
      stroke: 0.5pt + rgb("#CCCCCC"),
      fill: (x, y) => if y == 0 { rgb("#E8F5E9") } else { white },
      [Metric], [Y1], [Y2], [Y3],
      [Downloads], [500K], [2M], [5M],
      [MAU], [200K], [800K], [2M],
      [Paid Users], [25K], [100K], [250K],
      [Conversion], [5%], [6%], [6.5%],
    )
  ],
  [
    === Revenue Per User
    #table(
      columns: (1fr, 1fr, 1fr, 1fr),
      inset: 8pt,
      stroke: 0.5pt + rgb("#CCCCCC"),
      fill: (x, y) => if y == 0 { rgb("#E8F5E9") } else { white },
      [Metric], [Y1], [Y2], [Y3],
      [ARPU (paid)], [\$140], [\$130], [\$125],
      [ARPU (all)], [\$7], [\$16], [\$15],
      [LTV], [\$350], [\$400], [\$450],
      [LTV:CAC], [14x], [18x], [22x],
    )
  ],
)

#v(0.3in)

== Cost Structure (Year 1)

#v(0.2in)

#grid(
  columns: (1fr, 1fr),
  gutter: 20pt,
  [
    #table(
      columns: (1.5fr, 1fr),
      inset: 10pt,
      stroke: 0.5pt + rgb("#CCCCCC"),
      fill: (x, y) => if y == 0 { primary } else { white },
      text(fill: white, weight: "bold")[Expense Category],
      text(fill: white, weight: "bold")[Amount],
      [Engineering (shared)], [\$600K],
      [Marketing/Acquisition], [\$800K],
      [Operations/Support], [\$250K],
      [Infrastructure], [\$150K],
      [Brand Partnership Team], [\$200K],
      [G&A], [\$200K],
      [*Total Expenses*], [*\$2.2M*],
    )
  ],
  [
    #box(
      width: 100%,
      fill: light-bg,
      inset: 15pt,
    )[
      #text(weight: "bold", fill: primary)[Year 1 P&L Summary]
      #v(0.15in)
      Revenue: \$3.5M \
      Expenses: \$2.2M \
      #line(length: 100%, stroke: 0.5pt)
      *EBITDA: \$1.3M* \
      *Margin: 37%*
    ]
  ],
)

#pagebreak()

== Path to Profitability

#v(0.2in)

#box(
  width: 100%,
  stroke: 1pt + rgb("#CCCCCC"),
  inset: 20pt,
)[
  #align(center)[
    #grid(
      columns: (1fr, 1fr, 1fr),
      gutter: 30pt,
      [
        #text(weight: "bold", fill: primary)[Year 1]
        #v(0.1in)
        Revenue: \$3.5M \
        Margin: 37% \
        Status: *Profitable*
      ],
      [
        #text(weight: "bold", fill: primary)[Year 2]
        #v(0.1in)
        Revenue: \$13M \
        Margin: 42% \
        Status: *Scaling*
      ],
      [
        #text(weight: "bold", fill: primary)[Year 3]
        #v(0.1in)
        Revenue: \$30M \
        Margin: 48% \
        Status: *Platform*
      ],
    )
  ]
]

#v(0.3in)

== Comparable Valuations

#v(0.2in)

#table(
  columns: (1.5fr, 1fr, 1fr, 1fr),
  inset: 10pt,
  stroke: 0.5pt + rgb("#CCCCCC"),
  fill: (x, y) => if y == 0 { primary } else { white },
  text(fill: white, weight: "bold")[Company],
  text(fill: white, weight: "bold")[Revenue],
  text(fill: white, weight: "bold")[Valuation],
  text(fill: white, weight: "bold")[Multiple],
  [AllTrails (2023 est.)], [\$80M], [\$600M+], [7-8x],
  [Strava (2020)], [\$100M+], [\$1.5B], [15x],
  [Sweat (2021 acquisition)], [\$100M], [\$400M], [4x],
  [Peloton Digital (at peak)], [\$500M], [\$8B], [16x],
)

#v(0.2in)

#box(
  width: 100%,
  fill: rgb("#E8F5E9"),
  inset: 15pt,
)[
  #text(weight: "bold")[Implied Valuation:] \
  At Year 3 (\$30M revenue) with 8-10x multiple = *\$240-300M potential valuation* \
  Combined GOLFn + TRAILn + Moonwalk ecosystem could justify premium multiple.
]

// ═══════════════════════════════════════════════════════════════════
// SECTION 11: THE ASK
// ═══════════════════════════════════════════════════════════════════

#pagebreak()

#v(0.3in)

#text(size: 28pt, weight: "bold", fill: primary)[11 — The Ask]

#v(0.2in)

#line(length: 100%, stroke: (paint: accent, thickness: 2pt))

#v(0.4in)

#text(size: 14pt, weight: "medium", fill: secondary)[
  A Strategic Partnership Proposal
]

#v(0.3in)

== What Moonwalk is Proposing

#v(0.2in)

#box(
  width: 100%,
  fill: primary,
  inset: 25pt,
  radius: 8pt,
)[
  #set text(fill: white)
  
  #text(size: 16pt, weight: "bold")[The Deal Structure]
  
  #v(0.2in)
  
  #grid(
    columns: (0.1fr, 1fr),
    gutter: 15pt,
    row-gutter: 20pt,
    [*1.*], [*GOLFn absorbs Moonwalk's parent company* — Moonwalk team joins GOLFn, bringing fitness gamification expertise, Solana infrastructure experience, and development resources.],
    [*2.*], [*Continue operating Moonwalk* — As a standalone product within the GOLFn ecosystem, serving the fitness accountability market.],
    [*3.*], [*Launch TRAILn together* — A joint venture that leverages GOLFn's brand, partnerships, and infrastructure with Moonwalk's development capacity.],
  )
]

#v(0.4in)

== What GOLFn Gets

#v(0.2in)

#grid(
  columns: (1fr, 1fr),
  gutter: 20pt,
  [
    === Immediate Value
    - Experienced development team
    - Proven fitness gamification systems
    - Solana/Web3 expertise
    - Moonwalk user base and brand
    - Operational infrastructure
  ],
  [
    === Strategic Value
    - Entry into \$887B outdoor market
    - Platform for multi-sport expansion
    - Diversified revenue streams
    - Reduced execution risk
    - Shared R&D costs
  ],
)

#v(0.3in)

== What Moonwalk Gets

#v(0.2in)

#grid(
  columns: (1fr, 1fr),
  gutter: 20pt,
  [
    === Immediate Value
    - Access to 45K+ engaged users
    - Established brand partnerships
    - Proven play-to-earn economics
    - Pro Shop infrastructure
    - Marketing resources
  ],
  [
    === Strategic Value
    - Path to scale beyond walking
    - Premium brand positioning
    - Combined go-to-market power
    - Unified points economy
    - Shared operational costs
  ],
)

#pagebreak()

== Proposed Structure

#v(0.2in)

#box(
  width: 100%,
  fill: light-bg,
  stroke: 1pt + accent,
  inset: 20pt,
)[
  #text(weight: "bold", fill: primary)[Terms for Discussion]
  #v(0.2in)
  
  #grid(
    columns: (1fr, 1fr),
    gutter: 30pt,
    [
      === Ownership
      - GOLFn acquires Moonwalk parent entity
      - Equity consideration TBD
      - Moonwalk team joins GOLFn org
      - Leadership roles preserved
    ],
    [
      === Operations
      - Moonwalk continues as separate app
      - TRAILn launches as joint venture
      - Shared services consolidation
      - Combined brand partnership team
    ],
  )
  
  #v(0.2in)
  
  #grid(
    columns: (1fr, 1fr),
    gutter: 30pt,
    [
      === Economics
      - Unified points/\$GOLF economy
      - Shared Pro Shop infrastructure
      - Combined brand partnership revenue
      - Consolidated engineering costs
    ],
    [
      === Governance
      - Joint product roadmap
      - Shared brand guidelines
      - Combined user research
      - Unified customer support
    ],
  )
]

#v(0.4in)

== Why Now?

#v(0.2in)

#grid(
  columns: (1fr, 1fr, 1fr),
  gutter: 15pt,
  [
    #box(fill: rgb("#FFF3E0"), inset: 12pt, width: 100%, radius: 4pt)[
      #align(center)[
        #text(weight: "bold")[Market Timing]
      ]
      #v(0.1in)
      #text(size: 10pt)[
        Outdoor participation at all-time high. AllTrails stagnating. Window to capture rewards category is open.
      ]
    ]
  ],
  [
    #box(fill: rgb("#E3F2FD"), inset: 12pt, width: 100%, radius: 4pt)[
      #align(center)[
        #text(weight: "bold")[GOLFn Momentum]
      ]
      #v(0.1in)
      #text(size: 10pt)[
        45K users, \$2.5M revenue, \$GOLF token launching. Perfect time to expand before competition copies model.
      ]
    ]
  ],
  [
    #box(fill: rgb("#E8F5E9"), inset: 12pt, width: 100%, radius: 4pt)[
      #align(center)[
        #text(weight: "bold")[Combined Strength]
      ]
      #v(0.1in)
      #text(size: 10pt)[
        Together we can move faster, spend less, and build a lifestyle rewards platform that dominates multiple verticals.
      ]
    ]
  ],
)

#v(0.4in)

#align(center)[
  #box(
    width: 80%,
    fill: primary,
    inset: 20pt,
    radius: 8pt,
  )[
    #set text(fill: white)
    #align(center)[
      #text(size: 14pt, weight: "bold")[
        Let's build the lifestyle rewards platform together.
      ]
      #v(0.15in)
      #text(size: 11pt)[
        Contact: [Moonwalk Leadership] \
        Email: [partnership\@moonwalk.fitness]
      ]
    ]
  ]
]

// ═══════════════════════════════════════════════════════════════════
// APPENDIX
// ═══════════════════════════════════════════════════════════════════

#pagebreak()

#v(0.3in)

#text(size: 28pt, weight: "bold", fill: primary)[Appendix A — Market Research]

#v(0.2in)

#line(length: 100%, stroke: (paint: accent, thickness: 2pt))

#v(0.4in)

== Focus Group Methodology

Our concept validation used AI-simulated focus groups with 15 diverse personas representing the target audience:

#v(0.2in)

#text(size: 10pt)[
#table(
  columns: (0.5fr, 1.5fr, 0.8fr, 0.8fr, 1.5fr),
  inset: 8pt,
  stroke: 0.5pt + rgb("#CCCCCC"),
  fill: (x, y) => if y == 0 { primary } else if calc.odd(y) { white } else { rgb("#FAFAFA") },
  text(fill: white, weight: "bold")[\#], text(fill: white, weight: "bold")[Persona], text(fill: white, weight: "bold")[Age], text(fill: white, weight: "bold")[Income], text(fill: white, weight: "bold")[Primary Activity],
  [1], [Executive Alex], [47], [\$350K], [Golf + Hiking],
  [2], [Adventure Amy], [34], [\$125K], [Hiking/Backpacking],
  [3], [Retiree Rich], [68], [\$180K], [Golf + Fishing],
  [4], [Startup Sam], [29], [\$200K], [Running + Cycling],
  [5], [Tennis Tracy], [42], [\$175K], [Tennis + Paddle],
  [6], [Mountain Mike], [38], [\$95K], [Skiing + MTB],
  [7], [Coastal Claire], [51], [\$220K], [Paddleboard + Surf],
  [8], [Weekend Warrior Will], [33], [\$85K], [Multi-sport],
  [9], [Data-Driven Derek], [44], [\$160K], [Cycling + Triathlon],
  [10], [Social Sophie], [37], [\$110K], [Pickleball],
  [11], [Collector Chris], [52], [\$275K], [Golf + Fishing],
  [12], [Fitness-First Fiona], [28], [\$75K], [Trail Running],
  [13], [Outdoors Oliver], [61], [\$145K], [Fly Fishing],
  [14], [Young Professional Yuki], [31], [\$130K], [Running + Tennis],
  [15], [Gear-Head Greg], [45], [\$190K], [Mountain Biking],
)
]

#v(0.3in)

== Scoring Criteria

Each persona rated concepts on 5 dimensions (1-10 scale):

+ *Personal Interest* — Would you use this app?
+ *Brand Fit* — Does this feel like a GOLFn extension?
+ *Willingness to Pay* — Would you subscribe?
+ *Engagement Prediction* — Would you use it regularly?
+ *Recommend to Friends* — Would you share it?

#v(0.3in)

== Full Concept Scores

#table(
  columns: (1.5fr, 1fr, 1fr, 1fr, 1fr, 1fr, 1fr),
  inset: 8pt,
  stroke: 0.5pt + rgb("#CCCCCC"),
  fill: (x, y) => if y == 0 { primary } else if y == 1 { rgb("#E8F5E9") } else { white },
  text(fill: white, weight: "bold")[Concept], text(fill: white, weight: "bold")[Interest], text(fill: white, weight: "bold")[Brand Fit], text(fill: white, weight: "bold")[Pay], text(fill: white, weight: "bold")[Engage], text(fill: white, weight: "bold")[Recommend], text(fill: white, weight: "bold")[Overall],
  [*TRAILn*], [*7.8*], [*8.9*], [*8.2*], [*7.9*], [*8.7*], [*8.4*],
  [RACQn], [7.2], [9.3], [8.1], [7.5], [8.4], [8.1],
  [RIDEn], [7.1], [8.4], [7.9], [7.8], [8.1], [7.8],
  [SLOPEn], [6.3], [8.5], [7.8], [6.0], [7.5], [7.2],
  [CASTn], [5.8], [9.0], [7.5], [5.4], [6.8], [6.9],
  [WAVEn], [5.5], [7.8], [6.5], [5.3], [6.5], [6.3],
  [ACTIVn], [5.9], [6.2], [5.8], [5.5], [5.8], [5.8],
)

#pagebreak()

== Selected Verbatim Feedback

#v(0.2in)

=== TRAILn Enthusiasts

#box(fill: light-bg, inset: 12pt, width: 100%, radius: 4pt)[
  #text(weight: "bold")[Adventure Amy (34, Denver) — Score: 9.5/10]
  #v(0.1in)
  #text(style: "italic")[
    "This is EXACTLY what I want. I'm already collecting 14ers and national parks. Having an app that rewards me for what I'm doing anyway, with gear from brands I love? Take my money. The peak collection feature with digital badges would be incredibly motivating. I'd pay Diamond tier easily."
  ]
]

#v(0.15in)

#box(fill: light-bg, inset: 12pt, width: 100%, radius: 4pt)[
  #text(weight: "bold")[Gear-Head Greg (45, Boulder) — Score: 8.5/10]
  #v(0.1in)
  #text(style: "italic")[
    "I'm in this demo already. The trail community is underserved by rewards apps. If Arc'teryx or Patagonia had collectible cards... I'd grind for those. Genius."
  ]
]

#v(0.15in)

#box(fill: light-bg, inset: 12pt, width: 100%, radius: 4pt)[
  #text(weight: "bold")[Mountain Mike (38, Salt Lake City) — Score: 9/10]
  #v(0.1in)
  #text(style: "italic")[
    "Summer hiking and trail running is my other obsession besides skiing. This would get me out even more. The conservation angle is smart—I'd feel good about the brand partnership."
  ]
]

#v(0.3in)

== Market Size Sources

- Bureau of Economic Analysis: Outdoor Recreation Satellite Account (2024)
- Outdoor Industry Association: Annual Participation Report
- AllTrails: Company press releases and investor materials
- Strava: Year in Sport Report
- Grand View Research: Fitness Apps Market Analysis

#v(0.3in)

== Brand Partnership Intelligence

#text(size: 10pt)[
#table(
  columns: (1.5fr, 1fr, 2fr),
  inset: 8pt,
  stroke: 0.5pt + rgb("#CCCCCC"),
  fill: (x, y) => if y == 0 { primary } else { white },
  text(fill: white, weight: "bold")[Brand], text(fill: white, weight: "bold")[Est. Value], text(fill: white, weight: "bold")[Partnership Precedent],
  [Arc'teryx], [\$200-300K/yr], [Strava challenges, outdoor events],
  [Patagonia], [\$150-250K/yr], [Conservation partnerships],
  [Salomon], [\$100-200K/yr], [Race sponsorships, athlete programs],
  [Osprey], [\$75-150K/yr], [Trail ambassador programs],
  [Garmin], [\$100-200K/yr], [App integrations (Strava, Komoot)],
  [YETI], [\$50-100K/yr], [Outdoor lifestyle sponsorships],
  [REI], [\$150-250K/yr], [Co-op partnerships, events],
)
]

#v(0.5in)

#align(center)[
  #text(size: 10pt, fill: rgb("#666666"))[
    — End of Document — \
    #v(0.1in)
    Prepared by Moonwalk Fitness | January 2026 | Confidential
  ]
]
