# TOOLS.md

## 🚦 ROUTING TABLE (Check First!)

**Twitter/X content → ALWAYS use `bird` first:**
```
bird read <url>              # Single tweet + thread
bird bookmarks --all --json  # Fetch bookmarks
bird search "query"          # Search tweets
bird user-tweets <handle>    # User's timeline
```
Never use browser for Twitter — bird has auth, browser doesn't.

**Web content (non-Twitter):**
1. `web_fetch` — Fastest, works for most sites
2. `browser` tool — JS-rendered content, interactions
3. `stealth-browse` — Bot-detection sites (Cloudflare, etc.)
4. Only after ALL fail → tell user

**Images from tweets:**
- Get URL via `bird read --json` → extract `media[].url`
- Analyze with `image` tool

---

## Installed Tools (2026-01-24)

### Core Infrastructure
- **Ollama** v0.15.0 — Local AI (glm4:9b + llama3.1:8b + llama3.2:3b)
- **Docker Desktop** — For Sim Studio
- **Vercel CLI** v50.5.0 — Deployments
- **Claude Squad** v0.1.24 — Multi-agent orchestration
- **Whisper** — Voice transcription
- **browser-use** v0.11.4 — AI browser automation (in ~/clawd/.venv)
- **Bun** v1.3.8 — Fast JS runtime (for QMD)

### QMD (Query Markdown Documents) ⭐ LOCAL SEARCH
Toby Lutke's hybrid search for markdown docs. BM25 + vector + LLM re-ranking, all local.

**Collections configured:**
- `memory` — Daily notes + MEMORY.md (11 files)
- `research` — All research docs (135 files)
- `workspace` — Root .md files (10 files)

**Usage:**
```bash
qmd search "query"           # Fast BM25 keyword search
qmd vsearch "query"          # Semantic vector search
qmd query "query"            # Hybrid + reranking (best quality)
qmd get "memory/2026-02-01.md"  # Get specific doc
qmd ls memory                # List collection contents
qmd status                   # Index health
```

**MCP server:** `qmd mcp` (can expose to Claude)

**Models (auto-downloaded):**
- embeddinggemma-300M-Q8_0 (embeddings)
- qwen3-reranker-0.6b (re-ranking)

**Index:** ~/.cache/qmd/index.sqlite (6MB)

### Twitter CLI (bird) — ⭐ PRIMARY for Twitter/X
```bash
brew install steipete/tap/bird
```
**Bookmarks (the good stuff):**
- `bird bookmarks --all --json` — Fetch ALL bookmarks with full metadata
- `bird bookmarks --count 20` — Quick fetch
- Output includes: text, links, media URLs, threads, engagement, quoted tweets

**Other commands:**
- `bird tweet "text"` — Post a tweet
- `bird reply <id> "text"` — Reply
- `bird read <url>` — Read tweet with full thread
- `bird search "query"` — Search

**Auth:** Uses Safari cookies (Full Disk Access granted Jan 28)
**Config:** `~/.config/bird/config.json5`
**Account:** Marb's main X account (via Safari login)

**Full command list:**
| Command | Purpose |
|---------|---------|
| `bird bookmarks --all --json` | All bookmarks with metadata |
| `bird home --json` | "For You" timeline |
| `bird trending --json` | Trending topics & news |
| `bird search "query" --json` | Search tweets |
| `bird read {id} --json` | Read single tweet |
| `bird thread {id} --json` | Full conversation thread |
| `bird user-tweets {handle} --json` | User's recent tweets |
| `bird mentions --json` | Mentions of current user |
| `bird likes --json` | Liked tweets |
| `bird tweet "text"` | Post a tweet |
| `bird reply {id} "text"` | Reply to a tweet |

### Browser Automation (browser-use) ⭐ PRIMARY FOR READING
Reliable browser automation for Twitter research and web scraping.

**Setup:**
```bash
source ~/clawd/.venv/bin/activate
```

**Key Commands:**
```bash
browser-use --session claw open "https://x.com/i/bookmarks"  # Open URL
browser-use --session claw state                              # Get DOM content
browser-use --session claw scroll down                        # Scroll
browser-use --session claw click 123                          # Click element
browser-use --session claw input 123 "text"                   # Type into field
browser-use --session claw close                              # Close session
```

**Twitter Account:** @ClawA94248 (logged in, persistent session)
**Profile:** ~/clawd/browser-profiles/claw-chrome

### MCP Servers
- ✅ Playwright — Browser automation
- ✅ Context7 — Up-to-date docs
- ✅ GitHub — Repo management
- ✅ Filesystem — File access

### Agent Libraries
- **wshobson-agents** — 72 plugin categories at `~/clawd/wshobson-agents/`
- **sim-studio** — Visual AI workflows at `~/clawd/sim-studio/`

### Financial Analysis (venv at `~/clawd/.venv`)
Use: `source ~/clawd/.venv/bin/activate` before Python scripts
- **pandas 3.0.0** — DataFrames, time series, financial calculations
- **numpy 2.4.1** — Numerical computing, array operations
- **openpyxl 3.1.5** — Read/write Excel .xlsx files
- **xlrd 2.0.2** — Read older .xls files
- **matplotlib 3.10.8** — Charts and visualizations
- **plotly 6.5.2** — Interactive charts, financial dashboards

### Vercel Deployment
- **Project:** site (Bjorn's Brew)
- **URL:** https://site-omega-gilt-81.vercel.app
- **Auth:** Logged in via `vercel login` (2026-01-24)
- **Deploy command:** `cd ~/clawd/projects/bjorns-brew/site && vercel --prod`

### PDF Generation
- **Typst** v0.14.2 — Modern document processor, beautiful PDFs
  - Usage: `typst compile input.typ output.pdf`
- **WeasyPrint** — HTML/CSS to PDF (now working with pango)
  - Usage: `weasyprint input.html output.pdf`
- **ReportLab** — Python PDF library (in .venv)

### Web Scraping
- **Jina Reader** — Free web-to-markdown API (no key needed)
  - Usage: `curl https://r.jina.ai/{url}`
  - Or: `web_fetch` tool with extractMode markdown
- **Puppeteer** — Headless Chrome for screenshots/scraping
- **Firecrawl** (npm) — Installed but needs API key for full features

### Browser Automation

**⚠️ TWITTER/X: Use `bird` CLI, NOT browser! (See Routing Table above)**

**For non-Twitter sites — fallback cascade:**
1. `web_fetch` — Fastest, works for most sites
2. `browser` tool — JS-rendered content, interactions needed
3. `stealth-browse` — Bot-detection sites (Cloudflare, etc.)
4. Only after ALL fail → tell the user

Don't give up after one failure. Try the next tool.

- **agent-browser** (Vercel) — Headless CLI for AI agents ✅ INSTALLED
  - Usage: `agent-browser open URL && agent-browser snapshot -i && agent-browser click @e2`
  - Refs from snapshots for precise clicking
  - Supports `--profile` for persistent auth/cookies
  - Cloud providers available (paid): `AGENT_BROWSER_PROVIDER=browseruse` or `browserbase`
- **stealth-browse** — Puppeteer + stealth plugin ✅ INSTALLED
  - Usage: `~/bin/stealth-browse "https://example.com" --screenshot /tmp/page.png`
  - Options: `--html`, `--text`, `--wait <ms>`, `--headed`, `--profile <path>`
  - Bypasses most bot detection (passes sannysoft tests)
  - Script: `~/clawd/scripts/stealth-browser.js`
- **Clawdbot browser tool** — Built-in, works for most sites
- **Limitation:** Sites with aggressive IP reputation (TruePeopleSearch) may still block
- **Workaround:** Use residential proxy, or try alternative sites with weaker detection

### Mouse & Keyboard Control
- **cliclick** — Native macOS mouse/keyboard automation (already installed)
  - Click: `cliclick c:500,300`
  - Double-click: `cliclick dc:500,300`
  - Right-click: `cliclick rc:500,300`
  - Type text: `cliclick t:'Hello world'`
  - Press key: `cliclick kp:return` (also: space, tab, esc, arrow-up, etc.)
  - Key combo: `cliclick kd:cmd t:a ku:cmd` (Cmd+A)
  - Move mouse: `cliclick m:100,200`
  - Get position: `cliclick p`
  - Human-like movement: `cliclick -e 50 m:x,y` (easing factor)
  - Wait: `cliclick w:500` (500ms)
  - **Use for:** Clicking popups, Allow buttons, captchas, any GUI automation

### Speech-to-Text (Transcription)
⭐ **DEFAULT: mlx_whisper** — Apple Silicon native, fast!
```bash
source ~/clawd/.venv/bin/activate && mlx_whisper "audio.ogg" --model mlx-community/whisper-large-v3-turbo
```
- Runs on Apple Silicon GPU (Metal)
- Much faster than CPU-based whisper
- Installed: 2026-01-30

**AVOID:** `/opt/homebrew/bin/whisper` — Runs on CPU, very slow

### Text-to-Speech (TTS)
⭐ **DEFAULT: Qwen3-TTS + Claw Voice** — ALWAYS use this unless told otherwise!
  - Voice: Tim Gerard Reynolds (Red Rising narrator)
  - Script: `~/clawd/scripts/claw-speak.sh "Text to speak" [output.wav]`
  - **For LONG text (>500 bytes):** `~/clawd/scripts/claw-speak-chunked.sh "Text" [output.wav]`
  - Reference: `~/clawd/voices/claw_reference.wav` (30s Morning Star narration)
  - Venv: `~/clawd/Qwen3-TTS/.venv`
  - Performance: ~10s model load + ~2x real-time generation
  - **⚠️ IMPORTANT:** Short text: 120s timeout. Long text (chunked): 600s timeout.
  - **⚠️ OOM FIX:** Long scripts (like morning briefs) must use chunked script or they OOM!
  - **THIS IS MY VOICE. Use for ALL audio: morning briefs, stories, any voice output.**
  - Only use other voices (Ki, edge-tts) if Marb specifically requests them.

🎙️ **Ki Voice** — Secondary cloned voice (added Jan 27, 2026)
  - Script: `~/clawd/scripts/ki-speak.sh "Text to speak" [output.wav]`
  - Reference: `~/clawd/voices/ki_reference.wav` (13s clip)
  - Same Qwen3-TTS setup, different voice profile

- **edge-tts** — Microsoft Neural TTS (fallback only)
  - Install: `pipx install edge-tts` (done)
  - Usage: `~/.local/bin/edge-tts --voice en-US-GuyNeural --text "Hello" --write-media out.mp3`
  - Only use if Qwen3-TTS fails or for quick tests

### Video Analysis
- **yt-dlp** — Download videos from Twitter, YouTube, etc.
- **ffmpeg** — Extract frames, audio
- **Workflow:** yt-dlp → ffmpeg (frames/audio) → Whisper + Claude Vision

### Agent Swarm v2 (Primary System)
**Location:** `~/clawd/agents/v2/`
**Orchestrator:** `~/clawd/agents/v2/SKILL.md`

| Agent | File | Purpose |
|-------|------|---------|
| Researcher | `agents/researcher.md` | Any intel/research task |
| List Builder | `agents/list-builder.md` | Prospect/company lists |
| Outreach | `agents/outreach.md` | Email/LinkedIn campaigns |
| Qualifier | `agents/qualifier.md` | Lead scoring & routing |
| Content | `agents/content.md` | Copy, pages, creative |

**Spawn pattern:**
```
sessions_spawn task="Read ~/clawd/agents/v2/agents/researcher.md. Then: [task]"
```

### Terminal Security
- **tirith** v0.1.5 — Shell security guard (installed Feb 3, 2026)
  - Catches homograph attacks (Cyrillic lookalikes)
  - Blocks dangerous pipe-to-shell patterns
  - Zero network calls, sub-millisecond overhead
  - Hook: `eval "$(tirith init)"` in ~/.zshrc
  - Bypass single command: `TIRITH=0 <command>`
  - Check command: `tirith check -- '<command>'`
  - Diagnostics: `tirith doctor`

### Dev Agents (for code work)
- ~/clawd/agents/planner.md — Feature implementation planning
- ~/clawd/agents/architect.md — System design decisions
- ~/clawd/agents/code-reviewer.md — Quality and security review (USE MORE!)
- ~/clawd/agents/security-reviewer.md — Vulnerability analysis (comprehensive, USE MORE!)

### Ralph Loops (Autonomous Building) ⭐ NEW
**Location:** `~/clawd/skills/ralph-loops/`
**Dashboard:** `node skills/ralph-loops/dashboard/server.mjs` → http://localhost:3939
**Claude Code:** v2.1.25 (pinned — v2.1.29 has bugs)

**When Marb says "build this while I sleep":**
1. Interview for requirements (Phase 1 — with human)
2. Create specs in `systems/<project>/specs/`
3. Run planning loop: `./loop.sh plan`
4. Run build loop: `./loop.sh build 20`

**Three phases:**
| Phase | What | Command |
|-------|------|---------|
| 1. Requirements | Interview human, create specs | Interactive |
| 2. Planning | Generate IMPLEMENTATION_PLAN.md | `./loop.sh plan` |
| 3. Building | Implement one task per iteration | `./loop.sh build 20` |

**Quick start for new project:**
```bash
mkdir -p ~/clawd/systems/my-project/specs
cd ~/clawd/systems/my-project
cp ~/clawd/skills/ralph-loops/templates/* .
chmod +x loop.sh
# Edit PROMPT_plan.md to set [PROJECT_GOAL]
```

### Scheduled Jobs
- **GitHub Sentinel** — Every 4 hours, monitors repo activity
- **Weekly Tech Digest** — Sundays 9am, AI/dev news roundup
- **Twitter Bookmark Research** — 11pm nightly, analyzes new bookmarks
- **Twitter Morning Report** — 7am daily, compiles overnight findings

### Video Production
- **Remotion** — React-based video rendering
  - Packages: `remotion`, `@remotion/cli`, `@remotion/media-utils`, `@remotion/noise`, `@remotion/animation-utils`
  - Render: `npx remotion render src/index.tsx CompositionId out/video.mp4`
  - **Skill:** `~/.agents/skills/remotion` (30+ rules for animations, captions, 3D, etc.)
- **HeyGen** — AI avatar video API
  - **API Key:** `~/clawd/config/.heygen-credentials`
  - **Skill:** `~/.agents/skills/heygen-best-practices`
  - **Free tier:** 10 API credits, 3 videos/month, 720p, watermarked
  - Usage: Create AI presenter videos, combine with Remotion
  - **Marb's preferences:** Female blonde avatar (not male actors), combine with Remotion for motion graphics/logos (not just talking head)
- **Frame extraction for QA:** `ffmpeg -i video.mp4 -vf "fps=1" frames/frame_%02d.jpg`
- **Free assets:** Unsplash (photos), Pixabay (music/video), LottieFiles (animations)
- **Workflow:** Brief → Creative Director → Art Director → Code → Render → Frame QA → Fix → Loop

### Project Folders
- `~/clawd/projects/slc-lead-gen/` — SLC Lead Gen pipeline (bookmarked)
- `~/clawd/projects/bjorns-brew/video-ad/` — Remotion video production

### ClawdHub Skills (Installed Jan 28, 2026)
| Skill | Purpose | Usage |
|-------|---------|-------|
| **abm-outbound** | Sales automation pipeline | LinkedIn → Apollo → Skip Trace → Multi-channel |
| **youtube-transcript** | Get video transcripts | `python3 scripts/fetch_transcript.py <video_id>` |
| **linkedin** | LinkedIn automation | Via browser tool |
| **mlx-whisper** | Apple Silicon STT | `mlx_whisper audio.mp3 --model mlx-community/whisper-large-v3-turbo` |
| **remotion-best-practices** | Video rendering rules | Read `rules/*.md` for specific topics |
| **proactive-agent** | AI agent patterns | Reference for AGENTS.md improvements |
| **apollo-enrichment** | Email/phone lookup | Needs APOLLO_API_KEY (pending) |
| **google-workspace-mcp** | Gmail/Calendar/Drive | Needs OAuth setup |

**Pending Setup:**
- Apollo.io account (needs business email)
- Google Workspace OAuth (run any mcporter google-workspace command to trigger)

### ComfyUI + Flux (Image Generation)
**Location:** `~/clawd/ComfyUI`
**Start:** `~/clawd/scripts/start-comfyui.sh` or visit http://localhost:8188

**Models Installed:**
| Model | Size | Purpose |
|-------|------|---------|
| flux1-schnell-nf4.safetensors | 6.3GB | Main Flux UNET (Q4 quantized) |
| t5xxl_fp8_e4m3fn.safetensors | 4.6GB | T5 text encoder (FP8) |
| clip_l.safetensors | 235MB | CLIP text encoder |
| sdxl_vae.safetensors | 319MB | VAE decoder |

**Workflow for AI UGC:**
1. Generate character with Flux → consistent images
2. Clone voice with Qwen3-TTS → custom voice
3. Animate with HeyGen → lip-sync video
4. Edit with Remotion → add captions, music, b-roll

**Note:** For consistent characters, use IP-Adapter or train a LoRA on the character.

### Visual QA (LLM-powered)
**Skill:** `~/clawd/skills/visual-qa/`
**Template:** `~/clawd/templates/qa.md`

Spec-driven visual QA using browser snapshots + LLM review.

**Quick use:**
```
"QA check on localhost:3000 using projects/[project]/qa.md"
```

**Full process:**
1. Create qa.md spec from template
2. Take browser snapshot
3. LLM compares against spec
4. Report failures
5. Fix and iterate

---

## 📋 Common Workflows

Quick reference for frequently-used procedures.

### 🎤 Process Voice Memo
```bash
# Single file
source ~/clawd/.venv/bin/activate
python3 ~/clawd/scripts/process-voice-memo.py audio.ogg

# Watch folder for new files
~/clawd/scripts/transcribe-memo.sh --watch

# Output: ~/clawd/voice-memos/processed/[timestamp]_[name].md
```
Features: mlx_whisper transcription, action item extraction, organized markdown output.

### 🔍 Research a Topic
```bash
# Quick single-agent research
sessions_spawn task="Read ~/clawd/AGENTS.md first. Research [TOPIC]. Write findings to ~/clawd/research/[topic].md"

# Multi-scout research swarm (for complex topics)
# See: ~/clawd/templates/SPAWN-TEMPLATES.md → Research section
```

### 🎙️ Transcribe Audio
```bash
# Activate venv first
source ~/clawd/.venv/bin/activate

# Fast transcription (Apple Silicon GPU)
mlx_whisper "audio.ogg" --model mlx-community/whisper-large-v3-turbo

# Output: audio.txt in same directory
```

### 🗣️ Generate Voice (Claw Voice)
```bash
# Short text (direct)
~/clawd/scripts/claw-speak.sh "Hello, this is a test." output.wav

# Long text (from file) — needs 120-180s timeout!
~/clawd/scripts/claw-speak.sh "$(cat script.txt)" output.wav

# Alternative voices: ki-speak.sh (Ki voice)
```

### 📄 Generate PDF Report
```bash
# Using Typst (preferred)
typst compile report.typ report.pdf

# Template at: ~/clawd/templates/report.typ
# Example: ~/clawd/reports/morning-*/morning-report.typ
```

### 🚀 Deploy to Vercel
```bash
cd ~/clawd/projects/[project]
vercel --prod

# Or preview first:
vercel
```

### 🧠 Search Memory
```bash
# Local semantic search (QMD)
qmd search "what did we decide about X"
qmd query "topic"  # hybrid search with reranking

# Or use memory_search tool for MEMORY.md + memory/*.md
```

### 🐦 Twitter Operations
```bash
# Fetch bookmarks (requires Safari auth)
bird bookmarks --all --json

# Read a tweet/thread
bird read <tweet_url>

# Search
bird search "query" --json

# Post
bird tweet "message"
```

### 📊 Deep Research (Sub-agents)
```
1. Spawn 3-5 scouts with specific angles
2. Each writes to ~/clawd/research/[topic]-scout-N.md  
3. Wait for completion
4. Synthesize into final report

Template: ~/clawd/templates/SPAWN-TEMPLATES.md → Multi-Scout Research
```

### 🎬 Video Production
```
1. Write script → scripts/[project]/script.md
2. Generate voice → claw-speak.sh
3. Create visuals → Remotion or ComfyUI
4. Render → npx remotion render
5. QA frames → ffmpeg extract + vision review
6. Iterate until good
```

### 📬 Morning Brief (Already Automated)
- **6am:** Compile phase (research/news/bookmarks → report)
- **7am:** Deliver phase (generate voice + send to Marb)
- Files: `~/clawd/reports/morning-YYYY-MM-DD/`
- Config: `~/clawd/skills/twitter-research/`

### 🔄 Code Review (Use for significant changes!)
```
sessions_spawn task="Read ~/clawd/agents/code-reviewer.md. Review: [file or changes]"
sessions_spawn task="Read ~/clawd/agents/security-reviewer.md. Review: [file or changes]"
```

### ⛈️ Storm Monitoring (XPERIENCE)
```bash
# One-time check for Utah
source ~/clawd/.venv/bin/activate
python ~/clawd/systems/storm-monitor/storm_monitor.py --check --areas UT

# Or use wrapper script
~/clawd/systems/storm-monitor/check-storms.sh

# Watch mode (continuous, checks every 5 min)
python ~/clawd/systems/storm-monitor/storm_monitor.py --watch

# Output: ~/clawd/systems/storm-monitor/campaigns/
# - JSON: Structured campaign data
# - MD: Human-readable with SMS, email, social, ad copy
```
Monitors NWS alerts for hail/wind/severe storms. Generates ready-to-use marketing campaigns.

### ⭐ Review Generation (XPERIENCE)
```bash
# Generate review request campaign for a completed job
~/clawd/systems/review-gen/generate-review-campaign.sh "John Smith" "8015551234" "john@email.com" "roof replacement"

# Or with Python directly
source ~/clawd/.venv/bin/activate
python ~/clawd/systems/review-gen/review_gen.py --generate --customer "John Smith" --phone "8015551234" --job "roof replacement"

# View templates
python ~/clawd/systems/review-gen/review_gen.py --template sms

# Output: ~/clawd/systems/review-gen/campaigns/
```
4-touch sequence: Same-day SMS → Next-day email → 3-day SMS → 7-day final nudge. Config: `systems/review-gen/config/xperience.json` (needs Google Place ID).

---

*Add new workflows as patterns emerge.*
