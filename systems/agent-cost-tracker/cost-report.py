#!/usr/bin/env python3
"""Agent Cost Tracker — Analyzes OpenClaw session token usage and estimates costs.

Reads sessions.json for token data and cron run history for frequency/duration.
Outputs a markdown report with cost estimates per job and totals.

Usage:
    python3 cost-report.py                    # Print to stdout
    python3 cost-report.py --output report.md # Write to file
    python3 cost-report.py --json             # JSON output
    python3 cost-report.py --html             # HTML dashboard
"""

import json
import sys
import os
import argparse
from datetime import datetime, timezone
from pathlib import Path

# Claude pricing (per 1M tokens) — update as needed
PRICING = {
    "claude-opus-4-6": {"input": 15.00, "output": 75.00, "cache_read": 1.50, "cache_write": 18.75},
    "claude-sonnet-4-20250514": {"input": 3.00, "output": 15.00, "cache_read": 0.30, "cache_write": 3.75},
    "claude-haiku-3-20240307": {"input": 0.25, "output": 1.25, "cache_read": 0.03, "cache_write": 0.30},
    # Default fallback
    "default": {"input": 15.00, "output": 75.00, "cache_read": 1.50, "cache_write": 18.75},
}

SESSIONS_DIR = Path.home() / ".openclaw" / "agents" / "main" / "sessions"
SESSIONS_JSON = SESSIONS_DIR / "sessions.json"


def load_sessions():
    """Load and parse sessions.json."""
    with open(SESSIONS_JSON) as f:
        return json.load(f)


def get_pricing(model: str) -> dict:
    """Get pricing for a model, falling back to default."""
    for key in PRICING:
        if key in (model or ""):
            return PRICING[key]
    return PRICING["default"]


def estimate_cost(tokens_in: int, tokens_out: int, context_tokens: int, model: str) -> float:
    """Estimate cost for a session. Context tokens are mostly cache reads."""
    p = get_pricing(model)
    # Context tokens = cached prompt (cache read rate)
    # Input tokens = new uncached input (full input rate) 
    # Output tokens = generation (output rate)
    cost = (
        (context_tokens / 1_000_000) * p["cache_read"]
        + (tokens_in / 1_000_000) * p["input"]
        + (tokens_out / 1_000_000) * p["output"]
    )
    return cost


def analyze():
    """Analyze all sessions and return structured data."""
    data = load_sessions()
    
    cron_jobs = {}
    spawned = {}
    main_session = {}
    
    for key, sess in data.items():
        if not isinstance(sess, dict):
            continue
        
        label = sess.get("label", "")
        sid = sess.get("sessionId", key)
        model = sess.get("model", "claude-opus-4-6")
        total = sess.get("totalTokens", 0)
        inp = sess.get("inputTokens", 0)
        out = sess.get("outputTokens", 0)
        ctx = sess.get("contextTokens", 0)
        
        if total == 0 and ctx == 0:
            continue
        
        cost = estimate_cost(inp, out, ctx, model)
        
        entry = {
            "session_id": sid,
            "label": label,
            "model": model,
            "input_tokens": inp,
            "output_tokens": out,
            "context_tokens": ctx,
            "total_tokens": total,
            "estimated_cost": cost,
        }
        
        if label.startswith("Cron:"):
            name = label.replace("Cron: ", "").strip()
            if name not in cron_jobs:
                cron_jobs[name] = {"sessions": [], "total_cost": 0, "total_tokens": 0, "total_context": 0, "total_output": 0}
            cron_jobs[name]["sessions"].append(entry)
            cron_jobs[name]["total_cost"] += cost
            cron_jobs[name]["total_tokens"] += total
            cron_jobs[name]["total_context"] += ctx
            cron_jobs[name]["total_output"] += out
        elif label:
            spawned[sid[:12]] = entry
        else:
            main_session[sid[:12]] = entry
    
    return {"cron_jobs": cron_jobs, "spawned": spawned, "main": main_session}


def format_markdown(result: dict) -> str:
    """Format analysis as markdown report."""
    lines = []
    now = datetime.now().strftime("%Y-%m-%d %H:%M")
    lines.append(f"# 🐾 Agent Cost Report")
    lines.append(f"*Generated: {now} MT*\n")
    
    # Summary
    total_cost = sum(j["total_cost"] for j in result["cron_jobs"].values())
    total_cost += sum(s["estimated_cost"] for s in result["spawned"].values())
    total_cost += sum(s["estimated_cost"] for s in result["main"].values())
    
    total_tokens = sum(j["total_tokens"] for j in result["cron_jobs"].values())
    total_tokens += sum(s["total_tokens"] for s in result["spawned"].values())
    total_tokens += sum(s["total_tokens"] for s in result["main"].values())
    
    total_context = sum(j["total_context"] for j in result["cron_jobs"].values())
    total_context += sum(s["context_tokens"] for s in result["spawned"].values())
    total_context += sum(s["context_tokens"] for s in result["main"].values())
    
    lines.append(f"## Summary")
    lines.append(f"- **Estimated total cost:** ${total_cost:.2f}")
    lines.append(f"- **Total tokens processed:** {total_tokens:,}")
    lines.append(f"- **Total context tokens (cached):** {total_context:,}")
    lines.append(f"- **Active cron jobs:** {len(result['cron_jobs'])}")
    lines.append(f"- **Spawned sessions:** {len(result['spawned'])}")
    lines.append(f"- **Pricing model:** Claude Opus 4 (Anthropic API rates)")
    lines.append(f"  - Context/cache read: $1.50/1M | Input: $15/1M | Output: $75/1M\n")
    
    # Cron jobs table
    lines.append(f"## Cron Job Costs (Ranked)")
    lines.append(f"| Job | Sessions | Context Tokens | Output Tokens | Est. Cost |")
    lines.append(f"|-----|----------|---------------|---------------|-----------|")
    
    sorted_jobs = sorted(result["cron_jobs"].items(), key=lambda x: x[1]["total_cost"], reverse=True)
    for name, j in sorted_jobs:
        lines.append(f"| {name} | {len(j['sessions'])} | {j['total_context']:,} | {j['total_output']:,} | ${j['total_cost']:.3f} |")
    
    cron_total = sum(j["total_cost"] for j in result["cron_jobs"].values())
    lines.append(f"| **TOTAL** | | | | **${cron_total:.3f}** |")
    
    # Monthly projection
    lines.append(f"\n## Monthly Projection")
    # Assume current data represents ~1 week-ish of sessions
    # Better: calculate from actual date range
    lines.append(f"*Based on current active session data. Actual may vary with session rotation.*\n")
    
    # Cost breakdown by category
    cron_cost = sum(j["total_cost"] for j in result["cron_jobs"].values())
    spawn_cost = sum(s["estimated_cost"] for s in result["spawned"].values())
    main_cost = sum(s["estimated_cost"] for s in result["main"].values())
    
    lines.append(f"| Category | Current Period | Est. Monthly (4x) |")
    lines.append(f"|----------|---------------|-------------------|")
    lines.append(f"| Cron jobs | ${cron_cost:.3f} | ${cron_cost * 4:.2f} |")
    lines.append(f"| Spawned agents | ${spawn_cost:.3f} | ${spawn_cost * 4:.2f} |")
    lines.append(f"| Main session | ${main_cost:.3f} | ${main_cost * 4:.2f} |")
    lines.append(f"| **Total** | **${total_cost:.3f}** | **${total_cost * 4:.2f}** |")
    
    # Recommendations
    lines.append(f"\n## Optimization Notes")
    
    # Find highest cost jobs
    if sorted_jobs:
        top = sorted_jobs[0]
        lines.append(f"- **Highest cost job:** {top[0]} (${top[1]['total_cost']:.3f})")
        
        # Find jobs with high context but low output (inefficient)
        for name, j in sorted_jobs:
            if j["total_context"] > 0 and j["total_output"] > 0:
                ratio = j["total_context"] / max(j["total_output"], 1)
                if ratio > 200:
                    lines.append(f"- ⚠️ **{name}**: context/output ratio = {ratio:.0f}x — may be doing minimal work for heavy context")
    
    lines.append("")
    return "\n".join(lines)


def format_json(result: dict) -> str:
    """Format as JSON."""
    # Make it serializable
    return json.dumps(result, indent=2, default=str)


def format_html(result: dict) -> str:
    """Generate a standalone HTML dashboard."""
    sorted_jobs = sorted(result["cron_jobs"].items(), key=lambda x: x[1]["total_cost"], reverse=True)
    now = datetime.now().strftime("%Y-%m-%d %H:%M")
    
    total_cost = sum(j["total_cost"] for j in result["cron_jobs"].values())
    total_cost += sum(s["estimated_cost"] for s in result["spawned"].values())
    total_cost += sum(s["estimated_cost"] for s in result["main"].values())
    
    rows = ""
    for name, j in sorted_jobs:
        ratio = j["total_context"] / max(j["total_output"], 1)
        flag = " ⚠️" if ratio > 200 else ""
        rows += f"""<tr>
            <td>{name}{flag}</td>
            <td>{len(j['sessions'])}</td>
            <td>{j['total_context']:,}</td>
            <td>{j['total_output']:,}</td>
            <td>${j['total_cost']:.3f}</td>
        </tr>\n"""
    
    return f"""<!DOCTYPE html>
<html><head>
<meta charset="utf-8"><title>🐾 Agent Cost Tracker</title>
<style>
    body {{ font-family: -apple-system, system-ui, sans-serif; max-width: 900px; margin: 2rem auto; padding: 0 1rem; background: #0d1117; color: #c9d1d9; }}
    h1 {{ color: #58a6ff; }}
    .stat {{ display: inline-block; background: #161b22; border: 1px solid #30363d; border-radius: 8px; padding: 1rem 1.5rem; margin: 0.5rem; text-align: center; }}
    .stat .value {{ font-size: 1.8rem; font-weight: bold; color: #58a6ff; }}
    .stat .label {{ font-size: 0.85rem; color: #8b949e; }}
    table {{ width: 100%; border-collapse: collapse; margin: 1.5rem 0; }}
    th, td {{ padding: 0.6rem 1rem; text-align: left; border-bottom: 1px solid #21262d; }}
    th {{ background: #161b22; color: #58a6ff; font-weight: 600; }}
    tr:hover {{ background: #161b22; }}
    .footer {{ color: #484f58; font-size: 0.8rem; margin-top: 2rem; }}
</style>
</head><body>
<h1>🐾 Agent Cost Tracker</h1>
<p style="color: #8b949e;">Generated: {now} MT</p>

<div>
    <div class="stat"><div class="value">${total_cost:.2f}</div><div class="label">Total Est. Cost</div></div>
    <div class="stat"><div class="value">{len(result['cron_jobs'])}</div><div class="label">Cron Jobs</div></div>
    <div class="stat"><div class="value">${total_cost * 4:.2f}</div><div class="label">Monthly Projection</div></div>
</div>

<h2>Cron Job Costs</h2>
<table>
<tr><th>Job</th><th>Sessions</th><th>Context Tokens</th><th>Output Tokens</th><th>Est. Cost</th></tr>
{rows}
</table>

<p class="footer">Pricing: Claude Opus 4 — Context $1.50/1M, Input $15/1M, Output $75/1M<br>
⚠️ = High context/output ratio (may be inefficient)</p>
</body></html>"""


def main():
    parser = argparse.ArgumentParser(description="Agent Cost Tracker")
    parser.add_argument("--output", "-o", help="Output file path")
    parser.add_argument("--json", action="store_true", help="JSON output")
    parser.add_argument("--html", action="store_true", help="HTML dashboard output")
    args = parser.parse_args()
    
    result = analyze()
    
    if args.json:
        output = format_json(result)
    elif args.html:
        output = format_html(result)
    else:
        output = format_markdown(result)
    
    if args.output:
        Path(args.output).write_text(output)
        print(f"Written to {args.output}")
    else:
        print(output)


if __name__ == "__main__":
    main()
