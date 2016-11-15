import { EventEmitter, Input, Output } from "@angular/core";

import { Moment } from "moment";

import { local } from "../common";
import { areDatesEqual, decade } from "../dateUtils";


export abstract class AbstractSelector {
    @Input() date: Moment;
    @Output() dateChange: EventEmitter<Moment> = new EventEmitter<Moment>();

    @Output() dateSelected: EventEmitter<Moment> = new EventEmitter<Moment>();
    @Output() modeChanged: EventEmitter<any> = new EventEmitter<any>();

    /**
     * Returns cloned not-null selected value. 
     */
    protected get value(): Moment {
        return (this.date || local()).clone();
    }

    protected set value(val: Moment) {
        this.dateChange.emit(val ? val.clone() : null);
    }

    protected isSelected(date: Moment): boolean {
        if (!date) {
            throw new Error("Date is required.");
        }

        if (!this.date) {
            return false;
        }

        const eq = areDatesEqual(this.value, date);
        return eq;
    }

    protected formatDecade(value: Moment): string {
        const [start, end] = decade(value);

        return `${start.format("YYYY")}-${end.format("YYYY")}`;
    }
}
