# Focus Group Agent System

Run simulated focus groups with consistent, reusable personas for product/content feedback.

---

## When to Use

- Reviewing landing pages, pitch decks, marketing copy
- Testing product concepts before building
- Getting diverse perspectives on content
- Simulating customer reactions to pricing/positioning

---

## Quick Start

### Option 1: Pre-Built Personas (Recommended)

Spawn 3-5 personas from our library:

```bash
# Consumer product review
sessions_spawn task="Read ~/clawd/agents/focus-group/personas/busy-parent.md. Review: [URL or content]. Give honest feedback."
sessions_spawn task="Read ~/clawd/agents/focus-group/personas/skeptical-boomer.md. Review: [URL or content]. Give honest feedback."
sessions_spawn task="Read ~/clawd/agents/focus-group/personas/tech-early-adopter.md. Review: [URL or content]. Give honest feedback."
```

### Option 2: Expert Panel

```bash
sessions_spawn task="Read ~/clawd/agents/focus-group/personas/ux-designer.md. Critique: [content]."
sessions_spawn task="Read ~/clawd/agents/focus-group/personas/marketing-strategist.md. Critique: [content]."
sessions_spawn task="Read ~/clawd/agents/focus-group/personas/sales-veteran.md. Critique: [content]."
```

### Option 3: Custom Personas

Define inline:
```bash
sessions_spawn task="Read ~/clawd/AGENTS.md. You are Maria, 42, runs a small bakery in Denver. Skeptical of tech, values personal relationships. Review this local business software pitch: [content]"
```

---

## Available Personas

### Consumer Profiles

| Persona | File | Best For |
|---------|------|----------|
| Busy Parent | `busy-parent.md` | Family products, time-saving tools |
| Skeptical Boomer | `skeptical-boomer.md` | Trust-building, overcoming objections |
| Tech Early Adopter | `tech-early-adopter.md` | Innovation appeal, feature depth |
| Budget-Conscious Student | `budget-conscious.md` | Pricing, value proposition |
| Affluent Professional | `affluent-pro.md` | Premium positioning, quality focus |

### B2B Profiles

| Persona | File | Best For |
|---------|------|----------|
| Small Business Owner | `smb-owner.md` | Local business tools, ROI messaging |
| Enterprise Buyer | `enterprise-buyer.md` | Security, scalability, compliance |
| Startup Founder | `startup-founder.md` | Speed, innovation, cost efficiency |

### Expert Profiles

| Persona | File | Best For |
|---------|------|----------|
| UX Designer | `ux-designer.md` | Interface, flow, accessibility |
| Marketing Strategist | `marketing-strategist.md` | Positioning, messaging, conversion |
| Sales Veteran | `sales-veteran.md` | Objection handling, persuasion |
| Copywriter | `copywriter.md` | Clarity, hooks, CTA effectiveness |

---

## Running a Focus Group

### Step 1: Choose Panel (3-5 personas)

Select based on your target audience:

- **Consumer product:** Busy Parent + Skeptical Boomer + Tech Early Adopter
- **B2B SaaS:** SMB Owner + Enterprise Buyer + Startup Founder
- **Landing page review:** UX Designer + Marketing Strategist + Copywriter

### Step 2: Spawn with Content

Include the actual content or URL in each spawn:

```bash
# For a URL
sessions_spawn task="Read ~/clawd/agents/focus-group/personas/busy-parent.md. Review this landing page: https://example.com. Give detailed feedback on messaging, trust signals, and whether you'd sign up."

# For text content
sessions_spawn task="Read ~/clawd/agents/focus-group/personas/smb-owner.md. Review this pitch: [paste pitch here]. Would you take a meeting? Why or why not?"
```

### Step 3: Synthesize Feedback

After all agents report back, look for:

1. **Consensus issues** — Multiple personas flagged the same thing
2. **Persona-specific concerns** — Valid for that segment
3. **Actionable suggestions** — Concrete improvements mentioned

---

## Focus Group Prompt Formula

```
Read ~/clawd/agents/focus-group/personas/[persona].md. 

Review: [CONTENT or URL]

Questions to answer:
1. What's your first impression?
2. What's confusing or unclear?
3. What would make you trust this more/less?
4. Would you [take action]? Why or why not?
5. What's missing that you'd want to know?
```

---

## Tips

- **Match personas to audience** — Don't use tech early adopter for a senior care product
- **Include at least one skeptic** — Catches blind spots
- **Be specific about desired action** — "Would you buy?" vs "Would you sign up for demo?"
- **Run before launch** — Catch issues when they're cheap to fix

---

## Example: SaaS Landing Page Review

```bash
# Spawn 4 personas
sessions_spawn task="Read ~/clawd/agents/focus-group/personas/smb-owner.md. Review https://example-saas.com. Would you sign up for a free trial? What questions remain?"

sessions_spawn task="Read ~/clawd/agents/focus-group/personas/skeptical-boomer.md. Review https://example-saas.com. What makes you trust or distrust this company?"

sessions_spawn task="Read ~/clawd/agents/focus-group/personas/startup-founder.md. Review https://example-saas.com. How does this compare to alternatives you know?"

sessions_spawn task="Read ~/clawd/agents/focus-group/personas/ux-designer.md. Critique https://example-saas.com. Focus on clarity, flow, and conversion optimization."
```

Wait for all to respond, then synthesize into actionable improvements.

---

*Add new personas as needed. Keep them realistic and internally consistent.*
