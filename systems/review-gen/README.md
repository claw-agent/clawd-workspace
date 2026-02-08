# Review Generation System

Automated post-job review request sequences for roofing companies.

## Why This Matters

Reviews are **the #1 local SEO factor** for service businesses. A 4.7+ star rating with 100+ reviews dominates local search. Most customers are happy but don't leave reviews unless asked. This system automates the ask with a multi-touch, proven sequence.

## How It Works

```
Job Complete → Evening SMS → Next Day Email → 3-Day SMS → 7-Day Final Nudge
```

Each touchpoint:
- Personalized with customer name and job type
- Direct link to Google Review (one tap on mobile)
- Friendly, non-pushy tone
- Conditional follow-ups (stops if review posted)

## Quick Start

```bash
# Generate a single campaign
cd ~/clawd/systems/review-gen
source ~/clawd/.venv/bin/activate

python review_gen.py --generate \
  --customer "John Smith" \
  --phone "+18015551234" \
  --email "john@example.com" \
  --job "roof replacement" \
  --date "2026-02-06" \
  --output campaigns/
```

Output: `campaigns/review_campaign_john_smith_*.json` and `.md`

## Message Sequence

| Step | Channel | Timing | Purpose |
|------|---------|--------|---------|
| 1 | SMS | Same day 6 PM | Strike while satisfaction is high |
| 2 | Email | Next day 10 AM | Different channel, more detail |
| 3 | SMS | Day 3, 2 PM | Gentle reminder (if no review) |
| 4 | SMS | Day 7, 11 AM | Final nudge (if no review) |

## Configuration

Edit `config/xperience.json`:

```json
{
  "company_name": "XPERIENCE Roofing",
  "company_phone": "(801) XXX-XXXX",
  "owner_name": "The XPERIENCE Team",
  "google_review_url": "https://g.page/r/PLACE_ID/review",
  "facebook_review_url": "https://facebook.com/xperienceroofing/reviews"
}
```

**Finding your Google Review URL:**
1. Go to Google Maps → Your Business
2. Click "Get more reviews"
3. Copy the short link (or use `https://g.page/r/YOUR_PLACE_ID/review`)

## Integration with Twilio

The generated campaigns include SMS messages ready for Twilio:

```python
from twilio.rest import Client

# Your Twilio credentials
TWILIO_SID = os.environ.get('TWILIO_SID')
TWILIO_TOKEN = os.environ.get('TWILIO_TOKEN')
TWILIO_PHONE = "+18554718307"  # Claw's Twilio number

client = Client(TWILIO_SID, TWILIO_TOKEN)

# Send review request
message = client.messages.create(
    body="Hi John! Thanks for choosing XPERIENCE Roofing...",
    from_=TWILIO_PHONE,
    to="+18015551234"
)
```

## Future Enhancements

- [ ] **Auto-send via Twilio** — Scheduled sends without manual trigger
- [ ] **Review detection** — Monitor Google Business Profile API for new reviews, stop sequence
- [ ] **A/B testing** — Test different message variants
- [ ] **CRM integration** — Pull job completions from ServiceTitan/Jobber
- [ ] **Incentives** — Optional: "Leave a review for $10 off your next service"

## Best Practices

1. **Timing matters** — Evening of job day is best (satisfaction peaks)
2. **Make it easy** — One-tap link, not "search for us on Google"
3. **Be authentic** — Personal name, specific job type
4. **Know when to stop** — Don't spam; 4 touches max
5. **Monitor results** — Track conversion rate (requests → reviews)

## File Structure

```
systems/review-gen/
├── review_gen.py      # Main script
├── config/
│   └── xperience.json # Company-specific config
├── campaigns/         # Generated campaigns (gitignored)
└── README.md          # This file
```

## Usage Examples

```bash
# View available templates
python review_gen.py --template sms
python review_gen.py --template email

# Generate campaign (phone only)
python review_gen.py --generate --customer "Jane Doe" --phone "8015551234" --job "repair"

# Generate campaign (email only)
python review_gen.py --generate --customer "Mike Johnson" --email "mike@email.com" --job "inspection"

# Custom job date
python review_gen.py --generate --customer "Sarah Williams" --phone "8015559999" --email "sarah@email.com" --job "storm damage repair" --date "2026-02-10"
```

---

Built by Claw 🐾 for XPERIENCE Roofing | Feb 2026
