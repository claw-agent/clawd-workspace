# SaaS/Tech Website Template

Modern, conversion-optimized landing page template for software and tech companies.

## Template File
`saas-tech.html`

## Test/Preview File
`test-saas-template.html` - Fully rendered example with "FlowSync" branding

## Design Style
- Clean, modern SaaS aesthetic
- Lots of whitespace
- Gradient accents
- Rounded corners (2xl = 16px)
- Inter font family
- Soft shadows with hover effects

## Template Variables

### Core Branding
| Variable | Description | Example |
|----------|-------------|---------|
| `{{company_name}}` | Company name | FlowSync |
| `{{tagline}}` | Main tagline/value prop | Connect your tools, automate everything |
| `{{logo_url}}` | Logo image URL | /logo.svg |
| `{{primary_color}}` | Primary brand color (hex) | #6366f1 |
| `{{primary_color_dark}}` | Darker shade for gradients | #4f46e5 |

### Hero Section
| Variable | Description | Example |
|----------|-------------|---------|
| `{{headline}}` | Main headline (first part) | Automate your workflow with |
| `{{headline_highlight}}` | Highlighted gradient text | AI-powered sync |
| `{{hero_image}}` | Product screenshot URL | /dashboard.png |
| `{{cta_text}}` | Primary CTA button text | Start Free Trial |
| `{{user_count}}` | Social proof number | 2,500 |
| `{{free_trial_days}}` | Trial length | 14 |

### Features Section
| Variable | Description | Example |
|----------|-------------|---------|
| `{{features_headline}}` | Features section verb | automate your workflow |
| `{{features_subheadline}}` | Features description | Powerful features that help teams... |
| `{{feature_1_title}}` | Feature 1 title | Lightning Fast Sync |
| `{{feature_1_description}}` | Feature 1 description | Real-time data synchronization... |
| `{{feature_2_title}}` | Feature 2 title | Smart Analytics |
| `{{feature_2_description}}` | Feature 2 description | AI-powered insights... |
| `{{feature_3_title}}` | Feature 3 title | Enterprise Security |
| `{{feature_3_description}}` | Feature 3 description | SOC 2 compliant... |
| `{{feature_4_title}}` | Feature 4 title | Team Collaboration |
| `{{feature_4_description}}` | Feature 4 description | Built for teams... |

### How It Works Section
| Variable | Description | Example |
|----------|-------------|---------|
| `{{how_it_works_subheadline}}` | Section description | Three simple steps... |
| `{{step_1_title}}` | Step 1 title | Connect Your Tools |
| `{{step_1_description}}` | Step 1 description | Integrate with 100+ apps... |
| `{{step_2_title}}` | Step 2 title | Build Your Workflow |
| `{{step_2_description}}` | Step 2 description | Use our visual builder... |
| `{{step_3_title}}` | Step 3 title | Watch It Work |
| `{{step_3_description}}` | Step 3 description | Sit back and let us handle... |

### Pricing Section
| Variable | Description | Example |
|----------|-------------|---------|
| `{{plan_1_name}}` | First tier name | Starter |
| `{{plan_1_description}}` | First tier description | Perfect for individuals... |
| `{{plan_1_price}}` | First tier price | 0 |
| `{{plan_1_feature_1}}` | First tier feature 1 | Up to 100 syncs/month |
| `{{plan_1_feature_2}}` | First tier feature 2 | 5 integrations |
| `{{plan_1_feature_3}}` | First tier feature 3 | Email support |
| `{{plan_2_name}}` | Second tier name | Pro |
| `{{plan_2_description}}` | Second tier description | For growing teams... |
| `{{plan_2_price}}` | Second tier price | 29 |
| `{{plan_2_feature_1-4}}` | Second tier features | Unlimited syncs, etc. |
| `{{plan_3_name}}` | Third tier name | Enterprise |
| `{{plan_3_description}}` | Third tier description | For large organizations... |
| `{{plan_3_feature_1-4}}` | Third tier features | Custom, SLA, etc. |

### Testimonials Section
| Variable | Description | Example |
|----------|-------------|---------|
| `{{testimonial_1_quote}}` | First testimonial text | FlowSync has transformed... |
| `{{testimonial_1_name}}` | First testimonial name | Sarah Chen |
| `{{testimonial_1_title}}` | First testimonial title | VP of Operations, TechCorp |
| `{{testimonial_2_quote}}` | Second testimonial text | Best investment we've made... |
| `{{testimonial_2_name}}` | Second testimonial name | Marcus Johnson |
| `{{testimonial_2_title}}` | Second testimonial title | CEO, StartupXYZ |
| `{{testimonial_3_quote}}` | Third testimonial text | Finally, a tool that works... |
| `{{testimonial_3_name}}` | Third testimonial name | Emily Rodriguez |
| `{{testimonial_3_title}}` | Third testimonial title | Product Lead, InnovateCo |

### Footer Section
| Variable | Description | Example |
|----------|-------------|---------|
| `{{footer_description}}` | Company description | The intelligent workflow automation... |
| `{{twitter_url}}` | Twitter profile URL | https://twitter.com/flowsync |
| `{{linkedin_url}}` | LinkedIn profile URL | https://linkedin.com/company/flowsync |
| `{{github_url}}` | GitHub profile URL | https://github.com/flowsync |
| `{{privacy_url}}` | Privacy policy URL | /privacy |
| `{{terms_url}}` | Terms of service URL | /terms |
| `{{cookies_url}}` | Cookie policy URL | /cookies |
| `{{current_year}}` | Current year | 2025 |
| `{{cta_benefit}}` | CTA benefit phrase | automate their workflow |

### Array Support (Handlebars)
The template also supports Handlebars-style arrays:
- `{{#each features}}` - Loop through features array
- `{{#each testimonials}}` - Loop through testimonials array  
- `{{#each logos}}` - Loop through customer logos

## Sections Included
1. ✅ Fixed navigation with CTA
2. ✅ Hero with product screenshot + social proof
3. ✅ Logo strip (trusted by)
4. ✅ Features grid (4 cards)
5. ✅ How It Works (3 steps)
6. ✅ Pricing tiers (3 plans)
7. ✅ Testimonials (3 cards)
8. ✅ Final CTA with gradient background
9. ✅ Footer with links + social

## Technologies
- Tailwind CSS via CDN
- Inter font (Google Fonts)
- SVG icons (inline)
- Smooth scroll JavaScript
- CSS gradients and transitions
- Mobile-responsive (sm/md/lg breakpoints)
