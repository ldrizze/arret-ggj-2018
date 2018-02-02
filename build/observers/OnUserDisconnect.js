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
var Observer_1 = require("../classes/Observer");
var Logger_1 = require("../classes/Logger");
var Payload_1 = require("../classes/Payload");
var Services_1 = require("../classes/Services");
var OnUserDisconnect = (function (_super) {
    __extends(OnUserDisconnect, _super);
    function OnUserDisconnect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.log = new Logger_1.Log("Observer.OnUserDisconnect");
        return _this;
    }
    OnUserDisconnect.prototype.run = function (attachs) {
        this.log.dbg("Anyone has been disconnected from the server...");
        var _user = attachs.find('user');
        if (_user.item) {
            _user = _user.item;
            if (_user.player != null) {
                this.log.dbg("Unset player", _user.player);
                var _d_1 = this.MainDriver;
                if (_user.player.gameroom != null && _user.player.gameroom.gameStarted) {
                    _user.player.gameroom.gameStarted = false;
                    _user.player.gameroom.players.foreach(function (element, index) {
                        if (!element)
                            return true;
                        var _pld = new Payload_1.Payload(element.user, 'abortGame', { 'errormsg': 'A player has been disconected from the game' });
                        _d_1.send(_pld);
                        element.gameroom.removePlayer(element);
                    });
                }
                else if (_user.player.gameroom != null) {
                    _user.player.gameroom.removePlayer(_user.player);
                }
                _user.destroyPlayer();
            }
        }
    };
    OnUserDisconnect = __decorate([
        Services_1.ServiceDecorators.service(['MainDriver'])
    ], OnUserDisconnect);
    return OnUserDisconnect;
}(Observer_1.Observer));
exports.OnUserDisconnect = OnUserDisconnect;
//# sourceMappingURL=OnUserDisconnect.js.map