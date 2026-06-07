# Contributing

Thanks for helping build Awesome Agent Services.

This directory is focused on services, APIs, MCP servers, and x402 infrastructure used by AI agents. Keep submissions practical, verifiable, and easy to review.

## What Belongs Here

Good fits:

- x402-payable services and APIs.
- MCP servers used by AI agents.
- Agent-facing APIs.
- Data feeds and business intelligence services.
- Commerce, payment, signal, travel, media, and developer infrastructure used by agents.

Not a fit yet:

- General SaaS tools with no agent-facing interface.
- Private services with no public documentation.
- Unreleased projects with no repository, website, or usable endpoint.
- Ranking, monetization, or analytics proposals. This repository is directory-first.

## Submission Rules

- Submit one service per pull request.
- Add one JSON file under the most appropriate directory:
  - `services/x402/`
  - `services/mcp/`
  - `services/apis/`
- Use lowercase kebab-case filenames, for example `example-service.json`.
- Follow `service-schema.json`.
- Keep descriptions factual and concise.
- Include public links that reviewers can inspect.
- Do not include secrets, private keys, tokens, invite-only URLs, or private endpoint details.

## Local Validation

Run:

```bash
node scripts/validate-services.js
```

The GitHub Action runs the same validation on pull requests.

## Review Expectations

Maintainers may ask for:

- Better categorization.
- More neutral wording.
- Public documentation.
- A working MCP, API, or x402 discovery URL.
- Removal of unverifiable claims.

## Updating Existing Listings

Open a pull request that changes only the affected service JSON and README line, if applicable. Keep the diff small.
