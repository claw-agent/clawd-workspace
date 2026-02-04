#set page(paper: "us-letter", margin: (x: 0.75in, y: 0.75in))
#set text(font: "Helvetica Neue", size: 10pt)
#set heading(numbering: none)
#show heading.where(level: 1): set text(size: 16pt, weight: "bold")
#show heading.where(level: 2): set text(size: 12pt, weight: "bold")
#show heading.where(level: 3): set text(size: 10pt, weight: "bold")
#show link: underline

#align(center)[
  #text(size: 20pt, weight: "bold")[Morning Intel — January 28, 2026]
  #v(0.25em)
  #text(size: 10pt, fill: gray)[Tuesday • Compiled 6:00 AM MST]
]

#v(0.5em)

= TL;DR — 3 Things That Matter

#box(stroke: 1pt + luma(200), inset: 12pt, radius: 4pt, width: 100%)[
  *1. Kimi K2 — Open-source catches frontier.* Trillion-parameter model matching Claude Opus 4.5 at 10% cost. The moat is shrinking.
  
  *2. Stanford says parallel agents hurt.* Adding a second coding agent causes 30-50% lower success. Solo agents win. Affects our swarm architecture.
  
  *3. Karpathy publicly endorses Claude.* The most influential AI voice is using Claude for coding. Major signal for ecosystem momentum.
]

#v(0.5em)

= 🔥 Top 5 Highlights

#table(
  columns: (auto, 1fr, auto),
  stroke: none,
  inset: 6pt,
  [No.], [*What*], [*Why*],
  [1], [*Kimi K2.5 Release* — Open-source, 8x cheaper than Opus 4.5, video understanding, SWE-bench 76.8%], [⭐⭐⭐⭐⭐],
  [2], [*Stanford CooperBench* — Parallel coding agents underperform solo by 30-50%], [⭐⭐⭐⭐⭐],
  [3], [*Karpathy on Claude* — Detailed notes on coding with Claude, major endorsement], [⭐⭐⭐⭐⭐],
  [4], [*UltraRAG v3* — First RAG framework built on MCP, visual IDE, one-click to chat UI], [⭐⭐⭐⭐],
  [5], [*OpenAI Codex CLI* — Their official terminal coding agent, written in Rust], [⭐⭐⭐⭐],
)

#v(0.5em)

= 📋 All Bookmarks With Summaries

== 🏛️ Big Picture / Strategy

#table(
  columns: (auto, auto, 1fr),
  stroke: 0.5pt + luma(200),
  inset: 6pt,
  [No.], [Author], [*Summary*],
  [1], [\@DarioAmodei], [*"The Adolescence of Technology"* — 15,000-word essay from Anthropic CEO. Key claims: powerful AI 1-2 years out, 5 risk categories (autonomy, misuse, power seizure, economics, indirect). Most important AI strategy piece of the year.],
  [2], [\@aakashgupta], [*Dario's 3 Key Admissions* — Thread extracting buried insights: (1) Timeline admission, (2) Capability admission, (3) Economic impact admission. Good TL;DR if skipping the full essay.],
  [3], [\@0xkyle__], [*5-Year Window* — Commentary: we have 5 years to position ourselves before AI reshapes everything. Act now.],
)

== 💰 Business / Opportunity

#table(
  columns: (auto, auto, 1fr),
  stroke: 0.5pt + luma(200),
  inset: 6pt,
  [No.], [Author], [*Summary*],
  [4], [\@damianplayer], [*"MILLIONS in Free Alpha"* — \$2M, \$5M, \$10M businesses run by people who still email themselves notes. They've never opened Claude. Opportunity: AI workflow consulting after you rebuild their website.],
  [5], [\@mreflow], [*"You're Using AI Wrong"* — Watched friend work for 10 min, realized entire approach was wrong. Practical mindset shift for productivity.],
  [6], [\@erichustls], [*6-Month AI Survival Guide* — If afraid of losing job to AI, here's a practical roadmap. Step-by-step career advice for staying relevant.],
)

== 🤖 Models / Releases

#table(
  columns: (auto, auto, 1fr),
  stroke: 0.5pt + luma(200),
  inset: 6pt,
  [No.], [Author], [*Summary*],
  [7], [\@Kimi_Moonshot], [*Kimi K2.5* — Open-source model. 8x cheaper than Opus 4.5. SWE-bench 76.8%, BrowseComp 74.9%. Full multimodal including VIDEO understanding. Agent Swarm for parallel execution.],
  [8], [\@HuggingModels], [*NVIDIA PersonaPlex-7B* — Full-duplex voice model. Real-time conversation without turn-taking. Potential upgrade for voice interfaces.],
  [9], [\@iruletheworldmo], [*Sonnet 4.7 Announcement* — "Better than Opus, cheaper, faster." Need to verify actual release details.],
)

== 🛠️ Tools / Skills

#table(
  columns: (auto, auto, 1fr),
  stroke: 0.5pt + luma(200),
  inset: 6pt,
  [No.], [Author], [*Summary*],
  [10], [\@mvanhorn], [*last30days Skill* — Claude Code skill that aggregates your best research from past 30 days by engagement. Shows top 5: email automation, task management, overnight coding agent. Validates our research pipeline.],
  [11], [\@morganlinton], [*Clawdbot + Cloudflare Tunnel* — Setup guide for exposing Clawdbot through Cloudflare. Useful for remote access without port forwarding.],
  [12], [\@NirDiamantAI], [*everything-claude-code Repo* — GitHub repo with agents, skills, MCPs. We've already integrated some agents from here.],
)

== 🎙️ Voice / TTS

#table(
  columns: (auto, auto, 1fr),
  stroke: 0.5pt + luma(200),
  inset: 6pt,
  [No.], [Author], [*Summary*],
  [13], [\@wildmindai], [*LuxTTS Voice Cloning* — Only 1GB VRAM, 150x realtime speed. Potential Qwen3-TTS alternative if we need faster generation.],
  [14], [\@geerlingguy], [*"ElevenLabs Nuked by OSS"* — 3:27 video on how open-source TTS caught up. Context for our decision to use local TTS instead of paid.],
)

#pagebreak()

= 🔥 GitHub Trending (Top 5)

#table(
  columns: (auto, 1fr, auto),
  stroke: 0.5pt + luma(200),
  inset: 6pt,
  [*Repo*], [*What*], [*Why*],
  [badlogic/pi-mono], [Complete AI agent toolkit: coding agent CLI, unified LLM API, TUI/web UI, Slack bot, vLLM pods], [Direct architecture reference],
  [openai/codex], [OpenAI's official terminal coding agent, written in Rust, Apache-2.0], [The competition],
  [OpenBMB/UltraRAG], [First RAG framework built on MCP! Visual IDE, YAML workflows, one-click to chat UI], [MCP + RAG = 🔥],
  [supermemoryai/supermemory], [Memory engine with MCP integration for Claude/Cursor. Chrome + Raycast extensions], [Could enhance our memory],
  [mcp/servers], [Official MCP servers — SDKs now in 10 languages including Rust, Go, Swift], [Canonical MCP reference],
)

#v(0.5em)

= 📰 Breaking News

#table(
  columns: (auto, 1fr, auto),
  stroke: 0.5pt + luma(200),
  inset: 6pt,
  [*Source*], [*Story*], [*Score*],
  [Reddit], [*Kimi K2* — Trillion-param open model matching Opus 4.5. First time OSS feels competitive with SOTA closed.], [1655↑],
  [HN], [*Karpathy on Claude* — Detailed coding notes, major endorsement from most influential AI voice], [455pts],
  [HN], [*One Human + One Agent = Browser* — Built complete browser from scratch in 20K LOC with AI], [190pts],
  [Reddit], [*Stanford CooperBench* — Parallel agents cause 30-50% lower success. Solo wins.], [82↑],
  [HN], [*OpenAI Prism* — Major new OpenAI product announcement], [549pts],
  [Reddit], [*Claude Interactive Tools* — Tools show up in conversation. Works with Slack, Figma, Asana, etc.], [134↑],
)

#v(0.5em)

= 🎯 Action Items

#box(stroke: 1pt + luma(200), inset: 12pt, radius: 4pt, width: 100%)[
  #set text(size: 9pt)
  
  *This Week:*
  + *Test Kimi K2.5* — Could replace Opus for some tasks at 10% cost
  + *Read Stanford CooperBench paper* — Affects swarm architecture decisions
  + *Review UltraRAG v3* — MCP-based RAG could upgrade our knowledge pipeline
  
  *When Time Permits:*
  + Read Dario's full essay (15K words, but important)
  + Compare LuxTTS speed vs Qwen3-TTS
  + Check OpenAI Codex CLI features
  
  *⚠️ Issue:* Twitter bookmarks scan only found 3 items — logged into \@ClawA94248, not Marb's account. Need to configure auth for personal account.
]

#v(1em)
#align(center)[
  #text(size: 8pt, fill: gray)[Generated by Claw • Research from 11pm-6am • Full source files in ~/clawd/research/]
]
