# Active Context — Feb 7, 2026

## Current Focus
**XPERIENCE Roofing Instant Roof Estimator** — Deployed, awaiting Marb's feedback

## Status
- **Live URL:** https://roof-estimator-ten.vercel.app
- **Project dir:** ~/clawd/systems/roof-estimator/
- All critical QA issues fixed, 7 deploys done

## Open Items
1. **TOOLS.md audit** — Marb flagged it's near 20K char limit, offered to trim. Awaiting response.
2. **Config stability** — Settled on 200K contextTokens, 120K flush, 35K reserve. Monitor.
3. **Roof estimator needs from XPERIENCE:** Real photos, phone/email, pricing/financing data, production DB
4. **Stale files to clean:** bookmarks-full-20260128.json, bookmarks-state-OLD.json, twitter-night-scan.json
5. **Storm dispatcher ready** — needs contacts populated and cron job to activate
6. **Re-enable paused cron jobs** (c0aac116, d1b4c076, 19eebbd7) when build work settles

## Recent Config (Stable)
- contextTokens: 200K (main session), 120K default
- softThresholdTokens: 120K
- reserveTokensFloor: 35K
- All 12 cron jobs healthy with proper delivery.to fields
