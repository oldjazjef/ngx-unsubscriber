"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unsubscriber = exports.NgxUnsubscriber = void 0;
var rxjs_1 = require("rxjs");
function NgxUnsubscriber() {
    return function decorator(target) {
        var ngOnDestroy = target.prototype.ngOnDestroy;
        if (ngOnDestroy == null)
            throw new Error('ngOnDestroy required');
        Object.defineProperty(target.prototype, 'unsubscribe$', {
            value: new rxjs_1.Subject()
        });
        Object.defineProperty(target.prototype, 'ngOnDestroy', {
            value: function () {
                var unsubscribe$ = target.prototype.unsubscribe$;
                unsubscribe$.next();
                return ngOnDestroy.apply(this, arguments);
            }
        });
        return (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return class_1;
        }(target));
    };
}
exports.NgxUnsubscriber = NgxUnsubscriber;
function Unsubscriber() {
    return function (constructor) {
        var orig = constructor.prototype.ngOnDestroy;
        constructor.prototype.ngOnDestroy = function () {
            for (var prop in this) {
                var property = this[prop];
                if (typeof property.subscribe === "function") {
                    property.unsubscribe();
                }
            }
            orig === null || orig === void 0 ? void 0 : orig.apply();
        };
    };
}
exports.Unsubscriber = Unsubscriber;
