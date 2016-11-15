import { Component } from "@angular/core";
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
                (mousedown)="dateChange.emit(hour); $event.preventDefault(); $event.stopPropagation();">
                {{ hour.format("hh") }}
            </li>
        </ul>
    </div>
    `
})
export class HourSelector extends AbstractSelector {
    protected hours(): Moment[] {
        const startDate = this.value;
        startDate.hour(startDate.hour() < 12 ? 0 : 12);

        const result: Moment[] = [];
        for (let i = 0; i < 12; i++) {
            result.push(startDate.clone().add(i, "hour"));
        }

        return result;
    }

    protected isCurrentHour(date: Moment): boolean {
        return date && this.value && this.value.hour() === date.hour();
    }
}
