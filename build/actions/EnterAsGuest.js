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
var EnterAsGuest = (function (_super) {
    __extends(EnterAsGuest, _super);
    function EnterAsGuest() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.key = "enterAsGuest";
        _this.log = new Logger_1.Log("Actions.EnterAsGuest");
        return _this;
    }
    EnterAsGuest.prototype.run = function (payload) {
        this.log.dbg("Entering as guest");
        this.log.inf("Payload", payload);
        this.log.dbg("Sending message back");
        var _send_payload = new Payload_1.Payload(payload.user, { allineedismusic: "get there" });
        this.MainDriver.send(_send_payload);
        return null;
    };
    EnterAsGuest = __decorate([
        Services_1.ServiceDecorators.service(["Gamerooms", "Players", "MainDriver"])
    ], EnterAsGuest);
    return EnterAsGuest;
}(Action_1.Action));
exports.EnterAsGuest = EnterAsGuest;
//# sourceMappingURL=EnterAsGuest.js.map