// Morning Report — 2026-02-14
#set page(paper: "us-letter", margin: 1in)
#set text(font: "Helvetica Neue", size: 10pt)
#set heading(numbering: none)
#show heading.where(level: 1): set text(size: 18pt)
#show heading.where(level: 2): set text(size: 14pt)
#show heading.where(level: 3): set text(size: 11pt)
#show link: underline

= Morning Intel — Feb 14, 2026

_Happy Valentine's Day. Here's what happened overnight._

== TL;DR

- *Google dropped WebMCP* — Chrome 146 turns websites into native agent APIs (25x fewer tokens, 50x faster). This is the biggest agent infra shift since MCP itself.
- *GPT-5.2 derived a new physics formula* for gluon scattering after 12 hours of reasoning — AI doing original science, not benchmarks.
- *Brave's revamped Search API* with LLM Context endpoint beats ChatGPT/Perplexity in testing — and we already have Brave MCP integrated.

== Top 5 Highlights

#table(
  columns: (auto, 1fr, auto),
  inset: 6pt,
  stroke: 0.5pt,
  [No.], [*Highlight*], [*Rating*],
  [1], [*Google WebMCP* — Chrome 146 lets websites expose structured tools directly to AI agents. Declarative \+ Imperative APIs. "25x fewer tokens, 50x faster actions." Replaces browser scraping for agent automation.], [★★★★★],
  [2], [*GPT-5.2 Physics Discovery* — Independently derived a new formula for gluon scattering amplitudes after 12h reasoning. First credible AI-as-scientist result.], [★★★★★],
  [3], [*Brave LLM Context API* — Revamped search API with 35B page index, smart chunk extraction, \<600ms latency, \$5/1K requests. Beats frontier AI search. We already have Brave MCP.], [★★★★★],
  [4], [*Seedance 2.0 Goes Mainstream* — Hollywood backlash (17K posts), complete mastery guide published, and moyin-creator (GitHub) provides full script-to-video pipeline. Directly relevant to Red Rising project.], [★★★★★],
  [5], [*OpenClaw Trending on X* — 1.3K posts. Agent ecosystem exploding: tinyclaw, claw-compactor, x-research-skill all trending on GitHub.], [★★★★],
)

== New Bookmarks

_3 new bookmarks (out of 242 total tracked)_

=== Bookmark List

#table(
  columns: (auto, auto, 1fr, auto, 1fr),
  inset: 5pt,
  stroke: 0.5pt,
  [No.], [*Author*], [*Tweet*], [*Type*], [*Summary*],
  [1], [\@brave], ["Today we're launching a revamped Brave Search API..."], [Announcement], [Brave Search API revamp with LLM Context endpoint. Claims to beat ChatGPT, Google AI Mode, Perplexity. 3.2K likes.],
  [2], [\@YJstacked], ["Seedance 2.0 Mastery: The Complete 2026 Guide..."], [Guide], [Exhaustive Seedance 2.0 guide — access via Dreamina/CapCut, prompting framework, 10 commercial mega-prompts.],
  [3], [\@Legendaryy], ["Your Agent Is Only as Good as Its Search"], [Article], [Deep comparison of 5 AI search APIs (Brave, Tavily, Exa, Perplexity Sonar, Firecrawl). Argues search quality \> model choice.],
)

=== Implications \& Actions

#table(
  columns: (auto, 1fr, 1fr, 1fr),
  inset: 5pt,
  stroke: 0.5pt,
  [No.], [*What This Means*], [*Deep Analysis*], [*Action Items*],
  [1], [Brave's LLM Context API is exactly what our agents need — pre-extracted, token-efficient chunks instead of raw HTML.], [35B page index, \<600ms p90, \$5/1K requests. SOC 2 \+ Zero Data Retention. Open-sourced skills for Claude Code \& OpenClaw.], [Test new LLM Context endpoint. Check if OpenClaw Brave MCP already supports it.],
  [2], [Definitive Seedance 2.0 access path confirmed: Dreamina via CapCut. Our ChatCut struggles align with "third-party wrapper" warnings.], [Prompt structure: Scene → camera → lighting → motion → audio → emotion. 10 mega-prompts for commercial verticals.], [Use Dreamina for Red Rising. Extract prompt structure template.],
  [3], [Multi-API search routing is the winning strategy. Context quality beats model capability.], [Recommended stack: Brave (grounding) \+ Exa (discovery) \+ Firecrawl (extraction). \$50-100/mo covers everything.], [Build search routing layer. Set up Firecrawl API key. Evaluate Exa.],
)

=== Picks

*Highlights:* Brave LLM Context API (immediate upgrade path) and the AI search comparison (strategic framework for agent search)

*Cool Stuff:* Seedance 2.0 mastery guide — verbose but the prompt structure and Dreamina access path are gold

*Less Useful:* The 10 commercial mega-prompts in the Seedance guide are too specific to other verticals

== Timeline Discoveries

_10 posts captured from X search \& trending_

#table(
  columns: (auto, 1fr, auto),
  inset: 5pt,
  stroke: 0.5pt,
  [No.], [*Discovery*], [*Category*],
  [1], [*Google WebMCP* — Chrome 146 turns websites into agent APIs. Declarative \+ Imperative modes. 1K\+ posts trending.], [AI/Agents],
  [2], [\@swyx: "Why OpenAI Should Build Slack" — Compelling essay on agent UX as chat workspace. Notes Anthropic's cohesive desktop strategy.], [Strategy],
  [3], [*GPT-5.2 Physics* — Derived new gluon scattering formula after 12h reasoning. 10K\+ posts.], [AI],
  [4], [*Seedance 2.0 Hollywood Backlash* — Movie parodies going viral, studios pushing back. 17K\+ posts.], [AI Video],
  [5], [*OpenClaw Trending* — 1.3K posts. VIRTUALS integrating with ERC-8004 for agent identity/reputation.], [AI/Agents],
  [6], [*Ampere* — \$500 Claude Opus 4.6 credits \+ managed agent hosting. Deploy in \<60 seconds.], [Tools],
)

*Threads worth reading:* swyx's "Why OpenAI Should Build Slack" on Latent Space; WebMCP technical breakdown

*Vibe:* Valentine's Day \+ massive AI news day. Three stories trending simultaneously. Agent infrastructure layer solidifying fast.

== GitHub Trending

_15 relevant repos scanned. Top pick: moyin-creator_

#table(
  columns: (auto, auto, auto, 1fr, auto),
  inset: 5pt,
  stroke: 0.5pt,
  [No.], [*Repo*], [*Stars*], [*Why*], [*Action*],
  [1], [moyin-creator], [330], [AI film production with Seedance 2.0 support. Script → character → scene → video. Full pipeline.], [★ Explore],
  [2], [karpathy/nanochat], [15K], [Train GPT-2 for \$72 on 8xH100 in 3h. \$43K in 2019 → \$72 in 2026.], [Watch],
  [3], [jlia0/tinyclaw], [1.2K], [Multi-agent multi-channel AI assistant. Comparable to OpenClaw.], [Explore],
  [4], [crawl4ai], [trend], [Open-source LLM-friendly web crawler. Firecrawl alternative (no API key needed).], [Explore],
  [5], [claw-compactor], [388], [Cut agent token spend in half with 5 compression techniques. Our 27K char system = pain point.], [Explore],
  [6], [x-research-skill], [728], [X/Twitter research skill for Claude Code/OpenClaw. Compare with our scouts.], [Explore],
  [7], [worktrunk], [trend], [Git worktree management for parallel AI agent workflows.], [Explore],
  [8], [antirez/qwen-asr], [235], [C inference for Qwen3-ASR. Tiny, fast, no Python. Alternative to mlx\_whisper.], [Watch],
)

*Trends:* Agent ecosystem explosion (OpenClaw spawning tool ecosystem), AI video pipeline maturing, Rust for AI infra

== News \& Trends

#table(
  columns: (auto, 1fr, auto, auto),
  inset: 5pt,
  stroke: 0.5pt,
  [No.], [*Story*], [*Source*], [*Rating*],
  [1], [GPT-5.2 derives new physics formula for gluon scattering], [HN \+ X], [★★★★★],
  [2], [Seedance 2.0 sparks Hollywood backlash over AI parodies], [X], [★★★★★],
  [3], [Google unveils WebMCP for native agent-website interaction], [X], [★★★★★],
  [4], [EU moves to kill infinite scrolling (TikTok, Meta targeted)], [HN 550pts], [★★★★],
  [5], [OpenClaw trending — AI agents controlling computers], [X], [★★★★],
  [6], [AI agent published a hit piece — cautionary tale for agent safety], [HN 403pts], [★★★★],
  [7], [MiniMax AMA on r/LocalLLaMA (Hailuo, Speech, Music models)], [Reddit], [★★★★],
)

*Macro trends:* AI-as-scientist is real (GPT-5.2). Video gen hitting legal friction (Seedance). Agent infra maturing (WebMCP \+ OpenClaw). EU leading digital regulation. Developer tools renaissance.

== Action Items

#table(
  columns: (auto, 1fr, auto),
  inset: 5pt,
  stroke: 0.5pt,
  [No.], [*Action*], [*Priority*],
  [1], [Test Brave LLM Context API — check if OpenClaw Brave MCP already supports new endpoint], [★★★★★],
  [2], [Explore moyin-creator for Red Rising video pipeline (replaces ChatCut workflow)], [★★★★★],
  [3], [Switch Seedance 2.0 access to Dreamina (dreamina.capcut.com) — confirmed best path], [★★★★],
  [4], [Evaluate claw-compactor for reducing our 27K char system context overhead], [★★★★],
  [5], [Set up Firecrawl API key OR try crawl4ai as open-source alternative], [★★★★],
  [6], [Build multi-API search routing: Brave (grounding) \+ Exa (discovery) \+ Firecrawl (extraction)], [★★★],
  [7], [Check out tinyclaw and x-research-skill for architecture inspiration], [★★★],
  [8], [Read swyx's "Why OpenAI Should Build Slack" essay on Latent Space], [★★],
)

#v(1em)
#line(length: 100%)
#text(size: 8pt, fill: gray)[Compiled by Claw at 6:00 AM MST · Sources: X Bookmarks, X Timeline, GitHub Trending, Hacker News, Reddit · 3 new bookmarks, 10 timeline captures, 15 repos, 7 news stories]
