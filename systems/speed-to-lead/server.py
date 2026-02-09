#!/usr/bin/env python3
"""
Speed-to-Lead SMS Auto-Responder
==================================
HTTP webhook server that instantly texts new leads.

How it works:
1. Web form (roof estimator, landing page, etc.) POSTs lead data here
2. Server validates and immediately sends personalized SMS via Twilio
3. Schedules follow-up sequence (day 1, day 3, day 7)
4. Logs everything for tracking

Endpoints:
  POST /lead          — Receive new lead (JSON body)
  POST /twilio/status — Twilio delivery status callback
  GET  /health        — Health check
  GET  /leads         — View recent leads (basic dashboard)

Lead JSON format:
  {
    "name": "John Smith",
    "phone": "+18015551234",
    "email": "john@example.com",        # optional
    "source": "roof-estimator",          # where lead came from
    "address": "123 Main St, SLC, UT",   # optional
    "interest": "roof replacement",      # optional
    "company": "XPERIENCE Roofing"       # which client this is for
  }

Usage:
  python server.py [--port 8765] [--dry-run]

Environment:
  TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER
  Or reads from ~/clawd/projects/slc-lead-gen/config/.twilio-credentials
"""

import argparse
import json
import os
import sys
import hashlib
import hmac
from datetime import datetime, timedelta
from http.server import HTTPServer, BaseHTTPRequestHandler
from pathlib import Path
from urllib.parse import parse_qs
import threading
import time

# ── Config ──────────────────────────────────────────────────────────────

SYSTEM_DIR = Path(__file__).parent
LEADS_DB = SYSTEM_DIR / "leads.json"
FOLLOWUPS_DB = SYSTEM_DIR / "followups.json"
LOG_FILE = SYSTEM_DIR / "speed-to-lead.log"
TEMPLATES_DIR = SYSTEM_DIR / "templates"

# Twilio credentials
def load_twilio_creds():
    """Load Twilio credentials from env or file."""
    sid = os.environ.get("TWILIO_ACCOUNT_SID")
    token = os.environ.get("TWILIO_AUTH_TOKEN")
    from_number = os.environ.get("TWILIO_FROM_NUMBER")

    if sid and token and from_number:
        return sid, token, from_number

    creds_file = Path("~/clawd/projects/slc-lead-gen/config/.twilio-credentials").expanduser()
    if creds_file.exists():
        creds = {}
        for line in creds_file.read_text().splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, val = line.split("=", 1)
                creds[key.strip()] = val.strip()
        return (
            creds.get("ACCOUNT_SID", ""),
            creds.get("AUTH_TOKEN", ""),
            creds.get("PHONE_NUMBER", "+18554718307"),
        )

    return None, None, None


# ── SMS Templates ───────────────────────────────────────────────────────

TEMPLATES = {
    "immediate": {
        "default": (
            "Hi {first_name}! Thanks for your interest in {interest}. "
            "This is {company} — we'd love to help. "
            "Can we schedule a free estimate at a time that works for you? "
            "Reply YES or call us anytime!"
        ),
        "roof-estimator": (
            "Hi {first_name}! Thanks for using our roof estimator. "
            "Based on your property, we'd love to give you a detailed in-person quote — "
            "often we can save you even more. "
            "Can we schedule a free inspection? Reply YES or call anytime!"
        ),
        "storm": (
            "Hi {first_name}, this is {company}. We noticed recent storm activity "
            "near {address}. Hail and wind can cause hidden damage — "
            "we offer FREE roof inspections. Want us to come take a look? "
            "Reply YES to schedule!"
        ),
    },
    "day_1": (
        "Hi {first_name}, just following up from {company}. "
        "We're still happy to provide a free estimate for your {interest}. "
        "Most homeowners are surprised how affordable it can be. "
        "Any questions? Just reply here!"
    ),
    "day_3": (
        "Hey {first_name}! Quick reminder — {company} has availability "
        "this week for free roof inspections. No obligation, just peace of mind. "
        "Want us to stop by? 🏠"
    ),
    "day_7": (
        "Hi {first_name}, last check-in from {company}. "
        "If you're still considering {interest}, we're here to help. "
        "Our free estimates take about 30 minutes. Just say when! "
        "— The {company} Team"
    ),
}


# ── Twilio SMS Sender ──────────────────────────────────────────────────

def send_sms(to_number, message, sid, token, from_number, dry_run=False):
    """Send SMS via Twilio REST API (no SDK needed)."""
    if dry_run:
        log(f"[DRY RUN] SMS to {to_number}: {message[:80]}...")
        return {"status": "dry_run", "to": to_number}

    import urllib.request
    import base64

    url = f"https://api.twilio.com/2010-04-01/Accounts/{sid}/Messages.json"
    data = f"To={to_number}&From={from_number}&Body={message}".encode()

    auth = base64.b64encode(f"{sid}:{token}".encode()).decode()
    req = urllib.request.Request(url, data=data, method="POST")
    req.add_header("Authorization", f"Basic {auth}")
    req.add_header("Content-Type", "application/x-www-form-urlencoded")

    try:
        with urllib.request.urlopen(req) as resp:
            result = json.loads(resp.read())
            log(f"SMS sent to {to_number}: SID={result.get('sid', 'unknown')}")
            return {"status": "sent", "sid": result.get("sid"), "to": to_number}
    except Exception as e:
        log(f"SMS FAILED to {to_number}: {e}")
        return {"status": "error", "error": str(e), "to": to_number}


# ── Lead Processing ────────────────────────────────────────────────────

def process_lead(lead, sid, token, from_number, dry_run=False):
    """Process a new lead: validate, send immediate SMS, schedule follow-ups."""
    # Validate required fields
    if not lead.get("phone"):
        return {"error": "phone is required"}
    if not lead.get("name"):
        return {"error": "name is required"}

    # Normalize
    phone = normalize_phone(lead["phone"])
    if not phone:
        return {"error": f"invalid phone number: {lead['phone']}"}

    first_name = lead["name"].split()[0]
    company = lead.get("company", "our team")
    source = lead.get("source", "default")
    interest = lead.get("interest", "your roofing needs")
    address = lead.get("address", "your area")

    # Check for duplicate (same phone in last 24h)
    if is_duplicate(phone):
        log(f"Duplicate lead blocked: {phone}")
        return {"status": "duplicate", "phone": phone}

    # Format template
    template_key = source if source in TEMPLATES["immediate"] else "default"
    message = TEMPLATES["immediate"][template_key].format(
        first_name=first_name,
        company=company,
        interest=interest,
        address=address,
    )

    # Send immediate SMS
    result = send_sms(phone, message, sid, token, from_number, dry_run)

    # Save lead
    lead_record = {
        "id": hashlib.md5(f"{phone}{datetime.now().isoformat()}".encode()).hexdigest()[:12],
        "name": lead["name"],
        "phone": phone,
        "email": lead.get("email", ""),
        "source": source,
        "address": address,
        "interest": interest,
        "company": company,
        "received_at": datetime.now().isoformat(),
        "sms_result": result,
    }
    save_lead(lead_record)

    # Schedule follow-ups
    schedule_followups(lead_record, dry_run)

    log(f"New lead processed: {lead['name']} ({phone}) from {source}")
    return {"status": "ok", "lead_id": lead_record["id"], "sms": result}


def normalize_phone(phone):
    """Normalize phone to E.164 format."""
    digits = "".join(c for c in phone if c.isdigit())
    if len(digits) == 10:
        return f"+1{digits}"
    elif len(digits) == 11 and digits[0] == "1":
        return f"+{digits}"
    elif len(digits) > 11:
        return f"+{digits}"
    return None


def is_duplicate(phone, window_hours=24):
    """Check if this phone submitted a lead recently."""
    leads = load_leads()
    cutoff = datetime.now() - timedelta(hours=window_hours)
    for lead in leads:
        if lead.get("phone") == phone:
            try:
                received = datetime.fromisoformat(lead["received_at"])
                if received > cutoff:
                    return True
            except (ValueError, KeyError):
                pass
    return False


def schedule_followups(lead, dry_run=False):
    """Schedule follow-up SMS sequence."""
    followups = load_followups()
    now = datetime.now()

    for delay_name, delay_seconds in [("day_1", 86400), ("day_3", 259200), ("day_7", 604800)]:
        send_at = now + timedelta(seconds=delay_seconds)
        followups.append({
            "lead_id": lead["id"],
            "phone": lead["phone"],
            "name": lead["name"],
            "company": lead.get("company", "our team"),
            "interest": lead.get("interest", "your roofing needs"),
            "template": delay_name,
            "send_at": send_at.isoformat(),
            "sent": False,
            "dry_run": dry_run,
        })

    save_followups(followups)
    log(f"Scheduled 3 follow-ups for {lead['phone']}")


def process_followups(sid, token, from_number, dry_run=False):
    """Check and send any due follow-ups."""
    followups = load_followups()
    now = datetime.now()
    sent_count = 0

    for fu in followups:
        if fu["sent"]:
            continue
        send_at = datetime.fromisoformat(fu["send_at"])
        if send_at <= now:
            first_name = fu["name"].split()[0]
            template = TEMPLATES.get(fu["template"], "")
            if not template:
                continue
            message = template.format(
                first_name=first_name,
                company=fu.get("company", "our team"),
                interest=fu.get("interest", "your roofing needs"),
            )
            send_sms(fu["phone"], message, sid, token, from_number, dry_run)
            fu["sent"] = True
            fu["sent_at"] = now.isoformat()
            sent_count += 1

    save_followups(followups)
    if sent_count:
        log(f"Processed {sent_count} follow-up(s)")
    return sent_count


# ── Persistence ─────────────────────────────────────────────────────────

def load_leads():
    if LEADS_DB.exists():
        return json.loads(LEADS_DB.read_text())
    return []

def save_lead(lead):
    leads = load_leads()
    leads.append(lead)
    LEADS_DB.write_text(json.dumps(leads, indent=2))

def load_followups():
    if FOLLOWUPS_DB.exists():
        return json.loads(FOLLOWUPS_DB.read_text())
    return []

def save_followups(followups):
    FOLLOWUPS_DB.write_text(json.dumps(followups, indent=2))

def log(msg):
    ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    line = f"[{ts}] {msg}"
    print(line)
    with open(LOG_FILE, "a") as f:
        f.write(line + "\n")


# ── HTTP Server ─────────────────────────────────────────────────────────

class LeadHandler(BaseHTTPRequestHandler):
    dry_run = False
    twilio_creds = (None, None, None)

    def do_GET(self):
        if self.path == "/health":
            self.json_response({"status": "ok", "leads": len(load_leads())})
        elif self.path == "/leads":
            leads = load_leads()
            self.json_response({"count": len(leads), "recent": leads[-20:]})
        else:
            self.send_error(404)

    def do_POST(self):
        if self.path == "/lead":
            body = self.read_body()
            if not body:
                self.json_response({"error": "empty body"}, 400)
                return
            try:
                lead = json.loads(body)
            except json.JSONDecodeError:
                # Try form-encoded
                lead = {k: v[0] for k, v in parse_qs(body.decode()).items()}

            sid, token, from_num = self.twilio_creds
            result = process_lead(lead, sid, token, from_num, self.dry_run)
            status = 200 if result.get("status") in ("ok", "duplicate", "dry_run") else 400
            self.json_response(result, status)

        elif self.path == "/twilio/status":
            # Twilio status callback — just log it
            body = self.read_body()
            log(f"Twilio status callback: {body[:200]}")
            self.json_response({"status": "ok"})
        else:
            self.send_error(404)

    def read_body(self):
        length = int(self.headers.get("Content-Length", 0))
        if length == 0:
            return None
        return self.rfile.read(length)

    def json_response(self, data, code=200):
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())

    def log_message(self, fmt, *args):
        # Suppress default logging
        pass


# ── Follow-up Worker ────────────────────────────────────────────────────

def followup_worker(sid, token, from_number, dry_run=False):
    """Background thread that checks for due follow-ups every 5 minutes."""
    while True:
        try:
            process_followups(sid, token, from_number, dry_run)
        except Exception as e:
            log(f"Follow-up worker error: {e}")
        time.sleep(300)  # Check every 5 minutes


# ── Main ────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Speed-to-Lead SMS Auto-Responder")
    parser.add_argument("--port", type=int, default=8765, help="HTTP port (default: 8765)")
    parser.add_argument("--dry-run", action="store_true", help="Don't actually send SMS")
    parser.add_argument("--process-followups", action="store_true", help="Process pending follow-ups and exit")
    args = parser.parse_args()

    sid, token, from_number = load_twilio_creds()
    if not sid:
        print("ERROR: No Twilio credentials found. Set env vars or check credentials file.")
        sys.exit(1)

    if args.process_followups:
        count = process_followups(sid, token, from_number, args.dry_run)
        print(f"Processed {count} follow-up(s)")
        return

    # Start follow-up worker thread
    worker = threading.Thread(
        target=followup_worker,
        args=(sid, token, from_number, args.dry_run),
        daemon=True,
    )
    worker.start()

    # Start HTTP server
    LeadHandler.dry_run = args.dry_run
    LeadHandler.twilio_creds = (sid, token, from_number)

    server = HTTPServer(("0.0.0.0", args.port), LeadHandler)
    mode = "DRY RUN" if args.dry_run else "LIVE"
    log(f"Speed-to-Lead server started on port {args.port} [{mode}]")
    log(f"Twilio from: {from_number}")

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        log("Server stopped")
        server.server_close()


if __name__ == "__main__":
    main()
