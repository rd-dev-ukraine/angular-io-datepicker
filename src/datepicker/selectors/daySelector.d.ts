import { EventEmitter } from "@angular/core";
import { Moment } from "moment";
import { AbstractSelector } from "./abstractSelector";
export declare class DaySelector extends AbstractSelector {
    date: Moment;
    dateChange: EventEmitter<Moment>;
    dateSelected: EventEmitter<Moment>;
    modeChanged: EventEmitter<any>;
    getDaysOfWeek(): string[];
    calendar(): Moment[];
    prev(): void;
    next(): void;
    isCurrentMonth(date: Moment): boolean;
}
