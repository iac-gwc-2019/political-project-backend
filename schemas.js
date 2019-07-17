// schemas.js
const { gql } = require('apollo-server-express');

module.exports = gql`
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
	subject(query: String): [Subject]
  feed(filter: String): [Link!]!
    }
}

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
