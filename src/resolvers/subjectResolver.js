import { API_KEY, BASE_URL } from '../constants';
const fetch = require('node-fetch');

function mapSubject(subject){
  const subjectValues = {
    name: subject.name,
  }
  return subjectValues;
}

const subjectResolver = {
  Query: {
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

module.exports = {subjectResolver};