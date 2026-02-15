# Deep Dive: karpathy/nanochat

## Overview
Karpathy's latest project — the simplest experimental harness for training LLMs end-to-end. Covers tokenization, pretraining, finetuning, evaluation, inference, and a ChatGPT-like web UI.

## Key Details
- **Author:** Andrej Karpathy
- **URL:** https://github.com/karpathy/nanochat
- **Language:** Python (PyTorch)
- **Maturity:** Active development (leaderboard entries from Jan-Feb 2026)

## What Makes It Special
1. **Single "depth" dial**: Set `--depth` (number of transformer layers) and ALL other hyperparameters auto-calculate optimally (width, heads, LR, training horizon, weight decay)
2. **GPT-2 for $72**: Train GPT-2-grade model in ~3 hours on 8xH100 ($24/hr). On spot instances ~$20.
3. **GPT-2 Speedrun Leaderboard**: Community competition to reduce wall-clock time. Currently at 2.76 hours (down from 168 hours original OpenAI training).
4. **Full pipeline**: tokenization → pretraining → finetuning → eval → inference → chat UI in one repo
5. **Single GPU friendly**: Works on single GPU with automatic gradient accumulation (just 8x slower)

## Speedrun Leaderboard (Current)
| # | Time | CORE Score | Date | Notes |
|---|------|------------|------|-------|
| 0 | 168h | 0.2565 | 2019 | Original OpenAI GPT-2 |
| 1 | 3.04h | 0.2585 | Jan 29 | d24 baseline |
| 2 | 2.91h | 0.2578 | Feb 2 | d26 + fp8 |
| 3 | 2.76h | 0.2602 | Feb 5 | 1M token batch |

## Activity & Community
- Active Discord channel (#nanochat)
- DeepWiki integration for repo Q&A
- Discussions tab active
- Follows lineage of nanoGPT → modded-nanogpt → nanochat

## Relevance to Us
- **Educational**: Great for understanding LLM training dynamics
- **Practical**: Could train small custom models for specific tasks (e.g., domain-specific assistants)
- **Cost**: Makes LLM training accessible at hobby budget
- **Research**: Scaling laws scripts included for experimentation

## Action Items
- Star and watch for updates
- Consider running a d12 training run locally for learning purposes
- Track speedrun leaderboard for training optimization techniques we could apply elsewhere
