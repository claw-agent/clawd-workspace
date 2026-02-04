# Deep Dive: memvid/memvid

## Overview
**Repo:** https://github.com/memvid/memvid
**License:** Apache 2.0
**Language:** Rust (memvid-core)
**SDKs:** Rust, Python, Node.js, CLI

## What It Does
Memvid is a **portable AI memory system** that packages data, embeddings, search structure, and metadata into a **single .mv2 file**. No databases, no servers — just a file.

## Why This Matters
Traditional RAG pipelines require:
- Vector database (Pinecone, Weaviate, etc.)
- Infrastructure management
- Complex deployment

Memvid replaces all of this with:
- Single file storage
- Sub-5ms local access
- Portable across systems
- Model-agnostic

## Architecture: Smart Frames

Inspired by video encoding, Memvid organizes memory as an **append-only sequence of Smart Frames**:

```
┌────────────────────────────┐
│ Header (4KB)               │ Magic, version, capacity
├────────────────────────────┤
│ Embedded WAL (1-64MB)      │ Crash recovery
├────────────────────────────┤
│ Data Segments              │ Compressed frames
├────────────────────────────┤
│ Lex Index                  │ Tantivy full-text
├────────────────────────────┤
│ Vec Index                  │ HNSW vectors
├────────────────────────────┤
│ Time Index                 │ Chronological ordering
├────────────────────────────┤
│ TOC (Footer)               │ Segment offsets
└────────────────────────────┘
```

**No sidecar files ever** — .wal, .lock, .shm are all embedded.

## Key Features

### 1. Smart Frames
- Immutable units with timestamps, checksums, metadata
- Enables timeline-style inspection
- Crash safety through committed frames

### 2. Feature Flags
```toml
[dependencies]
memvid-core = { version = "2.0", features = ["lex", "vec", "temporal_track"] }
```

| Feature | Description |
|---------|-------------|
| lex | BM25 full-text (Tantivy) |
| vec | HNSW + local embeddings (ONNX) |
| pdf_extract | Pure Rust PDF extraction |
| clip | CLIP visual embeddings |
| whisper | Audio transcription |
| temporal_track | Natural language dates ("last Tuesday") |
| encryption | Password-based encryption (.mv2e) |

### 3. Multi-Modal Support
- Text, PDF, images (CLIP), audio (Whisper)
- All in one file format

### 4. Time-Travel Debugging
- Rewind to any memory state
- Branch memory timelines
- Audit trail built-in

## Usage Example

```rust
use memvid_core::{Memvid, PutOptions, SearchRequest};

// Create memory file
let mut mem = Memvid::create("knowledge.mv2")?;

// Add documents
let opts = PutOptions::builder()
    .title("Meeting Notes")
    .uri("mv2://meetings/2024-01-15")
    .tag("project", "alpha")
    .build();
mem.put_bytes_with_options(b"Q4 planning...", opts)?;
mem.commit()?;

// Search
let response = mem.search(SearchRequest {
    query: "planning".into(),
    top_k: 10,
    snippet_chars: 200,
    ..Default::default()
})?;
```

## Embedding Models

### Local (via ONNX)
| Model | Dimensions | Size | Best For |
|-------|------------|------|----------|
| bge-small-en-v1.5 | 384 | ~120MB | Default, fast |
| bge-base-en-v1.5 | 768 | ~420MB | Better quality |
| gte-large | 1024 | ~1.3GB | Highest quality |

### API (OpenAI)
- text-embedding-3-small (1536 dims)
- text-embedding-3-large (3072 dims)

## Comparison to QMD

| Feature | memvid | QMD |
|---------|--------|-----|
| Storage | Single .mv2 file | SQLite + separate files |
| Language | Rust | TypeScript (Bun) |
| Search | BM25 + HNSW | BM25 + vector + reranking |
| Portability | Excellent (one file) | Good (SQLite) |
| Multi-modal | Yes (PDF, audio, image) | Text/markdown only |
| Time-travel | Yes | No |
| Model binding | Yes (prevents mixing) | No |

## Use Cases
- Long-running AI agents needing persistent memory
- Offline-first AI systems
- Codebase understanding
- Personal knowledge assistants
- Auditable AI workflows

## Potential Use for Us

### Replace QMD?
Pros:
- Single file portability
- Multi-modal support
- Time-travel debugging
- Crash safety

Cons:
- Less mature than QMD
- Rust dependency
- Different query interface

### Complement QMD?
Use memvid for agent memory, QMD for document search.

## Next Steps
1. Install CLI: `npm install -g memvid-cli`
2. Test with research corpus
3. Benchmark against QMD
4. Evaluate for agent memory layer
