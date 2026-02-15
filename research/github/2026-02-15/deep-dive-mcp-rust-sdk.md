# Deep Dive: modelcontextprotocol/rust-sdk

## Overview
Official Rust SDK for the Model Context Protocol (MCP). Built on tokio async runtime, providing both client and server implementations.

## Key Details
- **Author:** Model Context Protocol (Anthropic-backed)
- **URL:** https://github.com/modelcontextprotocol/rust-sdk
- **Stars:** 3,000+
- **Forks:** 460
- **Commits:** 363
- **Crate:** `rmcp` v0.8.0 on crates.io
- **Spec:** MCP 2025-11-25

## Architecture
- **rmcp**: Core crate with protocol implementation
- **rmcp-macros**: Proc macros for generating tool implementations
- **Transport**: stdio, SSE, WebSocket support
- **OAuth**: Built-in OAuth support

## Usage
```rust
// Client
let client = ().serve(TokioChildProcess::new(command)?).await?;

// Server  
let service = Counter::new();
let server = service.serve(transport).await?;
```

## Ecosystem (Built with rmcp)
- rustfs-mcp: S3-compatible storage MCP server
- containerd-mcp-server: Container management
- rmcp-openapi: Transform OpenAPI endpoints into MCP tools
- nvim-mcp: Neovim integration

## Relevance to Us
- **MCP ecosystem**: We're invested in MCP — this is the official Rust SDK
- **Performance**: Rust MCP servers for latency-sensitive operations
- **Reference**: Good patterns for MCP server/client implementation
- **Growing ecosystem**: Third-party extensions expanding rapidly

## Action Items
- Monitor for stable 1.0 release
- Consider for any performance-critical MCP server needs
- Reference the proc macro patterns for tool generation
