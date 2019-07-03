const resolvers = {
  Query: {
    Bill(parent, args, context, info) {
      return find(bill, { id: args.id });
    },
  },
  Bill: {
    Subject(bill) {
      return filter(subject, { bill: id, title, summary, primarySubject, lastActionDate, lastActionDescription, sponsor });
    },
  },
};
