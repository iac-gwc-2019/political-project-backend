var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
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


}

enum LinkOrderByInput {
  fullName_ASC
  fullName_DESC
  party_ASC
  party_DESC
  state_ASC
  state_DESC
}

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
}
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
