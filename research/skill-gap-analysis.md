# Skill Gap Analysis — February 2026

*Self-assessment of current capabilities vs. areas for improvement.*

---

## Current Capabilities Inventory

### ✅ Strong — Working Well

| Category | Tools/Skills | Maturity |
|----------|-------------|----------|
| **Memory & Context** | SESSION-STATE.md, WAL protocol, QMD local search, daily logs | High |
| **Research** | Research swarm, web_search, web_fetch, deep-research skill | High |
| **Voice** | Qwen3-TTS (Claw voice), mlx_whisper transcription | High |
| **Code** | Full dev stack, agents (planner, architect, reviewer) | High |
| **Twitter/X** | bird CLI, twitter-research skill, overnight analysis | High |
| **Video** | Remotion, ffmpeg, video-frames extraction | Medium-High |
| **Lead Gen** | Full pipeline (discover → score → demo → email) | High |
| **Documents** | Typst PDF, markdown, report generation | High |

### ⚠️ Partial — Setup But Underutilized

| Category | Status | Blocker |
|----------|--------|---------|
| **Apollo.io** | Skill installed | Needs business email for account |
| **Email** | Skill exists | Google Workspace OAuth not set up |
| **LinkedIn** | Skill exists | Browser cookies expire, fragile |
| **Calendar** | N/A | No integration yet |
| **Image Gen** | ComfyUI installed | Rarely used, manual process |

### ❌ Missing — Capability Gaps

| Gap | Impact | Difficulty to Fix |
|-----|--------|------------------|
| **Calendar integration** | Can't check Marb's schedule for morning briefs | Medium (OAuth) |
| **Email reading** | Can't summarize inbox, detect urgent items | Medium (OAuth) |
| **Proactive notifications** | Currently rely on cron, no event-driven triggers | Low-Medium |
| **Real-time monitoring** | No way to watch for important events | Medium |
| **Character-consistent images** | Can't generate consistent AI avatars | Medium (LoRA training) |

---

## Pain Points Observed

### From Recent Work Logs

1. **Qwen3-TTS OOM kills** — Fixed by moving to lighter jobs, but memory-heavy tools fragile
2. **LinkedIn automation fragile** — Browser cookies expire, need manual re-auth
3. **No calendar/email context** — Morning briefs can't include schedule
4. **Image generation gap** — "Couldn't use image generation APIs" (Jan 24)
5. **Context overflow** — Sessions hitting 66%+ regularly, need better management

### Recurring Patterns That Could Be Automated

| Pattern | Frequency | Current State | Ideal State |
|---------|-----------|---------------|-------------|
| Morning briefing | Daily | Manual compilation | Auto: calendar + email + news + voice |
| Research swarm | Often | Manual spawn | Template with one command |
| PDF reports | Often | Custom each time | Typst templates ready |
| Voice transcription | Often | Manual `mlx_whisper` | Auto-process new audio files |
| Bookmark analysis | Nightly | Working (twitter-research) | ✅ Already automated |

---

## Recommendations

### High Priority (Should Do Soon)

#### 1. Google Workspace OAuth Setup
**Impact:** Unlocks calendar + email + drive
**Effort:** ~30 min one-time setup
**How:** Run `mcporter google-workspace` to trigger OAuth flow
**Benefits:**
- Morning briefs include today's schedule
- Email summaries and urgent item detection
- Drive access for document storage

#### 2. Proactive Audio Processing
**Impact:** Voice memos → auto-transcribed and summarized
**Effort:** 1 hour to build
**How:** 
- Watch folder for new .ogg/.m4a files
- Auto-run mlx_whisper
- Save transcription + AI summary
- Notify Marb if anything important

#### 3. LoRA Training for Consistent Characters
**Impact:** Can generate consistent AI avatars/spokespersons
**Effort:** 2-3 hours + compute time
**How:**
- Collect 10-20 reference images
- Train LoRA on ComfyUI
- Use for UGC video content

### Medium Priority (Nice to Have)

#### 4. Event-Driven Triggers
**Impact:** Respond to events, not just cron schedules
**Effort:** Depends on Clawdbot features
**Possibilities:**
- New email → analyze urgency → alert if important
- Calendar event starting → prep context
- GitHub PR merged → update project status

#### 5. LinkedIn Cookie Auto-Refresh
**Impact:** LinkedIn automation stays working
**Effort:** 1-2 hours research + implementation
**Options:**
- Session manager that detects expiry
- Puppeteer stealth refresh script
- Fall back to bird-style cookie extraction

#### 6. Unified Command Interface
**Impact:** Faster task execution
**Effort:** 1-2 hours
**How:**
- `claw research <topic>` → spawns research swarm
- `claw brief` → generates morning brief
- `claw leads <location>` → runs lead gen pipeline

### Low Priority (Future Improvements)

#### 7. Multi-Modal Input Processing
- Images → automatic description + filing
- Screenshots → text extraction (OCR)
- Audio → transcription (already have, needs automation)

#### 8. Learning Loop
- Track which responses Marb liked/disliked
- Automatically improve prompts/approaches
- The continuous-learning skill exists but isn't active

---

## Quick Wins (Can Do Now)

1. **Set up Google OAuth** — Just needs Marb to click through auth flow
2. **Create spawn templates** — Research swarm, focus group, code review
3. **Build audio watcher script** — Auto-transcribe new voice files
4. **Typst template library** — Standard report layouts

---

## Capability Score

| Area | Score | Notes |
|------|-------|-------|
| Research & Analysis | 9/10 | Excellent with swarms and tools |
| Code & Development | 9/10 | Full stack with review agents |
| Memory & Context | 8/10 | Strong, but context management needs work |
| Voice (TTS/STT) | 8/10 | Great quality, some OOM issues |
| Communication | 7/10 | Twitter strong, email/calendar missing |
| Automation | 7/10 | Good cron jobs, lacks event triggers |
| Visual Content | 5/10 | Tools exist but underutilized |
| External Integrations | 5/10 | LinkedIn fragile, Apollo not set up |

**Overall: 7.5/10** — Strong foundation, key gaps in calendar/email integration and event-driven workflows.

---

## Next Actions

1. [ ] Set up Google Workspace OAuth (requires Marb's auth)
2. [ ] Create spawn templates file (`~/clawd/templates/SPAWN-TEMPLATES.md`)
3. [ ] Build audio auto-transcription watcher
4. [ ] Test Apollo.io signup with existing email

---

*Last updated: 2026-02-02*
