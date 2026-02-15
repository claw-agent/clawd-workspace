#!/usr/bin/env bash
# XPERIENCE Roofing — Quote PDF Generator
# Usage: ./generate-quote.sh [options]
#
# Examples:
#   ./generate-quote.sh --name "John Smith" --address "123 Main St, SLC, UT 84101" --phone "801-555-1234"
#   ./generate-quote.sh --name "Jane Doe" --insurance --config quote-config.env
#
# Config file (quote-config.env) can set any variable. See defaults below.

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
TEMPLATE="$SCRIPT_DIR/quote-template.typ"
OUTPUT_DIR="$SCRIPT_DIR/quotes"
mkdir -p "$OUTPUT_DIR"

# Defaults
CUSTOMER_NAME="Homeowner"
CUSTOMER_ADDRESS=""
CUSTOMER_PHONE=""
CUSTOMER_EMAIL=""
QUOTE_NUMBER=""
VALID_DAYS="30"
ROOF_TYPE="Asphalt Shingle"
ROOF_SQFT="2,000"
STORIES="1"
PITCH="6/12"
LINE_ITEMS="Tear-off existing roof|1|2500|2500||30-Year Architectural Shingles (CertainTeed)|20 sq|185|3700||Synthetic Underlayment (GAF FeltBuster)|20 sq|45|900||Ridge Vent Installation|1|650|650||Flashing & Drip Edge|1|800|800||Cleanup & Haul-Away|1|500|500"
SUBTOTAL="9,050"
TOTAL="9,050"
INSURANCE_NOTE=""
DEPOSIT=""
NOTES=""
SHOW_INSURANCE=false
CONFIG_FILE=""

usage() {
  echo "Usage: $0 [options]"
  echo ""
  echo "Options:"
  echo "  --name NAME           Customer name"
  echo "  --address ADDR        Customer address"
  echo "  --phone PHONE         Customer phone"
  echo "  --email EMAIL         Customer email"
  echo "  --quote-num NUM       Quote number (auto-generated if omitted)"
  echo "  --roof-type TYPE      Roof type (default: Asphalt Shingle)"
  echo "  --sqft SQFT           Roof square footage (default: 2,000)"
  echo "  --stories N           Number of stories (default: 1)"
  echo "  --pitch P             Roof pitch (default: 6/12)"
  echo "  --items 'desc|qty|unit|total||...'  Pipe-separated line items"
  echo "  --subtotal AMT        Subtotal"
  echo "  --total AMT           Total"
  echo "  --deposit AMT         Deposit amount"
  echo "  --insurance           Include insurance claim section"
  echo "  --insurance-note TXT  Custom insurance note"  
  echo "  --notes TEXT          Additional notes"
  echo "  --config FILE         Load settings from env file"
  echo "  --output FILE         Output PDF path (default: quotes/XR-DATE-NAME.pdf)"
  echo "  -h, --help            Show this help"
  exit 0
}

# Parse args
OUTPUT_FILE=""
while [[ $# -gt 0 ]]; do
  case $1 in
    --name) CUSTOMER_NAME="$2"; shift 2;;
    --address) CUSTOMER_ADDRESS="$2"; shift 2;;
    --phone) CUSTOMER_PHONE="$2"; shift 2;;
    --email) CUSTOMER_EMAIL="$2"; shift 2;;
    --quote-num) QUOTE_NUMBER="$2"; shift 2;;
    --roof-type) ROOF_TYPE="$2"; shift 2;;
    --sqft) ROOF_SQFT="$2"; shift 2;;
    --stories) STORIES="$2"; shift 2;;
    --pitch) PITCH="$2"; shift 2;;
    --items) LINE_ITEMS="$2"; shift 2;;
    --subtotal) SUBTOTAL="$2"; shift 2;;
    --total) TOTAL="$2"; shift 2;;
    --deposit) DEPOSIT="$2"; shift 2;;
    --insurance) SHOW_INSURANCE=true; shift;;
    --insurance-note) INSURANCE_NOTE="$2"; shift 2;;
    --notes) NOTES="$2"; shift 2;;
    --config) CONFIG_FILE="$2"; shift 2;;
    --output) OUTPUT_FILE="$2"; shift 2;;
    -h|--help) usage;;
    *) echo "Unknown option: $1"; usage;;
  esac
done

# Load config file if specified
if [[ -n "$CONFIG_FILE" && -f "$CONFIG_FILE" ]]; then
  # shellcheck disable=SC1090
  source "$CONFIG_FILE"
fi

# Auto-generate quote number
if [[ -z "$QUOTE_NUMBER" ]]; then
  DATE_PART=$(date +%Y%m%d)
  # Count existing quotes for today
  EXISTING=$(find "$OUTPUT_DIR" -name "XR-${DATE_PART}-*.pdf" 2>/dev/null | wc -l | tr -d ' ')
  SEQ=$(printf "%03d" $((EXISTING + 1)))
  QUOTE_NUMBER="XR-${DATE_PART}-${SEQ}"
fi

# Auto insurance note
if [[ "$SHOW_INSURANCE" == true && -z "$INSURANCE_NOTE" ]]; then
  INSURANCE_NOTE="Pending adjuster review"
fi

# Output file
if [[ -z "$OUTPUT_FILE" ]]; then
  SAFE_NAME=$(echo "$CUSTOMER_NAME" | tr ' ' '-' | tr -cd '[:alnum:]-')
  OUTPUT_FILE="$OUTPUT_DIR/${QUOTE_NUMBER}-${SAFE_NAME}.pdf"
fi

echo "📄 Generating quote #${QUOTE_NUMBER} for ${CUSTOMER_NAME}..."

typst compile "$TEMPLATE" "$OUTPUT_FILE" \
  --input "customer_name=${CUSTOMER_NAME}" \
  --input "customer_address=${CUSTOMER_ADDRESS}" \
  --input "customer_phone=${CUSTOMER_PHONE}" \
  --input "customer_email=${CUSTOMER_EMAIL}" \
  --input "quote_number=${QUOTE_NUMBER}" \
  --input "valid_days=${VALID_DAYS}" \
  --input "roof_type=${ROOF_TYPE}" \
  --input "roof_sqft=${ROOF_SQFT}" \
  --input "stories=${STORIES}" \
  --input "pitch=${PITCH}" \
  --input "line_items=${LINE_ITEMS}" \
  --input "subtotal=${SUBTOTAL}" \
  --input "total=${TOTAL}" \
  --input "insurance_note=${INSURANCE_NOTE}" \
  --input "deposit=${DEPOSIT}" \
  --input "notes=${NOTES}"

echo "✅ Quote saved: $OUTPUT_FILE"
echo "   Customer: $CUSTOMER_NAME"
echo "   Total: \$${TOTAL}"
if [[ -n "$INSURANCE_NOTE" ]]; then
  echo "   Insurance: $INSURANCE_NOTE"
fi
