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
var GameplayLoaded = (function (_super) {
    __extends(GameplayLoaded, _super);
    function GameplayLoaded() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.key = "gameplayLoaded";
        _this.log = new Logger_1.Log("Actions.GameplayLoaded");
        return _this;
    }
    GameplayLoaded.prototype.run = function (payload) {
        if (!payload.player) {
            this.log.wrn("User", payload.user, "trying to ready, but it isn't in any gameroom");
            return null;
        }
        if (!payload.gameroom) {
            this.log.wrn("Player", payload.player, "trying to ready, but it isn't in any gameroom");
            return null;
        }
        if (!payload.gameroom.gameStarted) {
            this.log.wrn("Player", payload.player, "trying to ready, but the gameroom hasn't been started");
            return null;
        }
        if (!payload.player.ready) {
            payload.player.ready = true;
        }
        else {
            this.log.wrn("Player", payload.player, "already ready");
            return null;
        }
        var all_ready = true;
        payload.player.gameroom.players.foreach(function (p, i) {
            if (!p.ready) {
                all_ready = false;
                return false;
            }
        });
        if (all_ready) {
            payload.gameroom.timer.start();
            var _p = Payload_1.Payload.createRoomPayload(payload.gameroom, 'gameplayLoaded', { 'start': true });
            this.MainDriver.send(_p);
            return null;
        }
        return new Payload_1.Payload(payload.user, 'gameplayLoaded', { 'start': false });
    };
    GameplayLoaded = __decorate([
        Services_1.ServiceDecorators.service(["MainDriver"])
    ], GameplayLoaded);
    return GameplayLoaded;
}(Action_1.Action));
exports.GameplayLoaded = GameplayLoaded;
//# sourceMappingURL=GameplayLoaded.js.map