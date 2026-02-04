# Claude Code Advanced Features: Tasks & Multi-Agent Systems

*Research compiled: January 24, 2026*

## Table of Contents
1. [Executive Summary](#executive-summary)
2. [Task List System](#task-list-system)
3. [Subagents - Built-in Multi-Agent Architecture](#subagents)
4. [Agent SDK for Programmatic Control](#agent-sdk)
5. [Skills System](#skills-system)
6. [Multi-Session Collaboration Patterns](#multi-session-collaboration)
7. [GitHub Actions Integration](#github-actions)
8. [Suggested Workflows for Marb + Claw](#suggested-workflows)
9. [Environment Variables Reference](#environment-variables)
10. [Code Examples](#code-examples)

---

## Executive Summary

Claude Code has evolved into a sophisticated multi-agent development environment. Key capabilities include:

- **Task List System**: Built-in task tracking that persists across context compactions, with shared task lists across sessions via `CLAUDE_CODE_TASK_LIST_ID`
- **Subagents**: Specialized AI assistants running in isolated contexts with custom prompts, tool restrictions, and permissions
- **Agent SDK**: Python and TypeScript packages for programmatic control (headless mode via `claude -p`)
- **Skills**: Reusable prompts and workflows that can be invoked with `/skill-name`
- **GitHub Actions**: AI-powered automation with `@claude` mentions in PRs/issues

---

## Task List System

### Overview

When working on complex, multi-step work, Claude creates a task list to track progress. Tasks appear in the status area of your terminal with indicators showing what's pending, in progress, or complete.

### Key Features

- **Ctrl+T**: Toggle the task list view (shows up to 10 tasks at a time)
- **Persistence**: Tasks persist across context compactions
- **Interactive Management**: Ask Claude "show me all tasks" or "clear all tasks"
- **Tools Available**:
  - `TaskCreate` - Creates a new task in the task list
  - `TaskGet` - Retrieves full details for a specific task  
  - `TaskList` - Lists all tasks with their current status
  - `TaskUpdate` - Updates task status, dependencies, or details
  - `TaskOutput` - Retrieves output from a background task

### Shared Task Lists (Multi-Session Collaboration)

```bash
# Share a task list across multiple Claude Code sessions
export CLAUDE_CODE_TASK_LIST_ID=my-project
claude

# In another terminal, same task list:
CLAUDE_CODE_TASK_LIST_ID=my-project claude
```

**Location**: Tasks are stored in `~/.claude/tasks/` when using a named task list ID.

### Task List Storage

Default location: `~/.claude/todos/` (per-session JSON files)

When `CLAUDE_CODE_TASK_LIST_ID` is set, tasks are stored in:
`~/.claude/tasks/{task-list-id}/`

---

## Subagents

### Overview

Subagents are specialized AI assistants that handle specific types of tasks. Each subagent runs in its own context window with:
- Custom system prompt
- Specific tool access
- Independent permissions
- Configurable model (can use cheaper models like Haiku for exploration)

### Built-in Subagents

| Agent | Model | Tools | Purpose |
|-------|-------|-------|---------|
| **Explore** | Haiku | Read-only | Fast codebase search and analysis |
| **Plan** | Inherit | Read-only | Research for planning in plan mode |
| **General-purpose** | Inherit | All | Complex multi-step operations |

### Creating Custom Subagents

**Location options:**
- `~/.claude/agents/` - Personal (all projects)
- `.claude/agents/` - Project-specific (commit to git)
- `--agents` CLI flag - Session-only

**Example: Security Reviewer**

```markdown
# ~/.claude/agents/security-reviewer.md

---
name: security-reviewer
description: Reviews code for security vulnerabilities
tools: Read, Grep, Glob, Bash
model: opus
---

You are a senior security engineer. Review code for:
- Injection vulnerabilities (SQL, XSS, command injection)
- Authentication and authorization flaws
- Secrets or credentials in code
- Insecure data handling

Provide specific line references and suggested fixes.
```

**Example: Code Reviewer**

```markdown
---
name: code-reviewer
description: Expert code review specialist. Proactively reviews code for quality, security, and maintainability.
tools: Read, Grep, Glob, Bash
model: inherit
---

You are a senior code reviewer ensuring high standards of code quality.

When invoked:
1. Run git diff to see recent changes
2. Focus on modified files
3. Begin review immediately

Review checklist:
- Code is clear and readable
- Proper error handling
- No exposed secrets
- Good test coverage
```

### Subagent Configuration Fields

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Unique identifier (lowercase, hyphens) |
| `description` | Yes | When Claude should use this subagent |
| `tools` | No | Allowed tools (inherits all if omitted) |
| `disallowedTools` | No | Tools to deny |
| `model` | No | `sonnet`, `opus`, `haiku`, or `inherit` |
| `permissionMode` | No | `default`, `acceptEdits`, `dontAsk`, `bypassPermissions`, `plan` |
| `skills` | No | Skills to preload into context |
| `hooks` | No | Lifecycle hooks for this subagent |

### Invoking Subagents

```
# Explicit invocation
Use the security-reviewer subagent to analyze the auth module

# Claude decides automatically based on task
Analyze this code for vulnerabilities
```

### Background vs Foreground

- **Foreground**: Blocks main conversation, prompts pass through
- **Background**: Runs concurrently, auto-denies unapproved permissions

Press **Ctrl+B** to background a running task.

---

## Agent SDK

### Overview

The Agent SDK provides programmatic control over Claude Code through:
- CLI (`claude -p`) for scripts and CI/CD
- Python package
- TypeScript package

### Headless Mode (CLI)

```bash
# Basic query
claude -p "What does the auth module do?"

# With structured output
claude -p "List all API endpoints" --output-format json

# Streaming for real-time
claude -p "Analyze this log file" --output-format stream-json

# Auto-approve specific tools
claude -p "Run tests and fix failures" --allowedTools "Bash,Read,Edit"

# Continue conversations
claude -p "Review this codebase"
claude -p "Focus on database queries" --continue

# Resume specific session
session_id=$(claude -p "Start a review" --output-format json | jq -r '.session_id')
claude -p "Continue review" --resume "$session_id"

# JSON Schema validation
claude -p "Extract function names from auth.py" \
  --output-format json \
  --json-schema '{"type":"object","properties":{"functions":{"type":"array","items":{"type":"string"}}}}'
```

### CLI Key Flags

| Flag | Description |
|------|-------------|
| `-p, --print` | Run non-interactively |
| `--output-format` | `text`, `json`, `stream-json` |
| `--allowedTools` | Auto-approve specific tools |
| `--continue, -c` | Resume most recent conversation |
| `--resume, -r` | Resume specific session |
| `--max-turns` | Limit agentic turns |
| `--max-budget-usd` | Maximum spend |
| `--model` | Specify model |
| `--agents` | Define subagents via JSON |
| `--dangerously-skip-permissions` | Bypass all permission checks |

### Agent SDK Links

- Python: `https://platform.claude.com/docs/en/agent-sdk/python`
- TypeScript: `https://platform.claude.com/docs/en/agent-sdk/typescript`

---

## Skills System

### Overview

Skills extend Claude's knowledge with reusable prompts and workflows. They can be:
- **Automatically invoked** by Claude based on context
- **Manually invoked** with `/skill-name`

### Creating Skills

**Location:**
- `~/.claude/skills/<name>/SKILL.md` - Personal
- `.claude/skills/<name>/SKILL.md` - Project

**Example: Fix Issue Workflow**

```markdown
# .claude/skills/fix-issue/SKILL.md

---
name: fix-issue
description: Fix a GitHub issue
disable-model-invocation: true
---

Analyze and fix the GitHub issue: $ARGUMENTS.

1. Use `gh issue view` to get the issue details
2. Understand the problem described
3. Search the codebase for relevant files
4. Implement necessary changes
5. Write and run tests
6. Ensure code passes linting
7. Create a descriptive commit
8. Push and create a PR
```

**Invocation:** `/fix-issue 1234`

### Skill Frontmatter Fields

| Field | Description |
|-------|-------------|
| `name` | Skill identifier |
| `description` | When to use (for Claude's decision) |
| `argument-hint` | Autocomplete hint, e.g., `[issue-number]` |
| `disable-model-invocation` | Only manual trigger |
| `user-invocable` | Set `false` for background knowledge |
| `allowed-tools` | Restrict tool access |
| `model` | Model to use |
| `context` | Set `fork` to run in subagent |
| `agent` | Which subagent for forked context |

### Dynamic Context Injection

```markdown
---
name: pr-summary
description: Summarize PR changes
context: fork
agent: Explore
---

## Pull request context
- PR diff: !`gh pr diff`
- PR comments: !`gh pr view --comments`
- Changed files: !`gh pr diff --name-only`

Summarize this pull request...
```

The `!command` syntax runs commands **before** sending to Claude.

---

## Multi-Session Collaboration

### Writer/Reviewer Pattern

```bash
# Session A (Writer)
claude
> Implement a rate limiter for our API endpoints

# Session B (Reviewer) - separate terminal
claude
> Review the rate limiter implementation in @src/middleware/rateLimiter.ts

# Session A continues
> Address the review feedback: [paste from Session B]
```

### Parallel Research with Subagents

```
Research the authentication, database, and API modules in parallel using separate subagents
```

Each subagent explores independently, synthesizing findings.

### Git Worktrees for Parallel Work

```bash
# Create isolated worktree
git worktree add ../project-feature-auth -b feature/auth

# Work in worktree
cd ../project-feature-auth
claude
```

### Shared Task List Pattern

```bash
# Terminal 1: Main session
export CLAUDE_CODE_TASK_LIST_ID=project-refactor
claude
> Create a task list for refactoring the auth module

# Terminal 2: Sub-task worker
export CLAUDE_CODE_TASK_LIST_ID=project-refactor
claude
> Work on the next pending task from the task list
```

---

## GitHub Actions Integration

### Basic Setup

```yaml
name: Claude Code
on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]
jobs:
  claude:
    runs-on: ubuntu-latest
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
```

### Using Skills in GitHub Actions

```yaml
- uses: anthropics/claude-code-action@v1
  with:
    anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
    prompt: "/review"
    claude_args: "--max-turns 5"
```

### Common @claude Commands

```
@claude implement this feature based on the issue
@claude fix the TypeError in the dashboard
@claude review this PR for security issues
```

---

## Suggested Workflows for Marb + Claw

### 1. Research & Implementation Split

```bash
# Claw: Research Phase
export CLAUDE_CODE_TASK_LIST_ID=feature-xyz
claude --permission-mode plan
> Research how to implement feature XYZ. Create detailed task list.

# Marb: Execute tasks
export CLAUDE_CODE_TASK_LIST_ID=feature-xyz
claude
> Work through the pending tasks, implementing each one.
```

### 2. Code Review Pipeline

```markdown
# .claude/agents/marb-reviewer.md
---
name: marb-reviewer
description: Marb's code review assistant
tools: Read, Grep, Glob, Bash
model: sonnet
---

Review code changes with focus on:
- Architecture alignment with project patterns
- Performance implications
- Security considerations
- Test coverage

Always check git diff against main branch first.
```

### 3. Subagent-Based Project Management

```markdown
# .claude/skills/project-sync/SKILL.md
---
name: project-sync
description: Sync project status between Marb and Claw sessions
disable-model-invocation: true
---

1. Read current task list from shared location
2. Update status of completed items
3. Identify blockers or questions for human review
4. Log session summary to project notes
```

### 4. Clawdbot Integration Pattern

```bash
# In Clawdbot, spawn Claude Code subagent for deep work
# Main agent handles orchestration, subagent handles implementation

# Example skill for Clawdbot to use:
# .claude/skills/deep-implementation/SKILL.md
---
name: deep-implementation
description: Intensive coding session for complex features
context: fork
agent: general-purpose
---

Implement $ARGUMENTS with full focus:
1. Understand requirements thoroughly
2. Design solution architecture
3. Implement incrementally with tests
4. Document changes
5. Prepare PR summary
```

---

## Environment Variables

### Core Variables

| Variable | Purpose |
|----------|---------|
| `CLAUDE_CODE_TASK_LIST_ID` | Share task list across sessions |
| `ANTHROPIC_API_KEY` | API key for Claude |
| `ANTHROPIC_MODEL` | Default model name |
| `MAX_THINKING_TOKENS` | Override thinking token budget (0 to disable) |
| `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS` | Set to 1 to disable background tasks |
| `CLAUDE_CODE_EXIT_AFTER_STOP_DELAY` | Auto-exit after idle (ms) |
| `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` | Trigger compaction earlier (1-100) |

### Model Configuration

| Variable | Purpose |
|----------|---------|
| `ANTHROPIC_DEFAULT_SONNET_MODEL` | Default Sonnet model |
| `ANTHROPIC_DEFAULT_OPUS_MODEL` | Default Opus model |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL` | Default Haiku model |
| `CLAUDE_CODE_SUBAGENT_MODEL` | Model for subagents |

### Cloud Provider Variables

| Variable | Purpose |
|----------|---------|
| `CLAUDE_CODE_USE_BEDROCK` | Use AWS Bedrock |
| `CLAUDE_CODE_USE_VERTEX` | Use Google Vertex AI |
| `CLAUDE_CODE_USE_FOUNDRY` | Use Microsoft Foundry |

---

## Code Examples

### Python: Headless Claude Code Integration

```python
import subprocess
import json

def run_claude(prompt, output_format="json"):
    result = subprocess.run(
        ["claude", "-p", prompt, "--output-format", output_format],
        capture_output=True,
        text=True
    )
    if output_format == "json":
        return json.loads(result.stdout)
    return result.stdout

# Example usage
response = run_claude("List all Python files in this project")
print(response.get("result"))
```

### Bash: Multi-Agent Workflow

```bash
#!/bin/bash
# multi-agent-workflow.sh

PROJECT_ID="feature-auth-refactor"
export CLAUDE_CODE_TASK_LIST_ID=$PROJECT_ID

# Phase 1: Planning (read-only)
claude --permission-mode plan -p "
Analyze the authentication module and create a detailed 
refactoring plan with tasks. Save to task list.
"

# Phase 2: Implementation (with permissions)
claude -p "
Work through the task list, implementing each task.
Commit after each completed task.
" --allowedTools "Bash,Read,Edit,Write"

# Phase 3: Review
claude -p "
Use a subagent to review all changes made.
Update task list with review findings.
"
```

### CLAUDE.md for Multi-Agent Projects

```markdown
# CLAUDE.md

## Project Context
This project uses multi-agent workflows. Multiple Claude Code sessions
may be working on different parts simultaneously.

## Shared Resources
- Task list ID: Use CLAUDE_CODE_TASK_LIST_ID=project-main
- Coordinate via ~/.claude/tasks/project-main/

## Subagents Available
- `security-reviewer`: Run security analysis
- `code-reviewer`: Standard code review
- `test-runner`: Execute and fix tests

## Workflow Rules
1. Always check task list before starting work
2. Update task status when completing items
3. Use subagents for specialized reviews
4. Commit atomically per feature/fix
```

---

## Additional Resources

### Official Documentation
- Best Practices: https://code.claude.com/docs/en/best-practices
- Subagents: https://code.claude.com/docs/en/sub-agents
- Skills: https://code.claude.com/docs/en/skills
- Headless Mode: https://code.claude.com/docs/en/headless
- Settings: https://code.claude.com/docs/en/settings

### Community
- Claude Developers Discord: https://anthropic.com/discord
- GitHub Issues: https://github.com/anthropics/claude-code/issues
- GitHub Actions: https://github.com/anthropics/claude-code-action

---

*Note: Some Agent SDK pages (Python/TypeScript) returned loading states during research. Check the official platform documentation for the latest SDK details.*
