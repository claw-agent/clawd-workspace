# iOS App Pre-Launch Checklist

*Source: @Hartdrawss — "Shipped 5+ iOS apps, prevents 90% of rejection disasters"*

---

## 1. App Store Assets
- [ ] App icon: 1024x1024 (no transparency)
- [ ] Screenshots: all device sizes
- [ ] App description under 4000 chars
- [ ] Privacy policy URL live
- [ ] Support email that works

## 2. Technical Setup
- [ ] API keys moved to env variables
- [ ] Error tracking configured
- [ ] TestFlight tested on real devices
- [ ] All third-party SDKs approved versions
- [ ] Memory leaks checked

## 3. Legal Requirements
- [ ] Privacy policy hosted
- [ ] Terms of service URL
- [ ] COPPA compliance if targeting kids
- [ ] Data collection declared accurately
- [ ] Age rating matches content

## 4. Developer Accounts
- [ ] Apple Developer: $99/year paid
- [ ] Google Play: $25 one-time paid
- [ ] Bundle ID matches everywhere
- [ ] Certificates not expired

## 5. Cost Reality Check
- [ ] Hosting: $20-50/month
- [ ] Database: $0-30/month
- [ ] AI APIs: calculate per-user cost
- [ ] Payment processing: 2.9% + 0.30
- [ ] Push notifications: usually free tier works

---

## ⚠️ Common Gotchas
| Issue | Consequence |
|-------|-------------|
| Missing support email | Instant rejection |
| Wrong privacy policy | 2 week delay |
| Expired certificates | Build fails at 3am |
| No error tracking | Debugging blind |
| Skip TestFlight | Real device bugs |

---

**Golden Rule:** If you can't check every box, don't submit yet. Every rejection adds a week to launch.

*Saved: Feb 5, 2026*
