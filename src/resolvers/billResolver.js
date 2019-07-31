import { API_KEY, BASE_URL } from '../constants';
const fetch = require('node-fetch');

const billResolver = {
  Query: {
    bills: () => {
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
        const bill1 = unpacked[0].bills[0];
        const bill1Transformed = {
          id: bill1.bill_id,
          title: bill1.title,
          summary: bill1.summary,
          primarySubject: bill1.subject,
          lastActionDescription: bill1.latest_major_action
        }
        return [bill1Transformed];
      })
    }
  }
}

module.exports = {billResolver};