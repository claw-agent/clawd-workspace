# Bleeding Edge AI - Week of Jan 17-24, 2026

> Deep research on cutting-edge AI tools, techniques, and developments from X/Twitter, HN, Reddit, and GitHub.

---

## 🔥 HOT FINDS - Highest Priority

### 1. Context7 MCP - Up-to-date Code Documentation
**Stars:** 43.3k | **Repo:** [upstash/context7](https://github.com/upstash/context7)

The hottest MCP server right now. Pulls up-to-date, version-specific documentation straight from the source into your prompts. No more hallucinated APIs!

**Why it's game-changing:**
- Fetches current docs for any library you're working with
- Add `use context7` to any prompt and it auto-injects relevant docs
- Works with Cursor, Claude Code, VS Code, and 30+ clients

**Setup for Claude Code:**
```bash
claude mcp add context7 -- npx -y @upstash/context7-mcp --api-key YOUR_API_KEY

# Or remote connection:
claude mcp add --header "CONTEXT7_API_KEY: YOUR_API_KEY" --transport http context7 https://mcp.context7.com/mcp
```

**Pro tip:** Add a rule to auto-invoke Context7:
> "Always use Context7 MCP when I need library/API documentation, code generation, setup or configuration steps without me having to explicitly ask."

---

### 2. Serena - Semantic Code Retrieval MCP
**Stars:** 19.1k | **Repo:** [oraios/serena](https://github.com/oraios/serena)

Turns any LLM into a fully-featured coding agent with IDE-like semantic understanding. Users report "game changer" and "absolutely insane improvement" to Claude Code.

**Why it matters:**
- Symbol-level code retrieval (not just grep)
- Works with `find_symbol`, `find_referencing_symbols`, `insert_after_symbol`
- Supports 30+ languages via LSP
- JetBrains plugin available for even more power

**Setup:**
```bash
uvx --from git+https://github.com/oraios/serena serena start-mcp-server --help
```

**Impact:** Users report 2-3x faster operations and 30-50% fewer tokens on complex codebases.

---

### 3. wshobson/agents - Multi-Agent Orchestration for Claude Code
**Stars:** 26.6k | **Repo:** [wshobson/agents](https://github.com/wshobson/agents)

Production-ready system with **108 specialized AI agents**, **15 workflow orchestrators**, and **129 agent skills** organized into 72 focused plugins.

**What's included:**
- 72 Focused Plugins (architecture, languages, infrastructure, quality, data/AI, etc.)
- Three-tier model strategy: Opus 4.5 for critical work, Sonnet 4.5 for complex tasks, Haiku 4.5 for fast ops
- Full-stack orchestration that coordinates 7+ agents for feature development

**Quick Install:**
```bash
/plugin marketplace add wshobson/agents
/plugin install python-development    # Python with 5 specialized skills
/plugin install kubernetes-operations # K8s with 4 deployment skills
/plugin install full-stack-orchestration # Multi-agent workflows
```

**Example - Full-Stack Feature Development:**
```
/full-stack-orchestration:full-stack-feature "user authentication with OAuth2"
```
Coordinates: backend-architect → database-architect → frontend-developer → test-automator → security-auditor → deployment-engineer → observability-engineer

---

### 4. Everything Claude Code (by Anthropic Hackathon Winner)
**Stars:** 23.6k | **Repo:** [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code)

Battle-tested configs evolved over 10+ months of intensive daily use. From an Anthropic hackathon winner.

**Key Components:**
- **Agents:** planner, architect, tdd-guide, code-reviewer, security-reviewer, build-error-resolver
- **Skills:** coding-standards, backend-patterns, frontend-patterns, continuous-learning
- **Commands:** /tdd, /plan, /e2e, /code-review, /build-fix, /learn, /verify
- **Hooks:** Memory persistence, session lifecycle, strategic compaction

**Install:**
```bash
/plugin marketplace add affaan-m/everything-claude-code
/plugin install everything-claude-code@everything-claude-code
```

**Longform Guides (must-read):**
- Token Optimization: Model selection, system prompt slimming
- Memory Persistence: Auto-save/load context across sessions
- Verification Loops: Checkpoint vs continuous evals
- Parallelization: Git worktrees, cascade method

---

### 5. SuperClaude Framework
**Stars:** 20.4k | **Repo:** [SuperClaude-Org/SuperClaude_Framework](https://github.com/SuperClaude-Org/SuperClaude_Framework)

Meta-programming framework with 30 slash commands, 16 specialized agents, 7 behavioral modes, and 8 MCP server integrations.

**Standout Features:**
- **Deep Research**: Autonomous web research with multi-hop reasoning, adaptive planning, quality scoring
- **Behavioral Modes**: Brainstorming, Business Panel, Deep Research, Orchestration, Token-Efficiency
- **Agent System**: PM ensures continuous learning, Security engineer catches real vulnerabilities

**Install:**
```bash
pipx install superclaude
superclaude install
superclaude mcp --servers tavily context7  # Enhanced capabilities
```

**Commands:** `/sc:research`, `/sc:brainstorm`, `/sc:implement`, `/sc:test`, `/sc:pm`

---

## 🛠️ MCP SERVERS - The New Ecosystem

### Microsoft Playwright MCP
**Stars:** 26.1k | **Repo:** [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp)

Browser automation for AI - uses accessibility tree, not screenshots. LLM-friendly, deterministic.

```bash
claude mcp add playwright npx @playwright/mcp@latest
```

**Features:**
- Works headless by default
- Vision and PDF capabilities
- Codegen support for TypeScript
- Works in VS Code, Cursor, Windsurf, Claude Code, Goose, Codex

---

### GitHub Official MCP Server
**Stars:** 26.2k | **Repo:** [github/github-mcp-server](https://github.com/github/github-mcp-server)

GitHub's official MCP Server - connects AI tools directly to GitHub's platform.

**Use Cases:**
- Repository management: Browse code, search files, analyze commits
- Issue & PR automation: Create, update, triage, review
- CI/CD intelligence: Monitor Actions, analyze failures, manage releases
- Code analysis: Security findings, Dependabot alerts

**Setup (Remote - easiest):**
```json
{
  "mcpServers": {
    "github": {
      "url": "https://api.githubcopilot.com/mcp/"
    }
  }
}
```

---

### AWS Official MCP Servers
**Stars:** 7.9k | **Repo:** [awslabs/mcp](https://github.com/awslabs/mcp)

Official AWS MCP servers for cloud infrastructure automation.

---

### Chrome MCP Server
**Stars:** 10.1k | **Repo:** [hangwin/mcp-chrome](https://github.com/hangwin/mcp-chrome)

Chrome extension-based MCP server that exposes browser functionality to AI.

---

### GitMCP - No Hallucinations
**Stars:** 7.5k | **Repo:** [idosal/git-mcp](https://github.com/idosal/git-mcp)

Remote MCP server for any GitHub project. "Put an end to code hallucinations!"

---

### Figma Context MCP
**Stars:** 12.7k | **Repo:** [GLips/Figma-Context-MCP](https://github.com/GLips/Figma-Context-MCP)

Provides Figma layout information to AI coding agents like Cursor.

---

## 🤖 AI CODING TOOLS

### OpenAI Operator (CUA - Computer-Using Agent)
**Announced:** January 2025 | **Status:** Integrated into ChatGPT as "agent mode"

OpenAI's browser automation agent using Computer-Using Agent (CUA) model. Uses screenshots + reasoning to interact with web pages.

**Key Points:**
- GPT-4o vision + reinforcement learning
- Self-correction capabilities
- Can handle forms, grocery ordering, meme creation
- Partnered with DoorDash, Instacart, OpenTable, Uber, etc.
- CUA coming to API soon

---

### llama.vim - Local LLM Completion in Vim
**Stars:** 530+ | **Repo:** [ggml-org/llama.vim](https://github.com/ggml-org/llama.vim)

Local LLM-assisted text completion for Vim/Neovim. Uses llama.cpp.

**Features:**
- Fill-in-Middle (FIM) completions
- Instruction-based editing with Ctrl+I
- Speculative decoding support
- Ring context with chunks from open files

**Setup:**
```bash
# Install llama.cpp
brew install llama.cpp  # macOS

# Start server
llama-server --fim-qwen-7b-default  # 16GB+ VRAM
llama-server --fim-qwen-3b-default  # <16GB VRAM
```

**Vim plugin:**
```vim
Plug 'ggml-org/llama.vim'
```

---

### OpenAI Codex with Ollama
**Blog:** January 15, 2026

Open models can now be used with OpenAI's Codex CLI through Ollama!

```bash
ollama run gpt-oss:20b   # or gpt-oss:120b
```

Works for reading, modifying, and executing code in your working directory.

---

## 🧠 LOCAL LLM DEVELOPMENTS

### DeepSeek R1 - Updated to R1-0528
**Available:** Ollama | [ollama.com/library/deepseek-r1](https://ollama.com/library/deepseek-r1)

Major upgrade with significantly improved reasoning. "Performance approaching O3 and Gemini 2.5 Pro."

**Models:**
```bash
ollama run deepseek-r1          # 8B (Qwen3 distilled)
ollama run deepseek-r1:671b     # Full 671B
ollama run deepseek-r1:1.5b     # Ultra-lightweight
ollama run deepseek-r1:70b      # Llama distilled
```

**License:** MIT - supports commercial use, allows distillation!

---

### Running MoE Models on CPU/RAM (Reddit r/LocalLLaMA)
Real-world performance guide for running 120B+ parameter models on consumer hardware.

**Key Insights:**
- GLM-4.7-Flash (3B active): ~20 tokens/sec on DDR5-6000
- GPT OSS 120B (5.1B active): ~14 tokens/sec on DDR5-6000
- Critical settings: XMP enabled, P-core pinning, power limits unlocked

**Build command for max performance:**
```bash
cmake .. -DGGML_CUDA=ON \
  -DCMAKE_C_FLAGS="-march=raptorlake -mtune=native -O3 -flto=auto"
```

---

## 📊 TRENDING ON HACKER NEWS (This Week)

| Story | Points | Link |
|-------|--------|------|
| Llama.vim - Local LLM-assisted text completion | 530 | [HN](https://news.ycombinator.com/item?id=42806328) |
| OpenAI Operator Research Preview | 436 | [HN](https://news.ycombinator.com/item?id=42806301) |
| Open-source AI video editor (fal.ai) | 268 | [HN](https://news.ycombinator.com/item?id=42806616) |
| DeepSeek R1 on Ollama | 234 | [HN](https://news.ycombinator.com/item?id=42772983) |
| Hunyuan3D 2.0 - 3D Assets Generation | 323 | [HN](https://news.ycombinator.com/item?id=42786040) |
| Kimi K1.5 - Scaling RL with LLMs | 203 | [HN](https://news.ycombinator.com/item?id=42777857) |
| Ask HN: Cool uses of tiny language models | 684 | [HN](https://news.ycombinator.com/item?id=42784365) |
| Stargate Project (OpenAI/Oracle/SoftBank) | 1021 | [HN](https://news.ycombinator.com/item?id=42785891) |

---

## 🎯 QUICK SETUP GUIDE - Get Everything Running

### Essential MCP Stack for Claude Code

```bash
# 1. Context7 - Library documentation
claude mcp add context7 -- npx -y @upstash/context7-mcp

# 2. Serena - Semantic code understanding
uvx --from git+https://github.com/oraios/serena serena start-mcp-server

# 3. Playwright - Browser automation
claude mcp add playwright npx @playwright/mcp@latest

# 4. GitHub - Repository management
claude mcp add github -- docker run -i --rm -e GITHUB_PERSONAL_ACCESS_TOKEN ghcr.io/github/github-mcp-server
```

### Plugin Stack for Claude Code

```bash
# Add marketplaces
/plugin marketplace add wshobson/agents
/plugin marketplace add affaan-m/everything-claude-code

# Install must-haves
/plugin install everything-claude-code@everything-claude-code
/plugin install python-development
/plugin install full-stack-orchestration
```

### Local LLM for Vim/Coding

```bash
# Install llama.cpp
brew install llama.cpp

# Start server with FIM model
llama-server --fim-qwen-7b-default

# Install vim plugin
# Add to .vimrc: Plug 'ggml-org/llama.vim'
```

---

## 📚 RESOURCES TO FOLLOW

### Key Accounts (X/Twitter)
- @anthropaborations - Anthropic news
- @alexalbert__ - Anthropic / Claude Code
- @karpathy - AI fundamentals
- @levelsio - Indie AI / vibe coding
- @swyx - AI engineering
- @emollick - AI research accessibility

### Subreddits
- r/ClaudeAI - Claude-specific discussions
- r/LocalLLaMA - Local model developments
- r/MachineLearning - Research

### Hashtags
- #claudecode
- #aiagents
- #vibe-coding

---

## 🔮 WHAT TO WATCH NEXT

1. **CUA in API** - OpenAI releasing Computer-Using Agent to developers
2. **Claude Code Plugins v5** - TypeScript plugin system in development
3. **DeepSeek R1** - Continuous improvements, now MIT licensed for commercial use
4. **MCP Ecosystem** - Explosive growth in MCP servers for every integration

---

*Last updated: January 24, 2026*
*Research by: Clawdbot Subagent*
