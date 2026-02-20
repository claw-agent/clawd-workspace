# Deep Dive: p-e-w/heretic

## Overview
Heretic automatically removes censorship/safety alignment from transformer LLMs using optimized directional ablation ("abliteration"). It uses TPE-based parameter optimization via Optuna to find the best abliteration parameters automatically.

## Key Technical Details
- **Method:** Directional ablation (Arditi et al. 2024) with automated parameter search
- **Optimization:** Co-minimizes refusals AND KL divergence from original model
- **Result:** Decensored models that retain original intelligence (lower KL divergence than manual abliterations)
- **Support:** Most dense models, many multimodal models, several MoE architectures
- **Performance:** ~45 min on RTX 3090 for 8B model. Supports bitsandbytes 4-bit quantization for lower VRAM.
- **Community:** 1,000+ Heretic models on Hugging Face

## Installation
```bash
pip install -U heretic-llm
heretic Qwen/Qwen3-4B-Instruct-2507
```

## Relevance to Us
**MODERATE.** We run local models via Ollama (glm4:9b, llama3.1:8b, llama3.2:3b). Heretic could uncensor these for:
- Unrestricted creative writing (Red Rising content)
- Research without safety guardrails blocking legitimate queries
- Testing security scenarios with Shannon

## Concerns
- Requires NVIDIA GPU (RTX series) — our Mac mini has Apple Silicon
- Could potentially run with MPS backend but not officially supported
- Ethical considerations around uncensored models

## Verdict
**Watch list.** Interesting tool but blocked by our hardware (Apple Silicon, no NVIDIA GPU). If we get cloud GPU access or NVIDIA hardware, worth revisiting. Could also just download pre-made Heretic models from HF for Ollama.
