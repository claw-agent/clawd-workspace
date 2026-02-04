# Deep Dive: modelcontextprotocol/ext-apps

**URL:** https://github.com/modelcontextprotocol/ext-apps  
**Status:** Stable (spec version 2026-01-26)  
**License:** (check repo)

## What Is It?

MCP Apps is an **official extension** to the Model Context Protocol that allows MCP servers to deliver interactive UI elements directly into AI chatbot conversations. Instead of just returning text/JSON, tools can now return rich, interactive HTML interfaces.

This is the standardization of what MCP-UI and OpenAI's Apps SDK started - but now it's official, with Anthropic backing.

## How It Works

```
1. Tool Definition    → Tool declares a ui:// resource containing HTML interface
2. Tool Call          → LLM calls the tool on your server
3. Host Renders       → Host fetches resource, displays in sandboxed iframe
4. Bidirectional Comm → Host passes data to UI, UI can call other tools
```

## Key Features

### For App Developers
- SDK: `@modelcontextprotocol/ext-apps`
- React hooks: `@modelcontextprotocol/ext-apps/react`
- Works with React, Vue, Svelte, Preact, Solid, Vanilla JS

### For Host Developers
- SDK: `@modelcontextprotocol/ext-apps/app-bridge`
- Embed MCP Apps in chat applications

## Examples Included

The repo includes **18 example apps** demonstrating real use cases:

| App | Use Case |
|-----|----------|
| Map | Interactive maps |
| Three.js | 3D visualizations |
| ShaderToy | WebGL shaders |
| Sheet Music | Music notation rendering |
| Wiki Explorer | Wikipedia browsing |
| Cohort Heatmap | Data visualization |
| Scenario Modeler | What-if analysis |
| Budget Allocator | Financial planning |
| Customer Segmentation | Business analytics |
| System Monitor | Real-time metrics |
| Transcript | Audio/video transcripts |
| Video Resource | Media playback |
| PDF Server | Document viewing |
| QR Code | QR generation (Python) |

## Agent Skills Integration

They provide **Claude Code plugins**:
```bash
/plugin marketplace add modelcontextprotocol/ext-apps
/plugin install mcp-apps@modelcontextprotocol-ext-apps
```

## Why This Matters for Us

### Current Limitation
Clawdbot returns text. For rich content (charts, maps, interactive elements), we're limited to:
- Sending images
- Linking to external URLs
- Canvas eval (for node-hosted displays)

### What This Enables
- **Inline interactive dashboards** in Telegram/Discord
- **Forms and data entry** without leaving chat
- **Real-time visualizations** (system monitor, analytics)
- **Document viewers** embedded in conversation
- **Custom controls** for tool inputs

### Integration Path

1. **Check if Clawdbot supports MCP Apps** - Need to see if the host (Clawdbot gateway) implements the app-bridge SDK
2. **If not, could be a feature request** - This is the future direction of MCP
3. **Build MCP servers with UI** - Any new MCP servers we create could include App UIs

## Activity & Maintenance

- **Spec:** Stable (2026-01-26)
- **Active development:** Draft spec in progress
- **Official Anthropic project:** Part of modelcontextprotocol org

## Verdict

**Action: [Integrate]** - High priority exploration

This is the official standard for adding UI to AI assistants. Whether we integrate it now or later, this is where the ecosystem is headed. The examples alone are worth studying for ideas.

**Next Steps:**
1. Check if Clawdbot gateway supports MCP Apps rendering
2. If yes, pick one example (System Monitor?) and test
3. If no, file feature request or contribute support
4. Consider for any new MCP servers we build
