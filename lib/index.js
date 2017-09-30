'use strict';

var now = new Date();

var msInSeconds = 1000;
var msInMins = msInSeconds * 60;
var msInHours = msInMins * 60;
var msInDays = msInHours * 24;
var msInWeeks = msInDays * 7;

/**
 * Check if the input is a valid date object
 * 
 * @param {Date} d JS Date object
 */
var checkIfValidDate = function checkIfValidDate(date) {
  if (date.toString() === 'Invalid Date') {
    return new Error('Date object found, but invalid date');
  } else {
    return date;
  }
};

/**
 * Check if valid date, else try to convert it to a date object
 * 
 * @param {Date} d JS Date bject
 */
var checkIfDate = function checkIfDate(date) {
  if (date instanceof Date) {
    // is date object, let us see if it is valid
    date = checkIfValidDate(date);
    if (date instanceof Error) return date;
  } else {
    date = new Date(date);
    date = checkIfValidDate(date);
    if (date instanceof Error) return date;
  }
  return date;
};

/**
 * Return the month in string for the month value
 * 
 * @param {Int} month JS date month value
 */
var getMonth = function getMonth(month) {
  switch (month) {
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

/**
 * Return when
 * 
 * @param {Date} date 
 */
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

/**
 * Get the total months ago
 * 
 * @param {Date} nowDate Date now
 * @param {Date} previousDate Previous date
 * @param {Int} totalDays Total days between now and previous date
 */
var getTotalMonths = function getTotalMonths(nowDate, previousDate) {
  var monthsCount = 0;
  var remainderOfDays = 0;

  var yearDiff = nowDate.getFullYear() - previousDate.getFullYear();

  // Add the months in years first
  monthsCount = monthsCount + yearDiff * 12;

  // Add the difference in months;
  monthsCount += +Math.abs(nowDate.getMonth() - previousDate.getMonth());

  // Remainder of days left
  remainderOfDays = Math.abs(nowDate.getDate() - previousDate.getDate());

  return {
    months: monthsCount,
    remainderOfDays: remainderOfDays
  };
};

/**
 * Get the difference in months
 * 
 * @param {Date} nowDate Date now
 * @param {Date} previousDate Previous date
 */
var getFilteredMonths = function getFilteredMonths(nowDate, previousDate) {
  var diff = nowDate.getMonth() - previousDate.getMonth();

  if (diff < 1) {
    return 0;
  }

  return diff;
};

/**
 * Get total time difference in the various formats
 * 
 * @param {Date} date date object
 */
var getTotalValues = function getTotalValues(date) {
  var yearsTotal = now.getFullYear() - date.getFullYear();
  var weeksTotal = Math.round((now - date.getTime()) / msInWeeks);
  var daysTotal = Math.round((now - date.getTime()) / msInDays);
  var hoursTotal = Math.round((now - date.getTime()) / msInHours);
  var minsTotal = Math.round((now - date.getTime()) / msInMins);
  var secondsTotal = Math.round((now - date.getTime()) / msInSeconds);

  // Months are a bit different and have their own calculations
  var monthsTotal = getTotalMonths(now, date).months;

  return {
    years: yearsTotal,
    months: monthsTotal,
    weeks: weeksTotal,
    days: daysTotal,
    hours: hoursTotal,
    minutes: minsTotal,
    seconds: secondsTotal
  };
};

/**
 * Get the filtered value in various formats
 * 
 * @param {Date} date JS Date object
 */
var getFilteredValues = function getFilteredValues(date) {

  // Calculate remainders
  var monthsRemainder = getTotalMonths(now, date).remainderOfDays * msInDays;
  var weeksRemainder = monthsRemainder % msInWeeks;
  var daysRemainder = weeksRemainder % msInDays;
  var hoursRemainder = daysRemainder % msInHours;
  var minutesRemainder = hoursRemainder % msInMins;

  // Calculate filtered time
  var yearsFiltered = now.getFullYear() - date.getFullYear();
  var monthsFiltered = getFilteredMonths(now, date);
  var weeksFiltered = Math.floor(monthsRemainder / msInWeeks);
  var daysFiltered = Math.floor(weeksRemainder / msInDays);
  var hoursFiltered = Math.floor(daysRemainder / msInHours);
  var minutesFiltered = Math.floor(hoursRemainder / msInMins);
  var secondsFiltered = Math.floor(minutesRemainder / msInSeconds);

  return {
    years: yearsFiltered,
    months: monthsFiltered,
    weeks: weeksFiltered,
    days: daysFiltered,
    hours: hoursFiltered,
    minutes: minutesFiltered,
    seconds: secondsFiltered
  };
};

/**
 * Return the time ago in short string
 * 
 * @param {filter} filtered
 */
var getShortString = function getShortString(filtered) {
  var string = [];

  if (filtered.years === 1) {
    string.push('1 year');
  } else if (filtered.years > 1) {
    string.push(filtered.years + ' years');
  } else if (filtered.months === 1) {
    string.push('1 month');
  } else if (filtered.months > 1) {
    string.push(filtered.months + ' months');
  } else if (filtered.weeks === 1) {
    string.push('1 week');
  } else if (filtered.days === 1) {
    string.push('1 day');
  } else if (filtered.days > 1) {
    string.push(filtered.days + ' days');
  } else if (filtered.hours === 1) {
    string.push('1 hour');
  } else if (filtered.hours > 1) {
    string.push(filtered.hours + ' hours');
  } else if (filtered.minutes === 1) {
    string.push('1 minute');
  } else if (filtered.minutes > 1) {
    string.push(filtered.minutes + ' minutes');
  } else if (filtered.seconds === 1) {
    string.push('1 second');
  } else if (filtered.seconds > 1) {
    string.push(filtered.seconds + ' seconds');
  }

  return string.join(' ');
};

/**
 * Return the time ago in long string
 * 
 * @param {filter} filtered 
 */
var getLongString = function getLongString(filtered) {
  var longString = [];

  if (filtered.years === 1) {
    longString.push('1 year');
  } else if (filtered.years > 1) {
    longString.push(filtered.years + ' years');
  }

  if (filtered.months === 1) {
    longString.push('1 month');
  } else if (filtered.months > 1) {
    longString.push(filtered.months + ' months');
  }

  if (filtered.weeks === 1) {
    longString.push('1 week');
  } else if (filtered.weeks > 1) {
    longString.push(filtered.weeks + ' weeks');
  }

  if (filtered.days === 1) {
    longString.push('1 day');
  } else if (filtered.days > 1) {
    longString.push(filtered.days + ' days');
  }

  if (filtered.hours === 1) {
    longString.push('1 hour');
  } else if (filtered.hours > 1) {
    longString.push(filtered.hours + ' hours');
  }

  if (filtered.minutes === 1) {
    longString.push('1 minute');
  } else if (filtered.minutes > 1) {
    longString.push(filtered.minutes + ' minutes');
  }

  if (filtered.seconds === 1) {
    longString.push('1 second');
  } else if (filtered.seconds > 1) {
    longString.push(filtered.seconds + ' seconds');
  }

  return longString.join(' ');
};

/**
 * Calculate the time difference between and date and now
 * 
 * @param {Date} date JS Date object
 */
var ago = function ago(date) {
  var total = getTotalValues(date);
  var filtered = getFilteredValues(date);
  var shortString = getShortString(filtered);
  var longString = getLongString(filtered);

  return {
    filtered: filtered,
    total: total,
    strings: {
      long: longString,
      short: shortString
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
