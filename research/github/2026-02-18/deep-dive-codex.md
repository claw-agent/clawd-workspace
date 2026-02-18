# Deep Dive: openai/codex

## Overview
OpenAI's terminal-based coding agent. Written in Rust. Direct competitor to Claude Code.

## Key Details
- **Install:** `npm i -g @openai/codex` or `brew install --cask codex`
- **Auth:** ChatGPT plan (Plus, Pro, Team, Edu, Enterprise) or API key
- **Platforms:** macOS (arm64, x86_64), Linux (x86_64, arm64)
- **IDE plugins:** VS Code, Cursor, Windsurf
- **Desktop app:** `codex app` command
- **Cloud version:** chatgpt.com/codex

## Architecture
- Rust binary (fast, low overhead)
- npm/brew distribution
- Multiple form factors: CLI, desktop app, IDE extension, web
- Apache-2.0 licensed

## Comparison with Claude Code
| Feature | Codex | Claude Code |
|---------|-------|-------------|
| Language | Rust | TypeScript |
| Auth | ChatGPT plan / API key | Anthropic API key |
| IDE support | VS Code, Cursor, Windsurf | VS Code |
| Desktop app | Yes | No |
| Cloud version | Yes | No |
| License | Apache-2.0 | Proprietary |

## Relevance to Us
- **Medium** — We're deep in Claude Code ecosystem, but worth tracking as competitive intelligence
- OpenAI pushing multi-form-factor approach (CLI + desktop + cloud + IDE)
- Rust choice suggests performance focus

## Verdict
Track but don't switch. Our Claude Code setup is deeply integrated. The multi-form-factor approach (CLI/desktop/cloud/IDE) is worth noting as a trend.
