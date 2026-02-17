# Deep Dive: rowboatlabs/rowboat

**URL:** https://github.com/rowboatlabs/rowboat
**Stars:** 7,461 (+700 today)
**Language:** TypeScript
**License:** Open source (desktop app)

## What It Is
Local-first AI coworker that connects to email/meetings, builds a persistent knowledge graph, and helps you act on it. Think "Obsidian + AI agent + memory."

## Architecture
- **Knowledge graph** stored as Obsidian-compatible Markdown with backlinks
- **Integrations:** Gmail, Granola (meeting notes), Fireflies
- **MCP support** — extensible with any MCP tool (search, databases, CRMs, etc.)
- **BYO model** — works with Ollama, LM Studio, or hosted APIs
- **Background agents** — can spin up repeatable automated workflows
- **Desktop app** — Mac/Windows/Linux

## Key Differentiators
1. **Memory that compounds** — not cold retrieval every session. Context accumulates.
2. **Inspectable** — all data is plain Markdown you can read/edit
3. **Background agents** — auto-draft emails, daily voice notes, project updates
4. **Voice memos** — via Deepgram, auto-captured into graph

## Comparison to Our Setup (Claw)
| Feature | Rowboat | Claw (us) |
|---------|---------|-----------|
| Memory | Knowledge graph (Markdown) | Tiered memory (MEMORY.md, facts, episodic, active) |
| Persistence | Obsidian vault | File-based in ~/clawd/memory/ |
| MCP | Yes, extensible | Yes, multiple servers |
| Background agents | Built-in | Cron + subagent spawning |
| Voice | Deepgram input | MLX Whisper input, claw-speak output |
| Integrations | Gmail, meeting notes | Twitter, GitHub, XPERIENCE |
| Model | BYO (Ollama, API) | Claude via OpenClaw |

## Lessons for Us
1. **Knowledge graph structure** — their backlink approach could improve our memory system. We use flat files; they use interconnected notes.
2. **Background agents as first-class** — we do this via cron, they make it a UI feature.
3. **Voice memo → graph** — they auto-extract key takeaways. Our process-voice-memo.py just transcribes.

## Assessment
- **Maturity:** Active development, desktop app shipping, 700 stars/day = strong momentum
- **Quality:** Well-documented, clear philosophy, clean architecture
- **Relevance:** HIGH — directly comparable to our agent+memory setup

## Action Items
- [ ] Review their knowledge graph schema for memory architecture ideas
- [ ] Check if their MCP tool integration has patterns we're missing
- [ ] Consider backlink-style connections between our memory files
