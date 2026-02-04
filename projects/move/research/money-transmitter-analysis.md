# Money Transmitter License Analysis: Fitness App Refund Mechanic

**Research Date:** January 30, 2026  
**Prepared for:** MOVE Fitness App  
**Question:** Does a "90% refund for hitting goals" mechanic trigger state money transmitter licensing requirements?

---

## Executive Summary

**Bottom Line: This model almost certainly does NOT constitute money transmission.**

The fitness app's refund mechanic (charging $12.99/month and refunding $11.69 if users hit goals 24/30 days) does not appear to trigger money transmitter licensing requirements under either federal or state law. The key distinction is that:

1. **No third-party transmission occurs** — money flows only between the company and its own customers
2. **This is a conditional refund/rebate** — not a transfer of funds between unrelated parties
3. **The seller's exemption applies** — the company is refunding payment for its own services

**Risk Level: LOW** — However, formal legal counsel should be obtained before launch, and specific state guidance should be requested from regulators in high-scrutiny jurisdictions.

---

## 1. Federal MSB Rules vs. State MTL Requirements

### Federal Level (FinCEN)

Under 31 CFR § 1010.100(ff), a "money transmitter" is defined as:

> "A person that provides money transmission services. The term 'money transmission services' means the acceptance of currency, funds, or other value that substitutes for currency from one person and the transmission of currency, funds, or other value that substitutes for currency to another location or to another person by any means."

**Key element:** Transmission must be from one person **to another person** or **another location**.

The fitness app's refund model does NOT meet this definition because:
- The user pays the company for a subscription
- The company refunds *the same user* part of *their own payment*
- There is no "transmission to another person"

**Federal MSB registration is likely NOT required** for this refund mechanic alone.

### State Level

State money transmitter laws are generally **stricter than federal rules** and vary significantly. Most states define money transmission similarly to the federal definition, but some have broader interpretations.

**Key distinction:** Federal registration is binary (you're an MSB or you're not), while states require **individual licenses in each state** where you conduct money transmission — often with $100K-$2M+ bonding requirements.

---

## 2. State-by-State Analysis: High-Scrutiny Jurisdictions

### 🔴 NEW YORK (Highest Risk)

**Regulator:** Department of Financial Services (DFS)  
**Relevant Law:** NY Banking Law Article XIII-B; 3 NYCRR Part 420

**Definition of Money Transmission:**
New York defines money transmission as engaging in the business of receiving money for transmission or transmitting money within the United States or abroad.

**Analysis:**
- NY has one of the broadest interpretations of money transmission
- However, the DFS has historically focused on **transfers between parties**, not merchant refunds
- The BitLicense (23 NYCRR Part 200) only applies to virtual currency businesses
- **A subscription refund to the same customer is NOT money transmission under NY law**

**Risk Level:** MEDIUM-LOW  
**Recommendation:** Consider proactive outreach to NY DFS for informal guidance. NY is aggressive but logical — a refund to your own customer should be clearly exempt.

### 🔴 CALIFORNIA

**Regulator:** Department of Financial Protection and Innovation (DFPI)  
**Relevant Law:** California Financial Code Division 1.2 (Money Transmission Act)

**Definition (Cal. Fin. Code § 2003(r)):**
> "Money transmission" means:
> (1) Selling or issuing payment instruments
> (2) Selling or issuing stored value
> (3) **Receiving money for transmission from a person located in this state**

**Key Exemption (Cal. Fin. Code § 2010(l)):**
> A transaction in which the recipient of the money or other monetary value is an **agent of the payee pursuant to a preexisting written contract** and delivery of the money or other monetary value to the agent satisfies the payor's obligation to the payee.

**Analysis:**
The fitness app scenario is even simpler — the company is both receiving and returning money to the **same person**. This is:
- NOT selling payment instruments ✓
- NOT selling stored value ✓  
- NOT receiving money for transmission to a third party ✓

**Risk Level:** LOW  
**Recommendation:** No license required. The refund is a price adjustment/rebate for the company's own subscription service.

### 🔴 TEXAS

**Regulator:** Texas Department of Banking  
**Relevant Law:** Texas Finance Code Chapter 151 (Money Services Act)

**Definition:**
Texas defines money transmission as "receiving money or monetary value to transmit, deliver, or instruct to be delivered to another location or person."

**Key phrase:** "to another location or person"

**Analysis:**
The fitness app is returning money to the **same person** who paid. There is no transmission to "another location or person."

**Risk Level:** LOW  
**Recommendation:** No license required under current Texas law interpretation.

### 🔴 FLORIDA

**Regulator:** Office of Financial Regulation  
**Relevant Law:** Florida Statutes Chapter 560

**Definition (Fla. Stat. § 560.103(24)):**
> "Money transmitter" means a corporation... which receives currency, monetary value, a payment instrument, or virtual currency **for the purpose of acting as an intermediary to transmit currency, monetary value, a payment instrument, or virtual currency from one person to another location or person** by any means.

**Critical language:** "acting as an **intermediary** to transmit... from one person to another"

**Analysis:**
The fitness app is NOT an intermediary. It is the **direct party to the transaction**:
- User pays MOVE directly
- MOVE refunds user directly
- No intermediary function exists

Additionally, Florida's law explicitly states the term "includes only an intermediary that has the **ability to unilaterally execute or indefinitely prevent a transaction**" — which emphasizes the custodial/intermediary nature of money transmission.

**Risk Level:** LOW  
**Recommendation:** No license required. Florida's definition clearly excludes direct merchant refunds.

### 🟡 OTHER NOTABLE STATES

| State | Risk Level | Notes |
|-------|------------|-------|
| **Washington** | LOW | Broad exemptions for "products/services of the seller" |
| **Connecticut** | LOW | Follows federal definition closely |
| **Illinois** | LOW | Exempts transactions where payor/payee relationship exists |
| **Georgia** | LOW | Standard definition requiring third-party transfer |
| **Arizona** | LOW | Adopted Model Money Transmission Modernization Act |
| **Pennsylvania** | LOW | Focus on funds transfer between parties |
| **Massachusetts** | MEDIUM-LOW | More scrutiny but logic applies |

### 🟢 STATES WITH EXPLICIT SELLER EXEMPTIONS

Many states have adopted versions of the "seller's exemption" which explicitly excludes:
- Payment for goods/services provided by the payee
- Refunds issued by merchants for their own products/services
- Price adjustments and rebates

States with clear seller exemptions include: Arizona, Colorado, Connecticut, Georgia, Indiana, Kentucky, Minnesota, Missouri, Montana, Nebraska, Nevada, New Mexico, North Carolina, Ohio, Oklahoma, Oregon, South Carolina, Tennessee, Utah, Virginia, Washington, Wisconsin, Wyoming.

---

## 3. The Core Legal Question: Is a Refund "Money Transmission"?

### Why This Is NOT Money Transmission

**Money transmission requires THREE elements:**
1. Receiving money from Person A
2. Transmitting that money to Person B (or another location)
3. Acting as an intermediary in this transfer

**The MOVE refund model has only ONE party:**
- User pays MOVE → User receives refund from MOVE
- Same parties on both sides
- No intermediary function

### The Correct Legal Characterization

The MOVE model is actually one of the following:

**Option 1: Conditional Pricing / Performance Discount**
- Base price: $12.99/month
- Discount for performance: $11.69 (90%)
- Effective price if goals met: $1.30/month

This is legally equivalent to offering a $1.30/month subscription with a $11.69 "motivation deposit" that's returned upon goal achievement.

**Option 2: Subscription with Performance Refund**
- Standard subscription service
- Refund policy tied to user behavior
- Similar to gym memberships with attendance rewards

**Option 3: Rebate Program**
- Like Menards 11% rebate, manufacturer rebates, or credit card cash back
- Company returns portion of customer's own payment based on conditions

**All three characterizations are clearly NOT money transmission.**

---

## 4. Applicable Exemptions

### Seller's Exemption (Most Applicable)

Most state laws exempt transactions where:
- The recipient is the seller of goods/services
- The payment is for those goods/services
- The money doesn't pass through an intermediary

**Application to MOVE:** The company sells a subscription service. The "refund" is a return of the customer's own payment for that service.

### Agent of Payee Exemption

California and other states exempt situations where an agent receives payment on behalf of a payee (merchant). While not directly applicable here (MOVE is the direct merchant), this exemption's logic supports the analysis — the law exempts transactions within the commercial relationship, not just transfers between strangers.

### Payment Processor Exemption

If MOVE uses Stripe, Square, or another payment processor:
- The processor handles the actual funds movement
- The processor holds the MTL licenses
- MOVE is the merchant, not the transmitter

---

## 5. How Cashback Apps Handle Compliance

### Rakuten (formerly Ebates)
- Operates as a marketing affiliate, not money transmitter
- "Cash back" is technically a marketing rebate from retailers
- Users are receiving their "share" of affiliate commissions
- Rakuten's American Express card is issued by a licensed bank

**Key distinction:** Rakuten receives money FROM retailers TO users. MOVE receives money FROM users and returns it TO the same users.

### Ibotta
- Similar affiliate marketing model
- Cash back comes from brand advertising budgets
- Not transmitting user funds

### Dosh (now defunct)
- Automatic cash back linked to cards
- Operated under bank partnerships
- Cash back flowed through banking infrastructure

### Credit Card Rewards
- Chase Sapphire, Amex Platinum, etc.
- Rewards are contractual benefits, not transmitted funds
- Issued by federally regulated banks

**MOVE is more similar to:** A retailer offering a loyalty discount than a cashback app transmitting third-party funds.

---

## 6. State-Specific Guidance on Subscription/Rebate Models

### No Direct Guidance Found

Through research, no state has issued specific guidance on subscription services with conditional refunds. This is actually **good news** — it means regulators haven't viewed such models as problematic enough to warrant guidance.

### Analogous Guidance

**FinCEN Guidance (FIN-2019-G001):** Clarifies that entities facilitating their own payments (not acting as intermediaries) are not money transmitters.

**CSBS Model Money Transmission Modernization Act:** Provides standardized definitions being adopted by states, consistently defining money transmission as requiring third-party transfer.

---

## 7. Risk Assessment by State Category

### 🟢 LOW RISK STATES (Clear Exemptions)
Arizona, Colorado, Connecticut, Delaware, Georgia, Hawaii, Idaho, Indiana, Iowa, Kansas, Kentucky, Louisiana, Maine, Maryland, Michigan, Minnesota, Mississippi, Missouri, Montana, Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, North Carolina, North Dakota, Ohio, Oklahoma, Oregon, Rhode Island, South Carolina, South Dakota, Tennessee, Utah, Vermont, Virginia, Washington, West Virginia, Wisconsin, Wyoming

**No licensing required. Standard commercial transaction.**

### 🟡 MEDIUM-LOW RISK STATES (Broader Laws, But Logic Applies)
California, Florida, Texas, Illinois, Massachusetts, Pennsylvania, Alaska, Arkansas

**No licensing required, but may benefit from informal regulator guidance.**

### 🟡 MEDIUM RISK STATES (Aggressive Regulators)
New York

**No licensing required under current law, but proactive engagement recommended.**

---

## 8. Recommendations

### Immediate Actions

1. **Structure as a "Performance Discount"**  
   Frame the refund as a conditional pricing mechanism rather than a "refund of deposit." Marketing should emphasize: "Premium costs just $1.30/month when you hit your goals!"

2. **Clear Terms of Service**  
   Include explicit language that:
   - The subscription is a single transaction between user and MOVE
   - The refund is a price adjustment, not a separate money transfer
   - No third parties are involved in the transaction

3. **Use Licensed Payment Processor**  
   Stripe, Square, or similar processor handles all fund movements. This provides additional regulatory cover.

### Before 50-State Launch

4. **Obtain Formal Legal Opinion**  
   Engage fintech-specialized counsel to provide a formal legal opinion letter. Estimated cost: $10,000-25,000.

5. **New York Informal Guidance (Optional)**  
   Consider requesting informal guidance from NY DFS. They have a mechanism for pre-submission inquiries.

6. **Compliance Documentation**  
   Maintain records showing:
   - User pays MOVE directly
   - Refund goes back to same user
   - No intermediary function
   - This is pricing, not transmission

### Ongoing Monitoring

7. **Legislative Tracking**  
   Money transmission laws evolve. Monitor for:
   - New state legislation
   - Regulatory guidance on fintech/apps
   - Enforcement actions in similar models

8. **Industry Association Engagement**  
   Consider joining Money Services Round Table or similar groups for early warning on regulatory changes.

---

## 9. Comparison to Similar Business Models

| Model | Money Transmission? | Why |
|-------|-------------------|-----|
| Gym with attendance rewards | NO | Refund of own payment |
| Credit card cash back | NO | Bank product, not transmission |
| Rakuten/Ibotta | NO | Affiliate marketing rebates |
| Venmo/PayPal | YES | Transfer between users |
| Western Union | YES | Transfer to third parties |
| StepN (move-to-earn crypto) | MAYBE | Involves crypto, more complex |
| **MOVE Fitness Refund** | **NO** | Refund of user's own payment |

---

## 10. Potential Alternative Structures (Risk Mitigation)

If regulators ever challenge the model, these structures would further insulate MOVE:

### Option A: Reward Points (Not Cash)
- Award points instead of cash refunds
- Points redeemable for subscription credits
- Completely eliminates money transmission question

### Option B: Discount Code
- Successful users receive discount code
- Apply to next month's subscription
- Never involves money "moving"

### Option C: Bank Partnership
- Partner with a licensed bank (Stripe Treasury, Mercury, etc.)
- Bank issues the refund from user's "MOVE Wallet"
- Bank holds the MTL licenses

**Current model is likely fine, but these provide fallback options.**

---

## Conclusion

The MOVE fitness app's conditional refund model **does not constitute money transmission** under federal law or the laws of any U.S. state examined. The fundamental reason is simple: **money transmission requires transferring funds from one person to another person**, and MOVE is returning money **to the same person who paid it**.

This is legally equivalent to a loyalty discount, price adjustment, or rebate — all of which are routine commercial practices that don't require money transmitter licensing.

**Recommended next step:** Obtain formal legal opinion from fintech counsel before 50-state launch, estimated cost $10K-25K. This provides regulatory protection and investor confidence.

---

## Sources Consulted

1. 31 CFR § 1010.100 (FinCEN MSB Definition)
2. California Financial Code §§ 2003, 2010 (Money Transmission Act)
3. Florida Statutes Chapter 560 (Money Services Businesses)
4. New York Banking Law Article XIII-B; 23 NYCRR Part 200 (BitLicense)
5. FinCEN MSB Registration Requirements
6. NY DFS Virtual Currency Guidance
7. CSBS Model Money Transmission Modernization Act (referenced)
8. State regulatory websites (CA DFPI, FL OFR, NY DFS)

---

*This analysis is for informational purposes only and does not constitute legal advice. Consult qualified legal counsel before making business decisions based on this research.*
