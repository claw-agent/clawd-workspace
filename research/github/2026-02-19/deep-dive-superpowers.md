# Deep Dive: obra/superpowers

## Overview
- **Repo:** https://github.com/obra/superpowers
- **Stars:** 54,751 (+868 today)
- **Language:** Shell (skills are markdown/prompt-based)
- **License:** Not specified in README
- **Author:** Jesse Vincent (@obra) — well-known open source contributor

## What It Does
Superpowers is a composable skills framework for coding agents. It provides a structured software development workflow:

1. **Brainstorming** — Agent asks clarifying questions before coding, refines ideas, saves design doc
2. **Git Worktrees** — Creates isolated workspace on new branch, verifies clean test baseline
3. **Writing Plans** — Breaks work into 2-5 min tasks with exact file paths, code, verification steps
4. **Subagent-Driven Development** — Dispatches fresh subagent per task with two-stage review
5. **Test-Driven Development** — Enforces RED-GREEN-REFACTOR cycle
6. **Code Review** — Reviews against plan, reports issues by severity
7. **Branch Finishing** — Verifies tests, presents merge/PR/keep/discard options

## Platform Support
- **Claude Code** — via Plugin Marketplace (`/plugin marketplace add obra/superpowers-marketplace`)
- **Cursor** — via Plugin Marketplace
- **Codex** — manual setup via URL fetch
- **OpenCode** — manual setup via URL fetch

## Relevance to Us
**HIGH.** We already have a similar approach with AGENTS.md, but superpowers is more formalized:
- Their subagent-driven-development maps to our multi-agent spawning
- Their brainstorming skill is similar to our planning workflow
- Their TDD enforcement could improve our code quality

## Key Differences from Our Setup
- They focus on coding workflows; we have broader agent capabilities (research, monitoring, comms)
- Their skills auto-trigger; ours are more manual
- They use git worktrees extensively; we could adopt this

## Action Items
- [ ] Try installing in a Claude Code session to evaluate
- [ ] Review specific skills for patterns we can adopt
- [ ] Consider if their plugin marketplace model could work for our skills
