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
var DecadeSelector = (function (_super) {
    __extends(DecadeSelector, _super);
    function DecadeSelector() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dateChange = new core_1.EventEmitter();
        _this.dateSelected = new core_1.EventEmitter();
        _this.modeChanged = new core_1.EventEmitter();
        return _this;
    }
    DecadeSelector.prototype.prev = function () {
        this.value = this.value.subtract(100, "year");
    };
    DecadeSelector.prototype.next = function () {
        this.value = this.value.add(100, "year");
    };
    DecadeSelector.prototype.formatCentury = function () {
        var startYear = this.value.year() - this.value.year() % 100;
        var endYear = startYear + 99;
        return startYear + "-" + endYear;
    };
    DecadeSelector.prototype.decades = function () {
        var startYear = this.value.year() - this.value.year() % 100;
        var start = this.value.year(startYear);
        var result = [];
        for (var year = 0; year < 100; year = year + 10) {
            result.push(start.clone().add(year, "year"));
        }
        return result;
    };
    DecadeSelector.prototype.isDecadeSelected = function (value) {
        var _a = dateUtils_1.decade(value), start = _a[0], end = _a[1];
        return this.value.year() >= start.year() && this.value.year() <= end.year();
    };
    return DecadeSelector;
}(abstractSelector_1.AbstractSelector));
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DecadeSelector.prototype, "date", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DecadeSelector.prototype, "dateChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DecadeSelector.prototype, "dateSelected", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DecadeSelector.prototype, "modeChanged", void 0);
DecadeSelector = __decorate([
    core_1.Component({
        selector: "decade-selector",
        styles: [
            ".date-set{line-height:2em;text-align:center;vertical-align:middle}.date-set.hidden{display:none}.date-set__dates{display:flex;flex-direction:row;margin:0;padding:0;list-style-type:none;flex-wrap:wrap;justify-content:space-between;align-items:stretch}.date-set__date{cursor:pointer;flex-grow:1;flex-shrink:0;flex-basis:33%}.date-set__date.selected{background:#eee}"
        ],
        template: "\n        <div class=\"date-set\">\n            <period-switch [period]=\"formatCentury()\"\n                           (prev)=\"prev()\"\n                           (next)=\"next()\"\n                           (modeChange)=\"modeChanged.emit($event)\">\n            </period-switch>\n            <ul class=\"date-set__dates\">\n                <li *ngFor=\"let decade of decades()\"\n                    [ngClass]=\"\n                {\n                     'date-set__date': true, \n                     'selected': isDecadeSelected(decade) \n                }\"\n                    (mousedown)=\"dateSelected.emit(decade); $event.preventDefault(); $event.stopPropagation();\">\n                    {{ formatDecade(decade) }}\n                </li>\n            </ul>\n        </div>\n    "
    })
], DecadeSelector);
exports.DecadeSelector = DecadeSelector;
//# sourceMappingURL=decadeSelector.js.map