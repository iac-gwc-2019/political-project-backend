import { API_KEY, BASE_URL } from '../constants';
const fetch = require('node-fetch');

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

const personResolver = {
  Query: {
    peopleHouse: () => {
      return fetch(`${BASE_URL}/115/house/members`, {
        method: 'GET', 
        headers: {'X-API-KEY': API_KEY}
      }).then((res) => {
        return res.json()
      }).then((response) => {
        const unpacked = response.results;
        const newPersonHouseArr = unpacked[0].members.map(mapPerson);
        return newPersonHouseArr;
      })
    },
    peopleSenate: () => {
      return fetch(`${BASE_URL}/115/senate/members`, {
        method: 'GET', 
        headers: {'X-API-KEY': API_KEY}
      }).then((res) => {
        return res.json()
      }).then((response) => {
        const unpacked = response.results;
        const newPersonSenateArr = unpacked[0].members.map(mapPerson);
        return newPersonSenateArr;
      })
    }
  }
}

module.exports = {personResolver};