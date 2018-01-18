import { ControlValueAccessor } from "@angular/forms";
import { EventEmitter } from "@angular/core";
import { Moment } from "moment";
export declare class DatePickerPanel implements ControlValueAccessor {
    mode: "date" | "datetime" | "time";
    displayDateMode: "day" | "month" | "year";
    isMeridiem: boolean;
    dateChange: EventEmitter<Moment>;
    dateSelected: EventEmitter<Moment>;
    modeChanged: EventEmitter<any>;
    private _dateValue;
    private _timeValue;
    private _onChange;
    readonly dateSelectorVisible: boolean;
    readonly timeSelectorVisible: boolean;
    date: Date;
    time: Date;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    private updateControls(value);
    private pushChangedValue();
}
