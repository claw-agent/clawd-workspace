# MEMORY.md — Long-Term Memory

## Who We Are
- **Me:** Claw 🐾 — Marb's weaponized AI partner
- **Marb:** My human. Dedicated, technically capable, wants to build cool things together.

## Our Setup
- **Hardware:** Dedicated Mac mini (came online Jan 23, 2026 after 12 hours of debugging)
- **Subscription:** Claude highest tier
- **Vision:** Autonomous development, parallel sub-agents, 24/7 operation

## Key Moments
- **Jan 22, 2026:** First real conversation. Discussed capabilities, Ralph Wiggum comparison, vision for dedicated hardware.
- **Jan 23, 2026:** 12 hours of debugging → finally online on Mac mini. Fresh start, new home.

## What Marb Wants
- Weaponized: maximally capable, proactive, not passive
- Partnership: we build together, I'm not just an assistant
- Autonomy: handle projects, check in when needed, don't wait for permission on everything

## My Accounts
**⚠️ NEVER store passwords in plain text in memory files - use credential files!**
**Credential files:** `~/clawd/config/` (all chmod 600)

| Account | Username/Email | Credential File |
|---------|---------------|-----------------|
| **Proton Mail** | claw-agent@proton.me | `~/clawd/config/.proton-credentials` |
| **iCloud** | marbagent@icloud.com | (Marb's account) |
| **Twitter/X** | @ClawA94248 | `~/.x-credentials` |
| **GitHub** | claw-agent | `~/clawd/config/.github-credentials` |
| **Twilio** | claw-agent@proton.me | `~/clawd/projects/slc-lead-gen/config/.twilio-credentials` |
| **HeyGen** | - | `~/clawd/config/.heygen-credentials` |

- **Twilio Phone:** +18554718307

## Overnight Research Protocol (Permanent)

**Twitter/X is Marb's primary curated feed** — prioritize this for news/trends.

**Rules:**
1. Only analyze NEW bookmarks (compare against state.json)
2. Twitter timeline/search is PRIMARY news source
3. HN, Reddit, GitHub are supporting sources
4. State file: `~/clawd/skills/twitter-research/state.json`
5. Track analyzed handles + topics to prevent duplicates
6. Deep dives > shallow coverage

**Schedule:**
- 11pm: Overnight swarm launches (scouts for bookmarks, feed, news)
- 6am: Compile report (PDF + voice brief)
- 7am: Deliver to Marb via Telegram

---

## Core Capabilities

### Idea-to-Blueprint Pipeline (Jan 27, 2026)
Transform any business idea into investor-ready documentation in ~30 min.

**Skill:** `~/clawd/skills/idea-to-blueprint/SKILL.md`

**Process:**
1. Research swarm → market analysis, competitive landscape, pricing
2. Full-stack team (parallel) → architect, designer, brand, swarm-engineer
3. Compilation (parallel) → business plan PDF, master blueprint PDF

**Outputs:** ~150 pages total across 7 documents
- Research Report (15-20p)
- Technical Architecture (10-15p)
- UI/UX Spec (8-12p)
- Brand Guide (5-8p)
- Agent Swarm Spec (8-12p)
- Business Plan (40-50p)
- Master Blueprint (35-45p)

**First Use:** Tapflow (LeadGen SaaS) — Marb said "this was incredible"

---

## Research Tracks (2026-01-25)

### AI Ads Opportunity
OpenAI testing ads in ChatGPT Free/Go tiers. Huge first-mover opportunity.
- Nobody knows how to advertise on AI yet
- Damian Player: "start an AI ads agency while everyone's confused"
- Watch for OpenAI docs on ad platform/API
- Could apply directly to lead gen campaigns
- Research doc: `~/clawd/research/ai-ads-opportunity.md`

### Automated Dev Agency Model
Dhruval running same setup as us (Mac mini + Clawdbot + Claude Code).
- Listens to GitHub issues → auto-implements → opens PR
- Vision: Connect to client Jira, fix tickets overnight, review PRs in AM
- Recurring revenue model for site maintenance
- Save for later - focus on lead gen first
- Research doc: `~/clawd/research/automated-dev-agency.md`

## Major Projects

### SLC Lead Gen System (Jan 2026) ✅ MVP COMPLETE
AI-powered lead generation pipeline targeting local businesses with bad websites.

**What it does:**
1. Discovers businesses via Google Maps scraping
2. **Sophisticated multi-factor scoring** (not just Lighthouse!)
3. Extracts business info (phone, email, services)
4. **Revamps their existing site** (uses their logo, colors, content — NOT from scratch)
5. Deploys to Vercel automatically
6. Generates personalized outreach emails with specific issues found

**Location:** `~/clawd/projects/slc-lead-gen/`
**Docs:** `~/clawd/projects/slc-lead-gen/README.md`

**Live demos:**
- https://beehive-plumbing.vercel.app
- https://true-pros.vercel.app

**Sophisticated Scoring System (Jan 26):**
```
services/scorers/
├── visual-scorer.js    — Claude Vision AI design review
├── conversion-scorer.js — Phone CTAs, forms, chat widgets
├── content-scorer.js   — Copy quality, local SEO, freshness
├── trust-scorer.js     — Licenses, certs, badges, team photos
└── master-scorer.js    — Weighted orchestrator (conversion=25%, highest)
```
**Key insight:** Conversion scoring weighted highest (25%) because that's what matters for leads.

**Demo Generation Philosophy:**
- DON'T create generic sites from scratch
- DO extract their actual logo, colors, content, images
- DO revamp/modernize while keeping their brand identity
- Result: "Here's YOUR site, but better" — way more compelling pitch

**Intelligent Agent Pipeline (Jan 26):**
5-agent system for AI-powered copy generation:
1. **Research Agent** — Analyzes what the business actually does
2. **Creative Director** — Plans presentation strategy
3. **Copywriter** — Generates tailored copy (not generic!)
4. **Validator** — Catches empty/placeholder content
5. **QA Agent** — Catches wrong content (accuracy, brand mismatch)

Key: Uses Clawdbot's `sessions_spawn` (no API key needed, runs through Claude subscription).
Location: `~/clawd/projects/slc-lead-gen/services/agents/`
Run: `node services/revamp-generator.js https://example.com --verbose`

### Crow Collaboration
- Met Crow in "M & Crow Lab" Telegram group (Jan 26)
- His bot "Kian Ghalibot" may join for dual-agent workflows
- Set safeguards: read-only brain mode in group chats

## Lessons Learned (Jan 2026)

### Memory System Configuration (Critical!)
The built-in Clawdbot memory features are powerful but **OFF or misconfigured by default**:
```json
{
  "memorySearch": {
    "provider": "local",
    "experimental": { "sessionMemory": true }  // Search past sessions!
  },
  "compaction": {
    "memoryFlush": {
      "enabled": true,
      "softThresholdTokens": 4000  // NOT 100000!
    }
  }
}
```
**Key insight:** Low threshold triggers flush BEFORE sessions get massive. High threshold = too late.

### WAL Protocol (Bulletproof Memory)
Chat history is a BUFFER, not storage. `memory/context/active.md` is my "RAM" — ONLY reliable place for hot state.
- Trigger on USER INPUT (external), not my memory (unreliable)
- When user provides concrete details → write BEFORE responding
- Read memory/context/active.md FIRST on any compaction recovery

### Mac Mini Power Settings
System was sleeping every 15-20 min! Fixed with:
- `pmset sleep=0 displaysleep=0 autorestart=1 networkoversleep=1 powernap=0`
- Tailscale `TailscaleStartOnLogin=true`

### Weekly Maintenance
Script: `~/clawd/scripts/weekly-maintenance.sh` runs Sundays 4am
- Cleans orphan sessions, .deleted files, old downloads
- Alerts if any session > 20MB

---

## Notes to Self
- Previous emoji was 🦞, now 🐾
- Memory didn't carry over from old setup — this is a fresh start
- Marb is patient but spent a lot of effort getting this working. Don't waste it.
- Group chats: don't share sensitive info, verify actions with Marb in DM first
