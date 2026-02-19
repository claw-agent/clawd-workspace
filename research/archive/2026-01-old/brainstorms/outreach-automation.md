# Automated Outreach & Scheduling for Web Design Leads

> Research compiled: January 2026
> Purpose: Automate outreach to prospects with bad websites after identification

---

## Table of Contents
1. [Pipeline Overview](#pipeline-overview)
2. [Cold Email Platforms](#1-cold-email-platforms)
3. [Email Finding & Verification](#2-email-findingverification-tools)
4. [Scheduling Tools](#3-scheduling--booking-automation)
5. [CRM Options](#4-crm-integration)
6. [Outreach Sequences That Work](#5-outreach-sequences-that-work)
7. [Multi-Channel Outreach](#6-multi-channel-outreach)
8. [Compliance](#7-compliance-considerations)
9. [Recommended Stack](#8-recommended-stack-for-marb)
10. [Email Templates](#9-email-templates)

---

## Pipeline Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Prospect      │───▶│ Enrich Contact  │───▶│  Personalized   │
│  Identified     │    │ (email/phone)   │    │   First Email   │
│  (bad website)  │    │                 │    │ (cite issues)   │
└─────────────────┘    └─────────────────┘    └────────┬────────┘
                                                       │
┌─────────────────┐    ┌─────────────────┐    ┌────────▼────────┐
│     Close       │◀───│   Book Call     │◀───│   Follow-up     │
│  (show sample)  │    │  (Calendly)     │    │   Sequence      │
│                 │    │                 │    │   (3-5 emails)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## 1. Cold Email Platforms

### Comparison Table

| Platform | Starting Price | Key Features | Best For |
|----------|---------------|--------------|----------|
| **Instantly** | $37/mo | Unlimited email accounts, unlimited warmup, 5K emails/mo | Budget-conscious, high volume |
| **Smartlead** | $39/mo | Unlimited mailboxes, AI personalization, 6K emails/mo | Agencies, scalability |
| **Lemlist** | $55/user/mo | Multichannel (email+LinkedIn), video embeds, 600M lead database | Personalized outreach |

### Instantly (Recommended for Starting)
**Pricing:**
- **Growth:** $37/mo — 1K contacts, 5K emails/mo, unlimited accounts
- **Hypergrowth:** $97/mo — 25K contacts, 100K emails/mo

**Why It's Good for Web Design Outreach:**
- Unlimited email accounts = can scale sender reputation
- Built-in warmup (critical for deliverability)
- A/Z testing for subject lines
- Unibox = all replies in one place
- API + webhooks for automation

### Smartlead
**Pricing:**
- **Base:** $39/mo — 6K sends, 2K verified emails
- **Pro:** $94/mo — 90K sends, 30K verified emails  
- **Smart:** $174/mo — 150K sends, unlimited contacts

**Standout Features:**
- SmartSenders: Buy/setup Google/Outlook mailboxes in 2 clicks ($4.50/mailbox/mo)
- SmartDelivery: Placement testing ($49/mo addon)
- Built-in email verification
- Clay/n8n/Make integrations

### Lemlist
**Pricing:**
- **Email Pro:** $55/user/mo — email only
- **Multichannel Expert:** $79/user/mo — adds LinkedIn automation, calls

**Standout Features:**
- 600M+ lead database built-in
- LinkedIn automation (profile visits, invites, messages)
- Custom images with personalization
- AI variables for hyper-personalization
- Phone number finder included

---

## 2. Email Finding/Verification Tools

### Comparison Table

| Tool | Free Tier | Paid Starting | Accuracy | Best For |
|------|-----------|---------------|----------|----------|
| **Hunter.io** | 50 credits/mo | $34/mo (2K credits) | High | Domain searches, finding anyone at a company |
| **Apollo.io** | Generous free | $49/mo | Good | All-in-one (data + sequences) |
| **Snov.io** | 50 credits/mo | $30/mo | Good | Budget option with sequences |
| **Clearbit** | (Now HubSpot) | Contact sales | Excellent | Enterprise enrichment |

### Hunter.io (Recommended)
**Pricing:**
- **Free:** 50 credits/mo
- **Starter:** $34/mo (yearly) — 2K credits/mo
- **Growth:** $104/mo (yearly) — 10K credits/mo

**Credit Usage:**
- 1.0 credit = 1 email found (Domain Search, Email Finder)
- 0.5 credit = 1 email verified

**Why Hunter for Local Business Outreach:**
- Domain Search: Enter business URL → get all emails
- Email pattern recognition (first.last@, f.last@, etc.)
- Confidence scores
- Chrome extension for quick lookups
- Google Sheets addon

### Apollo.io (Best Free Option)
**Free Plan Includes:**
- 10,000 email exports/mo
- Unlimited email finder
- Basic sequences
- Gmail integration

**Paid Plans:**
- **Basic:** $49/mo — more exports, A/B testing
- **Professional:** $79/mo — dialer, custom reports

**Why Apollo:**
- Massive B2B database (275M+ contacts)
- Combines data + outreach in one tool
- Intent signals (who's looking to buy)
- CRM sync (HubSpot, Salesforce)

### Snov.io
**Pricing:**
- **Trial:** 50 credits free
- **Starter:** $30/mo — 1K credits
- **Pro:** $75/mo — 5K credits

**Features:**
- Email finder + verifier
- Built-in email sequences
- LinkedIn prospect finder extension
- Technology checker (see what tech prospects use)

### Clearbit (Now HubSpot)
Clearbit was acquired by HubSpot — now integrated into HubSpot's platform.
- Best-in-class enrichment data
- IP reveal (see who visits your site)
- Form shortening
- **Access:** Through HubSpot paid plans or legacy Clearbit contracts

---

## 3. Scheduling / Booking Automation

### Comparison Table

| Tool | Free Tier | Paid | API | Best For |
|------|-----------|------|-----|----------|
| **Calendly** | 1 event type | $10/mo | Yes | Most recognized, simple |
| **Cal.com** | Self-host free | $12/mo | Yes | Open source, developers |
| **TidyCal** | Limited | $29 one-time | Yes | Lifetime deal, budget |
| **SavvyCal** | Free tier | $12/mo | Yes | Premium UX, overlay |

### Calendly (Industry Standard)
**Pricing:**
- **Free:** 1 event type, 1 calendar
- **Standard:** $10/seat/mo — unlimited events, Zapier, Stripe
- **Teams:** $16/seat/mo — Salesforce, round-robin

**For Outreach:**
- Embed link directly in email sequences
- Custom branding removes friction
- Automated reminders reduce no-shows
- API for custom integrations

**Email Integration Example:**
```
Book a quick 15-minute call to see the sample site:
👉 https://calendly.com/marb/web-review
```

### Cal.com (Open Source Alternative)
**Pricing:**
- **Self-hosted:** Free
- **Cloud:** $12/user/mo

**Why Consider:**
- Own your data
- Highly customizable
- Collective/round-robin scheduling
- Zapier, Make, n8n integrations

### TidyCal (Budget King)
**Pricing:**
- **Free:** Limited features
- **Pro:** $29 one-time (lifetime!)

**Features:**
- Unlimited bookings
- Stripe/PayPal payments
- Zoom/Meet auto-create
- Basic API access

**Best For:** Bootstrapped operations wanting to avoid monthly fees

### SavvyCal
**Pricing:**
- **Basic:** $12/user/mo
- **Premium:** $20/user/mo

**Unique Features:**
- Calendar overlay (recipients see their cal + your availability)
- Ranked availability (prefers certain times)
- Custom domains (schedule.yourdomain.com)

### Embedding in Outreach
**Best Practices:**
1. Use short, branded links (not raw Calendly URLs)
2. Include link in P.S. of email (higher click rates)
3. Offer 2-3 specific times + "or book here: [link]"
4. Set buffer times to avoid back-to-back

---

## 4. CRM Integration

### For Solo/Small Operations

#### HubSpot Free CRM (Recommended Start)
**Free Features:**
- 1M contacts
- Email tracking
- Deal pipeline
- Gmail/Outlook integration
- Meeting scheduler
- Forms

**Paid Upgrade Path:**
- Starter: $20/mo — removes branding, more automation
- Professional: $500/mo — full marketing automation

**Why HubSpot:**
- Integrates with everything
- Free tier is genuinely useful
- Scales with business growth
- Now includes Clearbit data

#### Notion as Lightweight CRM
**Setup:**
```
Database Properties:
- Business Name (title)
- Website URL (URL)
- Contact Email (email)
- Phone (phone)
- Stage (select: Lead/Contacted/Replied/Meeting/Proposal/Won/Lost)
- Website Issues (multi-select: slow, not mobile, bad design, no SSL)
- First Contact Date (date)
- Last Contact Date (date)
- Notes (text)
- Sample Site URL (URL)
```

**Pros:**
- Free for personal use
- Extremely flexible
- Good API for automation
- Views: Kanban, calendar, table

**Cons:**
- No native email integration
- Manual work or needs Zapier

### For Growing Operations

#### Pipedrive
**Pricing:** $14-99/user/mo
- Visual pipeline
- AI sales assistant
- Built-in calling
- Strong mobile app

#### Close CRM (Best for Outbound)
**Pricing:**
- **Startup:** $59/user/mo — 10K leads, calling
- **Professional:** $109/user/mo — power dialer, multiple pipelines
- **Enterprise:** $149/user/mo — predictive dialer, custom roles

**Why Close for Web Design:**
- Built for outbound sales
- Email sequences built-in
- Power dialer included
- SMS capabilities
- 30-90 day call recordings (depending on plan)

---

## 5. Outreach Sequences That Work

### The "Website Audit" Approach

**Sequence Overview:**
- Email 1: Day 0 — Personalized audit findings
- Email 2: Day 3 — Quick follow-up
- Email 3: Day 7 — Value-add (industry stat)
- Email 4: Day 14 — "Built you a sample"
- Email 5: Day 21 — Breakup email

### Personalization Variables
For web design outreach, personalize with:
- `{{business_name}}`
- `{{website_url}}`
- `{{specific_issue}}` — "not mobile-friendly" / "loads in 8 seconds" / "no SSL"
- `{{city}}`
- `{{industry}}`

### "I Built You a Sample" Approach

**How It Works:**
1. Identify high-value prospect
2. Spend 30-60 min creating a quick mockup/redesign
3. Host on subdomain: `samples.yourdomain.com/business-name`
4. Send email with "I built this for you" angle

**Why It Works:**
- Shows capability, not just promises
- Creates reciprocity
- Extremely memorable
- Differentiates from every other cold email

**When to Use:**
- High-ticket prospects ($5K+ potential)
- Local businesses you really want
- Second touch after no response

### Video Outreach (Loom)

**Setup:**
1. Record 60-90 second video
2. Share screen showing their actual website
3. Point out 2-3 specific issues
4. Show brief solution/example
5. CTA: "Want me to fix this?"

**Tools:**
- **Loom:** Free plan = 25 videos, 5 min max
- **Sendspark:** Made for sales videos
- **Vidyard:** Enterprise option

**Best Practices:**
- Keep under 90 seconds
- Use thumbnail of their website
- Include your face (builds trust)
- Clear CTA at the end

---

## 6. Multi-Channel Outreach

### LinkedIn Automation (Careful with ToS)

**Safe Approaches:**
- Manual connection requests with personalized notes
- Engage with their content before outreach
- Use Sales Navigator for research, not automation

**Tools (Use at Own Risk):**
- **Lemlist:** Built-in LinkedIn steps
- **Dripify:** LinkedIn automation
- **Expandi:** Cloud-based LinkedIn automation

**LinkedIn Limits:**
- ~100 connection requests/week (before warnings)
- ~150 messages/day to connections

### SMS Outreach

**Tools:**
- **Twilio:** API for custom solutions
- **SimpleTexting:** Easy UI, $29/mo starting
- **Salesmsg:** CRM integration focus

**Compliance:**
- Must have consent for marketing SMS
- Better for follow-ups after initial contact
- Include opt-out instructions

### Direct Mail (Lob API)

**Lob Pricing:**
- Postcards: Starting $0.58/each (Scale plan)
- Letters: Starting $0.61/each
- Address verification: $0.009-0.05/address

**Use Case for Web Design:**
1. Send physical postcard with QR code
2. QR links to their sample redesign
3. Stands out from email noise
4. Great for high-value local businesses

**API Integration:**
```javascript
// Example: Send postcard via Lob API
const postcard = await lob.postcards.create({
  to: {
    name: 'Business Owner',
    address_line1: '123 Main St',
    address_city: 'Denver',
    address_state: 'CO',
    address_zip: '80202'
  },
  front: 'tmpl_front_xxxxx',
  back: 'tmpl_back_xxxxx',
  merge_variables: {
    business_name: 'Local Coffee Shop',
    qr_url: 'https://samples.yoursite.com/local-coffee'
  }
});
```

### Google Business Messages
- Available through Google Business Profile
- Customers can message directly from search
- Good for inbound, not outbound
- Setup: Google Business Profile → Messages → Turn on

---

## 7. Compliance Considerations

### CAN-SPAM Act Requirements

**Must Include:**
1. ✅ Accurate "From" name and email
2. ✅ Non-deceptive subject line
3. ✅ Physical postal address
4. ✅ Clear opt-out mechanism
5. ✅ Honor opt-outs within 10 business days

**Penalties:** Up to $53,088 per violating email

**What's Allowed:**
- Cold B2B email IS legal under CAN-SPAM
- No prior consent required (unlike GDPR)
- Must be clearly commercial

### Best Practices for Local Business Outreach

1. **Use business emails, not personal**
   - info@, owner@, name@ are fair game
   - Avoid personal Gmail addresses

2. **Research before reaching out**
   - Mentioning specific website issues shows legitimacy
   - Not just mass-blasting a list

3. **Professional footer:**
   ```
   [Your Name]
   Web Designer | [Company Name]
   [Phone] | [Website]
   [Physical Address]
   
   Don't want emails from me? Reply "unsubscribe"
   ```

4. **Respect opt-outs immediately**
   - Add to global suppression list
   - Document for compliance

5. **Limit follow-ups**
   - 4-5 emails max in a sequence
   - Stop if no engagement after 3-4 weeks

### GDPR (If Emailing EU Businesses)
- Requires legitimate interest or consent
- Local US businesses = CAN-SPAM only
- If targeting EU: get explicit opt-in first

---

## 8. Recommended Stack for Marb

### Budget-Conscious Start (~$70-100/mo)
| Purpose | Tool | Cost |
|---------|------|------|
| Email Finding | Hunter.io Starter | $34/mo |
| Cold Email | Instantly Growth | $37/mo |
| Scheduling | TidyCal Pro | $29 one-time |
| CRM | Notion | Free |
| **Total** | | **~$70/mo** |

### Scaling Up (~$150-200/mo)
| Purpose | Tool | Cost |
|---------|------|------|
| Data + Outreach | Apollo Professional | $79/mo |
| Cold Email | Smartlead Pro | $94/mo |
| Scheduling | Calendly Standard | $10/mo |
| CRM | HubSpot Free | Free |
| **Total** | | **~$183/mo** |

### Full Automation Stack
| Purpose | Tool | Cost |
|---------|------|------|
| Enrichment | Apollo Professional | $79/mo |
| Email | Lemlist Multichannel | $79/mo |
| Direct Mail | Lob (per piece) | Variable |
| Scheduling | Cal.com | $12/mo |
| CRM | Close Startup | $59/mo |
| Automation | n8n (self-hosted) | Free |
| **Total** | | **~$230/mo + usage** |

---

## 9. Email Templates

### Template 1: Initial Audit Email

**Subject:** Quick note about {{business_name}}'s website

```
Hi {{first_name}},

I was researching {{industry}} businesses in {{city}} and came across {{business_name}}.

Noticed a few things about your website that might be costing you customers:

{{specific_issue_1}} — {{explanation}}
{{specific_issue_2}} — {{explanation}}

For example, {{stat_or_impact}}.

Would you be open to a quick 15-minute call to discuss some fixes? 
No pitch—just want to share what I've found.

{{calendly_link}}

Best,
{{your_name}}

P.S. I've helped [X] {{city}} businesses improve their sites. Happy to share examples.
```

### Template 2: Follow-up #1 (Day 3)

**Subject:** Re: Quick note about {{business_name}}'s website

```
Hi {{first_name}},

Just bumping this up—wanted to make sure you saw my note about {{specific_issue}}.

It's a quick fix that could make a real difference, especially for mobile visitors 
({{mobile_stat}}).

If you're curious, I'm happy to show you exactly what I mean—takes 10 minutes.

{{calendly_link}}

{{your_name}}
```

### Template 3: "Built You a Sample" Email

**Subject:** Made something for {{business_name}} 🎨

```
Hi {{first_name}},

I know you're busy, so instead of another email asking for your time, 
I just went ahead and built something.

Here's a quick sample of what {{business_name}}'s website could look like:
👉 {{sample_site_url}}

I focused on:
- Mobile-first design ({{mobile_benefit}})
- Faster load times
- Clear call-to-action for {{their_main_service}}

Obviously this is just a mockup—but I'd love to hear what you think.

Worth a 15-minute call?

{{calendly_link}}

{{your_name}}
```

### Template 4: Value-Add / Social Proof

**Subject:** Thought you'd find this interesting

```
Hi {{first_name}},

Saw this stat and thought of {{business_name}}:

"{{relevant_stat}}"

For local {{industry}} businesses, this usually means {{implication}}.

Not sure if you've had a chance to look at website improvements yet, 
but I'm around this week if you want to chat.

{{calendly_link}}

{{your_name}}
```

### Template 5: Breakup Email

**Subject:** Should I close your file?

```
Hi {{first_name}},

I've reached out a few times about improving {{business_name}}'s website 
and haven't heard back—totally understand if now isn't the right time.

Just let me know:

1. "Yes, let's talk" — I'll send over some times
2. "Not right now" — I'll check back in a few months  
3. "Not interested" — No hard feelings, I'll stop emailing

Either way, wishing {{business_name}} continued success!

{{your_name}}
```

---

## Quick Reference: Tool URLs

**Cold Email:**
- Instantly: https://instantly.ai
- Smartlead: https://smartlead.ai
- Lemlist: https://lemlist.com

**Email Finding:**
- Hunter: https://hunter.io
- Apollo: https://apollo.io
- Snov.io: https://snov.io

**Scheduling:**
- Calendly: https://calendly.com
- Cal.com: https://cal.com
- TidyCal: https://tidycal.com
- SavvyCal: https://savvycal.com

**CRM:**
- HubSpot: https://hubspot.com
- Close: https://close.com
- Pipedrive: https://pipedrive.com
- Notion: https://notion.so

**Other:**
- Lob (Direct Mail): https://lob.com
- Loom (Video): https://loom.com

---

*Last updated: January 2026*
