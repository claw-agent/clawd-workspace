# Deep Dive: modelcontextprotocol/ext-apps

**URL:** https://github.com/modelcontextprotocol/ext-apps
**Language:** TypeScript
**Category:** MCP Ecosystem
**Relevance:** ⭐⭐⭐⭐ (MCP infrastructure enhancement)

## Overview

Official SDK and specification for MCP Apps Extension (SEP-1865). This enables MCP servers to display interactive UI elements directly in conversational AI clients.

## The Problem It Solves

MCP tools currently return text and structured data. But many use cases need:
- Interactive charts
- Forms for user input
- Video/audio players
- Maps and visualizations
- Real-time dashboards

MCP Apps standardizes how to deliver these interactive UIs from MCP servers.

## How It Works

```
┌─────────────────────────────────────────────────┐
│ 1. Tool Definition                              │
│    Tool declares a ui:// resource (HTML)        │
└─────────────────────────────────────────────────┘
        ↓
┌─────────────────────────────────────────────────┐
│ 2. LLM Tool Call                                │
│    Model calls tool on your server              │
└─────────────────────────────────────────────────┘
        ↓
┌─────────────────────────────────────────────────┐
│ 3. Host Renders                                 │
│    Fetches resource, displays in sandboxed iframe│
└─────────────────────────────────────────────────┘
        ↓
┌─────────────────────────────────────────────────┐
│ 4. Bidirectional Communication                  │
│    Host ↔ UI via notifications                  │
│    UI can call other tools through host         │
└─────────────────────────────────────────────────┘
```

## SDK Components

### For App Developers
- `@modelcontextprotocol/ext-apps` — Core SDK
- `@modelcontextprotocol/ext-apps/react` — React hooks

### For Host Developers
- `@modelcontextprotocol/ext-apps/app-bridge` — Embed & communicate with apps

## Included Examples

Rich collection of demo apps showing real-world use:

| App | Use Case |
|-----|----------|
| Map | Geographic visualization |
| Three.js | 3D graphics |
| ShaderToy | GLSL shaders |
| Sheet Music | Music notation rendering |
| Wiki Explorer | Wikipedia browsing |
| Cohort Heatmap | Data visualization |
| Scenario Modeler | What-if analysis |
| Budget Allocator | Financial planning UI |
| Customer Segmentation | Analytics dashboard |
| System Monitor | Real-time metrics |
| Transcript | Video transcript viewer |
| Video Resource | Video playback |
| PDF Server | PDF rendering |
| QR Code | QR generation (Python) |

## Framework Support

Starter templates for every major framework:
- React
- Vue
- Svelte
- Preact
- Solid
- Vanilla JS

## Agent Skills Integration

```bash
# Install as Claude Code plugin
/plugin marketplace add modelcontextprotocol/ext-apps
/plugin install mcp-apps@modelcontextprotocol-ext-apps
```

## Potential Use Cases for Clawdbot

1. **Research Dashboards**
   - Display Twitter analysis as interactive charts
   - GitHub trending visualization
   - Bookmark heatmaps

2. **File/Media Viewers**
   - PDF rendering inline
   - Video playback with transcripts
   - Image galleries

3. **Interactive Forms**
   - Configuration wizards
   - Multi-step workflows
   - Approval interfaces

4. **Real-time Monitoring**
   - System status dashboards
   - Cron job visualization
   - Memory usage graphs

## Quick Start

```bash
npm install -S @modelcontextprotocol/ext-apps

# Run all examples locally
git clone https://github.com/modelcontextprotocol/ext-apps.git
cd ext-apps
npm install
npm start
# Open http://localhost:8080/
```

## Technical Notes

- Spec version: 2026-01-26 (Stable)
- Draft spec also available for bleeding edge
- Inspired by MCP-UI and OpenAI's Apps SDK
- Works with Claude Desktop, VS Code MCP

## Action Items

1. [ ] Install agent skills: `/plugin marketplace add modelcontextprotocol/ext-apps`
2. [ ] Run examples locally to understand capabilities
3. [ ] Identify 1-2 visualizations that would benefit from inline UI
4. [ ] Explore building a Twitter analysis dashboard app

## Links

- GitHub: https://github.com/modelcontextprotocol/ext-apps
- NPM: https://www.npmjs.com/package/@modelcontextprotocol/ext-apps
- API Docs: https://modelcontextprotocol.github.io/ext-apps/api/
