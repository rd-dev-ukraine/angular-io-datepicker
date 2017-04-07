import { EventEmitter } from "@angular/core";
import { Moment } from "moment";

import { local } from "../common";
import { areDatesEqual, decade } from "../dateUtils";

export abstract class AbstractSelector {
    public date: Moment;
    public dateChange: EventEmitter<Moment> = new EventEmitter<Moment>();
    public dateSelected: EventEmitter<Moment> = new EventEmitter<Moment>();
    public modeChanged: EventEmitter<any> = new EventEmitter<any>();

    /**
     * Returns cloned not-null selected value.
     */
    public get value(): Moment {
        return (this.date || local()).clone();
    }

    public set value(val: Moment) {
        this.dateChange.emit(val ? val.clone() : null);
    }

    public isSelected(date: Moment): boolean {
        if (!date) {
            throw new Error("Date is required.");
        }

        if (!this.date) {
            return false;
        }

        return areDatesEqual(this.value, date);
    }

    public formatDecade(value: Moment): string {
        const [start, end] = decade(value);

        return `${start.format("YYYY")}-${end.format("YYYY")}`;
    }
}
