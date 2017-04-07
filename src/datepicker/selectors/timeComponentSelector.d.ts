import { EventEmitter } from "@angular/core";
import { Moment } from "moment";
export declare class TimeComponentSelector {
    date: Moment;
    dateChange: EventEmitter<Moment>;
    selectHour: EventEmitter<any>;
    selectMinute: EventEmitter<any>;
    plusHour(): void;
    minusHour(): void;
    plusMinute(): void;
    minusMinute(): void;
    togglePmAm(): void;
}
