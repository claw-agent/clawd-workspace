# Deep Dive: modelcontextprotocol/ext-apps

## Overview
**Official MCP Apps Extension** — The standard for embedding interactive UIs in AI chatbots, served by MCP servers.

## Status
- **Spec Version:** 2026-01-26 (Stable)
- **Draft:** In development with new features
- **SEP:** 1865 (Standard Enhancement Proposal)

## Why This Matters

MCP tools currently return text and structured data. But what if you need:
- An interactive map?
- A chart you can zoom/pan?
- A form to fill out?
- A video player?

**MCP Apps solves this.** Tools can now declare `ui://` resources containing HTML interfaces that render inline in the conversation.

## How It Works

1. **Tool Definition** — Tool declares a `ui://` resource pointing to its HTML interface
2. **Tool Call** — LLM calls the tool on your server
3. **Host Renders** — Host fetches the resource, displays in sandboxed iframe
4. **Bidirectional Communication** — Host passes data via notifications, UI can call other tools

## SDK Components

### For App Developers
```bash
npm install -S @modelcontextprotocol/ext-apps
```

- Main SDK: `@modelcontextprotocol/ext-apps`
- React hooks: `@modelcontextprotocol/ext-apps/react`

### For Host Developers
- SDK: `@modelcontextprotocol/ext-apps/app-bridge`
- Used to embed and communicate with MCP Apps

## Example Apps (Included)

| App | Purpose |
|-----|---------|
| Map | Interactive maps |
| Three.js | 3D graphics |
| ShaderToy | GLSL shaders |
| Sheet Music | Music notation |
| Wiki Explorer | Wikipedia browsing |
| Cohort Heatmap | Data visualization |
| Scenario Modeler | What-if analysis |
| Budget Allocator | Financial planning |
| Customer Segmentation | Analytics |
| System Monitor | Resource tracking |
| Transcript | Video transcripts |
| Video Resource | Video playback |
| PDF Server | Document viewing |
| QR Code | QR generation (Python) |

## Framework Support

Starter templates available for:
- React
- Vue
- Svelte
- Preact
- Solid
- Vanilla JS

## Agent Skills

They've published Agent Skills for AI coding agents:
```
/plugin marketplace add modelcontextprotocol/ext-apps
/plugin install mcp-apps@modelcontextprotocol-ext-apps
```

## Relevance to Clawdbot

### Immediate Opportunities

1. **Rich Tool Responses** — Instead of text-only tool outputs, render interactive UIs
2. **Canvas Integration** — MCP Apps could power Clawdbot's canvas feature
3. **User Input Forms** — Create form-based tools for complex input

### Implementation Path

1. Add `app-bridge` to Clawdbot's host
2. Detect `ui://` resources in tool responses
3. Render in sandboxed iframe (canvas or inline)
4. Set up bidirectional message passing

### Example Use Cases for Us

- **Interactive Charts** — Bookmark analysis with zoomable timelines
- **Map Tools** — Location-based research with clickable maps
- **Form Builders** — Complex multi-step workflows
- **Video Player** — Inline video analysis with timestamp navigation

## Activity

- Active development
- Multiple contributors
- Clear documentation
- Enterprise-ready patterns

## Next Steps

1. Clone repo: `git clone https://github.com/modelcontextprotocol/ext-apps.git`
2. Run examples: `npm install && npm start` → http://localhost:8080
3. Review spec: `specification/2026-01-26/apps.mdx`
4. Prototype integration with Clawdbot canvas

## Verdict

**Must integrate.** This is the official way forward for rich MCP UIs and directly aligns with Clawdbot's direction.
