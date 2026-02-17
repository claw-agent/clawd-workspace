# Skill Evolution — Recursive Skill Improvement from Execution Feedback

> Use when: Running the nightly skill evolution pass, or when explicitly asked to improve skills from recent learnings.
> Don't use when: Creating new skills from scratch (use skill-creator), auditing skills for security (use skill-audit).

## Purpose
Skills should get better over time based on real execution data. This skill closes the loop between:
- **Execution** → skills run daily (morning-report, twitter-research, etc.)
- **Review** → compound review extracts patterns and failures nightly
- **Evolution** → THIS SKILL feeds patterns back into the relevant skill files

## Process

### Step 1: Gather Recent Feedback
Read these sources for execution patterns from the last 7 days:
```
~/clawd/memory/archive/lessons-learned.md    # Distilled lessons
~/clawd/memory/context/active.md             # Current issues
~/clawd/memory/2026-MM-DD.md                 # Last 3 days of daily notes
```

### Step 2: Match Patterns to Skills
For each lesson/pattern found:
1. Identify which skill it relates to (or "general" if it's cross-cutting)
2. Classify: **failure to fix**, **optimization**, or **new capability**
3. Check if the skill already addresses this (avoid duplicates)

### Step 3: Propose Skill Updates
For each matched pattern, write a concrete update:
- **Failure fix** → Add to "Common Failures" section with the fix
- **Optimization** → Update process steps or success criteria
- **New capability** → Add new section or expand existing one

### Step 4: Apply Updates
Edit the relevant SKILL.md files directly. Keep changes surgical — don't rewrite entire skills.

### Step 5: Log Evolution
Append to `~/clawd/memory/archive/skill-evolution-log.md`:
```
## YYYY-MM-DD — Evolution Pass
- **[skill-name]**: [what changed] — triggered by [lesson/pattern]
- **[skill-name]**: [what changed] — triggered by [lesson/pattern]
- No changes needed: [list skills that were already up to date]
```

## Rules
- Never remove existing functionality from a skill — only add or refine
- If unsure whether a pattern is a real lesson vs. one-off noise, skip it
- Maximum 3 skill updates per pass (focus on highest-impact changes)
- Always log what you did and WHY, even if no changes were made

## Evolution Log
All changes tracked at: `~/clawd/memory/archive/skill-evolution-log.md`
