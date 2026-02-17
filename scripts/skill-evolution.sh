#!/bin/bash
# Skill Evolution — Feed execution patterns back into skills
# Run after compound review, or on-demand
# Usage: ./skill-evolution.sh [skill-name]

set -euo pipefail

SKILLS_DIR="$HOME/clawd/skills"
LESSONS="$HOME/clawd/memory/archive/lessons-learned.md"
EVOLUTION_LOG="$HOME/clawd/memory/archive/skill-evolution-log.md"

# Create evolution log if it doesn't exist
if [ ! -f "$EVOLUTION_LOG" ]; then
  echo "# Skill Evolution Log" > "$EVOLUTION_LOG"
  echo "*Tracks every skill update driven by execution feedback*" >> "$EVOLUTION_LOG"
  echo "" >> "$EVOLUTION_LOG"
fi

echo "$(date '+%Y-%m-%d %H:%M') — Skill evolution check triggered"

# List all skills with SKILL.md files
echo "Skills found:"
for skill_dir in "$SKILLS_DIR"/*/; do
  if [ -f "${skill_dir}SKILL.md" ]; then
    echo "  - $(basename "$skill_dir")"
  fi
done
