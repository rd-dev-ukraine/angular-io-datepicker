import { EventEmitter } from "@angular/core";
import { Moment } from "moment";
import { AbstractSelector } from "./abstractSelector";
export declare class MinuteSelector extends AbstractSelector {
    date: Moment;
    dateChange: EventEmitter<Moment>;
    dateSelected: EventEmitter<Moment>;
    modeChanged: EventEmitter<any>;
    minutes(): Moment[];
}
