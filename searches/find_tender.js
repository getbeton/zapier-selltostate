'use strict';

const { countryField, search, tenderItem } = require('../common');

module.exports = {
  key: 'find_tender',
  noun: 'Tender',
  display: {
    label: 'Find Tender',
    description: 'Finds government tenders by text and country. Returns the nearest deadline first when "Accepts Bids Only" is on.',
  },
  operation: {
    inputFields: [
      { key: 'q', label: 'Text', required: true, helpText: 'Words in the tender title.' },
      countryField,
      {
        key: 'accepts_bids',
        label: 'Accepts Bids Only',
        type: 'boolean',
        default: 'false',
        helpText: 'Yes: only open tenders whose bid deadline is in the future.',
      },
    ],
    perform: async (z, bundle) => {
      const acceptsBids = bundle.inputData.accepts_bids === true;
      const hits = await search(z, {
        scope: 'tenders',
        q: bundle.inputData.q,
        country: bundle.inputData.country,
        accepts_bids: acceptsBids ? 'true' : undefined,
        sort: acceptsBids ? 'deadline' : undefined,
        per_page: 25,
      });
      return hits.map(tenderItem);
    },
    sample: require('../triggers/new_tender').operation.sample,
  },
};
