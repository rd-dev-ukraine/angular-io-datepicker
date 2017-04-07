"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
function local(value, format, strictParsing) {
    return moment(value, format, strictParsing);
}
exports.local = local;
function ControlValueAccessorProviderFactory(type) {
    return {
        provide: forms_1.NG_VALUE_ACCESSOR,
        useExisting: core_1.forwardRef(function () { return type; }),
        multi: true
    };
}
exports.ControlValueAccessorProviderFactory = ControlValueAccessorProviderFactory;
function ValidatorProviderFactory(type) {
    return {
        provide: forms_1.NG_VALIDATORS,
        useExisting: core_1.forwardRef(function () { return type; }),
        multi: true
    };
}
exports.ValidatorProviderFactory = ValidatorProviderFactory;
//# sourceMappingURL=common.js.map