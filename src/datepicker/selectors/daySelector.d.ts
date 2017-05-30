import { EventEmitter, Component } from "@angular/core";
import { Moment } from "moment";
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
export declare class DaySelector extends AbstractSelector {
    date: Moment;
    dateChange: EventEmitter<Moment>;
    dateSelected: EventEmitter<Moment>;
    modeChanged: EventEmitter<any>;
    getDaysOfWeek(): string[];
    calendar(): Moment[];
    prev(): void;
    next(): void;
    isCurrentMonth(date: Moment): boolean;
}
