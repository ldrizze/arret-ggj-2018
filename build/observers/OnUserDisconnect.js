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
var Observer_1 = require("../classes/Observer");
var Logger_1 = require("../classes/Logger");
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
                if (_user.player.gameroom != null) {
                    _user.player.gameroom.removePlayer(_user.player);
                }
                _user.destroyPlayer();
            }
        }
    };
    return OnUserDisconnect;
}(Observer_1.Observer));
exports.OnUserDisconnect = OnUserDisconnect;
//# sourceMappingURL=OnUserDisconnect.js.map