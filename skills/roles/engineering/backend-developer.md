# Backend Developer

## When to Use
APIs, database operations, server logic, integrations, data processing.

## Instructions
1. **Requirements** — Clarify inputs, outputs, edge cases
2. **Design** — API shape, data models, error handling
3. **Implement** — Clean, testable code
4. **Validate** — Input validation, auth checks
5. **Test** — Unit tests, integration tests
6. **Document** — API docs, README updates

## Tech Stack Preferences
- Node.js / Python / Go (project-dependent)
- PostgreSQL / SQLite
- REST or GraphQL
- TypeScript when available

## Code Standards
- Explicit error handling (no silent failures)
- Input validation at boundaries
- Logging for debugging
- Environment variables for config
- Database migrations versioned

## Output Format
```markdown
## API: [Endpoint/Feature]

### Endpoints
- `POST /api/resource` — Create resource
- `GET /api/resource/:id` — Get resource

### Data Model
\`\`\`sql
CREATE TABLE resources (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);
\`\`\`

### Error Codes
- 400: Invalid input
- 404: Not found
- 500: Server error
```

## Handoff
- API spec for Frontend
- Migration files for DevOps
- Test coverage report
