# Deep Dive: obra/superpowers

## Overview
- **Author:** Jesse Vincent (@obra) — known for RT (Request Tracker), Perl community
- **What:** A composable skills framework for coding agents, primarily Claude Code
- **License:** MIT
- **Maturity:** Active, plugin marketplace integration

## Architecture
Superpowers is a collection of **skills** (structured prompts/workflows) that auto-activate based on context. The agent checks for relevant skills before any task — they're mandatory workflows, not suggestions.

### Core Workflow
1. **Brainstorming** → Socratic design refinement before writing code
2. **Git Worktrees** → Isolated workspace on new branch
3. **Writing Plans** → Break work into 2-5 min tasks with exact file paths
4. **Subagent-Driven Dev** → Fresh subagent per task with two-stage review
5. **TDD** → RED-GREEN-REFACTOR enforced (deletes code written before tests)
6. **Code Review** → Reviews against plan, critical issues block progress
7. **Finishing Branch** → Verify tests, present merge options, cleanup

### Installation
- Claude Code: `/plugin marketplace add obra/superpowers-marketplace` then `/plugin install superpowers@superpowers-marketplace`
- Also supports Cursor, Codex, OpenCode

## Skills Library
- **Testing:** test-driven-development (RED-GREEN-REFACTOR)
- **Debugging:** systematic-debugging (4-phase root cause), verification-before-completion
- **Collaboration:** brainstorming, writing-plans, executing-plans, dispatching-parallel-agents, code review (requesting + receiving), git-worktrees, finishing branches, subagent-driven-development
- **Meta:** writing-skills, using-superpowers

## Comparison to Our System
| Feature | Superpowers | Our System (AGENTS.md + Ralph Loops) |
|---------|-------------|--------------------------------------|
| Skill format | Markdown SKILL.md files | Markdown prompts + scripts |
| Auto-activation | Yes, context-based | Manual invocation mostly |
| Subagent orchestration | Built-in (dispatching-parallel-agents) | sessions_spawn |
| TDD enforcement | Strict (deletes pre-test code) | Optional |
| Git workflow | Worktrees built-in | Manual branching |
| Plugin ecosystem | Claude Code marketplace | N/A |
| Memory/context | Not apparent | QMD + active.md + daily notes |

## Key Takeaways
1. **Auto-activation pattern is powerful** — skills trigger based on what the agent detects, not explicit commands
2. **Two-stage review** (spec compliance then code quality) is smart
3. **Subagent-per-task** with fresh context prevents drift — similar to our subagent spawning
4. **We have things they don't:** persistent memory, research pipeline, multi-channel comms
5. **They have things we don't:** auto-triggering skills, strict TDD enforcement, git worktree integration

## Recommendation
**Explore but don't adopt wholesale.** Cherry-pick patterns:
- Auto-activation trigger conditions for our skills
- Two-stage review pattern
- Consider publishing our skills as Claude Code plugins
