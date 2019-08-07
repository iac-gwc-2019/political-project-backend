const { gql } = require('apollo-server-express');

module.exports = gql`
	type Bill {
		bill_name: String
		primary_subject: String
		bill_id: String
		summary: String
		summary_short: String
		latest_major_action_date: String
		latest_major_action: String
		billSlug: String
		sponsorId: String
	}

	type Subject {
		subject_name: String
	}

	type Person {
		short_title: String
		title: String
		first_name: String
		last_name: String
		party: String
		state: String
		website: String
		phone: String
		twitter_account: String
		id: String
	}

	type Query {
		bills: [Bill]
		subject: Subject
		person: Person
		billById(id: String!): Bill
		billsBySubject(primary_subject: String!): [Bill]
		billsCosponsoredBy(sponsorId: String!): [Bill]
		subjects: [Subject]
		peopleHouse: [Person]
		peopleSenate: [Person]
		personById(memberId: String!): Person
	}
`;
