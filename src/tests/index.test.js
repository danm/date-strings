var dateString = require('../index.js');
var assert = require('chai').assert;


/**
 * Check days, hours, minutes and seconds
 * 
 * @param {dateString} checkDateString 
 * @param {int} days 
 */
function checkTotalDays(checkDateString, days) {
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


    describe('check date for one DAY ago', () => {
        const yesterdayDate = new Date();
        yesterdayDate.setDate(yesterdayDate.getDate() - 1);
        const checkDateString = dateString(yesterdayDate);

        it('for filtered results', () => {
            assert.equal(checkDateString.ago.filtered.years, 0);
            assert.equal(checkDateString.ago.filtered.months, 0);
            assert.equal(checkDateString.ago.filtered.weeks, 0);
            assert.equal(checkDateString.ago.filtered.days, 1);
            assert.equal(checkDateString.ago.filtered.hours, 0);
            assert.equal(checkDateString.ago.filtered.minutes, 0);
            assert.equal(checkDateString.ago.filtered.seconds, 0);
        });

        it('for total results', () => {
            assert.equal(checkDateString.ago.total.years, 0);
            assert.equal(checkDateString.ago.total.months, 0);
            checkTotalDays(checkDateString, 1)
        });

        it('for string results', () => {
            assert.equal(checkDateString.ago.strings.long, '1 day');
            assert.equal(checkDateString.ago.strings.short, '1 day');
        });
    });

    describe('check date for one WEEK ago', () => {
        const weekAgoDate = new Date();
        weekAgoDate.setDate(weekAgoDate.getDate() - 7);
        const checkDateString = dateString(weekAgoDate);

        it('for filtered results', () => {
            assert.equal(checkDateString.ago.filtered.years, 0);
            assert.equal(checkDateString.ago.filtered.months, 0);
            assert.equal(checkDateString.ago.filtered.weeks, 1);
            assert.equal(checkDateString.ago.filtered.days, 0);
            assert.equal(checkDateString.ago.filtered.hours, 0);
            assert.equal(checkDateString.ago.filtered.minutes, 0);
            assert.equal(checkDateString.ago.filtered.seconds, 0);
        });

        it('Check total results', () => {
            assert.equal(checkDateString.ago.total.years, 0);
            assert.equal(checkDateString.ago.total.months, 0);
            checkTotalDays(checkDateString, 7)
        });

        it('Check string results', () => {
            assert.equal(checkDateString.ago.strings.long, '7 days');
            assert.equal(checkDateString.ago.strings.short, '7 days');
        });
    });

    describe('Check date for one MONTH ago', () => {
        const monthAgoDate = new Date();
        monthAgoDate.setMonth(monthAgoDate.getMonth() - 1);
        const checkDateString = dateString(monthAgoDate);

        it('for filtered results', () => {
            assert.equal(checkDateString.ago.filtered.years, 0);
            assert.equal(checkDateString.ago.filtered.months, 1);
            assert.equal(checkDateString.ago.filtered.weeks, 0);
            assert.equal(checkDateString.ago.filtered.days, 0);
            assert.equal(checkDateString.ago.filtered.hours, 0);
            assert.equal(checkDateString.ago.filtered.minutes, 0);
            assert.equal(checkDateString.ago.filtered.seconds, 0);
        });

        it('Check total results', () => {
            assert.equal(checkDateString.ago.total.years, 0);
            assert.equal(checkDateString.ago.total.months, 1);
            checkTotalDays(checkDateString, 31)
        });

        it('Check string results', () => {
            assert.equal(checkDateString.ago.strings.long, '1 month');
            assert.equal(checkDateString.ago.strings.short, '1 month');
        });
    });


    describe('Check date for three MONTHS ago', () => {
        const monthAgoDate = new Date();
        monthAgoDate.setMonth(monthAgoDate.getMonth() - 3);
        const checkDateString = dateString(monthAgoDate);

        it('for filtered results', () => {
            assert.equal(checkDateString.ago.filtered.years, 0);
            assert.equal(checkDateString.ago.filtered.months, 3);
            assert.equal(checkDateString.ago.filtered.weeks, 0);
            assert.equal(checkDateString.ago.filtered.days, 0);
            assert.equal(checkDateString.ago.filtered.hours, 0);
            assert.equal(checkDateString.ago.filtered.minutes, 0);
            assert.equal(checkDateString.ago.filtered.seconds, 0);
        });

        it('Check total results', () => {
            assert.equal(checkDateString.ago.total.years, 0);
            assert.equal(checkDateString.ago.total.months, 3);
        });

        it('Check string results', () => {
            assert.equal(checkDateString.ago.strings.long, '3 months');
            assert.equal(checkDateString.ago.strings.short, '3 months');
        });
    });


    describe('Check date for one YEAR ago', () => {
        const yearAgoDate = new Date();
        yearAgoDate.setFullYear(yearAgoDate.getFullYear() - 1);
        const checkDateString = dateString(yearAgoDate);
        
        it('for filtered results', () => {
            assert.equal(checkDateString.ago.filtered.years, 1);
            assert.equal(checkDateString.ago.filtered.months, 0);
            assert.equal(checkDateString.ago.filtered.weeks, 0);
            assert.equal(checkDateString.ago.filtered.days, 0);
            assert.equal(checkDateString.ago.filtered.hours, 0);
            assert.equal(checkDateString.ago.filtered.minutes, 0);
            assert.equal(checkDateString.ago.filtered.seconds, 0);
        });

        it('Check total results', () => {
            assert.equal(checkDateString.ago.total.years, 1);
            assert.equal(checkDateString.ago.total.months, 12);
        });

        it('Check string results', () => {
            assert.equal(checkDateString.ago.strings.long, '1 year');
            assert.equal(checkDateString.ago.strings.short, '1 year');
        });
    });

    describe('Check date for 6 MONTHS 4 DAYS ago', () => {
        const testDate = new Date();
        testDate.setMonth(testDate.getMonth() - 6);
        testDate.setDate(testDate.getDate() - 4);
        const checkDateString = dateString(testDate);
        console.log(now, testDate);
        console.log(checkDateString);
        
        it('for filtered results', () => {
            assert.equal(checkDateString.ago.filtered.years, 0);
            assert.equal(checkDateString.ago.filtered.months, 6);
            assert.equal(checkDateString.ago.filtered.weeks, 0);
            assert.equal(checkDateString.ago.filtered.days, 4);
            assert.equal(checkDateString.ago.filtered.hours, 0);
            assert.equal(checkDateString.ago.filtered.minutes, 0);
            assert.equal(checkDateString.ago.filtered.seconds, 0);
        });

        it('Check total results', () => {
            assert.equal(checkDateString.ago.total.years, 0);
            assert.equal(checkDateString.ago.total.months, 6);
            checkTotalDays(checkDateString, 96)
        });

        it('Check string results', () => {
            assert.equal(checkDateString.ago.strings.long, '6 months 4 days');
            assert.equal(checkDateString.ago.strings.short, '6 months');
        });
    });

});