# Deep Dive: NevaMind-AI/memU

**URL:** https://github.com/NevaMind-AI/memU
**Language:** Python
**Category:** AI/Agent Memory
**Relevance:** ⭐⭐⭐⭐⭐ (Directly applicable to Clawdbot)

## Overview

memU is a memory framework specifically built for 24/7 proactive agents. It addresses the core challenge of keeping agents always-online while managing token costs efficiently.

## Why This Matters for Us

memU solves EXACTLY the problems Clawdbot faces:
1. **Token cost explosion** — Long-running agents accumulate massive context
2. **Memory persistence** — Agents forget between sessions
3. **Proactive behavior** — Agents should act without explicit commands
4. **Intent prediction** — Understanding what users want before they ask

## Core Architecture

### Three-Layer Hierarchical Memory

```
┌─────────────────────────────────────────────────┐
│  RESOURCE LAYER                                 │
│  └─ Original data sources (files, conversations)│
└─────────────────────────────────────────────────┘
        ↓
┌─────────────────────────────────────────────────┐
│  ITEM LAYER                                     │
│  └─ Extracted facts, preferences, insights     │
└─────────────────────────────────────────────────┘
        ↓
┌─────────────────────────────────────────────────┐
│  CATEGORY LAYER                                 │
│  └─ Auto-organized topic summaries             │
└─────────────────────────────────────────────────┘
```

### Proactive Memory Lifecycle

1. **User Query** → Conversation starts
2. **Agent Planning** → Retrieve relevant memories
3. **Memorize & Update** → Store new insights, update todolist
4. **Predict Intent** → Anticipate next steps
5. **Loop** → Continuous iteration

## Key Features

### memorize() — Continuous Learning
- Processes inputs in real-time
- Immediate memory availability
- Auto-categorization without manual tagging
- Pattern detection across memories

### retrieve() — Dual-Mode Intelligence

**RAG Mode (Fast):**
- Sub-second retrieval
- Embedding-based similarity
- Low cost (no LLM calls)
- Good for: Continuous monitoring

**LLM Mode (Deep):**
- Intent prediction
- Query evolution
- Early termination when sufficient
- Good for: Complex anticipation

## Practical Use Cases

1. **Information Recommendation** — Surfaces content based on learned interests
2. **Email Management** — Learns communication patterns, drafts responses
3. **Trading Monitoring** — Tracks preferences, sends contextual alerts

## Technical Details

- **Python 3.13+** required
- Supports: OpenAI, OpenRouter, custom LLM providers
- Storage: In-memory or PostgreSQL with pgvector
- Cloud version: https://memu.so

## Integration Potential for Clawdbot

### What We Could Adopt

1. **Hierarchical Memory Structure**
   - Our current flat `memory/YYYY-MM-DD.md` could become Resource layer
   - Extract Items automatically into structured format
   - MEMORY.md becomes the Category layer

2. **Intent Prediction**
   - Add "next_step_query" to heartbeat checks
   - Anticipate what Marb might want

3. **Cost Optimization**
   - RAG-based retrieval for routine queries
   - LLM retrieval only when deep reasoning needed

4. **Proactive Pipeline**
   - `memorize()` on every significant interaction
   - Background pattern detection

### Implementation Ideas

```python
# Potential integration pattern
from memu import MemUService

class ClawdbotMemory:
    def __init__(self):
        self.service = MemUService(
            llm_profiles={
                "default": {"chat_model": "claude-sonnet-4"},
                "embedding": {"embed_model": "voyage-3.5-lite"}
            }
        )
    
    async def learn_from_interaction(self, message):
        """Called after every user interaction"""
        await self.service.memorize(
            resource_url=message.file_path,
            modality="conversation",
            user={"user_id": message.user_id}
        )
    
    async def get_context(self, query):
        """Get relevant context for response generation"""
        return await self.service.retrieve(
            queries=[{"role": "user", "content": {"text": query}}],
            method="rag"  # Fast path
        )
```

## Action Items

1. [ ] Clone and test locally: `pip install -e .`
2. [ ] Evaluate memory quality on real conversations
3. [ ] Compare token costs with current approach
4. [ ] Consider hybrid: memU for structured memory + our .md files for human readability
5. [ ] Explore cloud API for quick wins

## Links

- GitHub: https://github.com/NevaMind-AI/memU
- Cloud: https://memu.so
- API Docs: https://memu.pro/docs
