# Deep Dive: karpathy/nanochat

**URL:** https://github.com/karpathy/nanochat
**Stars:** 15K+ | **Language:** Python | **Re-trending:** Feb 2026

## What It Does
Karpathy's simplest experimental harness for training LLMs. Single GPU node, minimal/hackable code covering the full LLM lifecycle: tokenization → pretraining → finetuning → evaluation → inference → chat UI.

## Key Innovation: The Depth Dial
One single complexity parameter (`--depth`) controls everything. Set depth=26 and you get GPT-2 capability. All other hyperparameters (width, heads, LR, training horizon, weight decay) are calculated automatically in an optimal way.

## GPT-2 Speedrun Leaderboard
| # | Time | CORE Score | Date | Notes |
|---|------|------------|------|-------|
| 0 | 168h | 0.2565 | 2019 | Original OpenAI GPT-2 |
| 1 | 3.04h | 0.2585 | Jan 29 | d24 baseline |
| 2 | 2.91h | 0.2578 | Feb 2 | d26 + fp8 |
| 3 | 2.76h | 0.2602 | Feb 5 | 1M token batch |

Cost went from ~$43,000 (2019) → ~$72 (2026). On spot instances: ~$20.

## Why Interesting
- Perfect educational tool for understanding LLM training
- The "one dial" approach to model scaling is elegant
- Community leaderboard drives optimization
- Shows the 600x cost reduction in LLM training over 7 years

## Recommendation
**Action: Watch.** Great reference for understanding training dynamics. Not directly actionable for our workflows but intellectually valuable.
