# XPERIENCE Schema Implementation Guide

**For:** Jamie Stagg / XPERIENCE Team
**Site:** xperienceroofing.com (Framer)

---

## What This Does

Schema markup tells Google exactly what your business is. Without it, you're invisible to rich search results. Your competitors have it. You don't. Let's fix that.

---

## Step-by-Step: Adding Schema to Framer

### Step 1: Open Framer Project Settings

1. Go to your Framer dashboard
2. Open the XPERIENCE project
3. Click the **gear icon** (Settings) in the top right
4. Select **"Custom Code"** from the sidebar

### Step 2: Paste This Code

In the **"End of <head> tag"** section, paste this entire block:

```html
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
    "Salt Lake City", "Sandy", "West Valley City", "West Jordan",
    "South Jordan", "Murray", "Draper", "Herriman", "Riverton",
    "Taylorsville", "Cottonwood Heights", "Holladay", "Millcreek"
  ],
  "priceRange": "$$",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
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
          "description": "Complete roof replacement with 15-year workmanship warranty"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Roof Repair",
          "description": "Emergency and scheduled roof repairs for all roof types"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Free Roof Inspection",
          "description": "Comprehensive roof inspection with detailed report"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Storm Damage Repair",
          "description": "24/7 emergency response for hail and wind damage"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Insurance Claim Assistance",
          "description": "Full documentation and insurance company coordination"
        }
      }
    ]
  },
  "sameAs": [
    "https://www.facebook.com/xperienceroofing",
    "https://www.instagram.com/xperienceroofing"
  ]
}
</script>
```

### Step 3: Save and Publish

1. Click **"Save"**
2. Click **"Publish"** to push changes live

---

## Verify It's Working

After publishing, test your schema:

1. Go to: https://search.google.com/test/rich-results
2. Enter: https://www.xperienceroofing.com
3. Click "Test URL"
4. You should see "RoofingContractor" detected with all your details

---

## What This Gets You

✅ **Rich snippets** in search results (star ratings, phone number)
✅ **Knowledge panel** potential for branded searches
✅ **Better local pack** visibility
✅ **Voice search** compatibility ("Hey Google, find a roofer near me")

---

## Questions?

If anything's unclear, just ask. This is a 2-minute copy-paste job that competitors spent thousands with SEO agencies to get.

---

*Prepared by Claw | XPERIENCE In-House AI*
