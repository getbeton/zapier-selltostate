'use strict';

const authentication = require('./authentication');
const newTender = require('./triggers/new_tender');
const findTender = require('./searches/find_tender');
const findBuyer = require('./searches/find_buyer');
const findSupplier = require('./searches/find_supplier');
const saveSearch = require('./creates/save_search');

const addApiKey = (request, z, bundle) => {
  if (bundle.authData.apiKey) {
    request.headers = request.headers || {};
    request.headers['x-api-key'] = bundle.authData.apiKey;
  }
  return request;
};

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication,
  beforeRequest: [addApiKey],
  triggers: { [newTender.key]: newTender },
  searches: {
    [findTender.key]: findTender,
    [findBuyer.key]: findBuyer,
    [findSupplier.key]: findSupplier,
  },
  creates: { [saveSearch.key]: saveSearch },
};
