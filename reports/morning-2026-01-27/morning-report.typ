#set page(paper: "a4", margin: 1.5cm)
#set text(font: "Helvetica Neue", size: 10pt)
#set heading(numbering: none)

#align(center)[
  #text(size: 24pt, weight: "bold")[Morning Intel]
  #v(0.3em)
  #text(size: 12pt, fill: gray)[Tuesday, January 27, 2026 • 6:00 AM MST]
]

#line(length: 100%, stroke: 0.5pt + gray)
#v(0.5em)

= TL;DR

- *Kimi K2.5* dropped overnight — open-source visual agentic model, direct Claude competitor. Evaluate ASAP.
- *ChatGPT containers* now run bash/pip/npm — OpenAI matching Claude's code execution. Feature parity closing.
- *Claude Code port story* — 100k lines TS→Rust in a month. Validates your agent-heavy workflow approach.

#v(1em)
= Top 3 Highlights

#box(fill: luma(245), inset: 10pt, radius: 4pt, width: 100%)[
  == 1. Kimi K2.5: Open-Source Visual Agentic Model
  #text(fill: rgb("#e63946"))[*Importance: 5/5*]
  
  *What:* Moonshot AI released Kimi K2.5, an open-source multimodal model claiming SOTA on agentic benchmarks with vision capabilities.
  
  *Why it matters:* Free alternative to Claude/GPT-4V for agent pipelines. If benchmarks hold, this could slot into your lead gen pipeline for visual tasks (screenshot analysis, site QA).
  
  *Action:* Download weights, test on your use cases this week.
  
  #link("https://www.kimi.com/blog/kimi-k2-5.html")[Read announcement →]
]

#v(0.5em)

#box(fill: luma(245), inset: 10pt, radius: 4pt, width: 100%)[
  == 2. ChatGPT Containers Now Run Full Code
  #text(fill: rgb("#f77f00"))[*Importance: 4/5*]
  
  *What:* Simon Willison documents ChatGPT's new container capability — bash, pip install, npm, file downloads. Full development environment in the browser.
  
  *Why it matters:* OpenAI is catching up to Claude's artifacts/code execution. Feature parity means Claude's edge is narrowing. Your multi-model strategy becomes more important.
  
  *Action:* Monitor for API availability. Could be useful for certain tasks.
  
  #link("https://simonwillison.net/2026/Jan/26/chatgpt-containers/")[Read analysis →]
]

#v(0.5em)

#box(fill: luma(245), inset: 10pt, radius: 4pt, width: 100%)[
  == 3. 100k Lines TS→Rust via Claude Code
  #text(fill: rgb("#2a9d8f"))[*Importance: 4/5*]
  
  *What:* Vjeux (ex-Meta) ported 100,000 lines of TypeScript to Rust using Claude Code in one month. Documented the full process.
  
  *Why it matters:* Validates your agent-heavy development approach. Shows what's possible with dedicated AI-assisted workflows. Good reference for estimating large projects.
  
  *Action:* Read methodology, extract techniques for your own ports.
  
  #link("https://blog.vjeux.com/2026/analysis/porting-100k-lines-from-typescript-to-rust-using-claude-code-in-a-month.html")[Read case study →]
]

#v(1em)
= GitHub Trending (AI/Agents)

#table(
  columns: (1fr, 2fr, auto),
  align: (left, left, right),
  stroke: none,
  [*Repo*], [*Description*], [*Stars*],
  [#link("https://github.com/badlogic/pi-mono")[badlogic/pi-mono]], [AI agent toolkit: coding CLI, unified LLM API, TUI/web UI, Slack bot], [🔥 New],
  [#link("https://github.com/supermemoryai/supermemory")[supermemory/supermemory]], [Memory engine for AI — fast, scalable. "Memory API for AI era"], [Trending],
  [#link("https://github.com/Blaizzy/mlx-audio")[Blaizzy/mlx-audio]], [TTS/STT/STS on Apple MLX. Efficient speech on Apple Silicon], [Trending],
  [#link("https://github.com/Shubhamsaboo/awesome-llm-apps")[Shubhamsaboo/awesome-llm-apps]], [Collection of LLM apps with agents & RAG], [Trending],
  [#link("https://github.com/velox-apps/velox")[velox-apps/velox]], [Tauri port to Swift by Miguel de Icaza], [53 pts HN],
)

#v(1em)
= News & Industry

== 📰 News Highlights

- *Dario Amodei essay* — "The Adolescence of Technology" — Anthropic CEO on AI's current phase #link("https://www.darioamodei.com/essay/the-adolescence-of-technology")[(Read)]
- *AI Code Review Bubble* — Greptile argues the market is oversaturated (281 pts) #link("https://www.greptile.com/blog/ai-code-review-bubble")[(Read)]
- *RIP Low-Code 2014-2025* — AI coding killed the low-code dream (238 pts) #link("https://www.zackliscio.com/posts/rip-low-code-2014-2025/")[(Read)]
- *France replacing Zoom/Teams* — Government building sovereign alternatives (770 pts HN) 
- *Apple AirTag 2* — Longer range, improved findability announced (482 pts)
- *Windows 11 Patch Tuesday disaster* — Boot failures, Microsoft confirms (330 pts)

#v(1em)
= 🔧 Categories

#columns(2)[
  == 📦 IMPLEMENT
  - Test Kimi K2.5 for visual agent tasks
  - Explore pi-mono as alternative agent framework
  - Try supermemory for RAG pipeline

  == 📚 RESOURCE
  - Vjeux's Claude Code porting methodology
  - Dario's technology essay
  - AI code review market analysis
  
  #colbreak()
  
  == 🔥 TRENDING
  - Kimi K2.5 launch
  - ChatGPT containers
  - France's digital sovereignty push
  
  == 📰 NEWS
  - Apple AirTag 2 announcement
  - Windows 11 update issues
  - Low-code declared dead
]

#v(1em)
= Action Items

#box(fill: rgb("#fff3cd"), inset: 10pt, radius: 4pt, width: 100%)[
  + *Today:* Skim Kimi K2.5 benchmarks, decide if worth testing
  + *This week:* Read Vjeux porting article, extract techniques
  + *Watch:* ChatGPT container API availability
  + *Note:* Overnight research agents failed — check cron logs
]

#v(2em)
#align(center)[
  #text(size: 8pt, fill: gray)[Generated by Claw • Morning Intel Pipeline v1.0]
]
