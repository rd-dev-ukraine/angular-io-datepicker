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
var moment_1 = require("moment");
var angular_io_overlay_1 = require("angular-io-overlay");
var common_1 = require("./common");
var datePickerPanel_1 = require("./datePickerPanel");
var dateParseData = {
    separators: ["/", "\\", "-", "."],
    day: ["DD", "D"],
    month: ["MM", "M"],
    year: ["YYYY", "YY"]
};
function generateDateParseFormatsFromParts(firstPart, secondPart, thirdPart) {
    var result = [];
    for (var _i = 0, _a = dateParseData.separators; _i < _a.length; _i++) {
        var separator = _a[_i];
        for (var _b = 0, thirdPart_1 = thirdPart; _b < thirdPart_1.length; _b++) {
            var third = thirdPart_1[_b];
            for (var _c = 0, secondPart_1 = secondPart; _c < secondPart_1.length; _c++) {
                var second = secondPart_1[_c];
                for (var _d = 0, firstPart_1 = firstPart; _d < firstPart_1.length; _d++) {
                    var first = firstPart_1[_d];
                    result.push("" + first + separator + second + separator + third);
                }
            }
        }
    }
    return result;
}
function generateDateParseFormats() {
    return generateDateParseFormatsFromParts(dateParseData.month, dateParseData.day, dateParseData.year).concat(generateDateParseFormatsFromParts(dateParseData.day, dateParseData.month, dateParseData.year), generateDateParseFormatsFromParts(dateParseData.year, dateParseData.month, dateParseData.day), generateDateParseFormatsFromParts(dateParseData.year, dateParseData.day, dateParseData.month));
}
var parseFormat = {
    "date": generateDateParseFormats(),
    "datetime": ["LLL"],
    "time": ["H:M", "hh:mm A", "LT", "LTS"]
};
var defaultFormat = {
    "date": "LL",
    "datetime": "LLL",
    "time": "LT"
};
/**
 * Parses the given value as date using moment.js.
 * If value cannot be parsed the invalid Moment object is returned.
 * The calling code should not assume if the method returns local or utc value and
 * must convert value to corresponding form itself.
 */
function parserFabric(mode, format) {
    return function (value, parseFn) {
        parseFn = parseFn || moment_1.utc;
        if (value === null || value === undefined || value === "") {
            return null;
        }
        var formatsToParse = parseFormat[mode || "date"];
        return parseFn(value, [format].concat(formatsToParse), true);
    };
}
var DatePicker = DatePicker_1 = (function () {
    function DatePicker(overlayService) {
        this.overlayService = overlayService;
        this.mode = "date";
        this.showClearButton = true;
        this.inputText = "";
    }
    DatePicker.prototype.ngOnInit = function () {
        this.parseValue = parserFabric(this.mode, this.currentFormat);
    };
    DatePicker.prototype.writeValue = function (value) {
        if (value) {
            this.raiseOnChange(value);
        }
    };
    DatePicker.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    DatePicker.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    DatePicker.prototype.validate = function (c) {
        var value = this.parseValue(c.value, common_1.local);
        var err = {
            "parseError": "value has not been parsed"
        };
        if (c.pristine && !c.touched)
            return null;
        return value && !value.isValid() ? err : null;
    };
    /** Raises handers registered by ControlValueAccessor.registerOnChange method with converted value. */
    DatePicker.prototype.raiseOnChange = function (value) {
        var parsed = this.parseValue(value, common_1.local);
        if (!parsed) {
            this._value = null;
            this.updateControlText("");
        }
        else if (parsed.isValid()) {
            this._value = this.convertValue(parsed);
            var formatted = this.formatValue(this._value);
            this.updateControlText(formatted);
        }
        else {
            this.updateControlText(value);
        }
        this.onChange && this.onChange(this.convertValue(parsed));
    };
    DatePicker.prototype.togglePopup = function () {
        if (this._popupRef) {
            this.closePopup();
        }
        else {
            this.openPopup();
        }
    };
    DatePicker.prototype.openPopup = function () {
        var _this = this;
        if (this._popupRef) {
            return;
        }
        var val = this._value;
        this.overlayService.openComponentInPopup(datePickerPanel_1.DatePickerPanel, {
            alignWithElement: this.datePickerContainer,
            alignment: this.align,
            closeOnClick: true
        }).then(function (c) {
            _this._popupRef = c;
            _this._popupRef.onDestroy(function () {
                _this._popupRef = null;
            });
            c.instance.mode = _this.mode;
            c.instance.writeValue(val);
            c.instance.registerOnChange(function (v) { return _this.raiseOnChange(v); });
        });
    };
    DatePicker.prototype.closePopup = function () {
        if (this._popupRef) {
            this._popupRef.destroy();
            this._popupRef = null;
        }
    };
    DatePicker.prototype.clear = function () {
        this.raiseOnChange("");
    };
    /**
     * Formats input value based on current input type.
     * Value converted to local before formatting.
     */
    DatePicker.prototype.formatValue = function (value) {
        if (!value || !value.isValid()) {
            return "";
        }
        var mode = this.mode || "date";
        if (mode === "date") {
            return value.clone().format(this.currentFormat);
        }
        return value.clone().local().format(this.currentFormat);
    };
    Object.defineProperty(DatePicker.prototype, "currentFormat", {
        /** Format based on date picker current type. */
        get: function () {
            return this.format || defaultFormat[this.mode || "date"];
        },
        enumerable: true,
        configurable: true
    });
    DatePicker.prototype.updateControlText = function (formattedValue) {
        this.inputText = formattedValue;
    };
    DatePicker.prototype.convertValue = function (value) {
        if (!value || !value.isValid()) {
            return value;
        }
        var mode = this.mode || "date";
        if (mode === "date") {
            return moment_1.utc({ year: value.year(), month: value.month(), date: value.date() });
        }
        else {
            return value.clone().utc();
        }
    };
    return DatePicker;
}());
__decorate([
    core_1.ViewChild("datePickerContainer"),
    __metadata("design:type", core_1.ElementRef)
], DatePicker.prototype, "datePickerContainer", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DatePicker.prototype, "mode", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DatePicker.prototype, "showClearButton", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DatePicker.prototype, "format", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DatePicker.prototype, "disabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DatePicker.prototype, "align", void 0);
DatePicker = DatePicker_1 = __decorate([
    core_1.Component({
        selector: "date-picker",
        providers: [common_1.ControlValueAccessorProviderFactory(DatePicker_1), common_1.ValidatorProviderFactory(DatePicker_1)],
        styleUrls: ["./datepicker.css"],
        template: "\n        <span class=\"datepicker-actions\" #datePickerContainer>\n            <input [value]=\"inputText\"\n                   [disabled]=\"disabled\"\n                   (focus)=\"openPopup()\"\n                   (blur)=\"onTouched($event.target.value)\"\n                   (change)=\"raiseOnChange($event.target.value)\"\n                   (keyup.tab)=\"closePopup()\"\n                   (keyup.esc)=\"closePopup()\"\n                   class=\"datepicker-actions__input\"\n                   type=\"text\"/>\n            <button [hidden]=\"!showClearButton\"\n                    [disabled]=\"disabled\"\n                    (click)=\"clear()\"\n                    class=\"datepicker-actions__button\"\n                    type=\"button\">\n                <span class=\"datepicker__buttonIcon datepicker__buttonIcon-close\"></span>\n            </button>\n            <button [disabled]=\"disabled\"\n                    (click)=\"togglePopup()\"\n                    (mousedown)=\"$event.stopPropagation()\"\n                    class=\"datepicker-actions__button\"\n                    type=\"button\">\n                <span class=\"datepicker__buttonIcon datepicker__buttonIcon-calendar\"></span>\n            </button>\n        </span>\n        <overlay-host></overlay-host>\n    "
    }),
    __metadata("design:paramtypes", [angular_io_overlay_1.OverlayService])
], DatePicker);
exports.DatePicker = DatePicker;
var DatePicker_1;
//# sourceMappingURL=datePicker.js.map