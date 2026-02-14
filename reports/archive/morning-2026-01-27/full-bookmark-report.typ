#set page(paper: "a4", margin: 1.2cm)
#set text(font: "Helvetica Neue", size: 9pt)
#set heading(numbering: none)

#align(center)[
  #text(size: 24pt, weight: "bold")[🦞 Bookmark Intel Report]
  #v(0.3em)
  #text(size: 12pt, fill: gray)[Monday, January 27, 2026 • 9:45 AM MST]
]

#line(length: 100%, stroke: 0.5pt + gray)
#v(0.5em)

= TL;DR

- *Dario's "5-Year Window"* — Anthropic CEO says powerful AI arrives in 1-2 years. "Country of geniuses in a datacenter."
- *\$Millions in free alpha* — Business owners doing \$2-10M still emailing themselves notes, never opened Claude.
- *Kimi K2.5* — Open-source model matching Opus 4.5 at 8x lower cost. Agent Swarm for parallel tasks.
- *\/last30days* — Claude Code skill that does exactly what we're building. Validates our approach.

#v(1em)
= Top 3 Highlights

#box(fill: luma(245), inset: 10pt, radius: 4pt, width: 100%)[
  == 1. Dario Amodei — "The Adolescence of Technology"
  #text(fill: rgb("#e63946"))[*Importance: 5/5 — 📚 RESOURCE*]
  
  *What:* 15,000+ word essay from Anthropic's CEO. Powerful AI could arrive in 1-2 years.
  
  *Key Quote:* "Watching the last 5 years of progress from within Anthropic... I can feel the pace of progress, and the clock ticking down."
  
  *Definition:* "Country of geniuses in a datacenter" — smarter than Nobel Prize winners, millions of instances, 10-100x human speed.
  
  #link("https://darioamodei.com/essay/the-adolescence-of-technology")[Read full essay →]
]

#v(0.5em)

#box(fill: luma(245), inset: 10pt, radius: 4pt, width: 100%)[
  == 2. damianplayer — MILLIONS in Free Alpha
  #text(fill: rgb("#2a9d8f"))[*Importance: 5/5 — 📦 IMPLEMENT*]
  
  *What:* "There's MILLIONS in free alpha sitting in businesses run by people who've never opened Claude. Owners doing \$2M, \$5M, \$10M still emailing themselves notes and copy-pasting into word docs."
  
  *Why it matters:* Direct extension of SLC Lead Gen. After website revamp → AI workflow consulting.
  
  *Action:* Add AI workflow audit to lead gen pipeline.
]

#v(0.5em)

#box(fill: luma(245), inset: 10pt, radius: 4pt, width: 100%)[
  == 3. mvanhorn — \/last30days Claude Code Skill
  #text(fill: rgb("#f77f00"))[*Importance: 4/5 — 🔧 REFINE*]
  
  *What:* Claude Code skill that scans 30 days on Reddit, X, web → returns prompt patterns + workflows.
  
  *Video Analysis:* 1:50 screen recording, 55 frames extracted. Shows engagement rankings, key patterns.
  
  *Why it matters:* This is exactly what we're building! Validates our overnight research approach.
]

#v(1em)
= All 15 Bookmarks

#table(
  columns: (auto, 2fr, auto, auto),
  align: (left, left, center, center),
  stroke: 0.5pt + luma(200),
  inset: 6pt,
  [*Author*], [*Content*], [*Category*], [*Score*],
  
  [0xkyle], ["5-year window to hyper-gamble into elite status or end up a serf for life"], [🔥 TRENDING], [4/5],
  [mvanhorn], [\/last30days Claude Code skill — scans Reddit, X, web for patterns], [🔧 REFINE], [4/5],
  [Kimi_Moonshot], [Kimi K2.5 — visual agentic model, SOTA benchmarks, Agent Swarm], [📦 IMPLEMENT], [5/5],
  [itsPaulAi], [Kimi K2.5 is as good as Opus 4.5, 8x cheaper], [📰 NEWS], [3/5],
  [bored2boar], [\$40M Polymarket arbitrage paper — combinatorial arb], [📚 RESOURCE], [3/5],
  [DarioAmodei], ["Adolescence of Technology" — 15,000 word essay on AI risks], [📚 RESOURCE], [5/5],
  [aakashgupta], [Dario's 3 admissions: timeline (1-2 years), plus 2 more], [📚 RESOURCE], [4/5],
  [AndrewCurran], ["Thinking is now multimodal, I just tested it"], [📰 NEWS], [3/5],
  [eliebakouch], [Kimi K2.5 has full multimodal INCLUDING video], [📰 NEWS], [3/5],
  [erichustls], ["If afraid of losing job to AI, here's what I'd do..."], [📚 RESOURCE], [3/5],
  [morganlinton], [Clawdbot + Cloudflare Tunnel setup guide], [🔧 REFINE], [4/5],
  [mreflow], ["You're Using AI Wrong" — friend's reaction after watching], [📚 RESOURCE], [3/5],
  [damianplayer], [MILLIONS in free alpha — \$2-10M businesses never opened Claude], [📦 IMPLEMENT], [5/5],
  [iruletheworldmo], [Sonnet 4.7 — better than Opus, cheaper, faster], [📰 NEWS], [4/5],
  [notnotstorm], [Rust best practices for agents — clippy lints], [🔧 REFINE], [3/5],
)

#v(1em)
= Deep Dive: Kimi K2.5

#box(fill: rgb("#f0f7ff"), inset: 10pt, radius: 4pt, width: 100%)[
  *Key Stats:*
  - 1T total params, 32B activated (MoE)
  - 8x cheaper than Claude Opus 4.5
  - SWE-bench Verified: 76.8\% | BrowseComp: 74.9\% (beats GPT-5.2!)
  
  *Agent Swarm:* "Decomposes complex tasks into parallel sub-tasks executed by domain-specific agents."
  
  #link("https://huggingface.co/moonshotai/Kimi-K2.5")[HuggingFace →]
]

#v(0.5em)

= Deep Dive: \/last30days Video Analysis

#box(fill: rgb("#fff5f0"), inset: 10pt, radius: 4pt, width: 100%)[
  *Method:* Downloaded 1:50 video via yt-dlp, extracted 55 frames with ffmpeg, analyzed with vision.
  
  *No audio* (screen recording) — content is visual.
  
  *Frame 10:* "What if you could catch up in \/last30days" — intro slide
  
  *Frame 25:* Key Patterns: Hallucination prevention, role assignment, structured output
  
  *Frame 40:* Top 5 by Engagement: Email automation (8x), Task management (6x), Overnight coding agent (5x)
]

#v(1em)
= Categories Summary

#columns(2)[
  == 📦 IMPLEMENT (2)
  - Kimi K2.5 for coding tasks
  - AI workflow audit for lead gen
  
  == 🔧 REFINE (3)
  - \/last30days methodology
  - Cloudflare Tunnel integration
  - Rust clippy for agents
  
  #colbreak()
  
  == 📚 RESOURCE (5)
  - Dario's 15,000 word essay
  - Polymarket arb paper
  - aakashgupta's 3 admissions
  - erichustls job survival guide
  - mreflow "Using AI Wrong"
  
  == 🔥 TRENDING (1)
  - "5-year window" discourse
  
  == 📰 NEWS (4)
  - Kimi K2.5 launch (3 tweets)
  - Sonnet 4.7 announcement
]

#v(1em)
= Action Items

#box(fill: rgb("#e8f5e9"), inset: 10pt, radius: 4pt, width: 100%)[
  *This Week:*
  ☐ Test Kimi K2.5 on HuggingFace
  ☐ Read full Dario essay — strategic context
  ☐ Add AI workflow audit pitch to lead gen emails
  
  *This Month:*
  ☐ Package overnight research as Claude Code skill
  ☐ Set up Cloudflare Tunnel (per morganlinton)
]

#v(1em)
#align(center)[
  #text(size: 8pt, fill: gray)[
    Generated by Claw 🦞 | browser-use + yt-dlp + ffmpeg + vision
    
    15 unique bookmarks | 12 scrolls | 55 video frames | Full content extracted
  ]
]
