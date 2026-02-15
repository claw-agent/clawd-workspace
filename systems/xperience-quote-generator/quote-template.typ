// XPERIENCE Roofing — Customer Quote Template
// Usage: typst compile quote-template.typ output.pdf --input customer_name="John Smith" ...

#let primary = rgb("#1a1a2e")
#let accent = rgb("#e94560")
#let light-bg = rgb("#f8f9fa")
#let muted = rgb("#666666")
#let border-color = rgb("#e0e0e0")

// Input parameters (passed via --input or defaults)
#let customer_name = sys.inputs.at("customer_name", default: "Homeowner")
#let customer_address = sys.inputs.at("customer_address", default: "")
#let customer_phone = sys.inputs.at("customer_phone", default: "")
#let customer_email = sys.inputs.at("customer_email", default: "")
#let quote_date = sys.inputs.at("quote_date", default: datetime.today().display("[month repr:long] [day], [year]"))
#let quote_number = sys.inputs.at("quote_number", default: "XR-" + datetime.today().display("[year][month][day]") + "-001")
#let valid_days = sys.inputs.at("valid_days", default: "30")

// Job details
#let roof_type = sys.inputs.at("roof_type", default: "Asphalt Shingle")
#let roof_sqft = sys.inputs.at("roof_sqft", default: "2,000")
#let stories = sys.inputs.at("stories", default: "1")
#let pitch = sys.inputs.at("pitch", default: "6/12")

// Line items (pipe-separated: "description|qty|unit_price|total")
#let line_items_raw = sys.inputs.at("line_items", default: "Tear-off existing roof|1|2500|2500||30-Year Architectural Shingles (CertainTeed)|20 sq|185|3700||Synthetic Underlayment (GAF FeltBuster)|20 sq|45|900||Ridge Vent Installation|1|650|650||Flashing & Drip Edge|1|800|800||Cleanup & Haul-Away|1|500|500")
#let subtotal = sys.inputs.at("subtotal", default: "9,050")
#let insurance_note = sys.inputs.at("insurance_note", default: "")
#let total = sys.inputs.at("total", default: "9,050")
#let deposit = sys.inputs.at("deposit", default: "")
#let notes = sys.inputs.at("notes", default: "")

// Parse line items
#let items = line_items_raw.split("||").map(item => {
  let parts = item.split("|")
  (
    desc: parts.at(0, default: ""),
    qty: parts.at(1, default: ""),
    unit: parts.at(2, default: ""),
    total: parts.at(3, default: ""),
  )
})

#set page(
  paper: "us-letter",
  margin: (top: 0.6in, bottom: 1in, left: 0.75in, right: 0.75in),
  footer: [
    #line(length: 100%, stroke: 0.5pt + border-color)
    #v(4pt)
    #text(size: 8pt, fill: muted)[
      XPERIENCE Roofing & Restoration · Licensed & Insured · Salt Lake City, UT
      #h(1fr) Page #context counter(page).display("1 of 1", both: true)
    ]
  ]
)

#set text(font: "Helvetica Neue", size: 10.5pt, fill: rgb("#333"))
#set par(justify: true)

// === HEADER ===
#rect(fill: primary, width: 100%, inset: (x: 20pt, y: 16pt), radius: 4pt)[
  #grid(
    columns: (1fr, auto),
    align: (left + horizon, right + horizon),
    [
      #text(fill: white, size: 22pt, weight: "bold")[XPERIENCE]
      #text(fill: white.darken(15%), size: 22pt, weight: "light")[ ROOFING]
      #v(2pt)
      #text(fill: white.darken(30%), size: 9pt, tracking: 0.1em)[ROOFING · RESTORATION · STORM DAMAGE]
    ],
    [
      #text(fill: white, size: 11pt, weight: "bold")[ESTIMATE]
      #v(2pt)
      #text(fill: white.darken(20%), size: 9pt)[\##quote_number]
    ]
  )
]

#v(16pt)

// === CUSTOMER + QUOTE INFO ===
#grid(
  columns: (1fr, 1fr),
  gutter: 20pt,
  [
    #text(size: 8pt, fill: accent, weight: "bold", tracking: 0.08em)[PREPARED FOR]
    #v(4pt)
    #text(weight: "bold", size: 12pt)[#customer_name]
    #v(2pt)
    #if customer_address != "" [#text(size: 10pt)[#customer_address] #v(1pt)]
    #if customer_phone != "" [#text(size: 10pt)[📞 #customer_phone] #v(1pt)]
    #if customer_email != "" [#text(size: 10pt)[✉️ #customer_email]]
  ],
  [
    #text(size: 8pt, fill: accent, weight: "bold", tracking: 0.08em)[QUOTE DETAILS]
    #v(4pt)
    #grid(
      columns: (auto, 1fr),
      gutter: (8pt, 3pt),
      text(fill: muted, size: 9.5pt)[Date:], text(size: 10pt)[#quote_date],
      text(fill: muted, size: 9.5pt)[Valid for:], text(size: 10pt)[#valid_days days],
      text(fill: muted, size: 9.5pt)[Roof Type:], text(size: 10pt)[#roof_type],
      text(fill: muted, size: 9.5pt)[Approx. Area:], text(size: 10pt)[#roof_sqft sq ft],
      text(fill: muted, size: 9.5pt)[Stories:], text(size: 10pt)[#stories],
      text(fill: muted, size: 9.5pt)[Pitch:], text(size: 10pt)[#pitch],
    )
  ]
)

#v(16pt)
#line(length: 100%, stroke: 0.5pt + border-color)
#v(12pt)

// === SCOPE OF WORK ===
#text(size: 8pt, fill: accent, weight: "bold", tracking: 0.08em)[SCOPE OF WORK]
#v(8pt)

#table(
  columns: (1fr, auto, auto, auto),
  stroke: none,
  inset: (x: 8pt, y: 6pt),
  fill: (_, row) => if row == 0 { primary } else if calc.rem(row, 2) == 0 { light-bg } else { white },
  align: (left, center, right, right),
  // Header
  text(fill: white, size: 9pt, weight: "bold")[Description],
  text(fill: white, size: 9pt, weight: "bold")[Qty],
  text(fill: white, size: 9pt, weight: "bold")[Unit Price],
  text(fill: white, size: 9pt, weight: "bold")[Amount],
  // Items
  ..items.map(item => (
    text(size: 10pt)[#item.desc],
    text(size: 10pt, fill: muted)[#item.qty],
    text(size: 10pt)[\$#item.unit],
    text(size: 10pt, weight: "bold")[\$#item.total],
  )).flatten()
)

#v(8pt)

// === TOTALS ===
#align(right)[
  #rect(fill: light-bg, inset: 12pt, radius: 4pt, width: 45%)[
    #grid(
      columns: (1fr, auto),
      gutter: (0pt, 4pt),
      text(size: 10pt)[Subtotal:], text(size: 10pt, weight: "bold")[\$#subtotal],
      ..if insurance_note != "" {
        (text(size: 10pt, fill: accent)[Insurance Est.:], text(size: 10pt, fill: accent, weight: "bold")[#insurance_note])
      } else { () },
    )
    #v(4pt)
    #line(length: 100%, stroke: 0.5pt + border-color)
    #v(4pt)
    #grid(
      columns: (1fr, auto),
      text(size: 13pt, weight: "bold")[Total:],
      text(size: 13pt, weight: "bold", fill: primary)[\$#total],
    )
    #if deposit != "" [
      #v(4pt)
      #text(size: 9pt, fill: muted)[Deposit required: \$#deposit]
    ]
  ]
]

#v(16pt)

// === WHAT'S INCLUDED ===
#text(size: 8pt, fill: accent, weight: "bold", tracking: 0.08em)[WHAT'S INCLUDED]
#v(6pt)
#rect(fill: light-bg, width: 100%, inset: 12pt, radius: 4pt)[
  #grid(
    columns: (1fr, 1fr),
    gutter: 4pt,
    [✅ Full tear-off & disposal],
    [✅ Manufacturer warranty],
    [✅ Licensed & insured crew],
    [✅ Workmanship guarantee],
    [✅ Building permit & inspection],
    [✅ Final walkthrough],
    [✅ Before/after documentation],
    [✅ Insurance claim assistance],
  )
]

#v(12pt)

// === INSURANCE NOTE ===
#if insurance_note != "" [
  #rect(fill: rgb("#fff3cd"), width: 100%, inset: 12pt, radius: 4pt, stroke: 0.5pt + rgb("#ffc107"))[
    #text(weight: "bold", size: 10pt)[⚡ Insurance Claim Note]
    #v(4pt)
    #text(size: 9.5pt)[If your roof qualifies for an insurance claim, your out-of-pocket cost may be limited to your deductible. We handle the entire claims process — adjuster meetings, supplementals, and paperwork — at no extra charge.]
  ]
  #v(12pt)
]

// === NOTES ===
#if notes != "" [
  #text(size: 8pt, fill: accent, weight: "bold", tracking: 0.08em)[ADDITIONAL NOTES]
  #v(4pt)
  #text(size: 10pt)[#notes]
  #v(12pt)
]

// === SIGNATURE ===
#v(1fr)

#grid(
  columns: (1fr, 20pt, 1fr),
  [
    #text(size: 8pt, fill: muted, tracking: 0.08em)[CUSTOMER APPROVAL]
    #v(24pt)
    #line(length: 100%, stroke: 0.5pt + rgb("#999"))
    #v(2pt)
    #text(size: 9pt, fill: muted)[Signature / Date]
  ],
  [],
  [
    #text(size: 8pt, fill: muted, tracking: 0.08em)[XPERIENCE ROOFING]
    #v(24pt)
    #line(length: 100%, stroke: 0.5pt + rgb("#999"))
    #v(2pt)
    #text(size: 9pt, fill: muted)[Authorized Representative / Date]
  ],
)
