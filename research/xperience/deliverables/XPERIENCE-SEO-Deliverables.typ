#set document(title: "XPERIENCE SEO Deliverables", author: "Claw")
#set page(paper: "us-letter", margin: (x: 1in, y: 1in))
#set text(font: "Helvetica Neue", size: 10pt)
#set heading(numbering: none)

#align(center)[
  #text(24pt, weight: "bold")[XPERIENCE SEO Deliverables]
  
  #text(12pt, fill: rgb("#666"))[Ready-to-Execute Package]
  
  #v(0.5em)
  #text(10pt)[February 6, 2026 • Prepared by Claw]
]

#v(1em)

#box(fill: rgb("#f0f7ff"), inset: 12pt, radius: 4pt, width: 100%)[
  #text(weight: "bold")[What's Inside]
  
  #v(0.5em)
  
  #grid(columns: (1fr, 2fr),
    gutter: 8pt,
    [*Page 2*], [Schema Implementation Guide — Copy-paste into Framer],
    [*Page 5*], [10 GBP Posts — Ready to post directly to Google],
    [*Page 10*], [Insurance Claims Page — Complete content for new page],
    [*Page 16*], [City Page Template — Template for local landing pages],
  )
]

#pagebreak()

// ============ SCHEMA GUIDE ============

#text(18pt, weight: "bold")[Schema Implementation Guide]

#text(10pt, fill: rgb("#666"))[For Jamie Stagg / XPERIENCE Team • Site: xperienceroofing.com (Framer)]

#v(1em)

== What This Does

Schema markup tells Google exactly what your business is. Without it, you're invisible to rich search results. Your competitors have it. You don't. Let's fix that.

#v(1em)

== Step-by-Step: Adding Schema to Framer

=== Step 1: Open Framer Project Settings

1. Go to your Framer dashboard
2. Open the XPERIENCE project
3. Click the *gear icon* (Settings) in the top right
4. Select *"Custom Code"* from the sidebar

=== Step 2: Paste This Code

In the *"End of \<head\> tag"* section, paste this entire block:

#box(fill: rgb("#f5f5f5"), inset: 10pt, radius: 4pt, width: 100%)[
#text(size: 8pt, font: "Menlo")[
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
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "40.7608",
    "longitude": "-111.8910"
  },
  "areaServed": [
    "Salt Lake City", "Sandy", "West Valley City", 
    "West Jordan", "South Jordan", "Murray", "Draper", 
    "Herriman", "Riverton", "Taylorsville", 
    "Cottonwood Heights", "Holladay", "Millcreek"
  ],
  "priceRange": "$$",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", 
                  "Thursday", "Friday"],
    "opens": "08:00",
    "closes": "18:00"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "150"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Roofing Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Roof Replacement",
          "description": "Complete roof replacement with 
                          15-year workmanship warranty"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Roof Repair",
          "description": "Emergency and scheduled roof 
                          repairs for all roof types"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Free Roof Inspection",
          "description": "Comprehensive roof inspection 
                          with detailed report"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Storm Damage Repair",
          "description": "24/7 emergency response for 
                          hail and wind damage"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Insurance Claim Assistance",
          "description": "Full documentation and 
                          insurance company coordination"
        }
      }
    ]
  }
}
</script>
```
]
]

=== Step 3: Save and Publish

1. Click *"Save"*
2. Click *"Publish"* to push changes live

#v(1em)

== Verify It's Working

After publishing, test your schema:

1. Go to: https://search.google.com/test/rich-results
2. Enter: https://www.xperienceroofing.com
3. Click "Test URL"
4. You should see "RoofingContractor" detected with all your details

#v(1em)

== What This Gets You

#box(fill: rgb("#e8f5e9"), inset: 10pt, radius: 4pt, width: 100%)[
- ✓ *Rich snippets* in search results (star ratings, phone number)
- ✓ *Knowledge panel* potential for branded searches
- ✓ *Better local pack* visibility
- ✓ *Voice search* compatibility ("Hey Google, find a roofer near me")
]

#pagebreak()

// ============ GBP POSTS ============

#text(18pt, weight: "bold")[GBP Posts — Ready to Post]

#text(10pt, fill: rgb("#666"))[Copy each post exactly as written. Post 2-3 per week. Include a relevant photo when possible.]

#v(1em)

== Week 1

=== Post 1: Local Authority

#box(fill: rgb("#f5f5f5"), inset: 10pt, radius: 4pt, width: 100%)[
Trusted Roofing in Salt Lake City Since 2019 🏠

From Sugar House to South Jordan, we've helped hundreds of Utah families protect their homes with quality roofing that lasts.

✅ Free inspections
✅ 15-year workmanship warranty
✅ Insurance claim help

Call today: (801) 251-6554
]

*Photo suggestion:* Finished roof job with mountains in background

#v(1em)

=== Post 2: Storm Season Alert

#box(fill: rgb("#f5f5f5"), inset: 10pt, radius: 4pt, width: 100%)[
Storm Season is Coming ⛈️

Utah hail can destroy a roof in minutes. Don't wait until you see water stains on your ceiling.

XPERIENCE offers:
→ 24/7 emergency response
→ Full insurance claim assistance
→ Immediate tarping to prevent further damage

Schedule your FREE pre-storm inspection now.

📞 (801) 251-6554
]

*Photo suggestion:* Hail damage close-up or storm clouds over Salt Lake

#v(1em)

=== Post 3: Warranty Value

#box(fill: rgb("#f5f5f5"), inset: 10pt, radius: 4pt, width: 100%)[
15-Year Workmanship Warranty — Why It Matters 🛡️

Most roofers offer 1-2 years. We stand behind every roof we build for 15 years.

Why? Because we're confident in our work, and we'll be here when you need us.

That's the XPERIENCE difference.

Get your free quote: (801) 251-6554
]

*Photo suggestion:* Team photo or warranty certificate

#pagebreak()

== Week 2

=== Post 4: Warning Signs

#box(fill: rgb("#f5f5f5"), inset: 10pt, radius: 4pt, width: 100%)[
What's That Sound? 5 Signs Your Roof Needs Attention 👀

1. Missing or curling shingles
2. Granules in your gutters
3. Sagging spots on the roof
4. Light coming through attic
5. Water stains on ceilings

Seeing any of these? Call for a FREE inspection before winter hits.

📞 (801) 251-6554
]

*Photo suggestion:* Example of damaged shingles or inspection in progress

#v(1em)

=== Post 5: Metal Roofs

#box(fill: rgb("#f5f5f5"), inset: 10pt, radius: 4pt, width: 100%)[
Metal Roofs in Utah — Worth the Investment? 🏔️

With our extreme temperature swings (100°F summers, subzero winters), metal roofs are gaining popularity across the Salt Lake Valley.

Benefits:
✅ 50+ year lifespan
✅ Energy efficient (reflects heat)
✅ Handles heavy snow loads
✅ Fire resistant

Curious if metal is right for your home? Let's talk.

(801) 251-6554
]

*Photo suggestion:* Completed metal roof project

#pagebreak()

== Week 3

=== Post 6: Emergency Services

#box(fill: rgb("#f5f5f5"), inset: 10pt, radius: 4pt, width: 100%)[
Emergency Roof Repair — We're Available 24/7 🚨

Tree through your roof? Sudden leak during a storm? We respond fast.

→ Emergency tarping
→ Temporary repairs
→ Full damage assessment
→ Insurance documentation

Utah weather waits for no one. Neither do we.

📞 (801) 251-6554
]

*Photo suggestion:* Team responding to emergency call

#v(1em)

=== Post 7: Insurance Help

#box(fill: rgb("#f5f5f5"), inset: 10pt, radius: 4pt, width: 100%)[
Insurance Claim? We Walk You Through It 📋

Storm damage is stressful enough. Dealing with insurance shouldn't add to it.

XPERIENCE helps you:
✓ Document all damage properly
✓ Get accurate repair estimates
✓ Communicate with adjusters
✓ Maximize your claim

One less thing to worry about.

Call: (801) 251-6554
]

*Photo suggestion:* Team member with clipboard doing inspection

#pagebreak()

== Week 4

=== Post 8: Commercial/Flat Roofs

#box(fill: rgb("#f5f5f5"), inset: 10pt, radius: 4pt, width: 100%)[
Flat Roof Specialists — TPO, EPDM, PVC 🏢

Commercial building owners across Utah trust XPERIENCE for flat roof systems.

We handle:
• New installations
• Repairs & maintenance
• Full replacements
• Preventive inspections

Your business deserves a roof that won't let you down.

(801) 251-6554
]

*Photo suggestion:* Commercial flat roof project

#v(1em)

=== Post 9: Family Business

#box(fill: rgb("#f5f5f5"), inset: 10pt, radius: 4pt, width: 100%)[
Family-Owned, Community-Trusted 👨‍👩‍👧‍👦

We're not a franchise. We're not a national chain.

We're your neighbors. And that's why we treat every roof like it's our own.

When you call XPERIENCE, you get people who actually care about getting it right.

📞 (801) 251-6554
]

*Photo suggestion:* Team group photo

#v(1em)

=== Post 10: Winter Prep

#box(fill: rgb("#f5f5f5"), inset: 10pt, radius: 4pt, width: 100%)[
Winter Roof Check — FREE for Utah Homeowners ❄️

Heavy snow season is right around the corner.

A small issue now becomes a big (expensive) problem when 2 feet of snow is sitting on your roof.

Schedule your free pre-winter inspection and avoid costly repairs later.

Limited spots available.

📞 (801) 251-6554
]

*Photo suggestion:* Snow on roof or winter inspection

#pagebreak()

== Posting Tips

#box(fill: rgb("#fff3e0"), inset: 12pt, radius: 4pt, width: 100%)[
1. *Best times:* Tuesday-Thursday, 10am-2pm local time
2. *Add photos:* Posts with images get 2x more engagement
3. *Be consistent:* 2-3 posts per week minimum
4. *Respond to comments:* Engagement signals matter to Google
5. *Add CTA:* Every post should end with phone number
]

#pagebreak()

// ============ INSURANCE PAGE ============

#text(18pt, weight: "bold")[Insurance Claims Page — Complete Content]

#text(10pt, fill: rgb("#666"))[Ready to build in Framer at /insurance-claims]

#v(1em)

== Hero Section

*Headline:*
#text(14pt, weight: "bold")[Storm Damage? We Handle Your Insurance Claim From Start to Finish.]

*Subheadline:*
Free inspection. Full documentation. Direct insurance communication. Zero stress for you.

*CTA Button:* Get Your Free Storm Damage Inspection →

#v(1em)

== Section 1: The Problem

*Headline:* Insurance Claims Are Complicated. We Make Them Simple.

When a storm damages your roof, you're suddenly dealing with:
- Documenting damage before it gets worse
- Filing claims with tight deadlines
- Negotiating with adjusters who want to minimize payouts
- Finding a contractor you can actually trust
- Coordinating repairs while protecting your home

*You shouldn't have to become an insurance expert overnight.*

That's why XPERIENCE handles the entire process. From the first inspection to the final repair, we're with you every step.

#v(1em)

== Section 2: Our Process

*Headline:* How We Handle Your Insurance Claim

*Step 1: Free Inspection (Same-Day Available)*
We inspect your roof within 24 hours of your call — often the same day. Our team documents every detail: photos, measurements, damage notes.

*Step 2: Detailed Report & Estimate*
You'll receive a comprehensive damage report with itemized damage list, professional photos, accurate estimate, and manufacturer specifications.

*Step 3: We File With You*
We help you file your claim correctly the first time. No missing information. No rejected claims.

*Step 4: Adjuster Meeting*
When your insurance adjuster comes out, we meet them at your property and advocate for you.

*Step 5: Approval & Repair*
Once approved, we handle scheduling, materials, and completion to manufacturer specs.

*Step 6: Warranty & Peace of Mind*
Every repair comes with our *15-year workmanship warranty*.

#pagebreak()

== Section 3: Why XPERIENCE

*Headline:* Why Utah Homeowners Trust Us With Their Claims

#box(fill: rgb("#e8f5e9"), inset: 12pt, radius: 4pt, width: 100%)[
- ✅ *24/7 Emergency Response* — Storm at 2am? We're on it.
- ✅ *Insurance-Ready Documentation* — We know what adjusters need
- ✅ *Direct Communication* — We talk to your insurance so you don't have to
- ✅ *No Upfront Costs* — Most repairs are fully covered by insurance
- ✅ *15-Year Warranty* — We stand behind every repair
- ✅ *4.9 Google Rating* — See what your neighbors say about us
]

#v(1em)

== Section 4: FAQ

*Q: How do I know if my roof has storm damage?*
A: Look for missing shingles, dents in gutters/vents, granules in downspouts, or water stains inside. But honestly — just call us. Our inspection is free.

*Q: Will filing a claim raise my insurance rates?*
A: In Utah, insurance companies cannot raise your rates for weather-related claims.

*Q: What if my insurance denies my claim?*
A: We help you appeal. Our documentation is thorough enough that denials are rare.

*Q: How long do I have to file a claim?*
A: Most policies require claims within 1 year, but sooner is always better.

*Q: Do you work with all insurance companies?*
A: Yes — State Farm, Allstate, Progressive, Farmers, USAA, and every major carrier in Utah.

*Q: What does "no upfront cost" mean?*
A: For insurance-covered repairs, you typically only pay your deductible.

#pagebreak()

== Section 5: Testimonials

#box(fill: rgb("#f5f5f5"), inset: 12pt, radius: 4pt, width: 100%)[
#text(style: "italic")["After a hailstorm destroyed our roof, XPERIENCE handled everything. They met with our adjuster, got our full claim approved, and had the new roof installed in two weeks."]
— Sarah M., South Jordan
]

#v(0.5em)

#box(fill: rgb("#f5f5f5"), inset: 12pt, radius: 4pt, width: 100%)[
#text(style: "italic")["I was worried insurance would lowball us, but the XPERIENCE team documented everything so thoroughly that we got the full replacement covered."]
— Mike T., Sandy
]

#v(1em)

== Section 6: Final CTA

*Headline:* Don't Wait — Damage Gets Worse

Utah storms don't give warning, and roof damage doesn't fix itself. The longer you wait, the more expensive repairs become.

*CTA Button:* Schedule Your Free Inspection →

*Phone:* (801) 251-6554

#v(1em)

== SEO Metadata

*Page Title:* Storm Damage Insurance Claims | XPERIENCE Roofing | Salt Lake City

*Meta Description:* Storm damaged your roof? XPERIENCE handles your insurance claim from inspection to repair. Free same-day inspections, direct adjuster communication, 15-year warranty. Call (801) 251-6554.

#pagebreak()

// ============ CITY PAGES ============

#text(18pt, weight: "bold")[City Landing Page Template]

#text(10pt, fill: rgb("#666"))[Create "[City] Roofing" pages to rank for local searches]

#v(1em)

== Why City Pages Matter

When someone searches "roofing Sandy Utah" or "roof repair West Jordan," Google looks for pages that specifically mention those cities. Without city pages, you're invisible for these searches.

*Competitors like American Roofing and Vertex have city pages. You don't.*

#v(1em)

== Template Structure

*URL:* `/roofing-[city]` (e.g., `/roofing-sandy`)

=== Hero Section
- Headline: "Trusted Roofing in [CITY], Utah"
- Subhead: "Roof replacement, repairs, and inspections from a local team that knows [CITY]."
- CTA: "Get Your Free [CITY] Roof Inspection →"

=== Local Introduction
- Why XPERIENCE serves [CITY]
- Local details (neighborhoods, landmarks)
- Specific challenges for roofs in that area

=== Services Grid
- Roof Replacement
- Roof Repair
- Free Inspections
- Storm Damage
- Commercial Roofing

=== Trust Signals
- Local Team, 15-Year Warranty, 4.9 Rating, Insurance Experts, 24/7 Emergency

=== Testimonial
- Quote from customer in or near that city

=== Service Area
- List nearby cities/neighborhoods

=== Final CTA
- Schedule inspection + phone number

#v(1em)

== Priority Cities (Create in This Order)

#box(fill: rgb("#e3f2fd"), inset: 12pt, radius: 4pt, width: 100%)[
*Tier 1 — Highest Priority*
1. Salt Lake City
2. West Valley City
3. West Jordan
4. Sandy
5. South Jordan

*Tier 2 — High Value*
6. Draper
7. Murray
8. Riverton
9. Herriman
10. Taylorsville

*Tier 3 — Expansion*
11. Cottonwood Heights
12. Holladay
13. Millcreek
14. Midvale
15. Kearns
]

#v(1em)

== Implementation Notes

1. *Don't duplicate content* — Each page needs unique local details
2. *Add local landmarks* — Shows Google you know the area
3. *Use city name 3-5 times* — In headline, body, CTA
4. *Add photos* — Local job sites if available
5. *Internal links* — Link city pages to service pages

#pagebreak()

== Example: Sandy Page

*URL:* `/roofing-sandy`

*Hero:* "Trusted Roofing in Sandy, Utah"

*Local Detail:*
#box(fill: rgb("#f5f5f5"), inset: 10pt, radius: 4pt, width: 100%)[
"From the neighborhoods near Dimple Dell to homes along 9400 South, we've helped Sandy families protect their biggest investment. Our team knows the specific roofing challenges in Sandy — the heavy snow loads, the summer storms rolling off the mountains, and the hail that seems to hit Sandy especially hard."
]

*Nearby Areas:* Draper, Cottonwood Heights, Midvale, South Jordan, Murray

#v(2em)

#align(center)[
  #box(fill: rgb("#1a237e"), inset: 16pt, radius: 4pt)[
    #text(fill: white, weight: "bold", size: 12pt)[Questions? Just ask Claw.]
  ]
]
