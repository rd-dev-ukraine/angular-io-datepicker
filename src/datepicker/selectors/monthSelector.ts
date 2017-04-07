import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Moment } from "moment";

import { AbstractSelector } from "./abstractSelector";


@Component({
    selector: "month-selector",
    styleUrls: ["../datepicker.css"],
    template: `
        <div class="date-set">
            <period-switch [period]="date?.format('YYYY')"
                           (prev)="prev()"
                           (next)="next()"
                           (modeChange)="modeChanged.emit($event)">
            </period-switch>
            <ul class="date-set__dates">
                <li *ngFor="let month of monthes()"
                    [ngClass]="
                {
                     'date-set__date': true, 
                     'selected': isSelected(month) 
                }"
                    (mousedown)="dateSelected.emit(month); $event.preventDefault(); $event.stopPropagation();">
                    {{ month.format("MMMM") }}
                </li>
            </ul>
        </div>
    `
})
export class MonthSelector extends AbstractSelector {
    @Input()
    public date: Moment;
    @Output()
    public dateChange: EventEmitter<Moment>;
    @Output()
    public dateSelected: EventEmitter<Moment>;
    @Output()
    public modeChanged: EventEmitter<any>;

    prev(): void {
        this.value = this.value.subtract(1, "year");
    }

    next(): void {
        this.value = this.value.add(1, "year");
    }

    public monthes(): Moment[] {
        const result: Moment[] = [];

        for (let monthNum = 0; monthNum < 12; monthNum++) {
            result.push(this.value.month(monthNum));
        }

        return result;
    }
}
