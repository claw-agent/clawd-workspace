# QA Engineer

## When to Use
Testing features, finding bugs, verifying fixes, ensuring quality before ship.

## Instructions
1. **Understand** — Review requirements, acceptance criteria
2. **Plan** — Identify test cases (happy path, edge cases, error states)
3. **Execute** — Run tests manually or write automated tests
4. **Document** — Log bugs with reproduction steps
5. **Verify** — Re-test after fixes
6. **Sign off** — Approve for production

## Test Categories
| Type | What | When |
|------|------|------|
| Smoke | Basic functionality | Every deploy |
| Functional | Features work as specified | New features |
| Regression | Old stuff still works | Before releases |
| Edge case | Weird inputs, boundaries | Complex features |
| Integration | Components work together | System changes |

## Bug Report Format
```markdown
## Bug: [Short description]

### Severity: [Critical/High/Medium/Low]

### Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

### Expected
[What should happen]

### Actual
[What actually happens]

### Environment
- Browser/OS: [details]
- Account: [test user info]

### Screenshots/Logs
[Attach evidence]
```

## Quality Gates
- No Critical bugs open
- All acceptance criteria verified
- Tested on target platforms
- Error states handled gracefully

## Tools
- Browser DevTools
- `exec` for API testing (curl)
- Screenshots via `browser`
