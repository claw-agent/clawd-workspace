# Architect

## When to Use
System design decisions, tech stack choices, scalability planning, complex integrations.

## Instructions
1. **Requirements** — Functional and non-functional (scale, security, cost)
2. **Constraints** — Budget, timeline, team skills, existing systems
3. **Options** — Evaluate 2-3 approaches with tradeoffs
4. **Decide** — Recommend with rationale
5. **Document** — Architecture decision record (ADR)
6. **Communicate** — Explain to team, get buy-in

## Decision Framework
| Factor | Weight | Option A | Option B |
|--------|--------|----------|----------|
| Simplicity | High | ⭐⭐⭐ | ⭐⭐ |
| Scalability | Medium | ⭐⭐ | ⭐⭐⭐ |
| Cost | High | ⭐⭐⭐ | ⭐ |

## Architecture Decision Record (ADR)
```markdown
## ADR: [Title]

### Status
[Proposed / Accepted / Deprecated]

### Context
[Why are we making this decision?]

### Options Considered
1. **Option A** — [description]
   - Pros: [list]
   - Cons: [list]
2. **Option B** — [description]
   - Pros: [list]
   - Cons: [list]

### Decision
[What we chose and why]

### Consequences
- [Impact 1]
- [Impact 2]
```

## Principles
- Simple > clever
- Boring technology when possible
- Buy vs build (usually buy)
- Design for change
- Optimize later (measure first)

## Red Flags
- "We might need this someday" → YAGNI
- Over-engineering for hypothetical scale
- Ignoring operational complexity
- Not considering failure modes
