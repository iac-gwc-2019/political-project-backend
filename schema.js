const { gql } = require('apollo-server');

module.exports = gql`
	type Bill {
		longID: String
		id: String
		title: String
		summary: String
		primarySubject: String
		subject: String
		lastActionDescription: String
		sponsorId: String
	}

	type Subject {
		name: String
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
		billById(id: String!): Bill
		billsBySubject(subject: String!): [Bill]
		subjects: [Subject]
		peopleHouse: [Person]
		peopleSenate: [Person]
	}
`;