# Apple In-App Subscription Refunds: Legal & Technical Deep Dive

**Research Date:** January 24, 2026  
**For:** Tim (Realm App)  
**Purpose:** Understanding legal obligations and technical implementation for Apple subscription refunds

---

## Executive Summary

When you sell subscriptions through Apple's App Store, **Apple is the merchant of record** — not you. This has major implications:

1. **Apple processes all refunds directly** — users request refunds through Apple, not you
2. **Apple decides whether to approve refunds** — you have no veto power
3. **You are notified after the fact** via Server Notifications
4. **You must revoke access** when notified of a refund
5. **The money Apple paid you is clawed back** from your next payout

**Key Legal Principle:** You are essentially a content/service provider, not a merchant. Apple handles the consumer relationship for payment purposes.

---

## Part 1: How Apple's Refund System Works

### 1.1 The Refund Process (User Perspective)

Users request refunds through Apple, not through your app:

1. User visits [reportaproblem.apple.com](https://reportaproblem.apple.com)
2. Signs in with their Apple Account
3. Selects "I'd like to" → "Request a refund"
4. Chooses a reason and selects the subscription/purchase
5. Apple reviews and decides (usually within 48 hours)

**Important:** Users cannot request refunds for pending charges or if they have unpaid orders.

### 1.2 Who Processes the Refund?

**Apple processes all refunds.** From Apple's Terms:

> "Each Transaction is an electronic contract between you and Apple, and/or you and the entity providing the Content on our Services."

For most users:
- **Apple Distribution International Ltd.** (Ireland) — EU, UK, and most international
- **Apple Services Pte. Ltd.** (Singapore) — Parts of Asia
- **Apple Inc.** — United States

**You (the developer) are the "App Provider"** — you license your app to Apple, who then licenses it to users. The direct financial relationship is between Apple and the user.

### 1.3 The "Custodian" Question

**Q: Are developers "custodians" of user funds?**

**A: No.** Developers are not custodians of funds. Here's why:

1. **Apple collects payment directly** from users
2. **Apple holds the funds** during the standard settlement period
3. **Apple pays developers** their share (70% or 85% after year one) minus applicable taxes
4. **When refunds occur**, Apple claws back from future payouts

You never actually hold user funds — you receive your commission after Apple's processing. This is fundamentally different from being a custodian.

From Apple's Developer Program License Agreement (Schedule 2):

> "Apple will collect payment from end users for each sale of a Licensed Application..."
> "Apple shall be entitled to the following commissions..."
> "In the event of a refund... Apple will deduct the full refund amount from the amount that would otherwise be paid to you."

### 1.4 Apple's Refund Policies

Apple's official stance (from Apple Media Services Terms):

> "All Transactions are final. Content prices may change at any time. If technical problems prevent or unreasonably delay delivery of Content, your exclusive and sole remedy is either replacement of the Content or **refund of the price paid, as determined by Apple.**"

However, Apple also states:

> "From time to time, Apple may suspend or cancel payment or **refuse a refund request** if we find evidence of fraud, abuse, or unlawful or other manipulative behavior."

**Refund eligibility varies by country/region** and is subject to:
- Apple Media Services Terms and Conditions
- Local consumer protection laws (especially important in EU, Australia, New Zealand)

---

## Part 2: Legal Considerations

### 2.1 Who Is Liable for Refunds?

**Short Answer:** Apple handles refund liability as the merchant of record.

**Detailed Analysis:**

| Aspect | Responsible Party |
|--------|-------------------|
| Processing refunds | Apple |
| Deciding refund approval | Apple |
| Returning funds to user | Apple |
| Deducting from developer payout | Apple |
| Product/service quality | Developer (App Provider) |
| Revoking access post-refund | Developer |
| Consumer protection compliance | Both (varies by jurisdiction) |

**From the Standard EULA:**

> "Subject to local law, the App Provider of any Third Party App is solely responsible for its content and warranties, as well as any claims that you may have related to the Third Party App."

This means:
- **For payment disputes:** Apple handles (as merchant)
- **For product quality claims:** Developer handles (as provider)

### 2.2 Developer Obligations

#### Contractual Obligations (Apple Developer Program Agreement)

1. **Accept refund clawbacks** — Apple deducts refunded amounts from your payouts
2. **Implement Server Notifications** — You must handle `REFUND` notifications
3. **Revoke entitlements appropriately** — When notified of refund, revoke access
4. **Maintain accurate records** — Reconcile your transactions with Apple's

#### Practical Obligations

1. **Don't double-dip** — Don't retain access AND have Apple refund
2. **Handle gracefully** — Users who got refunds shouldn't see errors; just revoked access
3. **Keep consumables separate** — If user consumed value before refund, that's often unrecoverable

### 2.3 Consumer Protection Laws

#### United States

- **No federal right to digital refunds** — Unlike physical goods, digital products have no automatic refund right
- **State laws vary** — California (where Apple is based) has limited digital refund requirements
- **FTC Act** — Prohibits unfair/deceptive practices, but doesn't mandate refunds
- **Credit card chargebacks** — Users can dispute through their card issuer (separate from Apple refunds)

#### European Union

**Strong consumer protections apply:**

From EU Consumer Rights:
> "You have a legal guarantee also when buying digital content and digital services like videos, music, mobile apps, video games or subscriptions."

Key EU rules:
- **2-year minimum guarantee** for defective digital content
- **14-day cooling-off period** for online purchases (but often waived for digital content once download begins)
- **Right to repair/replace** if content doesn't work as advertised
- **Refund if fix impossible** within reasonable time

**Important for subscriptions:**
> "In the case of continuous supply... the supplier is responsible for any defect that becomes apparent throughout the time that the digital content or service is to be supplied."

Apple acknowledges this in their Terms:
> "In countries and regions with consumer law protections, users retain their rights under these protections. In Australia and New Zealand, consumers retain their rights under the applicable consumer protection laws and regulations."

#### Australia

- **Australian Consumer Law** provides strong protections
- Apps and subscriptions must be "fit for purpose"
- Automatic remedies for faulty products
- Apple cannot contract out of these protections

#### Key Legal Principle

**You cannot waive consumer statutory rights through Terms of Service.** Even though Apple says "All Transactions are final," consumer protection laws in many jurisdictions override this for defective products/services.

### 2.4 Chargebacks vs. Refunds

| Aspect | Apple Refund | Chargeback |
|--------|--------------|------------|
| Initiated by | User (via Apple) | User (via bank/card issuer) |
| Decided by | Apple | Bank/card network |
| Developer notification | Server Notification | Often none directly |
| Fees | No extra fee | Can incur chargeback fees |
| Your control | None | Can dispute with evidence |
| Impact on account | Minimal | High chargeback rates = problems |

**Chargebacks are separate from Apple refunds.** A user could:
1. Request an Apple refund (Apple denies)
2. Then file a chargeback with their credit card company
3. Bank may reverse the charge regardless of Apple's decision

When chargebacks happen on Apple transactions, Apple handles the dispute process with the bank, but repeated chargebacks can affect your developer account standing.

---

## Part 3: Technical Implementation

### 3.1 App Store Server Notifications

Apple sends real-time notifications when subscription states change. **Version 2 notifications** (current standard) include:

#### Notification Types for Refunds

| Notification Type | Subtype | Meaning |
|-------------------|---------|---------|
| `REFUND` | — | Apple refunded a transaction |
| `REFUND_REVERSED` | — | Apple reversed a previously-reported refund (rare) |
| `REFUND_DECLINED` | — | Apple declined a refund request (for your info) |

#### Setting Up Server Notifications

1. **App Store Connect** → Your App → App Information → App Store Server Notifications
2. Enter your HTTPS endpoint URL (must be HTTPS)
3. Select Version 2 notifications
4. Apple will POST signed JSON payloads to your endpoint

#### Notification Payload Structure (V2)

```json
{
  "signedPayload": "eyJ...(JWT)..."
}
```

Decode the JWT to get:

```json
{
  "notificationType": "REFUND",
  "subtype": null,
  "data": {
    "signedTransactionInfo": "eyJ...(JWT)...",
    "signedRenewalInfo": "eyJ...(JWT)..."
  },
  "notificationUUID": "unique-notification-id",
  "version": "2.0",
  "signedDate": 1640000000000
}
```

### 3.2 Handling REFUND Notifications

```swift
// Pseudo-code for handling refund
func handleRefundNotification(notification: AppStoreNotification) {
    // 1. Verify the JWT signature (critical for security!)
    guard verifyAppleSignature(notification.signedPayload) else {
        return // Reject invalid notifications
    }
    
    // 2. Decode transaction info
    let transaction = decodeTransactionInfo(notification.data.signedTransactionInfo)
    
    // 3. Find user by originalTransactionId
    let user = findUserByOriginalTransactionId(transaction.originalTransactionId)
    
    // 4. Revoke entitlement
    revokeSubscriptionAccess(
        userId: user.id,
        productId: transaction.productId,
        transactionId: transaction.transactionId
    )
    
    // 5. Log for reconciliation
    logRefund(
        userId: user.id,
        transactionId: transaction.transactionId,
        refundDate: transaction.revocationDate,
        reason: transaction.revocationReason
    )
    
    // 6. Respond with 200 OK
    return HTTP.ok
}
```

### 3.3 Key Fields in Refund Transaction

| Field | Description |
|-------|-------------|
| `originalTransactionId` | Links to original purchase (use to find user) |
| `transactionId` | The specific transaction refunded |
| `revocationDate` | When Apple processed the refund |
| `revocationReason` | `REFUNDED_BY_SUPPORT` or `REFUNDED_FOR_ISSUE` |
| `productId` | Your subscription product identifier |

### 3.4 Detecting Refunds via API (Polling)

If you miss notifications, you can verify status via the App Store Server API:

```
GET /inApps/v1/subscriptions/{originalTransactionId}
```

Check `status` field for each subscription group:
- Active subscriptions: `status: 1` (Active)
- Refunded: Transaction will show `revocationDate` and `revocationReason`

### 3.5 Reconciliation Best Practices

1. **Store originalTransactionId** with user records
2. **Webhook idempotency** — Handle duplicate notifications gracefully
3. **Async processing** — Return 200 immediately, process in background
4. **Retry handling** — Apple retries failed notifications; dedupe by notificationUUID
5. **Audit trail** — Log all state changes for financial reconciliation
6. **Graceful degradation** — If webhook fails, periodic polling catches missed refunds

### 3.6 StoreKit 2 (Client-Side) Refund Info

In StoreKit 2, transactions have a `revocationDate` property:

```swift
for await result in Transaction.currentEntitlements {
    if case .verified(let transaction) = result {
        if transaction.revocationDate != nil {
            // This transaction was refunded
            // Revoke access to the associated content
        }
    }
}
```

**Important:** Client-side checks are supplementary. Always use server notifications as the source of truth for access control.

---

## Part 4: Stripe vs. Apple IAP

### 4.1 When Can You Use Stripe Instead?

**Apple's rules (Guideline 3.1.1):**

> "If you want to unlock features or functionality within your app, you must use in-app purchase."

**You MUST use Apple IAP for:**
- Digital content consumed in the app
- Subscription access to app features
- Virtual currencies, game items
- Premium app features/upgrades

**You CAN use Stripe (external payment) for:**
- Physical goods/services delivered outside the app
- Person-to-person services (tutoring, consultations)
- "Reader" apps (accessing content purchased elsewhere)
- Enterprise/B2B sales (with restrictions)
- Web-based services accessed outside the app

**Recent changes:**
- US App Store now allows links to external payment options (with Apple still taking a commission on resulting purchases)
- EU has additional allowances under DMA regulations

### 4.2 Stripe Subscription Refunds

If you're using Stripe for web subscriptions (where allowed):

| Aspect | Stripe | Apple IAP |
|--------|--------|-----------|
| Merchant of record | **You** | Apple |
| Refund decision | **You decide** | Apple decides |
| Processing | You initiate via API/Dashboard | Apple handles |
| Notification | Webhook events | Server Notifications |
| Chargeback risk | **You bear it** | Apple bears it |
| User relationship | Direct | Through Apple |

#### Stripe Refund Flow

```javascript
// Full refund
const refund = await stripe.refunds.create({
  payment_intent: 'pi_xxx',
});

// Partial refund
const refund = await stripe.refunds.create({
  payment_intent: 'pi_xxx',
  amount: 500, // $5.00 in cents
});

// Refund and cancel subscription
await stripe.subscriptions.cancel('sub_xxx');
```

#### Stripe Webhook Events for Refunds

- `charge.refunded` — Refund was processed
- `charge.refund.updated` — Refund status changed
- `charge.dispute.created` — Chargeback filed
- `customer.subscription.deleted` — Subscription canceled

### 4.3 Pros/Cons Comparison

| Factor | Apple IAP | Stripe (web) |
|--------|-----------|--------------|
| **Revenue** | 70-85% (Apple takes 15-30%) | ~97% (Stripe takes ~3%) |
| **Refund control** | None | Full control |
| **Chargeback liability** | Apple's | Yours |
| **User trust** | High (Apple brand) | Depends on your brand |
| **Implementation** | StoreKit API | Stripe SDK + custom backend |
| **Cross-platform** | iOS only | Works everywhere |
| **Compliance burden** | Low (Apple handles) | Higher (you handle) |
| **User friction** | Low (Apple Pay built-in) | Higher (enter card info) |

### 4.4 Legal Differences

**With Apple IAP:**
- Apple's EULA governs user relationship
- Apple handles consumer complaints
- Apple liable for payment disputes
- Your liability limited to service delivery

**With Stripe:**
- **You create Terms of Service**
- **You handle consumer complaints**
- **You're liable for chargebacks and disputes**
- **You must comply with PCI DSS** (simplified with Stripe.js)
- **You must handle consumer protection law compliance directly**

---

## Part 5: Recommendations for Tim/Realm

### 5.1 If Using Apple IAP (Most Likely)

1. **Implement Server Notifications V2** — This is mandatory for proper subscription management
2. **Handle REFUND notifications** — Revoke access immediately upon receipt
3. **Don't fight refunds** — You have no mechanism to do so; just process them gracefully
4. **Track for abuse** — If a user repeatedly gets refunds, you can choose not to provide services
5. **Communicate clearly** — Your app's support should direct refund requests to Apple
6. **Reconcile monthly** — Match your records with App Store Connect reports

### 5.2 Refund Policy Messaging

In your app/website, be clear:

> "Subscriptions are billed by Apple. To request a refund, please visit [Apple's Report a Problem](https://reportaproblem.apple.com) page. We cannot process refunds directly."

### 5.3 If Considering Stripe Alternative

Only viable if:
- Selling web-only access (no app features)
- Offering physical goods/services
- Operating in exempt categories (reader apps, enterprise)

If viable, Stripe gives you:
- Higher revenue (97% vs 70-85%)
- Full refund control
- Direct customer relationship
- But: Higher complexity and compliance burden

---

## Key Takeaways

1. **You're not the merchant** — Apple is. This fundamentally changes your liability profile.

2. **Refunds happen without your consent** — Accept this and build your systems accordingly.

3. **Implement Server Notifications** — This is how you stay synchronized with Apple.

4. **Consumer protection laws vary** — EU/Australia have strong protections that override Apple's "all sales final" language.

5. **Chargebacks are separate** — Even if Apple denies a refund, users can dispute with their bank.

6. **Stripe is an option only for limited use cases** — If your monetization is app features, you're locked to Apple IAP.

7. **Document everything** — For accounting, compliance, and dispute resolution.

---

## Sources & References

1. **Apple Developer Documentation**
   - [App Store Server Notifications](https://developer.apple.com/documentation/appstoreservernotifications)
   - [StoreKit Documentation](https://developer.apple.com/documentation/storekit)
   - [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)

2. **Apple Legal**
   - [Apple Media Services Terms and Conditions](https://www.apple.com/legal/internet-services/itunes/)
   - [Apple Developer Program License Agreement](https://developer.apple.com/support/terms/)
   - [Licensed Application EULA](https://www.apple.com/legal/internet-services/itunes/dev/stdeula/)

3. **Apple User Support**
   - [Request a Refund](https://support.apple.com/en-us/118223)

4. **Consumer Protection**
   - [EU Consumer Rights for Digital Content](https://europa.eu/youreurope/citizens/consumers/shopping/guarantees/)
   - [Australian Consumer Law](https://www.accc.gov.au/consumers/consumer-rights-guarantees)

5. **Stripe Documentation**
   - [Subscription Overview](https://docs.stripe.com/billing/subscriptions/overview)
   - [Webhook Handling](https://docs.stripe.com/billing/subscriptions/webhooks)
   - [Cancel Subscriptions](https://docs.stripe.com/billing/subscriptions/cancel)

---

*Last Updated: January 24, 2026*
