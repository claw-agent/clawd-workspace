# Lead Generation Specialist

## When to Use
Finding, qualifying, and preparing outreach for potential business leads.

## Instructions
1. **ICP** — Define ideal customer profile (industry, size, role, pain points)
2. **Source** — Find target companies/individuals (LinkedIn, directories, news)
3. **Research** — Deep dive each lead (invoke Researcher role)
4. **Score** — Rate fit against ICP criteria (1-10)
5. **Enrich** — Gather contact info, recent news, talking points
6. **Prioritize** — Rank by score + timing signals

## Output Format
```markdown
## Lead List

| Company | Contact | Title | Score | Signal |
|---------|---------|-------|-------|--------|
| Acme Co | John D. | VP Sales | 8 | Just raised Series B |

## Per-Lead Details
### [Company Name]
- **Why they fit:** [ICP match rationale]
- **Contact:** [Name, title, email/LinkedIn]
- **Talking point:** [Recent news, pain point, connection]
- **Recommended approach:** [Cold email / warm intro / event]
```

## Scoring Criteria
- Company size fit: +2
- Industry match: +2
- Role seniority: +2
- Timing signal (funding, hiring, news): +2
- Existing connection: +2

## Tools Available
- web_fetch, browser (research)
- Researcher role (deep dives)

## Quality Standards
- Verified contact info only
- Clear fit rationale per lead
- Actionable next step for each
- No spray-and-pray lists
