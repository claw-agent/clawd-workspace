# Deep Dive: ChromeDevTools/chrome-devtools-mcp

## Overview
Official Chrome DevTools MCP server from the Chrome DevTools team. Gives AI coding agents (Claude Code, Cursor, Copilot, Gemini) full access to Chrome DevTools via MCP.

## Key Details
- **Maintainer:** Chrome DevTools team (Google)
- **Transport:** MCP (Model Context Protocol)
- **Automation:** Puppeteer under the hood
- **Install:** `npx -y chrome-devtools-mcp@latest`
- **Requirements:** Node.js v20.19+, Chrome stable

## Capabilities
- **Performance insights** — Record traces, extract actionable perf data, CrUX field data
- **Network analysis** — Inspect requests, responses, headers
- **Screenshots** — Capture page state
- **Console messages** — With source-mapped stack traces
- **Reliable automation** — Puppeteer-based, auto-waits for action results

## Integration with Claude Code
```bash
claude mcp add chrome-devtools --scope user npx chrome-devtools-mcp@latest
```
Or as a plugin with skills:
```
/plugin marketplace add ChromeDevTools/chrome-devtools-mcp
/plugin install chrome-devtools-mcp
```

## Security Notes
- Exposes browser content to MCP clients — avoid sensitive data in connected browser
- Usage statistics collected by default (opt out: `--no-usage-statistics`)
- Performance tools may send trace URLs to Google CrUX API (opt out: `--no-performance-crux`)

## Relevance to Us
**High.** We currently use a patchwork of browser tools (browser-use, stealth-browse, agent-browser, cliclick). Chrome DevTools MCP could:
1. Provide a single, official, well-maintained browser interface for Claude Code
2. Add performance profiling we don't currently have
3. Replace ad-hoc Puppeteer scripts
4. Work directly with our existing MCP setup

## Action Items
- [ ] Add to OpenClaw MCP config and test
- [ ] Compare capabilities with our current browser-use setup
- [ ] Check if it conflicts with existing Playwright MCP server
