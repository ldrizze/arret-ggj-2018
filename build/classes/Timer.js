"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Timer = (function () {
    function Timer() {
    }
    Timer.prototype.start = function () {
        this.started_at = new Date();
    };
    Timer.prototype.pause = function () {
    };
    Timer.prototype.reset = function () {
        this.started_at = null;
    };
    Object.defineProperty(Timer.prototype, "time", {
        get: function () {
            var now = new Date();
            return now.getTime() - this.started_at.getTime();
        },
        enumerable: true,
        configurable: true
    });
    return Timer;
}());
exports.Timer = Timer;
//# sourceMappingURL=Timer.js.map