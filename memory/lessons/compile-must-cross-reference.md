# Morning report compile must cross-reference existing setup
**Date:** 2026-02-17
**Lesson:** Feb 17 report recommended Chrome DevTools MCP, Qwen3-TTS, and security audit — all things we already had. The compile subagent had no awareness of our existing tools.
**Fix:** Added Step 2.5 to compile.md — reads TOOLS.md, facts.md, decisions/, and episodic.md before writing recommendations. Every item now checked against "do we already have this?"
**Root cause:** Memory restructure on Feb 16 changed file locations, but the compile prompt never referenced our tool inventory at all — this was always a gap, just more visible now.
