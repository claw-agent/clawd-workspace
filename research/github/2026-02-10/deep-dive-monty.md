# Deep Dive: pydantic/monty

## Overview
Minimal, secure Python interpreter written in Rust, designed specifically for AI agent code execution.

## Key Details
- **By:** Pydantic team (Samuel Colvin et al.) — high credibility
- **Status:** Experimental, active development
- **License:** MIT
- **Bindings:** Python (`pydantic-monty`), JavaScript/TypeScript, Rust native

## Why This Matters
The core insight: LLMs work faster, cheaper, and more reliably writing Python code than using traditional tool calling. But running LLM-generated code is dangerous. Monty solves this with:

1. **Microsecond startup** — vs hundreds of ms for containers
2. **Complete sandboxing** — no filesystem, no env vars, no network unless explicitly granted
3. **External function calls** — host controls what the interpreter can access
4. **Snapshotable state** — serialize interpreter mid-execution, resume later (even in different process)
5. **Type checking** — includes `ty` (Astral's type checker) in single binary

## Architecture
- Rust core interprets a subset of Python
- No stdlib (except sys, typing, asyncio)
- No third-party libraries
- External functions are the ONLY way to interact with the host
- State can be serialized to bytes at any external function call boundary

## Limitations
- No class definitions (coming soon)
- No match statements (coming soon)
- No standard library
- Deliberately minimal — this is a feature, not a bug

## Integration Potential
**High priority for our agent stack:**
- Replace Docker sandbox for simple code execution tasks
- Embed in OpenClaw agents for safe Python eval
- Use with Pydantic AI (their stated goal)
- Pairs well with MCP's programmatic tool calling pattern

## Links
- Inspired by: Cloudflare Codemode, Anthropic's Programmatic Tool Calling, HuggingFace smolagents
- Will be used in Pydantic AI
- Install: `uv add pydantic-monty`
