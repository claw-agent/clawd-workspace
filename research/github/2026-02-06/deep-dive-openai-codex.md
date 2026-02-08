# Deep Dive: openai/codex

**URL:** https://github.com/openai/codex
**Language:** Rust
**License:** Apache 2.0

## Overview

OpenAI's Codex CLI is a lightweight coding agent that runs locally in your terminal. Written in Rust for performance. Integrates with ChatGPT Plus/Pro plans.

## Key Features

### Implementation
- **Written in Rust** — Performance-focused, compiled binaries
- **Lightweight** — Minimal footprint compared to JS-based alternatives
- **Local Execution** — Runs on your machine
- **ChatGPT Integration** — Use with existing Plus/Pro subscription

### Installation Options

```bash
# npm
npm install -g @openai/codex

# Homebrew
brew install --cask codex

# Direct binary download from GitHub releases
```

### Authentication

1. **Sign in with ChatGPT** — Use existing Plus/Pro/Team/Edu/Enterprise plan
2. **API Key** — Requires additional setup

## Platform Binaries

- macOS Apple Silicon: `codex-aarch64-apple-darwin.tar.gz`
- macOS x86_64: `codex-x86_64-apple-darwin.tar.gz`
- Linux x86_64: `codex-x86_64-unknown-linux-musl.tar.gz`
- Linux arm64: `codex-aarch64-unknown-linux-musl.tar.gz`

## Comparison to Competitors

| Feature | OpenAI Codex | Claude Code | Gemini CLI |
|---------|--------------|-------------|------------|
| Language | Rust | TypeScript | TypeScript |
| Model | GPT-4o? | Claude 4 | Gemini 3 |
| Free Tier | Via ChatGPT plan | API costs | 1000/day |
| Performance | Fast (Rust) | Good | Good |
| Open Source | Yes (Apache 2.0) | No | Yes (Apache 2.0) |
| Size | Small | Larger | Medium |

## Observations

### Pros
- **Rust = Fast** — Noticeably snappier than JS-based tools
- **Leverages ChatGPT Sub** — No additional API costs if you're already paying
- **Apache 2.0** — Friendly license
- **Simple** — Minimal, focused tool

### Cons
- **Less Documentation** — README is sparse compared to Gemini CLI
- **Fewer Features** — No mention of MCP, search grounding, etc.
- **OpenAI Lock-in** — Only works with OpenAI models

## Recommendation

**Watch but don't prioritize.** We're deep in the Claude ecosystem with good results. OpenAI Codex is interesting technically (Rust implementation) but doesn't offer compelling advantages over Claude Code.

Worth monitoring for:
- Rust patterns for CLI agents
- OpenAI's approach to local execution
- Feature parity with Claude Code

## Resources

- Documentation: https://developers.openai.com/codex
- IDE Integration: https://developers.openai.com/codex/ide
- Web Version: https://chatgpt.com/codex
