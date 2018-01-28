"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Observer_1 = require("../classes/Observer");
var OnBallHasFiredObserver = (function (_super) {
    __extends(OnBallHasFiredObserver, _super);
    function OnBallHasFiredObserver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OnBallHasFiredObserver.prototype.run = function (attachs) {
    };
    return OnBallHasFiredObserver;
}(Observer_1.Observer));
exports.OnBallHasFiredObserver = OnBallHasFiredObserver;
//# sourceMappingURL=OnBallHasFired.js.map