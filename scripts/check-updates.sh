#!/bin/bash
# Check for updates across all our tooling
# Run nightly - reports only, doesn't auto-update

echo "🔍 Tool Update Check — $(date '+%Y-%m-%d %H:%M')"
echo "================================================"
echo ""

UPDATES_FOUND=0

# 1. Homebrew (formulae)
echo "📦 Homebrew Packages"
echo "--------------------"
brew update >/dev/null 2>&1
OUTDATED=$(brew outdated --quiet 2>/dev/null)
if [ -n "$OUTDATED" ]; then
    echo "$OUTDATED" | while read pkg; do
        CURRENT=$(brew list --versions "$pkg" 2>/dev/null | awk '{print $2}')
        LATEST=$(brew info "$pkg" 2>/dev/null | head -1 | awk '{print $3}')
        echo "  ⬆️  $pkg: $CURRENT → $LATEST"
    done
    UPDATES_FOUND=1
else
    echo "  ✅ All up to date"
fi
echo ""

# 2. npm global packages
echo "📦 npm Global Packages"
echo "----------------------"
NPM_OUTDATED=$(npm outdated -g --parseable 2>/dev/null | head -10)
if [ -n "$NPM_OUTDATED" ]; then
    echo "$NPM_OUTDATED" | while IFS=: read path current wanted latest pkg; do
        echo "  ⬆️  $pkg: $current → $latest"
    done
    UPDATES_FOUND=1
else
    echo "  ✅ All up to date"
fi
echo ""

# 3. pipx packages
echo "📦 pipx Packages"
echo "----------------"
if command -v pipx &> /dev/null; then
    PIPX_LIST=$(pipx list --short 2>/dev/null)
    # pipx doesn't have a great outdated check, just list what we have
    echo "  Installed: $(echo "$PIPX_LIST" | tr '\n' ', ' | sed 's/,$//')"
    echo "  (Run 'pipx upgrade-all' to update)"
else
    echo "  pipx not installed"
fi
echo ""

# 4. Ollama models
echo "🤖 Ollama Models"
echo "----------------"
if command -v ollama &> /dev/null; then
    # Check each model for updates
    MODELS=$(ollama list 2>/dev/null | tail -n +2 | awk '{print $1}')
    for model in $MODELS; do
        # Pull with --dry-run equivalent (just check)
        echo "  📋 $model (run 'ollama pull $model' to check/update)"
    done
else
    echo "  Ollama not installed"
fi
echo ""

# 5. Git repos we maintain
echo "📂 Git Repositories"
echo "-------------------"
REPOS=(
    "$HOME/clawd/Qwen3-TTS"
    "$HOME/clawd/sim-studio"
)
for repo in "${REPOS[@]}"; do
    if [ -d "$repo/.git" ]; then
        cd "$repo"
        REPO_NAME=$(basename "$repo")
        git fetch origin >/dev/null 2>&1
        LOCAL=$(git rev-parse HEAD 2>/dev/null)
        REMOTE=$(git rev-parse @{u} 2>/dev/null)
        if [ "$LOCAL" != "$REMOTE" ]; then
            BEHIND=$(git rev-list --count HEAD..@{u} 2>/dev/null)
            echo "  ⬆️  $REPO_NAME: $BEHIND commits behind"
            UPDATES_FOUND=1
        else
            echo "  ✅ $REPO_NAME: up to date"
        fi
    fi
done
echo ""

# 6. Clawdbot itself
echo "🦞 Clawdbot"
echo "-----------"
CURRENT_CB=$(clawdbot --version 2>/dev/null | head -1)
LATEST_CB=$(npm view clawdbot version 2>/dev/null)
if [ -n "$CURRENT_CB" ] && [ -n "$LATEST_CB" ]; then
    if [ "$CURRENT_CB" != "$LATEST_CB" ]; then
        echo "  ⬆️  clawdbot: $CURRENT_CB → $LATEST_CB"
        UPDATES_FOUND=1
    else
        echo "  ✅ clawdbot $CURRENT_CB (latest)"
    fi
fi
echo ""

# 7. Claude CLI (Anthropic)
echo "🧠 Claude CLI"
echo "-------------"
if [ -f "$HOME/.local/bin/claude" ]; then
    CLAUDE_VER=$("$HOME/.local/bin/claude" --version 2>/dev/null | head -1)
    echo "  Current: $CLAUDE_VER"
    echo "  (Run 'claude update' to check for updates)"
else
    echo "  Not installed"
fi
echo ""

# 8. Homebrew Casks (apps)
echo "📦 Homebrew Casks (Apps)"
echo "------------------------"
OUTDATED_CASKS=$(brew outdated --cask --quiet 2>/dev/null)
if [ -n "$OUTDATED_CASKS" ]; then
    echo "$OUTDATED_CASKS" | while read cask; do
        echo "  ⬆️  $cask"
    done
    UPDATES_FOUND=1
else
    echo "  ✅ All up to date"
fi
echo ""

# 8. Python venvs
echo "🐍 Python Virtual Environments"
echo "------------------------------"

# Main clawd venv
if [ -d "$HOME/clawd/.venv" ]; then
    echo "  📂 Main venv (~/.clawd/.venv):"
    source "$HOME/clawd/.venv/bin/activate" 2>/dev/null
    OUTDATED_PIP=$(pip list --outdated --format=json 2>/dev/null | python3 -c "import sys,json; d=json.load(sys.stdin); print('\n'.join([f\"    {p['name']}: {p['version']} → {p['latest_version']}\" for p in d[:5]]))" 2>/dev/null)
    if [ -n "$OUTDATED_PIP" ]; then
        echo "$OUTDATED_PIP"
        COUNT=$(pip list --outdated 2>/dev/null | tail -n +3 | wc -l | tr -d ' ')
        if [ "$COUNT" -gt 5 ]; then
            echo "    ... and $((COUNT - 5)) more"
        fi
        UPDATES_FOUND=1
    else
        echo "    ✅ All up to date"
    fi
    deactivate 2>/dev/null
fi

# Qwen3-TTS venv
if [ -d "$HOME/clawd/Qwen3-TTS/.venv" ]; then
    echo "  📂 Qwen3-TTS venv:"
    source "$HOME/clawd/Qwen3-TTS/.venv/bin/activate" 2>/dev/null
    OUTDATED_PIP=$(pip list --outdated --format=json 2>/dev/null | python3 -c "import sys,json; d=json.load(sys.stdin); print('\n'.join([f\"    {p['name']}: {p['version']} → {p['latest_version']}\" for p in d[:5]]))" 2>/dev/null)
    if [ -n "$OUTDATED_PIP" ]; then
        echo "$OUTDATED_PIP"
        COUNT=$(pip list --outdated 2>/dev/null | tail -n +3 | wc -l | tr -d ' ')
        if [ "$COUNT" -gt 5 ]; then
            echo "    ... and $((COUNT - 5)) more"
        fi
        UPDATES_FOUND=1
    else
        echo "    ✅ All up to date"
    fi
    deactivate 2>/dev/null
fi
echo ""

# 9. MCP Servers (from Clawdbot config)
echo "🔌 MCP Servers"
echo "--------------"
if [ -f "$HOME/.clawdbot/clawdbot.json" ]; then
    # Extract MCP server names
    MCP_SERVERS=$(cat "$HOME/.clawdbot/clawdbot.json" | python3 -c "import sys,json; c=json.load(sys.stdin); servers=c.get('mcpServers',{}); print('\n'.join(servers.keys()))" 2>/dev/null)
    if [ -n "$MCP_SERVERS" ]; then
        echo "  Configured: $(echo "$MCP_SERVERS" | tr '\n' ', ' | sed 's/,$//')"
        echo "  (MCP servers update via their package managers)"
    else
        echo "  No MCP servers configured"
    fi
else
    echo "  Config not found"
fi
echo ""

# 10. Docker images (if Docker is running)
echo "🐳 Docker Images"
echo "----------------"
if command -v docker &> /dev/null && docker info &>/dev/null; then
    IMAGES=$(docker images --format "{{.Repository}}:{{.Tag}}" 2>/dev/null | grep -v "<none>" | head -5)
    if [ -n "$IMAGES" ]; then
        echo "  Installed images:"
        echo "$IMAGES" | while read img; do
            echo "    📦 $img"
        done
        echo "  (Run 'docker pull <image>' to check for updates)"
    else
        echo "  No images found"
    fi
else
    echo "  Docker not running or not installed"
fi
echo ""

# 11. macOS (informational)
echo "💻 macOS"
echo "--------"
SW_VERS=$(sw_vers -productVersion 2>/dev/null)
BUILD=$(sw_vers -buildVersion 2>/dev/null)
echo "  Current: macOS $SW_VERS ($BUILD)"
echo "  (Check System Settings → Software Update for OS updates)"
echo ""

# Summary
echo "================================================"
if [ $UPDATES_FOUND -eq 1 ]; then
    echo "📬 Updates available! Review above."
else
    echo "✅ Everything looks current!"
fi
