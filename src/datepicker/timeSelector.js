"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("./common");
var TimeSelector = TimeSelector_1 = (function () {
    function TimeSelector() {
        this.displayDate = common_1.local();
        this.mode = "time";
    }
    Object.defineProperty(TimeSelector.prototype, "selectedDate", {
        get: function () {
            return !this._selectedDate ? null : this._selectedDate.clone();
        },
        set: function (value) {
            if (value && value.isValid()) {
                this._selectedDate = value.clone();
                this.displayDate = value.clone();
                this._onChange && this._onChange(this.selectedDate.clone());
            }
            this.mode = "time";
        },
        enumerable: true,
        configurable: true
    });
    TimeSelector.prototype.writeValue = function (val) {
        if (val === null || val === undefined) {
            this._selectedDate = null;
        }
        else {
            var parsed = common_1.local(val);
            if (!parsed.isValid()) {
                parsed = null;
            }
            this._selectedDate = parsed;
        }
        this.displayDate = this.selectedDate || common_1.local();
    };
    TimeSelector.prototype.registerOnChange = function (fn) {
        this._onChange = fn;
    };
    TimeSelector.prototype.registerOnTouched = function (fn) {
        this._onTouched = fn;
    };
    return TimeSelector;
}());
TimeSelector = TimeSelector_1 = __decorate([
    core_1.Component({
        selector: "time-selector",
        providers: [common_1.ControlValueAccessorProviderFactory(TimeSelector_1)],
        template: "\n        <time-component-selector *ngIf=\" mode === 'time' \"\n                                 [(date)]=\"selectedDate\"\n                                 (selectHour)=\" mode = 'hour' \"\n                                 (selectMinute)=\" mode= 'minute' \">\n        </time-component-selector>\n        <hour-selector *ngIf=\" mode === 'hour' \"\n                       [(date)]=\"selectedDate\">\n        </hour-selector>\n        <minute-selector *ngIf=\" mode === 'minute' \"\n                         [(date)]=\"selectedDate\">\n        </minute-selector>\n    "
    })
], TimeSelector);
exports.TimeSelector = TimeSelector;
var TimeSelector_1;
//# sourceMappingURL=timeSelector.js.map