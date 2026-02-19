# Feb 17 Morning Report — Action Items Research

## 1. @austin_hurwitz — Self-Improvement Machine

**Source:** [Tweet thread](https://x.com/austin_hurwitz/status/2023368459992846728) + [Full article](https://x.com/austin_hurwitz/status/2023132187466641771)

### Setup Review Pattern
Austin's guide is a comprehensive OpenClaw workspace blueprint. The "Setup Review" is essentially the `self-review.md` pattern:
- Agent critiques itself every ~4 hours
- Asks: Am I stuck? Waiting too long? Any mistakes to log? Stale tasks? Context bloated?
- Logs metrics (tasks completed, tests run, errors) to `metrics.json`
- Tracks against a 5-level maturity model (Factory.ai)

### Daily Self-Improvement Digest
He teased publishing a skill for "self improvement recommendations every day proactively" but hadn't published it yet as of Feb 16. The concept: agent scans its own lessons.md, metrics, and workspace state to generate improvement recommendations.

### What We Already Have vs. What's New
| Feature | Us | Austin |
|---|---|---|
| AGENTS.md | ✅ | ✅ |
| Memory tiers | ✅ (more sophisticated) | ✅ (simpler) |
| Crash recovery | ✅ active.md | ✅ active-tasks.md |
| Self-review | ❌ Not formalized | ✅ self-review.md every 4h |
| Metrics tracking | ❌ | ✅ metrics.json |
| Lessons learned | ❌ Separate file | ✅ lessons.md |
| Readiness assessment | ❌ | ✅ READINESS.md |

### 🎯 Action Items
1. **Create `memory/lessons.md`** — Formalize mistake tracking (we do it ad-hoc in daily notes)
2. **Add self-review to heartbeat** — Every 4h, ask the 5 self-review questions, log to `memory/self-review.md`
3. **Add metrics.json** — Track sessions, tasks, errors per day. Compound review fuel.
4. **Consider READINESS.md** — Nice for tracking maturity level, low effort

---

## 2. @chrysb — "5 Ways OpenClaw Will Shoot You in the Foot"

**Source:** [Tweet](https://x.com/chrysb/status/2023545992239608301) (384 likes, strong signal)

### The 5 Pitfalls

**1. Drift** — Agent scatters state everywhere (AGENTS.md, memory, disk, databases). Must enforce where it writes. Review workspace for drift nightly.
- **Us:** ✅ Partially addressed. We have strict memory tiers. But we don't audit for drift.
- 🎯 **Add drift check to heartbeat** — scan for unexpected files outside memory/

**2. Trust Boundaries** — Untrusted input = attack surface explosion. Separate sandboxed agents, code routes before AI reasons.
- **Us:** ✅ We have tirith for shell security. Standing permissions model. But group chats are a trust boundary we should think about more.
- 🎯 Already decent. Keep "code routes, AI reasons" principle in mind for XPERIENCE automation.

**3. Autonomy Calibration** — Decide autonomy by tool, not by vibes. Start read-only → filtered write → full write.
- **Us:** ✅ We have "Standing Permissions" in AGENTS.md. Good shape here.

**4. Cost Discipline** — Cache stable IDs, deterministic filtering, route to cheaper models.
- **Us:** ⚠️ We could be better. We don't route routine tasks to cheaper models.
- 🎯 **Consider model routing** — heartbeats and simple tasks to Haiku/smaller models.

**5. Observability** — Must trace failures in 5 minutes. Log webhooks, track crons, commit everything, rollback as first-class.
- **Us:** ⚠️ Our cron monitoring is minimal. No webhook status logging.
- 🎯 **Add cron health dashboard** — log last-run status for each scheduled job.

### Key Quote
> "Treat agents like distributed systems, not chatbots with tools."

---

## 3. @froessell — "How to Build Apps That Don't Look Vibecoded"

**Status: Could not find the specific thread.** Searched `from:froessell vibecoded`, `from:froessell apps design`, `from:froessell build apps`. Only found an unrelated reply about purple gradients and older design resource tweets.

The thread may have been deleted, or the morning report reference may have been to a different handle or a retweet. **Skip for now** — revisit if Marb has the direct URL.

---

## 4. Heretic (GitHub) — Automatic LLM Censorship Removal

**Source:** [github.com/p-e-w/heretic](https://github.com/p-e-w/heretic)

### What It Does
Removes safety alignment/censorship from transformer-based language models using "abliteration" (directional ablation). Fully automatic — no understanding of transformer internals needed.

### How It Works
- Combines directional ablation with TPE-based parameter optimization (Optuna)
- Co-minimizes: refusals on "harmful" prompts + KL divergence from original model
- Result: decensored model that retains original intelligence
- Example: Gemma-3-12b-it went from 97/100 refusals → 3/100, with lowest KL divergence (0.16) vs manual abliterations

### Practical Use for Us?
- **Not really.** We use API models (Claude, not local weights). Heretic only works on open-weight models you run locally.
- **Maybe:** If we ever wanted an uncensored local model for Ollama (e.g., for creative writing, red-teaming, pentesting with Shannon). Could heretic our local llama/gemma models.
- **Verdict:** Bookmark, don't act. Interesting tech but not actionable now.

---

## 5. Get Shit Done (GSD) — Meta-Prompting System

**Source:** [github.com/gsd-build/get-shit-done](https://github.com/gsd-build/get-shit-done)

### What It Is
A spec-driven development system for Claude Code. "Describe your idea, let the system extract everything, let Claude build it."

### Core Approach
- **Spec extraction** — System interviews you about what you want, generates structured specs
- **Context engineering** — XML prompt formatting, subagent orchestration, state management
- **Anti-context-rot** — Solves quality degradation as context window fills
- Installs as slash commands (e.g., `/gsd:help`)
- Designed for `--dangerously-skip-permissions` mode

### Comparison to Our System

| Feature | GSD | Us |
|---|---|---|
| Spec-driven | ✅ Core feature | ⚠️ Ad-hoc (we should do more) |
| Context rot prevention | ✅ Explicit focus | ✅ WAL protocol + compaction |
| Subagent orchestration | ✅ Built-in | ✅ Manual spawning |
| Memory persistence | ❌ Session-scoped | ✅ Multi-tier memory |
| Autonomous operation | ❌ Human-in-loop | ✅ Heartbeats, crons |
| Multi-channel | ❌ CLI only | ✅ Telegram, etc. |

### 🎯 Patterns to Steal
1. **Spec extraction before building** — When Marb describes a feature, we should generate a structured spec FIRST, get approval, then build. We do this sometimes but not systematically.
2. **XML prompt formatting** — Could improve our subagent task descriptions with structured XML rather than plain text.
3. **Anti-context-rot** — Their explicit focus on this is good. Our WAL + compaction handles it, but we could be more proactive about checkpointing mid-task.

---

## 6. AGENTS.md Research Paper (arXiv:2602.11988)

**Source:** [arxiv.org/abs/2602.11988](https://arxiv.org/abs/2602.11988) — "Evaluating AGENTS.md: Are Repository-Level Context Files Helpful for Coding Agents?"

### Key Findings
🚨 **AGENTS.md files tend to REDUCE task success rates** compared to no context, while increasing inference cost by 20%+.

### Details
- Tested across multiple coding agents and LLMs
- Both LLM-generated and developer-provided context files were tested
- Context files encourage broader exploration (more testing, file traversal) — agents respect the instructions
- **Root cause:** Unnecessary requirements make tasks harder
- **Recommendation:** Human-written context files should describe only **minimal requirements**

### 🎯 What This Means for Us
This is specifically about SWE-bench coding tasks, not persistent assistant setups. Our AGENTS.md serves a different purpose (operational instructions for a persistent agent, not repo-specific coding guidance). Still:

1. **Keep AGENTS.md lean** — We already say "MEMORY.md must stay under 5K chars." Good instinct. The paper validates this.
2. **Avoid unnecessary requirements** — Don't add rules "just in case." Every instruction has a cost.
3. **Our AGENTS.md is ~27K chars loaded every message** — The paper suggests this IS hurting us. We should audit and trim.
4. 🎯 **Audit AGENTS.md for bloat** — Remove anything that's not actively useful. Move nice-to-haves to on-demand files.

---

## 7. Awesome Claude Code

**Source:** [github.com/hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)

### Notable Tools We're Missing

**High Priority:**
- **[claude-rules-doctor](https://github.com/nulone/claude-rules-doctor)** — Detects dead rules files where glob patterns don't match. We don't use .claude/rules/ but good concept for validating our own config.
- **[Compound Engineering Plugin](https://github.com/EveryInc/compound-engineering-plugin)** — Turns mistakes into lessons. We should look at their implementation — it's exactly our compound review concept.
- **[Trail of Bits Security Skills](https://github.com/trailofbits/skills)** — Professional security audit skills (CodeQL, Semgrep, variant analysis). Would enhance Shannon.
- **[AgentSys](https://github.com/avifenesh/agentsys)** — Drift detection, multi-agent code review, agnix for linting agent configs.

**Medium Priority:**
- **[cc-devops-skills](https://github.com/akin-ozer/cc-devops-skills)** — DevOps/IaC skills. Useful if we expand XPERIENCE infra.
- **[Context Engineering Kit](https://github.com/NeoLabHQ/context-engineering-kit)** — Minimal token footprint context patterns. Could help with our 27K system prompt problem.
- **[ClaudeCTX](https://github.com/foxj77/claudectx)** — Switch entire config with one command. Useful if we need project-specific configs.

**Interesting but Low Priority:**
- Ralph Wiggum (our Ralph Loops seem to be referenced/inspired by this)
- Book Factory — nonfiction book creation pipeline
- Web Assets Generator — favicon/social image generation

### 🎯 Action Items
1. **Review Compound Engineering Plugin** — Compare to our compound review, steal patterns
2. **Evaluate Trail of Bits skills** — Could level up Shannon significantly
3. **Look at Context Engineering Kit** — Help trim our system prompt overhead
4. **Check AgentSys drift detection** — Could solve chrysb's pitfall #1

---

## Summary: Top Priority Actions

| # | Action | Effort | Impact |
|---|---|---|---|
| 1 | **Audit AGENTS.md for bloat** (paper says it hurts us) | Medium | High |
| 2 | **Add self-review.md + heartbeat integration** | Low | Medium |
| 3 | **Add lessons.md for mistake tracking** | Low | Medium |
| 4 | **Add drift check to heartbeat** | Low | Medium |
| 5 | **Spec extraction before building** (steal from GSD) | Low | Medium |
| 6 | **Evaluate Trail of Bits security skills** for Shannon | Medium | Medium |
| 7 | **Review Compound Engineering Plugin** patterns | Low | Low |
| 8 | **Model routing for cost discipline** | Medium | Medium |
| 9 | **Cron health monitoring** | Low | Low |
