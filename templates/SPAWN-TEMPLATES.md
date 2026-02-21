# Spawn Templates

*Copy-paste templates for common sub-agent tasks. Updated Feb 21, 2026.*

## ⚠️ Spawn Rules
1. **Always include:** `Read ~/clawd/AGENTS.md first` — ensures sub-agents inherit protocols
2. **Stagger spawns 30s apart** — avoids undici TLS bug with concurrent spawns
3. **Never embed credentials** — reference `~/clawd/config/` files instead (subagents can read them)
4. **Browser work → always spawn subagent** — CDP loops burn main session context fast
5. **One writer per file** — if multiple agents, assign different output files
6. **Success criteria > step-by-step** — tell agents WHAT, not HOW

### Useful Parameters
- `model="opus"` — for complex reasoning tasks
- `cleanup="delete"` — auto-delete session after completion (default: keep)
- `runTimeoutSeconds=1800` — 30min cap for long tasks (default: none)
- `label="my-task"` — name for easy lookup via `sessions_list`

---

## Research

### Deep Research (Single Agent)
```
sessions_spawn task="Read ~/clawd/AGENTS.md first. Research: [TOPIC]. Write findings to ~/clawd/research/[filename].md" label="research-[topic]"
```

### Research Swarm (3-5 Scouts, Different Angles)
```
sessions_spawn task="Read ~/clawd/AGENTS.md first. Research [TOPIC] focusing on [ANGLE 1]. Write to ~/clawd/research/[topic]-[angle].md" label="scout-1"
# wait 30s
sessions_spawn task="Read ~/clawd/AGENTS.md first. Research [TOPIC] focusing on [ANGLE 2]. Write to ~/clawd/research/[topic]-[angle].md" label="scout-2"
# wait 30s
sessions_spawn task="Read ~/clawd/AGENTS.md first. Research [TOPIC] focusing on [ANGLE 3]. Write to ~/clawd/research/[topic]-[angle].md" label="scout-3"
```

### Quick Web Lookup (No File Output)
```
sessions_spawn task="Read ~/clawd/AGENTS.md first. Quick research: [QUESTION]. Use web_fetch. Reply with summary (no file needed)." cleanup="delete"
```

### Twitter/X Research
```
sessions_spawn task="Read ~/clawd/AGENTS.md first. Research [TOPIC/PERSON] on Twitter using bird CLI. Find: key discussions, influential voices, recent trends. Summarize to ~/clawd/research/twitter-[topic].md"
```

---

## Code Work

### Code Review
```
sessions_spawn task="Read ~/clawd/AGENTS.md first, then ~/clawd/agents/code-reviewer.md. Review: [FILE or DESCRIPTION]. Focus on correctness, edge cases, maintainability."
```

### Security Review
```
sessions_spawn task="Read ~/clawd/AGENTS.md first, then ~/clawd/agents/security-reviewer.md. Security review: [FILE or DESCRIPTION]. Check vulnerabilities, auth issues, data exposure."
```

### Architecture Design
```
sessions_spawn task="Read ~/clawd/AGENTS.md first, then ~/clawd/agents/architect.md. Design architecture for: [FEATURE]. Consider scalability, patterns, integration points."
```

### UI Architecture
```
sessions_spawn task="Read ~/clawd/AGENTS.md first, then ~/clawd/agents/ui-architect.md. Design UI architecture for: [FEATURE/SCREEN]. Component hierarchy, state management, navigation."
```

### Implementation Planning
```
sessions_spawn task="Read ~/clawd/AGENTS.md first, then ~/clawd/agents/planner.md. Create implementation plan for: [FEATURE]. Break into tasks with file paths."
```

### iOS / React Native Work
```
sessions_spawn task="Read ~/clawd/AGENTS.md first, then ~/clawd/agents/ios-app-checklist.md. [TASK DESCRIPTION]. Project: ~/clawd/projects/[app-name]/" label="ios-[task]"
```

### Vibe Coding Session
```
sessions_spawn task="Read ~/clawd/AGENTS.md first, then ~/clawd/agents/vibe-coding-guide.md. Build: [FEATURE DESCRIPTION]. Project: [PATH]. Ship working code." label="vibe-[feature]"
```

---

## Browser Automation (ALWAYS spawn — never in main session)

### Web Scraping / Interaction
```
sessions_spawn task="Read ~/clawd/AGENTS.md first. Use browser tool to: [TASK]. Capture results to ~/clawd/research/[filename].md. Limit to 10 browser actions max." label="browser-[task]"
```

### LinkedIn Automation
```
sessions_spawn task="Read ~/clawd/AGENTS.md first, then ~/clawd/skills/linkedin/SKILL.md. [TASK — profile scrape, message, connect]. Write results to ~/clawd/research/linkedin-[output].md" label="linkedin-[task]"
```

---

## Focus Groups

**Full system:** `~/clawd/agents/focus-group/`

### Consumer Panel
```
sessions_spawn task="Read ~/clawd/agents/focus-group/personas/busy-parent.md. Review: [URL or content]. Honest detailed feedback."
# 30s gap
sessions_spawn task="Read ~/clawd/agents/focus-group/personas/skeptical-boomer.md. Review: [URL or content]. Honest detailed feedback."
# 30s gap
sessions_spawn task="Read ~/clawd/agents/focus-group/personas/tech-early-adopter.md. Review: [URL or content]. Honest detailed feedback."
```

### B2B Panel
```
sessions_spawn task="Read ~/clawd/agents/focus-group/personas/smb-owner.md. Review: [URL or content]. Honest detailed feedback."
sessions_spawn task="Read ~/clawd/agents/focus-group/personas/startup-founder.md. Review: [URL or content]. Honest detailed feedback."
sessions_spawn task="Read ~/clawd/agents/focus-group/personas/enterprise-buyer.md. Review: [URL or content]. Honest detailed feedback."
```

### Expert Panel
```
sessions_spawn task="Read ~/clawd/agents/focus-group/personas/ux-designer.md. Critique: [URL or content]."
sessions_spawn task="Read ~/clawd/agents/focus-group/personas/marketing-strategist.md. Critique: [URL or content]."
sessions_spawn task="Read ~/clawd/agents/focus-group/personas/copywriter.md. Critique: [URL or content]."
sessions_spawn task="Read ~/clawd/agents/focus-group/personas/sales-veteran.md. Critique: [URL or content]."
```

### Available Personas
| Type | Personas |
|------|----------|
| Consumer | busy-parent, skeptical-boomer, tech-early-adopter, budget-conscious, affluent-pro |
| B2B | smb-owner, enterprise-buyer, startup-founder |
| Expert | ux-designer, marketing-strategist, sales-veteran, copywriter |

---

## Content & Marketing

### Copywriting
```
sessions_spawn task="Read ~/clawd/AGENTS.md first. Write copy for [CONTEXT]. Target: [AUDIENCE]. Tone: [TONE]. Format: [landing page/email/social]. Save to ~/clawd/drafts/[filename].md"
```

### Marketing Playbook
```
sessions_spawn task="Read ~/clawd/AGENTS.md first, then ~/clawd/agents/marketing-playbook.md. Create marketing plan for: [PRODUCT/SERVICE]. Cover channels, messaging, timeline, budget."
```

### Technical Documentation
```
sessions_spawn task="Read ~/clawd/AGENTS.md first. Write technical docs for [CODE/FEATURE]. Include setup, usage examples, API reference. Save to [PATH]."
```

---

## Business & Pipeline

### ABM Outbound Campaign
```
sessions_spawn task="Read ~/clawd/AGENTS.md first, then ~/clawd/skills/abm-outbound/SKILL.md. Run ABM campaign for these LinkedIn URLs: [URLS]. Enrich via Apollo, generate email sequences + LinkedIn touches." label="abm-[campaign]" runTimeoutSeconds=1800
```

### Idea to Blueprint
```
sessions_spawn task="Read ~/clawd/AGENTS.md first, then ~/clawd/skills/idea-to-blueprint/SKILL.md. Transform this idea into a full blueprint: [IDEA DESCRIPTION]." label="blueprint-[idea]" model="opus" runTimeoutSeconds=3600
```

### Lead Gen Pipeline
```
sessions_spawn task="Read ~/clawd/AGENTS.md first. Run lead gen for [LOCATION/NICHE]. Steps: discover businesses → score sites → generate demos for top 3 → write outreach emails. Report results."
```

### Competitor Analysis
```
sessions_spawn task="Read ~/clawd/AGENTS.md first. Analyze competitor: [COMPANY/PRODUCT]. Cover: pricing, features, positioning, weaknesses, opportunities. Write to ~/clawd/research/competitor-[name].md"
```

---

## XPERIENCE Roofing

### Storm Check + Campaign
```
sessions_spawn task="Read ~/clawd/AGENTS.md first. Run storm check: source ~/clawd/.venv/bin/activate && python ~/clawd/systems/storm-monitor/storm_monitor.py --check --areas UT. If storms found, generate campaign draft." label="storm-check"
```

### Score + Demo for Prospect
```
sessions_spawn task="Read ~/clawd/AGENTS.md first. Run demo pipeline for [URL]: ~/clawd/systems/demo-pipeline/demo-pipeline.sh '[URL]'. Report results." label="demo-[name]"
```

---

## Monitoring

### GitHub Repo Check
```
sessions_spawn task="Read ~/clawd/AGENTS.md first. Check GitHub repo [OWNER/REPO]. Summarize: recent commits, open issues, PRs, action needed." cleanup="delete"
```

---

## Quick Reference

| Task | Key Agent/Skill |
|------|----------------|
| Deep research | AGENTS.md + web_fetch |
| Code review | agents/code-reviewer.md |
| Security check | agents/security-reviewer.md |
| Architecture | agents/architect.md |
| UI design | agents/ui-architect.md |
| iOS app | agents/ios-app-checklist.md |
| Vibe coding | agents/vibe-coding-guide.md |
| Planning | agents/planner.md |
| Marketing | agents/marketing-playbook.md |
| Focus group | agents/focus-group/personas/*.md |
| ABM outbound | skills/abm-outbound/ |
| Idea→blueprint | skills/idea-to-blueprint/ |
| Browser work | ALWAYS spawn subagent |

---

*Add new templates as patterns emerge.*
