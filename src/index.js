const checkIfValidDate = (d) => {
  if (d.toString() === 'Invalid Date') {
      return new Error('Date object found, but invalid date');
  } else {
      return d;
  }
};

const checkIfDate = (d) => {
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

const getMonth = d => {
  switch (d) {
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
 * Get the total months ago
 * 
 * @param {Date} nowDate 
 * @param {Date} previousDate 
 * @param {Int} totalDays 
 */
const getTotalMonthsAgo = (nowDate, previousDate, totalDays) => {
  
  const nowYear = nowDate.getFullYear();
  const previousYear = previousDate.getFullYear();
  const yearDiff = nowYear - previousYear;
  const nowMonth = nowDate.getMonth();
  const previousMonth = previousDate.getMonth();
  
  let totalDaysCopy = totalDays;
  let count = 0;
  let daysAgo = 0;
  let daysLeftOver = totalDaysCopy;

  // Take away the years first
  totalDaysCopy = totalDaysCopy - (yearDiff * 365);
  count = count + (yearDiff * 12);

  // Go through the months
  for (let month = previousMonth; month < nowMonth; month++) {
    const daysInMonth = new Date(nowYear, month, 0).getDate();
    totalDaysCopy = totalDaysCopy - daysInMonth;

    if (totalDaysCopy >= 0) {
      count++;
    }
    
    if (totalDaysCopy <= 0) {
      break;
    }
  }

  if (count > 0) {
    daysLeftOver = Math.abs(totalDaysCopy);
  }

  return {
    months: count,
    remainder: daysLeftOver
  };
}

/**
 * Get the difference in months
 * 
 * @param {Date} nowDate Date now
 * @param {Date} previousDate Previous date
 */
const getFilteredMonths = (nowDate, previousDate) => {
  const nowMonth = nowDate.getMonth();
  const previousMonth = previousDate.getMonth();

  let diff = nowMonth - previousMonth;

  if (diff < 1) {
    return 0;
  }

  return diff;
}

const ago = (date) => {

  const now = new Date();
  
  const msInSeconds = 1000;
  const msInMins    = msInSeconds * 60;
  const msInHours   = msInMins * 60;
  const msInDays    = msInHours * 24;
  const msInWeeks   = msInDays * 7;
  const msInYears   = msInDays * 365;
  
  const yearsTotal      = Math.round((now - date.getTime()) / msInYears);
  const weeksTotal      = Math.round((now - date.getTime()) / msInWeeks);
  const daysTotal       = Math.round((now - date.getTime()) / msInDays);
  const hoursTotal      = Math.round((now - date.getTime()) / msInHours);
  const minsTotal       = Math.round((now - date.getTime()) / msInMins);
  const secondsTotal    = Math.round((now - date.getTime()) / msInSeconds);

  // Months are a bit different and have their own calculations
  const monthsTotal     = getTotalMonthsAgo(now, date, daysTotal).months;
  const monthsFiltered  = getFilteredMonths(now, date);
  
  const yearsRemainder    = Math.round((now - date.getTime()) % msInYears);
  const monthsRemainder   = getTotalMonthsAgo(now, date, daysTotal).remainder * msInDays;
  const weeksRemainder    = monthsRemainder % msInWeeks;
  const daysRemainder     = weeksRemainder % msInDays;
  const hoursRemainder    = daysRemainder % msInHours;
  const minutesRemainder  = hoursRemainder % msInMins;
  
  const yearsFiltered     = Math.round((now - date.getTime()) / msInYears);
  const weeksFiltered     = Math.floor(monthsRemainder / msInWeeks);
  const daysFiltered      = Math.floor(weeksRemainder / msInDays);
  const hoursFiltered     = Math.floor(daysRemainder / msInHours);
  const minutesFiltered   = Math.floor(hoursRemainder / msInMins);
  const secondsFiltered   = Math.floor(minutesRemainder / msInSeconds);

  let string = [];
  
  if (yearsFiltered === 1) {
    string.push('1 year');
  } else if (yearsFiltered > 1) {
    string.push(`${yearsFiltered} years`);
  } else if (monthsFiltered === 1) {
    string.push('1 month');
  } else if (monthsFiltered > 1) {
    string.push(`${monthsFiltered} months`);
  } else if(weeksFiltered === 1) {
    string.push('7 days');
  } else if (daysFiltered === 1) {
    string.push('1 day');
  } else if (daysFiltered > 1) {
    string.push(`${daysFiltered} days`);
  } else if (hoursFiltered === 1) {
    string.push('1 hour');
  } else if (hoursFiltered > 1) {
    string.push(`${hoursFiltered} hours`);
  } else if (minutesFiltered === 1) {
    string.push('1 minute');
  } else if (minutesFiltered > 1) {
    string.push(`${minutesFiltered} minutes`);
  } else if (secondsFiltered === 1) {
    string.push('1 second');
  } else if (secondsFiltered > 1) {
    string.push(`${secondsFiltered} seconds`);
  }

  string = string.join(' ');
  let longString = [];

  if (yearsFiltered === 1) {
    longString.push('1 year');
  } else if (yearsFiltered > 1) {
    longString.push(`${yearsFiltered} years`);
  }

  if (monthsFiltered === 1) {
    longString.push('1 month');
  } else if (monthsFiltered > 1) {
    longString.push(`${monthsFiltered} months`);
  }

  if (weeksFiltered === 1) {
    longString.push('7 days');
  }
  
  if (daysFiltered === 1) {
    longString.push('1 day');
  } else if (daysFiltered > 1) {
    longString.push(`${daysFiltered} days`);
  }
  
  if (hoursFiltered === 1) {
    longString.push('1 hour');
  } else if (hoursFiltered > 1) {
    longString.push(`${hoursFiltered} hours`);
  }
  
  if (minutesFiltered === 1) {
    longString.push('1 minute');
  } else if (minutesFiltered > 1) {
    longString.push(`${minutesFiltered} minutes`);
  }
  
  if (secondsFiltered === 1) {
    longString.push('1 second');
  } else if (secondsFiltered > 1) {
    longString.push(`${secondsFiltered} seconds`);
  }

  longString = longString.join(' ');

  return {
    filtered: {
      years: yearsFiltered,
      months: monthsFiltered,
      weeks: weeksFiltered,
      days: daysFiltered,
      hours: hoursFiltered,
      minutes: minutesFiltered,
      seconds: secondsFiltered,
    },
    total: {
      years: yearsTotal,
      months: monthsTotal,
      weeks: weeksTotal,
      days: daysTotal,
      hours: hoursTotal,
      minutes: minsTotal,
      seconds: secondsTotal,
    },
    strings: {
      long: longString,
      short: string,
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
