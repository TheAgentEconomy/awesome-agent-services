# Contributing to Awesome Agent Services

Your contributions are welcome and encouraged! No matter how big or tiny, fixing that single character face palm push, adding a new service, or suggesting a clearer category, your help is deeply appreciated.

## Quick Rule

Add one bullet under the most relevant category.

```markdown
- [Name](URL) - One factual sentence. Tags: MCP, x402, API, Paid, OSS.
```

That is it.

## How To Contribute

1. **Fork the repository.**

2. **Create a branch.**

   ```bash
   git checkout -b add-example-service
   ```

3. **Edit `README.md`.**

   Add one service under the most relevant category.

4. **Check the format.**

   Each listing should include:

   - The service name linked to a public URL.
   - One factual sentence explaining what it does.
   - Tags at the end.

5. **Commit your change.**

   ```bash
   git commit -m "Add Example Service"
   ```

6. **Open a pull request.**

   Keep the PR focused on one service.

## What Belongs Here

Good fits:

- x402 services.
- MCP servers.
- Agent-facing APIs.
- Data feeds used by agents.
- Business intelligence services.
- Finance and signal services.
- Travel, media, commerce, payment, and developer tools for agents.

Not a fit yet:

- General SaaS tools with no agent-facing interface.
- Private services with no public documentation.
- Unreleased projects with no usable link.
- Long-form marketing copy.
- Ranking, crawler, monetization, or analytics proposals.

## Tags

Use any that apply:

- `MCP` - Model Context Protocol server or connector
- `x402` - Supports or relates to x402 payments
- `API` - Agent-callable HTTP API or hosted endpoint
- `Paid` - Requires payment, credits, or usage fees
- `OSS` - Open source repository available

Suggest a new tag only when the existing tags are clearly insufficient.

## Guidelines

- Submit one service per pull request.
- Place the bullet in the most relevant category.
- Keep the description to one factual sentence.
- Avoid hype, unverifiable claims, and marketing language.
- Use stable public links.
- Do not include secrets, tokens, private keys, invite-only links, or private customer data.
- Maintain alphabetical order within a category when practical.

## Examples

```markdown
- [Kronos Signals](https://x402.coinopai.com) - Agent-payable crypto market signals via x402. Tags: API, x402, Paid.
- [Travel Assistant MCP](https://github.com/forgemeshlabs/travel-mcp) - MCP server for flight search and travel workflows. Tags: MCP, OSS.
```

Thank you for helping map the agent economy.
