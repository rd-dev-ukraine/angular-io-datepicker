import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Moment } from "moment";

import { AbstractSelector } from "./abstractSelector";


@Component({
    selector: "hour-selector",
    styleUrls: ["../datepicker.css"],
    template: `
        <div class="date-set">
            <ul class="date-set__dates">
                <li *ngFor="let hour of hours()"
                    [ngClass]="
                {
                     'date-set__date': true, 
                     'selected': isCurrentHour(hour) 
                }"
                    (mousedown)="isCurrentHour(hour) ? hour : dateChange.emit(hour); $event.preventDefault(); $event.stopPropagation();">
                    {{ hour.format("hh") }}
                </li>
            </ul>
        </div>
    `
})
export class HourSelector extends AbstractSelector {
    @Input()
    public date: Moment;
    @Output()
    public dateChange: EventEmitter<Moment>;
    @Output()
    public dateSelected: EventEmitter<Moment>;
    @Output()
    public modeChanged: EventEmitter<any>;

    public hours(): Moment[] {
        const startDate = this.value;
        const result: Moment[] = [];

        startDate.hour(startDate.hour() < 12 ? 0 : 12);

        for (let i = 1; i < 13; i++) {
            result.push(startDate.clone().add(i, "hour"));
        }

        return result;
    }

    public isCurrentHour(date: Moment): boolean {
        return date && this.value && this.value.hour() === date.hour();
    }
}
