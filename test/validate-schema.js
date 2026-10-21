'use strict';
// Validates the app with Zapier's own schema, the same step as the local part of `zapier validate`.
const schemaTools = require('zapier-platform-core/src/tools/schema');
const app = require('../index');
const errors = schemaTools.validateApp(schemaTools.prepareApp(app));
if (errors.length) {
  for (const e of errors) console.error(e.property, e.message);
  process.exit(1);
}
console.log('schema ok');
