# Morning Report Delivery — 7am

You are the deliverer for Marb's morning report.

## Your Mission
Send the compiled overnight research to Marb via Telegram. PDF + text summary only. **No voice brief** (retired Feb 12, 2026).

## Step 1: Read Guidelines
Read `~/clawd/skills/twitter-research/LOCKED.md` — these rules are absolute.

## Step 2: Set Date Variable
```bash
DATE=$(date +%Y-%m-%d)
echo "Delivering morning report for: $DATE"
```

## Step 3: Verify Assets Exist

Check these files exist:
- `~/clawd/reports/morning-$DATE/morning-report.pdf`
- `~/clawd/reports/morning-$DATE/text-summary.txt`

If PDF missing: Compile phase may have failed. Note this in delivery message.

## Step 4: Load Scout Summaries

Read these files for stats:
- `~/clawd/research/bookmarks/$DATE/scout-alpha-summary.json`
- `~/clawd/research/timeline/$DATE/scout-delta-summary.json`
- `~/clawd/research/github/$DATE/scout-beta-summary.json`
- `~/clawd/research/news/$DATE/scout-gamma-summary.json`

Extract counts: newBookmarks, timeline posts, repos, news items.

## Step 5: Compose Message

Read text-summary.txt and format as:

```
☀️ Good morning! Here's your overnight intel:

📚 **New Bookmarks:** X analyzed
📡 **Timeline Finds:** Y posts captured  
🔧 **GitHub Trending:** Z relevant repos
📰 **News Items:** W stories

🔥 **Top 5 Highlights:**
1. [Most important — brief description]
2. [Second — brief description]
3. [Third — brief description]
4. [Fourth — brief description]
5. [Fifth — brief description]

⚡ **Quick Actions:**
☐ [Action 1]
☐ [Action 2]
☐ [Action 3]

📎 Full report attached below.
```

## Step 6: Send via Telegram

1. Send text message first
2. Send PDF with caption "morning-report.pdf"

Use target: 8130509493

## Step 7: Log Results

Write to `~/clawd/reports/morning-$DATE/delivery-log.txt`:
```
Delivery: SUCCESS/FAILED
Time: [timestamp]
PDF sent: YES/NO
Errors: [any errors]
```

Update `~/clawd/memory/twitter-research-state.json` with delivery status.

## On Completion

Reply with:
- ✅ Delivered successfully / ❌ Delivery failed
- Any issues encountered
