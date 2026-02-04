# AI Design-to-Code Tools Research

*Research compiled: January 24, 2026*

## Executive Summary

The design-to-code landscape has evolved dramatically with AI-powered tools that transform visual designs into production code. This document covers major tools, emerging solutions, and recommendations for rapid prototyping workflows with Claude Code.

---

## 🔍 Specific Tools Researched

### 1. Pencil by @tomkrcha

**Status:** ⚠️ Could not locate publicly available tool

**What I Found:**
- @tomkrcha's GitHub shows a discontinued project called **DrawScript** (590 stars)
- DrawScript converted Illustrator shapes into graphics code (Obj-C, C++, JavaScript, JSON, etc.)
- No current "Pencil" repository found at github.com/tomkrcha/pencil

**Recommendation:** Check @tomkrcha's Twitter directly for announcements about "Pencil" - may be:
- A new/unreleased project
- Available via invite/waitlist
- Named differently in public releases

### 2. Flowy by @seejayhess

**Status:** ⚠️ Could not locate publicly available tool

**What I Found:**
- No GitHub profile found at github.com/seejayhess
- No public repositories or websites identified

**Recommendation:** Follow @seejayhess on Twitter for:
- Waitlist access
- Demo videos
- Official launch announcements

---

## 🛠️ Major Design-to-Code Tools

### Tier 1: Fully-Featured AI Builders

#### v0.dev (Vercel)
- **URL:** https://v0.app
- **Type:** Prompt-to-code web builder
- **Best For:** React/Next.js components
- **Features:**
  - Generate working apps from prompts
  - Design mode for visual fine-tuning
  - One-click Vercel deployment
  - GitHub sync
  - Template library
  - Agentic by default (plans, creates tasks, connects databases)
- **Pricing:** Free tier + paid plans
- **Claude Compatibility:** ⭐⭐⭐ (generates React code you can import)

#### Bolt.new (StackBlitz)
- **URL:** https://bolt.new
- **Type:** Chat-based app builder
- **Best For:** Full-stack web apps
- **Features:**
  - Natural language to code
  - In-browser development environment
  - Instant deployment
- **Claude Compatibility:** ⭐⭐⭐ (alternative to direct Claude coding)

#### Replit Agent
- **URL:** https://replit.com/ai
- **Type:** Natural language app builder
- **Best For:** Anyone (technical & non-technical)
- **Features:**
  - Describe idea → Agent builds it
  - Screenshot-to-app capability
  - Instant deployment
- **Claude Compatibility:** ⭐⭐ (separate platform, but exportable code)

---

### Tier 2: Screenshot/Image-to-Code

#### screenshot-to-code
- **URL:** https://github.com/abi/screenshot-to-code
- **Stars:** High activity, well-maintained
- **Type:** Open source, self-hosted
- **Supported Stacks:**
  - HTML + Tailwind
  - HTML + CSS
  - React + Tailwind
  - Vue + Tailwind
  - Bootstrap
  - Ionic + Tailwind
  - SVG
- **AI Models:**
  - Claude Opus 4.5 ⭐
  - Gemini 3 Flash/Pro ⭐
  - GPT-5.2, GPT-4.1
- **Features:**
  - Video/screen recording → prototype
  - Figma design support
  - Mock mode for development

**Installation:**
```bash
# Backend
cd backend
echo "ANTHROPIC_API_KEY=your-key" > .env
poetry install && poetry shell
poetry run uvicorn main:app --reload --port 7001

# Frontend
cd frontend
yarn && yarn dev
# Open http://localhost:5173
```

**Docker:**
```bash
echo "OPENAI_API_KEY=sk-your-key" > .env
docker-compose up -d --build
```

- **Claude Compatibility:** ⭐⭐⭐⭐⭐ (directly uses Claude, best option for screenshots)

---

### Tier 3: Canvas-Based Design Tools

#### tldraw + Make Real
- **URL:** https://tldraw.dev / https://github.com/tldraw/make-real
- **Type:** Infinite canvas SDK + AI code generation
- **Best For:** Sketching UI → code
- **How It Works:**
  1. Draw rough UI wireframes on tldraw canvas
  2. Select drawings and click "Make Real"
  3. AI generates working HTML/CSS/JS
- **Stack:** TypeScript, React, multiplayer sync
- **Claude Compatibility:** ⭐⭐⭐⭐ (works great with Claude vision)

#### Excalidraw
- **URL:** https://excalidraw.com
- **Type:** Virtual whiteboard
- **Best For:** Quick sketches + export for AI processing
- **Integration:** Export PNG → feed to Claude/screenshot-to-code

---

### Tier 4: Figma Integration Tools

#### Figma AI
- **URL:** https://figma.com/ai
- **Type:** Native Figma AI features
- **Features:**
  - **Figma Make:** Prompt any possibility
  - **Code Layers:** Interactive elements without coding
  - **MCP Server:** Connects to VS Code, Cursor, Windsurf, Claude
  - Image generation (Gemini 3.0 Pro, GPT Image 1)
  - Auto rename layers
  - Background removal
  - AI translation

#### Figma Code Connect
- **URL:** https://github.com/figma/code-connect
- **Type:** Design system → code bridge
- **Supported Frameworks:**
  - React (+ React Native)
  - Storybook
  - HTML (Web Components, Angular, Vue)
  - SwiftUI
  - Jetpack Compose
- **Best For:** Mature design systems
- **Requirement:** Organization/Enterprise Figma plan

**Installation:**
```bash
npm install @figma/code-connect
```

#### Builder.io
- **URL:** https://builder.io
- **Type:** AI frontend engineer platform
- **Features:**
  - **Fusion:** Build from scratch, Figma, or existing repos
  - Visual editor
  - Design system integration
  - Figma paste → code generation
- **Outputs:** React, Vue, Angular, Svelte, HTML
- **Claude Compatibility:** ⭐⭐⭐ (generates code you can modify with Claude)

---

### Tier 5: Website Builders with AI

#### Relume
- **URL:** https://relume.io
- **Type:** AI sitemap → wireframe → style guide
- **Workflow:**
  1. Prompt → Sitemap generation
  2. Sitemap → Wireframes (1000+ components)
  3. Wireframes → Style Guide
  4. Export to Figma, Webflow, or React
- **Component Library:** 1000+ components (Tailwind + shadcn/ui)
- **Best For:** Marketing websites, agencies
- **Claude Compatibility:** ⭐⭐⭐⭐ (React export works perfectly with Claude Code)

#### Framer AI
- **URL:** https://framer.com/ai
- **Type:** Website builder with AI
- **Features:**
  - Wireframer: chat → responsive pages
  - Workshop: custom components without code
  - AI Translate: one-click multi-language
  - AI Plugins: connect to OpenAI, Anthropic, Gemini

---

### Tier 6: VSCode Extensions

#### AIDE (nicepkg)
- **URL:** https://github.com/nicepkg/aide
- **Stars:** 2.7k+
- **Type:** VSCode extension
- **Features:**
  - **Smart Paste:** Image → code conversion
  - **Code Convert:** Any language → any language
  - **Code Viewer Helper:** Add comments
  - **AI Batch Processor:** Process multiple files
  - **Rename Variable:** AI-suggested names

**Installation:**
1. Open VS Code Extensions (Ctrl+Shift+X)
2. Search "Aide"
3. Click Install

---

## 📊 Comparison Matrix

| Tool | Input | Output | Claude Native | Self-Host | Free Tier | Best For |
|------|-------|--------|---------------|-----------|-----------|----------|
| screenshot-to-code | Image/Video | React/Vue/HTML | ✅ | ✅ | ✅ | Screenshots |
| v0.dev | Prompt | React/Next.js | ❌ | ❌ | ✅ | Components |
| tldraw Make Real | Canvas sketch | HTML/JS | ⚠️ | ✅ | ✅ | Wireframes |
| Figma MCP | Figma design | Context for Claude | ✅ | ❌ | ⚠️ | Design systems |
| Relume | Prompt | React/Webflow | ❌ | ❌ | ✅ | Full websites |
| Builder.io | Figma/Prompt | React/etc | ❌ | ❌ | ⚠️ | Enterprise |
| AIDE | Image paste | Code in editor | ⚠️ | N/A | ✅ | VSCode users |

---

## 🔄 JSON → Visual → Edit → Code Workflow Pattern

This is the emerging pattern for AI-assisted design-to-code:

```
┌─────────────────────────────────────────────────────────────────┐
│                    DESIGN-TO-CODE WORKFLOW                       │
└─────────────────────────────────────────────────────────────────┘

┌──────────┐    ┌──────────────┐    ┌──────────────┐    ┌────────┐
│  INPUT   │───▶│ JSON/Schema  │───▶│ Visual Edit  │───▶│  CODE  │
└──────────┘    └──────────────┘    └──────────────┘    └────────┘
     │                 │                   │                 │
     ▼                 ▼                   ▼                 ▼
  Prompt         Structured           Canvas/WYSIWYG     Production
  Sketch         Intermediate         Refinement         React/Vue
  Screenshot     Representation       Human-in-loop      Tailwind
  Figma                                                   
```

### Stage 1: Input Capture
- **Prompts:** Natural language descriptions
- **Screenshots:** Existing UI to replicate
- **Sketches:** Quick wireframes on canvas
- **Figma:** Professional design files

### Stage 2: JSON/Schema Intermediate
Many tools convert visual input to structured data:
```json
{
  "type": "Card",
  "props": {
    "title": "Product Name",
    "image": "url",
    "price": "$99"
  },
  "children": [
    {"type": "Button", "text": "Add to Cart"}
  ]
}
```

### Stage 3: Visual Editing
- Canvas-based manipulation (tldraw, Relume)
- WYSIWYG property editing
- Component swapping
- Layout adjustments

### Stage 4: Code Generation
- Framework-specific output
- Component library integration (shadcn/ui, etc.)
- Style token application

---

## 🎯 Tool Approaches Compared

### Canvas-Based (tldraw, Excalidraw)
**Pros:**
- Intuitive sketching
- Quick iteration
- Low barrier to entry

**Cons:**
- Less precise than Figma
- Requires AI interpretation of sketches
- May need multiple passes

**Best For:** Rapid ideation, wireframing, early concepts

### Screenshot-Based (screenshot-to-code, AIDE)
**Pros:**
- Reference existing UIs exactly
- Works with any visual source
- High fidelity

**Cons:**
- No semantic understanding
- Layout may not be responsive
- Can't edit before generation

**Best For:** Cloning existing UIs, converting designs to code

### Figma Plugin (Code Connect, Builder.io)
**Pros:**
- Professional design workflow
- Design system integration
- Team collaboration
- High precision

**Cons:**
- Requires Figma proficiency
- Enterprise features often paid
- More setup overhead

**Best For:** Teams with designers, production-ready code

---

## 🏆 Claude Code Recommendations

### Best Overall: screenshot-to-code
**Why:**
- Native Claude Opus 4.5 support
- Open source, self-hosted option
- Video-to-prototype capability
- Multiple framework outputs
- Active development

**Workflow with Claude Code:**
```bash
# 1. Generate initial code with screenshot-to-code
# 2. Copy generated React component
# 3. In Claude Code:
claude "Refactor this component to use our design tokens and add TypeScript types"
# 4. Iterate with Claude for refinements
```

### Best for Quick Prototypes: v0.dev + Claude Code
**Why:**
- Fastest prompt-to-component
- Immediate preview
- Export to Claude Code for refinement

**Workflow:**
```bash
# 1. Generate in v0.dev with prompt
# 2. Export React code
# 3. In Claude Code:
claude "Add these features to the component: [list features]"
```

### Best for Sketching: tldraw + Claude Vision
**Why:**
- Natural drawing interface
- Claude can interpret sketches directly
- Free and open source

**Workflow:**
```bash
# 1. Draw UI in tldraw
# 2. Export as PNG
# 3. In Claude Code:
claude "Convert this wireframe to a React component with Tailwind CSS" --image wireframe.png
```

---

## 📦 Rapid Prototyping Setup for Marb

### Recommended Stack:

```
┌─────────────────────────────────────────────────────────┐
│                  MARB'S PROTOTYPE STACK                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   1. Quick Ideas → v0.dev (browser)                     │
│      • Prompt components into existence                 │
│      • Preview instantly                                │
│      • Export when ready                                │
│                                                         │
│   2. Screenshot Reference → screenshot-to-code (local)  │
│      • Clone existing UIs                               │
│      • Use Claude Opus 4.5                              │
│      • Multiple framework outputs                        │
│                                                         │
│   3. Sketches → tldraw + Claude Code                    │
│      • Draw rough wireframes                            │
│      • Export PNG                                       │
│      • Feed to Claude with vision                       │
│                                                         │
│   4. Refinement → Claude Code                           │
│      • Add business logic                               │
│      • TypeScript types                                 │
│      • API integration                                  │
│      • Testing                                          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Local Setup Commands:

```bash
# 1. Clone screenshot-to-code
git clone https://github.com/abi/screenshot-to-code
cd screenshot-to-code

# 2. Setup backend
cd backend
echo "ANTHROPIC_API_KEY=$ANTHROPIC_API_KEY" > .env
poetry install
poetry run uvicorn main:app --reload --port 7001

# 3. Setup frontend (new terminal)
cd frontend
yarn install
yarn dev

# 4. Open http://localhost:5173
```

---

## 🔮 Emerging Tools to Watch

### Not Yet Verified (From Twitter Mentions):
- **Pencil** by @tomkrcha - Canvas-based, Claude integration
- **Flowy** by @seejayhess - Unknown workflow, early stage

### Coming Soon:
- **Figma MCP Server** - Full Figma context in Claude
- **Claude Artifacts** - Direct visual preview in Claude.ai

---

## 📋 Action Items

1. **Set up screenshot-to-code locally** for high-quality UI cloning
2. **Bookmark v0.dev** for quick component generation
3. **Install AIDE VSCode extension** for image-paste-to-code
4. **Follow @tomkrcha and @seejayhess** for Pencil/Flowy updates
5. **Test Figma MCP server** when available for design system integration

---

## 📚 Resources

- screenshot-to-code: https://github.com/abi/screenshot-to-code
- v0.dev: https://v0.app
- tldraw: https://tldraw.dev
- Relume: https://relume.io
- Figma AI: https://figma.com/ai
- AIDE Extension: https://marketplace.visualstudio.com/items?itemName=nicepkg.aide-pro
- Claude Quickstarts: https://github.com/anthropics/claude-quickstarts

---

*Last updated: January 24, 2026*
