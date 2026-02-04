# Bjorn's Brew Website

A modern, responsive website for Bjorn's Brew coffee shop built with Next.js 14, Tailwind CSS, and TypeScript.

## Features

- 🎨 **Modern Design** - Clean, coffee shop aesthetic with forest green, beige, and pink color palette
- 📱 **Mobile-First** - Fully responsive design that works on all devices
- ⚡ **Fast Performance** - Built with Next.js 14 App Router for optimal performance
- 🎯 **SEO Optimized** - Complete metadata and Open Graph tags
- ♿ **Accessible** - WCAG-compliant with semantic HTML and focus states

## Pages

- **Home** - Hero, about preview, locations grid, mission banner, testimonials, newsletter
- **Menu** - Coffee, espresso, tea, specialty drinks, and pastries with dietary indicators
- **About** - Brand story, Bjorn's legacy, timeline, mission, and charity partners
- **Locations** - Map, location cards with hours/features/directions
- **Contact** - Contact form, quick contact info, FAQ accordion

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Icons:** Lucide React
- **Fonts:** Poppins (headings) & Inter (body) via Google Fonts

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deploy to Vercel

```bash
# Install Vercel CLI if needed
npm i -g vercel

# Deploy
vercel
```

## Project Structure

```
site/
├── app/
│   ├── layout.tsx          # Root layout (Nav + Footer)
│   ├── page.tsx            # Home page
│   ├── menu/page.tsx       # Menu page
│   ├── about/page.tsx      # About page
│   ├── locations/page.tsx  # Locations page
│   └── contact/            # Contact page
├── components/
│   ├── ui/                 # Base components (Button, Input, Textarea)
│   ├── layout/             # Nav, Footer
│   ├── sections/           # Hero, Testimonials, Newsletter, etc.
│   └── cards/              # LocationCard, MenuCard, TestimonialCard
├── lib/
│   ├── utils.ts            # Utility functions (cn)
│   └── data/               # Static data (locations, menu, testimonials)
└── public/                 # Static assets
```

## Design Tokens

- **Primary:** #226246 (Forest Green)
- **Secondary:** #d8d8ca (Beige), #ddc2cd (Pink)
- **Background:** #faf9f6 (Cream)

## License

© 2026 Bjorn's Brew. All rights reserved.
