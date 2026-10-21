'use strict';

const { API_BASE } = require('./common');

module.exports = {
  type: 'custom',
  fields: [
    {
      key: 'apiKey',
      label: 'API Key',
      required: true,
      type: 'password',
      helpText:
        'Create a key at [app.selltostate.com/account/keys](https://app.selltostate.com/account/keys). Data needs an active Sell to State plan.',
    },
  ],
  test: { url: `${API_BASE}/whoami` },
  connectionLabel: '{{subject}}',
};
