import { API_KEY, BASE_URL } from '../constants';
const fetch = require('node-fetch');

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
    }
  }
}

module.exports = {personResolver};