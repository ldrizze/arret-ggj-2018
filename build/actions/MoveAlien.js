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
var Vector3_1 = require("../classes/Vector3");
var MoveAlien = (function (_super) {
    __extends(MoveAlien, _super);
    function MoveAlien() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.key = "moveAlien";
        _this.log = new Logger_1.Log("Actions.MoveAlien");
        return _this;
    }
    MoveAlien.prototype.run = function (payload) {
        if (!payload.gameroom || !payload.gameroom.allPlayersAreReady()) {
            this.log.wrn("All players aren't ready, wait...");
            return null;
        }
        if (payload.player.id != payload.gameroom.host.id) {
            this.log.wrn("Player", payload.player, "trying to walk as alien, but it isn't the alien (lul)");
            return null;
        }
        if (!payload.gameroom || !payload.gameroom.gameStarted) {
            this.log.wrn("User", payload.user, "trying to walk, but no game has started");
            return null;
        }
        if (payload.data && payload.data instanceof Object && payload.data.x && payload.data.y && payload.data.z) {
            if (payload.user.player.id != payload.gameroom.host.id) {
                this.log.wrn("Payload user is not the host", payload);
                return null;
            }
            payload.player.setPosition(new Vector3_1.Vector3(payload.data.x, payload.data.y, payload.data.z));
            var _pp_1 = payload.player.getPosition();
            var _p_1 = new Array();
            payload.gameroom.players.foreach(function (p, i) {
                if (p.id != payload.player.id)
                    _p_1.push(new Payload_1.Payload(p.user, 'moveAlien', { 'x': _pp_1.x, 'y': _pp_1.y, 'z': _pp_1.z }));
            });
            if (_p_1.length > 0) {
                this.MainDriver.send(_p_1);
            }
        }
        else {
            this.log.dbg("No payload data found");
        }
        return null;
    };
    MoveAlien = __decorate([
        Services_1.ServiceDecorators.service(["MainDriver"])
    ], MoveAlien);
    return MoveAlien;
}(Action_1.Action));
exports.MoveAlien = MoveAlien;
//# sourceMappingURL=MoveAlien.js.map