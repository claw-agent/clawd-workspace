# Vibe Coding Guide — kloss_xyz

**Source:** https://x.com/kloss_xyz/status/2018097344345223455
**Saved:** 2026-02-05

## The Core Problem
> "AI doesn't hallucinate because it's broken. It hallucinates because you gave it nothing to hold onto."

---

## The Documentation-First System

### 6 Canonical Docs (write BEFORE coding):

1. **PRD.md** — Product Requirements Document
   - What you're building, who it's for
   - Features, scope, what's explicitly OUT of scope
   - Success criteria for "done"

2. **APP_FLOW.md** — User Navigation
   - Every page, every user path
   - What triggers each flow
   - Success/error states

3. **TECH_STACK.md** — Dependencies
   - Every package with EXACT versions
   - "Next.js 14.1.0, React 18.2.0, TypeScript 5.3.3"
   - No ambiguity

4. **FRONTEND_GUIDELINES.md** — Design System
   - Color palette (exact hex codes)
   - Spacing scale, fonts, radii
   - Component patterns, responsive rules

5. **BACKEND_STRUCTURE.md** — Data Layer
   - Database schema (tables, columns, types)
   - API endpoint contracts
   - Auth logic, edge cases

6. **IMPLEMENTATION_PLAN.md** — Build Sequence
   - Step-by-step, numbered
   - "Step 1.1 initialize, Step 1.2 install deps..."
   - The more steps, the less AI guesses

### 2 Session Files (persistence):

- **CLAUDE.md** — Rules AI reads automatically every session
  - Tech stack summary, naming conventions
  - What's allowed, what's forbidden
  - References to all 6 docs

- **progress.txt** — External memory bridge
  - COMPLETED: what's done
  - IN PROGRESS: current work
  - NEXT: what's queued
  - KNOWN BUGS: issues to fix

---

## The Interrogation System

**Before writing docs, make AI tear your idea apart:**

> "Before writing any code, endlessly interrogate my idea in Planning mode only. Assume nothing. Ask questions until there's no assumptions left."

**What AI should ask:**
- Who is this for?
- What's the core action?
- What data needs saved/displayed?
- What happens on error/success?
- Does this need login/database?
- Does this need to work on mobile?

**After interrogation, generate docs:**
> "Based on our interrogation, generate my canonical documentation files: PRD.md, APP_FLOW.md, TECH_STACK.md, FRONTEND_GUIDELINES.md, BACKEND_STRUCTURE.md, IMPLEMENTATION_PLAN.md. Use the answers from our conversation as the source material. Be specific and exhaustive. No ambiguity."

---

## Multi-Tool Workflow

| Tool | Use For |
|------|---------|
| **Claude** | Thinking, planning, writing docs, architecture decisions |
| **Cursor Ask mode** | Read-only exploration, understanding code |
| **Cursor Plan mode** | Architect before coding, generate implementation plans |
| **Cursor Agent mode** | Autonomous implementation, general building |
| **Kimi K2.5** | Visual-heavy frontend, screenshot-to-code |
| **Codex** | Debugging, code review, finalizing, parallel tasks |

**The sequence:**
Claude (think) → Cursor Plan (architect) → Cursor Agent/K2.5 (build) → Codex (debug/finish)

---

## Self-Improvement Loop

After every correction:
1. Fix the immediate issue
2. Update CLAUDE.md with the rule
3. Update lessons.md with the pattern

> "Claude is eerily good at writing rules for itself."

**Prompt after correction:**
> "Edit CLAUDE.md so you don't make that mistake again."

---

## Key Prompts

**Starting a feature:**
> "Read CLAUDE.md and progress.txt first. Then build step 4.2 from IMPLEMENTATION_PLAN.md. Style everything per FRONTEND_GUIDELINES.md."

**Returning to project:**
> "Read CLAUDE.md, progress.txt, and PRD.md. I'm returning after a break. Summarize where things stand against IMPLEMENTATION_PLAN.md."

**For stubborn bugs:**
Switch to Cursor Debug mode or Codex. Let it trace the problem methodically.

---

## Advanced: Parallel Sessions with Git Worktrees

Spin up 3-5 git worktrees, each running its own Claude Code session:
- Worktree 1: auth system
- Worktree 2: dashboard layout
- Worktree 3: API endpoints

All share the same repo but work independently. Merge when each is done.

---

## The Complete Sequence

**Before building:**
1. Interrogation prompt
2. Answer all questions
3. Generate 6 canonical docs
4. Write CLAUDE.md
5. Create progress.txt
6. Gather UI screenshots
7. Init git, push to GitHub

**While building:**
1. AI reads CLAUDE.md + progress.txt first
2. Ask/Plan modes to architect
3. Agent mode to implement
4. Work in small pieces
5. Commit after each feature
6. Update progress.txt
7. Update CLAUDE.md + lessons.md after corrections

**Before shipping:**
- Check mobile
- Check error/empty states
- Verify secrets hidden
- Test main flow end-to-end

---

*"The AI now does all the typing. You do all the thinking."*
