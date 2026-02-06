# Deep Dive: openai/codex

**Date:** 2026-02-05  
**URL:** https://github.com/openai/codex  
**Language:** Rust  
**License:** Apache-2.0  

---

## What It Does

**Codex CLI** is OpenAI's terminal-based coding agent — a direct competitor to Claude Code.

Key points:
- Runs locally on your computer
- Written in Rust (performance-focused)
- Integrates with ChatGPT plans (Plus, Pro, Team, Enterprise)
- Also available as IDE extension (VS Code, Cursor, Windsurf)

---

## Installation

```bash
# npm
npm install -g @openai/codex

# Homebrew
brew install --cask codex
```

Then just run `codex` to start.

---

## Authentication

Two options:
1. **Sign in with ChatGPT** (recommended) — Uses your existing plan
2. **API key** — Requires additional setup

---

## Architecture Comparison: Codex vs Claude Code

| Aspect | OpenAI Codex | Claude Code |
|--------|-------------|-------------|
| Language | Rust | TypeScript |
| Model | GPT-4+ | Claude |
| Auth | ChatGPT plans | Anthropic API |
| Extensibility | Skills catalog | Plugins/hooks |
| IDE Integration | Yes | Yes (via extensions) |
| Local-first | Yes | Yes |

---

## The "Skills" Ecosystem

OpenAI also published `openai/skills` — a Skills Catalog for Codex. This is their version of Claude Code plugins/hooks.

Worth monitoring to see:
- What skills they prioritize
- How they structure capabilities
- Patterns we could adopt

---

## Competitive Analysis

### Why This Matters
OpenAI is now directly competing with Claude Code at the CLI level:
- Same local-first approach
- Similar IDE integrations
- Backed by ChatGPT's massive user base

### Implications
1. **Validation** — Terminal-based AI coding is clearly the future
2. **Competition** — May drive innovation in both ecosystems
3. **Interop** — Tools like `cc-switch` (also trending) let users switch between them

### Our Position
We're deep in the Claude ecosystem. Not switching, but worth:
- Understanding competitor approaches
- Borrowing good ideas
- Staying aware of feature parity

---

## Recommendation

**Action: WATCH**

Not adopting, but track for:
1. Feature comparisons with Claude Code
2. Skills catalog patterns
3. Competitive positioning

This is "know your competition" research, not integration target.

---

## Related Trending
- `openai/skills` — Skills Catalog (also trending today)
- `farion1231/cc-switch` — Switch between Codex/Claude Code/Gemini CLI

---

## Links
- [Documentation](https://developers.openai.com/codex)
- [IDE Installation](https://developers.openai.com/codex/ide)
- [Codex Web](https://chatgpt.com/codex) — Cloud version

---

*Deep Dive by Scout Beta | 2026-02-05*
