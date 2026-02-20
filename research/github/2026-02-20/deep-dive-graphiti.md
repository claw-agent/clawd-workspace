# Deep Dive: getzep/graphiti

## Overview
Graphiti builds real-time, temporally-aware knowledge graphs for AI agents. Unlike batch-oriented GraphRAG, it supports continuous incremental updates with bi-temporal tracking (when events happened vs when they were ingested).

## Key Technical Details
- **Graph backends:** Neo4j, FalkorDB, Kuzu, Amazon Neptune
- **Retrieval:** Hybrid — semantic embeddings + BM25 keyword + graph traversal
- **Temporal:** Bi-temporal model tracks both event time and ingestion time
- **Custom entities:** Define your own entity types via Pydantic models
- **MCP Server:** Built-in MCP server for Claude, Cursor, and other MCP clients
- **Performance:** Sub-second query latency, handles contradictions via temporal edge invalidation

## Maturity
- arXiv paper: January 2025 (2501.13956)
- Backed by Zep (commercial company) — Graphiti is the open-source core
- Multiple DB backends = production-ready flexibility
- Active development, trending on GitHub

## Relevance to Us
**VERY HIGH.** This directly addresses our memory architecture:
1. **MCP server** — plug directly into our MCP setup alongside Context7
2. **Agent memory** — could replace or augment our file-based memory (active.md, facts.md, episodic.md) with a queryable graph
3. **Temporal tracking** — know when we learned something AND when it happened
4. **Dynamic updates** — no batch recomputation, just add new facts as they come

## Comparison to Current Setup
| Aspect | Current (QMD + files) | Graphiti |
|--------|----------------------|----------|
| Search | Hybrid (BM25 + vector) | Hybrid + graph traversal |
| Temporal | Manual timestamps | Automatic bi-temporal |
| Relations | Implicit in text | Explicit graph edges |
| Contradictions | Manual cleanup | Auto-invalidation |
| Setup | Simple files | Requires Neo4j/FalkorDB |

## Concerns
- Requires graph DB (Neo4j or FalkorDB via Docker)
- Additional infrastructure complexity
- LLM costs for entity extraction during ingestion
- Works best with structured output models (OpenAI, Gemini)

## Verdict
**Strong candidate for memory upgrade.** The MCP server makes integration easy. Start with FalkorDB in Docker for zero-cost local testing. Could be a game-changer for agent context quality.
