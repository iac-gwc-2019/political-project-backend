// const express = require("express");
const { ApolloServer } = require("apollo-server");
const { billResolver } = require("./lib/resolvers/billResolver");
const { subjectResolver } = require("./lib/resolvers/subjectResolver");
const { personResolver } = require("./lib/resolvers/personResolver");
const typeDefs = require("./schema");

const resolvers = {
  Query: {
    ...billResolver.Query,
    ...personResolver.Query,
    ...subjectResolver.Query
  }
};

// const app = express();
const server = new ApolloServer({
  // These will be defined for both new or existing servers
  typeDefs,
  resolvers
});

const port = process.env.PORT || 4000;
server.listen({ port }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
