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
        this.displayDateMode = "day";
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
            console.log(_this.displayDateMode);
            c.instance.displayDateMode = _this.displayDateMode;
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
    __metadata("design:type", String)
], DatePicker.prototype, "displayDateMode", void 0);
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
        styles: [
            ".datepicker-actions__button,.datepicker-actions__input{transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s}.datepicker-actions{display:flex}.datepicker-actions__input{font:1rem/1.5 OpenSans;display:block;width:100%;padding:.375rem .75rem;color:#555;border:1px solid #ccc;border-radius:.25rem;background:#fff;box-shadow:inset 0 1px 1px rgba(0,0,0,.075)}.datepicker-actions__input:focus{border-color:#4d90fe;outline:0;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)}.datepicker-actions__button:disabled,.datepicker-actions__input:disabled,.datepicker-actions__input[readonly]{opacity:1;background-color:#eee}.datepicker-actions__button:disabled,.datepicker-actions__input:disabled{cursor:not-allowed}.datepicker-actions__button{margin-left:10px;padding:0 .77rem;border:1px solid #ccc;border-radius:.25em;outline:0;background-color:#fff}.datepicker-actions__button:active,.datepicker-actions__button:focus{border-color:#4d90fe;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)}.datepicker__buttonIcon{display:inline-block;padding:.5em;background-size:contain}.datepicker__buttonIcon-close{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTc5MiIgaGVpZ2h0PSIxNzkyIiB2aWV3Qm94PSIwIDAgMTc5MiAxNzkyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xNDkwIDEzMjJxMCA0MC0yOCA2OGwtMTM2IDEzNnEtMjggMjgtNjggMjh0LTY4LTI4bC0yOTQtMjk0LTI5NCAyOTRxLTI4IDI4LTY4IDI4dC02OC0yOGwtMTM2LTEzNnEtMjgtMjgtMjgtNjh0MjgtNjhsMjk0LTI5NC0yOTQtMjk0cS0yOC0yOC0yOC02OHQyOC02OGwxMzYtMTM2cTI4LTI4IDY4LTI4dDY4IDI4bDI5NCAyOTQgMjk0LTI5NHEyOC0yOCA2OC0yOHQ2OCAyOGwxMzYgMTM2cTI4IDI4IDI4IDY4dC0yOCA2OGwtMjk0IDI5NCAyOTQgMjk0cTI4IDI4IDI4IDY4eiIvPjwvc3ZnPg==)}.datepicker__buttonIcon-calendar{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTc5MiIgaGVpZ2h0PSIxNzkyIiB2aWV3Qm94PSIwIDAgMTc5MiAxNzkyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xOTIgMTY2NGgyODh2LTI4OGgtMjg4djI4OHptMzUyIDBoMzIwdi0yODhoLTMyMHYyODh6bS0zNTItMzUyaDI4OHYtMzIwaC0yODh2MzIwem0zNTIgMGgzMjB2LTMyMGgtMzIwdjMyMHptLTM1Mi0zODRoMjg4di0yODhoLTI4OHYyODh6bTczNiA3MzZoMzIwdi0yODhoLTMyMHYyODh6bS0zODQtNzM2aDMyMHYtMjg4aC0zMjB2Mjg4em03NjggNzM2aDI4OHYtMjg4aC0yODh2Mjg4em0tMzg0LTM1MmgzMjB2LTMyMGgtMzIwdjMyMHptLTM1Mi04NjR2LTI4OHEwLTEzLTkuNS0yMi41dC0yMi41LTkuNWgtNjRxLTEzIDAtMjIuNSA5LjV0LTkuNSAyMi41djI4OHEwIDEzIDkuNSAyMi41dDIyLjUgOS41aDY0cTEzIDAgMjIuNS05LjV0OS41LTIyLjV6bTczNiA4NjRoMjg4di0zMjBoLTI4OHYzMjB6bS0zODQtMzg0aDMyMHYtMjg4aC0zMjB2Mjg4em0zODQgMGgyODh2LTI4OGgtMjg4djI4OHptMzItNDgwdi0yODhxMC0xMy05LjUtMjIuNXQtMjIuNS05LjVoLTY0cS0xMyAwLTIyLjUgOS41dC05LjUgMjIuNXYyODhxMCAxMyA5LjUgMjIuNXQyMi41IDkuNWg2NHExMyAwIDIyLjUtOS41dDkuNS0yMi41em0zODQtNjR2MTI4MHEwIDUyLTM4IDkwdC05MCAzOGgtMTQwOHEtNTIgMC05MC0zOHQtMzgtOTB2LTEyODBxMC01MiAzOC05MHQ5MC0zOGgxMjh2LTk2cTAtNjYgNDctMTEzdDExMy00N2g2NHE2NiAwIDExMyA0N3Q0NyAxMTN2OTZoMzg0di05NnEwLTY2IDQ3LTExM3QxMTMtNDdoNjRxNjYgMCAxMTMgNDd0NDcgMTEzdjk2aDEyOHE1MiAwIDkwIDM4dDM4IDkweiIvPjwvc3ZnPg==)}"
        ],
        template: "\n        <span class=\"datepicker-actions\" #datePickerContainer>\n            <input [value]=\"inputText\"\n                   [disabled]=\"disabled\"\n                   (focus)=\"openPopup()\"\n                   (blur)=\"onTouched($event.target.value)\"\n                   (change)=\"raiseOnChange($event.target.value)\"\n                   (keyup.tab)=\"closePopup()\"\n                   (keyup.esc)=\"closePopup()\"\n                   class=\"datepicker-actions__input\"\n                   type=\"text\"/>\n            <button [hidden]=\"!showClearButton\"\n                    [disabled]=\"disabled\"\n                    (click)=\"clear()\"\n                    class=\"datepicker-actions__button\"\n                    type=\"button\">\n                <span class=\"datepicker__buttonIcon datepicker__buttonIcon-close\"></span>\n            </button>\n            <button [disabled]=\"disabled\"\n                    (click)=\"togglePopup()\"\n                    (mousedown)=\"$event.stopPropagation()\"\n                    class=\"datepicker-actions__button\"\n                    type=\"button\">\n                <span class=\"datepicker__buttonIcon datepicker__buttonIcon-calendar\"></span>\n            </button>\n        </span>\n        <overlay-host></overlay-host>\n    "
    }),
    __metadata("design:paramtypes", [angular_io_overlay_1.OverlayService])
], DatePicker);
exports.DatePicker = DatePicker;
var DatePicker_1;
//# sourceMappingURL=datePicker.js.map