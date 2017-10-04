const now = new Date();

const msInSeconds = 1000;
const msInMins    = msInSeconds * 60;
const msInHours   = msInMins * 60;
const msInDays    = msInHours * 24;
const msInWeeks   = msInDays * 7;

// console.log('msInWeeks: ', msInWeeks);
// console.log('msInDays: ', msInDays);

/**
 * Check if the input is a valid date object
 * 
 * @param {Date} d JS Date object
 */
const checkIfValidDate = (date) => {
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
const checkIfDate = (date) => {
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
const getMonth = month => {
  switch (month) {
    case 0: return 'Jan';
    case 1: return 'Feb';
    case 2: return 'Mar';
    case 3: return 'Apr';
    case 4: return 'May';
    case 5: return 'Jun';
    case 6: return 'Jul';
    case 7: return 'Aug';
    case 8: return 'Sep';
    case 9: return 'Oct';
    case 10: return 'Nov';
    case 11: return 'Dec';
    default: throw new Error('Error converting Monday to string'); 
  }
};

/**
 * Return when
 * 
 * @param {Date} date 
 */
const when = (date) => {
  const compareDate = new Date(date);
  const today = new Date();
  const yesterday = new Date();
  
  today.setHours(0, 0, 0, 0);
  compareDate.setHours(0, 0, 0, 0);
  yesterday.setHours(0, 0, 0, 0);
  yesterday.setDate(yesterday.getDate() - 1);

  let string = [];
  
  if (today.getTime() === compareDate.getTime()) {
    string.push('Today');
  } else if (yesterday.getTime() === compareDate.getTime()) {
    string.push('Yesterday');
  } else {
    string.push(date.getDate());
    string.push(getMonth(date.getMonth()));
  }

  string.push(`${('0' + date.getHours()).slice(-2) }:${('0' + date.getMinutes()).slice(-2)}`);
  string = string.join(' ');

  return string;
};

/**
 * Months are a bit different and require their own calculation,
 * mainly because there are different amount of days in a month
 * 
 * @param {Date} nowDate Date now
 * @param {Date} previousDate Previous date
 */
const getMonths = (nowDate, previousDate) => {
  let totalMonthsCount = 0;
  let filteredMonthsCount = 0;
  let remainderOfDays = 0;
  
  filteredMonthsCount = Math.abs(nowDate.getMonth() - previousDate.getMonth());
  remainderOfDays = Math.abs(nowDate.getDate() - previousDate.getDate());
  
  if (nowDate.getDate() < previousDate.getDate()) {
    const daysInMonth = new Date(previousDate.getFullYear(), previousDate.getMonth() + 1, 0).getDate();
    filteredMonthsCount--;
    remainderOfDays = daysInMonth - previousDate.getDate();
    remainderOfDays += nowDate.getDate();
  }

  // Add the months in years
  const yearDiff = nowDate.getFullYear() - previousDate.getFullYear();
  totalMonthsCount = filteredMonthsCount + (yearDiff * 12);

  return {
    total: totalMonthsCount,
    filtered: filteredMonthsCount,
    remainderOfDays: remainderOfDays
  };
}

/**
 * Get total time difference in the various formats
 * 
 * @param {Date} date date object
 */
const getTotalValues = (date) => {
  const yearsTotal      = now.getFullYear() - date.getFullYear();
  const weeksTotal      = Math.round((now - date.getTime()) / msInWeeks);
  const daysTotal       = Math.round((now - date.getTime()) / msInDays);
  const hoursTotal      = Math.round((now - date.getTime()) / msInHours);
  const minsTotal       = Math.round((now - date.getTime()) / msInMins);
  const secondsTotal    = Math.round((now - date.getTime()) / msInSeconds);

  // Months are a bit different and have their own calculations
  const monthsTotal       = getMonths(now, date).total;

  return {
    years: yearsTotal,
    months: monthsTotal,
    weeks: weeksTotal,
    days: daysTotal,
    hours: hoursTotal,
    minutes: minsTotal,
    seconds: secondsTotal,
  };
}

/**
 * Get the filtered value in various formats
 * 
 * @param {Date} date JS Date object
 */
const getFilteredValues = (date) => {

  // Calculate remainders
  const monthsRemainder   = getMonths(now, date).remainderOfDays * msInDays; // 7 days
  const weeksRemainder    = monthsRemainder % msInWeeks; // 1 week
  const daysRemainder     = weeksRemainder % msInDays;
  const hoursRemainder    = daysRemainder % msInHours;
  const minutesRemainder  = hoursRemainder % msInMins;
  
  // Calculate filtered time
  const yearsFiltered     = now.getFullYear() - date.getFullYear();
  const monthsFiltered    = getMonths(now, date).filtered;
  const weeksFiltered     = Math.floor(monthsRemainder / msInWeeks);
  const daysFiltered      = Math.floor(weeksRemainder / msInDays);
  const hoursFiltered     = Math.floor(daysRemainder / msInHours);
  const minutesFiltered   = Math.floor(hoursRemainder / msInMins);
  const secondsFiltered   = Math.floor(minutesRemainder / msInSeconds);

  return {
    years: yearsFiltered,
    months: monthsFiltered,
    weeks: weeksFiltered,
    days: daysFiltered,
    hours: hoursFiltered,
    minutes: minutesFiltered,
    seconds: secondsFiltered,
  };
}

/**
 * Return the time ago in short string
 * 
 * @param {filter} filtered
 */
const getShortString = (filtered) => {
  let string = [];
  
  if (filtered.years === 1) {
    string.push('1 year');
  } else if (filtered.years > 1) {
    string.push(`${filtered.years} years`);
  } else if (filtered.months === 1) {
    string.push('1 month');
  } else if (filtered.months > 1) {
    string.push(`${filtered.months} months`);
  } else if(filtered.weeks === 1) {
    string.push('1 week');
  } else if (filtered.days === 1) {
    string.push('1 day');
  } else if (filtered.days > 1) {
    string.push(`${filtered.days} days`);
  } else if (filtered.hours === 1) {
    string.push('1 hour');
  } else if (filtered.hours > 1) {
    string.push(`${filtered.hours} hours`);
  } else if (filtered.minutes === 1) {
    string.push('1 minute');
  } else if (filtered.minutes > 1) {
    string.push(`${filtered.minutes} minutes`);
  } else if (filtered.seconds === 1) {
    string.push('1 second');
  } else if (filtered.seconds > 1) {
    string.push(`${filtered.seconds} seconds`);
  }

  return string.join(' ');
}

/**
 * Return the time ago in long string
 * 
 * @param {filter} filtered 
 */
const getLongString = (filtered) => {
  let longString = [];
  
  if (filtered.years === 1) {
    longString.push('1 year');
  } else if (filtered.years > 1) {
    longString.push(`${filtered.years} years`);
  }

  if (filtered.months === 1) {
    longString.push('1 month');
  } else if (filtered.months > 1) {
    longString.push(`${filtered.months} months`);
  }

  if (filtered.weeks === 1) {
    longString.push('1 week');
  } else if (filtered.weeks > 1) {
    longString.push(`${filtered.weeks} weeks`);
  }
  
  if (filtered.days === 1) {
    longString.push('1 day');
  } else if (filtered.days > 1) {
    longString.push(`${filtered.days} days`);
  }
  
  if (filtered.hours === 1) {
    longString.push('1 hour');
  } else if (filtered.hours > 1) {
    longString.push(`${filtered.hours} hours`);
  }
  
  if (filtered.minutes === 1) {
    longString.push('1 minute');
  } else if (filtered.minutes > 1) {
    longString.push(`${filtered.minutes} minutes`);
  }
  
  if (filtered.seconds === 1) {
    longString.push('1 second');
  } else if (filtered.seconds > 1) {
    longString.push(`${filtered.seconds} seconds`);
  }

  return longString.join(' ');
}

/**
 * Calculate the time difference between and date and now
 * 
 * @param {Date} date JS Date object
 */
const ago = (date) => {
  const total = getTotalValues(date);
  const filtered = getFilteredValues(date);
  const shortString = getShortString(filtered);
  const longString = getLongString(filtered);

  return {
    filtered: filtered,
    total: total,
    strings: {
      long: longString,
      short: shortString,
    },
  };
}

module.exports = (date) => {
  date = checkIfDate(date);
  if (date instanceof Error) return date;
  return {
    ago: ago(date),
    when: when(date),
  };
};
