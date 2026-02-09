# Deep Dive: p-e-w/heretic

## Overview
Fully automatic censorship/safety-alignment removal for transformer LLMs using optimized abliteration.

## How It Works
- Implements directional ablation ("abliteration") from Arditi et al. 2024
- Uses Optuna TPE-based parameter optimizer to find optimal abliteration params
- Co-minimizes: refusal count + KL divergence from original model
- Result: decensored model retaining maximum original intelligence
- **Zero human intervention** — just `heretic Qwen/Qwen3-4B-Instruct-2507`

## Quality
On gemma-3-12b-it: achieves same refusal suppression (3/100) as expert manual abliterations but at 0.16 KL divergence vs 0.45-1.04 for others. Significantly less capability damage.

## Technical
- Python 3.10+, PyTorch 2.2+
- `pip install -U heretic-llm`
- ~45 min on RTX 3090 for Llama-3.1-8B
- Supports most dense models, many multimodal, some MoE
- Research features: residual vector plots, PaCMAP projections
- Published models on HuggingFace: p-e-w collections

## Relevance
- **Medium** — Interesting for local LLM experimentation
- Could create uncensored versions of models for Ollama
- Research value for understanding model internals (interpretability features)

## Action Items
- [ ] Try on a small model when GPU time available
- [ ] Watch for Apple Silicon / MPS support
