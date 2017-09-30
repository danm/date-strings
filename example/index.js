const ds = require('../lib/index.js');

const date = new Date('2017-09-01T09:54:05.216Z');
const dateString = ds(date);
console.log(dateString)
const response = `Event took place on ${dateString.when}, ${dateString.ago.strings.long}`
console.log(response)