'use strict';

var _constants = require('../constants');

var fetch = require('node-fetch');

function mapPerson(person) {
  var values = {
    short_title: person.short_title,
    title: person.title,
    first_name: person.first_name,
    last_name: person.last_name,
    party: person.party,
    state: person.state,
    website: person.url,
    phone: person.phone,
    twitter_account: person.twitter_account,
    id: person.id
  };
  return values;
}

function mapPersonId(person) {
  var values = {
    short_title: person.roles[0].title,
    title: person.title,
    first_name: person.first_name,
    last_name: person.last_name,
    party: person.current_party,
    state: person.roles[0].state,
    website: person.url,
    phone: person.roles[0].phone,
    twitter_account: person.twitter_account,
    id: person.member_id
  };
  return values;
}

var personResolver = {
  Query: {
    peopleHouse: function peopleHouse() {
      return fetch(_constants.BASE_URL + '/115/house/members', {
        method: 'GET',
        headers: { 'X-API-KEY': _constants.API_KEY }
      }).then(function (res) {
        return res.json();
      }).then(function (response) {
        var unpacked = response.results;
        var newPersonHouseArr = unpacked[0].members.map(mapPerson);
        return newPersonHouseArr;
      });
    },
    peopleSenate: function peopleSenate() {
      return fetch(_constants.BASE_URL + '/115/senate/members', {
        method: 'GET',
        headers: { 'X-API-KEY': _constants.API_KEY }
      }).then(function (res) {
        return res.json();
      }).then(function (response) {
        var unpacked = response.results;
        var newPersonSenateArr = unpacked[0].members.map(mapPerson);
        return newPersonSenateArr;
      });
    },

    // TODO: getPerson -> summary??
    personById: function personById(obj, args, context, info) {
      return fetch(_constants.BASE_URL + '/members/' + args.memberId, {
        method: 'GET',
        headers: { 'X-API-KEY': _constants.API_KEY }
      }).then(function (res) {
        return res.json();
      }).then(function (response) {
        var unpacked = response.results;
        var newPersonArr = unpacked.map(mapPersonId);
        return newPersonArr[0];
      });
    }
  }
};

module.exports = { personResolver: personResolver };