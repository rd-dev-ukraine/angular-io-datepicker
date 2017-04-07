import { ControlValueAccessor } from "@angular/forms";
import { Moment } from "moment";
import { OnChangeHandler } from "./common";
export declare type DateSelectorMode = "day" | "month" | "year" | "decade";
export declare class DateSelectorComponent implements ControlValueAccessor {
    mode: DateSelectorMode;
    displayDate: Moment;
    selectedDate: Moment;
    writeValue(val: any): void;
    registerOnChange(fn: OnChangeHandler): void;
    registerOnTouched(fn: Function): void;
    private _selectedDate;
    private _onChange;
    private _onTouched;
}
