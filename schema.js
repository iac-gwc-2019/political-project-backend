const { gql } = require('apollo-server');

module.exports = gql`
	enum Party {
		DEMOCRAT
		INDEPENDENT
		REPUBLICAN
	}

	type Bill {
		id: String
		title: String
		summary: String
		primarySubject: String
		lastActionDescription: String
		sponsor: [Person]
	}

	type Person {
		id: String
		name: String
		party: Party
		state: String
		website: String
		address: [Address]
		phone: String
	}

	type Address {
		street: String
		city: String
		state: String
		zip: String
	}

	type Subject {
		name: String
		bills: [Bill]
	}

	type Query {
		bills: [Bill]
		subject: Subject
		person: Person
	}
`;
