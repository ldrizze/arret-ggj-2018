"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Transport = (function () {
    function Transport(_transport_data) {
        this._transport_data = _transport_data;
    }
    Transport.prototype.updateData = function (data) {
        this._transport_data = data;
    };
    Transport.prototype.prepare = function () {
    };
    Transport.prototype.compress = function () {
    };
    return Transport;
}());
exports.Transport = Transport;
//# sourceMappingURL=Transport.js.map