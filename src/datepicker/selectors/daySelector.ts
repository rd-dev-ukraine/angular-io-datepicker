import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Moment } from "moment";

import { daysOfWeek, monthCalendar } from "../dateUtils";

import { AbstractSelector } from "./abstractSelector";


@Component({
    selector: "day-selector",
    styleUrls: ["../datepicker.css"],
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
    @Input() date: Moment;
    @Output() dateChange: EventEmitter<Moment>;

    @Output() dateSelected: EventEmitter<Moment>;
    @Output() modeChanged: EventEmitter<any>;

   getDaysOfWeek(): string[] {
        return daysOfWeek();
    }

    calendar(): Moment[] {
        return monthCalendar(this.value);
    }

    prev(): void {
        this.value = this.value.subtract(1, "month");
    }

    next(): void {
        this.value = this.value.add(1, "month");
    }

    protected isCurrentMonth(date: Moment): boolean {
        if (!date) {
            throw new Error("Date is required.");
        }

        return this.value.year() === date.year() && this.value.month() === date.month();
    }
}
