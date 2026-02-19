// XPERIENCE Partnership Negotiation — One-Pager
#set page(paper: "us-letter", margin: (x: 48pt, top: 40pt, bottom: 36pt))
#set text(font: "Helvetica Neue", size: 10pt)

#align(center)[
  #text(size: 18pt, weight: "bold")[XPERIENCE Partnership — Meeting Prep]
  #v(2pt)
  #text(size: 10pt, fill: luma(120))[February 19, 2026 · Confidential]
]

#v(12pt)
#line(length: 100%, stroke: 0.5pt + luma(200))
#v(8pt)

== First Question to Answer

#box(fill: rgb("#FFF3E0"), radius: 6pt, inset: 12pt, width: 100%)[
  #text(weight: "bold")["When you say partner, what entity am I a partner in?"]
  #v(4pt)
  Everything below depends on this answer. Existing company? New growth entity? Both?
]

#v(10pt)

== Base Salary

#table(
  columns: (1fr, 1fr, 1fr),
  inset: 8pt,
  align: center,
  fill: (_, row) => if row == 0 { luma(230) },
  [*Floor*], [*Target*], [*Stretch*],
  [\$140K], [*\$160K*], [\$180K],
)

At \$20M revenue, CTO running all tech = \$150-180K range for SLC. Don't go below \$140K.

#v(10pt)

== Equity

#table(
  columns: (auto, 1fr, 1fr, 1fr),
  inset: 8pt,
  align: (left, center, center, center),
  fill: (_, row) => if row == 0 { luma(230) },
  [*Scenario*], [*Floor*], [*Target*], [*Stretch*],
  [Whole company], [7%], [*10%*], [12%],
  [Growth entity only], [15%], [*20%*], [25%],
)

#box(fill: rgb("#E8F5E9"), radius: 6pt, inset: 10pt, width: 100%)[
  #text(weight: "bold")[Best outcome:] Equity in the whole company (Scenario C). Your tech powers everything — storm monitoring, pricing, lead gen, CRM, reviews. It doesn't split between old and new. Your stake should capture all value.
]

#v(4pt)

#box(fill: rgb("#FFEBEE"), radius: 6pt, inset: 10pt, width: 100%)[
  #text(weight: "bold")[Watch out:] Growth-entity-only equity could be a big number in something worth nothing yet. If they go this route, push for higher % and/or a piece of existing revenue too.
]

#v(10pt)

== Vesting

Standard: *4 years, 1-year cliff.* Protects both sides. Push for 3-year if possible.

#v(10pt)

== Key Questions to Ask

#set enum(numbering: "1.")
+ What's the expansion plan? (New markets, services, acquisitions?)
+ Is there an operating agreement draft? (If no — flag it. Partnership without paperwork = handshake.)
+ What does a buyout look like if either side wants out in 3-5 years?
+ How are profits distributed? (Salary only, or distributions on top?)
+ Who else has equity? What's the current cap table?

#v(10pt)

== Your Leverage (Don't Say This — Just Know It)

#box(fill: luma(245), radius: 6pt, inset: 10pt, width: 100%)[
- Built 8 integrated systems they depend on (storm, pricing, lead gen, CRM, reviews, speed-to-lead, site gen, journey mapping)
- AI/automation stack is their competitive moat — degrades without you
- Not replaceable with a normal hire — AI + roofing ops + full-stack doesn't exist in SLC
- Future revenue drivers (3D landscaping, SEO powerstack) only you can build
- The expansion they're planning likely depends on the tech infrastructure you created
]

#v(10pt)

== Non-Negotiables

#box(fill: rgb("#FFF9C4"), radius: 6pt, inset: 10pt, width: 100%)[
- Get everything in writing — operating agreement, not a handshake
- Lawyer reviews before you sign (budget \$2K, worth every penny)
- Clear exit terms defined upfront
- Base salary + equity, not equity-only
- Vesting schedule protects you if things change
]

#v(1fr)
#align(center)[
  #text(size: 8pt, fill: luma(160))[For your eyes only. Don't leave this on the table.]
]
