# Project Kickoff Template

**Source:** @EXM7777 + kloss_xyz workflows
**Saved:** 2026-02-05

---

## Phase 1: Brain Dump (Opus 4.5 + Extended Thinking)

Open fresh chat. Dump everything about the project:
- What it is, who it's for
- Your background, constraints
- Rough ideas, goals, concerns

---

## Phase 2: The 5-Question Interview

Prompt:
> "Ask me 5 questions that would help you have a complete understanding of this project"

**Spend real time answering these.** This builds the context that prevents hallucinations later.

---

## Phase 3: The Interrogation (optional depth)

From kloss:
> "Before writing any code, endlessly interrogate my idea in Planning mode only. Assume nothing. Ask questions until there's no assumptions left."

Cover: Who, what, data saved, data displayed, error states, login needed, database needed, mobile needed?

---

## Phase 4: Master Plan Generation

Prompt:
> "You're my co-founder. Create a master plan with a knowledge base directory for each section. Attach context markdown files to every part. You're building the skeleton that Claude Code will use to build everything 10x faster. Suggest skills to integrate, automations to build, or any tool that'd 10x our speed. Suggest when to use a project or Claude Code."

---

## Phase 5: Canonical Docs Generation

Prompt:
> "Based on our interrogation, generate my canonical documentation files: PRD.md, APP_FLOW.md, TECH_STACK.md, FRONTEND_GUIDELINES.md, BACKEND_STRUCTURE.md, IMPLEMENTATION_PLAN.md. Use the answers from our conversation as the source material. Be specific and exhaustive. No ambiguity."

---

## Phase 6: Handoff to Execution

1. Import files to workspace
2. Create CLAUDE.md with project rules
3. Create progress.txt with starting state
4. Begin implementation with Claude Code
5. Update progress.txt after each feature
6. Update CLAUDE.md + lessons.md after corrections

---

**Output Structure:**
```
project/
├── PRD.md
├── APP_FLOW.md
├── TECH_STACK.md
├── FRONTEND_GUIDELINES.md
├── BACKEND_STRUCTURE.md
├── IMPLEMENTATION_PLAN.md
├── CLAUDE.md
├── progress.txt
├── lessons.md
└── src/
```
