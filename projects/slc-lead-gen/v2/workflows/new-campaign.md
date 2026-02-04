# Workflow: Launch New Campaign

> End-to-end workflow from target identification to qualified leads

## Overview

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ 1. Research │ → │ 2. List     │ → │ 3. Outreach │ → │ 4. Qualify  │
│             │    │    Build    │    │             │    │             │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
    2-4 hrs            2-4 hrs           1-2 hrs          Ongoing
```

## Inputs Required

- **Target definition:** Industry, company size, location, other criteria
- **Campaign name:** For file organization
- **Offer/angle:** What are we pitching?
- **Timeline:** When does this need to launch?

## Phase 1: Research (Researcher Agent)

**Trigger:** "Research [target market/segment] for new campaign"

**Tasks:**
1. Market sizing — How big is this segment?
2. Key players — Who are the major companies?
3. Pain points — What problems do they have?
4. Timing signals — What triggers indicate readiness?
5. Competitive landscape — Who else is targeting them?

**Output:**
- `data/research/{date}/campaign-{name}-research.md`

**Handoff to List Builder:**
```
Research complete. Key findings:
- Target segment: [description]
- Estimated TAM: [number of companies]
- Primary pain points: [list]
- Best signals to look for: [list]
- Proceed to build prospect list matching: [criteria]
```

---

## Phase 2: List Build (List Builder Agent)

**Trigger:** Researcher handoff OR "Build list for [campaign]"

**Tasks:**
1. Define search criteria from research
2. Source prospects (LinkedIn, directories, etc.)
3. Enrich with contact data
4. Score and tier prospects
5. Dedupe against existing lists

**Output:**
- `data/lists/{campaign-name}/prospects.json`
- `data/lists/{campaign-name}/summary.md`

**Handoff to Outreach:**
```
List complete:
- Total prospects: X
- A-tier: X (prioritize)
- B-tier: X
- C-tier: X
- Personalization notes: [key findings per tier]
- Ready for sequence creation
```

---

## Phase 3: Outreach (Outreach Agent)

**Trigger:** List Builder handoff OR "Create campaign for [list]"

**Tasks:**
1. Review prospect list and research
2. Identify personalization angles
3. Write email sequence (3-5 emails)
4. Write LinkedIn touchpoints
5. Set up sending schedule

**Output:**
- `data/campaigns/{campaign-name}/sequence.md`
- `data/campaigns/{campaign-name}/linkedin-messages.md`

**Handoff to Qualifier:**
```
Campaign launched:
- Campaign ID: {name}
- Prospects contacted: X
- Sequence length: X emails over Y days
- Expected reply window: [dates]
- Reply routing: All replies to Qualifier for scoring
```

---

## Phase 4: Qualify (Qualifier Agent)

**Trigger:** Replies come in OR "Qualify leads from [campaign]"

**Tasks:**
1. Monitor for replies
2. Analyze sentiment and intent
3. Score with BANT+ framework
4. Route appropriately

**Outputs:**
- Hot leads → Sales handoff brief
- Warm leads → Discovery call sequence
- Nurture leads → Drip campaign
- Cold leads → Archive with reason

---

## Orchestration Options

### Option A: Sequential (Manual Handoffs)
```
You (Claw) coordinate each phase:

1. spawn researcher → wait for completion
2. spawn list-builder with researcher output → wait
3. spawn outreach with list → wait
4. spawn qualifier as replies come in
```

### Option B: Fully Automated (Single Spawn)
```
spawn workflow agent that runs all phases:

sessions_spawn task="Execute new-campaign workflow for [target]" label="campaign-[name]"
```

### Option C: Parallel Where Possible
```
Phase 1-2 can partially overlap:
- Researcher starts market research
- List Builder starts with known criteria
- Both update shared context
- Merge findings before Outreach
```

---

## Example Execution

**Request:** "Run a campaign targeting Utah fintech startups"

**Phase 1 (Researcher):**
```
Spawning researcher...
→ Found 47 fintech companies in Utah
→ Key pain points: compliance burden, customer acquisition cost
→ Signals: Recent funding, hiring compliance roles
→ Saved to research/2026-01-26/utah-fintech.md
```

**Phase 2 (List Builder):**
```
Spawning list-builder...
→ Built list of 32 prospects (15 A-tier, 12 B-tier, 5 C-tier)
→ Enriched with decision-maker contacts
→ Saved to lists/utah-fintech-q1/prospects.json
```

**Phase 3 (Outreach):**
```
Spawning outreach...
→ Created 4-email sequence + LinkedIn touches
→ Personalized openers for A-tier
→ Saved to campaigns/utah-fintech-q1/sequence.md
→ Ready to send (or send command)
```

**Phase 4 (Qualifier):**
```
[Reply received from Acme Fintech]
→ Sentiment: Positive (asked about pricing)
→ BANT+ Score: 85/100
→ Verdict: HOT
→ Action: Sales handoff with briefing
```

---

## Checklist

Before launching any campaign:

- [ ] Target criteria clearly defined
- [ ] Research completed and reviewed
- [ ] List quality verified (valid emails, right titles)
- [ ] Sequence reviewed for personalization
- [ ] Sending limits/compliance checked
- [ ] Reply routing set up
- [ ] Success metrics defined
