const { ApolloServer } = require('apollo-server');
const { billResolver } = require('./lib/resolvers/billResolver');
const { subjectResolver } = require('./lib/resolvers/subjectResolver');
const { personResolver } = require('./lib/resolvers/personResolver');
const typeDefs = require('./schema');

const resolvers = {
  Query: {
    ...billResolver.Query,
    ...personResolver.Query,
    ...subjectResolver.Query
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});