# Sell to State for Zapier

Zapier integration for [Sell to State](https://www.selltostate.com/?utm_source=github&utm_medium=referral&utm_campaign=sts-zapier): government tenders and contract awards from official procurement sources in more than 60 countries.

| Type | Key | What it does |
|---|---|---|
| Trigger | `new_tender` | New tender that matches a text, countries and "open only" (polling, newest rows in Sell to State first) |
| Search | `find_tender` | Tenders by text and country; optional "accepts bids only", nearest deadline first |
| Search | `find_buyer` | A public buyer by name and country, with spend by year, sectors and top suppliers |
| Search | `find_supplier` | A supplier by name and country, with awards by year, sectors and top buyers |
| Action | `save_search` | Saves a tender search in your Sell to State account (turn on email alerts in the app) |

Example Zaps: new UK tenders for "payroll software" to Slack; new open tenders in Germany and Austria to a Google Sheet; a public buyer profile to HubSpot.

## Authentication

API key in the `x-api-key` header. Create a key at [app.selltostate.com/account/keys](https://app.selltostate.com/account/keys?utm_source=github&utm_medium=referral&utm_campaign=sts-zapier). Data needs an active plan. Zapier tests the key with `GET /api/v1/whoami`.

## Develop

```bash
npm install
npm run validate:schema          # Zapier schema check
STS_API_KEY=sts_... npm test     # live tests; add STS_TRIGGER=1 for the trigger
```

Publish with the [Zapier Platform CLI](https://docs.zapier.com/platform/build-cli/overview): `zapier login`, `zapier register "Sell to State"`, `zapier push`, then submit the integration for review in the Zapier developer platform.

## Links

- API docs: [docs.selltostate.com](https://docs.selltostate.com/?utm_source=github&utm_medium=referral&utm_campaign=sts-zapier)
- n8n nodes: [getbeton/n8n-nodes-selltostate](https://github.com/getbeton/n8n-nodes-selltostate)
- Skills and MCP for AI agents: [getbeton/selltostate-skills](https://github.com/getbeton/selltostate-skills)

## License

MIT
