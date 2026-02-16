# Deep Dive: rowboatlabs/rowboat

## Overview
Open-source AI coworker that builds a persistent knowledge graph from your email, meetings, and notes. Local-first, Obsidian-compatible Markdown vault. Acts on accumulated context rather than cold RAG retrieval.

## Key Details
- **Maintainer:** Rowboat Labs
- **Platform:** Mac/Windows/Linux desktop app
- **Storage:** Local Markdown with backlinks (Obsidian-compatible)
- **Models:** BYO — Ollama, LM Studio, or hosted APIs

## Core Concept: Knowledge Graph > RAG
Instead of searching documents on-demand (cold RAG), Rowboat:
- Continuously builds a knowledge graph from incoming data
- Context accumulates over time
- Relationships are explicit and inspectable
- Notes are editable plain Markdown
- Memory compounds rather than starting cold each time

## Integrations
- Gmail (email)
- Granola (meeting notes)
- Fireflies (meeting notes)
- MCP-extensible (Exa, Twitter/X, ElevenLabs, Slack, Linear, GitHub, etc.)

## Features
- **Meeting prep** from prior decisions, threads, open questions
- **Email drafting** grounded in history and commitments
- **Docs & decks** generated from ongoing context (including PDF slides)
- **Voice memos** that auto-capture key takeaways into graph
- **Background agents** for recurring automated tasks (daily briefs, draft replies, project updates)

## Relevance to Us
**High conceptual relevance.** Our memory system (MEMORY.md, active.md, daily notes, QMD) is already similar in spirit but less structured. Rowboat's approach validates:
1. Persistent knowledge graph > cold retrieval
2. Markdown as universal storage format
3. Background agents for recurring work
4. Voice memo → knowledge capture pipeline

## What We Could Learn
- Their knowledge graph structure (backlinked Markdown entities)
- Background agent patterns for automated daily work
- How they handle knowledge graph updates from streaming data
- The "compound memory" concept for improving our QMD + memory system

## Action Items
- [ ] Download and test the Mac app
- [ ] Study their knowledge graph structure for memory system improvements
- [ ] Compare their background agents with our cron-based approach
