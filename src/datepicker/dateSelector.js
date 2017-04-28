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
var DateSelectorComponent = DateSelectorComponent_1 = (function () {
    function DateSelectorComponent() {
        this.mode = "day";
        this.displayDate = common_1.local();
    }
    Object.defineProperty(DateSelectorComponent.prototype, "selectedDate", {
        get: function () {
            if (!this._selectedDate) {
                return null;
            }
            return this._selectedDate.clone();
        },
        set: function (value) {
            if (value && value.isValid()) {
                this._selectedDate = value.clone();
                this.displayDate = value.clone();
                if (this._onChange) {
                    this._onChange(this.selectedDate.clone());
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    DateSelectorComponent.prototype.writeValue = function (val) {
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
    DateSelectorComponent.prototype.registerOnChange = function (fn) {
        this._onChange = fn;
    };
    DateSelectorComponent.prototype.registerOnTouched = function (fn) {
        this._onTouched = fn;
    };
    return DateSelectorComponent;
}());
DateSelectorComponent = DateSelectorComponent_1 = __decorate([
    core_1.Component({
        selector: "date-selector",
        providers: [common_1.ControlValueAccessorProviderFactory(DateSelectorComponent_1)],
        styles: [
            ".date-selector{line-height:2em;text-align:center;vertical-align:middle}"
        ],
        template: "\n        <div class=\"date-selector\">\n            <day-selector [hidden]=\"mode !== 'day'\"\n                          [(date)]=\"displayDate\"\n                          (dateSelected)=\"selectedDate=$event\"\n                          (modeChanged)=\" mode='month' \">\n            </day-selector>\n            <month-selector [hidden]=\"mode !== 'month' \"\n                            [(date)]=\"displayDate\"\n                            (dateSelected)=\"displayDate=$event; mode = 'day'; \"\n                            (modeChanged)=\" mode='year' \">\n            </month-selector>\n            <year-selector [hidden]=\"mode !== 'year' \"\n                           [(date)]=\"displayDate\"\n                           (dateSelected)=\"displayDate=$event; mode = 'month'; \"\n                           (modeChanged)=\" mode='decade' \">\n            </year-selector>\n            <decade-selector [hidden]=\"mode !== 'decade' \"\n                             [(date)]=\"displayDate\"\n                             (dateSelected)=\"displayDate=$event; mode = 'year'; \">\n            </decade-selector>\n        </div>\n    "
    })
], DateSelectorComponent);
exports.DateSelectorComponent = DateSelectorComponent;
var DateSelectorComponent_1;
//# sourceMappingURL=dateSelector.js.map