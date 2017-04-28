import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Moment } from "moment";

import { AbstractSelector } from "./abstractSelector";


@Component({
    selector: "hour-selector",
    styles: [
        `.date-set{line-height:2em;text-align:center;vertical-align:middle}.date-set.hidden{display:none}.date-set__dates{display:flex;flex-direction:row;margin:0;padding:0;list-style-type:none;flex-wrap:wrap;justify-content:space-between;align-items:stretch}.date-set__date{cursor:pointer;flex-grow:1;flex-shrink:0;flex-basis:33%}.date-set__date.selected{background:#eee}`
    ],
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
