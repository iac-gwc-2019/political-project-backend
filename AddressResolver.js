const resolvers = {
  Query: {
    Address(parent, args, context, info) {
      return find(address, { id: args.id });
    },
  },
  Address: {
    Subject(address) {
      return filter(subject, { address: street, city, state, zip });
    },
  },
};


// example resolver
//const resolvers = {
//   Query: {
//     posts: () => posts,
//     author: (_, { id }) => find(authors, { id: id }),
//   },
//
//   Author: {
//     posts: (author) => filter(posts, { authorId: author.id }),
//   },
//   Post: {
//     author: (post) => find(authors, { id: post.authorId }),
//   },
// };
