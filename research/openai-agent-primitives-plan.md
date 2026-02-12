# OpenAI Agent Primitives — Improvement Plan for Our Setup
> Source: https://developers.openai.com/blog/skills-shell-tips
> Created: Feb 12, 2026

## Key Insights from the Article

OpenAI released new primitives: **Skills** (reusable instruction bundles), **Shell** (container execution), and **Server-side Compaction**. Their 10 tips for long-running agents, informed by Glean's production use:

1. Write skill descriptions like routing logic, not marketing copy
2. Add negative examples and edge cases to reduce misfires
3. Put templates/examples inside skills (free when unused)
4. Design for long runs early with container reuse + compaction
5. When you need determinism, explicitly tell the model to use the skill
6. Skills + networking = high-risk combo (design for containment)
7. Standardize artifact output locations (/mnt/data as handoff boundary)
8. Understand allowlists as a two-layer system
9. Use domain_secrets for auth (avoid credential leakage)
10. Same APIs locally and in cloud

**Glean's results:** Skills increased eval accuracy 73% → 85%, reduced TTFT by 18.1%. But initially DROPPED triggering by 20% until they added negative examples.

---

## What We Already Do Well

| Pattern | Our Implementation |
|---------|-------------------|
| Skills with SKILL.md manifests | ✅ Full skill system in ~/clawd/skills/ |
| Compaction + WAL protocol | ✅ Native compaction + our WAL defense-in-depth |
| Templates inside skills | ✅ Most skills are self-contained |
| Local execution | ✅ Mac mini, shell access, full toolchain |
| Artifact-producing workflows | ✅ Morning reports, research docs, site generation |
| Multi-agent orchestration | ✅ sessions_spawn, subagent patterns |

---

## Improvement Plan

### 1. Upgrade Skill Descriptions → Routing Logic
**Problem:** Our skill descriptions are vague. Example: `"Multi-channel ABM automation"` — when should the model use this vs manual research?

**Fix:** Every skill gets a structured description block:
```
Use when: [specific triggers]
Don't use when: [negative examples]  
Inputs: [what's needed]
Outputs: [what's produced]
```

**Skills to upgrade:**
- [ ] abm-outbound
- [ ] email
- [ ] linkedin
- [ ] idea-to-blueprint
- [ ] youtube-transcript
- [ ] weather
- [ ] All custom skills in ~/clawd/skills/

### 2. Add Negative Examples to Skills
**Problem:** Glean saw 20% drop in correct skill triggering without negative examples. We have zero.

**Fix:** Add "Don't use when" + "Common mistakes" sections to each SKILL.md:
```markdown
## When NOT to Use This Skill
- Don't use for X (use Y instead)
- Don't use when Z condition exists
- Common mistake: assuming A when B is true
```

### 3. Standardize Artifact Output Locations
**Problem:** We write outputs inconsistently:
- Research → `~/clawd/research/`
- Reports → `~/clawd/reports/`
- Builds → `/tmp/` or project dirs
- Subagent outputs → wherever they feel like

**Fix:** Define canonical output paths and document them:
```
~/clawd/research/       — Research documents
~/clawd/reports/        — Generated reports (morning, weekly, etc.)
~/clawd/artifacts/      — One-off build artifacts (sites, PDFs, etc.)
~/clawd/systems/        — Production system outputs
/tmp/                   — Ephemeral/test only
```
Add to AGENTS.md so all subagents follow the convention.

### 4. Security Audit: Skills + Network Containment
**Problem:** OpenAI warns that skills + open network = data exfil risk. We haven't audited this.

**Fix:**
- [ ] Audit each skill for network access patterns
- [ ] Identify which skills NEED network vs which just happen to have it
- [ ] Document network requirements per skill
- [ ] Review tirith security guard rules
- [ ] Ensure credential files are never readable by subagents that don't need them

### 5. Deterministic Skill Invocation for Production Workflows
**Problem:** We rely on fuzzy routing for critical workflows (lead gen pipeline, morning reports).

**Fix:** For production cron jobs and workflows, explicitly invoke skills:
```
"Use the mlx-whisper skill to transcribe this audio"
"Use the email skill to send this report"
```
Update cron job prompts to be explicit about which skills to use.

### 6. Encode Recurring Workflows as Skills
**Problem:** Some of our best workflows live as ad-hoc patterns, not skills:
- Morning report compilation
- Site generation pipeline
- Storm monitoring → campaign generation
- Review generation campaigns

**Fix:** Convert each into a proper skill with SKILL.md:
- [ ] `morning-report` skill
- [ ] `site-revamp` skill  
- [ ] `storm-campaign` skill
- [ ] `review-campaign` skill

### 7. Compaction Resilience
**Problem:** Today's compaction clipped the tail end of our conversation, losing the actual task.

**Fix:**
- [ ] Pre-compaction: always write pending tasks to `memory/context/active.md`
- [ ] Post-compaction: FIRST action is read active.md, not respond
- [ ] Add "last user request" field to active.md WAL writes
- [ ] Consider more aggressive WAL triggers (write on every user message, not just concrete details)

---

## Priority Order

1. **Compaction resilience** (prevents today's problem from recurring)
2. **Skill descriptions + negative examples** (biggest quality/reliability gain per Glean data)
3. **Standardize artifact outputs** (quick win, improves subagent reliability)
4. **Encode workflows as skills** (compounds over time)
5. **Security audit** (important but less urgent for private setup)
6. **Deterministic invocation** (production hardening)

---

## Implementation Progress

### Done (Feb 12, 2026)
- [x] **Slim AGENTS.md + TOOLS.md** — 28.5K → 20K bytes (30% reduction)
  - Moved Reasoning Protocol, QA Protocol → condensed
  - Moved Skill Installation Audit → `~/clawd/skills/skill-audit/SKILL.md`
  - Moved Multi-Agent Coordination → `~/clawd/skills/orchestration/SKILL.md`
  - Moved Firecrawl examples, Shannon examples, Ralph Loops → skill references
- [x] **WAL protocol fix** — Added "LAST USER REQUEST" capture to active.md on compaction
- [x] **Skill description routing** — Updated email, linkedin, abm-outbound with "use when / don't use when"
- [x] **Created orchestration skill** — `~/clawd/skills/orchestration/SKILL.md`
- [x] **Created skill-audit skill** — `~/clawd/skills/skill-audit/SKILL.md`

- [x] **Morning report workflow → skill** — `~/clawd/skills/morning-report/SKILL.md`
- [x] **Site revamp workflow → skill** — `~/clawd/skills/site-revamp/SKILL.md`
- [x] **Standardized artifact directory** — `~/clawd/artifacts/` with README documenting all canonical paths
- [x] **Activity tracing** — `~/clawd/scripts/trace-activity.sh` → `~/clawd/memory/traces/YYYY-MM-DD.jsonl`

### Done (Feb 12, 2026 — overnight session)
- [x] **All remaining skill descriptions updated** — 14 skills got "When to Use" / "When NOT to Use" routing logic:
  - mlx-whisper, research-swarm, twitter-research, video-production, remotion
  - visual-qa, continuous-learning, proactive-agent, ralph-loops
  - local-seo-domination, ai-compound, adaptive-suite, claude-connect

### Remaining
- [ ] Persistent shell sessions (tmux-based) — for long coding tasks
- [ ] Per-agent permission scoping (research = web, build = no web)
- [ ] Eval framework for key workflows
