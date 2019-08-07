const fs = require('fs');
const https = require('https');
const http = require('http');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { billResolver } = require('./lib/resolvers/billResolver');
const { subjectResolver } = require('./lib/resolvers/subjectResolver');
const { personResolver } = require('./lib/resolvers/personResolver');
const typeDefs = require('./schema');

const configurations = {
  // Note: You may need sudo to run on port 443
  production: { ssl: true, port: 443, hostname: 'politigo-backend.netlify.com' },
  development: { ssl: false, port: 4000, hostname: 'localhost' }
}

const environment = process.env.NODE_ENV || 'production'
console.log(environment, ' ', process.env.NODE_ENV);
const config = configurations[environment]

const resolvers = {
  Query: {
    ...billResolver.Query,
    ...personResolver.Query,
    ...subjectResolver.Query
  }
};

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
})

const app = express()
apollo.applyMiddleware({ app })

var server
if (config.ssl) {
  // Assumes certificates are in .ssl folder from package root. Make sure the files
  // are secured.
  server = https.createServer(
    {},
    app
  )
} else {
  server = http.createServer(app)
}

// Add subscription support
apollo.installSubscriptionHandlers(server)

server.listen({ port: config.port }, () =>
  console.log(
    '🚀 Server ready at',
    `http${config.ssl ? 's' : ''}://${config.hostname}:${config.port}${apollo.graphqlPath}`
  )
);