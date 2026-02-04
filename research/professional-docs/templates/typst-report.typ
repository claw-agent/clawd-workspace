// Professional Report Template for AI-Generated Content
// Usage: typst compile report.typ output.pdf

#let report(
  title: "Report Title",
  subtitle: none,
  author: "Author Name",
  date: datetime.today(),
  logo: none,
  accent-color: rgb("#3182ce"),
  body
) = {
  // Document metadata
  set document(title: title, author: author)
  
  // Page setup
  set page(
    paper: "us-letter",
    margin: (top: 1.25in, bottom: 1in, left: 1in, right: 1in),
    header: context {
      if counter(page).get().first() > 1 [
        #set text(9pt, fill: gray)
        #title
        #h(1fr)
        #date.display("[month repr:long] [day], [year]")
      ]
    },
    footer: context {
      set text(9pt, fill: gray)
      h(1fr)
      counter(page).display("1 / 1", both: true)
      h(1fr)
    }
  )
  
  // Typography
  set text(font: "Inter", size: 11pt, fill: rgb("#1a202c"))
  set par(leading: 0.65em, justify: true)
  
  // Headings
  set heading(numbering: "1.1")
  show heading.where(level: 1): it => {
    pagebreak(weak: true)
    v(0.5em)
    text(18pt, weight: "bold", fill: accent-color)[#it]
    v(0.3em)
  }
  show heading.where(level: 2): it => {
    v(0.8em)
    text(14pt, weight: "bold")[#it]
    v(0.3em)
  }
  
  // Links
  show link: set text(fill: accent-color)
  
  // Code blocks
  show raw.where(block: true): it => {
    set text(9pt)
    block(
      fill: rgb("#f7fafc"),
      inset: 12pt,
      radius: 4pt,
      width: 100%,
      it
    )
  }
  
  // Tables
  set table(
    stroke: 0.5pt + rgb("#e2e8f0"),
    inset: 8pt,
  )
  
  // Title page
  {
    set page(header: none, footer: none)
    
    if logo != none {
      place(top + right, image(logo, height: 1in))
    }
    
    v(3in)
    
    text(32pt, weight: "bold", fill: accent-color)[#title]
    
    if subtitle != none {
      v(0.5em)
      text(16pt, fill: gray)[#subtitle]
    }
    
    v(2em)
    line(length: 3in, stroke: 2pt + accent-color)
    v(2em)
    
    text(12pt)[#author]
    v(0.5em)
    text(11pt, fill: gray)[#date.display("[month repr:long] [day], [year]")]
    
    pagebreak()
  }
  
  // Table of contents
  {
    heading(outlined: false, numbering: none)[Contents]
    outline(indent: 1.5em, depth: 2)
    pagebreak()
  }
  
  body
}

// Helper functions
#let note(body) = {
  block(
    fill: rgb("#ebf8ff"),
    inset: 12pt,
    radius: 4pt,
    width: 100%,
    [💡 *Note:* #body]
  )
}

#let warning(body) = {
  block(
    fill: rgb("#fffaf0"),
    inset: 12pt,
    radius: 4pt,
    width: 100%,
    [⚠️ *Warning:* #body]
  )
}

#let metric(label, value, change: none) = {
  box(
    fill: rgb("#f7fafc"),
    inset: 16pt,
    radius: 8pt,
    [
      #text(10pt, fill: gray)[#label]
      #v(4pt)
      #text(24pt, weight: "bold")[#value]
      #if change != none {
        text(11pt, fill: if change.starts-with("+") { rgb("#38a169") } else { rgb("#e53e3e") })[ #change]
      }
    ]
  )
}

// Example usage (uncomment to test)
/*
#show: report.with(
  title: "Q4 2025 Performance Report",
  subtitle: "Annual Review & 2026 Outlook",
  author: "Finance Team",
  accent-color: rgb("#6366f1"),
)

= Executive Summary

This report summarizes our Q4 performance and outlines strategic priorities for 2026.

#grid(
  columns: 3,
  gutter: 16pt,
  metric("Revenue", "$2.4M", change: "+15%"),
  metric("Users", "45,000", change: "+22%"),
  metric("NPS Score", "72", change: "+8"),
)

= Financial Performance

== Revenue Analysis

Revenue increased by 15% compared to Q3, driven primarily by enterprise sales.

#table(
  columns: (1fr, 1fr, 1fr),
  [*Segment*], [*Q3*], [*Q4*],
  [Enterprise], [$1.2M], [$1.5M],
  [SMB], [$600K], [$650K],
  [Consumer], [$300K], [$250K],
)

#note[Enterprise segment showed strongest growth at 25% QoQ.]

== Cost Structure

Operating expenses remained stable while revenue grew.

= Strategic Initiatives

== Product Roadmap

Key releases planned for Q1 2026:
- Mobile application launch
- API v2.0
- Enterprise SSO

#warning[Mobile launch delayed from original December target.]

= Conclusion

Strong quarter overall with clear momentum heading into 2026.
*/
