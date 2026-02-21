# Lesson: Mac Mini Memory Pressure During iOS Builds

**Date:** 2026-02-20
**What happened:** Metro bundler kept getting SIGKILL'd during Moonwalk iOS simulator builds. Multiple exec failures.
**Root cause:** Mac Mini running OpenClaw + Ollama + iOS simulator + Metro = too much RAM. macOS OOM killer targets Metro.
**Fix:** Before heavy iOS builds, kill Ollama (`ollama stop`) or use `expo start --no-dev` for production bundles. Alternatively, warn Marb about memory constraints.
**Prevention:** Add memory check to build scripts. Flag when available RAM < 4GB before starting resource-heavy tasks.
