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
<<<<<<< Updated upstream
		primarySubject: String
		lastActionDescription: String
		sponsor: [Person]
=======
		subject: String
		lastActionDescription: String
		lastActionDate: String
		sponsorId: String
	}

	type Subject {
		name: String
>>>>>>> Stashed changes
	}

	type Person {
		id: String
<<<<<<< Updated upstream
		name: String
		party: Party
=======
		title: String
		firstName: String
		lastName: String
		party: String
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
		subject: Subject
		person: Person
=======
		billById(id: String!): Bill
		billsBySubject(subject: String!): [Bill]
		billsCosponsoredBy(sponsorId: String!): [Bill]
		subjects: [Subject]
		peopleHouse: [Person]
		peopleSenate: [Person]
		personById(memberId: String!): Person
>>>>>>> Stashed changes
	}
`;
