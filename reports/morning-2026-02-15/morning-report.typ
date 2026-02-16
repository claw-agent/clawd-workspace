// Morning Report — 2026-02-15
#set page(paper: "us-letter", margin: 1in)
#set text(font: "Helvetica Neue", size: 10pt)
#set heading(numbering: none)
#show link: underline

= Morning Intel — Sunday, February 15, 2026

== TL;DR

- *WebMCP spec* from Google + Microsoft turns every website into a structured API for AI agents — biggest agent infrastructure shift this year
- *OpenClaw 2026.2.14* dropped with 50+ security fixes — we should update
- AI video arms race accelerating: Veo 4 responding to Seedance 2.0, Seedance 3.0 specs leaked

== 🔥 Top 5 Highlights

#table(
  columns: (auto, 1fr, auto),
  stroke: 0.5pt,
  inset: 6pt,
  [No.], [Highlight], [Rating],
  [1], [*WebMCP Spec* — Google + MSFT co-authored spec that adds `navigator.modelContext` to browsers. Replaces fragile DOM scraping with structured tool registration. Every website becomes an agent-native API. \@aakashgupta thread.], [★★★★★],
  [2], [*OpenClaw 2026.2.14* — 50+ security hardening fixes, faster tests, file boundary parity. We're running OpenClaw — should update.], [★★★★],
  [3], [*Veo 4 drops as Seedance 2.0 response* — Google fires back. AI video arms race is real. Seedance 3.0 specs also leaked with "structural shift" claims.], [★★★★],
  [4], [*Agent Lightning (Microsoft)* — RL-train ANY agent framework with near-zero code changes. Works with LangChain, OpenAI SDK, CrewAI, etc.], [★★★★],
  [5], [*"Breaking the Spell of Vibe Coding"* — Jeremy Howard's fast.ai critiques over-reliance on AI-generated code. Important counterpoint as we build AI-first.], [★★★★★],
)

== 📚 New Bookmarks

No new bookmarks found tonight. All 241 fetched bookmarks already cataloged.

== 📡 Timeline Discoveries — 18 Posts Captured

#table(
  columns: (auto, auto, 1fr, auto),
  stroke: 0.5pt,
  inset: 5pt,
  [No.], [Author], [What], [★],
  [1], [\@aakashgupta], [WebMCP spec — Google+MSFT turn websites into agent APIs via `navigator.modelContext`], [5],
  [2], [\@openclaw], [OpenClaw 2026.2.14 — 50+ security fixes], [4],
  [3], [\@chatcutapp], [Seedance 2.0 + OpenClaw agent-driven VFX compositing demo], [4],
  [4], [\@tom\_doerr], [SEO analysis skill for Claude Code — useful for XPERIENCE], [4],
  [5], [\@markgadala], [Veo 4 announced as Google's response to Seedance 2.0], [4],
  [6], [\@RayDalio], [Munich Security Conference: "The World Order Has Broken Down"], [3],
  [7], [\@mark\_k], [Seedance 3.0 specs leaked — "mind-blowing"], [3],
  [8], [\@VraserX], [More Seedance 3.0 detail — "structural shift, not incremental"], [3],
  [9], [\@DaveShapi], [Big studios losing control — indie AI content wave thesis], [3],
  [10], [\@Scobleizer], [50 real-world OpenClaw use cases compiled], [3],
  [11], [\@elbeyoglu], [r.jina.ai — prepend to any URL for clean Markdown], [3],
  [12], [\@bloggersarvesh], [Claude SEO prompts — "like a \$10K/mo agency"], [3],
  [13], [\@cstanley], [Grok integration for OpenClaw — real-time X search], [3],
  [14], [\@ihtesham2005], [Rowboat — AI coworker with persistent memory], [2],
  [15], [\@farzyness], ["Biggest job in 1-5 years: AI Agent Architect"], [2],
  [16], [\@om\_patel5], [App Store approval in 7 minutes — guide], [2],
  [17], [\@thdxr], [dax philosophical take on tech culture], [2],
  [18], [\@charliebcurran], [Seedance 2.0 viral meme — 62K likes], [1],
)

*Themes:* AI video dominated (Seedance aftermath + Veo 4), OpenClaw buzz from Valentine's release, WebMCP as sleeper hit.

*Threads worth reading:*
- \@aakashgupta's WebMCP breakdown
- \@DaveShapi on studios losing control

== 🔧 GitHub Trending

#table(
  columns: (auto, 1fr, auto),
  stroke: 0.5pt,
  inset: 5pt,
  [No.], [Repo], [Action],
  [1], [*karpathy/nanochat* — Simplest LLM training harness. GPT-2 for ~\$72 on 8xH100. Single "depth" dial.], [⭐ Explore],
  [2], [*microsoft/agent-lightning* — RL-train any agent framework with near-zero code changes. Framework-agnostic.], [⭐ Explore],
  [3], [*modelcontextprotocol/rust-sdk* — Official MCP Rust SDK (RMCP). v0.8.0, OAuth support, 3K stars.], [Watch],
  [4], [*Jeffallan/claude-skills* — 66 specialized skills for Claude Code full-stack dev.], [Explore],
  [5], [*HKUDS/RAG-Anything* — All-in-one multimodal RAG framework.], [Watch],
  [6], [*ruvnet/wifi-densepose* — WiFi-based human pose estimation through walls. 6.3K stars. Wild.], [Watch],
  [7], [*alibaba/zvec* — Lightweight in-process vector database. No external deps.], [Watch],
  [8], [*facebook/pyrefly* — Fast Python type checker in Rust from Facebook.], [Watch],
)

*Top Pick:* karpathy/nanochat — Karpathy democratizing LLM training to hobby scale.

== 📰 News & Trends

#table(
  columns: (auto, 1fr, auto),
  stroke: 0.5pt,
  inset: 5pt,
  [No.], [Story], [★],
  [1], [*Breaking the Spell of Vibe Coding* (fast.ai) — Jeremy Howard critiques AI-generated code over-reliance. 221 HN points.], [5],
  [2], [*News Publishers Limit Internet Archive* — Fearing AI scraping. Threatens open web. 482 HN points.], [5],
  [3], [*"OpenAI Should Build Slack"* (Latent Space) — Swyx argues AI-native workplace comms is OpenAI's next move. 159 HN points.], [5],
  [4], [*AI K-Shaped Economy Divide* — X trending discussion on AI widening economic inequality.], [4],
  [5], [*MiniMax AMA on r/LocalLLaMA* — Chinese AI lab engaging Western dev community. 237 upvotes.], [4],
  [6], [*Smart Sleep Mask Leaks Brainwaves* — Sends data to open MQTT broker. IoT privacy nightmare. 435 HN points.], [4],
  [7], [*MDST Engine: GGUF in Browser* — Run LLMs in-browser via WebGPU/WASM. Local inference frontier.], [4],
  [8], [*Martin Fowler on Supervisory Programming* — Cognitive costs of task-switching when reviewing AI code output.], [4],
  [9], [*uBlock filter to hide YouTube Shorts* — 840 HN points. Anti-shorts sentiment.], [3],
  [10], [*Zvec: In-Process Vector DB* (Alibaba) — Lightweight embedding store. 141 HN points.], [4],
)

*Trends:*
- AI backlash maturing — from hype to nuanced criticism
- Data access wars escalating — publishers vs AI scrapers
- Browser-based AI advancing — GGUF via WebGPU
- Industry reflecting on HOW we use AI, not just what it can do

== ⚡ Action Items

+ *Update OpenClaw* to 2026.2.14 — 50+ security fixes (Priority: High)
+ *Read WebMCP spec thread* — \@aakashgupta breakdown. Could change our agent-web interaction approach (Priority: High)
+ *Explore agent-lightning* — RL-optimize our agent workflows with near-zero code changes (Priority: Medium)
+ *Check Claude Code SEO skill* (\@tom\_doerr) — directly useful for XPERIENCE (Priority: Medium)
+ *Evaluate Grok+OpenClaw integration* (\@cstanley) — could complement bird for real-time X search (Priority: Medium)
+ *Read fast.ai vibe coding critique* — important perspective for our AI-first approach (Priority: Low)
+ *Watch Seedance 3.0 leaks* — we're active Seedance users, stay ahead of the curve (Priority: Low)
