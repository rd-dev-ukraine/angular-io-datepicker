import { EventEmitter } from "@angular/core";
import { Moment } from "moment";
import { AbstractSelector } from "./abstractSelector";
export declare class HourSelector extends AbstractSelector {
    date: Moment;
    isMeridiem: boolean;
    dateChange: EventEmitter<Moment>;
    dateSelected: EventEmitter<Moment>;
    modeChanged: EventEmitter<any>;
    hours(): Moment[];
    isCurrentHour(date: Moment): boolean;
}
