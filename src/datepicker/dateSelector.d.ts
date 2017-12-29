import { ControlValueAccessor } from "@angular/forms";
import { Moment } from "moment";
import { OnChangeHandler } from "./common";
export declare type DateSelectorMode = "day" | "month" | "year" | "decade";
export declare class DateSelectorComponent implements ControlValueAccessor {
    displayDateMode: "day" | "month" | "year";
    mode: DateSelectorMode;
    displayDate: Moment;
    ngOnChanges(changes: any): void;
    selectedDate: Moment;
    writeValue(val: any): void;
    registerOnChange(fn: OnChangeHandler): void;
    registerOnTouched(fn: Function): void;
    private _selectedDate;
    private _onChange;
    private _onTouched;
}
