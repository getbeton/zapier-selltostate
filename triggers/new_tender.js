'use strict';

const { countryField, search, tenderItem } = require('../common');

const perform = async (z, bundle) => {
  const hits = await search(z, {
    scope: 'tenders',
    q: bundle.inputData.q,
    country: bundle.inputData.country,
    lifecycle: bundle.inputData.open_only === false ? undefined : 'open',
    sort: 'added_desc',
    per_page: 50,
  });
  return hits.map(tenderItem);
};

module.exports = {
  key: 'new_tender',
  noun: 'Tender',
  display: {
    label: 'New Tender',
    description: 'Triggers when Sell to State adds a government tender that matches your search.',
  },
  operation: {
    type: 'polling',
    perform,
    inputFields: [
      {
        key: 'q',
        label: 'Text',
        helpText: 'Words in the tender title, for example `payroll software`. Leave empty to match every tender.',
      },
      countryField,
      {
        key: 'open_only',
        label: 'Open Tenders Only',
        type: 'boolean',
        default: 'true',
        helpText: 'Yes: only tenders with the lifecycle open.',
      },
    ],
    sample: {
      id: '103693089',
      slug: '103693089',
      title: 'CA18471 - Lionheart Educational Trust - HR & Payroll Software and Managed Payroll Services',
      kind: 'tender',
      sub: 'Lionheart Educational Trust · —',
      buyer: 'Lionheart Educational Trust',
      country: 'united-kingdom',
      year: 2026,
      lifecycle: 'open',
      deadline_at: '2026-10-26T10:00:00.000Z',
      accepts_bids: true,
      source_url: 'https://www.contractsfinder.service.gov.uk/Notice/25ca0d93-b1f4-420e-8355-c4882a6ffc35',
    },
    outputFields: [
      { key: 'id', label: 'Tender ID' },
      { key: 'title', label: 'Title' },
      { key: 'buyer', label: 'Buyer' },
      { key: 'country', label: 'Country' },
      { key: 'lifecycle', label: 'Lifecycle' },
      { key: 'deadline_at', label: 'Deadline', type: 'datetime' },
      { key: 'amount', label: 'Amount', type: 'number' },
      { key: 'source_url', label: 'Official Notice URL' },
    ],
  },
};
