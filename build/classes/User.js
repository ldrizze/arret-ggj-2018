"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = (function () {
    function User(_id, _client_id) {
        this._id = _id;
        this._client_id = _client_id;
        this._is_guest = true;
    }
    Object.defineProperty(User.prototype, "player", {
        get: function () {
            return this._player;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "client_id", {
        get: function () {
            return this._client_id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "is_guest", {
        get: function () {
            return this._is_guest;
        },
        enumerable: true,
        configurable: true
    });
    User.prototype.setDriver = function (driver) {
        this._driver = driver;
    };
    User.prototype.auth = function (username, password) {
        return null;
    };
    User.prototype.toString = function () {
        return this._id + "|" + this._client_id;
    };
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.js.map