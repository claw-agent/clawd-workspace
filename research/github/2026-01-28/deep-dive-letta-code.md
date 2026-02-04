# Deep Dive: letta-ai/letta-code

**URL:** https://github.com/letta-ai/letta-code
**Language:** TypeScript
**Category:** Coding Agent
**Relevance:** ⭐⭐⭐⭐ (Alternative agent paradigm)

## Overview

Letta Code is a "memory-first" coding harness. The core philosophy: instead of independent sessions, you work with a **persisted agent** that learns over time and is portable across models.

## Philosophy Comparison

| Aspect | Claude Code / Codex | Letta Code |
|--------|-------------------|------------|
| Sessions | Independent | Same agent across sessions |
| Learning | No learning between sessions | Persistent memory |
| Context | Messages + AGENTS.md | Full memory system |
| Relationship | New contractor each time | Coworker who remembers |

## Key Differentiator

Every coding session is tied to the same agent. `/clear` starts a new conversation, but **memory persists**. The agent genuinely learns and improves over time.

## Model Support

Portable across major models:
- Claude Sonnet/Opus 4.5
- GPT-5.2-Codex
- Gemini 3 Pro
- GLM-4.7
- And more via `/connect` command

## Core Commands

### Memory Management
```bash
/init      # Initialize agent's memory system
/remember  # Guide agent to remember something
/clear     # New conversation, memory persists
```

### Skill Learning
```bash
/skill [optional instructions]  # Learn skill from current trajectory
```

The agent can learn **reusable modules** from its own work and store them in a `.skills` directory.

## Installation

```bash
npm install -g @letta-ai/letta-code
cd your-project
letta
```

### Configuration
- `/connect` — Set up your own LLM API keys
- `/model` — Swap models on the fly
- `LETTA_BASE_URL` — Connect to Docker server for self-hosting

## Architecture

Built on top of the **Letta API** (https://app.letta.com/):
- Agents are stored in Letta's cloud
- Memory persists across sessions
- Skill learning creates reusable modules

## Implications for Clawdbot

### What Letta Gets Right
1. **Same agent, always** — Clawdbot already does this via AGENTS.md + MEMORY.md
2. **Explicit memory commands** — `/remember` is similar to our "write it down" principle
3. **Skill learning** — Formalized way to learn from experience

### What We Could Adopt

1. **Skill Files Format**
   - Structured `.skills/` directory
   - Reusable modules for common tasks
   - Could formalize our `skills/` folder format

2. **Memory Initialization**
   - `/init` equivalent for new projects
   - Bootstrap memory with project context

3. **Explicit Remember Command**
   - Maybe add `/remember` to Clawdbot
   - More intentional than implicit memory capture

### What We Do Differently

Our approach with AGENTS.md + daily memory files has advantages:
- **Human-readable** — Can inspect and edit memory manually
- **No cloud dependency** — Files stay local
- **Git-friendly** — Memory is versioned with code

## Technical Details

- NPM package: `@letta-ai/letta-code`
- AUR packages available for Arch Linux
- Docs: https://docs.letta.com/letta-code
- Discord: https://discord.gg/letta

## Action Items

1. [ ] Try Letta Code on a test project
2. [ ] Compare memory quality vs. our AGENTS.md approach
3. [ ] Evaluate skill learning feature
4. [ ] Consider hybrid: Letta for coding, our approach for personal assistance

## Questions to Explore

1. How does their memory compression work long-term?
2. What's the token cost compared to our approach?
3. Can skills be shared between agents?
4. How does model portability actually work in practice?

## Links

- GitHub: https://github.com/letta-ai/letta-code
- Docs: https://docs.letta.com/letta-code
- NPM: https://www.npmjs.com/package/@letta-ai/letta-code
- Blog: https://www.letta.com/blog/skill-learning
