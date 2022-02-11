const _ = require('lodash');

const isPresentInQuery = _.includes;

const warmUpCache = ({ context, query }) => {
  // This code can easily be extracted to work with any parent resolver.
  if (isPresentInQuery(query, 'members {')) {
    console.info('>>> warming up cache...');
    context.loaders.getMembers.load(context.membershipId);
  }
};

module.exports = warmUpCache;
