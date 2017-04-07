import { Moment } from "moment";
export declare function areDatesEqual(d1: Moment, d2: Moment): boolean;
/**
 * Array of days belongs to the month of the specified date
 * including previous and next month days which are on the same week as first and last month days.
 */
export declare function monthCalendar(date: Moment): Moment[];
/**
 * Gets array of localized days of week.
 */
export declare function daysOfWeek(): string[];
export declare function decade(date: Moment): Moment[];
