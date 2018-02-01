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
var Services_1 = require("../classes/Services");
var Logger_1 = require("../classes/Logger");
var MakeMatch = (function (_super) {
    __extends(MakeMatch, _super);
    function MakeMatch() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.key = "makematch";
        _this.log = new Logger_1.Log("Actions.MakeMatch");
        return _this;
    }
    MakeMatch.prototype.run = function (payload) {
        var g = null;
        if (payload.data.type == 'mobile') {
            this.Gamerooms.foreach(function (element, index) {
                if (element.playerCount >= 2) {
                    if (element.host && !g) {
                        g = element;
                    }
                    else {
                    }
                }
                else {
                    if (!g)
                        g = element;
                }
            });
        }
        else if (payload.data.type == 'vr') {
            this.Gamerooms.foreach(function (element, index) {
                if (!element.host && !g) {
                    g = element;
                }
            });
        }
        if (!g) {
            this.log.dbg('Instanciate new gameroom.');
            this.log.dbg('Add gameroom to Gamerooms collection.');
        }
        g.addPlayer(payload.user.player);
        if (payload.data.type == 'vr' && !g.host) {
            g.setHost(payload.user.player);
        }
        if (g.isFull) {
            this.log.dbg('Broadcast new user entering and match start to all gameroom\'s players');
        }
        else {
            this.log.dbg('Broadcast new user entering to all gameroom\'s players');
        }
        return null;
    };
    MakeMatch = __decorate([
        Services_1.ServiceDecorators.service(["Users", "MainDriver", "Gamerooms"])
    ], MakeMatch);
    return MakeMatch;
}(Action_1.Action));
exports.MakeMatch = MakeMatch;
//# sourceMappingURL=MakeMatch.js.map