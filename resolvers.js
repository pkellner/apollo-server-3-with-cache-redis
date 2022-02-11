const _ = require('lodash');
const { ForbiddenError } = require('apollo-server');
const warmUpCache = require('./warm-up-cache');

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: (root, args, context) => ({ value: `Leo Hello world at ${new Date()}!` }),
    membership: async (obj, args, context, info) => {
      console.log("resolvers.membership called");
      //info.cacheControl.setCacheHint({ maxAge: 30, scope: 'PUBLIC' });
      if (!context.isAuth) {
        throw new ForbiddenError('membership::forbidden');
      }

      const { membershipId } = context;

      warmUpCache({
        context,
        query: _.get(context, 'req.body.query'),
        membershipId
      });

      const membership = await context.loaders.getMembership.load(membershipId);

      return {
        ...membership,
        members: () => context.loaders.getMembers.load(membershipId)
      };
    }
  },
  Mutation: {
    loginUser: async (obj, args, context) => {
      const { memberId, password } = _.get(args, 'input');

      if (password !== 'mypassword') {
        throw new ForbiddenError('auth::forbidden');
      }
      // real app access_token would come from a data model.
      const authResponseData = {
        access_token:
          memberId +
          ':' +
          Math.random()
            .toString()
            .slice(2, 20),
        expires_in: 1000
      };

      const newContext = {
        ...context,
        isAuth: true,
        membershipId: memberId
      };

      return {
        ...authResponseData,
        membership: () => resolvers.Query.membership(obj, args, newContext)
      };
    }
  }
};

module.exports = resolvers;
