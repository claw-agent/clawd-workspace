# Skills.sh Skill Catalog

**Research Date:** 2026-01-26  
**Source:** [skills.sh](https://skills.sh), [github.com/anthropics/skills](https://github.com/anthropics/skills), [agentskills.io](https://agentskills.io)

---

## What Are Agent Skills?

Skills are **folders of instructions, scripts, and resources that agents can discover and load dynamically** to improve performance on specialized tasks. Think of them as "onboarding guides" for AI agents—they transform general-purpose agents into specialized agents equipped with procedural knowledge.

### Key Concepts

- **Progressive Disclosure**: Skills load context only as needed (metadata → SKILL.md → additional files)
- **Portable & Composable**: Same skill works across multiple agent products
- **Self-Contained**: Each skill directory contains a SKILL.md plus supporting resources
- **Code Execution**: Skills can bundle Python/JS scripts for deterministic operations

---

## Official Anthropic Skills Catalog

### 🎨 Creative & Design Skills

| Skill | Description | Use Cases |
|-------|-------------|-----------|
| **algorithmic-art** | Creating algorithmic art using p5.js with seeded randomness and interactive parameter exploration | Generative art, flow fields, particle systems, computational aesthetics |
| **canvas-design** | Create beautiful visual art in .png and .pdf documents using design philosophy | Posters, visual art, static designs |
| **frontend-design** | Create distinctive, production-grade frontend interfaces with high design quality | Web components, landing pages, dashboards, React components, HTML/CSS layouts |
| **theme-factory** | Toolkit for styling artifacts with pre-set themes (colors/fonts) | Apply consistent styling to slides, docs, reports, HTML pages |
| **slack-gif-creator** | Utilities for creating animated GIFs optimized for Slack | Emoji GIFs, message animations |

### 📄 Document Skills

| Skill | Description | Use Cases |
|-------|-------------|-----------|
| **docx** | Comprehensive document creation, editing, and analysis with tracked changes | Creating/editing Word docs, redlining, comments |
| **pdf** | PDF manipulation: extract text/tables, create, merge/split, handle forms | Fill forms, process PDFs programmatically |
| **pptx** | Presentation creation, editing, and analysis | PowerPoint files, speaker notes, layouts |
| **xlsx** | Spreadsheet creation, editing with formulas, formatting, data analysis | Financial models, data analysis, Excel automation |

### 🛠️ Development & Technical Skills

| Skill | Description | Use Cases |
|-------|-------------|-----------|
| **mcp-builder** | Guide for creating high-quality MCP servers (Python FastMCP or Node/TS SDK) | Building MCP integrations, API connectors |
| **webapp-testing** | Toolkit for testing local web applications using Playwright | UI testing, debugging, screenshots, browser logs |
| **web-artifacts-builder** | Suite for creating multi-component claude.ai HTML artifacts (React, Tailwind, shadcn/ui) | Complex web artifacts requiring state management |
| **skill-creator** | Guide for creating effective skills | Building new skills, extending Claude's capabilities |

### 💼 Enterprise & Communication Skills

| Skill | Description | Use Cases |
|-------|-------------|-----------|
| **brand-guidelines** | Applies Anthropic's official brand colors and typography | Brand-consistent documents, styling |
| **internal-comms** | Resources for internal communications in company formats | 3P updates, newsletters, FAQs, status reports |
| **doc-coauthoring** | Structured workflow for co-authoring documentation | Writing docs, proposals, technical specs, decision docs |

---

## Skill Architecture Deep-Dive

### Basic Structure
```
skill-name/
├── SKILL.md          # Required: YAML frontmatter + instructions
├── reference.md      # Optional: detailed reference docs
├── forms.md          # Optional: specific workflow docs
├── scripts/          # Optional: executable code
│   ├── unpack.py
│   └── bundle.sh
└── examples/         # Optional: example files
```

### SKILL.md Format
```yaml
---
name: my-skill-name
description: A clear description of what this skill does and when to use it
license: Complete terms in LICENSE.txt
---

# Skill Title

[Instructions Claude follows when skill is active]

## When to Use
- Trigger condition 1
- Trigger condition 2

## Workflow
1. Step one
2. Step two

## Guidelines
- Rule 1
- Rule 2
```

### Progressive Disclosure Pattern

```
Level 1: Metadata (name + description) → Always loaded in system prompt
Level 2: SKILL.md body → Loaded when Claude deems skill relevant
Level 3: Additional files → Loaded only as needed for specific tasks
```

---

## Notable Patterns from Official Skills

### 1. **Philosophy-First Design** (algorithmic-art, canvas-design)
Start with conceptual/aesthetic direction BEFORE implementation. Creates more distinctive, intentional outputs.

### 2. **Workflow-Based** (doc-coauthoring)
Structured multi-stage workflows:
- Stage 1: Context Gathering
- Stage 2: Refinement & Structure  
- Stage 3: Reader Testing

### 3. **Decision Trees** (docx, webapp-testing)
Clear routing logic:
```
Task → Is it X? → Yes → Use workflow A
                → No → Is it Y? → Yes → Use workflow B
                               → No → Use workflow C
```

### 4. **Code + Instructions Hybrid** (pdf, xlsx)
- Instructions for conceptual guidance
- Bundled scripts for deterministic operations
- Scripts are black-box utilities (don't need to read source)

### 5. **Anti-Pattern Lists** (frontend-design)
Explicitly list what NOT to do:
- ❌ Generic AI aesthetics
- ❌ Overused fonts (Inter, Roboto)
- ❌ Cliché color schemes (purple gradients)

---

## Partner Skills

- **Notion** - [Notion Skills for Claude](https://www.notion.so/notiondevs/Notion-Skills-for-Claude-28da4445d27180c7af1df7d8615723d0)

---

## Installation Methods

### Claude Code
```bash
/plugin marketplace add anthropics/skills
/plugin install document-skills@anthropic-agent-skills
/plugin install example-skills@anthropic-agent-skills
```

### Skills.sh CLI
```bash
npx skills add owner/repo
```

### Supported Agents
- Claude Code, Claude.ai, Claude API
- Cursor, Windsurf, Cline
- GitHub Copilot, Goose
- Amp Code, OpenCode, Roo Code
- Gemini, Codex, Kilo, Kiro, Factory AI, Trae

---

## Key Takeaways for Building Skills

1. **Concise is Key**: Context window is precious—only add what Claude doesn't already know
2. **Challenge Every Token**: "Does this paragraph justify its token cost?"
3. **Match Freedom to Fragility**: Text instructions for heuristic tasks, code for deterministic operations
4. **Progressive Disclosure**: Let Claude load context incrementally
5. **Test with Real Tasks**: Build evaluation-first, iterate based on observed behavior
