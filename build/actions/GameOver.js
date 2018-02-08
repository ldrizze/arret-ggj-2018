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
var GameOver = (function (_super) {
    __extends(GameOver, _super);
    function GameOver() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.key = "gameOver";
        _this.log = new Logger_1.Log("Actions.GameOver");
        return _this;
    }
    GameOver.prototype.run = function (payload) {
        if (!payload.gameroom && !payload.gameroom.allPlayersAreReady()) {
            this.log.wrn("All players aren't ready, wait...");
            return null;
        }
        if (!payload.gameroom || !payload.gameroom.gameStarted) {
            this.log.wrn("User", payload.user, "trying to gameOver, but no game has started");
            return null;
        }
        if (payload.user.player.id != payload.gameroom.host.id) {
            this.log.wrn("User", payload.user, "trying to gameOver, but isn't the host");
            return null;
        }
        if (payload.data && payload.data.winner) {
            var _pl = Payload_1.Payload.createRoomPayload(payload.gameroom, this.key, { winner: payload.data.winner });
            this.MainDriver.send(_pl);
            this.log.dbg("The game is over, cleaning up the gameroom");
            var _g = payload.gameroom;
            var _gp_1 = [];
            _g.players.foreach(function (p) {
                _gp_1.push(p);
            });
            for (var i in _gp_1) {
                this.log.dbg("Removing player", _gp_1[i]);
                _g.removePlayer(_gp_1[i]);
                this.log.dbg("Destroying player in User", _gp_1[i].user);
                _gp_1[i].user.destroyPlayer();
            }
            this.log.dbg("gameroom.gameStarted set to false");
            _g.gameStarted = false;
            this.log.dbg("cleaning up drones");
            _g.drones.clear();
            this.log.dbg("cleaning uo player colors");
            _g.clearColors();
            this.log.dbg("Gameroom", _g, "has been cleared and up for another match!");
        }
        else {
            this.log.wrn("Wrong payload data");
        }
        return null;
    };
    GameOver = __decorate([
        Services_1.ServiceDecorators.service(["MainDriver"])
    ], GameOver);
    return GameOver;
}(Action_1.Action));
exports.GameOver = GameOver;
//# sourceMappingURL=GameOver.js.map