#set document(title: "XPERIENCE Roofing - Lead Gen System Spec", author: "Claw")
#set page(margin: (x: 1in, y: 1in), numbering: "1")
#set text(font: "Helvetica Neue", size: 11pt)
#set heading(numbering: "1.")

#align(center)[
  #text(size: 24pt, weight: "bold")[XPERIENCE Roofing]
  #v(0.3em)
  #text(size: 16pt)[Automated Lead Generation System]
  #v(0.3em)
  #text(size: 12pt, fill: gray)[Technical Specification v0.1 — February 4, 2026]
]

#v(1em)

#rect(fill: rgb("#e8f4e8"), width: 100%, inset: 12pt)[
  *Executive Summary:* Build an automated system that identifies older homes likely needing roof work (via Utah parcel data), enriches records with owner contact info (skip tracing), and enables targeted outreach (email, phone, mail).
  
  *Out of scope:* Aerial roof analysis (covered in separate document)
]

#v(1em)

= Data Acquisition: Utah Open SGID

== What We Have Access To (FREE)

Utah's Open SGID is a *public PostGIS database* containing all state parcel data.

#rect(fill: rgb("#f5f5f5"), width: 100%, inset: 10pt)[
  ```
  Host: opensgid.ugrc.utah.gov
  Port: 5432
  Database: opensgid
  Username: agrc
  Password: agrc
  ```
]

== Key Data Points Available

#table(
  columns: (1fr, 2fr, 2fr),
  inset: 8pt,
  fill: (col, row) => if row == 0 { rgb("#4a90d9") } else if calc.odd(row) { rgb("#f0f0f0") } else { white },
  text(fill: white, weight: "bold")[Field], text(fill: white, weight: "bold")[Description], text(fill: white, weight: "bold")[Use Case],
  [`parcel_add`], [Property address], [Target address, skip trace input],
  [`built_yr`], [Construction year], [Age filtering (15+ years = target)],
  [`primary_res`], [Primary residence flag], [Filter to residential only],
  [`total_mkt_value`], [Market value], [Prioritize high-value homes],
  [`bldg_sqft`], [Building size], [Additional filtering],
)

#v(0.5em)
*Note:* Owner names are NOT in the parcel data. Skip tracing handles owner identification.

== ✅ Live Data Stats (Salt Lake County)

#rect(fill: rgb("#fff3cd"), width: 100%, inset: 10pt)[
  #text(size: 14pt, weight: "bold")[271,560 homes] that are 15+ years old
  
  Data freshness: Updated regularly | Access: FREE, public
]

= Skip Tracing / Contact Enrichment

== The Problem
Parcel data gives us: property address + basic info

We need: phone number + email address + owner name

== Option A: PropStream (RECOMMENDED FOR MVP)

#table(
  columns: (1fr, 1fr, 1fr),
  inset: 8pt,
  fill: (col, row) => if row == 0 { rgb("#28a745") } else { white },
  text(fill: white, weight: "bold")[Plan], text(fill: white, weight: "bold")[Monthly], text(fill: white, weight: "bold")[Skip Tracing],
  [Essentials], [\~\$99], [\$0.12/each],
  [*Pro*], [*\~\$149*], [*FREE*],
  [Elite], [\~\$199], [FREE],
)

*Why PropStream:*
- Built specifically for real estate
- Skip tracing included FREE on Pro/Elite plans
- DNC flagging + litigator scrubbing included
- 7-day free trial to test
- 50,000 saves/month on Pro plan

== Option B: BatchData (FOR SCALE)

Full API access for automation. Contact Enrichment add-on: \$500-2,000/mo depending on tier.

*Best for:* When ready to fully automate at high volume

== ❌ NOT Recommended

- *TruePeopleSearch* — ToS prohibits commercial use, heavy bot detection
- *Apollo.io* — Great for B2B, but poor for residential homeowners

= System Architecture

#align(center)[
  #rect(fill: rgb("#e3f2fd"), inset: 15pt)[
    #text(size: 10pt)[
      *OPEN SGID* → *SKIP TRACING* → *OUTREACH*
      
      (Parcel DB) → (PropStream/BatchData) → (Email/Phone/Mail)
    ]
  ]
]

== Outreach Channels (by compliance risk)

#table(
  columns: (1fr, 1fr, 2fr),
  inset: 8pt,
  fill: (col, row) => if row == 0 { rgb("#4a90d9") } else { white },
  text(fill: white, weight: "bold")[Channel], text(fill: white, weight: "bold")[Risk], text(fill: white, weight: "bold")[Requirements],
  [Email], [LOW], [CAN-SPAM compliance],
  [Direct Mail], [NONE], [Just cost],
  [Manual Phone], [MEDIUM], [DNC scrub, no autodialer],
  [SMS], [HIGH], [Requires opt-in — avoid cold],
)

= Compliance Summary

== Email (CAN-SPAM)
- ✅ Can send cold emails to homeowners
- ✅ Must include physical mailing address
- ✅ Must have working unsubscribe
- ❌ No deceptive subject lines

== Phone (TCPA)
- ✅ Manual dialing to cell phones OK
- ⚠️ Must check National DNC Registry
- ❌ No autodialers to cell phones without consent

*Penalties:* TCPA: \$500-\$1,500 per violation

= MVP Implementation Plan

#table(
  columns: (1fr, 3fr),
  inset: 8pt,
  fill: (col, row) => if row == 0 { rgb("#6c757d") } else { white },
  text(fill: white, weight: "bold")[Week], text(fill: white, weight: "bold")[Tasks],
  [1], [Write Open SGID extraction script, test with 1,000 records],
  [2], [Sign up PropStream trial, run skip trace, analyze match rate],
  [3], [Set up email tool, create sequence, send to 500 test records],
  [4], [Analyze results, refine targeting, decide on scale path],
)

= Cost Projections

== MVP (1,000 leads/month)

#table(
  columns: (2fr, 1fr),
  inset: 8pt,
  fill: (col, row) => if row == 0 { rgb("#28a745") } else { white },
  text(fill: white, weight: "bold")[Item], text(fill: white, weight: "bold")[Monthly Cost],
  [Open SGID], [FREE],
  [PropStream Pro], [\$149],
  [Email tool (Instantly)], [\$37-97],
  [*Total*], [*\~\$186-246/mo*],
)

== Scale (10,000 leads/month)

#table(
  columns: (2fr, 1fr),
  inset: 8pt,
  fill: (col, row) => if row == 0 { rgb("#4a90d9") } else { white },
  text(fill: white, weight: "bold")[Item], text(fill: white, weight: "bold")[Monthly Cost],
  [Open SGID], [FREE],
  [BatchData (Growth)], [\$2,000],
  [Email tool (Instantly Pro)], [\$97],
  [*Total*], [*\~\$2,100/mo*],
)

= Open Questions

1. *Target geography:* Start with Salt Lake City only, or broader?
2. *Age cutoff:* 15 years is standard — adjust based on preference?
3. *Volume goals:* How many leads/month is the target?
4. *CRM integration:* What CRM does XPERIENCE use?
5. *Email domain:* Need dedicated domain for cold email

#v(2em)
#align(center)[
  #text(fill: gray, size: 10pt)[Prepared for XPERIENCE Roofing — February 2026]
]
