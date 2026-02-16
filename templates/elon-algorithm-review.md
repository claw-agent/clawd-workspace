# Elon Algorithm Review (On-Demand)

Trigger: Marb says "run the Elon algorithm"
Source: @ericosiu's OpenClaw post, Feb 13 2026

## The 5 Steps (applied to our workspace)

### 1. QUESTION — Do we still need this?
- List all cron jobs → flag ones with no useful output recently
- List all scripts → flag ones not called in 30+ days
- List all research files → flag stale/completed topics
- Review active projects → any dead or paused?

### 2. DELETE — Kill what doesn't earn its keep
- Disable useless crons
- Archive dead research to `memory/archive/`
- Remove unused scripts
- Clean stale subagent sessions

### 3. SIMPLIFY — Can it be simpler?
- Any multi-step workflows that could be one script?
- Any skills that overlap?
- System files under budget? (target: <15K chars)

### 4. SPEED UP — Can it be faster?
- Slow crons? Reduce scope or parallelize
- Subagent tasks timing out? Optimize prompts
- Any manual steps that could be automated?

### 5. AUTOMATE — What's still manual that shouldn't be?
- Recurring manual tasks → cron or skill
- Common voice note patterns → templates
- Repeated research queries → standing monitors
