# Deep Dive: tambo-ai/tambo

## Overview
Generative UI SDK for React. v1.0 just released. Register React components with Zod schemas → AI agent picks the right component and streams props to render it.

## Key Technical Details
- **Zod schemas as tool definitions** — components registered with props schemas that become LLM tool definitions
- **Two component types:**
  - Generative: render once per message (charts, summaries)
  - Interactable: persist and update as users refine (task boards, spreadsheets)
- **Full MCP support** — connect to any MCP server (Linear, Slack, databases)
- **Local tools** — browser-side functions the AI can call (DOM manipulation, authenticated fetches)
- **Streaming infrastructure** — props stream as LLM generates, with cancellation/error recovery
- **Tambo Cloud or self-host** via Docker

## How It Works
```tsx
const components: TamboComponent[] = [{
  name: "Graph",
  description: "Displays data as charts",
  component: Graph,
  propsSchema: z.object({
    data: z.array(z.object({ name: z.string(), value: z.number() })),
    type: z.enum(["line", "bar", "pie"]),
  }),
}];

<TamboProvider apiKey={key} userKey={userId} components={components}>
  <Chat />
</TamboProvider>
```

## Relevance to Us
- **Medium-high relevance**: The generative UI pattern is powerful for building AI-first internal tools
- Could use for XPERIENCE dashboards where users ask questions and get rendered visualizations
- The Zod-schema-as-tool-definition pattern is elegant and reusable
- MCP integration means it could connect to our existing infrastructure

## Considerations
- Requires Tambo Cloud or self-hosted backend
- Still early (v1.0 just released)
- React-only
