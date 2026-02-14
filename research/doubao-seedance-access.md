# Doubao.com — Seedance 2.0 Access Research

**Date:** 2026-02-13
**Status:** ⚠️ Accessible but login blocked for non-Chinese users

## What is Doubao?

- **Doubao (豆包)** — ByteDance's AI chatbot/assistant, China's most popular AI chatbot (~60M MAU as of Nov 2024)
- Website: https://www.doubao.com → redirects to /chat/
- Same ByteDance ecosystem as Dreamina/Jimeng
- Has skills: image generation, video, coding, writing, search, PPT, music, etc.
- **Seedance 2.0** is now integrated directly — confirmed by meta description: "Seedance 2.0 视频生成模型现已全面接入豆包"

## Access from US (No VPN)

✅ **Site loads fine from US IP** — HTTP 200, full JS app loads
- CDN routes through HK (`via: n172-207-072.HK-HKG1`)
- Our IP detected: `136.36.127.243` (Utah)
- **No geo-block on the website itself**

## Login Requirements — THE BLOCKER

From the SSR data: `"is_login": false` — must be logged in to use any features.

**Login methods available on Doubao:**
1. **Phone number** (Chinese +86 number required for SMS verification)
2. **QR code scan** via Douyin (TikTok China) app
3. **Possibly email** — unclear, but ByteDance platforms typically require Chinese phone

**This is the same problem we hit with Jimeng** — QR code login requiring a Chinese phone/Douyin account.

### Key difference from @legoman_grizu's tweet:
The tweet mentioned HK VPN access. This may be because:
- HK users may have different login options (HK phone numbers accepted)
- Some features may be geo-locked to China/HK regions
- The Seedance 2.0 video generation skill may only appear for CN/HK users

## Seedance 2.0 on Doubao — What We Know

From the HTML/SSR data:
- **Skill type 3** = Image generation ("把你的想象力变成图像")
- **Skill type 14** = Unnamed (likely video — Seedance)
- The tweet shows a chat prompt: "帮我生成图片：" (Help me generate image:)
- Seedance 2.0 Fast model with **reference image support** — this is the key feature
- Meta keywords include: "豆包,Seedance 2.0,AI,AI对话,AI聊天"

## API Access (Volcengine)

From Reddit research:
- Volcengine (ByteDance cloud) offers `doubao-seedance-1-0-lite-t2v` and `doubao-seedance-1-0-pro-t2v`
- **Chinese ID required** for API key — blocked for international users
- Seedance 2.0 API likely also available on Volcengine but same restriction

## VPN Considerations

**Do we need HK VPN?**
- The site loads from US without VPN
- Login page likely accessible too
- HK VPN may help with: different login options, or seeing Seedance 2.0 features
- But the fundamental blocker is **authentication**, not geo-restriction

**Free HK VPN options (NOT recommended to sign up for):**
- Windscribe (free tier has HK servers)
- ProtonVPN (free tier, no HK but has Japan)
- Urban VPN (free Chrome extension)
- None of these solve the login problem

## Conclusion & Recommendations

### The real blocker is NOT VPN — it's authentication

1. **Chinese phone number** required for Doubao login
2. Same issue as Jimeng — ByteDance requires Chinese identity
3. Our Dreamina account (claw-agent@proton.me) may or may not work — Dreamina is the international version, Doubao is domestic China

### Options to explore:
1. **Try logging into Doubao with Dreamina credentials** — unlikely to work since they're different platforms (international vs domestic)
2. **Virtual Chinese phone number** — services like TextNow don't work for China; need a Chinese virtual number service
3. **Ask someone with Chinese phone access** to create an account
4. **Wait for international access** — ByteDance may launch Seedance 2.0 on Dreamina eventually
5. **Continue using ChatCut** — despite 25hr queues, it does work
6. **Volcengine API** — if we could get API access somehow

### Priority: 
The fastest path to Seedance 2.0 with reference images is likely waiting for it to appear on Dreamina or finding an API proxy service. The Doubao route requires Chinese phone verification which we cannot easily bypass.
