const now = new Date();

const msInSeconds = 1000;
const msInMins = msInSeconds * 60;
const msInHours = msInMins * 60;
const msInDays = msInHours * 24;
const msInWeeks = msInDays * 7;
const msInYears = 31536000000;
/**
 * Check if the input is a valid date object
 * 
 * @param {Date} d JS Date object
 */
const checkIfValidDate = (date) => {
  if (date.toString() === 'Invalid Date') {
    return new Error('Date object found, but invalid date');
  }
  return date;
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
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  let string = [];
  if (today.getDate() === date.getDate()) {
    string.push('Today');
  } else if (yesterday.getDate() === date.getDate()) {
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
 * Get total time difference in the various formats
 * 
 * @param {Date} date date object
 */
const getTotalValues = (date) => {

  const yearsTotal = now.getFullYear() - date.getFullYear();
  const weeksTotal = Math.round((now - date.getTime()) / msInWeeks);
  const daysTotal = Math.round((now - date.getTime()) / msInDays);
  const hoursTotal = Math.round((now - date.getTime()) / msInHours);
  const minsTotal = Math.round((now - date.getTime()) / msInMins);
  const secondsTotal = Math.round((now - date.getTime()) / msInSeconds);

  // figure out months, has to be done like this because each month doesnt have a set amount of seconds
  let monthsTotal = yearsTotal * 12;
  const startMonth = date.getMonth() + 1;
  const endMonth = now.getMonth() + 1;
  const startDay = date.getDate();
  const endDay = now.getDate();
  const monthsDiff = endMonth - startMonth;

  if (endDay >= startDay) {
    monthsTotal += monthsDiff;
  } else {
    monthsTotal += (monthsDiff - 1);
  }
  
  return {
    years: yearsTotal,
    months: monthsTotal,
    weeks: weeksTotal,
    days: daysTotal,
    hours: hoursTotal,
    minutes: minsTotal,
    seconds: secondsTotal,
  };
};

/**
 * Get the filtered value in various formats
 * 
 * @param {Date} date JS Date object
 */
const getFilteredValues = (date) => {
  let ms = now.getTime() - date.getTime();

  // use full year instead os ms in a year becuse ms per day * 365 doesnt work
  // is it greater than a year
  const years = now.getFullYear() - date.getFullYear();
  if (years >= 1) {
    ms -= years * msInYears;
  }

  // we want to find out how many months are different
  let months = (now.getMonth() + 1) - (date.getMonth() + 1);

  // this just tells us whether there are different months, 30th and 1st will appear as a 1 months diff
  // to combat this, we check whether the days
  const dayDiff = (now.getDate() - date.getDate());
  if (dayDiff < 0) {
    // if there were over 0 days, then it would be more than a month, so we remove a month
    months -= 1;
  }
  if (months > 0) {
    // if we are over a month, we want to get it's worth in ms and deduct it from the total
    const tempMonth = new Date(now);
    tempMonth.setMonth(tempMonth.getMonth() - months);
    const msDeducted = now.getTime() - tempMonth.getTime();
    ms -= msDeducted;
  }

  let days = Math.round(ms / msInDays);
  if (days > 0) {
    ms -= (days * msInDays);
  }

  const weeks = Math.floor(days / 7);
  days -= (weeks * 7);

  const hours = Math.round(ms / msInHours);
  if (hours > 0) {
    ms -= hours * msInHours;
  }
  const minutes = Math.round(ms / msInMins);
  if (minutes > 0) {
    ms -= minutes * msInMins;
  }
  const seconds = Math.round(ms / msInSeconds);
  if (seconds > 0) {
    ms -= seconds * msInSeconds;
  }

  return {
    years,
    months,
    weeks,
    days,
    hours,
    minutes,
    seconds,
  };
};

/**
 * Return the time ago in short string
 * 
 * @param {filter} filtered
 */
const getShortString = (filtered) => {
  const string = [];

  if (filtered.years === 1) {
    string.push('1 year');
  } else if (filtered.years > 1) {
    string.push(`${filtered.years} years`);
  } else if (filtered.months === 1) {
    string.push('1 month');
  } else if (filtered.months > 1) {
    string.push(`${filtered.months} months`);
  } else if (filtered.weeks === 1) {
    string.push('1 week');
  } else if (filtered.weeks > 1) {
    string.push(`${filtered.weeks} weeks`);
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
};

/**
 * Return the time ago in long string
 * 
 * @param {filter} filtered 
 */
const getLongString = (filtered) => {
  const longString = [];

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
};

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
    filtered,
    total,
    strings: {
      long: longString,
      short: shortString,
    },
  };
};

module.exports = (dateArg) => {
  const date = checkIfDate(dateArg);
  if (date instanceof Error) return date;
  return {
    ago: ago(date),
    when: when(date),
  };
};
