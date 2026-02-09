# Deep Dive: obra/superpowers

## Overview
Complete agentic software dev workflow by Jesse Vincent. Composable skills that auto-trigger during coding agent sessions.

## Core Workflow
1. **Brainstorming** → Socratic spec refinement, presented in digestible chunks
2. **Git Worktrees** → Isolated workspace on new branch
3. **Writing Plans** → Bite-sized tasks (2-5 min each) with exact file paths, complete code, verification
4. **Subagent-Driven Dev** → Fresh subagent per task, two-stage review (spec compliance → code quality)
5. **TDD** → RED-GREEN-REFACTOR enforced. Deletes code written before tests.
6. **Code Review** → Between tasks, blocks on critical issues
7. **Finishing** → Verify tests, merge/PR/keep/discard options

## Philosophy
- Test-Driven Development always
- Systematic over ad-hoc
- Complexity reduction as primary goal
- Evidence over claims

## Installation
- Claude Code: `/plugin marketplace add obra/superpowers-marketplace` then `/plugin install superpowers@superpowers-marketplace`
- Also supports Codex and OpenCode

## Key Insight
"Agents work autonomously for a couple hours at a time without deviating from the plan." This is the promise — structured enough that AI stays on track, flexible enough to handle real projects.

## Comparison to Our System
| Feature | Superpowers | Our Ralph Loops |
|---------|-------------|-----------------|
| Spec phase | Socratic brainstorming | Template-based |
| Execution | Subagent per task | Loop iterations |
| Testing | Enforced TDD | Optional |
| Review | Two-stage automated | Manual |
| Platform | Claude Code plugin | Shell scripts |

## Relevance
- **High** — Directly applicable patterns for improving our agent workflows
- TDD enforcement and two-stage review could be adopted
- Subagent-per-task pattern aligns with our multi-agent approach

## Action Items
- [ ] Study skill format for potential adoption in our skills
- [ ] Consider adopting enforced TDD pattern
- [ ] Evaluate as Claude Code plugin for Marb's direct coding work
