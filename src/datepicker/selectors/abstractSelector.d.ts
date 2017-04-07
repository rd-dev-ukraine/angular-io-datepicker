import { EventEmitter } from "@angular/core";
import { Moment } from "moment";
export declare abstract class AbstractSelector {
    date: Moment;
    dateChange: EventEmitter<Moment>;
    dateSelected: EventEmitter<Moment>;
    modeChanged: EventEmitter<any>;
    /**
     * Returns cloned not-null selected value.
     */
    value: Moment;
    isSelected(date: Moment): boolean;
    formatDecade(value: Moment): string;
}
