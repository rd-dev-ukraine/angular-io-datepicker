import { EventEmitter, Component } from "@angular/core";
import { Moment } from "moment";

@Component({
    selector: "time-component-selector",
    styles: [
        `.time-component-selector__am-pm{cursor:pointer}.time-component-selector{font-size:2em;display:flex;flex-flow:row nowrap;align-items:center}.time-component-selector__component{padding-right:.5em}`
    ],
    template: `
        <div class="time-component-selector">
            <time-component-scroller class="time-component-selector__component"
                                     [value]="date"
                                     [format]=" 'hh' "
                                     (up)="plusHour()"
                                     (down)="minusHour()"
                                     (selectValue)="selectHour.emit($event)">
            </time-component-scroller>
            <time-component-scroller class="time-component-selector__component"
                                     [value]="date"
                                     [format]=" 'mm' "
                                     (up)="plusMinute()"
                                     (down)="minusMinute()"
                                     (selectValue)="selectMinute.emit($event)">
            </time-component-scroller>
            <span class="time-component-selector__am-pm"
                  (click)="togglePmAm()">
                {{ date?.format("A") }}
            </span>
        </div>
    `
})
export declare class TimeComponentSelector {
    date: Moment;
    dateChange: EventEmitter<Moment>;
    selectHour: EventEmitter<any>;
    selectMinute: EventEmitter<any>;
    plusHour(): void;
    minusHour(): void;
    plusMinute(): void;
    minusMinute(): void;
    togglePmAm(): void;
}
