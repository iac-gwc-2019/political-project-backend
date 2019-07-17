// billResolvers.js
import { ApolloServer, gql } from 'apollo-server';
import fetch from 'node-fetch';

const baseURL = `https://api.propublica.org/congress/v1`;

const typeDefs = gql`
{
    enum Party{
		DEMOCRAT
		INDEPENDENT
		REPUBLICAN
    }

    type Bill{
		id: String
		title: String
		summary: String
		primarySubject: String
		lastActionDate: DateTime
		lastActionDescription: String
		sponsor: [Person]
    }

    type Person{
		id: String
		name: String
		party: Party
		state: String
		website: String
		address: [Address]
		phone: String
    }

    type Address{
		street: String
		city: String
		state: String
		zip: String
    }

    type Subject{
		name: String
		bills: [Bill]
    }

    type Query{
		bills: [Bill]
		bills(id: ID): Bill
		subject: [Subject]
		person: [Person]
		person(name: string): Person
	}
}

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})`


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


      //mine

    },
  }

  const server = new ApolloServer({ typeDefs, resolvers });
  server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
