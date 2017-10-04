var dateString = require('../src/index.js');
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
            checkTotalDays(checkDateString, 1);
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

        it('for total results', () => {
            assert.equal(checkDateString.ago.total.years, 0);
            assert.equal(checkDateString.ago.total.months, 0);
            checkTotalDays(checkDateString, 7)
        });

        it('for string results', () => {
            assert.equal(checkDateString.ago.strings.long, '1 week');
            assert.equal(checkDateString.ago.strings.short, '1 week');
        });
    });

    describe('Check date for one MONTH ago', () => {
        const monthAgoDate = new Date();
        monthAgoDate.setMonth(monthAgoDate.getMonth() - 1);
        const checkDateString = dateString(monthAgoDate);

        // how many days in a month
        const start = new Date(monthAgoDate);
        start.setDate(1);
        const end = new Date(start);
        end.setMonth(end.getMonth() + 1);
        end.setDate(end.getDate() - 1);
        const daysInMonth = end.getDate();

        it('for filtered results', () => {
            assert.equal(checkDateString.ago.filtered.years, 0);
            assert.equal(checkDateString.ago.filtered.months, 1);
            assert.equal(checkDateString.ago.filtered.weeks, 0);
            assert.equal(checkDateString.ago.filtered.days, 0);
            assert.equal(checkDateString.ago.filtered.hours, 0);
            assert.equal(checkDateString.ago.filtered.minutes, 0);
            assert.equal(checkDateString.ago.filtered.seconds, 0);
        });

        it('for total results', () => {
            assert.equal(checkDateString.ago.total.years, 0);
            assert.equal(checkDateString.ago.total.months, 1);
            checkTotalDays(checkDateString, daysInMonth);
        });

        it('for string results', () => {
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

        it('for total results', () => {
            assert.equal(checkDateString.ago.total.years, 0);
            assert.equal(checkDateString.ago.total.months, 3);
        });

        it('for string results', () => {
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

        it('for total results', () => {
            assert.equal(checkDateString.ago.total.years, 1);
            assert.equal(checkDateString.ago.total.months, 12);
        });

        it('for string results', () => {
            assert.equal(checkDateString.ago.strings.long, '1 year');
            assert.equal(checkDateString.ago.strings.short, '1 year');
        });
    });

    describe('Check date for 6 MONTHS 4 DAYS ago', () => {
        const testDate = new Date();
        testDate.setMonth(testDate.getMonth() - 6);
        testDate.setDate(testDate.getDate() - 4);
        const checkDateString = dateString(testDate);
        
        it('for filtered results', () => {
            assert.equal(checkDateString.ago.filtered.years, 0);
            assert.equal(checkDateString.ago.filtered.months, 6);
            assert.equal(checkDateString.ago.filtered.weeks, 0);
            assert.equal(checkDateString.ago.filtered.days, 4);
            assert.equal(checkDateString.ago.filtered.hours, 0);
            assert.equal(checkDateString.ago.filtered.minutes, 0);
            assert.equal(checkDateString.ago.filtered.seconds, 0);
        });

        it('for total results', () => {
            assert.equal(checkDateString.ago.total.years, 0);
            assert.equal(checkDateString.ago.total.months, 6);
        });

        it('for string results', () => {
            assert.equal(checkDateString.ago.strings.long, '6 months 4 days');
            assert.equal(checkDateString.ago.strings.short, '6 months');
        });
    });

    describe('Check date for 1 YEAR 3 MONTHS 12 DAYS ago', () => {
        const testDate = new Date();
        testDate.setFullYear(testDate.getFullYear() - 1);
        testDate.setMonth(testDate.getMonth() - 3);
        testDate.setDate(testDate.getDate() - 12);
        const checkDateString = dateString(testDate);
        it('for filtered results', () => {
            assert.equal(checkDateString.ago.filtered.years, 1);
            assert.equal(checkDateString.ago.filtered.months, 3);
            assert.equal(checkDateString.ago.filtered.weeks, 1);
            assert.equal(checkDateString.ago.filtered.days, 5);
            assert.equal(checkDateString.ago.filtered.hours, 0);
            assert.equal(checkDateString.ago.filtered.minutes, 0);
            assert.equal(checkDateString.ago.filtered.seconds, 0);
        });

        it('for total results', () => {
            assert.equal(checkDateString.ago.total.years, 1);
            assert.equal(checkDateString.ago.total.months, 15);
        });

        it('for string results', () => {
            assert.equal(checkDateString.ago.strings.long, '1 year 3 months 1 week 5 days');
            assert.equal(checkDateString.ago.strings.short, '1 year');
        });
    });

    describe('Check When' , () => {
        it('Today', () => {
            const testDate = new Date();
            const checkDateString = dateString(testDate);
            assert.include(checkDateString.when, "Today ");
        })

        it('Yesterday', () => {
            const testDate = new Date();
            testDate.setDate(testDate.getDate() - 1);
            const checkDateString = dateString(testDate);
            assert.include(checkDateString.when, "Yesterday ");
        })

        it('One week ago', () => {
            const testDate = new Date();
            testDate.setDate(testDate.getDate() - 7);
            const checkDateString = dateString(testDate);
            assert.include(checkDateString.when, testDate.getDate());
            assert.include(checkDateString.when, testDate.getHours());
            assert.include(checkDateString.when, testDate.getMinutes());
        })

        it('One month ago', () => {
            const testDate = new Date();
            testDate.setMonth(testDate.getMonth() - 1);
            const checkDateString = dateString(testDate);
            assert.include(checkDateString.when, testDate.getDate());
            assert.include(checkDateString.when, testDate.getHours());
            assert.include(checkDateString.when, testDate.getMinutes());
        })
    })
});