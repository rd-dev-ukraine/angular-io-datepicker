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
var common_1 = require("./common");
var DatePickerPanel = DatePickerPanel_1 = (function () {
    function DatePickerPanel() {
        this.mode = "date";
        this.displayDateMode = "day";
        this.dateChange = new core_1.EventEmitter();
        this.dateSelected = new core_1.EventEmitter();
        this.modeChanged = new core_1.EventEmitter();
    }
    Object.defineProperty(DatePickerPanel.prototype, "dateSelectorVisible", {
        get: function () {
            return this.mode === "date" || this.mode === "datetime";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerPanel.prototype, "timeSelectorVisible", {
        get: function () {
            return this.mode === "time" || this.mode === "datetime";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerPanel.prototype, "date", {
        get: function () {
            return this._dateValue;
        },
        set: function (value) {
            this._dateValue = value;
            this.pushChangedValue();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerPanel.prototype, "time", {
        get: function () {
            return this._timeValue;
        },
        set: function (value) {
            this._timeValue = value;
            this.pushChangedValue();
        },
        enumerable: true,
        configurable: true
    });
    DatePickerPanel.prototype.writeValue = function (value) {
        var parsedValue = common_1.local(value);
        if (!parsedValue.isValid()) {
            parsedValue = common_1.local();
        }
        this.updateControls(parsedValue);
    };
    DatePickerPanel.prototype.registerOnChange = function (fn) {
        this._onChange = fn;
    };
    DatePickerPanel.prototype.registerOnTouched = function (fn) { };
    DatePickerPanel.prototype.updateControls = function (value) {
        this.date = value.toDate();
        this.time = value.toDate();
    };
    DatePickerPanel.prototype.pushChangedValue = function () {
        var date = common_1.local(this.date);
        var time = common_1.local(this.time);
        var result = date.clone()
            .hour(time.hour())
            .minute(time.minute())
            .second(time.second())
            .millisecond(time.millisecond());
        if (this._onChange) {
            this._onChange(result);
        }
    };
    return DatePickerPanel;
}());
__decorate([
    core_1.Input("type"),
    __metadata("design:type", String)
], DatePickerPanel.prototype, "mode", void 0);
__decorate([
    core_1.Input("displayDateMode"),
    __metadata("design:type", String)
], DatePickerPanel.prototype, "displayDateMode", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DatePickerPanel.prototype, "dateChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DatePickerPanel.prototype, "dateSelected", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DatePickerPanel.prototype, "modeChanged", void 0);
DatePickerPanel = DatePickerPanel_1 = __decorate([
    core_1.Component({
        selector: "datepicker-panel",
        providers: [common_1.ControlValueAccessorProviderFactory(DatePickerPanel_1)],
        template: "\n        <div class=\"datepicker-panel\">\n            <date-selector *ngIf=\"dateSelectorVisible\"\n                           [displayDateMode]=\"displayDateMode\"\n                           [(ngModel)]=\"date\">\n            </date-selector>\n            <time-selector *ngIf=\"timeSelectorVisible\"\n                           [(ngModel)]=\"time\">\n            </time-selector>\n        </div>\n    ",
        styles: [
            ".datepicker-panel{display:flex;overflow:hidden;max-width:17em;margin-top:1em;padding:1em;border:1px solid #ccc;border-radius:4px;background:#fff;flex-flow:column nowrap;justify-content:center;align-items:center}"
        ]
    })
], DatePickerPanel);
exports.DatePickerPanel = DatePickerPanel;
var DatePickerPanel_1;
//# sourceMappingURL=datePickerPanel.js.map