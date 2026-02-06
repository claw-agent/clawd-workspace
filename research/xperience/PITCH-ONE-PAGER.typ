#set page(
  paper: "us-letter",
  margin: (x: 0.6in, y: 0.5in),
)
#set text(font: "Helvetica Neue", size: 10pt)

// Header
#align(center)[
  #text(size: 22pt, weight: "bold")[AI-Powered Lead Generation for XPERIENCE Roofing]
  #v(2pt)
  #text(size: 11pt, fill: rgb("#666"))[Turn Utah's public data into qualified roofing leads — automatically]
]

#v(12pt)
#line(length: 100%, stroke: 0.5pt + rgb("#ddd"))
#v(8pt)

// The Problem → Solution
#grid(
  columns: (1fr, 1fr),
  gutter: 20pt,
  [
    #text(weight: "bold", fill: rgb("#c00"))[THE PROBLEM]
    #v(4pt)
    - Door-to-door is expensive & slow
    - Generic lead lists waste time on wrong homes
    - EagleView roof reports cost \$50-100 *each*
    - No way to prioritize by roof age or condition
  ],
  [
    #text(weight: "bold", fill: rgb("#0a0"))[THE SOLUTION]
    #v(4pt)
    - Target homes with 15+ year old roofs automatically
    - Get roof measurements & pitch *free* via Google API
    - Generate instant quotes without truck rolls
    - Focus sales team on pre-qualified leads only
  ]
)

#v(12pt)

// How It Works
#rect(fill: rgb("#f5f5f5"), inset: 12pt, radius: 4pt, width: 100%)[
  #text(weight: "bold", size: 12pt)[HOW IT WORKS]
  #v(8pt)
  #grid(
    columns: (1fr, 0.3fr, 1fr, 0.3fr, 1fr),
    align: center,
    [
      #rect(fill: rgb("#1a73e8"), inset: 8pt, radius: 4pt)[
        #text(fill: white, weight: "bold")[1. TARGET]
      ]
      #v(4pt)
      #text(size: 9pt)[Query Utah Open SGID #linebreak() 271K homes 15+ yrs #linebreak() in Salt Lake alone]
    ],
    [→],
    [
      #rect(fill: rgb("#34a853"), inset: 8pt, radius: 4pt)[
        #text(fill: white, weight: "bold")[2. ANALYZE]
      ]
      #v(4pt)
      #text(size: 9pt)[Google Solar API #linebreak() Roof sqft, pitch, segments #linebreak() *FREE* (10K/month)]
    ],
    [→],
    [
      #rect(fill: rgb("#ea4335"), inset: 8pt, radius: 4pt)[
        #text(fill: white, weight: "bold")[3. QUOTE]
      ]
      #v(4pt)
      #text(size: 9pt)[Auto-generate estimate #linebreak() using your pricing #linebreak() Ready for outreach]
    ],
  )
]

#v(12pt)

// Proof Points
#text(weight: "bold", size: 12pt)[VALIDATED & WORKING]
#v(6pt)

#grid(
  columns: (1fr, 1fr, 1fr),
  gutter: 12pt,
  rect(stroke: 1pt + rgb("#ddd"), inset: 10pt, radius: 4pt)[
    #align(center)[
      #text(size: 24pt, weight: "bold", fill: rgb("#1a73e8"))[271,000+]
      #v(2pt)
      #text(size: 9pt)[Homes 15+ years old #linebreak() in Salt Lake County alone #linebreak() *Free public data*]
    ]
  ],
  rect(stroke: 1pt + rgb("#ddd"), inset: 10pt, radius: 4pt)[
    #align(center)[
      #text(size: 24pt, weight: "bold", fill: rgb("#34a853"))[8/8]
      #v(2pt)
      #text(size: 9pt)[SLC addresses tested #linebreak() Google Solar API works #linebreak() *Validated Feb 5, 2026*]
    ]
  ],
  rect(stroke: 1pt + rgb("#ddd"), inset: 10pt, radius: 4pt)[
    #align(center)[
      #text(size: 24pt, weight: "bold", fill: rgb("#ea4335"))[\$0.01]
      #v(2pt)
      #text(size: 9pt)[Cost per roof analysis #linebreak() vs \$50-100 for EagleView #linebreak() *1000x cheaper*]
    ]
  ],
)

#v(12pt)

// Sample Output
#text(weight: "bold", size: 12pt)[SAMPLE LEAD CARD]
#v(4pt)

#rect(fill: rgb("#fafafa"), stroke: 1pt + rgb("#ddd"), inset: 10pt, radius: 4pt)[
  #grid(
    columns: (1.2fr, 1fr),
    gutter: 16pt,
    [
      #text(weight: "bold")[📍 123 Example St, Sandy UT 84092]
      #v(4pt)
      #grid(
        columns: (1fr, 1fr),
        row-gutter: 4pt,
        [*Built:* 2008 (17 years)], [*Owner:* John Smith],
        [*Roof Area:* 1,881 sqft], [*Squares:* 18.8],
        [*Pitch:* 18.4° (steep)], [*Multiplier:* 1.2x],
      )
    ],
    [
      #rect(fill: rgb("#fff3cd"), inset: 8pt, radius: 4pt)[
        #text(weight: "bold")[INSTANT ESTIMATE]
        #v(4pt)
        Base: \$X/sq × 18.8 sq\
        Pitch adj: × 1.2\
        #line(length: 100%, stroke: 0.5pt)
        #text(weight: "bold", size: 11pt)[Est: \$X,XXX - \$XX,XXX]
        #v(2pt)
        #text(size: 8pt, fill: rgb("#856404"))[*Need your pricing formula*]
      ]
    ]
  )
]

#v(12pt)

// Economics
#grid(
  columns: (1fr, 1fr),
  gutter: 16pt,
  [
    #text(weight: "bold", size: 11pt)[MONTHLY COSTS (1,000 leads)]
    #v(4pt)
    #table(
      columns: (2fr, 1fr),
      stroke: none,
      inset: 4pt,
      [Parcel data (Utah SGID)], [*FREE*],
      [Roof analysis (Google API)], [*FREE*],
      [Skip tracing (~\$0.20/lead)], [\$200],
      [Email automation], [\$100-300],
      table.hline(),
      [*Total*], [*\$300-500/mo*],
    )
  ],
  [
    #text(weight: "bold", size: 11pt)[ROI MATH]
    #v(4pt)
    #text(size: 9pt)[
      1,000 leads/month\
      → 2% response rate = 20 conversations\
      → 25% close rate = *5 new jobs*\
      \
      At \$8,000 avg job value:\
      *\$40,000 revenue* from \$500 spend\
      \
      #text(weight: "bold", fill: rgb("#0a0"))[= 80x ROI]
    ]
  ]
)

#v(8pt)
#line(length: 100%, stroke: 0.5pt + rgb("#ddd"))
#v(6pt)

// CTA
#align(center)[
  #text(weight: "bold", size: 11pt)[NEXT STEP: Share your per-square pricing formula → We build your custom estimator]
  #v(4pt)
  #text(size: 9pt, fill: rgb("#666"))[Pipeline can be operational within 1 week of pricing integration]
]
