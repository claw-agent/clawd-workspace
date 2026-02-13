# Active Context — Feb 12, 2026

## Current Focus
- **Agent Primitives Plan** — Steps 1-3 complete (system file trimming, WAL protocol, skill routing). Remaining: persistent shell sessions, per-agent permission scoping, eval framework.
- **Red Rising Video** — ChatCut/Seedance 2.0 subagent spawned for Darrow cavern scene, status unknown
- **Morning Report Pipeline** — Working well (4 scouts → compile → deliver). Voice fallback to edge-tts (claw-speak-chunked broken, `timeout` cmd missing)

## Open Items
1. Fix `timeout` command (missing on Mac — install coreutils or workaround) so claw-speak-chunked works
2. Agent primitives remaining: persistent shell sessions, per-agent permission scoping, eval framework
3. TOOLS.md still 5.5K — could trim further
4. 8 link-only bookmarks in morning report couldn't be resolved (pipeline gap)
5. ChatCut Seedance 2.0 generation — check if video completed

## Key Config
- System files: ~15K chars (~5K tokens) — down from 48K
- softThresholdTokens: 80K | contextTokens: 180K | reserveTokensFloor: 30K
