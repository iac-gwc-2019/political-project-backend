const { ApolloServer, gql } = require('apollo-server');
const fetch = require('node-fetch');
const apiKey = 'znFZ0KfsuDMSbgsmlSTlj8dqZK5Svr2hP1Ytoq6h'
const baseURL = `https://api.propublica.org/congress/v1/`; 

const typeDefs = gql`
  type Bill {
    bill_id: String
    title: String
    summary: String
    subject: String
    latest_major_action: String
  }

  type Query {
    bills: [Bill]
    bill: Bill
  }
`;

const resolvers = {
  Query: {
    bills: () => {
      // const item1 = {                           <------ for testing - define single data item
      //   bill_id: 12313,                         <------ for testing
      //   title: 'sdfsdf',                        <------ for testing
      //   summary: 'sdfsdf',                      <------ for testing
      //   subject: 'sdfsdf',                      <------ for testing
      //   latest_major_action: 'sdfsfs',          <------ for testing
      // };                                        <------ for testing
      // return [item1];                           <------ for testing - return this item in an array because this is the 'bills'
      return fetch(`${baseURL}/bills/search.json?query= `, {
        method: 'GET', 
        headers: {'X-API-KEY': apiKey}
      }).then((res) => {
        return res.json()
      }).then((response) => {
        const unpacked = response.results;
        const bill1 = unpacked[0].bills[0];
        const bill1Transformed = {
          bill_id: bill1.bill_id,
          title: bill1.title,
          summary: bill1.summary,
          subject: bill1.subject,
          latest_major_action: bill1.latest_major_action
        }
        return [bill1Transformed];
      })
    },

    bill: () => {
      const item1 = {                        //   <------ for testing - define single data item
        bill_id: 12313,                      //   <------ for testing
        title: 'sdfsdf',                     //   <------ for testing
        summary: 'sdfsdf',                   //   <------ for testing
        subject: 'sdfsdf',                   //   <------ for testing
        latest_major_action: 'sdfsfs',       //   <------ for testing
      };                                     //   <------ for testing
      return item1;                          //   <------ for testing - return this single item because this is for looking up 1 bill at a time
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});