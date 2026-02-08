#!/bin/bash
# Quick wrapper for review campaign generation
# Usage: ./generate-review-campaign.sh "John Smith" "8015551234" "john@email.com" "roof replacement"

cd "$(dirname "$0")"
source ~/clawd/.venv/bin/activate

CUSTOMER="$1"
PHONE="$2"
EMAIL="$3"
JOB="${4:-roof replacement}"
DATE="${5:-$(date +%Y-%m-%d)}"

if [ -z "$CUSTOMER" ] || [ -z "$PHONE" ]; then
    echo "Usage: $0 'Customer Name' 'phone' ['email'] ['job type'] ['YYYY-MM-DD']"
    echo ""
    echo "Examples:"
    echo "  $0 'John Smith' '8015551234' 'john@email.com' 'roof replacement'"
    echo "  $0 'Jane Doe' '8015559999' '' 'repair'"
    exit 1
fi

python review_gen.py --generate \
    --customer "$CUSTOMER" \
    --phone "$PHONE" \
    ${EMAIL:+--email "$EMAIL"} \
    --job "$JOB" \
    --date "$DATE" \
    --output campaigns/
