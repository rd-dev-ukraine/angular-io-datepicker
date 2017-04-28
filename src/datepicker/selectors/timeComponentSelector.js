"use strict";
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
var TimeComponentSelector = (function () {
    function TimeComponentSelector() {
        this.dateChange = new core_1.EventEmitter();
        this.selectHour = new core_1.EventEmitter();
        this.selectMinute = new core_1.EventEmitter();
    }
    TimeComponentSelector.prototype.plusHour = function () {
        this.dateChange.emit(this.date.clone().add(1, "hour"));
    };
    TimeComponentSelector.prototype.minusHour = function () {
        this.dateChange.emit(this.date.clone().subtract(1, "hour"));
    };
    TimeComponentSelector.prototype.plusMinute = function () {
        this.dateChange.emit(this.date.clone().add(1, "minute"));
    };
    TimeComponentSelector.prototype.minusMinute = function () {
        this.dateChange.emit(this.date.clone().subtract(1, "minute"));
    };
    TimeComponentSelector.prototype.togglePmAm = function () {
        if (this.date.hour() < 12) {
            this.dateChange.emit(this.date.clone().add(12, "hour"));
        }
        else {
            this.dateChange.emit(this.date.clone().subtract(12, "hour"));
        }
    };
    return TimeComponentSelector;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TimeComponentSelector.prototype, "date", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], TimeComponentSelector.prototype, "dateChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], TimeComponentSelector.prototype, "selectHour", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], TimeComponentSelector.prototype, "selectMinute", void 0);
TimeComponentSelector = __decorate([
    core_1.Component({
        selector: "time-component-selector",
        styles: [
            ".time-component-selector__am-pm{cursor:pointer}.time-component-selector{font-size:2em;display:flex;flex-flow:row nowrap;align-items:center}.time-component-selector__component{padding-right:.5em}"
        ],
        template: "\n        <div class=\"time-component-selector\">\n            <time-component-scroller class=\"time-component-selector__component\"\n                                     [value]=\"date\"\n                                     [format]=\" 'hh' \"\n                                     (up)=\"plusHour()\"\n                                     (down)=\"minusHour()\"\n                                     (selectValue)=\"selectHour.emit($event)\">\n            </time-component-scroller>\n            <time-component-scroller class=\"time-component-selector__component\"\n                                     [value]=\"date\"\n                                     [format]=\" 'mm' \"\n                                     (up)=\"plusMinute()\"\n                                     (down)=\"minusMinute()\"\n                                     (selectValue)=\"selectMinute.emit($event)\">\n            </time-component-scroller>\n            <span class=\"time-component-selector__am-pm\"\n                  (click)=\"togglePmAm()\">\n                {{ date?.format(\"A\") }}\n            </span>\n        </div>\n    "
    })
], TimeComponentSelector);
exports.TimeComponentSelector = TimeComponentSelector;
//# sourceMappingURL=timeComponentSelector.js.map