# Deep Dive: google-gemini/gemini-cli

**URL:** https://github.com/google-gemini/gemini-cli
**Language:** TypeScript
**License:** Apache 2.0

## Overview

Gemini CLI is Google's open-source AI agent that brings Gemini models directly to the terminal. It's positioned as a direct competitor to Claude Code and OpenAI Codex.

## Key Features

### Free Tier (Excellent)
- **60 requests/minute**
- **1,000 requests/day**
- No API key required — just Google account OAuth
- Gemini 3 models with **1M token context window**

### Built-in Tools
- Google Search grounding (real-time info)
- File system operations
- Shell commands
- Web fetching
- MCP server integration

### Unique Capabilities
- **Conversation Checkpointing** — Save and resume complex sessions
- **GEMINI.md Context Files** — Project-specific context (like our AGENTS.md!)
- **GitHub Action Integration** — PR reviews, issue triage, @gemini-cli mentions
- **Token Caching** — Optimize token usage
- **Sandboxing** — Safe execution environments

## Installation

```bash
# Quick start (no install)
npx @google/gemini-cli

# Global install
npm install -g @google/gemini-cli

# Homebrew
brew install gemini-cli
```

## Authentication Options

1. **Login with Google (OAuth)** — Free tier, easiest
2. **Gemini API Key** — For specific model control
3. **Vertex AI** — Enterprise, higher limits

## Comparison to Claude Code

| Feature | Claude Code | Gemini CLI |
|---------|-------------|------------|
| Context Window | 200K | 1M |
| Free Tier | Expensive API | 1000 req/day free |
| MCP Support | Yes | Yes |
| Project Context | CLAUDE.md | GEMINI.md |
| Search Grounding | No built-in | Google Search |
| Open Source | No | Yes (Apache 2.0) |
| Model Quality | Excellent | TBD (Gemini 3) |

## Interesting Architecture Details

- **Release Cadence:**
  - Nightly: Daily at UTC 0000
  - Preview: Tuesdays at UTC 2359
  - Stable: Tuesdays at UTC 2000

- **Custom Commands:** Create reusable commands
- **IDE Integration:** VS Code companion
- **Trusted Folders:** Control execution policies by folder

## Potential Use Cases

1. **Research Tasks** — 1M context window for large doc analysis
2. **Free Tier Work** — Non-critical tasks to save API costs
3. **Search-Grounded Queries** — Real-time info without browser
4. **GitHub Automation** — PR reviews, issue triage

## Recommendation

**Install and test.** The free tier alone makes it worth having as a backup. The 1M context window is compelling for large codebase analysis. Apache 2.0 license is friendly.

Good complement to Claude Code rather than replacement — use for specific tasks where Gemini excels (search grounding, large context).

## Resources

- Documentation: https://geminicli.com/docs/
- NPM: https://www.npmjs.com/package/@google/gemini-cli
- Roadmap: https://github.com/orgs/google-gemini/projects/11
