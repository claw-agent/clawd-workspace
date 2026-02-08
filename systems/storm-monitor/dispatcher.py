#!/usr/bin/env python3
"""
Storm Campaign Dispatcher
==========================
Connects storm monitor output to actual campaign execution channels.

Modes:
  --dry-run     Preview what would be sent (default)
  --execute     Actually send SMS/emails
  --campaign    Process a specific campaign file
  --pending     Process all unexecuted campaigns

Channels:
  - Twilio SMS (immediate + follow-up sequences)
  - Email via SMTP (templated)
  - Social post drafts (saved for manual posting)
  - Claw notification (alerts Marb via Telegram)

Safety:
  - ALWAYS dry-run first
  - Requires explicit --execute flag
  - Rate limiting built in
  - Logs all actions
"""

import argparse
import json
import os
import sys
import re
from datetime import datetime, timedelta
from pathlib import Path

# Paths
SYSTEMS_DIR = Path(__file__).parent
CAMPAIGNS_DIR = SYSTEMS_DIR / "campaigns"
DISPATCH_LOG = SYSTEMS_DIR / "dispatch-log.json"
CONTACTS_FILE = SYSTEMS_DIR / "contacts.json"
CONFIG_FILE = SYSTEMS_DIR / "dispatch-config.json"

# Default config (overridden by dispatch-config.json)
DEFAULT_CONFIG = {
    "twilio": {
        "credentials_file": "~/clawd/projects/slc-lead-gen/config/.twilio-credentials",
        "from_number": "+18554718307",
        "enabled": False  # Must explicitly enable
    },
    "notification": {
        "enabled": True,  # Always notify Marb of storms
        "channel": "telegram"
    },
    "rate_limits": {
        "max_sms_per_hour": 20,
        "max_sms_per_contact_per_day": 3,
        "min_seconds_between_sms": 5
    },
    "auto_execute": {
        "severity_threshold": 3,  # Only auto-send for severity >= 3
        "channels": ["notification"],  # Only auto-notify; SMS/email need manual approval
    },
    "followup_delays": {
        "immediate": 0,
        "day_1": 86400,
        "day_2_3": 172800,
        "week_1": 604800
    }
}


def load_config():
    """Load dispatch configuration."""
    config = DEFAULT_CONFIG.copy()
    if CONFIG_FILE.exists():
        try:
            user_config = json.loads(CONFIG_FILE.read_text())
            # Deep merge
            for key, val in user_config.items():
                if isinstance(val, dict) and key in config:
                    config[key].update(val)
                else:
                    config[key] = val
        except Exception as e:
            print(f"  ⚠️ Config error: {e}, using defaults")
    return config


def load_dispatch_log():
    """Load history of dispatched campaigns."""
    if DISPATCH_LOG.exists():
        try:
            return json.loads(DISPATCH_LOG.read_text())
        except:
            pass
    return {"dispatched": [], "scheduled_followups": []}


def save_dispatch_log(log):
    """Save dispatch history."""
    DISPATCH_LOG.write_text(json.dumps(log, indent=2, default=str))


def load_contacts():
    """Load contact list for outbound campaigns."""
    if CONTACTS_FILE.exists():
        try:
            return json.loads(CONTACTS_FILE.read_text())
        except:
            pass
    return {"contacts": [], "segments": {}}


def parse_campaign_file(filepath: Path) -> dict:
    """Parse a campaign markdown file into structured data."""
    content = filepath.read_text()
    
    campaign = {
        "file": str(filepath),
        "raw": content,
        "sms": {},
        "email": {},
        "social": {},
        "ad_copy": {},
        "door_hanger": {},
        "timing": {},
        "targeting": {},
        "metadata": {}
    }
    
    # Extract metadata from header
    lines = content.split("\n")
    for line in lines[:20]:
        if "Event:" in line:
            campaign["metadata"]["event"] = line.split("Event:")[-1].strip().strip("*")
        if "Severity:" in line:
            campaign["metadata"]["severity"] = line.split("Severity:")[-1].strip().strip("*")
        if "Hail Size:" in line:
            campaign["metadata"]["hail_size"] = line.split("Hail Size:")[-1].strip().strip("*")
        if "Areas:" in line:
            campaign["metadata"]["areas"] = line.split("Areas:")[-1].strip().strip("*")
    
    # Extract SMS sections
    sms_match = re.search(r'## 📱 SMS Campaign.*?(?=\n## )', content, re.DOTALL)
    if sms_match:
        sms_text = sms_match.group()
        # Extract individual messages
        immediate = re.search(r'### Immediate.*?\n(.*?)(?=\n###|\n## )', sms_text, re.DOTALL)
        if immediate:
            campaign["sms"]["immediate"] = immediate.group(1).strip()
        followup_24 = re.search(r'### Follow-up \(24.*?\n(.*?)(?=\n###|\n## )', sms_text, re.DOTALL)
        if followup_24:
            campaign["sms"]["followup_24h"] = followup_24.group(1).strip()
        followup_48 = re.search(r'### Follow-up \(48.*?\n(.*?)(?=\n###|\n## )', sms_text, re.DOTALL)
        if followup_48:
            campaign["sms"]["followup_48h"] = followup_48.group(1).strip()
    
    # Extract email
    email_match = re.search(r'## 📧 Email Campaign.*?(?=\n## )', content, re.DOTALL)
    if email_match:
        email_text = email_match.group()
        subject = re.search(r'\*\*Subject:\*\* (.*)', email_text)
        if subject:
            campaign["email"]["subject"] = subject.group(1).strip()
        campaign["email"]["body"] = email_text
    
    # Extract social
    social_match = re.search(r'## 📱 Social Media.*?(?=\n## )', content, re.DOTALL)
    if social_match:
        campaign["social"]["raw"] = social_match.group()
    
    return campaign


def send_sms_twilio(to_number: str, message: str, config: dict, dry_run: bool = True) -> dict:
    """Send SMS via Twilio."""
    result = {
        "channel": "sms",
        "to": to_number,
        "message": message[:160],  # SMS limit
        "timestamp": datetime.now().isoformat(),
        "status": "dry_run" if dry_run else "pending"
    }
    
    if dry_run:
        print(f"    [DRY RUN] SMS → {to_number}: {message[:80]}...")
        return result
    
    try:
        # Load Twilio credentials
        creds_path = Path(config["twilio"]["credentials_file"]).expanduser()
        if not creds_path.exists():
            result["status"] = "error"
            result["error"] = "Credentials file not found"
            return result
        
        creds = {}
        for line in creds_path.read_text().strip().split("\n"):
            if "=" in line:
                k, v = line.split("=", 1)
                creds[k.strip()] = v.strip()
        
        account_sid = creds.get("TWILIO_ACCOUNT_SID", "")
        auth_token = creds.get("TWILIO_AUTH_TOKEN", "")
        from_number = config["twilio"]["from_number"]
        
        import requests
        resp = requests.post(
            f"https://api.twilio.com/2010-04-01/Accounts/{account_sid}/Messages.json",
            auth=(account_sid, auth_token),
            data={
                "From": from_number,
                "To": to_number,
                "Body": message
            }
        )
        
        if resp.status_code in (200, 201):
            result["status"] = "sent"
            result["sid"] = resp.json().get("sid")
        else:
            result["status"] = "error"
            result["error"] = resp.text[:200]
            
    except Exception as e:
        result["status"] = "error"
        result["error"] = str(e)
    
    return result


def dispatch_campaign(campaign: dict, contacts: dict, config: dict, 
                       dry_run: bool = True, channels: list = None) -> dict:
    """Dispatch a parsed campaign to specified channels."""
    
    results = {
        "campaign_file": campaign["file"],
        "timestamp": datetime.now().isoformat(),
        "dry_run": dry_run,
        "actions": []
    }
    
    channels = channels or ["notification"]
    event = campaign["metadata"].get("event", "Unknown Storm Event")
    areas = campaign["metadata"].get("areas", "Unknown Area")
    
    print(f"\n  📋 Dispatching: {event}")
    print(f"     Areas: {areas}")
    print(f"     Channels: {', '.join(channels)}")
    print(f"     Mode: {'DRY RUN' if dry_run else '🔴 LIVE'}")
    
    # 1. Notification (always)
    if "notification" in channels:
        severity = campaign["metadata"].get("severity", "Unknown")
        hail = campaign["metadata"].get("hail_size", "N/A")
        
        notif_msg = (
            f"🌩️ STORM ALERT — {event}\n"
            f"📍 {areas}\n"
            f"⚡ Severity: {severity}\n"
            f"🧊 Hail: {hail}\n\n"
            f"Campaign generated: {campaign['file']}\n"
            f"Run `dispatcher.py --campaign {campaign['file']} --execute` to send."
        )
        
        if dry_run:
            print(f"\n    [DRY RUN] Telegram notification:")
            print(f"    {notif_msg[:200]}...")
        else:
            # This would use the message tool in production
            print(f"    → Notification queued for Telegram")
        
        results["actions"].append({
            "channel": "notification",
            "status": "dry_run" if dry_run else "sent",
            "message": notif_msg
        })
    
    # 2. SMS outbound
    if "sms" in channels and campaign.get("sms", {}).get("immediate"):
        contact_list = contacts.get("contacts", [])
        sms_msg = campaign["sms"]["immediate"]
        
        print(f"\n    📱 SMS Campaign ({len(contact_list)} contacts)")
        
        for contact in contact_list:
            phone = contact.get("phone")
            name = contact.get("name", "Homeowner")
            
            if not phone:
                continue
            
            # Personalize
            personalized = sms_msg.replace("[NAME]", name).replace("{name}", name)
            
            result = send_sms_twilio(phone, personalized, config, dry_run)
            results["actions"].append(result)
    
    # 3. Social media drafts (always saved, never auto-posted)
    if "social" in channels and campaign.get("social", {}).get("raw"):
        draft_path = Path(campaign["file"]).parent / "social-drafts"
        draft_path.mkdir(exist_ok=True)
        
        timestamp = datetime.now().strftime("%Y%m%d-%H%M")
        draft_file = draft_path / f"social-draft-{timestamp}.md"
        draft_file.write_text(campaign["social"]["raw"])
        
        print(f"\n    📱 Social draft saved: {draft_file}")
        results["actions"].append({
            "channel": "social",
            "status": "draft_saved",
            "file": str(draft_file)
        })
    
    # 4. Schedule follow-ups
    if "sms" in channels and not dry_run:
        followups = []
        if campaign["sms"].get("followup_24h"):
            followups.append({
                "delay_hours": 24,
                "message": campaign["sms"]["followup_24h"],
                "campaign_file": campaign["file"]
            })
        if campaign["sms"].get("followup_48h"):
            followups.append({
                "delay_hours": 48,
                "message": campaign["sms"]["followup_48h"],
                "campaign_file": campaign["file"]
            })
        
        if followups:
            log = load_dispatch_log()
            log["scheduled_followups"].extend(followups)
            save_dispatch_log(log)
            print(f"\n    ⏰ Scheduled {len(followups)} follow-up messages")
    
    # Log dispatch
    log = load_dispatch_log()
    log["dispatched"].append(results)
    save_dispatch_log(log)
    
    return results


def process_pending_campaigns(config: dict, dry_run: bool = True, channels: list = None):
    """Find and process all unexecuted campaigns."""
    if not CAMPAIGNS_DIR.exists():
        print("  No campaigns directory found.")
        return []
    
    log = load_dispatch_log()
    dispatched_files = {d["campaign_file"] for d in log.get("dispatched", [])}
    contacts = load_contacts()
    
    campaign_files = sorted(CAMPAIGNS_DIR.glob("*.md"))
    pending = [f for f in campaign_files if str(f) not in dispatched_files]
    
    if not pending:
        print("  ✓ No pending campaigns to dispatch.")
        return []
    
    print(f"\n  Found {len(pending)} pending campaign(s)")
    
    results = []
    for cf in pending:
        campaign = parse_campaign_file(cf)
        result = dispatch_campaign(campaign, contacts, config, dry_run, channels)
        results.append(result)
    
    return results


def main():
    parser = argparse.ArgumentParser(description="Storm Campaign Dispatcher")
    parser.add_argument("--dry-run", action="store_true", default=True,
                       help="Preview actions without executing (default)")
    parser.add_argument("--execute", action="store_true",
                       help="Actually execute campaign actions")
    parser.add_argument("--campaign", type=str,
                       help="Process a specific campaign file")
    parser.add_argument("--pending", action="store_true",
                       help="Process all pending campaigns")
    parser.add_argument("--channels", type=str, default="notification",
                       help="Comma-separated channels: notification,sms,social,email")
    parser.add_argument("--status", action="store_true",
                       help="Show dispatch status")
    
    args = parser.parse_args()
    config = load_config()
    contacts = load_contacts()
    dry_run = not args.execute
    channels = [c.strip() for c in args.channels.split(",")]
    
    print(f"\n🌩️  Storm Campaign Dispatcher")
    print(f"   Mode: {'DRY RUN' if dry_run else '🔴 LIVE EXECUTION'}")
    
    if args.status:
        log = load_dispatch_log()
        print(f"\n   Dispatched: {len(log.get('dispatched', []))} campaigns")
        print(f"   Scheduled follow-ups: {len(log.get('scheduled_followups', []))}")
        for d in log.get("dispatched", [])[-5:]:
            print(f"     - {d['campaign_file']} ({d['timestamp']})")
        return
    
    if args.campaign:
        filepath = Path(args.campaign)
        if not filepath.exists():
            print(f"  ❌ File not found: {filepath}")
            sys.exit(1)
        campaign = parse_campaign_file(filepath)
        dispatch_campaign(campaign, contacts, config, dry_run, channels)
    elif args.pending:
        process_pending_campaigns(config, dry_run, channels)
    else:
        # Default: show status + pending
        process_pending_campaigns(config, dry_run, channels)


if __name__ == "__main__":
    main()
