import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Moment } from "moment";

import { decade } from "../dateUtils";

import { AbstractSelector } from "./abstractSelector";


@Component({
    selector: "decade-selector",
    styleUrls: ["../datepicker.css"],
    template: `
        <div class="date-set">
            <period-switch [period]="formatCentury()"
                           (prev)="prev()"
                           (next)="next()"
                           (modeChange)="modeChanged.emit($event)">
            </period-switch>
            <ul class="date-set__dates">
                <li *ngFor="let decade of decades()"
                    [ngClass]="
                {
                     'date-set__date': true, 
                     'selected': isDecadeSelected(decade) 
                }"
                    (mousedown)="dateSelected.emit(decade); $event.preventDefault(); $event.stopPropagation();">
                    {{ formatDecade(decade) }}
                </li>
            </ul>
        </div>
    `
})
export class DecadeSelector extends AbstractSelector {
    @Input()
    public date: Moment;
    @Output()
    public dateChange: EventEmitter<Moment> = new EventEmitter<Moment>();
    @Output()
    public dateSelected: EventEmitter<Moment> = new EventEmitter<Moment>();
    @Output()
    public modeChanged: EventEmitter<any> = new EventEmitter<any>();

    public prev(): void {
        this.value = this.value.subtract(100, "year");
    }

    public next(): void {
        this.value = this.value.add(100, "year");
    }

    public formatCentury(): string {
        const startYear = this.value.year() - this.value.year() % 100;
        const endYear = startYear + 99;

        return `${startYear}-${endYear}`;
    }

    public decades(): Moment[] {
        const startYear = this.value.year() - this.value.year() % 100;
        const start = this.value.year(startYear);
        const result: Moment[] = [];

        for (let year = 0; year < 100; year = year + 10) {
            result.push(start.clone().add(year, "year"));
        }

        return result;
    }

    public isDecadeSelected(value: Moment): boolean {
        const [start, end] = decade(value);
        return this.value.year() >= start.year() && this.value.year() <= end.year();
    }
}
