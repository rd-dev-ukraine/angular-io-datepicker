import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { OverlayModule } from "../overlay/index";

import { PeriodSwitch, DaySelector, DecadeSelector, HourSelector, TimeComponentScroller,
    MinuteSelector, MonthSelector, TimeComponentSelector, YearSelector
} from "./selectors/index";
import { DatePicker, DatePickerPanel, DateSelectorComponent, TimeSelector } from "./index";


@NgModule({
    imports: [
        CommonModule,
        OverlayModule,
        FormsModule
    ],
    declarations: [
        PeriodSwitch,
        DaySelector,
        DecadeSelector,
        HourSelector,
        MinuteSelector,
        MonthSelector,
        TimeComponentSelector,
        YearSelector,
        DatePickerPanel,
        DateSelectorComponent,
        DatePicker,
        TimeSelector,
        TimeComponentScroller,
    ],
    exports: [
        DatePicker
    ],
    entryComponents: [
        DatePickerPanel
    ]
})
export class DatePickerModule { }
