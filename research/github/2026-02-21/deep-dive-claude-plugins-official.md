# Deep Dive: anthropics/claude-plugins-official

## Overview
- **Author:** Anthropic (official)
- **What:** Curated directory/marketplace of Claude Code plugins
- **Structure:** `/plugins` (Anthropic internal) + `/external_plugins` (third-party)

## Plugin Structure Standard
```
plugin-name/
├── .claude-plugin/
│   └── plugin.json    # Metadata (required)
├── .mcp.json          # MCP server config (optional)
├── commands/          # Slash commands (optional)
├── agents/            # Agent definitions (optional)
├── skills/            # Skill definitions (optional)
└── README.md
```

## Key Points
- Plugins can include MCP servers, slash commands, agents, and skills
- Third-party submissions via form at clau.de/plugin-directory-submission
- Must meet quality and security standards
- Install via `/plugin install {name}@claude-plugin-directory` or browse in `/plugin > Discover`

## Relevance to Us
- **We could publish plugins** — our research skills, XPERIENCE tools, or utility scripts
- **Plugin.json format** is worth adopting for our internal skills for compatibility
- **MCP integration** means our existing MCP servers (Context7, GitHub, etc.) could be packaged as plugins

## Recommendation
- Browse the available plugins for useful additions to our workflow
- Consider packaging 1-2 of our best skills as external plugin submissions
- Adopt the plugin.json metadata format for our skills directory
