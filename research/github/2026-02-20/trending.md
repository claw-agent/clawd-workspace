# GitHub Trending — 2026-02-20

## Summary
- Scanned: ~50 repos across 5 categories (all, Python, TypeScript, JavaScript, Rust)
- Relevant: 15 repos
- Top pick: microsoft/agent-lightning

## Top Repos

### 1. microsoft/agent-lightning
- **Language:** Python
- **URL:** https://github.com/microsoft/agent-lightning
- **Description:** Train ANY AI agent with RL, with zero code changes. Works with LangChain, OpenAI Agent SDK, AutoGen, CrewAI, etc. Uses RL, automatic prompt optimization, and supervised fine-tuning.
- **Why Interesting:** Framework-agnostic agent training via RL — could optimize our OpenClaw agents without rewriting them. Microsoft Research backed with arXiv paper.
- **Potential Use:** Train/optimize our agent skills with RL feedback loops
- **Action:** [Explore]

### 2. getzep/graphiti
- **Language:** Python
- **URL:** https://github.com/getzep/graphiti
- **Description:** Build real-time knowledge graphs for AI agents. Temporally-aware, incremental updates, hybrid retrieval (semantic + BM25 + graph traversal). Has MCP server.
- **Why Interesting:** MCP server for knowledge graph memory. Could replace/augment our QMD memory system with graph-based agent memory. Sub-second queries, bi-temporal tracking.
- **Potential Use:** Agent memory upgrade — graph-based context for OpenClaw sessions
- **Action:** [Explore]

### 3. p-e-w/heretic
- **Language:** Python
- **URL:** https://github.com/p-e-w/heretic
- **Description:** Fully automatic censorship removal for transformer LLMs via optimized abliteration. TPE-based parameter optimizer minimizes refusals while preserving model intelligence (low KL divergence).
- **Why Interesting:** One-command uncensoring of local models. 1000+ community models on HF already. Could uncensor our Ollama models for unrestricted local use.
- **Potential Use:** Uncensor local models (glm4, llama) for creative writing tasks
- **Action:** [Watch]

### 4. obra/superpowers
- **Language:** Unknown
- **URL:** https://github.com/obra/superpowers
- **Description:** An agentic skills framework & software development methodology that works.
- **Why Interesting:** Agentic skills framework — directly relevant to how we build agent skills in OpenClaw
- **Potential Use:** Compare methodology with our skills/ approach
- **Action:** [Explore]

### 5. RichardAtCT/claude-code-telegram
- **Language:** Python
- **URL:** https://github.com/RichardAtCT/claude-code-telegram
- **Description:** Telegram bot for remote Claude Code access with session persistence.
- **Why Interesting:** Similar to our OpenClaw Telegram setup — could compare approaches for remote Claude Code access
- **Potential Use:** Reference implementation for comparison
- **Action:** [Watch]

### 6. upstash/context7
- **Language:** TypeScript
- **URL:** https://github.com/upstash/context7
- **Description:** Context7 MCP Server — up-to-date code documentation for LLMs and AI code editors.
- **Why Interesting:** Already in our MCP servers list. Trending means community validation.
- **Potential Use:** Already integrated
- **Action:** [Skip]

### 7. QwenLM/qwen-code
- **Language:** TypeScript
- **URL:** https://github.com/QwenLM/qwen-code
- **Description:** Open-source AI agent that lives in your terminal. Qwen's answer to Claude Code.
- **Why Interesting:** Competition to Claude Code from Qwen team. Terminal AI agent space heating up.
- **Potential Use:** Evaluate as alternative/backup coding agent
- **Action:** [Watch]

### 8. 0xPlaygrounds/rig
- **Language:** Rust
- **URL:** https://github.com/0xPlaygrounds/rig
- **Description:** Build modular and scalable LLM applications in Rust.
- **Why Interesting:** Rust LLM framework — performance-oriented alternative to Python agent frameworks
- **Potential Use:** Future high-perf agent components
- **Action:** [Watch]

### 9. katanemo/plano
- **Language:** Rust
- **URL:** https://github.com/katanemo/plano
- **Description:** AI-native proxy and data plane for agentic apps. Offloads plumbing so you focus on core agent logic.
- **Why Interesting:** Infrastructure layer for agent apps — proxy that handles tool routing, auth, etc.
- **Potential Use:** Could simplify agent deployment infrastructure
- **Action:** [Watch]

### 10. BoundaryML/baml
- **Language:** Rust
- **URL:** https://github.com/BoundaryML/baml
- **Description:** AI framework adding engineering to prompt engineering. Multi-language support (Python/TS/Ruby/Java/C#/Rust/Go).
- **Why Interesting:** Structured prompt engineering across languages — typed LLM function calls
- **Potential Use:** More rigorous prompt engineering for critical agent functions
- **Action:** [Watch]

### 11. ComposioHQ/composio
- **Language:** TypeScript
- **URL:** https://github.com/ComposioHQ/composio
- **Description:** 1000+ toolkits with auth, tool search, context management, sandboxed workbench for AI agents.
- **Why Interesting:** Massive tool library with built-in auth — could expand our agent's tool access
- **Potential Use:** Quick integration of external tools via pre-built connectors
- **Action:** [Watch]

### 12. strands-agents/sdk-python
- **Language:** Python
- **URL:** https://github.com/strands-agents/sdk-python
- **Description:** Model-driven approach to building AI agents in just a few lines of code.
- **Why Interesting:** Minimalist agent SDK — worth comparing to our approach
- **Potential Use:** Reference for simplifying agent patterns
- **Action:** [Skip]

### 13. OpenCTI-Platform/opencti
- **Language:** TypeScript
- **URL:** https://github.com/OpenCTI-Platform/opencti
- **Description:** Open Cyber Threat Intelligence Platform.
- **Why Interesting:** Security/threat intel — relevant to Shannon pentesting work
- **Potential Use:** Threat intel feeds for security research
- **Action:** [Watch]

### 14. RooCodeInc/Roo-Code
- **Language:** TypeScript
- **URL:** https://github.com/RooCodeInc/Roo-Code
- **Description:** A whole dev team of AI agents in your code editor.
- **Why Interesting:** Multi-agent coding in IDE — competition in the AI dev tools space
- **Potential Use:** Evaluate multi-agent coding patterns
- **Action:** [Watch]

### 15. exo-explore/exo
- **Language:** Python
- **URL:** https://github.com/exo-explore/exo
- **Description:** Run frontier AI locally.
- **Why Interesting:** Local AI inference — could complement our Ollama setup
- **Potential Use:** Alternative local inference runtime
- **Action:** [Skip]
