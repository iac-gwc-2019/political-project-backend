# schemas.js

const typeDefs = gql`
{
    type Bill{
	id: String!
	title: String!
	summary: String!
	primarySubject: String!
	lastActionDate: DateTime
	lastActionDescription: String
	sponsor: [Person]
    }

    type Person{
	id: String
	name: String
	party: Party
	state: String
	website: [Address]
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
	
    }
}