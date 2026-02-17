# Deep Dive: letta-ai/letta-code

**URL:** https://github.com/letta-ai/letta-code
**Stars:** 1,532 (+22 today)
**Language:** TypeScript
**By:** Letta AI (formerly MemGPT team)

## What It Is
Memory-first coding harness built on Letta API. A persisted coding agent that learns across sessions, portable across models (Claude, GPT, Gemini, GLM, etc).

## Key Philosophy
Session-based (Claude Code, Codex) vs Agent-based (Letta Code):
- Sessions are independent vs same agent across sessions
- No learning vs persistent memory + learning
- Context = current messages + AGENTS.md vs accumulated knowledge
- "New contractor every time" vs "coworker that remembers"

## Key Commands
- `/init` — initialize agent's memory system
- `/remember [instructions]` — actively guide agent memory
- `/skill [instructions]` — learn reusable skill from current trajectory
- `/clear` — new conversation but memory persists
- `/connect` — configure LLM API keys
- `/model` — swap models (memory portable across models!)

## Skill Learning
Most interesting feature: agent can learn skills from its own work trajectories. Uses a `.skills` directory for reusable modules. This is automated pattern capture.

## Comparison to Our Setup
| Feature | Letta Code | Claw |
|---------|-----------|------|
| Memory | Letta API (server-side) | File-based (active.md, facts, episodic) |
| Skill learning | Automatic from trajectories | Manual (skills/ directory) |
| Model portability | Yes, any model | Claude-specific |
| Session continuity | Same agent always | Context recovery via active.md |
| Architecture | Client → Letta API server | OpenClaw → Claude API |

## Lessons for Us
1. **Skill learning from trajectories** — we manually write skills. They auto-capture. Could we build a `/skill` equivalent that captures patterns from successful work?
2. **Model-portable memory** — their memory format works across models. Our AGENTS.md is Claude-specific.
3. **Explicit memory commands** — `/remember` is cleaner than our "update active.md" convention.

## Assessment
- **Maturity:** Early (1.5K stars) but from MemGPT team = strong pedigree
- **Quality:** Clean design, good docs, clear philosophy
- **Relevance:** MEDIUM-HIGH — skill learning concept is worth adopting

## Action Items
- [ ] Prototype automated skill capture from successful task completions
- [ ] Consider explicit `/remember` style commands in our workflow
