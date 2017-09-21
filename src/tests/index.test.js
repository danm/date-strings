var dateString = require('../index.js');
var assert = require('chai').assert;


/**
 * Check days, hours, minutes and seconds
 * 
 * @param {dateDtring} actual 
 * @param int days 
 */
function checkDays(actual, days) {
    assert.equal(checkDateString.ago.total.days, 1 * days);
    assert.equal(checkDateString.ago.total.hours, 24 * days);
    assert.equal(checkDateString.ago.total.minutes, 1440 * days);
    assert.equal(checkDateString.ago.total.seconds, 86400 * days);
}

describe('Date string', () => {

    const now = new Date();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();

    describe('Check if valid date', () => {
        it('Should return error for invalid date', () => {
            const badDate = 'january';
            // assert.equal(dateString(badDate), Error('Date object found, but invalid date'));
        })
    });

    describe('Check date for one DAY ago', () => {
        it('Should return numbers for one day ago', () => {
            const yesterdayDate = new Date();
            yesterdayDate.setDate(yesterdayDate.getDate() - 1);
            checkDateString = dateString(yesterdayDate);

            assert.equal(checkDateString.ago.total.years, 0);
            assert.equal(checkDateString.ago.total.months, 0);
            checkDays(checkDateString, 1)
        })
    });

    describe('Check date for one WEEK ago', () => {
        it('Should return numbers for one week ago', () => {
            const weekAgoDate = new Date();
            weekAgoDate.setDate(weekAgoDate.getDate() - 7);
            checkDateString = dateString(weekAgoDate);

            assert.equal(checkDateString.ago.total.years, 0);
            assert.equal(checkDateString.ago.total.months, 0);
            checkDays(checkDateString, 7)
        })
    });

    describe('Check date for one MONTH ago', () => {
        it('Should return numbers for one month ago', () => {
            const monthAgoDate = new Date();
            monthAgoDate.setMonth(monthAgoDate.getMonth() -1);
            checkDateString = dateString(monthAgoDate);

            assert.equal(checkDateString.ago.total.years, 0);
            assert.equal(checkDateString.ago.total.months, 1);
            checkDays(checkDateString, daysInMonth)
        })
    });

    describe('Check date for three MONTHS ago', () => {
        it('Should return numbers for three months ago', () => {
            const monthAgoDate = new Date();
            monthAgoDate.setMonth(monthAgoDate.getMonth() -3);
            checkDateString = dateString(monthAgoDate);

            assert.equal(checkDateString.ago.total.years, 0);
            assert.equal(checkDateString.ago.total.months, 3);
            // checkDays(checkDateString, daysInMonth * 3)
        })
    });

    describe('Check date for one YEAR ago', () => {
        it('Should return numbers for one year ago', () => {
            const yearAgoDate = new Date();
            yearAgoDate.setFullYear(yearAgoDate.getFullYear() -1);
            checkDateString = dateString(yearAgoDate);

            assert.equal(checkDateString.ago.total.years, 1);
            assert.equal(checkDateString.ago.total.months, 12);
            checkDays(checkDateString, 365)
            console.log(checkDateString);
        })
    });
})