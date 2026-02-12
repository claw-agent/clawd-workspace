# Skill Installation Audit

> Use when: Installing skills from ClawHub or any external source. Reviewing third-party agent code.
> Don't use when: Creating your own skills. Updating existing trusted skills.
> Inputs: Skill directory/repo to audit
> Outputs: Pass/fail assessment with specific findings

**NEVER install external skills without auditing first.**

See: [1Password blog on malicious OpenClaw skills](https://1password.com/blog/from-magic-to-malware-how-openclaws-agent-skills-become-an-attack-surface)

## Pre-Install Checklist

```bash
# 1. Suspicious install patterns (RED FLAGS)
grep -r "curl.*|.*bash\|wget.*|.*sh\|xattr\|quarantine" SKILL.md *.sh *.py

# 2. Obfuscated payloads
grep -r "base64\|atob\|btoa\|eval\|\\\\x" . --include="*.sh" --include="*.py" --include="*.js"

# 3. External links (verify each one)
grep -r "http:/\|https:/" *.md *.sh *.py | grep -v "schema.org\|localhost\|github.com/openclaw"

# 4. Bundled scripts (read every one)
find . -name "*.sh" -o -name "*.py" -o -name "*.js" | head -20
```

## Red Flags — REJECT IMMEDIATELY
- ❌ `curl | bash` or `wget | sh` to non-official domains
- ❌ `xattr -d com.apple.quarantine` (bypasses Gatekeeper)
- ❌ Base64-encoded payloads
- ❌ "Required prerequisite" with suspicious links
- ❌ Obfuscated code

## Safe Patterns
- ✅ `curl | bash` to official domains (claude.ai, brew.sh, etc.)
- ✅ `pip install <package>` for known packages
- ✅ `brew install <package>` for Homebrew formulas
- ✅ Clear, readable scripts

## Audit Workflow
1. **Download but don't install** — `git clone` or manual download
2. **Run the checks above** — Look for red flags
3. **Read every bundled script** — If you can't understand it, don't run it
4. **Verify external links** — Check where they actually go
5. **Check provenance** — Who made this? Do they have reputation?
6. **Only then install** — After passing all checks
