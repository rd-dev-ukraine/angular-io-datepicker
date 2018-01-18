import { EventEmitter } from "@angular/core";
export declare class PeriodSwitch {
    period: string;
    prev: EventEmitter<any>;
    next: EventEmitter<any>;
    modeChange: EventEmitter<any>;
}
