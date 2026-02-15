# XPERIENCE Roofing — Quote PDF Generator

Generate professional customer quotes as PDFs using Typst.

## Quick Start

```bash
./generate-quote.sh --name "John Smith" --phone "801-555-1234" --address "123 Main St, SLC, UT"
```

## With Insurance Claim

```bash
./generate-quote.sh \
  --name "Jane Doe" \
  --address "789 Oak Ave, Sandy, UT 84070" \
  --phone "801-555-5678" \
  --email "jane@email.com" \
  --insurance \
  --sqft "2,800" \
  --stories "2" \
  --notes "Hail damage from Feb 2026 storm"
```

## Custom Line Items

```bash
./generate-quote.sh --name "Bob" \
  --items "Full Roof Replacement|1|8500|8500||Gutter Install|120 ft|12|1440" \
  --subtotal "9,940" --total "9,940"
```

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `--name` | Customer name | Homeowner |
| `--address` | Customer address | — |
| `--phone` | Phone number | — |
| `--email` | Email | — |
| `--quote-num` | Quote number | Auto (XR-DATE-SEQ) |
| `--roof-type` | Roof material | Asphalt Shingle |
| `--sqft` | Roof sq ft | 2,000 |
| `--stories` | Stories | 1 |
| `--pitch` | Roof pitch | 6/12 |
| `--items` | Line items (pipe-separated) | Default roof job |
| `--subtotal` | Subtotal | 9,050 |
| `--total` | Total | 9,050 |
| `--deposit` | Deposit amount | — |
| `--insurance` | Show insurance section | off |
| `--notes` | Additional notes | — |
| `--output` | Custom output path | quotes/XR-DATE-NAME.pdf |

## Line Item Format

`description|qty|unit_price|total` separated by `||`:

```
"Tear-off|1|2500|2500||Shingles|20 sq|185|3700||Cleanup|1|500|500"
```

## Requirements

- [Typst](https://typst.app/) v0.14+
