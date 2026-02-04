# Legal Risk Assessment: Perverse Incentive Structure in MOVE App

**Date:** January 30, 2026  
**Subject:** Analysis of legal exposure from business model where company profits more when users fail

---

## Executive Summary

**Risk Level: MODERATE** — The MOVE model has some legal exposure but can be substantially mitigated through proper disclosures and structural safeguards. Similar commitment contract models (StickK, Beeminder, DietBet) have operated for 15+ years without significant regulatory action, though MOVE's structure has a key distinction that increases risk.

**Critical Distinction:** Unlike competitors where forfeited funds go to charities or winner pools, MOVE **retains 100% of failure payments**. This creates a direct profit motive to design a system that maximizes user failure—an alignment problem that regulators and courts could scrutinize.

---

## 1. FTC Unfairness (UDAP / Section 5 Analysis)

### The Three-Prong Unfairness Test

Per the FTC Policy Statement on Unfairness (1980), an act is "unfair" if:
1. It causes **substantial consumer injury**
2. The injury is **not outweighed by countervailing benefits**
3. Consumers **could not reasonably have avoided** the injury

### Application to MOVE

| Factor | Analysis | Risk Level |
|--------|----------|------------|
| **Substantial Injury** | User pays $12.99, loses full amount if fails = monetary harm. But user agreed to this voluntarily. | LOW |
| **Countervailing Benefits** | Commitment contracts ARE effective for behavior change (peer-reviewed research from UPenn, Mayo Clinic). The "skin in the game" mechanism has legitimate value. | MITIGATING |
| **Consumer Avoidance** | Users voluntarily sign up knowing terms. This is consensual—not coercive. However, if goal-tracking is manipulated or system makes success artificially difficult, this changes. | DEPENDS ON IMPLEMENTATION |

### FTC Risk Assessment

**LOW-MODERATE** if:
- Goals and tracking are transparent and accurate
- Success criteria are clearly disclosed upfront
- Users can verify their own progress
- No hidden obstacles to success

**HIGH** if:
- App bugs/inaccuracies cause false "failures"
- Push notifications/UX designed to make users forget to log
- Goals are set in ways that statistically ensure most fail
- Marketing overpromises success rates

### Key FTC Precedent Concern
The FTC has pursued "dark patterns" cases aggressively (Amazon Prime cancellation, Vonage). If MOVE's UX contains features that *undermine* user success while claiming to support it, this could trigger enforcement.

---

## 2. Fiduciary Duty Analysis

### Does MOVE Owe Users a Fiduciary Duty?

**SHORT ANSWER: NO**

Fiduciary relationships arise in specific contexts:
- Attorney-client
- Trustee-beneficiary
- Financial advisor-client
- Corporate director-shareholder

A standard commercial subscription service does **not** create a fiduciary relationship. Users are counterparties in an arm's-length transaction.

### Closest Analogy: Gym Memberships

Gyms have operated for decades on a model where they profit when members don't show up. Courts have consistently held:
- No fiduciary duty to motivate members
- No duty to make cancellation easy
- Business can design pricing that benefits from low engagement

**Risk Level: VERY LOW**

### But Consider: Professional Wellness Services

If MOVE marketed itself as providing "professional fitness coaching" or "personalized health guidance," stronger duties *might* attach. Keep marketing focused on "accountability tool" rather than "wellness advisor."

---

## 3. False Advertising / Deceptive Practices

### Potential Exposure

If marketing states:
- ❌ "Get your money back guaranteed!" — Deceptive if most users fail
- ❌ "90% of users succeed!" — Deceptive if actual rate is lower
- ❌ "We're designed to help you win" — Problematic if system optimizes for failure

### Safe Harbors

Truthful statements that reduce risk:
- ✅ "Get up to $11.69 back when you hit your goals"
- ✅ "You keep us accountable, we keep you accountable"
- ✅ Clear disclosure of success rates (if favorable) or silence (if unfavorable)
- ✅ "If you don't hit 24 of 30 days, we keep your subscription"

### FTC Advertising Standards

Claims must be:
1. **Truthful** — No false statements
2. **Substantiated** — Evidence to support claims
3. **Not misleading** — No omission of material facts

**Risk Level: MODERATE** — Depends entirely on marketing copy. Review all materials carefully.

---

## 4. Gambling / Contest Law Analysis

### Is MOVE a "Wager"?

Gambling typically requires:
1. **Consideration** (payment) ✅ User pays $12.99
2. **Chance** ❓ Depends on analysis
3. **Prize** ✅ Getting $11.69 back

### The "Skill vs. Chance" Distinction

**Critical legal question:** Is achieving 24/30 goal days based on:
- **Skill/effort** (user's actions) → NOT gambling
- **Chance** (random factors) → Potentially gambling

### Commitment Contract Precedent

StickK, Beeminder, DietBet, and HealthyWage have operated nationally without gambling prosecutions because:
- **Outcome is within user's control** — User chooses whether to exercise
- **Not a lottery** — No random drawing determines winner
- **Skill-based** — Courts have found weight loss and fitness goals are effort-based

DietBet explicitly addressed this, operating for 10+ years with cash prizes based on weight loss outcomes. State attorneys general have not challenged this model.

### Beeminder's Framing (Instructive)

From their terms: *"We're just here to record data for you and help keep you accountable to your own goals."*

This positions the service as a **commitment device**, not a wager.

### Risk Factors

**Lower risk if:**
- User sets their own goals (not imposed by MOVE)
- User can verify their own progress
- Outcome depends on user's effort, not app mechanics

**Higher risk if:**
- Goals are randomized or app-determined
- Tracking has significant random error
- "Success" depends on factors outside user's control

**Risk Level: LOW** — Well-established precedent for commitment contracts

---

## 5. Unconscionability Analysis

### Two-Prong Test

Courts require BOTH:
1. **Procedural unconscionability** — Unfair bargaining process (fine print, no negotiation, take-it-or-leave-it)
2. **Substantive unconscionability** — Unreasonably one-sided terms

### Application to MOVE

| Factor | Analysis |
|--------|----------|
| **Procedural** | Standard app subscription—no worse than industry norm. Not a negotiated contract, but that's true of all consumer apps. | 
| **Substantive** | User risks $12.99/month with potential upside of $11.69 back. Company's "worst case" is user succeeds and company nets $1.30. |

### The Asymmetry Argument

A plaintiff might argue:
> "The contract is one-sided: MOVE profits $12.99 when I fail but only $1.30 when I succeed. They have every incentive to make me fail."

**Counter-argument:**
> "User voluntarily chose this arrangement precisely BECAUSE the stakes create motivation. That's the product. User could cancel anytime."

### Gym Membership Precedent

Courts have upheld gym memberships with:
- Long-term contracts
- Automatic renewal
- Full payment even if member never visits

MOVE's structure is arguably MORE consumer-friendly (monthly, easy cancellation presumed).

**Risk Level: LOW** — Contract terms are not egregiously one-sided

---

## 6. Precedent Analysis: How Similar Models Handle This

### StickK (Yale Behavioral Economics)
- **Model:** User stakes money on goals; loses money if fails
- **Where money goes:** User-designated charity, anti-charity, friend, OR StickK itself
- **Key safeguard:** User can choose where forfeited funds go
- **Revenue model:** StickK charges fees; doesn't rely primarily on forfeitures

### Beeminder
- **Model:** User pledges money; charged if they go "off track"
- **Where money goes:** Beeminder keeps it
- **Key safeguard:** Extremely transparent about this being their revenue model
- **Disclosure:** *"We literally only make money when you fail"* — radical honesty

### DietBet
- **Model:** Users bet on weight loss; winners split pot
- **Where money goes:** Winners (minus house take of ~10-25%)
- **Key safeguard:** Money goes to OTHER USERS who succeed, not to the house
- **Why this matters:** Company profits from running games, not from user failure

### HealthyWage
- **Model:** Individual bets on personal weight loss
- **Where money goes:** Prizes paid from pooled funds
- **Business model:** Actuarial—they profit from the spread between failures and payouts

### Gym Memberships
- **Model:** Monthly fee regardless of attendance
- **Where money goes:** Gym keeps everything
- **Key distinction:** No "reward" for using the gym—pure subscription

### MOVE's Position

MOVE is closest to **Beeminder's model** (company keeps forfeitures) but with less transparency about the incentive alignment.

**Key Differentiator:** Beeminder is radically upfront: *"We only make money when you fail."* This honesty actually REDUCES legal risk by ensuring informed consent.

---

## 7. Recommended Safeguards & Disclosures

### MUST-HAVE Disclosures

1. **Clear statement of economics:**
   > "If you don't meet your goal 24 of 30 days, MOVE keeps your full $12.99 subscription. If you succeed, you get $11.69 back and MOVE keeps $1.30."

2. **Success rate disclosure (if tracking):**
   > "Last month, X% of MOVE users earned their reward."

3. **No guarantee language:**
   > "Results depend on your effort. MOVE is an accountability tool, not a guarantee."

### SHOULD-HAVE Safeguards

1. **User-verifiable tracking**
   - Let users see exactly how their activity is tracked
   - Provide dispute resolution for tracking errors
   - Don't make "success" dependent on opaque algorithms

2. **Reasonable goal structure**
   - 24/30 days (80%) is achievable but challenging
   - Consider "grace" mechanisms for illness, travel, etc.
   - Don't set goals that are statistically designed to fail

3. **UX that supports success**
   - Reminders should help, not be absent when convenient
   - Don't use dark patterns to make logging difficult
   - Make the path to success clear

4. **Easy cancellation**
   - FTC "click to cancel" rule compliance
   - No hidden barriers to subscription management

### NICE-TO-HAVE Protections

1. **Publish aggregate success rates**
   - Transparency builds trust
   - If rates are good (>50%), this is marketing gold

2. **"Second chance" policy**
   - Allow users who narrowly miss (e.g., 23/30) to appeal once
   - Shows good faith

3. **Cap on consecutive failures**
   - After 3 months of failure, prompt user to adjust goals
   - Demonstrates you're not farming failure

---

## 8. Risk Matrix Summary

| Legal Theory | Risk Level | Key Mitigation |
|--------------|------------|----------------|
| FTC Unfairness | MODERATE | Transparent tracking, honest marketing |
| Fiduciary Duty | VERY LOW | Don't claim to be health advisors |
| False Advertising | MODERATE | Review all marketing copy carefully |
| Gambling Law | LOW | Outcome depends on user effort, not chance |
| Unconscionability | LOW | Standard consumer app terms |

---

## 9. Final Recommendations

### Do This:

1. **Be Beeminder-transparent** — Own the business model openly
2. **Make success achievable** — 80% goal is reasonable; don't game it
3. **Provide tracking transparency** — Users should trust the numbers
4. **Document your design intent** — Show that product decisions prioritize user success
5. **Review marketing with counsel** — Every claim should be defensible

### Don't Do This:

1. **Don't hide the economics** — Buried disclosure = litigation risk
2. **Don't use dark patterns** — FTC is aggressive here
3. **Don't make tracking unreliable** — Technical failures that cause "false failures" are high risk
4. **Don't market as "guaranteed" or "easy"** — Overpromising creates exposure
5. **Don't ignore user complaints about unfair failures** — Document and resolve

---

## 10. Conclusion

The MOVE model is **legally defensible** but requires careful execution. The core concept—commitment contracts with financial stakes—has solid precedent and behavioral science support. The risk comes from:

1. **The optics of profiting from failure** — Mitigate with transparency
2. **Potential for system manipulation** — Mitigate with fair, verifiable tracking
3. **Marketing overreach** — Mitigate with careful copy review

If MOVE follows the Beeminder playbook (radical honesty about incentives) combined with DietBet's rigor (verified tracking, clear rules), the legal exposure is manageable.

**Bottom Line:** The perverse incentive exists but is not illegal per se. Gyms have operated this way forever. The key is **informed consent** and **fair play**. As long as users genuinely understand the deal and have a fair shot at success, the model should withstand scrutiny.

---

*This analysis is for informational purposes and does not constitute legal advice. Consult qualified counsel for specific legal guidance.*
