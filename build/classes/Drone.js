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
var GameObject_1 = require("./GameObject");
var Drone = (function (_super) {
    __extends(Drone, _super);
    function Drone(id) {
        var _this = _super.call(this) || this;
        _this.id = id;
        return _this;
    }
    return Drone;
}(GameObject_1.GameObject));
exports.Drone = Drone;
//# sourceMappingURL=Drone.js.map