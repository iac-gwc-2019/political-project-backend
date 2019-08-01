const { gql } = require('apollo-server');

console.log('in this schema!');

module.exports = gql`
	type Bill {
		id: String
		title: String
		summary: String
		primarySubject: String
		subjects: String
		lastActionDescription: String
		sponsor: [Person]
	}

	type Person {
		id: String
		title: String
		party: String
		state: String
		website: String
		twitter: String
		phone: String
	}

	type Query {
		bills: [Bill]
		bill: Bill
		subjects: [Bill]
		peopleHouse: [Person]
		peopleSenate: [Person]
	}
`;
