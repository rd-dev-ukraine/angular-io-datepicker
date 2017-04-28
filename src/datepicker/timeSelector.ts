import { ControlValueAccessor } from "@angular/forms";
import { Component } from "@angular/core";
import { Moment } from "moment";

import { ControlValueAccessorProviderFactory, local, OnChangeHandler, OnTouchedHandler } from "./common";


export type TimeSelectorMode = "time" | "hour" | "minute";

@Component({
    selector: "time-selector",
    providers: [ControlValueAccessorProviderFactory(TimeSelector)],
    template: `
        <time-component-selector *ngIf=" mode === 'time' "
                                 [(date)]="selectedDate"
                                 (selectHour)=" mode = 'hour' "
                                 (selectMinute)=" mode= 'minute' ">
        </time-component-selector>
        <hour-selector *ngIf=" mode === 'hour' "
                       [(date)]="selectedDate">
        </hour-selector>
        <minute-selector *ngIf=" mode === 'minute' "
                         [(date)]="selectedDate">
        </minute-selector>
    `
})
export class TimeSelector implements ControlValueAccessor {
    private _onChange: OnChangeHandler;
    private _onTouched: OnTouchedHandler;
    private _selectedDate: Moment;

    public displayDate: Moment = local();
    public mode: TimeSelectorMode = "time";

    public get selectedDate(): Moment {
        return !this._selectedDate ? null : this._selectedDate.clone();

    }

    public set selectedDate(value: Moment) {
        if (value && value.isValid()) {
            this._selectedDate = value.clone();
            this.displayDate = value.clone();

            this._onChange && this._onChange(this.selectedDate.clone());
        }

        this.mode = "time";
    }

    public writeValue(val: string): void {
        if (val === null || val === undefined) {
            this._selectedDate = null;
        } else {
            let parsed = local(val);

            if (!parsed.isValid()) {
                parsed = null;
            }

            this._selectedDate = parsed;
        }

        this.displayDate = this.selectedDate || local();
    }

    public registerOnChange(fn: OnChangeHandler): void {
        this._onChange = fn;
    }

    public registerOnTouched(fn: OnTouchedHandler): void {
        this._onTouched = fn;
    }
}
