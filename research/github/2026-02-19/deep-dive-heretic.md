# Deep Dive: p-e-w/heretic

## Overview
- **Repo:** https://github.com/p-e-w/heretic
- **Stars:** 8,191 (+946 today)
- **Language:** Python
- **Author:** p-e-w
- **HuggingFace:** heretic-org

## What It Does
Automated censorship removal ("abliteration") for transformer-based language models. Combines:
- Advanced directional ablation (Arditi et al. 2024, Lai 2025)
- TPE-based parameter optimization via Optuna
- Co-minimizes refusals AND KL divergence from original model

## Key Results
On gemma-3-12b-it:
| Model | Refusals (100 prompts) | KL Divergence |
|-------|----------------------|---------------|
| Original | 97/100 | 0 |
| mlabonne abliterated | 3/100 | 1.04 |
| huihui-ai abliterated | 3/100 | 0.45 |
| **heretic** | **3/100** | **0.16** |

Same refusal suppression, 3x less model damage than best manual abliteration.

## Technical Innovation
- Fully automated — no understanding of transformer internals needed
- Optuna optimization finds optimal ablation parameters
- Built-in evaluation functionality
- Tested on RTX 5090 with PyTorch 2.8

## Relevance
MEDIUM. Interesting for:
- Creating uncensored local models for Ollama
- Understanding the abliteration technique
- Privacy: running fully uncensored models locally

## Concerns
- Ethical implications of automated censorship removal at scale
- Could lower the barrier for misuse
- Still requires significant GPU (RTX 5090 used in benchmarks)
