import { Component, EventEmitter, Input, Output } from "@angular/core";
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
export class TimeComponentSelector {
    @Input()
    public date: Moment;
    @Output()
    public dateChange: EventEmitter<Moment> = new EventEmitter<Moment>();
    @Output()
    public selectHour: EventEmitter<any> = new EventEmitter<any>();
    @Output()
    public selectMinute: EventEmitter<any> = new EventEmitter<any>();

    public plusHour(): void {
        this.dateChange.emit(this.date.clone().add(1, "hour"));
    }

    public minusHour(): void {
        this.dateChange.emit(this.date.clone().subtract(1, "hour"));
    }

    public plusMinute(): void {
        this.dateChange.emit(this.date.clone().add(1, "minute"));
    }

    public minusMinute(): void {
        this.dateChange.emit(this.date.clone().subtract(1, "minute"));
    }

    public togglePmAm(): void {
        if (this.date.hour() < 12) {
            this.dateChange.emit(this.date.clone().add(12, "hour"));
        } else {
            this.dateChange.emit(this.date.clone().subtract(12, "hour"));
        }
    }
}
