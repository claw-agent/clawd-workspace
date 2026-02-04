# Deep Dive: modelcontextprotocol/ext-apps

**URL:** https://github.com/modelcontextprotocol/ext-apps  
**Language:** TypeScript  
**Status:** Stable (2026-01-26 spec)  
**Tagline:** "Official repo for spec & SDK of MCP Apps protocol - standard for UIs embedded AI chatbots"

## Overview

MCP Apps is an official extension to the Model Context Protocol that allows MCP servers to display interactive UI elements directly in chat conversations. Think charts, forms, maps, 3D viewers, video players — all rendered inline.

## The Problem It Solves

MCP tools return text and structured data. That's fine for many use cases, but inadequate when you need:
- Interactive charts
- Maps with pins
- Forms to fill out
- Video/audio players
- 3D model viewers
- Sheet music notation
- System monitors

## How It Works

```
1. Tool Definition  → Tool declares a ui:// resource containing HTML interface
2. Tool Call        → LLM calls the tool on your server
3. Host Renders     → Host fetches resource, displays in sandboxed iframe
4. Bidirectional    → Host passes data to UI, UI can call other tools through host
```

## SDK Components

### For App Developers
```typescript
// @modelcontextprotocol/ext-apps
import { createApp } from '@modelcontextprotocol/ext-apps';

// React hooks available
import { useMcpApp } from '@modelcontextprotocol/ext-apps/react';
```

### For Host Developers
```typescript
// @modelcontextprotocol/ext-apps/app-bridge
// Embed and communicate with MCP Apps in your chat application
```

## Example Apps (Already Built!)

| App | Description |
|-----|-------------|
| **Map** | Interactive maps |
| **Three.js** | 3D graphics |
| **ShaderToy** | WebGL shaders |
| **Sheet Music** | Musical notation |
| **Wiki Explorer** | Wikipedia navigation |
| **Cohort Heatmap** | Analytics visualization |
| **Scenario Modeler** | What-if analysis |
| **Budget Allocator** | Financial planning |
| **Customer Segmentation** | Business analytics |
| **System Monitor** | Server metrics |
| **Transcript** | Video transcripts |
| **Video Resource** | Video playback |
| **PDF Server** | PDF rendering |
| **QR Code** | QR generation |

## Starter Templates

Available in multiple frameworks:
- React
- Vue
- Svelte
- Preact
- Solid
- Vanilla JS

## Integration Example

```json
// MCP client configuration
{
  "mcpServers": {
    "map": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-map",
        "--stdio"
      ]
    }
  }
}
```

## Agent Skills Support

Can install as Claude Code plugin:
```
/plugin marketplace add modelcontextprotocol/ext-apps
/plugin install mcp-apps@modelcontextprotocol-ext-apps
```

## Why This Matters for Clawdbot

1. **Rich Tool Output**: Instead of text-only responses, tools can show interactive UIs
2. **Standard Protocol**: Official MCP extension, will be widely supported
3. **Framework Agnostic**: Works with React, Vue, Svelte, etc.
4. **Already Working**: 15+ example apps prove the concept

## Potential Use Cases

1. **Financial Dashboard**: Interactive charts showing portfolio performance
2. **Calendar View**: Visual calendar instead of text lists
3. **Map Results**: Show locations on a map instead of addresses
4. **Media Player**: Play audio/video directly in chat
5. **Form Input**: Structured data entry instead of parsing text
6. **Code Editor**: Syntax-highlighted, editable code blocks

## Implementation Notes

### App Lifecycle
1. MCP server defines tool with `ui://` resource
2. Tool execution returns reference to UI resource
3. Host fetches HTML content
4. Renders in sandboxed iframe
5. Two-way communication via postMessage

### Security
- Sandboxed iframes
- Host controls what tools the UI can call
- No direct DOM access to host

## Verdict

**HIGH PRIORITY for integration**. This is the future of MCP tool output. As hosts (Claude Desktop, Cursor, etc.) adopt this spec, having MCP servers that can output rich UIs will be a significant advantage.

## Next Steps

1. **Explore Examples**: Run the basic-host demo locally
2. **Build Simple App**: Try the React starter template
3. **Identify Use Cases**: What Clawdbot tools would benefit from UIs?
4. **Track Adoption**: Which hosts are implementing ext-apps?
