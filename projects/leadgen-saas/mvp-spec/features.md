# MVP Feature Specification

## MVP Definition

**Goal:** Minimum viable product that delivers core value proposition.

**Core Value:** "Input business type + location → Get qualified leads + ready-to-send emails"

**Timeline:** 4-6 weeks from start

**Success Criteria:**
- 10 paying customers within 30 days of launch
- NPS > 40 from beta users
- < 5 critical bugs in first week

---

## MVP Features (Must Have)

### 1. Authentication & User Management
**Priority:** P0 (Blocker)

| Feature | Description | Effort |
|---------|-------------|--------|
| Sign up | Email + password | 4h |
| Login | Email + password | 2h |
| Password reset | Email flow | 2h |
| User profile | Name, company, settings | 2h |

**Tech:** Supabase Auth (pre-built)

---

### 2. Campaign Management
**Priority:** P0 (Blocker)

| Feature | Description | Effort |
|---------|-------------|--------|
| Create campaign | Name, business type, location form | 4h |
| Campaign list | View all campaigns with status | 2h |
| Campaign detail | View stats, leads, sequences | 4h |
| Start/stop campaign | Control discovery | 2h |
| Delete campaign | Soft delete | 1h |

**UI Wireframe:**
```
┌─────────────────────────────────────────────────────────────┐
│ Create Campaign                                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Campaign Name: [_____________________________]             │
│                                                             │
│  What type of business are you targeting?                   │
│  [____________________▼] (dropdown or free text)            │
│  Examples: Restaurants, Plumbers, Dentists                  │
│                                                             │
│  Where? (City, State or Region)                            │
│  [____________________] [__________▼]                       │
│  City                   State                               │
│                                                             │
│  Advanced Filters (optional)                               │
│  ☐ Minimum Google rating: [4.0]                            │
│  ☐ Minimum reviews: [10]                                   │
│  ☐ Website quality: [Poor ────●──── Excellent]             │
│                                                             │
│  [Cancel]                    [Create & Start Discovery →]   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### 3. Lead Discovery
**Priority:** P0 (Blocker)

| Feature | Description | Effort |
|---------|-------------|--------|
| Google Maps scraping | Port from slc-lead-gen | 4h |
| Yelp API integration | Port from slc-lead-gen | 4h |
| Deduplication | By website/phone | 2h |
| Progress tracking | Show discovery status | 2h |

**Flow:**
```
Campaign Start → Discovery Job → 
  ├── Google Maps (Puppeteer)
  └── Yelp API
       │
       ▼
Deduplicate by website → Save to DB → Update campaign stats
```

---

### 4. Lead Enrichment (Basic)
**Priority:** P0 (Blocker)

| Feature | Description | Effort |
|---------|-------------|--------|
| Website scoring | Lighthouse API | 4h (port) |
| Contact extraction | Hunter API | 4h |
| Email verification | Hunter verify | 2h |
| Basic company info | From Google/Yelp | 2h |

**Enrichment Data:**
- Website score (0-100)
- Mobile score (0-100)
- Primary contact name, email, title
- Phone number
- Google rating + review count
- Yelp rating + review count

---

### 5. Lead List View
**Priority:** P0 (Blocker)

| Feature | Description | Effort |
|---------|-------------|--------|
| Table view | Paginated, sortable | 4h |
| Search | By name, location | 2h |
| Filters | By score, tier, status | 3h |
| Bulk select | For export, actions | 2h |
| Lead detail panel | Click to expand | 3h |

**UI Wireframe:**
```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Campaign: Denver Restaurants                                     [Export ▼] │
├─────────────────────────────────────────────────────────────────────────────┤
│ [Search...                    ] [Score ▼] [Tier ▼] [Status ▼] [Source ▼]   │
├─────────────────────────────────────────────────────────────────────────────┤
│ ☐ │ Company          │ Contact        │ Score │ Tier │ Status    │ Actions │
├───┼──────────────────┼────────────────┼───────┼──────┼───────────┼─────────┤
│ ☐ │ Joe's Pizza      │ Joe Smith      │  78   │  A   │ Enriched  │ •••     │
│   │ joespizza.com    │ joe@joespiz... │       │      │           │         │
├───┼──────────────────┼────────────────┼───────┼──────┼───────────┼─────────┤
│ ☐ │ Mama's Kitchen   │ Maria Garcia   │  65   │  A   │ Contacted │ •••     │
│   │ mamaskitchen.net │ maria@mamas... │       │      │           │         │
├───┼──────────────────┼────────────────┼───────┼──────┼───────────┼─────────┤
│ ☐ │ Downtown Deli    │ (no contact)   │  42   │  B   │ Enriching │ •••     │
│   │ downtowndeli.com │                │       │      │           │         │
└───┴──────────────────┴────────────────┴───────┴──────┴───────────┴─────────┘
│ Showing 1-25 of 156 leads                              [← Prev] [Next →]   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### 6. Export to CSV
**Priority:** P0 (Blocker)

| Feature | Description | Effort |
|---------|-------------|--------|
| Export selected | Download selected leads | 2h |
| Export all | Download filtered list | 2h |
| Column selection | Choose fields to export | 2h |

**Export Fields:**
- Company name
- Website
- Phone
- Address (full)
- Contact name
- Contact email
- Contact title
- Google rating
- Website score
- Tier

---

### 7. Billing & Payments
**Priority:** P0 (Blocker)

| Feature | Description | Effort |
|---------|-------------|--------|
| Stripe checkout | Subscribe to plan | 4h |
| Plan selection | Starter/Growth/Scale | 2h |
| Usage tracking | Credits consumed | 3h |
| Billing portal | Manage subscription | 2h (Stripe hosted) |

**Flow:**
```
New user → Free trial (7 days, 50 leads) → 
  ├── Convert → Stripe checkout → Active subscription
  └── Don't convert → Downgrade to free (limited)
```

---

### 8. Dashboard
**Priority:** P1 (Important)

| Feature | Description | Effort |
|---------|-------------|--------|
| Overview stats | Total leads, campaigns, emails | 2h |
| Recent activity | Latest leads, sequences | 2h |
| Credit usage | Visual of remaining credits | 2h |
| Quick actions | New campaign, export | 1h |

---

## V1.1 Features (Should Have)

### 9. AI Email Generation
**Priority:** P1

| Feature | Description | Effort |
|---------|-------------|--------|
| Generate sequence | AI writes 3-email sequence | 4h (port) |
| Edit emails | Inline editing | 3h |
| Personalization hooks | Highlight customizable parts | 2h |
| Preview | See rendered email | 2h |

---

### 10. Lead Scoring & Tiers
**Priority:** P1

| Feature | Description | Effort |
|---------|-------------|--------|
| Scoring algorithm | Website + reviews + signals | 4h (port) |
| Tier assignment | A/B/C based on score | 2h |
| Visual indicators | Color coding in list | 1h |
| Tier explanations | Why this tier? | 2h |

---

### 11. Instantly Integration
**Priority:** P1

| Feature | Description | Effort |
|---------|-------------|--------|
| Connect account | API key input | 2h |
| Push sequence | Send to Instantly campaign | 4h |
| Status sync | Pull back send/open/reply stats | 4h |

---

### 12. CRM Export
**Priority:** P1

| Feature | Description | Effort |
|---------|-------------|--------|
| HubSpot | Create contacts in HubSpot | 4h |
| Salesforce | Create leads in Salesforce | 4h |
| Zapier webhook | Generic integration | 2h |

---

## V2+ Features (Nice to Have)

| Feature | Priority | Effort | Notes |
|---------|----------|--------|-------|
| LinkedIn automation | P2 | 2 weeks | Risk: account bans |
| Voice AI (Vapi) | P2 | 2 weeks | Call prospects |
| Demo site generation | P2 | 1 week | Like slc-lead-gen |
| Team members | P2 | 1 week | Multi-user |
| API access | P2 | 1 week | For power users |
| White-label | P3 | 2 weeks | For agencies |
| Custom domains | P3 | 1 week | Branding |
| SSO/SAML | P3 | 1 week | Enterprise |

---

## Technical Dependencies

### External Services (Must Set Up)
| Service | Purpose | Setup Time |
|---------|---------|------------|
| Supabase | Database + Auth | 30 min |
| Stripe | Payments | 1 hour |
| Vercel | Hosting | 15 min |
| Anthropic | Claude API | 15 min |
| Hunter | Email finding | 15 min |
| Inngest | Job queue | 30 min |

### Internal Components (Must Build)
| Component | Description | Dependencies |
|-----------|-------------|--------------|
| Auth middleware | Protect routes | Supabase |
| Credit tracking | Usage metering | Database |
| Job queue | Background processing | Inngest |
| Email templates | Transactional emails | Resend |

---

## Launch Checklist

### Pre-Launch (1 week before)
- [ ] All P0 features working
- [ ] 10 beta testers invited
- [ ] Pricing page live
- [ ] Terms of service drafted
- [ ] Privacy policy drafted
- [ ] Support email set up

### Launch Day
- [ ] ProductHunt draft ready
- [ ] Twitter announcement written
- [ ] Landing page optimized
- [ ] Analytics tracking verified
- [ ] Error monitoring active

### Post-Launch (Week 1)
- [ ] Monitor error rates
- [ ] Respond to feedback
- [ ] Fix critical bugs
- [ ] Collect testimonials
- [ ] Plan V1.1 based on feedback
