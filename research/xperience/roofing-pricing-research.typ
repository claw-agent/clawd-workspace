#set page(margin: 1in)
#set text(font: "Helvetica Neue", size: 11pt)

#align(center)[
  #text(size: 24pt, weight: "bold")[Roofing Pricing Research]
  #v(0.3em)
  #text(size: 12pt, fill: rgb("#666"))[XPERIENCE Lead Gen Pipeline | February 2026]
]

#v(1em)

= Retail Pricing (Consumer-Facing)

== National Averages

#table(
  columns: (1fr, 1fr),
  stroke: 0.5pt + rgb("#ccc"),
  inset: 8pt,
  [*Metric*], [*Value*],
  [Average cost], [\$9,000 – \$10,000],
  [Typical range], [\$5,727 – \$14,000],
  [Per sq ft], [\$3.75 – \$11 (avg \$4.75)],
  [Per square (100 sq ft)], [\$375 – \$1,100],
  [Labor portion], [40 – 60% of total],
  [Labor per square], [\$150 – \$300],
)

== Pricing by State

#table(
  columns: (1fr, 1fr),
  stroke: 0.5pt + rgb("#ccc"),
  inset: 8pt,
  [*State*], [*Cost Range*],
  [Arizona], [\$10,000 – \$20,000],
  [Arkansas], [\$2,500 – \$9,000],
  [California], [\$12,000 – \$28,000],
  [Colorado], [\$6,300 – \$12,300],
  [Florida], [\$8,000 – \$16,500],
  [Illinois], [\$6,000 – \$13,000],
  [Massachusetts], [\$5,400 – \$10,700],
  [Michigan], [\$6,550 – \$11,900],
  [New Jersey], [\$5,800 – \$10,000],
  [Texas], [\$4,400 – \$16,000],
  [*Utah (est.)*], [*\$6,000 – \$12,000*],
)

#v(0.5em)
#text(size: 9pt, fill: rgb("#666"))[Utah interpolated from Colorado regional data]

== Pricing by Material
#text(size: 10pt, fill: rgb("#666"))[(Based on 2,000 sq ft roof)]

#table(
  columns: (1fr, 1fr),
  stroke: 0.5pt + rgb("#ccc"),
  inset: 8pt,
  [*Material*], [*Cost Range*],
  [Asphalt 3-tab], [\$5,800 – \$10,000],
  [Architectural shingles], [\$8,000 – \$12,700],
  [Metal (standing seam)], [\$13,600 – \$20,400],
  [Tile (concrete)], [\$8,400 – \$22,000],
  [Tile (clay)], [\$13,000 – \$30,000],
  [Slate], [\$5,500 – \$44,000],
  [Wood shake], [\$16,000 – \$27,000],
)

== Pricing by Home Size

#table(
  columns: (1fr, 1fr, 1fr),
  stroke: 0.5pt + rgb("#ccc"),
  inset: 8pt,
  [*Home Size*], [*Roof Area*], [*Cost Range*],
  [1,000 sq ft], [1,200 sq ft], [\$4,500 – \$13,200],
  [1,500 sq ft], [1,800 sq ft], [\$6,750 – \$19,800],
  [2,000 sq ft], [2,400 sq ft], [\$9,000 – \$26,400],
  [2,500 sq ft], [3,000 sq ft], [\$11,250 – \$33,000],
  [3,000 sq ft], [3,600 sq ft], [\$13,500 – \$39,600],
)

#pagebreak()

= Insurance Pricing (Xactimate)

== What is Xactimate?
Industry-standard software used by insurance adjusters to estimate claim payouts. Prices are updated monthly by region based on local material and labor costs.

== Typical Xactimate Line Items
#text(size: 10pt, fill: rgb("#666"))[(Approximate national ranges — actual rates are subscription-locked)]

#table(
  columns: (1.5fr, 1fr),
  stroke: 0.5pt + rgb("#ccc"),
  inset: 8pt,
  [*Line Item*], [*Xactimate Range*],
  [Remove roofing – per square], [\$25 – \$45],
  [30-yr architectural shingle – per square], [\$85 – \$150],
  [Synthetic underlayment – per square], [\$15 – \$25],
  [Drip edge – per linear ft], [\$1.50 – \$3.00],
  [Ridge cap – per linear ft], [\$4 – \$8],
  [Starter strip – per linear ft], [\$2 – \$4],
  [Flashing – per piece], [\$15 – \$40],
  [Labor for shingle install – per square], [\$45 – \$85],
)

== The Insurance vs Retail Gap

#rect(fill: rgb("#f0f7ff"), inset: 12pt, width: 100%)[
  #table(
    columns: (1fr, 1fr),
    stroke: none,
    inset: 6pt,
    [*Insurance (Xactimate) total:*], [~\$250 – \$400 per square],
    [*Retail contractor quote:*], [~\$375 – \$600 per square],
    [*Typical gap:*], [*30 – 50% higher retail*],
  )
]

#v(1em)

= Key Insights for XPERIENCE

#rect(fill: rgb("#f5f5f5"), inset: 12pt, width: 100%)[
  #set text(size: 10.5pt)
  
  *1. Lead Value Estimation*
  
  With roof measurements from Google Solar API, we can estimate job value before first contact:
  - 2,000 sq ft roof × \$4.75/sq ft = ~\$9,500 potential job
  
  *2. Insurance vs Cash Pay*
  
  Different sales approaches based on likely payment method:
  - Storm damage areas → Insurance claim process
  - Aging roofs → Cash/financing conversation
  
  *3. Competitive Pricing*
  
  Understanding the Xactimate baseline helps price competitively while maintaining margin.
  
  *4. Recommended Action*
  
  Get XPERIENCE's actual Xactimate rates for Utah to refine estimates.
]

#v(2em)

#align(center)[
  #text(size: 9pt, fill: rgb("#999"))[
    Sources: Fixr.com, BobVila.com, HomeAdvisor (2026 data)
    
    Prepared for XPERIENCE Roofing pitch meeting
  ]
]
