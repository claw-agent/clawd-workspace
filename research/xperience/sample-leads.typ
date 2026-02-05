#set page(margin: 0.5in, paper: "us-letter")
#set text(font: "Helvetica", size: 9pt)

#align(center)[
  #text(size: 18pt, weight: "bold")[XPERIENCE Roofing — Sample Leads]
  #v(0.3em)
  #text(size: 11pt, fill: gray)[Salt Lake County • Generated 2026-02-04]
]

#v(1em)

#text(size: 10pt, weight: "bold")[Pipeline Summary]

#table(
  columns: (1fr, 1fr, 1fr),
  stroke: none,
  [*Data Source*], [*What We Get*], [*Cost*],
  [Utah Open SGID], [Address, Year Built, Value, Sqft], [FREE],
  [SL County Assessor], [Owner Name], [FREE],
  [Google Solar API], [Roof Area, Pitch, Segments], [FREE (10K/mo)],
)

#v(1em)

#text(size: 10pt, weight: "bold")[Sample Leads — 20 Homes (20+ Years Old, $340K-$800K)]

#v(0.5em)

#table(
  columns: (2.2fr, 1.2fr, 0.5fr, 0.7fr, 0.7fr, 1.8fr, 0.7fr, 0.5fr),
  stroke: 0.5pt + gray,
  fill: (col, row) => if row == 0 { rgb("#2563eb") } else if calc.odd(row) { rgb("#f3f4f6") } else { white },
  align: (left, left, center, right, right, left, right, center),
  
  [#text(fill: white, weight: "bold")[Address]], 
  [#text(fill: white, weight: "bold")[City]], 
  [#text(fill: white, weight: "bold")[Yr]], 
  [#text(fill: white, weight: "bold")[Home SF]], 
  [#text(fill: white, weight: "bold")[Value]], 
  [#text(fill: white, weight: "bold")[Owner]], 
  [#text(fill: white, weight: "bold")[Roof SF]], 
  [#text(fill: white, weight: "bold")[Pitch]],

  [591 E JENE DR], [Sandy], [1973], [3,172], [\$643K], [Lon & Karen Leonard], [3,006], [20°],
  [3170 W WESTCOVE DR], [West Valley], [1985], [2,080], [\$343K], [David Florimon], [1,377], [17°],
  [699 W CLOVER CREST DR], [Murray], [1976], [2,900], [\$593K], [Merrill Weight Trust], [2,125], [20°],
  [10866 S SHADY DELL DR], [Sandy], [1975], [2,010], [\$504K], [N Alan Carlson], [1,968], [17°],
  [5245 S QUEENSWOOD DR], [Taylorsville], [1977], [2,094], [\$439K], [Stephen Fritz & Maria], [1,577], [19°],
  [6407 S ANDES WAY], [Taylorsville], [2003], [2,774], [\$638K], [Van T Pham], [2,653], [34°],
  [6031 S 6105 W], [Kearns], [1994], [2,037], [\$468K], [Jackeline Heredia], [469], [19°],
  [9225 S TONI LEE CIR], [West Jordan], [1978], [3,225], [\$596K], [Leitch Family Trust], [2,952], [19°],
  [5760 W KINTAIL CT], [West Valley], [1996], [1,720], [\$368K], [Riley Richards], [817], [23°],
  [3497 W 6975 S], [West Jordan], [1975], [1,900], [\$444K], [Wendy Millet & Rondi], [1,704], [19°],
  [4317 S STAFFORD WAY], [West Valley], [1976], [1,660], [\$425K], [Ashok Shrestha], [1,511], [20°],
  [3246 W 5720 S], [Taylorsville], [1986], [1,882], [\$449K], [Gregory Steele], [1,814], [19°],
  [5349 W DAFFODIL AVE], [West Jordan], [1980], [1,990], [\$456K], [Linzy Skousen], [1,222], [19°],
  [7579 S BRIDGEWATER CIR], [Cottonwood], [1983], [2,887], [\$794K], [Rocky Martin Olsen], [1,971], [13°],
  [915 E DIANA HILLS WAY], [Sandy], [1988], [1,647], [\$531K], [Tschaggeny Trust], [1,253], [23°],
  [2183 W 12360 S], [Riverton], [1984], [2,438], [\$521K], [David & Patricia Washburn], [2,769], [16°],
  [3653 W ANGUS DR], [South Jordan], [1992], [3,612], [\$704K], [McWilliams Properties], [3,960], [30°],
  [9642 S 1670 W], [South Jordan], [1995], [2,190], [\$571K], [Thomas & Martha DeLosso], [2,008], [27°],
  [3695 S LONESTAR CIR], [Magna], [1983], [1,838], [\$394K], [Ana & Setefano Maile], [1,186], [18°],
  [10361 S 360 E], [Sandy], [1978], [1,800], [\$432K], [Frampton Family Trust], [2,632], [15°],
)

#v(1.5em)

#text(size: 10pt, weight: "bold")[Key Metrics]

#table(
  columns: (1fr, 1fr, 1fr, 1fr),
  stroke: none,
  [*Avg Home Age*], [*Avg Home Value*], [*Avg Roof Size*], [*Avg Pitch*],
  [40 years], [\$514K], [1,951 sq ft], [20°],
)

#v(1em)

#text(size: 10pt, weight: "bold")[Next Step: Add Contact Info]

To complete outreach-ready leads, add phone/email via:
- *PropStream Pro* \$149/mo — includes free skip tracing + DNC flagging
- *BatchData* \$500+/mo — full API for automation at scale

#v(1em)

#align(center)[
  #text(size: 8pt, fill: gray)[
    Data sources: Utah SGID (parcels) • Salt Lake County Assessor (owners) • Google Solar API (roof measurements)
  ]
]
