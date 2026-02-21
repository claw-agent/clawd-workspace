# Claude Code Integration Patterns

*Best practices for spawning Claude Code from OpenClaw sessions.*

Last updated: 2026-02-21

---

## When to Use Claude Code vs sessions_spawn

| Use Case | Tool | Why |
|----------|------|-----|
| Code changes in a project | **Claude Code** via `coding-agent` skill | Sees full repo context, runs tests, commits |
| Research, analysis, writing | **sessions_spawn** | No repo needed, cheaper, faster |
| PR review | **Claude Code** in temp worktree | Needs git diff context |
| Multi-file refactor | **Claude Code** | Understands project structure |
| Quick one-off script | Either | Claude Code if it needs to run/test it |

**Rule of thumb:** If the task involves reading/writing files in a git repo and running commands against them, use Claude Code. Otherwise, sessions_spawn.

---

## Patterns

### 1. One-Shot Task (Most Common)

```bash
exec pty:true workdir:~/Projects/myapp timeout:300 command:"claude 'Add input validation to all API endpoints. Run tests after.'"
```

- `pty:true` is **mandatory** — Claude Code is a terminal app
- `workdir` scopes it to the right project (critical!)
- `timeout` prevents runaway sessions

### 2. Background Task with Monitoring

```bash
# Start
exec pty:true workdir:~/Projects/myapp background:true command:"claude 'Migrate from Express to Hono. Run tests.'"
# Returns sessionId

# Check progress
process action:log sessionId:XXX limit:50

# Check if done
process action:poll sessionId:XXX
```

### 3. Background with Auto-Notify

Append a wake trigger so you don't have to poll:

```bash
exec pty:true workdir:~/Projects/myapp background:true command:"claude 'Refactor auth module.

When completely finished, run: openclaw system event --text \"Done: Auth module refactored\" --mode now'"
```

### 4. PR Review (Safe)

**Never review in the live project dir.** Use worktrees:

```bash
# Create isolated worktree
git -C ~/Projects/myapp worktree add /tmp/pr-42-review pr-42-branch

# Review
exec pty:true workdir:/tmp/pr-42-review command:"claude 'Review this branch vs main. Focus on security and performance.'"

# Cleanup
git -C ~/Projects/myapp worktree remove /tmp/pr-42-review
```

### 5. Parallel Issue Fixing

```bash
# Create worktrees per issue
git -C ~/Projects/myapp worktree add -b fix/issue-10 /tmp/fix-10 main
git -C ~/Projects/myapp worktree add -b fix/issue-11 /tmp/fix-11 main

# Launch in parallel (stagger 30s apart — undici TLS bug)
exec pty:true workdir:/tmp/fix-10 background:true command:"claude 'Fix issue #10: ...'"
# wait 30s
exec pty:true workdir:/tmp/fix-11 background:true command:"claude 'Fix issue #11: ...'"

# Monitor both
process action:list
```

---

## Critical Rules

### DO
- ✅ Always use `pty:true`
- ✅ Always set `workdir` to the project directory
- ✅ Set `timeout` (300s for quick tasks, 600s for bigger ones)
- ✅ Use `background:true` for tasks >1 minute
- ✅ Use worktrees for PR reviews and parallel work
- ✅ Stagger parallel spawns 30s apart

### DON'T
- ❌ Never run Claude Code in `~/clawd/` — it reads SOUL.md/AGENTS.md and gets confused
- ❌ Never checkout branches in the live OpenClaw project dir
- ❌ Never pass credentials in the prompt — use env vars or config files
- ❌ Don't kill sessions just because they're slow
- ❌ Don't take over manually if Claude Code fails — respawn or escalate

---

## Integration with OpenClaw Workflows

### From sessions_spawn → Claude Code

When a spawned sub-agent needs to write code, it should use the coding-agent skill:

```
sessions_spawn task:"Read ~/clawd/AGENTS.md first. Use the coding-agent skill to add dark mode to ~/Projects/myapp. Test it. Commit with descriptive message."
```

The sub-agent reads the skill, launches Claude Code with proper PTY/workdir, and monitors it.

### From Cron → Claude Code

For scheduled code tasks (nightly builds, scheduled refactors):

```json
{
  "schedule": { "kind": "cron", "expr": "0 3 * * *", "tz": "America/Denver" },
  "payload": {
    "kind": "agentTurn",
    "message": "Read ~/clawd/AGENTS.md. Use coding-agent skill to run tests in ~/Projects/myapp and report failures."
  },
  "sessionTarget": "isolated"
}
```

### Credential Hygiene

Never put API keys or passwords in Claude Code prompts. Instead:
- Use `.env` files in the project directory
- Reference env vars: `"Use the API key from .env to..."`
- Or config files: `"Read creds from ~/clawd/config/.heygen-credentials"`

---

## Cost & Context Considerations

- Claude Code uses its own API key/subscription — separate from OpenClaw's model costs
- Each Claude Code session starts fresh (no memory of prior sessions)
- Keep prompts focused — Claude Code works best with clear, scoped tasks
- For multi-step work, one detailed prompt beats multiple small ones
- Browser automation inside Claude Code is possible but expensive — prefer spawning a browser sub-agent instead

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| "Not a git repository" | `cd project && git init` or check workdir |
| Hangs with no output | Missing `pty:true` |
| Reads wrong files | Wrong `workdir` — scope it tighter |
| OOM / Metro SIGKILL | Kill Ollama first: `ollama stop` (Mac mini memory pressure) |
| Agent loops on same error | Kill and respawn with more context in prompt |
| "Permission denied" | Check file permissions, may need `elevated:true` |

---

*This reference complements the coding-agent skill. For the full skill spec, see the OpenClaw built-in `coding-agent` skill.*
