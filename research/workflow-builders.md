# Open Source Workflow Builders for Self-Hosted AI Automation

**Research Date:** January 24, 2026  
**Target Environment:** Mac mini (Apple Silicon)  
**Focus:** Agentic workflows, local LLMs, MCP integration

---

## Executive Summary

After researching the major open-source workflow builders, **Sim Studio** emerges as the best fit for Marb's Mac mini for building agentic AI workflows, with **n8n** as a strong alternative for general automation. Both support Ollama for local LLMs and have excellent self-hosting capabilities.

### Quick Recommendation

| Use Case | Recommended Tool |
|----------|------------------|
| **AI Agent Workflows** | Sim Studio |
| **General Automation (400+ integrations)** | n8n |
| **Code-First Workflows** | Windmill |
| **Enterprise Durable Execution** | Temporal |
| **Serverless Step Functions** | Inngest |
| **LLM App Development** | Dify or Langflow |

---

## 1. Sim Studio

### Overview
**GitHub:** [simstudioai/sim](https://github.com/simstudioai/sim)  
**Website:** [sim.ai](https://sim.ai)  
**License:** Apache 2.0  
**Focus:** Visual AI agent workflow builder

Sim is an open-source visual workflow builder specifically designed for AI agent workflows. It features a drag-and-drop canvas for connecting AI models, databases, APIs, and business tools.

### Key Features
- 🎨 **Visual Workflow Editor** - Intuitive drag-and-drop canvas
- 🤖 **AI Agent Blocks** - Native support for agent orchestration
- 🔧 **80+ Integrations** - OpenAI, Anthropic, Google, Slack, Gmail, etc.
- 🔌 **MCP Support** - Native Model Context Protocol integration
- 🦙 **Ollama Integration** - Run local LLMs without external APIs
- 🤝 **Copilot Assistant** - AI-powered workflow building
- 📊 **Vector Database Support** - Qdrant, Pinecone integration

### MCP Integration (Native!)
Sim has **first-class MCP support**:
```
┌─────────────────────────────────────────────────────┐
│  Sim Workflow Canvas                                │
│  ┌─────────┐    ┌─────────┐    ┌─────────────────┐ │
│  │ Trigger │───▶│  Agent  │───▶│  MCP Tool Block │ │
│  └─────────┘    └─────────┘    └─────────────────┘ │
│                       │                             │
│                       ▼                             │
│            ┌──────────────────┐                     │
│            │  MCP Server Pool │                     │
│            │  - Database MCP  │                     │
│            │  - File System   │                     │
│            │  - Custom APIs   │                     │
│            └──────────────────┘                     │
└─────────────────────────────────────────────────────┘
```

**Using MCP in Sim:**
1. Navigate to Workspace Settings → Deployed MCPs
2. Click "Add MCP Server"
3. Configure server connection details
4. Tools become available in Agent blocks

### Ollama Integration

**Option 1: Bundled Ollama (Recommended for Mac)**
```bash
# Clone repo
git clone https://github.com/simstudioai/sim.git && cd sim

# Start with Ollama profile (GPU support on Mac)
docker compose -f docker-compose.ollama.yml --profile setup up -d

# Wait for model download, then visit http://localhost:3000
```

**Option 2: External Ollama (Running on Host)**
```bash
# If Ollama is already running on your Mac
OLLAMA_URL=http://host.docker.internal:11434 docker compose -f docker-compose.prod.yml up -d
```

### Installation Guide (Mac mini)

**Prerequisites:**
- Docker Desktop for Mac
- 12GB+ RAM recommended

**Quick Start (NPM - Simplest):**
```bash
npx simstudio
# Opens at http://localhost:3000
```

**Docker Compose (Production):**
```bash
git clone https://github.com/simstudioai/sim.git
cd sim
docker compose -f docker-compose.prod.yml up -d
# Visit http://localhost:3000
```

**Manual Setup (Development):**
```bash
# Prerequisites: Bun, Node.js v20+, PostgreSQL with pgvector
git clone https://github.com/simstudioai/sim.git
cd sim
bun install

# Start PostgreSQL with pgvector
docker run --name simstudio-db -e POSTGRES_PASSWORD=changeme \
  -e POSTGRES_DB=simstudio -p 5432:5432 -d pgvector/pgvector:pg17

# Configure environment
cp apps/sim/.env.example apps/sim/.env
cp packages/db/.env.example packages/db/.env
# Edit both to set DATABASE_URL

# Run migrations
cd packages/db && bunx drizzle-kit migrate --config=./drizzle.config.ts

# Start dev servers
bun run dev:full
```

### Tech Stack
- **Framework:** Next.js (App Router)
- **Runtime:** Bun
- **Database:** PostgreSQL + pgvector
- **Auth:** Better Auth
- **UI:** Shadcn + Tailwind CSS
- **Flow Editor:** ReactFlow
- **Realtime:** Socket.io

---

## 2. n8n

### Overview
**GitHub:** [n8n-io/n8n](https://github.com/n8n-io/n8n) (162k+ stars)  
**Website:** [n8n.io](https://n8n.io)  
**License:** Fair-code (Sustainable Use License)  
**Focus:** General workflow automation with AI capabilities

n8n is the most popular open-source workflow automation platform. It combines visual building with custom code support and has native AI capabilities built on LangChain.

### Key Features
- 🔗 **400+ Integrations** - Largest integration library
- 🐍 **Code When Needed** - JavaScript/Python support
- 🤖 **AI-Native** - LangChain-based AI workflows
- 🏠 **Self-Host Friendly** - Full control over data
- 🏢 **Enterprise Ready** - SSO, permissions, air-gapped

### AI Capabilities (LangChain-Based)
```
┌─────────────────────────────────────────────────────────┐
│  n8n AI Workflow                                        │
│  ┌──────────┐   ┌─────────┐   ┌──────────────────────┐ │
│  │ Trigger  │──▶│AI Agent │──▶│ Tool Nodes           │ │
│  │(Chat/API)│   │(LangChain)  │ - Calculator         │ │
│  └──────────┘   └─────────┘   │ - Web Search         │ │
│                      │        │ - Code Execution     │ │
│                      ▼        └──────────────────────┘ │
│              ┌─────────────┐                           │
│              │ LLM Node    │                           │
│              │ - OpenAI    │                           │
│              │ - Ollama ✓  │                           │
│              │ - Anthropic │                           │
│              └─────────────┘                           │
└─────────────────────────────────────────────────────────┘
```

### Ollama Integration
n8n has a dedicated **Ollama Model node** for local LLM support:

1. Install Ollama on your Mac: `brew install ollama`
2. Pull a model: `ollama pull llama3.2`
3. In n8n, add "Ollama Model" sub-node
4. Configure base URL: `http://host.docker.internal:11434`

**Note:** The Ollama node works with Basic LLM Chain, not the AI Agent node (lacks tools support).

### Self-Hosted AI Starter Kit 🌟

n8n provides a complete local AI stack:

```bash
git clone https://github.com/n8n-io/self-hosted-ai-starter-kit.git
cd self-hosted-ai-starter-kit
cp .env.example .env

# For Mac (Apple Silicon) - run Ollama separately
docker compose up

# Set OLLAMA_HOST=host.docker.internal:11434 in .env
```

**What's Included:**
- ✅ n8n (workflow automation)
- ✅ Ollama (local LLMs)
- ✅ Qdrant (vector database)
- ✅ PostgreSQL (data storage)

### Installation Guide (Mac mini)

**Quick Start (npx):**
```bash
npx n8n
# Opens at http://localhost:5678
```

**Docker (Recommended):**
```bash
docker volume create n8n_data
docker run -it --rm --name n8n -p 5678:5678 \
  -v n8n_data:/home/node/.n8n \
  docker.n8n.io/n8nio/n8n
```

---

## 3. Windmill

### Overview
**GitHub:** [windmill-labs/windmill](https://github.com/windmill-labs/windmill)  
**Website:** [windmill.dev](https://windmill.dev)  
**License:** AGPLv3 (Community) / Commercial  
**Focus:** Developer platform for scripts, workflows, and UIs

Windmill is the **fastest self-hostable workflow engine** (13x faster than Airflow). It's designed for developers who want to write code but need workflow orchestration.

### Key Features
- ⚡ **Fastest Engine** - 13x faster than Airflow
- 💻 **Multi-Language** - Python, TypeScript, Go, PHP, Bash, SQL
- 🔒 **Secure Sandboxing** - nsjail for production-grade isolation
- 🎨 **Auto-Generated UIs** - Scripts become UIs automatically
- 📊 **Low-Code App Builder** - Build internal tools

### Architecture
```
┌────────────────────────────────────────────────────────┐
│                    Windmill Architecture               │
│  ┌──────────┐    ┌──────────┐    ┌──────────────────┐ │
│  │ Frontend │    │ API      │    │ Workers          │ │
│  │ (Svelte) │◀──▶│ (Rust)   │◀──▶│ (Pull from queue)│ │
│  └──────────┘    └──────────┘    └──────────────────┘ │
│                       │                    │           │
│                       ▼                    ▼           │
│              ┌─────────────┐    ┌──────────────────┐  │
│              │ PostgreSQL  │    │ nsjail Sandbox   │  │
│              │ (Jobs/State)│    │ - Deno (JS/TS)   │  │
│              └─────────────┘    │ - Python3        │  │
│                                 │ - Go/Bash        │  │
│                                 └──────────────────┘  │
└────────────────────────────────────────────────────────┘
```

### Installation (Mac mini)

```bash
# Download compose files
curl https://raw.githubusercontent.com/windmill-labs/windmill/main/docker-compose.yml -o docker-compose.yml
curl https://raw.githubusercontent.com/windmill-labs/windmill/main/Caddyfile -o Caddyfile
curl https://raw.githubusercontent.com/windmill-labs/windmill/main/.env -o .env

docker compose up -d
# Visit http://localhost
# Login: admin@windmill.dev / changeme
```

### When to Use Windmill
- You prefer writing code over visual builders
- You need the fastest execution times
- You want auto-generated UIs from scripts
- You're building internal developer tools

---

## 4. Temporal

### Overview
**GitHub:** [temporalio/temporal](https://github.com/temporalio/temporal)  
**Website:** [temporal.io](https://temporal.io)  
**License:** MIT  
**Focus:** Durable execution platform

Temporal is a production-grade durable execution platform. It originated as a fork of Uber's Cadence and is designed for building scalable applications that automatically handle failures.

### Key Features
- 🔄 **Durable Execution** - Survives failures and restarts
- ⏱️ **Long-Running Workflows** - Days, weeks, months
- 🔁 **Automatic Retries** - Built-in failure handling
- 📈 **Highly Scalable** - Battle-tested at Uber scale
- 🧪 **Testable** - First-class testing support

### Architecture
```
┌──────────────────────────────────────────────────────┐
│                 Temporal Architecture                │
│                                                      │
│  ┌──────────────┐    ┌──────────────────────────┐   │
│  │ Your App     │    │ Temporal Server          │   │
│  │ (Worker)     │◀──▶│ - History Service        │   │
│  │ - Workflows  │    │ - Matching Service       │   │
│  │ - Activities │    │ - Frontend Service       │   │
│  └──────────────┘    └──────────────────────────┘   │
│                              │                       │
│                              ▼                       │
│                      ┌──────────────┐               │
│                      │ PostgreSQL/  │               │
│                      │ Cassandra    │               │
│                      └──────────────┘               │
└──────────────────────────────────────────────────────┘
```

### Installation (Mac mini)

```bash
# Install CLI
brew install temporal

# Start dev server
temporal server start-dev

# Web UI at http://localhost:8233
```

### When to Use Temporal
- Building mission-critical workflows
- Need durable execution guarantees
- Complex multi-service orchestration
- You have engineering resources for code-first approach

---

## 5. Inngest

### Overview
**GitHub:** [inngest/inngest](https://github.com/inngest/inngest)  
**Website:** [inngest.com](https://inngest.com)  
**License:** SSPL (Server) / Apache 2.0 (SDKs)  
**Focus:** Durable functions for serverless

Inngest provides durable step functions that replace queues, state management, and scheduling. It's designed for developers building reliable background jobs.

### Key Features
- 🔧 **Durable Functions** - Auto-retry, state persistence
- 🎯 **Event-Driven** - Trigger by events, cron, webhooks
- 🚦 **Flow Control** - Concurrency, throttling, rate limiting
- 🏃 **Step Functions** - Break work into reliable steps
- ☁️ **Serverless-First** - Deploy anywhere

### How It Works
```typescript
// Inngest durable function example
export default inngest.createFunction(
  {
    id: "process-order",
    concurrency: { key: "event.data.userId", limit: 5 }
  },
  { event: "order/created" },
  async ({ event, step }) => {
    // Each step is individually retried on failure
    const validated = await step.run("validate", async () => {
      return validateOrder(event.data);
    });
    
    await step.run("charge", async () => {
      return chargeCard(validated);
    });
    
    await step.run("fulfill", async () => {
      return fulfillOrder(validated);
    });
  }
);
```

### Installation (Mac mini)

```bash
# Run dev server
npx inngest-cli@latest dev

# Dashboard at http://localhost:8288
```

### When to Use Inngest
- Serverless background jobs
- Event-driven architectures
- Need flow control (throttling, concurrency)
- TypeScript/JavaScript projects

---

## 6. Additional Alternatives

### Langflow
**GitHub:** [langflow-ai/langflow](https://github.com/langflow-ai/langflow)  
**Focus:** LangChain visual builder

- ✅ **MCP Support** - Deploy flows as MCP servers
- ✅ Visual builder for LangChain
- ✅ Desktop app available
- ✅ Python-based

```bash
uv pip install langflow -U
uv run langflow run
# http://127.0.0.1:7860
```

### Dify
**GitHub:** [langgenius/dify](https://github.com/langgenius/dify)  
**Focus:** LLM application development platform

- ✅ Agentic workflow builder
- ✅ RAG pipeline support
- ✅ 50+ built-in tools
- ✅ LLMOps features

```bash
git clone https://github.com/langgenius/dify.git
cd dify/docker
cp .env.example .env
docker compose up -d
# http://localhost/install
```

---

## Comparison Table

| Feature | Sim | n8n | Windmill | Temporal | Inngest | Langflow | Dify |
|---------|-----|-----|----------|----------|---------|----------|------|
| **Visual Builder** | ✅ Excellent | ✅ Excellent | ✅ Good | ❌ Code-only | ❌ Code-only | ✅ Excellent | ✅ Excellent |
| **MCP Support** | ✅ Native | ❌ | ❌ | ❌ | ❌ | ✅ Native | ❌ |
| **Ollama Support** | ✅ Native | ✅ Node | ⚪ Via API | ⚪ Via API | ⚪ Via API | ✅ | ✅ |
| **Integrations** | 80+ | 400+ | 300+ | SDK-based | SDK-based | LangChain | 50+ tools |
| **AI-First** | ✅ | ✅ (LangChain) | ⚪ | ❌ | ❌ | ✅ | ✅ |
| **Code Support** | TypeScript | JS/Python | Multi-lang | Multi-lang | TS/Python | Python | Python |
| **Self-Host Ease** | 🟢 Easy | 🟢 Easy | 🟢 Easy | 🟡 Medium | 🟢 Easy | 🟢 Easy | 🟢 Easy |
| **Mac Optimized** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **License** | Apache 2.0 | Fair-code | AGPLv3 | MIT | SSPL | MIT | Apache 2.0 |
| **Community** | Growing | Large | Medium | Large | Growing | Large | Very Large |

---

## Workflow Patterns

### Common Trigger Types
```
┌─────────────────────────────────────────────────┐
│                 Trigger Types                   │
├─────────────────────────────────────────────────┤
│  📨 Webhook      → HTTP POST to endpoint        │
│  ⏰ Cron/Schedule → "0 9 * * *" (9am daily)     │
│  💬 Chat         → User message in chat UI      │
│  📧 Email        → Incoming email trigger       │
│  🔔 Event        → Event bus message            │
│  📁 File         → File system change           │
│  🔗 API          → REST API call                │
└─────────────────────────────────────────────────┘
```

### Error Handling Patterns
```
┌─────────────────────────────────────────────────────────┐
│              Error Handling Strategies                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  1. RETRY WITH BACKOFF                                  │
│     ┌─────┐ fail ┌─────────┐     ┌─────┐              │
│     │Step │─────▶│Wait 2^n │────▶│Retry│              │
│     └─────┘      │ seconds │     └─────┘              │
│                  └─────────┘                           │
│                                                         │
│  2. FALLBACK PATH                                       │
│     ┌─────┐ fail ┌──────────────┐                     │
│     │Step │─────▶│Fallback Step │                     │
│     └─────┘      └──────────────┘                     │
│                                                         │
│  3. DEAD LETTER QUEUE                                   │
│     ┌─────┐ fail ┌─────────┐                          │
│     │Step │─────▶│DLQ/Alert│                          │
│     └─────┘      └─────────┘                          │
│                                                         │
│  4. COMPENSATION (Saga Pattern)                         │
│     ┌────┐ fail ┌──────────┐                          │
│     │Step│─────▶│Undo Prev │                          │
│     └────┘      │  Steps   │                          │
│                 └──────────┘                           │
└─────────────────────────────────────────────────────────┘
```

### Agent Workflow Pattern
```
┌─────────────────────────────────────────────────────────────┐
│                  Agentic Workflow Pattern                   │
│                                                             │
│  ┌─────────┐    ┌──────────────────────────────────────┐   │
│  │ Input   │───▶│            AI Agent                  │   │
│  │ (Query) │    │  ┌────────────────────────────────┐  │   │
│  └─────────┘    │  │         Tool Selection         │  │   │
│                 │  │  "I need to search the web"    │  │   │
│                 │  └────────────────────────────────┘  │   │
│                 │              │                        │   │
│                 │              ▼                        │   │
│                 │  ┌────────────────────────────────┐  │   │
│                 │  │       Execute Tool             │  │   │
│                 │  │  - web_search("query")         │  │   │
│                 │  │  - read_file("/path")          │  │   │
│                 │  │  - mcp_tool("action")          │  │   │
│                 │  └────────────────────────────────┘  │   │
│                 │              │                        │   │
│                 │              ▼                        │   │
│                 │  ┌────────────────────────────────┐  │   │
│                 │  │      Process Results           │  │   │
│                 │  │  Loop until task complete      │  │   │
│                 │  └────────────────────────────────┘  │   │
│                 └──────────────────────────────────────┘   │
│                              │                              │
│                              ▼                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                    Final Output                      │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Recommended Stack for Mac mini

### Primary Stack: Sim + Ollama + Qdrant

```
┌─────────────────────────────────────────────────────────────┐
│              Recommended Local AI Stack                     │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                    Sim Studio                        │   │
│  │        Visual AI Workflow Builder (Port 3000)        │   │
│  └─────────────────────────────────────────────────────┘   │
│                          │                                  │
│           ┌──────────────┼──────────────┐                  │
│           ▼              ▼              ▼                  │
│  ┌──────────────┐ ┌────────────┐ ┌────────────────┐       │
│  │   Ollama     │ │  Qdrant    │ │   PostgreSQL   │       │
│  │  (Port 11434)│ │(Port 6333) │ │  (Port 5432)   │       │
│  │              │ │            │ │                │       │
│  │ - llama3.2   │ │ - Vector   │ │ - Workflow     │       │
│  │ - mistral    │ │   Search   │ │   State        │       │
│  │ - gemma2     │ │ - RAG      │ │ - pgvector     │       │
│  └──────────────┘ └────────────┘ └────────────────┘       │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                   MCP Servers                        │   │
│  │  - File System MCP (local files)                     │   │
│  │  - Browser MCP (web automation)                      │   │
│  │  - Database MCP (query databases)                    │   │
│  │  - Custom MCPs (your tools)                          │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Setup Script

```bash
#!/bin/bash
# setup-local-ai-stack.sh

# 1. Install Ollama (runs natively on Mac for best performance)
brew install ollama
ollama serve &

# 2. Pull recommended models
ollama pull llama3.2
ollama pull mistral
ollama pull nomic-embed-text  # For embeddings

# 3. Clone and start Sim Studio
git clone https://github.com/simstudioai/sim.git
cd sim

# 4. Start with external Ollama
OLLAMA_URL=http://host.docker.internal:11434 \
docker compose -f docker-compose.prod.yml up -d

echo "✅ Stack ready!"
echo "   Sim Studio: http://localhost:3000"
echo "   Ollama API: http://localhost:11434"
```

### Alternative: n8n AI Starter Kit

If you need more general automation beyond AI:

```bash
git clone https://github.com/n8n-io/self-hosted-ai-starter-kit.git
cd self-hosted-ai-starter-kit
cp .env.example .env

# Edit .env: Set OLLAMA_HOST=host.docker.internal:11434

# Install Ollama separately for Mac
brew install ollama
ollama serve &
ollama pull llama3.2

# Start n8n stack
docker compose up

# n8n: http://localhost:5678
```

---

## Resource Requirements

### Mac mini Specifications

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| **RAM** | 8GB | 16GB+ |
| **Storage** | 50GB free | 100GB+ SSD |
| **CPU** | M1 | M1 Pro/Max or M2+ |
| **Docker** | Docker Desktop | Docker Desktop |

### Per-Tool Memory Usage

| Tool | Idle RAM | Active RAM |
|------|----------|------------|
| Sim Studio | ~500MB | 1-2GB |
| n8n | ~300MB | 500MB-1GB |
| Ollama (7B model) | ~5GB | 5-8GB |
| Ollama (13B model) | ~10GB | 10-14GB |
| Qdrant | ~200MB | 500MB-2GB |
| PostgreSQL | ~100MB | 200-500MB |

**Recommendation:** With 16GB RAM, you can comfortably run:
- Sim or n8n
- Ollama with 7B-8B models
- Qdrant for vector storage
- PostgreSQL for data

---

## Conclusion

### For Marb's Mac mini, I recommend:

1. **Primary: Sim Studio** - Best for AI agent workflows with native MCP support
2. **Ollama** - Run locally for best Mac performance (not in Docker)
3. **Qdrant** - Vector database for RAG workflows
4. **PostgreSQL with pgvector** - Included with Sim

### Why Sim over n8n for AI workflows?

| Aspect | Sim | n8n |
|--------|-----|-----|
| AI-First Design | ✅ Built for agents | ⚪ AI is an add-on |
| MCP Integration | ✅ Native support | ❌ Not available |
| Ollama Integration | ✅ First-class | ⚪ Via sub-node |
| Visual Agent Building | ✅ Excellent | ⚪ Good |
| General Integrations | ⚪ 80+ | ✅ 400+ |

**If you need 400+ integrations** for non-AI automation, use **n8n** alongside Sim.

---

## Quick Reference Commands

```bash
# Start Sim with local Ollama
OLLAMA_URL=http://host.docker.internal:11434 \
docker compose -f docker-compose.prod.yml up -d

# Pull new Ollama model
ollama pull codellama:7b

# Check Sim logs
docker compose logs -f sim

# Stop everything
docker compose down

# Backup Sim database
docker exec simstudio-db pg_dump -U postgres simstudio > backup.sql
```

---

*Research compiled by Clawdbot • January 2026*
