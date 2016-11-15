import { Component } from "@angular/core";
import { Moment } from "moment";

import { AbstractSelector } from "./abstractSelector";


@Component({
    selector: "minute-selector",
    styleUrls: ["../datepicker.css"],
    template: `
    <div class="date-set">
        <ul class="date-set__dates">
            <li *ngFor="let minute of minutes()"
                [ngClass]="
                {
                     'date-set__date': true 
                }"
                (mousedown)="dateChange.emit(minute); $event.preventDefault(); $event.stopPropagation();">
                {{ minute.format("mm") }}
            </li>
        </ul>
    </div>
    `
})
export class MinuteSelector extends AbstractSelector {
    protected minutes(): Moment[] {

        const result: Moment[] = [];
        for (let i = 0; i < 60; i = i + 5) {
            result.push(this.value.clone().minute(i));
        }

        return result;
    }
}
