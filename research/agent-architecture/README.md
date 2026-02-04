# Agent Architecture Research

**Completed:** 2026-01-26  
**Purpose:** Research skills.sh, multi-agent orchestration patterns, and recommendations for SLC Lead Gen agent refinement

---

## Contents

| Document | Description |
|----------|-------------|
| [01-skills-sh-catalog.md](./01-skills-sh-catalog.md) | Complete catalog of skills.sh skills with descriptions and patterns |
| [02-multi-agent-best-practices.md](./02-multi-agent-best-practices.md) | Best practices for multi-agent orchestration (Anthropic, OpenAI, AutoGen, CrewAI) |
| [03-slc-lead-gen-recommendations.md](./03-slc-lead-gen-recommendations.md) | Specific recommendations for refining SLC Lead Gen 40-agent setup |

---

## Key Findings

### Skills.sh
- **16 official skills** from Anthropic covering creative, document, development, and enterprise use cases
- Key pattern: **Progressive disclosure** (load context only as needed)
- Skills are portable across 15+ agent platforms
- Best for domain expertise and repeatable workflows

### Multi-Agent Best Practices
- **Start simple** — single agent + tools before multi-agent
- **5 core workflow patterns**: Prompt chaining, Routing, Parallelization, Orchestrator-Workers, Evaluator-Optimizer
- **Handoffs are key**: Explicit conditions for agent transfers
- **Tool design matters**: Agent-Computer Interface (ACI) needs as much attention as HCI
- Successful systems use **3-7 agents** max, not 40

### SLC Lead Gen Recommendations
- **40 agents is excessive** — consolidate to 5-8 core agents
- Current setup reads like **job descriptions**, not **agent specifications**
- Missing: handoff logic, tool assignments, activation triggers
- Proposed: Orchestrator + 4-5 specialized agents with clear handoffs

---

## Action Items

1. [ ] Review 01-skills-sh-catalog.md for skill patterns to adopt
2. [ ] Apply patterns from 02-multi-agent-best-practices.md
3. [ ] Implement recommendations from 03-slc-lead-gen-recommendations.md
4. [ ] Convert SLC Lead Gen to proper Agent Skill format

---

## Sources

- https://skills.sh
- https://github.com/anthropics/skills
- https://agentskills.io
- https://www.anthropic.com/engineering/building-effective-agents
- https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills
- https://github.com/openai/swarm
- https://microsoft.github.io/autogen
- https://docs.crewai.com
- https://langchain-ai.github.io/langgraph
