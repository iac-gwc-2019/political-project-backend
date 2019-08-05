import { API_KEY, BASE_URL } from '../constants';
const fetch = require('node-fetch');

<<<<<<< Updated upstream
=======
function mapBill(bill){
  const values = {
    longID: bill.bill_id,
    id: bill.bill_slug,
    title: bill.title,
    summary: bill.summary,
    subject: bill.primary_subject,
    latestActionDescription: bill.latest_major_action,
    latestActionDate: bill.latest_major_action_date,
    sponsorId: bill.sponsor_id
  }
  return values;
}

>>>>>>> Stashed changes
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
    },
    // broken rn, figuring that out tonight
    billsCosponsoredBy: (obj, args, context, info) => {
      return fetch(`${BASE_URL}/members/${args.sponsorId}/bills/cosponsored`, {
        method: 'GET', 
        headers: {'X-API-KEY': API_KEY}
      }).then((res) => {
        return res.json()
      }).then((response) => {
        const unpacked = response.results;
        const newBillsArr = unpacked[0].bills.map(mapBill);
        return newBillsArr;
      })
    }
  }
}

module.exports = {billResolver};