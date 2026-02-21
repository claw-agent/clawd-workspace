// Morning Report — 2026-02-20
#set page(paper: "us-letter", margin: 1in)
#set text(font: "Helvetica Neue", size: 10pt)
#set heading(numbering: none)

= Morning Intel — Friday, February 20, 2026

== TL;DR

- *Anthropic reportedly sent OpenClaw a cease \& desist* — directly affects our infrastructure. Need contingency plan.
- *Claude leaked another user's legal documents* — serious data isolation failure at Anthropic. Watch for service changes.
- *Gemini 3.1 Pro launched* — Google's new flagship. Evaluate vs Claude for workflow tasks.

== 🔥 Top 3 Highlights

=== 1. Anthropic C\&D to OpenClaw \@ ⭐⭐⭐⭐⭐
Reddit (665 upvotes): Anthropic sent OpenClaw a cease \& desist. Sam Altman allegedly hired the developer. Community divided.

*Why this matters to us:* We run on OpenClaw. This is existential-tier for our stack. Need to monitor OpenClaw's response, check for service disruptions, and have a migration plan ready.

*Action:* Monitor OpenClaw Discord/GitHub. Prepare contingency notes.

=== 2. Claude Leaked User's Legal Documents \@ ⭐⭐⭐⭐⭐
Reddit (2,430 upvotes): A user reports Claude exposed another user's legal documents. Likely a caching/session isolation bug. Anthropic's internal system prompt also leaked in a separate thread.

*Why this matters to us:* We pipe sensitive business data through Claude daily. If there's a data isolation failure, our information could be exposed too. Also, the system prompt leak reveals Anthropic's internal prompting patterns.

*Action:* Watch for Anthropic's official response. Consider what sensitive data we're sending.

=== 3. Gemini 3.1 Pro Launched \@ ⭐⭐⭐⭐⭐
Google DeepMind (5.5K likes): Major flagship model release. HN thread has 796 comments. r/LocalLLaMA frustrated that Gemma 4 (open-weight) hasn't shipped yet.

*Why this matters to us:* Direct competitor to Claude Opus 4. Pricing and benchmark comparisons will determine if we should use it for specific workflow tasks.

*Action:* Evaluate benchmarks when available. Consider as fallback model.

== 📚 5 New Bookmarks

#table(
  columns: (auto, auto, auto, auto, auto),
  inset: 6pt,
  [No.], [Author], [Tweet], [Type], [Summary],
  [1], [\@GoogleLabs], ["Introducing Pomelli's Photoshoot..."], [Video], [AI product photography from single image, free in US/CA/AU/NZ. 26K likes.],
  [2], [\@DataChaz], ["ElevenLabs just lost its moat..."], [Video], [Voicebox: open-source local TTS with Qwen3-TTS, DAW editor, voice cloning.],
  [3], [\@thejayden], ["OpenClaw memory protocol..."], [Image], [Memory protocol for agents — daily logs, structured long-term memory.],
  [4], [\@thejayden], ["ZERO\_ERROR\_PROTOCOL.md..."], [Image], [Anti-hallucination verification protocol for OpenClaw agents.],
  [5], [\@dr\_cintas], ["AI agents can teach themselves..."], [Video], [8 parallel web agents auto-generate skill guides from docs/GitHub/SO.],
)

*One-line takes:*
- *Pomelli Photoshoot* — Huge for XPERIENCE client marketing. Free AI product photos eliminates a cost barrier. ⭐⭐⭐⭐
- *Voicebox/Qwen3-TTS* — Already flagged on 2/17. Our claw-speak works fine; revisit if we need voice cloning. ⭐⭐⭐
- *OpenClaw memory protocol* — We already have this (AGENTS.md, WAL protocol, tiered memory). Validates our approach. ⭐⭐
- *ZERO\_ERROR\_PROTOCOL* — Interesting concept for reducing hallucinations. Worth a quick read. ⭐⭐⭐
- *Parallel skill-gen agents* — Could auto-generate skill files for new tools. Neat but not urgent. ⭐⭐⭐

== 📡 From The Timeline — 18 Posts Captured

Top discoveries from the For You feed:

+ *\@jpschroeder — "We're open sourcing dmux"* (2.4K likes) — Multi-agent orchestration with tmux \+ worktrees. Competitor to Claude Squad. Worth comparing.
+ *\@WorkflowWhisper — "Sonnet 4.5 produced \$23,400 in local business contracts"* (534 likes) — Detailed playbook for selling AI automation to local businesses. Very relevant to XPERIENCE.
+ *\@openclaw — "OpenClaw 2026.2.19 release"* (4.5K likes) — Apple Watch MVP, 40\+ security fixes, gateway auth. Biggest hardening drop yet.
+ *\@istdrc — "Every API key you paste into an AI agent's input box hits servers in plaintext"* (674 likes) — Security warning for agent workflows.
+ *\@KSimback — "OpenClaw memory fix guide"* (764 likes) — Community memory guide.
+ *\@johann\_sath — "Add this to your AGENTS.md"* (704 likes) — Practical tips: fix errors immediately, spawn subagents for execution.
+ *\@KingBootoshi — "Custom ESLint rules for agentic coding"* (208 likes) — Clever guardrails for AI code gen.
+ *\@JoshKale — "Google's Pomelli is awesome"* (1.7K likes) — Additional takes on Pomelli including brand DNA generation.
+ *\@nicopreme — "Visual Explainer skill for planning"* (1.3K likes) — Visual plans instead of markdown.
+ *\@TheMattBerman — "Replaced a \$200K GTM hire with OpenClaw"* — Full outbound sales system for \$130/mo.

== 🔧 GitHub Trending

=== 1. microsoft/agent-lightning (Python)
Train ANY AI agent with RL, zero code changes. Works with LangChain, OpenAI Agent SDK, AutoGen, CrewAI. Microsoft Research backed.

*For us:* Could optimize our OpenClaw agent skills with RL feedback loops without rewriting them.

=== 2. getzep/graphiti (Python)
Real-time knowledge graphs for AI agents. Temporally-aware, hybrid retrieval (semantic \+ BM25 \+ graph), has MCP server.

*For us:* Could augment our QMD memory system with graph-based context. Sub-second queries, bi-temporal tracking.

=== 3. katanemo/plano (Rust)
AI-native proxy and data plane for agentic apps. Handles tool routing, auth, infrastructure plumbing.

*For us:* Could simplify agent deployment. Watch for now.

_Note: heretic (model uncensoring) and obra/superpowers were featured in yesterday's report — skipping._

== 📰 News \& Trends

=== Critical

+ *Anthropic C\&D to OpenClaw* (Reddit 665pts) — See Top 3. Directly affects us.
+ *Claude leaked legal documents* (Reddit 2,430pts) — See Top 3. Privacy incident.
+ *Anthropic auto prompt caching* (X trending, 1,100 posts) — No code changes needed. Reduces costs and latency automatically. Should verify it's active on our account. ⭐⭐⭐⭐⭐

=== Notable

+ *Gemini 3.1 Pro* (HN 733pts) — Google's new flagship. Evaluate vs Claude.
+ *AI agent published a hit piece — operator came forward* (HN 346pts) — Accountability for autonomous agents. Cautionary tale.
+ *Rork: AI tool for native Swift apps* (X 1,600 posts) — Generates native Swift for all Apple devices. Rapid prototyping potential.
+ *Diffusion language models: 14x faster* (HN 84pts) — Together AI's alternative to autoregressive generation. Could reshape inference economics.
+ *Free ASIC Llama 3.1 8B at 16K tok/s* (Reddit 241pts) — Hardware-accelerated small model inference. Commoditization signal.
+ *MuMu Player runs 17 recon commands every 30 min* (HN 263pts) — Android emulator spyware. Security concern.
+ *Claude in PowerPoint on Pro plan* (Reddit 326pts) — New integration.
+ *Claude Code 2.1.49 with 27 CLI changes* (Reddit 33pts) — Update available.

=== Trends

- Agent infrastructure maturing rapidly (dmux, plano, agent-lightning)
- Anthropic facing multiple trust/legal issues simultaneously
- Google shipping aggressively (Gemini 3.1, Pomelli)
- Local AI tools getting polished GUIs (Voicebox, Qwen Code)

== ⚡ Action Items

=== 🔴 Need your call
+ *OpenClaw C\&D situation* — Do we need a contingency plan? Should we evaluate alternatives or wait for OpenClaw's response?
+ *Anthropic prompt caching* — Verify it's active. Could meaningfully reduce our API costs.

=== 🟢 I'll handle it
+ Monitor OpenClaw Discord/GitHub for C\&D response and any service disruptions
+ Check if automatic prompt caching is active on our API usage
+ Evaluate Gemini 3.1 Pro benchmarks when published — compare to Opus for our workflows
