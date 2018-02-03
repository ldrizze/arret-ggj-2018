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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Action_1 = require("../classes/Action");
var Payload_1 = require("../classes/Payload");
var Services_1 = require("../classes/Services");
var Logger_1 = require("../classes/Logger");
var Tick = (function (_super) {
    __extends(Tick, _super);
    function Tick() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.key = "tick";
        _this.log = new Logger_1.Log("Actions.Tick");
        return _this;
    }
    Tick.prototype.run = function (payload) {
        if (!payload.gameroom || !payload.gameroom.allPlayersAreReady()) {
            this.log.wrn("All players aren't ready, wait...");
            return null;
        }
        if (!payload.gameroom || !payload.gameroom.gameStarted) {
            this.log.wrn("User", payload.user, "trying to place drone, but no game has started");
            return null;
        }
        var thetime = payload.gameroom.timer.time / 1000;
        var m = Math.floor(thetime / 60);
        var s = Math.floor(thetime % 60);
        return new Payload_1.Payload(payload.user, this.key, { 'm': m, 's': s, 't': thetime });
    };
    Tick = __decorate([
        Services_1.ServiceDecorators.service(["MainDriver"])
    ], Tick);
    return Tick;
}(Action_1.Action));
exports.Tick = Tick;
//# sourceMappingURL=Tick.js.map