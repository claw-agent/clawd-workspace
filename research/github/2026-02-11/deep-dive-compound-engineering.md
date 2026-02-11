# Deep Dive: EveryInc/compound-engineering-plugin

## Overview
Official Claude Code plugin implementing the compound engineering methodology from Every.to.

## Workflow
Plan → Work → Review → Compound → Repeat

| Command | Purpose |
|---------|---------|
| /workflows:plan | Feature ideas → detailed implementation plans |
| /workflows:work | Execute plans with worktrees and task tracking |
| /workflows:review | Multi-agent code review before merging |
| /workflows:compound | Document learnings for future work |

## Philosophy
"Each unit of engineering work should make subsequent units easier—not harder."
- 80% planning and review, 20% execution
- Inverts traditional tech debt accumulation

## Cross-Tool Support
The plugin includes a CLI that converts Claude Code plugins to:
- **OpenCode** format (~/.config/opencode)
- **Codex** format (~/.codex/prompts and ~/.codex/skills)
- Also syncs personal Claude Code config (skills, MCP servers) across tools

## Relevance
Our AGENTS.md already implements this pattern (Plan → Work → Review → Compound cycle). This plugin formalizes it with:
- Git worktree-based development
- Multi-agent review
- Automated knowledge capture

## Action Items
- Consider installing: `/plugin marketplace add https://github.com/EveryInc/compound-engineering-plugin`
- The sync tool for porting skills across Claude Code/OpenCode/Codex is independently useful
- Read the full article: https://every.to/chain-of-thought/compound-engineering-how-every-codes-with-agents
