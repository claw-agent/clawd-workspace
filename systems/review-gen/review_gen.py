#!/usr/bin/env python3
"""
Review Generation System for Roofing Companies
Automated post-job review request sequences

Usage:
    python review_gen.py --generate --customer "John Smith" --phone "+18015551234" --email "john@example.com" --job "roof replacement"
    python review_gen.py --batch jobs.csv --output campaigns/
    python review_gen.py --template sms
"""

import argparse
import json
import os
import re
from datetime import datetime, timedelta
from pathlib import Path
from typing import Optional

# Default configuration
DEFAULT_CONFIG = {
    "company_name": "XPERIENCE Roofing",
    "company_phone": "(801) 555-0123",
    "google_review_url": "https://g.page/r/YOUR_GOOGLE_PLACE_ID/review",
    "facebook_review_url": "https://facebook.com/YOUR_PAGE/reviews",
    "owner_name": "Team",
    "sequence_delays": {
        "sms_1": 0,       # Same day (evening after job)
        "email_1": 1,     # Next day
        "sms_2": 3,       # 3 days later (if no review)
        "sms_3": 7,       # 7 days (final gentle nudge)
    }
}

# =============================================================================
# MESSAGE TEMPLATES
# =============================================================================

SMS_TEMPLATES = {
    "initial": """Hi {first_name}! This is {owner_name} from {company_name}. 

Thank you for choosing us for your {job_type}! 🏠

If you have a moment, would you mind leaving us a quick review? It really helps other homeowners find us.

⭐ Google: {google_url}

Thank you so much!
- {company_name}""",

    "followup_3day": """Hi {first_name}, just following up from {company_name}. 

We hope you're happy with your {job_type}! If you have 2 minutes, a review would mean the world to us:

⭐ {google_url}

Thank you! 🙏""",

    "final_7day": """Hi {first_name}! Last reminder from {company_name}. 

If we did a great job on your {job_type}, we'd be grateful for a review:

⭐ {google_url}

No pressure at all - thanks for being a customer! 🏠"""
}

EMAIL_TEMPLATES = {
    "initial": {
        "subject": "Thank you for choosing {company_name}! 🏠",
        "body": """Hi {first_name},

Thank you so much for trusting {company_name} with your {job_type}. We truly appreciate your business!

If you have a moment, we would be incredibly grateful if you could share your experience with a quick review. It helps other homeowners in the area find quality roofing services.

**Leave a Google Review (takes 2 minutes):**
{google_url}

**Prefer Facebook?**
{facebook_url}

If there's anything we could have done better, please reply to this email directly - we'd love to hear your feedback.

Thank you again for choosing us!

Warm regards,
{owner_name}
{company_name}
{company_phone}

P.S. Your referrals mean everything to us. If you know anyone who needs roofing work, we'd be honored to help them too!"""
    }
}

# =============================================================================
# HELPER FUNCTIONS
# =============================================================================

def extract_first_name(full_name: str) -> str:
    """Extract first name from full name."""
    parts = full_name.strip().split()
    return parts[0] if parts else "there"

def format_job_type(job_type: str) -> str:
    """Make job type human-readable."""
    job_type = job_type.lower().strip()
    
    # Common mappings
    mappings = {
        "roof": "roof replacement",
        "replacement": "roof replacement",
        "repair": "roof repair",
        "inspection": "roof inspection",
        "gutter": "gutter installation",
        "gutters": "gutter installation",
        "shingle": "shingle repair",
        "leak": "leak repair",
        "storm": "storm damage repair",
        "hail": "hail damage repair",
    }
    
    for key, value in mappings.items():
        if key in job_type:
            return value
    
    return job_type if job_type else "roofing work"

def validate_phone(phone: str) -> Optional[str]:
    """Validate and format phone number."""
    digits = re.sub(r'\D', '', phone)
    if len(digits) == 10:
        return f"+1{digits}"
    elif len(digits) == 11 and digits.startswith('1'):
        return f"+{digits}"
    return None

def load_config(config_path: Optional[str] = None) -> dict:
    """Load configuration from file or use defaults."""
    config = DEFAULT_CONFIG.copy()
    
    if config_path and os.path.exists(config_path):
        with open(config_path, 'r') as f:
            user_config = json.load(f)
            config.update(user_config)
    
    # Check for XPERIENCE config
    xperience_config = Path.home() / "clawd/systems/review-gen/config/xperience.json"
    if xperience_config.exists():
        with open(xperience_config, 'r') as f:
            config.update(json.load(f))
    
    return config

# =============================================================================
# CAMPAIGN GENERATION
# =============================================================================

def generate_campaign(
    customer_name: str,
    phone: Optional[str],
    email: Optional[str],
    job_type: str,
    job_date: Optional[str] = None,
    config: Optional[dict] = None
) -> dict:
    """Generate a complete review request campaign for one customer."""
    
    if config is None:
        config = load_config()
    
    first_name = extract_first_name(customer_name)
    formatted_job = format_job_type(job_type)
    
    # Calculate send dates
    base_date = datetime.strptime(job_date, "%Y-%m-%d") if job_date else datetime.now()
    delays = config["sequence_delays"]
    
    # Template variables
    vars = {
        "first_name": first_name,
        "full_name": customer_name,
        "job_type": formatted_job,
        "company_name": config["company_name"],
        "company_phone": config["company_phone"],
        "owner_name": config["owner_name"],
        "google_url": config["google_review_url"],
        "facebook_url": config["facebook_review_url"],
    }
    
    campaign = {
        "customer": {
            "name": customer_name,
            "first_name": first_name,
            "phone": validate_phone(phone) if phone else None,
            "email": email,
        },
        "job": {
            "type": formatted_job,
            "date": job_date or datetime.now().strftime("%Y-%m-%d"),
        },
        "generated_at": datetime.now().isoformat(),
        "sequence": []
    }
    
    # SMS 1 - Same day (evening)
    if phone:
        campaign["sequence"].append({
            "channel": "sms",
            "step": 1,
            "send_date": (base_date + timedelta(days=delays["sms_1"])).strftime("%Y-%m-%d"),
            "send_time": "18:00",  # 6 PM
            "message": SMS_TEMPLATES["initial"].format(**vars),
            "to": validate_phone(phone),
        })
    
    # Email 1 - Next day
    if email:
        email_content = EMAIL_TEMPLATES["initial"]
        campaign["sequence"].append({
            "channel": "email",
            "step": 2,
            "send_date": (base_date + timedelta(days=delays["email_1"])).strftime("%Y-%m-%d"),
            "send_time": "10:00",  # 10 AM
            "subject": email_content["subject"].format(**vars),
            "body": email_content["body"].format(**vars),
            "to": email,
        })
    
    # SMS 2 - 3 day follow-up
    if phone:
        campaign["sequence"].append({
            "channel": "sms",
            "step": 3,
            "send_date": (base_date + timedelta(days=delays["sms_2"])).strftime("%Y-%m-%d"),
            "send_time": "14:00",  # 2 PM
            "message": SMS_TEMPLATES["followup_3day"].format(**vars),
            "to": validate_phone(phone),
            "condition": "no_review_yet",
        })
    
    # SMS 3 - Final 7 day nudge
    if phone:
        campaign["sequence"].append({
            "channel": "sms",
            "step": 4,
            "send_date": (base_date + timedelta(days=delays["sms_3"])).strftime("%Y-%m-%d"),
            "send_time": "11:00",  # 11 AM
            "message": SMS_TEMPLATES["final_7day"].format(**vars),
            "to": validate_phone(phone),
            "condition": "no_review_yet",
        })
    
    return campaign

def format_campaign_markdown(campaign: dict) -> str:
    """Format campaign as human-readable markdown."""
    c = campaign
    
    md = f"""# Review Request Campaign
**Generated:** {c['generated_at']}

## Customer
- **Name:** {c['customer']['name']}
- **Phone:** {c['customer']['phone'] or 'N/A'}
- **Email:** {c['customer']['email'] or 'N/A'}

## Job
- **Type:** {c['job']['type']}
- **Date:** {c['job']['date']}

---

## Message Sequence

"""
    
    for step in c["sequence"]:
        condition = f" *(if {step.get('condition', 'N/A')})*" if step.get('condition') else ""
        
        if step["channel"] == "sms":
            md += f"""### Step {step['step']}: SMS{condition}
**Send:** {step['send_date']} at {step['send_time']}
**To:** {step['to']}

```
{step['message']}
```

"""
        elif step["channel"] == "email":
            md += f"""### Step {step['step']}: Email{condition}
**Send:** {step['send_date']} at {step['send_time']}
**To:** {step['to']}
**Subject:** {step['subject']}

```
{step['body']}
```

"""
    
    md += """---

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
"""
    
    return md

# =============================================================================
# CLI
# =============================================================================

def main():
    parser = argparse.ArgumentParser(description="Generate review request campaigns")
    
    parser.add_argument("--generate", action="store_true", help="Generate a single campaign")
    parser.add_argument("--customer", type=str, help="Customer full name")
    parser.add_argument("--phone", type=str, help="Customer phone number")
    parser.add_argument("--email", type=str, help="Customer email")
    parser.add_argument("--job", type=str, help="Job type (e.g., 'roof replacement')")
    parser.add_argument("--date", type=str, help="Job completion date (YYYY-MM-DD)")
    parser.add_argument("--output", type=str, help="Output directory")
    parser.add_argument("--config", type=str, help="Config file path")
    parser.add_argument("--template", type=str, choices=["sms", "email"], help="Show template")
    parser.add_argument("--batch", type=str, help="CSV file for batch processing")
    
    args = parser.parse_args()
    
    if args.template:
        if args.template == "sms":
            print("=== SMS TEMPLATES ===\n")
            for name, template in SMS_TEMPLATES.items():
                print(f"--- {name} ---")
                print(template)
                print()
        else:
            print("=== EMAIL TEMPLATES ===\n")
            for name, template in EMAIL_TEMPLATES.items():
                print(f"--- {name} ---")
                print(f"Subject: {template['subject']}")
                print(template['body'])
                print()
        return
    
    if args.generate:
        if not args.customer or not args.job:
            print("Error: --customer and --job are required for --generate")
            return
        
        if not args.phone and not args.email:
            print("Error: At least one of --phone or --email is required")
            return
        
        config = load_config(args.config)
        campaign = generate_campaign(
            customer_name=args.customer,
            phone=args.phone,
            email=args.email,
            job_type=args.job,
            job_date=args.date,
            config=config
        )
        
        # Output
        output_dir = Path(args.output or ".")
        output_dir.mkdir(parents=True, exist_ok=True)
        
        safe_name = re.sub(r'[^\w\s-]', '', args.customer).replace(' ', '_').lower()
        timestamp = datetime.now().strftime("%Y%m%d_%H%M")
        
        # JSON
        json_path = output_dir / f"review_campaign_{safe_name}_{timestamp}.json"
        with open(json_path, 'w') as f:
            json.dump(campaign, f, indent=2)
        
        # Markdown
        md_path = output_dir / f"review_campaign_{safe_name}_{timestamp}.md"
        with open(md_path, 'w') as f:
            f.write(format_campaign_markdown(campaign))
        
        print(f"✅ Campaign generated!")
        print(f"   JSON: {json_path}")
        print(f"   Markdown: {md_path}")
        print(f"\nSequence has {len(campaign['sequence'])} touchpoints over {config['sequence_delays']['sms_3']} days")
    
    elif args.batch:
        print("Batch processing not yet implemented")
        print("Format: CSV with columns: customer_name, phone, email, job_type, job_date")
    
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
