// billResolvers.js
import { ApolloServer } from 'apollo-server';
import fetch from 'node-fetch';

const baseURL = `https://api.propublica.org/congress/v1`;

const resolvers = {
    Query: {
      bills: () => {
        return fetch(`${baseURL}/bills`, {
          method: 'GET',
          headers: { 'X-API-Key': 'znFZ0KfsuDMSbgsmlSTlj8dqZK5Svr2hP1Ytoq6h' },
        })
        .then(res => res.json())
      },
      bills: (parent, args) => {
        const { id } = args;
        return fetch(`${baseURL}/bills/${id}`), {
          method: 'GET',
          headers: { 'X-API-Key': 'znFZ0KfsuDMSbgsmlSTlj8dqZK5Svr2hP1Ytoq6h' },
        }
        .then(res => res.json())
      },
      bills: () => {
        return fetch(`${baseURL}/bills/subjects/${subject}`), {
          method: 'GET',
          headers: { 'X-API-Key': 'znFZ0KfsuDMSbgsmlSTlj8dqZK5Svr2hP1Ytoq6h' },
        }
        .then(res => res.json())
      },
      // person separated into house and senate
      person: () => {
        return fetch(`${baseURL}/115/senate/members`), {
          method: 'GET',
          headers: { 'X-API-Key': 'znFZ0KfsuDMSbgsmlSTlj8dqZK5Svr2hP1Ytoq6h' },
        }
        .then(res => res.json())
      },
      person: () => {
        return fetch(`${baseURL}/115/house/members`), {
          method: 'GET',
          headers: { 'X-API-Key': 'znFZ0KfsuDMSbgsmlSTlj8dqZK5Svr2hP1Ytoq6h' },
        }
        .then(res => res.json())
      },
      person: (parent, args) => {
        const { id } = args
        return fetch(`${baseURL}/members/${id}`), {
          method: 'GET',
          headers: { 'X-API-Key': 'znFZ0KfsuDMSbgsmlSTlj8dqZK5Svr2hP1Ytoq6h' },
        }
        .then(res => res.json())
      },

    },
  }

  const server = new ApolloServer({
    typeDefs: './schema.graphql',
    resolvers 
  })

  server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });

  //server.start(() => console.log(`Server is running on http://localhost:4000`)) ?