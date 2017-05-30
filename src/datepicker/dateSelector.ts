import { ControlValueAccessor } from "@angular/forms";
import { Component, Input } from "@angular/core";
import { Moment } from "moment";

import { ControlValueAccessorProviderFactory, local, OnChangeHandler } from "./common";


export type DateSelectorMode = "day" | "month" | "year" | "decade";


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
export class DateSelectorComponent implements ControlValueAccessor {
    @Input()
    public displayDateMode: "day" | "month" | "year";

    public mode: DateSelectorMode;
    public displayDate: Moment = local();

    public ngOnChanges(changes: any) {
        if (changes.displayDateMode) {
            this.mode = this.displayDateMode;
        }
    }

    get selectedDate(): Moment {
        if (!this._selectedDate) {
            return null;
        }

        return this._selectedDate.clone();
    }

    set selectedDate(value: Moment) {
        if (value && value.isValid()) {
            this._selectedDate = value.clone();
            this.displayDate = value.clone();

            if (this._onChange) {
                this._onChange(this.selectedDate.clone());
            }
        }
    }

    public writeValue(val: any): void {
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

    public registerOnTouched(fn: Function): void {
        this._onTouched = fn;
    }

    private _selectedDate: Moment;
    private _onChange: OnChangeHandler;
    private _onTouched: Function;
}
