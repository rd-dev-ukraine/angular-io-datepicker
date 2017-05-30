import { ControlValueAccessor } from "@angular/forms";
import { EventEmitter, Component } from "@angular/core";
import { Moment } from "moment";
import { ControlValueAccessorProviderFactory } from "./common";

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
export declare class DatePickerPanel implements ControlValueAccessor {
    mode: "date" | "datetime" | "time";
    displayDateMode: "day" | "month" | "year";
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
