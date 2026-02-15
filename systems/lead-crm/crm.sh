#!/bin/bash
# Lead CRM CLI — Simple interface to the SQLite lead tracker
# Usage: crm.sh <command> [args]
set -euo pipefail

DB="${LEAD_CRM_DB:-$HOME/clawd/systems/lead-crm/leads.db}"
SCHEMA_DIR="$(dirname "$0")"

# Initialize DB if needed
init_db() {
    if [ ! -f "$DB" ]; then
        sqlite3 "$DB" < "$SCHEMA_DIR/schema.sql"
        echo "✅ Database initialized at $DB"
    fi
}

cmd_add() {
    # crm.sh add "Name" "phone" "source" [email] [address] [job_type]
    local name="${1:?Name required}"
    local phone="${2:-}"
    local source="${3:-manual}"
    local email="${4:-}"
    local address="${5:-}"
    local job_type="${6:-}"
    
    init_db
    local id
    id=$(sqlite3 "$DB" "INSERT INTO leads (name, phone, source, email, address, job_type) 
        VALUES ('$(echo "$name" | sed "s/'/''/g")', 
                '$(echo "$phone" | sed "s/'/''/g")', 
                '$source', 
                '$(echo "$email" | sed "s/'/''/g")', 
                '$(echo "$address" | sed "s/'/''/g")', 
                $([ -n "$job_type" ] && echo "'$job_type'" || echo "NULL"));
        SELECT last_insert_rowid();")
    echo "✅ Lead #$id added: $name ($source)"
}

cmd_status() {
    # crm.sh status [lead_id] [new_status]
    init_db
    if [ $# -eq 0 ]; then
        # Show pipeline summary
        echo "📊 Lead Pipeline"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━"
        sqlite3 -column "$DB" "
            SELECT status, COUNT(*) as count, 
                   COALESCE(printf('\$%,.0f', SUM(estimated_value)), '-') as est_value
            FROM leads 
            WHERE status NOT IN ('lost', 'dormant', 'completed')
            GROUP BY status 
            ORDER BY CASE status
                WHEN 'new' THEN 1 WHEN 'contacted' THEN 2
                WHEN 'scheduled' THEN 3 WHEN 'inspected' THEN 4
                WHEN 'quoted' THEN 5 WHEN 'signed' THEN 6
                WHEN 'in-progress' THEN 7
            END;"
        echo ""
        echo "📈 Totals"
        sqlite3 -column "$DB" "
            SELECT 
                COUNT(*) as total,
                SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as won,
                SUM(CASE WHEN status = 'lost' THEN 1 ELSE 0 END) as lost,
                COALESCE(printf('\$%,.0f', SUM(CASE WHEN status = 'completed' THEN actual_value ELSE 0 END)), '\$0') as revenue
            FROM leads;"
    elif [ $# -eq 1 ]; then
        # Show lead detail
        sqlite3 -header -column "$DB" "SELECT * FROM leads WHERE id = $1;"
        echo ""
        echo "📝 Activity Log"
        sqlite3 -header -column "$DB" "
            SELECT created_at, type, description 
            FROM lead_activities WHERE lead_id = $1 ORDER BY created_at DESC LIMIT 10;"
    else
        # Update status
        local old_status
        old_status=$(sqlite3 "$DB" "SELECT status FROM leads WHERE id = $1;")
        sqlite3 "$DB" "UPDATE leads SET status = '$2' WHERE id = $1;
            INSERT INTO lead_activities (lead_id, type, description) 
            VALUES ($1, 'status-change', '$old_status → $2');"
        echo "✅ Lead #$1: $old_status → $2"
    fi
}

cmd_list() {
    # crm.sh list [status] [--all]
    init_db
    local where="WHERE status NOT IN ('lost', 'dormant', 'completed')"
    [ "${1:-}" = "--all" ] && where=""
    [ -n "${1:-}" ] && [ "${1:-}" != "--all" ] && where="WHERE status = '$1'"
    
    sqlite3 -header -column "$DB" "
        SELECT id, name, phone, source, status, job_type,
               COALESCE(printf('\$%,.0f', estimated_value), '-') as est_value,
               next_action, next_action_date
        FROM leads $where
        ORDER BY 
            CASE priority WHEN 'urgent' THEN 1 WHEN 'high' THEN 2 WHEN 'normal' THEN 3 ELSE 4 END,
            created_at DESC;"
}

cmd_activity() {
    # crm.sh activity <lead_id> <type> <description>
    local lead_id="${1:?Lead ID required}"
    local type="${2:?Type required (call|sms|email|visit|inspection|quote|follow-up|note)}"
    local desc="${3:?Description required}"
    
    init_db
    sqlite3 "$DB" "INSERT INTO lead_activities (lead_id, type, description) 
        VALUES ($lead_id, '$type', '$(echo "$desc" | sed "s/'/''/g")');"
    echo "✅ Activity logged for lead #$lead_id"
}

cmd_next() {
    # crm.sh next <lead_id> <action> [date]
    local lead_id="${1:?Lead ID required}"
    local action="${2:?Action description required}"
    local date="${3:-}"
    
    init_db
    sqlite3 "$DB" "UPDATE leads SET 
        next_action = '$(echo "$action" | sed "s/'/''/g")',
        next_action_date = $([ -n "$date" ] && echo "'$date'" || echo "NULL")
        WHERE id = $lead_id;"
    echo "✅ Next action set for lead #$lead_id: $action${date:+ (by $date)}"
}

cmd_due() {
    # crm.sh due — show leads with overdue or upcoming actions
    init_db
    echo "⏰ Actions Due"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━"
    sqlite3 -header -column "$DB" "
        SELECT id, name, phone, status, next_action, next_action_date,
            CASE 
                WHEN next_action_date <= date('now') THEN '⚠️ OVERDUE'
                WHEN next_action_date <= date('now', '+1 day') THEN '🔜 TODAY'
                WHEN next_action_date <= date('now', '+3 days') THEN '📅 SOON'
                ELSE '📋'
            END as urgency
        FROM leads 
        WHERE next_action IS NOT NULL 
          AND status NOT IN ('lost', 'dormant', 'completed')
        ORDER BY next_action_date ASC NULLS LAST;"
}

cmd_search() {
    # crm.sh search <query>
    local q="${1:?Search query required}"
    init_db
    sqlite3 -header -column "$DB" "
        SELECT id, name, phone, email, address, source, status
        FROM leads 
        WHERE name LIKE '%$q%' OR phone LIKE '%$q%' 
           OR email LIKE '%$q%' OR address LIKE '%$q%'
           OR notes LIKE '%$q%' OR tags LIKE '%$q%';"
}

cmd_import() {
    # crm.sh import <csv_file>
    # CSV format: name,phone,email,address,source,job_type
    local file="${1:?CSV file required}"
    init_db
    sqlite3 "$DB" ".mode csv" ".import --skip 1 $file leads_import"
    echo "⚠️ CSV import requires manual column mapping. Use 'add' for individual leads."
}

cmd_export() {
    # crm.sh export [filename]
    local file="${1:-leads-export-$(date +%Y%m%d).csv}"
    init_db
    sqlite3 -header -csv "$DB" "SELECT * FROM leads;" > "$file"
    echo "✅ Exported to $file"
}

cmd_stats() {
    init_db
    echo "📊 CRM Statistics"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━"
    sqlite3 -column "$DB" "
        SELECT 'Total Leads' as metric, COUNT(*) as value FROM leads
        UNION ALL
        SELECT 'Active', COUNT(*) FROM leads WHERE status NOT IN ('lost','dormant','completed')
        UNION ALL
        SELECT 'Won', COUNT(*) FROM leads WHERE status = 'completed'
        UNION ALL
        SELECT 'Lost', COUNT(*) FROM leads WHERE status = 'lost'
        UNION ALL
        SELECT 'Win Rate', 
            CASE WHEN COUNT(CASE WHEN status IN ('completed','lost') THEN 1 END) > 0
            THEN printf('%.0f%%', 100.0 * COUNT(CASE WHEN status='completed' THEN 1 END) / 
                 COUNT(CASE WHEN status IN ('completed','lost') THEN 1 END))
            ELSE 'N/A' END
        FROM leads
        UNION ALL
        SELECT 'Pipeline Value', COALESCE(printf('\$%,.0f', SUM(estimated_value)), '\$0')
        FROM leads WHERE status NOT IN ('lost','dormant','completed')
        UNION ALL
        SELECT 'Revenue', COALESCE(printf('\$%,.0f', SUM(actual_value)), '\$0')
        FROM leads WHERE status = 'completed';"
    echo ""
    echo "📈 By Source"
    sqlite3 -header -column "$DB" "
        SELECT source, COUNT(*) as leads,
            SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as won,
            COALESCE(printf('\$%,.0f', AVG(estimated_value)), '-') as avg_value
        FROM leads GROUP BY source ORDER BY leads DESC;"
}

cmd_help() {
    cat <<EOF
🐾 XPERIENCE Lead CRM

Usage: crm.sh <command> [args]

Commands:
  add <name> [phone] [source] [email] [address] [job_type]  — Add a lead
  list [status|--all]                                        — List leads
  status                                                     — Pipeline overview
  status <id>                                                — Lead detail
  status <id> <new_status>                                   — Update status
  activity <id> <type> <description>                         — Log activity
  next <id> <action> [date]                                  — Set next action
  due                                                        — Show due actions
  search <query>                                             — Search leads
  stats                                                      — CRM statistics
  export [filename]                                          — Export CSV
  help                                                       — This help

Sources: storm-monitor, speed-to-lead, review-gen, manual, referral, website, door-knock, mailer, other
Statuses: new → contacted → scheduled → inspected → quoted → signed → in-progress → completed | lost | dormant
Activity types: call, sms, email, visit, inspection, quote, follow-up, note

Examples:
  crm.sh add "John Smith" "8015551234" storm-monitor "" "123 Main St" roof-replacement
  crm.sh status 1 contacted
  crm.sh activity 1 call "Left voicemail, will try again tomorrow"
  crm.sh next 1 "Follow-up call" 2026-02-16
  crm.sh due
EOF
}

# Main dispatch
init_db
case "${1:-help}" in
    add)      shift; cmd_add "$@" ;;
    list)     shift; cmd_list "$@" ;;
    status)   shift; cmd_status "$@" ;;
    activity) shift; cmd_activity "$@" ;;
    next)     shift; cmd_next "$@" ;;
    due)      shift; cmd_due "$@" ;;
    search)   shift; cmd_search "$@" ;;
    stats)    shift; cmd_stats "$@" ;;
    export)   shift; cmd_export "$@" ;;
    help|*)   cmd_help ;;
esac
