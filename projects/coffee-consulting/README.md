# Coffee Shop Consulting Project

**Client:** Marb's family coffee shop chain
**Started:** 2026-01-25
**Status:** Discovery phase

## Business Overview
- 3 coffee shop locations
- Dad is the operator
- Managers at each location handle scheduling/timekeeping
- Profitable but operationally messy

## Current Tech Stack
- **Scheduling/Timekeeping:** 7shifts
- **Payroll/Accounting:** QuickBooks
- **Process:** Manual exports → spreadsheets → manual entry (2-3h/week per manager)

## Pain Points
1. Manual data transfer between 7shifts and QuickBooks
2. Complex pay rates (shift leads, different roles)
3. Time-intensive payroll processing
4. No data-driven decision making on menu/pricing/promotions

## Opportunity Areas

### Phase 1: Automation (Quick Wins)
- [ ] 7shifts → QuickBooks integration (eliminate manual exports)
- [ ] Automated timesheet validation and pay rate assignment
- [ ] Payroll tax automation
- **Impact:** 6-9+ hours/week saved across managers

### Phase 2: Analytics & Optimization
- [ ] Historical sales data analysis
- [ ] Menu item profitability (COGS analysis)
- [ ] Promotional effectiveness tracking
- [ ] Traffic patterns and staffing optimization
- **Impact:** Data-driven pricing and menu decisions

### Phase 3: Growth Intelligence
- [ ] Location scouting (Google Places API)
- [ ] Traffic data analysis for potential sites
- [ ] Break-even modeling
- [ ] Rent/lease negotiation data
- [ ] Marketing/ad strategy
- **Impact:** Informed expansion decisions

## Information Needed

### For Automation
- [ ] 7shifts account access or API credentials
- [ ] QuickBooks Online version and access
- [ ] Current pay rate structure (roles, rates, differentials)
- [ ] Sample timesheet exports (to understand data format)

### For Analytics
- [ ] POS system info (Square? Toast? Other?)
- [ ] Historical sales data access
- [ ] Current menu with costs
- [ ] Any existing spreadsheets/reports

### For Growth
- [ ] Current locations (addresses)
- [ ] Target markets/cities for expansion
- [ ] Typical lease terms and costs
- [ ] Average store performance benchmarks

## Agent Teams

### Operations Team ✅ BUILT
Focus: Payroll automation, scheduling optimization, process improvement

| Agent | File | Status |
|-------|------|--------|
| Operations Director | `agents/operations-director.md` | ✅ |
| Payroll Automation Specialist | `agents/payroll-automation-specialist.md` | ✅ |
| Scheduling Optimizer | `agents/scheduling-optimizer.md` | ✅ |

### Analytics Team ✅ BUILT
Focus: Sales data, menu optimization, pricing strategy, COGS analysis

| Agent | File | Status |
|-------|------|--------|
| Analytics Director | `agents/analytics-director.md` | ✅ |
| Menu Optimization Analyst | `agents/menu-optimization-analyst.md` | ✅ |
| COGS Analyst | `agents/cogs-analyst.md` | ✅ |
| Sales Analyst | `agents/sales-analyst.md` | ✅ |

### Growth Team ✅ BUILT
Focus: Location scouting, market analysis, expansion modeling

| Agent | File | Status |
|-------|------|--------|
| Growth Director | `agents/growth-director.md` | ✅ |
| Location Scout | `agents/location-scout.md` | ✅ |
| Market Analyst | `agents/market-analyst.md` | ✅ |
| Financial Modeler | `agents/financial-modeler.md` | ✅ |

## Automations ✅ BUILT

| Script | Purpose | Status |
|--------|---------|--------|
| `automations/7shifts-export.js` | Export timesheets from 7shifts | ✅ |
| `automations/quickbooks-import.js` | Import time data to QuickBooks | ✅ |
| `automations/payroll-pipeline.sh` | Full payroll automation workflow | ✅ |

## Analysis Templates ✅ BUILT

| Template | Purpose |
|----------|---------|
| `analysis/cogs-template.md` | COGS analysis report format |
| `analysis/menu-engineering-template.md` | Menu engineering matrix |
| `analysis/sales-dashboard-template.md` | Sales dashboard format |

---

## Session Log

### 2026-01-25
- Project initiated
- Captured initial scope via voice message from Marb
- Created project structure
- Identified three main workstreams: Automation, Analytics, Growth
