import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "period-switch",
    styleUrls: ["../datepicker.css"],
    template: `
        <div class="period-switch">
        <span class="period-switch__change datepicker__buttonIcon datepicker__buttonIcon-arrow-left"
              (click)="prev.emit($event)">
        </span>
            <span class="period-switch__period"
                  (click)="modeChange.emit($event)">
            {{ period }}
        </span>
            <span class="period-switch__change datepicker__buttonIcon datepicker__buttonIcon-arrow-right"
                  (click)="next.emit($event)">
        </span>
        </div>
    `
})
export class PeriodSwitch {
    @Input()
    public period: string;
    @Output()
    public prev: EventEmitter<any> = new EventEmitter<any>();
    @Output()
    public next: EventEmitter<any> = new EventEmitter<any>();
    @Output()
    public modeChange: EventEmitter<any> = new EventEmitter<any>();
}
