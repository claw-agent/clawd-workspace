# UI/UX Specification - LeadGen SaaS

**Version:** 1.0  
**Author:** Product Designer  
**Date:** January 28, 2026  
**Philosophy:** Ship fast. Functional > Beautiful. V1 is about proving value, V2 is about polish.

---

## Table of Contents

1. [Design Principles](#1-design-principles)
2. [User Flows](#2-user-flows)
3. [Key Screens](#3-key-screens)
4. [Component Library](#4-component-library)
5. [Realtime Elements](#5-realtime-elements)
6. [Mobile Considerations](#6-mobile-considerations)
7. [Onboarding Flow](#7-onboarding-flow)
8. [Inspiration & References](#8-inspiration--references)

---

## 1. Design Principles

### V1 Mantras
- **"One click to value"** — Minimize steps to see first leads
- **"Show the work"** — Make AI agent activity visible (trust through transparency)
- **"Progressive disclosure"** — Simple defaults, power features hidden until needed
- **"Copy > Design"** — Words matter more than pixels at this stage

### Technical Constraints
- **Stack:** Next.js 14 + Tailwind CSS + shadcn/ui
- **No custom components** — Use shadcn/ui primitives exclusively
- **No animations** (V1) — Add delight in V2
- **Mobile-responsive** — Not mobile-first, but must work on tablets

### Visual Direction
- Clean, dense data views (think Linear, not Notion)
- Monospace fonts for data/stats (trust signal)
- High contrast, accessible colors
- Dark mode optional for V1 (nice-to-have)

---

## 2. User Flows

### Flow 1: Signup → First Campaign → See Leads

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Landing   │───▶│   Signup    │───▶│  Onboarding │───▶│  Dashboard  │
│    Page     │    │   (Email)   │    │   (3 steps) │    │  (Empty)    │
└─────────────┘    └─────────────┘    └─────────────┘    └──────┬──────┘
                                                                 │
                   ┌─────────────────────────────────────────────┘
                   │
                   ▼
           ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
           │   Create    │───▶│   Agent     │───▶│  Lead List  │
           │  Campaign   │    │  Working... │    │   View      │
           │  (Wizard)   │    │  (Realtime) │    │  (Results!) │
           └─────────────┘    └─────────────┘    └─────────────┘
```

**Step-by-step:**

1. **Landing Page** → Click "Start Free Trial" (no credit card)
2. **Signup** → Email + password only (no name, no company—friction kills)
3. **Onboarding Step 1** → "What do you sell?" (dropdown: Web Design, Marketing, etc.)
4. **Onboarding Step 2** → "Who's your ideal customer?" (dropdown: Restaurants, Dentists, etc.)
5. **Onboarding Step 3** → "Where?" (location picker—city/zip/radius)
6. **Dashboard (Empty State)** → Big CTA: "Find Your First 50 Leads" (pre-filled from onboarding)
7. **Campaign Created** → Redirect to campaign view with realtime agent activity
8. **Leads Appear** → ~30-60 seconds for first results, continue streaming in
9. **AHA Moment** → User sees 50 qualified leads with websites scored, contacts found

**Time to value target: < 3 minutes from signup to first leads**

---

### Flow 2: See Leads → Send Outreach

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  Lead List  │───▶│Lead Detail  │───▶│  Generate   │───▶│  Outreach   │
│   View      │    │   Panel     │    │   Emails    │    │   Queue     │
└─────────────┘    └─────────────┘    └─────────────┘    └──────┬──────┘
                                                                 │
                   ┌─────────────────────────────────────────────┘
                   │
                   ▼
           ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
           │   Review    │───▶│   Approve   │───▶│    Sent     │
           │   & Edit    │    │   & Send    │    │  (Success!) │
           └─────────────┘    └─────────────┘    └─────────────┘
```

**Step-by-step:**

1. **Lead List** → Select leads (checkbox) or "Select All A-Tier"
2. **Bulk Action** → Click "Generate Outreach" 
3. **Email Generation** → Agent writes personalized emails (show progress)
4. **Outreach Queue** → See all pending emails in approval queue
5. **Review** → Click to preview, edit if needed
6. **Approve** → One-click approve, or bulk approve
7. **Send** → Emails sent via Instantly (shows status)

---

### Flow 3: Returning User - Check Campaign Status

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Login     │───▶│  Dashboard  │───▶│  Campaign   │
│             │    │  (Summary)  │    │   Detail    │
└─────────────┘    └─────────────┘    └─────────────┘
```

**Dashboard shows:**
- Total leads found (all campaigns)
- Emails sent / opened / replied
- Top performing campaigns
- Quick actions: "Create New Campaign", "View Outreach Queue"

---

## 3. Key Screens

### 3.1 Dashboard

**Layout:** Single column, card-based

```
┌────────────────────────────────────────────────────────────┐
│  [Logo]                          [Notifications] [Profile] │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  Welcome back, {firstName}                                 │
│                                                            │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐       │
│  │ 1,247        │ │ 156          │ │ 23           │       │
│  │ Total Leads  │ │ Emails Sent  │ │ Replies      │       │
│  │ ↑ 47 today   │ │ 32% open     │ │ 14.7% rate   │       │
│  └──────────────┘ └──────────────┘ └──────────────┘       │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ Active Campaigns                          [+ New]   │  │
│  ├─────────────────────────────────────────────────────┤  │
│  │ ● Denver Restaurants    487 leads   12 replies      │  │
│  │ ○ Austin Dentists       342 leads   8 replies       │  │
│  │ ○ Seattle Coffee Shops  418 leads   3 replies       │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ Outreach Queue                              [View]  │  │
│  │ 23 emails pending approval                          │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ Recent Activity                                     │  │
│  │ • Reply from Mike's Pizza - 2h ago                  │  │
│  │ • 50 new leads found - Denver Restaurants - 4h ago  │  │
│  │ • Campaign "Austin Dentists" completed - 1d ago     │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

**Metrics to show:**
| Metric | Location | Why |
|--------|----------|-----|
| Total leads | Top stat card | Primary value metric |
| Emails sent | Top stat card | Shows they're taking action |
| Reply rate | Top stat card | Ultimate success metric |
| Leads today | Under total | Shows freshness |
| Open rate | Under sent | Email health indicator |

**Empty state:** Big illustration + "Create Your First Campaign" button

---

### 3.2 Campaign Creation

**Approach:** Wizard (3 steps) — not single form

**Why wizard:** 
- Guides users, reduces cognitive load
- Can show smart defaults based on previous steps
- Allows "skip for now" on optional fields

```
Step 1 of 3: Target Audience
─────────────────────────────────────────────────────

What type of businesses are you targeting?

┌─────────────────────────────────────────────────────┐
│ [🔍] Search or select...                        ▼  │
├─────────────────────────────────────────────────────┤
│ ● Restaurants                                      │
│ ○ Dental Practices                                 │
│ ○ Law Firms                                        │
│ ○ Real Estate Agents                               │
│ ○ Auto Repair Shops                                │
│ ○ Salons & Spas                                    │
│ ○ Fitness & Gyms                                   │
│ ○ Other... (specify)                               │
└─────────────────────────────────────────────────────┘

                                          [Next →]
```

```
Step 2 of 3: Location
─────────────────────────────────────────────────────

Where should we look?

┌─────────────────────────────────────────────────────┐
│ City or ZIP code                                   │
│ [Denver, CO                                    ]   │
└─────────────────────────────────────────────────────┘

Search radius:
○ 10 miles   ● 25 miles   ○ 50 miles   ○ 100 miles

[← Back]                                  [Next →]
```

```
Step 3 of 3: Qualification Criteria (Optional)
─────────────────────────────────────────────────────

What makes a lead "qualified" for you?

☑ Has a website (required for scoring)
☐ Website loads slowly (opportunity for optimization)
☐ No mobile-friendly site
☐ Less than 4-star rating (reputation management)
☐ Open less than 2 years (new business)

Minimum lead score: [70] / 100

[← Back]                         [Create Campaign →]
```

**After creation:** Immediate redirect to campaign view with agent activity starting

---

### 3.3 Lead List View

**Layout:** Dense table with filters sidebar

```
┌────────────────────────────────────────────────────────────────────────┐
│  ← Back to Dashboard                                                   │
│                                                                        │
│  Denver Restaurants                                    [⚙] [Export ▼] │
│  487 leads · 342 enriched · Last updated 2 min ago                    │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  ┌──────────┐  ┌──────────────────────────────────────────────────────┐│
│  │ Filters  │  │ ☐ │ Company        │ Score │ Tier │ Website │ Contact││
│  │          │  ├───┼────────────────┼───────┼──────┼─────────┼────────┤│
│  │ Tier     │  │ ☑ │ Mike's Pizza   │  87   │  A   │ Poor    │ ✓ Mike ││
│  │ ☑ A (89) │  │ ☐ │ Sushi Palace   │  72   │  B   │ OK      │ ✓ Jun  ││
│  │ ☑ B (156)│  │ ☑ │ Taco Town      │  91   │  A   │ Poor    │ ✓ Maria││
│  │ ☐ C (242)│  │ ☐ │ Burger Joint   │  45   │  C   │ Good    │ ✗      ││
│  │          │  │ ☐ │ Thai Kitchen   │  68   │  B   │ OK      │ ✓ Lin  ││
│  │ Score    │  │ ...                                                  ││
│  │ [50][100]│  └──────────────────────────────────────────────────────┘│
│  │          │                                                          │
│  │ Contact  │  [Select 2] [Generate Outreach] [Add to List] [Archive] │
│  │ ☑ Found  │                                                          │
│  │ ☐ Missing│  Showing 1-50 of 487                    [< 1 2 3 ... >] │
│  │          │                                                          │
│  │ Website  │                                                          │
│  │ ☑ Poor   │                                                          │
│  │ ☑ OK     │                                                          │
│  │ ☐ Good   │                                                          │
│  └──────────┘                                                          │
└────────────────────────────────────────────────────────────────────────┘
```

**Table columns:**
| Column | Data | Sortable | Why |
|--------|------|----------|-----|
| Checkbox | Selection | No | Bulk actions |
| Company | Name + mini favicon | Yes | Primary identifier |
| Score | 0-100 | Yes | Quick quality indicator |
| Tier | A/B/C badge | Yes | Fast filtering |
| Website | Poor/OK/Good | Yes | Our value prop |
| Contact | Name or ✗ | Yes | Outreach readiness |

**Row click → Opens Lead Detail panel (slide-in from right)**

**Bulk actions bar (appears when items selected):**
- Generate Outreach
- Add to List
- Archive
- Change Tier (manual override)
- Export Selected

---

### 3.4 Lead Detail Panel

**Layout:** Slide-in panel from right (60% width)

```
┌─────────────────────────────────────────────────────┐
│  [← Close]                      [Archive] [⚙ More] │
├─────────────────────────────────────────────────────┤
│                                                     │
│  🍕 Mike's Pizza                            Tier A  │
│  123 Main St, Denver, CO 80202                     │
│  (303) 555-1234 · mikespizza.com                   │
│                                                     │
│  ────────────────────────────────────────────────  │
│                                                     │
│  LEAD SCORE  [████████████████████░░] 87/100       │
│                                                     │
│  Scoring Factors:                                   │
│  ✓ Website loads in 8.2s (slow)      +20 pts       │
│  ✓ Not mobile-friendly               +25 pts       │
│  ✓ No SSL certificate                +15 pts       │
│  ✓ Low Google rating (3.2★)          +10 pts       │
│  ✗ Has online ordering               -10 pts       │
│  ✓ Contact email found               +17 pts       │
│                                                     │
│  ────────────────────────────────────────────────  │
│                                                     │
│  CONTACTS                                          │
│  ┌───────────────────────────────────────────────┐ │
│  │ 👤 Mike Johnson (Owner)           [Primary]   │ │
│  │    mike@mikespizza.com ✓ verified             │ │
│  │    LinkedIn: /in/mikejohnson                  │ │
│  └───────────────────────────────────────────────┘ │
│                                                     │
│  ────────────────────────────────────────────────  │
│                                                     │
│  WEBSITE ANALYSIS                                   │
│  • Built with: WordPress + WooCommerce             │
│  • Last updated: 6+ months ago                     │
│  • Mobile score: 23/100 (poor)                     │
│  • Speed score: 31/100 (poor)                      │
│  • Screenshot: [View →]                            │
│                                                     │
│  ────────────────────────────────────────────────  │
│                                                     │
│  PAIN POINTS DETECTED                              │
│  • Slow page load hurting SEO                      │
│  • Not ranking for "pizza denver"                  │
│  • Competitor "Tony's" outranks them               │
│                                                     │
│  ────────────────────────────────────────────────  │
│                                                     │
│  OUTREACH HISTORY                                   │
│  • No outreach yet                                 │
│                                                     │
│         [Generate Personalized Email →]            │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Sections:**
1. **Header** — Company name, address, phone, website link, tier badge
2. **Lead Score** — Visual bar + breakdown of scoring factors
3. **Contacts** — All found contacts with verification status
4. **Website Analysis** — Tech stack, scores, screenshot link
5. **Pain Points** — AI-detected opportunities
6. **Outreach History** — Timeline of all interactions

---

### 3.5 Outreach Queue

**Layout:** Two-panel view (list + preview)

```
┌────────────────────────────────────────────────────────────────────────┐
│  Outreach Queue                            [Bulk Approve All] [Filter] │
│  23 pending · 156 sent today · 32% open rate                          │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  ┌─────────────────────────┐ ┌────────────────────────────────────────┐│
│  │ Pending Approval        │ │                                        ││
│  ├─────────────────────────┤ │  To: mike@mikespizza.com               ││
│  │ ● Mike's Pizza          │ │  Subject: Quick question about your... ││
│  │   mike@mikespizza.com   │ │                                        ││
│  │   Generated 2h ago      │ │  ─────────────────────────────────────  ││
│  ├─────────────────────────┤ │                                        ││
│  │ ○ Sushi Palace          │ │  Hi Mike,                              ││
│  │   jun@sushipalace.com   │ │                                        ││
│  │   Generated 2h ago      │ │  I was looking for pizza in Denver    ││
│  ├─────────────────────────┤ │  last night and found Mike's Pizza... ││
│  │ ○ Taco Town             │ │                                        ││
│  │   maria@tacotown.com    │ │  I noticed your website takes about   ││
│  │   Generated 3h ago      │ │  8 seconds to load—that's costing     ││
│  ├─────────────────────────┤ │  you customers who won't wait...      ││
│  │ ○ Thai Kitchen          │ │                                        ││
│  │   lin@thaikitchen.com   │ │  [Rest of email...]                   ││
│  │   Generated 3h ago      │ │                                        ││
│  │                         │ │                                        ││
│  │ [Load More]             │ │  ─────────────────────────────────────  ││
│  │                         │ │                                        ││
│  │ ─────────────────────── │ │  [Edit] [Approve & Send] [Reject]     ││
│  │                         │ │                                        ││
│  │ Sent Today (156)        │ │  Sequence: Email 1 of 3               ││
│  │ ○ Bob's Burgers  ✓ Open │ │  Email 2: Send in 3 days if no reply  ││
│  │ ○ Pizza Hut      ✓ Open │ │  Email 3: Send in 7 days if no reply  ││
│  │ ...                     │ │                                        ││
│  └─────────────────────────┘ └────────────────────────────────────────┘│
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

**Workflow states:**
| Status | Badge | Actions |
|--------|-------|---------|
| Pending | Yellow | Edit, Approve, Reject |
| Approved | Blue | Sending... |
| Sent | Green | View, Track |
| Opened | Green + icon | View |
| Replied | Purple | View thread, Respond |
| Bounced | Red | Fix email, Retry |

**Approval options:**
- **Single approval:** Click "Approve & Send"
- **Bulk approval:** Select multiple → "Approve Selected"
- **Auto-approve setting:** In settings, enable "Auto-send A-tier leads"

---

### 3.6 Settings & Billing

**Layout:** Sidebar tabs + content area

```
┌────────────────────────────────────────────────────────────────────────┐
│  Settings                                                              │
├──────────────┬─────────────────────────────────────────────────────────┤
│              │                                                         │
│  ● Profile   │  PROFILE                                                │
│  ○ Team      │  ─────────────────────────────────────────────────────  │
│  ○ Billing   │                                                         │
│  ○ Integrat. │  Name        [John Smith                           ]   │
│  ○ API       │  Email       [john@company.com                     ]   │
│  ○ Notific.  │  Company     [Smith Web Design                     ]   │
│              │                                                         │
│              │  [Update Profile]                                       │
│              │                                                         │
│              │  ─────────────────────────────────────────────────────  │
│              │                                                         │
│              │  PASSWORD                                               │
│              │  [Change Password →]                                    │
│              │                                                         │
│              │  ─────────────────────────────────────────────────────  │
│              │                                                         │
│              │  DANGER ZONE                                            │
│              │  [Delete Account]                                       │
│              │                                                         │
└──────────────┴─────────────────────────────────────────────────────────┘
```

**Billing tab:**
```
BILLING
─────────────────────────────────────────────────────

Current Plan: Growth ($299/month)
Next billing: February 15, 2026

Usage This Period:
[████████████████████░░░░░] 1,847 / 2,500 leads

[Change Plan] [View Invoices] [Update Payment]

─────────────────────────────────────────────────────

PLAN COMPARISON

┌─────────────┬─────────────┬─────────────┬─────────────┐
│   Starter   │   Growth    │    Scale    │ Enterprise  │
│   $99/mo    │  $299/mo ✓  │   $799/mo   │   Custom    │
├─────────────┼─────────────┼─────────────┼─────────────┤
│  500 leads  │ 2,500 leads │ 10K leads   │ Unlimited   │
│  Basic      │ Full enrich │ Full + API  │ Dedicated   │
│  Manual     │ AI emails   │ White-label │ Support     │
└─────────────┴─────────────┴─────────────┴─────────────┘
```

**Settings tabs:**
| Tab | Contents |
|-----|----------|
| Profile | Name, email, password, company |
| Team | Invite members, manage permissions (Scale+) |
| Billing | Plan, usage, payment method, invoices |
| Integrations | Instantly, HubSpot, Salesforce connections |
| API | API keys, usage, docs link (Scale+) |
| Notifications | Email preferences, Slack webhook |

---

## 4. Component Library

### Base: shadcn/ui

We use [shadcn/ui](https://ui.shadcn.com/) exclusively. No custom components for V1.

### Required Components

| Component | shadcn name | Usage |
|-----------|-------------|-------|
| Button | `button` | All CTAs, actions |
| Input | `input` | Forms |
| Select | `select` | Dropdowns |
| Checkbox | `checkbox` | Multi-select in tables |
| Radio Group | `radio-group` | Single select options |
| Switch | `switch` | Toggles |
| Card | `card` | Dashboard cards, containers |
| Table | `table` | Lead lists |
| Badge | `badge` | Tier indicators, status |
| Dialog | `dialog` | Confirmations, modals |
| Sheet | `sheet` | Lead detail slide-in |
| Tabs | `tabs` | Settings sections |
| Progress | `progress` | Score bars, usage |
| Skeleton | `skeleton` | Loading states |
| Toast | `sonner` | Notifications |
| Avatar | `avatar` | User icons |
| Separator | `separator` | Visual dividers |
| Slider | `slider` | Score range filters |
| Command | `command` | Search/command palette |

### Custom Additions (V1)

#### 1. LeadScoreBadge
```tsx
// Combines badge + color based on score
<LeadScoreBadge score={87} /> // Green "87"
<LeadScoreBadge score={52} /> // Yellow "52"
<LeadScoreBadge score={23} /> // Red "23"
```

#### 2. TierBadge
```tsx
<TierBadge tier="A" /> // Green badge
<TierBadge tier="B" /> // Yellow badge
<TierBadge tier="C" /> // Gray badge
```

#### 3. AgentActivityFeed
```tsx
// Realtime activity list (see Section 5)
<AgentActivityFeed campaignId={id} />
```

#### 4. EmailPreview
```tsx
// Renders email with editable fields
<EmailPreview 
  subject="Quick question..."
  body="Hi Mike,..."
  editable={true}
  onSave={(data) => ...}
/>
```

### Color Palette (Tailwind defaults + custom)

```js
// tailwind.config.js additions
colors: {
  tier: {
    a: '#22c55e', // green-500
    b: '#eab308', // yellow-500
    c: '#6b7280', // gray-500
  },
  score: {
    high: '#22c55e',    // 70-100
    medium: '#eab308',  // 40-69
    low: '#ef4444',     // 0-39
  },
  status: {
    pending: '#eab308',
    approved: '#3b82f6',
    sent: '#22c55e',
    opened: '#22c55e',
    replied: '#a855f7',
    bounced: '#ef4444',
  }
}
```

### Typography

```css
/* Use Inter for UI, JetBrains Mono for data */
--font-sans: 'Inter', sans-serif;
--font-mono: 'JetBrains Mono', monospace;

/* Apply mono to: scores, stats, timestamps, code */
.font-mono { font-family: var(--font-mono); }
```

---

## 5. Realtime Elements

### Why Realtime Matters

Clay's best UX feature is showing work happening live. Users trust the product more when they can see "87 records enriched" incrementing in realtime.

**Our approach:** WebSocket connection for active campaigns, polling fallback for older browsers.

### Agent Activity Feed

**Location:** Campaign detail page, right sidebar

```
┌─────────────────────────────────────────┐
│ Agent Activity                   [Live] │
├─────────────────────────────────────────┤
│                                         │
│ 🔍 Discovering leads...                 │
│    Found: Mike's Pizza                  │
│    Found: Sushi Palace                  │
│    Found: Taco Town                     │
│    ↳ 47 of ~200 discovered             │
│                                         │
│ 📊 Enriching: Mike's Pizza              │
│    ✓ Website scored: 31/100             │
│    ✓ Contact found: mike@...            │
│    ✓ Pain points: 3 detected            │
│                                         │
│ 🏷️ Scoring: Sushi Palace                │
│    ✓ Lead score: 72 (Tier B)           │
│                                         │
│ ✨ Generating email: Taco Town          │
│    Writing personalized email...        │
│                                         │
└─────────────────────────────────────────┘
```

**States:**
| Agent | Icon | Color | Activity |
|-------|------|-------|----------|
| Discovery | 🔍 | Blue | "Searching Denver restaurants..." |
| Enrichment | 📊 | Purple | "Analyzing website..." |
| Scoring | 🏷️ | Yellow | "Calculating lead score..." |
| Content | ✨ | Green | "Writing personalized email..." |
| Outreach | 📧 | Teal | "Sending to Instantly..." |

### Progress Indicators

**Campaign Progress Bar:**
```
Campaign: Denver Restaurants
[████████████████░░░░░░░░░] 156/200 leads
Discovery: ✓ Complete | Enrichment: 78% | Scoring: 45%
```

**Individual Lead Progress:**
```
Mike's Pizza
[✓] Discovered → [✓] Enriched → [●] Scoring → [ ] Ready
```

### Implementation

```typescript
// Use Supabase Realtime for simplicity
const supabase = createClient(...)

// Subscribe to campaign updates
supabase
  .channel('campaign:' + campaignId)
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'agent_activity',
    filter: `campaign_id=eq.${campaignId}`
  }, (payload) => {
    // Update activity feed
    addActivity(payload.new)
  })
  .subscribe()
```

### When to Show Realtime

| Screen | Realtime? | Method |
|--------|-----------|--------|
| Campaign (active) | Yes | WebSocket |
| Dashboard | Partial | 30s polling |
| Lead list | No | Manual refresh |
| Outreach queue | Yes | WebSocket (status changes) |

---

## 6. Mobile Considerations

### V1 Approach: Responsive, Not Mobile-First

**Philosophy:** Our users are B2B salespeople. They work on desktop. Mobile is "check stats on the go" not "run campaigns."

### Breakpoints

```css
/* Tailwind defaults */
sm: 640px   /* Large phones landscape */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large monitors */
```

### Mobile Adaptations

| Screen | Desktop | Mobile (< 768px) |
|--------|---------|------------------|
| Dashboard | 3-column stats | Stacked cards |
| Lead list | Table with all columns | Cards with key info only |
| Lead detail | Slide-in panel | Full screen sheet |
| Campaign wizard | Side-by-side | Stacked |
| Settings | Sidebar + content | Tabs on top |

### Mobile-Specific Changes

**Lead List → Card View:**
```
┌─────────────────────────────────┐
│ ☑ Mike's Pizza             87A │
│    mike@mikespizza.com          │
│    Website: Poor                │
│    [View] [Generate Email]      │
└─────────────────────────────────┘
```

**Dashboard → Simplified:**
- Hide activity feed
- Show only top 3 stats
- "Create Campaign" button sticky at bottom

**Outreach Queue:**
- Swipe right to approve
- Swipe left to reject
- Tap to preview

### What's NOT Supported on Mobile (V1)

- Campaign creation wizard (redirect to desktop)
- Bulk actions (>10 items)
- Settings changes
- API access

**Show message:** "For the best experience creating campaigns, use a desktop browser."

---

## 7. Onboarding Flow

### Goal: Time to "Aha!" < 3 minutes

**"Aha moment":** User sees their first qualified lead with website score and contact info.

### Flow Design

```
Signup ─────────────────────────────────────────────────────────▶

  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
  │ Email + │    │ What do │    │  Who's  │    │ Where?  │
  │Password │───▶│you sell?│───▶│  your   │───▶│         │
  │         │    │         │    │customer?│    │         │
  └─────────┘    └─────────┘    └─────────┘    └─────────┘
       │              │              │              │
       │         (dropdown)    (dropdown)    (location)
       │                                           │
       └───────────────────────────────────────────┘
                                                   │
                                                   ▼
                                          ┌─────────────┐
                                          │ "Find Your  │
                                          │First Leads" │
                                          │   (CTA)     │
                                          └─────────────┘
```

### Screen by Screen

**Screen 1: Signup (minimal)**
```
Create your account
───────────────────────────────────────

Email       [                    ]
Password    [                    ]

[Sign Up Free →]

Already have an account? Log in
```
- No name, no company, no credit card
- Social login (Google) as V1.1

**Screen 2: What do you sell?**
```
What does your business offer?
───────────────────────────────────────

We'll use this to find you the right leads.

[🔽 Select your service...]

○ Web Design & Development
○ Digital Marketing / SEO
○ Social Media Management
○ Business Consulting
○ IT Services
○ Accounting / Bookkeeping
○ Other...
```

**Screen 3: Who's your ideal customer?**
```
Who's your ideal customer?
───────────────────────────────────────

What type of business do you want to work with?

[🔽 Select business type...]

○ Restaurants & Food Service
○ Healthcare & Dental
○ Legal Services
○ Real Estate
○ Retail & E-commerce
○ Professional Services
○ Other...
```

**Screen 4: Where?**
```
Where should we look?
───────────────────────────────────────

[Denver, CO                      ] 🔍

Within: ○ 10mi  ● 25mi  ○ 50mi  ○ 100mi

───────────────────────────────────────

Based on your answers, we'll find:
**Restaurants in Denver, CO (25mi radius)**
that could benefit from **Web Design**

[Find My First 50 Leads →]
```

### Post-Onboarding: First Campaign Auto-Created

After clicking "Find My First 50 Leads":
1. Redirect to Dashboard with campaign already running
2. Show agent activity feed immediately
3. First leads appear in ~30 seconds
4. Celebration toast: "🎉 Found your first lead: Mike's Pizza!"

### Gamification Elements (V1.1)

- [ ] Progress bar during onboarding
- [ ] Confetti on first lead found
- [ ] "Quick Win" checklist sidebar
- [ ] Email notification when first reply comes in

---

## 8. Inspiration & References

### Direct Competitors

| Product | What to Steal | Link |
|---------|---------------|------|
| **Clay** | Realtime agent activity, waterfall visualization | [clay.com](https://www.clay.com/) |
| **Apollo** | Clean data tables, filter sidebar | [apollo.io](https://www.apollo.io/) |
| **Instantly** | Simple onboarding, clear pricing | [instantly.ai](https://instantly.ai/) |
| **Lemlist** | Email preview/edit UI | [lemlist.com](https://www.lemlist.com/) |

### Adjacent Products

| Product | What to Steal | Link |
|---------|---------------|------|
| **Linear** | Dense but readable tables, keyboard shortcuts | [linear.app](https://linear.app/) |
| **Vercel** | Dashboard stats design, deployment activity feed | [vercel.com](https://vercel.com/) |
| **Stripe** | Billing UI, API docs layout | [stripe.com](https://stripe.com/) |
| **Resend** | Simple email preview, clean settings | [resend.com](https://resend.com/) |

### Specific UI Patterns to Reference

**1. Clay's Live Agent View**
- Shows each enrichment step happening
- Waterfall diagram of data sources
- "87 records enriched" counter incrementing

**2. Linear's Table Design**
- Row hover states
- Inline quick actions
- Keyboard navigation (j/k to move)

**3. Vercel's Activity Feed**
- Compact log format
- Collapsible details
- Auto-scrolling with pause on hover

**4. Stripe's Billing Page**
- Usage bar with clear numbers
- Plan comparison table
- One-click plan changes

### Design Systems to Study

| System | Why | Link |
|--------|-----|------|
| **Radix Themes** | shadcn foundation | [radix-ui.com/themes](https://www.radix-ui.com/themes) |
| **Tailwind UI** | Production patterns | [tailwindui.com](https://tailwindui.com/) |
| **Tremor** | Dashboard components | [tremor.so](https://www.tremor.so/) |

---

## Implementation Priority

### Week 1: Core Skeleton
- [ ] Auth (Supabase)
- [ ] Dashboard layout
- [ ] Campaign creation wizard
- [ ] Basic lead list (static data)

### Week 2: Data Flow
- [ ] Lead discovery integration
- [ ] Real lead list with filters
- [ ] Lead detail panel
- [ ] Enrichment display

### Week 3: Outreach
- [ ] Email generation
- [ ] Outreach queue
- [ ] Approval workflow
- [ ] Send integration (Instantly)

### Week 4: Polish & Billing
- [ ] Settings pages
- [ ] Stripe integration
- [ ] Realtime activity feed
- [ ] Empty states & error handling

### V1.1 (Post-Launch)
- [ ] Dark mode
- [ ] Keyboard shortcuts
- [ ] Mobile improvements
- [ ] Onboarding gamification
- [ ] CRM integrations

---

## Open Questions for Engineering

1. **WebSocket vs SSE for realtime?** — Supabase Realtime uses WebSocket, but SSE is simpler for one-way updates.

2. **Table virtualization?** — Do we expect >1000 rows visible? If so, use `@tanstack/react-virtual`.

3. **Email editor richness?** — Plain text with variables, or full WYSIWYG? Recommend: plain text V1, rich V2.

4. **Offline handling?** — Show stale data or error? Recommend: show stale with "offline" banner.

5. **Analytics events?** — What user actions to track? Recommend: Mixpanel or PostHog from day 1.

---

**Document Complete** ✅

*This spec prioritizes shipping speed. Every decision was made asking "what's the fastest path to user value?" Beauty, animations, and edge cases come in V2.*
