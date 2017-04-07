import { ControlValueAccessor } from "@angular/forms";
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Moment } from "moment";

import { ControlValueAccessorProviderFactory, DatePickerMode, local } from "./common";


@Component({
    selector: "datepicker-panel",
    providers: [ControlValueAccessorProviderFactory(DatePickerPanel)],
    template: `
    <div class="datepicker-panel">
        <date-selector *ngIf="dateSelectorVisible"
                       [(ngModel)]="date">
        </date-selector>
        <time-selector *ngIf="timeSelectorVisible"
                    [(ngModel)]="time">
        </time-selector>
    </div>
    `,
    styleUrls: ["./datepicker.css"]
})
export class DatePickerPanel implements ControlValueAccessor {
    @Input("type") mode: DatePickerMode = "date";
    @Output() dateChange: EventEmitter<Moment> = new EventEmitter<Moment>();

    @Output() dateSelected: EventEmitter<Moment> = new EventEmitter<Moment>();
    @Output() modeChanged: EventEmitter<any> = new EventEmitter<any>();

    get dateSelectorVisible(): boolean {
        return this.mode === "date" || this.mode === "datetime";
    }

    get timeSelectorVisible(): boolean {
        return this.mode === "time" || this.mode === "datetime";
    }

    get date(): Date {
        return this._dateValue;
    }

    set date(value: Date) {
        this._dateValue = value;
        this.pushChangedValue();
    }

    get time(): Date {
        return this._timeValue;
    }

    set time(value: Date) {
        this._timeValue = value;
        this.pushChangedValue();
    }

    writeValue(value: any): void {
        let parsedValue = local(value);
        if (!parsedValue.isValid()) {
            parsedValue = local();
        }

        this.updateControls(parsedValue);
    }

    registerOnChange(fn: any): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: any): void {}

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

    private _dateValue: Date;
    private _timeValue: Date;
    private _onChange: (value: any) => void;
}
