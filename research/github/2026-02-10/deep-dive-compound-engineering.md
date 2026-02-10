# Deep Dive: EveryInc/compound-engineering-plugin

## Overview
Claude Code plugin marketplace featuring a "compound engineering" workflow where each unit of work makes subsequent work easier.

## Key Details
- **By:** Every (Dan Shipper's company — every.to)
- **Status:** Active, published on npm as `@every-env/compound-plugin`
- **License:** Open source

## Core Workflow
**Plan → Work → Review → Compound → Repeat**

| Command | Purpose |
|---------|---------|
| `/workflows:plan` | Turn feature ideas into detailed implementation plans |
| `/workflows:work` | Execute plans with worktrees and task tracking |
| `/workflows:review` | Multi-agent code review before merging |
| `/workflows:compound` | Document learnings to make future work easier |

## Philosophy
- 80% planning and review, 20% execution
- Each cycle compounds knowledge
- Plans inform future plans
- Reviews catch more issues over time
- Patterns get documented and reused

## Cross-Platform Support
The plugin also converts Claude Code plugins to:
- **OpenCode format** — `bunx @every-env/compound-plugin install compound-engineering --to opencode`
- **Codex format** — `bunx @every-env/compound-plugin install compound-engineering --to codex`
- Can also sync personal Claude Code config (skills, MCP servers) to other formats

## Integration Potential
**Medium-high priority:**
- The compound philosophy aligns perfectly with our AGENTS.md self-improvement loop
- `/workflows:review` multi-agent review could enhance our code review process
- Cross-format conversion useful if we ever need OpenCode/Codex compatibility
- Install: `/plugin marketplace add https://github.com/EveryInc/compound-engineering-plugin`

## Links
- [Compound engineering: how Every codes with agents](https://every.to/chain-of-thought/compound-engineering-how-every-codes-with-agents)
- [The story behind compounding engineering](https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it)
