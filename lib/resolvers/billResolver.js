'use strict';

var _constants = require('../constants');

var fetch = require('node-fetch');

function mapBill(bill) {
  var values = {
    bill_name: bill.title,
    primary_subject: bill.primary_subject,
    bill_id: bill.bill_id,
    summary: bill.summary,
    summary_short: bill.summary_short,
    latest_major_action_date: bill.latest_major_action_date,
    latest_major_action: bill.latest_major_action,
    billSlug: bill.bill_slug,
    sponsorId: bill.sponsor_id
  };
  return values;
}

var billResolver = {
  Query: {
    bills: function bills() {
      return fetch(_constants.BASE_URL + '/bills/search.json?query= ', {
        method: 'GET',
        headers: { 'X-API-KEY': _constants.API_KEY }
      }).then(function (res) {
        return res.json();
      }).then(function (response) {
        var unpacked = response.results;
        var newBillsArr = unpacked[0].bills.map(mapBill);
        return newBillsArr;
      });
    },
    billById: function billById(obj, args, context, info) {
      return fetch(_constants.BASE_URL + '/115/bills/' + args.id, {
        method: 'GET',
        headers: { 'X-API-KEY': _constants.API_KEY }
      }).then(function (res) {
        return res.json();
      }).then(function (response) {
        var unpacked = response.results;
        var newBillArr = unpacked.map(mapBill);
        return newBillArr[0];
      });
    },
    billsBySubject: function billsBySubject(obj, args, context, info) {
      return fetch(_constants.BASE_URL + '/bills/subjects/' + args.primary_subject, {
        method: 'GET',
        headers: { 'X-API-KEY': _constants.API_KEY }
      }).then(function (res) {
        return res.json();
      }).then(function (response) {
        var unpacked = response.results;
        var newBillsArr = unpacked.map(mapBill);
        return newBillsArr;
      });
    },
    billsCosponsoredBy: function billsCosponsoredBy(obj, args, context, info) {
      return fetch(_constants.BASE_URL + '/members/' + args.sponsorId + '/bills/cosponsored', {
        method: 'GET',
        headers: { 'X-API-KEY': _constants.API_KEY }
      }).then(function (res) {
        return res.json();
      }).then(function (response) {
        var unpacked = response.results;
        var newBillsArr = unpacked[0].bills.map(mapBill);
        return newBillsArr;
      });
    }
  }
};

module.exports = { billResolver: billResolver };