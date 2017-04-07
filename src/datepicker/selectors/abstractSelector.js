"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("../common");
var dateUtils_1 = require("../dateUtils");
var AbstractSelector = (function () {
    function AbstractSelector() {
        this.dateChange = new core_1.EventEmitter();
        this.dateSelected = new core_1.EventEmitter();
        this.modeChanged = new core_1.EventEmitter();
    }
    Object.defineProperty(AbstractSelector.prototype, "value", {
        /**
         * Returns cloned not-null selected value.
         */
        get: function () {
            return (this.date || common_1.local()).clone();
        },
        set: function (val) {
            this.dateChange.emit(val ? val.clone() : null);
        },
        enumerable: true,
        configurable: true
    });
    AbstractSelector.prototype.isSelected = function (date) {
        if (!date) {
            throw new Error("Date is required.");
        }
        if (!this.date) {
            return false;
        }
        return dateUtils_1.areDatesEqual(this.value, date);
    };
    AbstractSelector.prototype.formatDecade = function (value) {
        var _a = dateUtils_1.decade(value), start = _a[0], end = _a[1];
        return start.format("YYYY") + "-" + end.format("YYYY");
    };
    return AbstractSelector;
}());
exports.AbstractSelector = AbstractSelector;
//# sourceMappingURL=abstractSelector.js.map