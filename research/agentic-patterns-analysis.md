# Agentic Design Patterns: Comprehensive Analysis
*Source: "Agentic Design Patterns: A Hands-On Guide to Building Intelligent Systems" by Antonio Gulli (Google)*
*Analyzed: 2026-01-31*

---

## Executive Summary

This document provides a comprehensive analysis of the 21 agentic design patterns from Antonio Gulli's book, comparing them against our current agent implementation (AGENTS.md) to identify gaps and recommend improvements.

**Key Findings:**
- Our system implements ~8-9 patterns well, ~6 partially, and ~6 are missing or weak
- Strongest areas: Memory, Multi-Agent, Human-in-the-Loop, Tool Use
- Biggest gaps: Formal Reasoning Techniques, Evaluation & Monitoring, Resource-Aware Optimization, Guardrails
- Quick wins available: WAL Protocol enhancement, Context Engineering adoption, Formal Reflection patterns

---

## Part 1: The 21 Patterns — Detailed Extraction

### Agent Complexity Levels (Context)
The book defines 5 levels of agent sophistication:
- **Level 0**: Core LLM reasoning only (no tools, no memory)
- **Level 1**: Connected Problem-Solver (uses tools, RAG)
- **Level 2**: Strategic Problem-Solver (planning, proactive, self-improvement)
- **Level 3**: Collaborative Multi-Agent Systems
- **Level 4**: Future - Goal-Driven Metamorphic Systems

---

### Pattern 1: Prompt Chaining (Pipeline Pattern)

**What it is:** Breaking complex tasks into sequential, manageable sub-problems. Output from one prompt feeds as input to the next.

**When to use:**
- Task too complex for single prompt
- Multiple distinct processing stages
- External tools needed between steps
- Multi-step reasoning required

**Key Implementation Details:**
- Use structured output (JSON) between steps for reliability
- Each step can have distinct persona/role
- Reduces cognitive load per step
- Enables intermediate validation

**Code Pattern (LangChain):**
```python
extraction_chain = prompt_extract | llm | StrOutputParser()
full_chain = {"specifications": extraction_chain} | prompt_transform | llm | StrOutputParser()
```

**Pitfalls:**
- Instruction neglect in complex single prompts
- Contextual drift in long chains
- Error propagation amplification

---

### Pattern 2: Routing

**What it is:** Dynamic decision-making that governs flow to different specialized functions, tools, or sub-processes based on input analysis.

**When to use:**
- Agent must decide between multiple workflows
- Different tools/agents for different task types
- Triage/classification of incoming requests

**Implementation Methods:**
1. **LLM-based**: Model outputs category identifier
2. **Embedding-based**: Semantic similarity routing
3. **Rule-based**: Keywords, patterns, structured data
4. **ML Model-based**: Fine-tuned classifier

**Key Insight:** Routing transforms static execution into context-aware workflows.

**Code Pattern:**
```python
coordinator = Agent(
    instruction="Analyze request and delegate to 'Booker' or 'Info' agent.",
    sub_agents=[booking_agent, info_agent]
)
```

---

### Pattern 3: Parallelization

**What it is:** Executing multiple independent tasks concurrently to reduce total execution time.

**When to use:**
- Multiple independent API calls
- Processing different data segments
- Generating multiple content variations
- Multi-modal processing (text + image)

**Key Implementation:**
```python
map_chain = RunnableParallel({
    "summary": summarize_chain,
    "questions": questions_chain,
    "key_terms": terms_chain,
})
```

**Google ADK Pattern:**
```python
parallel_agent = ParallelAgent(
    name="ParallelWebResearchAgent",
    sub_agents=[researcher_1, researcher_2, researcher_3]
)
```

**Pitfalls:**
- Adds complexity to design, debugging, logging
- Python asyncio provides concurrency, not true parallelism (GIL)
- Coordination overhead

---

### Pattern 4: Reflection (Self-Correction)

**What it is:** Agent evaluates its own work and uses that evaluation to improve. Creates feedback loop for iterative refinement.

**When to use:**
- Quality, accuracy, detail more important than speed/cost
- Creative writing, code generation, complex problem-solving
- Tasks requiring high objectivity

**Producer-Critic Model (Key Insight):**
- **Producer Agent**: Generates initial output
- **Critic Agent**: Evaluates against criteria (separate persona prevents bias)
- Loop until "CODE_IS_PERFECT" or max iterations

**Code Pattern:**
```python
reflector_prompt = """You are a senior software engineer.
Critically evaluate the code. If perfect, respond 'CODE_IS_PERFECT'.
Otherwise, provide bulleted critiques."""
```

**Pitfalls:**
- Higher latency and cost (multiple LLM calls)
- Memory-intensive (history expands each iteration)
- Risk of infinite loops without stopping conditions

---

### Pattern 5: Tool Use (Function Calling)

**What it is:** Enabling agents to interact with external APIs, databases, and services via structured function calls.

**When to use:**
- Real-time data needed
- Calculations LLM can't do accurately
- Actions in external systems
- Private/proprietary data access

**Process:**
1. Tool definition (name, params, description)
2. LLM decides when tool needed
3. LLM generates structured call (JSON)
4. Framework executes tool
5. Result returned to LLM context

**ADK Built-in Tools:**
- `google_search` - Web search
- `BuiltInCodeExecutor` - Python execution
- `CalendarToolset` - Google Calendar
- Enterprise Search (Vertex AI)

**Pitfall:** Tool quality matters — garbage API = garbage results

---

### Pattern 6: Planning

**What it is:** Agent formulates sequence of actions to move from initial state to goal state. Autonomous decomposition of complex objectives.

**When to use:**
- Multi-step tasks
- Workflow automation
- Complex problem decomposition
- When "how" needs to be discovered (not predetermined)

**Key Insight:** Trade-off between flexibility and predictability. Use planning when solution path unknown; use fixed workflows when path is known.

**Example Systems:**
- Google DeepResearch: Iterative search → analyze → identify gaps → search again → synthesize
- OpenAI Deep Research: Same pattern via API

**Planning vs Execution:**
- Planning = discovering the "how"
- Execution = following known "how"

---

### Pattern 7: Multi-Agent Collaboration

**What it is:** Multiple specialized agents working together. Task decomposition with different agents handling different sub-problems.

**Collaboration Forms:**
1. **Sequential Handoffs**: Pipeline between agents
2. **Parallel Processing**: Concurrent execution, merge results
3. **Debate and Consensus**: Multiple perspectives, reach agreement
4. **Hierarchical**: Manager delegates to workers
5. **Expert Teams**: Specialized roles (researcher, writer, editor)
6. **Critic-Reviewer**: Generate → critique → revise

**Communication Structures:**
- Single Agent
- Network (peer-to-peer)
- Supervisor (central hub)
- Supervisor-as-Tool
- Hierarchical (multi-level)
- Custom

**ADK Patterns:**
```python
# Sequential
SequentialAgent(sub_agents=[step1, step2, step3])

# Parallel
ParallelAgent(sub_agents=[agent1, agent2, agent3])

# Loop
LoopAgent(max_iterations=10, sub_agents=[process, check_condition])
```

**⚠️ Key Research Finding (CooperBench):**
> "Adding agents causes 50% worse outcomes when they touch shared state"

**Design Principles:**
- Truly independent tasks = safe to parallelize
- Same codebase/shared state = SEQUENTIAL only
- One writer per file
- Verifiable claims (diffs, test results, checksums)

---

### Pattern 8: Memory Management

**What it is:** Enabling agents to retain and utilize information across interactions.

**Two Types:**
1. **Short-Term (Context Window)**: Current session, limited capacity
2. **Long-Term (Persistent)**: Databases, vector stores, survives sessions

**ADK Components:**
- **Session**: Individual chat thread (events + state)
- **State**: Temporary data dictionary within session
- **Memory**: Searchable long-term knowledge

**State Prefixes:**
- No prefix: Session-specific
- `user:`: User-scoped across sessions
- `app:`: Application-wide
- `temp:`: Current turn only (not persisted)

**Memory Types (LangChain):**
- **Semantic Memory**: Facts and concepts
- **Episodic Memory**: Past experiences/examples
- **Procedural Memory**: How to do tasks (system prompt)

**Key Insight:** Always update state via `EventActions.state_delta` or `output_key`, never directly.

---

### Pattern 9: Learning and Adaptation

**What it is:** Agents improving through experience without constant reprogramming.

**Methods:**
- Reinforcement Learning
- Supervised Learning
- Few-Shot/Zero-Shot
- Online Learning
- Memory-Based Learning

**Advanced Concepts:**
- **RLVR** (RL from Verifiable Rewards): Training on problems with known answers
- **DPO** (Direct Preference Optimization): Simpler than PPO for alignment
- **SICA** (Self-Improving Coding Agent): Agent modifies own source code
- **AlphaEvolve**: LLMs + evolutionary algorithms to discover/optimize algorithms

---

### Pattern 10: Model Context Protocol (MCP)

**What it is:** Open standard for LLMs to communicate with external applications, data sources, and tools. Universal adapter.

**MCP vs Function Calling:**
| Feature | Function Calling | MCP |
|---------|-----------------|-----|
| Standardization | Vendor-specific | Open protocol |
| Discovery | Explicit per conversation | Dynamic discovery |
| Reusability | Tightly coupled | Standalone servers |
| Architecture | One-to-one | Client-server |

**Components:**
- **Resources**: Static data (files, records)
- **Tools**: Executable functions
- **Prompts**: Templates for interaction

**Key Insight:** MCP doesn't guarantee agent-friendly data formats. An API returning PDFs is useless if agent can't parse PDFs.

**FastMCP Example:**
```python
@mcp_server.tool
def greet(name: str) -> str:
    return f"Hello, {name}!"
```

---

### Pattern 11: Goal Setting and Monitoring

**What it is:** Giving agents specific objectives and means to track progress/success.

**SMART Goals:** Specific, Measurable, Achievable, Relevant, Time-bound

**Components:**
- Goal definition (success criteria)
- Progress tracking
- Feedback loops
- Adaptation when off-track

**Example Pattern:**
```python
for iteration in range(max_iterations):
    generate_output()
    evaluate_against_goals()
    if goals_met():
        break
    refine_based_on_feedback()
```

**Key Insight:** Intersection with Reflection pattern — goals provide benchmark for self-evaluation.

---

### Pattern 12: Exception Handling and Recovery

**What it is:** Anticipating failures and designing graceful recovery.

**Components:**
1. **Error Detection**: Invalid outputs, API errors, timeouts, incoherent responses
2. **Error Handling**: Logging, retries, fallbacks, graceful degradation, notification
3. **Recovery**: State rollback, diagnosis, self-correction, escalation

**Implementation:**
```python
primary_handler = Agent(name="primary", tools=[get_precise_info])
fallback_handler = Agent(name="fallback", 
    instruction="If state['primary_failed'], use backup tool")
robust_agent = SequentialAgent(sub_agents=[primary_handler, fallback_handler])
```

**Key Insight:** Can combine with Reflection — if initial attempt fails, reflective process analyzes and retries with improved approach.

---

### Pattern 13: Human-in-the-Loop (HITL)

**What it is:** Strategic integration of human oversight into AI workflows.

**Aspects:**
- **Human Oversight**: Monitoring via logs/dashboards
- **Intervention**: Human corrects errors, supplies data
- **Feedback for Learning**: RLHF
- **Decision Augmentation**: AI recommends, human decides
- **Collaboration**: Routine → AI, Complex → Human
- **Escalation Policies**: When to hand off

**"Human-on-the-Loop" Variant:**
Human defines policy, AI handles immediate compliance actions.

**Caveats:**
- Not scalable (can't manage millions of tasks)
- Requires skilled operators
- Privacy concerns (anonymization needed)

---

### Pattern 14: Knowledge Retrieval (RAG)

**What it is:** LLMs accessing external knowledge before generating responses.

**Core Concepts:**
- **Embeddings**: Numerical vector representations of text
- **Semantic Similarity**: Meaning-based matching
- **Chunking**: Breaking docs into manageable pieces
- **Vector Databases**: FAISS, Pinecone, Weaviate, Chroma, Qdrant

**Retrieval Techniques:**
- Vector search (semantic)
- BM25 (keyword)
- Hybrid (best of both)

**Advanced Variants:**
- **GraphRAG**: Knowledge graph for relationship navigation
- **Agentic RAG**: Reasoning layer validates/reconciles retrieved info

**Agentic RAG Capabilities:**
1. Source validation (prioritize authoritative sources)
2. Conflict reconciliation
3. Multi-step reasoning (decompose complex queries)
4. Knowledge gap detection (use external tools when needed)

---

### Pattern 15: Inter-Agent Communication (A2A)

**What it is:** Google's open protocol for agents to communicate regardless of framework.

**Core Concepts:**
- **Agent Card**: JSON identity file (capabilities, endpoint, skills, auth)
- **Tasks**: Async units of work with state machine
- **Messages**: Content with attributes and parts
- **Artifacts**: Generated outputs

**Discovery Methods:**
- Well-Known URI (`/.well-known/agent.json`)
- Curated Registries
- Direct Configuration

**Interaction Modes:**
1. Synchronous Request/Response
2. Asynchronous Polling
3. Streaming (SSE)
4. Push Notifications (Webhooks)

**A2A vs MCP:**
- A2A: Agent-to-agent coordination and task delegation
- MCP: Agent-to-tool/data interface

---

### Pattern 16: Resource-Aware Optimization

**What it is:** Dynamic monitoring and management of computational, temporal, and financial resources.

**Strategies:**
1. **Dynamic Model Switching**: Simple → cheap model; Complex → expensive model
2. **Router Agent**: Classifies query complexity
3. **Critique Agent**: Evaluates response quality, refines routing
4. **Fallback Mechanisms**: Graceful degradation when preferred model unavailable

**Advanced Techniques:**
- Adaptive Tool Selection
- Contextual Pruning & Summarization
- Proactive Resource Prediction
- Energy-Efficient Deployment
- Learned Resource Allocation

**OpenRouter Example:**
```python
"model": "openrouter/auto"  # Auto-selects optimal model
"models": ["anthropic/claude-3.5-sonnet", "gryphe/mythomax-l2-13b"]  # Fallback chain
```

---

### Pattern 17: Reasoning Techniques

**What it is:** Advanced methods making agent reasoning explicit and structured.

**Techniques:**

**Chain-of-Thought (CoT):**
- Step-by-step reasoning
- "Think step by step" instruction
- Decomposes complex into sub-problems

**Tree-of-Thought (ToT):**
- Multiple reasoning paths explored
- Backtracking and self-correction
- Tree structure of possibilities

**Self-Correction:**
- Internal evaluation of generated content
- Iterative refinement loop

**ReAct (Reasoning and Acting):**
- Interleaved Thought → Action → Observation loop
- Dynamic adaptation based on feedback

**Program-Aided Language Models (PALMs):**
- Generate and execute code for precise calculations

**RLVR (RL from Verifiable Rewards):**
- Train on problems with known answers
- Produces extended reasoning trajectories

**Chain of Debates (CoD):**
- Multiple models argue/critique
- Collective intelligence → better answers

**Scaling Inference Law:**
> "More compute at inference time = better results"
> "Smaller model + more thinking time can beat larger model + quick answer"

---

### Pattern 18: Guardrails/Safety Patterns

**What it is:** Mechanisms ensuring agents operate safely, ethically, and as intended.

**Implementation Points:**
1. **Input Validation**: Filter malicious content
2. **Output Filtering**: Check for toxicity, bias
3. **Behavioral Constraints**: Prompt-level instructions
4. **Tool Use Restrictions**: Limit capabilities
5. **External Moderation APIs**: Third-party content filters
6. **Human Oversight**: HITL for critical decisions

**Engineering Principles:**
- **Checkpoint & Rollback**: Like database transactions
- **Modularity**: Specialized agents easier to secure
- **Observability**: Structured logging of full "chain of thought"
- **Least Privilege**: Minimum permissions required

**Safety Guardrail Prompt Example:**
```
Guidelines for Unsafe Inputs:
1. Instruction Subversion (Jailbreaking)
2. Harmful Content Generation
3. Off-Topic/Irrelevant Discussions
4. Brand Disparagement/Competitive Info
```

---

### Pattern 19: Evaluation and Monitoring

**What it is:** Systematic assessment of agent performance, detecting anomalies and drift.

**Applications:**
- Performance tracking in production
- A/B testing agent versions
- Compliance/safety audits
- Drift detection
- Anomaly detection
- Learning progress assessment

**Evaluation Methods:**
| Method | Strengths | Weaknesses |
|--------|-----------|------------|
| Human Evaluation | Captures subtlety | Expensive, doesn't scale |
| LLM-as-a-Judge | Consistent, scalable | May miss intermediate steps |
| Automated Metrics | Objective, efficient | May miss capabilities |

**Trajectory Evaluation:**
- Compare actual agent path vs ideal/ground-truth path
- Methods: Exact match, In-order match, Any-order match, Precision/Recall

**"Contractor" Model (Advanced):**
Moving from simple prompts to formal "contracts" with:
1. Formalized specifications
2. Negotiation and feedback
3. Quality-focused iterative execution
4. Hierarchical decomposition via subcontracts

---

### Pattern 20: Prioritization

**What it is:** Ranking tasks, goals, or actions based on significance, urgency, and criteria.

**Criteria:**
- Urgency (time sensitivity)
- Importance (impact on objective)
- Dependencies (prerequisites)
- Resource availability
- Cost/benefit analysis
- User preferences

**Levels:**
- High-level goal prioritization
- Sub-task prioritization
- Action selection

**Key Feature:** Dynamic re-prioritization as circumstances change.

---

### Pattern 21: Exploration and Discovery

**What it is:** Agents proactively seeking novel information and possibilities beyond predefined knowledge.

**Use Cases:**
- Scientific research automation
- Game playing / strategy generation
- Market research / trend spotting
- Security vulnerability discovery
- Creative content generation

**Google Co-Scientist Architecture:**
- **Generation Agent**: Creates hypotheses
- **Reflection Agent**: Peer review
- **Ranking Agent**: Elo tournament
- **Evolution Agent**: Refines top hypotheses
- **Proximity Agent**: Clusters similar ideas
- **Meta-review Agent**: Synthesizes insights

**Agent Laboratory Roles:**
- Professor Agent (direction)
- PostDoc Agent (execution, code writing)
- Reviewer Agents (evaluation)
- ML Engineer Agents (data prep)
- SW Engineer Agents (guidance)

---

## Part 2: Key Frameworks Mentioned

### LangChain / LangGraph
- **LangChain**: Chains, prompts, tools, memory
- **LangGraph**: State-based graphs for complex workflows
- **LCEL**: LangChain Expression Language for composing chains
- Best for: Sequential processing, explicit control flow

### Google ADK (Agent Development Kit)
- **Agents**: LlmAgent, SequentialAgent, ParallelAgent, LoopAgent
- **Tools**: FunctionTool, google_search, BuiltInCodeExecutor
- **Memory**: Session, State, MemoryService
- **MCP Support**: MCPToolset integration
- Best for: Google ecosystem, production deployment

### CrewAI
- **Roles**: Agents with backstory, goals
- **Tasks**: Description, expected output, context
- **Crew**: Orchestrates agents and tasks
- **Process**: Sequential or custom
- Best for: Role-based collaboration, intuitive mental model

### Others Mentioned
- **OpenRouter**: Multi-model routing/fallback
- **FastMCP**: Simplified MCP server creation
- **Vertex AI**: Enterprise RAG, Memory Bank

---

## Part 3: Key Concepts

### Context Engineering vs Prompt Engineering

**Prompt Engineering:** Optimizing the phrasing of user queries

**Context Engineering:** Designing the complete informational environment:
- System prompt (operational parameters)
- Retrieved documents
- Tool outputs
- User identity and history
- Environmental state

> "The quality of a model's output is less dependent on architecture and more on the richness of context provided."

### Agent Levels (0-4)

| Level | Capability | Example |
|-------|------------|---------|
| 0 | Core LLM only | Basic Q&A |
| 1 | Tools + RAG | Search assistant |
| 2 | Planning + Self-improvement | Coding agent |
| 3 | Multi-agent collaboration | Research team |
| 4 | Goal-driven metamorphic | Future: self-organizing systems |

### Memory Architecture

```
┌─────────────────────────────────────────┐
│            Short-Term Memory            │
│     (Context Window - Ephemeral)        │
├─────────────────────────────────────────┤
│            Long-Term Memory             │
│  ┌─────────┐ ┌─────────┐ ┌───────────┐ │
│  │Semantic │ │Episodic │ │Procedural │ │
│  │ (Facts) │ │(Events) │ │ (Skills)  │ │
│  └─────────┘ └─────────┘ └───────────┘ │
│         Vector DB / Knowledge Graph      │
└─────────────────────────────────────────┘
```

---

## Part 4: Comparison to Our Current Setup

### What We're Doing Well ✅

| Pattern | Our Implementation | Evidence |
|---------|-------------------|----------|
| **Memory Management** | EXCELLENT | SESSION-STATE.md, daily notes, MEMORY.md, WAL protocol |
| **Multi-Agent** | GOOD | Sub-agent spawning, specialized agents (researcher, code-reviewer) |
| **Human-in-the-Loop** | GOOD | Heartbeat system, proactive checks, escalation awareness |
| **Tool Use** | GOOD | Extensive tool integration documented in TOOLS.md |
| **Prompt Chaining** | IMPLICIT | Tasks flow between context files, but not formalized |
| **Exception Handling** | PARTIAL | Compaction recovery protocol exists |
| **Prioritization** | PARTIAL | Heartbeat rotation, but informal |
| **Goal Setting** | PARTIAL | Success criteria philosophy, but not systematic |

### Gaps Identified ❌

| Pattern | Gap | Impact |
|---------|-----|--------|
| **Reasoning Techniques** | No formal CoT/ToT/ReAct | Less transparent reasoning |
| **Evaluation & Monitoring** | No metrics, no trajectory analysis | Can't measure improvement |
| **Resource-Aware Optimization** | No model routing based on complexity | Suboptimal cost/quality |
| **Guardrails/Safety** | Minimal input/output validation | Risk of harmful outputs |
| **Reflection** | No formal Producer-Critic loop | Quality inconsistent |
| **A2A Protocol** | Not using inter-agent communication standard | Siloed agents |
| **MCP** | Not leveraging for tool standardization | Custom integrations only |
| **Learning & Adaptation** | No feedback loops for improvement | Static behavior |

### Partial Implementations 🔶

| Pattern | Current State | Enhancement Needed |
|---------|--------------|-------------------|
| **Routing** | Manual task assignment | Add complexity-based auto-routing |
| **Parallelization** | Sub-agent spawning | Formalize parallel patterns |
| **RAG** | Memory search exists | Add formal retrieval pipeline |
| **Planning** | Implicit in task execution | Explicit plan generation step |
| **Exploration** | Research agents exist | Formalize hypothesis generation |

---

## Part 5: Prioritized Recommendations

### 🔥 Quick Wins (Implement This Week)

#### 1. Formalize Reflection Pattern
Add to AGENTS.md:
```markdown
### 🔄 Reflection Protocol
For any significant output (code, analysis, reports):
1. Generate initial output
2. Self-critique: "What could be wrong? What's missing?"
3. Revise based on critique
4. Repeat until confident or max 3 iterations
```

#### 2. Add Context Engineering Section
Add to AGENTS.md:
```markdown
### 📦 Context Engineering
Before generating responses, ensure context includes:
- Relevant retrieved documents (memory_search)
- User history/preferences (USER.md)
- Current environmental state (SESSION-STATE.md)
- Tool outputs from preparation calls
```

#### 3. Implement Complexity-Based Routing
Add to HEARTBEAT.md or AGENTS.md:
```markdown
### 🚦 Task Complexity Routing
- Simple queries: Handle directly
- Complex analysis: Spawn researcher sub-agent
- Code tasks: Spawn with code-reviewer
- Multi-domain: Spawn parallel specialists
```

### 📈 Medium-Term Improvements (This Month)

#### 4. Add Evaluation Metrics
Create `~/clawd/metrics/agent-performance.md`:
- Track task completion rates
- Log response times
- Record user satisfaction signals
- Monitor token usage trends

#### 5. Implement Formal Guardrails
Add input validation for:
- Jailbreak attempts
- Off-topic requests
- Sensitive information handling
```markdown
### 🛡️ Guardrail Checks
Before processing requests:
1. Check for instruction subversion attempts
2. Validate request is within operational scope
3. Flag sensitive data handling requirements
```

#### 6. Add ReAct-Style Reasoning
For complex tasks, enforce:
```
Thought: [What do I need to figure out?]
Action: [What tool/search will help?]
Observation: [What did I learn?]
Thought: [How does this change my approach?]
... repeat until solution
```

### 🎯 Bigger Changes (Next Quarter)

#### 7. Implement Agentic RAG
- Build formal retrieval pipeline
- Add source validation
- Implement conflict reconciliation
- Create knowledge gap detection

#### 8. Add Learning & Adaptation Loop
- Log successful patterns
- Track what works for Marb
- Periodically self-improve prompts
- Adapt based on feedback history

#### 9. Adopt MCP for Tool Standardization
- Wrap existing tools as MCP servers
- Enable dynamic tool discovery
- Standardize tool interfaces

#### 10. Implement Checkpoint/Rollback
For complex tasks:
- Save state at key milestones
- Enable recovery from failures
- Track decision points for debugging

---

## Part 6: Proposed AGENTS.md Additions

### Section: Reasoning Protocol
```markdown
## 🧠 Reasoning Protocol

For complex tasks, use explicit reasoning:

### Chain-of-Thought (Default)
Think step-by-step before answering:
1. What is the core question?
2. What information do I need?
3. What are the steps to get there?
4. Execute each step
5. Verify the answer makes sense

### When to Use Tree-of-Thought
If the first approach fails or problem is complex:
- Generate 2-3 alternative approaches
- Evaluate each briefly
- Pursue most promising
- Backtrack if stuck

### ReAct Loop (Tool-Heavy Tasks)
Thought → Action → Observation → Thought → ...
Continue until confident in answer.
```

### Section: Quality Assurance
```markdown
## ✅ Quality Assurance Protocol

### Self-Reflection Checklist
Before finalizing significant outputs:
- [ ] Does this fully address the request?
- [ ] Are there factual errors?
- [ ] Is anything missing?
- [ ] Would I be confident showing this to an expert?

### When to Request Review
Spawn code-reviewer or security-reviewer for:
- Code changes > 50 lines
- Security-related changes
- External API integrations
- Data handling logic
```

### Section: Resource Awareness
```markdown
## 💰 Resource-Aware Operation

### Model Selection Heuristics
- Quick factual questions → Handle directly
- Complex reasoning → Take time, use extended thinking
- Code generation → Consider spawning specialist
- Research tasks → Spawn dedicated sub-agent

### Context Management
- Monitor context usage with session_status
- Prune irrelevant history proactively
- Summarize long conversations before they overflow
```

---

## Conclusion

The "Agentic Design Patterns" book provides a comprehensive framework for building intelligent systems. Our current implementation in AGENTS.md is strong in memory management, multi-agent coordination, and human-in-the-loop practices, but has significant opportunities for improvement in:

1. **Explicit Reasoning Techniques** - Making thought processes transparent
2. **Systematic Evaluation** - Measuring and improving over time
3. **Resource Optimization** - Smarter model/tool selection
4. **Safety Guardrails** - Protecting against misuse

The recommended quick wins (Reflection Protocol, Context Engineering, Complexity Routing) can be implemented immediately with minimal disruption. The medium-term improvements will significantly enhance reliability and quality. The longer-term changes position us for more sophisticated agentic capabilities.

---

*Analysis completed by Research Subagent*
*Source: /tmp/agentic-design-patterns.pdf (482 pages)*
