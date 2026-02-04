# Deep Dive: NevaMind-AI/memU

**URL:** https://github.com/NevaMind-AI/memU  
**Language:** Python  
**License:** Apache 2.0  
**Tagline:** "Memory for 24/7 proactive agents like openclaw (moltbot, clawdbot)"

## Overview

memU is a memory framework specifically designed for 24/7 proactive agents. It addresses the core challenge of keeping long-running agents memory-efficient and context-aware without burning excessive tokens.

**Key Insight**: They explicitly mention Clawdbot by name! This is purpose-built for our exact use case.

## Core Problem Solved

Running an AI agent 24/7 creates challenges:
1. **Token Cost**: Keeping full history in context is expensive
2. **Context Limits**: Can't fit everything in one prompt
3. **Memory Relevance**: Need to surface the right memories at the right time
4. **Intent Tracking**: Agent should understand user goals proactively

## Architecture

### Hierarchical Memory System

```
┌─────────────────────────────────────────────┐
│              CATEGORY LAYER                 │
│  (Auto-organized topic summaries)           │
├─────────────────────────────────────────────┤
│               ITEM LAYER                    │
│  (Individual facts, preferences, insights)  │
├─────────────────────────────────────────────┤
│             RESOURCE LAYER                  │
│  (Original data: conversations, docs, etc.) │
└─────────────────────────────────────────────┘
```

| Layer | Reactive Use | Proactive Use |
|-------|--------------|---------------|
| Resource | Direct access to original data | Background monitoring for new patterns |
| Item | Targeted fact retrieval | Real-time extraction from ongoing interactions |
| Category | Summary-level overview | Automatic context assembly for anticipation |

### Proactive Memory Lifecycle

```
USER QUERY
    │
    ▼
┌────────────────────────┐     ┌──────────────────────────┐
│     MAIN AGENT         │ ◄──►│        MEMU BOT          │
│                        │     │                          │
│ Handle queries &       │     │ Monitor, memorize &      │
│ execute tasks          │     │ proactive intelligence   │
│                        │     │                          │
│ 1. Receive input       │───► │ 1. Monitor I/O           │
│ 2. Plan & execute      │◄─── │ 2. Memorize & extract    │
│ 3. Respond to user     │───► │ 3. Predict intent        │
│ 4. Loop                │◄─── │ 4. Run proactive tasks   │
└────────────────────────┘     └──────────────────────────┘
                    │
                    ▼
        ┌──────────────────────┐
        │  CONTINUOUS SYNC     │
        │ Agent ◄─► MemU ◄─► DB│
        └──────────────────────┘
```

## Key Features

### 1. Continuous Learning
- Automatically extracts preferences from casual mentions
- Builds relationship models from interaction patterns
- Adapts communication style based on learned preferences

### 2. Cost Efficiency
- Caches insights to avoid redundant LLM calls
- Hierarchical retrieval (RAG for fast, LLM for deep)
- Only loads relevant context

### 3. Proactive Use Cases

**Information Recommendation**
```python
# User has been researching AI topics
# MemU tracks: reading history, saved articles, search queries

# When new content arrives:
# Agent: "I found 3 new papers on RAG optimization that align with
#  your recent research on retrieval systems."
```

**Email Management**
```python
# MemU observes email patterns over time
# - Response templates for common scenarios
# - Priority contacts and urgent keywords
# - Writing style and tone variations

# Agent: "You have 12 new emails. I've drafted responses for 3 routine
#  requests and flagged 2 urgent items from your priority contacts."
```

**Trading & Financial Monitoring**
```python
# MemU learns trading preferences:
# - Risk tolerance from historical decisions
# - Preferred sectors and asset classes

# Agent: "NVDA dropped 5% in after-hours trading. Based on your past
#  behavior, you typically buy tech dips above 3%."
```

## API

### memorize() — Continuous Learning

```python
result = await service.memorize(
    resource_url="path/to/file.json",
    modality="conversation",  # conversation | document | image | video | audio
    user={"user_id": "123"}
)

# Returns immediately with extracted memory:
{
    "resource": {...},      # Stored resource metadata
    "items": [...],         # Extracted memory items (instant)
    "categories": [...]     # Auto-updated categories
}
```

### retrieve() — Dual-Mode Intelligence

**RAG Mode (Fast)**: Sub-second, embedding-based
**LLM Mode (Deep)**: Intent prediction, query evolution

```python
result = await service.retrieve(
    queries=[
        {"role": "user", "content": {"text": "What are their preferences?"}},
    ],
    where={"user_id": "123"},
    method="rag"  # or "llm"
)

# Returns:
{
    "categories": [...],      # Relevant topics (auto-prioritized)
    "items": [...],           # Specific facts
    "resources": [...],       # Original sources
    "next_step_query": "..."  # Predicted follow-up
}
```

## Custom LLM Support

```python
service = MemUService(
    llm_profiles={
        "default": {
            "base_url": "https://api.openai.com/v1",
            "api_key": "...",
            "chat_model": "gpt-4o",
        },
        "embedding": {
            "base_url": "https://api.voyageai.com/v1",
            "api_key": "...",
            "embed_model": "voyage-3.5-lite"
        }
    }
)
```

Supports: OpenAI, Anthropic, OpenRouter, Qwen, custom endpoints

## Performance

- **92.09% average accuracy** on Locomo benchmark
- Sub-second RAG retrieval
- Automatic category organization

## Storage Options

- **In-memory** (for testing)
- **PostgreSQL + pgvector** (production)
- Cloud hosted at memu.so

## Why This Matters for Clawdbot

### Current Memory System
```
~/clawd/
├── memory/
│   ├── 2026-01-28.md
│   ├── 2026-01-29.md
│   └── ...
├── MEMORY.md (curated long-term)
└── AGENTS.md, SOUL.md, etc.
```

### Problems memU Could Solve

1. **Token Efficiency**: Current approach loads full files. memU retrieves relevant chunks.
2. **Proactive Context**: memU anticipates what info is needed.
3. **Auto-Categorization**: No manual organization needed.
4. **Cross-Session Memory**: Better than daily files for patterns.

## Integration Path

1. **Parallel Testing**: Run memU alongside existing memory
2. **Gradual Migration**: Start with conversation memory
3. **Hybrid Approach**: Keep MEMORY.md for curated wisdom, use memU for auto-capture
4. **Proactive Features**: Enable intent prediction after data accumulates

## Verdict

**HIGH PRIORITY for integration**. This is explicitly designed for agents like Clawdbot. The hierarchical memory system and proactive intent prediction could significantly improve:
- Token efficiency (lower cost)
- Context relevance (better responses)
- Autonomous behavior (anticipate needs)

## Next Steps

1. **Install**: `pip install memu` or use cloud API
2. **Test**: Run `examples/proactive/proactive.py`
3. **Evaluate**: Compare memory quality vs current system
4. **Integrate**: Start with conversation memory
5. **Monitor**: Track token usage reduction

## Resources

- Cloud: https://memu.so
- API Docs: https://memu.pro/docs
- Discord: https://discord.gg/memu
