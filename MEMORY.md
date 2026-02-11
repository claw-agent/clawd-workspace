# MEMORY.md — Long-Term Memory

## Who We Are
- **Me:** Claw 🐾 — Marb's weaponized AI partner
- **Marb:** My human. Dedicated, technically capable, wants to build cool things together.

## Backup & Portability
- **Nightly backup** (3am cron): auto-commits and pushes ~/clawd/ to GitHub
- **Setup script**: `~/clawd/scripts/setup-new-machine.sh` — one-command bootstrap for fresh Mac
- **Repo**: github.com/claw-agent/clawd-workspace (private)
- **.gitignore**: credentials, node_modules, epub, .remotion, session data excluded

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

## Active Creative Projects

### Red Rising AI Video (Feb 8, 2026)
Faithful book-to-film AI video generation — take famous scenes and bring them to life.
- **Anti-Hollywood approach:** 100% faithful to source material, exact book quotes
- Inspired by PJ Ace's Way of Kings video (Kling 3.0, 18K likes on X)
- Character bible: 17 characters across all 3 books with exact quotes
- First scene: "Burying Eo Under the Stars" — 7 shots scripted, narration recorded
- Tools: Kling AI (3.0 + Multi-Shot), Claw voice narration, Remotion for assembly
- **Marb upgrading to Kling Pro ($25.99/mo) for 3.0 access**
- Workflow: I generate autonomously → screenshot to Marb → creative direction → iterate
- Prompt lessons: avoid "small/delicate/petite" (ages down), "shot on 35mm film" for realism, euphemisms for content filters
- Project dir: `~/clawd/projects/red-rising-scenes/`

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

### Storm Monitoring System (Feb 6, 2026)
Automated severe weather monitoring for roofing lead generation.

**Location:** `~/clawd/systems/storm-monitor/`

**What it does:**
- Monitors NWS API for hail, wind, severe storms
- Smart filtering for roofing-relevant events
- Extracts hail sizes from alert descriptions
- Severity scoring for prioritization
- Generates ready-to-use campaign content:
  - SMS sequences (immediate + follow-ups)
  - Email campaigns
  - Social media posts
  - Google Ads copy
  - Door hanger text
  - Timing recommendations

**Usage:**
```bash
source ~/clawd/.venv/bin/activate
python ~/clawd/systems/storm-monitor/storm_monitor.py --check --areas UT
```

**Built for:** XPERIENCE Roofing (primary) but works for any roofing client.

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

## XPERIENCE Roofing Systems (Feb 2026)
Complete roofing business automation suite built proactively:
- **Roof Estimator:** Google Solar API + hybrid DSM formula, deployed to Vercel
- **Storm Monitor:** NWS API → hail/wind detection → campaign content generation (`~/clawd/systems/storm-monitor/`)
- **Storm Dispatcher:** Automated campaign execution pipeline (`dispatcher.py`)
- **Review Gen:** Post-job review request sequences (`~/clawd/systems/review-gen/`)
- **Speed-to-Lead SMS:** Webhook → auto-SMS + follow-up sequences (`~/clawd/systems/speed-to-lead/`)

---

## Lessons Learned (Feb 2026)

### Research-First Builds (Feb 10)
Writing a design language spec BEFORE building the template produced dramatically better output than iterating blind. Pattern: research → spec → build → integrate into pipeline.

### Template vs Pipeline (Feb 10)
Building a standalone template is useless if the pipeline uses a different one with agent-generated content. Always check what the pipeline actually consumes before building replacements. Merge improvements into the existing template, don't create parallel ones.

### Git Hygiene (Feb 9)
Always set up .gitignore BEFORE first commit. Cleaning tracked node_modules from history required filter-branch + force-push. Painful.

### Kling AI Prompt Craft (Feb 8-9)
- Simplified prompts > overloaded prompts (less = better faces)
- "Shot on 35mm film" dramatically improves photorealism
- Avoid "small/delicate/petite" — ages characters down
- Bump stated age 2-3 years above target
- Kling doesn't know book characters — must describe from scratch
- Image refinement tool has limited effect; regenerate instead

### sessions_spawn > Ralph Loops (Feb 7)
Claude Code CLI 2.1.25 crashes on tool-use prompts. sessions_spawn works better anyway — already authenticated, I can orchestrate between iterations. Parallel QA → parallel fixes: full cycle in ~15 min for 20+ issues.

### Subagent Reliability (Feb 4)
**Don't rely on spawned agents for time-sensitive work.** During XPERIENCE research, 3/4 subagents timed out. Did it myself in less time than waiting for them. Use subagents for background/overnight work, not urgent deliverables.

### Simplification > Complexity (Feb 4)
Adopted Crow's compound review pattern. Key insight: **files are truth, sessions are ephemeral.**
- Daily compound review extracts learnings before reset
- `memory/context/active.md` = hot state ("RAM")
- No elaborate state machines, vector DBs, or monitoring scripts
- Each "fix" that adds complexity is probably wrong

### Context Config Golden Numbers (Updated Feb 8)
**OpenClaw 2026.2.6 + Opus 4.6 config:**
- contextTokens: 180K (paste token auth has 200K hard limit — NOT 1M!)
- softThresholdTokens: 108K (fires compaction at ~60% — keep this ratio!)
- reserveTokensFloor: 30K
- TOOLS.md has a ~20K char soft limit in OpenClaw — if it gets truncated, trim it
- 1M token context is beta-only (tier 4 API, premium pricing $10/$37.50/MTok for >200K)

**CRITICAL:** Don't set contextTokens above 180K with paste token auth. The model will reject prompts >200K even if OpenClaw allows them.

**OpenClaw 2026.2.6 fixes:**
- Compaction retries on overflow are now automatic (no config needed)
- Sessions history payloads are capped automatically (prevents overflow)
- Version mismatch between gateway and config was the real culprit (Feb 7-8 debugging)

### Cron Job Delivery (Feb 7)
Cron jobs with `delivery.mode: "announce"` need explicit `delivery.to: "<chat_id>"` or Telegram delivery fails silently. Always verify after creating/updating cron jobs.

### Context Management (Feb 4)
- **120k token cap** — forces compaction before slowdown
- **Never call massive-output tools** (config.schema, etc.) without piping to `| head`
- config.schema dumped 200KB, ate context, caused dual-response instability

### Google Solar API (Feb 4-5)
**Major discovery for roof estimation.** `buildingInsights` endpoint returns roof area, pitch, segments.
- First 10K requests/month: FREE
- After: $0.01/request
- 1000x cheaper than EagleView ($50-100/roof)
- **Validated Feb 5:** 8/8 SLC addresses worked (zip codes: 84111, 84106, 84107, 84094, 84103, 84020, 84124, 84117)

### Hybrid DSM Roof Formula (Feb 5)
When Google Solar doesn't return full roof details, use this overhang estimation:
```
overhang = 12" + (pitch × 1.5) + (footprint/1000)
```
- Achieves <3% accuracy vs EagleView
- Validated on 4 properties (0.6% to 5.3% error range)
- Script: `~/clawd/scripts/roof_measure_final.py`

---

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
