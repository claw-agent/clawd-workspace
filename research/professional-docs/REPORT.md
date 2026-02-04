# Professional Document Generation for AI Assistants
*Research Report — January 2026*

## Executive Summary

This report evaluates tools and best practices for programmatic document generation, focusing on solutions that work well with AI-generated content on macOS. **Top recommendations: Typst for PDFs, Marp for presentations.**

---

## 1. PDF Generation Tools

### Comparison Matrix

| Tool | Learning Curve | Speed | Quality | Automation | Best For |
|------|---------------|-------|---------|------------|----------|
| **Typst** | ⭐⭐⭐⭐⭐ Easy | ⭐⭐⭐⭐⭐ Fast | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Modern docs, reports |
| LaTeX | ⭐⭐ Steep | ⭐⭐⭐ Slow | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | Academic papers |
| **WeasyPrint** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | HTML→PDF, invoices |
| Prince | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Publishing-grade |

### 1.1 Typst ⭐ RECOMMENDED

**Status:** Installed (v0.14.2)

Typst is a modern markup-based typesetting system designed as a LaTeX alternative. It's the **best choice for AI workflows**.

**Strengths:**
- Blazing fast compilation (instant previews)
- Clean, readable syntax similar to Markdown
- Rich ecosystem via [Typst Universe](https://typst.app/universe/)
- Built-in templates for CVs, papers, presentations, reports
- Native scripting with loops, conditionals, functions
- Perfect for programmatic generation

**CLI Usage:**
```bash
# Compile to PDF
typst compile input.typ output.pdf

# Watch mode with auto-refresh
typst watch input.typ

# Use a specific font path
typst compile --font-path ./fonts input.typ output.pdf
```

**Sample Document:**
```typst
#set document(title: "Report", author: "AI Assistant")
#set page(margin: 1in)
#set text(font: "Inter", size: 11pt)

= Quarterly Report

#let data = (
  ("Q1", 45000),
  ("Q2", 52000),
  ("Q3", 61000),
)

#table(
  columns: 2,
  [*Quarter*], [*Revenue*],
  ..data.flatten()
)
```

**Template Ecosystem:**
- `basic-resume` — ATS-friendly CVs
- `brilliant-cv` — Modern colorful resumes
- `touying` — Beamer-style presentations
- `starter-journal-article` — Academic papers
- 500+ packages on Typst Universe

### 1.2 WeasyPrint

**Status:** Installed (v68.0)

HTML/CSS to PDF converter. Best when you already have HTML templates or need web-like layouts.

**Strengths:**
- Uses familiar HTML/CSS
- Great for invoices, tickets, reports
- Supports CSS print media features
- Python integration available

**CLI Usage:**
```bash
weasyprint input.html output.pdf
weasyprint https://example.com page.pdf
```

**Best For:** Converting existing HTML templates, invoices, tickets, letterheads

### 1.3 LaTeX

**Overview:** The gold standard for academic typesetting, but complex for automation.

**Strengths:**
- Unmatched mathematical typesetting
- Massive template library
- Industry standard in academia

**Weaknesses:**
- Steep learning curve
- Slow compilation
- Cryptic error messages
- Hard to debug programmatically

**Verdict:** Use only for academic papers or when LaTeX is required. Otherwise, prefer Typst.

### 1.4 Prince

**Overview:** Commercial HTML→PDF converter with superb output quality.

**Strengths:**
- Publication-grade output
- Excellent CSS print support
- Used by major publishers

**Weaknesses:**
- Commercial license required ($3,800)
- Overkill for most uses

**Verdict:** Only consider for high-volume commercial publishing where budget allows.

---

## 2. Presentation Tools

### Comparison Matrix

| Tool | Format | Export Options | Ease of Use | Best For |
|------|--------|----------------|-------------|----------|
| **Marp** | Markdown | PDF, PPTX, HTML | ⭐⭐⭐⭐⭐ | Quick slides |
| Reveal.js | HTML/MD | HTML, PDF | ⭐⭐⭐⭐ | Interactive web |
| **Slidev** | Markdown | PDF, SPA, PPTX | ⭐⭐⭐⭐ | Dev talks |
| Google Slides API | JSON | Various | ⭐⭐⭐ | G-Suite integration |
| python-pptx | Python | PPTX | ⭐⭐⭐⭐ | Office workflows |

### 2.1 Marp ⭐ RECOMMENDED

Markdown-based slide creation with excellent CLI support.

**Installation:**
```bash
npm install -g @marp-team/marp-cli
```

**CLI Usage:**
```bash
# To PDF
marp slides.md --pdf

# To PowerPoint
marp slides.md --pptx

# To HTML (self-contained)
marp slides.md --html

# With custom theme
marp slides.md --theme ./theme.css --pdf
```

**Sample Slides:**
```markdown
---
marp: true
theme: default
paginate: true
---

# Quarterly Review
## Q4 2025 Results

---

## Key Metrics

- Revenue: $2.4M (+15%)
- Users: 45,000 (+22%)
- NPS: 72 (+8)

---

## Next Steps

1. Launch mobile app
2. Expand to EU market
3. Hire 5 engineers
```

**Strengths:**
- Dead simple — just Markdown with `---` separators
- VS Code extension with live preview
- Exports to PDF, PPTX, HTML
- Custom themes via CSS
- Perfect for AI generation

### 2.2 Slidev

Vue-powered presentation framework for developers.

**Installation:**
```bash
npm init slidev@latest
```

**Features:**
- Live code execution
- Monaco editor integration
- Mermaid diagrams
- KaTeX math
- Recording capabilities
- Export to PDF/PPTX

**Best For:** Developer talks, technical presentations with code demos

**Syntax:**
```markdown
---
theme: seriph
---

# Welcome to Slidev

Presentation slides for developers

---

## Code Blocks

```ts {1|2|3}
const greeting = 'Hello'
const name = 'World'
console.log(`${greeting}, ${name}!`)
```

---
```

### 2.3 Reveal.js

The most feature-rich HTML presentation framework.

**Features:**
- Beautiful transitions and animations
- Nested slides (vertical navigation)
- Speaker notes
- Export to PDF
- Plugin ecosystem
- Visual editor at slides.com

**Best For:** Interactive web presentations, conference talks

### 2.4 python-pptx

Python library for creating/modifying PowerPoint files.

**Installation:**
```bash
pip install python-pptx
```

**Usage:**
```python
from pptx import Presentation
from pptx.util import Inches, Pt

prs = Presentation()
slide = prs.slides.add_slide(prs.slide_layouts[1])

title = slide.shapes.title
title.text = "AI-Generated Report"

body = slide.placeholders[1]
body.text = "Key findings from Q4 analysis"

prs.save('report.pptx')
```

**Best For:** 
- Modifying existing PowerPoint templates
- Generating slides from database queries
- Office-centric workflows

### 2.5 Google Slides API

Programmatic access to Google Slides.

**Features:**
- Full read/write access to presentations
- Template-based generation
- Real-time collaboration
- Integration with Google Workspace

**Best For:** Organizations using Google Workspace, collaborative documents

---

## 3. Professional Design Principles

### 3.1 Typography Best Practices

From *Butterick's Practical Typography*:

**Core Rules:**
- **Point size:** 10-12pt for print, 15-25px for web
- **Line spacing:** 120-145% of point size
- **Line length:** 45-90 characters (including spaces)
- **Font choice:** Use professional fonts, avoid system defaults

**Typography Don'ts:**
- ❌ Times New Roman or Arial (use professional alternatives)
- ❌ Multiple word spaces
- ❌ Underlining (except web links)
- ❌ Bold AND italic together
- ❌ All caps for more than one line
- ❌ Centered text (use sparingly)

**Typography Dos:**
- ✅ Curly quotes, not straight
- ✅ Proper em-dashes and en-dashes
- ✅ 5-12% letterspacing with caps/small caps
- ✅ Always enable kerning
- ✅ Hyphenation with justified text
- ✅ First-line indent OR paragraph spacing (not both)

### 3.2 Color Theory

**Professional Color Palettes:**

```
Primary palette (conservative):
- Navy: #1a365d
- White: #ffffff
- Light gray: #f7fafc
- Accent: #3182ce (blue)

Modern tech palette:
- Dark: #1a202c
- Primary: #6366f1 (indigo)
- Secondary: #10b981 (emerald)
- Light: #f3f4f6
```

**Color Rules:**
- Limit to 3-4 colors maximum
- 60-30-10 rule (primary-secondary-accent)
- Ensure sufficient contrast (WCAG 4.5:1 for text)
- Use color consistently throughout
- Consider color blindness (avoid red-green combinations)

### 3.3 White Space & Layout

**Principles:**
- Generous margins (1" minimum for print)
- Consistent spacing system (8px grid)
- Group related content
- Separate sections clearly
- Left-align body text
- Avoid orphans and widows

**Layout Grid:**
```
Desktop: 12-column grid
Print: 6-column or 9-column grid
Single column for readability-focused docs
```

### 3.4 Brand Consistency

**Elements to Standardize:**
- Logo placement and sizing
- Color palette (primary, secondary, accent)
- Typography scale (headings, body, captions)
- Spacing units
- Icon style
- Image treatment (rounded corners, shadows)

---

## 4. Template Systems

### 4.1 Typst Templates

**Creating Reusable Templates:**

```typst
// template.typ
#let report(
  title: "Report",
  author: "Author",
  date: datetime.today(),
  logo: none,
  body
) = {
  set document(title: title, author: author)
  set page(
    paper: "us-letter",
    margin: (top: 1.5in, rest: 1in),
    header: [
      #if logo != none { image(logo, height: 0.5in) }
      #h(1fr)
      #title
    ]
  )
  set text(font: "Inter", size: 11pt)
  
  // Title page
  align(center)[
    #v(2in)
    #text(24pt, weight: "bold")[#title]
    #v(1em)
    #text(14pt)[#author]
    #v(0.5em)
    #text(12pt, fill: gray)[#date.display()]
  ]
  pagebreak()
  
  body
}

// Usage
#import "template.typ": report

#show: report.with(
  title: "Q4 Financial Report",
  author: "Finance Team",
)

= Executive Summary
...
```

### 4.2 Marp Themes

**Custom CSS Theme:**
```css
/* theme.css */
@import 'default';

section {
  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, #1a365d 0%, #2d3748 100%);
  color: white;
}

h1 {
  color: #63b3ed;
  border-bottom: 2px solid #63b3ed;
}

code {
  background: rgba(255,255,255,0.1);
  border-radius: 4px;
}
```

### 4.3 Variable Injection

**Typst (JSON data):**
```typst
#let data = json("data.json")

#for item in data.items [
  == #item.title
  #item.description
]
```

**WeasyPrint (Jinja2):**
```html
{% for item in items %}
<div class="card">
  <h2>{{ item.title }}</h2>
  <p>{{ item.description }}</p>
</div>
{% endfor %}
```

**Marp (frontmatter):**
```markdown
---
marp: true
title: {{ title }}
---
# {{ title }}
{{ content }}
```

---

## 5. Recommendations for AI Workflows

### 5.1 Primary Stack

| Use Case | Tool | Why |
|----------|------|-----|
| **Reports/Documents** | Typst | Fast, readable syntax, great output |
| **Presentations** | Marp | Markdown-native, multi-format export |
| **Invoices/Tickets** | WeasyPrint | HTML/CSS familiarity |
| **PowerPoint needed** | python-pptx | Direct .pptx generation |

### 5.2 Automation Pipeline

```
AI generates content (Markdown/JSON)
        ↓
Template injection (variable substitution)
        ↓
Document compilation
        ↓
PDF/PPTX/HTML output
```

**Example Workflow (Bash):**
```bash
#!/bin/bash
# generate-report.sh

# 1. AI generates JSON data
echo '{"title": "Q4 Report", "revenue": 2400000}' > data.json

# 2. Generate Typst file with template
cat template.typ data.json | typst compile - report.pdf

# 3. Or for presentations
marp slides.md --pdf --output presentation.pdf
```

### 5.3 Best Practices for AI Generation

1. **Use structured intermediate formats**
   - JSON for data
   - Markdown for content
   - YAML for configuration

2. **Separate content from presentation**
   - Templates define styling
   - AI generates only content
   - Easy to rebrand or restyle

3. **Validate before compilation**
   - Check for required fields
   - Validate data types
   - Catch errors early

4. **Prefer text-based formats**
   - Easy to diff/review
   - Version control friendly
   - Simple to debug

### 5.4 Installation Commands

```bash
# Already installed on this system:
# - Typst v0.14.2
# - WeasyPrint v68.0

# To add Marp:
npm install -g @marp-team/marp-cli

# To add python-pptx:
pip install python-pptx

# To add Slidev:
npm init slidev@latest
```

---

## 6. Quick Reference

### Generate PDF Report
```bash
typst compile report.typ report.pdf
```

### Generate Presentation
```bash
marp slides.md --pdf
marp slides.md --pptx
```

### Generate Invoice (HTML→PDF)
```bash
weasyprint invoice.html invoice.pdf
```

### Python PowerPoint
```python
from pptx import Presentation
prs = Presentation('template.pptx')
# ... add content
prs.save('output.pptx')
```

---

## Appendix: Tool Installation Status

| Tool | Status | Version |
|------|--------|---------|
| Typst | ✅ Installed | 0.14.2 |
| WeasyPrint | ✅ Installed | 68.0 |
| Marp CLI | ❌ Not installed | — |
| python-pptx | ⚠️ Needs venv | — |
| Slidev | ❌ Not installed | — |

---

*Report generated by AI Assistant — January 2026*
