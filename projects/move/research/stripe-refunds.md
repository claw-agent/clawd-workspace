# Stripe Refund Mechanics Research: "90% Refund for Hitting Goals"

**Research Date:** January 30, 2026  
**Context:** MOVE app considering a $12.99/month Premium subscription where users get 90% back ($11.69) if they hit fitness goals 24/30 days.

---

## Executive Summary

**Verdict: ✅ Technically Feasible, ⚠️ Requires Careful Implementation**

The 90% refund mechanic is fully supported by Stripe's API, and refunds do NOT count toward chargeback ratios. However, there are important business and financial considerations to optimize this model.

---

## 1. Stripe Refund API — Partial Refunds

### ✅ Partial Refunds Are Fully Supported

From [Stripe Refund API](https://docs.stripe.com/api/refunds):

```javascript
// Refund 90% ($11.69) of a $12.99 charge
const refund = await stripe.refunds.create({
  charge: 'ch_xxx', // or payment_intent: 'pi_xxx'
  amount: 1169,     // Amount in cents (90% of $12.99)
  reason: 'requested_by_customer',
  metadata: {
    type: 'goal_achievement_reward',
    days_achieved: 24,
    days_required: 24
  }
});
```

**Key Points:**
- `amount` parameter accepts any value up to the remaining unrefunded amount
- You can issue multiple partial refunds until the full charge is refunded
- Once fully refunded, a charge cannot be refunded again
- Refunds go back to the **original payment method** (cannot redirect to different account)

### Timing Considerations

- **Refund vs Reversal:** Refunds issued shortly after the original charge may appear as a "reversal" instead of a refund (the original charge drops off the statement, no separate credit appears)
- **IC+ pricing users** may see lower network fees for reversals vs refunds
- **Customer visibility:** 5-10 business days for refund to appear on customer's statement

---

## 2. Chargebacks & Dispute Ratios — The Critical Question

### ✅ Refunds Do NOT Count Toward Dispute Ratios

From [Stripe Disputes Documentation](https://docs.stripe.com/disputes/measuring):

> "Monitoring programs don't consider refunds when identifying disputes."

**This is the key finding:** Your refund volume has **zero impact** on your chargeback ratio.

### What Does Count?

| Metric | Definition | Counts Toward Ratio? |
|--------|-----------|---------------------|
| **Disputes/Chargebacks** | Customer disputes charge with bank | ✅ Yes |
| **Early Fraud Warnings (EFW)** | Card network flags suspected fraud | ✅ Yes (for Visa VAMP) |
| **Refunds** | Merchant-initiated return of funds | ❌ No |
| **Won Disputes** | Disputes you successfully challenged | ✅ Still counts |

### Thresholds to Stay Under

| Program | Non-Compliant | Excessive | Notes |
|---------|---------------|-----------|-------|
| **Visa VAMP** | 0.5% | 1.5-2.2% | New program effective May 2025 |
| **Mastercard ECM** | 1.0% + 100 disputes | 1.5% + 300 disputes | Per month |
| **Industry Standard** | >0.75% | — | General risk threshold |

**Bottom Line:** A 90% refund program will NOT increase your chargeback ratio. In fact, it may **decrease** it by keeping customers happy.

---

## 3. Why Refunds Can Actually PREVENT Chargebacks

From Stripe documentation:

> "Disputes and chargebacks aren't possible on credit card charges that are fully refunded."

**Strategic insight:** If a user completes their goals and you refund 90%, they have:
1. No reason to dispute (they got their money back)
2. Positive sentiment toward the app
3. Incentive to continue the subscription

Even for users who **don't** hit goals:
- They knew the deal upfront (clear terms = fewer "I didn't authorize this" disputes)
- The gamification aspect creates ownership of the outcome

---

## 4. Stripe's View on "Conditional Refunds" / Rebate Models

### Not Explicitly Addressed, But...

Stripe's Terms of Service and documentation don't explicitly prohibit conditional refund programs. Key observations:

1. **"Refund Abuse" isn't a concern here** — You're initiating the refunds, not fraudulent customers
2. **No "excessive refund" monitoring program** exists (unlike chargebacks)
3. **Common in SaaS** — Many apps offer satisfaction guarantees, trial refunds, etc.

### How Stripe Would Likely Classify This

| Model | Stripe Classification |
|-------|----------------------|
| 90% refund for goals | **Conditional refund / Rebate program** |
| Rewards/cashback program | Would require different implementation |
| Money-back guarantee | Standard practice |

**This is fundamentally a refund program with conditions** — not a rewards program. The distinction matters because:
- Refunds don't require additional compliance
- Rewards programs may trigger gift card/stored value regulations in some jurisdictions

---

## 5. Alternative Implementations to Consider

### Option A: Standard Partial Refunds (Recommended Starting Point)

```javascript
// At month end, check user's achievement
if (daysAchieved >= 24) {
  await stripe.refunds.create({
    payment_intent: subscription.latest_invoice.payment_intent,
    amount: 1169, // 90% of $12.99
  });
}
```

**Pros:**
- Simplest implementation
- No additional Stripe products needed
- Money returns to customer's original payment method

**Cons:**
- Customer must wait until month end for refund
- Refund takes 5-10 days to appear on statement
- Some payment methods (ACH) have longer refund windows

---

### Option B: Customer Balance Credits (Billing Credit)

Instead of refunding, credit the customer's Stripe balance for future invoices.

```javascript
// Credit $11.69 to customer balance
await stripe.customers.createBalanceTransaction(customerId, {
  amount: -1169, // Negative = credit (reduces future invoices)
  currency: 'usd',
  description: 'Goal achievement reward - 24/30 days'
});
```

**Pros:**
- Instant application to account
- Encourages retention (credit applies to next month)
- Clear audit trail via Customer Balance Transactions

**Cons:**
- Money stays in your Stripe ecosystem (not returned to customer)
- May not feel as "rewarding" as real money back
- Doesn't work if customer cancels

**Use Case:** Better for "earn credits toward next month" vs "get your money back"

---

### Option C: Stripe Connect Transfers (Advanced)

If you want to **pay users** (vs refund):

1. Create connected accounts for users (Custom or Express)
2. Transfer rewards directly to their bank accounts

```javascript
// Transfer reward to user's connected account
await stripe.transfers.create({
  amount: 1169,
  currency: 'usd',
  destination: user.stripeConnectedAccountId,
  description: 'MOVE goal achievement reward'
});
```

**Pros:**
- Sends money directly to user's bank (faster visibility)
- Can exceed original payment amount
- Works even if user cancels subscription

**Cons:**
- **Significant compliance burden** — KYC, 1099s, money transmission laws
- Users must onboard to Stripe Connect
- Stripe Connect fees apply
- Overkill for a simple rebate program

**Verdict:** Don't use this unless you're building a marketplace/gig platform.

---

### Option D: Stripe Issuing (Prepaid Cards)

Issue branded prepaid cards where rewards accumulate:

```javascript
// Fund user's card with reward
await stripe.issuing.cards.create({
  cardholder: user.cardholderID,
  currency: 'usd',
  // ... card details
});

// Add funds
await stripe.issuing.topups.create({
  amount: 1169,
  currency: 'usd',
  destination_balance: 'issuing'
});
```

**Pros:**
- Branded experience ("MOVE Rewards Card")
- Real spendable money
- User can see balance anytime

**Cons:**
- **Very complex** — requires Stripe Issuing approval
- High operational overhead
- Setup fees and per-card costs
- Absolutely overkill for this use case

**Verdict:** Not recommended unless you're building a full fintech product.

---

## 6. Risk Assessment

### Financial Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| High refund volume depletes Stripe balance | Medium | Medium | Maintain adequate balance; set payout schedule appropriately |
| Users game the system (fake activity) | Medium | Low-Medium | Server-side validation; Apple HealthKit/Google Fit verification |
| Refund processing costs | Low | Low | Stripe doesn't charge fees on refunds (but card network fees apply for IC+ users) |

### Compliance Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Classified as illegal gambling | Very Low | High | Clear terms: effort-based, not chance-based |
| Stored value / gift card regulations | Low | Medium | It's a refund, not stored value — document clearly |
| State-specific consumer protection | Low | Low | Clear disclosure in terms of service |

### Operational Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Customer confusion ("where's my money?") | Medium | Low | Clear in-app tracking; email notifications |
| Failed refunds (closed cards) | Low | Low | Handle `refund.failed` webhook; offer alternatives |

---

## 7. Recommended Implementation

### Phase 1: Simple Partial Refunds

```javascript
// webhook handler for subscription invoice paid
async function handleInvoicePaid(invoice) {
  // Store the payment intent ID for later refund
  await db.users.update(invoice.customer, {
    currentMonthPaymentIntent: invoice.payment_intent,
    currentMonthAmount: invoice.amount_paid,
    goalStartDate: new Date()
  });
}

// End-of-month job (run on billing cycle anniversary)
async function processGoalRewards() {
  const eligibleUsers = await db.users.find({
    goalsAchieved: { $gte: 24 },
    currentMonthPaymentIntent: { $exists: true }
  });

  for (const user of eligibleUsers) {
    const refundAmount = Math.floor(user.currentMonthAmount * 0.90);
    
    await stripe.refunds.create({
      payment_intent: user.currentMonthPaymentIntent,
      amount: refundAmount,
      metadata: {
        reward_type: 'goal_achievement',
        days_achieved: user.goalsAchieved,
        month: new Date().toISOString().slice(0, 7)
      }
    });

    // Notify user
    await sendPushNotification(user.id, {
      title: "🎉 Goal Achieved!",
      body: `You hit your goals! $${(refundAmount/100).toFixed(2)} is on its way back to you.`
    });
  }
}
```

### Phase 2: Add Customer Balance Option

Let users choose: **instant credit** vs **refund to card**

```javascript
// In app settings
const rewardPreference = user.rewardPreference; // 'credit' or 'refund'

if (rewardPreference === 'credit') {
  await stripe.customers.createBalanceTransaction(user.stripeCustomerId, {
    amount: -refundAmount,
    currency: 'usd',
    description: `Goal reward - ${user.goalsAchieved}/30 days achieved`
  });
  // Next month's charge is $12.99 - $11.69 = $1.30
} else {
  await stripe.refunds.create({
    payment_intent: user.currentMonthPaymentIntent,
    amount: refundAmount
  });
}
```

---

## 8. Precedent Apps / Similar Models

While I couldn't find exact precedents using Stripe for this specific mechanic, similar models exist:

| App/Service | Model | Implementation |
|-------------|-------|----------------|
| **Stepbet** | Bet money, get it back + winnings if you hit step goals | Custom payment system |
| **Sweatcoin** | Earn coins for steps, redeem for rewards | Not a refund model |
| **Beeminder** | Commit money, lose it if you fail goals | Charge on failure (opposite model) |
| **Gymdesk** | Gym memberships with usage-based pricing | Tiered pricing, not refunds |
| **ClassPass** | Credits for unused sessions roll over | Credit system |

**Key Insight:** The "money-back guarantee for effort" model is relatively novel. Most apps either:
- Charge only if you fail (Beeminder model)
- Give rewards in proprietary currency (Sweatcoin model)
- Don't offer conditional refunds

This could be a **differentiating feature** for MOVE.

---

## 9. API Quick Reference

### Create Partial Refund
```bash
curl https://api.stripe.com/v1/refunds \
  -u sk_live_xxx: \
  -d payment_intent=pi_xxx \
  -d amount=1169 \
  -d reason=requested_by_customer
```

### Listen for Refund Events
```javascript
// Webhook events to handle
'refund.created'    // Refund initiated
'refund.updated'    // Status changed (ARN available)
'refund.failed'     // Refund failed (closed account, etc.)
```

### Check Refund Status
```javascript
const refund = await stripe.refunds.retrieve('re_xxx');
// refund.status: 'pending' | 'succeeded' | 'failed' | 'canceled'
```

---

## 10. Conclusions & Recommendations

### ✅ Do This:
1. **Use standard partial refunds** — Simplest, lowest risk, fully supported
2. **Process refunds at month end** — Clear, predictable timing
3. **Track with metadata** — `reward_type`, `days_achieved`, `month` for reporting
4. **Handle failures gracefully** — Listen for `refund.failed`, offer credit alternative
5. **Clear terms of service** — Define exactly what qualifies, timing, etc.

### ❌ Avoid:
1. **Don't use Stripe Connect** — Overkill, massive compliance burden
2. **Don't call it "cashback" or "rewards"** — Frame as "money-back guarantee for achievers"
3. **Don't refund more than charged** — Would require Connect transfers

### 🎯 Key Metrics to Monitor:
- Refund rate (% of subscribers hitting goals)
- Time to refund appearance (customer experience)
- Failed refund rate
- Chargeback rate (should stay very low with this model)

---

## Sources

- [Stripe Refunds API](https://docs.stripe.com/api/refunds)
- [Stripe Refund and Cancel Payments Guide](https://docs.stripe.com/refunds)
- [Stripe Disputes Measuring](https://docs.stripe.com/disputes/measuring)
- [Stripe Monitoring Programs](https://docs.stripe.com/disputes/monitoring-programs)
- [Stripe Customer Balance](https://docs.stripe.com/billing/customer/balance)
- [Stripe Connect Transfers](https://docs.stripe.com/connect/separate-charges-and-transfers)
- [Stripe Services Agreement](https://stripe.com/legal/ssa)

---

*Research compiled by Claw — Technical Researcher subagent*
