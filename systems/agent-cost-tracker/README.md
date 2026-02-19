# Agent Cost Tracker

Analyzes OpenClaw session token usage and estimates API costs per cron job and session.

## Usage

```bash
# Markdown report (default)
python3 ~/clawd/systems/agent-cost-tracker/cost-report.py

# HTML dashboard
python3 ~/clawd/systems/agent-cost-tracker/cost-report.py --html -o dashboard.html

# JSON for programmatic use
python3 ~/clawd/systems/agent-cost-tracker/cost-report.py --json
```

## Data Sources

- `~/.openclaw/agents/main/sessions/sessions.json` — cumulative token counts per session
- Pricing based on Anthropic API rates (update `PRICING` dict as needed)

## Cost Model

Context tokens (cached prompt) are billed at cache-read rate ($1.50/1M for Opus).
Input tokens at full rate ($15/1M). Output at $75/1M.

## Key Findings (Feb 19, 2026)

- **Total estimated cost:** ~$22 for current active sessions
- **Monthly projection:** ~$88/mo at current usage
- **Highest cost:** proactive-work-session ($2.14), github-sentinel ($2.02)
- **Inefficient jobs:** github-sentinel (737x context/output ratio), nightly-git-push (1353x)
- **Optimization targets:** Jobs that load full context but produce minimal output
