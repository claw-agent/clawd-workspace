# Document Generation Cheatsheet

Quick reference for AI-assisted document generation.

## PDF Generation (Typst)

```bash
# Basic compile
typst compile input.typ output.pdf

# Watch mode
typst watch input.typ

# List available fonts
typst fonts

# Use specific font path
typst compile --font-path ./fonts input.typ output.pdf
```

### Typst Quick Syntax

```typst
// Headings
= Heading 1
== Heading 2
=== Heading 3

// Text formatting
*bold*  _italic_  `code`

// Lists
- Bullet item
- Another item
  - Nested

+ Numbered
+ Items

// Links
#link("https://example.com")[Link text]

// Images
#image("path/to/image.png", width: 50%)

// Tables
#table(
  columns: 3,
  [Header 1], [Header 2], [Header 3],
  [Cell 1], [Cell 2], [Cell 3],
)

// Code blocks
```python
def hello():
    print("Hello")
```

// Variables
#let name = "World"
Hello, #name!

// Loops
#for i in range(5) [
  Item #i
]
```

---

## Presentations (Marp)

```bash
# Install
npm install -g @marp-team/marp-cli

# Convert to PDF
marp slides.md --pdf

# Convert to PowerPoint
marp slides.md --pptx

# Convert to HTML
marp slides.md --html

# Custom theme
marp slides.md --theme theme.css --pdf
```

### Marp Quick Syntax

```markdown
---
marp: true
theme: default
paginate: true
---

# Slide 1

Content here

---

# Slide 2

More content

---

<!-- _class: lead -->

# Centered Title Slide
```

---

## HTML to PDF (WeasyPrint)

```bash
# Basic conversion
weasyprint input.html output.pdf

# From URL
weasyprint https://example.com page.pdf

# With custom CSS
weasyprint input.html output.pdf --stylesheet print.css
```

### Python Integration

```python
from weasyprint import HTML, CSS

# From file
HTML('document.html').write_pdf('output.pdf')

# From string
HTML(string='<h1>Hello</h1>').write_pdf('output.pdf')

# With Jinja2
from jinja2 import Template
template = Template(open('template.html').read())
html = template.render(title="Report", items=[...])
HTML(string=html).write_pdf('output.pdf')
```

---

## PowerPoint (python-pptx)

```python
from pptx import Presentation
from pptx.util import Inches, Pt

# Create new presentation
prs = Presentation()

# Add slide
layout = prs.slide_layouts[1]  # Title and Content
slide = prs.slides.add_slide(layout)

# Set title
slide.shapes.title.text = "Slide Title"

# Add bullet points
body = slide.placeholders[1]
tf = body.text_frame
tf.text = "First bullet"
p = tf.add_paragraph()
p.text = "Second bullet"
p.level = 1  # Indent

# Save
prs.save('presentation.pptx')
```

---

## Professional Colors

```
# Conservative
Navy:       #1a365d
Dark Gray:  #2d3748
Light Gray: #f7fafc
Blue:       #3182ce

# Modern
Indigo:     #6366f1
Emerald:    #10b981
Slate:      #1a202c
Light:      #f3f4f6

# Status
Success:    #38a169
Warning:    #d69e2e
Error:      #e53e3e
Info:       #3182ce
```

---

## Typography Rules

| Property | Print | Web |
|----------|-------|-----|
| Font size | 10-12pt | 15-25px |
| Line height | 120-145% | 1.5-1.75 |
| Line length | 45-90 chars | Same |
| Margins | 1" minimum | 24px+ |

**Font Stack:**
```css
font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
```

---

## Quick Workflow

```bash
#!/bin/bash
# generate-docs.sh

# 1. Generate report PDF
typst compile report.typ report.pdf

# 2. Generate presentation
marp presentation.md --pdf

# 3. Generate invoice
weasyprint invoice.html invoice.pdf

echo "All documents generated!"
```
