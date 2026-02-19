# Stripe Subscriptions & Refund Handling Research

*Research compiled: January 24, 2026*

This document covers Stripe's subscription billing system, refund handling, compliance requirements, and comparisons with Apple IAP for Tim's app considerations.

---

## Table of Contents

1. [Stripe Subscription Refunds](#1-stripe-subscription-refunds)
2. [Technical Implementation](#2-technical-implementation)
3. [Legal/Compliance](#3-legalcompliance)
4. [Stripe vs Apple IAP Comparison](#4-stripe-vs-apple-iap-comparison)
5. [Best Practices](#5-best-practices)

---

## 1. Stripe Subscription Refunds

### How Refunds Work

Stripe refunds are processed back to the **original payment method** only—you cannot redirect refunds to different cards or accounts. When you issue a refund:

1. Stripe submits the request to the customer's bank/card issuer
2. The refund appears on the customer's statement within **5-10 business days**
3. If the card is expired/canceled, the issuer typically credits a replacement card or provides alternative delivery (check, bank deposit)

**Key Points:**
- Refunds use your **available Stripe balance** (not pending amounts)
- If balance is insufficient, card refunds are held as pending; other payment methods fail
- Fully refunded charges **cannot** be disputed/chargebacked
- Stripe can optionally email customers about refunds (configurable in Dashboard)

### Partial vs Full Refunds

```javascript
// Full Refund
const refund = await stripe.refunds.create({
  charge: 'ch_xxx', // or payment_intent: 'pi_xxx'
});

// Partial Refund
const partialRefund = await stripe.refunds.create({
  charge: 'ch_xxx',
  amount: 500, // $5.00 in cents
});
```

**Rules:**
- Multiple partial refunds are allowed
- Total refunds cannot exceed original charge amount
- Each refund creates a separate `refund` object
- Bulk full refunds supported in Dashboard (partial must be individual)

### Proration Calculations

Prorations ensure fair billing when subscriptions change mid-cycle. Key scenarios that trigger prorations:

| Change | Effect |
|--------|--------|
| Upgrade plan | Credit for unused time + charge for new plan's remaining time |
| Downgrade plan | Credit for unused time + charge for cheaper plan's remaining time |
| Add/remove items | Prorated based on current billing period |
| Change quantity | Prorated adjustment |
| Add trial to active sub | Prorated credit |
| Reset billing anchor | Prorated adjustment |

**Example Calculation:**
- Customer on $10/month plan upgrades to $20/month halfway through
- Credit: -$5 (unused half of $10 plan)
- Charge: +$10 (half month at $20 plan)
- Net: Customer pays additional $5

```javascript
// Preview proration before making changes
const previewInvoice = await stripe.invoices.createPreview({
  customer: 'cus_xxx',
  subscription: 'sub_xxx',
  subscription_details: {
    items: [{
      id: subscription.items.data[0].id,
      price: 'price_new_xxx',
    }],
    proration_date: Math.floor(Date.now() / 1000),
  },
});

// Control proration behavior
const subscription = await stripe.subscriptions.update('sub_xxx', {
  items: [{ id: 'si_xxx', price: 'price_new_xxx' }],
  proration_behavior: 'create_prorations', // default
  // Options: 'create_prorations' | 'always_invoice' | 'none'
});
```

### Webhook Events for Refunds

Essential refund-related webhooks to handle:

| Event | Description | Action |
|-------|-------------|--------|
| `refund.created` | Refund initiated | Log refund, notify customer |
| `refund.updated` | Refund details changed (e.g., ARN added) | Update records |
| `refund.failed` | Refund couldn't be processed | Contact customer for alternative |
| `charge.refunded` | Charge was refunded (includes partials) | Update access/records |
| `charge.dispute.funds_reinstated` | Dispute closed, funds returned | Update accounting |

```javascript
// Webhook handler example
app.post('/webhook', async (req, res) => {
  const event = stripe.webhooks.constructEvent(
    req.body,
    req.headers['stripe-signature'],
    webhookSecret
  );

  switch (event.type) {
    case 'refund.created':
      const refund = event.data.object;
      await logRefund(refund);
      await notifyCustomer(refund.charge);
      break;
    
    case 'refund.failed':
      const failedRefund = event.data.object;
      // Handle failed refund - contact customer
      console.log('Refund failed:', failedRefund.failure_reason);
      // Reasons: declined, expired_or_canceled_card, 
      // insufficient_funds, lost_or_stolen_card, etc.
      break;
  }

  res.json({ received: true });
});
```

### Customer Portal for Self-Service

Stripe's Customer Portal allows customers to manage their own subscriptions without developer intervention.

**Features:**
- Download invoices
- Update payment methods
- Cancel subscriptions (immediate or end-of-period)
- Upgrade/downgrade plans
- Update billing information and tax IDs

**Setup:**

```javascript
// Create a portal session
const session = await stripe.billingPortal.sessions.create({
  customer: 'cus_xxx',
  return_url: 'https://yourapp.com/account',
});

// Redirect customer to session.url
```

**Configuration** (Dashboard → Settings → Billing → Customer Portal):
- Enable/disable specific features
- Set allowed products for plan switching (max 10)
- Configure cancellation options
- Add branding (logo, colors)
- Enable cancellation deflection (offer coupons)

**Limitations:**
- Can't update subscriptions with multiple products, usage-based billing, or scheduled changes
- Can't display in iframe
- Customers modifying trialing subscriptions end the trial immediately
- Sessions expire after 5 minutes unused, then 1 hour after first use

---

## 2. Technical Implementation

### Stripe Billing Setup

**1. Create Products and Prices:**

```javascript
// Create a product
const product = await stripe.products.create({
  name: 'Pro Plan',
  description: 'Full access to all features',
});

// Create a recurring price
const monthlyPrice = await stripe.prices.create({
  product: product.id,
  unit_amount: 999, // $9.99
  currency: 'usd',
  recurring: {
    interval: 'month',
  },
});

const yearlyPrice = await stripe.prices.create({
  product: product.id,
  unit_amount: 9900, // $99.00 (save ~17%)
  currency: 'usd',
  recurring: {
    interval: 'year',
  },
});
```

**2. Create a Subscription:**

```javascript
// Create customer
const customer = await stripe.customers.create({
  email: 'customer@example.com',
  payment_method: 'pm_xxx',
  invoice_settings: {
    default_payment_method: 'pm_xxx',
  },
});

// Create subscription
const subscription = await stripe.subscriptions.create({
  customer: customer.id,
  items: [{ price: monthlyPrice.id }],
  payment_behavior: 'default_incomplete', // Recommended
  expand: ['latest_invoice.payment_intent'],
});

// Handle the payment intent for 3DS if needed
if (subscription.latest_invoice.payment_intent.status === 'requires_action') {
  // Send client_secret to frontend for 3DS authentication
}
```

### Subscription Lifecycle Events

| Status | Description | Action |
|--------|-------------|--------|
| `trialing` | In trial period | Provision access |
| `active` | Payment successful, subscription running | Full access |
| `incomplete` | Payment required within 23 hours | Prompt for payment |
| `incomplete_expired` | First payment failed after 23 hours | No access, cleanup |
| `past_due` | Payment failed, retrying | Notify customer, may continue access |
| `canceled` | Subscription ended | Revoke access |
| `unpaid` | Retries exhausted, no payment | Revoke access |
| `paused` | Trial ended without payment method | No invoicing until resumed |

**Key Webhooks to Handle:**

```javascript
// Essential subscription webhooks
const essentialWebhooks = [
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
  'customer.subscription.trial_will_end', // 3 days before trial ends
  'customer.subscription.paused',
  'customer.subscription.resumed',
  'invoice.paid',
  'invoice.payment_failed',
  'invoice.payment_action_required', // 3DS needed
  'invoice.upcoming', // Few days before renewal
];
```

### Handling Failed Payments

**Automatic Smart Retries:**

Stripe's Smart Retries use ML to determine optimal retry timing. Enable in Dashboard → Settings → Billing → Automatic.

**Failed Payment Flow:**

```javascript
// Handle invoice.payment_failed
async function handleFailedPayment(invoice) {
  const subscription = await stripe.subscriptions.retrieve(invoice.subscription);
  
  // 1. Notify customer
  await sendEmail(subscription.customer, {
    subject: 'Payment Failed',
    template: 'payment-failed',
    data: {
      amount: invoice.amount_due,
      nextRetry: invoice.next_payment_attempt,
    },
  });
  
  // 2. Check subscription status
  if (subscription.status === 'past_due') {
    // Subscription is in grace period, still has access
    await flagAccountForFollowUp(subscription.customer);
  } else if (subscription.status === 'canceled' || subscription.status === 'unpaid') {
    // Access should be revoked
    await revokeAccess(subscription.customer);
  }
}
```

### Dunning (Retry Logic)

Configure in Dashboard or programmatically:

**Dashboard Settings:**
- Number of retry attempts (1-4)
- Days between retries
- Action after all retries fail (cancel, mark unpaid, leave past_due)
- Send failed payment emails
- Send upcoming renewal reminders

**Dunning Email Sequence Example:**
1. Day 0: Payment failed, will retry
2. Day 3: Second attempt failed
3. Day 7: Final attempt before cancellation
4. Day 10: Subscription canceled

### Refund API Calls

```javascript
// Basic refund
const refund = await stripe.refunds.create({
  payment_intent: 'pi_xxx',
  reason: 'requested_by_customer', // or 'duplicate', 'fraudulent'
});

// Partial refund
const partialRefund = await stripe.refunds.create({
  payment_intent: 'pi_xxx',
  amount: 500, // $5.00
});

// Refund with metadata
const refundWithMeta = await stripe.refunds.create({
  payment_intent: 'pi_xxx',
  metadata: {
    reason: 'Customer requested downgrade',
    support_ticket: 'TICKET-123',
  },
});

// Get refund status
const refundStatus = await stripe.refunds.retrieve('re_xxx');
// status: succeeded, pending, failed, canceled
```

---

## 3. Legal/Compliance

### PCI Compliance Requirements

**Stripe's PCI Level:**
- Stripe is **PCI DSS Level 1** certified (highest level)
- Processes, stores, and transmits cardholder data in a secure vault

**Your Responsibilities:**

| Integration Method | SAQ Type | Effort |
|-------------------|----------|--------|
| Stripe Elements/Checkout | SAQ A | Minimal (13 questions) |
| Direct API (card data touches your server) | SAQ D | Extensive (300+ questions) |
| Stripe.js tokenization | SAQ A-EP | Moderate |

**Recommendations:**
- **Always use Stripe Elements, Checkout, or Payment Links** - card data never touches your servers
- Stripe auto-detects your integration and provides the correct SAQ form in Dashboard
- No PCI audit needed for SAQ A merchants

### Who is the Merchant of Record?

**With Stripe Direct Integration:**
- **YOU are the Merchant of Record (MoR)**
- Your business name appears on customer statements
- You are responsible for:
  - Refund policies
  - Customer support
  - Chargebacks (you pay $15 per dispute)
  - Tax collection and remittance
  - Legal compliance in each jurisdiction

**With Apple IAP:**
- **Apple is the Merchant of Record**
- Apple handles refunds, disputes, and taxes
- You have less control but less liability

### Stripe's Role vs Developer's Role

| Responsibility | Stripe | Developer |
|---------------|--------|-----------|
| Payment processing | ✅ | |
| Card data security | ✅ | |
| PCI compliance (infrastructure) | ✅ | |
| Fraud detection (basic) | ✅ | |
| Dispute filing | ✅ | |
| Refund decisions | | ✅ |
| Tax calculation (optional) | ✅ (Stripe Tax) | ✅ (if not using Stripe Tax) |
| Tax remittance | | ✅ |
| Customer support | | ✅ |
| Dispute evidence | | ✅ |
| Pricing decisions | | ✅ |
| Refund policies | | ✅ |

### Tax Implications (Stripe Tax)

**Stripe Tax Features:**
- Automatic tax calculation in 100+ countries
- 600+ product tax codes
- Threshold monitoring (alerts when you may need to register)
- Registration management
- Filing assistance through partners

**Pricing:**
- **Subscription**: Starting at $90/month (annual contract)
- **Pay-as-you-go**: 0.5% per transaction (no-code) or $0.50/transaction (API)

```javascript
// Enable automatic tax calculation
const subscription = await stripe.subscriptions.create({
  customer: 'cus_xxx',
  items: [{ price: 'price_xxx' }],
  automatic_tax: { enabled: true },
});
```

**Without Stripe Tax:**
- You must calculate and collect sales tax/VAT/GST yourself
- You must track nexus/registration thresholds
- You must file and remit taxes in each jurisdiction
- Consider third-party tax services (Avalara, TaxJar)

### International Considerations

**Multi-Currency:**
```javascript
// Create prices in multiple currencies
const usdPrice = await stripe.prices.create({
  product: 'prod_xxx',
  unit_amount: 999,
  currency: 'usd',
  recurring: { interval: 'month' },
});

const eurPrice = await stripe.prices.create({
  product: 'prod_xxx',
  unit_amount: 899,
  currency: 'eur',
  recurring: { interval: 'month' },
});
```

**Additional Fees for International:**
- +1.5% for international cards
- +1% if currency conversion required
- Local payment methods may have different rates

**Regional Considerations:**
- **EU**: GDPR compliance, SCA (Strong Customer Authentication) requirements
- **India**: RBI recurring payment guidelines, additional verification
- **Brazil**: CPF/CNPJ requirements
- **Australia**: GST collection requirements

---

## 4. Stripe vs Apple IAP Comparison

### Fee Comparison

| Metric | Stripe | Apple IAP |
|--------|--------|-----------|
| Standard Fee | 2.9% + $0.30 | 30% (or 15% for Small Business Program*) |
| International Cards | +1.5% | Included |
| Currency Conversion | +1% | Included |
| Subscription Fee | +0.7% (standard) | Included |
| Dispute Fee | $15 per dispute | Apple handles |
| Refund Fee | Original fee not returned | Apple handles |

*Apple Small Business Program: 15% for developers earning < $1M/year

**Example: $9.99/month subscription, US customer:**
| | Stripe | Apple IAP (30%) | Apple IAP (15%) |
|-|--------|-----------------|-----------------|
| Gross | $9.99 | $9.99 | $9.99 |
| Processing | -$0.59 (2.9% + $0.30 + 0.7%) | -$3.00 | -$1.50 |
| **Net** | **$9.40** | **$6.99** | **$8.49** |

### User Experience Differences

| Aspect | Stripe | Apple IAP |
|--------|--------|-----------|
| Payment Flow | Redirect to Stripe or embedded form | Native iOS sheet |
| Payment Methods | Cards, ACH, PayPal, Klarna, etc. | Apple Pay, cards on file |
| Saved Cards | Stripe saves across your apps | Apple ID saves across all apps |
| Family Sharing | Must implement yourself | Built-in |
| Receipt Management | Email receipts, Dashboard | iOS Settings → Apple ID |
| Refund Request | Contact developer | Settings → Apple ID (easy) |

### Refund Handling Differences

| Aspect | Stripe | Apple IAP |
|--------|--------|-----------|
| Who decides | Developer | Apple (usually auto-approved) |
| Time to refund | 5-10 business days | Often instant |
| Notification | Webhook + optional email | App Store notification (delayed) |
| Developer control | Full control | Almost none |
| Proration | Automatic calculations | No proration |
| Partial refunds | Supported | Not supported |

**Apple Refund Problem:**
- Apple often approves refunds without notifying developers promptly
- Customer may keep access while refund is processed
- Server-side receipt validation is essential to detect refunds

```swift
// iOS: Check subscription status server-side
// Apple's App Store Server API or StoreKit 2
```

### When to Use Which

**Use Apple IAP When:**
- ✅ Required by App Store guidelines (digital goods consumed in-app)
- ✅ Selling content like premium features, subscriptions for app functionality
- ✅ Want simple implementation
- ✅ Targeting Apple ecosystem heavily
- ✅ Want Family Sharing support

**Use Stripe When:**
- ✅ Selling physical goods or services consumed outside the app
- ✅ Selling person-to-person services (e.g., coaching, consulting)
- ✅ Cross-platform subscriptions (iOS, Android, Web)
- ✅ Want maximum revenue retention
- ✅ Need complex billing (metered, tiered, prorations)
- ✅ Want control over refund policies
- ✅ B2B sales with invoicing needs

**Can Use Both:**
- Different SKUs for in-app vs web signups
- "Reader" apps (content purchased elsewhere, consumed in-app)
- Physical goods alongside digital subscriptions

**⚠️ App Store Guidelines Warning:**
Apple requires IAP for:
- Subscriptions to content in the app
- Premium features
- Consumables (coins, gems, etc.)
- Non-consumables (unlock levels, filters)

Stripe is allowed for:
- Physical goods/services
- Services consumed outside the app
- Person-to-person services
- Business services (B2B)

---

## 5. Best Practices

### Subscription Management UX

**Onboarding:**
```
1. Show clear pricing with monthly/annual toggle
2. Highlight savings for annual (e.g., "Save 17%")
3. Offer trial period (7-14 days common)
4. Collect payment method upfront (higher conversion)
5. Send welcome email with key features
```

**During Subscription:**
```
1. Show current plan and renewal date in-app
2. Remind before trial ends (3 days, 1 day, day-of)
3. Send receipt emails for each charge
4. Provide easy access to billing portal
5. Show usage/value delivered (engagement emails)
```

**Cancellation Flow:**
```
1. Ask why they're canceling (collect feedback)
2. Offer alternatives:
   - Pause subscription instead
   - Downgrade to cheaper plan
   - Offer discount/coupon
3. Confirm cancellation clearly
4. Send confirmation email
5. Remind them before access ends
6. Win-back email after 30/60/90 days
```

### Reducing Involuntary Churn

Involuntary churn = customers who want to stay but payment fails.

**Strategies:**

1. **Enable Smart Retries** (Dashboard → Billing → Automatic)
   - Stripe uses ML to find optimal retry times
   - Much better than fixed schedules

2. **Card Updater**
   - Stripe automatically updates expired cards
   - Works with major card networks

3. **Pre-dunning Emails**
   - Notify before card expires
   - Link to update payment method

4. **Multiple Payment Methods**
   - Allow backup payment methods
   - Fallback automatically

5. **Grace Period**
   - Don't revoke access immediately
   - Give 3-7 days to fix payment issues

```javascript
// Example: Card expiry check
const customer = await stripe.customers.retrieve('cus_xxx', {
  expand: ['default_source'],
});

if (customer.default_source) {
  const expMonth = customer.default_source.exp_month;
  const expYear = customer.default_source.exp_year;
  const now = new Date();
  
  // Warn if expiring within 30 days
  const expiry = new Date(expYear, expMonth - 1);
  const daysUntilExpiry = (expiry - now) / (1000 * 60 * 60 * 24);
  
  if (daysUntilExpiry < 30) {
    await sendCardExpiryWarning(customer.email);
  }
}
```

### Win-Back Strategies

1. **Cancellation Survey** - Understand why they left
2. **Immediate Offer** - Discount if they stay
3. **30-Day Email** - "We miss you" + what's new
4. **60-Day Email** - Limited-time offer to return
5. **90-Day Email** - Feature highlights + discount

```javascript
// Track cancellation reason
const subscription = await stripe.subscriptions.update('sub_xxx', {
  cancel_at_period_end: true,
  cancellation_details: {
    comment: 'Too expensive',
    feedback: 'too_expensive', // or: missing_features, switched_service, unused, other
  },
});

// Later: Win-back campaign targeting 'too_expensive' segment
```

### Pause Subscription Options

Instead of canceling, offer pause:

```javascript
// Pause collection - keep subscription active, don't charge
const subscription = await stripe.subscriptions.update('sub_xxx', {
  pause_collection: {
    behavior: 'void', // void invoices during pause
    resumes_at: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60), // 30 days
  },
});

// Options:
// - 'void': Invoices are voided (customer not charged, period doesn't count)
// - 'keep_as_draft': Invoices stay draft (can charge later)
// - 'mark_uncollectible': Mark invoices uncollectible (for accounting)

// Resume early
const resumed = await stripe.subscriptions.update('sub_xxx', {
  pause_collection: '', // Unset to resume
});
```

**Pause UX Tips:**
- Limit pause duration (e.g., max 3 months)
- Limit pause frequency (e.g., once per year)
- Extend features during pause (maintain engagement)
- Send "welcome back" email on resume

---

## Quick Reference: Essential Webhooks

```javascript
// Minimum webhooks to handle for subscriptions
const requiredWebhooks = {
  // Subscription lifecycle
  'customer.subscription.created': 'Provision access',
  'customer.subscription.updated': 'Check for status changes',
  'customer.subscription.deleted': 'Revoke access',
  'customer.subscription.trial_will_end': 'Remind customer (3 days before)',
  
  // Payments
  'invoice.paid': 'Confirm access, send receipt',
  'invoice.payment_failed': 'Notify customer, may pause access',
  'invoice.payment_action_required': 'Customer needs to authenticate',
  
  // Refunds
  'refund.created': 'Log refund',
  'refund.failed': 'Handle failed refund',
  'charge.refunded': 'Update access/records',
};
```

---

## Summary Recommendations for Tim

1. **Use Stripe for web/cross-platform signups** - Higher revenue retention (keep ~94% vs ~70%)
2. **Use Apple IAP where required** - In-app digital goods per App Store guidelines
3. **Implement proper webhook handling** - Critical for subscription state management
4. **Enable Stripe Tax** if selling internationally - Simplifies compliance significantly
5. **Use Customer Portal** - Reduces support burden, customers can self-serve
6. **Implement pause instead of cancel** - Reduces churn significantly
7. **Enable Smart Retries** - Recovers ~30% of failed payments automatically
8. **Plan for refund handling** - With Stripe you control policies; with Apple you don't

---

*Last updated: January 24, 2026*
