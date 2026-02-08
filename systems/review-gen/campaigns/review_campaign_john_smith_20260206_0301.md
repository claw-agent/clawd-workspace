# Review Request Campaign
**Generated:** 2026-02-06T03:01:37.392379

## Customer
- **Name:** John Smith
- **Phone:** +18015551234
- **Email:** john@example.com

## Job
- **Type:** roof replacement
- **Date:** 2026-02-06

---

## Message Sequence

### Step 1: SMS
**Send:** 2026-02-06 at 18:00
**To:** +18015551234

```
Hi John! This is The XPERIENCE Team from XPERIENCE Roofing. 

Thank you for choosing us for your roof replacement! 🏠

If you have a moment, would you mind leaving us a quick review? It really helps other homeowners find us.

⭐ Google: https://g.page/r/PLACE_ID/review

Thank you so much!
- XPERIENCE Roofing
```

### Step 2: Email
**Send:** 2026-02-07 at 10:00
**To:** john@example.com
**Subject:** Thank you for choosing XPERIENCE Roofing! 🏠

```
Hi John,

Thank you so much for trusting XPERIENCE Roofing with your roof replacement. We truly appreciate your business!

If you have a moment, we would be incredibly grateful if you could share your experience with a quick review. It helps other homeowners in the area find quality roofing services.

**Leave a Google Review (takes 2 minutes):**
https://g.page/r/PLACE_ID/review

**Prefer Facebook?**
https://facebook.com/xperienceroofing/reviews

If there's anything we could have done better, please reply to this email directly - we'd love to hear your feedback.

Thank you again for choosing us!

Warm regards,
The XPERIENCE Team
XPERIENCE Roofing
(801) XXX-XXXX

P.S. Your referrals mean everything to us. If you know anyone who needs roofing work, we'd be honored to help them too!
```

### Step 3: SMS *(if no_review_yet)*
**Send:** 2026-02-09 at 14:00
**To:** +18015551234

```
Hi John, just following up from XPERIENCE Roofing. 

We hope you're happy with your roof replacement! If you have 2 minutes, a review would mean the world to us:

⭐ https://g.page/r/PLACE_ID/review

Thank you! 🙏
```

### Step 4: SMS *(if no_review_yet)*
**Send:** 2026-02-13 at 11:00
**To:** +18015551234

```
Hi John! Last reminder from XPERIENCE Roofing. 

If we did a great job on your roof replacement, we'd be grateful for a review:

⭐ https://g.page/r/PLACE_ID/review

No pressure at all - thanks for being a customer! 🏠
```

---

## Integration Notes

**Twilio SMS:**
```python
from twilio.rest import Client
client.messages.create(
    body=message,
    from_=TWILIO_PHONE,
    to=customer_phone
)
```

**Email (SMTP or SendGrid):**
Use the generated subject and body with your preferred email service.

**Tracking:**
- Log each send with timestamp
- Check Google Business Profile for new reviews
- Stop sequence when review detected
