# Workspace Disk Audit — Feb 20, 2026

**Total:** 6.7G (was 6.8G, ~160M freed from cache cleanup)

## Breakdown by Size

| Path | Size | Notes |
|------|------|-------|
| `.venv/` | 1.7G | torch (402M), mlx (149M), scipy (97M), rasterio (67M). torch needed by Qwen3-TTS model loading |
| `projects/` | 1.4G | bjorns-brew (843M), xperience-pricing-tool (465M), slc-lead-gen (201M) — mostly node_modules |
| `Qwen3-TTS/` | 1.2G | **Has its own .venv (1.2G!)** separate from main .venv. Used by claw-speak.sh, ki-speak.sh |
| `systems/` | 707M | roof-estimator alone is 705M (458M node_modules) |
| `sim-studio/` | 526M | Cloned repo. **Unclear if actively used.** |
| `tools/shannon/` | 247M | Pentesting tool. Specialized use. |
| `mcp-ext-apps/` | 131M | MCP extensions |
| `research/` | 95M | 70M in archive/ |
| `node_modules/` (root) | 79M | twilio, puppeteer-core, etc. |
| `reports/` | 57M | 53M in archive/ |

## Cleanup Done (This Session)

| Action | Savings |
|--------|---------|
| Cleared bjorns-brew `.next/cache` | ~80M |
| Cleared bjorns-brew video-ad `node_modules/.cache` | ~66M |
| Cleared xperience-pricing-tool `.next/cache` | ~15M |
| Archived old morning reports (Feb 7-9) | (reorganized) |
| **Total freed** | **~160M** |

## Recommendations for Marb

### 🔴 High Impact (ask Marb)
1. **sim-studio** (526M) — Is this still needed? It's a cloned repo that hasn't been used recently.
2. **Qwen3-TTS has duplicate .venv** (1.2G) — The Qwen3-TTS dir has its own Python venv separate from the main one. Both have torch, numba, etc. Could potentially consolidate.
3. **torch in main .venv** (402M) — Only used by Qwen3-TTS scripts which use their own .venv anyway. Might be removable from main .venv.

### 🟡 Medium Impact (safe with npm install to restore)
4. **node_modules across projects** (~1G total) — bjorns-brew/video-ad, xperience-pricing-tool, slc-lead-gen, roof-estimator. Could rm and `npm install` when needed.
5. **Shannon** (247M) — Pentesting tool. Keep if white-box testing planned, otherwise could archive.

### 🟢 Already Optimal
- research/ already pruned (Feb 19 task)
- reports/ archived appropriately
- memory/ lean at 504K
- scripts/ lean at 276K

## Potential Max Savings
If all recommendations applied: **~2.4G** recoverable (6.7G → ~4.3G)
