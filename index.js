// index.js
const { GraphQLServer } = require('graphql-yoga')
const fetch = require('node-fetch')

const baseURL = `https://api.propublica.org/congress/v1`

const resolvers = {
    Query: {
      bills: () => {
        return fetch(`${baseURL}/bills`, {
          method: 'GET',
          headers: { 'X-API-Key': 'znFZ0KfsuDMSbgsmlSTlj8dqZK5Svr2hP1Ytoq6h' },
        })
        .then(res => res.json())
      },
      bill: (parent, args) => {
        const { id } = args;
        return fetch(`${baseURL}/bills/${id}`, {
          method: 'GET',
          headers: { 'X-API-Key': 'znFZ0KfsuDMSbgsmlSTlj8dqZK5Svr2hP1Ytoq6h' },
        })
        .then(res => res.json())
      },
      billsBySubject: () => {
        return fetch(`${baseURL}/bills/subjects/${subject}`, {
          method: 'GET',
          headers: { 'X-API-Key': 'znFZ0KfsuDMSbgsmlSTlj8dqZK5Svr2hP1Ytoq6h' },
        })
        .then(res => res.json())
      },
      // person separated into house and senate
      personSenate: () => {
        return fetch(`${baseURL}/115/senate/members`, {
          method: 'GET',
          headers: { 'X-API-Key': 'znFZ0KfsuDMSbgsmlSTlj8dqZK5Svr2hP1Ytoq6h' },
        })
      .then(res => res.json())
      },
      personHouse: () => {
        return fetch(`${baseURL}/115/house/members`, {
          method: 'GET',
          headers: { 'X-API-Key': 'znFZ0KfsuDMSbgsmlSTlj8dqZK5Svr2hP1Ytoq6h' },
        })
      .then(res => res.json())
      },
      person: (parent, args) => {
        const { id } = args
        return fetch(`${baseURL}/members/${id}`, {
          method: 'GET',
          headers: { 'X-API-Key': 'znFZ0KfsuDMSbgsmlSTlj8dqZK5Svr2hP1Ytoq6h' },
        })
        .then(res => res.json())
      },

    },
  }

  const server = new GraphQLServer({
    typeDefs: './schema.graphql',
    resolvers,
  })

  server.start(() => console.log(`Server is running on http://localhost:4000`))
