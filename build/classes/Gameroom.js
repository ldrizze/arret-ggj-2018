"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Gameroom = (function () {
    function Gameroom(id, name, password, maxPlayers) {
        if (maxPlayers === void 0) { maxPlayers = 10; }
        this.id = id;
        this.name = name;
        this.password = password;
        this.maxPlayers = maxPlayers;
    }
    Gameroom.prototype.addPlayer = function () {
    };
    Gameroom.prototype.removePlayer = function () {
    };
    Object.defineProperty(Gameroom.prototype, "isFull", {
        get: function () {
            return this.players.length == this.maxPlayers;
        },
        enumerable: true,
        configurable: true
    });
    Gameroom.prototype.findPlayerById = function () {
    };
    Gameroom.prototype.update = function () {
    };
    return Gameroom;
}());
exports.Gameroom = Gameroom;
//# sourceMappingURL=Gameroom.js.map