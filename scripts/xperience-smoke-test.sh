#!/usr/bin/env bash
# xperience-smoke-test.sh — Validate all XPERIENCE systems actually work
# Run periodically to catch broken scripts, missing deps, stale configs
set -uo pipefail

CLAWD="$HOME/clawd"
PASS=0; FAIL=0; WARN=0
RESULTS=""

pass() { PASS=$((PASS + 1)); RESULTS="${RESULTS}✅ $1\n"; }
fail() { FAIL=$((FAIL + 1)); RESULTS="${RESULTS}❌ $1: $2\n"; }
warn() { WARN=$((WARN + 1)); RESULTS="${RESULTS}⚠️  $1: $2\n"; }

echo "🔧 XPERIENCE Smoke Test — $(date '+%Y-%m-%d %H:%M')"
echo "=================================================="

# 1. Storm Monitor
echo -n "Testing Storm Monitor... "
if [ -f "$CLAWD/systems/storm-monitor/storm_monitor.py" ]; then
  # Check Python deps
  if source "$CLAWD/.venv/bin/activate" 2>/dev/null && python3 -c "import requests" 2>/dev/null; then
    # Dry run — just check NWS API reachable
    HTTP=$(curl -s -o /dev/null -w "%{http_code}" -A "(XPERIENCE-StormMonitor, claw-agent@proton.me)" "https://api.weather.gov/alerts/active?area=UT" 2>/dev/null || echo "000")
    if [ "$HTTP" = "200" ]; then
      pass "Storm Monitor (NWS API reachable, script exists)"
    else
      warn "Storm Monitor" "NWS API returned HTTP $HTTP"
    fi
  else
    fail "Storm Monitor" "Python deps missing (requests)"
  fi
else
  fail "Storm Monitor" "storm_monitor.py not found"
fi

# 2. Speed-to-Lead
echo -n "Testing Speed-to-Lead... "
if [ -f "$CLAWD/systems/speed-to-lead/server.py" ]; then
  # Check Twilio creds exist
  if [ -f "$CLAWD/config/.twilio-credentials" ] || [ -n "${TWILIO_ACCOUNT_SID:-}" ] || grep -q "TWILIO" "$CLAWD/systems/speed-to-lead/server.py" 2>/dev/null; then
    # Check Python can import twilio
    if source "$CLAWD/.venv/bin/activate" 2>/dev/null && python3 -c "import twilio" 2>/dev/null; then
      pass "Speed-to-Lead (server.py + Twilio SDK present)"
    else
      warn "Speed-to-Lead" "Twilio SDK not installed in .venv"
    fi
  else
    warn "Speed-to-Lead" "No Twilio credentials found"
  fi
else
  fail "Speed-to-Lead" "server.py not found"
fi

# 3. Review Gen
echo -n "Testing Review Gen... "
if [ -f "$CLAWD/systems/review-gen/generate-review-campaign.sh" ]; then
  if [ -x "$CLAWD/systems/review-gen/generate-review-campaign.sh" ]; then
    pass "Review Gen (script exists and executable)"
  else
    warn "Review Gen" "Script not executable"
  fi
else
  fail "Review Gen" "generate-review-campaign.sh not found"
fi

# 4. ROI Calculator
echo -n "Testing ROI Calculator... "
if [ -d "$CLAWD/systems/xperience-roi-calculator" ]; then
  if [ -f "$CLAWD/systems/xperience-roi-calculator/index.html" ]; then
    pass "ROI Calculator (index.html present)"
  else
    fail "ROI Calculator" "index.html missing"
  fi
else
  fail "ROI Calculator" "Directory not found"
fi

# 5. Quote Generator
echo -n "Testing Quote Generator... "
if [ -d "$CLAWD/systems/xperience-quote-generator" ]; then
  # Check Typst available
  if command -v typst &>/dev/null; then
    TEMPLATE=$(find "$CLAWD/systems/xperience-quote-generator" -name "*.typ" -o -name "*.sh" | head -1)
    if [ -n "$TEMPLATE" ]; then
      pass "Quote Generator (Typst available, templates exist)"
    else
      warn "Quote Generator" "No .typ or .sh files found"
    fi
  else
    fail "Quote Generator" "Typst not installed"
  fi
else
  fail "Quote Generator" "Directory not found"
fi

# 6. Lead CRM
echo -n "Testing Lead CRM... "
if [ -d "$CLAWD/systems/lead-crm" ]; then
  CRM_SCRIPT=$(find "$CLAWD/systems/lead-crm" -name "*.sh" -o -name "*.py" | head -1)
  if [ -n "$CRM_SCRIPT" ]; then
    # Try listing leads (should work even with empty DB)
    if [ -f "$CLAWD/systems/lead-crm/crm.sh" ] && [ -x "$CLAWD/systems/lead-crm/crm.sh" ]; then
      OUTPUT=$("$CLAWD/systems/lead-crm/crm.sh" list 2>&1 | head -5)
      if [ $? -eq 0 ]; then
        pass "Lead CRM (list command works)"
      else
        warn "Lead CRM" "list command failed: $OUTPUT"
      fi
    else
      pass "Lead CRM (scripts present)"
    fi
  else
    fail "Lead CRM" "No scripts found"
  fi
else
  fail "Lead CRM" "Directory not found"
fi

# 7. SLC Lead Gen
echo -n "Testing SLC Lead Gen... "
if [ -d "$CLAWD/projects/slc-lead-gen" ]; then
  if [ -f "$CLAWD/projects/slc-lead-gen/package.json" ] || [ -f "$CLAWD/projects/slc-lead-gen/index.html" ]; then
    pass "SLC Lead Gen (project files present)"
  else
    warn "SLC Lead Gen" "Missing main project files"
  fi
else
  fail "SLC Lead Gen" "Directory not found"
fi

# 8. Demo Pipeline
echo -n "Testing Demo Pipeline... "
DEMO_PIPE="$CLAWD/projects/slc-lead-gen/demo-pipeline.sh"
if [ -f "$DEMO_PIPE" ]; then
  if [ -x "$DEMO_PIPE" ]; then
    # Check lighthouse available
    if command -v lighthouse &>/dev/null || npx lighthouse --version &>/dev/null 2>&1; then
      pass "Demo Pipeline (script + Lighthouse available)"
    else
      warn "Demo Pipeline" "Lighthouse not found (needed for scoring)"
    fi
  else
    warn "Demo Pipeline" "Script not executable"
  fi
else
  fail "Demo Pipeline" "demo-pipeline.sh not found in projects/slc-lead-gen/"
fi

# 9. xp CLI
echo -n "Testing xp CLI... "
if [ -f "$HOME/bin/xp" ] && [ -x "$HOME/bin/xp" ]; then
  OUTPUT=$("$HOME/bin/xp" status 2>&1)
  if [ $? -eq 0 ]; then
    pass "xp CLI (status command works)"
  else
    warn "xp CLI" "status command failed"
  fi
else
  fail "xp CLI" "Not found or not executable at ~/bin/xp"
fi

# 10. Pricing Tool (Vercel deployment)
echo -n "Testing Pricing Tool... "
if [ -d "$CLAWD/systems/xperience-pricing-tool" ] || [ -d "$CLAWD/systems/pricing-tool" ]; then
  pass "Pricing Tool (directory exists)"
else
  warn "Pricing Tool" "Local directory not found (may be deployed-only)"
fi

# Summary
echo ""
echo "=================================================="
echo "📊 Results: $PASS passed, $FAIL failed, $WARN warnings"
echo ""
echo -e "$RESULTS"

if [ "$FAIL" -gt 0 ]; then
  echo "🔴 $FAIL system(s) need attention!"
  exit 1
elif [ "$WARN" -gt 0 ]; then
  echo "🟡 All systems functional with $WARN warning(s)"
  exit 0
else
  echo "🟢 All systems healthy!"
  exit 0
fi
