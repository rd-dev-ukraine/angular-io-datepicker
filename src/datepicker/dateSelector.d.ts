import { ControlValueAccessor } from "@angular/forms";
import { Moment } from "moment";
import { ControlValueAccessorProviderFactory, OnChangeHandler } from "./common";
import { Component } from "@angular/core";
export declare type DateSelectorMode = "day" | "month" | "year" | "decade";

@Component({
    selector: "date-selector",
    providers: [ControlValueAccessorProviderFactory(DateSelectorComponent)],
    styles: [
        `.date-selector{line-height:2em;text-align:center;vertical-align:middle}`
    ],
    template: `
        <div class="date-selector">
            <day-selector [hidden]="mode !== 'day'"
                          [(date)]="displayDate"
                          (dateSelected)="selectedDate=$event"
                          (modeChanged)="mode='month'">
            </day-selector>
            <month-selector [hidden]="mode !== 'month'"
                            [(date)]="displayDate"
                            (dateSelected)="selectedDate=$event; displayDateMode !== 'month' && mode = 'day'; "
                            (modeChanged)="mode='year'">
            </month-selector>
            <year-selector [hidden]="mode !== 'year'"
                           [(date)]="displayDate"
                           (dateSelected)="selectedDate=$event; displayDateMode !== 'year' && mode = 'month'; "
                           (modeChanged)=" mode='decade' ">
            </year-selector>
            <decade-selector [hidden]="mode !== 'decade'"
                             [(date)]="displayDate"
                             (dateSelected)="selectedDate=$event; mode = 'year'; ">
            </decade-selector>
        </div>
    `
})
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
