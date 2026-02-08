# Storm Monitor + Dispatcher

Automated severe weather monitoring → campaign generation → execution pipeline for roofing lead gen.

## Architecture

```
NWS API → storm_monitor.py → campaigns/*.md → dispatcher.py → SMS/Email/Social/Notification
```

## Quick Start

```bash
# One-time check (dry run)
./storm-pipeline.sh

# Live execution (sends notifications)
./storm-pipeline.sh --execute

# Manual dispatch of specific campaign
python dispatcher.py --campaign campaigns/storm-2026-02-07.md --channels notification,sms --execute
```

## Components

| File | Purpose |
|------|---------|
| `storm_monitor.py` | Fetches NWS alerts, filters for roofing-relevant events, generates campaign markdown |
| `dispatcher.py` | Parses campaigns, sends to channels (SMS, email, social drafts, Telegram notification) |
| `storm-pipeline.sh` | Cron-ready wrapper combining both steps |
| `dispatch-config.json` | Channel config, rate limits, service areas |
| `contacts.json` | Contact database for outbound SMS/email |
| `state.json` | Tracks previously seen alerts (deduplication) |

## Channels

| Channel | Auto-execute | Notes |
|---------|-------------|-------|
| **Notification** | ✅ Yes | Always alerts Marb via Telegram |
| **SMS** | ❌ Manual | Requires `--execute` + contacts in contacts.json |
| **Email** | ❌ Manual | Template-based, requires SMTP config |
| **Social** | Draft only | Saves drafts to `campaigns/social-drafts/` |

## Safety

- Default mode is **dry run** — nothing sends without `--execute`
- SMS/email never auto-execute (only notifications do)
- Rate limited: 20 SMS/hour, 3 per contact/day
- All actions logged to `dispatch-log.json`
- Twilio disabled by default in config

## Cron Setup

For automated monitoring, add via OpenClaw cron:
```
Every 30 min during storm season (Mar-Oct):
  storm-pipeline.sh --execute
```

## Adding Contacts

Edit `contacts.json`:
```json
{
  "contacts": [
    {"name": "John Smith", "phone": "+18015551234", "segment": "previous_customers"}
  ]
}
```

## Built For

**XPERIENCE Roofing** — Service area: Utah (20 priority cities configured)
