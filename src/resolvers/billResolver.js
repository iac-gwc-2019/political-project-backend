import { API_KEY, BASE_URL } from '../constants';
const fetch = require('node-fetch');

function mapBill(bill){
  const values = {
    bill_name: bill.title,
    primary_subject: bill.primary_subject,
    bill_id: bill.bill_id,
    summary: bill.summary,
    summary_short: bill.summary_short,
    latest_major_action_date: bill.latest_major_action_date,
    latest_major_action: bill.latest_major_action,
    billSlug: bill.bill_slug,
    sponsorId: bill.sponsor_id
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
      return fetch(`${BASE_URL}/bills/subjects/${args.primary_subject}`, {
        method: 'GET', 
        headers: {'X-API-KEY': API_KEY}
      }).then((res) => {
        return res.json()
      }).then((response) => {
        const unpacked = response.results;
        const newBillsArr = unpacked.map(mapBill);
        return newBillsArr;
      })
    },
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