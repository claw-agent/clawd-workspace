# Reusable Task Patterns

Copy-paste spawn commands for common tasks. Fill in the `[TOPIC]` placeholders.

---

## 🔬 Research Swarm (4 parallel scouts)

For deep research on any topic. Spawns 4 agents with different angles, then synthesizes.

```
sessions_spawn task="Read ~/clawd/AGENTS.md first. Research [TOPIC] from the TECHNICAL angle. Focus on: how it works, implementation details, code examples, architecture. Write findings to ~/clawd/research/[topic]-technical.md"

sessions_spawn task="Read ~/clawd/AGENTS.md first. Research [TOPIC] from the MARKET angle. Focus on: competitors, pricing, market size, who's using it, trends. Write findings to ~/clawd/research/[topic]-market.md"

sessions_spawn task="Read ~/clawd/AGENTS.md first. Research [TOPIC] from the PRACTICAL angle. Focus on: tutorials, getting started, common pitfalls, best practices. Write findings to ~/clawd/research/[topic]-practical.md"

sessions_spawn task="Read ~/clawd/AGENTS.md first. Research [TOPIC] from the OPINION angle. Focus on: Twitter discourse, Reddit threads, HN discussions, what people love/hate. Write findings to ~/clawd/research/[topic]-opinions.md"
```

After all complete, synthesize into single report.

---

## 👥 Focus Group Review (5 personas)

Get diverse feedback on a document, deck, or idea from different perspectives.

```
sessions_spawn task="Read ~/clawd/AGENTS.md first. You are ALEX, a skeptical technical founder who's seen too many pitches. Review [DOCUMENT_PATH]. Be critical. What's weak? What questions would you ask? What would make you say no?"

sessions_spawn task="Read ~/clawd/AGENTS.md first. You are JORDAN, a first-time user who knows nothing about this space. Review [DOCUMENT_PATH]. What's confusing? What jargon needs explaining? Where did you get lost?"

sessions_spawn task="Read ~/clawd/AGENTS.md first. You are MORGAN, an experienced VC who's seen 1000 decks. Review [DOCUMENT_PATH]. Is this fundable? What's the biggest risk? What would you need to see to write a check?"

sessions_spawn task="Read ~/clawd/AGENTS.md first. You are CASEY, a potential customer in the target market. Review [DOCUMENT_PATH]. Would you buy this? What would make you switch from your current solution? What's missing?"

sessions_spawn task="Read ~/clawd/AGENTS.md first. You are RILEY, a design-focused critic. Review [DOCUMENT_PATH]. How does it look and feel? What's the emotional response? Does the visual hierarchy work?"
```

---

## 📝 Code Review (security + quality)

For any significant code changes.

```
sessions_spawn task="Read ~/clawd/AGENTS.md first, then read ~/clawd/agents/code-reviewer.md. Review: [FILE_OR_CHANGES]. Focus on bugs, edge cases, code quality, maintainability."

sessions_spawn task="Read ~/clawd/AGENTS.md first, then read ~/clawd/agents/security-reviewer.md. Review: [FILE_OR_CHANGES]. Focus on vulnerabilities, injection risks, auth issues, data exposure."
```

---

## 🎯 Competitor Analysis

Deep dive on a specific competitor or market.

```
sessions_spawn task="Read ~/clawd/AGENTS.md first. Analyze [COMPETITOR]. Research: pricing, features, target market, strengths, weaknesses, recent news, user reviews. Check their website, Twitter, LinkedIn, G2/Capterra reviews. Write comprehensive analysis to ~/clawd/research/competitors/[competitor].md"
```

---

## 📊 Quick Report Template

For generating a Typst PDF report.

```bash
# Copy template
cp ~/clawd/templates/report.typ ~/clawd/reports/[name].typ

# Edit with content, then compile
typst compile ~/clawd/reports/[name].typ ~/clawd/reports/[name].pdf
```

---

## 🔍 Topic Deep Dive (single agent)

For focused research on one topic.

```
sessions_spawn task="Read ~/clawd/AGENTS.md first. Do a comprehensive deep dive on [TOPIC]. Cover: what it is, how it works, key players, getting started, best practices, pitfalls, and your recommendation on whether we should use it. Write to ~/clawd/research/[topic]-deep-dive.md" runTimeoutSeconds=600
```

---

## 💡 Idea Validation

Quick market validation for a new idea.

```
sessions_spawn task="Read ~/clawd/AGENTS.md first. Validate this idea: [IDEA]. Research: Does this already exist? Who are competitors? What's the market size? Is there demand (check Reddit, Twitter, forums)? What would MVP look like? Write honest assessment to ~/clawd/research/validation/[idea].md"
```

---

*Add new patterns as we discover them. Keep prompts copy-paste ready.*
