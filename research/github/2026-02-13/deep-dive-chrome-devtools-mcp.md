# Deep Dive: ChromeDevTools/chrome-devtools-mcp

## Overview
Official Chrome DevTools MCP server from Google. Gives coding agents (Claude Code, Gemini, Cursor, Copilot) full access to Chrome DevTools for automation, debugging, and performance analysis.

## Key Technical Details
- **MCP server** — standard Model Context Protocol, works with any MCP client
- Uses **Puppeteer** under the hood for reliable browser automation with auto-waiting
- Performance insights via real Chrome DevTools trace recording
- Network request analysis, screenshots, console messages with source-mapped stacks
- Supports CrUX (Chrome User Experience Report) field data alongside lab data

## Installation
```bash
# Claude Code
claude mcp add chrome-devtools --scope user npx chrome-devtools-mcp@latest

# Or as plugin with skills
/plugin marketplace add ChromeDevTools/chrome-devtools-mcp
/plugin install chrome-devtools-mcp
```

Also supports: Amp, Copilot/VS Code, Cline, Codex, Gemini CLI, Windsurf, and more.

## Architecture Notes
- Runs as stdio MCP server via npx
- Can connect to existing Chrome instance via `--browser-url`
- Usage statistics collected by default (opt out with `--no-usage-statistics`)
- Performance CrUX data opt-out with `--no-performance-crux`

## Relevance to Us
- **High relevance**: We already have browser automation tools (browser-use, stealth-browse, agent-browser). This adds official DevTools-level inspection.
- Could replace/complement our `browser` tool for debugging scenarios
- Performance analysis capabilities are unique — no other tool gives us Chrome trace analysis
- The MCP integration means it works natively with Claude Code

## Action Items
- Consider adding to our MCP server config
- Test alongside existing browser automation stack
- Particularly useful for web development debugging on XPERIENCE projects
