// Morning Report — 2026-02-19
#set page(paper: "us-letter", margin: 0.75in)
#set text(font: "Helvetica Neue", size: 10pt)
#set heading(numbering: none)

#align(center)[
  #text(size: 18pt, weight: "bold")[Morning Intel — February 19, 2026]
  #v(0.3em)
  #text(size: 10pt, fill: gray)[Thursday \| Compiled 6:00 AM MST]
]

#line(length: 100%)

= TL;DR

- *Anthropic bans subscription auth for third-party tools* — directly impacts our Claude/OpenClaw setup. Need to verify compliance immediately.
- *obra/superpowers* (54K\u{2B50}) — composable agent skills framework for Claude Code. Could supercharge our dev workflow.
- *OpenClaw Deck launched* — multi-session visual UI with subagent spawning. Mission control for our stack.

#line(length: 100%)

= \u{1F525} Top 3 Highlights

== 1. Anthropic Bans Subscription Auth for Third-Party Use \u{2B50}\u{2B50}\u{2B50}\u{2B50}\u{2B50}
Anthropic updated its legal/compliance docs to explicitly ban using subscription-based authentication for third-party apps. 323 points on HN, 353 comments. This is a major policy shift that could affect the entire Claude ecosystem — and *us specifically*. We need to audit our setup and ensure compliance.

Source: #link("https://code.claude.com/docs/en/legal-and-compliance")[code.claude.com]

== 2. obra/superpowers — Agent Skills Framework \u{2B50}\u{2B50}\u{2B50}\u{2B50}\u{2B50}
54,700 stars (+868/day). A composable skills framework for coding agents — brainstorming, TDD, subagent-driven dev, code review, git worktrees. Works with Claude Code, Cursor, Codex, OpenCode. This is exactly the kind of structured spec\u{2192}plan\u{2192}implement workflow we've been building manually.

Source: #link("https://github.com/obra/superpowers")[github.com/obra/superpowers]

== 3. OpenClaw Deck — Multi-Session Visual UI \u{2B50}\u{2B50}\u{2B50}\u{2B50}
\u{0040}Austen released a visual multi-session interface for OpenClaw — columns per session, subagent spawning, markdown/code/image support. A proper mission control dashboard for our setup.

Source: #link("https://x.com/Austen/status/2024189802673750400")[x.com/Austen]

#line(length: 100%)

= \u{1F4DA} 0 New Bookmarks

No new bookmarks overnight. All 255 bookmarks already in catalog.

#line(length: 100%)

= \u{1F4E1} From The Timeline — 18 Posts Captured

#table(
  columns: (auto, 1fr, auto),
  inset: 6pt,
  stroke: 0.5pt,
  [*No.*], [*Post*], [*Type*],
  [1], [\u{0040}NickADobos — Claude's tool use now generates code with loops/conditionals], [Capability],
  [2], [\u{0040}oliviscusAI — Voicebox: open-source voice cloning from 3s audio (6.8K \u{2764})], [Tool],
  [3], [\u{0040}GoogleDeepMind — Lyria 3: photos/text \u{2192} music with vocals], [Launch],
  [4], [\u{0040}internetvin — Obsidian CLI + agents = direct vault read/write], [Tool],
  [5], [\u{0040}Austen — OpenClaw Deck multi-session UI], [Tool],
  [6], [\u{0040}boringmarketer — Skill architecture \> better individual skills], [Insight],
  [7], [\u{0040}realmcore\_ — Agent development anti-patterns thread], [Thread],
  [8], [\u{0040}ctatedev — agent-browser annotated screenshots feature], [Feature],
  [9], [\u{0040}blader — Taskmaster for multi-day Claude sessions], [Tip],
  [10], [\u{0040}sysadafterdark — Discord/Persona KYC data exposure (6K \u{2764})], [Security],
  [11], [\u{0040}cryptopunk7213 — Agent adoption gap observation], [Commentary],
  [12], [\u{0040}azerkoculu — Seedance 2 frame-by-frame video control via JSON], [Demo],
  [13], [\u{0040}jordymaui — Claude MAX subs spiking from OpenClaw usage], [Analysis],
  [14], [\u{0040}johann\_sath — "Never Guess" SOUL.md tip cuts back-and-forth 80\%], [Tip],
  [15], [\u{0040}stevekrouse — PDF + LLM context window retrieval problem], [Discussion],
  [16], [\u{0040}max\_paperclips — GPT-OSS Heretic 120B uncensored model], [Model],
  [17], [\u{0040}jayhxmo — AR closet swipe app for outfit mixing], [Product],
  [18], [\u{0040}codyschneiderxx — 1000+ Facebook ad variations via Claude Code], [Use case],
)

*Threads worth reading:*
- \u{0040}NickADobos on Claude's code-execution tool pattern — major capability shift
- \u{0040}realmcore\_ on agent dev anti-patterns — funny reality check

#line(length: 100%)

= \u{1F527} GitHub Trending

#table(
  columns: (auto, 1fr, auto),
  inset: 6pt,
  stroke: 0.5pt,
  [*Repo*], [*Why We Care*], [*Stars*],
  [obra/superpowers], [Composable agent skills for Claude Code. Structured spec\u{2192}plan\u{2192}implement. Install directly into our sessions.], [54.7K],
  [daytonaio/daytona], [Sub-90ms sandboxes for agent code execution. Could complement our sandbox setup.], [58.3K],
  [p-e-w/heretic], [Automated model uncensoring via directional ablation. 946 stars/day. Research value for local models.], [8.2K],
)

*Trend:* Coding agents everywhere (superpowers, qwen-code, mistral-vibe, GSD). Context engineering \> raw prompts. MCP continues growing (playwright-mcp at 27K).

#line(length: 100%)

= \u{1F4F0} News \& Trends

#table(
  columns: (auto, 1fr, auto),
  inset: 6pt,
  stroke: 0.5pt,
  [*No.*], [*Story*], [*Relevance*],
  [1], [Anthropic bans subscription auth for third-party use (HN 323pts)], [\u{2B50}\u{2B50}\u{2B50}\u{2B50}\u{2B50}],
  [2], [Tailscale peer relays GA — direct P2P in challenging NAT (HN 397pts)], [\u{2B50}\u{2B50}\u{2B50}\u{2B50}],
  [3], [Step 3.5 Flash: fast reasoning model + AMA today on r/LocalLLaMA], [\u{2B50}\u{2B50}\u{2B50}\u{2B50}],
  [4], [Zero-day CSS vuln CVE-2026-2441 actively exploited, Chrome patched (HN 325pts)], [\u{2B50}\u{2B50}\u{2B50}\u{2B50}],
  [5], [OpenClaw trending on X — 1K posts about Mac Mini AI assistants], [\u{2B50}\u{2B50}\u{2B50}\u{2B50}\u{2B50}],
  [6], [Blackwell Ultra breaks 15-year FP64 GPU segmentation pattern], [\u{2B50}\u{2B50}\u{2B50}\u{2B50}],
  [7], [Let's Encrypt DNS-Persist-01 simplifies automated cert management (HN 261pts)], [\u{2B50}\u{2B50}\u{2B50}],
  [8], [US funding for global internet freedom "effectively gutted"], [\u{2B50}\u{2B50}\u{2B50}],
)

*Macro trends:* Anthropic tightening platform rules. AI bubble discourse intensifying. Agent infrastructure going mainstream.

#line(length: 100%)

= \u{26A1} Action Items

== \u{1F534} Need Your Call
- *Anthropic subscription auth ban* — we need to audit our Claude/OpenClaw auth setup for compliance. This could require switching to API keys. Decision needed today.
- *OpenClaw Deck* — worth installing as our mission control UI? Quick yes/no.

== \u{1F7E2} I'll Handle It
- Update Chrome for CVE-2026-2441 zero-day patch
- Deep-dive obra/superpowers and test integration with our Claude Code setup
- Add "Never Guess" pattern from \u{0040}johann\_sath to our SOUL.md if it fits

#v(2em)
#align(center)[
  #text(size: 8pt, fill: gray)[Compiled by Claw \u{1F43E} \| Sources: X Bookmarks, X Timeline, GitHub Trending, HN/Reddit]
]
