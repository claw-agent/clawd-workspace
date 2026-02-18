# Morning Report Quality Review
**Date:** 2026-02-18 | **Scope:** Last 5 reports (Feb 13-17)

## How Marb Uses Reports

From daily notes and memory, Marb's pattern is clear:
1. **Receives text summary on Telegram** (~7am) — scans TL;DR and Top 5
2. **Reviews deeply later** (often afternoon/evening) — sends voice notes walking through items
3. **Cherry-picks 3-5 items** for deep research follow-ups
4. **Ignores** most action items, GitHub repos, and bookmark analyses

## What Gets Engagement (High Value)

| Signal | Examples | Why |
|--------|----------|-----|
| **Direct business relevance** | 3D Landscaping, Seedance for Red Rising, agent cost reduction | Connects to active projects |
| **Security/urgency** | OpenClaw exposed instances, malicious skills | Immediate action needed |
| **Paradigm shifts** | WebMCP, AGENTS.md paper, Spotify "Honk" | Changes how he thinks |
| **Tools he can use today** | Voicebox TTS, Chrome DevTools MCP, Brave API | Immediate integration |

## What Gets Ignored (Low Value)

| Signal | Examples | Why |
|--------|----------|-----|
| **Generic GitHub trending** | Most of the 10-14 repos listed daily | Too many, no curation signal |
| **Repeat items across days** | Chrome DevTools MCP appeared in 4/5 reports, WebMCP in 3/5 | Noise after first mention |
| **Vague action items** | "Read quadratic agent cost analysis", "Explore agent-lightning" | No clear payoff stated |
| **Model release horse-race** | GPT-5.3-Codex-Spark, MiniMax M2.5, Qwen 3.5 | Unless directly usable |
| **Bookmark deep-analysis tables** | Multi-column what/analysis/action breakdowns | Over-analyzed; a sentence suffices |

## Key Problems

### 1. Item Repetition Across Days (BIGGEST ISSUE)
Chrome DevTools MCP appears in Feb 13, 14, 15, 16 reports. WebMCP in Feb 14, 15, 16, 17. Action items carry forward without deduplication. This makes reports feel stale.

**Fix:** Track delivered items. If something appeared yesterday, don't re-feature it unless there's genuinely new info. One-line "still pending" in action items at most.

### 2. Too Many GitHub Repos
Reports list 10-14 repos daily. Marb has never acted on more than 1-2. The rest is noise.

**Fix:** Cap at 3 repos max. Only include if there's a clear "why this matters for us" sentence.

### 3. Action Items Are Wishlists, Not Actions
"Evaluate Chatterbox TTS" has appeared for days. No one's doing it. Action items should be things Claw will actually do proactively, or things Marb needs to decide on.

**Fix:** Split into:
- 🔴 **Decisions needed** (Marb must weigh in)
- 🟢 **I'll handle it** (Claw does it proactively)
- Drop everything else

### 4. Bookmark Analysis is Over-Engineered
The PDF has multi-column analysis tables for each bookmark. Marb reviews these via voice note in ~5 seconds each. A sentence per bookmark is plenty.

**Fix:** One line per bookmark: author, topic, one-sentence take.

### 5. Text Summary vs PDF Overlap
The text-summary.txt and PDF contain the same content in different formats. Marb reads text on Telegram, PDF is reference.

**Fix:** Text summary should be SHORTER than current — just TL;DR + Top 3 (not 5) + action items. PDF stays comprehensive.

## Recommended New Format

### Telegram Text (~300 words max, down from ~500)
```
☀️ Morning Intel — [Date]

TL;DR: [2-3 bullets, genuinely new things only]

🔥 TOP 3
1. [Title] — [Why it matters to us specifically]. [Link]
2. ...
3. ...

📚 [N] new bookmarks: [one-liner each]

⚡ ACTIONS
🔴 Need your call: [thing]
🟢 I'm on it: [thing]
```

### PDF (reference, scannable)
- Keep Top 5 table but deduplicate vs prior days
- GitHub: max 3 repos with "why us" rationale
- Bookmarks: one line each, kill the analysis tables
- Timeline: keep but trim to 10 posts max

## Metrics to Track
- How many items Marb actually follows up on (target: 2-3 per report)
- Report length trend (target: decreasing)
- Repeat item rate (target: <10%)

## Implementation
1. Update morning report compilation prompt/template with these constraints
2. Add a `delivered-items.json` tracker to avoid repetition
3. Slim the Typst template
