# Multi-Agent Orchestration Best Practices

**Research Date:** 2026-01-26  
**Sources:** Anthropic Engineering, OpenAI Swarm, AutoGen, CrewAI, LangGraph

---

## Core Principle: Start Simple

> "The most successful implementations weren't using complex frameworks or specialized libraries. Instead, they were building with simple, composable patterns." — Anthropic Engineering

**Golden Rule**: Find the simplest solution possible. Add complexity only when it demonstrably improves outcomes.

---

## Architectural Patterns

### 1. Workflows vs Agents

| Aspect | Workflows | Agents |
|--------|-----------|--------|
| **Control** | Predefined code paths | LLM directs its own process |
| **When to Use** | Well-defined, predictable tasks | Flexibility needed, model-driven decisions |
| **Predictability** | High | Lower |
| **Cost** | Lower | Higher (multiple turns) |

---

## The Five Core Workflow Patterns

### 1. Prompt Chaining
**What**: Sequential steps where each LLM call processes previous output

```
Task → LLM₁ → [Gate] → LLM₂ → [Gate] → LLM₃ → Output
```

**When to Use**:
- Task decomposes cleanly into fixed subtasks
- Trading latency for accuracy (easier individual calls)

**Examples**:
- Generate marketing copy → Translate to another language
- Write outline → Validate criteria → Write full document

---

### 2. Routing
**What**: Classify input and direct to specialized handler

```
Input → Classifier → Route A → Specialized Handler A
                  → Route B → Specialized Handler B
                  → Route C → Specialized Handler C
```

**When to Use**:
- Distinct categories better handled separately
- Classification can be done accurately

**Examples**:
- Customer service: General questions / Refunds / Technical support
- Model selection: Easy questions → Haiku, Hard questions → Sonnet

---

### 3. Parallelization
**What**: Multiple LLMs work simultaneously, outputs aggregated

**Two Variants**:
- **Sectioning**: Break task into independent parallel subtasks
- **Voting**: Same task multiple times for confidence

```
        ┌→ LLM₁ (Subtask A) ─┐
Task →  ├→ LLM₂ (Subtask B) ─┼→ Aggregator → Output
        └→ LLM₃ (Subtask C) ─┘
```

**When to Use**:
- Subtasks are independent
- Multiple perspectives improve confidence

**Examples**:
- Guardrails: One model handles query, another screens content
- Code review: Multiple prompts check different vulnerability types

---

### 4. Orchestrator-Workers
**What**: Central LLM dynamically breaks down tasks and delegates

```
                    ┌→ Worker₁ ─┐
Task → Orchestrator ├→ Worker₂ ─┼→ Orchestrator → Output
                    └→ Worker₃ ─┘
```

**When to Use**:
- Can't predict subtasks needed
- Dynamic task decomposition required

**Examples**:
- Coding: Multi-file changes based on task description
- Research: Gathering info from multiple sources

---

### 5. Evaluator-Optimizer
**What**: One LLM generates, another evaluates in a feedback loop

```
Task → Generator → Output → Evaluator → Feedback ─┐
           ↑                                       │
           └───────────────────────────────────────┘
```

**When to Use**:
- Clear evaluation criteria exist
- Human feedback demonstrably improves output
- LLM can provide actionable critique

**Examples**:
- Literary translation with nuance
- Complex search requiring multiple rounds

---

## Handoff Patterns (from OpenAI Swarm)

### The Handoff Primitive
Agent transfers control by returning another agent from a function:

```python
sales_agent = Agent(name="Sales Agent")

def transfer_to_sales():
    return sales_agent

agent = Agent(functions=[transfer_to_sales])
```

### Context Variables
Pass state between agents without polluting conversation history:

```python
def talk_to_sales():
    return Result(
        value="Done",
        agent=sales_agent,
        context_variables={"department": "sales"}
    )
```

### Key Insights
1. **Instructions are System Prompts**: Only active agent's instructions present
2. **Stateless Between Calls**: State preserved through context variables
3. **Functions Define Capabilities**: Each agent has specific tool access
4. **Handoffs are Explicit**: Agent decides when to transfer

---

## Team Architectures

### Sequential (Pipeline)
```
Agent₁ → Agent₂ → Agent₃ → Output
```
- Simple, predictable
- Good for linear workflows
- Each agent completes before next starts

### Hierarchical
```
        Manager Agent
       /      |      \
  Worker₁  Worker₂  Worker₃
```
- Manager delegates and validates
- Good for complex, coordinated tasks
- Requires manager_llm specification

### Network (Peer-to-Peer)
```
  Agent₁ ←→ Agent₂
     ↕        ↕
  Agent₃ ←→ Agent₄
```
- Agents can hand off to any other agent
- Most flexible, most complex
- Good for multi-domain problems

### Swarm
```
Shared Context Pool
    ↑ ↓      ↑ ↓      ↑ ↓
  Agent₁   Agent₂   Agent₃
```
- Agents share context but work independently
- Tool-based local routing
- Emergent coordination

---

## Memory & State Management

### CrewAI Memory Types
1. **Short-term**: Current execution context
2. **Long-term**: Persistent across executions
3. **Entity Memory**: Structured knowledge about entities

### State Sharing Strategies
- **Shared Message History**: All agents see full conversation
- **Context Variables**: Structured state passed between agents
- **Knowledge Sources**: Shared data accessible to all agents

---

## Best Practices Summary

### Architecture
1. **Start with single agent + tools** before going multi-agent
2. **Use workflows for predictability**, agents for flexibility
3. **Match pattern to problem**: Don't force complexity
4. **Design toolsets carefully**: Agent-Computer Interface (ACI) matters as much as HCI

### Agent Design
1. **Clear instructions**: Convert directly to system prompts
2. **Focused capabilities**: Each agent should excel at specific tasks
3. **Explicit handoffs**: Make transfer conditions clear
4. **Error recovery**: Handle tool failures gracefully

### Tool Design
1. **Give enough tokens to "think"** before committing to output
2. **Keep format natural** (close to training data)
3. **No formatting overhead** (avoid counting, escaping)
4. **Clear documentation**: Like a great docstring for junior devs
5. **Poka-yoke**: Make it hard to make mistakes

### Evaluation
1. **Extensive sandbox testing** before production
2. **Measure performance iteratively**
3. **Build evaluations for specific tasks**
4. **Monitor for compounding errors**

### Production Considerations
1. **Implement guardrails** for autonomous agents
2. **Set maximum iterations** to maintain control
3. **Include human checkpoints** for critical decisions
4. **Log traces** for debugging and improvement

---

## Framework Comparison

| Framework | Strengths | When to Use |
|-----------|-----------|-------------|
| **Claude Agent SDK** | Native Anthropic support, production-ready | Claude-based agents |
| **OpenAI Agents SDK** | Clean primitives, handoffs | OpenAI-based, simple orchestration |
| **AutoGen** | Research-backed, flexible patterns | Complex multi-agent research |
| **CrewAI** | Role-based teams, YAML config | Business process automation |
| **LangGraph** | Graph-based workflows, state machines | Complex conditional flows |

---

## Anti-Patterns to Avoid

1. ❌ **Over-engineering**: Multi-agent when single agent suffices
2. ❌ **Vague handoffs**: Unclear when agents should transfer
3. ❌ **Missing ground truth**: No validation of agent progress
4. ❌ **Unbounded execution**: No limits on iterations/cost
5. ❌ **Shared everything**: All agents accessing all tools
6. ❌ **Framework lock-in**: Abstracting away too much control
