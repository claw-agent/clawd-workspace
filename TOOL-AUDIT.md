# Tool Audit — Feb 4, 2026

## 🚨 Immediate Issue
**web_search still enabled in config** — thought we disabled it but it's `true`

---

## CRON JOBS (18 total)

### ✅ ACTIVE (9)
| Job | Schedule | Purpose | Last Run |
|-----|----------|---------|----------|
| github-sentinel | Every 4h | Repo monitoring | Working |
| proactive-work-session | 1am, 3am | Overnight builds | Working |
| overnight-research-swarm | 2am | Twitter scouts | Working |
| morning-report-compile | 6am | Build PDF + voice | Working |
| morning-report-deliver | 7am | Send to Marb | Working |
| system-health-audit | Every 3 days 10am | System check | Working |
| tool-update-check | Sunday 3am | Check updates | Working |
| weekly-maintenance | Sunday 4am | Cleanup | Working |
| weekly-tech-digest | Sunday 9am | News roundup | Working |
| 30-day-trend-report | 1st & 15th | Trends | Working |

### ❌ DISABLED (8) — candidates for deletion
| Job | Why Disabled |
|-----|--------------|
| codex-vs-opus-reminder | One-time, completed |
| reminder-asset-gen-review | One-time, completed |
| reminder-chatgpt-ads-review | One-time, completed |
| reminder-exa-api-key | One-time, never ran |
| reminder-designer-view-yellow | One-time, completed |
| tts-prewarm | Moved TTS to compile phase |
| daily-session-reset | Merged elsewhere? |
| session-size-monitor | Redundant with health audit? |

---

## SKILLS (26 installed)

### 📁 Custom Skills (~/clawd/skills/)
| Skill | Last Modified | Status |
|-------|---------------|--------|
| abm-outbound | Jan 28 | ❓ Never tested |
| adaptive-suite | Jan 29 | ❓ Unclear purpose |
| apollo-enrichment | Jan 28 | ❌ No API key |
| bulletproof-memory | Jan 30 | ✅ Active (WAL protocol) |
| claude-connect | Jan 29 | ❓ Used once? |
| continuous-learning | Jan 25 | ❓ Never tested |
| deep-research | Jan 28 | ✅ Used |
| email | Jan 28 | ❓ What does this do? |
| exa-plus | Jan 28 | ❌ No API key configured |
| google-workspace-mcp | Jan 28 | ❌ No OAuth setup |
| idea-to-blueprint | Jan 27 | ✅ Used for Tapflow |
| last30days-lite | Jan 28 | ❓ Overlaps with research-swarm? |
| linkedin | Jan 28 | ❓ Never tested |
| mlx-whisper | Jan 28 | ✅ Working (transcription) |
| proactive-agent | Jan 28 | ✅ Reference doc |
| ralph-loops | Feb 2 | ❓ Complex, used? |
| remotion | Jan 25 | ❓ Old, superseded? |
| remotion-best-practices | Jan 28 | ✅ Reference |
| research-swarm | Jan 25 | ✅ Active |
| roles | Jan 25 | ❓ What is this? |
| supermemory | Jan 29 | ❌ Needs API key? |
| twitter-research | Jan 27 | ✅ Active (overnight swarm) |
| video-production | Jan 25 | ❓ Overlaps with remotion? |
| visual-qa | Feb 2 | ❓ Tested once? |
| youtube-transcript | Jan 28 | ✅ Working |

### 📦 Built-in Skills (OpenClaw)
bird, bluebubbles, clawdhub, coding-agent, github, notion, openai-whisper, session-logs, skill-creator, slack, tmux, video-frames, weather

---

## SCRIPTS (21 total)

### ✅ Active/Used
| Script | Purpose |
|--------|---------|
| claw-speak.sh | Voice gen (primary) |
| claw-speak-chunked.sh | Long voice gen |
| cleanup-sessions.sh | Session cleanup |
| process-voice-memo.py | Transcription |
| session-size-monitor.sh | Size check |
| weekly-maintenance.sh | Cleanup |

### ❓ Unclear/Old
| Script | Last Modified | Question |
|--------|---------------|----------|
| generate-report.js | Jan 24 | Still used? |
| generate-tim-report.js | Jan 24 | Superseded? |
| ki-speak.sh | Jan 28 | Ki voice, used? |
| qwen-clone.sh | Jan 25 | Testing only? |
| qwen-tts-test.py | Jan 25 | Testing only? |
| speak.sh | Jan 25 | Old, superseded by claw-speak? |
| start-comfyui.sh | Jan 28 | ComfyUI used? |
| stealth-browser.js | Jan 25 | Used? |
| test-auth-resilience.sh | Jan 25 | One-time test? |
| transcribe-memo.sh | Feb 3 | Wrapper for process-voice-memo? |
| troy-speak.sh | Jan 28 | Troy voice, used? |
| tts-analyze.py | Jan 28 | Testing only? |
| voice-clone.py | Jan 28 | Testing only? |
| check-updates.sh | Jan 27 | Weekly job uses this |
| weekly-twitter-synthesis.py | Feb 2 | Active? |

---

## AGENTS (4 total)
| Agent | Purpose | Used? |
|-------|---------|-------|
| architect.md | System design | Rarely |
| code-reviewer.md | Code review | Should use more |
| planner.md | Planning | Rarely |
| security-reviewer.md | Security | Should use more |

---

## REDUNDANCY MAP

### Web Search (5 overlapping tools!)
1. `web_search` — Brave API (NO KEY)
2. `web_fetch` — Direct URL fetch ✅
3. `exa-plus` skill — Neural search (NO KEY)
4. `bird` CLI — Twitter search ✅
5. Browser tool — Full automation ✅

**Recommendation:** Use web_fetch + bird + browser. Delete web_search, configure exa OR don't.

### Voice/TTS (4 scripts!)
1. claw-speak.sh ✅
2. claw-speak-chunked.sh ✅
3. ki-speak.sh ❓
4. troy-speak.sh ❓
5. speak.sh ❓ (old?)

**Recommendation:** Keep claw-speak + chunked. Decide on ki/troy or delete.

### Research (3 overlapping!)
1. research-swarm skill
2. deep-research skill
3. last30days-lite skill

**Recommendation:** Pick one primary, deprecate others.

### Remotion (2 overlapping!)
1. remotion skill
2. remotion-best-practices skill
3. video-production skill

**Recommendation:** Consolidate into one.

---

## ACTION ITEMS

### 🔴 Fix Now
- [ ] Actually disable web_search in config
- [ ] Delete 8 disabled one-time reminder crons

### 🟡 Decide
- [ ] Keep or delete Ki/Troy voices?
- [ ] Which research skill to standardize on?
- [ ] Set up Exa API key or remove skill?
- [ ] Apollo API key or remove skill?

### 🟢 Later
- [ ] Consolidate remotion skills
- [ ] Clean up test scripts
- [ ] Review agent usage patterns
