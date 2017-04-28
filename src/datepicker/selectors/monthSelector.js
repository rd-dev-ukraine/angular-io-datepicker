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
var abstractSelector_1 = require("./abstractSelector");
var MonthSelector = (function (_super) {
    __extends(MonthSelector, _super);
    function MonthSelector() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MonthSelector.prototype.prev = function () {
        this.value = this.value.subtract(1, "year");
    };
    MonthSelector.prototype.next = function () {
        this.value = this.value.add(1, "year");
    };
    MonthSelector.prototype.monthes = function () {
        var result = [];
        for (var monthNum = 0; monthNum < 12; monthNum++) {
            result.push(this.value.month(monthNum));
        }
        return result;
    };
    return MonthSelector;
}(abstractSelector_1.AbstractSelector));
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], MonthSelector.prototype, "date", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MonthSelector.prototype, "dateChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MonthSelector.prototype, "dateSelected", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MonthSelector.prototype, "modeChanged", void 0);
MonthSelector = __decorate([
    core_1.Component({
        selector: "month-selector",
        styles: [
            ".date-set{line-height:2em;text-align:center;vertical-align:middle}.date-set.hidden{display:none}.date-set__dates{display:flex;flex-direction:row;margin:0;padding:0;list-style-type:none;flex-wrap:wrap;justify-content:space-between;align-items:stretch}.date-set__date{cursor:pointer;flex-grow:1;flex-shrink:0;flex-basis:33%}.date-set__date.selected{background:#eee}"
        ],
        template: "\n        <div class=\"date-set\">\n            <period-switch [period]=\"date?.format('YYYY')\"\n                           (prev)=\"prev()\"\n                           (next)=\"next()\"\n                           (modeChange)=\"modeChanged.emit($event)\">\n            </period-switch>\n            <ul class=\"date-set__dates\">\n                <li *ngFor=\"let month of monthes()\"\n                    [ngClass]=\"\n                {\n                     'date-set__date': true, \n                     'selected': isSelected(month) \n                }\"\n                    (mousedown)=\"dateSelected.emit(month); $event.preventDefault(); $event.stopPropagation();\">\n                    {{ month.format(\"MMMM\") }}\n                </li>\n            </ul>\n        </div>\n    "
    })
], MonthSelector);
exports.MonthSelector = MonthSelector;
//# sourceMappingURL=monthSelector.js.map