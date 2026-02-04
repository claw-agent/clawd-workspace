# Apple In-App Purchase Refunds: Technical Research

**Research Date:** January 30, 2026  
**Context:** Move app - $12.99/month Premium subscription with goal-based 90% refund mechanic

---

## Executive Summary

**Key Finding: Developers CANNOT programmatically issue refunds via Apple's APIs.**

Apple controls the entire refund process. Developers can only:
1. Let users initiate refund requests from within the app
2. Provide "consumption data" to influence Apple's refund decision
3. Receive notifications when Apple grants a refund

For Move's "hit 24/30 goals = get 90% back" model, **alternative approaches are required**.

---

## 1. Can Developers Issue Programmatic Refunds?

### Short Answer: **No**

### Detailed Findings:

#### What Developers CAN Do:

**A. `beginRefundRequest(in:)` API (StoreKit 2)**
- Allows users to initiate a refund request **from within your app**
- Apple still makes the final approve/deny decision
- Developer cannot control the outcome

```swift
// This only INITIATES a request - Apple decides
try await transaction.beginRefundRequest(in: windowScene)
```

**B. Send Consumption Information Endpoint (App Store Server API)**
- Endpoint: `PUT /v1/transactions/consumption/{transactionId}`
- Allows developers to send data about how much the user consumed the purchase
- Apple uses this data to **inform** their refund decision (not control it)
- Available data fields:
  - `accountTenure` - How long user has had account
  - `consumptionStatus` - Undeclared/Undetermined/NotConsumed/PartiallyConsumed/FullyConsumed
  - `deliveryStatus` - Whether content was delivered
  - `playTime` - Time spent using the purchase
  - `refundPreference` - Developer's preference (Undeclared/PreferGrant/PreferDecline/NoPreference)

**Important:** Even if you set `refundPreference: PreferGrant`, Apple makes the final decision.

**C. App Store Server Notifications**
- `REFUND` notification type alerts you when Apple grants a refund
- Used for **reacting to** refunds, not initiating them

#### What Developers CANNOT Do:
- ❌ Directly refund money to users
- ❌ Guarantee a refund will be approved
- ❌ Process partial refunds
- ❌ Control refund timing
- ❌ Refund to a different payment method

---

## 2. Apple's Refund Policy

### User-Initiated Refunds
- Users request via [reportaproblem.apple.com](https://reportaproblem.apple.com)
- Apple reviews and decides (typically within 48 hours)
- Common approval reasons: accidental purchase, didn't work, unauthorized

### Developer Influence
- Limited to providing consumption data
- Apple documentation states they use "a variety of factors" to decide
- Developer input is one factor among many

### Policy Restrictions
- No formal "money-back guarantee" mechanism exists
- Advertising a guarantee you can't fulfill could violate App Store guidelines
- Section 3.1.1 of Review Guidelines requires honesty about IAP

---

## 3. Apple's Commission Structure

| Scenario | Apple's Cut | Developer Receives |
|----------|-------------|-------------------|
| **Year 1** of subscriber | 30% | 70% |
| **Year 2+** of same subscriber | 15% | 85% |
| **Small Business Program** (< $1M/year) | 15% | 85% |

### For Move at $12.99/month:

| Scenario | Apple Takes | Move Receives |
|----------|-------------|---------------|
| Year 1 subscriber | $3.90 | $9.09 |
| Year 2+ subscriber | $1.95 | $11.04 |
| Small Business Program | $1.95 | $11.04 |

### Implication for 90% Refund Model:
If you want to give back $11.69 (90% of $12.99), you'd be losing money in Year 1:
- You receive: $9.09
- You'd owe user: $11.69
- **Net loss: -$2.60 per successful user**

Even in Year 2+ or with Small Business Program:
- You receive: $11.04
- You'd owe user: $11.69
- **Net loss: -$0.65 per successful user**

---

## 4. Apps with Similar Mechanics

### Research Findings:

**No mainstream fitness apps offer true "money back" via Apple IAP refunds.**

Common alternative approaches seen:

1. **Noom / MyFitnessPal** - Standard subscriptions, no refund guarantee
2. **Freeletics** - Offers "14-day money back" but routes through their own support, not automated
3. **BetterMe** - Standard subscription model
4. **Strava** - Premium features, no refund mechanic

### Why Apps Avoid This:
- Technical impossibility of guaranteed refunds
- Financial risk (Apple takes cut regardless)
- User experience issues with Apple's refund flow
- App Store Review guideline concerns

---

## 5. Technical Limitations & Blockers

### Hard Blockers:
1. **No programmatic refund API** - Cannot automate refunds
2. **Apple controls approval** - Even when you recommend refund, Apple decides
3. **No partial refunds** - Can't refund exactly 90%; it's all or nothing
4. **Commission not returned** - Apple keeps their 15-30% regardless of refund

### Soft Blockers:
1. **App Store Review** - Promising refunds you can't guarantee may violate guidelines
2. **User Confusion** - Users may not understand why their "guaranteed" refund was denied
3. **Support Burden** - When Apple denies, users blame your app
4. **Financial Risk** - If using credit alternatives, you bear 100% of the cost

---

## 6. Alternative Approaches

### Recommended: In-App Credit System ⭐

**How It Works:**
1. User pays $12.99/month via Apple IAP
2. If user hits 24/30 goals, credit $11.69 in-app credit
3. Credit can be used for:
   - Extra months free
   - Premium features
   - In-app consumables

**Pros:**
- 100% under your control
- No Apple involvement in "refund"
- Better user experience
- Can be immediate and guaranteed

**Cons:**
- Not real money back
- Must provide enough value for credits to matter
- May reduce future revenue

**Implementation:**
```swift
// Track user's credit balance server-side
if userMetGoals(24, outOf: 30) {
    creditBalance += 11.69
    // Apply credit to next renewal or consumables
}
```

---

### Alternative: Tiered Pricing Model

**Structure:**
- **Basic:** $12.99/month - Full price
- **Committed:** $1.30/month - Must hit 24/30 goals or reverts to Basic

**How It Works:**
1. Users start on "Committed" tier
2. Each month, track goal completion
3. If they miss goals, switch them to Basic tier for next month
4. If they hit goals, they stay at $1.30

**Pros:**
- Transparent pricing
- No refund complexity
- Motivates users proactively

**Cons:**
- More complex subscription group setup
- Lower initial revenue
- Users might game the system

---

### Alternative: Free Subscription Extension

**How It Works:**
Using the **Extend a Subscription Renewal Date API** (App Store Server API):
- Endpoint: `PUT /v1/subscriptions/extend/{originalTransactionId}`
- Can extend renewal date by up to 90 days, twice per year

1. User hits 24/30 goals
2. Extend their subscription by ~27 days (90% of monthly value)
3. They get almost a free month

**Pros:**
- Official Apple API
- Keeps user subscribed
- Immediate gratification

**Cons:**
- Limited to 2 extensions per year per user
- 90 days max per extension
- Doesn't return cash

**API Details:**
```http
PUT https://api.storekit.itunes.apple.com/inApps/v1/subscriptions/extend/{originalTransactionId}
{
  "extendByDays": 27,
  "extendReasonCode": 0, // 0 = undeclared, 1 = customer satisfaction, 2 = other, 3 = service issue
  "requestIdentifier": "unique-request-id"
}
```

---

### Alternative: External Payment (EU/Japan Only)

In the **EU** and **Japan**, alternative payment processing is now allowed:
- Process payments outside Apple's IAP
- Issue refunds directly via Stripe/etc.
- Apple still takes "Core Technology Fee" (varies by region)

**Pros:**
- Full refund control
- Real money back to users

**Cons:**
- Only available in EU/Japan (as of 2026)
- Still pay some fee to Apple
- Complex compliance requirements
- Users must opt into alternative payment

---

### Alternative: Hybrid "Stake" Model

**How It Works:**
1. App is **free** to use
2. User optionally "stakes" $12.99 via IAP
3. At end of month:
   - Hit goals → Keep premium features, get promotional offer for next month
   - Miss goals → Stake is kept as payment
4. Never promise actual refund

**Pros:**
- No refund needed
- Gamification element
- Clear value proposition

**Cons:**
- May feel punitive
- Complex to explain
- Could have lower conversion

---

## 7. Recommendations for Move

### Primary Recommendation: In-App Credit + Subscription Extension Hybrid

1. **Charge $12.99/month normally**
2. **If user hits 24/30 goals:**
   - Extend their subscription by ~25 days (using Apple's API)
   - Credit them $5-6 in in-app credits for consumables
3. **Market as:** "Hit your goals, get your next month almost free + bonus credits"

### Why This Works:
- ✅ Uses official Apple APIs
- ✅ Provides real value to users
- ✅ No misleading "money back" claims
- ✅ 100% automated and reliable
- ✅ Actually motivates behavior

### Marketing Language:
❌ DON'T SAY: "Get 90% of your money back"
✅ DO SAY: "Hit your goals and unlock bonus months + premium rewards"

---

## 8. API Reference Summary

| API | Purpose | Can Issue Refund? |
|-----|---------|-------------------|
| `Transaction.beginRefundRequest()` | Let user request refund | No (Apple decides) |
| `PUT /v1/transactions/consumption/{id}` | Influence refund decision | No (advisory only) |
| `PUT /v1/subscriptions/extend/{id}` | Extend subscription | N/A (gives free time) |
| `GET /v1/refundHistory/{transactionId}` | Check refund history | N/A (read only) |
| App Store Server Notifications | React to refunds | N/A (notification) |

---

## 9. Conclusion

**Apple's ecosystem does not support developer-initiated refunds.** The "hit goals, get money back" model as literally described is **not technically feasible** via Apple IAP.

**Best Path Forward:**
1. Reframe the value proposition around **credits + free extensions**
2. Use Apple's Subscription Extension API for immediate value
3. Build an in-app economy where credits are valuable
4. Market honestly without promising cash refunds

This approach delivers the same psychological benefit to users (reward for success) while working within Apple's technical constraints.

---

## Sources

- [Apple Developer: In-App Purchase](https://developer.apple.com/in-app-purchase/)
- [Apple Developer: Auto-renewable Subscriptions](https://developer.apple.com/app-store/subscriptions/)
- [Apple Developer: Small Business Program](https://developer.apple.com/app-store/small-business-program/)
- [Apple Support: Request a refund](https://support.apple.com/en-us/118223)
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [WWDC21: Meet StoreKit 2](https://developer.apple.com/videos/play/wwdc2021/10114/)
- [App Store Server API Documentation](https://developer.apple.com/documentation/appstoreserverapi/)
