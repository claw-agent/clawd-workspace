#set page(margin: 1in)
#set text(font: "Helvetica", size: 11pt)
#set heading(numbering: "1.1")

#align(center)[
  #text(size: 24pt, weight: "bold")[MOVE App]
  
  #text(size: 18pt)[Refund Mechanic Feasibility Report]
  
  #v(0.5em)
  
  #text(size: 12pt, fill: gray)[Confidential — January 30, 2026]
]

#v(2em)

= Executive Summary

*Core Question: Can a fitness app charge \$12.99/month and refund 90% (\$11.69) when users hit their goals?*

#table(
  columns: (1fr, 3fr),
  stroke: 0.5pt + gray,
  inset: 8pt,
  [*Area*], [*Verdict*],
  [Technical (Stripe)], [✅ *FULLY FEASIBLE* — Partial refunds supported, no chargeback impact],
  [Technical (Apple)], [❌ *NOT FEASIBLE* — Apple controls all refunds, developers cannot issue],
  [Legal (MSB)], [✅ *LOW RISK* — Not money transmission (refund to same party)],
  [Legal (MTL)], [✅ *LOW RISK* — All 50 states: seller's exemption applies],
  [Custody], [✅ *NO SPECIAL OBLIGATIONS* — Not escrow, standard revenue accounting],
)

#v(1em)

#box(fill: rgb("#e8f5e9"), inset: 12pt, radius: 4pt)[
  *Bottom Line:* The refund mechanic IS feasible using *direct payments (Stripe)*. Apple In-App Purchases cannot support this model. No MSB or money transmitter licensing required.
]

#pagebreak()

= Technical Findings

== Stripe: Fully Supported ✅

=== Key Capabilities
- *Partial refunds* are natively supported via `stripe.refunds.create()`
- Any amount up to the original charge can be refunded
- *Refunds do NOT count toward chargeback ratios* — this was the primary concern

=== Chargeback Risk Assessment
#table(
  columns: (1fr, 1fr, 2fr),
  stroke: 0.5pt + gray,
  inset: 6pt,
  [*Metric*], [*Threshold*], [*Impact*],
  [Visa VAMP], [0.5% non-compliant], [Refunds excluded from calculation],
  [Mastercard ECM], [1.0% + 100 disputes], [Refunds excluded from calculation],
  [Your refund volume], [90% of successful users], [Zero impact on dispute ratios],
)

=== Implementation
```javascript
const refund = await stripe.refunds.create({
  payment_intent: 'pi_xxx',
  amount: 1169,  // 90% of $12.99 in cents
  reason: 'requested_by_customer',
  metadata: { type: 'goal_achievement_reward' }
});
```

=== Recommendation
*Use Stripe direct payments (not Apple IAP)* for full control over the refund mechanic.

#v(1em)

== Apple In-App Purchases: Not Feasible ❌

=== Critical Limitation
*Developers CANNOT programmatically issue refunds through Apple's APIs.*

The `beginRefundRequest()` API only allows users to *request* refunds — Apple makes all approval decisions.

=== Financial Problem
Even if refunds were possible:
- Apple takes 30% commission (Year 1) = You receive \$9.09
- Refunding \$11.69 when you only received \$9.09 = *Net loss of \$2.60 per successful user*

=== Alternative Approaches (if Apple IAP required)
1. *Subscription Extension API* — Give ~27 free days instead of cash
2. *In-app credits* — Reward with premium features
3. *Tiered pricing* — Price drops based on performance

#pagebreak()

= Legal Findings

== Money Services Business (MSB): LOW RISK ✅

=== Why This Is NOT Money Transmission

#box(inset: 10pt, fill: rgb("#fff3e0"), radius: 4pt)[
Money transmission requires transferring funds *from Person A to Person B*.

MOVE refunds money *to the same person who paid*. This is a conditional rebate, not transmission.
]

=== Key Legal Basis
- *31 CFR § 1010.100(ff)(5)* — Requires transmission "to another location or person"
- *"Integral to services" exemption* — 31 CFR § 1010.100(ff)(5)(ii)(F) explicitly exempts fund movements integral to providing services
- *Precedents:* Cashback cards, manufacturer rebates, gym refunds all work identically

=== Recommendation
Frame as "performance discount" rather than "earning money" in marketing materials.

#v(1em)

== State Money Transmitter Laws: LOW RISK ✅

=== 50-State Analysis Summary

#table(
  columns: (1fr, 1fr, 2fr),
  stroke: 0.5pt + gray,
  inset: 6pt,
  [*Jurisdiction*], [*Risk Level*], [*Notes*],
  [Federal (FinCEN)], [LOW], [No third-party transfer = not MSB],
  [New York], [MEDIUM-LOW], [Aggressive regulator, but logic applies],
  [California], [LOW], [Clear seller's exemption in § 2010],
  [Texas], [LOW], [Requires "to another person"],
  [Florida], [LOW], [Explicitly requires intermediary function],
  [All other states], [LOW], [Standard commercial refund],
)

=== Why Seller's Exemption Applies
- Company is refunding its *own service fees*
- No intermediary function (not holding funds for others)
- Same party on both sides of transaction

=== Recommendation
Obtain formal legal opinion before 50-state launch (~\$10K-25K) for additional protection.

#v(1em)

== Fund Custody: No Special Obligations ✅

=== Key Findings
- *NOT an escrow arrangement* — Fails all escrow tests (no neutral third party, no segregated funds)
- *Funds become company revenue* upon payment — The \$11.69 is a liability, not "customer funds"
- *Bankruptcy risk:* Users become general unsecured creditors (lowest priority)

=== Accounting Treatment
- Book \$12.99 revenue
- Accrue refund liability based on expected completion rate
- If 60% complete goals: ~\$7.01 liability, ~\$5.98 net revenue per user

=== Recommendation
Include clear Terms of Service language that funds are not held in escrow or trust.

#pagebreak()

= Alternative Mechanics (If Direct Refunds Don't Work)

If Apple IAP must be used, or for risk mitigation, consider these alternatives:

#table(
  columns: (auto, 2fr, 2fr),
  stroke: 0.5pt + gray,
  inset: 8pt,
  [*Rank*], [*Model*], [*Why It Works*],
  [🥇], [*Credit Model* — Earn \$11.69 toward next month], [Same psychology, avoids all refund complications],
  [🥈], [*Tiered Pricing* — Price drops \$12.99 → \$1.30 if goals hit], [Same outcome, different framing],
  [🥉], [*Deposit Model* — Only charged \$1.30 if goals hit], [Strongest psychology but requires web billing],
)

=== Credit Model Details
- Users see *dollar amounts* (not points)
- Credits *auto-apply* to next billing cycle
- No redemption friction
- Precedent: Beeminder, DietBet, HealthyWage all use financial stakes

#pagebreak()

= Recommendations

== Recommended Implementation Path

#box(fill: rgb("#e3f2fd"), inset: 12pt, radius: 4pt)[
  *Primary:* Use Stripe direct payments for the refund model
  
  *Fallback:* If App Store distribution required, use Credit Model instead of cash refunds
]

== Action Items

#table(
  columns: (auto, 3fr, 1fr),
  stroke: 0.5pt + gray,
  inset: 6pt,
  [*No.*], [*Action*], [*Priority*],
  [1], [Set up Stripe payment processing], [HIGH],
  [2], [Draft Terms of Service with refund terms + no-escrow language], [HIGH],
  [3], [Implement refund API integration with goal tracking], [HIGH],
  [4], [Obtain formal legal opinion for 50-state operation], [MEDIUM],
  [5], [Build Credit Model as backup for App Store version], [MEDIUM],
  [6], [Frame marketing as "performance discount" not "earning money"], [LOW],
)

== Summary

The MOVE refund mechanic is *technically and legally feasible* with the right implementation approach:

- ✅ *Use Stripe* for payment processing (not Apple IAP)
- ✅ *No MSB/MTL licensing required* — it's a refund to the same party
- ✅ *No chargeback risk* — refunds don't count toward dispute ratios
- ✅ *Straightforward accounting* — liability accrual model
- ⚠️ *Get legal opinion* before national launch for additional protection

#v(2em)

#align(center)[
  #text(fill: gray)[— End of Report —]
]
