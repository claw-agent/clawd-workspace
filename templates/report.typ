// Bjorn's Brew Report Template
#set page(margin: (x: 1in, y: 1in))
#set text(font: "Helvetica Neue", size: 11pt)
#set heading(numbering: "1.")
#set par(justify: true)

// Colors
#let brand-green = rgb("#226246")
#let brand-beige = rgb("#F5EDE4")

// Title block
#align(center)[
  #rect(fill: brand-green, width: 100%, inset: 20pt)[
    #text(fill: white, size: 24pt, weight: "bold")[#title]
    #v(0.3em)
    #text(fill: white.darken(10%), size: 12pt)[#subtitle]
  ]
]

#v(0.5em)
#align(right)[#text(fill: gray, size: 10pt)[#date]]
#v(1em)

#content
