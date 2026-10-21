'use strict';

const API_BASE = 'https://app.selltostate.com/api/v1';

const countryField = {
  key: 'country',
  label: 'Country',
  helpText:
    'Country slug, or slugs separated by commas, for example `united-kingdom,ireland`. Leave empty for all countries. [See the countries](https://www.selltostate.com/countries/).',
};

/** GET /search and return the hits. Empty values are left out. */
const search = async (z, params) => {
  const query = {};
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') query[key] = String(value);
  }
  const response = await z.request({ url: `${API_BASE}/search`, params: query });
  return response.data.hits || [];
};

/** A tender hit with an `id` (Zapier dedupes polling results by `id`). */
const tenderItem = (hit) => ({ id: hit.slug, ...hit, buyer: (hit.sub || '').split(' · ')[0] });

module.exports = { API_BASE, countryField, search, tenderItem };
