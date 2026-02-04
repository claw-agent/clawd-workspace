# Programmatic SEO (pSEO) Architecture Guide

**Deep Research Report** | January 2026  
*Research on scaling to 100k+ pages with Next.js*

---

## Table of Contents
1. [What is Programmatic SEO?](#what-is-programmatic-seo)
2. [Successful pSEO Examples](#successful-pseo-examples)
3. [Hub-and-Spoke Internal Linking Model](#hub-and-spoke-internal-linking-model)
4. [Next.js Technical Implementation](#nextjs-technical-implementation)
5. [Sitemap & Indexing Strategy](#sitemap--indexing-strategy)
6. [Schema Markup & Structured Data](#schema-markup--structured-data)
7. [Tools & Libraries](#tools--libraries)
8. [Google Algorithm Considerations & Gotchas](#google-algorithm-considerations--gotchas)
9. [Application Ideas for Marb](#application-ideas-for-marb)
10. [Resources & Links](#resources--links)

---

## What is Programmatic SEO?

Programmatic SEO is using **automation to publish a large number of webpages** designed to rank in search results for many keywords. It typically involves:

- **Templates** - Reusable page layouts that get populated with data
- **Data sources** - Databases, APIs, scraped content, or proprietary datasets
- **Long-tail keywords** - Highly specific search queries with lower competition
- **Scale** - Dozens to hundreds of thousands of pages

### Why pSEO Works

1. **Long-tail dominance** - 70% of searches are long-tail queries
2. **Compound traffic** - Each page might get 10-100 visits/month, but 100k pages = massive traffic
3. **Lower competition** - Specific queries have fewer competing pages
4. **User intent match** - Specific pages match specific search intent perfectly

### pSEO Formula

```
[Head Term] + [Modifier] = Page

Examples:
- "best [software category] for [industry]" → best CRM for restaurants
- "[city] [service]" → Denver plumbers  
- "[product A] vs [product B]" → Notion vs Trello
- "[tool] integrations" → Slack integrations
```

---

## Successful pSEO Examples

### 1. Zapier (zapier.com/apps)
**Strategy:** Integration pages for every app combination  
**Scale:** ~10,000+ pages  
**Pattern:** `/apps/[app1]/integrations/[app2]`

Key elements:
- One page per integration pair
- Automated content describing what the integration does
- User-generated Zap templates
- Strong internal linking between related apps

### 2. G2 (g2.com/categories)
**Strategy:** Software category and comparison pages  
**Scale:** 100,000+ pages  
**Pattern:** `/categories/[category]` → `/products/[product]` → `/compare/[product-vs-product]`

Key elements:
- Hierarchical category structure (hub-and-spoke)
- User reviews as unique content
- Dynamic badges and ratings
- "[Product] alternatives" pages

### 3. Yelp
**Strategy:** Local business directory  
**Scale:** Millions of pages  
**Pattern:** `/[city]/[category]` → `/biz/[business-slug]`

Key elements:
- City + category landing pages
- Individual business pages
- User reviews for unique content
- Structured data for local business

### 4. Tripadvisor
**Strategy:** Travel destinations and attractions  
**Scale:** Millions of pages  
**Pattern:** `/Things-To-Do-[city]` → `/Attraction_Review-[attraction]`

Key elements:
- Destination landing pages
- Activity/attraction sub-pages
- User reviews and ratings
- Booking integrations

### 5. Wise (wise.com)
**Strategy:** Currency conversion pages  
**Scale:** ~30,000+ pages  
**Pattern:** `/[currency1]-to-[currency2]-rate`

Key elements:
- Every currency pair combination
- Live exchange rate data
- Historical rate charts
- Conversion calculator widget

### 6. NomadList
**Strategy:** City guides for digital nomads  
**Scale:** ~2,000+ cities  
**Pattern:** `/[city]`

Key elements:
- Data-driven city scores
- User-generated content (reviews, costs)
- Filters create additional landing pages
- Strong community engagement

---

## Hub-and-Spoke Internal Linking Model

The hub-and-spoke (also called "topic clusters" or "content silos") model is **critical for pSEO success**.

### Structure

```
                    [HUB PAGE]
                   /    |    \
                  /     |     \
           [SPOKE]  [SPOKE]  [SPOKE]
              |        |        |
           [SPOKE]  [SPOKE]  [SPOKE]
```

### Implementation

**Hub Page (Pillar Content)**
- Broad topic overview
- Links to ALL related spoke pages
- Targets high-volume, competitive keywords
- Example: `/crm-software`

**Spoke Pages (Cluster Content)**  
- Specific subtopics
- Link back to hub page
- Link to 2-3 related spokes
- Target long-tail keywords
- Example: `/crm-software/for-real-estate`

### Code Example: Internal Linking Component

```tsx
// components/InternalLinks.tsx
interface RelatedPage {
  title: string;
  slug: string;
  type: 'hub' | 'spoke';
}

export function InternalLinks({ 
  hubPage, 
  relatedSpokes,
  currentSlug 
}: { 
  hubPage: RelatedPage;
  relatedSpokes: RelatedPage[];
  currentSlug: string;
}) {
  return (
    <nav className="internal-links">
      {/* Always link back to hub */}
      <div className="hub-link">
        <span>Part of:</span>
        <a href={`/${hubPage.slug}`}>{hubPage.title}</a>
      </div>
      
      {/* Related spokes (limit to 5-10) */}
      <div className="related-topics">
        <h3>Related Topics</h3>
        <ul>
          {relatedSpokes
            .filter(page => page.slug !== currentSlug)
            .slice(0, 8)
            .map(page => (
              <li key={page.slug}>
                <a href={`/${page.slug}`}>{page.title}</a>
              </li>
            ))}
        </ul>
      </div>
    </nav>
  );
}
```

### Internal Linking Best Practices

1. **Every spoke links to its hub** - Non-negotiable
2. **Hub links to ALL spokes** - Use a comprehensive index
3. **Cross-link related spokes** - 3-5 contextual links
4. **Use descriptive anchor text** - Not "click here"
5. **Implement breadcrumbs** - Shows hierarchy
6. **Add "Related Content" sections** - Automated based on category

---

## Next.js Technical Implementation

### Project Structure for pSEO

```
app/
├── page.tsx                          # Homepage
├── [category]/
│   ├── page.tsx                      # Hub/category page
│   └── [slug]/
│       └── page.tsx                  # Spoke/item page
├── compare/
│   └── [slug1]-vs-[slug2]/
│       └── page.tsx                  # Comparison pages
└── sitemap.ts                        # Dynamic sitemap
```

### Static Generation with generateStaticParams

This is the **core of pSEO in Next.js** - pre-rendering pages at build time.

```tsx
// app/[category]/[slug]/page.tsx
import { notFound } from 'next/navigation';

// Generate all paths at build time
export async function generateStaticParams() {
  // Fetch from your database/CMS/API
  const items = await getAllItems();
  
  return items.map((item) => ({
    category: item.category,
    slug: item.slug,
  }));
}

// For 100k+ pages, generate a subset at build time
// and render the rest on-demand
export const dynamicParams = true; // Allow unlisted paths

export default async function ItemPage({ 
  params 
}: { 
  params: Promise<{ category: string; slug: string }> 
}) {
  const { category, slug } = await params;
  const item = await getItem(category, slug);
  
  if (!item) {
    notFound();
  }
  
  return (
    <article>
      <h1>{item.title}</h1>
      {/* Page content */}
    </article>
  );
}
```

### Incremental Static Regeneration (ISR)

For data that changes, use ISR to revalidate pages periodically:

```tsx
// Option 1: Time-based revalidation
export const revalidate = 3600; // Revalidate every hour

// Option 2: On-demand revalidation
// In your API route or server action:
import { revalidatePath, revalidateTag } from 'next/cache';

export async function updateItem(id: string) {
  // Update database
  await db.items.update(id, data);
  
  // Revalidate the specific page
  revalidatePath(`/items/${id}`);
  
  // Or revalidate by tag
  revalidateTag('items');
}
```

### Dynamic Metadata Generation

Critical for pSEO - unique meta tags for each page:

```tsx
// app/[category]/[slug]/page.tsx
import { Metadata } from 'next';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ category: string; slug: string }> 
}): Promise<Metadata> {
  const { category, slug } = await params;
  const item = await getItem(category, slug);
  
  if (!item) {
    return { title: 'Not Found' };
  }
  
  return {
    title: `${item.name} - Best ${item.category} Software | MySite`,
    description: `${item.description.slice(0, 150)}...`,
    openGraph: {
      title: item.name,
      description: item.description,
      images: [item.image],
      type: 'website',
    },
    alternates: {
      canonical: `https://mysite.com/${category}/${slug}`,
    },
  };
}
```

### Template Pattern for pSEO Pages

```tsx
// app/[category]/[slug]/page.tsx
import { InternalLinks } from '@/components/InternalLinks';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { TableOfContents } from '@/components/TableOfContents';

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  const relatedProducts = await getRelatedProducts(product.category);
  const hubPage = await getHubPage(product.category);

  return (
    <>
      {/* Schema markup for rich results */}
      <SchemaMarkup data={product} type="SoftwareApplication" />
      
      <article>
        {/* Breadcrumbs for hierarchy */}
        <nav aria-label="breadcrumb">
          <a href="/">Home</a> › 
          <a href={`/${product.category}`}>{product.categoryName}</a> › 
          <span>{product.name}</span>
        </nav>

        <h1>{product.name}</h1>
        
        {/* Dynamic content sections */}
        <section id="overview">
          <h2>Overview</h2>
          <p>{product.description}</p>
        </section>

        <section id="features">
          <h2>Key Features</h2>
          <ul>
            {product.features.map(f => <li key={f}>{f}</li>)}
          </ul>
        </section>

        <section id="pricing">
          <h2>Pricing</h2>
          {/* Pricing table */}
        </section>

        <section id="alternatives">
          <h2>{product.name} Alternatives</h2>
          {/* Links to competitor pages */}
        </section>

        {/* Internal links component */}
        <InternalLinks 
          hubPage={hubPage}
          relatedSpokes={relatedProducts}
          currentSlug={slug}
        />
      </article>
    </>
  );
}
```

### Handling 100k+ Pages

For very large sites, generate pages on-demand:

```tsx
// app/[category]/[slug]/page.tsx

// Only pre-render top 1000 pages at build time
export async function generateStaticParams() {
  const topPages = await getTopPagesByTraffic(1000);
  return topPages.map(p => ({ category: p.category, slug: p.slug }));
}

// Allow any path - will generate on first request
export const dynamicParams = true;

// Cache generated pages for 24 hours
export const revalidate = 86400;
```

### Performance Optimization

```tsx
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Generate static pages in parallel
  experimental: {
    // Increase concurrent page generation
    cpus: 4,
  },
  
  // Image optimization
  images: {
    domains: ['your-cdn.com'],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Cache headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

---

## Sitemap & Indexing Strategy

### Using next-sitemap

Install and configure:

```bash
npm install next-sitemap
```

```js
// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://example.com',
  generateRobotsTxt: true,
  
  // Split into multiple sitemaps (Google limit: 50,000 URLs per sitemap)
  sitemapSize: 7000,
  
  // Exclude certain paths
  exclude: ['/admin/*', '/api/*', '/private/*'],
  
  // Custom transformation
  transform: async (config, path) => {
    // Set priority based on path depth
    const depth = path.split('/').length - 1;
    const priority = Math.max(0.1, 1 - (depth * 0.2));
    
    return {
      loc: path,
      changefreq: depth === 0 ? 'daily' : 'weekly',
      priority: priority,
      lastmod: new Date().toISOString(),
    };
  },
  
  // For dynamic pages, add additional paths
  additionalPaths: async (config) => {
    const dynamicPaths = await fetchAllDynamicPaths();
    return dynamicPaths.map(path => ({
      loc: path,
      changefreq: 'weekly',
      priority: 0.7,
    }));
  },
  
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: '/api/' },
    ],
    additionalSitemaps: [
      'https://example.com/server-sitemap-index.xml',
    ],
  },
};
```

Add to package.json:

```json
{
  "scripts": {
    "build": "next build",
    "postbuild": "next-sitemap"
  }
}
```

### Server-Side Dynamic Sitemaps

For 100k+ URLs, generate sitemaps dynamically:

```tsx
// app/sitemap.ts
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://example.com';
  
  // Get all items from database
  const items = await getAllItems();
  
  const itemUrls = items.map((item) => ({
    url: `${baseUrl}/${item.category}/${item.slug}`,
    lastModified: item.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...itemUrls,
  ];
}
```

### Sitemap Index for Large Sites

```tsx
// app/server-sitemap-index.xml/route.ts
import { getServerSideSitemapIndex } from 'next-sitemap';

export async function GET() {
  // Get total count
  const totalItems = await getItemCount();
  const perSitemap = 5000;
  const sitemapCount = Math.ceil(totalItems / perSitemap);
  
  // Generate sitemap URLs
  const sitemaps = Array.from({ length: sitemapCount }, (_, i) => 
    `https://example.com/sitemap-${i}.xml`
  );
  
  return getServerSideSitemapIndex(sitemaps);
}

// app/sitemap-[id].xml/route.ts
import { getServerSideSitemap } from 'next-sitemap';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const page = parseInt(params.id);
  const perPage = 5000;
  
  const items = await getItemsPaginated(page, perPage);
  
  const fields = items.map(item => ({
    loc: `https://example.com/${item.category}/${item.slug}`,
    lastmod: item.updatedAt.toISOString(),
  }));
  
  return getServerSideSitemap(fields);
}
```

---

## Schema Markup & Structured Data

Structured data is **essential for pSEO** - it enables rich results in Google.

### JSON-LD Implementation

```tsx
// components/SchemaMarkup.tsx
import Script from 'next/script';

interface SchemaProps {
  type: 'Product' | 'SoftwareApplication' | 'Article' | 'LocalBusiness' | 'FAQPage';
  data: any;
}

export function SchemaMarkup({ type, data }: SchemaProps) {
  const schema = generateSchema(type, data);
  
  return (
    <Script
      id={`schema-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function generateSchema(type: string, data: any) {
  switch (type) {
    case 'SoftwareApplication':
      return {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: data.name,
        description: data.description,
        applicationCategory: data.category,
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: data.price || '0',
          priceCurrency: 'USD',
        },
        aggregateRating: data.rating ? {
          '@type': 'AggregateRating',
          ratingValue: data.rating,
          ratingCount: data.reviewCount,
        } : undefined,
      };
      
    case 'Article':
      return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: data.title,
        description: data.description,
        image: data.image,
        datePublished: data.publishedAt,
        dateModified: data.updatedAt,
        author: {
          '@type': 'Person',
          name: data.author,
        },
      };
      
    case 'FAQPage':
      return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: data.questions.map((q: any) => ({
          '@type': 'Question',
          name: q.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: q.answer,
          },
        })),
      };
      
    case 'BreadcrumbList':
      return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: data.items.map((item: any, index: number) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      };
      
    default:
      return data;
  }
}
```

### Using next-seo Library

```tsx
// components/ProductSchema.tsx
import { ProductJsonLd, FAQPageJsonLd, BreadcrumbJsonLd } from 'next-seo';

export function ProductPageSchema({ product, breadcrumbs, faqs }) {
  return (
    <>
      <ProductJsonLd
        productName={product.name}
        images={[product.image]}
        description={product.description}
        brand={product.brand}
        aggregateRating={{
          ratingValue: product.rating,
          reviewCount: product.reviewCount,
        }}
        offers={{
          price: product.price,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        }}
      />
      
      <BreadcrumbJsonLd
        itemListElements={breadcrumbs.map((crumb, i) => ({
          position: i + 1,
          name: crumb.name,
          item: crumb.url,
        }))}
      />
      
      {faqs && faqs.length > 0 && (
        <FAQPageJsonLd
          mainEntity={faqs.map(faq => ({
            questionName: faq.question,
            acceptedAnswerText: faq.answer,
          }))}
        />
      )}
    </>
  );
}
```

---

## Tools & Libraries

### Essential Tools

| Tool | Purpose | Link |
|------|---------|------|
| **next-sitemap** | Sitemap generation | [GitHub](https://github.com/iamvishnusankar/next-sitemap) |
| **next-seo** | SEO components & JSON-LD | [GitHub](https://github.com/garmeeh/next-seo) |
| **SEOitis.com** | SEO audit tool (by @kalashbuilds) | [seoitis.com](https://seoitis.com) |
| **Schema.org** | Structured data vocabulary | [schema.org](https://schema.org) |
| **Google Rich Results Test** | Validate structured data | [Google Tool](https://search.google.com/test/rich-results) |
| **Screaming Frog** | Technical SEO crawler | [screamingfrog.co.uk](https://www.screamingfrog.co.uk) |

### Data Sources for pSEO

- **APIs**: Product databases, government data, financial APIs
- **Web scraping**: (with permission) competitor data, public datasets
- **User-generated**: Reviews, comments, community content
- **AI-generated**: GPT for unique descriptions (with human editing)
- **Aggregated**: Combine multiple data sources

### Content Generation

```tsx
// lib/content-generator.ts
import OpenAI from 'openai';

const openai = new OpenAI();

export async function generateProductDescription(product: {
  name: string;
  features: string[];
  category: string;
}) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: `You are an expert product writer. Write unique, 
        helpful product descriptions. Focus on benefits, not just features.
        Be concise but informative. Avoid generic marketing speak.`
      },
      {
        role: 'user',
        content: `Write a 150-word description for ${product.name}, 
        a ${product.category} tool with these features: ${product.features.join(', ')}`
      }
    ],
    max_tokens: 300,
  });
  
  return response.choices[0].message.content;
}
```

**⚠️ Important**: AI-generated content must add value. Google penalizes "scaled content abuse" - mass-produced content with little value. Always:
- Add unique data points
- Include user reviews/testimonials
- Provide genuinely useful information
- Have humans review and edit

---

## Google Algorithm Considerations & Gotchas

### What Google Says About Scaled Content

From Google's Spam Policies:

> **Scaled content abuse** is when many pages are generated for the primary purpose of manipulating search rankings and not helping users. This includes:
> - Using generative AI tools to generate many pages without adding value
> - Scraping feeds or search results to generate many pages
> - Stitching or combining content from different web pages without adding value
> - Creating many pages where the content makes little or no sense

### How to Stay Safe

1. **Add Genuine Value**
   - Unique data points not found elsewhere
   - Original analysis or insights
   - User-generated content (reviews, comments)
   - Proprietary tools or calculators

2. **Quality Over Quantity**
   - Better to have 10k excellent pages than 100k thin ones
   - Each page should answer a real user query
   - If you wouldn't want to land on the page, don't publish it

3. **Avoid Doorway Pages**
   - Don't create multiple similar pages targeting slight keyword variations
   - Bad: `/best-crm-denver`, `/top-crm-denver`, `/crm-software-denver`
   - Good: `/crm-software/denver` with comprehensive content

4. **Crawl Budget Management**
   - Google has limited crawl budget for your site
   - Block low-value pages in robots.txt
   - Use `noindex` for filter/sort variations
   - Keep sitemaps up to date
   - Return proper 404s for removed pages
   - Avoid long redirect chains

### Common pSEO Failures

| Failure | Why It Happens | Solution |
|---------|----------------|----------|
| **Thin content** | Template + minimal data | Add 300+ words unique content per page |
| **Duplicate content** | Same template, similar data | Ensure 70%+ unique content per page |
| **Indexing issues** | Too many similar pages | Use canonical tags, consolidate |
| **Slow crawling** | Crawl budget exhausted | Prioritize important pages |
| **Manual penalty** | Google spam detection | Focus on user value |
| **Cannibalization** | Multiple pages for same keyword | One page per intent |

### Canonical Tags

Prevent duplicate content issues:

```tsx
// In generateMetadata
export async function generateMetadata({ params }) {
  return {
    alternates: {
      canonical: `https://example.com/${params.category}/${params.slug}`,
    },
  };
}
```

### Handling Filters & Sorting

```tsx
// For pages with filters, use noindex
export const metadata = {
  robots: {
    index: false, // Don't index filter pages
    follow: true, // But follow links
  },
};

// Or block in robots.txt
// Disallow: /*?sort=
// Disallow: /*?filter=
```

---

## Application Ideas for Marb

Based on the research, here are pSEO project ideas:

### 1. Developer Tools Directory
**Pattern**: `/tools/[category]/[tool]`
- Categories: APIs, CLI tools, VS Code extensions, etc.
- Data: GitHub API, npm registry, VS Code marketplace
- Unique value: Usage stats, alternatives, real user reviews

### 2. AI Prompt Library
**Pattern**: `/prompts/[use-case]/[prompt-name]`
- Categories: coding, writing, image gen, etc.
- Data: Community-submitted prompts
- Unique value: Success ratings, output examples, variations

### 3. Tech Salary/Cost Comparison
**Pattern**: `/salaries/[role]/[city]` or `/cost-of-living/[city]`
- Data: Public datasets, aggregated salary APIs
- Unique value: Calculator tools, historical trends

### 4. SaaS Pricing Tracker
**Pattern**: `/pricing/[category]/[product]`
- Data: Scraped/updated pricing from SaaS sites
- Unique value: Price history, comparison tables

### 5. API Documentation Hub
**Pattern**: `/apis/[category]/[api-name]`
- Data: OpenAPI specs, API directories
- Unique value: Code examples, SDKs, community tips

### Quick Start Template

```bash
# Clone a starter
npx create-next-app@latest my-pseo-site --typescript --tailwind --app

# Add dependencies
cd my-pseo-site
npm install next-sitemap next-seo

# Set up structure
mkdir -p app/\[category\]/\[slug\]
mkdir -p lib
mkdir -p components

# Create basic files
touch app/\[category\]/page.tsx          # Hub page
touch app/\[category\]/\[slug\]/page.tsx  # Spoke page
touch next-sitemap.config.js
touch lib/data.ts
touch components/SchemaMarkup.tsx
```

---

## Resources & Links

### Official Documentation
- [Next.js ISR Guide](https://nextjs.org/docs/pages/guides/incremental-static-regeneration)
- [Next.js generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)
- [Next.js generateMetadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Google Structured Data Guide](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- [Google Spam Policies](https://developers.google.com/search/docs/essentials/spam-policies)
- [Google Crawl Budget](https://developers.google.com/crawling/docs/crawl-budget)
- [Sitemaps Overview](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)

### Tools
- [next-sitemap](https://github.com/iamvishnusankar/next-sitemap) - Sitemap generator
- [next-seo](https://github.com/garmeeh/next-seo) - SEO components
- [SEOitis](https://seoitis.com) - SEO audit tool
- [Schema.org](https://schema.org) - Structured data vocabulary
- [Google Rich Results Test](https://search.google.com/test/rich-results)

### Case Studies & Examples
- Zapier Apps - https://zapier.com/apps
- G2 Categories - https://g2.com/categories
- Wise Currency - https://wise.com
- Yelp - https://yelp.com
- Tripadvisor - https://tripadvisor.com

### Semrush pSEO Guide
- [What Is Programmatic SEO?](https://www.semrush.com/blog/programmatic-seo/)

---

## Summary Checklist

Before launching a pSEO site:

- [ ] **Data source identified** - API, database, or scraping strategy
- [ ] **Template designed** - Reusable, SEO-optimized page template
- [ ] **Unique value defined** - What makes each page worth visiting?
- [ ] **Internal linking planned** - Hub-and-spoke structure mapped
- [ ] **Metadata strategy** - Unique title/description per page
- [ ] **Schema markup** - JSON-LD for rich results
- [ ] **Sitemap strategy** - Split sitemaps for large sites
- [ ] **ISR configured** - Revalidation strategy for fresh data
- [ ] **Crawl budget optimized** - robots.txt, noindex where needed
- [ ] **Quality assurance** - Human review of sample pages
- [ ] **Monitoring setup** - Google Search Console, analytics

---

*Research compiled January 2026. pSEO landscape evolves - stay updated with Google's guidelines.*
