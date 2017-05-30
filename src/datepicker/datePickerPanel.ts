import { ControlValueAccessor } from "@angular/forms";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Moment } from "moment";

import { ControlValueAccessorProviderFactory, local } from "./common";


@Component({
    selector: "datepicker-panel",
    providers: [ControlValueAccessorProviderFactory(DatePickerPanel)],
    template: `
        <div class="datepicker-panel">
            <date-selector *ngIf="dateSelectorVisible"
                           [displayDateMode]="displayDateMode"
                           [(ngModel)]="date">
            </date-selector>
            <time-selector *ngIf="timeSelectorVisible"
                           [(ngModel)]="time">
            </time-selector>
        </div>
    `,
    styles: [
        `.datepicker-panel{display:flex;overflow:hidden;max-width:17em;margin-top:1em;padding:1em;border:1px solid #ccc;border-radius:4px;background:#fff;flex-flow:column nowrap;justify-content:center;align-items:center}`
    ]
})
export class DatePickerPanel implements ControlValueAccessor {
    @Input("type")
    public mode: "date" | "datetime" | "time" = "date";
    @Input("displayDateMode")
    public displayDateMode: "day" | "month" | "year" = "day";
    @Output()
    public dateChange: EventEmitter<Moment> = new EventEmitter<Moment>();
    @Output()
    public dateSelected: EventEmitter<Moment> = new EventEmitter<Moment>();
    @Output()
    public modeChanged: EventEmitter<any> = new EventEmitter<any>();

    private _dateValue: Date;
    private _timeValue: Date;
    private _onChange: (value: any) => void;

    public get dateSelectorVisible(): boolean {
        return this.mode === "date" || this.mode === "datetime";
    }

    public get timeSelectorVisible(): boolean {
        return this.mode === "time" || this.mode === "datetime";
    }

    public get date(): Date {
        return this._dateValue;
    }

    public set date(value: Date) {
        this._dateValue = value;
        this.pushChangedValue();
    }

    public get time(): Date {
        return this._timeValue;
    }

    public set time(value: Date) {
        this._timeValue = value;
        this.pushChangedValue();
    }

    public writeValue(value: any): void {
        let parsedValue = local(value);
        if (!parsedValue.isValid()) {
            parsedValue = local();
        }

        this.updateControls(parsedValue);
    }

    public registerOnChange(fn: any): void {
        this._onChange = fn;
    }

    public registerOnTouched(fn: any): void {}

    private updateControls(value: Moment): void {
        this.date = value.toDate();
        this.time = value.toDate();
    }

    private pushChangedValue(): void {
        const date = local(this.date);
        const time = local(this.time);

        const result = date.clone()
            .hour(time.hour())
            .minute(time.minute())
            .second(time.second())
            .millisecond(time.millisecond());

        if (this._onChange) {
            this._onChange(result);
        }
    }
}
