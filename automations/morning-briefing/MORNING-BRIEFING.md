# Morning Briefing System

**Created:** 2026-02-02
**Status:** Active

## Overview

Daily morning briefing delivered at 7:00 AM MST. Generates a personalized audio summary using the Claw voice.

## What's Included

1. **Weather** — Denver conditions and forecast
2. **Twitter Insights** — Overnight bookmark analysis highlights
3. **Today's Focus** — Key tasks from SESSION-STATE.md
4. **Calendar** — Day's events (when available)
5. **News/Updates** — Significant tech/AI developments

## Components

- `briefing-prompt.md` — The prompt template
- `generate-briefing.sh` — Script to generate + send briefing
- Cron job runs at 7:00 AM daily

## Voice Output

Uses Qwen3-TTS with Claw voice (Tim Gerard Reynolds style) for audio delivery.

## Customization

Edit `briefing-prompt.md` to adjust tone, sections, or focus areas.
