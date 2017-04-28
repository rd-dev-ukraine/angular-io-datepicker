"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dateUtils_1 = require("../dateUtils");
var abstractSelector_1 = require("./abstractSelector");
var DaySelector = (function (_super) {
    __extends(DaySelector, _super);
    function DaySelector() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DaySelector.prototype.getDaysOfWeek = function () {
        return dateUtils_1.daysOfWeek();
    };
    DaySelector.prototype.calendar = function () {
        return dateUtils_1.monthCalendar(this.value);
    };
    DaySelector.prototype.prev = function () {
        this.value = this.value.subtract(1, "month");
    };
    DaySelector.prototype.next = function () {
        this.value = this.value.add(1, "month");
    };
    DaySelector.prototype.isCurrentMonth = function (date) {
        if (!date) {
            throw new Error("Date is required.");
        }
        return this.value.year() === date.year() && this.value.month() === date.month();
    };
    return DaySelector;
}(abstractSelector_1.AbstractSelector));
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DaySelector.prototype, "date", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DaySelector.prototype, "dateChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DaySelector.prototype, "dateSelected", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DaySelector.prototype, "modeChanged", void 0);
DaySelector = __decorate([
    core_1.Component({
        selector: "day-selector",
        styles: [
            ".day-selector.hidden{display:none}.day-selector__days-of-week{display:flex;flex-direction:row;margin:0;padding:0;list-style-type:none;background-color:#eee;flex-wrap:nowrap;justify-content:space-between;align-items:stretch}.day-selector__day-of-week{font-weight:700;flex-grow:1;flex-shrink:1}.day-selector__days-of-month{display:flex;flex-direction:row;margin:0;padding:0;list-style-type:none;flex-wrap:wrap;justify-content:space-between;align-items:stretch}.day-selector__day-of-month{cursor:pointer;flex-grow:1;flex-shrink:0;flex-basis:14%}.day-selector__day-of-month.selected{background:#eee}.day-selector__day-of-month.out-of-month{color:#ccc}"
        ],
        template: "\n        <div class=\"day-selector\">\n            <period-switch [period]=\"date?.format('MMMM YYYY')\"\n                           (prev)=\"prev()\"\n                           (next)=\"next()\"\n                           (modeChange)=\"modeChanged.emit($event)\">\n            </period-switch>\n            <ul class=\"day-selector__days-of-week\">\n                <li *ngFor=\"let dow of getDaysOfWeek()\"\n                    class=\"day-selector__day-of-week\">\n                    {{dow}}\n                </li>\n            </ul>\n            <ul class=\"day-selector__days-of-month\">\n                <li *ngFor=\"let date of calendar()\"\n                    [ngClass]=\"{ \n                    selected: isSelected(date), \n                    'current-month': isCurrentMonth(date), \n                    'out-of-month': !isCurrentMonth(date), \n                    'day-selector__day-of-month': true  \n                }\"\n                    (mousedown)=\"dateSelected.emit(date); $event.preventDefault(); $event.stopPropagation();\">\n                    {{date.format(\"D\")}}\n                </li>\n            </ul>\n        </div>"
    })
], DaySelector);
exports.DaySelector = DaySelector;
//# sourceMappingURL=daySelector.js.map