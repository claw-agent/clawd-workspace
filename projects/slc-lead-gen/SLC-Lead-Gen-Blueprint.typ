// SLC Lead Gen Blueprint - Professional Report
// Built with Typst

#set page(
  paper: "us-letter",
  margin: (x: 1in, y: 0.75in),
  header: context {
    if counter(page).get().first() > 1 [
      #set text(9pt, fill: gray)
      #h(1fr) SLC Lead Gen Blueprint #h(1fr) Page #counter(page).display()
    ]
  }
)

#set text(font: "Helvetica Neue", size: 11pt)
#set par(justify: true, leading: 0.65em)
#set heading(numbering: "1.")

// Colors
#let brand-green = rgb("#226246")
#let brand-dark = rgb("#1a1a2e")
#let accent-blue = rgb("#4a90d9")

// Title Page
#align(center)[
  #v(2in)
  
  #text(size: 36pt, weight: "bold", fill: brand-dark)[
    SLC Lead Gen Blueprint
  ]
  
  #v(0.5em)
  
  #text(size: 16pt, fill: gray)[
    Automated Local Business Lead Generation System
  ]
  
  #v(0.3em)
  
  #line(length: 50%, stroke: 2pt + brand-green)
  
  #v(2em)
  
  #text(size: 12pt)[
    Find businesses with bad websites. \
    Auto-generate beautiful replacements. \
    Close deals with zero-effort demos.
  ]
  
  #v(3in)
  
  #text(size: 10pt, fill: gray)[
    Prepared by Claw · January 2026 \
    For Marb · Confidential
  ]
]

#pagebreak()

// Executive Summary
#align(center)[
  #text(size: 20pt, weight: "bold", fill: brand-dark)[Executive Summary]
]

#v(1em)

#block(
  fill: rgb("#f5f5f5"),
  inset: 20pt,
  radius: 8pt,
  width: 100%,
)[
  *The Opportunity:* Thousands of SLC businesses have terrible websites but are otherwise thriving. They're leaving money on the table — and they know it.
  
  *Our Edge:* We can automatically identify these businesses, generate beautiful replacement sites, and reach out with a live demo before they even reply.
  
  *The Result:* A highly differentiated sales approach that closes deals faster with less effort.
]

#v(1em)

*Key Numbers:*
#table(
  columns: (1fr, 1fr),
  inset: 10pt,
  stroke: none,
  [*Metric*], [*Value*],
  [SLC businesses with websites], [~50,000+],
  [Estimated with poor Lighthouse scores], [40-60%],
  [Cost to scan 1,000 businesses], [~\$50],
  [Time to generate demo site], [5-10 minutes],
  [Expected close rate with demo], [3-5x higher than cold email alone],
)

#pagebreak()

// Table of Contents
#outline(
  title: [Contents],
  indent: 2em,
)

#pagebreak()

= The Pipeline Architecture

Our system has four main stages:

#figure(
  rect(
    fill: rgb("#fafafa"),
    inset: 15pt,
    radius: 4pt,
    width: 100%,
  )[
    #align(center)[
      #text(weight: "bold")[DISCOVER] → #text(weight: "bold")[SCORE] → #text(weight: "bold")[GENERATE] → #text(weight: "bold")[OUTREACH]
      
      #v(0.5em)
      #text(size: 9pt, fill: gray)[
        Google Places API → Lighthouse/PageSpeed → v0.dev + Vercel → Instantly/Lemlist
      ]
    ]
  ],
  caption: [End-to-end automation pipeline]
)

== Stage 1: Discovery

*Goal:* Find all businesses in a target category within SLC.

*Primary Tool:* Google Places API
- \$32 per 1,000 searches
- \$200/month free credit (~6,250 searches)
- Returns: business name, address, phone, website URL, ratings, reviews

*Target Categories:*
- Restaurants & cafes
- Home services (plumbers, electricians, HVAC)
- Professional services (lawyers, accountants, dentists)
- Retail & local shops

== Stage 2: Website Quality Scoring

*Goal:* Identify businesses with poor websites.

*Scoring Criteria:*
#table(
  columns: (auto, auto, 1fr),
  inset: 8pt,
  stroke: 0.5pt + gray,
  [*Signal*], [*Tool*], [*Bad Score Threshold*],
  [Performance], [Lighthouse], [< 50],
  [Mobile-friendly], [PageSpeed Insights], [Mobile score < 60],
  [SSL Certificate], [Direct check], [Missing or expired],
  [Modern design], [Visual AI / age check], [> 5 years old],
  [Load time], [WebPageTest], [> 4 seconds],
)

*Filtering Logic:*
```
IF (lighthouse_score < 50 OR mobile_score < 60)
   AND rating >= 4.0
   AND review_count >= 20
   AND has_website = true
THEN mark_as_prospect()
```

#pagebreak()

== Stage 3: Demo Site Generation

*Goal:* Create a beautiful replacement site automatically.

*Recommended Stack:*
#table(
  columns: (auto, 1fr, auto),
  inset: 8pt,
  stroke: 0.5pt + gray,
  [*Tool*], [*Purpose*], [*Cost*],
  [v0.dev], [Generate React/Tailwind code from prompt], [\$20/mo],
  [Vercel], [Deploy instantly with preview URLs], [Free tier],
  [Puppeteer], [Screenshot their current site], [Free],
)

*Generation Workflow:*
+ Scrape existing site for: business name, logo, colors, services, contact info
+ Generate prompt: "Create a modern website for [business] that offers [services]..."
+ v0.dev generates React code
+ Auto-deploy to Vercel subdomain: businessname-preview.vercel.app
+ Take "before/after" screenshots

*Time per site:* 5-10 minutes fully automated

== Stage 4: Outreach

*Goal:* Reach prospects with personalized, high-converting emails.

*Recommended Platform:* Instantly (\$37/mo)
- Unlimited email accounts
- Built-in warmup
- 5,000 emails/month

*Winning Email Template:*
#block(
  fill: rgb("#f0f8ff"),
  inset: 15pt,
  radius: 4pt,
)[
  *Subject:* I made you a new website (seriously)
  
  Hi [FirstName],
  
  I was browsing SLC [industry] businesses and noticed [BusinessName]'s website could use a refresh — especially on mobile where [specific issue].
  
  So I built you a new one: *[preview-url]*
  
  No catch. If you like it, let's chat about making it official. If not, no worries — it was good practice!
  
  [Your name]
]

*Follow-up Sequence:*
- Day 3: "Did you get a chance to see the new site?"
- Day 7: "Quick question — is the current site working for you?"
- Day 14: Final follow-up with comparison screenshots

#pagebreak()

= Cost Breakdown

#table(
  columns: (auto, 1fr, auto, auto),
  inset: 10pt,
  stroke: 0.5pt + gray,
  [*Item*], [*Service*], [*Monthly Cost*], [*Notes*],
  [Lead Discovery], [Google Places API], [\$0-50], [Free tier covers most],
  [Site Scoring], [PageSpeed Insights API], [\$0], [Free],
  [Site Generation], [v0.dev Pro], [\$20], [Unlimited generations],
  [Hosting], [Vercel], [\$0], [Free tier = 100 deploys/day],
  [Email], [Instantly Growth], [\$37], [5K emails/mo],
  [Email Warmup], [Included in Instantly], [\$0], [],
  table.hline(),
  [*Total*], [], [*\$57-107/mo*], [],
)

*ROI Calculation:*
- If average web design deal = \$3,000
- Close rate with demo = 3-5%
- 100 prospects/month = 3-5 deals
- Revenue: \$9,000 - \$15,000/month
- *ROI: 100-200x*

#pagebreak()

= Implementation Roadmap

#table(
  columns: (auto, 1fr, auto),
  inset: 10pt,
  stroke: 0.5pt + gray,
  [*Phase*], [*Tasks*], [*Timeline*],
  [1], [
    - Set up Google Cloud account + Places API
    - Build discovery script (Node.js)
    - Test with 100 SLC restaurants
  ], [Day 1-2],
  [2], [
    - Integrate Lighthouse API for scoring
    - Build filtering logic
    - Create prospect database
  ], [Day 3-4],
  [3], [
    - Set up v0.dev workflow
    - Build site generator script
    - Configure Vercel auto-deploy
  ], [Day 5-7],
  [4], [
    - Set up Instantly account
    - Create email templates
    - Configure warmup sequences
  ], [Day 8-9],
  [5], [
    - End-to-end testing
    - First batch of 50 prospects
    - Iterate based on results
  ], [Day 10-14],
)

#pagebreak()

= Technical Reference

== API Keys Needed

#table(
  columns: (auto, 1fr, auto),
  inset: 8pt,
  stroke: 0.5pt + gray,
  [*Service*], [*How to Get*], [*Cost*],
  [Google Places], [console.cloud.google.com → APIs → Places API], [Free tier],
  [PageSpeed], [Same Google Cloud project], [Free],
  [Vercel], [vercel.com → Settings → Tokens], [Free],
  [Instantly], [instantly.ai → Settings → API], [\$37/mo min],
)

== Core Dependencies

```
npm install \@googlemaps/google-maps-services-js
npm install lighthouse
npm install puppeteer
npm install vercel
```

#pagebreak()

= Next Steps

#block(
  fill: rgb("#e8f5e9"),
  inset: 20pt,
  radius: 8pt,
)[
  *Ready to build?* Here's what we do next:
  
  + *Today:* Set up Google Cloud + get API key
  + *This week:* Build discovery + scoring scripts
  + *Next week:* Add site generation + outreach
  + *Week 3:* First live campaign with 50 prospects
  
  Estimated time to first revenue: *2-3 weeks*
]

#v(2em)

#align(center)[
  #text(size: 14pt, weight: "bold", fill: brand-green)[
    Let's start building. 🚀
  ]
]

#v(3em)

#line(length: 100%, stroke: 0.5pt + gray)

#v(1em)

#align(center)[
  #text(size: 9pt, fill: gray)[
    This document was generated using Typst. \
    Research compiled from: local-lead-sourcing.md, sample-site-generator.md, outreach-automation.md \
    © 2026 Claw + Marb
  ]
]
