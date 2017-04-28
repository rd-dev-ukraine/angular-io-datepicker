import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Moment } from "moment";

import { decade } from "../dateUtils";

import { AbstractSelector } from "./abstractSelector";


@Component({
    selector: "year-selector",
    styles: [
        `.date-set{line-height:2em;text-align:center;vertical-align:middle}.date-set.hidden{display:none}.date-set__dates{display:flex;flex-direction:row;margin:0;padding:0;list-style-type:none;flex-wrap:wrap;justify-content:space-between;align-items:stretch}.date-set__date{cursor:pointer;flex-grow:1;flex-shrink:0;flex-basis:33%}.date-set__date.selected{background:#eee}`
    ],
    template: `
        <div class="date-set">
            <period-switch [period]="formatDecade(date)"
                           (prev)="prev()"
                           (next)="next()"
                           (modeChange)="modeChanged.emit($event)">
            </period-switch>
            <ul class="date-set__dates">
                <li *ngFor="let year of years()"
                    [ngClass]="
                {
                     'date-set__date': true, 
                     'selected': isSelected(year) 
                }"
                    (mousedown)="dateSelected.emit(year); $event.preventDefault(); $event.stopPropagation();">
                    {{ year.format("YYYY") }}
                </li>
            </ul>
        </div>
    `
})
export class YearSelector extends AbstractSelector {
    @Input()
    public date: Moment;
    @Output()
    public dateChange: EventEmitter<Moment>;
    @Output()
    public dateSelected: EventEmitter<Moment>;
    @Output()
    public modeChanged: EventEmitter<any>;

    public prev(): void {
        this.value = this.value.subtract(10, "year");
    }

    public next(): void {
        this.value = this.value.add(10, "year");
    }

    public years(): Moment[] {
        const [start] = decade(this.value);
        const result: Moment[] = [];

        for (let year = 0; year < 10; year++) {
            result.push(start.clone().add(year, "year"));
        }

        return result;
    }
}
