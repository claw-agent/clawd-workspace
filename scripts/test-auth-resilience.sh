#!/bin/bash
# Test auth resilience - verifies all the fixes are working
set -e

echo "=== Auth Resilience Test ==="
echo ""

# Test 1: Token format
echo "1. Checking auth-profiles.json format..."
AUTH_FILE="$HOME/.clawdbot/agents/main/agent/auth-profiles.json"
AUTH_TYPE=$(jq -r '.profiles["anthropic:claude-cli"].type // "unknown"' "$AUTH_FILE" 2>/dev/null)
if [ "$AUTH_TYPE" = "token" ]; then
    echo "   ✅ Using token format (correct)"
else
    echo "   ❌ Using '$AUTH_TYPE' format (may cause issues)"
fi

# Test 2: Token exists
echo ""
echo "2. Checking token exists..."
TOKEN=$(jq -r '.profiles["anthropic:claude-cli"].token // ""' "$AUTH_FILE" 2>/dev/null)
if [ -n "$TOKEN" ]; then
    echo "   ✅ Token present (${#TOKEN} chars)"
else
    echo "   ❌ Token missing"
fi

# Test 3: Keychain entry
echo ""
echo "3. Checking keychain entry..."
KEYCHAIN_DATA=$(security find-generic-password -s "Claude Code-credentials" -a "marbagent" -w 2>/dev/null || echo "")
if [ -n "$KEYCHAIN_DATA" ]; then
    EXPIRES=$(echo "$KEYCHAIN_DATA" | python3 -c "import sys,json; print(json.load(sys.stdin).get('claudeAiOauth',{}).get('expiresAt',0))" 2>/dev/null || echo "0")
    NOW_MS=$(($(date +%s) * 1000))
    MINS_LEFT=$(( (EXPIRES - NOW_MS) / 60000 ))
    echo "   ✅ Keychain entry found (expires in ${MINS_LEFT} minutes)"
else
    echo "   ❌ Keychain entry missing"
fi

# Test 4: Ollama fallback
echo ""
echo "4. Checking Ollama fallback..."
if curl -s --max-time 3 "http://127.0.0.1:11434/v1/models" > /dev/null 2>&1; then
    MODELS=$(curl -s "http://127.0.0.1:11434/v1/models" | jq -r '.data[].id' | tr '\n' ', ')
    echo "   ✅ Ollama running with models: $MODELS"
else
    echo "   ❌ Ollama not reachable"
fi

# Test 5: Gateway
echo ""
echo "5. Checking gateway..."
if curl -s --max-time 3 "http://127.0.0.1:18789/health" > /dev/null 2>&1; then
    echo "   ✅ Gateway responding on :18789"
else
    echo "   ❌ Gateway not responding"
fi

# Test 6: Fallback config
echo ""
echo "6. Checking fallback config..."
FALLBACKS=$(cat ~/.clawdbot/clawdbot.json | jq -r '.agents.defaults.model.fallbacks[]' 2>/dev/null)
OLLAMA_FALLBACK=$(echo "$FALLBACKS" | grep -c "ollama" || echo "0")
if [ "$OLLAMA_FALLBACK" -gt "0" ]; then
    echo "   ✅ Ollama models in fallback chain ($OLLAMA_FALLBACK found)"
else
    echo "   ❌ No Ollama models in fallback chain"
fi

echo ""
echo "=== Test Complete ==="
