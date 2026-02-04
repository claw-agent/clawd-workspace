# Skills & Agents System Audit

**Date:** 2026-01-27
**Auditor:** Skills & Agents Scout (Subagent)
**Scope:** Deep audit of all skills, agents, and prompts in ~/clawd/

---

## Executive Summary

The system contains **466 markdown files** across skills and agents directories. The architecture is sophisticated but has grown organically, resulting in some redundancy and unclear boundaries. Core functionality is solid, but there are empty placeholder directories, duplicate definitions, and one significant conflict in the twitter-research skill.

**Overall Health:** 🟡 Good with opportunities for improvement

---

## 1. Skills Inventory

### 1.1 Active & Production-Ready

| Skill | Location | Status | Docs Quality | Notes |
|-------|----------|--------|--------------|-------|
| **claude-connect** | `skills/claude-connect/` | ✅ Active | ⭐⭐⭐⭐⭐ | Complete with QUICKSTART, install scripts, auto-detection. Production-ready. |
| **twitter-research** | `skills/twitter-research/` | ✅ Active | ⭐⭐⭐⭐ | Comprehensive pipeline with prompts. Has one conflict (see Issues). |
| **research-swarm** | `skills/research-swarm/` | ✅ Active | ⭐⭐⭐⭐ | Well-structured with 4 agent templates. |
| **video-production** | `skills/video-production/` | ✅ Active | ⭐⭐⭐⭐ | Complete multi-agent pipeline for video ads. |
| **remotion** | `skills/remotion/` | ✅ Active | ⭐⭐⭐ | Basic commands and patterns. Supplemented by ~/.agents/skills/remotion. |
| **roles/** | `skills/roles/` | ✅ Active | ⭐⭐⭐ | 11 role templates (5 general + 6 engineering). |

### 1.2 External Skills (~/.agents/skills/)

| Skill | Status | Docs Quality | Notes |
|-------|--------|--------------|-------|
| **heygen-best-practices** | ✅ Active | ⭐⭐⭐⭐⭐ | Full ruleset with 17+ rule files. Production-ready. |
| **remotion-best-practices** | ✅ Active | ⭐⭐⭐⭐⭐ | Comprehensive with 30+ rule files. Production-ready. |

### 1.3 Uncertain/Dormant

| Skill | Location | Status | Notes |
|-------|----------|--------|-------|
| **continuous-learning** | `skills/continuous-learning/` | ⚠️ Unclear | SKILL.md exists but `evaluate-session.sh` not verified. Hook setup unclear. |

### 1.4 Empty Placeholders

| Directory | Status | Recommendation |
|-----------|--------|----------------|
| `skills/domains/` | 🔴 Empty | Delete or populate with domain-specific skills |
| `skills/tools/` | 🔴 Empty | Delete or populate with tool wrappers |
| `skills/workflows/` | 🔴 Empty | Delete or move v2 workflows here |

---

## 2. Agent Definitions

### 2.1 Agent Swarm v2 (Primary System)

**Location:** `~/clawd/agents/v2/`
**Status:** ✅ Active, Production-Ready
**Orchestrator:** `SKILL.md` — Well-documented routing table and spawn patterns

| Agent | File | Completeness | Quality |
|-------|------|--------------|---------|
| **Researcher** | `agents/researcher.md` | ✅ Complete | ⭐⭐⭐⭐⭐ |
| **List Builder** | `agents/list-builder.md` | ✅ Complete | ⭐⭐⭐⭐⭐ |
| **Outreach** | `agents/outreach.md` | ✅ Complete | ⭐⭐⭐⭐⭐ |
| **Qualifier** | `agents/qualifier.md` | ✅ Complete | ⭐⭐⭐⭐⭐ |
| **Content** | `agents/content.md` | ✅ Complete | ⭐⭐⭐⭐⭐ |

**Workflow:**
| Workflow | File | Completeness |
|----------|------|--------------|
| **New Campaign** | `workflows/new-campaign.md` | ✅ Complete |

**Assessment:** This is an excellent agent system. Each agent has:
- Clear identity section
- Explicit triggers
- Tools specification
- Detailed process/instructions
- Output format templates
- Handoff rules
- Anti-patterns to avoid

### 2.2 Legacy Agents

**Location:** `~/clawd/agents/` (root)
**Origin:** Imported from everything-claude-code

| Agent | File | Status | Quality | Notes |
|-------|------|--------|---------|-------|
| **Planner** | `planner.md` | ⚠️ Legacy | ⭐⭐⭐⭐ | Good for feature planning. Not integrated with v2. |
| **Architect** | `architect.md` | ⚠️ Legacy | ⭐⭐⭐⭐⭐ | Comprehensive. Duplicates `skills/roles/engineering/architect.md`. |
| **Code Reviewer** | `code-reviewer.md` | ⚠️ Legacy | ⭐⭐⭐⭐ | Useful checklist. Could be active. |
| **Security Reviewer** | `security-reviewer.md` | ⚠️ Legacy | ⭐⭐⭐⭐⭐ | Extremely comprehensive. Should be promoted. |

**Assessment:** These are high-quality agents that seem underutilized. The security-reviewer in particular is production-ready and valuable.

### 2.3 Research Swarm Agents

**Location:** `~/clawd/skills/research-swarm/agents/`
**Status:** ✅ Active (templates)

| Agent | File | Purpose |
|-------|------|---------|
| **Scout** | `scout.md` | Fast, broad discovery |
| **Deep Diver** | `deep-diver.md` | Thorough analysis |
| **Synthesizer** | `synthesizer.md` | Pattern recognition |
| **Validator** | `validator.md` | Quality control |

**Assessment:** Well-designed templates with clear mission, approach, output format, and constraints sections.

### 2.4 Role Definitions

**Location:** `~/clawd/skills/roles/`

| Category | Roles | Quality |
|----------|-------|---------|
| **General** | Researcher, Analyst, Content Writer, Executive Assistant, Lead Gen Specialist | ⭐⭐⭐ |
| **Engineering** | Architect, Backend Dev, Frontend Dev, QA Engineer, DevOps Engineer, Engineering Manager | ⭐⭐⭐ |

**Assessment:** These are lightweight templates compared to v2 agents. They serve as quick-reference role definitions but lack the depth of the v2 agent system.

---

## 3. Core Identity Files

| File | Status | Completeness | Notes |
|------|--------|--------------|-------|
| **AGENTS.md** | ✅ Active | ⭐⭐⭐⭐⭐ | Master guide. Comprehensive instructions for memory, safety, external actions, heartbeats. |
| **SOUL.md** | ✅ Active | ⭐⭐⭐⭐⭐ | Well-written identity. Clear principles, boundaries, disclosure requirements. |
| **IDENTITY.md** | ✅ Active | ⭐⭐⭐ | Basic info (name: Claw, emoji: 🦞). Avatar still "none yet". |
| **USER.md** | ⚠️ Incomplete | ⭐⭐ | Sparse. Pronouns "tbd", Context section empty. |
| **TOOLS.md** | ✅ Active | ⭐⭐⭐⭐⭐ | Comprehensive and well-maintained. Primary reference for installed tools. |
| **HEARTBEAT.md** | ✅ Active | ⭐⭐⭐⭐ | Current focus tracking. Updated regularly. |
| **MEMORY.md** | ✅ Active | ⭐⭐⭐⭐ | Long-term memory with curated insights. |

---

## 4. Conflicts & Inconsistencies

### 4.1 🔴 CRITICAL: Twitter-Research Report Structure Conflict

**Location:** `skills/twitter-research/`

**The Conflict:**
- `LOCKED.md` states: *"⚠️ DO NOT MODIFY THIS FILE"* and defines report structure as *"Non-Negotiable"*
- `SKILL.md` states: *"**This overrides the structure in LOCKED.md**"*

This is a logical contradiction. The "immutable" file is being overridden by the mutable file.

**Impact:** Confusion about which report structure to follow. Could lead to inconsistent outputs.

**Recommendation:** 
1. Update LOCKED.md to reflect current desired structure, OR
2. Remove the "overrides" language from SKILL.md and respect LOCKED.md, OR
3. Rename LOCKED.md to something that doesn't imply immutability

### 4.2 🟡 MEDIUM: Duplicate Researcher Definitions

**Three different "researcher" definitions exist:**

| File | Purpose | Scope |
|------|---------|-------|
| `agents/v2/agents/researcher.md` | v2 agent system | SLC Lead Gen focused, detailed |
| `skills/roles/researcher.md` | Role template | Generic, lightweight |
| `skills/research-swarm/agents/scout.md` | Research swarm | Discovery-focused variant |

**Impact:** Unclear which to use when. Could lead to inconsistent research outputs.

**Recommendation:** Clarify in AGENTS.md or create a decision tree:
- Quick research → roles/researcher.md
- Lead gen research → agents/v2/agents/researcher.md
- Multi-agent research → research-swarm agents

### 4.3 🟡 MEDIUM: Duplicate Architect Definitions

| File | Purpose |
|------|---------|
| `agents/architect.md` | Full ADR framework, detailed patterns |
| `skills/roles/engineering/architect.md` | Lightweight role template |

**Recommendation:** Consolidate or clearly differentiate. The legacy `agents/architect.md` is superior and should be promoted.

### 4.4 🟡 MEDIUM: Legacy vs v2 Agent Separation

The `agents/` directory contains both:
- v2 system (in `agents/v2/`)
- Legacy agents (in `agents/` root)

**Recommendation:** Either:
1. Move legacy agents to `agents/legacy/`
2. Promote useful legacy agents to v2 format
3. Archive unused legacy agents

---

## 5. Unused or Underutilized Skills

### 5.1 Skills We Have But Don't Seem to Use

| Skill | Evidence of Non-Use | Recommendation |
|-------|---------------------|----------------|
| `continuous-learning` | No evidence of hook activation, no learned skills in expected path | Verify if functional; if not, either fix or archive |
| `skills/domains/` | Empty directory | Delete or document planned use |
| `skills/tools/` | Empty directory | Delete or document planned use |
| `skills/workflows/` | Empty directory | Delete or move v2 workflows here |
| Legacy `planner.md` | Not referenced in TOOLS.md or recent memory | Integrate with v2 or archive |

### 5.2 High-Value Underutilized Assets

| Asset | Status | Value |
|-------|--------|-------|
| `security-reviewer.md` | Legacy, rarely mentioned | ⭐⭐⭐⭐⭐ Extremely comprehensive. Should be standard for any code changes. |
| `code-reviewer.md` | Legacy, rarely mentioned | ⭐⭐⭐⭐ Good checklist. Should be used more. |
| Engineering roles | Rarely spawned | Could improve code quality if used systematically |

---

## 6. Missing Skills / Gaps

### 6.1 Skills That Should Exist

| Missing Skill | Mentioned In | Impact |
|---------------|--------------|--------|
| **Email Management** | AGENTS.md (heartbeat checks email) | No structured skill for email reading/drafting/sending |
| **Calendar Integration** | AGENTS.md (heartbeat checks calendar) | No skill for calendar operations |
| **LinkedIn Automation** | Outreach agent mentions it | No dedicated LinkedIn skill (covered ad-hoc) |
| **Web Scraping** | TOOLS.md (ad-hoc) | No structured scraping skill with rate limits, proxy handling |
| **Finance/Bookkeeping** | Analyst role exists | No skill for financial tracking, invoicing, expense management |
| **Notification Routing** | Various | No skill defining when to notify via Telegram vs email vs other |

### 6.2 Skills That Would Add Value

| Potential Skill | Use Case | Priority |
|-----------------|----------|----------|
| **API Testing** | Test endpoints before shipping | Medium |
| **Data Validation** | Verify list quality, data integrity | Medium |
| **Competitor Monitoring** | Track competitor changes | Low |
| **Social Posting** | Post to Twitter, LinkedIn with approval flow | Medium |
| **Documentation Generator** | Auto-generate docs from code | Low |

---

## 7. Prompt Alignment Check

### 7.1 Twitter Research Prompts

| Prompt | Alignment | Issues |
|--------|-----------|--------|
| `prompts/swarm-start.md` | ✅ Aligned with SKILL.md | References LOCKED.md correctly |
| `prompts/compile.md` | ⚠️ Partial conflict | Defines new "ALL BOOKMARKS WITH SUMMARIES" section that LOCKED.md doesn't have |
| `prompts/deliver.md` | ✅ Aligned | References LOCKED.md, follows structure |

### 7.2 General Workflow Alignment

| System | Documentation | Actual Behavior | Aligned? |
|--------|---------------|-----------------|----------|
| Agent Spawning | TOOLS.md documents `sessions_spawn` | Used correctly | ✅ |
| Memory System | AGENTS.md defines memory protocol | Daily logs + MEMORY.md maintained | ✅ |
| Heartbeat System | AGENTS.md + HEARTBEAT.md | HEARTBEAT.md actively used | ✅ |
| Voice Output | TOOLS.md specifies Qwen3-TTS | Skills reference it correctly | ✅ |

---

## 8. Recommendations

### 8.1 Immediate Actions (This Week)

1. **Fix Twitter-Research Conflict**
   - Update LOCKED.md to include the new report structure from SKILL.md
   - Or change SKILL.md to not "override" a locked file
   - This is causing ambiguity in a daily workflow

2. **Clean Up Empty Directories**
   ```bash
   rmdir ~/clawd/skills/domains/ ~/clawd/skills/tools/ ~/clawd/skills/workflows/
   ```
   Or document what they're for.

3. **Expand USER.md**
   - Add pronouns
   - Fill in Context section with known preferences
   - This helps personalization

### 8.2 Short-Term Improvements (This Month)

4. **Organize Legacy Agents**
   - Move to `agents/legacy/` or integrate into v2
   - Promote security-reviewer.md to active use
   - Add code-reviewer.md to standard workflow

5. **Create Decision Guide**
   - When to use v2 agents vs roles vs research-swarm
   - Add to AGENTS.md or create separate ROUTING.md

6. **Verify Continuous Learning**
   - Check if evaluate-session.sh exists and hooks are active
   - If broken, either fix or archive the skill

### 8.3 Long-Term Enhancements (This Quarter)

7. **Add Missing Skills**
   - Email management skill
   - Calendar skill  
   - LinkedIn automation skill

8. **Consolidate Duplicates**
   - Merge researcher definitions or clearly differentiate
   - Merge architect definitions

9. **Document Skill Dependencies**
   - Which skills require which tools
   - Which skills work together

10. **Create Skill Templates**
    - Standard SKILL.md template for new skills
    - Ensures consistency

---

## 9. File Inventory Summary

### Skills Directory Tree

```
~/clawd/skills/
├── claude-connect/        ✅ Complete (8 files)
│   ├── SKILL.md
│   ├── QUICKSTART.md
│   ├── README.md
│   ├── SUMMARY.md
│   ├── CHANGES.md
│   ├── UPGRADE.md
│   ├── AUTO-DETECTION-FLOW.md
│   ├── DETECTION-EXAMPLES.md
│   └── COMPLETION-REPORT.md
├── twitter-research/      ✅ Complete (5 files)
│   ├── SKILL.md
│   ├── LOCKED.md          ⚠️ Conflict
│   └── prompts/
│       ├── swarm-start.md
│       ├── compile.md
│       └── deliver.md
├── continuous-learning/   ⚠️ Uncertain (1 file)
│   └── SKILL.md
├── research-swarm/        ✅ Complete (5 files)
│   ├── SKILL.md
│   └── agents/
│       ├── scout.md
│       ├── deep-diver.md
│       ├── synthesizer.md
│       └── validator.md
├── video-production/      ✅ Complete (1 file)
│   └── SKILL.md
├── remotion/              ✅ Basic (1 file)
│   └── SKILL.md
├── roles/                 ✅ Complete (11 files)
│   ├── researcher.md
│   ├── analyst.md
│   ├── content-writer.md
│   ├── executive-assistant.md
│   ├── lead-gen-specialist.md
│   └── engineering/
│       ├── architect.md
│       ├── backend-developer.md
│       ├── frontend-developer.md
│       ├── qa-engineer.md
│       ├── devops-engineer.md
│       └── engineering-manager.md
├── domains/               🔴 Empty
├── tools/                 🔴 Empty
└── workflows/             🔴 Empty
```

### Agents Directory Tree

```
~/clawd/agents/
├── v2/                    ✅ Primary System
│   ├── SKILL.md           (Orchestrator)
│   ├── agents/
│   │   ├── researcher.md
│   │   ├── list-builder.md
│   │   ├── outreach.md
│   │   ├── qualifier.md
│   │   └── content.md
│   └── workflows/
│       └── new-campaign.md
├── planner.md             ⚠️ Legacy
├── architect.md           ⚠️ Legacy (duplicate)
├── code-reviewer.md       ⚠️ Legacy (underutilized)
└── security-reviewer.md   ⚠️ Legacy (valuable, underutilized)
```

### External Skills

```
~/.agents/skills/
├── heygen-best-practices/ ✅ Complete (17+ rule files)
└── remotion/              ✅ Complete (30+ rule files)
```

---

## 10. Conclusion

The system is well-architected with a solid foundation. The Agent Swarm v2 is particularly well-designed and should be the model for future agent development. However, organic growth has led to some redundancy and ambiguity.

**Strengths:**
- Excellent v2 agent system with clear handoffs
- Comprehensive TOOLS.md as central reference
- Good separation of concerns (skills vs agents vs roles)
- Strong identity files (AGENTS.md, SOUL.md)

**Weaknesses:**
- One critical conflict (twitter-research LOCKED vs SKILL)
- Empty placeholder directories
- Duplicate definitions causing confusion
- Some high-value assets (security-reviewer) underutilized
- USER.md incomplete

**Priority Actions:**
1. Resolve twitter-research conflict (CRITICAL)
2. Clean up empty directories (EASY WIN)
3. Expand USER.md (QUICK WIN)
4. Organize legacy agents (MEDIUM EFFORT)
5. Add missing skills (LONGER TERM)

---

*Report generated by Skills & Agents Scout subagent*
*Audit duration: ~15 minutes*
*Files examined: 50+*
