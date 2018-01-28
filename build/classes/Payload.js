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
var Payload = (function () {
    function Payload(_user, _data, _is_received) {
        if (_data === void 0) { _data = null; }
        if (_is_received === void 0) { _is_received = false; }
        this._user = _user;
        this._data = _data;
        this._is_received = _is_received;
    }
    Payload.prototype.transport = function () {
        return false;
    };
    Object.defineProperty(Payload.prototype, "user", {
        get: function () {
            return this._user;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Payload.prototype, "gameroom", {
        get: function () {
            return (this._user.player != null && this._user.player.gameroom != null) ? this._user.player.gameroom : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Payload.prototype, "player", {
        get: function () {
            return (this._user.player != null) ? this._user.player : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Payload.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Payload.prototype, "is_received", {
        get: function () {
            return this._is_received;
        },
        enumerable: true,
        configurable: true
    });
    Payload.prototype.toString = function () {
        return JSON.stringify(this.data.toString());
    };
    return Payload;
}());
exports.Payload = Payload;
var ErrorPayload = (function (_super) {
    __extends(ErrorPayload, _super);
    function ErrorPayload(_user, _error_code, _error_message) {
        return _super.call(this, _user, { error: true, code: _error_code, message: _error_message }) || this;
    }
    return ErrorPayload;
}(Payload));
exports.ErrorPayload = ErrorPayload;
//# sourceMappingURL=Payload.js.map