# Deep Dive: microsoft/agent-lightning

## Overview
Microsoft Research project that enables RL training for ANY AI agent with near-zero code changes. Framework-agnostic — works with LangChain, OpenAI Agent SDK, AutoGen, CrewAI, or raw Python.

## Key Details
- **Author:** Microsoft Research
- **URL:** https://github.com/microsoft/agent-lightning
- **Language:** Python
- **Install:** `pip install agentlightning`
- **Paper:** arXiv:2508.03680 (Aug 2025)
- **Maturity:** Production-ready, active CI, Discord community

## Core Architecture
1. **Zero-code integration**: Drop in `agl.emit_xxx()` helpers or use automatic tracer
2. **LightningStore**: Central hub syncing tasks, resources, and traces
3. **Algorithm-agnostic**: RL, Automatic Prompt Optimization, Supervised Fine-tuning
4. **Span-based**: Events become structured spans flowing to the store
5. **Trainer loop**: Streams datasets → runs algorithms → updates inference engine

## Supported Algorithms
- Reinforcement Learning (including trajectory-level aggregation)
- Automatic Prompt Optimization
- Supervised Fine-tuning
- Selective optimization of individual agents in multi-agent systems

## Community Projects
- **DeepWerewolf**: Agent RL for Chinese Werewolf game
- **AgentFlow** (Stanford): Multi-agent framework with Flow-GRPO algorithm
- **Youtu-Agent** (Tencent): Verified up to 128 GPU RL training

## Key Articles
- Blog post on trajectory-level aggregation for faster training (Dec 2025)
- vLLM blog on token ID handling (Oct 2025)
- SQL self-correction with RL (Aug 2025)

## Relevance to Us
- **High relevance**: Could optimize our existing agent workflows
- **Practical**: Works with any framework we're already using
- **Multi-agent**: Can selectively optimize agents in our swarm system
- **Low barrier**: Near-zero code changes to existing agents

## Action Items
- Explore documentation and examples
- Consider applying to a simple agent task as proof of concept
- Track community projects for patterns
