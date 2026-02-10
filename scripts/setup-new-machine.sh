#!/bin/bash
# setup-new-machine.sh — Bootstrap a new Mac for the Claw workspace
# Usage: git clone https://github.com/claw-agent/clawd-workspace.git ~/clawd && ~/clawd/scripts/setup-new-machine.sh

set -e
echo "🐾 Claw Workspace Setup"
echo "========================"

# 1. Homebrew
if ! command -v brew &>/dev/null; then
    echo "Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

# 2. Core tools
echo "Installing core tools..."
brew install node ollama ffmpeg typst yt-dlp cliclick git jq

# 3. Node global packages
echo "Installing npm global packages..."
npm install -g openclaw @anthropic-ai/claude-code agent-browser vercel @remotion/cli remotion puppeteer firecrawl

# 4. Python venv
echo "Setting up Python venv..."
python3 -m venv ~/clawd/.venv
source ~/clawd/.venv/bin/activate
pip install --upgrade pip
pip install mlx-whisper pandas numpy openpyxl xlrd matplotlib plotly \
    firecrawl-py reportlab weasyprint psutil rich tqdm pypdf PyJWT

# 5. Ollama models
echo "Pulling Ollama models..."
ollama pull llama3.1:8b
ollama pull llama3.2:3b
ollama pull glm4:latest

# 6. Create credential directories
echo "Creating config directories..."
mkdir -p ~/clawd/config
chmod 700 ~/clawd/config

# 7. Shannon pentester
echo "Cloning Shannon..."
git clone https://github.com/KeygraphHQ/shannon.git ~/clawd/tools/shannon 2>/dev/null || echo "Shannon already cloned"

# 8. Mac power settings (prevent sleep)
echo "Configuring power settings..."
sudo pmset sleep 0 displaysleep 0 autorestart 1 networkoversleep 1 powernap 0

# 9. Cron jobs
echo "Setting up cron jobs..."
(crontab -l 2>/dev/null; cat <<'CRON'
*/5 * * * * /Users/marbagent/clawd/scripts/gateway-watchdog.sh
0 3 * * * /Users/marbagent/clawd/scripts/nightly-backup.sh
5 4 * * 0 /Users/marbagent/clawd/scripts/weekly-update-check.sh > /tmp/openclaw/update-check-latest.txt 2>&1
CRON
) | sort -u | crontab -

echo ""
echo "========================"
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Add credentials to ~/clawd/config/ (chmod 600 each file)"
echo "  2. Configure OpenClaw: openclaw setup"
echo "  3. Start gateway: openclaw gateway start"
echo "  4. Sign into x.com in Safari (for bird CLI)"
echo "  5. Add API keys: Anthropic, Firecrawl, HeyGen, Twilio"
echo ""
echo "🐾 Welcome back."
