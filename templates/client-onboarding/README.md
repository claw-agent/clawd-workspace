# Client Onboarding Proposal Template

Reusable Typst template for pitching the roofing automation suite (speed-to-lead, storm monitor, review gen, roof estimator) to new clients.

## Quick Start

```bash
cd ~/clawd/templates/client-onboarding

# Generate for a specific client
typst compile onboarding-proposal.typ \
  --input client="ACME Roofing" \
  --input date="February 2026" \
  --input contact="John Smith" \
  --input market="Denver, CO" \
  output.pdf
```

## Parameters

| Input | Required | Default | Description |
|-------|----------|---------|-------------|
| `client` | Yes | — | Company name |
| `date` | Yes | — | Proposal date |
| `contact` | No | (omitted) | Contact person name |
| `market` | No | Salt Lake City, UT | Service area |

## Customization

- **Pricing:** Uncomment the pricing table near the bottom and fill in numbers
- **Colors:** Adjust `primary` and `accent` variables at the top to match client brand
- **Systems:** Add/remove feature cards if offering a subset of systems

## Sample

`sample-output.pdf` — generated for XPERIENCE Roofing as reference.
