const ds = require('../src/index.js');

const date = new Date('2017-08-10T09:54:05.216Z');
// console.log(date.toDateString());
const dateString = ds(date);
console.log(dateString)
// const response = `Event took place on ${dateString.when}, ${dateString.ago.strings.long}`
// console.log(response)