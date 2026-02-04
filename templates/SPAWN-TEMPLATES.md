# Spawn Templates

*Copy-paste templates for common sub-agent tasks.*

---

## Research Swarm

### Deep Research (Single Agent)
```
sessions_spawn task="Read ~/clawd/AGENTS.md first. Then read ~/clawd/skills/deep-research/SKILL.md. Research: [TOPIC]. Write findings to ~/clawd/research/[filename].md"
```

### Research Swarm (Multiple Scouts)
For comprehensive research, spawn 3-5 scouts with different angles:
```
sessions_spawn task="Read ~/clawd/AGENTS.md first. Research [TOPIC] focusing on [ANGLE 1]. Write to ~/clawd/research/[topic]-[angle].md"
sessions_spawn task="Read ~/clawd/AGENTS.md first. Research [TOPIC] focusing on [ANGLE 2]. Write to ~/clawd/research/[topic]-[angle].md"
sessions_spawn task="Read ~/clawd/AGENTS.md first. Research [TOPIC] focusing on [ANGLE 3]. Write to ~/clawd/research/[topic]-[angle].md"
```

### Quick Web Research
```
sessions_spawn task="Read ~/clawd/AGENTS.md first. Quick research: [QUESTION]. Use web_search and web_fetch. Reply with summary (no file needed)."
```

---

## Code Work

### Code Review
```
sessions_spawn task="Read ~/clawd/AGENTS.md first, then read ~/clawd/agents/code-reviewer.md. Review: [FILE or DESCRIPTION]. Focus on correctness, edge cases, and maintainability."
```

### Security Review
```
sessions_spawn task="Read ~/clawd/AGENTS.md first, then read ~/clawd/agents/security-reviewer.md. Security review: [FILE or DESCRIPTION]. Check for vulnerabilities, auth issues, data exposure."
```

### Architecture Design
```
sessions_spawn task="Read ~/clawd/AGENTS.md first, then read ~/clawd/agents/architect.md. Design architecture for: [FEATURE]. Consider scalability, patterns, and integration points."
```

### Implementation Planning
```
sessions_spawn task="Read ~/clawd/AGENTS.md first, then read ~/clawd/agents/planner.md. Create implementation plan for: [FEATURE]. Break into specific tasks with file paths."
```

---

## Focus Groups

**Full system:** `~/clawd/agents/focus-group/SKILL.md`

### Consumer Product Review Panel
```
sessions_spawn task="Read ~/clawd/agents/focus-group/personas/busy-parent.md. Review: [URL or content]. Give detailed honest feedback."
sessions_spawn task="Read ~/clawd/agents/focus-group/personas/skeptical-boomer.md. Review: [URL or content]. Give detailed honest feedback."
sessions_spawn task="Read ~/clawd/agents/focus-group/personas/tech-early-adopter.md. Review: [URL or content]. Give detailed honest feedback."
```

### B2B Product Review Panel
```
sessions_spawn task="Read ~/clawd/agents/focus-group/personas/smb-owner.md. Review: [URL or content]. Give detailed honest feedback."
sessions_spawn task="Read ~/clawd/agents/focus-group/personas/startup-founder.md. Review: [URL or content]. Give detailed honest feedback."
sessions_spawn task="Read ~/clawd/agents/focus-group/personas/enterprise-buyer.md. Review: [URL or content]. Give detailed honest feedback."
```

### Expert Review Panel
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

## Content Creation

### Copywriting Agent
```
sessions_spawn task="Read ~/clawd/AGENTS.md first. Write copy for [CONTEXT]. Target audience: [AUDIENCE]. Tone: [TONE]. Output: [FORMAT - e.g., landing page, email, social post]."
```

### Blog Post Writer
```
sessions_spawn task="Read ~/clawd/AGENTS.md first. Write a blog post about [TOPIC]. Length: [WORDS]. Style: [STYLE]. Include: [REQUIREMENTS]. Save to ~/clawd/drafts/[filename].md"
```

### Technical Documentation
```
sessions_spawn task="Read ~/clawd/AGENTS.md first. Write technical documentation for [CODE/FEATURE]. Include setup, usage examples, and API reference. Save to [PATH]."
```

---

## Lead Gen Pipeline

### Full Lead Gen Run
```
sessions_spawn task="Read ~/clawd/AGENTS.md first. Run lead gen pipeline for [LOCATION/NICHE]. Steps: 1) Discover businesses, 2) Score sites, 3) Generate demos for top 3, 4) Write outreach emails. Report results."
```

### Score Single Business
```
sessions_spawn task="Read ~/clawd/AGENTS.md first. Analyze and score [WEBSITE URL]. Use visual, conversion, content, and trust scoring. Write detailed report."
```

---

## Analysis

### Competitor Analysis
```
sessions_spawn task="Read ~/clawd/AGENTS.md first. Analyze competitor: [COMPANY/PRODUCT]. Cover: pricing, features, positioning, weaknesses, opportunities. Write to ~/clawd/research/competitor-[name].md"
```

### Market Research
```
sessions_spawn task="Read ~/clawd/AGENTS.md first. Research market for [PRODUCT/IDEA]. Cover: market size, competitors, trends, customer segments, pricing norms. Write comprehensive report."
```

---

## Monitoring

### GitHub Repo Check
```
sessions_spawn task="Read ~/clawd/AGENTS.md first. Check GitHub repo [OWNER/REPO]. Summarize: recent commits, open issues, PRs, any action needed."
```

### Twitter/X Research
```
sessions_spawn task="Read ~/clawd/AGENTS.md first. Research [TOPIC/PERSON] on Twitter using bird CLI. Find: key discussions, influential voices, recent trends. Summarize findings."
```

---

## Quick Reference

| Task | Template Key |
|------|--------------|
| Deep research | `deep-research` |
| Code review | `code-reviewer` |
| Security check | `security-reviewer` |
| Architecture | `architect` |
| Planning | `planner` |
| Focus group | Multiple persona spawns |
| Copy/content | Specify audience + tone |
| Lead gen | Full pipeline or single score |

**Always include:** `Read ~/clawd/AGENTS.md first` — ensures sub-agents inherit our protocols.

---

*Add new templates as patterns emerge.*
