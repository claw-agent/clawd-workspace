#!/bin/bash
# weekly-update-check.sh — Check all tools/repos/packages for available updates
# Run weekly via cron (Sunday 4am alongside maintenance)

REPORT="/tmp/openclaw/update-check-$(date +%Y-%m-%d).txt"
mkdir -p /tmp/openclaw

echo "=== OpenClaw Tool Update Check — $(date) ===" > "$REPORT"
echo "" >> "$REPORT"

# 1. Homebrew packages
echo "## Homebrew Outdated Packages" >> "$REPORT"
brew outdated 2>/dev/null >> "$REPORT" || echo "  (brew not available)" >> "$REPORT"
echo "" >> "$REPORT"

# 2. Python packages in our venv
echo "## Python Packages (~/clawd/.venv)" >> "$REPORT"
source ~/clawd/.venv/bin/activate 2>/dev/null
pip list --outdated --format=columns 2>/dev/null | head -30 >> "$REPORT" || echo "  (venv not available)" >> "$REPORT"
deactivate 2>/dev/null
echo "" >> "$REPORT"

# 3. npm global packages
echo "## npm Global Outdated" >> "$REPORT"
npm outdated -g 2>/dev/null | head -20 >> "$REPORT" || echo "  (none)" >> "$REPORT"
echo "" >> "$REPORT"

# 4. Ollama models
echo "## Ollama Models (check for updates)" >> "$REPORT"
ollama list 2>/dev/null >> "$REPORT" || echo "  (ollama not available)" >> "$REPORT"
echo "" >> "$REPORT"

# 5. Git repos — check if behind upstream
echo "## Git Repos — Behind Upstream" >> "$REPORT"
for repo in ~/clawd/tools/shannon ~/clawd/ComfyUI; do
    if [ -d "$repo/.git" ]; then
        cd "$repo"
        git fetch origin --quiet 2>/dev/null
        LOCAL=$(git rev-parse HEAD 2>/dev/null)
        REMOTE=$(git rev-parse @{u} 2>/dev/null)
        if [ "$LOCAL" != "$REMOTE" ] 2>/dev/null; then
            BEHIND=$(git rev-list --count HEAD..@{u} 2>/dev/null)
            echo "  $(basename $repo): $BEHIND commits behind" >> "$REPORT"
        else
            echo "  $(basename $repo): up to date" >> "$REPORT"
        fi
    fi
done
echo "" >> "$REPORT"

# 6. OpenClaw version
echo "## OpenClaw Version" >> "$REPORT"
CURRENT=$(openclaw --version 2>/dev/null || echo "unknown")
echo "  Current: $CURRENT" >> "$REPORT"
echo "  Check https://github.com/openclaw/openclaw/releases for latest" >> "$REPORT"
echo "" >> "$REPORT"

# 7. Docker images
echo "## Docker Images" >> "$REPORT"
docker images --format "{{.Repository}}:{{.Tag}} ({{.CreatedSince}})" 2>/dev/null | head -10 >> "$REPORT" || echo "  (docker not available)" >> "$REPORT"
echo "" >> "$REPORT"

echo "=== End of Update Check ===" >> "$REPORT"

# Output the report
cat "$REPORT"
