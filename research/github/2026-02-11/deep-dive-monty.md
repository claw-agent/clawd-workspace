# Deep Dive: pydantic/monty

## Overview
Minimal, secure Python interpreter written in Rust designed specifically for AI agent code execution.

## Key Technical Details
- **Startup:** Single-digit microseconds (vs hundreds of ms for containers)
- **Security:** Complete sandbox — no filesystem, env vars, or network access unless explicitly granted via external functions
- **Serialization:** Can snapshot interpreter state to bytes mid-execution, resume later (even in different process)
- **Type checking:** Built-in ty support for validating LLM-generated code before execution
- **Bindings:** Python (`pydantic-monty`), JavaScript/TypeScript, Rust native
- **Status:** Experimental, not production-ready yet

## Why This Matters
The "codemode" pattern (LLMs write code instead of JSON tool calls) is gaining momentum:
- Cloudflare's Codemode
- Anthropic's Programmatic Tool Calling
- HuggingFace's SmolAgents

Monty makes this pattern safe without Docker/containers. The serialization feature is killer — you can pause agent execution at any external function call, persist state, and resume later.

## Integration Potential
- Pydantic AI will use it for codemode (upcoming)
- Could replace our container-based sandboxing for agent code execution
- The snapshot/resume feature enables long-running agent workflows with persistence

## Maturity Assessment
- Very early (experimental label)
- No class support yet, no standard library
- Active development by Pydantic team (credible maintainers)
- Wait for class support and Pydantic AI integration before adopting
