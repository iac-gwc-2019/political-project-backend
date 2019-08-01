import { API_KEY, BASE_URL } from '../constants';
const fetch = require('node-fetch');

function mapBill(bill){
  const values = {
    id: bill.bill_id,
    title: bill.title,
    summary: bill.summary,
    subject: bill.subject,
    latestActionDescription: bill.latest_major_action,
    latestActionDate: bill.latest_major_action_date,
    sponsor_id: bill.sponsor_id
  }
  return values;
}

function mapSubject(bill){
  const values = {
    subject: bill.subjects,
  }
  return subjectValues;
}

const billResolver = {
  Query: {
    bills: () => {
      return fetch(`${BASE_URL}/bills/search.json?query=megahertz`, {
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
    bill: () => {
      return fetch(`${BASE_URL}/bills/search.json?query=megahertz`, {
        method: 'GET', 
        headers: {'X-API-KEY': API_KEY}
      }).then((res) => {
        return res.json()
      }).then((response) => {
        const unpacked = response.results;
        const newBillArr = unpacked[0].bills.map(mapBill);
        return newBillArr[0];
      })
    },
    subjects: () => {
      return fetch(`${BASE_URL}/115/bills/hr2810/subjects`, {
        method: 'GET', 
        headers: {'X-API-KEY': API_KEY}
      }).then((res) => {
        return res.json()
      }).then((response) => {
        const unpacked = response.results;
        const newSubjectArr = unpacked[0].subjects.map(mapSubject);
        return newSubjectArr;
      })
    }
  }
}

module.exports = {billResolver};