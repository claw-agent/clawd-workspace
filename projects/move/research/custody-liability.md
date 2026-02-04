# Fund Custody & Liability Analysis
## "Pay $12.99, Get $11.69 Back If You Hit Goals" Model

**Research Date:** January 30, 2026  
**Prepared for:** Move App  

---

## Executive Summary

This model does **NOT** create escrow obligations and is **NOT** money transmission. It's legally a straightforward subscription with a conditional rebate/refund program. However, proper accounting treatment and bankruptcy considerations are important.

**Key Finding:** The funds become the company's money immediately upon receipt, but a **refund liability** must be accrued on the balance sheet for the expected refunds.

---

## 1. Fund Flow Analysis by Payment Method

### 1.1 Apple In-App Purchase (IAP)

**Who holds the funds?**
- **Apple** holds all customer funds during the purchase flow
- Apple remits to developer on a monthly cycle (typically 45-day delay)
- Apple deducts 15-30% commission before remitting

**Custody Implications:**
- Developer **never directly holds customer funds** via IAP
- Apple acts as the payment processor and takes on payment fraud risk
- Apple's App Store Terms govern refund handling
- If customer requests Apple refund, Apple may grant it without developer consent

**Critical Insight:** For IAP transactions, the custody question is moot—Apple is the de facto custodian. The developer receives net proceeds after the fact.

### 1.2 Direct Payment (Stripe)

**Fund flow timeline:**
1. Customer pays → funds enter Stripe's holding account
2. Stripe holds funds in "pending balance" (typically 2-7 days for new accounts)
3. Funds move to "available balance"
4. Payout to connected bank account (default: daily rolling)

**When do funds become "the company's money"?**
- Legally: Upon **successful payment authorization** (customer agreed to pay)
- Practically: When Stripe **transfers to your bank account**
- Per Stripe TOS: Stripe can hold/reverse funds for disputes, fraud, or chargebacks

**Custody Implications:**
- Between payment and payout, Stripe is technical custodian
- After payout, company has full custody
- Chargebacks can claw back funds for 60-120 days post-payment

---

## 2. Is This an "Escrow" Arrangement?

### 2.1 Legal Definition of Escrow

True escrow requires:
1. **Neutral third-party** holding funds
2. **Written agreement** specifying release conditions
3. **Segregated funds** (not commingled with operating capital)
4. **Fiduciary duty** to both parties

### 2.2 Analysis: Does This Model Qualify?

| Escrow Element | This Model | Conclusion |
|----------------|------------|------------|
| Neutral third party | ❌ Company holds funds | Fails |
| Written conditions | ✅ Goal completion criteria | Partial |
| Segregated funds | ❌ Used as operating capital | Fails |
| Fiduciary duty | ❌ Company is self-interested | Fails |

**Conclusion:** This is **NOT escrow**. It's a subscription with conditional rebate.

### 2.3 What It Actually Is

**Legal Characterization:** Variable-price subscription with performance rebate

The customer is purchasing:
- Premium app access for $12.99/month
- With a conditional rebate of $11.69 (90%) upon meeting performance criteria

This is analogous to:
- Cash-back credit cards ("Spend $500, get $50 back")
- Rebate programs ("Buy product, mail in rebate form")
- Loyalty programs ("Complete X purchases, get Y free")

---

## 3. Accounting Treatment (ASC 606)

### 3.1 Revenue Recognition

Under GAAP ASC 606 (Revenue from Contracts with Customers):

**Upon payment ($12.99):**
```
Debit:  Cash                    $12.99
Credit: Revenue                 $12.99
```

**BUT** you must also estimate and accrue refund liability:

**If historical data shows 60% of users hit goals:**
```
Debit:  Revenue                 $7.01  (60% × $11.69)
Credit: Refund Liability        $7.01
```

### 3.2 Balance Sheet Impact

| Account | Treatment |
|---------|-----------|
| Cash | Asset (+$12.99) |
| Revenue (recognized) | Income (+$5.98 if 60% expected to claim) |
| Refund Liability | Liability (+$7.01) |

### 3.3 Month-End True-Up

At month end, adjust refund liability based on actual completions:
- **User hits goal:** Pay refund, reduce liability
- **User misses goal:** Recognize remaining revenue, reduce liability

### 3.4 Key Accounting Principle

> **ASC 606-10-32-7:** "If consideration promised includes a variable amount, the entity shall estimate the amount... The estimated amount of variable consideration will be included in the transaction price only to the extent it is probable that a significant reversal in revenue will not occur."

**Translation:** You should book conservative revenue estimates and maintain adequate refund reserves.

---

## 4. Money Transmission Analysis

### 4.1 Federal Definition (31 CFR § 1010.100)

Money transmission = "the acceptance of currency, funds, or other value that substitutes for currency from one person and the transmission of currency, funds, or other value that substitutes for currency **to another location or person**."

### 4.2 Is This Money Transmission?

**NO.** Critical analysis:

| Element | This Model | Money Transmission |
|---------|------------|-------------------|
| Accept funds from person | ✅ Yes | ✅ Required |
| Transmit to **another person** | ❌ No (returns to same user) | ✅ Required |
| Primary business purpose | Service delivery | Fund transfer |

**The refund goes back to the SAME person who paid.** This is a rebate/refund, not transmission.

### 4.3 FinCEN Exemptions That Apply

Per FinCEN guidance, these activities are **NOT money transmission:**
- "Providing the service of clearing and settling transactions between the person and seller of goods/services"
- Payment for goods/services where payment is "integral to the sale"

**This model qualifies as payment integral to service delivery.**

### 4.4 Comparison to Similar Models

| Service | Money Transmission? | Reasoning |
|---------|---------------------|-----------|
| **Move App** (this model) | No | Rebate to same customer |
| **Beeminder** | No | Forfeited stakes = revenue |
| **StickK** | Yes (potentially) | Stakes go to charities/anti-charities = third parties |
| **Cash-back credit cards** | No | Rebate to same customer |
| **Venmo** | Yes | Transmission between users |

---

## 5. Bankruptcy Implications

### 5.1 What Happens to User Funds?

**If company files Chapter 7 or Chapter 11 mid-month:**

1. **Unpaid refunds become unsecured claims**
   - Users who earned refunds but haven't received them = general unsecured creditors
   - Priority: After secured creditors, administrative expenses, employee wages, taxes

2. **Users in mid-month period**
   - No earned refund yet = no claim
   - Service already received = no damages
   - At best: claim for pro-rata portion of unused subscription

### 5.2 Creditor Priority in Bankruptcy

| Priority | Creditor Type | Move App Users |
|----------|---------------|----------------|
| 1 | Secured creditors | ❌ Not applicable |
| 2 | Administrative (legal fees, etc.) | ❌ Not applicable |
| 3 | Priority unsecured (wages, taxes) | ❌ Not applicable |
| 4 | **General unsecured** | ✅ **Users go here** |
| 5 | Equity holders | ❌ Not applicable |

**Reality:** In most consumer app bankruptcies, unsecured creditors receive pennies on the dollar (often $0).

### 5.3 Mitigating Bankruptcy Risk

**For users:** None practical at $12.99 amounts

**For company (to reduce liability exposure):**
- Clear terms stating refunds are discretionary/promotional
- Language clarifying no property interest in "escrowed" funds
- Monthly settlement (don't accumulate large refund obligations)

---

## 6. Insurance & Bonding Requirements

### 6.1 Does This Model Require Surety Bonds?

**No.** Surety bonds are required for:
- Money transmitters (we've established this isn't)
- Escrow agents (this isn't escrow)
- Certain licensed fiduciaries

### 6.2 Recommended Insurance Coverage

| Coverage Type | Relevance | Recommendation |
|---------------|-----------|----------------|
| **General Liability** | Standard | ✅ Required |
| **E&O / Professional Liability** | App errors causing missed goals | ✅ Recommended |
| **Cyber Liability** | Data breaches | ✅ Required |
| **D&O Insurance** | Director/officer claims | ✅ If seeking investment |
| **Crime / Fidelity Bond** | Employee theft | Consider at scale |

### 6.3 No Special "Customer Fund" Insurance Needed

Unlike:
- Banks (FDIC insurance required)
- Money transmitters (surety bonds required)
- Escrow agents (E&O + bonds required)

This model has **no special customer fund insurance obligations**.

---

## 7. How Similar Models Structure This

### 7.1 Beeminder

**Model:** User sets goal + pledge amount ($5-$2,430). Miss goal = pay pledge.

**Legal Structure:**
- ToS explicitly disclaims fiduciary relationship
- Pledges treated as revenue upon failure (not held in trust)
- No refund obligations—forfeiture is the default
- Heavy liability limitation language

**Key ToS Language:**
> "We're just here to record data for you and help keep you accountable to your own goals. You don't get to hold us responsible if you pick a stupid goal."

### 7.2 StickK

**Model:** User stakes money. Success = money back. Failure = goes to charity or "anti-charity."

**Legal Nuance:** 
- Transmission to third parties (charities) = closer to money transmission
- However, user designates recipient in advance (agency relationship)
- Structured as user-directed charitable giving

**Why it works:** User is directing their own funds, StickK is agent.

### 7.3 Gym Prepaid Contracts

**Model:** Pay $500 upfront for annual membership.

**Legal Structure:**
- Deferred revenue (liability until service delivered)
- Many states require pro-rata refund on cancellation
- Gym closures → state AG enforcement actions for refunds

**Relevance:** Monthly settlement (like Move's 30-day cycle) avoids large deferred revenue accumulation.

### 7.4 ClassPass

**Model:** Monthly subscription, unused credits expire.

**Legal Structure:**
- Credits are breakage revenue
- No refund for unused credits (stated in ToS)
- Regulatory scrutiny in some jurisdictions for "use it or lose it"

---

## 8. Recommendations

### 8.1 Terms of Service Language

Include the following clauses:

```
REFUND PROGRAM TERMS

1. Nature of Refund: The 90% performance refund is a promotional 
   incentive, not a right or entitlement. All payments are 
   non-refundable except as expressly provided herein.

2. No Escrow: Payments are not held in escrow or trust. Funds 
   become [Company] property upon receipt and may be used for 
   any business purpose.

3. No Fiduciary Relationship: This is a commercial service 
   relationship. [Company] is not your fiduciary, trustee, 
   or escrow agent.

4. Bankruptcy/Insolvency: In the event of [Company] insolvency, 
   users have no priority claim to funds and are general 
   unsecured creditors for any unpaid refunds.

5. Program Modification: [Company] may modify or terminate the 
   refund program at any time with 30 days notice.
```

### 8.2 Accounting Practices

1. **Track historical completion rates** by user segment
2. **Accrue refund liability** based on expected completions
3. **True-up monthly** to actual payouts
4. **Maintain cash reserves** equal to 100-120% of accrued liability

### 8.3 Operational Recommendations

1. **Pay refunds promptly** (within 3-5 business days of month end)
2. **Clear documentation** of goal criteria and measurement
3. **Automated calculation** (reduces disputes)
4. **Monthly settlement cycle** (avoids accumulating large liabilities)

### 8.4 Payment Method Recommendation

**For this model, direct payment (Stripe) is preferable to Apple IAP:**

| Factor | Apple IAP | Stripe Direct |
|--------|-----------|---------------|
| Refund control | Apple can grant without consent | Full company control |
| Commission | 15-30% | ~2.9% + $0.30 |
| Payout timing | 45-day delay | 2-7 days (configurable) |
| Customer relationship | Apple owns | Company owns |

**Caveat:** Apple requires IAP for "digital goods/services consumed within app." Check if fitness tracking qualifies for Reader App exemption.

---

## 9. Legal Risk Summary

| Risk Area | Level | Mitigation |
|-----------|-------|------------|
| Money transmission | ✅ Low | Not applicable—same-user refunds |
| Escrow obligations | ✅ Low | Not escrow—clear ToS |
| Accounting liability | 🟡 Medium | Proper accrual practices |
| Bankruptcy exposure | 🟡 Medium | Can't fully eliminate |
| Consumer protection | 🟡 Medium | Clear terms, prompt refunds |
| State-specific laws | 🟡 Medium | Review CA, NY consumer protection |

---

## 10. State-Specific Considerations

### 10.1 California

- **Automatic Renewal Law** (Bus. & Prof. Code § 17600-17606): Requires clear disclosure, easy cancellation
- **Gift Card Law**: May apply if credits accumulate (probably not applicable here)
- **Unfair Competition Law** (§ 17200): Catch-all for deceptive practices

### 10.2 New York

- **General Business Law § 349**: Prohibits deceptive consumer practices
- Stricter enforcement environment

### 10.3 Recommended Compliance

1. Clear pricing disclosure before purchase
2. Easy cancellation mechanism
3. Confirmation emails with refund terms
4. Accessible customer service for refund questions

---

## Conclusion

The "pay $12.99, get $11.69 back" model is:

- ✅ **NOT money transmission** (same-user refunds)
- ✅ **NOT escrow** (no neutral third party, no segregated funds)
- ✅ **Legal and common** (similar to rebates, cash-back, loyalty programs)
- 🟡 **Requires proper accounting** (refund liability accrual)
- 🟡 **Has bankruptcy exposure** (users become unsecured creditors)

**Bottom Line:** This is a creative subscription pricing model that's legally straightforward. The main obligations are proper accounting treatment and clear consumer disclosures. No special licensing, bonding, or insurance is required.

---

*Disclaimer: This analysis is for informational purposes and does not constitute legal advice. Consult qualified legal and accounting professionals for your specific situation.*
