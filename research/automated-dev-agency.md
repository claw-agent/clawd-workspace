# Automated Dev Agency Model

*Created: 2026-01-25*
*Status: Future consideration*
*Source: https://x.com/dhruvalgolakiya/status/2015059505030266939*

---

## The Model

Dhruval's setup (which mirrors ours):
- Mac mini running 24/7
- Clawdbot + Claude Code
- Listens to GitHub issues / bug requests
- Automatically:
  - Creates new branch
  - Implements fix or feature
  - Opens pull request
- Notifies via WhatsApp
- Plans to connect to Jira for client tickets

**Key insight:** "Imagine now I can connect this with jira project where my client daily post tickets :) this all while I'm sleeping and then review PRs in the morning"

---

## Why This Matters for Us

If we build sites for clients, we could offer:

### Tier 1: Build Only
- Build the site
- Hand it off
- Done

### Tier 2: Build + Maintain (The Play)
- Build the site
- Connect their issue tracker (Jira, Linear, GitHub)
- AI handles tickets overnight
- We review PRs in the morning
- **Recurring revenue per client**

### Tier 3: Full Managed
- Build + Maintain + Host + Monitor
- SLA-backed support
- Premium pricing

---

## Technical Requirements

We already have most of this:
- [x] Mac mini running 24/7
- [x] Clawdbot operational
- [x] GitHub integration (skill exists)
- [ ] Jira integration (need to build/find skill)
- [ ] Linear integration (nice to have)
- [x] WhatsApp/Telegram notifications
- [x] Claude Code for implementation

### Missing Pieces
1. **Issue → Agent workflow** - Listen to issues, spawn agent to fix
2. **Quality gates** - Tests must pass before PR
3. **Client sandbox** - Separate repos/permissions per client
4. **Billing/time tracking** - Know what to charge

---

## Pricing Model Ideas

### Per-Ticket Pricing
- Small fix: $25-50
- Medium feature: $100-250
- Complex work: $500+
- Client buys ticket packs

### Subscription
- X tickets/month included
- SLA on response time
- Overage billing

### Hybrid
- Base subscription for maintenance
- Per-ticket for new features

---

## Competitive Advantage

1. **24/7 availability** - AI never sleeps
2. **Speed** - Fix is often ready by morning
3. **Consistency** - Same quality every time
4. **Cost** - Lower than human dev rates
5. **Scale** - Can handle multiple clients simultaneously

---

## Implementation Priority

**For Now:** Save this for later. Focus on lead gen first.

**When Ready:**
1. Test workflow on our own projects first
2. Document the process
3. Find 1-2 friendly clients to pilot
4. Refine pricing based on actual effort
5. Scale

---

## Questions to Resolve

- What's the failure rate? (AI can't fix everything)
- How do we handle complex context? (business logic, etc.)
- What's the human review overhead?
- How do we onboard new client codebases?
- Legal: Who's liable for bugs introduced by AI?

---

## Related

- Dhruval mentions "review PRs in the morning" - human in the loop still essential
- This is dev-as-a-service, not fully autonomous
- Quality control is the moat
