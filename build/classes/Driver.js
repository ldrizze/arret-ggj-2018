"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Driver = (function () {
    function Driver(onConnectFn, onReceiveFn, onCloseFn) {
        this.onConnectFn = onConnectFn;
        this.onReceiveFn = onReceiveFn;
        this.onCloseFn = onCloseFn;
    }
    return Driver;
}());
exports.Driver = Driver;
//# sourceMappingURL=Driver.js.map