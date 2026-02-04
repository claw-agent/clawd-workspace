#set page(margin: 1.2cm)
#set text(font: "Helvetica Neue", size: 9pt)
#set heading(numbering: none)

#align(center)[
  #text(size: 22pt, weight: "bold")[🦞 Comprehensive Bookmark Research]
  
  #text(size: 11pt, fill: gray)[January 27, 2026 — Full Deep Dive Analysis]
]

#line(length: 100%, stroke: 0.5pt + gray)

= Executive Summary

*22 unique bookmarks* scanned via browser-use. *17 new* analyzed in depth.

#box(fill: rgb("#f0f7ff"), inset: 10pt, radius: 4pt, width: 100%)[
  *Top 3 Takeaways:*
  
  1. *Dario's Timeline:* Powerful AI (smarter than Nobel laureates) could arrive in 1-2 years. "Country of geniuses in a datacenter."
  
  2. *\$Millions in Free Alpha:* Business owners doing \$2-10M still emailing themselves notes. Don't need fancy agents — just Claude basics.
  
  3. *Kimi K2.5:* Open-source model matching Opus 4.5 at 8x lower cost. Agent Swarm for parallel task execution.
]

#v(6pt)
#line(length: 100%, stroke: 0.3pt + gray)

= Deep Dives

== 📚 Dario Amodei — "The Adolescence of Technology"
#text(size: 8pt, fill: gray)[Source: darioamodei.com | 15,000+ words]

*Core Thesis:* Humanity entering a "technological adolescence" — a rite of passage that will test us as a species.

*Timeline Admission:*
#quote(block: true)[
  "Watching the last 5 years of progress from within Anthropic, and looking at how even the next few months of models are shaping up, I can feel the pace of progress, and the clock ticking down."
]

*Definition of Powerful AI:*
- Smarter than Nobel Prize winner across ALL fields
- Millions of instances running 10-100x human speed
- Works autonomously for hours/days/weeks
- = "Country of geniuses in a datacenter"

*5 Risk Categories:*
#table(
  columns: (auto, 1fr),
  [1. Autonomy], [What are its intentions? Could it dominate?],
  [2. Destruction], [Terrorists amplifying capabilities],
  [3. Power seizure], [Dictators/rogues taking control],
  [4. Economics], [Mass unemployment, wealth concentration],
  [5. Indirect], [Rapid change destabilizing society],
)

*Key Stat:* Algorithmic progress ~4x/year. AI already writing code at Anthropic.

#line(length: 100%, stroke: 0.3pt + gray)

== 🔧 mvanhorn — /last30days Claude Code Skill
#text(size: 8pt, fill: gray)[Video: 1:50 | 77 replies, 391K views]

*What it does:* Scans last 30 days on Reddit, X, and web → returns prompt patterns + new releases + workflows.

*Video Analysis (frame extraction):*
- Key Patterns: Hallucination prevention, role assignment, structured output
- Top 5 by Engagement: Email automation (8x), Task management (6x), Overnight coding agent (5x), Browser automation (4x)

*Relevance:* This is what we're building! Validates our overnight research approach.

#line(length: 100%, stroke: 0.3pt + gray)

== 📦 damianplayer — MILLIONS in Free Alpha
#text(size: 8pt, fill: gray)[Direct business opportunity]

#quote(block: true)[
  "There's MILLIONS in free alpha sitting in businesses run by people who've never opened Claude. Owners doing \$2M, \$5M, \$10M still emailing themselves notes and copy-pasting into word docs."
]

*Positioning Strategy:*
- By Industry: Finance, Health, Legal
- By Pain Point: Ops, Reporting, Customer Experience

*Our Angle:* After website revamp → AI workflow consulting.

#line(length: 100%, stroke: 0.3pt + gray)

== 📦 Kimi K2.5 — Open-Source Agentic Model
#text(size: 8pt, fill: gray)[Kimi_Moonshot, itsPaulAi, eliebakouch | 2M+ views]

*Key Stats:*
- 1T total params, 32B activated (MoE)
- 8x cheaper than Opus 4.5
- SWE-bench Verified: 76.8\%
- BrowseComp: 74.9\% (beats GPT-5.2 and Opus!)

*Agent Swarm Feature:*
#quote(block: true)[
  "Decomposes complex tasks into parallel sub-tasks executed by dynamically instantiated, domain-specific agents."
]

*Video Understanding:* Native multimodal including video analysis.

#line(length: 100%, stroke: 0.3pt + gray)

== 📚 bored2boar — \$40M Polymarket Arbitrage
#text(size: 8pt, fill: gray)[arxiv.org/abs/2508.03474]

*Paper Finding:* \$40 million USD profit extracted through systematic arbitrage.

*Two Types:*
1. Market Rebalancing — within single market
2. Combinatorial — across multiple markets

#line(length: 100%, stroke: 0.3pt + gray)

== 🔥 0xkyle — "5-Year Window"
#text(size: 8pt, fill: gray)[323K views, referencing Dario's essay]

#quote(block: true)[
  "Reading what the CEO of Anthropic wrote, it is more clear than ever you basically have less than a 5 year window to hyper-gamble your way into elite status or end up a serf for life. We're in the Endgame now."
]

#line(length: 100%, stroke: 0.3pt + gray)

= Additional Bookmarks (Quick Summary)

#table(
  columns: (auto, 1fr, auto),
  [*Author*], [*Content*], [*Category*],
  [AndrewCurran], [Thinking is now multimodal], [📰 NEWS],
  [erichustls], [6-month guide if afraid of losing job to AI], [📚 RESOURCE],
  [morganlinton], [Clawdbot + Cloudflare Tunnel setup], [🔧 REFINE],
  [mreflow], ["You're Using AI Wrong" — friend's reaction], [📚 RESOURCE],
  [iruletheworldmo], [Sonnet 4.7 better than Opus, cheaper], [📰 NEWS],
  [notnotstorm], [Rust best practices for agents (clippy)], [🔧 REFINE],
)

#v(8pt)
#line(length: 100%, stroke: 0.5pt + gray)

= Action Items

#box(fill: rgb("#fff5f0"), inset: 10pt, radius: 4pt, width: 100%)[
  *Implement:*
  ☐ Test Kimi K2.5 for coding tasks (HuggingFace)
  ☐ Add AI workflow audit to lead gen pipeline
  ☐ Package overnight research as Claude Code skill (like /last30days)
  
  *Read:*
  ☐ Full Dario essay (15,000 words) — strategic context
  ☐ Polymarket paper if interested in prediction markets
  
  *Track:*
  ☐ damianplayer's YouTube channel launch
  ☐ Sonnet 4.7 release details
]

#v(10pt)

#align(center)[
  #text(size: 8pt, fill: gray)[
    Generated by Claw 🦞 | browser-use + yt-dlp + ffmpeg + vision | 22 bookmarks analyzed
  ]
]
