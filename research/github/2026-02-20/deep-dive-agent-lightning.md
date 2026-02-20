# Deep Dive: microsoft/agent-lightning

## Overview
Agent Lightning is Microsoft Research's framework for training AI agents with reinforcement learning. The key innovation is **zero code changes** — you add lightweight `agl.emit_xxx()` helpers to your existing agent code, and it handles the rest.

## Key Technical Details
- **Framework agnostic:** Works with LangChain, OpenAI Agent SDK, AutoGen, CrewAI, or plain Python
- **Algorithms:** RL, Automatic Prompt Optimization, Supervised Fine-tuning
- **Architecture:** Tracer collects prompts/tool calls/rewards → LightningStore → Algorithm learns → Updated resources (prompts, weights)
- **Multi-agent:** Can selectively optimize individual agents in a multi-agent system
- **Scaling:** Community project (Youtu-Agent) verified 128-GPU RL training with stable convergence

## Maturity
- arXiv paper: August 2025 (2508.03680)
- Active CI (CPU tests, full tests, UI tests, examples integration)
- Discord community, documentation site
- Multiple community projects building on it (DeepWerewolf, AgentFlow, Youtu-Agent)
- `pip install agentlightning` — production package on PyPI

## Relevance to Us
**HIGH.** We run multi-agent systems (scout swarm, morning report pipeline, Ralph loops). Agent Lightning could:
1. Optimize prompt templates for each scout automatically via RL feedback
2. Fine-tune agent behavior based on Marb's feedback signals
3. Train agents on specific task patterns (research quality, report formatting)

## Concerns
- Requires GPU for RL training (our Mac mini has M-series, not NVIDIA)
- May need cloud GPU for training runs
- Complexity overhead for our relatively simple agent patterns

## Verdict
**Worth exploring** when we want to level up agent quality. Not urgent but high-potential for the future. Bookmark for when we hit agent quality ceilings.
