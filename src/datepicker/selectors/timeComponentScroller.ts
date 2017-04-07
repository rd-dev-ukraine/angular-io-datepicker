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
    @Input()
    public value: Moment;
    @Input()
    public format: string;
    @Output()
    public selectValue: EventEmitter<any> = new EventEmitter<any>();
    @Output()
    public up: EventEmitter<any> = new EventEmitter<any>();
    @Output()
    public down: EventEmitter<any> = new EventEmitter<any>();
}