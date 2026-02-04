#set page(
  margin: (x: 1.2in, y: 1in),
  header: context {
    if counter(page).get().first() > 1 [
      #set text(size: 9pt, fill: rgb("#666"))
      MOVE App — Refund Feasibility Report
      #h(1fr)
      #counter(page).display()
    ]
  }
)
#set text(font: "Helvetica Neue", size: 10.5pt, fill: rgb("#333"))
#set par(leading: 0.7em, justify: true)
#set heading(numbering: none)
#show heading.where(level: 1): it => {
  v(1.2em)
  text(size: 16pt, weight: "bold", fill: rgb("#1a1a1a"))[#it.body]
  v(0.4em)
  line(length: 100%, stroke: 0.5pt + rgb("#ddd"))
  v(0.6em)
}
#show heading.where(level: 2): it => {
  v(0.8em)
  text(size: 12pt, weight: "bold", fill: rgb("#333"))[#it.body]
  v(0.3em)
}

// Cover Page
#v(2fr)
#align(center)[
  #box(fill: rgb("#f8f8f8"), inset: 40pt, radius: 8pt)[
    #text(size: 14pt, fill: rgb("#666"), tracking: 0.1em)[CONFIDENTIAL]
    #v(1em)
    #text(size: 36pt, weight: "bold", fill: rgb("#1a1a1a"))[MOVE]
    #v(0.3em)
    #text(size: 18pt, fill: rgb("#444"))[Refund Mechanic Feasibility Report]
    #v(2em)
    #text(size: 11pt, fill: rgb("#888"))[Technical & Legal Analysis]
    #v(0.5em)
    #text(size: 11pt, fill: rgb("#888"))[January 30, 2026]
  ]
]
#v(3fr)
#align(center)[
  #text(size: 9pt, fill: rgb("#aaa"))[Prepared by Research Team]
]
#pagebreak()

// Executive Summary
#v(1em)
= Executive Summary

#box(fill: rgb("#e8f5e9"), inset: 16pt, radius: 6pt, width: 100%)[
  #text(weight: "bold", size: 12pt)[Bottom Line: The refund mechanic IS feasible.]
  
  #v(0.5em)
  
  Using *Stripe direct payments*, MOVE can offer a "pay \$12.99, get 90% back when you hit goals" model with minimal legal risk and full technical support. Apple In-App Purchases cannot support this model.
]

#v(1.5em)

== Quick Assessment

#table(
  columns: (1fr, 0.8fr, 2.5fr),
  stroke: none,
  inset: (x: 12pt, y: 10pt),
  fill: (col, row) => if row == 0 { rgb("#f5f5f5") } else if calc.odd(row) { rgb("#fafafa") } else { white },
  [*Area*], [*Status*], [*Summary*],
  [Stripe Payments], [#text(fill: rgb("#2e7d32"))[✓ Go]], [Partial refunds fully supported; no chargeback impact],
  [Apple IAP], [#text(fill: rgb("#c62828"))[✗ No]], [Developers cannot issue refunds; Apple controls all],
  [MSB Licensing], [#text(fill: rgb("#2e7d32"))[✓ Clear]], [Not money transmission — refund to same party],
  [State MTL Laws], [#text(fill: rgb("#2e7d32"))[✓ Clear]], [Seller's exemption applies in all 50 states],
  [Fund Custody], [#text(fill: rgb("#2e7d32"))[✓ Clear]], [No escrow obligations; standard revenue model],
)

#v(1em)

== The Numbers

#grid(
  columns: (1fr, 1fr, 1fr),
  gutter: 16pt,
  box(fill: rgb("#fff8e1"), inset: 16pt, radius: 6pt)[
    #align(center)[
      #text(size: 24pt, weight: "bold", fill: rgb("#f57c00"))[\$12.99]
      #v(0.2em)
      #text(size: 10pt, fill: rgb("#666"))[Monthly Premium]
    ]
  ],
  box(fill: rgb("#e3f2fd"), inset: 16pt, radius: 6pt)[
    #align(center)[
      #text(size: 24pt, weight: "bold", fill: rgb("#1976d2"))[\$11.69]
      #v(0.2em)
      #text(size: 10pt, fill: rgb("#666"))[Refund (90%)]
    ]
  ],
  box(fill: rgb("#e8f5e9"), inset: 16pt, radius: 6pt)[
    #align(center)[
      #text(size: 24pt, weight: "bold", fill: rgb("#388e3c"))[\$1.30]
      #v(0.2em)
      #text(size: 10pt, fill: rgb("#666"))[Net (if goals hit)]
    ]
  ],
)

#pagebreak()

= Technical Analysis

== Stripe: Recommended Approach

Stripe's refund API fully supports the MOVE model with no complications.

#box(fill: rgb("#f5f5f5"), inset: 14pt, radius: 4pt, width: 100%)[
  #text(weight: "bold")[Key Findings:]
  
  - *Partial refunds* are natively supported — refund any amount up to original charge
  - *Refunds do NOT affect chargeback ratios* — this was the primary concern
  - *No special approval needed* — this is standard "money-back guarantee" mechanics
  - *Processing time:* 5-10 business days to appear on customer statement
]

#v(1em)

=== Chargeback Risk: None

This is critical: *Refunds are excluded from dispute ratio calculations.*

#table(
  columns: (1.2fr, 1fr, 2fr),
  stroke: 0.5pt + rgb("#e0e0e0"),
  inset: 10pt,
  fill: (col, row) => if row == 0 { rgb("#f5f5f5") } else { white },
  [*Program*], [*Threshold*], [*MOVE Impact*],
  [Visa VAMP], [0.5% disputes], [Refunds excluded — no impact],
  [Mastercard ECM], [1.0% + 100/mo], [Refunds excluded — no impact],
  [Your refund volume], [~90% of successful users], [Zero effect on standing],
)

#v(0.5em)
#text(size: 9pt, fill: rgb("#666"), style: "italic")[Note: Generous refund policies typically *reduce* chargebacks by keeping customers satisfied.]

#v(1.5em)

== Apple IAP: Not Viable

#box(fill: rgb("#ffebee"), inset: 14pt, radius: 4pt, width: 100%)[
  #text(weight: "bold", fill: rgb("#c62828"))[Critical Limitation:]
  
  Developers *cannot* programmatically issue refunds through Apple's APIs. The `beginRefundRequest()` API only lets users *request* refunds — Apple makes all approval decisions.
]

#v(1em)

=== Financial Problem

Even if Apple allowed refunds, the math doesn't work:

#table(
  columns: (1fr, 1fr, 1fr),
  stroke: 0.5pt + rgb("#e0e0e0"),
  inset: 10pt,
  fill: (col, row) => if row == 0 { rgb("#f5f5f5") } else { white },
  [*Item*], [*Year 1*], [*Year 2+*],
  [User pays], [\$12.99], [\$12.99],
  [Apple takes], [\$3.90 (30%)], [\$1.95 (15%)],
  [MOVE receives], [\$9.09], [\$11.04],
  [Refund owed], [\$11.69], [\$11.69],
  [*Net position*], [#text(fill: rgb("#c62828"))[−\$2.60]], [#text(fill: rgb("#c62828"))[−\$0.65]],
)

#v(0.5em)
#text(size: 10pt, style: "italic")[Recommendation: Use web-based Stripe checkout to bypass Apple's payment system entirely.]

#pagebreak()

= Legal Analysis

== Money Services Business (MSB): Low Risk

#box(fill: rgb("#f5f5f5"), inset: 14pt, radius: 4pt, width: 100%)[
  *Why MOVE is NOT a Money Transmitter:*
  
  Money transmission requires transferring funds from Person A to Person B.
  
  MOVE refunds money *to the same person who paid* — this is a conditional rebate, not transmission.
]

#v(1em)

=== Legal Basis

#table(
  columns: (1fr, 2fr),
  stroke: 0.5pt + rgb("#e0e0e0"),
  inset: 10pt,
  fill: (col, row) => if row == 0 { rgb("#f5f5f5") } else { white },
  [*Regulation*], [*How It Applies*],
  [31 CFR § 1010.100(ff)(5)], [Requires transmission "to another person" — same-party refunds don't qualify],
  ["Integral to services" exemption], [Fund movements integral to providing services are explicitly exempt],
  [Precedent], [Cashback cards, rebates, gym refunds all work identically without MSB licensing],
)

#v(1.5em)

== State Money Transmitter Laws: Low Risk

#table(
  columns: (1fr, 0.8fr, 2fr),
  stroke: 0.5pt + rgb("#e0e0e0"),
  inset: 10pt,
  fill: (col, row) => if row == 0 { rgb("#f5f5f5") } else { white },
  [*Jurisdiction*], [*Risk*], [*Notes*],
  [Federal (FinCEN)], [#text(fill: rgb("#2e7d32"))[Low]], [No third-party transfer],
  [New York], [#text(fill: rgb("#ff9800"))[Med-Low]], [Aggressive regulator, but logic applies],
  [California], [#text(fill: rgb("#2e7d32"))[Low]], [Clear seller's exemption (§ 2010)],
  [Texas], [#text(fill: rgb("#2e7d32"))[Low]], [Requires "to another person"],
  [Florida], [#text(fill: rgb("#2e7d32"))[Low]], [Requires intermediary function],
  [Other states], [#text(fill: rgb("#2e7d32"))[Low]], [Standard commercial refund],
)

#v(1em)

== Fund Custody: No Special Obligations

- *Not escrow* — No neutral third party, no segregated funds
- *Standard revenue* — Once paid, funds are company money; refund is an expense
- *Accounting:* Book revenue, accrue liability based on expected completion rate

#pagebreak()

= Recommendations

== Implementation Path

#box(fill: rgb("#e3f2fd"), inset: 16pt, radius: 6pt, width: 100%)[
  #text(weight: "bold", size: 12pt)[Primary Approach:]
  
  Use *Stripe direct payments* for Premium subscriptions. Process refunds at month-end for users who hit 24/30 days.
  
  #v(0.8em)
  
  #text(weight: "bold", size: 12pt)[Fallback (if App Store required):]
  
  Use *Credit Model* — users earn \$11.69 toward next month instead of cash refund.
]

#v(1.5em)

== Action Items

#table(
  columns: (0.4fr, 3fr, 0.8fr),
  stroke: 0.5pt + rgb("#e0e0e0"),
  inset: 10pt,
  fill: (col, row) => if row == 0 { rgb("#f5f5f5") } else { white },
  [*No.*], [*Action*], [*Priority*],
  [1], [Set up Stripe payment processing with partial refund flow], [#text(fill: rgb("#c62828"))[High]],
  [2], [Draft Terms of Service with clear refund terms + no-escrow language], [#text(fill: rgb("#c62828"))[High]],
  [3], [Integrate refund logic with goal tracking system], [#text(fill: rgb("#c62828"))[High]],
  [4], [Obtain formal legal opinion for 50-state operation (~\$10-25K)], [#text(fill: rgb("#ff9800"))[Medium]],
  [5], [Build Credit Model as backup for App Store distribution], [#text(fill: rgb("#ff9800"))[Medium]],
  [6], [Frame marketing as "performance discount" not "earning money"], [#text(fill: rgb("#2e7d32"))[Low]],
)

#v(2em)

#align(center)[
  #box(fill: rgb("#f5f5f5"), inset: 20pt, radius: 6pt)[
    #text(size: 11pt, fill: rgb("#666"))[
      *Summary:* The MOVE refund mechanic is technically and legally feasible.
      
      Use Stripe. Avoid Apple IAP. Get a legal opinion before national launch.
    ]
  ]
]

#v(2em)

#align(center)[
  #text(size: 9pt, fill: rgb("#aaa"))[— End of Report —]
]
