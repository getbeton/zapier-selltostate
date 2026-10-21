'use strict';
// Live tests against the Sell to State API. They run only with STS_API_KEY set:
//   STS_API_KEY=sts_... npm test
// The trigger test also needs STS_TRIGGER=1 (sort=added_desc ships with the API release of 21 Oct 2026).
const test = require('node:test');
const assert = require('node:assert');
const zapier = require('zapier-platform-core');
const App = require('../index');

const appTester = zapier.createAppTester(App);
const apiKey = process.env.STS_API_KEY;
const live = apiKey ? test : test.skip;
const bundle = (inputData) => ({ authData: { apiKey }, inputData });

live('auth test: whoami answers', async () => {
  const me = await appTester(App.authentication.test, bundle({}));
  assert.ok(me.subject, 'whoami returns a subject');
});

live('find_tender: UK tenders that accept bids, nearest deadline first', async () => {
  const rows = await appTester(App.searches.find_tender.operation.perform,
    bundle({ q: 'software', country: 'united-kingdom', accepts_bids: true }));
  assert.ok(rows.length > 0);
  assert.equal(rows[0].id, rows[0].slug);
  assert.ok(rows[0].source_url.startsWith('https://'));
  const deadlines = rows.map((r) => r.deadline_at).filter(Boolean);
  assert.deepEqual(deadlines, [...deadlines].sort());
});

live('find_buyer: profile of a UK hospital trust', async () => {
  const [buyer] = await appTester(App.searches.find_buyer.operation.perform,
    bundle({ name: 'Countess of Chester Hospital', country: 'united-kingdom' }));
  assert.ok(buyer.buyer && buyer.yearly && buyer.suppliers);
});

live('find_supplier: German supplier by name', async () => {
  const [supplier] = await appTester(App.searches.find_supplier.operation.perform,
    bundle({ name: 'Rohde & Schwarz Cybersecurity', country: 'germany' }));
  assert.ok(supplier.supplier && supplier.buyers);
});

(apiKey && process.env.STS_TRIGGER ? test : test.skip)('new_tender: newest rows first, each with an id', async () => {
  const rows = await appTester(App.triggers.new_tender.operation.perform,
    bundle({ q: 'software', country: 'united-kingdom', open_only: true }));
  assert.ok(rows.every((r) => r.id));
});

test('schema: the app passes Zapier schema validation', () => {
  const schemaTools = require('zapier-platform-core/src/tools/schema');
  assert.deepEqual(schemaTools.validateApp(schemaTools.prepareApp(App)), []);
});
