# TOOLS.md

## 🚦 ROUTING TABLE (Check First!)

**Twitter/X → ALWAYS use `bird` first** (has auth, browser doesn't):
```
bird read <url>              # Single tweet + thread
bird bookmarks --all --json  # Fetch bookmarks
bird search "query"          # Search tweets
bird user-tweets <handle>    # User's timeline
bird tweet "text"            # Post tweet
bird reply <id> "text"       # Reply
bird home/trending/mentions/likes --json  # Other feeds
```
Auth: Safari cookies. Config: `~/.config/bird/config.json5`. Account: Marb's main X.
⚠️ When bird auth fails: Marb refreshes x.com in **Safari** (not Chrome!). Bird reads Safari cookies.

**Web content (non-Twitter) — cascade:**
1. `web_fetch` → 2. `browser` tool → 3. `stealth-browse` → 4. Tell user

**Images from tweets:** `bird read --json` → extract `media[].url` → `image` tool

---

## Installed Tools

### Core Infrastructure
- **Ollama** v0.15.0 — Local AI (glm4:9b, llama3.1:8b, llama3.2:3b)
- **Docker Desktop** — Sim Studio
- **Vercel CLI** v50.5.0 — `cd ~/clawd/projects/[project] && vercel --prod`
- **Claude Squad** v0.1.24 — Multi-agent orchestration
- **Bun** v1.3.8 — Fast JS runtime (for QMD)

### QMD (Local Semantic Search) ⭐
Toby Lutke's hybrid search. Collections: `memory`, `research`, `workspace`.
```bash
qmd search "query"    # BM25 keyword
qmd vsearch "query"   # Semantic vector
qmd query "query"     # Hybrid + reranking (best)
qmd get/ls/status     # Manage docs
```

### Browser Automation
**browser-use** (in ~/clawd/.venv): `browser-use --session claw open/state/scroll/click/input/close`
- Twitter Account: @ClawA94248 | Profile: ~/clawd/browser-profiles/claw-chrome

**stealth-browse**: `~/bin/stealth-browse "URL" --screenshot /tmp/page.png [--html|--text|--wait ms]`

**agent-browser**: `agent-browser open URL && agent-browser snapshot -i && agent-browser click @e2`

**cliclick** — macOS mouse/keyboard: `c:x,y` click, `dc:` double, `t:'text'` type, `kp:return` key, `kd:cmd t:a ku:cmd` combo

### XPERIENCE CLI
`xp` — Unified wrapper for all XPERIENCE systems:
```bash
xp status                              # All systems health
xp storm [--execute]                   # Weather alerts
xp lead <name> <phone> [source]        # Log lead
xp quote <customer> <phone> <email> <addr> <type> <sqft>  # PDF quote
xp review <name> <phone> <email> <job> # Review campaign
xp crm [list|add|search|stats]         # Lead CRM
xp prospect <url>                      # Demo pipeline
xp roi / xp pricing / xp dashboard     # Open web tools
```

### Financial Analysis (~/clawd/.venv)
pandas 3.0, numpy 2.4, openpyxl, xlrd, matplotlib 3.10, plotly 6.5

### PDF Generation
- **Typst** v0.14.2 (preferred): `typst compile input.typ output.pdf`
- **WeasyPrint**: `weasyprint input.html output.pdf`
- **ReportLab** (in .venv)

### Speech-to-Text ⭐
```bash
source ~/clawd/.venv/bin/activate && mlx_whisper "audio.ogg" --model mlx-community/whisper-large-v3-turbo
```
Apple Silicon GPU. **AVOID** `/opt/homebrew/bin/whisper` (CPU, slow).

### Text-to-Speech ⭐
**Claw Voice (DEFAULT)** — Tim Gerard Reynolds style:
- Short: `~/clawd/scripts/claw-speak.sh "Text" [output.wav]`
- Long (>500 bytes): `~/clawd/scripts/claw-speak-chunked.sh "Text" [output.wav]`
- ⚠️ Long text MUST use chunked or OOM! Timeouts: short=120s, chunked=600s.

**Ki Voice:** `~/clawd/scripts/ki-speak.sh "Text" [output.wav]`
**edge-tts (fallback):** `~/.local/bin/edge-tts --voice en-US-GuyNeural --text "Hello" --write-media out.mp3`

### Video
- **yt-dlp** + **ffmpeg** — Download/extract frames/audio
- **Remotion** — React video rendering. Skill: `~/.agents/skills/remotion`
- **HeyGen** — AI avatar API. Creds: `~/clawd/config/.heygen-credentials`
- **ComfyUI + Flux** — Image gen at `~/clawd/ComfyUI`, start: `~/clawd/scripts/start-comfyui.sh`

### Agent System
**Swarm v2:** `~/clawd/agents/v2/` — Researcher, List Builder, Outreach, Qualifier, Content
**Dev agents:** planner.md, architect.md, code-reviewer.md, security-reviewer.md
**Focus group:** `~/clawd/agents/focus-group/` — 12 reusable personas

**Ralph Loops:** `~/clawd/skills/ralph-loops/` — autonomous build iterations

### Security
- **tirith** v0.1.5 — Shell security guard. Bypass: `TIRITH=0 <cmd>`. Check: `tirith check -- '<cmd>'`

### Firecrawl (Web Data for AI)
`firecrawl-py` v4.14.0 in `~/clawd/.venv`. SDK installed, no API key yet. See `~/clawd/research/firecrawl-evaluation.md`.

### MCP Servers
Playwright, Context7, GitHub, Filesystem

### Scheduled Jobs
- GitHub Sentinel (4h) | Weekly Tech Digest (Sun 9am)
- Twitter Bookmark Research (11pm) | Morning Report (7am)

---

## 📋 Common Workflows

### 🎤 Voice Memo → Summary
```bash
source ~/clawd/.venv/bin/activate
python3 ~/clawd/scripts/process-voice-memo.py audio.ogg
# Or watch: ~/clawd/scripts/transcribe-memo.sh --watch
```

### 🔍 Research
```
sessions_spawn task="Read ~/clawd/AGENTS.md first. Research [TOPIC]. Write to ~/clawd/research/[topic].md"
# Multi-scout: ~/clawd/templates/SPAWN-TEMPLATES.md
```

### 🔄 Code Review
```
sessions_spawn task="Read ~/clawd/agents/code-reviewer.md. Review: [changes]"
sessions_spawn task="Read ~/clawd/agents/security-reviewer.md. Review: [changes]"
```

### ⛈️ Storm Monitoring (XPERIENCE)
```bash
source ~/clawd/.venv/bin/activate
python ~/clawd/systems/storm-monitor/storm_monitor.py --check --areas UT
# Or: ~/clawd/systems/storm-monitor/check-storms.sh
```

### ⭐ Review Generation (XPERIENCE)
```bash
~/clawd/systems/review-gen/generate-review-campaign.sh "John Smith" "8015551234" "john@email.com" "roof replacement"
```

### 📬 Morning Brief (Automated)
6am compile → 7am deliver. Files: `~/clawd/reports/morning-YYYY-MM-DD/`

---

### Shannon (Pentesting)
AI pentester at `~/clawd/tools/shannon/`. White-box only, needs source in `./repos/`. Run: `./shannon start URL=https://target.com REPO=repo-name`. ⚠️ Do NOT run against targets you don't own.

---

*Add new workflows as patterns emerge.*
