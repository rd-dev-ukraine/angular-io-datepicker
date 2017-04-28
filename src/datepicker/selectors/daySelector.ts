import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Moment } from "moment";

import { daysOfWeek, monthCalendar } from "../dateUtils";

import { AbstractSelector } from "./abstractSelector";


@Component({
    selector: "day-selector",
    styles: [
        `.day-selector.hidden{display:none}.day-selector__days-of-week{display:flex;flex-direction:row;margin:0;padding:0;list-style-type:none;background-color:#eee;flex-wrap:nowrap;justify-content:space-between;align-items:stretch}.day-selector__day-of-week{font-weight:700;flex-grow:1;flex-shrink:1}.day-selector__days-of-month{display:flex;flex-direction:row;margin:0;padding:0;list-style-type:none;flex-wrap:wrap;justify-content:space-between;align-items:stretch}.day-selector__day-of-month{cursor:pointer;flex-grow:1;flex-shrink:0;flex-basis:14%}.day-selector__day-of-month.selected{background:#eee}.day-selector__day-of-month.out-of-month{color:#ccc}`
    ],
    template: `
        <div class="day-selector">
            <period-switch [period]="date?.format('MMMM YYYY')"
                           (prev)="prev()"
                           (next)="next()"
                           (modeChange)="modeChanged.emit($event)">
            </period-switch>
            <ul class="day-selector__days-of-week">
                <li *ngFor="let dow of getDaysOfWeek()"
                    class="day-selector__day-of-week">
                    {{dow}}
                </li>
            </ul>
            <ul class="day-selector__days-of-month">
                <li *ngFor="let date of calendar()"
                    [ngClass]="{ 
                    selected: isSelected(date), 
                    'current-month': isCurrentMonth(date), 
                    'out-of-month': !isCurrentMonth(date), 
                    'day-selector__day-of-month': true  
                }"
                    (mousedown)="dateSelected.emit(date); $event.preventDefault(); $event.stopPropagation();">
                    {{date.format("D")}}
                </li>
            </ul>
        </div>`
})
export class DaySelector extends AbstractSelector {
    @Input()
    public date: Moment;
    @Output()
    public dateChange: EventEmitter<Moment>;
    @Output()
    public dateSelected: EventEmitter<Moment>;
    @Output()
    public modeChanged: EventEmitter<any>;

    public getDaysOfWeek(): string[] {
        return daysOfWeek();
    }

    public calendar(): Moment[] {
        return monthCalendar(this.value);
    }

    public prev(): void {
        this.value = this.value.subtract(1, "month");
    }

    public next(): void {
        this.value = this.value.add(1, "month");
    }

    public isCurrentMonth(date: Moment): boolean {
        if (!date) {
            throw new Error("Date is required.");
        }

        return this.value.year() === date.year() && this.value.month() === date.month();
    }
}
