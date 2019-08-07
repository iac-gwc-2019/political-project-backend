'use strict';

var _constants = require('../constants');

var fetch = require('node-fetch');

function mapSubject(subject) {
  var subjectValues = {
    subject_name: subject.name
  };
  return subjectValues;
}

var subjectResolver = {
  Query: {
    subjects: function subjects() {
      return fetch(_constants.BASE_URL + '/115/bills/hr2810/subjects', {
        method: 'GET',
        headers: { 'X-API-KEY': _constants.API_KEY }
      }).then(function (res) {
        return res.json();
      }).then(function (response) {
        var unpacked = response.results;
        var newSubjectArr = unpacked[0].subjects.map(mapSubject);
        return newSubjectArr;
      });
    }
  }
};

module.exports = { subjectResolver: subjectResolver };