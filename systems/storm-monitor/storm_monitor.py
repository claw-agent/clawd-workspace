#!/usr/bin/env python3
"""
Storm Monitor for Roofing Lead Generation
==========================================
Monitors NWS alerts for hail, wind, and severe storms in target service areas.
When significant events detected, generates ready-to-use campaign content.

Usage:
    python storm_monitor.py --check          # One-time check
    python storm_monitor.py --watch          # Continuous monitoring
    python storm_monitor.py --areas UT,CO    # Specific states
    
Environment:
    STORM_MONITOR_WEBHOOK - Optional webhook URL for alerts
"""

import argparse
import json
import os
import sys
from datetime import datetime, timedelta
from pathlib import Path
import time
import hashlib

try:
    import requests
except ImportError:
    print("Installing requests...")
    os.system(f"{sys.executable} -m pip install requests -q")
    import requests

# Configuration
CONFIG = {
    "api_base": "https://api.weather.gov",
    "user_agent": "(storm-monitor/1.0, claw-agent@proton.me)",
    "default_areas": ["UT"],  # Utah by default for XPERIENCE
    "check_interval_seconds": 300,  # 5 minutes
    "state_file": Path(__file__).parent / "state.json",
    "campaigns_dir": Path(__file__).parent / "campaigns",
    
    # Alert types that matter for roofing
    "relevant_events": [
        "Severe Thunderstorm Warning",
        "Severe Thunderstorm Watch",
        "Tornado Warning",
        "Tornado Watch",
        "Hail",
        "High Wind Warning",
        "High Wind Watch",
        "Wind Advisory",
        "Flash Flood Warning",  # Can cause roof damage too
    ],
    
    # Keywords that indicate hail (even in other alert types)
    "hail_keywords": [
        "hail", "golf ball", "quarter size", "nickel size", "dime size",
        "marble size", "ping pong", "baseball", "softball"
    ],
    
    # Severity levels (higher = more urgent)
    "severity_map": {
        "Extreme": 4,
        "Severe": 3,
        "Moderate": 2,
        "Minor": 1,
        "Unknown": 0
    }
}


def load_state():
    """Load previously seen alerts to avoid duplicates."""
    if CONFIG["state_file"].exists():
        try:
            return json.loads(CONFIG["state_file"].read_text())
        except:
            pass
    return {"seen_alerts": [], "last_check": None, "campaigns_generated": []}


def save_state(state):
    """Persist state between runs."""
    state["last_check"] = datetime.now().isoformat()
    CONFIG["state_file"].write_text(json.dumps(state, indent=2))


def get_active_alerts(areas: list[str]) -> list[dict]:
    """Fetch active weather alerts for specified areas."""
    all_alerts = []
    headers = {"User-Agent": CONFIG["user_agent"]}
    
    for area in areas:
        url = f"{CONFIG['api_base']}/alerts/active?area={area}"
        try:
            response = requests.get(url, headers=headers, timeout=30)
            response.raise_for_status()
            data = response.json()
            
            features = data.get("features", [])
            for feature in features:
                props = feature.get("properties", {})
                props["_area"] = area
                props["_geometry"] = feature.get("geometry")
                all_alerts.append(props)
                
        except Exception as e:
            print(f"Error fetching alerts for {area}: {e}")
    
    return all_alerts


def is_roofing_relevant(alert: dict) -> tuple[bool, str]:
    """
    Check if alert is relevant for roofing business.
    Returns (is_relevant, reason)
    """
    event = alert.get("event", "")
    headline = alert.get("headline", "").lower()
    description = alert.get("description", "").lower()
    full_text = f"{headline} {description}"
    
    # Check for hail keywords in any alert
    for keyword in CONFIG["hail_keywords"]:
        if keyword in full_text:
            return True, f"Hail detected: '{keyword}'"
    
    # Check for relevant event types
    for relevant_event in CONFIG["relevant_events"]:
        if relevant_event.lower() in event.lower():
            return True, f"Event type: {event}"
    
    return False, ""


def extract_hail_size(text: str) -> str | None:
    """Extract hail size from alert text."""
    text = text.lower()
    
    size_patterns = [
        ("softball", "4.5 inch"),
        ("baseball", "2.75 inch"),
        ("golf ball", "1.75 inch"),
        ("ping pong", "1.5 inch"),
        ("quarter", "1 inch"),
        ("nickel", "0.88 inch"),
        ("dime", "0.75 inch"),
        ("marble", "0.5 inch"),
        ("pea", "0.25 inch"),
    ]
    
    for pattern, size in size_patterns:
        if pattern in text:
            return f"{pattern} ({size})"
    
    # Look for explicit inch measurements
    import re
    inch_match = re.search(r'(\d+\.?\d*)\s*inch(?:es)?\s*(?:in\s*diameter)?', text)
    if inch_match:
        return f"{inch_match.group(1)} inch"
    
    return None


def extract_affected_areas(alert: dict) -> list[str]:
    """Extract specific affected areas from alert."""
    areas = []
    
    # From areaDesc
    area_desc = alert.get("areaDesc", "")
    if area_desc:
        # Split on semicolons and clean up
        parts = [p.strip() for p in area_desc.split(";")]
        areas.extend(parts)
    
    # From affected zones
    affected_zones = alert.get("affectedZones", [])
    for zone_url in affected_zones[:5]:  # Limit to avoid too many
        # Zone URLs look like: https://api.weather.gov/zones/county/UTC001
        zone_id = zone_url.split("/")[-1] if "/" in zone_url else zone_url
        if zone_id not in str(areas):
            areas.append(zone_id)
    
    return areas[:10]  # Limit to 10 areas


def calculate_severity_score(alert: dict) -> int:
    """Calculate severity score for prioritization."""
    score = 0
    
    # Base severity
    severity = alert.get("severity", "Unknown")
    score += CONFIG["severity_map"].get(severity, 0) * 10
    
    # Urgency bonus
    urgency = alert.get("urgency", "")
    if urgency == "Immediate":
        score += 20
    elif urgency == "Expected":
        score += 10
    
    # Hail size bonus
    description = alert.get("description", "")
    hail_size = extract_hail_size(description)
    if hail_size:
        if "baseball" in hail_size or "softball" in hail_size:
            score += 30
        elif "golf" in hail_size or "ping" in hail_size:
            score += 20
        elif "quarter" in hail_size or "nickel" in hail_size:
            score += 10
    
    # Warning vs Watch
    event = alert.get("event", "")
    if "Warning" in event:
        score += 15
    elif "Watch" in event:
        score += 5
    
    return score


def generate_campaign_content(alert: dict, reason: str) -> dict:
    """Generate marketing campaign content for a storm event."""
    event = alert.get("event", "Severe Weather")
    headline = alert.get("headline", "")
    description = alert.get("description", "")
    areas = extract_affected_areas(alert)
    hail_size = extract_hail_size(f"{headline} {description}")
    severity_score = calculate_severity_score(alert)
    
    # Format areas nicely
    area_text = ", ".join(areas[:5])
    if len(areas) > 5:
        area_text += f" and {len(areas) - 5} more areas"
    
    # Determine campaign urgency level
    if severity_score >= 50:
        urgency = "CRITICAL"
        color = "red"
    elif severity_score >= 30:
        urgency = "HIGH"
        color = "orange"
    else:
        urgency = "MODERATE"
        color = "yellow"
    
    # Generate content variations
    campaign = {
        "id": hashlib.md5(alert.get("id", str(datetime.now())).encode()).hexdigest()[:8],
        "generated_at": datetime.now().isoformat(),
        "alert_id": alert.get("id"),
        "event_type": event,
        "urgency_level": urgency,
        "severity_score": severity_score,
        "hail_size": hail_size,
        "affected_areas": areas,
        "reason": reason,
        
        # Ready-to-use content
        "content": {
            "sms": {
                "immediate": f"⚠️ {event} in your area! Free roof inspection available. Call now: [PHONE]",
                "followup_24h": f"Storm damage? We're inspecting roofs in {areas[0] if areas else 'your area'} today. Free estimates: [PHONE]",
                "followup_48h": f"Don't wait! Storm damage worsens over time. Free inspection + insurance claim help: [PHONE]"
            },
            
            "email": {
                "subject": f"⚠️ {event} - Free Roof Inspection Available",
                "preview": f"Storm just hit {areas[0] if areas else 'your area'}. Check for damage before it's too late.",
                "body": f"""Did the recent storm affect your roof?

A {event} just impacted {area_text}. {'Hail up to ' + hail_size + ' was reported. ' if hail_size else ''}Even minor damage can lead to costly repairs if left unchecked.

**Free Storm Damage Inspection**
✓ Same-day availability
✓ Insurance claim assistance
✓ Licensed & insured
✓ No obligation

Don't wait until a small problem becomes a big one.

Call now: [PHONE]
Or reply to schedule your free inspection.

[COMPANY NAME]
Your Local Roofing Experts"""
            },
            
            "social_post": {
                "facebook": f"""🌪️ STORM ALERT: {event}

{areas[0] if areas else 'Local'} residents - if you experienced {'hail (' + hail_size + ')' if hail_size else 'severe weather'} today, your roof may have damage you can't see from the ground.

✅ FREE Inspections Available Now
✅ Insurance Claim Experts
✅ Same-Day Response

Don't wait for a leak! Comment "INSPECT" or call [PHONE] to schedule.

#StormDamage #RoofRepair #{''.join(a.replace(' ', '') for a in areas[:2])}""",

                "google_post": f"""Storm just hit? Free roof inspections available!

Recent {event} may have caused hidden roof damage. We're offering FREE inspections for homeowners in {area_text}.

Call [PHONE] or visit [WEBSITE] to schedule today.

✓ Insurance assistance
✓ Same-day service
✓ Local experts"""
            },
            
            "ad_copy": {
                "google_headline_1": f"Storm Hit? Free Roof Inspection",
                "google_headline_2": f"{event.split()[0]} Damage Experts",
                "google_headline_3": "Same-Day Inspections Available",
                "google_description": f"{'Hail damage from ' + hail_size + '? ' if hail_size else 'Storm damage? '}Free inspection + insurance help. Local experts, trusted service.",
                "display_headline": f"🌧️ Storm Damage? We Can Help",
                "display_cta": "Get Free Inspection"
            },
            
            "door_hanger": {
                "headline": "WE NOTICED STORM DAMAGE IN YOUR NEIGHBORHOOD",
                "body": f"""A {event} recently impacted this area{' with hail up to ' + hail_size if hail_size else ''}.

Your neighbors are getting FREE roof inspections.

DON'T MISS OUT:
✓ Free professional inspection
✓ Insurance claim assistance
✓ No obligation

Scan the QR code or call [PHONE] to schedule your free inspection today!""",
                "cta": "CLAIM YOUR FREE INSPECTION"
            }
        },
        
        # Campaign timing recommendations
        "timing": {
            "immediate": "Send SMS/push within 2 hours of storm",
            "day_1": "Email campaign, social posts, begin canvassing",
            "day_2_3": "Follow-up SMS, door hangers in affected areas",
            "week_1": "Retargeting ads, second email wave",
            "note": "Insurance claims typically filed within 30 days - act fast!"
        },
        
        # Targeting suggestions
        "targeting": {
            "geographic": areas,
            "radius_miles": 15 if severity_score >= 30 else 10,
            "priority_zip_codes": [],  # To be filled with actual data
            "homeowner_focus": True,
            "property_age_preference": "15+ years (more vulnerable roofs)"
        }
    }
    
    return campaign


def save_campaign(campaign: dict):
    """Save campaign to file for later use."""
    campaigns_dir = CONFIG["campaigns_dir"]
    campaigns_dir.mkdir(exist_ok=True)
    
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"campaign_{timestamp}_{campaign['id']}.json"
    filepath = campaigns_dir / filename
    
    filepath.write_text(json.dumps(campaign, indent=2))
    print(f"  💾 Campaign saved: {filepath}")
    
    # Also generate a markdown summary
    md_filename = f"campaign_{timestamp}_{campaign['id']}.md"
    md_content = generate_campaign_markdown(campaign)
    (campaigns_dir / md_filename).write_text(md_content)
    
    return filepath


def generate_campaign_markdown(campaign: dict) -> str:
    """Generate a human-readable markdown summary of the campaign."""
    c = campaign
    content = c["content"]
    
    return f"""# Storm Campaign: {c['event_type']}

**Generated:** {c['generated_at']}  
**Urgency Level:** {c['urgency_level']} (Score: {c['severity_score']})  
**Hail Size:** {c['hail_size'] or 'Not specified'}  
**Affected Areas:** {', '.join(c['affected_areas'][:5])}

---

## 📱 SMS Messages

### Immediate (within 2 hours)
{content['sms']['immediate']}

### Follow-up (24 hours)
{content['sms']['followup_24h']}

### Follow-up (48 hours)
{content['sms']['followup_48h']}

---

## 📧 Email Campaign

**Subject:** {content['email']['subject']}  
**Preview:** {content['email']['preview']}

{content['email']['body']}

---

## 📱 Social Media

### Facebook Post
{content['social_post']['facebook']}

### Google Business Post
{content['social_post']['google_post']}

---

## 🎯 Ad Copy

| Element | Copy |
|---------|------|
| Headline 1 | {content['ad_copy']['google_headline_1']} |
| Headline 2 | {content['ad_copy']['google_headline_2']} |
| Headline 3 | {content['ad_copy']['google_headline_3']} |
| Description | {content['ad_copy']['google_description']} |
| Display Headline | {content['ad_copy']['display_headline']} |
| Display CTA | {content['ad_copy']['display_cta']} |

---

## 🚪 Door Hanger

**Headline:** {content['door_hanger']['headline']}

{content['door_hanger']['body']}

**CTA:** {content['door_hanger']['cta']}

---

## ⏱️ Campaign Timing

| When | Action |
|------|--------|
| Immediate | {c['timing']['immediate']} |
| Day 1 | {c['timing']['day_1']} |
| Day 2-3 | {c['timing']['day_2_3']} |
| Week 1 | {c['timing']['week_1']} |

**Note:** {c['timing']['note']}

---

## 🎯 Targeting

- **Geographic:** {', '.join(c['targeting']['geographic'][:5])}
- **Radius:** {c['targeting']['radius_miles']} miles
- **Focus:** Homeowners
- **Property Preference:** {c['targeting']['property_age_preference']}
"""


def check_for_storms(areas: list[str], verbose: bool = True) -> list[dict]:
    """Main function to check for storm alerts and generate campaigns."""
    state = load_state()
    seen_ids = set(state.get("seen_alerts", []))
    
    if verbose:
        print(f"\n🌩️  Storm Monitor Check - {datetime.now().strftime('%Y-%m-%d %H:%M')}")
        print(f"   Checking areas: {', '.join(areas)}")
    
    # Fetch alerts
    alerts = get_active_alerts(areas)
    if verbose:
        print(f"   Found {len(alerts)} active alerts")
    
    # Filter and process relevant alerts
    new_campaigns = []
    
    for alert in alerts:
        alert_id = alert.get("id", "")
        
        # Skip if already seen
        if alert_id in seen_ids:
            continue
        
        # Check if relevant
        is_relevant, reason = is_roofing_relevant(alert)
        if not is_relevant:
            continue
        
        if verbose:
            event = alert.get("event", "Unknown")
            print(f"\n   🚨 NEW RELEVANT ALERT: {event}")
            print(f"      Reason: {reason}")
        
        # Generate campaign
        campaign = generate_campaign_content(alert, reason)
        
        if verbose:
            print(f"      Severity Score: {campaign['severity_score']}")
            print(f"      Urgency Level: {campaign['urgency_level']}")
            if campaign['hail_size']:
                print(f"      Hail Size: {campaign['hail_size']}")
        
        # Save campaign
        save_campaign(campaign)
        new_campaigns.append(campaign)
        
        # Mark as seen
        seen_ids.add(alert_id)
    
    # Update state
    state["seen_alerts"] = list(seen_ids)[-500:]  # Keep last 500
    save_state(state)
    
    if verbose:
        if new_campaigns:
            print(f"\n   ✅ Generated {len(new_campaigns)} new campaign(s)")
        else:
            print(f"\n   ✓ No new relevant alerts")
    
    return new_campaigns


def watch_mode(areas: list[str], interval: int):
    """Continuous monitoring mode."""
    print(f"\n🔄 Starting continuous storm monitoring...")
    print(f"   Areas: {', '.join(areas)}")
    print(f"   Check interval: {interval} seconds")
    print(f"   Press Ctrl+C to stop\n")
    
    while True:
        try:
            campaigns = check_for_storms(areas, verbose=True)
            
            if campaigns:
                # Could add webhook/notification here
                pass
            
            print(f"\n   Next check in {interval} seconds...")
            time.sleep(interval)
            
        except KeyboardInterrupt:
            print("\n\n👋 Storm monitor stopped.")
            break
        except Exception as e:
            print(f"\n   ⚠️ Error: {e}")
            print(f"   Retrying in {interval} seconds...")
            time.sleep(interval)


def main():
    parser = argparse.ArgumentParser(description="Storm Monitor for Roofing Lead Generation")
    parser.add_argument("--check", action="store_true", help="One-time check for alerts")
    parser.add_argument("--watch", action="store_true", help="Continuous monitoring mode")
    parser.add_argument("--areas", type=str, default="UT", help="Comma-separated state codes (default: UT)")
    parser.add_argument("--interval", type=int, default=300, help="Check interval in seconds (default: 300)")
    parser.add_argument("--quiet", action="store_true", help="Suppress output")
    
    args = parser.parse_args()
    areas = [a.strip().upper() for a in args.areas.split(",")]
    
    if args.watch:
        watch_mode(areas, args.interval)
    else:
        # Default to one-time check
        campaigns = check_for_storms(areas, verbose=not args.quiet)
        
        if campaigns and not args.quiet:
            print("\n📋 Campaign Summary:")
            for c in campaigns:
                print(f"   - {c['event_type']} ({c['urgency_level']}) - ID: {c['id']}")


if __name__ == "__main__":
    main()
