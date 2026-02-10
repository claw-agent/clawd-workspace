// Client Onboarding Proposal Template
// Usage: typst compile onboarding-proposal.typ --input client="ACME Roofing" --input date="2026-02-10"
//
// Customize the variables below for each client, then compile.

// ── Configuration ──────────────────────────────────────────────
#let client-name = sys.inputs.at("client", default: "CLIENT NAME")
#let proposal-date = sys.inputs.at("date", default: "DATE")
#let contact-name = sys.inputs.at("contact", default: "")
#let market-area = sys.inputs.at("market", default: "Salt Lake City, UT")

// Brand colors (adjust per client or keep defaults)
#let primary = rgb("#1a1a2e")
#let accent = rgb("#e94560")
#let light-bg = rgb("#f8f9fa")
#let muted = rgb("#6c757d")

// ── Page Setup ─────────────────────────────────────────────────
#set page(
  margin: (x: 0.9in, y: 0.8in),
  footer: context [
    #line(length: 100%, stroke: 0.5pt + muted)
    #v(4pt)
    #text(size: 8pt, fill: muted)[
      Confidential — Prepared for #client-name
      #h(1fr)
      #counter(page).display("1 / 1", both: true)
    ]
  ]
)
#set text(font: "Helvetica Neue", size: 10.5pt, fill: rgb("#2d2d2d"))
#set par(justify: true, leading: 0.7em)
#set heading(numbering: none)

// ── Helper Functions ───────────────────────────────────────────
#let section-header(title) = {
  v(0.8em)
  rect(fill: primary, width: 100%, inset: (x: 14pt, y: 10pt), radius: 3pt)[
    #text(fill: white, size: 14pt, weight: "bold")[#title]
  ]
  v(0.4em)
}

#let feature-card(icon, title, body) = {
  rect(fill: light-bg, width: 100%, inset: 12pt, radius: 4pt, stroke: 0.5pt + rgb("#e0e0e0"))[
    #text(size: 12pt, weight: "bold")[#icon  #title]
    #v(4pt)
    #text(size: 10pt)[#body]
  ]
  v(6pt)
}

#let stat-box(number, label) = {
  align(center)[
    #text(size: 28pt, weight: "bold", fill: accent)[#number]
    #v(2pt)
    #text(size: 9pt, fill: muted)[#upper(label)]
  ]
}

#let check-item(text-content) = {
  [✓ #text-content \ ]
}

// ═══════════════════════════════════════════════════════════════
// COVER PAGE
// ═══════════════════════════════════════════════════════════════

#v(2in)
#align(center)[
  #text(size: 32pt, weight: "bold", fill: primary)[Growth Automation]
  #v(0.3em)
  #text(size: 32pt, weight: "bold", fill: primary)[Proposal]
  #v(1em)
  #line(length: 40%, stroke: 2pt + accent)
  #v(1em)
  #text(size: 18pt, fill: muted)[Prepared for]
  #v(0.3em)
  #text(size: 22pt, weight: "bold", fill: primary)[#client-name]
  #v(2em)
  #text(size: 11pt, fill: muted)[
    #if contact-name != "" [Attn: #contact-name \ ]
    #market-area \
    #proposal-date
  ]
]

#pagebreak()

// ═══════════════════════════════════════════════════════════════
// THE PROBLEM
// ═══════════════════════════════════════════════════════════════

#section-header[The Challenge]

Every roofing company faces the same bottlenecks:

#grid(
  columns: (1fr, 1fr),
  gutter: 12pt,
  rect(fill: rgb("#fff3f3"), width: 100%, inset: 10pt, radius: 3pt)[
    *Slow lead response* — The average contractor takes 42 hours to respond to a web lead. By then, the homeowner has called someone else.
  ],
  rect(fill: rgb("#fff3f3"), width: 100%, inset: 10pt, radius: 3pt)[
    *Missed storm windows* — Hail hits, demand surges, but without fast outreach you lose the rush to competitors already knocking doors.
  ],
  rect(fill: rgb("#fff3f3"), width: 100%, inset: 10pt, radius: 3pt)[
    *Few online reviews* — 93% of consumers read reviews before hiring. Most happy customers never leave one unless prompted.
  ],
  rect(fill: rgb("#fff3f3"), width: 100%, inset: 10pt, radius: 3pt)[
    *Inaccurate estimates* — Satellite-based estimates are expensive (\$50-100 each) or require a truck roll to measure.
  ],
)

#v(1em)

#align(center)[
  #text(size: 12pt, style: "italic", fill: muted)[
    What if all of this ran automatically — 24/7, with zero extra staff?
  ]
]

// ═══════════════════════════════════════════════════════════════
// THE SOLUTION — SYSTEM OVERVIEW
// ═══════════════════════════════════════════════════════════════

#section-header[The Solution: 4 Integrated Systems]

We deploy a fully automated growth engine customized for #client-name. Each system works independently *and* feeds into the others.

#v(0.3em)

#feature-card(
  "⚡",
  "Speed-to-Lead Auto-Responder",
  [
    New lead submits a form → personalized SMS sent *within 5 seconds*. Automatic follow-up sequence at Day 1, 3, and 7. Studies show responding in under 5 minutes makes you *100× more likely* to connect.

    *Channels:* SMS (Twilio) + optional email \
    *Trigger:* Any web form, landing page, or estimator submission
  ]
)

#feature-card(
  "🌩️",
  "Storm Monitor + Campaign Dispatcher",
  [
    Monitors National Weather Service radar for hail, high wind, and severe storms in your service area. When a roofing-relevant event is detected, it automatically generates:
    - Ready-to-send SMS sequences for affected neighborhoods
    - Email campaigns with storm details + inspection offers
    - Social media post drafts (Facebook, Nextdoor)
    - Google Ads copy targeting storm-related keywords
    - Door hanger text with specific storm date/size

    *Data source:* NOAA / NWS API (real-time) \
    *Coverage:* Customizable by county, zip code, or radius
  ]
)

#feature-card(
  "⭐",
  "Review Generation Engine",
  [
    After every completed job, an automated multi-touch sequence requests a Google review:

    #table(
      columns: (auto, 1fr),
      stroke: none,
      [*Same evening*], [Friendly SMS thanking them + direct review link],
      [*Next day*], [Email with one-tap Google review button],
      [*Day 3*], [Gentle SMS reminder (only if no review yet)],
      [*Day 7*], [Final nudge (stops automatically after review)],
    )

    *Goal:* 4.7+ stars with 100+ reviews → dominates local search rankings.
  ]
)

#feature-card(
  "🏠",
  "Instant Roof Estimator",
  [
    Homeowners enter their address → get a satellite-based roof measurement and ballpark estimate in seconds. Uses Google Solar API for roof area, pitch, and segment data.

    - *Cost:* \$0.01/lookup vs \$50-100 for EagleView
    - *Accuracy:* Less than 3% variance from professional measurement
    - *Lead capture:* Every estimate = a new lead in your pipeline
    - *Deployed:* Branded web tool on your domain (Vercel)
  ]
)

#pagebreak()

// ═══════════════════════════════════════════════════════════════
// IMPACT — BY THE NUMBERS
// ═══════════════════════════════════════════════════════════════

#section-header[Projected Impact]

#grid(
  columns: (1fr, 1fr, 1fr, 1fr),
  gutter: 16pt,
  stat-box("< 5s", "lead response time"),
  stat-box("3×", "review velocity"),
  stat-box("24/7", "storm monitoring"),
  stat-box("99¢", "per roof estimate"),
)

#v(1em)

#rect(fill: light-bg, width: 100%, inset: 14pt, radius: 4pt)[
  *Conservative scenario for a mid-size roofing company:*

  #table(
    columns: (1fr, auto, auto),
    stroke: 0.5pt + rgb("#dee2e6"),
    inset: 8pt,
    [*Metric*], [*Before*], [*After (90 days)*],
    [Average lead response time], [4-6 hours], [< 5 seconds],
    [Monthly Google reviews], [2-3], [8-12],
    [Google star rating], [4.1], [4.6+],
    [Storm leads captured per event], [0], [15-30],
    [Cost per roof estimate], [\$50-100], [\$0.01],
    [Leads from estimator tool], [0], [20-40/month],
  )
]

// ═══════════════════════════════════════════════════════════════
// WHAT'S INCLUDED
// ═══════════════════════════════════════════════════════════════

#section-header[What's Included]

#grid(
  columns: (1fr, 1fr),
  gutter: 16pt,
  [
    *Setup & Deployment*
    #check-item[All 4 systems configured for your business]
    #check-item[Branded roof estimator on your domain]
    #check-item[Twilio SMS integration (your number)]
    #check-item[Storm monitoring for your service area]
    #check-item[Review sequences customized to your brand]
    #check-item[Speed-to-lead connected to your forms]
  ],
  [
    *Ongoing Support*
    #check-item[Monthly performance dashboard]
    #check-item[Campaign content updates (seasonal)]
    #check-item[Storm alert tuning + new zip codes]
    #check-item[Review response templates]
    #check-item[System monitoring + uptime guarantee]
    #check-item[Priority Slack/text support]
  ],
)

// ═══════════════════════════════════════════════════════════════
// TIMELINE
// ═══════════════════════════════════════════════════════════════

#section-header[Onboarding Timeline]

#table(
  columns: (auto, 1fr, auto),
  stroke: 0.5pt + rgb("#dee2e6"),
  inset: 8pt,
  fill: (_, y) => if calc.odd(y) { light-bg } else { white },
  [*Phase*], [*What Happens*], [*Duration*],
  [*Discovery*], [Kick-off call. We learn your service area, brand voice, current tools, and goals.], [Day 1],
  [*Build*], [Configure all 4 systems. Brand the estimator. Set up SMS. Tune storm areas.], [Days 2-5],
  [*Test*], [Dry-run every system. You approve messaging, review wording, and estimator look.], [Days 6-7],
  [*Launch*], [Go live. First real leads flow through. We monitor closely.], [Day 8],
  [*Optimize*], [30-day review. Tune sequences based on real response data.], [Day 30],
)

#v(1em)

#align(center)[
  #rect(fill: accent, inset: (x: 24pt, y: 12pt), radius: 4pt)[
    #text(fill: white, size: 13pt, weight: "bold")[
      Ready to automate your growth? Let's talk.
    ]
  ]
]

// ═══════════════════════════════════════════════════════════════
// PRICING (placeholder — customize per deal)
// ═══════════════════════════════════════════════════════════════

#pagebreak()

#section-header[Investment]

// ⚠️ CUSTOMIZE PRICING PER CLIENT before compiling!
// Uncomment and adjust the section below, or remove this page.

#rect(fill: light-bg, width: 100%, inset: 16pt, radius: 4pt)[
  #align(center)[
    #text(size: 12pt, fill: muted, style: "italic")[
      Pricing is customized based on service area size, lead volume, and selected systems. \
      We'll walk through options on our discovery call.
    ]
  ]
]

#v(1em)

/*
// Example pricing table — uncomment and customize:
#table(
  columns: (1fr, auto),
  stroke: 0.5pt + rgb("#dee2e6"),
  inset: 10pt,
  [*One-Time Setup*], [*\$X,XXX*],
  [All 4 systems configured + branded], [],
  [*Monthly Retainer*], [*\$XXX/mo*],
  [Monitoring, optimization, support, SMS costs], [],
  [*Per-Lead SMS*], [*\~\$0.02/msg*],
  [Twilio pass-through at cost], [],
)
*/

#v(2em)

#align(center)[
  #text(size: 11pt, fill: muted)[
    Questions? Reach out anytime. \
    We're excited to help #client-name grow.
  ]
]
