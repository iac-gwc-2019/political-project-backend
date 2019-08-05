import { API_KEY, BASE_URL } from '../constants';
const fetch = require('node-fetch');

<<<<<<< Updated upstream
=======
function mapPerson(person){
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

function mapPersonId(person){
  const values = {
    id: person.member_id,
    title: person.short_title,
    firstName: person.first_name,
    lastName: person.last_name,
    party: person.party,
    state: person.state,
    website: person.url,
    twitter: person.twitter_account,
    phone: person.phone
  }
  return values;
}

>>>>>>> Stashed changes
const personResolver = {
  Query: {
    person: () => {
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
        
        const examplePersonData = {
          id: 2334,
          name: 'person name',
          party: 'DEMOCRAT',
          state: 'NY',
          website: 'asdfasd',
          address: 'asdfas',
          phone: 'asdfasf'
        }
        return examplePersonData;
      })
    },
    personById: (obj, args, context, info) => {
      return fetch(`${BASE_URL}/members/${args.memberId}`, {
        method: 'GET', 
        headers: {'X-API-KEY': API_KEY}
      }).then((res) => {
        return res.json()
      }).then((response) => {
        const unpacked = response.results;
        console.log(unpacked);
        const newPersonArr = unpacked.map(mapPersonId);
        console.log(newPersonArr);
        return newPersonArr;
      })
    }
  }
}

module.exports = {personResolver};