'use strict';

var checkIfValidDate = function checkIfValidDate(d) {
  if (d.toString() === 'Invalid Date') {
    return new Error('Date object found, but invalid date');
  } else {
    return d;
  }
};

var checkIfDate = function checkIfDate(d) {
  if (d instanceof Date) {
    // is date object, let us see if it is valid
    d = checkIfValidDate(d);
    if (d instanceof Error) return d;
  } else {
    d = new Date(d);
    d = checkIfValidDate(d);
    if (d instanceof Error) return d;
  }
  return d;
};

var getMonth = function getMonth(d) {
  switch (d) {
    case 0:
      return 'Jan';
    case 1:
      return 'Feb';
    case 2:
      return 'Mar';
    case 3:
      return 'Apr';
    case 4:
      return 'May';
    case 5:
      return 'Jun';
    case 6:
      return 'Jul';
    case 7:
      return 'Aug';
    case 8:
      return 'Sep';
    case 9:
      return 'Oct';
    case 10:
      return 'Nov';
    case 11:
      return 'Dec';
    default:
      throw new Error('Error converting Monday to string');
  }
};

var when = function when(date) {
  var today = new Date();
  var yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  var string = [];
  if (today.getDate() === date.getDate()) {
    string.push('Today');
  } else if (yesterday.getDate() === date.getDate()) {
    string.push('Yesterday');
  } else {
    string.push(date.getDate());
    string.push(getMonth(date.getMonth()));
  }
  string.push(('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2));
  string = string.join(' ');
  return string;
};

var ago = function ago(date) {
  var msInYears = 86400 * 1000 * 365;
  var msInMonths = 86400 * 1000 * 12;
  var msInWeeks = 86400 * 1000 * 7;
  var msInDays = 86400 * 1000;
  var msInHours = 3600 * 1000;
  var msInMins = 60 * 1000;
  var msInSeconds = 1000;
  var now = new Date();
  var years = Math.round((now - date.getTime()) / msInYears);
  var months = Math.round((now - date.getTime()) / msInMonths);
  var weeks = Math.round((now - date.getTime()) / msInWeeks);
  var days = Math.round((now - date.getTime()) / msInDays);
  var hours = Math.round((now - date.getTime()) / msInHours);
  var mins = Math.round((now - date.getTime()) / msInMins);
  var seconds = Math.round((now - date.getTime()) / msInSeconds);
  var y2 = Math.round((now - date.getTime()) / msInYears);
  var y = Math.round((now - date.getTime()) % msInYears);
  var m2 = Math.floor(y / msInMonths);
  var m = y % msInMonths;
  var w2 = Math.floor(m / msInWeeks);
  var w = m % msInWeeks;
  var d2 = Math.floor(w / msInDays);
  var d = w % msInDays;
  var h2 = Math.floor(d / msInHours);
  var h = d % msInHours;
  var mi2 = Math.floor(h / msInMins);
  var mi = h % msInMins;
  var s2 = Math.floor(mi / msInSeconds);
  var string = [];

  if (y2 === 1) {
    string.push('1 year');
  } else if (y2 > 1) {
    string.push(y2 + ' years');
  } else if (m2 === 1) {
    string.push('1 month');
  } else if (m2 > 1) {
    string.push(m2 + ' months');
  } else if (d2 === 1) {
    string.push('1 day');
  } else if (d2 > 1) {
    string.push(d2 + ' days');
  } else if (h2 === 1) {
    string.push('1 hour');
  } else if (h2 > 1) {
    string.push(h2 + ' hours');
  } else if (mi2 === 1) {
    string.push('1 minute');
  } else if (mi2 > 1) {
    string.push(mi2 + ' minutes');
  } else if (s2 === 1) {
    string.push('1 second');
  } else if (s2 > 1) {
    string.push(s2 + ' seconds');
  }

  string = string.join(' ');
  var longString = [];
  if (m2 === 1) {
    longString.push('1 month');
  } else if (m2 > 1) {
    longString.push(m2 + ' months');
  }

  if (d2 === 1) {
    longString.push('1 day');
  } else if (d2 > 1) {
    longString.push(d2 + ' days');
  }

  if (h2 === 1) {
    longString.push('1 hour');
  } else if (h2 > 1) {
    longString.push(h2 + ' hours');
  }

  if (mi2 === 1) {
    longString.push('1 minute');
  } else if (mi2 > 1) {
    longString.push(mi2 + ' minutes');
  }

  if (s2 === 1) {
    longString.push('1 second');
  } else if (s2 > 1) {
    longString.push(s2 + ' seconds');
  }

  longString = longString.join(' ');

  return {
    filtered: {
      years: y2,
      months: m2,
      weeks: w2,
      days: d2,
      hours: h2,
      minutes: mi2,
      seconds: s2
    },
    total: {
      years: years,
      months: months,
      weeks: weeks,
      days: days,
      hours: hours,
      minutes: mins,
      seconds: seconds
    },
    strings: {
      long: longString,
      short: string
    }
  };
};

module.exports = function (date) {
  date = checkIfDate(date);
  if (date instanceof Error) return date;
  return {
    ago: ago(date),
    when: when(date)
  };
};
