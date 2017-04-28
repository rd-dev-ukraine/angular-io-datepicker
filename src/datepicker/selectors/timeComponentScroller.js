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
var TimeComponentScroller = (function () {
    function TimeComponentScroller() {
        this.selectValue = new core_1.EventEmitter();
        this.up = new core_1.EventEmitter();
        this.down = new core_1.EventEmitter();
    }
    return TimeComponentScroller;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TimeComponentScroller.prototype, "value", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TimeComponentScroller.prototype, "format", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], TimeComponentScroller.prototype, "selectValue", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], TimeComponentScroller.prototype, "up", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], TimeComponentScroller.prototype, "down", void 0);
TimeComponentScroller = __decorate([
    core_1.Component({
        selector: "time-component-scroller",
        styles: [
            ".time-component-scroller{line-height:1em;display:flex;flex-flow:column nowrap;align-items:center}.time-component-scroller__arrow,.time-component-scroller__value{cursor:pointer}.datepicker__buttonIcon{display:inline-block;padding:.5em;background-size:contain}.datepicker__buttonIcon-arrow-up{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTc5MiIgaGVpZ2h0PSIxNzkyIiB2aWV3Qm94PSIwIDAgMTc5MiAxNzkyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xNjgzIDEzMzFsLTE2NiAxNjVxLTE5IDE5LTQ1IDE5dC00NS0xOWwtNTMxLTUzMS01MzEgNTMxcS0xOSAxOS00NSAxOXQtNDUtMTlsLTE2Ni0xNjVxLTE5LTE5LTE5LTQ1LjV0MTktNDUuNWw3NDItNzQxcTE5LTE5IDQ1LTE5dDQ1IDE5bDc0MiA3NDFxMTkgMTkgMTkgNDUuNXQtMTkgNDUuNXoiLz48L3N2Zz4=)}.datepicker__buttonIcon-arrow-down{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTc5MiIgaGVpZ2h0PSIxNzkyIiB2aWV3Qm94PSIwIDAgMTc5MiAxNzkyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xNjgzIDgwOGwtNzQyIDc0MXEtMTkgMTktNDUgMTl0LTQ1LTE5bC03NDItNzQxcS0xOS0xOS0xOS00NS41dDE5LTQ1LjVsMTY2LTE2NXExOS0xOSA0NS0xOXQ0NSAxOWw1MzEgNTMxIDUzMS01MzFxMTktMTkgNDUtMTl0NDUgMTlsMTY2IDE2NXExOSAxOSAxOSA0NS41dC0xOSA0NS41eiIvPjwvc3ZnPg==)}"
        ],
        template: "\n        <div class=\"time-component-scroller\">\n            <span class=\"time-component-scroller__arrow up datepicker__buttonIcon datepicker__buttonIcon-arrow-up\"\n                  (click)=\"up.emit($event)\">\n            </span>\n                <span class=\"time-component-scroller__value\"\n                      (click)=\"selectValue.emit($event)\">\n                {{ value?.format(format) }}\n            </span>\n                <span class=\"time-component-scroller__arrow down datepicker__buttonIcon datepicker__buttonIcon-arrow-down\"\n                      (click)=\"down.emit($event)\">\n            </span>\n        </div>\n    "
    })
], TimeComponentScroller);
exports.TimeComponentScroller = TimeComponentScroller;
//# sourceMappingURL=timeComponentScroller.js.map