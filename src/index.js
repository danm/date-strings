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
const daysAgo = () => {
  const startDate = new Date(2017, 05, 21);
  const endDate = new Date(2017, 08, 21);

  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();
  const startMonth = startDate.getMonth() + 1;
  const endMonth = endDate.getMonth() + 1;

  let daysAgo = 0;
  console.log(endDate);
  for (let month = startMonth; month <= endMonth; month++) {
    console.log(month);
    const daysInMonth = new Date(2017, month, 0).getDate();
    daysAgo += daysInMonth;
  }

  return daysAgo;
}

const ago = (date) => {
  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();

  const msInYears = (86400 * 1000) * 365;
  const msInMonths = (86400 * 1000) * daysInMonth;
  const msInWeeks = (86400 * 1000) * 7;
  const msInDays = 86400 * 1000;
  const msInHours = 3600 * 1000;
  const msInMins = 60 * 1000;
  const msInSeconds = 1000;
  const years = Math.round((now - date.getTime()) / msInYears);

  console.log(daysAgo());
  const months = Math.round((now.getTime() - date.getTime()) / msInMonths);
  const weeks = Math.round((now - date.getTime()) / msInWeeks);
  const days = Math.round((now - date.getTime()) / msInDays);
  const hours = Math.round((now - date.getTime()) / msInHours);
  const mins = Math.round((now - date.getTime()) / msInMins);
  const seconds = Math.round((now - date.getTime()) / msInSeconds);
  const y2 = Math.round((now - date.getTime()) / msInYears);
  const y = Math.round((now - date.getTime()) % msInYears);
  const m2 = Math.floor(y / msInMonths);
  const m = y % msInMonths;
  const w2 = Math.floor(m / msInWeeks);
  const w = m % msInWeeks;
  const d2 = Math.floor(w / msInDays);
  const d = w % msInDays;
  const h2 = Math.floor(d / msInHours);
  const h = d % msInHours;
  const mi2 = Math.floor(h / msInMins);
  const mi = h % msInMins;
  const s2 = Math.floor(mi / msInSeconds);
  let string = [];
  
  if (y2 === 1) {
    string.push('1 year');
  } else if (y2 > 1) {
    string.push(`${y2} years`);
  } else if (m2 === 1) {
    string.push('1 month');
  } else if (m2 > 1) {
    string.push(`${m2} months`);
  } else if (d2 === 1) {
    string.push('1 day');
  } else if (d2 > 1) {
    string.push(`${d2} days`);
  } else if (h2 === 1) {
    string.push('1 hour');
  } else if (h2 > 1) {
    string.push(`${h2} hours`);
  } else if (mi2 === 1) {
    string.push('1 minute');
  } else if (mi2 > 1) {
    string.push(`${mi2} minutes`);
  } else if (s2 === 1) {
    string.push('1 second');
  } else if (s2 > 1) {
    string.push(`${s2} seconds`);
  }

  string = string.join(' ');
  let longString = [];
  if (m2 === 1) {
    longString.push('1 month');
  } else if (m2 > 1) {
    longString.push(`${m2} months`);
  }
  
  if (d2 === 1) {
    longString.push('1 day');
  } else if (d2 > 1) {
    longString.push(`${d2} days`);
  }
  
  if (h2 === 1) {
    longString.push('1 hour');
  } else if (h2 > 1) {
    longString.push(`${h2} hours`);
  }
  
  if (mi2 === 1) {
    longString.push('1 minute');
  } else if (mi2 > 1) {
    longString.push(`${mi2} minutes`);
  }
  
  if (s2 === 1) {
    longString.push('1 second');
  } else if (s2 > 1) {
    longString.push(`${s2} seconds`);
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
      seconds: s2,
    },
    total: {
      years: years,
      months: months,
      weeks: weeks,
      days: days,
      hours: hours,
      minutes: mins,
      seconds: seconds,
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
