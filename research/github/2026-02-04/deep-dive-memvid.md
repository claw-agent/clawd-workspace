# Deep Dive: memvid/memvid

**URL:** https://github.com/memvid/memvid
**Language:** Rust (core) with Python/Node SDKs
**License:** Apache-2.0

## Overview

Memvid is a "memory layer for AI agents" that packages data, embeddings, search structure, and metadata into a single portable file. It's designed to replace complex RAG pipelines with a serverless, infrastructure-free memory system.

## Key Innovation: Smart Frames

Inspired by video encoding, Memvid organizes memory as an append-only sequence of "Smart Frames":

- **Immutable units** with timestamps, checksums, metadata
- **Append-only writes** — no corruption of existing data
- **Timeline inspection** — see how knowledge evolves
- **Crash safety** through committed frames
- **Compression** using video encoding techniques

This is brilliant for AI agents that need persistent, auditable memory.

## Benchmark Results

Their published benchmarks are impressive:

| Metric | Result |
|--------|--------|
| LoCoMo accuracy | +35% vs SOTA |
| Multi-hop reasoning | +76% vs industry avg |
| Temporal reasoning | +56% vs industry avg |
| P50 latency | 0.025ms |
| P99 latency | 0.075ms |
| Throughput | 1,372× higher than standard |

## Technical Architecture

### File Format (.mv2)

Single file contains everything:
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

No .wal, .lock, .shm, or sidecar files. Everything in one file.

### Feature Flags

Modular Rust features you can enable:
- `lex` — Full-text search with BM25 (Tantivy)
- `vec` — Vector similarity (HNSW + ONNX embeddings)
- `clip` — CLIP visual embeddings for image search
- `whisper` — Audio transcription
- `pdf_extract` — Pure Rust PDF extraction
- `temporal_track` — Natural language date parsing
- `encryption` — Password-based encrypted capsules

### Embedding Models

Local models supported:
- BGE-small (384 dims, ~120MB) — Default
- BGE-base (768 dims, ~420MB) — Better quality
- Nomic-embed-text (768 dims, ~530MB) — Versatile
- GTE-large (1024 dims, ~1.3GB) — Highest quality

Also supports OpenAI API embeddings.

## SDK Availability

| Package | Install |
|---------|---------|
| CLI | `npm install -g memvid-cli` |
| Node.js SDK | `npm install @memvid/sdk` |
| Python SDK | `pip install memvid-sdk` |
| Rust | `cargo add memvid-core` |

## Use Cases

- Long-running AI agents (exactly our use case!)
- Enterprise knowledge bases
- Offline-first AI systems
- Codebase understanding
- Customer support agents
- Auditable AI workflows

## Comparison to Our Current Approach

| Aspect | Our Approach (AGENTS.md) | Memvid |
|--------|-------------------------|--------|
| Storage | Markdown files | Single .mv2 file |
| Search | Manual/QMD | Built-in BM25 + vector |
| Persistence | File-based | File-based |
| Portability | Copy folder | Copy single file |
| Memory model | Manual entries | Auto-capture |
| Performance | Read entire file | Sub-ms queries |
| Versioning | Git | Built-in timeline |

## Integration Possibilities

1. **Replace SESSION-STATE.md** — Use memvid for active session state
2. **Enhance memory/** folder — Index daily notes with memvid
3. **Agent memory** — Give sub-agents their own .mv2 files
4. **Knowledge base** — Index research/ folder for instant retrieval

## Concerns

- **New project** — May have rough edges
- **Rust dependency** — Need to compile or use SDK
- **Lock-in** — Proprietary file format (but Apache licensed)

## Verdict

**HIGH PRIORITY EXPLORATION**

This directly addresses our memory challenges. The single-file design is elegant, performance is exceptional, and it's built for exactly our use case (long-running AI agents).

Recommend: Test with a small project, evaluate integration effort.
