# XPERIENCE Lead CRM

Simple lead tracker for XPERIENCE Roofing. SQLite backend + localStorage web UI.

## CLI Usage
```bash
~/clawd/systems/lead-crm/crm.sh help
~/clawd/systems/lead-crm/crm.sh add "John Smith" "8015551234" storm-monitor "" "123 Main St" roof-replacement
~/clawd/systems/lead-crm/crm.sh status          # pipeline overview
~/clawd/systems/lead-crm/crm.sh list             # active leads
~/clawd/systems/lead-crm/crm.sh due              # overdue actions
```

## Web UI
Open `index.html` in a browser. Uses localStorage (no server needed).
Deploy to Vercel for remote access if needed.

## Lead Flow
`new → contacted → scheduled → inspected → quoted → signed → in-progress → completed`

Side statuses: `lost`, `dormant`

## Sources
Designed to receive leads from all XPERIENCE systems:
- `storm-monitor` — weather-triggered campaigns
- `speed-to-lead` — inbound webhook leads
- `review-gen` — post-job follow-ups
- `referral`, `website`, `door-knock`, `mailer`, `manual`

## Files
- `schema.sql` — SQLite schema
- `crm.sh` — CLI interface
- `leads.db` — SQLite database (auto-created)
- `index.html` — Standalone web UI (localStorage)
