import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Moment } from "moment";


@Component({
    selector: "time-component-scroller",
    styleUrls: ["../datepicker.css"],
    template: `
    <div class="time-component-scroller">
        <span class="time-component-scroller__arrow up datepicker__buttonIcon datepicker__buttonIcon-arrow-up"
              (click)="up.emit($event)">
        </span>
        <span class="time-component-scroller__value"
             (click)="selectValue.emit($event)">
            {{ value?.format(format) }}
        </span>
        <span class="time-component-scroller__arrow down datepicker__buttonIcon datepicker__buttonIcon-arrow-down"
              (click)="down.emit($event)">
        </span>
    </div>
    `
})
export class TimeComponentScroller {
    @Input() value: Moment;
    @Input() format: string;
    @Output() selectValue: EventEmitter<any> = new EventEmitter<any>();
    @Output() up: EventEmitter<any> = new EventEmitter<any>();
    @Output() down: EventEmitter<any> = new EventEmitter<any>();
}


@Component({
    selector: "time-component-selector",
    styleUrls: ["../datepicker.css"],
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
    @Input() date: Moment;
    @Output() dateChange: EventEmitter<Moment> = new EventEmitter<Moment>();
    @Output() selectHour: EventEmitter<any> = new EventEmitter<any>();
    @Output() selectMinute: EventEmitter<any> = new EventEmitter<any>();

    plusHour(): void {
        this.dateChange.emit(this.date.clone().add(1, "hour"));
    }

    minusHour(): void {
        this.dateChange.emit(this.date.clone().subtract(1, "hour"));
    }

    plusMinute(): void {
        this.dateChange.emit(this.date.clone().add(1, "minute"));
    }

    minusMinute(): void {
        this.dateChange.emit(this.date.clone().subtract(1, "minute"));
    }

    togglePmAm(): void {
        if (this.date.hour() < 12) {
            this.dateChange.emit(this.date.clone().add(12, "hour"));
        } else {
            this.dateChange.emit(this.date.clone().subtract(12, "hour"));
        }
    }
}
