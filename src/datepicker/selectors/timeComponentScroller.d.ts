import { EventEmitter } from "@angular/core";
import { Moment } from "moment";
export declare class TimeComponentScroller {
    value: Moment;
    format: string;
    selectValue: EventEmitter<any>;
    up: EventEmitter<any>;
    down: EventEmitter<any>;
}
