import { API_KEY, BASE_URL } from '../constants';
const fetch = require('node-fetch');

function mapBill(bill){
  const values = {
    longID: bill.bill_id,
    id: bill.bill_slug,
    title: bill.title,
    summary: bill.summary,
    subject: bill.primary_subject,
    latestActionDescription: bill.latest_major_action,
    latestActionDate: bill.latest_major_action_date,
    sponsor_id: bill.sponsor_id
  }
  return values;
}

const billResolver = {
  Query: {
    bills: () => {
      return fetch(`${BASE_URL}/bills/search.json?query= `, {
        method: 'GET', 
        headers: {'X-API-KEY': API_KEY}
      }).then((res) => {
        return res.json()
      }).then((response) => {
        const unpacked = response.results;
        const newBillsArr = unpacked[0].bills.map(mapBill);
        return newBillsArr;
      })
    },
    billById: (obj, args, context, info) => {
      return fetch(`${BASE_URL}/115/bills/${args.id}`, {
        method: 'GET', 
        headers: {'X-API-KEY': API_KEY}
      }).then((res) => {
        return res.json()
      }).then((response) => {
        const unpacked = response.results;
        const newBillArr = unpacked.map(mapBill);
        return newBillArr[0];
      })
    },
    billsBySubject: (obj, args, context, info) => {
      return fetch(`${BASE_URL}/bills/subjects/${args.subject}`, {
        method: 'GET', 
        headers: {'X-API-KEY': API_KEY}
      }).then((res) => {
        return res.json()
      }).then((response) => {
        const unpacked = response.results;
        const newBillsArr = unpacked.map(mapBill);
        return newBillsArr;
      })
    }
  }
}

module.exports = {billResolver};