
window.onload = function() {
    'use strict';
    let ActiveYear;
    let ActiveMonth;

    function MonthName(month) {
        return [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ] [month-1];
    }

    function IsLeapYear(year) {
        return (year % 400 === 0) || ((year % 100 !== 0) && (year % 4 === 0));
    }

    function DaysInMonth(year, month) {
        let ndays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] [month-1];
        if (month === 2 && IsLeapYear(year)) ++ndays;
        return ndays;
    }

    function UpdateDisplay() {
        const headerRow = document.getElementById('CalendarMonthYear');
        headerRow.innerText = `${MonthName(ActiveMonth)} ${ActiveYear}`;
        const ndays = DaysInMonth(ActiveYear, ActiveMonth);
        let dow = (new Date(ActiveYear, ActiveMonth-1, 1)).getDay();    // day of week 0..6
        let row = 0;
        let visible = {};
        for (let d=1; d <= ndays; ++d) {
            const id = `CalendarDay${row}${dow}`;
            visible[id] = true;
            const cell = document.getElementById(id);
            cell.className = (dow===0 || dow===6) ? 'Weekend' : 'Weekday';
            cell.innerText = d.toFixed(0);
            if (dow === 6) {
                ++row;
                dow = 0;
            } else {
                ++dow;
            }
        }
        for (row=0; row < 6; ++row) {
            for (dow=0; dow < 7; ++dow) {
                const id = `CalendarDay${row}${dow}`;
                if (!visible[id]) {
                    const cell = document.getElementById(id);
                    cell.className = 'Placeholder';
                }
            }
        }
    }

    function Init() {
        const now = new Date();
        ActiveYear = now.getFullYear();
        ActiveMonth = 1 + now.getMonth();
        UpdateDisplay();
    }

    Init();
}
