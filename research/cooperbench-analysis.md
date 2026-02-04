# CooperBench Analysis: The Curse of Coordination in Multi-Agent Systems

**Paper:** "CooperBench: Why Coding Agents Cannot be Your Teammates Yet"  
**Authors:** Stanford University & SAP Labs US  
**Published:** January 2026 (arXiv:2601.13295)  
**Website:** https://cooperbench.com  
**Research Date:** January 28, 2026

---

## Executive Summary

Stanford researchers have demonstrated that **adding a second AI agent makes task completion 30-50% WORSE** than having a single agent do both tasks. This fundamentally challenges the hype around multi-agent systems and has direct implications for how we should design agent swarms.

---

## 1. What is CooperBench?

### Purpose
CooperBench is the first benchmark designed to measure how well AI agents can **cooperate when handling individual tasks with potential conflicts**. It tests whether agents possess the "social intelligence" needed for teamwork.

### Methodology
- **652 collaborative coding tasks** across 12 open-source repositories
- **4 programming languages:** Python, TypeScript, Go, Rust
- **Task design:** Two agents are assigned different features that:
  - Can be implemented independently
  - May conflict without proper coordination
  - Are grounded in real open-source repos with expert-written tests
- **Evaluation:** Patches from both agents are merged and tested
- **Key innovation:** Tasks are NOT adversarial - features are compatible but require coordination to avoid conflicts

### Task Composition
- 77.3% of tasks have **conflicting ground-truth solutions** (overlapping code changes)
- 34 feature pools, each containing 2-12 features
- Average feature: 52.3 changed lines, modifies 1.4 files
- Features are deliberately compact to isolate coordination challenges

---

## 2. Key Finding: Why 2 Agents Perform 30-50% Worse Than 1

### The Core Result

| Setting | GPT-5 | Claude 4.5 Sonnet | MiniMax M2 |
|---------|-------|-------------------|------------|
| **Solo** (1 agent, both tasks) | ~50% | ~50% | ~45% |
| **Coop** (2 agents, 1 task each) | ~25% | ~25% | ~22% |
| **Gap** | **-50%** | **-50%** | **-51%** |

**This is the opposite of human teams**, where adding teammates typically improves productivity.

### The "Mid-Difficulty Crisis"
The coordination gap is **largest for middle-difficulty tasks**:
- **Easy tasks:** Agents have spare capacity for coordination
- **Hard tasks:** Both struggle regardless
- **Medium tasks:** Agents cannot balance technical difficulty AND coordination overhead

### Scaling Makes It Worse
When scaling from 2 → 3 → 4 agents:
- 2 agents: 68.6% success
- 3 agents: 46.5% success  
- 4 agents: 30.0% success

**Each additional agent compounds the coordination problem.**

---

## 3. The "Curse of Coordination" — Root Causes

The paper identifies **three fundamental capability gaps** underlying coordination failures:

### 3.1 Expectation Failures (42% of failures)
Agents fail to integrate information about their partner's state.

**Example:** Agent A announces plans to modify `prompts.py`. Agent B explicitly states insertion points. Despite hearing each other's plans, A proceeds as if B's code won't exist.

**Why it happens:** Models are trained to be verification-first (require observable evidence). But coordination under workspace isolation requires **trusting claims about states they cannot observe**.

### 3.2 Commitment Failures (32% of failures)
Agents break promises or make unverifiable claims.

**Example:** Agent A promises "I'll add bypass check at lines 100-104, happens FIRST in get()." Later claims completion with a checkmark. After merge: the code is missing.

**Why it happens:** No mechanism exists to verify claims across isolated workspaces. Trust is all they have, and it fails.

### 3.3 Communication Failures (26% of failures)
Agents fail to even establish shared context.

**Example:** Agent A asks "Which approach would you prefer?" The response is silence. Without an answer, both proceed with incompatible assumptions.

---

## 4. Communication: Used Heavily, But Ineffectively

### Key Findings

**Communication does NOT improve success rates:**
- With communication: ~25% success
- Without communication: ~25% success
- Difference is **not statistically significant**

**But communication DOES reduce merge conflicts:**
- Significantly fewer raw git conflicts when communication is enabled
- However, avoiding conflicts ≠ correct coordination

### Why Communication Fails

Agents spend up to **20% of their action budget** on communication, but it's jammed with:

| Problem | Frequency | Description |
|---------|-----------|-------------|
| **Repetition** | High | Near-duplicate status updates without new information |
| **Unresponsiveness** | High | Direct questions go unanswered |
| **Hallucination** | Moderate | False claims about code state or completion |

**Core insight:** Agents lack pragmatic understanding that communication should *achieve coordination*, not just pass messages.

---

## 5. Models Tested

### Models Evaluated
1. **GPT-5** (OpenAI)
2. **Claude 4.5 Sonnet** (Anthropic)  
3. **MiniMax-M2**
4. **Qwen3-Coder-30B-A3B-Instruct**
5. **Qwen3-30B-A3B-Instruct-2507**

### Retention Rates (AUC_Coop / AUC_Solo)

| Model | Solo AUC | Coop AUC | Retention |
|-------|----------|----------|-----------|
| Qwen3-30B-A3B | 0.13 | 0.09 | **0.68** (best) |
| Qwen3-Coder-30B | 0.32 | 0.20 | 0.64 |
| GPT-5 | 0.60 | 0.33 | 0.55 |
| Claude Sonnet 4.5 | 0.55 | 0.29 | 0.53 |
| MiniMax M2 | 0.52 | 0.24 | **0.46** (worst) |

**Critical insight:** Coding ability does NOT predict coordination ability. MiniMax has the worst retention despite mid-tier coding performance.

---

## 6. Emergent Coordination Behaviors (Rare But Promising)

In successful runs, researchers observed three patterns **not prompted or scaffolded**:

### Role Division
Agents agree on who handles which part:
> "I'll add header + octal_str; you add binary_str between them."

**What works:** Mutual confirmation, not unilateral declaration.

### Resource Division  
Agents partition specific files, code ranges, or ownership blocks:
> "Lines 72-77 are mine. Lines 78-85 are yours."

**What works:** Line-level specificity creates safe zones where conflict is impossible by construction.

### Negotiation
Agents propose alternatives and converge on a plan before acting:
> "Option A: I handle X, you handle Y. Option B: I handle both, you review."

**What works:** Complete action specifications that leave nothing to interpret.

---

## 7. Implications for Our Agent Swarm Architecture

### What the Research Tells Us

1. **Multi-agent parallelization is not free** — it has significant coordination costs
2. **Current LLMs lack "social intelligence"** — understanding others, communicating effectively, coordinating actions
3. **More agents = more failure** — coordination overhead compounds
4. **Communication channels alone don't help** — agents don't use them effectively
5. **Even frontier models (GPT-5, Claude 4.5) suffer from this**

### Actionable Recommendations

#### 1. Prefer Sequential Over Parallel Where Possible
```
❌ Bad: Spawn 3 agents to work on related parts simultaneously
✅ Good: One agent does research → hands off to writer → hands off to reviewer
```

**Rationale:** The "Solo" setting (one agent handling all tasks) consistently outperforms "Coop" (multiple agents splitting work).

#### 2. When Parallelizing, Ensure TRUE Independence
```
❌ Bad: Two agents working on the same codebase in different files
✅ Good: Two agents researching completely separate topics with no overlap
```

**Rule:** If the outputs will need to be merged or integrated, coordination overhead will likely outweigh parallelization benefits.

#### 3. Use Strict Workspace Isolation + Explicit Handoffs
```
✅ Agent A completes task → generates artifact → Agent B receives artifact
❌ Agent A and B both work on shared state simultaneously
```

**Why:** The "curse of coordination" stems from partial observability. Make the observation boundary crystal clear.

#### 4. If Agents Must Collaborate, Enforce Explicit Protocols
Based on successful emergent behaviors:

```markdown
## Required Coordination Protocol
1. At start: Each agent declares EXACT scope (file names, line ranges)
2. Before acting: Confirm receipt of partner's scope
3. On completion: Provide VERIFIABLE output (diff, signature, test result)
4. Never claim completion without evidence partner can check
```

#### 5. Prefer Orchestrator Patterns Over Peer-to-Peer
```
✅ Orchestrator assigns tasks → agents work → orchestrator integrates
❌ Agents coordinate directly with each other
```

**Why:** Human-like scaffolding (orchestration) works. The curse affects autonomous peer coordination.

#### 6. Design for "Verification-First" Coordination
The "trust paradox" from the paper: Models are trained to require evidence but coordination requires trusting claims about unobservable states.

**Solution:** Make all claims verifiable:
- Paste signatures/hashes
- Explicit insertion-point contracts  
- Integration checks before declaring completion

#### 7. Consider Task Decomposition That Avoids Merge
```
✅ Agent A writes module A, Agent B writes module B (imported, not merged)
❌ Agent A and B both modify the same file
```

**If code must be merged:** The 77.3% conflict rate in CooperBench shows merging independent work is inherently risky.

---

## 8. Specific Recommendations for Our v2 Swarm

### Current Architecture Assessment
Based on `~/clawd/agents/v2/`:

| Agent | Current Use | Risk Level | Recommendation |
|-------|-------------|------------|----------------|
| Researcher | Parallel intel tasks | **Low** | ✅ Keep parallel - outputs are independent docs |
| List Builder | Prospect lists | **Low** | ✅ Keep - outputs don't merge |
| Outreach | Email campaigns | **Medium** | ⚠️ Ensure templates don't overlap |
| Qualifier | Lead scoring | **Low** | ✅ Independent scoring function |
| Content | Copy/pages | **HIGH** | ❌ Never parallelize content for same project |

### Recommended Swarm Design Patterns

#### Pattern 1: Funnel (Low Risk)
```
Research → Qualify → Content → Review
   ↓
(Each stage completes before next starts)
```

#### Pattern 2: Parallel-Then-Merge (Use With Caution)
```
Research A  ─┐
Research B  ─┼→ Synthesizer → Output
Research C  ─┘
```
Only safe if each research agent produces **complete, standalone documents** that are synthesized, not merged.

#### Pattern 3: Specialist Review (Recommended for Code)
```
Coder writes → Security reviews → Code reviewer reviews → Human approves
             (sequential, not parallel reviewers)
```

### Danger Patterns to Avoid

❌ **Two agents editing same file:** Direct conflict zone
❌ **Multiple agents with overlapping tool access:** State corruption risk  
❌ **"Collaborate on this together":** Vague coordination triggers the curse
❌ **Real-time peer messaging:** Creates false sense of coordination

---

## 9. Future Research Directions from the Paper

1. **Training objectives that reward coordination** under partial observability
2. **Lightweight protocols** for verifiable commitments (shared signatures, insertion-point contracts)
3. **Richer communication channels** (screen sharing) to expand modality beyond text
4. **Multi-agent training methods** (Sotopia-π) to reinforce successful coordination behaviors

---

## 10. Key Takeaways

| Myth | Reality |
|------|---------|
| "More agents = faster" | More agents = more failures (30-50% worse) |
| "Agents can coordinate via chat" | Communication used heavily but ineffectively |
| "Frontier models will figure it out" | GPT-5 and Claude 4.5 Sonnet both fail equally |
| "Just tell them to coordinate" | Prompt optimization yields only marginal improvements |
| "Parallel is better" | Solo (sequential) consistently outperforms parallel |

---

## References

- Paper: https://arxiv.org/abs/2601.13295
- Website: https://cooperbench.com  
- Code: `pip install cooperbench` / `uv pip install cooperbench`
- Leaderboard: https://cooperbench.com (shows Coop success rates across models)

---

*Analysis prepared for Marb's agent swarm architecture planning. Last updated: 2026-01-28*
