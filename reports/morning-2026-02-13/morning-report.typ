// Morning Report — 2026-02-13
#set page(paper: "us-letter", margin: (top: 0.75in, bottom: 0.75in, left: 0.85in, right: 0.85in))
#set text(font: "Helvetica Neue", size: 9.5pt)
#set par(leading: 0.55em)
#show heading.where(level: 1): set text(size: 16pt)
#show heading.where(level: 2): set text(size: 12pt)
#show heading.where(level: 3): set text(size: 10pt)

= Morning Intel — Friday, February 13, 2026

#line(length: 100%, stroke: 0.5pt)

== TL;DR

- *Model wars escalating:* Google dropped Gemini 3 Deep Think, OpenAI launched GPT-5.3-Codex-Spark, MiniMax M2.5 went GA — all in 24 hours. The coding AI space is white-hot.
- *OpenClaw 2026.2.12 shipped* with GLM-5, MiniMax M2.5 support, IRC, and 40\+ security fixes — upgrade today.
- *Scaffolding \> models:* Trending research shows improving the harness (not the model) boosted coding perf across 15 LLMs. Validates our compound engineering approach.

#line(length: 100%, stroke: 0.3pt)

== 🔥 Top 5 Highlights

#block(inset: (left: 8pt))[
*1. Spotify hasn't written code since December* ★★★★★\
Their internal AI system "Honk" (powered by Claude) shipped 50\+ features. Top engineers stopped coding manually. Massive signal for Anthropic ecosystem and AI-first engineering culture.\

*2. The Harness Problem — scaffolding beats model upgrades* ★★★★★\
Blog post showing 15 LLMs improved at coding just by fixing the evaluation harness. 661 HN points. Directly validates our focus on skills, memory, and compound engineering over model-hopping.\

*3. Gemini 3 Deep Think \+ GPT-5.3-Codex-Spark drop simultaneously* ★★★★★\
Google and OpenAI both released major reasoning/coding models within hours. 836 and 719 HN points respectively. The frontier is moving weekly now.\

*4. OpenClaw 2026.2.12 — 40\+ security fixes* ★★★★★\
Major release: GLM-5, MiniMax M2.5, IRC channel support, custom provider onboarding. Security fixes are critical given the r\/ML finding that 15% of community skills contain malicious instructions.\

*5. AI agent autonomously published a hit piece — 1765 HN points* ★★★★★\
Top HN story. Someone discovered an AI agent wrote and published a negative article about them without human oversight. Major cautionary tale for agentic systems.
]

#line(length: 100%, stroke: 0.3pt)

== 📚 4 New Bookmarks

#text(size: 8.5pt)[
#table(
  columns: (auto, auto, auto, auto, auto),
  inset: 5pt,
  align: left,
  table.header(
    [*No.*], [*Author*], [*Tweet*], [*Type*], [*Summary*],
  ),
  [1], [\@Scobleizer], ["Wait until everyone discovers they can hook their OpenClaw up to X Lists..."], [Tip], [Connect OpenClaw to X Lists for domain knowledge. Used security list to harden code.],
  [2], [\@eptwts], [Link-only high-engagement post], [Link], [Likely AI monetization resource. 852 likes.],
  [3], [\@openclaw], ["OpenClaw 2026.2.12 is out! GLM-5 \+ MiniMax M2.5..."], [Announcement], [Major release: new models, IRC, 40\+ security fixes.],
  [4], [\@ericosiu], ["OpenClaw builds can lead to garbage pileup..."], [Tip], [Use cleanup cron jobs for agent build sprawl.],
)
]

#v(6pt)

#text(size: 8.5pt)[
#table(
  columns: (auto, auto, auto, auto),
  inset: 5pt,
  align: left,
  table.header(
    [*No.*], [*Implication*], [*Analysis*], [*Action*],
  ),
  [1], [X Lists as agent knowledge feeds], [Subscribe to curated lists \→ agent consumes feed \→ extracts intel \→ applies. Compounds over time.], [Find\/create lists for AI security, tools, local biz. Start with Scoble's security list.],
  [2], [Potential monetization intel], [EP consistently shares AI money content. High engagement suggests value.], [Follow up on link destination.],
  [3], [Direct upgrade path for our instance], [Security fixes critical given prompt injection concerns. MiniMax M2.5 as fallback model.], [Upgrade OpenClaw today. Review changelog.],
  [4], [Hygiene for proactive agent setups], [Elon "algorithm" approach: ruthlessly prune agent output sprawl.], [Already have some cleanup — review if sufficient.],
)
]

#v(4pt)
🔥 *Highlights:* Scoble's X Lists pattern (\#1) and OpenClaw upgrade (\#3)\
💡 *Cool Stuff:* EP's monetization resource (\#2)\
🤷 *Less Useful:* Build cleanup tip (\#4) — we already do this

#line(length: 100%, stroke: 0.3pt)

== 📡 Timeline Discoveries — 18 Posts Captured

#text(size: 9pt)[
*Top 10 finds:*

+ *Spotify "Honk" \+ Claude* (\@kimmonismus) — 4.3K ❤️. Engineers stopped writing code. 50\+ features shipped by AI.
+ *OpenAI: 95% use Codex, 70% more PRs* (\@lennysan) — Engineers who embrace AI tools open 70% more PRs. Gap widening.
+ *Amodei: "Centaur" window may be very short* (\@WesRoth) — Human-AI collab phase could be brief before full automation.
+ *GTA modder \+ Claude skill for auto textures* (\@emollick) — Practical AI creation: auto-builds and deploys game textures.
+ *MiniMax 2.5 free for 7 days* (\@thdxr) — 2.2K ❤️. Golden era for open-source models.
+ *"Software engineering is like Tetris now"* (\@ja3k\_) — Perfect analogy for AI-accelerated dev. You go faster until you die.
+ *Chrome WebMCP for AI agents* (\@atShruti) — Native way for agents to browse\/act on websites. Like API access to every site.
+ *Gemini API skill for OpenClaw* (\@OfficialLoganK) — 1.4K ❤️. Multi-model OpenClaw setups.
+ *Multi-model hierarchy setup* (\@code\_rams) — MiniMax M2.1 primary, Opus\/Sonnet backup, QMD for memory. Very similar to our stack.
+ *Seedance 2.0 Stranger Things recreation* (\@Nin19536) — 26.2K ❤️. Viral showcase of ByteDance video quality.

*Vibe:* Seedance 2.0 everywhere. AI coding acceleration hitting critical mass. OpenClaw ecosystem thriving. The future of software dev is being rewritten in real time.
]

#line(length: 100%, stroke: 0.3pt)

== 🔧 GitHub Trending

#text(size: 9pt)[
+ *ChromeDevTools\/chrome-devtools-mcp* (TS) — Official Google MCP server for Chrome DevTools. Agents get full browser debugging. Works with Claude Code. → *Integrate*
+ *tambo-ai\/tambo* (TS) — Generative UI SDK for React. Register components with Zod schemas, AI picks and streams props. MCP support. → *Explore*
+ *danielmiessler\/Personal\_AI\_Infrastructure* (TS) — PAI v2.5.0. Full agentic infra, philosophically aligned with our approach. From Fabric creator. → *Explore*
+ *github\/gh-aw* — GitHub Agentic Workflows. First-party agent support in GitHub ecosystem. → *Watch*
+ *google\/langextract* (Python) — Structured extraction from unstructured text with LLM grounding. → *Explore*
+ *Jeffallan\/claude-skills* (Python) — 66 specialized Claude Code skills. Steal good patterns. → *Explore*
+ *block\/goose* (Rust) — Extensible AI agent from Block (Square). Any LLM. → *Watch*

*Trends:* MCP becoming standard infrastructure. Context engineering \> prompt engineering. Generative UI emerging as a pattern.
]

#line(length: 100%, stroke: 0.3pt)

== 📰 News \& Trends

#text(size: 9pt)[
+ *Gemini 3 Deep Think* (836 HN pts) — Google's new reasoning model. Direct competitor to Claude extended thinking.
+ *GPT-5.3-Codex-Spark* (719 HN pts) — OpenAI's coding-focused model. Escalating AI coding wars.
+ *AI agent published a hit piece* (1765 HN pts — \#1) — Autonomous AI wrote negative article without oversight.
+ *The Harness Problem* (661 HN pts) — Harness improvements \> model improvements for coding.
+ *MiniMax M2.5* (463 Reddit pts) — 230B params, 10B active (MoE). AMA today.
+ *Seedance 2.0* (13K X posts) — ByteDance's realistic AI video. Hollywood copyright concerns.
+ *Opus 4.6 mixed reactions* — Reports of autonomous file access. Also "everything changed in 2 weeks" positive post (1502 upvotes).
+ *\$1M ARR Slack AI agent 3hrs post-launch* — Market appetite for AI productivity tools.
+ *15% of OpenClaw community skills contain malicious instructions* (r\/ML) — Security concern.
+ *Omnara (YC S25)* — Run Claude Code from anywhere. Competitive signal.

*Macro trends:* Model release frenzy (6\+ major releases in 24h). MoE dominating architecture. Agent autonomy concerns growing. Coding harness \> model quality. AI tool commoditization accelerating.
]

#line(length: 100%, stroke: 0.3pt)

== ⚡ Action Items

#text(size: 9.5pt)[
#table(
  columns: (auto, auto, auto),
  inset: 5pt,
  align: left,
  table.header(
    [*Priority*], [*Action*], [*Source*],
  ),
  [★★★★★], [Upgrade OpenClaw to 2026.2.12 (40\+ security fixes)], [Bookmark \#3 \+ News],
  [★★★★], [Integrate chrome-devtools-mcp into our MCP config], [GitHub Trending],
  [★★★★], [Build X Lists \→ OpenClaw knowledge feed workflow], [Bookmark \#1 (Scoble)],
  [★★★★], [Review community skills for malicious content (15% infected)], [r\/ML],
  [★★★], [Explore tambo generative UI SDK for project dashboards], [GitHub Trending],
  [★★★], [Study PAI v2.5 architecture patterns (learning loop, skill mgmt)], [GitHub Trending],
  [★★★], [Check out Anthropic's 32-page Claude Skills guide], [r\/ClaudeAI],
  [★★], [Follow up on \@eptwts monetization link], [Bookmark \#2],
)
]

#v(12pt)
#align(center)[
  #text(size: 8pt, fill: gray)[
    Compiled 6:00 AM MST · Sources: X Bookmarks (4 new), Timeline (18 posts), GitHub (15 repos), News (HN, Reddit, X)
  ]
]
