# McKinsey-Style Consulting Report — Prompt Template

## Usage
Replace [YOUR ANALYSIS REQUEST] with the topic. Claude generates HTML → render with WeasyPrint to PDF.

## The Prompt

```
[YOUR ANALYSIS REQUEST HERE - e.g., "Conduct a comprehensive analysis of the roofing contractor market in Salt Lake City, focusing on pricing, competition, service mix, and growth opportunities."]

Output as a single self-contained HTML page styled as a McKinsey/BCG consulting slide deck:

Core Content & Layout:
1. Rich Data Visualization: Complex, precise charts (stacked bar charts, waterfall charts, line graphs) and detailed data tables. Use inline SVG or Chart.js CDN.
2. Structured Frameworks: Strategic diagrams or 2x2 matrices with thin, clean lines.
3. High Information Density: Multi-column layout mimicking an actual business analysis deck, not just a cover page.

Visual Style:
1. Aesthetic: Tech-minimalist but information-heavy. Clean, sharp, authoritative.
2. Typography: Serif fonts (Times New Roman) for headlines; clean sans-serif for chart labels and data.
3. Color Palette: White background. Sharp black text. Deep Royal Blue (#1B3A6B) and distinct greys for data hierarchy.
4. Graphics: Hairline borders for tables, precise vector lines for graphs.
5. Page size: US Letter, print-friendly margins.

Make it look like a real consulting deck page with multiple sections, not a single slide.
```

## Rendering
```bash
# Save Claude's output as report.html, then:
weasyprint report.html report.pdf
```

## Source
Extracted from @crystalsssup's Kimi K2.5 technique (3.3K likes)
Adapted for Claude + WeasyPrint pipeline
