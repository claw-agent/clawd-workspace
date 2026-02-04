---
marp: true
theme: default
paginate: true
backgroundColor: #ffffff
style: |
  section {
    font-family: 'Inter', 'Helvetica Neue', sans-serif;
  }
  h1 {
    color: #1a365d;
  }
  h2 {
    color: #2d3748;
  }
  a {
    color: #3182ce;
  }
  section.lead {
    text-align: center;
    background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%);
    color: white;
  }
  section.lead h1 {
    color: white;
    font-size: 2.5em;
  }
  section.lead h2 {
    color: #90cdf4;
  }
  .columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  .metric {
    background: #f7fafc;
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
  }
  .metric-value {
    font-size: 2em;
    font-weight: bold;
    color: #3182ce;
  }
  .metric-label {
    font-size: 0.9em;
    color: #718096;
  }
  table {
    font-size: 0.85em;
  }
---

<!-- _class: lead -->

# Presentation Title
## Subtitle or Date

Your Name | Company

---

# Agenda

1. Introduction
2. Key Findings
3. Analysis
4. Recommendations
5. Next Steps

---

# Key Metrics

<div class="columns">

<div class="metric">
<div class="metric-value">$2.4M</div>
<div class="metric-label">Revenue (+15%)</div>
</div>

<div class="metric">
<div class="metric-value">45,000</div>
<div class="metric-label">Active Users (+22%)</div>
</div>

<div class="metric">
<div class="metric-value">72</div>
<div class="metric-label">NPS Score (+8)</div>
</div>

<div class="metric">
<div class="metric-value">98.5%</div>
<div class="metric-label">Uptime</div>
</div>

</div>

---

# Data Table

| Quarter | Revenue | Growth | Users |
|---------|---------|--------|-------|
| Q1 2025 | $1.8M | +8% | 32,000 |
| Q2 2025 | $2.0M | +11% | 36,000 |
| Q3 2025 | $2.1M | +5% | 39,000 |
| Q4 2025 | $2.4M | +15% | 45,000 |

---

# Two-Column Layout

<div class="columns">

<div>

## Left Column

- Point one
- Point two
- Point three
- Point four

</div>

<div>

## Right Column

- Another point
- More details
- Supporting info
- Final note

</div>

</div>

---

# Code Example

```python
def analyze_data(dataset):
    """Process and analyze the dataset."""
    results = []
    for item in dataset:
        processed = transform(item)
        results.append(processed)
    return aggregate(results)
```

---

# Image Placeholder

![bg right:40% 80%](https://via.placeholder.com/400x300)

## Visual Content

- Images can be positioned
- Background images supported
- Multiple layouts available
- Diagrams work great

---

<!-- _class: lead -->

# Thank You

Questions?

**contact@example.com**

---

<!--
MARP CLI COMMANDS:

# Convert to PDF
marp slides.md --pdf

# Convert to PowerPoint
marp slides.md --pptx

# Convert to HTML
marp slides.md --html

# Use custom theme
marp slides.md --theme ./custom-theme.css --pdf

# Enable all HTML features
marp slides.md --pdf --allow-local-files

-->
