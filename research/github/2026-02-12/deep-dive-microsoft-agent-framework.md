# Deep Dive: microsoft/agent-framework

## Overview
Microsoft's unified multi-agent framework, consolidating AutoGen and Semantic Kernel into one comprehensive platform. Supports both Python and .NET with consistent APIs.

## Key Features
- **Graph-based workflows:** Connect agents and deterministic functions using data flows
- **Streaming & checkpointing:** Built-in support for real-time output and state persistence
- **Human-in-the-loop:** Native support for human intervention points
- **Time-travel debugging:** Replay and inspect agent execution history
- **DevUI:** Interactive developer UI for building, testing, and debugging agent workflows
- **OpenTelemetry:** Built-in observability with distributed tracing
- **Middleware system:** Flexible request/response processing pipeline
- **Multi-provider support:** Works with various LLM providers

## Architecture
- Python: `pip install agent-framework --pre` (still pre-release)
- .NET: `dotnet add package Microsoft.Agents.AI`
- AF Labs: Experimental packages for benchmarking, reinforcement learning
- Migration paths from both AutoGen and Semantic Kernel

## What's Novel
The **graph-based orchestration with time-travel** is the standout feature. Being able to checkpoint agent state and replay execution is extremely powerful for debugging complex multi-agent workflows. This is what our orchestration skill lacks.

## Relevance to Us
**MEDIUM.** We're Claude-native and don't need another agent framework, but the architectural patterns are valuable:
- Graph-based workflow definition
- Time-travel debugging concept
- Middleware pipeline pattern
- DevUI for agent development

## Maturity: Pre-release but Microsoft-backed. Active development with weekly office hours.
