import { EventEmitter, Component } from "@angular/core";

@Component({
    selector: "period-switch",
    styles: [
        `.period-switch{display:flex;flex-flow:row nowrap;align-items:center}.period-switch__change{padding:.5em;cursor:pointer;flex-grow:0;flex-shrink:0}.period-switch__period{font-weight:700;cursor:pointer;text-align:center;flex-grow:1;flex-shrink:1}.datepicker__buttonIcon{display:inline-block;padding:.5em;background-size:contain}.datepicker__buttonIcon-arrow-left{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTc5MiIgaGVpZ2h0PSIxNzkyIiB2aWV3Qm94PSIwIDAgMTc5MiAxNzkyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xNDI3IDMwMWwtNTMxIDUzMSA1MzEgNTMxcTE5IDE5IDE5IDQ1dC0xOSA0NWwtMTY2IDE2NnEtMTkgMTktNDUgMTl0LTQ1LTE5bC03NDItNzQycS0xOS0xOS0xOS00NXQxOS00NWw3NDItNzQycTE5LTE5IDQ1LTE5dDQ1IDE5bDE2NiAxNjZxMTkgMTkgMTkgNDV0LTE5IDQ1eiIvPjwvc3ZnPg==)}.datepicker__buttonIcon-arrow-right{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTc5MiIgaGVpZ2h0PSIxNzkyIiB2aWV3Qm94PSIwIDAgMTc5MiAxNzkyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xMzYzIDg3N2wtNzQyIDc0MnEtMTkgMTktNDUgMTl0LTQ1LTE5bC0xNjYtMTY2cS0xOS0xOS0xOS00NXQxOS00NWw1MzEtNTMxLTUzMS01MzFxLTE5LTE5LTE5LTQ1dDE5LTQ1bDE2Ni0xNjZxMTktMTkgNDUtMTl0NDUgMTlsNzQyIDc0MnExOSAxOSAxOSA0NXQtMTkgNDV6Ii8+PC9zdmc+)}`
    ],
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
export declare class PeriodSwitch {
    period: string;
    prev: EventEmitter<any>;
    next: EventEmitter<any>;
    modeChange: EventEmitter<any>;
}
