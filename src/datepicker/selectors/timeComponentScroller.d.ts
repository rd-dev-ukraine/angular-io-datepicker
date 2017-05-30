import { EventEmitter, Component } from "@angular/core";
import { Moment } from "moment";

@Component({
    selector: "time-component-scroller",
    styles: [
        `.time-component-scroller{line-height:1em;display:flex;flex-flow:column nowrap;align-items:center}.time-component-scroller__arrow,.time-component-scroller__value{cursor:pointer}.datepicker__buttonIcon{display:inline-block;padding:.5em;background-size:contain}.datepicker__buttonIcon-arrow-up{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTc5MiIgaGVpZ2h0PSIxNzkyIiB2aWV3Qm94PSIwIDAgMTc5MiAxNzkyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xNjgzIDEzMzFsLTE2NiAxNjVxLTE5IDE5LTQ1IDE5dC00NS0xOWwtNTMxLTUzMS01MzEgNTMxcS0xOSAxOS00NSAxOXQtNDUtMTlsLTE2Ni0xNjVxLTE5LTE5LTE5LTQ1LjV0MTktNDUuNWw3NDItNzQxcTE5LTE5IDQ1LTE5dDQ1IDE5bDc0MiA3NDFxMTkgMTkgMTkgNDUuNXQtMTkgNDUuNXoiLz48L3N2Zz4=)}.datepicker__buttonIcon-arrow-down{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTc5MiIgaGVpZ2h0PSIxNzkyIiB2aWV3Qm94PSIwIDAgMTc5MiAxNzkyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xNjgzIDgwOGwtNzQyIDc0MXEtMTkgMTktNDUgMTl0LTQ1LTE5bC03NDItNzQxcS0xOS0xOS0xOS00NS41dDE5LTQ1LjVsMTY2LTE2NXExOS0xOSA0NS0xOXQ0NSAxOWw1MzEgNTMxIDUzMS01MzFxMTktMTkgNDUtMTl0NDUgMTlsMTY2IDE2NXExOSAxOSAxOSA0NS41dC0xOSA0NS41eiIvPjwvc3ZnPg==)}`
    ],
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
export declare class TimeComponentScroller {
    value: Moment;
    format: string;
    selectValue: EventEmitter<any>;
    up: EventEmitter<any>;
    down: EventEmitter<any>;
}
