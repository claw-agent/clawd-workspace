# Deep Dive: pydantic/monty

## Overview
Minimal, secure Python interpreter written in Rust, designed for AI agent code execution.

## Key Details
- From **Pydantic team** (Samuel Colvin) — high trust/quality bar
- Microsecond startup (vs hundreds of ms for containers)
- Complete host isolation: no filesystem, env vars, or network unless explicitly granted
- **Serializable state** — snapshot mid-execution, resume later (even in different process)
- Built-in type checking via ty (Astral's type checker)
- Available for Python, JavaScript/TypeScript, and Rust

## What It Can Do
- Run a reasonable Python subset (enough for agent expressions)
- Call host functions (only those you expose)
- Snapshot/restore execution state to bytes
- Type check agent-generated code before running

## What It Can't Do (Yet)
- No stdlib (except sys, typing, asyncio, dataclasses soon, json soon)
- No third-party libraries
- No class definitions (coming soon)
- No match statements (coming soon)

## Why This Matters
The industry is converging on "let LLMs write code instead of tool-calling" — it's faster, cheaper, more reliable. But running arbitrary code is dangerous. Monty solves this elegantly:
- No container overhead
- Microsecond startup
- Deterministic sandboxing
- Serializable for async workflows

## Integration Points
- Will be used in **Pydantic AI** for codemode
- Inspired by Cloudflare's Codemode, Anthropic's Programmatic Tool Calling
- `pip install pydantic-monty`

## Assessment
- **Maturity:** Experimental but from a top-tier team
- **Quality:** Excellent — Rust core, CI, codecov, benchmarks
- **Relevance:** Very high for our agent system
- **Risk:** Still experimental, limited Python subset

## Verdict
Strong [Explore]. Could replace heavier sandboxing approaches. The snapshot/resume feature is uniquely powerful for agent workflows.
