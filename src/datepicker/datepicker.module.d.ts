import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { OverlayModule } from "angular-io-overlay";

import { DaySelector, DecadeSelector, HourSelector, MinuteSelector, MonthSelector, PeriodSwitch, TimeComponentScroller, TimeComponentSelector, YearSelector } from "./selectors/index";
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
        TimeComponentScroller,
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
export declare class DatePickerModule {}
