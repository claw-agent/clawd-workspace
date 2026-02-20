# Multi-Agent Orchestration

> Use when: Spawning 2+ subagents for parallel or sequential work. Planning multi-agent workflows.
> Don't use when: Single agent task. Simple research that one agent handles fine.
> Inputs: Task decomposition, agent assignments
> Outputs: Coordinated results from multiple agents

## Spawning Sub-Agents

**ALWAYS prepend this to every `sessions_spawn` task:**
```
Read ~/clawd/AGENTS.md first to understand operating guidelines. Then:
```

**For specialized agents**, also have them read their persona file:
```
sessions_spawn task="Read ~/clawd/AGENTS.md first, then read ~/clawd/agents/researcher.md for your role. Then: [task]"
```

## CooperBench Rules

Research shows adding agents causes **50% worse outcomes** when they touch shared state.

### When to Parallelize (Safe)
✅ **Truly independent tasks** — different files, no merge needed
✅ **Research/analysis** — multiple scouts gathering info, orchestrator synthesizes
✅ **Sequential handoffs** — one agent completes, passes clean output to next

### When NOT to Parallelize (Dangerous)
❌ **Same codebase** — agents will create merge conflicts
❌ **Shared state files** — race conditions, overwrites
❌ **Peer-to-peer coordination** — agents talking to each other fail at commitments

### Design Patterns That Work
1. **Orchestrator pattern** — One coordinator spawns specialists, collects results, synthesizes
2. **Sequential pipeline** — Agent A → clean handoff → Agent B → clean handoff → Agent C
3. **Parallel research, serial synthesis** — Scouts gather in parallel, ONE agent writes final output
4. **Verifiable claims** — All agent outputs include diffs, test results, or checksums (not just "I did X")

### The Golden Rule
**If two agents might edit the same file → make it sequential, not parallel.**

### 🔐 Credential Hygiene in Spawn Tasks
**NEVER pass passwords, API keys, or secrets as plaintext in `sessions_spawn` task strings.**
Task strings get logged in session transcripts and are visible in session history.
- ✅ Reference config files: `"Read creds from ~/clawd/config/service-creds.json"`
- ✅ Reference env vars: `"Use $API_KEY from environment"`
- ❌ `"Sign up with password: hunter2"` — exposed in logs forever

### ⚠️ Stagger Subagent Spawns (undici TLS Bug)
Spawning 3+ subagents simultaneously can crash the gateway. `undici@7.21.0` has a TLS session reuse race condition.
**Workaround:** Space `sessions_spawn` calls ~30s apart. Don't fire 3+ at once.
