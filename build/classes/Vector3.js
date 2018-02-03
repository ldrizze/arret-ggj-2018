"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vector3 = (function () {
    function Vector3(_x, _y, _z) {
        if (_x === void 0) { _x = 0.0; }
        if (_y === void 0) { _y = 0.0; }
        if (_z === void 0) { _z = 0.0; }
        this._x = _x;
        this._y = _y;
        this._z = _z;
    }
    Vector3.prototype.add = function (vecOrX, y, z) {
        if (vecOrX instanceof Vector3) {
            this._x += vecOrX.x;
            this._y += vecOrX.y;
            this._z += vecOrX.z;
        }
        else {
            this._x += vecOrX;
            this._y += y;
            this._z += z;
        }
        return this;
    };
    Vector3.add = function (vec, vec2) {
        return vec.add(vec2);
    };
    Object.defineProperty(Vector3.prototype, "x", {
        get: function () {
            return this._x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3.prototype, "y", {
        get: function () {
            return this._y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector3.prototype, "z", {
        get: function () {
            return this._z;
        },
        enumerable: true,
        configurable: true
    });
    return Vector3;
}());
exports.Vector3 = Vector3;
//# sourceMappingURL=Vector3.js.map