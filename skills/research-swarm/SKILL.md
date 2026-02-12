# Research Swarm Skill

Multi-agent research orchestration. Spawn specialized agents that work in parallel, synthesize findings, and deliver actionable insights.

## When to Use
- Deep research on a topic requiring multiple angles
- Market analysis / competitive intelligence
- Lead generation research (discovering targets)
- Technology evaluation with multiple criteria
- Any task requiring parallel information gathering over 15+ min

## When NOT to Use
- Quick factual questions (just use web_fetch or your knowledge)
- Single-source lookups (one URL to read — don't spawn agents for that)
- Time-sensitive requests (<5 min) — subagents can timeout (lesson: Feb 4)
- Research on a single tool/product — a single spawn or manual research is faster
- When Marb needs the answer NOW — do it yourself, spawn for background/overnight

## Team Structure

### Core Agents

**Scout** — Fast, broad discovery
- Finds sources, identifies key players, maps the landscape
- Output: List of targets, sources, initial findings

**Deep Diver** — Thorough analysis
- Goes deep on specific items from Scout
- Output: Detailed profiles, extracted data

**Synthesizer** — Pattern recognition
- Combines findings from multiple agents
- Output: Summary, insights, recommendations

**Validator** — Quality control
- Fact-checks, finds gaps, challenges assumptions
- Output: Confidence scores, flagged issues

## Usage

### Quick Research (single agent)
```
Spawn a research agent to investigate [topic].
Focus on: [specific angles]
Deliver: [format - summary, list, report]
```

### Full Swarm (parallel)
```
Deploy research swarm on [topic]:
- 2 Scouts: [angle 1], [angle 2]  
- 1 Deep Diver per Scout finding
- 1 Synthesizer to combine
Time budget: [X minutes]
```

## Agent Templates

Templates live in `agents/` subdirectory:
- `scout.md` — Discovery agent
- `deep-diver.md` — Analysis agent
- `synthesizer.md` — Pattern/summary agent
- `validator.md` — QA agent

## Spawn Pattern

```javascript
// Parallel scouts
sessions_spawn({ task: "Scout: [angle]", label: "scout-1" })
sessions_spawn({ task: "Scout: [angle]", label: "scout-2" })

// Wait for scouts, then deep dive on findings
sessions_spawn({ task: "Deep dive: [finding]", label: "diver-1" })

// Synthesize all
sessions_spawn({ task: "Synthesize findings from scout-1, scout-2, diver-1" })
```

## Best Practices

1. **Scope tightly** — Vague prompts = vague results
2. **Time-box** — Set runTimeoutSeconds to prevent runaway agents
3. **Label everything** — Makes tracking and synthesis easier
4. **Start small** — 2-3 agents, not 10
5. **Review before scaling** — Check first batch quality before spawning more

## Example: Market Research

```
Deploy research swarm on "AI writing tools market":

Scout 1: Find top 20 tools by market presence
Scout 2: Find emerging/indie tools under radar
Deep Diver: Analyze pricing models of top 5
Deep Diver: Analyze feature differentiation
Synthesizer: Create competitive landscape summary

Output: Markdown report with positioning map
```

## Output Location

Agents should write findings to:
```
~/clawd/research/[project-name]/
├── raw/           # Individual agent outputs
├── synthesis.md   # Combined findings
└── summary.md     # Executive summary
```
