const { gql } = require("apollo-server");

const typeDefs = gql`
  ####### Model types #######
  
  directive @cacheControl(
      maxAge: Int,
      scope: CacheControlScope
  ) on OBJECT | FIELD | FIELD_DEFINITION

  enum CacheControlScope {
      PUBLIC
      PRIVATE
  }
  
  
  type Product {
    id: ID!
    name: String!
  }

  type Member @cacheControl(maxAge: 15) {
    memberId: ID!
    firstName: String!
    lastName: String!
    relationship: String
    dateOfBirth: String
  }

  type Membership {
    id: ID!
    firstName: String!
    lastName: String!
    state: String
    members: [Member]
  }

  type AuthPayLoad {
    access_token: String
    expires_in: Int
    membership: Membership # Note: This is where clients can request data for Home page
  }

  type HelloResponse @cacheControl(maxAge: 25) {
    value: String
  }

  ####### END Model types #######

  ####### Input types #######
  input UserLoginInput {
    memberId: String
    password: String
  }
  ####### END Input types #######

  type Query {
    hello: HelloResponse
    membership: Membership @cacheControl(maxAge: 120)
  }

  type Mutation {
    loginUser(input: UserLoginInput): AuthPayLoad!
  }
`;

module.exports = typeDefs;
