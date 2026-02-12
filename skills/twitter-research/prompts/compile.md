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

## Step 3: Build Report Structure

### Section 1: TL;DR
- 3 bullet points max
- Most actionable/important items only
- Each bullet: one sentence, clear action

### Section 2: Top 5 Highlights
- The 5 most important items across ALL sources
- Could be from bookmarks, timeline, GitHub, or news
- Include: what it is, why it matters
- Rate importance (1-5 stars)

---

### Section 3: New Bookmarks (Scout Alpha)

**Header:** "📚 X New Bookmarks" (where X is the count)

**Table 1: Bookmark List** (in chronological order, NOT categorized)

| No. | Author | Tweet | Content Type | Summary |
|-----|--------|-------|--------------|---------|
| 1 | @handle | "Tweet text excerpt..." | Thread + Links | What this is about |
| 2 | @other | "Tweet text..." | Article | Summary here |

**Table 2: Implications & Action Items**

| No. | What This Means | Deep Analysis | Action Items |
|-----|-----------------|---------------|--------------|
| 1 | Key insight/implication | For articles/links: detailed findings | "Could use X for Y" or "Already doing this" |
| 2 | Why this matters | Video/repo breakdown | "Explore further" or "Replace our W with this" |

**Following the tables, include:**
- 🔥 Highlights: Top 2-3 picks from bookmarks
- 💡 Cool Stuff: Interesting but not urgent
- 🤷 Less Useful: Noted but low priority

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

- Top 5-10 repos relevant to our interests
- For each: name, description, why interesting, stars
- Note top pick with brief recommendation

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

Consolidated TODO list from ALL sources:
- Specific, actionable items only
- Prioritized by importance
- Include source reference

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

Write a concise text summary for Telegram delivery:
- Top 5 highlights with 2-3 line descriptions each
- Include source URLs
- Brief emoji headers per section
- This replaces the voice brief (retired Feb 12, 2026)

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
