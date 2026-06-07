# Awesome Agent Services

A curated index of services, APIs, MCP servers, and x402 infrastructure powering AI agents.

Part of The Agent Economy.

## Contents

- [Categories](#categories)
- [Listings](#listings)
- [Contributing](#contributing)
- [Service Schema](#service-schema)

## Categories

- x402 Services
- MCP Servers
- Agent APIs
- Data Feeds
- Business Intelligence
- Finance & Signals
- Travel
- Image & Media
- Commerce & Payments
- Developer Tools

## Listings

### x402 Services

- [Kronos](services/x402/kronos.json) - x402-powered market intelligence and crypto signal service for AI agents.
- [DisruptionIntel](services/x402/disruptionintel.json) - Commercial disruption intelligence API for workforce, company, territory, and economic signal workflows.
- [x402](services/x402/x402.json) - Open payment protocol for HTTP APIs and agent-payable services.

### MCP Servers

- [CoinOpAI MCP](services/mcp/coinopai-mcp.json) - Local MCP server for x402-powered paid crypto intelligence and agent automation search.
- [ImageGen MCP](services/mcp/imagegen-mcp.json) - MCP server for AI image generation, background removal, HD upscale, and pro image workflows.
- [Travel Assistant MCP](services/mcp/travel-assistant-mcp.json) - MCP server for airport lookup, route comparison, timing guidance, and external booking links.
- [Glama](services/mcp/glama.json) - MCP server directory and discovery surface for the Model Context Protocol ecosystem.

### Agent APIs

This section is ready for API-first services used directly by agents.

### Data Feeds

This section is ready for market, web, business, and operational data feeds.

### Business Intelligence

This section is ready for company, market, commercial, and operational intelligence services.

### Finance & Signals

This section is ready for financial data, signal, risk, and decision support services.

### Travel

This section is ready for travel planning, fare intelligence, route search, and booking workflow services.

### Image & Media

This section is ready for image generation, media processing, video, audio, and creative agent tools.

### Commerce & Payments

This section is ready for checkout, micropayment, settlement, affiliate, and payment infrastructure services.

### Developer Tools

This section is ready for developer-facing services, SDKs, testing tools, observability, and agent infrastructure.

## Contributing

Additions and updates are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

Each service entry must:

- Live under `services/x402/`, `services/mcp/`, or `services/apis/`.
- Be valid JSON.
- Follow [service-schema.json](service-schema.json).
- Represent one service per pull request.
- Include stable public URLs.

## Service Schema

The canonical entry format is documented in [service-schema.json](service-schema.json). Pull requests are checked by GitHub Actions using `scripts/validate-services.js`.

Run validation locally:

```bash
node scripts/validate-services.js
```
