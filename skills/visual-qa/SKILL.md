# Visual QA Skill

LLM-powered visual QA for frontend projects. Spec-driven, no brittle test code.

---

## When to Use

- Before deploying a frontend
- After significant UI changes
- Design review checkpoints
- Catching visual regressions

---

## The Pattern

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   qa.md     │ ──► │  Browser    │ ──► │   LLM       │
│   (spec)    │     │  Snapshot   │     │   Review    │
└─────────────┘     └─────────────┘     └─────────────┘
                                               │
                                               ▼
                                        ┌─────────────┐
                                        │   Report    │
                                        │   + Fixes   │
                                        └─────────────┘
```

---

## Quick Start

### 1. Create QA Spec

Copy the template:
```bash
cp ~/clawd/templates/qa.md ~/clawd/projects/[project]/qa.md
```

Customize for your project:
- Update overview
- Add page-specific checks
- Note any known exceptions

### 2. Run QA

**Option A: In-conversation (quick)**
```
Me: "QA check on localhost:3000 using projects/[project]/qa.md"
```

Claw will:
1. Take browser snapshot
2. Compare against spec
3. Report failures

**Option B: Standalone (thorough)**
```javascript
sessions_spawn({
  task: `
    Read ~/clawd/skills/visual-qa/SKILL.md.
    Run QA on [URL] using ~/clawd/projects/[project]/qa.md.
    Take snapshots at mobile (375px), tablet (768px), desktop (1440px).
    Report all failures with screenshots.
  `,
  label: "qa-[project]"
})
```

### 3. Fix & Iterate

Pass failures to coding agent:
```
"Fix these QA failures: [list from report]"
```

Re-run QA until clean.

---

## Writing Good QA Specs

### Be Specific
❌ "Page looks good"
✅ "Hero section has 48px padding, headline is 64px font"

### Test User Journeys
❌ "Button exists"
✅ "Clicking 'Sign Up' opens modal with email field focused"

### Include Edge Cases
- Empty states
- Error states
- Loading states
- Long content overflow

### Note Exceptions
If something is intentionally broken or WIP, document it so QA doesn't flag it.

---

## Browser Commands

### Take Snapshot
```javascript
browser({ action: "snapshot", targetUrl: "http://localhost:3000" })
```

### Take Screenshot (for visual comparison)
```javascript
browser({ action: "screenshot", targetUrl: "http://localhost:3000", fullPage: true })
```

### Resize for Responsive
```javascript
// Mobile
browser({ action: "act", request: { kind: "resize", width: 375, height: 812 } })

// Tablet  
browser({ action: "act", request: { kind: "resize", width: 768, height: 1024 } })

// Desktop
browser({ action: "act", request: { kind: "resize", width: 1440, height: 900 } })
```

---

## QA Report Format

```markdown
# QA Report: [Project]
**Date:** [date]
**URL:** [url]
**Spec Version:** 1.0

## Summary
- ✅ Passed: 18
- ❌ Failed: 3
- ⏭️ Skipped: 2

## Failures

### 1. [Check name]
**Expected:** [what spec says]
**Actual:** [what was observed]
**Screenshot:** [if applicable]
**Severity:** High/Medium/Low

### 2. [Check name]
...

## Recommendations
- [Suggested fixes]
```

---

## Integration with Ralph Loops

For projects using Ralph Loops, add QA as a build validation step:

In `PROMPT_build.md`:
```markdown
99999. After implementing UI changes, run visual QA:
       - Take browser snapshot
       - Compare against qa.md spec
       - Fix any failures before marking task complete
```

---

## Tips

1. **Screenshot on failure** — Visual evidence makes fixing easier
2. **Test real devices** — Emulation isn't perfect
3. **Run before deploy** — Catch issues before users do
4. **Update specs** — When requirements change, update qa.md first
5. **Keep specs lean** — 20 checks > 200 checks (focus on what matters)
