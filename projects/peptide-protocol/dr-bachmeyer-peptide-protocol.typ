#set page(margin: (x: 0.8in, y: 0.8in))
#set text(font: "Helvetica Neue", size: 10pt)
#set heading(numbering: "1.")

#align(center)[
  #text(size: 24pt, weight: "bold")[Dr. Trevor Bachmeyer's]
  #v(0.3em)
  #text(size: 28pt, weight: "bold")[Complete Protocol Guide]
  #v(1em)
  #text(size: 14pt, style: "italic")[Peptides, Compounds & Stacks for Longevity & Performance]
  #v(0.5em)
  #text(size: 11pt)[Compiled January 2026 | Version 2.0]
]

#v(1.5em)

#text(size: 9pt, fill: rgb("#666666"))[
*Disclaimer:* This document is for educational and research purposes only. It is not medical advice. Consult with a qualified healthcare professional before starting any protocol. Many compounds discussed are not FDA-approved for human use.
]

#v(1em)
#line(length: 100%, stroke: 0.5pt)
#v(1em)

= Introduction: Dr. Bachmeyer's Philosophy

Dr. Trevor Bachmeyer ("The Spartan") is the founder of The Awakening Challenge, The Spartan Army, CEO of SmashweRx, and Elite Biogenics. After surviving lung cancer at age 48, he dedicated himself to understanding and reversing the biological failures that cause disease and aging.

== The Three Fundamental Biological Failures

#box(fill: rgb("#f5f5f5"), inset: 10pt, radius: 4pt, width: 100%)[
*1. Systemic Inflammation* — Low-grade silent civil war; TNF-alpha, IL-6 attack your own tissues

*2. Insulin Resistance* — Cells become "deaf" to insulin; promotes fat storage, damages organs

*3. ATP Shortage (Mitochondrial Dysfunction)* — "You are only as young as your mitochondrial function"
]

== His Core Message
"The medical industrial complex does not want you healthy. They want you committed to managed decline. Real health is repairing the infrastructure."

#pagebreak()

= Quick Reference: All Compounds

#table(
  columns: (auto, auto, auto, auto, auto),
  inset: 6pt,
  align: (left, left, left, left, left),
  fill: (col, row) => if row == 0 { rgb("#333333") } else if calc.rem(row, 2) == 0 { rgb("#f9f9f9") } else { white },
  text(fill: white, weight: "bold", size: 9pt)[Compound],
  text(fill: white, weight: "bold", size: 9pt)[Type],
  text(fill: white, weight: "bold", size: 9pt)[Target],
  text(fill: white, weight: "bold", size: 9pt)[Dose],
  text(fill: white, weight: "bold", size: 9pt)[Frequency],
  [Retatrutide], [Peptide], [Metabolic], [2-12 mg], [Weekly],
  [BPC-157], [Peptide], [Repair], [200-500 mcg], [Daily],
  [MOTS-c], [Peptide], [Mitochondria], [200-1000 mcg], [Daily],
  [SS-31], [Peptide], [Mito ETC], [5-20 mg], [Daily],
  [TB-500], [Peptide], [Cardiac/Repair], [500-1000 mcg], [Daily],
  [Epithalon], [Peptide], [Telomeres], [5 mg], [Daily x20],
  [NAD+], [Coenzyme], [Energy/Sirtuins], [100-250 mg], [2-3x/week],
  [Methylene Blue], [Compound], [Mito Optimizer], [10-20 mg], [Daily],
  [Tesamorelin], [Peptide], [Growth Hormone], [1-2 mg], [Daily],
  [CJC-1295 no DAC], [Peptide], [GH Pulse], [100-300 mcg], [Daily],
  [Cerebrolysin], [Peptide Mix], [Cognitive], [5-10 mL], [Daily],
  [Alpha-GPC], [Supplement], [Acetylcholine], [300-600 mg], [Daily],
)

#pagebreak()

= Part 1: Core Peptides

== 1.1 Retatrutide — "The Guillotine"

#box(fill: rgb("#e8f4e8"), inset: 10pt, radius: 4pt, width: 100%)[
*Dr. Bachmeyer:* "It cuts off the head of everything that gets in your way... the most potent agent ever created for reversing insulin resistance."
]

*Mechanism:* Triple agonist targeting GLP-1, GIP, and Glucagon receptors
- Reverses insulin resistance by "changing the locks back"
- Weight loss via access to stored fat
- Reduces inflammation via GLP-1 receptors on immune cells
- Improves mitochondrial biogenesis

*Dosing Protocol:*
#table(
  columns: (auto, auto, auto),
  inset: 6pt,
  fill: (col, row) => if row == 0 { rgb("#4a7c4a") } else { white },
  text(fill: white, weight: "bold")[Phase], text(fill: white, weight: "bold")[Weekly Dose], text(fill: white, weight: "bold")[Duration],
  [Initial], [2 mg], [Weeks 1-4],
  [Escalation 1], [4 mg], [Weeks 5-8],
  [Escalation 2], [8 mg], [Weeks 9-12],
  [Maximum], [12 mg], [Week 13+],
)

*Administration:* Subcutaneous, once weekly | *Half-life:* ~6 days

---

== 1.2 BPC-157 — "Inspector Gadget of Repair"

#box(fill: rgb("#e8f0f4"), inset: 10pt, radius: 4pt, width: 100%)[
*Dr. Bachmeyer:* "Every scar that you just accepted, BPC says 'Hold my beer. Watch me.'"
]

*Mechanism:* Derived from gastric juice proteins
- Systemwide tissue repair (tendons, ligaments, gut, nerves, vessels)
- Suppresses NF-kappa B inflammatory pathway
- Increases insulin receptors on cells
- Upregulates VEGF for angiogenesis

*Dosing:* 200-500 mcg daily (split doses) | *Route:* Subcutaneous (near injury site)
*Cycle:* 4-8 weeks on, 2-4 weeks off

*Important:* NOT effective orally — destroyed by stomach acid

---

== 1.3 MOTS-c — "The Firmware Update"

#box(fill: rgb("#f4e8f0"), inset: 10pt, radius: 4pt, width: 100%)[
*Dr. Bachmeyer:* "It's the firmware update that all of your cells have been waiting for... encoded in mitochondrial DNA itself."
]

*Mechanism:* 16-amino-acid mitochondrial-derived peptide
- Activates AMPK pathway (master metabolic switch)
- Forces creation of new mitochondria (biogenesis)
- Improves insulin sensitivity dramatically
- Makes stress a training tool instead of destructive

*Dosing:* Start 200 mcg daily, titrate to 1000 mcg over 10 weeks
*Storage:* Use within 7 days of reconstitution (degrades faster)

---

== 1.4 SS-31 (Elamipretide) — "Laser Precision"

#box(fill: rgb("#f4f0e8"), inset: 10pt, radius: 4pt, width: 100%)[
*Dr. Bachmeyer:* "It makes every single bit of NAD+ exponentially more efficient."
]

*Mechanism:* Cardiolipin-targeted antioxidant
- Stabilizes inner mitochondrial membrane
- Improves ETC efficiency → 30-40% more ATP from same fuel
- Reduces free radical production at source
- Protects mitochondrial "failsafe" for cancer prevention

*Dosing:* 5-20 mg daily subcutaneous
*Synergy:* Pairs exceptionally well with MOTS-c and NAD+

---

== 1.5 TB-500 — "The Cardiac Regenerator"

#box(fill: rgb("#e8e8f4"), inset: 10pt, radius: 4pt, width: 100%)[
*Dr. Bachmeyer:* "It gives your heart something modern medicine says it can't have: *regeneration*."
]

*Mechanism:* Fragment of Thymosin Beta-4
- Drives actin polymerization for cell movement/repair
- Promotes angiogenesis and stem cell recruitment
- Reduces ischemic damage
- Cardiac tissue remodeling

*Dosing:* 500-1000 mcg daily | *Cycle:* 8-16 weeks
*Note:* Banned by WADA for athletic competition

---

== 1.6 Epithalon — "The Clock Stopper"

#box(fill: rgb("#f0f4e8"), inset: 10pt, radius: 4pt, width: 100%)[
*Dr. Bachmeyer:* "It saves you from the clock itself... literally extended lifespan in animal models."
]

*Mechanism:* Synthetic tetrapeptide
- Reactivates telomerase enzyme
- Lengthens telomeres (chromosome caps)
- Resets circadian rhythm via pineal gland
- Restores melatonin production

*Dosing:* 5 mg daily for 20 consecutive days, then 4-6 months off
*Timing:* Evening/bedtime to synergize with melatonin

#pagebreak()

= Part 2: Non-Peptide Compounds

== 2.1 NAD+ — "The Cellular Fuse"

#box(fill: rgb("#fff0e8"), inset: 10pt, radius: 4pt, width: 100%)[
*Dr. Bachmeyer:* "NAD+ is the insulation protecting your wiring. You're running on exposed, sparking, shorting-out wiring without it."
]

=== Why NAD+ Matters

*The Problem:*
- NAD+ is required for the Krebs cycle to function
- Without it, pyruvate can't enter mitochondria → no ATP
- By age 50, NAD+ levels are "a ghost" of what they were
- Also activates sirtuins (SIRT1, SIRT3, SIRT6) for DNA repair

*What Sirtuins Do:*
- *SIRT1:* Activates DNA repair, builds more mitochondria
- *SIRT3:* Tweaks mitochondrial machinery for max efficiency
- *SIRT6:* Reinforces DNA, protects telomeres

=== Delivery Methods (His Strong Opinion)

#table(
  columns: (auto, auto, auto),
  inset: 8pt,
  fill: (col, row) => if row == 0 { rgb("#c44") } else { white },
  text(fill: white, weight: "bold")[Method], text(fill: white, weight: "bold")[Verdict], text(fill: white, weight: "bold")[Why],
  [Oral NAD+], [❌ SCAM], ["Bioavailability is zero" - destroyed by digestion],
  [Oral NMN], [⚠️ Poor], [Needs enzymes that degrade with age],
  [Sublingual], [❌ No better], [Same destruction, marketing lies],
  [Subq Injection], [✅ ONLY way], ["Almost 100% bioavailability"],
)

*If taking oral NMN anyway:* Pair with Methylene Blue + MOTS-c to provide energy for enzymatic conversion

=== NAD+ Dosing Protocol

- *Dose:* 100-250 mg subcutaneous
- *Frequency:* 2-3x per week
- *Cycling:* "Why would you cycle off oxygen or water? It's physiological replacement."

---

== 2.2 Methylene Blue — "The Ultimate Biohack"

#box(fill: rgb("#e8f0ff"), inset: 10pt, radius: 4pt, width: 100%)[
*Dr. Bachmeyer:* "One of the most potent and underutilized therapeutic molecules... dirt cheap and solves so many problems it's almost frightening."
]

=== How It Works

*The Science:*
- Redux molecule (reduction-oxidation) — shuttles electrons
- Bypasses inefficient Complex 1 of the ETC
- Donates electrons directly to Cytochrome C (Complex 4)
- Like a shortcut road that bypasses a traffic jam

*Results:*
- Electron flow becomes smoother and more efficient
- Superoxide production collapses
- ATP production increases *30-40%*
- Reduces oxidative stress that causes DNA damage

=== What It Treats

- *Brain:* Crosses blood-brain barrier, supercharges neuronal mitochondria
- *Alzheimer's:* Inhibits tau tangle aggregation
- *MS:* Supports remyelination by energizing oligodendrocytes
- *Heart:* Cardioprotective, improves resistance to ischemia
- *Performance:* Increases endurance, reduces perceived exertion

=== Dosing

#box(fill: rgb("#f5f5f5"), inset: 10pt, radius: 4pt, width: 100%)[
*Form:* Pharmaceutical/USP-grade LIQUID only (NOT tablets/strips)

*Dose:* 10-20 mg orally, once daily

*Tablets = Garbage:* "First-pass metabolism destroys it. Pills are a placebo sold by companies capitalizing on a trend."

*Cycling:* Not required — "It normalizes function, doesn't override it"
]

=== Side Effects
- Blue tongue/teeth (temporary, harmless)
- Blue-green urine (normal)

#pagebreak()

= Part 3: Supporting Compounds

== 3.1 Growth Hormone Peptides

=== Tesamorelin + CJC-1295 (no DAC)

*Dr. Bachmeyer's Take:* "This is the pulsing growth hormone you need for deep sleep, tissue repair, muscle preservation, fat loss. The ultimate anabolic signal."

#table(
  columns: (auto, auto, auto, auto),
  inset: 6pt,
  fill: (col, row) => if row == 0 { rgb("#555") } else { white },
  text(fill: white, weight: "bold")[Peptide], text(fill: white, weight: "bold")[Dose], text(fill: white, weight: "bold")[Frequency], text(fill: white, weight: "bold")[Purpose],
  [Tesamorelin], [1-2 mg], [Daily (evening)], [GHRH analog, visceral fat loss],
  [CJC-1295 no DAC], [100-300 mcg], [Daily], [GH pulsing, no DAC = natural pulse],
)

*Why "no DAC":* Without Drug Affinity Complex, you pulse GH naturally instead of constant elevation

---

== 3.2 Cognitive Enhancers

=== Cerebrolysin

*Dr. Bachmeyer:* "The most powerful cognitive enhancer on earth. A freight train of neurotrophic factors."

- Porcine brain-derived peptide mixture
- Repairs damaged neurons, builds new connections
- Contains BDNF, NGF, and other growth factors
- *Dose:* 5-10 mL IM or IV, daily for 10-20 days

=== Alpha-GPC

- Raw material for acetylcholine synthesis
- Key neurotransmitter for memory and focus
- *Dose:* 300-600 mg orally, daily
- Pairs well with Cerebrolysin

#pagebreak()

= Part 4: Dr. Bachmeyer's Stacks

== 4.1 The Ultimate Longevity Stack

#box(fill: rgb("#f0fff0"), inset: 12pt, radius: 4pt, width: 100%)[
*"If you really want to knock this out of the park..."*

#table(
  columns: (auto, auto, auto),
  inset: 6pt,
  [*Compound*], [*Dose*], [*Purpose*],
  [NAD+ (subq)], [150-250 mg 2-3x/wk], [Foundation - cellular energy],
  [Tesamorelin], [1-2 mg daily], [GH release, tissue repair],
  [CJC-1295 no DAC], [100-300 mcg daily], [GH pulsing],
  [BPC-157], [250-500 mcg daily], [Systemwide repair],
  [SS-31], [10-20 mg daily], [Mitochondrial optimizer],
)
]

---

== 4.2 The Metabolic Reset Stack

#box(fill: rgb("#fff0f0"), inset: 12pt, radius: 4pt, width: 100%)[
*For insulin resistance, weight loss, metabolic dysfunction:*

#table(
  columns: (auto, auto, auto),
  inset: 6pt,
  [*Compound*], [*Dose*], [*Purpose*],
  [Retatrutide], [2-12 mg weekly], [Triple agonist - metabolic reset],
  [MOTS-c], [500-1000 mcg daily], [AMPK activation, mito biogenesis],
  [NAD+], [150 mg 2-3x/wk], [Energy production],
)

*Dr. Bachmeyer:* "Imagine Mod C, Retatrutide, and NAD+ together. What do you think would happen with your insulin sensitivity?"
]

---

== 4.3 The "Blue Matide" Cocktail

#box(fill: rgb("#f0f0ff"), inset: 12pt, radius: 4pt, width: 100%)[
*His methylene blue foundation stack:*

#table(
  columns: (auto, auto, auto),
  inset: 6pt,
  [*Compound*], [*Dose*], [*Level*],
  [Methylene Blue], [10-20 mg oral], [Immediate energy - NOW],
  [MOTS-c], [500-1000 mcg subq], [Genetic signal - FUTURE],
  [Retatrutide], [4-12 mg weekly], [Systemic optimization - ENVIRONMENT],
)

*"They work on three different levels: immediate energy (methylene blue), genetic signaling (MOTS-c), and systemic regulation (retatrutide)."*
]

---

== 4.4 The Cognitive Stack

#box(fill: rgb("#fff8f0"), inset: 12pt, radius: 4pt, width: 100%)[
*For brain optimization:*

#table(
  columns: (auto, auto),
  inset: 6pt,
  [*Compound*], [*Dose*],
  [Cerebrolysin], [5-10 mL daily x 10-20 days],
  [Alpha-GPC], [300-600 mg daily],
  [NAD+ (subq)], [150 mg 2-3x/wk],
  [Methylene Blue], [10-15 mg daily],
)
]

---

== 4.5 The Cardiac Protection Stack

#box(fill: rgb("#f8f0f0"), inset: 12pt, radius: 4pt, width: 100%)[
*For heart health:*

#table(
  columns: (auto, auto, auto),
  inset: 6pt,
  [*Compound*], [*Dose*], [*Why*],
  [TB-500], [750-1000 mcg daily], [Cardiac regeneration],
  [BPC-157], [250-500 mcg daily], [Vascular repair],
  [Retatrutide], [4-12 mg weekly], [Cardioprotective effects],
  [Methylene Blue], [15-20 mg daily], [Cardiac mitochondria],
)
]

#pagebreak()

= Part 5: Practical Information

== Reconstitution Guide

#table(
  columns: (auto, auto, auto, auto),
  inset: 6pt,
  fill: (col, row) => if row == 0 { rgb("#333") } else if calc.rem(row, 2) == 0 { rgb("#f5f5f5") } else { white },
  text(fill: white, weight: "bold")[Peptide], text(fill: white, weight: "bold")[Vial], text(fill: white, weight: "bold")[BAC Water], text(fill: white, weight: "bold")[Concentration],
  [Retatrutide], [10 mg], [2.0 mL], [5.0 mg/mL],
  [BPC-157], [5 mg], [2.0 mL], [2.5 mg/mL],
  [MOTS-c], [10 mg], [3.0 mL], [3.33 mg/mL],
  [TB-500], [5 mg], [3.0 mL], [1.67 mg/mL],
  [Epithalon], [10 mg], [2.0 mL], [5.0 mg/mL],
  [NAD+], [100 mg], [2.0 mL], [50 mg/mL],
)

== Storage
- *Lyophilized:* Freeze at -20°C (-4°F)
- *Reconstituted:* Refrigerate 2-8°C (35-46°F)
- *Shelf life:* Most 2-4 weeks; MOTS-c only 7 days

== Injection Sites
- Abdomen (2" from navel)
- Upper thighs
- Upper arms
- Rotate sites to prevent lipohypertrophy

#pagebreak()

= Important Disclaimers

#box(fill: rgb("#fff5f5"), inset: 12pt, radius: 4pt, width: 100%)[
*Legal Status:*
- Most peptides sold for "research purposes only"
- Not FDA-approved for human use
- Retatrutide expected FDA approval: 2027
- TB-500 banned by WADA

*Medical Disclaimer:*
- This is educational, not medical advice
- Consult healthcare provider before use
- Individual responses vary
- Report adverse reactions to a professional

*Contraindications:*
- Active cancer (angiogenic peptides)
- Pregnancy/breastfeeding
- Certain autoimmune conditions
- Always disclose to healthcare providers
]

#v(2em)

#align(center)[
  #text(size: 12pt, style: "italic")[
    "You're not old. You are under-repaired."
    
    "The power is not in some new billion-dollar drug. It's in very old, simple truth they've been trying to hide."
    
    — Dr. Trevor Bachmeyer
  ]
]

#v(1em)
#line(length: 100%, stroke: 0.5pt)

#text(size: 8pt, fill: rgb("#666"))[
*Sources:* Dr. Trevor Bachmeyer YouTube (Unbreakable Podcast episodes 239, 251, 298), Phase 2/3 Clinical Trials, PeptideDosages.com

*Version:* 2.0 | January 2026 | For educational purposes only
]
