# Example Templates

Copy these to your workspace root and customize.

## Files

| File | Purpose |
|------|---------|
| `AGENTS-template.md` | Operating guidelines → copy to `AGENTS.md` |
| `SOUL-template.md` | Agent personality → copy to `SOUL.md` |
| `SESSION-STATE-template.md` | Active memory → copy to `SESSION-STATE.md` |
| `HEARTBEAT-template.md` | Cron behavior → copy to `HEARTBEAT.md` |

## Quick Setup

```bash
cd ~/clawd
cp docs/examples/AGENTS-template.md AGENTS.md
cp docs/examples/SOUL-template.md SOUL.md
cp docs/examples/SESSION-STATE-template.md SESSION-STATE.md
cp docs/examples/HEARTBEAT-template.md HEARTBEAT.md
```

Then create USER.md manually with your info.

## Also Needed

Create these manually:

**USER.md:**
```markdown
# USER.md

- **Name:** Your name
- **Timezone:** Your timezone
- **Notes:** Anything relevant
```

**IDENTITY.md:**
```markdown
# IDENTITY.md

- **Name:** [Agent name]
- **Emoji:** [emoji]
```

**memory/ folder:**
```bash
mkdir -p memory
echo "# $(date +%Y-%m-%d)" > memory/$(date +%Y-%m-%d).md
```
