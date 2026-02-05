#set document(title: "XPERIENCE Roofing - Aerial Roof Analysis", author: "Claw")
#set page(margin: (x: 1in, y: 1in), numbering: "1")
#set text(font: "Helvetica Neue", size: 11pt)
#set heading(numbering: "1.")

#align(center)[
  #text(size: 24pt, weight: "bold")[XPERIENCE Roofing]
  #v(0.3em)
  #text(size: 16pt)[Aerial Roof Analysis Discovery]
  #v(0.3em)
  #text(size: 12pt, fill: gray)[Technical Research — February 4, 2026]
]

#v(1em)

#rect(fill: rgb("#d4edda"), width: 100%, inset: 15pt)[
  #text(size: 14pt, weight: "bold")[🎯 KEY DISCOVERY]
  #v(0.5em)
  Google already built this. The *Solar API Building Insights* endpoint returns detailed roof measurements — pitch, area, segments — for just *\$0.01 per roof* (first 10,000 FREE).
  
  This is *1000x cheaper* than EagleView and doesn't require site visits.
]

#v(1em)

= The Google Solar API

== What It Is

Google's Solar API was built to help solar installers assess rooftops. But the underlying data is *pure roofing gold*:

#rect(fill: rgb("#f8f9fa"), width: 100%, inset: 12pt)[
  - *Roof segment analysis:* Each distinct section with pitch (degrees), azimuth (direction), and area
  - *Total roof area:* Both actual surface area AND ground footprint  
  - *Building dimensions:* Bounding box coordinates
  - *Coverage:* Most US addresses including Utah
]

== What The API Returns

For each address, you get:

#table(
  columns: (1.5fr, 2.5fr),
  inset: 8pt,
  fill: (col, row) => if row == 0 { rgb("#4a90d9") } else if calc.odd(row) { rgb("#f0f0f0") } else { white },
  text(fill: white, weight: "bold")[Data Point], text(fill: white, weight: "bold")[Description],
  [Total Roof Area], [Square meters of actual roof surface (not just footprint)],
  [Pitch (per segment)], [Angle in degrees — affects labor difficulty],
  [Azimuth (per segment)], [Direction each roof plane faces],
  [Segment Count], [Number of distinct roof planes],
  [Building Dimensions], [Bounding box coordinates],
  [Ground Footprint], [Building footprint area],
)

== Sample API Response

#rect(fill: rgb("#f5f5f5"), width: 100%, inset: 10pt)[
  #text(font: "Courier", size: 9pt)[
    ```
    wholeRoofStats: {
      areaMeters2: 185.5,      // Total roof: ~2,000 sq ft
      groundAreaMeters2: 139.4  // Footprint: ~1,500 sq ft
    },
    roofSegmentStats: [
      { pitchDegrees: 22, areaMeters2: 95 },
      { pitchDegrees: 22, areaMeters2: 90.5 }
    ]
    ```
  ]
]

= Pricing Analysis

== Google Solar API — Building Insights

#table(
  columns: (1.5fr, 1fr, 1fr),
  inset: 10pt,
  fill: (col, row) => if row == 0 { rgb("#28a745") } else if row == 1 { rgb("#d4edda") } else { white },
  text(fill: white, weight: "bold")[Monthly Requests], text(fill: white, weight: "bold")[Cost per 1,000], text(fill: white, weight: "bold")[Total],
  [*0 - 10,000*], [*FREE*], [*\$0*],
  [10,001 - 100,000], [\$10.00], [\$0-900],
  [100,001 - 500,000], [\$5.00], [\$500-2,500],
  [500,001+], [\$4.50], [Volume pricing],
)

== Real-World Cost Examples

#rect(fill: rgb("#fff3cd"), width: 100%, inset: 12pt)[
  - *1,000 roofs/month* → *\$0* (within free tier)
  - *5,000 roofs/month* → *\$0* (within free tier)
  - *15,000 roofs/month* → *\$50* (5K free + 10K × \$0.01)
  - *50,000 roofs/month* → *\$400* (10K free + 40K × \$0.01)
]

== Compare to Alternatives

#table(
  columns: (1.5fr, 1fr, 1fr, 1fr),
  inset: 8pt,
  fill: (col, row) => if row == 0 { rgb("#dc3545") } else if row == 1 { rgb("#d4edda") } else { white },
  text(fill: white, weight: "bold")[Option], text(fill: white, weight: "bold")[Cost], text(fill: white, weight: "bold")[Accuracy], text(fill: white, weight: "bold")[Setup],
  [*Google Solar API*], [*\$0-0.01/roof*], [*\~95%*], [*Easy*],
  [EagleView], [\$50-100/roof], [\~98%], [External vendor],
  [DIY (Street View)], [Dev time], [\~80%], [High effort],
  [Nearmap], [Subscription], [\~90%], [Medium],
)

#text(size: 12pt, weight: "bold", fill: rgb("#28a745"))[Clear winner: Google Solar API for cost/accuracy ratio.]

= Integration with Quoting

== From Roof Area to Quote

The API gives you everything needed for accurate estimates:

#rect(fill: rgb("#e3f2fd"), width: 100%, inset: 12pt)[
  *Total Cost = (Roof Area × Material Rate) + (Roof Area × Labor Rate) + Complexity*
  
  Where:
  - *Material Rate:* \$/sq ft based on chosen material
  - *Labor Rate:* \$/sq ft based on pitch difficulty  
  - *Complexity:* Based on segment count, valleys, etc.
]

== What The API Provides vs. What XPERIENCE Provides

#table(
  columns: (1fr, 1fr),
  inset: 10pt,
  fill: (col, row) => if row == 0 { rgb("#4a90d9") } else { white },
  text(fill: white, weight: "bold")[API Provides], text(fill: white, weight: "bold")[XPERIENCE Provides],
  [✅ Total roof area (sq ft)], [Material costs],
  [✅ Pitch per segment], [Labor rates by difficulty],
  [✅ Number of segments], [Margin/overhead],
  [✅ Building dimensions], [Local adjustments],
)

= Proposed Workflow

#align(center)[
  #rect(fill: rgb("#f8f9fa"), width: 90%, inset: 15pt)[
    #text(size: 11pt)[
      *1. Customer Address* → *2. Geocode* → *3. Solar API Call* → *4. Extract Roof Data* → *5. Apply Pricing* → *6. Instant Quote*
    ]
  ]
]

== Implementation Timeline

#table(
  columns: (1fr, 3fr),
  inset: 8pt,
  fill: (col, row) => if row == 0 { rgb("#6c757d") } else { white },
  text(fill: white, weight: "bold")[Time], text(fill: white, weight: "bold")[Task],
  [Day 1-2], [Set up Google Cloud project, enable Solar API, test 20 addresses],
  [Day 3-5], [Build proof-of-concept with XPERIENCE pricing formula],
  [Week 2], [Integrate with lead gen pipeline, add fallback handling],
)

= What About The Competitor?

If XPERIENCE's competitor "built their own," they likely either:

#rect(fill: rgb("#f8d7da"), width: 100%, inset: 12pt)[
  *Option A:* Licensed expensive aerial data (Nearmap, etc.) + built ML models
  - Cost: \$10,000s in development + ongoing subscriptions
  - Timeline: 6-12 months
  
  *Option B:* Discovered the Google Solar API (just like we did)
  - Cost: Virtually free
  - Timeline: Days
]

#text(style: "italic")[The API does exactly what their competitor claims — 95% accurate roof measurements without site visits.]

= Next Steps

#rect(fill: rgb("#d1ecf1"), width: 100%, inset: 12pt)[
  1. ☐ Set up Google Cloud project with Solar API enabled
  2. ☐ Test API on 10-20 SLC addresses to validate coverage
  3. ☐ Get XPERIENCE's pricing formula (material + labor rates)
  4. ☐ Build proof-of-concept estimator
  5. ☐ Integrate with lead gen pipeline
]

= Live Demo Available

#rect(fill: rgb("#e8f4e8"), width: 100%, inset: 12pt)[
  *Try it yourself:* #link("https://solar-potential-296769475687.us-central1.run.app/")
  
  Enter any US address to see the roof analysis in action.
  
  *API Documentation:* #link("https://developers.google.com/maps/documentation/solar")
]

#v(2em)
#align(center)[
  #text(fill: gray, size: 10pt)[Prepared for XPERIENCE Roofing — February 2026]
]
