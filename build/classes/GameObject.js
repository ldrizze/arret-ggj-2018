"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vector3_1 = require("./Vector3");
var Timer_1 = require("./Timer");
var GameObject = (function () {
    function GameObject() {
        this.transform = {
            position: new Vector3_1.Vector3,
            rotation: new Vector3_1.Vector3
        };
        this.Time = new Timer_1.Timer;
        this._enabled = true;
        this._started = true;
        this._awaken = false;
    }
    Object.defineProperty(GameObject.prototype, "enabled", {
        get: function () {
            return this._enabled;
        },
        set: function (value) {
            this._enabled = value;
        },
        enumerable: true,
        configurable: true
    });
    GameObject.prototype.addChild = function (child) {
        this.children.push(child);
        child.parent = this;
        return this;
    };
    GameObject.prototype.removeChild = function (child) {
        var idx = this.children.indexOf(child);
        if (idx != -1) {
            child.parent = null;
            this.children.splice(idx, 1);
            return this;
        }
        else {
            return null;
        }
    };
    return GameObject;
}());
exports.GameObject = GameObject;
//# sourceMappingURL=GameObject.js.map