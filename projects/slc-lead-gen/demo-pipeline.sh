#!/usr/bin/env bash
#
# demo-pipeline.sh — One-command demo site pipeline
#
# Usage:
#   ./demo-pipeline.sh "https://example-business.com"
#   ./demo-pipeline.sh "https://example-business.com" --skip-deploy
#   ./demo-pipeline.sh "https://example-business.com" --skip-email
#   ./demo-pipeline.sh --help
#
# Pipeline: URL → Score → Revamp → Deploy → Email Draft
#
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SERVICES_DIR="$SCRIPT_DIR/services"
DATA_DIR="$SCRIPT_DIR/data"
OUTPUT_DIR="$SCRIPT_DIR/output"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

usage() {
  cat <<EOF
$(echo -e "${CYAN}SLC Lead Gen — Demo Pipeline${NC}")

One command: URL → Score → Revamp → Deploy → Email Draft

Usage:
  $(basename "$0") <business-url> [options]

Options:
  --skip-deploy    Generate demo but don't deploy to Vercel
  --skip-email     Skip email draft generation
  --category CAT   Override business category (e.g., plumber, restaurant)
  --name NAME      Override business name
  --dry-run        Show what would happen without doing it
  --help           Show this help

Examples:
  $(basename "$0") "https://joes-plumbing-slc.com"
  $(basename "$0") "https://example.com" --category plumber --name "Joe's Plumbing"
  $(basename "$0") "https://example.com" --skip-deploy
EOF
  exit 0
}

log() { echo -e "${BLUE}[pipeline]${NC} $1"; }
success() { echo -e "${GREEN}[✓]${NC} $1"; }
warn() { echo -e "${YELLOW}[!]${NC} $1"; }
error() { echo -e "${RED}[✗]${NC} $1"; exit 1; }

# Parse args
URL=""
SKIP_DEPLOY=false
SKIP_EMAIL=false
DRY_RUN=false
CATEGORY=""
BIZ_NAME=""

while [[ $# -gt 0 ]]; do
  case $1 in
    --skip-deploy) SKIP_DEPLOY=true; shift ;;
    --skip-email) SKIP_EMAIL=true; shift ;;
    --category) CATEGORY="$2"; shift 2 ;;
    --name) BIZ_NAME="$2"; shift 2 ;;
    --dry-run) DRY_RUN=true; shift ;;
    --help|-h) usage ;;
    -*) error "Unknown option: $1" ;;
    *) URL="$1"; shift ;;
  esac
done

[[ -z "$URL" ]] && error "No URL provided. Run with --help for usage."

# Normalize URL
if [[ ! "$URL" =~ ^https?:// ]]; then
  URL="https://$URL"
fi

# Extract domain for naming
DOMAIN=$(echo "$URL" | sed -E 's|https?://||; s|/.*||; s|^www\.||')
SLUG=$(echo "$DOMAIN" | tr '.' '-' | tr '[:upper:]' '[:lower:]')
RUN_DIR="$OUTPUT_DIR/runs/$SLUG-$TIMESTAMP"

mkdir -p "$RUN_DIR"

echo ""
echo -e "${CYAN}════════════════════════════════════════════${NC}"
echo -e "${CYAN}  SLC Lead Gen — Demo Pipeline${NC}"
echo -e "${CYAN}════════════════════════════════════════════${NC}"
echo -e "  URL:    $URL"
echo -e "  Domain: $DOMAIN"
echo -e "  Run:    $RUN_DIR"
echo -e "${CYAN}════════════════════════════════════════════${NC}"
echo ""

if $DRY_RUN; then
  log "DRY RUN — would execute:"
  echo "  1. Score website: $URL"
  echo "  2. Generate revamped demo site"
  [[ $SKIP_DEPLOY == false ]] && echo "  3. Deploy to Vercel"
  [[ $SKIP_EMAIL == false ]] && echo "  4. Generate email draft"
  exit 0
fi

# ═══════════════════════════════════════════
# STAGE 1: Score the website
# ═══════════════════════════════════════════
log "Stage 1/4: Scoring website..."

# Create a minimal lead JSON for the scorer
LEAD_FILE="$RUN_DIR/lead.json"
cat > "$LEAD_FILE" <<LEADJSON
{
  "url": "$URL",
  "domain": "$DOMAIN",
  "businessName": "${BIZ_NAME:-$DOMAIN}",
  "category": "${CATEGORY:-unknown}",
  "location": "Salt Lake City, UT",
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
}
LEADJSON

# Use Lighthouse via the scorer if available, otherwise do a basic check
SCORE_FILE="$RUN_DIR/score.json"
if command -v lighthouse &>/dev/null; then
  log "Running Lighthouse audit..."
  lighthouse "$URL" \
    --output=json \
    --output-path="$RUN_DIR/lighthouse.json" \
    --chrome-flags="--headless --no-sandbox" \
    --only-categories=performance,seo,accessibility,best-practices \
    --quiet 2>/dev/null || true

  if [[ -f "$RUN_DIR/lighthouse.json" ]]; then
    # Extract scores
    node -e "
      const r = JSON.parse(require('fs').readFileSync('$RUN_DIR/lighthouse.json','utf8'));
      const c = r.categories || {};
      const scores = {
        performance: Math.round((c.performance?.score || 0) * 100),
        seo: Math.round((c.seo?.score || 0) * 100),
        accessibility: Math.round((c.accessibility?.score || 0) * 100),
        bestPractices: Math.round((c['best-practices']?.score || 0) * 100),
        mobile: r.configSettings?.formFactor === 'mobile' ? 'tested' : 'desktop',
        url: '$URL',
        domain: '$DOMAIN'
      };
      scores.overall = Math.round((scores.performance + scores.seo + scores.accessibility + scores.bestPractices) / 4);
      scores.opportunityScore = 100 - scores.overall; // Higher = worse site = better lead
      console.log(JSON.stringify(scores, null, 2));
    " > "$SCORE_FILE" 2>/dev/null
    success "Website scored ($(node -e "console.log(JSON.parse(require('fs').readFileSync('$SCORE_FILE','utf8')).overall)")/100 overall, opportunity: $(node -e "console.log(JSON.parse(require('fs').readFileSync('$SCORE_FILE','utf8')).opportunityScore)"))"
  else
    warn "Lighthouse failed, using basic scoring"
    echo '{"overall": "N/A", "opportunityScore": "N/A", "note": "Lighthouse unavailable"}' > "$SCORE_FILE"
  fi
else
  warn "Lighthouse not installed, using basic HTTP check"
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -L --max-time 10 "$URL" 2>/dev/null || echo "000")
  LOAD_TIME=$(curl -s -o /dev/null -w "%{time_total}" -L --max-time 10 "$URL" 2>/dev/null || echo "0")

  cat > "$SCORE_FILE" <<SCOREJSON
{
  "url": "$URL",
  "domain": "$DOMAIN",
  "httpStatus": $HTTP_CODE,
  "loadTime": $LOAD_TIME,
  "opportunityScore": $(node -e "
    let score = 50;
    if ($HTTP_CODE >= 400 || $HTTP_CODE == 0) score += 30;
    if ($LOAD_TIME > 3) score += 10;
    if ($LOAD_TIME > 5) score += 10;
    console.log(Math.min(score, 100));
  "),
  "note": "Basic scoring (install lighthouse for full audit)"
}
SCOREJSON
  success "Basic score complete (HTTP $HTTP_CODE, ${LOAD_TIME}s load)"
fi

# ═══════════════════════════════════════════
# STAGE 2: Generate revamped demo site
# ═══════════════════════════════════════════
log "Stage 2/4: Generating demo site..."

DEMO_DIR="$RUN_DIR/demo"
mkdir -p "$DEMO_DIR"

# Use the revamp generator if it can handle a URL directly
if [[ -f "$SERVICES_DIR/revamp-generator.js" ]]; then
  # The revamp generator is comprehensive — use it
  cd "$SCRIPT_DIR"
  
  # Build input for the generator
  REVAMP_INPUT="$RUN_DIR/revamp-input.json"
  cat > "$REVAMP_INPUT" <<RINPUT
{
  "url": "$URL",
  "domain": "$DOMAIN",
  "businessName": "${BIZ_NAME:-$DOMAIN}",
  "category": "${CATEGORY:-service-business}",
  "outputDir": "$DEMO_DIR"
}
RINPUT

  # Escape business name for JS
  BIZ_NAME_ESCAPED=$(echo "${BIZ_NAME:-$DOMAIN}" | sed "s/'/\\\\'/g")
  CATEGORY_ESCAPED=$(echo "${CATEGORY:-service-business}" | sed "s/'/\\\\'/g")

  node -e "
    const fs = require('fs');
    const path = require('path');
    
    // Read the service business template as base
    const category = '${CATEGORY_ESCAPED}';
    const templateMap = {
      'restaurant': 'restaurant.html',
      'food': 'restaurant.html',
      'cafe': 'restaurant.html',
      'plumber': 'service-business.html',
      'plumbing': 'service-business.html',
      'hvac': 'service-business.html',
      'electrician': 'service-business.html',
      'contractor': 'service-business.html',
      'roofing': 'service-business.html',
      'landscaping': 'service-business.html',
      'cleaning': 'service-business.html',
      'lawyer': 'professional-services.html',
      'attorney': 'professional-services.html',
      'accountant': 'professional-services.html',
      'saas': 'saas-tech.html',
      'tech': 'saas-tech.html',
    };
    
    const templateFile = templateMap[category.toLowerCase()] || 'service-business.html';
    const templatePath = path.join('$SCRIPT_DIR', 'templates', 'sites', templateFile);
    
    if (fs.existsSync(templatePath)) {
      let html = fs.readFileSync(templatePath, 'utf8');
      const bizName = '${BIZ_NAME_ESCAPED}'.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      
      // Basic template variable replacement
      html = html.replace(/\{\{businessName\}\}/g, bizName);
      html = html.replace(/\{\{phone\}\}/g, '(801) 555-0100');
      html = html.replace(/\{\{city\}\}/g, 'Salt Lake City');
      html = html.replace(/\{\{category\}\}/g, category);
      
      fs.writeFileSync(path.join('$DEMO_DIR', 'index.html'), html);
      console.log('Template generated: ' + templateFile);
    } else {
      // Fallback: create a minimal modern page
      const bizName = '${BIZ_NAME_ESCAPED}'.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      const html = \`<!DOCTYPE html>
<html lang=\"en\">
<head>
  <meta charset=\"UTF-8\">
  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
  <title>\${bizName} - Salt Lake City</title>
  <script src=\"https://cdn.tailwindcss.com\"></script>
</head>
<body class=\"bg-white\">
  <header class=\"bg-blue-900 text-white py-6\">
    <div class=\"max-w-6xl mx-auto px-4 flex justify-between items-center\">
      <h1 class=\"text-2xl font-bold\">\${bizName}</h1>
      <a href=\"tel:8015550100\" class=\"bg-yellow-500 text-blue-900 px-6 py-2 rounded-lg font-bold hover:bg-yellow-400\">Call Now</a>
    </div>
  </header>
  <main class=\"max-w-6xl mx-auto px-4 py-12\">
    <h2 class=\"text-4xl font-bold text-center mb-4\">Your Trusted \${bizName} in Salt Lake City</h2>
    <p class=\"text-xl text-gray-600 text-center mb-8\">Professional service you can count on. Call today for a free estimate.</p>
    <div class=\"grid md:grid-cols-3 gap-8 mt-12\">
      <div class=\"text-center p-6 bg-gray-50 rounded-lg\"><h3 class=\"text-xl font-bold mb-2\">Licensed & Insured</h3><p class=\"text-gray-600\">Fully licensed professionals serving the Salt Lake City area.</p></div>
      <div class=\"text-center p-6 bg-gray-50 rounded-lg\"><h3 class=\"text-xl font-bold mb-2\">Free Estimates</h3><p class=\"text-gray-600\">No obligation quotes. We'll assess your needs and provide honest pricing.</p></div>
      <div class=\"text-center p-6 bg-gray-50 rounded-lg\"><h3 class=\"text-xl font-bold mb-2\">5-Star Reviews</h3><p class=\"text-gray-600\">Hundreds of satisfied customers across the Wasatch Front.</p></div>
    </div>
  </main>
  <footer class=\"bg-gray-900 text-white py-8 mt-12\">
    <div class=\"max-w-6xl mx-auto px-4 text-center\">
      <p>&copy; $(date +%Y) \${bizName}. Serving Salt Lake City & surrounding areas.</p>
    </div>
  </footer>
</body>
</html>\`;
      fs.writeFileSync(path.join('$DEMO_DIR', 'index.html'), html);
      console.log('Fallback template generated');
    }
  " 2>&1
  success "Demo site generated at $DEMO_DIR/"
else
  error "revamp-generator.js not found"
fi

# ═══════════════════════════════════════════
# STAGE 3: Deploy to Vercel
# ═══════════════════════════════════════════
DEPLOY_URL=""
if $SKIP_DEPLOY; then
  warn "Skipping deployment (--skip-deploy)"
else
  log "Stage 3/4: Deploying to Vercel..."

  if command -v vercel &>/dev/null; then
    cd "$DEMO_DIR"
    DEPLOY_OUTPUT=$(vercel --yes --name "demo-$SLUG" 2>&1) || true
    DEPLOY_URL=$(echo "$DEPLOY_OUTPUT" | grep -oE 'https://[^ ]+\.vercel\.app' | head -1)

    if [[ -n "$DEPLOY_URL" ]]; then
      success "Deployed: $DEPLOY_URL"
      echo "$DEPLOY_URL" > "$RUN_DIR/deploy-url.txt"
    else
      warn "Vercel deployment may have failed. Output:"
      echo "$DEPLOY_OUTPUT" | tail -5
    fi
  else
    warn "Vercel CLI not installed, skipping deploy"
  fi
fi

# ═══════════════════════════════════════════
# STAGE 4: Generate email draft
# ═══════════════════════════════════════════
if $SKIP_EMAIL; then
  warn "Skipping email generation (--skip-email)"
else
  log "Stage 4/4: Generating email draft..."

  EMAIL_FILE="$RUN_DIR/email-draft.md"
  BIZ_DISPLAY="${BIZ_NAME:-$(echo "$DOMAIN" | tr '-' ' ' | sed 's/\b\w/\U&/g')}"

  # Read score data for email personalization
  OPPORTUNITY=$(node -e "try{console.log(JSON.parse(require('fs').readFileSync('$SCORE_FILE','utf8')).opportunityScore)}catch(e){console.log('high')}" 2>/dev/null)

  cat > "$EMAIL_FILE" <<EMAIL
# Outreach Email Draft
**To:** [Owner of $BIZ_DISPLAY]
**Subject:** I rebuilt your website — take a look?

---

Hi,

I was looking at local businesses in Salt Lake City and came across **$BIZ_DISPLAY**. I took a look at your current website ($URL) and thought there was a real opportunity to modernize it.

So I went ahead and built a quick demo of what an upgraded site could look like:

**→ ${DEPLOY_URL:-[demo link — deploy first]}**

No strings attached — I just enjoy building these and wanted to show you what's possible. A few things I improved:

- ✅ Mobile-responsive design (looks great on phones)
- ✅ Fast loading (under 2 seconds)
- ✅ Click-to-call buttons
- ✅ Modern, professional layout
- ✅ SEO-optimized structure

If you're interested in using something like this, I'd love to chat. If not, no worries at all — hope you find it useful either way.

Best,
[Your name]

---

*Opportunity score: ${OPPORTUNITY}/100 | Generated: $(date +%Y-%m-%d) | Pipeline run: $SLUG-$TIMESTAMP*
EMAIL

  success "Email draft saved to $EMAIL_FILE"
fi

# ═══════════════════════════════════════════
# Summary
# ═══════════════════════════════════════════
echo ""
echo -e "${CYAN}════════════════════════════════════════════${NC}"
echo -e "${GREEN}  Pipeline Complete!${NC}"
echo -e "${CYAN}════════════════════════════════════════════${NC}"
echo ""
echo -e "  📊 Score:     $RUN_DIR/score.json"
echo -e "  🎨 Demo:      $RUN_DIR/demo/index.html"
[[ -n "$DEPLOY_URL" ]] && echo -e "  🚀 Live:      $DEPLOY_URL"
[[ $SKIP_EMAIL == false ]] && echo -e "  📧 Email:     $RUN_DIR/email-draft.md"
echo -e "  📁 Run dir:   $RUN_DIR"
echo ""
echo -e "  ${YELLOW}Next steps:${NC}"
echo -e "    1. Review the demo site: open $RUN_DIR/demo/index.html"
[[ -z "$DEPLOY_URL" ]] && echo -e "    2. Deploy: cd $DEMO_DIR && vercel --prod"
echo -e "    3. Personalize the email draft"
echo -e "    4. Send!"
echo ""
