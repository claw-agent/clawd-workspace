# Morning Report Delivery — 7am

You are the deliverer for Marb's morning report.

## Your Mission
Send the compiled overnight research to Marb via Telegram with the **Claw voice** (Qwen3-TTS).

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
- `~/clawd/reports/morning-$DATE/voice-script.txt`

If PDF missing: Compile phase may have failed. Note this in delivery message.

## Step 4: Check Voice File (Already Generated at 6am)

Voice should already exist from the 6am compile phase. Just verify it's there.

```bash
ls -la ~/clawd/reports/morning-$DATE/morning-brief.mp3 2>/dev/null
```

### If voice file exists (>400KB)
Good! Skip to Step 5. The Claw voice was generated during compile.

### If voice file is missing or small (<200KB)
The compile phase failed to generate voice. Use edge-tts as fallback:

```bash
echo "VOICE ERROR: Compile phase didn't generate voice" >> ~/clawd/reports/morning-$DATE/delivery-log.txt

~/.local/bin/edge-tts --voice en-US-GuyNeural \
  --text "$(cat ~/clawd/reports/morning-$DATE/voice-script.txt)" \
  --write-media ~/clawd/reports/morning-$DATE/morning-brief.mp3
```

Include in delivery message: "⚠️ Voice used backup (edge-tts) — Qwen3-TTS compile failed"
   ~/.local/bin/edge-tts --voice en-US-GuyNeural \
     --text "$(cat ~/clawd/reports/morning-$DATE/voice-script.txt)" \
     --write-media ~/clawd/reports/morning-$DATE/morning-brief.mp3
   ```

## Step 5: Load Scout Summaries

Read these files for stats:
- `~/clawd/research/bookmarks/$DATE/scout-alpha-summary.json`
- `~/clawd/research/timeline/$DATE/scout-delta-summary.json`
- `~/clawd/research/github/$DATE/scout-beta-summary.json`
- `~/clawd/research/news/$DATE/scout-gamma-summary.json`

Extract counts: newBookmarks, timeline posts, repos, news items.

## Step 6: Compose Message

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

📎 Full report + voice brief attached below.
```

## Step 7: Send via Telegram

1. Send text message first
2. Send PDF with caption "morning-report.pdf"
3. Send MP3 voice brief with caption "morning-brief.mp3"

Use target: 8130509493

## Step 8: Log Results

Write to `~/clawd/reports/morning-$DATE/delivery-log.txt`:
```
Delivery: SUCCESS/FAILED
Time: [timestamp]
Voice: Qwen3-TTS / edge-tts (fallback)
PDF sent: YES/NO
Voice sent: YES/NO
Errors: [any errors]
```

Update `~/clawd/memory/twitter-research-state.json` with delivery status.

## On Completion

Reply with:
- ✅ Delivered successfully / ❌ Delivery failed
- Voice used: Qwen3-TTS (Claw) / edge-tts (backup)
- Any issues encountered

---

## Important Notes

- **The Claw voice matters to Marb.** Don't silently use the backup.
- **180 second timeout** for Qwen3-TTS is normal — it's slow but produces the right voice.
- If voice generation is consistently failing, alert in the delivery message.
