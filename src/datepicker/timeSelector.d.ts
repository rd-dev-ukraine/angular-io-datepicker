import { ControlValueAccessor } from "@angular/forms";
import { Moment } from "moment";
import { ControlValueAccessorProviderFactory, OnChangeHandler, OnTouchedHandler } from "./common";
import { Component } from "@angular/core";
export declare type TimeSelectorMode = "time" | "hour" | "minute";

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
export declare class TimeSelector implements ControlValueAccessor {
    private _onChange;
    private _onTouched;
    private _selectedDate;
    displayDate: Moment;
    mode: TimeSelectorMode;
    selectedDate: Moment;
    writeValue(val: string): void;
    registerOnChange(fn: OnChangeHandler): void;
    registerOnTouched(fn: OnTouchedHandler): void;
}
