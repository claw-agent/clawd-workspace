# Deep Dive: google/adk-python

## Overview
Google's Agent Development Kit — open-source, code-first Python framework for AI agents. Optimized for Gemini but model-agnostic.

## Key Features
- **Multi-agent orchestration:** Hierarchical agent systems with coordinator/sub-agent patterns
- **Rich tool ecosystem:** Pre-built tools, custom functions, OpenAPI specs, MCP tools
- **A2A Protocol:** Agent-to-Agent communication for remote agent coordination
- **Built-in dev UI:** Visual testing, debugging, and evaluation interface
- **Agent Config:** No-code agent building via configuration files
- **Tool Confirmation (HITL):** Human-in-the-loop flow for guarding tool execution
- **Deploy anywhere:** Cloud Run, Vertex AI Agent Engine, or custom

## Recent Updates (Feb 2026)
- Custom Service Registration for FastAPI server extensibility
- Session Rewind — rollback to before a previous invocation
- AgentEngineSandboxCodeExecutor — run agent-generated code in Vertex AI sandbox

## Architecture
- Python-first, uses `google-adk` pip package
- Multi-language: Python, Java, Go, Web (separate repos)
- Community repo for third-party integrations
- llms.txt support for vibe coding with the framework

## Maturity Assessment
- **Very mature** — Google-backed, active development, multi-language SDKs
- **Large community** — Reddit community, extensive docs, sample repos
- **Production-ready** — Vertex AI integration, Cloud Run deployment

## Relevance to Us
- **High** — Could study their multi-agent patterns for our agent system
- **A2A protocol** is interesting for inter-agent communication
- **MCP tool support** means we could share tools between our system and ADK
- Their eval framework could inspire improvements to our agent testing

## Verdict
Worth exploring for architectural inspiration, especially multi-agent patterns and A2A protocol. Not a replacement for our current setup (we're Claude-native) but good to understand the competition.
