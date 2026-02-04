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
      align(right)[Page "X"],
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
