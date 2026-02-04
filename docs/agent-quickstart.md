# Agent System Quick Start

*Get from zero to working agent partner in 30 minutes.*

---

## 1. Create Workspace (2 min)

```bash
mkdir -p ~/clawd/{memory,skills,agents,research,state}
cd ~/clawd
```

## 2. Core Files (10 min)

Create these 5 files:

### AGENTS.md
```markdown
# AGENTS.md

## Every Session
1. Read SESSION-STATE.md (active memory)
2. Read SOUL.md and USER.md
3. Read recent daily notes

## Memory
- Daily logs: memory/YYYY-MM-DD.md
- Curated: MEMORY.md
- Active state: SESSION-STATE.md

## WAL Protocol
User gives concrete detail → update SESSION-STATE.md BEFORE responding.

## Safety
- Ask before external actions (emails, tweets, etc.)
- trash > rm
- Don't exfiltrate private data

## Standing Permissions (no need to ask)
- Read/organize files
- Update documentation  
- Research and learn
- Build drafts (don't publish)

## Quality
Review your work before delivering. Fix issues, check edge cases.
```

### SOUL.md
```markdown
# SOUL.md

Be genuinely helpful, not performatively helpful.
Have opinions. Disagree when appropriate.
Be resourceful — try to figure it out before asking.
Earn trust through competence.

Private things stay private.
Ask before external actions.
```

### USER.md
```markdown
# USER.md

- **Name:** [Your name]
- **Timezone:** [Your timezone]
- **Notes:** [Anything useful]
```

### SESSION-STATE.md
```markdown
# SESSION-STATE.md

**Last Updated:** [timestamp]

## Current Task
[What we're working on]

## Key Context
[Important details]
```

### HEARTBEAT.md
```markdown
# HEARTBEAT.md

## On Wakeup
- Check if anything needs attention
- If nothing urgent, reply HEARTBEAT_OK
```

## 3. Set Up Memory (5 min)

Create today's note:
```bash
echo "# $(date +%Y-%m-%d)" > memory/$(date +%Y-%m-%d).md
```

Create MEMORY.md:
```bash
echo "# Long-term Memory" > MEMORY.md
```

## 4. Install Skills (5 min)

```bash
# Search for skills
clawdhub search research

# Install useful ones
clawdhub install github
clawdhub install weather
```

## 5. First Conversation

Start chatting. The agent will:
- Read your core files
- Learn your preferences
- Start building context

**Pro tip:** After significant discussions, tell it:
> "Update SESSION-STATE.md with what we discussed"

## 6. Set Up Heartbeat (optional, 5 min)

Add a cron job so agent checks in periodically:

```javascript
cron({
  action: "add", 
  job: {
    name: "heartbeat",
    schedule: { kind: "cron", expr: "0 */2 * * *" }, // every 2 hours
    payload: {
      kind: "agentTurn",
      message: "Read HEARTBEAT.md. If nothing needs attention, reply HEARTBEAT_OK."
    }
  }
})
```

---

## Key Concepts

### The WAL Protocol (Memory Survival)
Chat context gets compacted. SESSION-STATE.md doesn't. 

When user says something important → write it FIRST, respond SECOND.

### Spawning Sub-Agents
For long tasks, spawn a sub-agent:
```javascript
sessions_spawn({
  task: "Read ~/clawd/AGENTS.md first. Then: [task]",
  label: "task-name"
})
```

### Standing Permissions
Things agent CAN do without asking. Be explicit. Default to generous.

### Proactive Work
Agent should create value without being asked. Keep a PROACTIVE-IDEAS.md file with things to work on.

---

## Common Patterns

### "Remember this"
Agent should write to memory file, not just acknowledge.

### "Build this while I sleep"
Use ralph-loops skill for autonomous overnight building.

### "Research X"
Spawn a sub-agent for deep research, keep main session responsive.

### Recovery after context loss
Agent reads SESSION-STATE.md → "Recovered. Last task was X. Continue?"

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Forgets mid-conversation | Enforce WAL protocol, check SESSION-STATE.md |
| Asks too many questions | Add more standing permissions |
| Sub-agents go rogue | Have them read AGENTS.md first |
| Heartbeats do nothing | Add specific checks to HEARTBEAT.md |

---

## Next Steps

1. Read the full guide: `docs/agent-system-guide.md`
2. Install more skills from ClawdHub
3. Create sub-agent personas in `agents/`
4. Set up proactive work sessions
5. Iterate on AGENTS.md as you learn what works
