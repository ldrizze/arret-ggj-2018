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
var Route = (function (_super) {
    __extends(Route, _super);
    function Route() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.key = "route";
        _this.log = new Logger_1.Log("Actions.Route");
        return _this;
    }
    Route.prototype.run = function (payload) {
        this.log.dbg("Received route");
        this.log.inf("Payload", payload);
        this.log.dbg("Routing route");
        var drv = this.MainDriver;
        this.log.dbg("Routing to", this.Users.length, "users");
        this.Users.foreach(function (element, index) {
            if (element.client_id != payload.user.client_id) {
                var pl = new Payload_1.Payload(element, payload.data);
                drv.send(pl);
            }
        });
        return null;
    };
    Route = __decorate([
        Services_1.ServiceDecorators.service(["Users", "MainDriver"])
    ], Route);
    return Route;
}(Action_1.Action));
exports.Route = Route;
//# sourceMappingURL=Route.js.map