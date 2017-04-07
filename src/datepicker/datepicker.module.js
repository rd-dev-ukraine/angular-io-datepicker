"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var angular_io_overlay_1 = require("angular-io-overlay");
var index_1 = require("./selectors/index");
var index_2 = require("./index");
var DatePickerModule = (function () {
    function DatePickerModule() {
    }
    return DatePickerModule;
}());
DatePickerModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            angular_io_overlay_1.OverlayModule,
            forms_1.FormsModule
        ],
        declarations: [
            index_1.PeriodSwitch,
            index_1.DaySelector,
            index_1.DecadeSelector,
            index_1.HourSelector,
            index_1.MinuteSelector,
            index_1.MonthSelector,
            index_1.TimeComponentSelector,
            index_1.TimeComponentScroller,
            index_1.YearSelector,
            index_2.DatePickerPanel,
            index_2.DateSelectorComponent,
            index_2.DatePicker,
            index_2.TimeSelector,
            index_1.TimeComponentScroller,
        ],
        exports: [
            index_2.DatePicker
        ],
        entryComponents: [
            index_2.DatePickerPanel
        ]
    })
], DatePickerModule);
exports.DatePickerModule = DatePickerModule;
//# sourceMappingURL=datepicker.module.js.map