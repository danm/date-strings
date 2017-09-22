var dateString = require('../index.js');
var assert = require('chai').assert;


/**
 * Check days, hours, minutes and seconds
 * 
 * @param {dateDtring} checkDateString 
 * @param int days 
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
        monthAgoDate.setMonth(monthAgoDate.getMonth() -1);
        const checkDateString = dateString(monthAgoDate);
        // console.log(checkDateString);
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
        monthAgoDate.setMonth(monthAgoDate.getMonth() - 4);
        const checkDateString = dateString(monthAgoDate);
        console.log(checkDateString);
        it('for filtered results', () => {
            assert.equal(checkDateString.ago.filtered.years, 0);
            assert.equal(checkDateString.ago.filtered.months,4);
            assert.equal(checkDateString.ago.filtered.weeks, 0);
            assert.equal(checkDateString.ago.filtered.days, 0);
            assert.equal(checkDateString.ago.filtered.hours, 0);
            assert.equal(checkDateString.ago.filtered.minutes, 0);
            assert.equal(checkDateString.ago.filtered.seconds, 0);
        });

        // it('Check total results', () => {
        //     assert.equal(checkDateString.ago.total.years, 0);
        //     assert.equal(checkDateString.ago.total.months, 3);
        //     checkTotalDays(checkDateString, 90)
        // });

        // it('Check string results', () => {
        //     assert.equal(checkDateString.ago.strings.long, '3 months');
        //     assert.equal(checkDateString.ago.strings.short, '3 months');
        // });
        
    });
    
    /*
    describe('Check date for one YEAR ago', () => {
        it('Should return numbers for one year ago', () => {
            const yearAgoDate = new Date();
            yearAgoDate.setFullYear(yearAgoDate.getFullYear() -1);
            checkDateString = dateString(yearAgoDate);

            assert.equal(checkDateString.ago.total.years, 1);
            assert.equal(checkDateString.ago.total.months, 12);
            checkTotalDays(checkDateString, 365);
        })
    });
    */
});