'use strict';

const { API_BASE, countryField } = require('../common');

module.exports = {
  key: 'save_search',
  noun: 'Saved Search',
  display: {
    label: 'Save Tender Search',
    description: 'Saves a tender search in your Sell to State account. Turn on email alerts for it in the app.',
  },
  operation: {
    inputFields: [
      { key: 'name', label: 'Name', required: true },
      { key: 'q', label: 'Text', required: true, helpText: 'Words in the tender title.' },
      countryField,
      { key: 'open_only', label: 'Open Tenders Only', type: 'boolean', default: 'true' },
    ],
    perform: async (z, bundle) => {
      const query = { scope: 'tenders', q: bundle.inputData.q };
      if (bundle.inputData.country) query.country = bundle.inputData.country;
      if (bundle.inputData.open_only !== false) query.lifecycle = 'open';
      const response = await z.request({
        url: `${API_BASE}/saved-searches`,
        method: 'POST',
        body: { name: bundle.inputData.name, kind: 'atlas', query },
      });
      return response.data;
    },
    sample: { id: '1', name: 'UK payroll software', kind: 'atlas' },
  },
};
