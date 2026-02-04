#set document(
  title: "Moonwalk Fitness: Second App Strategy",
  author: "Moonwalk Research Team",
  date: datetime.today(),
)

#set page(
  paper: "us-letter",
  margin: (x: 1in, y: 1in),
  header: context {
    if counter(page).get().first() > 1 [
      #set text(9pt, fill: gray)
      Moonwalk Fitness Research Report
      #h(1fr)
      #counter(page).display()
    ]
  },
)

#set text(font: "Helvetica", size: 11pt)
#set heading(numbering: "1.1")
#set par(justify: true)

// Title Page
#align(center)[
  #v(2in)
  
  #text(32pt, weight: "bold", fill: rgb("#2D3748"))[
    Moonwalk Fitness
  ]
  
  #v(0.5em)
  
  #text(24pt, weight: "medium", fill: rgb("#4A5568"))[
    Second App Strategy
  ]
  
  #v(0.5em)
  
  #line(length: 50%, stroke: 2pt + rgb("#ED8936"))
  
  #v(1em)
  
  #text(14pt, fill: rgb("#718096"))[
    Comprehensive Market Research Report \
    Women's Fitness & Senior Wellness Markets
  ]
  
  #v(3in)
  
  #text(12pt)[
    *Prepared for:* Moonwalk Fitness Leadership \
    *Date:* January 2026
  ]
]

#pagebreak()

// Table of Contents
#outline(
  title: [Contents],
  indent: 2em,
  depth: 2,
)

#pagebreak()

// Executive Summary
= Executive Summary

Moonwalk Fitness has built a successful crypto-native competitive fitness app. However, this model inherently limits addressable market due to:

- Crypto payment rails excluding 90%+ of potential users
- Competitive/financial mechanics alienating women and seniors  
- Male-skewing, risk-tolerant audience focus

This research explores opportunity for a *second app* targeting underserved high-value segments: *women* and *seniors*.

== Key Findings

#table(
  columns: (1fr, 2fr),
  stroke: none,
  inset: 8pt,
  [*Market Size*], [Global fitness app market is \$12.12B (2025), growing to \$33.58B by 2033 at 13.4% CAGR],
  [*Underserved Segments*], [Women seeking empowerment (not competition) and seniors seeking independence (not athleticism)],
  [*Successful Models*], [Sweat (women, \$400M acquisition), SilverSneakers (seniors, 15M+ members via insurance)],
  [*Market Gaps*], [Menopause-focused wellness, gentle movement apps, community-without-competition],
  [*Recommendation*], [*"Bloom"* - Life-stage fitness for women],
)

#v(1em)

#rect(fill: rgb("#FFF5F5"), radius: 4pt, stroke: rgb("#FC8181"))[
  #pad(12pt)[
    *Bottom Line:* Build "Bloom" - a life-stage fitness app for women 35-65, with focus on menopause wellness, community support, and compassionate coaching. Target \$99.99/year pricing with \$1M+ Year 1 revenue potential.
  ]
]

#pagebreak()

// Part 1: Moonwalk Analysis
= Moonwalk Current Product Analysis

== What Moonwalk Does

*Core Mechanic:* Crypto-based accountability through shared pools

- Pool BONK/SOL/USDC with friends
- Complete step challenges  
- Miss goals → lose funds to winners
- Built on Solana blockchain

== Strengths & Limitations

#table(
  columns: (1fr, 1fr),
  fill: (col, row) => if row == 0 { rgb("#EDF2F7") },
  [*Strengths*], [*Limitations*],
  [Novel accountability with real stakes], [Crypto barrier excludes majority],
  [Strong VC backing (Hack VC, Binance)], [Competition intimidates women],
  [Social dynamics through friend groups], [Financial risk aversion excludes many],
  [Clean gamification], [Step-only limits wellness scope],
)

== Strategic Position for Second App

The second app should:
+ Remove ALL crypto requirements
+ Target women and seniors explicitly
+ Replace competition with community
+ Expand from steps to holistic wellness
+ Emphasize safety over stakes

#pagebreak()

// Part 2: Market Analysis
= Fitness App Market Analysis

== Market Size & Growth

#align(center)[
  #rect(fill: rgb("#EBF8FF"), radius: 8pt, width: 80%)[
    #pad(20pt)[
      #grid(
        columns: (1fr, 1fr, 1fr),
        gutter: 20pt,
        [
          #align(center)[
            #text(24pt, weight: "bold", fill: rgb("#2B6CB0"))[\$12.12B]
            #linebreak()
            #text(10pt)[2025 Market Size]
          ]
        ],
        [
          #align(center)[
            #text(24pt, weight: "bold", fill: rgb("#2B6CB0"))[\$33.58B]
            #linebreak()
            #text(10pt)[2033 Projected]
          ]
        ],
        [
          #align(center)[
            #text(24pt, weight: "bold", fill: rgb("#2B6CB0"))[13.4%]
            #linebreak()
            #text(10pt)[CAGR]
          ]
        ],
      )
    ]
  ]
]

== Top Apps by Segment

=== Women-Focused Leaders

*1. Sweat (Kayla Itsines)*
- "Trusted by millions of women"
- Built by women for women
- Acquired by iFit for *\$400M* (2021)
- 60+ programs, 13,000+ workouts

*2. Noom*
- Psychology-first approach (CBT)
- Human coaching + technology
- Premium pricing (\$209/year)

*3. FitOn*
- Robust free tier
- Celebrity trainers

=== Senior-Focused Leaders

*1. SilverSneakers*
- *15M+ members*
- Free through Medicare Advantage
- Live + on-demand classes
- Community nationwide

== Pricing Benchmarks

#table(
  columns: (2fr, 1fr, 1fr),
  fill: (col, row) => if row == 0 { rgb("#EDF2F7") },
  [*App*], [*Monthly*], [*Annual*],
  [Noom], [\~\$60], [\~\$209],
  [Sweat], [\~\$20], [\~\$120],
  [MyFitnessPal Premium+], [\$24.99], [\$99.99],
  [Peloton Digital], [\$12.99], [\$119.99],
  [Strava], [\$8], [\$60],
  [Apple Fitness+], [\$9.99], [\$79.99],
)

#pagebreak()

// Part 3: Market Gaps
= Market Gaps & Opportunities

== Critical Gaps Identified

#rect(fill: rgb("#FFFAF0"), radius: 4pt)[
  #pad(12pt)[
    #grid(
      columns: (auto, 1fr),
      gutter: 12pt,
      [#text(18pt)[🎯]], [*Menopause/Life-Stage Wellness* \
      50M+ American women in menopause; almost no dedicated apps],
      [#text(18pt)[🌿]], [*Gentle Movement for Seniors* \
      Most "beginner" content still too fast/intense],
      [#text(18pt)[💜]], [*Community Without Competition* \
      Leaderboards dominate; alienate non-competitive users],
      [#text(18pt)[🏥]], [*Medical Condition Customization* \
      "Beginner" ≠ "arthritis" or "hip replacement"],
      [#text(18pt)[💚]], [*Compassionate Engagement* \
      Streak-breaking creates shame spirals],
    )
  ]
]

== The Underserved Insight

#grid(
  columns: (1fr, 1fr),
  gutter: 20pt,
  [
    #rect(fill: rgb("#FED7D7"), radius: 4pt)[
      #pad(12pt)[
        *Market is SATURATED for:*
        - Young, competitive users
        - Athletes seeking optimization
        - People who already exercise
      ]
    ]
  ],
  [
    #rect(fill: rgb("#C6F6D5"), radius: 4pt)[
      #pad(12pt)[
        *Market is UNDERSERVED for:*
        - Women seeking empowerment
        - Seniors seeking independence
        - Anyone with medical conditions
        - Low-tech users
      ]
    ]
  ],
)

#pagebreak()

// Part 4: Focus Group
= Focus Group Simulation

== Methodology

15 AI personas representing target demographics:
- 5 women (ages 25, 35, 45, 55, 65)
- 5 seniors (mixed gender, 60-80)
- 5 senior women (60-80)

== Universal Findings

=== What They ALL Want

#grid(
  columns: (1fr, 1fr),
  gutter: 10pt,
  [1. *No Judgment* — Fear of embarrassment],
  [2. *Appropriate Pacing* — Beginners feel too fast],
  [3. *Community, Not Competition*],
  [4. *Life-Stage Awareness*],
  [5. *Simplicity* — Less is more],
  [6. *Holistic Health* — Beyond exercise],
)

=== Price Sensitivity by Segment

#table(
  columns: (2fr, 1fr, 1fr),
  fill: (col, row) => if row == 0 { rgb("#EDF2F7") },
  [*Segment*], [*Sweet Spot*], [*Maximum*],
  [Women 25-45], [\$10-20/mo], [\$25/mo],
  [Women 45-65], [\$15-25/mo], [\$50/mo],
  [Seniors (comfortable)], [\$15-25/mo], [\$30/mo],
  [Seniors (fixed income)], [\$5-10/mo], [\$15/mo],
  [Via Insurance], [Free], [Free],
)

#pagebreak()

// Part 5: App Concepts
= App Concepts

#rect(fill: rgb("#FFF5F5"), radius: 8pt, stroke: rgb("#FC8181"))[
  #pad(16pt)[
    #text(18pt, weight: "bold")[🌸 Concept A: "Bloom"]
    #v(0.5em)
    *The Life-Stage Fitness App for Women*
    
    #v(1em)
    
    *Target:* Women 35-65, especially perimenopause/menopause
    
    *Proposition:* "Fitness that celebrates every season of womanhood"
    
    *Key Features:*
    - Life Stage Pathways (Busy Mom, Perimenopause, Menopause, Post-Menopause)
    - Body Story Profile (customized to YOUR body's history)
    - Bloom Circles (small support groups, 8-12 women)
    - Compassionate Coaching (no streaks, welcome-back messaging)
    - Age-Diverse Instructors (35-70+)
    
    *Branding:* Soft coral, sage green, warm ivory. Nurturing, sophisticated, empowering.
    
    *Pricing:* \$99.99/year (\$8.33/month equivalent)
  ]
]

#v(1em)

#rect(fill: rgb("#F0FFF4"), radius: 8pt, stroke: rgb("#68D391"))[
  #pad(16pt)[
    #text(18pt, weight: "bold")[🌿 Concept B: "Tend"]
    #v(0.5em)
    *Gentle Movement for the Whole Person*
    
    #v(1em)
    
    *Target:* Adults 50-75 seeking gentle, mindful movement
    
    *Proposition:* "Movement medicine for modern life"
    
    *Key Features:*
    - Movement Garden (visual progress as growing garden)
    - Gentle Content (yoga, chair exercises, tai chi, breath work)
    - Condition-Aware (input health conditions, get safe programs)
    - Simple Mode (one button, extra large text)
    - Care Circle Alerts (family notified of activity)
    
    *Branding:* Soft sage, earth tones. Serene, healing, garden-like.
    
    *Pricing:* \$79.99/year (or free via Medicare partnerships)
  ]
]

#v(1em)

#rect(fill: rgb("#FAF5FF"), radius: 8pt, stroke: rgb("#B794F4"))[
  #pad(16pt)[
    #text(18pt, weight: "bold")[💜 Concept C: "Together"]
    #v(0.5em)
    *Community-First Fitness for Every Body*
    
    #v(1em)
    
    *Target:* Women 40-70 experiencing loneliness/isolation
    
    *Proposition:* "Find your people, find your movement"
    
    *Key Features:*
    - Cohort-Based Journeys (join 6-week programs with matched group)
    - Match Algorithm (paired with compatible members)
    - Daily Touchpoints (morning intentions, celebrations)
    - Local Meetups (optional in-person connections)
    
    *Branding:* Warm purple, soft pink. Welcoming, friendly.
    
    *Pricing:* \$149.99/year (premium for community value)
  ]
]

#pagebreak()

// Part 6: Recommendation
= Strategic Recommendation

#rect(fill: rgb("#EBF8FF"), radius: 8pt, stroke: rgb("#4299E1"))[
  #pad(20pt)[
    #align(center)[
      #text(24pt, weight: "bold")[Primary Recommendation: Build "Bloom" First]
    ]
  ]
]

#v(1em)

== Rationale

+ *Clearest market gap:* Menopause-focused fitness is dramatically underserved
+ *Proven economics:* Premium women's fitness validated (Sweat \$400M acquisition)
+ *Lowest risk:* Subscription model is well-understood
+ *Natural extension:* Same tech DNA as Moonwalk, different audience
+ *Revenue potential:* Women 45-65 have highest willingness to pay
+ *B2B opportunity:* Corporate wellness for female employees

== Phased Approach

#table(
  columns: (auto, 1fr, auto),
  fill: (col, row) => if row == 0 { rgb("#EDF2F7") },
  [*Phase*], [*Action*], [*Revenue Target*],
  [Year 1], [Launch Bloom \
  100K users, 10K paid], [\$1M],
  [Year 2], [Launch Tend \
  Medicare partnerships], [\$5M combined],
  [Year 3], [Consider Together \
  Integrate or standalone], [\$15M combined],
)

== Quick-Win Features (Any Concept)

Implement from Day 1:

#grid(
  columns: (1fr, 1fr),
  gutter: 8pt,
  [☑ No streaks — welcome-back messaging],
  [☑ Large text accessibility option],
  [☑ Chair modifications always available],
  [☑ Instructors ages 35-70+],
  [☑ Under 10 taps to start workout],
  [☑ Compassionate copy throughout],
  [☑ Offline download mode],
  [☑ Family sharing from launch],
)

#pagebreak()

// Closing
#align(center)[
  #v(2in)
  
  #line(length: 30%, stroke: 1pt + rgb("#CBD5E0"))
  
  #v(1em)
  
  #text(14pt, fill: rgb("#718096"))[
    *Moonwalk Fitness Research Report*
    
    Prepared January 2026
    
    #v(2em)
    
    For questions or additional analysis, contact the research team.
  ]
]
