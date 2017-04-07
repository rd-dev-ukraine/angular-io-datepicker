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
var PeriodSwitch = (function () {
    function PeriodSwitch() {
        this.prev = new core_1.EventEmitter();
        this.next = new core_1.EventEmitter();
        this.modeChange = new core_1.EventEmitter();
    }
    return PeriodSwitch;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], PeriodSwitch.prototype, "period", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], PeriodSwitch.prototype, "prev", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], PeriodSwitch.prototype, "next", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], PeriodSwitch.prototype, "modeChange", void 0);
PeriodSwitch = __decorate([
    core_1.Component({
        selector: "period-switch",
        styleUrls: ["../datepicker.css"],
        template: "\n        <div class=\"period-switch\">\n        <span class=\"period-switch__change datepicker__buttonIcon datepicker__buttonIcon-arrow-left\"\n              (click)=\"prev.emit($event)\">\n        </span>\n            <span class=\"period-switch__period\"\n                  (click)=\"modeChange.emit($event)\">\n            {{ period }}\n        </span>\n            <span class=\"period-switch__change datepicker__buttonIcon datepicker__buttonIcon-arrow-right\"\n                  (click)=\"next.emit($event)\">\n        </span>\n        </div>\n    "
    })
], PeriodSwitch);
exports.PeriodSwitch = PeriodSwitch;
//# sourceMappingURL=periodSwitch.js.map