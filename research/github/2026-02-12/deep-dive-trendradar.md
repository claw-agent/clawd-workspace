# Deep Dive: sansan0/TrendRadar

## Overview
AI-driven public opinion and trend monitoring tool. Aggregates multi-platform hot topics, supports RSS, AI analysis, and smart alerts across 9+ notification channels. v6.0.0 just released (2026-02-09).

## Key Features
- **Multi-platform aggregation:** Pulls trending data from multiple platforms via newsnow API
- **AI analysis:** LiteLLM-based analysis supporting 100+ AI providers. Configurable analysis modes (follow_report, daily, current, incremental)
- **MCP server (v4.0.0):** 21+ tools for querying trends, RSS feeds, searching news, reading articles. AI can push formatted messages to all channels.
- **Timeline scheduling (v6.0.0):** 5 preset scheduling templates (always_on, morning_evening, office_hours, night_owl, custom). Supports weekday/weekend differentiation.
- **9 notification channels:** WeChat, Feishu, DingTalk, Telegram, Email, ntfy, bark, Slack + more
- **Docker deployment:** One-click setup
- **Visual config editor:** Web-based UI for editing configs and viewing timeline schedules

## Recent Activity (Very Active)
- v6.0.0 (2026-02-09): Breaking change — unified scheduling system, visual editor, AI prompt optimization
- MCP v4.0.0 (2026-02-09): AI message push to all channels, format guide tool, smart batching
- MCP v3.2.0 (2026-02-02): Article reading tools via Jina AI Reader
- v5.5.0 (2026-01-28): Visual config editor
- Multiple releases per week — extremely active development

## Relevance to Us
**HIGH.** This does what our scout/sentinel system does but as a mature product:
- We run custom GitHub trending analysis (this very task) — TrendRadar automates this
- MCP integration means we could query it from Claude naturally
- Telegram push built-in — matches our notification channel
- AI analysis with scheduling — similar to our morning brief pipeline

## Comparison with Our Setup
| Feature | Our System | TrendRadar |
|---------|-----------|------------|
| Trend monitoring | Custom scripts + scouts | Built-in multi-platform |
| AI analysis | Manual in scout prompts | Automated with LiteLLM |
| Scheduling | Cron jobs | Visual timeline editor |
| Notifications | Telegram via OpenClaw | 9 channels native |
| MCP | N/A | 21+ tools |

## Action Items
1. Deploy via Docker for evaluation
2. Test MCP server integration with our Claude setup
3. Compare output quality with our scout system
4. Could potentially replace GitHub Sentinel + custom trending analysis

## Maturity: Production (v6.0.0), very active community, Docker-ready
