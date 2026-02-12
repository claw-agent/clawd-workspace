# Artifacts Directory

Standardized output location for agent-produced artifacts. Subagents write here, main session reviews and distributes.

## Canonical Output Paths

| Type | Path | Examples |
|------|------|----------|
| Research docs | `~/clawd/research/` | Market analysis, tech evaluations |
| Reports | `~/clawd/reports/` | Morning briefs, weekly digests |
| Artifacts | `~/clawd/artifacts/` | One-off builds, PDFs, generated sites |
| System outputs | `~/clawd/systems/` | Production system data (storm alerts, etc.) |
| Project builds | `~/clawd/projects/[name]/` | Ongoing project work |
| Ephemeral/test | `/tmp/` | Throwaway test files only |

## Rules
- Subagents should write to `~/clawd/artifacts/` unless writing to a specific project
- Never write important outputs to `/tmp/` — they get cleaned
- Use descriptive filenames: `xperience-pitch-deck-v2.pdf` not `output.pdf`
- Date-stamp if multiple versions expected: `report-2026-02-12.pdf`
