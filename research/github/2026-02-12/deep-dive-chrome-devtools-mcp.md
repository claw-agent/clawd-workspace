# Deep Dive: ChromeDevTools/chrome-devtools-mcp

## Overview
Official Chrome DevTools MCP server from the Chrome DevTools team at Google. Gives AI coding agents full access to Chrome DevTools via the Model Context Protocol.

## Key Capabilities
- **Performance analysis:** Record traces, extract actionable performance insights via Chrome DevTools
- **Network inspection:** Analyze network requests with full detail
- **Screenshots:** Take screenshots of browser state
- **Console access:** Browser console messages with source-mapped stack traces
- **Automation:** Puppeteer-based reliable browser automation with automatic waiting

## Architecture
- MCP server that wraps Chrome DevTools Protocol via Puppeteer
- Runs as `npx chrome-devtools-mcp@latest` — zero install
- Connects to live Chrome instance
- Supports all major MCP clients: Claude Code, Cursor, Copilot, VS Code, Cline, Codex, Amp

## Integration with Claude Code
```bash
claude mcp add chrome-devtools --scope user npx chrome-devtools-mcp@latest
```
One command. That's it.

## Privacy/Telemetry Notes
- Collects usage statistics by default (tool invocation success rates, latency, environment info)
- Opt-out: `--no-usage-statistics` flag
- Performance tools may send trace URLs to Google CrUX API
- Opt-out CrUX: `--no-performance-crux` flag

## Relevance to Us
**HIGH.** We currently use multiple browser tools (browser-use, stealth-browse, agent-browser, cliclick). This is the official Google MCP server for browser control — more reliable, better maintained, and integrates natively with our MCP setup.

## Action Items
1. Add to Claude Code MCP config
2. Test alongside existing browser tools
3. Evaluate if it can replace stealth-browse for web debugging tasks

## Maturity: Production-ready (backed by Google/Chrome team)
