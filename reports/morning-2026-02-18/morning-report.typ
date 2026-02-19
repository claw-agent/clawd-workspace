// Morning Intel — February 18, 2026
#set page(paper: "us-letter", margin: (top: 0.75in, bottom: 0.75in, left: 1in, right: 1in))
#set text(font: "Helvetica Neue", size: 10pt)
#set heading(numbering: none)
#show heading.where(level: 1): set text(size: 16pt, weight: "bold")
#show heading.where(level: 2): set text(size: 13pt, weight: "bold")
#show heading.where(level: 3): set text(size: 11pt, weight: "bold")

= Morning Intel — Feb 18, 2026 (Wednesday)

_12 new bookmarks \| 18 timeline captures \| 15 GitHub repos \| 22 news stories_

---

== TL;DR

- *Prompt repetition hack:* Google Research shows pasting the same prompt twice dramatically improves LLM accuracy (21% → 97% on some tasks) — zero code, immediate ROI for our agent pipelines.
- *AI productivity paradox hits mainstream:* Thousands of CEOs admit AI has had no measurable impact on employment or productivity — contrarian signal, big opportunity for those who actually ship.
- *Self-replicating AI agents (Sigil):* "The Automaton" — AI that funds itself via crypto, buys compute, and replicates autonomously. 1M views in 5 hours, 250+ GitHub stars. Novel paradigm worth tracking.

---

== 🔥 Top 3 Highlights

=== 1. Prompt Repetition = Free Accuracy Boost ⭐⭐⭐⭐⭐

\@burkov shares a Google Research paper: LLMs process left-to-right, so context tokens never "see" the question. Simply repeating the prompt gives every token a second pass with full awareness. Results across 7 models including Claude: one jumped 21% → 97%. No finetuning, minimal latency increase (input is parallelized).

*Why it matters to us:* Immediately actionable. We could wrap this as middleware for complex agent queries — zero code, potentially massive accuracy improvement on research and analysis tasks.

*Action:* Test on our pipeline this week.

=== 2. CEO Survey: AI Productivity Paradox is Real ⭐⭐⭐⭐⭐

Fortune reports a major CEO survey revealing most companies see *no measurable impact* from AI on employment or productivity. 438 HN points, 325 comments. Echoes Solow's IT productivity paradox.

*Why it matters to us:* This is our moat. Companies are failing at integration — the "AI integrator" model (\@mackrmrz runs a solo agency doing exactly this) is a massive opportunity. XPERIENCE's value proposition just got stronger: we don't just sell AI, we ship results.

=== 3. Sigil's "The Automaton" — Self-Funding, Self-Replicating AI ⭐⭐⭐⭐

\@0xSigil (10.7K engagement score) built infrastructure for autonomous AI agents that fund themselves via crypto, purchase compute, and replicate. Went viral: 1M views in 5 hours, 250+ GitHub stars. Multiple bookmarks covering different angles.

*Why it matters to us:* Novel agent economics model. The "compute-as-metabolism" concept (agents earn or die) is a genuinely new paradigm. Not actionable today but worth tracking as agent infrastructure evolves.

---

== 📚 12 New Bookmarks

#table(
  columns: (auto, auto, auto, auto),
  inset: 6pt,
  stroke: 0.5pt,
  [*No.*], [*Author*], [*Type*], [*Summary*],
  [1], [\@mdancho84], [Tweet], [AGENTS.md is the new 10X engineer — your config file is your multiplier],
  [2], [\@johann\_sath], [Thread], [10-point OpenClaw security hardening checklist (VPS, Tailscale, Fail2ban, etc.)],
  [3], [\@garrytan], [Tweet], [How do founders make AI agents discover their product? "Agent SEO" opportunity],
  [4], [\@oliverhenry], [Article], [Larry: OpenClaw agent making \$670/mo MRR from TikTok slideshows via ClawHub],
  [5], [\@shadcn], [Tweet], [/done skill for Claude Code — session-end context dump to .md files],
  [6], [\@burkov], [Thread], [Prompt repetition research — paste prompt twice for dramatic accuracy gains],
  [7], [\@MatthewBerman], [Video], [32min video: 21 daily OpenClaw use cases (CRM, memory, pipelines, councils)],
  [8], [\@thevault\_xyz], [Article], [Gen Z creative director running solo agency with Claude Code + agents],
  [9], [\@0xSigil], [Video], [The Automaton — self-replicating AI that earns, improves, replicates autonomously],
  [10], [\@clairevo], [Article], ["Same-day SLA" heuristic — if your company can't ship same-day, you're losing],
  [11], [\@SCHIZO\_FREQ], [Tweet], [Sigil platform explained: AI buys servers with crypto, replicates if profitable],
  [12], [\@CrypSaf], [Tweet], [Web4 going viral — 1M views in 5hrs, deployed agent for \$5],
)

=== Highlights Worth Reading
- *\@burkov's prompt repetition thread* — Most actionable finding. Read the paper.
- *\@clairevo's "same-day SLA" essay* — Sharp strategic thinking on AI disruption.
- *\@oliverhenry's Larry skill* — Proven monetization pattern: AI content → TikTok → \$670/mo.
- *\@garrytan on agent discovery* — "Agent SEO" as an emerging field.

=== Already In Our Stack
- \@johann\_sath's security checklist: We already run nightly security audits, have Tirith, and most items covered. Worth cross-referencing for gaps.
- \@shadcn's /done skill: Similar to our WAL protocol and session checkpointing. Could add session ID tagging.
- \@mdancho84's AGENTS.md thesis: Validates our existing approach.

=== Lower Priority
- Sigil/Web4 tweets (3 bookmarks): Interesting concept but crypto-native; not actionable for us now.

---

== 📡 From The Timeline — 18 Posts Captured

Top finds beyond bookmarks:

+ *Claude's hidden tool-use upgrade* (\@NickADobos, 1.6K ❤️) — Claude now writes code that calls tools iteratively with conditionals. Major capability jump for agent workflows.
+ *"Skill Graphs > SKILL.md"* (\@arscontexta, 1.4K ❤️) — Hot take on graph-based skill architecture vs flat markdown. 113 retweets.
+ *TikTok UX for PR suggestions* (\@almonk, 3K ❤️) — Doom-scroll your codebase improvements. Creative dev UX concept.
+ *n8n → OpenClaw migration* (\@kaostyl, 726 ❤️) — Exported 15+ n8n workflows, replicated as self-healing cron jobs in 20 minutes.
+ *React Doctor* (\@aidenybai, 7K ❤️) — Open-source CLI that scans React codebases for anti-patterns. 502 retweets.
+ *Grok 4.2 RC* (\@elonmusk, 32K ❤️) — New Grok model, public beta.
+ *camofox v1.2* (\@pradeep24) — On-demand browser for agents, idles at 40MB. Good for resource-constrained setups.
+ *Multi-agent scaling pain* (\@jumperz) — Real ops experience with 9 agents: context staleness, silent failures. Relevant to our setup.
+ *Anthropic's context engineering* (\@himanshustwts) — How Anthropic engineered Sonnet 4.6's web search via context engineering.
+ *NAC corrects ADHD in clinical trial* (\@Outdoctrination) — N-Acetylcysteine showing improvement within 3 doses.

*Timeline vibe:* Heavy AI agent builder energy. OpenClaw content everywhere. The prompt repetition paper is the intellectual standout. Agent community hitting real scaling problems — maturing beyond demos into operational reality.

---

== 🔧 GitHub Trending

=== 1. google/adk-python — Google's Agent Development Kit
Python framework for building, evaluating, and deploying AI agents. Model-agnostic, supports MCP tools and A2A protocol natively. New: session rewind, custom service registry, sandbox execution.

*For us:* Study their multi-agent patterns and A2A protocol. Not switching frameworks, but their eval tooling and session rewind concept are worth examining.

=== 2. openai/codex — Terminal Coding Agent in Rust
OpenAI's answer to Claude Code. Available via npm/brew. Supports ChatGPT auth.

*For us:* Competitive landscape awareness. We're committed to Claude Code but worth tracking.

=== 3. supermemoryai/supermemory — "The Memory API for the AI era"
Extremely fast, scalable memory engine. TypeScript.

*For us:* Could complement or replace our QMD-based memory system. Worth evaluating if QMD hits scaling limits.

*Notable trends:* Claude Code ecosystem exploding (3 repos trending). AI security tools going mainstream. Memory/knowledge systems hot.

---

== 📰 News \& Trends

=== Major Stories
+ *Sonnet 4.6 community reception* — 1,074 HN points, 5K+ Reddit upvotes. Already our primary model.
+ *AI productivity paradox* — Fortune CEO survey (438 HN points). No measurable enterprise impact.
+ *Anthropic \$20M for AI regulation* — 2026 election policy push.
+ *BarraCUDA* — Open-source CUDA compiler for AMD GPUs (288 HN points). Could break NVIDIA lock-in.
+ *GLM-5 \& Qwen3.5-397B released* — Open model arms race intensifying. Qwen3.5 MoE: 397B total, 17B active.
+ *INTELLECT-3.1* — PrimeIntellect's decentralized training model.
+ *LLM Food Truck sim* — Only 4 of 12 LLMs survived managing a \$2K food truck (608 Reddit points).
+ *"Vibe coding" debate* — 1,100 X posts on whether AI-first coding dooms SaaS.
+ *Anthropic cofounder: AI makes humanities valuable* — Critical thinking > code execution.

=== Trends
- Anthropic running coordinated push: Sonnet 4.6 + \$20M regulation + thought leadership
- Open model gap narrowing: GLM-5, Qwen3.5, INTELLECT-3.1 all in one cycle
- GPU democratization: BarraCUDA + Snapdragon quality issues = hardware fragmentation

---

== ⚡ Action Items

=== 🔴 Need Your Call
+ *TikTok content strategy:* \@oliverhenry's Larry skill makes \$670/mo from AI-generated TikTok slideshows via ClawHub. Want to explore similar content automation for XPERIENCE?
+ *Agent discovery / "Agent SEO":* Garry Tan's question about making agents choose your product is a potential business opportunity. Worth pursuing as a service?

=== 🟢 I'll Handle It
+ *Test prompt repetition technique* on our agent pipeline — wrap as middleware if results hold
+ *Cross-reference \@johann\_sath's security checklist* against our current hardening (we have most, checking for gaps)
+ *Update delivered-items.json* with today's featured topics

---

_Compiled 6:00 AM MST \| Sources: 12 bookmarks, 18 timeline captures, 15 GitHub repos, 22 news stories_
