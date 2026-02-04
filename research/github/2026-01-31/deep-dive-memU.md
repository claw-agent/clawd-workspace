# Deep Dive: NevaMind-AI/memU

**URL:** https://github.com/NevaMind-AI/memU  
**Language:** Python 3.13+  
**License:** Apache 2.0

## What Is It?

memU is a **memory framework specifically designed for 24/7 proactive agents**. The key insight: running agents continuously is expensive because you keep feeding the same context. memU solves this with hierarchical memory that reduces token costs while maintaining understanding.

It's explicitly designed for systems like Clawdbot (they mention "openclaw, moltbot, clawdbot" in the tagline!).

## Core Problem It Solves

Traditional agent memory:
- Dump everything into context window
- Token costs explode for long-running agents
- No structure = poor retrieval
- No proactive behavior = purely reactive

memU approach:
- **Hierarchical memory** (Resource → Item → Category)
- **Auto-categorization** without manual tagging
- **Proactive context loading** - anticipates what you need
- **Continuous learning** - always updating from interactions

## Architecture

```
┌────────────────────────────────────┐    ┌──────────────────────────────────────┐
│         MAIN AGENT                 │◄──►│            MEMU BOT                  │
│  Handle queries & execute tasks    │    │  Monitor, memorize, proactive intel  │
└────────────────────────────────────┘    └──────────────────────────────────────┘
                                                          │
                                          ┌───────────────┴───────────────┐
                                          │                               │
                                    ┌─────┴─────┐                  ┌──────┴──────┐
                                    │  MEMORIZE │                  │  RETRIEVE   │
                                    │ Extract   │                  │ RAG or LLM  │
                                    │ insights  │                  │ based       │
                                    └───────────┘                  └─────────────┘
```

## Three-Layer Memory

| Layer | Purpose | Reactive Use | Proactive Use |
|-------|---------|--------------|---------------|
| **Resource** | Original data | Direct access | Background monitoring |
| **Item** | Extracted facts | Targeted retrieval | Real-time extraction |
| **Category** | Topic summaries | Overview | Auto context assembly |

## Key APIs

### memorize() - Continuous Learning
```python
result = await service.memorize(
    resource_url="path/to/file.json",
    modality="conversation",  # conversation | document | image | video | audio
    user={"user_id": "123"}
)
# Returns: resource metadata, extracted items, updated categories
```

### retrieve() - Dual-Mode
```python
# RAG mode - fast, embedding-based
result = await service.retrieve(
    queries=[{"role": "user", "content": {"text": "What are their preferences?"}}],
    method="rag"
)

# LLM mode - deep reasoning, intent prediction
result = await service.retrieve(
    queries=[...],
    method="llm"  # Slower but smarter
)
```

## Comparison with Our Current Approach

| Aspect | Our memory/ folder | memU |
|--------|-------------------|------|
| Structure | Flat daily files + MEMORY.md | Hierarchical 3-layer |
| Categorization | Manual | Automatic |
| Retrieval | memory_search (embeddings) | RAG or LLM-based |
| Proactive | None | Intent prediction |
| Token efficiency | Full file loading | Smart context assembly |
| Persistence | Files | PostgreSQL + pgvector |

## Proactive Use Cases They Highlight

1. **Information Recommendation** - Surfaces relevant content before you ask
2. **Email Management** - Draft responses, prioritize, detect conflicts
3. **Trading/Financial** - Learns risk tolerance, alerts on patterns

## Performance Claims

- **92.09% accuracy** on Locomo benchmark (memory reasoning tasks)
- Supports OpenRouter, custom LLMs, multiple embedding providers

## Self-Hosted vs Cloud

- **Cloud:** https://memu.so - hosted service
- **Self-hosted:** `pip install -e .` + PostgreSQL with pgvector

## How It Could Fit Clawdbot

### Option 1: Replace memory system entirely
- Migrate from files to memU
- Gain: auto-categorization, proactive features, better retrieval
- Lose: Simplicity, direct file editing

### Option 2: Augment existing system
- Keep files for transparency
- Use memU for structured extraction and retrieval
- Best of both worlds?

### Option 3: Just steal the ideas
- Implement similar patterns ourselves
- Keep file-based but add hierarchical structure

## Activity & Maintenance

- Active development (examples, API docs, partnerships)
- Has community: Discord, ecosystem of related repos
- Partners include TEN Framework, Milvus, Bytebase

## Verdict

**Action: [Explore]** - Worth experimenting with

The proactive memory angle is genuinely novel. Most memory systems are reactive (you ask, it retrieves). memU tries to anticipate. That could be powerful for a 24/7 assistant.

**Concerns:**
- Adds PostgreSQL dependency
- Black box vs our transparent files
- Not sure how well the "proactive" features actually work

**Next Steps:**
1. Run the test_inmemory.py example locally
2. Compare retrieval quality vs our memory_search
3. Evaluate if the proactive features are actually useful or just marketing
4. Consider hybrid approach: files for transparency + memU for retrieval
