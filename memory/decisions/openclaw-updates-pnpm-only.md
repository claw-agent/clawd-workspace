# OpenClaw updates via pnpm only
**Date:** 2026-02-13
**Context:** Had dual installs — old npm global (2026.2.6-3) and pnpm (2026.2.14). Caused version confusion.
**Decision:** Removed npm global, all updates via `pnpm update -g openclaw`.
**Rationale:** Single source of truth for the binary. No version conflicts.
