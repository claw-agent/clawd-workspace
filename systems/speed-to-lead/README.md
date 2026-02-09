# Speed-to-Lead SMS Auto-Responder

Instantly text new leads the moment they submit a form. Studies show responding within 5 minutes = 100x more likely to connect vs 30 minutes.

## How It Works

1. Lead submits form (roof estimator, landing page, etc.)
2. Form POSTs to `http://localhost:8765/lead`
3. Server sends personalized SMS within seconds via Twilio
4. Automatic follow-up sequence: Day 1, Day 3, Day 7

## Quick Start

```bash
# Dry run (no real SMS sent)
python ~/clawd/systems/speed-to-lead/server.py --dry-run

# Live mode
python ~/clawd/systems/speed-to-lead/server.py

# Test with curl
curl -X POST http://localhost:8765/lead \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Smith",
    "phone": "8015551234",
    "source": "roof-estimator",
    "company": "XPERIENCE Roofing",
    "interest": "roof replacement",
    "address": "123 Main St, SLC UT"
  }'
```

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/lead` | Receive new lead (JSON) |
| POST | `/twilio/status` | Twilio delivery callbacks |
| GET | `/health` | Health check |
| GET | `/leads` | View recent leads |

## SMS Templates

- **Immediate** — Personalized by source (roof-estimator, storm, default)
- **Day 1** — Soft follow-up, mention affordability
- **Day 3** — Availability reminder, casual tone
- **Day 7** — Final check-in, no pressure

## Integration

### Roof Estimator
Add to the estimator's form submit handler:
```javascript
fetch('https://your-server:8765/lead', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: formData.name,
    phone: formData.phone,
    source: 'roof-estimator',
    company: 'XPERIENCE Roofing',
    interest: 'roof replacement',
    address: formData.address
  })
});
```

### Storm Monitor
The storm dispatcher can feed leads here too when contacts respond to storm campaigns.

## Safety

- `--dry-run` mode by default for testing
- Duplicate detection (same phone within 24h = blocked)
- All SMS logged to `speed-to-lead.log`
- Follow-ups only process every 5 minutes (rate limited)

## Files

- `server.py` — Main server
- `leads.json` — Lead database
- `followups.json` — Scheduled follow-ups
- `speed-to-lead.log` — Activity log
