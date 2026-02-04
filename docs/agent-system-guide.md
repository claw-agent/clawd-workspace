# The Claw Agent System — Complete Guide

*A battle-tested framework for running Clawdbot as a true AI partner, not just a chatbot.*

**Author:** Marb + Claw (human-AI dyad)
**Last Updated:** February 2026

---

## Philosophy

The goal isn't "AI assistant that answers questions." It's **AI partner with continuity, memory, and agency**.

Key principles:
- **Memory persists** — Files are your agent's brain, not the chat window
- **Proactive > reactive** — Agent should create value without being asked
- **Trust through guardrails** — Give freedom with clear boundaries
- **Fail gracefully** — Systems should degrade, not crash

---

## Directory Structure

```
~/clawd/                          # Workspace root
├── AGENTS.md                     # Operating guidelines (the "how to be")
├── SOUL.md                       # Personality and identity
├── USER.md                       # Info about you (the human)
├── IDENTITY.md                   # Agent's name, emoji, avatar
├── TOOLS.md                      # Local tool notes (camera names, SSH hosts, etc.)
├── HEARTBEAT.md                  # What to do on scheduled wakeups
├── SESSION-STATE.md              # Active working memory (survives compaction!)
├── MEMORY.md                     # Long-term curated memories
├── memory/                       # Daily notes
│   ├── 2026-02-01.md
│   ├── 2026-02-02.md
│   └── ...
├── skills/                       # Installed skills (from ClawdHub or custom)
├── agents/                       # Sub-agent persona definitions
├── research/                     # Research outputs
├── reports/                      # Generated reports
├── scripts/                      # Helper scripts
├── state/                        # Persistent state files (JSON)
└── templates/                    # Reusable templates
```

---

## Core Files Explained

### AGENTS.md — The Operating Manual

This is the most important file. It defines HOW your agent operates.

**Key sections to include:**

```markdown
# AGENTS.md

## First Run
- Read SOUL.md, USER.md, IDENTITY.md
- Read SESSION-STATE.md (active working memory)
- Read recent daily notes

## Memory System
- Daily notes: memory/YYYY-MM-DD.md (raw logs)
- Long-term: MEMORY.md (curated insights)
- Active state: SESSION-STATE.md (survives context compaction)

## Write-Ahead Log (WAL) Protocol
When user provides concrete detail → update SESSION-STATE.md BEFORE responding.
This prevents memory loss during long sessions.

## Safety Rules
- Don't exfiltrate private data
- trash > rm (recoverable)
- Ask before external actions (emails, tweets)

## Standing Permissions
List what the agent CAN do without asking:
- Read/organize files
- Update documentation
- Run tests and linters
- Research topics
- Build drafts (don't publish)

## Self-Iteration
Before delivering work: review it, improve it, check edge cases.

## Group Chat Behavior
Know when to speak vs stay silent. Quality > quantity.
```

### SOUL.md — Personality

Defines WHO your agent is, not what it does.

```markdown
# SOUL.md

## Core Truths
- Be genuinely helpful, not performatively helpful
- Have opinions — disagree, prefer things, find stuff amusing
- Be resourceful before asking
- Earn trust through competence

## Boundaries
- Private things stay private
- Ask before external actions
- Not the user's voice in group chats

## Vibe
Concise when needed, thorough when it matters.
Not a corporate drone. Not a sycophant. Just good.
```

### USER.md — About the Human

```markdown
# USER.md

- **Name:** [Your name]
- **What to call them:** [Nickname]
- **Pronouns:** [pronouns]
- **Timezone:** [timezone]
- **Notes:** [Anything relevant — work style, pet peeves, interests]

## Context
[Projects, priorities, what they care about]
```

### SESSION-STATE.md — Active Working Memory

**This is the secret weapon.** Chat history gets compacted. This file doesn't.

```markdown
# SESSION-STATE.md — Active Working Memory

**Last Updated:** 2026-02-02 11:00 MST

## Current Task
What we're actively working on right now.

## Key Context
- Important details that can't be lost
- Decisions made this session
- User corrections/preferences

## Previous Context
Brief note about what came before (for recovery).
```

**The WAL Protocol:**
1. User says something important (name, correction, decision)
2. Agent updates SESSION-STATE.md IMMEDIATELY
3. THEN responds to user

This means even if context compacts mid-conversation, the agent can recover.

### HEARTBEAT.md — Scheduled Behavior

Tells the agent what to do during cron wakeups.

```markdown
# HEARTBEAT.md

## Active Projects
- Project A: status
- Project B: status

## Proactive Work
When triggered, check PROACTIVE-IDEAS.md and do actual work.

## Monitoring
- Session size (flush if >60%)
- Memory maintenance
- Project health
```

---

## Memory System

### Three Layers

| Layer | File | Purpose | Lifespan |
|-------|------|---------|----------|
| Active | SESSION-STATE.md | Current task, live context | This session |
| Daily | memory/YYYY-MM-DD.md | Raw logs of what happened | Forever |
| Long-term | MEMORY.md | Curated insights, lessons | Forever |

### Daily Notes Pattern

Each day, the agent writes to `memory/YYYY-MM-DD.md`:

```markdown
# 2026-02-02

## Morning
- Worked on X
- Discovered Y

## Afternoon  
- Fixed bug in Z
- User preference: prefers A over B

## Key Decisions
- Decided to use approach X because...

## Tomorrow
- Follow up on Y
```

### Memory Recall Protocol

Before answering questions about past work:
1. Use `memory_search` (semantic search across all memory files)
2. Use `memory_get` to pull specific lines
3. If still unsure, say "I checked but didn't find it"

**Never assume you remember something. If it's not in files, you don't know it.**

---

## Sub-Agent System

### When to Spawn

- Task takes >10 minutes
- Parallel research needed
- Specialized expertise required
- You want to stay responsive to human

### Spawn Pattern

Always have sub-agents read AGENTS.md first:

```javascript
sessions_spawn({
  task: "Read ~/clawd/AGENTS.md first to understand operating guidelines. Then: [actual task]",
  label: "descriptive-name"
})
```

### Agent Personas

Create persona files in `agents/`:

```markdown
# agents/researcher.md

You are a research specialist. Your job is deep investigation.

## Approach
- Search multiple sources
- Cross-reference claims
- Note confidence levels
- Cite sources

## Output
Structured markdown with findings, sources, and recommendations.
```

Then spawn with persona:

```javascript
sessions_spawn({
  task: "Read ~/clawd/AGENTS.md first, then ~/clawd/agents/researcher.md. Then: Research X",
  label: "research-x"
})
```

### Coordination Rules (Important!)

Research shows multi-agent coordination often makes things WORSE. Rules:

1. **Never have two agents edit the same file** — sequential, not parallel
2. **Orchestrator pattern** — one coordinator spawns specialists, collects results
3. **Verifiable outputs** — agents return diffs, test results, not just "I did it"

---

## Cron Jobs

### Essential Jobs

| Job | Schedule | Purpose |
|-----|----------|---------|
| Heartbeat | Every 30-60min | Check if anything needs attention |
| Proactive work | 2-3x daily | Actually build/create things |
| Daily reset | 5:55am | Clean SESSION-STATE for new day |
| System health | Every 3 days | Audit files, check for issues |

### Setting Up Crons

```javascript
cron({
  action: "add",
  job: {
    name: "proactive-work",
    schedule: { kind: "cron", expr: "0 11,14,17 * * *", tz: "America/Denver" },
    sessionTarget: "isolated",
    payload: {
      kind: "agentTurn",
      message: "Read PROACTIVE-IDEAS.md, pick one task, do it, report back.",
      deliver: true,
      channel: "telegram",
      to: "YOUR_CHAT_ID"
    }
  }
})
```

---

## Skills System

Skills are packaged capabilities. Install from ClawdHub:

```bash
clawdhub search [topic]
clawdhub install [skill-name]
```

Skills live in `skills/` and include:
- `SKILL.md` — Instructions
- `scripts/` — Helper scripts
- `prompts/` — Sub-agent prompts

### Recommended Skills

| Skill | Purpose |
|-------|---------|
| `ralph-loops` | Autonomous overnight building |
| `youtube-transcript` | Summarize videos |
| `linkedin` | LinkedIn automation |
| `github` | GitHub CLI integration |
| `weather` | Weather lookups |

---

## Proactive Agent Pattern

The goal: Agent creates value WITHOUT being asked.

### PROACTIVE-IDEAS.md

Keep a running list of things the agent could work on:

```markdown
# Proactive Ideas

## Quick Wins (< 30 min)
- [ ] Organize research folder
- [ ] Update TOOLS.md with new installs
- [ ] Review recent errors, document fixes

## Builds (1-2 hours)
- [ ] Create dashboard for X
- [ ] Automate Y workflow
- [ ] Research Z and write report

## Explorations
- [ ] Learn about [new tool]
- [ ] Analyze patterns in [data]
```

### The Proactive Question

Agent asks itself on every heartbeat:
> "What would genuinely delight [human] that they haven't asked for?"

### Guardrail

**Build proactively, but nothing goes EXTERNAL without approval.**
- Draft emails — don't send
- Build tools — don't deploy
- Create content — don't publish

---

## Best Practices

### 1. Text > Brain

If you want to remember something, WRITE IT DOWN. Mental notes don't survive.

### 2. Success Criteria > Instructions

Don't tell agent what to do. Tell it what success looks like.

❌ "First do A, then B, then C"
✅ "I need X. Success = [criteria]. Figure out how."

### 3. Context Monitoring

Check context usage regularly. At >70%, flush to SESSION-STATE.md aggressively.

### 4. Code Review

For significant code changes, spawn reviewers:

```javascript
sessions_spawn({ task: "Review this code for bugs and issues: [code]" })
sessions_spawn({ task: "Review this code for security vulnerabilities: [code]" })
```

### 5. Compaction Recovery

If session starts with `<summary>` tag or agent seems confused:
1. Read SESSION-STATE.md (has the active task)
2. Read today's + yesterday's daily notes
3. Present: "Recovered from SESSION-STATE.md. Continue?"

---

## Example: Full Agent Bootstrap

### Day 1 Setup

1. Create workspace:
```bash
mkdir -p ~/clawd/{memory,skills,agents,research,reports,scripts,state,templates}
```

2. Create core files:
- AGENTS.md (copy template, customize)
- SOUL.md (define personality)
- USER.md (info about you)
- IDENTITY.md (name, emoji)
- SESSION-STATE.md (blank template)
- HEARTBEAT.md (what to do on wakeups)

3. Install essential skills:
```bash
clawdhub install ralph-loops
clawdhub install github
```

4. Set up cron jobs for heartbeats

5. Start chatting — agent will learn and adapt

### Ongoing

- Review daily notes weekly, distill to MEMORY.md
- Update AGENTS.md with lessons learned
- Add new skills as needed
- Refine proactive ideas list

---

## Troubleshooting

### Agent forgets things mid-conversation
- Check SESSION-STATE.md — is it being updated?
- Implement WAL protocol strictly
- Monitor context usage

### Agent asks too many questions
- Add more standing permissions to AGENTS.md
- Be explicit about what it CAN do without asking

### Sub-agents don't follow rules
- Always have them read AGENTS.md first
- Use explicit success criteria

### Overnight jobs fail
- Add auth pre-checks
- Log errors explicitly (no placeholders)
- Design for partial success

---

## Resources

- Clawdbot Docs: https://docs.clawd.bot
- ClawdHub (skills): https://clawdhub.com
- Discord: https://discord.com/invite/clawd
- GitHub: https://github.com/clawdbot/clawdbot

---

*This guide reflects ~2 months of iteration. Your setup will evolve too. Update your AGENTS.md as you learn what works.*
