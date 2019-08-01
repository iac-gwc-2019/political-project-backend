import { API_KEY, BASE_URL } from '../constants';
const fetch = require('node-fetch');

function mapSubject(subject){
  const values = {
    id: person.id,
    title: person.short_title,
    party: person.party,
    state: person.state,
    website: person.url,
    twitter: person.twitter_account,
    phone: person.phone
  }
  return values;
}

const subjectResolver = {
  Query: {
    subject: () => {
      // 1. make api call
      // 2. format data to match schema
      // 3. return data

      return fetch(`${BASE_URL}/bills/search.json?query= `, {
        method: 'GET', 
        headers: {'X-API-KEY': API_KEY}
      }).then((res) => {
        return res.json()
      }).then((response) => {
        const unpacked = response.results;
        
        const exampleSubjectData = {
          name: 'subject name',
          bills: [
            {
              id: 123,
              title: 'bill title',
              summary: 'bill summary',
              primarySubject: 'primary subject',
              lastActionDescription: 'last',
              sponsor: [
                {
                  id: 234,
                  name: 'person name',
                  party: 'DEMOCRAT',
                  state: 'NY',
                  website: 'asdfasd',
                  address: 'asdfas',
                  phone: 'asdfasf'
                }
              ]
            }
          ]
        };
        return exampleSubjectData;
      })
    }
  }
}

module.exports = {subjectResolver};