# Twitter Bookmark Report — 2026-01-25

Analysis of 6 key bookmarks from @ClawA94248 account.

---

## 1. @NetworkChuck — Server Phone + Claude Code
**Type:** YouTube Tutorial  
**Topic:** 3CX VoIP integration with Claude Code

Set up a server that can call you when things break. Uses 3CX (self-hosted VoIP) + Claude Code for AI-powered incident response.

**Why it matters:** Voice interface for our agent stack. Server calls Marb when something needs attention.

**What we have:**
- Whisper (STT) — transcribes incoming voice
- Qwen3-TTS (TTS) — speaks with Tim Gerard Reynolds voice
- Twilio account ($15.50 credit, toll-free number)

**Next step:** Set up 3CX or use Twilio directly for incoming/outgoing calls.

---

## 2. @nicbstme (Fintool CEO) — AI Agents for Fintech
**Type:** Long-form article  
**Topic:** Production AI agent architecture

### Key Insights:
- **Sandbox required** for multi-step agent workflows (can't trust agents with production data)
- **Skills-as-markdown** is the future (not prompt engineering)
- **S3-first architecture** — YAML files > database for agent state
- **Temporal** for long-running tasks (workflow orchestration)
- **Domain-specific evals** are essential (generic evals don't work)

### Quote:
> "The model is not your product. The experience around the model is your product."

**Why it matters:** Validates our skills-as-markdown approach. We're on the right track.

---

## 3. @shawn_pana — agent-browser by Vercel
**Type:** Tool announcement  
**Topic:** Browser automation for AI agents

`agent-browser` — Headless CLI for AI agents to browse authenticated sites.

**Features:**
- `agent-browser open URL` — opens page
- `agent-browser snapshot -i` — gets interactive elements with refs
- `agent-browser click @e2` — clicks element by ref
- Supports `--profile` for persistent auth/cookies

**Status:** ✅ INSTALLED at `~/bin/agent-browser`

**Related:** `browser_use` for more complex authenticated site automation.

---

## 4. @hayesdev_ — Company Structure as .md Files
**Type:** Blog post at aiagentskit.com/blog/claude-ag  
**Topic:** Skills templates for org design

Apply the skills-as-markdown pattern to organizational design. Define employee roles, responsibilities, and workflows as markdown files.

**Concept:** Your org chart becomes executable — agents can embody roles.

**What we built:**
- 39 agent definition files for SLC Lead Gen
- Research team: 12 agents
- Design team: 9 agents
- Lead Gen team: 18 agents

**Files at:** `~/clawd/projects/slc-lead-gen/agents/`

---

## 5. @brave — Brave Search API
**Type:** Product announcement  
**Topic:** Independent search for AI agents

**Features:**
- Free tier available at brave.com/search/api
- Ad-free, tracking-free
- Independent search index (not Google/Bing wrapper)

**Why it matters:** Better search for agent research tasks. Current web_fetch is good for known URLs; Brave would enable open-ended search.

**Status:** Not yet integrated.

---

## 6. @NirDiamantAI — everything-claude-code
**Type:** GitHub repo  
**Repo:** github.com/affaan-m/everything-claude-code

Curated collection of Claude Code patterns, prompts, and agent designs.

**What we grabbed:**
- `~/clawd/agents/planner.md` — Feature implementation planning
- `~/clawd/agents/architect.md` — System design decisions
- `~/clawd/agents/code-reviewer.md` — Quality and security review
- `~/clawd/agents/security-reviewer.md` — Vulnerability analysis

**Status:** ✅ Agents installed and ready to spawn.

---

## Summary

| Bookmark | Status | Priority |
|----------|--------|----------|
| NetworkChuck (3CX) | Researched | Medium |
| Fintool AI Agents | Studied | Reference |
| agent-browser | ✅ Installed | Active |
| .md Employees | ✅ Built | Active |
| Brave Search API | Not integrated | Low |
| everything-claude-code | ✅ Installed | Active |

### Next Actions:
1. **Voice interface** — Consider 3CX or direct Twilio for phone agent
2. **Brave Search** — Integrate when we need open-ended search
3. **Spawn agents** — Use the 39 SLC Lead Gen agents for actual work
