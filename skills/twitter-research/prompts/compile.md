# Morning Report Compile — 6am

You are the synthesizer for Marb's morning report.

## Your Mission
Gather all overnight research and compile it into a cohesive report ready for 7am delivery.

## Step 1: Read Guidelines
1. Read `~/clawd/skills/twitter-research/LOCKED.md` — these rules are absolute

## Step 2: Gather Research

```bash
DATE=$(date +%Y-%m-%d)
```

Collect all files from:
- `~/clawd/research/bookmarks/$DATE/*.md` (individual analyses)
- `~/clawd/research/bookmarks/$DATE/scout-alpha-summary.json`
- `~/clawd/research/timeline/$DATE/findings.md`
- `~/clawd/research/timeline/$DATE/scout-delta-summary.json`
- `~/clawd/research/github/$DATE/trending.md`
- `~/clawd/research/news/$DATE/digest.md`

If any folder is empty, note it but continue.

---

## Step 2.5: Deduplicate Against Recent Reports (CRITICAL)

```bash
cat ~/clawd/reports/delivered-items.json
```

If a topic already appears in `delivered-items.json`, do NOT feature it as a Top 3 highlight or in the TL;DR unless there is **genuinely new information** (not just another tweet about it). At the end of compilation, add any new featured items to this file.

## Step 2.6: Cross-Reference Against Existing Setup (CRITICAL)

Before writing recommendations, check what we ALREADY HAVE. This prevents embarrassing "you should try X" when X is already installed.

```bash
# Read our current tool inventory
cat ~/clawd/TOOLS.md

# Read our facts (accounts, tools, decisions)
cat ~/clawd/memory/facts.md

# Read recent decisions
ls ~/clawd/memory/decisions/

# Read current episodic state
cat ~/clawd/memory/episodic.md
```

**For every item in the report:**
- If we already have the tool/capability → note "Already in our stack" instead of recommending it
- If we already evaluated and rejected something → note "Previously evaluated, decided against" with reason
- If it's genuinely new → recommend it normally

**Common things we already have (non-exhaustive):**
- Chrome DevTools MCP (v0.17.0) — our primary browser automation tool
- Qwen3-TTS / Claw voice — our default TTS (claw-speak.sh / claw-speak-chunked.sh)
- MLX Whisper large-v3-turbo — our speech-to-text
- QMD (hybrid semantic search) — our local search tool
- Firecrawl SDK (installed, no API key)
- Bird CLI — Twitter/X access via Safari cookies
- Nightly security audit cron, weekly maintenance, skill evolution

If you're unsure whether we have something, run `memory_search` to check before recommending it.

## Step 3: Build Report Structure

### Section 1: TL;DR
- 2-3 bullet points max
- **Only genuinely new items** — nothing that appeared in yesterday's report
- Each bullet: one sentence, why it matters to US (not generic tech news)

### Section 2: Top 3 Highlights (NOT 5)
- The 3 most important items across ALL sources
- Could be from bookmarks, timeline, GitHub, or news
- Include: what it is, why it matters TO US specifically (not generic importance)
- Rate importance (1-5 stars)
- **DEDUP RULE:** If an item appeared in yesterday's report, do NOT include it unless there's genuinely new information. One-line mention in action items is fine.

---

### Section 3: New Bookmarks (Scout Alpha)

**Header:** "📚 X New Bookmarks" (where X is the count)

**Table 1: Bookmark List** (in chronological order, NOT categorized)

| No. | Author | Tweet | Content Type | Summary |
|-----|--------|-------|--------------|---------|
| 1 | @handle | "Tweet text excerpt..." | Thread + Links | What this is about |
| 2 | @other | "Tweet text..." | Article | Summary here |

**One-line take per bookmark** — no multi-column analysis tables. Just: what it is, one sentence on why it matters or doesn't. Marb reviews these in ~5 seconds each via voice note.

---

### Section 4: Timeline Discoveries (Scout Delta)

**Header:** "📡 From The Timeline — X Posts Captured"

Summarize the interesting posts found scrolling the For You feed:
- List top 5-10 finds with brief descriptions
- Note any threads worth reading later
- General themes observed

---

### Section 5: GitHub Trending (Scout Beta)

**Header:** "🔧 GitHub Trending"

- **MAX 3 repos** — only if directly relevant to our stack/projects
- For each: name, one sentence on why WE would use it (not generic description)
- Skip repos that are just "cool" with no clear use case for us

---

### Section 6: News & Trends (Scout Gamma)

**Header:** "📰 News & Trends"

- Top 5-10 news items from HN, Reddit, etc.
- Brief summary of each
- Links for deeper reading
- Trends observed

---

### Section 7: Action Items (Consolidated)

**Header:** "⚡ Action Items"

Split into two categories ONLY:
- 🔴 **Need your call:** Decisions only Marb can make (max 2)
- 🟢 **I'll handle it:** Things Claw will do proactively today (max 3)
- **Drop everything else.** Vague "evaluate X" or "explore Y" items that have lingered for days are not action items.

---

## Step 4: Generate PDF

**IMPORTANT: Typst Sanitization**

Before writing to .typ file, sanitize all content:
- Escape `#` as `\#` (except Typst commands)
- Escape `*` in content as `\*` 
- Escape `@` as `\@`
- Replace `[*#*]` patterns with `[No.]`
- Ensure all brackets are balanced

**Template structure:**
```typst
// Morning Report — {date}
#set page(paper: "us-letter", margin: 1in)
#set text(font: "Helvetica Neue", size: 10pt)

= Morning Intel — {date}

== TL;DR
...

== 🔥 Top 5 Highlights
...

== 📚 New Bookmarks
...

== 📡 Timeline Discoveries
...

== 🔧 GitHub Trending
...

== 📰 News & Trends
...

== ⚡ Action Items
...
```

**Compile:**
```bash
typst compile ~/clawd/reports/morning-$DATE/morning-report.typ \
  ~/clawd/reports/morning-$DATE/morning-report.pdf
```

If Typst errors occur, check the sanitization and fix.

---

## Step 5: Write Text Summary

Write a SHORT text summary for Telegram (~300 words max):
- TL;DR: 2-3 bullets of genuinely new things only
- Top 3 highlights (not 5) with one-line descriptions + links
- Bookmarks: one line each
- Action items: 🔴 decisions + 🟢 I'll handle it
- This replaces the voice brief (retired Feb 12, 2026)
- **NO repeat items from yesterday's report**

Save to: `~/clawd/reports/morning-$DATE/text-summary.txt`

---

## Step 6: Verify Outputs

Confirm these files exist:
- `reports/morning-$DATE/morning-report.pdf`
- `reports/morning-$DATE/text-summary.txt`

---

## On Completion

Reply with:
- Report compiled: Yes/No
- Item counts: new bookmarks, timeline posts, repos, news
- Any issues or gaps
- Ready for 7am delivery: Yes/No
