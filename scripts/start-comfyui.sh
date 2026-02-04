#!/bin/bash
# Start ComfyUI with MPS (Apple Silicon) support
cd ~/clawd/ComfyUI
source venv/bin/activate
python main.py --force-fp16
