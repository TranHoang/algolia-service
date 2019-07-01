const algoliasearch = require('algoliasearch');
const dotenv = require('dotenv');
dotenv.config();
const client = algoliasearch('K0HE7D0AWF', process.env.API_KEY);
const index = client.initIndex('dev_ALGOLIA');

const contactsJSON = require('./contacts.json');

module.exports.uploadContacts = function() {
  index.addObjects(contactsJSON, (err, content) => {
    if (err) {
      console.error(err);
    } else {
      console.log("The contacts.json is uploaded to dev_ALGOLIA indices.")
    }
  });
};

module.exports.searchSettings = function() {
  index.setSettings({
    'searchableAttributes': [
      'lastname',
      'firstname',
      'company',
      'email',
      'city',
      'address'
    ]
  }, (err, content) => {
    console.log(content);
  });
}

module.exports.search = function() {
  // Search for a first name
  index.search('jimmie', (err, { hits } = {}) => {
    console.log(hits);
  });

  // Search for a first name with typo
  index.search('jimie', (err, { hits } = {}) => {
    console.log(hits);
  });

  // Search for a company
  index.search('california paint', (err, { hits } = {}) => {
    console.log(hits);
  });

  // Search for a first name and a company
  index.search('jimmie paint', (err, { hits } = {}) => {
    console.log(hits);
  });
};