# Deep Dive: p-e-w/heretic

## Overview
Fully automatic LLM censorship/safety-alignment removal tool using directional ablation ("abliteration"). Combines abliteration with TPE-based parameter optimization via Optuna.

## How It Works
1. Uses directional ablation to identify and remove "refusal directions" in transformer attention layers
2. Optuna TPE optimizer finds parameters that minimize both refusals AND KL divergence from original model
3. Result: uncensored model that retains intelligence of the original

## Key Results
- Gemma-3-12b-it: 97/100 refusals → 3/100, with KL divergence of only 0.16 (vs 0.45-1.04 for manual abliterations)
- Fully automatic — no understanding of transformer internals needed
- ~45 min on RTX 3090 for 8B model
- Supports bitsandbytes 4-bit quantization for lower VRAM

## Compatibility
- Most dense transformer models (including multimodal)
- Several MoE architectures
- NOT yet: SSMs/hybrid models, inhomogeneous layers, novel attention

## Community Impact
- 1,000+ community-created Heretic models on HuggingFace
- Well-received on r/LocalLLaMA
- Discord community active

## Relevance to Us
- **Medium** — We primarily use API models (Claude), but for local Ollama models this could remove safety restrictions for research use cases
- Could uncensor glm4:9b or llama3.1:8b for unrestricted local tasks
- Interesting from a technical/research perspective

## Verdict
Impressive engineering. Watch for when we need unrestricted local models. The automated approach is the key innovation — no manual parameter tuning needed.
