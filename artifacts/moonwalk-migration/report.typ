// Moonwalk Fitness — Rewards System Migration Report v2
// Professional dark-theme presentation

#let primary = rgb("#6C63FF")    // Purple accent
#let accent = rgb("#00D9FF")     // Cyan accent
#let dark-bg = rgb("#1A1A2E")
#let card-bg = rgb("#16213E")
#let text-color = rgb("#E8E8E8")
#let muted = rgb("#8892B0")
#let green = rgb("#00E676")
#let red = rgb("#FF5252")
#let orange = rgb("#FFB74D")
#let gold = rgb("#D4A574")         // Premium gold accent

#let metric-box(title, value, subtitle: none, color: primary) = {
  box(
    width: 100%,
    fill: card-bg,
    radius: 8pt,
    inset: 16pt,
    stroke: 1pt + color.lighten(60%),
  )[
    #set text(fill: text-color)
    #text(size: 10pt, fill: muted, weight: "bold", upper(title))
    #v(4pt)
    #text(size: 24pt, fill: color, weight: "bold", value)
    #if subtitle != none {
      v(2pt)
      text(size: 9pt, fill: muted, subtitle)
    }
  ]
}

#let section-title(title) = {
  v(8pt)
  text(size: 14pt, fill: primary, weight: "bold", title)
  v(2pt)
  line(length: 100%, stroke: 0.5pt + primary.lighten(60%))
  v(6pt)
}

#let bullet-item(content) = {
  grid(
    columns: (12pt, 1fr),
    gutter: 4pt,
    text(fill: accent, size: 10pt, sym.diamond.filled),
    text(fill: text-color, size: 10pt, content),
  )
  v(3pt)
}

#let page-number() = {
  set text(size: 8pt, fill: muted)
  align(right, context counter(page).display("1 / 1", both: true))
}

#set page(
  paper: "us-letter",
  fill: dark-bg,
  margin: (x: 48pt, top: 48pt, bottom: 40pt),
  footer: page-number(),
)

#set text(font: "Helvetica Neue", fill: text-color, size: 10pt)

// ============================================================
// PAGE 1: COVER
// ============================================================

#page(footer: none)[
  #v(1fr)
  #align(center)[
    #block(width: 80%)[
      #text(size: 12pt, fill: muted, weight: "medium", tracking: 4pt, upper[Confidential])
      #v(24pt)
      #line(length: 60pt, stroke: 2pt + primary)
      #v(24pt)
      #text(size: 36pt, fill: white, weight: "bold")[Moonwalk Fitness]
      #v(8pt)
      #text(size: 20pt, fill: accent, weight: "medium")[Rewards System Migration]
      #v(12pt)
      #text(size: 14pt, fill: muted)[From Token Locks to Game Participation]
      #v(48pt)
      #line(length: 40pt, stroke: 1pt + muted)
      #v(16pt)
      #text(size: 10pt, fill: muted)[February 2026 · v3]
      #v(4pt)
      #text(size: 9pt, fill: muted)[Strategic Analysis & Implementation Proposal]
    ]
  ]
  #v(1fr)
]

// ============================================================
// PAGE 2: EXECUTIVE SUMMARY
// ============================================================

#page[
  #text(size: 22pt, fill: white, weight: "bold")[Executive Summary]
  #v(4pt)
  #line(length: 100%, stroke: 0.5pt + primary)
  #v(16pt)

  #text(fill: text-color, size: 10.5pt)[
    Moonwalk Fitness currently holds *38.22 million MF tokens* locked across 3,855 users as part of its rewards program. Of these, *6.7 million tokens are unlockable at any time*. The entire 38.22M in the lock system represents dead capital --- generating zero revenue for the platform while tokens sit idle.

    This report proposes a fundamental shift: *replacing the token-lock rewards model with a game-participation rewards model*. Instead of locking tokens to earn rewards, users will join games --- and their share of total platform game participation will determine their reward share. Projected revenue is based on the same volume of games with locked tokens deployed into active games.
  ]

  #v(16pt)
  #section-title[Key Metrics at a Glance]

  #grid(
    columns: (1fr, 1fr, 1fr),
    gutter: 12pt,
    metric-box("Locked Tokens", "38.22M MF", subtitle: "Across 3,855 users"),
    metric-box("Dead Capital", "38.22M MF", subtitle: "Total locked, zero revenue", color: red),
    metric-box("Active in Games", "4,793", subtitle: "Locked + unlocked users", color: green),
  )
  #v(12pt)
  #grid(
    columns: (1fr, 1fr, 1fr),
    gutter: 12pt,
    metric-box("Avg Participation", "29.6%", subtitle: "Across 99 available games", color: orange),
    metric-box("Projected Revenue", [~\$200/day], subtitle: "Rake + creator fees", color: green),
    metric-box("Unlockable Now", "6.7M MF", subtitle: "Tokens users can withdraw", color: red),
  )

  #v(16pt)
  #box(fill: card-bg, radius: 8pt, inset: 16pt, width: 100%, stroke: 1pt + green.lighten(60%))[
    #text(fill: green, weight: "bold", size: 11pt)[Bottom Line]
    #v(4pt)
    #text(fill: text-color, size: 10pt)[
      The migration converts idle locked capital into active game liquidity, generates sustainable platform revenue through rake and creator fees, and creates a self-regulating economy where users voluntarily deploy tokens into games rather than passively locking them.
    ]
  ]
]

// ============================================================
// PAGE 3: CURRENT STATE ANALYSIS
// ============================================================

#page[
  #text(size: 22pt, fill: white, weight: "bold")[Current State Analysis]
  #v(4pt)
  #line(length: 100%, stroke: 0.5pt + primary)
  #v(12pt)

  #section-title[Token Lock Distribution]

  #grid(
    columns: (1fr, 1fr),
    gutter: 12pt,
    metric-box("Total Locked", "38,220,000 MF", subtitle: "3,855 unique users"),
    metric-box("Unlockable Now", "6,700,000 MF", subtitle: "17.5% of all locked tokens", color: red),
  )

  #v(12pt)
  #section-title[Game Participation]

  #grid(
    columns: (1fr, 1fr),
    gutter: 12pt,
    metric-box("Users in Games", "4,793", subtitle: "Both locked and unlocked users", color: accent),
    metric-box("Available Games", "99", subtitle: "29.63% avg participation rate", color: accent),
  )

  #v(12pt)
  #section-title[Locked User Behavior]

  #box(fill: card-bg, radius: 8pt, inset: 16pt, width: 100%)[
    #table(
      columns: (1fr, 1fr),
      align: (left, right),
      stroke: none,
      inset: 8pt,
      fill: (_, row) => if calc.odd(row) { rgb("#1a1a3e") } else { card-bg },
      table.header(
        text(fill: muted, weight: "bold", size: 9pt)[METRIC],
        text(fill: muted, weight: "bold", size: 9pt)[VALUE],
      ),
      text(fill: text-color)[Locked users in games], text(fill: accent)[2,532],
      text(fill: text-color)[Avg participation (locked users)], text(fill: accent)[37.03%],
      text(fill: text-color)[Avg locked amount], text(fill: accent)[~14,000 MF],
      text(fill: text-color)[Reward structure], text(fill: accent)[League + Participation = Weekly Credits],
    )
  ]

  #v(12pt)
  #section-title[Current Rewards Model]

  #bullet-item[Users lock credits to qualify for rewards within each league]
  #bullet-item[League placement combined with lock level determines weekly credit rewards]
  #bullet-item[Higher locks and higher leagues yield better weekly payouts]
  #bullet-item[Once a user maxes out their lock amount and league, there is no further growth path]
]

// ============================================================
// PAGE 4: THE PROBLEM
// ============================================================

#page[
  #text(size: 22pt, fill: white, weight: "bold")[The Problem]
  #v(4pt)
  #line(length: 100%, stroke: 0.5pt + red)
  #v(12pt)

  #section-title[Dead Capital: 38.22M Tokens in Lock System]

  #box(fill: card-bg, radius: 8pt, inset: 20pt, width: 100%, stroke: 1pt + red.lighten(60%))[
    #align(center)[
      #grid(
        columns: (1fr, 60pt, 1fr),
        align: (center, center, center),
        [
          #text(size: 32pt, fill: red, weight: "bold")[38.22M]
          #v(4pt)
          #text(size: 10pt, fill: muted)[Total Locked Tokens]
          #v(2pt)
          #text(size: 9pt, fill: red)[Dead capital — no revenue]
        ],
        text(size: 24pt, fill: muted)[of which],
        [
          #text(size: 32pt, fill: orange, weight: "bold")[6.7M]
          #v(4pt)
          #text(size: 10pt, fill: muted)[Unlockable Right Now]
          #v(2pt)
          #text(size: 9pt, fill: orange)[Immediate sell risk]
        ],
      )
    ]
  ]

  #v(16pt)
  #section-title[The Participation Ceiling]

  #grid(
    columns: (1fr, 1fr),
    gutter: 16pt,
    box(fill: card-bg, radius: 8pt, inset: 16pt, stroke: 1pt + orange.lighten(60%))[
      #text(fill: orange, weight: "bold", size: 11pt)[Diminishing Returns]
      #v(8pt)
      #bullet-item[Users max out lock amount]
      #bullet-item[Users reach highest league]
      #bullet-item[No incentive to acquire more MF]
      #bullet-item[Engagement plateaus and declines]
    ],
    box(fill: card-bg, radius: 8pt, inset: 16pt, stroke: 1pt + red.lighten(60%))[
      #text(fill: red, weight: "bold", size: 11pt)[Structural Issues]
      #v(8pt)
      #bullet-item[Locking only delays selling --- does not prevent it]
      #bullet-item[No platform revenue from locked tokens]
      #bullet-item[Users asking: "What do I do with my MF?"]
      #bullet-item[Growth capped by lock ceiling]
    ],
  )

  #v(16pt)
  #box(fill: rgb("#2a1a1a"), radius: 8pt, inset: 16pt, width: 100%)[
    #text(fill: red, weight: "bold", size: 11pt)[Core Issue]
    #v(4pt)
    #text(fill: text-color, size: 10pt)[
      The lock-based system was designed to reduce sell pressure, but it created a passive holding pattern with no economic activity. Users lock tokens, collect rewards, and eventually have nowhere to go. The system rewards inaction rather than engagement.
    ]
  ]
]

// ============================================================
// PAGE 5: PROPOSED MIGRATION
// ============================================================

#page[
  #text(size: 22pt, fill: white, weight: "bold")[Proposed Migration]
  #v(4pt)
  #line(length: 100%, stroke: 0.5pt + primary)
  #v(12pt)

  #section-title[The Shift: From Locking to Playing]

  #grid(
    columns: (1fr, 40pt, 1fr),
    align: (center, center, center),
    box(fill: card-bg, radius: 8pt, inset: 16pt, stroke: 1pt + red.lighten(60%))[
      #text(fill: red, weight: "bold", size: 11pt)[CURRENT MODEL]
      #v(8pt)
      #text(fill: muted, size: 10pt)[Lock tokens]
      #v(2pt)
      #text(fill: muted, size: 18pt)[#sym.arrow.b]
      #v(2pt)
      #text(fill: muted, size: 10pt)[Match tier in league]
      #v(2pt)
      #text(fill: muted, size: 18pt)[#sym.arrow.b]
      #v(2pt)
      #text(fill: muted, size: 10pt)[Collect weekly rewards]
      #v(2pt)
      #text(fill: muted, size: 18pt)[#sym.arrow.b]
      #v(2pt)
      #text(fill: red, size: 10pt)[Dead end at max tier]
    ],
    text(size: 28pt, fill: accent)[#sym.arrow.r],
    box(fill: card-bg, radius: 8pt, inset: 16pt, stroke: 1pt + green.lighten(60%))[
      #text(fill: green, weight: "bold", size: 11pt)[NEW MODEL]
      #v(8pt)
      #text(fill: text-color, size: 10pt)[Unlock all tokens]
      #v(2pt)
      #text(fill: accent, size: 18pt)[#sym.arrow.b]
      #v(2pt)
      #text(fill: text-color, size: 10pt)[Join maximum games]
      #v(2pt)
      #text(fill: accent, size: 18pt)[#sym.arrow.b]
      #v(2pt)
      #text(fill: text-color, size: 10pt)[Your share = your reward]
      #v(2pt)
      #text(fill: accent, size: 18pt)[#sym.arrow.b]
      #v(2pt)
      #text(fill: green, size: 10pt)[Unlimited growth path]
    ],
  )

  #v(16pt)
  #section-title[Dead Capital Becomes Active Liquidity]

  #text(fill: text-color, size: 10pt)[
    The total amount of tokens in the lock system --- *38.22M MF* --- represents dead capital. These tokens generate zero revenue. After migration, they flow into active games where they produce rake revenue and drive engagement.
  ]

  #v(12pt)
  #grid(
    columns: (1fr, 1fr, 1fr),
    gutter: 12pt,
    metric-box("Tokens Unlocked", "38.22M MF", subtitle: "All locks released", color: accent),
    metric-box("Absorbed by Games", "~26M MF", subtitle: "Joining available games", color: green),
    metric-box("Potential Sell Risk", "~12M MF", subtitle: "Mitigated by incentives", color: orange),
  )

  #v(12pt)
  #section-title[New Revenue Streams]

  #box(fill: card-bg, radius: 8pt, inset: 16pt, width: 100%)[
    #table(
      columns: (1fr, 1fr, 1fr),
      align: (left, right, right),
      stroke: none,
      inset: 8pt,
      fill: (_, row) => if calc.odd(row) { rgb("#1a1a3e") } else { card-bg },
      table.header(
        text(fill: muted, weight: "bold", size: 9pt)[REVENUE SOURCE],
        text(fill: muted, weight: "bold", size: 9pt)[AMOUNT],
        text(fill: muted, weight: "bold", size: 9pt)[FREQUENCY],
      ),
      text(fill: text-color)[Rake (0.1% on gross volume)], text(fill: green)[~15,000 MF], text(fill: muted)[Daily],
      text(fill: text-color)[Creator fees (increased)], text(fill: green)[~7,000 MF], text(fill: muted)[Weekly],
      text(fill: text-color, weight: "bold")[Combined estimate], text(fill: green, weight: "bold")[~21,000 MF], text(fill: muted, weight: "bold")[Daily],
      text(fill: text-color, weight: "bold")[USD equivalent], text(fill: green, weight: "bold")[~\$200], text(fill: muted, weight: "bold")[Daily],
    )
  ]
]

// ============================================================
// PAGE 6: NEW REWARDS SYSTEM — DYNAMIC RATIO
// ============================================================

#page[
  #text(size: 22pt, fill: white, weight: "bold")[New Rewards System]
  #v(4pt)
  #line(length: 100%, stroke: 0.5pt + primary)
  #v(12pt)

  #section-title[How It Works]

  #text(fill: text-color, size: 10.5pt)[
    The new system replaces token locks *and fixed tiers* with a fully dynamic, continuous reward model based on game participation. There are no Tier 1/2/3/4 brackets. Instead, your reward is a direct ratio of your contribution to total platform activity.
  ]

  #v(12pt)

  #box(fill: card-bg, radius: 8pt, inset: 20pt, width: 100%, stroke: 1pt + primary.lighten(60%))[
    #align(center)[
      #text(fill: accent, weight: "bold", size: 14pt)[Dynamic Reward Formula]
      #v(12pt)
      #text(fill: white, size: 18pt, weight: "bold")[
        Your Reward  =  #text(fill: accent)[Your Games Joined]  ÷  #text(fill: primary)[All Games Joined (Platform)]
      ]
      #v(12pt)
      #text(fill: muted, size: 10pt)[
        Continuous ratio — no fixed tiers, no brackets, no ceilings
      ]
    ]
  ]

  #v(16pt)

  #box(fill: card-bg, radius: 8pt, inset: 20pt, width: 100%, stroke: 1pt + accent.lighten(60%))[
    #align(center)[
      #grid(
        columns: (1fr, 30pt, 1fr, 30pt, 1fr),
        align: (center, center, center, center, center),
        [
          #text(fill: accent, weight: "bold", size: 12pt)[JOIN GAMES]
          #v(4pt)
          #text(fill: muted, size: 9pt)[Deploy MF into\ public games]
        ],
        text(fill: muted, size: 20pt)[#sym.arrow.r],
        [
          #text(fill: primary, weight: "bold", size: 12pt)[YOUR RATIO]
          #v(4pt)
          #text(fill: muted, size: 9pt)[Your games ÷\ platform total]
        ],
        text(fill: muted, size: 20pt)[#sym.arrow.r],
        [
          #text(fill: green, weight: "bold", size: 12pt)[GET REWARDS]
          #v(4pt)
          #text(fill: muted, size: 9pt)[Proportional share\ of reward pool]
        ],
      )
    ]
  ]

  #v(16pt)
  #section-title[Example Scenarios]

  #box(fill: card-bg, radius: 8pt, inset: 16pt, width: 100%)[
    #table(
      columns: (1fr, 1fr, 1fr, 1fr),
      align: (left, center, center, center),
      stroke: none,
      inset: 10pt,
      fill: (_, row) => if calc.odd(row) { rgb("#1a1a3e") } else { card-bg },
      table.header(
        text(fill: muted, weight: "bold", size: 9pt)[USER],
        text(fill: muted, weight: "bold", size: 9pt)[GAMES JOINED],
        text(fill: muted, weight: "bold", size: 9pt)[SHARE OF TOTAL],
        text(fill: muted, weight: "bold", size: 9pt)[REWARD SHARE],
      ),
      text(fill: text-color)[Power user (50 games)], text(fill: accent)[50], text(fill: green)[~5.0%], text(fill: green)[5.0% of pool],
      text(fill: text-color)[Active user (20 games)], text(fill: accent)[20], text(fill: orange)[~2.0%], text(fill: orange)[2.0% of pool],
      text(fill: text-color)[Casual user (5 games)], text(fill: accent)[5], text(fill: muted)[~0.5%], text(fill: muted)[0.5% of pool],
    )
    #v(4pt)
    #text(fill: muted, size: 8pt, style: "italic")[  Assuming ~1,000 total games joined across the platform]
  ]

  #v(16pt)
  #section-title[Why Dynamic Beats Fixed Tiers]

  #grid(
    columns: (1fr, 1fr),
    gutter: 12pt,
    box(fill: card-bg, radius: 8pt, inset: 16pt)[
      #text(fill: green, weight: "bold", size: 11pt)[No Ceilings]
      #v(8pt)
      #bullet-item[Every additional game joined increases your share]
      #bullet-item[No "max tier" where users stop caring]
      #bullet-item[Continuous incentive to participate more]
    ],
    box(fill: card-bg, radius: 8pt, inset: 16pt)[
      #text(fill: accent, weight: "bold", size: 11pt)[Self-Balancing]
      #v(8pt)
      #bullet-item[As more users join, individual shares adjust automatically]
      #bullet-item[No need to manually tune tier thresholds]
      #bullet-item[Naturally rewards the most active participants]
    ],
  )
]

// ============================================================
// PAGE 7: STRATEGIC ADVANTAGES
// ============================================================

#page[
  #text(size: 22pt, fill: white, weight: "bold")[Strategic Advantages]
  #v(4pt)
  #line(length: 100%, stroke: 0.5pt + green)
  #v(12pt)

  #grid(
    columns: (1fr, 1fr),
    gutter: 12pt,
    box(fill: card-bg, radius: 8pt, inset: 16pt, stroke: 1pt + green.lighten(70%))[
      #text(fill: green, weight: "bold", size: 12pt)[Eliminate Dead Capital]
      #v(8pt)
      #text(fill: text-color, size: 10pt)[
        38.22M tokens currently sitting idle in the lock system become active game liquidity. Every token in the ecosystem is working --- either in games generating rake revenue or available for users to deploy.
      ]
    ],
    box(fill: card-bg, radius: 8pt, inset: 16pt, stroke: 1pt + accent.lighten(70%))[
      #text(fill: accent, weight: "bold", size: 12pt)[Massive Token Volume]
      #v(8pt)
      #text(fill: text-color, size: 10pt)[
        Unlocked tokens flood into games, dramatically increasing on-platform volume. More volume means more rake revenue, more creator fees, and a healthier token economy with real transaction velocity instead of stagnant locks.
      ]
    ],
    box(fill: card-bg, radius: 8pt, inset: 16pt, stroke: 1pt + primary.lighten(70%))[
      #text(fill: primary, weight: "bold", size: 12pt)[Revenue Generation]
      #v(8pt)
      #text(fill: text-color, size: 10pt)[
        The current model generates zero revenue from locked tokens. The new model introduces rake fees (0.1% on volume) and increased creator fees, projecting approximately \$200 per day in sustainable revenue.
      ]
    ],
    box(fill: card-bg, radius: 8pt, inset: 16pt, stroke: 1pt + orange.lighten(70%))[
      #text(fill: orange, weight: "bold", size: 12pt)[Self-Regulating Economy]
      #v(8pt)
      #text(fill: text-color, size: 10pt)[
        Users manage their own "lock" levels by choosing how many games to join. As balances grow, users naturally create higher-stake games to maintain their reward share, driving organic volume growth.
      ]
    ],
    box(fill: card-bg, radius: 8pt, inset: 16pt, stroke: 1pt + green.lighten(70%))[
      #text(fill: green, weight: "bold", size: 12pt)[Clear Token Utility]
      #v(8pt)
      #text(fill: text-color, size: 10pt)[
        Solves the "what do I do with my MF?" problem. Every token has a clear purpose: join games, grow your share, collect rewards. Users always have a next step and a reason to hold and deploy MF.
      ]
    ],
    box(fill: card-bg, radius: 8pt, inset: 16pt, stroke: 1pt + accent.lighten(70%))[
      #text(fill: accent, weight: "bold", size: 12pt)[Voluntary Retention]
      #v(8pt)
      #text(fill: text-color, size: 10pt)[
        Users remain effectively "locked" while participating in games --- but by choice, not by force. Voluntary engagement is more sustainable than mandatory locks and leads to stronger long-term retention.
      ]
    ],
  )
]

// ============================================================
// PAGE 8: ANTI-GAMING MEASURES
// ============================================================

#page[
  #text(size: 22pt, fill: white, weight: "bold")[Anti-Gaming Measures]
  #v(4pt)
  #line(length: 100%, stroke: 0.5pt + orange)
  #v(12pt)

  #text(fill: text-color, size: 10.5pt)[
    Any participation-based reward system invites gaming attempts. Below are the anticipated attack vectors and built-in countermeasures.
  ]

  #v(12pt)
  #section-title[Attack Vector 1: Long Games to Block Newcomers]

  #box(fill: card-bg, radius: 8pt, inset: 16pt, width: 100%, stroke: 1pt + red.lighten(60%))[
    #text(fill: red, weight: "bold", size: 11pt)[The Attack]
    #v(6pt)
    #text(fill: text-color, size: 10pt)[
      Users create abnormally long games to occupy slots and prevent newcomers from joining, preserving their reward share by limiting competition.
    ]
  ]

  #v(8pt)
  #box(fill: card-bg, radius: 8pt, inset: 16pt, width: 100%, stroke: 1pt + green.lighten(60%))[
    #text(fill: green, weight: "bold", size: 11pt)[Built-in Counter]
    #v(6pt)
    #bullet-item[Longer games = tokens locked for longer periods with no flexibility]
    #bullet-item[Those tokens become unavailable for other games, reducing their ability to diversify]
    #bullet-item[Quick-rotation users can join MORE games with the same capital vs. users stuck in long games]
    #bullet-item[Net effect: long-game strategy is self-penalizing]
  ]

  #v(16pt)
  #section-title[Attack Vector 2: Bot Spam on Public Game Slots]

  #box(fill: card-bg, radius: 8pt, inset: 16pt, width: 100%, stroke: 1pt + red.lighten(60%))[
    #text(fill: red, weight: "bold", size: 11pt)[The Attack]
    #v(6pt)
    #text(fill: text-color, size: 10pt)[
      Bots or low-effort accounts flood the 20 daily public game creation slots, crowding out legitimate users.
    ]
  ]

  #v(8pt)
  #box(fill: card-bg, radius: 8pt, inset: 16pt, width: 100%, stroke: 1pt + green.lighten(60%))[
    #text(fill: green, weight: "bold", size: 11pt)[Countermeasure: League-Gated Game Creation]
    #v(6pt)
    #bullet-item[Only users at *Silver league or above* can create public games]
    #bullet-item[Reaching Silver requires meaningful engagement history — bots can't easily get there]
    #bullet-item[Protects all 20 daily public game slots from bot manipulation]
    #bullet-item[Legitimate new users can still *join* any game — only creation is gated]
  ]

  #v(16pt)
  #box(fill: rgb("#1a2a1a"), radius: 8pt, inset: 16pt, width: 100%)[
    #text(fill: green, weight: "bold", size: 11pt)[Design Principle]
    #v(4pt)
    #text(fill: text-color, size: 10pt)[
      The system's anti-gaming properties are *structural*, not rule-based. Attempting to game participation costs real capital and time, making exploits economically irrational compared to genuine engagement.
    ]
  ]
]

// ============================================================
// PAGE 9: RISKS & LIMITS OF NEW SYSTEM
// ============================================================

#page[
  #text(size: 22pt, fill: white, weight: "bold")[Risks & Limits of New System]
  #v(4pt)
  #line(length: 100%, stroke: 0.5pt + red)
  #v(12pt)

  #section-title[Risk 1: Escalating Game Costs]

  #box(fill: card-bg, radius: 8pt, inset: 16pt, width: 100%, stroke: 1pt + orange.lighten(60%))[
    #text(fill: orange, weight: "bold", size: 11pt)[The Concern]
    #v(6pt)
    #text(fill: text-color, size: 10pt)[
      As users compete for reward share, games become increasingly expensive. More money at risk means higher stakes --- and some users may conclude that the rewards are no longer worth the risk exposure.
    ]
    #v(8pt)
    #text(fill: muted, size: 9pt, style: "italic")[
      This is a natural ceiling effect: the system self-regulates, but may also self-limit.
    ]
  ]

  #v(12pt)
  #section-title[Risk 2: High-Stake Exclusion Strategy]

  #box(fill: card-bg, radius: 8pt, inset: 16pt, width: 100%, stroke: 1pt + red.lighten(60%))[
    #text(fill: red, weight: "bold", size: 11pt)[The Attack]
    #v(6pt)
    #text(fill: text-color, size: 10pt)[
      Whales create prohibitively high-stake games to keep smaller users out, monopolizing reward share by making participation too expensive for most.
    ]
  ]

  #v(8pt)
  #box(fill: card-bg, radius: 8pt, inset: 16pt, width: 100%, stroke: 1pt + green.lighten(60%))[
    #text(fill: green, weight: "bold", size: 11pt)[Counter: XP Cap from Player Joins]
    #v(6pt)
    #bullet-item[Game creators earn XP when players join their games]
    #bullet-item[High-stake games attract fewer players → less XP earned]
    #bullet-item[This *caps their league progression*, limiting long-term reward potential]
    #bullet-item[Creating accessible games is rewarded; exclusionary games are penalized]
  ]

  #v(12pt)
  #section-title[Open Question: Post-Max-Tier Behavior]

  #box(fill: card-bg, radius: 8pt, inset: 20pt, width: 100%, stroke: 1pt + primary.lighten(60%))[
    #align(center)[
      #text(fill: primary, weight: "bold", size: 12pt)[What happens when users hit max league and stop caring about XP?]
    ]
    #v(8pt)
    #text(fill: text-color, size: 10pt)[
      If a user reaches the highest league and has no further XP incentive, the counter to high-stake exclusion weakens. Potential solutions:
    ]
    #v(6pt)
    #bullet-item[Seasonal league resets requiring ongoing XP maintenance]
    #bullet-item[Decay mechanics: inactivity gradually reduces league standing]
    #bullet-item[Bonus reward pools that scale with XP earned, not just league level]
    #v(4pt)
    #text(fill: muted, size: 9pt, style: "italic")[This requires further design work before launch.]
  ]
]

// ============================================================
// PAGE 10: RISK ANALYSIS — SELL PRESSURE
// ============================================================

#page[
  #text(size: 22pt, fill: white, weight: "bold")[Risk Analysis: Sell Pressure]
  #v(4pt)
  #line(length: 100%, stroke: 0.5pt + red)
  #v(12pt)

  #section-title[Primary Risk: Token Sell Pressure]

  #box(fill: card-bg, radius: 8pt, inset: 20pt, width: 100%, stroke: 1pt + red.lighten(60%))[
    #grid(
      columns: (1fr, 1fr, 1fr),
      gutter: 16pt,
      align: center,
      [
        #text(size: 28pt, fill: accent, weight: "bold")[38.22M]
        #v(2pt)
        #text(size: 9pt, fill: muted)[Total Unlocked]
      ],
      [
        #text(size: 28pt, fill: green, weight: "bold")[~26M]
        #v(2pt)
        #text(size: 9pt, fill: muted)[Absorbed by Games]
      ],
      [
        #text(size: 28pt, fill: red, weight: "bold")[~12M]
        #v(2pt)
        #text(size: 9pt, fill: muted)[Potential Sell Risk]
      ],
    )
  ]

  #v(16pt)
  #section-title[Mitigation Strategies]

  #grid(
    columns: (1fr, 1fr),
    gutter: 12pt,
    box(fill: card-bg, radius: 8pt, inset: 16pt)[
      #text(fill: green, weight: "bold", size: 11pt)[Incentive Alignment]
      #v(8pt)
      #bullet-item[Dynamic reward share incentivizes deploying tokens into games rather than selling]
      #bullet-item[Higher game participation yields proportionally better weekly rewards]
      #bullet-item[Selling tokens directly reduces your reward share]
    ],
    box(fill: card-bg, radius: 8pt, inset: 16pt)[
      #text(fill: accent, weight: "bold", size: 11pt)[Phased Rollout]
      #v(8pt)
      #bullet-item[Gradual unlock schedule rather than instant release of all 38.22M tokens]
      #bullet-item[Monitor sell pressure and adjust pace accordingly]
      #bullet-item[Early adopter bonuses for users who transition immediately]
    ],
  )

  #v(12pt)

  #grid(
    columns: (1fr, 1fr),
    gutter: 12pt,
    box(fill: card-bg, radius: 8pt, inset: 16pt)[
      #text(fill: orange, weight: "bold", size: 11pt)[Market Safeguards]
      #v(8pt)
      #bullet-item[Monitor liquidity pools and set alert thresholds]
      #bullet-item[Buyback program funded by rake revenue if needed]
      #bullet-item[Communication campaign emphasizing new earning potential]
    ],
    box(fill: card-bg, radius: 8pt, inset: 16pt)[
      #text(fill: primary, weight: "bold", size: 11pt)[Transition Timeline]
      #v(8pt)
      #bullet-item[Week 1--2: Announce migration, educate users]
      #bullet-item[Week 3--4: Soft launch with early adopter incentives]
      #bullet-item[Week 5--8: Full migration, monitor and adjust]
    ],
  )

  #v(12pt)
  #box(fill: rgb("#1a2a1a"), radius: 8pt, inset: 16pt, width: 100%)[
    #text(fill: green, weight: "bold", size: 11pt)[Risk Assessment]
    #v(4pt)
    #text(fill: text-color, size: 10pt)[
      The ~12M token sell risk represents a worst-case scenario. In practice, the dynamic reward structure creates strong incentives to deploy rather than sell. Users who sell directly reduce their reward share, making holding and playing the economically rational choice.
    ]
  ]
]

// ============================================================
// PAGE 11: REVENUE PROJECTIONS
// ============================================================

#page[
  #text(size: 22pt, fill: white, weight: "bold")[Revenue Projections]
  #v(4pt)
  #line(length: 100%, stroke: 0.5pt + green)
  #v(12pt)

  #section-title[Revenue Model]

  #text(fill: text-color, size: 10pt)[
    Revenue is generated through two primary mechanisms: a 0.1% rake on gross game volume and increased creator fees. Projections assume the same number of games as today, with locked tokens now deployed as active game liquidity:
  ]

  #v(12pt)

  #box(fill: card-bg, radius: 8pt, inset: 16pt, width: 100%)[
    #table(
      columns: (1fr, 1fr, 1fr, 1fr),
      align: (left, right, right, right),
      stroke: none,
      inset: 10pt,
      fill: (_, row) => if calc.odd(row) { rgb("#1a1a3e") } else { card-bg },
      table.header(
        text(fill: muted, weight: "bold", size: 9pt)[SOURCE],
        text(fill: muted, weight: "bold", size: 9pt)[DAILY],
        text(fill: muted, weight: "bold", size: 9pt)[MONTHLY],
        text(fill: muted, weight: "bold", size: 9pt)[ANNUAL],
      ),
      text(fill: text-color)[Rake (0.1% gross vol.)], text(fill: green)[~15,000 MF], text(fill: green)[~450,000 MF], text(fill: green)[~5,475,000 MF],
      text(fill: text-color)[Creator fees], text(fill: green)[~1,000 MF], text(fill: green)[~30,000 MF], text(fill: green)[~365,000 MF],
      text(fill: text-color, weight: "bold")[Total MF], text(fill: accent, weight: "bold")[~16,000 MF], text(fill: accent, weight: "bold")[~480,000 MF], text(fill: accent, weight: "bold")[~5,840,000 MF],
      text(fill: text-color, weight: "bold")[USD (at \$0.0095)], text(fill: green, weight: "bold")[~\$152], text(fill: green, weight: "bold")[~\$4,560], text(fill: green, weight: "bold")[~\$55,480],
    )
  ]

  #v(16pt)
  #section-title[Growth Scenarios]

  #grid(
    columns: (1fr, 1fr, 1fr),
    gutter: 12pt,
    box(fill: card-bg, radius: 8pt, inset: 16pt, stroke: 1pt + muted)[
      #text(fill: muted, weight: "bold", size: 11pt)[Conservative]
      #text(fill: muted, size: 9pt)[ (Current levels)]
      #v(8pt)
      #text(size: 20pt, fill: text-color, weight: "bold")[\$55K]
      #v(2pt)
      #text(fill: muted, size: 9pt)[Annual revenue]
      #v(8pt)
      #text(fill: muted, size: 9pt)[Assumes no volume growth after migration]
    ],
    box(fill: card-bg, radius: 8pt, inset: 16pt, stroke: 1pt + accent.lighten(60%))[
      #text(fill: accent, weight: "bold", size: 11pt)[Moderate]
      #text(fill: accent, size: 9pt)[ (2x volume)]
      #v(8pt)
      #text(size: 20pt, fill: accent, weight: "bold")[\$110K]
      #v(2pt)
      #text(fill: muted, size: 9pt)[Annual revenue]
      #v(8pt)
      #text(fill: muted, size: 9pt)[Doubled participation from reward incentives]
    ],
    box(fill: card-bg, radius: 8pt, inset: 16pt, stroke: 1pt + green.lighten(60%))[
      #text(fill: green, weight: "bold", size: 11pt)[Optimistic]
      #text(fill: green, size: 9pt)[ (5x volume)]
      #v(8pt)
      #text(size: 20pt, fill: green, weight: "bold")[\$275K]
      #v(2pt)
      #text(fill: muted, size: 9pt)[Annual revenue]
      #v(8pt)
      #text(fill: muted, size: 9pt)[Full ecosystem activation + new users]
    ],
  )

  #v(16pt)
  #section-title[Break-Even Analysis]

  #box(fill: card-bg, radius: 8pt, inset: 16pt, width: 100%)[
    #text(fill: text-color, size: 10pt)[
      *Current model revenue: \$0/day.* Any revenue generated by the new system represents pure upside. At conservative estimates of ~\$150/day, the platform reaches positive ROI from day one.
    ]
  ]
]

// ============================================================
// PAGE 12: POTENTIAL IDEAS & OPEN QUESTIONS
// ============================================================

#page[
  #text(size: 22pt, fill: white, weight: "bold")[Potential Ideas & Open Questions]
  #v(4pt)
  #line(length: 100%, stroke: 0.5pt + primary)
  #v(12pt)

  #section-title[Idea: Remove Weekly Games Entirely]

  #text(fill: text-color, size: 10.5pt)[
    Instead of weekly game rituals, reward users once per week based on the *total games they've joined* across the platform. This fundamentally simplifies the system.
  ]

  #v(12pt)
  #grid(
    columns: (1fr, 1fr),
    gutter: 12pt,
    box(fill: card-bg, radius: 8pt, inset: 16pt, stroke: 1pt + green.lighten(60%))[
      #text(fill: green, weight: "bold", size: 11pt)[Pros]
      #v(8pt)
      #bullet-item[Simplifies home screen and app logic significantly]
      #bullet-item[Reduces cognitive load — users just join games and get paid]
      #bullet-item[Easier to explain to new users]
      #bullet-item[Cleaner codebase and fewer edge cases]
    ],
    box(fill: card-bg, radius: 8pt, inset: 16pt, stroke: 1pt + red.lighten(60%))[
      #text(fill: red, weight: "bold", size: 11pt)[Cons]
      #v(8pt)
      #bullet-item[Users might miss the weekly game ritual and social element]
      #bullet-item[Could reduce game joins if the weekly urgency disappears]
      #bullet-item[Less frequent engagement touchpoints]
      #bullet-item[Revenue risk if max participation is the goal]
    ],
  )

  #v(16pt)
  #section-title[Accountability Mechanism]

  #box(fill: card-bg, radius: 8pt, inset: 16pt, width: 100%, stroke: 1pt + orange.lighten(60%))[
    #text(fill: orange, weight: "bold", size: 11pt)[Miss Steps → Lose Rewards]
    #v(8pt)
    #text(fill: text-color, size: 10pt)[
      If a user misses steps in their active games, they lose weekly rewards entirely. This creates a natural check against over-commitment:
    ]
    #v(8pt)
    #bullet-item[Users think twice before joining too many games they can't maintain]
    #bullet-item[Quality of participation matters, not just quantity]
    #bullet-item[Prevents "join everything, do nothing" strategy]
  ]

  #v(16pt)
  #section-title[Key Trade-off]

  #box(fill: card-bg, radius: 8pt, inset: 20pt, width: 100%, stroke: 1pt + primary.lighten(60%))[
    #align(center)[
      #grid(
        columns: (1fr, 40pt, 1fr),
        align: (center, center, center),
        [
          #text(fill: green, weight: "bold", size: 12pt)[Max Simplicity]
          #v(4pt)
          #text(fill: muted, size: 9pt)[Remove weekly games\ Reward based on total joins\ Cleaner UX]
        ],
        text(fill: muted, size: 20pt)[vs],
        [
          #text(fill: accent, weight: "bold", size: 12pt)[Max Participation]
          #v(4pt)
          #text(fill: muted, size: 9pt)[Keep weekly rituals\ More engagement hooks\ Higher revenue ceiling]
        ],
      )
    ]
    #v(8pt)
    #align(center)[
      #text(fill: muted, size: 9pt, style: "italic")[This decision should be informed by user research and A/B testing during soft launch.]
    ]
  ]
]

// ============================================================
// PAGE 13: TEAM FEEDBACK — CLEMENT
// ============================================================

#page[
  #text(size: 22pt, fill: white, weight: "bold")[Team Feedback]
  #v(4pt)
  #line(length: 100%, stroke: 0.5pt + accent)
  #v(8pt)
  #text(fill: muted, size: 10pt, style: "italic")[Feedback from Clement (\@oskyment) — February 2026]
  #v(16pt)

  #section-title[1. Minimum Game Duration — Ban 1-Day Games]

  #box(fill: card-bg, radius: 8pt, inset: 16pt, width: 100%, stroke: 1pt + orange.lighten(60%))[
    #text(fill: orange, weight: "bold", size: 11pt)[Problem]
    #v(6pt)
    #text(fill: text-color, size: 10pt)[
      1-day games pollute the game list and can be exploited for quick reward farming. They add noise without meaningful engagement.
    ]
  ]

  #v(8pt)
  #box(fill: card-bg, radius: 8pt, inset: 16pt, width: 100%, stroke: 1pt + green.lighten(60%))[
    #text(fill: green, weight: "bold", size: 11pt)[Proposal]
    #v(6pt)
    #bullet-item[*Enforce a 1-week minimum game duration* for all public games]
    #bullet-item[Eliminates short-game spam and reward farming via rapid game cycling]
    #bullet-item[Keeps the game list clean and meaningful]
    #bullet-item[Open question: are there legitimate use cases for shorter games (e.g., weekend challenges)?]
  ]

  #v(16pt)
  #section-title[2. Step Ceiling for Reward-Eligible Games]

  #box(fill: card-bg, radius: 8pt, inset: 16pt, width: 100%, stroke: 1pt + accent.lighten(60%))[
    #text(fill: accent, weight: "bold", size: 11pt)[Proposal]
    #v(6pt)
    #text(fill: text-color, size: 10pt)[
      Cap the maximum daily step count that counts toward reward tier calculation. This prevents users from gaming the system with unrealistic step counts and keeps the playing field accessible.
    ]
    #v(8pt)
    #bullet-item[Ensures casual and moderate users can compete fairly]
    #bullet-item[Discourages step-count manipulation (phone shakers, etc.)]
    #bullet-item[Suggested cap TBD — needs analysis of current step distributions]
  ]

  #v(16pt)
  #section-title[3. Game Stake Diversity]

  #box(fill: card-bg, radius: 8pt, inset: 16pt, width: 100%, stroke: 1pt + primary.lighten(60%))[
    #text(fill: primary, weight: "bold", size: 11pt)[Proposal]
    #v(6pt)
    #text(fill: text-color, size: 10pt)[
      Ensure a healthy distribution of low, mid, and high stake games is always available. Without guardrails, the game list could skew toward one end --- either all whale games or all micro-stakes.
    ]
    #v(8pt)
    #bullet-item[Reserve a portion of the 20 daily public game slots for each stake tier]
    #bullet-item[Example: 8 low-stake, 7 mid-stake, 5 high-stake (adjustable)]
    #bullet-item[Guarantees every user finds games at their comfort level]
  ]
]

// ============================================================
// PAGE 14: FUTURE CONCEPT — SUBSCRIPTIONS
// ============================================================

#page[
  #text(size: 22pt, fill: white, weight: "bold")[Future Concept: Subscriptions]
  #v(4pt)
  #line(length: 100%, stroke: 0.5pt + gold)
  #v(8pt)
  #text(fill: muted, size: 10pt, style: "italic")[Post-migration revenue expansion — proposed by Clement (\@oskyment)]
  #v(16pt)

  #section-title[Moonwalk Premium — \$10/month]

  #text(fill: text-color, size: 10.5pt)[
    Once the rewards migration simplifies the core app, introduce a premium subscription tier that adds exclusive benefits without breaking the free-to-play economy.
  ]

  #v(12pt)

  #grid(
    columns: (1fr, 1fr),
    gutter: 12pt,
    box(fill: card-bg, radius: 8pt, inset: 16pt, stroke: 1pt + gold.lighten(60%))[
      #text(fill: gold, weight: "bold", size: 11pt)[2x Score Multiplier]
      #v(8pt)
      #text(fill: text-color, size: 10pt)[
        Subscribers earn double the score toward their reward tier calculation. This doesn't double rewards directly --- it doubles how fast they climb the dynamic ratio, rewarding consistent engagement.
      ]
    ],
    box(fill: card-bg, radius: 8pt, inset: 16pt, stroke: 1pt + gold.lighten(60%))[
      #text(fill: gold, weight: "bold", size: 11pt)[Step Insurance]
      #v(8pt)
      #text(fill: text-color, size: 10pt)[
        Miss up to 3 days of steps per month without losing rewards. Life happens --- travel, illness, rest days. Insurance keeps premium users engaged instead of frustrated and churning.
      ]
    ],
  )

  #v(16pt)
  #section-title[Membership-Exclusive Game Types]

  #box(fill: card-bg, radius: 8pt, inset: 20pt, width: 100%, stroke: 1pt + gold.lighten(60%))[
    #text(fill: gold, weight: "bold", size: 12pt)[Premium Game Modes]
    #v(8pt)
    #bullet-item[*Duels* — 1v1 head-to-head step battles with direct MF stakes]
    #bullet-item[*Tournaments* — Bracket-style competitions with prize pools]
    #bullet-item[*Custom Challenges* — Create games with unique rules and parameters]
    #v(12pt)
    #text(fill: text-color, size: 10pt)[
      These exclusive modes give subscribers tangible value beyond the multiplier, while keeping the core game-participation economy free and open for everyone.
    ]
  ]

  #v(16pt)
  #section-title[Revenue Impact]

  #grid(
    columns: (1fr, 1fr, 1fr),
    gutter: 12pt,
    metric-box("At 5% conversion", "\$1,925/mo", subtitle: "3,855 users × 5% × \$10", color: gold),
    metric-box("At 10% conversion", "\$3,855/mo", subtitle: "385 subscribers", color: gold),
    metric-box("Annual (10%)", "\$46,260", subtitle: "Recurring, predictable", color: green),
  )

  #v(12pt)
  #box(fill: rgb("#2a2a1a"), radius: 8pt, inset: 16pt, width: 100%)[
    #text(fill: gold, weight: "bold", size: 11pt)[Strategic Note]
    #v(4pt)
    #text(fill: text-color, size: 10pt)[
      Subscriptions work best *after* the app simplifies post-migration. A cleaner core experience makes the premium upsell feel like a natural enhancement rather than a paywall on complexity. Launch subscriptions in Phase 6 or later.
    ]
  ]
]

// ============================================================
// PAGE 15: SUMMARY & NEXT STEPS
// ============================================================

#page[
  #text(size: 22pt, fill: white, weight: "bold")[Summary & Next Steps]
  #v(4pt)
  #line(length: 100%, stroke: 0.5pt + primary)
  #v(12pt)

  #section-title[Key Takeaways]

  #grid(
    columns: (30pt, 1fr),
    gutter: 8pt,
    align: (center, left),
    text(fill: green, size: 16pt, weight: "bold")[1],
    text(fill: text-color, size: 10.5pt)[*Dead capital becomes active liquidity.* 38.22M idle tokens enter the game economy, generating revenue instead of sitting dormant.],
    text(fill: green, size: 16pt, weight: "bold")[2],
    text(fill: text-color, size: 10.5pt)[*Revenue from zero to ~\$55K annually* at current levels, with significant upside as token volume and participation grow.],
    text(fill: green, size: 16pt, weight: "bold")[3],
    text(fill: text-color, size: 10.5pt)[*Dynamic rewards replace fixed tiers.* Your share = your games ÷ total games. No brackets, no ceilings, always room to grow.],
    text(fill: green, size: 16pt, weight: "bold")[4],
    text(fill: text-color, size: 10.5pt)[*Structural anti-gaming.* Long games self-penalize, league-gating stops bots, and high-stake exclusion caps XP progression.],
    text(fill: green, size: 16pt, weight: "bold")[5],
    text(fill: text-color, size: 10.5pt)[*Open questions remain.* Post-max-league behavior, weekly game removal, and escalating game costs need further design work.],
  )

  #v(20pt)
  #section-title[Recommended Next Steps]

  #box(fill: card-bg, radius: 8pt, inset: 16pt, width: 100%)[
    #table(
      columns: (80pt, 1fr, 80pt),
      align: (left, left, right),
      stroke: none,
      inset: 10pt,
      fill: (_, row) => if calc.odd(row) { rgb("#1a1a3e") } else { card-bg },
      table.header(
        text(fill: muted, weight: "bold", size: 9pt)[PHASE],
        text(fill: muted, weight: "bold", size: 9pt)[ACTION],
        text(fill: muted, weight: "bold", size: 9pt)[TIMELINE],
      ),
      text(fill: accent, weight: "bold")[Phase 1], text(fill: text-color)[Finalize dynamic reward formula and league-gating rules], text(fill: muted)[Week 1--2],
      text(fill: accent, weight: "bold")[Phase 2], text(fill: text-color)[Develop migration tooling and update smart contracts], text(fill: muted)[Week 2--4],
      text(fill: accent, weight: "bold")[Phase 3], text(fill: text-color)[User communication campaign and FAQ documentation], text(fill: muted)[Week 3--4],
      text(fill: accent, weight: "bold")[Phase 4], text(fill: text-color)[Soft launch with early adopters; A/B test weekly game removal], text(fill: muted)[Week 5--6],
      text(fill: accent, weight: "bold")[Phase 5], text(fill: text-color)[Full migration, anti-gaming monitoring], text(fill: muted)[Week 7--8],
      text(fill: accent, weight: "bold")[Phase 6], text(fill: text-color)[Post-migration analysis, address open questions], text(fill: muted)[Week 9--12],
    )
  ]

  #v(1fr)

  #align(center)[
    #box(fill: card-bg, radius: 8pt, inset: 20pt, width: 80%)[
      #text(fill: primary, weight: "bold", size: 12pt)[Moonwalk Fitness]
      #v(4pt)
      #text(fill: muted, size: 9pt)[This document is confidential and intended for internal strategic planning.]
      #v(2pt)
      #text(fill: muted, size: 9pt)[February 2026 · v3]
    ]
  ]
]
