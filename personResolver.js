const resolvers = {
  Query: {
    Person(parent, args, context, info) {
      return find(person, { id: args.id });
    },
  },
  Person: {
    Bill() {
      return filter(person, { person: id, name, party, state, website, address, phone });
    },
  },
};
