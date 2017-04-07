import { ControlValueAccessor } from "@angular/forms";
import { Moment } from "moment";
import { OnChangeHandler, OnTouchedHandler } from "./common";
export declare type TimeSelectorMode = "time" | "hour" | "minute";
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
