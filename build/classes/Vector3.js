"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vector3 = (function () {
    function Vector3(x, y, z) {
        if (x === void 0) { x = 0.0; }
        if (y === void 0) { y = 0.0; }
        if (z === void 0) { z = 0.0; }
        this.x = x;
        this.y = y;
        this.z = z;
    }
    Vector3.prototype.add = function (vecOrX, y, z) {
        if (vecOrX instanceof Vector3) {
            this.x += vecOrX.x;
            this.y += vecOrX.y;
            this.z += vecOrX.z;
        }
        else {
            this.x += vecOrX;
            this.y += y;
            this.z += z;
        }
        return this;
    };
    Vector3.add = function (vec, vec2) {
        return vec.add(vec2);
    };
    return Vector3;
}());
exports.Vector3 = Vector3;
//# sourceMappingURL=Vector3.js.map