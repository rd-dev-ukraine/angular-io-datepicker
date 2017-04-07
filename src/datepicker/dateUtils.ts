import { Moment, utc } from "moment";


export function areDatesEqual(d1: Moment, d2: Moment): boolean {
    if (!d1 || !d1.isValid()) {
        throw new Error("First date is not valid.");
    }
    if (!d2 || !d2.isValid()) {
        throw new Error("Second date is not valid.");
    }

    return d1.year() === d2.year() &&
        d1.dayOfYear() === d2.dayOfYear();
}

/**
 * Array of days belongs to the month of the specified date
 * including previous and next month days which are on the same week as first and last month days.
 */
export function monthCalendar(date: Moment): Moment[] {
    const start = date.clone().startOf("month").startOf("week").startOf("day");
    const end = date.clone().endOf("month").endOf("week").startOf("day");


    const result: Moment[] = [];

    let current = start.weekday(0).subtract(1, "d");

    while (true) {
        current = current.clone().add(1, "d");
        result.push(current);

        if (areDatesEqual(current, end)) {
            break;
        }
    }

    return result;
}

/**
 * Gets array of localized days of week.
 */
export function daysOfWeek(): string[] {
    const result: string[] = [];

    for (let weekday = 0; weekday < 7; weekday++) {
        result.push(utc().weekday(weekday).format("dd"));
    }

    return result;
}

export function decade(date: Moment): Moment[] {
    if (!date || !date.isValid()) {
        throw new Error("Date is not valid");
    }

    const year = date.year();
    const startYear = year - year % 10;
    const endYear = startYear + 9;

    return [
        date.clone().year(startYear),
        date.clone().year(endYear)
    ];
}
