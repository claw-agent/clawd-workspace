#set page(margin: (x: 0.75in, y: 0.75in))
#set text(font: "Helvetica Neue", size: 10pt)

#align(center)[
  #text(size: 28pt, weight: "bold")[XPERIENCE Roofing]
  #v(0.2em)
  #text(size: 14pt, fill: rgb("#666"))[Competitive Analysis & Action Plan]
  #v(0.2em)
  #text(size: 11pt, fill: rgb("#999"))[February 2026]
]

#v(1em)

#rect(fill: rgb("#f0f7ff"), inset: 12pt, width: 100%)[
  #text(weight: "bold", size: 11pt)[Executive Summary]
  
  XPERIENCE has a clean, modern site with strong copy — but *significant SEO gaps* vs established competitors. The biggest opportunities are schema markup, city-specific pages, and content depth. This document provides a prioritized action plan with ready-to-use assets.
]

#v(1em)

= Current State Assessment

#columns(2)[
  == Strengths
  - ✅ Modern, clean design
  - ✅ Friendly, conversational copy
  - ✅ Solid FAQ section (8 questions)
  - ✅ 4.9 Google rating
  - ✅ 15-year workmanship warranty
  - ✅ 24/7 emergency support
  - ✅ Insurance claim assistance
  - ✅ Good service/material breakdown

  #colbreak()

  == Critical Gaps
  - ❌ *No schema markup* (zero structured data)
  - ❌ *No city landing pages*
  - ❌ *No service area page*
  - ❌ "20+ years experience" vs "founded 2019" conflict
  - ❌ Warranty not prominently featured
  - ❌ No dedicated insurance claims page
  - ❌ Blog appears empty/inactive
]

#v(1em)

= Competitor Breakdown

#table(
  columns: (1.2fr, 1fr, 1fr, 1fr),
  stroke: 0.5pt + rgb("#ccc"),
  inset: 8pt,
  fill: (col, row) => if row == 0 { rgb("#f5f5f5") },
  [*Factor*], [*XPERIENCE*], [*Vertex Roofing*], [*American Roofing*],
  [Years in business], [Since 2019], [16+ years], [*60+ years* (1964)],
  [Warranty], [15-year workmanship], [*50-year* ⭐], [5-year],
  [Certifications], [Not displayed], [CertainTeed Master], [CertainTeed Gold, BBB],
  [City pages], [❌ None], [✅ 10+ cities], [✅ Full coverage],
  [Schema markup], [❌ None], [✅ Present], [✅ Present],
  [Insurance page], [❌ None], [❌ None], [✅ Dedicated page],
  [Blog/Content], [Inactive], [Light], [Active + Glossary],
)

#v(0.5em)

== Key Competitive Insights

#rect(fill: rgb("#fff3cd"), inset: 10pt, width: 100%)[
  *⚠️ Vertex's 50-year warranty is a major differentiator.* They lead with it in headlines. XPERIENCE's 15-year is buried in FAQ. Consider making warranty a prominent selling point.
]

#v(0.5em)

*What competitors do that XPERIENCE doesn't:*
- City-specific landing pages (e.g., "Roofing in South Jordan, UT")
- Dedicated insurance claim process pages
- Case studies with before/after photos
- Team pages with employee photos
- Service area maps

#pagebreak()

= Priority Action Items

#table(
  columns: (2fr, 0.6fr, 0.6fr, 1.5fr),
  stroke: 0.5pt + rgb("#ccc"),
  inset: 8pt,
  fill: (col, row) => if row == 0 { rgb("#f5f5f5") },
  [*Action*], [*Priority*], [*Effort*], [*Notes*],
  [Add LocalBusiness schema], [🔴 HIGH], [10 min], [JSON-LD provided below],
  [Create insurance claims page], [🔴 HIGH], [1 hour], [Competitors rank for this],
  [Fix "20yr experience" conflict], [🔴 HIGH], [5 min], [Confusing to visitors],
  [Build city landing pages], [🔴 HIGH], [3 hours], [Start with top 5 cities],
  [Create service area page], [🟡 MED], [1 hour], [List all cities served],
  [Make warranty a headline], [🟡 MED], [10 min], [Currently buried],
  [Add team page with photos], [🟢 LOW], [2 hours], [Builds trust],
  [Start blog content], [🟢 LOW], [Ongoing], [1-2 posts/month],
)

#v(1em)

= Ready-to-Use Assets

== Schema Markup (Add to site \<head\>)

#rect(fill: rgb("#f5f5f5"), inset: 10pt, width: 100%)[
  #set text(font: "Menlo", size: 8pt)
  ```
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    "name": "XPERIENCE Roofing",
    "url": "https://www.xperienceroofing.com",
    "telephone": "+1-801-251-6554",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Salt Lake City",
      "addressRegion": "UT",
      "addressCountry": "US"
    },
    "areaServed": ["Salt Lake City", "Sandy", "West Valley City", 
      "West Jordan", "South Jordan", "Murray", "Draper", "Herriman"],
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "150"
    }
  }
  </script>
  ```
]

#pagebreak()

== Google Business Profile Posts (10 Ready)

=== Batch 1: Local Authority

#rect(stroke: 0.5pt + rgb("#ddd"), inset: 10pt, width: 100%)[
  *Post 1: Local Trust*
  
  "Trusted Roofing in Salt Lake City Since 2019 🏠
  
  From Sugar House to South Jordan, we've helped hundreds of Utah families protect their homes. Family-owned, community-trusted.
  
  📞 Free inspections available — call today!"
]

#v(0.5em)

#rect(stroke: 0.5pt + rgb("#ddd"), inset: 10pt, width: 100%)[
  *Post 2: Storm Season*
  
  "Storm Season is Coming ⛈️
  
  Utah hail can destroy a roof in minutes. XPERIENCE offers 24/7 emergency response and insurance claim assistance.
  
  Don't wait until it leaks — schedule your FREE inspection now!"
]

#v(0.5em)

#rect(stroke: 0.5pt + rgb("#ddd"), inset: 10pt, width: 100%)[
  *Post 3: Warranty*
  
  "15-Year Workmanship Warranty — Why It Matters 🛡️
  
  We stand behind every roof we build. Our 15-year warranty means you're protected long after the crew leaves.
  
  Great work. Fair prices. Peace of mind included."
]

#v(0.5em)

#rect(stroke: 0.5pt + rgb("#ddd"), inset: 10pt, width: 100%)[
  *Post 4: Warning Signs*
  
  "What's That Sound? 5 Signs Your Roof Needs Attention 👀
  
  • Missing or curling shingles
  • Sagging spots on the roof
  • Granules in your gutters
  • Light visible through attic
  • Water stains on ceilings
  
  Seeing these? Call for a FREE inspection before winter hits."
]

#v(0.5em)

#rect(stroke: 0.5pt + rgb("#ddd"), inset: 10pt, width: 100%)[
  *Post 5: Metal Roofs*
  
  "Metal Roofs in Utah — Worth the Investment? 🏔️
  
  With our extreme temperature swings (and heavy snow loads), metal roofs are gaining popularity across the Salt Lake Valley and Park City.
  
  Longer lifespan. Better energy efficiency. We install all types."
]

#pagebreak()

=== Batch 2: Trust & Urgency

#rect(stroke: 0.5pt + rgb("#ddd"), inset: 10pt, width: 100%)[
  *Post 6: Emergency*
  
  "Emergency Roof Repair — We're Here 24/7 🚨
  
  Tree through your roof? Sudden leak? We respond fast with emergency tarping and repairs.
  
  Utah weather waits for no one. Neither do we."
]

#v(0.5em)

#rect(stroke: 0.5pt + rgb("#ddd"), inset: 10pt, width: 100%)[
  *Post 7: Insurance*
  
  "Insurance Claim? We Walk You Through It 📋
  
  Storm damage can be stressful. XPERIENCE helps document everything and works directly with your insurance provider.
  
  One less thing to worry about. Call us today."
]

#v(0.5em)

#rect(stroke: 0.5pt + rgb("#ddd"), inset: 10pt, width: 100%)[
  *Post 8: Commercial*
  
  "Flat Roof Specialists — TPO, EPDM, PVC 🏢
  
  Commercial building owners trust XPERIENCE for flat roof systems. Installation, repair, and maintenance.
  
  We keep your business covered. Literally."
]

#v(0.5em)

#rect(stroke: 0.5pt + rgb("#ddd"), inset: 10pt, width: 100%)[
  *Post 9: Family-Owned*
  
  "Family-Owned, Community-Trusted 👨‍👩‍👧‍👦
  
  We're not a franchise. We're your neighbors. CEO Jamie Stagg started XPERIENCE with one truck and a mission to do roofing differently.
  
  That's why we treat every roof like it's our own."
]

#v(0.5em)

#rect(stroke: 0.5pt + rgb("#ddd"), inset: 10pt, width: 100%)[
  *Post 10: Winter Prep*
  
  "Winter Roof Check — FREE for Utah Homeowners ❄️
  
  Heavy snow season is coming. Schedule your free pre-winter inspection and avoid costly repairs later.
  
  📞 Call now or book online!"
]

#pagebreak()

= City Landing Pages (Template)

Create pages for: *Salt Lake City, Sandy, West Jordan, South Jordan, Draper, Herriman, Murray, Riverton, West Valley City, Taylorsville*

== Page Template

*URL:* `/roofing-[city]-utah/`

*Title:* "Trusted Roofing Company in [City], UT | XPERIENCE Roofing"

*H1:* "[City]'s Trusted Roofing Experts"

*Content Structure:*
1. Intro paragraph mentioning [City] and local landmarks
2. Services offered in [City]
3. Why choose XPERIENCE for [City] homes
4. Local testimonial if available
5. Service area mention (nearby cities)
6. Clear CTA with phone number

*Example intro for Sandy:*
#rect(fill: rgb("#f5f5f5"), inset: 10pt, width: 100%)[
  "Sandy homeowners trust XPERIENCE Roofing for everything from emergency repairs to complete roof replacements. Whether you're near the Sandy Amphitheater or up by Dimple Dell, our local crews know Utah roofs — and we're just minutes away when you need us."
]

#v(1em)

= Ongoing Strategy

== Weekly Tasks
- Post 2-3 GBP updates
- Check competitor GBP activity
- Respond to all reviews within 24 hours

== Monthly Tasks
- Review keyword rankings
- Publish 1-2 blog posts
- Add new photos to GBP (job sites, team)

== Quarterly Tasks
- Full competitive audit refresh
- Review velocity analysis
- Content gap reassessment

#v(1em)

#align(center)[
  #rect(fill: rgb("#e8f5e9"), inset: 15pt)[
    #text(weight: "bold", size: 11pt)[Questions? Ready to execute?]
    
    This analysis was prepared by Claw (XPERIENCE In-House AI).
    All assets are ready for immediate implementation.
  ]
]
