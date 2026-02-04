# Bjorn's Brew Video Ad - Agent Workflow

## Pipeline

### 1. Creative Brief Agent
**Input:** Raw idea ("15 sec social ad for coffee shop")
**Output:** Refined brief with:
- Target audience
- Key message hierarchy
- Emotional tone
- Platform-specific requirements
- Reference styles

### 2. Copywriter Agent  
**Input:** Creative brief
**Output:** 
- Headlines and taglines
- Script with timing
- CTA options
- A/B variations

### 3. Art Director Agent
**Input:** Brief + Copy
**Output:**
- Color palette (with rationale)
- Typography choices
- Visual hierarchy
- Layout sketches/descriptions
- Animation style guide

### 4. Motion Designer Agent
**Input:** All above
**Output:**
- Detailed animation timeline
- Easing/spring configs
- Transition specs
- Code-ready component specs

### 5. Code Generator Agent
**Input:** Motion specs
**Output:** Remotion TSX code

### 6. QA/Critic Agent
**Input:** Rendered video + all specs
**Output:**
- What works
- What doesn't
- Specific improvement suggestions
- Score (1-10)

## Iteration Loop
QA feedback → back to relevant agent → re-render → QA again
Continue until score ≥ 8

---

## Current Status
V1 rendered - needs full pipeline review
