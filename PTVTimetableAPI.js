'use strict';
var moment = require('moment'),
  jsSHA = require('jssha');

var PTVTimetableAPI = function() {
  var developer_id = '1000433',

    security_key = '3e644583-fced-11e4-9dfa-061817890ad2',

    base_url = 'http://timetableapi.ptv.vic.gov.au',

    hash = function(request) {
      var shaObj = new jsSHA("SHA-1", "TEXT");
      shaObj.setHMACKey(security_key, "TEXT");
      shaObj.update(request);
      return shaObj.getHMAC("HEX");
    },

    http_build_query = function(data) {
      var memo = [];
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          memo.push(encodeURI(key) + '=' + encodeURI(data[key]));
        }
      }
      return memo.join('&');
    },

    call = function(request, data) {
      data.devid = developer_id;
      var signature = hash(request + '?' + http_build_query(data));
      data.signature = signature;
      var memo = [];
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          memo.push(encodeURI(key) + '=' + encodeURI(data[key]));
        }
      }

      return fetch(base_url + request + '?' + memo.join('&')).then((response) => response.json());
    };

  return {
    health_check: function() {
      var date = new Date();
      var data = {timestamp: moment.utc().format('YYYY-MM-DD[T]HH:mm:ss[Z]')};
      return call('/v2/healthcheck', data);
    },
    stop_nearby: function(lat, lng) {},
    point_of_interest: function(lat1, lng1, lat2, lng2, grid_depth, limit, poi_types) {},
    search: function(text) {},
    broad_next_departure: function(mode, stop, limit) {},
    specific_next_departures: function(mode, line, stop, direction, limit, datetime) {},
    stopping_pattern: function(mode, run, stop, datetime) {},
    line_stops: function(mode, line) {},
    lines: function(mode, name) {},
    disruptions: function(modes) {}
  };
};

module.exports = PTVTimetableAPI;
