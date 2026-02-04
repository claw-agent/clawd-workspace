# Live-Generated Indices Technique

**Source:** @speakerjohnash (John Ash) — Feb 1, 2026
**Research Date:** Feb 2, 2026

---

## The Core Idea

Instead of maintaining a persistent RAG database with pre-computed embeddings, generate a **small, ephemeral index at execution time** for the specific document(s) you need.

> "I don't use RAG at all. I use live generated indices. A good computer can make a search engine out of a long document very quickly. It is literally one of the most powerful techniques in all of LLM engineering."
> — @speakerjohnash

---

## How It Works

**Traditional RAG:**
1. Pre-process all documents into embeddings
2. Store in vector database (Pinecone, Chroma, etc.)
3. Query → retrieve chunks → generate

**Live-Generated Index:**
1. Have a corpus of files you need to search
2. At query time: build a small HNSW index on just those files
3. Search, retrieve relevant chunks
4. Generate response
5. Index is ephemeral — discarded after use

**Stack mentioned:**
- **hnswlib** — Fast approximate nearest neighbor search
- **sentence-transformers** — For generating embeddings
- Both semantic AND lexical search ("I do both")

---

## Why It's Powerful

### 1. No Database Maintenance
> "You're not relying on a fixed RAG database that needs maintaining."

No stale embeddings, no sync issues, no schema migrations.

### 2. Speed & Rapidity
Modern hardware can build small indices very fast. For 10-50 documents, index creation is milliseconds.

### 3. Always Fresh
Index reflects current state of documents. No "did we re-index after that edit?" questions.

### 4. Context-Appropriate
You only index what's relevant to the current task. Smaller search space = better results.

---

## When to Use

**Good fit:**
- Small-to-medium corpus (10-100 documents)
- Documents that change frequently
- Task-specific retrieval (only need subset of knowledge)
- Agent workflows where context shifts between tasks

**Not ideal for:**
- Massive corpora (millions of docs) — pre-indexing still wins
- Latency-critical applications where milliseconds matter
- Shared knowledge bases accessed by many users

---

## Implementation Sketch

```python
from sentence_transformers import SentenceTransformer
import hnswlib
import numpy as np

def live_index_search(documents: list[str], query: str, top_k: int = 5):
    """
    Build ephemeral index at query time, search, return results.
    """
    # 1. Load embedding model (can cache this)
    model = SentenceTransformer('all-MiniLM-L6-v2')
    
    # 2. Chunk documents (simple split for demo)
    chunks = []
    chunk_to_doc = []
    for i, doc in enumerate(documents):
        doc_chunks = doc.split('\n\n')  # paragraph-level
        chunks.extend(doc_chunks)
        chunk_to_doc.extend([i] * len(doc_chunks))
    
    # 3. Generate embeddings
    embeddings = model.encode(chunks)
    dim = embeddings.shape[1]
    
    # 4. Build HNSW index (ephemeral)
    index = hnswlib.Index(space='cosine', dim=dim)
    index.init_index(max_elements=len(chunks), ef_construction=200, M=16)
    index.add_items(embeddings, list(range(len(chunks))))
    index.set_ef(50)  # query time accuracy
    
    # 5. Query
    query_embedding = model.encode([query])
    labels, distances = index.knn_query(query_embedding, k=top_k)
    
    # 6. Return results
    results = []
    for label, dist in zip(labels[0], distances[0]):
        results.append({
            'chunk': chunks[label],
            'doc_index': chunk_to_doc[label],
            'score': 1 - dist  # cosine similarity
        })
    
    return results
```

---

## Comparison: QMD vs Live-Generated

We already have **QMD** installed (Toby Lutke's hybrid search). How does it compare?

| Aspect | QMD | Live-Generated |
|--------|-----|----------------|
| **Index persistence** | Cached in SQLite | Ephemeral |
| **Search types** | BM25 + vector + reranking | Vector (+ optional lexical) |
| **Rebuild frequency** | Manual (`qmd index`) | Every query |
| **Best for** | Known collections | Ad-hoc document sets |
| **Setup** | Collection config | Inline code |

**Verdict:** QMD is better for our workspace (memory, research, docs). Live-generated is useful for:
- Processing arbitrary files the user drops in
- Searching through API responses or scraped content
- Single-session document analysis

---

## Integration Ideas for Claw

1. **Ad-hoc document analysis:** User sends a PDF or long doc → build live index → answer questions

2. **Research synthesis:** Gather 20 articles on a topic → live index → find connections

3. **Code exploration:** Index a new repo at query time rather than maintaining persistent embeddings

4. **Hybrid approach:** QMD for known collections, live-index for everything else

---

## Key Insight

The paradigm shift: **index is a computation, not a database.**

Instead of thinking "I need to maintain my knowledge base," think "I can turn any pile of text into a searchable index in milliseconds."

This pairs well with the Ralph Loops philosophy — fresh context each iteration.

---

## References

- Original tweet: https://x.com/speakerjohnash/status/2017958607464305009
- hnswlib: https://github.com/nmslib/hnswlib
- sentence-transformers: https://www.sbert.net/
- QMD (for comparison): https://github.com/tobi/qmd
