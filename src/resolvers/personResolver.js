import { API_KEY, BASE_URL } from '../constants';
const fetch = require('node-fetch');

function mapPerson(person){
  const values = {
    short_title: person.short_title,
    title: person.title,
    first_name: person.first_name,
    last_name: person.last_name,
    party: person.party,
    state: person.state,
    website: person.url,
    phone: person.phone,
    twitter_account: person.twitter_account,
    id: person.id,
  }
  return values;
}

function mapPersonId(person){
  const values = {
    short_title: person.roles[0].title,
    title: person.title,
    first_name: person.first_name,
    last_name: person.last_name,
    party: person.current_party,
    state: person.roles[0].state,
    website: person.url,
    phone: person.roles[0].phone,
    twitter_account: person.twitter_account,
    id: person.member_id,
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
    },

// TODO: getPerson -> summary??
    personById: (obj, args, context, info) => {
      return fetch(`${BASE_URL}/members/${args.memberId}`, {
        method: 'GET', 
        headers: {'X-API-KEY': API_KEY}
      }).then((res) => {
        return res.json()
      }).then((response) => {
        const unpacked = response.results;
        const newPersonArr = unpacked.map(mapPersonId);
        return newPersonArr[0];
      })
    }
  }
}

module.exports = {personResolver};