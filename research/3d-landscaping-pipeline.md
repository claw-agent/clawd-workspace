# 3D Landscaping Visualization Pipeline
*Saved: Feb 14, 2026 — Build out later*

## The Opportunity
Nobody is doing AI-powered 3D landscaping visualization for contractors. Interior virtual staging is a $500M+ industry. Outdoor is wide open.

## The Pipeline
1. **Capture**: 16 ultra-wide iPhone photos of client's yard
2. **Stitch**: Teleport app → 360° equirectangular panorama
3. **AI Restage**: NanoBanana → AI generates landscaped version of panorama
4. **3D Reconstruct**: World Labs Marble → navigable 3D walkthrough

## Tools Needed
| Tool | URL | What It Does | API? |
|------|-----|-------------|------|
| Teleport | App Store (by @mountain_mal) | 16 photos → 360° pano | iPhone app only |
| NanoBanana | nanobanana.com | AI image gen, handles 360° equirectangular | Unknown — check |
| World Labs Marble | marble.worldlabs.ai | 3D reconstruction from images/panos | Yes (Martin Maly used it) |

## Use Cases for XPERIENCE
- **Landscaping**: Show client their yard transformed before work starts
- **Roofing**: Visualize different materials on their actual roof
- **Exterior painting**: Preview color options on the house
- **Hardscaping**: Patios, walkways, retaining walls
- **Pool installations**: See pool in context of their yard

## TODO When We Build This
- [ ] Download Teleport app, test 360° capture on a yard
- [ ] Check NanoBanana — does it have an API? Can it handle outdoor restaging?
- [ ] Check World Labs Marble API pricing
- [ ] Test full pipeline end-to-end on one yard
- [ ] Validate with XPERIENCE contractors — would they pay for this?
- [ ] Evaluate if we can automate into a self-service tool

## Source
Tweet: https://x.com/mountain_mal/status/2021675372639821830 (9.4K likes)
