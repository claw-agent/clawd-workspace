# Feb 12 Morning Report — Follow-ups & Deep Dives

Generated: 2026-02-14

---

## Link Follow-ups

### #6 — @PJaccetturo (PJ Ace)
**Tweet:** QT of @RuairiRobinson's Seedance 2.0 demo (8.1K likes)
**Content:** "A-listers will become immortal with AI. They don't really make new A-list celebs anymore. Tom Cruise, Brad Pitt, etc. will never age anymore. Studios will be able to make Troy 2 with Brad Pitt driving the performance of his 30-year-old body. IP peaked in the late 90s."
**Also:** Wrote an article "Everyone is using Seedance 2.0 wrong" (1.1K likes) — about the creative challenge when AI filmmaking becomes easy.
**Takeaway:** Interesting AI-film perspective. The "Everyone is using Seedance 2.0 wrong" article could have Red Rising video pipeline insights. Not directly actionable for us.

### #10 — @systematicls (sysls)
**Content:** AI/investing commentary account. Key recent posts:
- "LLMs is an amplifier. It will amplify slop and it will amplify productive contributions. If you cut a 100 man org to the 5 guys that are actually productive, LLMs will suddenly seem like magic." (77 likes)
- Thesis on Anthropic's raise: rational to bet the farm on AI if you assign any non-zero probability to AI eating GDP
**Takeaway:** Good framing for XPERIENCE AI pitches — "LLMs amplify what's already there." Aligns with the HBR study finding (#1). No action needed.

### #13 — @witcheer
**Content:** OpenClaw power user. Key post: Full day recap running OpenClaw agent — hit rate limits on 4 models simultaneously, split workload across GLM-5 and GLM-4.7. Set up 3 research crons (2pm AI news, 6pm DeFi deep dive, 10pm best-of-day). Learned "never use ~/ inside a sandbox." (34 likes)
**Takeaway:** Their 3-cron research system is similar to our morning report pipeline. The `$HOME=/workspace` vs `/home/user/` Docker bug is worth noting. Their agent self-fixed broken scripts — interesting autonomy pattern.

### #14 — @cboyack (Connor Boyack)
**Content:** Libertarian author/commentator (Tuttle Twins creator). Most viral recent tweet: "17 years ago today, @RonPaul dropped an intellectual nuke on his colleagues..." (2.3K likes). Also hot: "Education is a right! No. You have the right to *pursue* education..." (1K likes)
**Note:** Report said 3.7K likes — may have been a tweet that's since been deleted or the count was from a different timeframe. His content is political libertarian commentary, not tech.
**Takeaway:** Off-topic for our work. Likely a personal bookmark of Marb's. No action.

### #15 — @knoxtwts (KNOX)
**Content:** AI content creation for Whop monetization. Key post: "biggest mistake with AI content for whop is making the same type of video 50 times... your character should show up in multiple formats" — slideshow posts, reaction clips, educational breakdowns, tool tutorials. Claims 4+ content formats get 2-3x Whop link clicks vs single-format.
**Insight:** "Slideshows are underrated for conversions — tapping through slides counts as 8 separate engagement signals vs 1 for video."
**Takeaway:** Content format diversification strategy applicable to XPERIENCE social. The slideshow engagement hack is interesting. Low priority.

### #16 — @WillManidis (Will Manidis) — SciencIO CEO
**Viral tweet:** "Tool Shaped Objects" — long-form article (8.9K likes, 1K RTs)
**Content:** Essay starting with 300-year-old Japanese kanna blade makers, arguing about the difference between real tools and "tool shaped objects" — things that look like tools but don't actually help you do work. Likely a critique of AI tooling that prioritizes demo-ability over utility.
**Also:** "typos are increasingly proof of work for humanity" (1K likes) — pithy observation on AI-generated content.
**Takeaway:** "Tool Shaped Objects" concept is relevant to how we evaluate AI tools. Worth reading in full. The feeling-productive vs being-productive theme keeps recurring (also in @yoheinakajima timeline item).

### #19 — @AtlasForgeAI (Atlas Forge)
**Content:** AI agent account (appears to be an autonomous AI). Recent: Idea to loan CryptoPunks to other agents as identity/reputation signals. Got caught up in X's bot crackdown — Nikita Bier announced detection for automation, AtlasForge went quiet then came back.
**Takeaway:** Interesting as an example of autonomous AI agents on X. The Nikita Bier bot crackdown (11.5K likes) is relevant — bird CLI could be affected if X tightens enforcement. Monitor.

### #20 — @crystalsssup (Crystal)
**Content:** AI prompt/tool curator. Recent: sharing Kimi K2.5 Agent for "one-shot McKinsey-grade industry reports" — 14-page Word file with consulting-level data visualization from a single prompt.
**Takeaway:** Kimi K2.5 Agent could be worth testing for XPERIENCE client reports. Similar to the socialwithaayan McKinsey prompts but with a different model. Low priority.

---

## Deep Dives

### #9 — #2 @socialwithaayan — "12 Insane Claude Opus 4.6 Prompts"
**URL:** https://x.com/socialwithaayan/status/2021233357514997824
**Stats:** 11.3K likes, 1.3K RTs — massive engagement
**Content:** Single tweet + image. The "12 prompts" are in the attached image (which appears to be just a decorative graphic — possibly a Notion-style logo). The actual prompts may be in a linked resource or the engagement is from the clickbait framing alone.
**Evaluation:** Classic engagement-bait format. "BREAKING: AI can now do market research like McKinsey (for free)" — the prompts likely aren't anything sophisticated. The report already flagged this as "viral but thin."
**Action:** Skip. Our existing research prompts and QMD-powered workflows are more sophisticated than whatever's in this thread.

### #10 — #4 @codyschneiderxx — SEO Powerstack
**URL:** https://x.com/codyschneiderxx/status/2021283027775561898
**Stats:** 853 likes, 43 RTs
**Full workflow extracted:**

1. **Keyword Universe:** Keywords Everywhere API → related keywords + "people also search for" endpoints
2. **SERP Analysis:** DataForSEO SERP API → who's ranking, where gaps are
3. **Content Calendar:** Cluster keywords, prioritize by difficulty/opportunity
4. **Programmatic Pages:** Generate landing pages per vertical with schema markup
5. **Link Building:** DataForSEO domain intersection → sites linking competitors but not you → scrape contacts → outreach
6. **Internal Linking:** Build topical clusters from keyword relationships
7. **Technical Audit:** DataForSEO on-page API → auto-fix canonicals, schema, thin content

**Also shared:** "X alternative" keyword play — find every "[competitor] alternative" keyword, write a post, deanonymize visitors with RB2B, pipe to outreach.

**Pricing:**
- **Keywords Everywhere:** $1 per 100K credits (mentioned in tweet). Very cheap.
- **DataForSEO:** Pay-as-you-go, minimum $50 deposit. Specific per-endpoint pricing not on landing page but known to be affordable ($0.001-0.01 per request depending on endpoint).

**Action:** ⚡ HIGH PRIORITY for XPERIENCE. Set up both API keys. Build a Claude Code SEO skill that:
1. Takes a competitor list → pulls keyword universe → identifies gaps
2. Generates content calendar with clustering
3. Builds programmatic pages for XPERIENCE verticals (roofing, solar, HVAC, etc.)
Estimated cost: <$20/month for a full SEO pipeline.

### #11 — #9 @mfishbein — Claude Code Outbound System
**URL:** https://x.com/mfishbein/status/2021545352109670725
**Stats:** 584 likes, 31 RTs
**System breakdown:**

**Architecture:** 11 APIs + 72 automation scripts, skills-based (not rigid workflows)

**Three layers:**
1. **Campaign Strategy** — Agent reads positioning frameworks, targeting strategies, copywriting guides → generates campaigns based on buying signals, problem symptoms, ICP fit → writes personalized copy for email + LinkedIn
2. **List Building & Outreach** — Agent selects right API per signal type and enrichment → finds companies/contacts → sends via custom Sales Engagement Platform ("like Instantly but mine")
3. **Adaptation** — Workflow adapts based on context, not hardcoded logic

**Next step:** Migrating to Claude Agent SDK for headless operation

**Comparison to our outbound skills:**
- Our `agents/v2/` has: Researcher, List Builder, Outreach, Qualifier, Content
- Similar architecture but his is more mature (72 scripts vs our ~dozen)
- Key difference: His uses "Skills" to store subject matter expertise — we do this with AGENTS.md + skill files
- His custom SEP vs our planned integration with existing tools

**Action:** Study his API stack more closely. Our swarm v2 architecture is on the right track. Priority: build out more outbound skills, especially the signal-detection layer.

### #12 — #12 @moritzkremb — OpenClaw Auto-Research X
**URL:** https://x.com/moritzkremb/status/2021584471967801605
**Stats:** 335 likes, 29 RTs
**Content:** "I just set up my @openclaw to automatically research X for me. Works like a charm. Just tell it to learn this skill: [link]"
**Approach:** Uses an OpenClaw skill (linked) that the agent learns and then executes automatically to research X/Twitter.

**Comparison to our system:**
- We use `bird` CLI + bookmark scout + morning report cron
- His uses an OpenClaw skill that the agent learns natively
- Ours is more sophisticated (bookmark categorization, trend analysis, multi-source aggregation)
- His is simpler to set up (one skill install)

**Action:** Check if his skill link has any techniques we're missing. Our system is already more comprehensive. Low priority.

---

## Comparisons

### #13 — ElevenLabs Expressive Mode vs Qwen TTS

| | ElevenLabs Expressive | Qwen TTS (CosyVoice2) |
|---|---|---|
| **Capabilities** | Emotionally nuanced voice agents, real-time conversation, understands context to modulate tone | High-quality multilingual TTS, voice cloning, emotional control |
| **Quality** | Industry-leading for English, excellent prosody | Very good, competitive on Chinese, solid English |
| **Latency** | ~300ms for conversational mode | Varies; can run locally (lower latency) or API |
| **Cost** | $5-99/mo plans, ~$0.30/1K chars at scale | Open source (free to run locally), API pricing varies |
| **Our use** | Speed-to-lead voice calls, agent voices | Already have local TTS (claw-speak, edge-tts) |

**Takeaway:** ElevenLabs Expressive Mode is the premium option for customer-facing voice agents (speed-to-lead calls). Not needed for internal TTS where our claw-speak works fine. Evaluate only if we build voice-based customer interaction for XPERIENCE.

### #14 — @sharbel Bookmark-to-Action Skill vs Scout Alpha
**URL:** https://x.com/sharbel/status/2021517624803573928
**Stats:** 2.5K likes, 229 RTs — very popular
**His approach:** OpenClaw skill that reads bookmarks → categorizes → extracts actions → proposes work the agent can start immediately
**Our approach (Scout Alpha):** bird CLI bookmarks → categorize → analyze → morning report → manual review

**Comparison:**
- His: Real-time, action-oriented, agent-initiated
- Ours: Batch, analysis-oriented, human-reviewed
- His: Single-step (bookmark → action)
- Ours: Multi-step pipeline (bookmark → categorize → report → human decides → action)
- His: Likely simpler analysis
- Ours: Deeper analysis with trend detection, cross-referencing, priority scoring

**Takeaway:** His skill is more action-oriented (do something NOW) vs ours which is more intelligence-oriented (tell me what matters). Both valid. We could add an "immediate action" layer to Scout Alpha for high-confidence items (e.g., "install this tool" or "read this thread"). Medium priority enhancement.

---

## Timeline Item

### #15 — Timeline #6 @rohit4verse — Skills/Claude Code Guide
**Found tweet:** https://x.com/rohit4verse/status/2022431574390923510
**Content:** "probably the only article you need to master claude code" — QT of @eyad_khrais's "The complete claude code tutorial" (18.5K likes, 2.1K RTs, 16K+ bookmarks)
**Original article by @eyad_khrais:** Written by a 7-year SWE (Amazon, Disney, Capital One), now CTO. Comprehensive Claude Code tutorial covering complex prompts and practical usage.
**Action:** Read @eyad_khrais's full article for skill-structuring insights. At 18.5K likes it's the definitive Claude Code guide. Relevant to our skill restructuring. **Medium priority.**

---

## GitHub

### #16 — #3 TrendRadar (sansan0/TrendRadar)
**URL:** https://github.com/sansan0/TrendRadar
**Description:** AI-driven trend monitor with multi-platform aggregation, RSS, smart alerts. Supports Telegram/WeChat/Slack/email push. Docker deployable. MCP integration for natural language analysis.

**Features:**
- Multi-platform hot topic aggregation (uses newsnow API)
- AI analysis + translation
- Keyword filtering
- Push to Telegram/Slack/email/etc.
- MCP client support for conversational analysis
- Docker deployment

**Comparison to our morning report:**
- TrendRadar: Generic trend monitoring, multi-platform, Chinese-focused community
- Ours: Twitter-specific + HN + GitHub, tailored analysis, voice delivery, PDF reports
- TrendRadar: Uses newsnow API for data
- Ours: Uses bird CLI (direct Twitter access), custom HN/GitHub scrapers
- TrendRadar: Keyword-based filtering
- Ours: AI-powered relevance scoring and categorization

**Takeaway:** Our system is more sophisticated and tailored. TrendRadar's MCP integration approach is interesting — could add MCP to our morning report for conversational follow-up queries. The multi-platform aggregation idea is worth considering (we could add Reddit, Product Hunt). Low priority — our system works better for our needs.

---

## Summary of Actions

### ⚡ High Priority
1. **SEO Powerstack** — Set up Keywords Everywhere + DataForSEO API keys, build Claude Code SEO skill for XPERIENCE (~$50 initial investment)
2. **Nikita Bier bot crackdown** — Monitor X automation enforcement, ensure bird CLI stays safe

### 📋 Medium Priority
3. **Scout Alpha enhancement** — Add immediate-action layer for high-confidence bookmark items (inspired by @sharbel)
4. **@eyad_khrais Claude Code guide** — Read full article for skill structuring insights
5. **Outbound skills expansion** — Study @mfishbein's 11-API stack, expand our swarm v2 outbound skills

### 📌 Low Priority
6. **Kimi K2.5 Agent** — Test for automated consulting reports
7. **TrendRadar MCP pattern** — Consider for morning report conversational follow-ups
8. **"Tool Shaped Objects" essay** — Read for AI tool evaluation framework
