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
		lastActionDate: String
		sponsorId: String
	}

	type Subject {
		name: String
	}

	type Person {
		id: String
		name: String
		party: String
		title: String
		firstName: String
		lastName: String
		state: String
		website: String
		twitter: String
		phone: String
	}

	type Query {
		bills: [Bill]
		subject: Subject
		person: Person
		billById(id: String!): Bill
		billsBySubject(subject: String!): [Bill]
		billsCosponsoredBy(sponsorId: String!): [Bill]
		subjects: [Subject]
		peopleHouse: [Person]
		peopleSenate: [Person]
		personById(memberId: String!): Person
	}
`;
