# GitHub Trending — 2026-02-15

## Summary
- Scanned: ~40 repos across 5 categories (Python, TypeScript, JavaScript, Rust, All)
- Relevant: 15 repos matching Marb's interests
- Top pick: karpathy/nanochat
- Note: TypeScript and JavaScript trending pages didn't render repo lists (JS-rendered content). Data from All/Python/Rust pages.

## Top Repos

### 1. karpathy/nanochat
- **Language:** Python
- **URL:** https://github.com/karpathy/nanochat
- **Description:** The simplest experimental harness for training LLMs. Train GPT-2 for ~$72 on 8xH100, complete with chat UI. Single "depth" dial controls everything.
- **Why Interesting:** Karpathy's latest — democratizes LLM training to a single-GPU hobby project. GPT-2 speedrun leaderboard is a cool community effort.
- **Potential Use:** Educational, could train small custom models for specific tasks
- **Action:** [Explore] ⭐

### 2. microsoft/agent-lightning
- **Language:** Python
- **URL:** https://github.com/microsoft/agent-lightning
- **Description:** Train ANY AI agent with RL, with almost zero code changes. Works with LangChain, OpenAI Agent SDK, AutoGen, CrewAI, etc.
- **Why Interesting:** Framework-agnostic agent RL training. Drop in `agl.emit_xxx()` helpers and get RL optimization for free. Supports prompt optimization, SFT, and RL.
- **Potential Use:** Could optimize our agent workflows with RL. Direct relevance to our agent stack.
- **Action:** [Explore] ⭐

### 3. modelcontextprotocol/rust-sdk
- **Stars:** 3k
- **Language:** Rust
- **URL:** https://github.com/modelcontextprotocol/rust-sdk
- **Description:** Official Rust SDK for MCP (RMCP). Tokio async runtime, v0.8.0. Includes OAuth support, examples, proc macros for tool generation.
- **Why Interesting:** Official MCP Rust SDK — critical for the MCP ecosystem we're invested in. 363 commits, active development.
- **Potential Use:** Building high-performance MCP servers in Rust
- **Action:** [Watch]

### 4. anthropics/claude-quickstarts
- **Language:** Python
- **URL:** https://github.com/anthropics/claude-quickstarts
- **Description:** Collection of projects to help developers quickly get started with Claude API
- **Why Interesting:** Official Anthropic quickstarts — good reference patterns for Claude integration
- **Potential Use:** Reference for our own Claude-based projects
- **Action:** [Watch]

### 5. Jeffallan/claude-skills
- **Language:** Python
- **URL:** https://github.com/Jeffallan/claude-skills
- **Description:** 66 specialized skills for full-stack developers. Transform Claude Code into expert pair programmer.
- **Why Interesting:** Directly relevant to how we use Claude Code. Could have useful prompt patterns.
- **Potential Use:** Adopt useful skill prompts into our workflow
- **Action:** [Explore]

### 6. HKUDS/RAG-Anything
- **Language:** Python
- **URL:** https://github.com/HKUDS/RAG-Anything
- **Description:** All-in-One RAG Framework supporting multimodal documents
- **Why Interesting:** Comprehensive RAG solution — could complement or replace our current QMD setup
- **Potential Use:** Evaluate as RAG alternative
- **Action:** [Watch]

### 7. GetStream/Vision-Agents
- **Language:** Python
- **URL:** https://github.com/GetStream/Vision-Agents
- **Description:** Open Vision Agents — build vision agents with any model or video provider. Ultra-low latency via Stream's edge network.
- **Why Interesting:** Vision + agents intersection. Could be useful for visual automation tasks.
- **Potential Use:** Visual automation, screen analysis
- **Action:** [Watch]

### 8. awslabs/agent-squad
- **Language:** Python
- **URL:** https://github.com/awslabs/agent-squad
- **Description:** Flexible framework for managing multiple AI agents and handling complex conversations
- **Why Interesting:** AWS's multi-agent framework. Good to track what major cloud providers are building.
- **Potential Use:** Reference architecture for multi-agent systems
- **Action:** [Watch]

### 9. ruvnet/wifi-densepose
- **Stars:** 6,275 (98 stars today)
- **Language:** Python
- **URL:** https://github.com/ruvnet/wifi-densepose
- **Description:** WiFi-based dense human pose estimation — real-time full-body tracking through walls using commodity mesh routers
- **Why Interesting:** Novel sensing tech. Privacy implications are significant. Wild that WiFi signals can do pose estimation.
- **Potential Use:** Awareness — privacy/security implications
- **Action:** [Watch]

### 10. open-webui/open-webui
- **Language:** Python
- **URL:** https://github.com/open-webui/open-webui
- **Description:** User-friendly AI Interface supporting Ollama, OpenAI API, etc.
- **Why Interesting:** Perennial trending — solid self-hosted AI UI. We already use Ollama.
- **Potential Use:** Could use as frontend for local models
- **Action:** [Skip] (already aware)

### 11. rustfs/rustfs
- **Language:** Rust
- **URL:** https://github.com/rustfs/rustfs
- **Description:** 2.3x faster than MinIO for 4KB objects. S3-compatible high-performance object storage in Rust.
- **Why Interesting:** High-perf S3 alternative in Rust. Has MCP integration built with rmcp.
- **Potential Use:** Self-hosted object storage if needed
- **Action:** [Watch]

### 12. facebook/pyrefly
- **Language:** Rust
- **URL:** https://github.com/facebook/pyrefly
- **Description:** Fast type checker and language server for Python, from Facebook
- **Why Interesting:** Competition for mypy/pyright. Could improve Python dev experience.
- **Potential Use:** Better Python type checking in our workflows
- **Action:** [Watch]

### 13. docling-project/docling
- **Language:** Python
- **URL:** https://github.com/docling-project/docling
- **Description:** Get your documents ready for gen AI
- **Why Interesting:** Document processing pipeline for AI — useful for RAG ingestion
- **Potential Use:** Document processing for research pipeline
- **Action:** [Watch]

### 14. Zipstack/unstract
- **Language:** Python
- **URL:** https://github.com/Zipstack/unstract
- **Description:** No-code LLM Platform to launch APIs and ETL Pipelines to structure unstructured documents
- **Why Interesting:** No-code LLM orchestration for document processing
- **Potential Use:** Could simplify document ETL workflows
- **Action:** [Skip]

### 15. cheahjs/free-llm-api-resources
- **Language:** Markdown
- **URL:** https://github.com/cheahjs/free-llm-api-resources
- **Description:** A list of free LLM inference resources accessible via API
- **Why Interesting:** Useful reference for free API access to various models
- **Potential Use:** Testing/experimenting with different models at no cost
- **Action:** [Watch]
