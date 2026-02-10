# Deep Dive: obra/superpowers

## Overview
Agentic skills framework & software development methodology by Jesse Vincent. Composable skills that enforce structured development workflows for coding agents.

## Key Details
- Works with Claude Code (plugin), Codex, OpenCode
- Skills auto-trigger based on context — mandatory workflows, not suggestions
- Core flow: Brainstorm → Design → Plan → Subagent-driven Development → Review → Ship

## Skills Library
**Testing:** TDD (red-green-refactor), anti-patterns reference
**Debugging:** Systematic 4-phase root cause, verification-before-completion
**Collaboration:** Brainstorming, planning, parallel agents, code review, git worktrees
**Meta:** Writing new skills, using the system

## Philosophy
- Test-Driven Development always
- Systematic over ad-hoc
- Complexity reduction
- Evidence over claims
- YAGNI + DRY

## What Makes It Different
- **Subagent-driven development** — fresh subagent per task with two-stage review
- **Git worktrees** — isolated branches per feature
- **Plans are explicit** — 2-5 min tasks with exact file paths, complete code, verification steps
- Skills are designed for "an enthusiastic junior engineer with poor taste, no judgement"

## Comparison to Our System
- Our AGENTS.md already has similar principles (self-review, completion mindset, sub-agents)
- Superpowers is more structured/rigid — mandatory TDD, mandatory brainstorming
- Their subagent-driven-development with two-stage review is worth adopting
- Git worktrees pattern could improve our workflow

## Assessment
- **Maturity:** Active, by well-known dev (Jesse Vincent / obra)
- **Quality:** Well-structured skills, clear documentation
- **Relevance:** High — directly applicable to how we work
- **Risk:** None (MIT license, just methodology)

## Verdict
[Explore] — Install the plugin and try it. Cherry-pick the best patterns (subagent two-stage review, git worktrees workflow) into our AGENTS.md.
