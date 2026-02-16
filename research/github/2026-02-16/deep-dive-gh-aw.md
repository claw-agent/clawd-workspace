# Deep Dive: github/gh-aw

## Overview
GitHub Agentic Workflows — write agentic workflows in natural language markdown, run them in GitHub Actions. Official GitHub project (via GitHub Next).

## Key Details
- **Maintainer:** GitHub (official)
- **Status:** Public, active development
- **Docs:** https://github.github.com/gh-aw/

## How It Works
- Write workflows as natural language markdown files
- System compiles them into GitHub Actions
- AI agents execute tasks within sandboxed environments
- Read-only permissions by default; write ops only through sanitized safe-outputs

## Security Architecture (Impressive)
- Sandboxed execution
- Input sanitization
- Network isolation
- Supply chain security (SHA-pinned dependencies)
- Tool allow-listing
- Compile-time validation
- Human approval gates for critical operations
- Team-gated access

## Companion Projects
- **Agent Workflow Firewall (AWF):** Network egress control for AI agents — domain-based access controls + activity logging
- **MCP Gateway:** Routes MCP server calls through unified HTTP gateway for centralized access management

## Relevance to Us
**Medium-High.** We use GitHub for repos but don't yet have AI-powered CI/CD workflows. This could:
1. Automate code review, testing, and deployment with AI agents
2. The MCP Gateway pattern is interesting for our multi-agent setup
3. The security architecture is a good reference for our own agent safety patterns

## Action Items
- [ ] Read the full docs at github.github.com/gh-aw/
- [ ] Try the Quick Start guide on a test repo
- [ ] Evaluate the Agent Workflow Firewall for our agent security needs
