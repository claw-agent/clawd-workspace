# Deep Dive: ChromeDevTools/chrome-devtools-mcp

**URL:** https://github.com/ChromeDevTools/chrome-devtools-mcp
**Language:** TypeScript
**By:** Google Chrome team (official)

## What It Is
Official MCP server that gives coding agents full Chrome DevTools access — automation, debugging, performance analysis. Uses Puppeteer under the hood.

## Key Features
- **Performance insights** — record traces, extract actionable perf data
- **Network analysis** — inspect requests, responses
- **Screenshots** — capture page state
- **Console messages** — with source-mapped stack traces
- **Reliable automation** — Puppeteer-based with auto-wait

## Setup
```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest"]
    }
  }
}
```

For Claude Code: `claude mcp add chrome-devtools --scope user npx chrome-devtools-mcp@latest`

Also has a **plugin** mode with skills: `/plugin marketplace add ChromeDevTools/chrome-devtools-mcp`

## Supported Clients
Claude Code, Cursor, Copilot, Gemini, Cline, Codex, Amp, VS Code — basically everyone.

## Privacy Notes
- Exposes browser content to MCP clients (avoid sensitive data)
- Can send trace URLs to Google CrUX API (disable with `--no-performance-crux`)
- Usage statistics collected by default (disable with `--no-usage-statistics`)

## Relevance to Us
- Already flagged in active.md as action item
- Would replace/complement our stealth-browse + browser tool for web dev debugging
- Official Google backing = well-maintained, good API design
- Plugin mode with skills is interesting for Claude Code

## Action Items
- [ ] Install: `claude mcp add chrome-devtools --scope user npx chrome-devtools-mcp@latest`
- [ ] Test with a web dev debugging session
- [ ] Compare capabilities with our current browser automation stack
- [ ] Add `--no-usage-statistics --no-performance-crux` flags
