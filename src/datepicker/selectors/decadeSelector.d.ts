import { EventEmitter, Component } from "@angular/core";
import { Moment } from "moment";
import { AbstractSelector } from "./abstractSelector";

@Component({
    selector: "decade-selector",
    styles: [
        `.date-set{line-height:2em;text-align:center;vertical-align:middle}.date-set.hidden{display:none}.date-set__dates{display:flex;flex-direction:row;margin:0;padding:0;list-style-type:none;flex-wrap:wrap;justify-content:space-between;align-items:stretch}.date-set__date{cursor:pointer;flex-grow:1;flex-shrink:0;flex-basis:33%}.date-set__date.selected{background:#eee}`
    ],
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
export declare class DecadeSelector extends AbstractSelector {
    date: Moment;
    dateChange: EventEmitter<Moment>;
    dateSelected: EventEmitter<Moment>;
    modeChanged: EventEmitter<any>;
    prev(): void;
    next(): void;
    formatCentury(): string;
    decades(): Moment[];
    isDecadeSelected(value: Moment): boolean;
}
