'use strict';

const { API_BASE, countryField, search } = require('../common');

module.exports = {
  key: 'find_buyer',
  noun: 'Buyer',
  display: {
    label: 'Find Buyer',
    description: 'Finds a buyer by name and country and returns its public-procurement profile.',
  },
  operation: {
    inputFields: [
      { key: 'name', label: 'Name', required: true, helpText: 'The buyer name, or a part of it.' },
      { ...countryField, required: true, helpText: 'Country slug, for example `united-kingdom`.' },
    ],
    perform: async (z, bundle) => {
      const hits = await search(z, {
        scope: 'buyers',
        q: bundle.inputData.name,
        country: bundle.inputData.country,
        per_page: 1,
      });
      if (!hits.length) return [];
      const hit = hits[0];
      const response = await z.request({
        url: `${API_BASE}/buyers/${encodeURIComponent(hit.slug)}`,
        params: { country: hit.country || bundle.inputData.country },
      });
      return [{ id: hit.slug, slug: hit.slug, name: hit.title, country: hit.country, ...response.data }];
    },
    sample: { id: 'example-buyer', slug: 'example-buyer', name: 'Example Buyer', country: 'united-kingdom' },
  },
};
